#!/usr/bin/python2.6
from __future__ import with_statement
"""Import a puzzle file.
Requires 'python2.6', 'python-html5lib', and 'python-yaml'.
Also requires 'pngcrush' and 'jpegtran' to be on your path.

Command line:

./import.py [zip file] [root dir] [round] [authors]
"""
import os, os.path
import re
import shutil
import sys
import tempfile
import xml.dom.minidom as minidom
import yaml
from cStringIO import StringIO
from contextlib import contextmanager, closing
from htmlentitydefs import name2codepoint
from subprocess import Popen, PIPE, check_call, call
from zipfile import ZipFile
# import local copy of html5lib
sys.path.insert(0, os.path.dirname(__file__))
import html5lib

# WORK AROUND BUG IN HTML5LIB
html5lib.constants.E.setdefault(
    "unexpected-character-in-unquoted-attribute-value",
    u"Unexpected character in unquoted attribute value")
html5lib.constants.E.setdefault(
    "invalid-codepoint",
    u"Invalid codepoint (ignore line number given)")

DO_GIT=False

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

# use the 'quoter' binary in the same directory as us
QUOTER = os.path.join(os.path.dirname(__file__), 'quoter')

def smart_quotes(s):
    # pipe it through the external 'quoter' program
    p = Popen([QUOTER], stdin=PIPE, stdout=PIPE, stderr=PIPE)
    out,err = p.communicate(s)
    assert err == '', "quoter error: "+err
    # use symbolic names
    for sym in [ 'rsquo', 'rdquo', 'lsquo', 'ldquo' ]:
        code = name2codepoint[sym]
        out = re.sub(unichr(code)+(u"|&#(%d|x%x|x%X);" % (code,code,code)),
                     u"&%s;" % sym, out)
    return out

def extract_title(html):
    # "correct way"
    parser = html5lib.HTMLParser(tree=html5lib.treebuilders.getTreeBuilder("dom"))
    dom = parser.parse(html)
    titleE = dom.getElementsByTagName("title")
    if len(titleE) == 0:
        log_error("No <title> element found")
        return None
    assert len(titleE)==1, \
           "Wrong number of <title> elements found: "+str(len(titleE))
    titleC = titleE[0].childNodes
    assert len(titleC)>=1, \
           "Wrong number of <title> children found: "+str(len(titleC))
    value = ''
    for c in titleC:
        if c.nodeType != c.TEXT_NODE:
            log_error("<title> contains something other than text");
            continue
        value += c.data
    return value.strip()

def extract_body(html):
    # "Hack" way (try not to munge HTML!)
    m = re.search(r'<body(?:\s+([^>]*))?>(.*?)</body\s*>', html,
                  flags=re.DOTALL|re.IGNORECASE)
    if m is None:
        log_fatal("<body> element not found")
        return ""
    body_cruft = m.group(1)
    if body_cruft is not None and body_cruft.strip()!='':
        log_error("<body> contains unsupported attributes")
    return m.group(2).strip()

def canon(s):
    # suppress 's
    s = re.sub(u"['\u2019]([st])\\b", r'\1', s) # possessives
    return re.sub(r'[^a-z0-9]+', '_', s.lower().strip()).strip('_')

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

def is_reserved_filename(fname):
    return fname.startswith('-') or fname.startswith('_')

def do_import_of_zf(zf, root_dir, round_name, authors,
                    title=None, is_show_meta=False, ponyhash=None):
    global LOG_CONTEXT2
    LOG_CONTEXT2 = ''
    files = zf.namelist()
    # filter out mac cruft
    mac_cruft = [f for f in files if f.startswith('__MACOSX/')]
    if mac_cruft:
        log_error("__MACOSX directory found in .zip file, ignoring.")
        files = [f for f in files if f not in mac_cruft ]
    # sanity-check files
    bad_files = [f for f in files if
                 f.startswith('../') or f.startswith('./') or
                 f.startswith('/') or is_reserved_filename(f)]
    if bad_files:
        log_fatal("Illegal file names in archive: "+(' '.join(bad_files)))
    # find the title of the puzzle
    if 'index.html' not in files and not is_show_meta:
        log_fatal("Puzzle not found (expected index.html)")

    def tidy_with_log(s):
        lineoffset = 0
        if not s.startswith("<!DOCTYPE"):
            s = "<!DOCTYPE HTML>\n" + s
            lineoffset = 1
        # HACK TO PROTECT &#39; (except in titles)
        s = re.sub(r'(&#[0-9]+;)',r'<tt class="ponypony">\1</tt>', s)
        s = re.sub(r'(<title>.*)<tt class="ponypony">([^<]+)</tt>(.*</title>)',r'\1\2\3', s)
        parser = html5lib.HTMLParser(
            tree=html5lib.treebuilders.getTreeBuilder("dom"))
        doc = parser.parse(s)
        for (line,char), msg, details in parser.errors:
            # work around weird error for void elements
            if msg == 'non-void-element-with-trailing-solidus' and \
               details['name'] in html5lib.constants.voidElements:
                continue
            pretty = msg +": "+str(details)
            if msg in html5lib.constants.E:
                # (not all errors are in html5lib's list of error messages)
                pretty = html5lib.constants.E[msg] % details
            log_error("line %d pos %d - %s" %
                      (line-lineoffset, char, pretty))
        clean = html5lib.serializer.serialize(doc, tree='dom',
                                              format='xhtml',
                                              encoding='ascii',
                                              omit_optional_tags=False)
        cleaner = smart_quotes(clean)
        cleaner = re.sub(r'<tt class="ponypony">([^<]+)</tt>',r'\1', cleaner)
        cleaner = cleaner.replace('&amacr;', '&#257;')
        return cleaner

    if is_show_meta:
        index_html=''
    else:
        LOG_CONTEXT2 = 'index.html'
        puz = tidy_with_log(zf.read('index.html'))
        # extract title, body, stylesheet
        ntitle = extract_title(puz)
        if ntitle is None and title is not None:
            pass # use title from database; we've already complained about this
        elif title is not None and canon(title) != canon(ntitle):
            log_error("Title in index.html doesn't match database title")
        else:
            title = ntitle
        body = extract_body(puz)
        options = { 'layout': canon(round_name), 'title': title }
        if ponyhash is not None:
            options['ponyhash'] = ponyhash
        if 'style.css' in files:
            options['style'] = 'style.css'
        if 'solution/secret.js' in files:
            options['appengine'] = 'true'
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
        if not sol_body.strip():
            log_error("Solution is empty")
        solution_suffix = '_solution'
        if is_show_meta: solution_suffix = '_show_solution'
        options = { 'layout': canon(round_name)+solution_suffix,
                    'title': title,
                    'credits': authors,
                    'class': 'puzzle solution' }
        if 'solution/style.css' in files:
            options['style'] = 'style.css'
        if re.match(r'Investigator.s Report', title):
            options['class'] = 'report solution'
        sol_index_html = mktempl(sol_body, **options)

    # ok, extract all files into the target directory
    LOG_CONTEXT2 = ''
    target_dir = os.path.join(root_dir,
                              canon(round_name).encode('utf8'))
    if not is_show_meta:
        target_dir = os.path.join(target_dir,
                                  canon(title).encode('utf8'))
    solution_dir = os.path.join(target_dir, 'solution')
    if not os.path.isdir(solution_dir):
        os.makedirs(solution_dir)
    # XXX clean target? (if not show_meta)
    if os.path.isdir(target_dir) and DO_GIT and \
            not is_show_meta and not any(f.endswith('.mp4') for f in files):
        call(['git','rm','-rf',target_dir])
    for f in files:
        full_path = os.path.join(target_dir, f)
        if not os.path.isdir(os.path.dirname(full_path)):
            os.makedirs(os.path.dirname(full_path))
        if f == 'index.html':
            with open(full_path, 'w') as fd:
                fd.write(index_html.encode('utf8'))
        elif f == 'solution/index.html':
            with open(full_path, 'w') as fd:
                fd.write(sol_index_html.encode('utf8'))
        elif f.endswith(".html"):
            with open(full_path, 'w') as fd:
                LOG_CONTEXT2 = f
                html = zf.read(f)
                if not html.startswith("---"):
                    html = tidy_with_log(html)
                fd.write(html)
                LOG_CONTEXT2 = ''
        elif f.endswith('.png'):
            LOG_CONTEXT2 = f
            with open(full_path+".XXX", 'w') as fd:
                fd.write(zf.read(f))
            check_call(['pngcrush', '-rem', 'text', '-q',
                        full_path+".XXX", full_path])
            os.remove(full_path+".XXX")
            LOG_CONTEXT2 = ''
        elif f.endswith('.jpg'):
            LOG_CONTEXT2 = f
            with open(full_path+".XXX", 'w') as fd:
                fd.write(zf.read(f))
            check_call(['jpegtran', '-o', '-progressive', '-copy', 'none',
                        '-outfile', full_path, full_path+".XXX"])
            os.remove(full_path+".XXX")
            LOG_CONTEXT2 = ''
        else:
            if f.endswith("~") or f.endswith(".bak") or f.endswith(".htm") \
                    or f.endswith(".PNG") or f.endswith(".jpeg") \
                    or f.endswith(".JPG") or f.endswith(".GIF"):
                log_error("Suspicious filename: %s" % f)
            zf.extract(f, target_dir)
    if is_show_meta:
        index_html_path = os.path.join(target_dir, 'index.html')
        index_html = open(index_html_path, 'r').read()
        index_html = re.sub(r'(?m)^ponyhash:(.*)$',
                            'ponyhash: '+ponyhash,
                            index_html)
        with open(index_html_path, 'w') as fd:
            fd.write(index_html)
    if DO_GIT:
        check_call(['git','add',target_dir])

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

def do_export_to_zf(zf, puzzle_dir, is_show_meta):
    # look at every file in puzzle_dir
    for f in listdir_rec(puzzle_dir):
        fullname = os.path.join(puzzle_dir, f)
        if is_reserved_filename(f): continue # skip this one
        if f.endswith('~'): continue # skip emacs backup files
        if is_show_meta and not f.startswith('solution/'): continue
        if f == 'index.html' or f == 'solution/index.html':
            with open(fullname, 'r') as fd:
                contents = fd.read().decode('utf8')
            options, body = parse_header(contents)
            wrapped = wrap_body(body, options,
                                is_solution=(f.startswith('solution')))
            zf.writestr(f, wrapped.encode('utf8'))
        else:
            zf.write(fullname, f)

def do_import(zip_file, root_dir, round_name, authors, **kwargs):
    #with rmdir_after(tempfile.mkdtemp(suffix='.puzzle')) as d:
    with closing(ZipFile(zip_file, 'r')) as zf:
        do_import_of_zf(zf, root_dir, round_name, authors, **kwargs)

def do_export(zip_file, puzzle_dir, is_show_meta=False):
    with closing(ZipFile(zip_file, 'w')) as zf:
        do_export_to_zf(zf, puzzle_dir, is_show_meta)

if __name__ == '__main__':
    _, zip_file, root_dir, round_name, authors = sys.argv
    LOG_CONTEXT1=zip_file
    if round_name=='export':
         # HACK HACK HACK
        do_export(zip_file, root_dir, is_show_meta=(authors=='showmeta'))
    else:
        do_import(zip_file, root_dir,
                  round_name.decode('utf8'), authors.decode('utf8')
                  #,title='Show meta', is_show_meta=True
                  )
