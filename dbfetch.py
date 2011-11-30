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

def fetch_puzzle(db, pid):
    # fetch info about the puzzle
    title = getTitle(db, pid)
    roundName = getRoundName(db, pid)
    credits = getCredits(db, pid)
    # SPECIAL CASE for metas
    m = re.match(r'\s*\(([CS])-META\)\s*(.*)$', title)
    if m or roundName == 'Metas':
        assert m and roundName == 'Metas'
        mtype = m.group(1)
        roundName = m.group(2)
        assert getRoundAnswer(db, roundName) is not None
        if mtype == 'C':
            title = "Investigator's Report"
        else:
            title = "Meta" # hack? haven't really figured out show metas yet
        
    # now find last post prod file
    ppfile = getPostProdFile(db, pid)
    if not ppfile:
        raise "No post-prod found for puzzle %d" % pid
    ppfile = path.join('/var/www/codex/editing', ppfile)
    # make a directory path
    outpath = path.join('web', canon(roundName), canon(title))

    # do the import!
    do_import(ppfile, 'web', roundName, credits, title=title)

if __name__ == '__main__':
    _, pid = sys.argv
    with_db(fetch_puzzle, int(pid))
