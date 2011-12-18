#!/usr/bin/python2.6
from __future__ import with_statement
"""Grab a zip file from the database and unpack it.
Requires 'python2.6', 'python-mysqldb'.

Command line:

./dbfetch [puzzle number]
"""
from __future__ import with_statement
import MySQLdb
import re
import secrets
import sys
from contextlib import closing
from importpuzz import canon, do_import, log_error
from os import path

def with_db(func, *args, **kwargs):
    with closing(MySQLdb.connect(host=secrets.DB_SERVER, user=secrets.DB_USER,
                                 passwd=secrets.DB_PASS, db=secrets.DB_NAME)
                 ) as db:
        return func(db, *args, **kwargs)

def db_select_one(db, select, *args):
    with closing(db.cursor()) as c:
        c.execute(select, tuple(args))
        return c.fetchone()

def db_select_all(db, select, *args):
    with closing(db.cursor()) as c:
        c.execute(select, tuple(args))
        return c.fetchall()

def getTitle(db, pid):
    # throws an exception if no title/no pid
    return db_select_one(db,
        """SELECT title FROM puzzle_idea WHERE id = %s;""", pid)[0]

def getRoundName(db, pid):
    rinfo = db_select_one(db,
        """SELECT rounds.name FROM rounds, answers_rounds, answers
           WHERE answers.pid=%s and answers_rounds.aid = answers.aid and
                 rounds.rid = answers_rounds.rid;""", pid)
    return rinfo[0]

def getCredits(db, pid):
    desc = db_select_one(db, """
SELECT description FROM puzzle_idea WHERE id = %s;""", pid)[0]
    # now extract the boldfaced "by" clause
    m = re.search(r'<b>by\s+([^<]+)</b>', desc, re.IGNORECASE)
    if m is None:
        log_error("Database is missing credits")
        return "by unknown Codexian heroes"
    return "by %s" % m.group(1)

def getRoundAnswer(db, roundName):
    """This is really just a check that the round name is correct."""
    rinfo = db_select_one(db, """
SELECT answer FROM rounds WHERE name = %s""", roundName)
    return None if rinfo is None else rinfo[0]

def getPostProdFile(db, pid):
    finfo = db_select_one(db, """
SELECT filename FROM uploaded_files
WHERE pid=%s AND type="postprod" AND filename LIKE '%%.zip'
ORDER BY date DESC LIMIT 1;""", pid)
    if not finfo: return None
    return finfo[0]

def getPuzzlesWithPostProd(db):
    pids = db_select_all(db, """
SELECT DISTINCT pid FROM uploaded_files
WHERE filename LIKE '%%.zip' AND type = "postprod"
ORDER BY pid ASC;""")
    return [ p for (p,) in pids ]

def getPuzzleStatus(db, pid):
    sinfo = db_select_one(db, """
SELECT pstatus.id, pstatus.name FROM puzzle_idea, pstatus
WHERE puzzle_idea.id=%s and pstatus.id = puzzle_idea.pstatus;""", pid)
    return sinfo

def fetch_all(db):
    for pid in getPuzzlesWithPostProd(db):
        print "Processing puzzle %3d:" % pid, getPuzzleStatus(db, pid)[1]
        try:
            fetch_puzzle(db, pid)
        except:
            print sys.exc_info()[1]
            print "** SKIPPING", pid, "DUE TO ERRORS **"

def fetch_puzzle(db, pid):
    # fetch info about the puzzle
    title = getTitle(db, pid)
    roundName = getRoundName(db, pid)
    credits = getCredits(db, pid)
    # SPECIAL CASE for metas
    is_show_meta = False
    m = re.match(r'\s*\(([CS])-META\)\s*(.*)$', title)
    if m or roundName == 'Metas':
        assert m and roundName == 'Metas'
        mtype = m.group(1)
        roundName = m.group(2)
        assert getRoundAnswer(db, roundName) is not None
        if mtype == 'C':
            title = "Investigator's Report"
        else:
            title = "Show meta"
            is_show_meta = True
        
    # now find last post prod file
    ppfile = getPostProdFile(db, pid)
    if not ppfile:
        raise "No post-prod found for puzzle %d" % pid
    ppfile = path.join('/var/www/codex/editing', ppfile)
    # make a directory path
    outpath = path.dirname(__file__) # start with directory this script is in
    outpath = path.join(outpath, 'web')

    # do the import!
    do_import(ppfile, outpath, roundName, credits, title=title,
              is_show_meta=is_show_meta)

if __name__ == '__main__':
    _, pid = sys.argv
    if pid == 'all':
        with_db(fetch_all)
    else:
        with_db(fetch_puzzle, int(pid))
