#!/usr/bin/python
from __future__ import with_statement
import importpuzz as puzztools
import itertools
import png
import sys

def mkimagemap(filename, url, alt_text):
    maxx,minx,maxy,miny = [None] * 4
    with open(filename, 'rb') as f:
        width, height, pixels, metadata = png.Reader(file=f).asRGBA8()
    # flatten row
    def row(y, row):
        x = 0
        try:
            while True:
                r = row.next()
                g = row.next()
                b = row.next()
                a = row.next()
                yield (x,y,(r,g,b,a))
                x += 1
        except StopIteration:
            return
    # flatten pixels
    p = itertools.chain.from_iterable(row(y,iter(r)) for y,r in
                                      itertools.izip(itertools.count(0),
                                                     pixels))
    opaque = list((x,y) for x,y,(r,g,b,a) in p if a > 10)
    maxx = max(x for x,y in opaque)
    minx = min(x for x,y in opaque)
    maxy = max(y for x,y in opaque)
    miny = min(y for x,y in opaque)
    #print width,'x',height
    #print minx,miny,'-',maxx,maxy
    print """<area shape="rect" coords="%d,%d,%d,%d" alt="%s" title="%s" href="%s" />"""\
          % (minx,miny,maxx,maxy,alt_text,alt_text,url)
    

if __name__ == '__main__':
    filename, puzzlename = sys.argv[1:]
    mkimagemap(filename, puzztools.canon(puzzlename)+'/', puzzlename)
