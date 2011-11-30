#!/usr/bin/python
from __future__ import with_statement
import importpuzz as puzztools
import itertools
import png
import sys

def transpose(points):
    return [(y,x) for (x,y) in points]

def dividey(points):
    a,b,amt = dividex(transpose(points))
    return transpose(a), transpose(b),amt

def dividex(points):
    # move x just enough to capture another point
    x1=min(x for x,y in points)
    x2=max(x for x,y in points)
    if x1==x2:
        return points,[],0
    while True:
        x1p = min(x for x,y in points if x>x1)
        x2p = max(x for x,y in points if x<x2)
        if x1p == x2 and x1 == x2p:
            return [(x,y) for (x,y) in points if x<x2], \
                   [(x,y) for (x,y) in points if x>x1], \
                   (x1p - x1)
        if (x1p-x1) < (x2-x2p):
            x1 = x1p
        else:
            x2 = x2p

def divide(points):
    x1,x2,xamt = dividex(points)
    y1,y2,yamt = dividey(points)
    if xamt>1 and xamt > yamt:
        return x1,x2,xamt
    elif yamt>1:
        return y1,y2,yamt
    else:
        return points,[],0

def area_elem(points, url, alt_text):
    maxx = max(x for x,y in points)
    minx = min(x for x,y in points)
    maxy = max(y for x,y in points)
    miny = min(y for x,y in points)
    return """<area shape="rect" coords="%d,%d,%d,%d" alt="%s" title="%s" href="%s" />"""\
          % (minx,miny,maxx,maxy,alt_text,alt_text,url)

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
    # now divide up the connected components
    # (simplified algorithm, divides up along horiz/vert lines)
    inp = [opaque]
    outp = []
    while inp:
        pp,inp = inp[0], inp[1:]
        a,b,amt = divide(pp)
        #print "amt", amt, "len", len(a), len(b)
        if amt == 0:
            outp.append(pp)
        else:
            if len(a) > 10:
                inp.append(a)
            if len(b) > 10:
                inp.append(b)
    for p in outp:
        print area_elem(p, url, alt_text)

if __name__ == '__main__':
    filename, puzzlename = sys.argv[1:]
    mkimagemap(filename, puzztools.canon(puzzlename)+'/', puzzlename)
