#!/usr/bin/python2.7
from __future__ import with_statement
"""Import a puzzle file.
Requires 'python2.7', 'python-html5lib', and 'python-yaml'.

Command line:

./import.py [zip file] [root dir] [round] [authors]
"""
import html5lib
import os, os.path
import re
import shutil
import sys
import tempfile
import xml.dom.minidom as minidom
import yaml
from cStringIO import StringIO
from contextlib import contextmanager
from htmlentitydefs import name2codepoint
from subprocess import Popen, PIPE
from tidylib import tidy_document
from zipfile import ZipFile

@contextmanager
def rmdir_after(d):
    try:
        yield d
    finally:
        shutil.rmtree(d)

global LOG_CONTEXT1, LOG_CONTEXT2
LOG_CONTEXT1='<unknown>'
LOG_CONTEXT2=''
def log_error(s):
    print LOG_CONTEXT1, LOG_CONTEXT2, s # XXX
def log_fatal(s):
    log_error(s)
    raise "FATAL"

def smart_quotes(s):
    # pipe it through the external 'quoter' program
    p = Popen(['quoter'], stdin=PIPE, stdout=PIPE, stderr=PIPE)
    out,err = p.communicate(s)
    assert err == '', "quoter error: "+err
    return out

def extract_title(html):
    # "correct way"
    parser = html5lib.HTMLParser(tree=html5lib.treebuilders.getTreeBuilder("dom"))
    dom = parser.parse(html)
    titleE = dom.getElementsByTagName("title")
    assert len(titleE)==1, \
           "Wrong number of <title> elements found: "+str(len(titleE))
    titleC = titleE[0].childNodes
    assert len(titleC)>=1, \
           "Wrong number of <title> children found: "+str(len(titleC))
    value = ''
    for c in titleC:
        assert c.nodeType == c.TEXT_NODE, \
               "<title> contains something other than text"
        value += c.data
    return value.strip()

def extract_body(html):
    # "Hack" way (try not to munge HTML!)
    m = re.search(r'<body(?:\s+([^>]*))?>(.*?)</body\s*>', html,
                  flags=re.DOTALL|re.IGNORECASE)
    assert m is not None, "<body> element not found"
    body_cruft = m.group(1)
    assert body_cruft is None or body_cruft.strip()=='', \
           "<body> contains unsupported attributes"
    return m.group(2).strip()

def canon(s):
    # suppress 's
    s = re.sub(u"['\u2019]([st])\\b", r'\1', s) # possessives
    return re.sub(r'[^a-z0-9]+', '_', s.lower().strip())

SORT_ORDER=['layout','title','class','style','credits']

def mktempl(body, **options):
    def order(k):
        return (SORT_ORDER.index(k) if k in SORT_ORDER else 99, k)

    s = u'---\n'
    for k in sorted(options.keys(), key=order):
        s += u'%s: %s\n' % (k, options[k])
    s += u'---\n'
    s += body.strip()
    s = s.strip() + '\n'
    return s

HTMLTIDY_OPTS = {
    'new-blocklevel-tags': 'canvas,colset',
    'char-encoding': 'utf8',
    'gnu-emacs': 'yes',
    'join-classes': 'yes',
    'drop-empty-paras': 'no',
    'enclose-text': 'no',
    'enclose-block-text': 'no',
    'indent': 'no',
    'wrap': '0',
    'merge-divs': 'no',
    'merge-spans': 'no'
}

def is_reserved_filename(fname):
    return fname.startswith('-') or fname.startswith('_')

def do_import_of_zf(zf, root_dir, round_name, authors):
    global LOG_CONTEXT2
    LOG_CONTEXT2 = ''
    files = zf.namelist()
    # sanity-check files
    bad_files = [f for f in files if
                 f.startswith('../') or f.startswith('./') or
                 f.startswith('/') or is_reserved_filename(f)]
    if bad_files:
        log_fatal("Illegal file names in archive: "+(' '.join(bad_files)))
    # find the title of the puzzle
    if 'index.html' not in files:
        log_fatal("Puzzle not found (expected index.html)")

    def tidy_with_log(s):
        if not s.startswith("<!DOCTYPE"):
            s = "<!DOCTYPE HTML>\n" + s
        parser = html5lib.HTMLParser(
            tree=html5lib.treebuilders.getTreeBuilder("dom"))
        doc = parser.parse(s)
        for (line,char), msg, details in parser.errors:
            # work around weird error for void elements
            if msg == 'non-void-element-with-trailing-solidus' and \
               details['name'] in html5lib.constants.voidElements:
                continue
            log_error("line %d pos %d - %s" %
                      (line, char, html5lib.constants.E[msg] % details))
        clean = html5lib.serializer.serialize(doc, tree='dom',
                                              format='xhtml',
                                              encoding='ascii',
                                              omit_optional_tags=False)
        cleaner = smart_quotes(clean)
        return cleaner

    LOG_CONTEXT2 = 'index.html'
    puz = tidy_with_log(zf.read('index.html'))
    # extract title, body, stylesheet
    title = extract_title(puz)
    body = extract_body(puz)
    options = { 'layout': canon(round_name), 'title': title }
    if 'style.css' in files:
        options['style'] = 'style.css'
    if re.match(r'Investigator.s Report', title):
        options['class'] = 'report'
    # replace index.html with template version
    index_html = mktempl(body, **options)
    
    # process the solution (if present)
    LOG_CONTEXT2 = 'solution/index.html'
    sol_index_html = ''
    if 'solution/index.html' not in files:
        log_error('Solution not found (expected solution/index.html)')
    else:
        sol = tidy_with_log(zf.read('solution/index.html'))
        sol_body = extract_body(sol)
        options = { 'layout': canon(round_name)+"_solution",
                    'title': title,
                    'credits': authors }
        if 'solution/style.css' in files:
            options['style'] = 'style.css'
        if re.match(r'Investigator.s Report', title):
            options['class'] = 'report'
        sol_index_html = mktempl(sol_body, **options)

    # ok, extract all files into the target directory
    LOG_CONTEXT2 = ''
    target_dir = os.path.join(root_dir,
                              canon(round_name).encode('utf8'),
                              canon(title).encode('utf8'))
    solution_dir = os.path.join(target_dir, 'solution')
    if not os.path.isdir(solution_dir):
        os.makedirs(solution_dir)
    # XXX clean target?
    for f in files:
        full_path = os.path.join(target_dir, f)
        if f == 'index.html':
            with open(full_path, 'w') as fd:
                fd.write(index_html.encode('utf8'))
        elif f == 'solution/index.html':
            with open(full_path, 'w') as fd:
                fd.write(sol_index_html.encode('utf8'))
        else:
            zf.extract(f, target_dir)

def listdir_rec(d):
    for dirpath, dirnames, filenames in os.walk(d, followlinks=True):
        for f in filenames:
            fullname = os.path.join(dirpath, f)
            # strip off top
            assert fullname.startswith(d)
            yield os.path.relpath(fullname, d)

def parse_header(contents):
    assert contents.startswith('---'), "Not a template!"
    m = re.match(r'\A^---\s*$(.*?)^---\s*$(.*)\Z', contents,
                 flags=(re.DOTALL|re.MULTILINE))
    assert m is not None
    options = yaml.load(m.group(1))
    return options, m.group(2)

def wrap_body(body, options, is_solution=False):
    style = ''
    if 'style' in options:
        style = "<link href='style.css' rel='stylesheet' type='text/css'>"
    return u"""<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
%s
<title>%s</title>
</head>
<body>
%s
</body>
</html>
""" % (style, options['title'], body)

def do_export_to_zf(zf, puzzle_dir):
    # look at every file in puzzle_dir
    for f in listdir_rec(puzzle_dir):
        fullname = os.path.join(puzzle_dir, f)
        if is_reserved_filename(f): continue # skip this one
        if f.endswith('~'): continue # skip emacs backup files
        if f == 'index.html' or f == 'solution/index.html':
            with open(fullname, 'r') as fd:
                contents = fd.read().decode('utf8')
            options, body = parse_header(contents)
            wrapped = wrap_body(body, options,
                                is_solution=(f.startswith('solution')))
            zf.writestr(f, wrapped.encode('utf8'))
        else:
            zf.write(fullname, f)

def do_import(zip_file, root_dir, round_name, authors):
    #with rmdir_after(tempfile.mkdtemp(suffix='.puzzle')) as d:
    with ZipFile(zip_file, 'r') as zf:
        do_import_of_zf(zf, root_dir, round_name, authors)

def do_export(zip_file, puzzle_dir):
    with ZipFile(zip_file, 'w') as zf:
        do_export_to_zf(zf, puzzle_dir)

if __name__ == '__main__':
    _, zip_file, root_dir, round_name, authors = sys.argv
    LOG_CONTEXT1=zip_file
    if round_name=='export':
        do_export(zip_file, root_dir) # HACK HACK HACK
    else:
        do_import(zip_file, root_dir,
                  round_name.decode('utf8'), authors.decode('utf8'))
