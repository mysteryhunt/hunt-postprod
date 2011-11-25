#!/usr/bin/python2.7
from __future__ import with_statement
"""Import a puzzle file.
Requires 'python2.7' and 'python-tidylib'.

Command line:

./import.py [zip file] [root dir] [round] [authors]
"""
import shutil
import sys
import tempfile
from zipfile import ZipFile
from contextlib import contextmanager
from tidylib import tidy_document
import xml.dom.minidom as minidom
import re
from subprocess import Popen, PIPE
from cStringIO import StringIO
import os.path

@contextmanager
def rmdir_after(d):
    try:
        yield d
    finally:
        shutil.rmtree(d)

def log_error(s):
    print s # XXX
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
    dom = minidom.parseString(html)
    titleE = dom.getElementsByTagName("title")
    assert len(titleE)==1, \
           "Wrong number of <title> elements found: "+len(titleE)
    titleC = titleE[0].childNodes
    assert len(titleC)==1, \
           "Wrong number of <title> children found: "+len(titleC)
    assert titleC[0].nodeType == titleC[0].TEXT_NODE, \
           "<title> contains something other than text"
    return titleC[0].data.strip()
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
    return re.sub(r'[^a-z0-9]+', '_', s.lower().strip())

def mktempl(body, **options):
    s = u'---\n'
    for k,v in options.iteritems():
        s += u'%s: %s\n' % (k, v)
    s += u'---\n'
    s += body
    return s

HTMLTIDY_OPTS = {
    'new-blocklevel-tags': 'canvas',
    'char-encoding': 'utf8',
    'gnu-emacs': 'yes',
    'join-classes': 'yes',
    'drop-empty-paras': 'no',
    'enclose-text': 'no',
    'enclose-block-text': 'no',
    'indent': 'no',
    'wrap': '0'
}

def do_import_of_zf(zf, root_dir, round_name, authors):
    files = zf.namelist()
    # sanity-check files
    bad_files = [f for f in files if
                 f.startswith('../') or f.startswith('./') or
                 f.startswith('/') or f.startswith('-') or f.startswith('_')]
    if bad_files:
        log_fatal("Illegal file names in archive: "+(' '.join(bad_files)))
    # find the title of the puzzle
    if 'index.html' not in files:
        log_fatal("Puzzle not found (expected index.html)")

    def tidy_with_log(s):
        out,msgs = tidy_document(s, options=HTMLTIDY_OPTS)
        # log warnings
        for m in msgs.splitlines():
            if m == 'line 1 column 1 - Warning: missing <!DOCTYPE> declaration':
                continue # suppress this warning
            log_error(m)
        return smart_quotes(out)

    puz = tidy_with_log(zf.read('index.html'))
    # extract title, body, stylesheet
    title = extract_title(puz)
    body = extract_body(puz)
    options = { 'layout': canon(round_name), 'title': title }
    if 'style.css' in files:
        options['style'] = 'style.css'
    # replace index.html with template version
    index_html = mktempl(body, **options)
    
    # process the solution (if present)
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
        sol_index_html = mktempl(sol_body, **options)

    # ok, extract all files into the target directory
    target_dir = os.path.join(root_dir, canon(round_name), canon(title))
    print target_dir
    # XXX clean target?
    for f in files:
        full_path = os.path.join(target_dir, f)
        if f == 'index.html':
            with open(full_path, 'w') as fd:
                fd.write(index_html)
        elif f == 'solution/index.html':
            with open(full_path, 'w') as fd:
                fd.write(sol_index_html)
        else:
            zf.extract(f, target_dir)

def do_import(zip_file, root_dir, round_name, authors):
    #with rmdir_after(tempfile.mkdtemp(suffix='.puzzle')) as d:
    with ZipFile(zip_file, 'r') as zf:
        do_import_of_zf(zf, root_dir, round_name, authors)

if __name__ == '__main__':
    _, zip_file, root_dir, round_name, authors = sys.argv
    do_import(zip_file, root_dir, round_name, authors)
