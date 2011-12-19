#!/usr/bin/python
from __future__ import with_statement
from __future__ import division
"""Query the database for completed puzzles and generate indexes."""
import dbfetch
from importpuzz import canon, smart_quotes
from mkimagemap import mkimagemap
import json
import os, os.path
import shutil

ALL_PONIES=False # for testing; pretend no puzzles are in postprod

def getRoundPuzzlesWithPostProd(db):
    rinfo = dbfetch.db_select_all(db, """
SELECT rounds.name, ponies.name FROM rounds, answers, answers_rounds, ponies
WHERE answers_rounds.aid = answers.aid AND rounds.rid = answers_rounds.rid
  AND  ponies.aid = answers.aid ORDER BY rounds.name;""")
    rounds = {}
    for round_name, pony_name in rinfo:
        batch = 1 # XXX fetch from db
        rounds.setdefault(round_name, {})\
              .setdefault((batch, pony_name), None)
        
    for pid in dbfetch.getPuzzlesWithPostProd(db):
        pinfo = dbfetch.db_select_one(db, """
SELECT rounds.name, puzzle_idea.title, ponies.name
FROM puzzle_idea, rounds, answers_rounds, answers, ponies WHERE
puzzle_idea.id = %s AND answers.pid=puzzle_idea.id
AND answers_rounds.aid = answers.aid
AND rounds.rid = answers_rounds.rid AND ponies.aid = answers.aid;""", pid)
        if pinfo is None: continue # hrm
        round_name, puzzle_title, pony_name = pinfo
        batch = 1 # XXX fetch from db
        rounds[round_name][(batch, pony_name)] = puzzle_title

    # delete rounds which are not real
    for round_name in rounds.keys():
        if dbfetch.getRoundAnswer(db, round_name) is None or \
           round_name in ['Arbitrary Answer Puzzles']:
            del rounds[round_name]

    return rounds

# unordered rounds
def unordered_titles(round_info):
    # case-insensitive alphabetic
    puzzle_titles = sorted([pony if title is None or ALL_PONIES else title
                            for (batch,pony), title in round_info.iteritems()],
                           key=lambda s: s.lower())
    return puzzle_titles

# split into two columns
def two_columns(puzzle_titles):
    l = len(puzzle_titles)
    last = l // 2
    first = puzzle_titles[:(l-last)]
    second = puzzle_titles[(l-last):]
    return first, second

def jsEscape(s):
    return json.dumps(s)

def build1S(round_name, round_info):
    BASEDIR=os.path.join('web', canon(round_name))
    SPLIT=4
    # copy '-' files from ponies to non-ponies
    for (batch,pony),title in round_info.iteritems():
        if title is None: continue
        for filename in os.listdir(os.path.join(BASEDIR, canon(pony))):
            if filename.startswith('-'):
                shutil.copyfile(os.path.join(BASEDIR, canon(pony), filename),
                                os.path.join(BASEDIR, canon(title), filename))
    # build release.js file
    lines = []
    def add(s): lines.append(s)
    def addesc(s): add(jsEscape(s)+'+')

    puzzle_titles = unordered_titles(round_info)
    # generate imagemap
    add("function imagemap() {")
    add("  return ''+")
    addesc('<img src="key.png" />')
    for pt in puzzle_titles:
        addesc('<img src="%s/-' % canon(pt))
        add('(puzzle_solved.%s?"solved":"unsolved")+' % canon(pt))
        addesc('.png" />')
    addesc('<img src="../1px.png" usemap="#map" style="z-index:99" />')

    addesc('<map name="map">')
    for pt in puzzle_titles:
        # cached?
        cache_file = os.path.join(BASEDIR, canon(pt), '-map')
        if os.path.exists(cache_file):
            area = open(cache_file).read()
        else:
            print "Making image map for", pt
            sqpt = smart_quotes(pt)
            area = mkimagemap(os.path.join(BASEDIR, canon(pt), '-unsolved.png'),
                              canon(pt)+'/', sqpt, SPLIT)
            with open(cache_file, 'w') as f:
                f.write(area)
        addesc(area)
    addesc('</map>')
    add("'';")
    add("}")

    add('function puzzlelist() {');
    add('  return ""+');
    first, second = two_columns(puzzle_titles)
    for i in xrange(len(first)):
        addesc('<tr>')
        for pt in [ first[i], second[i] if i<len(second) else None ]:
            if pt is None:
                addesc('<td></td>')
                continue
            # "unlocked" should be looked up in javascript from master file
            addesc('<td><a href="%s/" class="' % canon(pt))
            add('(puzzle_solved.%s?"solved":"unsolved")+' % canon(pt))
            addesc('">%s</a></td>' % smart_quotes(pt))
        addesc('</tr>')
    add("'';")
    add("}")

    # invoke
    add("function onLoad() {");
    add("document.getElementById('index-image').innerHTML = imagemap();")
    add("document.getElementById('puzzle-list').innerHTML = puzzlelist();")
    add("}")

    # write this as release.js
    open(os.path.join(BASEDIR, 'release.js'), 'w').write('\n'.join(lines))
    # return ignorable ponies
    return [os.path.join(canon(round_name), canon(pony))
            for (batch,pony),title in round_info.iteritems()
            if title is not None]

def build1C(round_name, round_info):
    puzzle_titles = unordered_titles(round_info)
    #print puzzle_titles
    return []

if __name__ == '__main__':
    rounds = dbfetch.with_db(getRoundPuzzlesWithPostProd)
    # build some indexes
    builders = {
        'A Circus Line': build1S,
        'Betsy Johnson': build1C
    }
    ignorable = []
    for round_name, round_info in rounds.iteritems():
        if round_name in builders:
            ig = builders[round_name](round_name, round_info)
            ignorable += ig
    print ignorable
