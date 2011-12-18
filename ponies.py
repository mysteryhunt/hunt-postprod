#!/usr/bin/python
"""Read in the file of pony fake names for puzzles and general SQL to stuff
this into the database."""
import csv

ponyMap = {}

first=True
ponyReader = csv.reader(open('fake-puzzle-names.csv'))
for row in ponyReader:
    if first:
        # skip header
        first=False
        continue
    round,answer,reused,pony,order = row[:5]
    ponyMap[answer.strip()] = pony.strip()

longest = max(len(p) for p in ponyMap.itervalues())

print """
DROP TABLE IF EXISTS ponies;
CREATE TABLE ponies ( aid INT, name VARCHAR(%d) );
""" % longest

for answer, pony in ponyMap.iteritems():
    print """
INSERT INTO ponies (aid, name) SELECT answers.aid, "%s" FROM answers WHERE answers.answer = "%s";""" % (pony, answer)

