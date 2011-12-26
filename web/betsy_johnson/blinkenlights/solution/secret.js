// this is the bit which should be moved to a server

// IF YOU ARE TEST SOLVING, DON'T LOOK AT THIS.

var DEBUG=false;
function dlog() {
    if (!DEBUG) return;
    console.log.apply(console, arguments);
}

var n = null;
var MAP = {
    0: [ n, n, n, n],
    1: [ 8, n, n, n],
    2: [ n, 0, n, n],
    3: [10, 5, n, n],
    4: [ n, n, 1, n],
    5: [ 4, n, 1, n],
    6: [ n,12, 2, n],
    7: [14, 5, 3, n],
    8: [ n, n, n, 3],
    9: [14, n, n, 3],
    10:[ n, 9, n, 3],
    11:[14,13, n, 3],
    12:[ n, n,11, 5],
    13:[12, n,11, 5],
    14:[ n,12,10, 6],
    15:[14,13,11, 7]
};
var DEPTH = [ [ 0 ], // 0
	      [ 2 ], // 1
	      [ 6 ], // 2
	      [ 14 ], // 3
	      [ 11, 9, 7, 15 ], // 4
	      [ 13, 12, 10 ], // 5
	      [ 3 ], // 6
	      [ 8 ], // 7
	      [ 1 ], // 8
	      [ 5, 4 ] // 9
	    ];

function rev(a) {
    var l = a.length;
    var r = [];
    for (var i=0; i<l; i++) {
	r[i] = a[(l-1)-i];
    }
    return r;
}
// fixup R4
function _fixR4(R4) {
    var d = [], nR4 = [];
    for (var i=0; i<DEPTH.length; i++) { d[i] = 0; }
    for (var i=0; i<R4.length; i++) {
	var groupdepth = R4[i];
	var depthchoices = DEPTH[groupdepth];
	nR4[i] = depthchoices[d[groupdepth]];
	d[groupdepth] += 1;
	if (d[groupdepth] >= depthchoices.length) {
	    d[groupdepth] = 0;
	}
    }
    return nR4;
}

var RESET = [ rev(_fixR4([ 8, 8, 8, 8,
			   8, 8, 3, 9,
			   8, 9, 8, 8,
			   4, 5, 6, 8,
			   //
			   9, 9, 9, 3,
			   4, 5, 4, 3,
			   4, 4, 4, 4,
			   5, 5, 5, 5,
			   //
			   9, 9, 9, 8,
			   5, 5, 5, 6,
			   6, 7, 9, 9,
			   9, 1, 9, 9,
			   //
			   5, 5, 5, 2,
			   9, 1, 9, 9,
			   5, 5, 5, 8,
			   5, 5, 5, 7 ])),
	      // R16:
	      rev([ 12, 4, 12, 15,
		    12, 12, 15, 12,
		    12, 12, 3, 8,
		    12, 8, 12, 12 ]),
	      // R64:
	      rev([ 1, 12, 12, 8 ]),
	      // R256:
	      [ 12 ] ];

function bits2num(bits) {
    return 1*bits[0] + 2*bits[1] + 4*bits[2] + 8*bits[3];
}
function num2bits(num) {
    function f(x) { return x ? 1 : 0; }
    return [ f(num&1), f(num&2), f(num&4), f(num&8) ];
}
function anybits(bits) {
    for (var i=0; i<bits.length; i++) {
	if (bits[i]) { return 1; }
    }
    return 0;
}

function initialState() {
    var state = { b: expandReset(64, 0), c: zeros(16) };
    return letters(state);
}

function zeros(numzeros) {
    var r = [];
    for (var i=0; i<numzeros; i++) {
	r[i] = 0;
    }
    return r;
}
function expandReset(bitsize, group) {
    var level = 0;
    for (var bs = 1; bs < bitsize; bs*=4) {
	level += 1;
    }
    var r = num2bits(RESET[level][group]);
    dlog("expanding group", group, "of bitsize", bitsize,":",r);
    var expanded;
    if (level == 0) {
	expanded = r;
    } else {
	expanded = [];
	for (var i=0; i<4; i++) {
	    var subr = r[i] ?
		expandReset(bitsize/4, i+(group*4)) :
		zeros(bitsize);
	    expanded.push.apply(expanded, subr);
	}
    }
    dlog("expanded:", 4*bitsize, expanded.length, expanded);
    return expanded;
}

function letters(state) {
    // for every 8 bits, return one letter of clue phrase
    var answer = "Answer:PluralizedLastWordOfTitle";
    var i,j;
    var result="";
    for (i=0, j=0; i+8 <= state.b.length; i+=8, j+=1) {
	if (!anybits(state.b.slice(i, i+8))) {
	    result = "_" + result;
	} else {
	    result = answer[(answer.length-1)-j] + result;
	}
    }
    state.m = result;
    return state;
}

function updateState(state, which) {
    var new_state = { b: state.b.slice(0), c: state.c.slice(0) };
    if (!new_state.b[which]) return state;

    dlog("Updating after toggling", which);
    new_state.b[which] = 0;
    new_state.c[Math.floor(which/16)] += 1;

    for (var bitsize=1 ; bitsize*4 <= 256; bitsize*=4) {
	var groupsize = bitsize*4;

	var start = Math.floor(which/groupsize) * groupsize;
	var bit   = Math.floor(which/bitsize) % 4;
	var group = [];
	for (var i=0; i<4; i++) {
	    group[i] = anybits(state.b.slice(start + i*bitsize,
					     start + (i+1)*bitsize));
	}
	dlog("Level", bitsize, "Group", group,
	     "bits2num", bits2num(group), "Bit", bit);
	var ngroup = num2bits(MAP[bits2num(group)][bit]);
	dlog("Result", ngroup);
	// look for 0->1 transitions.
	for (var i=0; i<4; i++) {
	    if (group[i]==0 && ngroup[i]==1) {
		dlog("Bit", i, "turned on");
		var expanded = (bitsize==1) ? [1] :
		    expandReset(bitsize/4, (start/groupsize)*4 + i);
		dlog("Expanded", expanded, bitsize/4, (start/groupsize)*4 + i);
		// transfer these to the state vector
		for (var j=0; j<expanded.length; j++) {
		    new_state.b[start + i*bitsize + j] = expanded[j];
		}
	    }
	}
	if (bits2num(ngroup) != 0) break; // done!
    }
    return letters(new_state);
}

function FakeServer() {
    this.state = initialState();
}
FakeServer.prototype.query = function(args, callback) {
    if (typeof(args) !== 'number') {
	this.state = initialState();
    } else {
	this.state = updateState(this.state, args);
    }
    // unparse.
    var result = {a:'', b:[], m: this.state.m };
    for (var i=0; i<this.state.b.length; i++) {
	result.a += (this.state.b[i] ? '1' : '0');
    }
    for (var i=0; i<this.state.c.length; i++) {
	var s = this.state.c[i].toString(2);
	while (s.length < 8) { s = '0' + s; }
	// NOW REVERSE
	var ss='';
	for (var j=0; j<s.length; j++) {
	    ss = s[j] + ss;
	}
	result.b[i] = ss;
    }
    callback(result)
};
FakeServer.prototype.clear = function() {
    this.state = initialState();
}

framework_ready(new FakeServer());
