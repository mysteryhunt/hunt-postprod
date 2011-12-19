#!/usr/bin/python
"""Read in the file of pony fake names for puzzles and general SQL to stuff
this into the database."""
import csv
import sys

ponyMap = {}
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
    ponyMap[pony.strip()] = {
        'answer': answer.strip(),
        'reused': critics[int(reused)-1] if reused else None,
        'order': int(order) if order else None,
        'round': roundMap[round]
    }

longest = max(len(p) for p in ponyMap.iterkeys())

def emit_sql():
    print """
DROP TABLE IF EXISTS ponies;
CREATE TABLE ponies ( aid INT, name VARCHAR(%d) );
""" % longest

    for pony, info in ponyMap.iteritems():
        print """
INSERT INTO ponies (aid, name) SELECT answers.aid, "%s" FROM answers WHERE answers.answer = "%s";""" % (pony, info['answer'])

def emit_python():
    print """
#!/usr/bin/python
ROUNDS = %s
PONY_INFO = %s
""" % (repr([roundMap[r] for r in ['1 S', '1C', '2 S', '2C', '3 S', '3C', '4 S', '4C', '5 S', '5C', '6 S', '6C']]), repr(ponyMap))

if __name__ == '__main__':
    if len(sys.argv)>=2 and sys.argv[1] == 'sql':
        emit_sql()
    else:
        emit_python()
