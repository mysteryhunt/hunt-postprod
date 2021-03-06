#!/usr/bin/python
from __future__ import with_statement
from __future__ import division
"""Query the database for completed puzzles and generate indexes."""
import dbfetch
from importpuzz import canon, smart_quotes
from mkimagemap import mkimagemap
from ponymap import ROUNDS, PONY_INFO
import hashlib
import json
import os, os.path
import shutil

ALL_PONIES=False # for testing; pretend no puzzles are in postprod
WEBDIR='web'

def getRoundPuzzlesWithPostProd(db):
    rinfo = dbfetch.db_select_all(db, """
SELECT rounds.name, ponies.name, answers.batch
FROM rounds, answers, answers_rounds, ponies
WHERE answers_rounds.aid = answers.aid AND rounds.rid = answers_rounds.rid
  AND  ponies.aid = answers.aid ORDER BY rounds.name;""")
    rounds = {}
    for round_name, pony_name, batch in rinfo:
        if PONY_INFO[pony_name]['is_meta']: continue
        rounds.setdefault(round_name, {})\
              .setdefault(pony_name,
                          { 'batch': batch, 'title': None })
        
    for pid in dbfetch.getPuzzlesWithPostProd(db):
        pinfo = dbfetch.db_select_one(db, """
SELECT rounds.name, puzzle_idea.title, ponies.name
FROM puzzle_idea, rounds, answers_rounds, answers, ponies WHERE
puzzle_idea.id = %s AND answers.pid=puzzle_idea.id
AND answers_rounds.aid = answers.aid
AND rounds.rid = answers_rounds.rid AND ponies.aid = answers.aid;""", pid)
        if pinfo is None: continue # hrm
        round_name, puzzle_title, pony_name = pinfo
        if PONY_INFO[pony_name]['is_meta']: continue
        rounds[round_name][pony_name]['title'] = puzzle_title

    # delete rounds which are not real
    for round_name in rounds.keys():
        if dbfetch.getRoundAnswer(db, round_name) is None or \
           round_name in ['Arbitrary Answer Puzzles']:
            del rounds[round_name]

    return rounds

# unordered rounds
def unordered_titles(round_info, batch):
    # case-insensitive alphabetic
    puzzle_titles = sorted([pony if info['title'] is None or ALL_PONIES
                                 else info['title']
                            for pony, info in round_info.iteritems()
                            if batch is None or info['batch']<=batch],
                           key=lambda s: s.lower())
    return puzzle_titles

def make_pony_order(round_name):
    ponies = [(info['order'], pony) for pony,info in PONY_INFO.iteritems()
              if info['round'] == round_name and not info['is_meta']]
    assert all((order is not None) for order,pony in ponies)
    ponies.sort() # by order!
    return [pony for order,pony in ponies]

PONY_ORDER = dict((round_name, make_pony_order(round_name)) for
                  round_name in ['Okla-Holmes-a!', 'Mayan Fair Lady',
                                 'Phantom of the Operator'])
PONY_ORDER['Sheila Sunshine'] = ['Starsong', 'Flitter Flutter', 'Pipsqueak',
                                 'Princess Royal Blue', 'Puzzlemint',
                                 '4-Speed', 'Twinkle Twirl', 'Locket',
                                 'Truly', 'Quarterback']
PONY_ORDER['Watson 2.0'] = ['Spitfire', 'Masquerade', 'Tink-a-Think-a-Too',
                            'Wysteria', 'Surprise', 'Cupcake', 'Brightglow',
                            'Baby Cuddles', 'Patch', 'Skywishes', 'Scoops',
                            'Apple Spice', 'Scootaloo', 'Princess Primrose',
                            'Starlight', 'Derpy Hooves', 'Lofty',
                            'Princess Tiffany', 'Thistle Whistle',
                            'Paradise', 'Clover Bloom', 'Baby Fifi',
                            'Baby Tic-Tac-Toe', 'Steamer']

def ordered_titles(round_info, pony_order, batch):
    result = []
    for pony in pony_order:
        title = round_info[pony]['title']
        if batch is None or round_info[pony]['batch'] <= batch:
            result.append(pony if title is None or ALL_PONIES else title)
        else:
            result.append(None) # unreleased puzzle
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
def htmlEscape(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

def copy_dash_files(round_name, round_info):
    BASEDIR=os.path.join(WEBDIR, canon(round_name))
    # copy '-' files from ponies to non-ponies
    for pony,info in round_info.iteritems():
        title = info['title']
        if title is None: continue
        if not os.path.isdir(os.path.join(BASEDIR, canon(title))):
            os.makedirs(os.path.join(BASEDIR, canon(title)))
        for filename in os.listdir(os.path.join(BASEDIR, canon(pony))):
            if filename.startswith('-'):
                shutil.copyfile(os.path.join(BASEDIR, canon(pony), filename),
                                os.path.join(BASEDIR, canon(title), filename))

def ignorable_ponies(round_name, round_info):
    return [os.path.join(canon(round_name), canon(pony))
            for pony,info in round_info.iteritems()
            if info['title'] is not None]

def imagemap(filename, title, split):
    # cached?
    cache_file = filename + ".map"
    if os.path.exists(cache_file):
        area = open(cache_file).read()
    else:
        print "Making image map for", title
        area = mkimagemap(filename, "{0}/", "{1}", split)
        with open(cache_file, 'w') as f:
            f.write(area)
    return area

def buildCritic(round_name, rinfo, batch, split=4, unified=False, ordered=False):
    BASEDIR=os.path.join(WEBDIR, canon(round_name))
    round_info = rinfo[round_name]
    # build release.js file
    lines = []
    def add(s): lines.append(s)
    def addesc(s): add(jsEscape(s)+'+')
    # two parts for critic index
    critic_puzzles = unordered_titles(round_info, None)
    critic_puzzles = [(title,round_name,None) for title in critic_puzzles]
    show_puzzles = [(info['round'], pony) for pony,info
                    in PONY_INFO.iteritems() if info['reused']==round_name
                    and not info['is_meta']]
    if ordered:
        show_puzzles.sort(key=lambda (_,pony): PONY_ORDER[round_name].index(pony))
    show_puzzles = [(pony,round,rinfo[round][pony]['title'])
                    for round,pony in show_puzzles]
    show_puzzles = [(pony if title is None or ALL_PONIES else title,
                     round, pony)
                    for pony,round,title in show_puzzles]
    if not ordered:
        show_puzzles.sort(key=lambda (s,_,__): s.lower())
    all_puzzles = show_puzzles + critic_puzzles
    if unified:
        assert not ordered
        all_puzzles.sort(key=lambda (s,_,__): s.lower())

    critic_released = set(unordered_titles(round_info, batch))
    def remove_unreleased(l):
        return [(title,round,pony) for title,round,pony in l
                if round != round_name or title in critic_released]
    if unified:
        # filter out unreleased puzzles
        assert not ordered
        all_puzzles = remove_unreleased(all_puzzles)
    elif not ordered:
        critic_puzzles = remove_unreleased(critic_puzzles)

    # ok, now we've got one or two lists to lay out.
    # generate imagemap
    add("function imagemap_%s() {" % canon(round_name))
    add("  return ''+")
    addesc('<img src="photo.png" />')
    i=1
    for pt,round,_ in all_puzzles:
        is_critic = (round == round_name)
        if is_critic:
            if pt not in critic_released: continue
            addesc('<img src="%s/-' % canon(pt))
        else:
            addesc('<img src="%d-' % i)
            i += 1
        add('(puzzle_solved[%s]?"solved":"unsolved")+' % jsEscape(canon(pt)))
        addesc('.png" />')
    addesc('<div class="paperclip"></div>')
    addesc('<img src="../1px.png" usemap="#map" style="z-index:99" />')

    addesc('<map name="map">')
    i=1
    for pt,round,_ in all_puzzles:
        is_critic = (round == round_name)
        sqpt = smart_quotes(htmlEscape(pt))
        if is_critic:
            if pt not in critic_released: continue
            filename = os.path.join(BASEDIR, canon(pt), '-unsolved.png')
            url = canon(pt)
        else:
            filename = os.path.join(BASEDIR, '%d-unsolved.png' % i)
            i+=1
            url = '../%s/%s' % (canon(round), canon(pt))
        area = imagemap(filename, pt, split)
        addesc(area.format(url, sqpt))
    addesc('</map>')
    add("'';")
    add("}")

    add('function puzzlelist_%s() {' % canon(round_name));
    add('  return ""+');
    first_table=True
    addesc('<table class="materials">')
    for plist in ([ all_puzzles ] if unified else
                  [ show_puzzles, critic_puzzles ]):
        first, second = two_columns(plist)
        for i in xrange(len(first)):
            if ordered and first_table:
                addesc('<tr class="n">')
            else:
                addesc('<tr>')
            for (pt,round,_),num in [ (first[i],i),
                            (second[i] if i<len(second) else (None,None,None),
                             i+len(first)) ]:
                if num >= len(plist): continue
                if ordered and first_table:
                    if round==round_name and pt not in critic_released:
                        addesc('<td></td>')
                    else:
                        addesc('<td class="num">%d.</td>' % (num+1))
                url = canon(pt) if round==round_name else \
                      '../%s/%s' % (canon(round), canon(pt))
                def ps():
                    add('(puzzle_solved[%s]?"solved":"unsolved")+' %
                        jsEscape(canon(pt)))
                if round==round_name and pt not in critic_released:
                    addesc('<td></td>')
                elif ordered and first_table:
                    addesc('<td><a href="%s/"><span class="%s ' % (url,canon(round)))
                    ps()
                    addesc('"></span>%s</a></td>' % smart_quotes(htmlEscape(pt)))
                else:
                    addesc('<td class="%s ' % canon(round))
                    ps()
                    addesc('"><a href="%s/"><span>%s</span></a></td>' %
                           (url, smart_quotes(htmlEscape(pt))))

            addesc('</tr>')
        if first_table and not unified:
            if ordered:
                addesc('</table><table class="materials">')
            addesc('<tr class="spacer"></tr>')
        first_table = False
    addesc('</table>')
    add("'';")
    add("}")

    # invoke
    add("function load_%s() {"
        % canon(round_name));
    add("document.getElementById('photo').innerHTML = imagemap_%s();"
        % canon(round_name))
    add("document.getElementById('materials').innerHTML = puzzlelist_%s();"
        % canon(round_name))
    add("}")

    # return this javascript fragment
    return '\n'.join(lines)


def buildShow(round_name, rinfo, batch, split=4, ordered=False):
    BASEDIR=os.path.join(WEBDIR, canon(round_name))
    round_info = rinfo[round_name]
    # build release.js file
    lines = []
    def add(s): lines.append(s)
    def addesc(s): add(jsEscape(s)+'+')

    if ordered:
        assert round_name in PONY_ORDER
        puzzle_titles = ordered_titles(round_info, PONY_ORDER[round_name],
                                       batch)
    else:
        puzzle_titles = unordered_titles(round_info, batch)

    # generate imagemap
    add("function imagemap_%s() {" % canon(round_name))
    add("  return ''+")
    addesc('<img src="key.png" />')
    for pt in puzzle_titles:
        if pt is None: continue
        addesc('<img src="%s/-' % canon(pt))
        add('(puzzle_solved[%s]?"solved":"unsolved")+' % jsEscape(canon(pt)))
        addesc('.png" />')
    addesc('<img src="../1px.png" usemap="#map" style="z-index:99" />')

    addesc('<map name="map">')
    for pt in puzzle_titles:
        if pt is None: continue
        sqpt = smart_quotes(htmlEscape(pt))
        area = imagemap(os.path.join(BASEDIR, canon(pt), '-unsolved.png'),
                        pt, split)
        addesc(area.format(canon(pt), sqpt))
    addesc('</map>')
    add("'';")
    add("}")

    add('function puzzlelist_%s() {' % canon(round_name));
    add('  return ""+');
    first, second = two_columns(puzzle_titles)
    for i in xrange(len(first)):
        addesc('<tr>')
        for pt,num in [ (first[i],i),
                        (second[i] if i<len(second) else None, i+len(first)) ]:
            if num >= len(puzzle_titles): continue
            if ordered:
                if pt is None:
                    addesc('<td class="num"></td>')
                else:
                    addesc('<td class="num">%d.</td>' % (num+1))
            addesc('<td>')
            if pt is not None:
                addesc('<a href="%s/" class="' % canon(pt))
                add('(puzzle_solved[%s]?"solved":"unsolved")+' %
                    jsEscape(canon(pt)))
                addesc('">%s</a>' % smart_quotes(htmlEscape(pt)))
            addesc('</td>')
        addesc('</tr>')
    add("'';")
    add("}")

    # invoke
    add("function load_%s() {"
        % canon(round_name));
    add("document.getElementById('index-image').innerHTML = imagemap_%s();"
        % canon(round_name))
    add("document.getElementById('puzzle-list').innerHTML = puzzlelist_%s();"
        % canon(round_name))
    add("}")

    # return this javascript fragment
    return '\n'.join(lines)

ROUND_BATCH = dict((info['round'],info['batch']) for pony,info in
                   PONY_INFO.iteritems() if info['is_meta'] is True)
ROUND_PONIES = dict((info['round'],pony) for pony,info in
                   PONY_INFO.iteritems() if info['is_meta'] is True)

def buildTopLevelRelease(batch, split=4):
    lines = []
    def add(s): lines.append(s)
    def addesc(s): add(jsEscape(s)+'+')
    # generate imagemap
    add("function imagemap_mainpage() {")
    add("  return ''+")
    addesc('<img src="mainpage.jpg" />')
    for round_name in ROUNDS:
        round_batch = ROUND_BATCH[round_name]
        if round_batch > batch: continue
        pony = ROUND_PONIES[round_name]
        ponyhash=hashlib.sha224(pony.strip()).hexdigest()
        addesc('<img src="%s/mainpage-overlay' % canon(round_name))
        add('(puzzle_solved[%s]?"":"-unsolved")+' % jsEscape(ponyhash))
        addesc('.png" />')
    addesc('<img src="1px.png" usemap="#map" style="z-index:99" />')

    addesc('<map name="map">')
    for round_name in ROUNDS:
        if ROUND_BATCH[round_name] > batch: continue
        sqr = smart_quotes(htmlEscape(round_name))
        area = imagemap(os.path.join(WEBDIR, canon(round_name),
                                     "mainpage-overlay.png"),
                        round_name, split)
        addesc(area.format(canon(round_name), sqr))
    addesc('</map>')
    add("'';");
    add("}")

    add('function puzzlelist_mainpage() {');
    add('  return ""+');
    addesc("<tr><th><h2>Shows</h2></th>")
    if batch > min(ROUND_BATCH.values()):
        addesc("<th><h2>Critics</h2>")
    addesc("</tr>");
    for i in xrange(0,len(ROUNDS),2):
        round_name = ROUNDS[i]
        if ROUND_BATCH[round_name] > batch:
            continue
        addesc('<tr><td><a href="%s/">%s</a></td>' %
               (canon(round_name), round_name))
        round_name = ROUNDS[i+1]
        if ROUND_BATCH[round_name] <= batch:
            addesc('<td><a href="%s/">%s</a></td>' %
                   (canon(round_name), round_name))
        addesc('</tr>')
    add("'';")
    add("}")
    
    # invoke
    add("function load_mainpage() {");
    add("document.getElementById('index-image').innerHTML = imagemap_mainpage();")
    add("document.getElementById('index-table').innerHTML = puzzlelist_mainpage();")
    add("}")

    # return this javascript fragment
    return '\n'.join(lines)

def buildLinks(batch):
    critic_map = dict((info['round'], info) for pony,info
                      in PONY_INFO.iteritems() if info['is_meta'])
    links={}
    for pony, info in PONY_INFO.iteritems():
        if info['reused'] is None: continue
        if info['batch'] > batch: continue
        critic = info['reused']
        critic_batch = critic_map[critic]['batch']
        if critic_batch > batch: continue
        ponyhash=hashlib.sha224(pony.strip()).hexdigest()
        links[ponyhash] = canon(critic)
    return 'this.puzzle_link_map = '+jsEscape(links)+';\n'

if __name__ == '__main__':
    rounds = dbfetch.with_db(getRoundPuzzlesWithPostProd)
    # build some indexes
    builders = {
        'A Circus Line': (buildShow, {'ordered': False}),
        'Okla-Holmes-a!': (buildShow, {'ordered': True}),
        'Into the Woodstock': (buildShow, {'ordered': False}),
        'Mayan Fair Lady': (buildShow, {'ordered': True}),
        'Phantom of the Operator': (buildShow, {'ordered': True}),
        'Ogre of La Mancha': (buildShow, {'ordered': False}),

        'Betsy Johnson': (buildCritic, {'unified':True}),
        'Charles Lutwidge Dodgson': (buildCritic, {'unified':True}),
        'William S. Bergman': (buildCritic, {}),
        'Ben Bitdiddle': (buildCritic, {}),
        'Sheila Sunshine': (buildCritic, {'ordered':True}),
        'Watson 2.0': (buildCritic, {'ordered': True}),
    }
    ignorable = []
    fragments = {}
    for round_name, round_info in rounds.iteritems():
        copy_dash_files(round_name, round_info)
        fragments[round_name] = {}
        if round_name in builders:
            build, kwargs = builders[round_name]
            batches = sorted(set(int(puzzle['batch']) for pony, puzzle in
                                 round_info.iteritems()))
            for batch in batches:
                f = build(round_name, rounds, batch, **kwargs)
                fragments[round_name][batch] = f
        else: print "SKIPPING", jsEscape(round_name)
        ignorable += ignorable_ponies(round_name, round_info)

    # round release pages
    fragments['mainpage'] = {}
    fragments['links'] = {}
    for round_name, round_batch in ROUND_BATCH.iteritems():
        f = buildTopLevelRelease(round_batch)
        fragments['mainpage'][round_batch] = f
        # critic links
        fragments['links'][round_batch] = buildLinks(round_batch)

    # ok, now assemble all the fragments into a coherent set of big honkin'
    # release files.
    all_batches = set()
    for round_name,round_info in rounds.iteritems():
        all_batches.update(int(puzzle['batch']) for pony,puzzle
                           in round_info.iteritems())
    all_batches.update(round_batch
                       for round_name,round_batch in ROUND_BATCH.iteritems())
    for batch in sorted(all_batches):
        with open(os.path.join(WEBDIR, 'release-%d.js' % batch), 'w') as fd:
            for name in sorted(fragments.keys()):
                if all(k > batch for k in fragments[name].keys()):
                    continue # this piece not released yet
                b = max(k for k in fragments[name].keys() if k <= batch)
                fd.write(fragments[name][b])
                fd.write('\n')

    shutil.copyfile(os.path.join(WEBDIR,
                                 'release-%d.js' % max(all_batches)),
                    os.path.join(WEBDIR, 'release.js'))

    # write a solved.js file indicating which puzzles are written
    h = {}
    for round_name, round_info in rounds.iteritems():
        for pony, info in round_info.iteritems():
            if info['title'] is not None and not ALL_PONIES:
                h[canon(info['title'])] = 1
    with open(os.path.join(WEBDIR, 'solved.js'), 'w') as f:
        print >> f, "// This file is written by the hunt-running software"
        print >> f, "var puzzle_solved =", jsEscape(h),";"
    print ignorable
