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
WEBDIR='web'

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

PONY_ORDER = {
    'Okla-Holmes-a!': ['Fluttershy', 'Granny Smith', 'Starsong',
                       'Coconut Cream', 'Melody', 'Desert Rose',
                       'Baby Sniffles'],
    'Mayan Fair Lady': ['Lofty', '4-Speed', 'Scootaloo', 'Sweetheart',
                        'Twinkle Twirl', 'Spitfire', 'Ember',
                        'Salty', 'Apple Bloom', 'Derpy Hooves',
                        'Princess Primrose'],
    'Phantom of the Operator': ['Baby Tic-Tac-Toe', 'Skywishes', 'Patch',
                                'Brightglow', 'Princess Royal Blue',
                                'Scoops', 'Masquerade', 'Flitter Flutter',
                                'Tink-a-Think-a-Too'],
}
def ordered_titles(round_info, pony_order):
    result = []
    for pony in pony_order:
        t = [title for (batch,p), title in round_info.iteritems()
             if p == pony]
        assert len(t) == 1
        result.append(pony if t[0] is None or ALL_PONIES else t[0])
    return result

# split into two columns
def two_columns(puzzle_titles):
    l = len(puzzle_titles)
    last = l // 2
    first = puzzle_titles[:(l-last)]
    second = puzzle_titles[(l-last):]
    return first, second

def jsEscape(s):
    return json.dumps(s)

def copy_dash_files(round_name, round_info):
    BASEDIR=os.path.join(WEBDIR, canon(round_name))
    # copy '-' files from ponies to non-ponies
    for (batch,pony),title in round_info.iteritems():
        if title is None: continue
        for filename in os.listdir(os.path.join(BASEDIR, canon(pony))):
            if filename.startswith('-'):
                shutil.copyfile(os.path.join(BASEDIR, canon(pony), filename),
                                os.path.join(BASEDIR, canon(title), filename))

def buildShow(round_name, round_info, split=4, ordered=False):
    BASEDIR=os.path.join(WEBDIR, canon(round_name))
    copy_dash_files(round_name, round_info)
    # build release.js file
    lines = []
    def add(s): lines.append(s)
    def addesc(s): add(jsEscape(s)+'+')

    if ordered:
        assert round_name in PONY_ORDER
        puzzle_titles = ordered_titles(round_info, PONY_ORDER[round_name])
    else:
        puzzle_titles = unordered_titles(round_info)

    # generate imagemap
    add("function imagemap() {")
    add("  return ''+")
    addesc('<img src="key.png" />')
    for pt in puzzle_titles:
        addesc('<img src="%s/-' % canon(pt))
        add('(puzzle_solved[%s]?"solved":"unsolved")+' % jsEscape(canon(pt)))
        addesc('.png" />')
    addesc('<img src="../1px.png" usemap="#map" style="z-index:99" />')

    addesc('<map name="map">')
    for pt in puzzle_titles:
        sqpt = smart_quotes(pt)
        # cached?
        cache_file = os.path.join(BASEDIR, canon(pt), '-map')
        if os.path.exists(cache_file):
            area = open(cache_file).read()
        else:
            print "Making image map for", pt
            area = mkimagemap(os.path.join(BASEDIR, canon(pt), '-unsolved.png'),
                              "{0}/", "{1}", split)
            with open(cache_file, 'w') as f:
                f.write(area)
        addesc(area.format(canon(pt), sqpt))
    addesc('</map>')
    add("'';")
    add("}")

    add('function puzzlelist() {');
    add('  return ""+');
    first, second = two_columns(puzzle_titles)
    for i in xrange(len(first)):
        addesc('<tr>')
        for pt,num in [ (first[i],i),
                        (second[i] if i<len(second) else None, i+len(first)) ]:
            if pt is None:
                continue
            if ordered:
                addesc('<td class="num">%d.</td>' % (num+1))
            addesc('<td><a href="%s/" class="' % canon(pt))
            add('(puzzle_solved[%s]?"solved":"unsolved")+'% jsEscape(canon(pt)))
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

if __name__ == '__main__':
    rounds = dbfetch.with_db(getRoundPuzzlesWithPostProd)
    # build some indexes
    builders = {
        'A Circus Line': (buildShow, {'ordered': False}),
        'Okla-Holmes-a!': (buildShow, {'ordered': True}),
        'Into the Woodstock': (buildShow, {'ordered': False}),
        'Mayan Fair Lady': (buildShow, {'ordered': True}),
        #'Phantom of the Operator': (buildShow, {'ordered': True}),
        'Ogre of La Mancha': (buildShow, {'ordered': False}),
    }
    ignorable = []
    for round_name, round_info in rounds.iteritems():
        if round_name in builders:
            build, kwargs = builders[round_name]
            ig = build(round_name, round_info, **kwargs)
            ignorable += ig
        else: print "SKIPPING", jsEscape(round_name)
    # write a solved.js file indicating which puzzles are written
    h = {}
    for round_name, round_info in rounds.iteritems():
        for (batch, pony), title in round_info.iteritems():
            if title is not None and not ALL_PONIES:
                h[canon(title)] = 1
    with open(os.path.join(WEBDIR, 'solved.js'), 'w') as f:
        print >> f, "// This file is written by the hunt-running software"
        print >> f, "var puzzle_solved =", jsEscape(h),";"
    print ignorable
