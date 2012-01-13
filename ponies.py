#!/usr/bin/python
"""Read in the file of pony fake names for puzzles and general SQL to stuff
this into the database."""
import csv
import re
import sys
from dbfetch import with_db, db_select_all

def getTitleAndBatch(db, pony):
    r = db_select_all(db, """
SELECT puzzle_idea.title, pstatus.name, rounds.name, answers.batch
FROM puzzle_idea, ponies, answers, pstatus, answers_rounds, rounds
WHERE ponies.name = %s AND answers.aid = ponies.aid AND
      answers_rounds.aid = answers.aid AND rounds.rid = answers_rounds.rid AND
      puzzle_idea.id = answers.pid AND
      puzzle_idea.pstatus = pstatus.id AND
      rounds.name != %s""", pony, "Arbitrary Answer Puzzles")
    assert len(r)<=1
    if len(r):
        title, status, round, batch = r[0]
        if batch is not None: batch = int(batch)
        if status.startswith('6c') or status.startswith('7'):
            return title, batch
        return None, batch
    return None, None

critics = ['Betsy Johnson', 'Charles Lutwidge Dodgson', 'William S. Bergman',
           'Ben Bitdiddle', 'Sheila Sunshine', 'Watson 2.0']
roundMap = {'1 S': 'A Circus Line',
            '2 S': 'Okla-Holmes-a!',
            '3 S': 'Into the Woodstock',
            '4 S': 'Mayan Fair Lady',
            '5 S': 'Phantom of the Operator',
            '6 S': 'Ogre of La Mancha' }
for i in xrange(len(critics)):
    roundMap['%dC' % (i+1)] = critics[i]

metaPonyMap = { '1 S': ('Beachcomber', 'ELEPHANT IN A TUTU', 1100),
                '1C':  ('Ripple', 'THROW GRAMMAR OUT THE WINDOW', 1200),
                '2 S': ('Sealight', 'CORNY CLUES', 2100),
                '2C':  ('Seashimmer', 'DRAWLING', 2200),
                '3 S': ('Seawinkle', 'RAPUNZEL HAS A FRO', 3100),
                '3C':  ('Surfrider', 'CAST HUGE TV ACTORS', 3200),
                '4 S': ('Sunshower', 'HARVEST HEARTS', 4100),
                '4C':  ('Waterlily', 'THE UNEXPECTED DESTRUCTION OF ELABORATELY ENGINEERED ARTIFACTS', 4200),
                '5 S': ('Wavedancer', 'DIAL TONE RECITATIVE', 5100),
                '5C':  ('Tiddlywink', 'WRECK A VW BUG', 5200),
                '6 S': ('Tralala', 'DONKEY ODS', 6100),
                '6C':  ('Zipzee', 'ALT F FOUR', 6200),
}

letterMap = {
'A Circus Line':'Brights Brightly',
'Okla-Holmes-a!':'Buttons',
'Into the Woodstock':'DJ P0n-3',
'Mayan Fair Lady':'Fancy Pants',
'Phantom of the Operator':'Fizzy',
'Ogre of La Mancha':'Galaxy'
}

def mkPonyMap(db):
 ponyMap = {}
 first=True
 ponyReader = csv.reader(open('fake-puzzle-names.csv'))
 for row in ponyReader:
    if first:
        # skip header
        first=False
        continue
    round,answer,reused,pony,order = row[:5]
    if reused: assert int(reused) <= len(critics)
    assert round in roundMap
    pony = pony.strip()
    title, batch = getTitleAndBatch(db, pony)
    if title is None: title = pony
    ponyMap[pony] = {
        'title': title,
        'answer': answer.strip(),
        'reused': critics[int(reused)-1] if reused else None,
        'order': int(order) if order else None,
        'round': roundMap[round],
        'is_meta': False,
        'is_critic_meta': False,
        'batch': batch
    }
 for idx,r in zip(xrange(99), metaPonyMap.keys()):
    pony,answer,batch = metaPonyMap[r]
    roundtitle, _ = getTitleAndBatch(db, pony)
    is_critic = "C-META" in roundtitle
    roundtitle = re.sub(r'\(.-META\)','',roundtitle).strip()
    assert roundtitle is not None
    ponyMap[pony.strip()] = {
        'title': "Investigator's Report" if is_critic else roundtitle,
        'answer': answer,
        'reused': None,
        'order': idx,
        'round': roundtitle,
        'is_meta': True,
        'batch': batch,
        'is_critic_meta': is_critic
        }
 for round_name,pony in letterMap.iteritems():
     pony = pony.strip()
     round_index = dict((v,k) for k,v in roundMap.items())[round_name]
     critic_index = round_index.replace(' S','C')
     critic_name = roundMap[critic_index]
     round_order = int(round_index.replace(' S',''))
     ponyMap[pony] = {
         'title': critic_name,
         'answer': None,
         'reused': None,
         'order': round_order,
         'round': 'Letters from Max and Leo',
         'is_meta': False,
         'batch': 9999,
         'is_critic_meta': False
     }
 return ponyMap

ponyMap = with_db(mkPonyMap)
longest = max(len(p) for p in ponyMap.iterkeys())

def emit_sql():
    from MySQLdb import escape_string
    print """
DROP TABLE IF EXISTS ponies;
CREATE TABLE ponies ( aid INT, name VARCHAR(%d) );
""" % longest

    for pony, info in ponyMap.iteritems():
        print """
INSERT INTO ponies (aid, name) SELECT answers.aid, "%s" FROM answers WHERE answers.answer = "%s";""" % (escape_string(pony), escape_string(info['answer']))

    print "CREATE INDEX pony_index ON ponies(aid);"
    print "CREATE INDEX pony_name_index ON ponies(name);"

def emit_python():
    print """
#!/usr/bin/python
ROUNDS = %s
PONY_INFO = %s
""".strip() % (repr([roundMap[r] for r in ['1 S', '1C', '2 S', '2C', '3 S', '3C', '4 S', '4C', '5 S', '5C', '6 S', '6C']]), repr(ponyMap))

if __name__ == '__main__':
    if len(sys.argv)>=2 and sys.argv[1] == 'sql':
        emit_sql()
    else:
        emit_python()
