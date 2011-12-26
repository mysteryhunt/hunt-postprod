this.SERVER_BASE = this.SERVER_BASE || 'https://mysteryhunt2012.appspot.com';
this.PUZZLE_NAME = 'blinkenlights';
this.PUZZLE_AUTH = 'c82856c6407a2dd4f3cdaa8cefe0471f57477428';

// ---------------------------------------------------------------
var NUMLIGHTS=256;
var clickOne;

function to2X(n) {
    var result = n.toString(16);
    while (result.length < 2) {
        result = "0" + result;
    }
    return result.toUpperCase();
}
function mksome(i, num) {
    if (num == 1) {
        return "<span id='t"+to2X(i)+"'><a id='l"+to2X(i)+"' class='off' onclick='clickOne(0x"+to2X(i)+")' title='"+to2X(i)+"'></a></span>";
    } else {
        var half = num/2, r="";
        var wrap_span = (num==4 || num==16 || num==64 || num==256);

        if (wrap_span) { r += "<span class='level"+num+"'>"; }
        r += mksome(i + 1*half, half);
        r += mksome(i + 0*half, half);
        if (num==16) { r += "<span class='c' id='c"+to2X(i/16)+"'></span>"; }
        if (wrap_span) { r += "</span>"; }
        return r;
    }
}

function makeLights() {
    var el = document.getElementById("wrapper");
    var result = mksome(0, NUMLIGHTS);
    el.innerHTML = result;

    for (var i=0; i<16; i++) {
        var el = document.getElementById("c"+to2X(i));
        var r = "";
        for (var j=0; j<8; j++) {
            r = "<span id='cl"+to2X(i)+"_"+j+"' class='off'></span>" + r;
        }
        el.innerHTML = r;
    }
}
function makeMessage() {
    var el = document.getElementById("message");
    var r = "";
    for (var i=0; i<32; i++) {
        r += "<span id='m"+to2X(31-i)+"' class='unseen'>_</span>";
    }
    el.innerHTML = r;
}

function updateLights(state) {
    for (var i=0; i<state.a.length; i++) {
        var el = document.getElementById("l"+to2X(i));
        el.className = (state.a[i]=='0' ? "off" : "on");
    }
    for (var i=0; i<state.b.length; i++) {
        for (var j=0; j<8; j++) {
            var el = document.getElementById("cl"+to2X(i)+"_"+j);
            el.className = (state.b[i][j]=='0') ? "off" : "on";
        }
    }
}
function updateMessage(state) {
    for (var i=0; i<state.m.length; i++) {
        var j = (31-i);
        var el = document.getElementById("m"+to2X(j));
        if (state.m[i]!='_') {
            el.innerHTML = state.m[i];
        }
        el.className = (state.m[i]!='_') ? "seen" : "unseen";
    }
}

function framework_ready(server) {
    makeLights();
    makeMessage();
    var queue = [];

    clickOne = function(n) {
        // queue request if the server hasn't responded yet
        if (queue.length > 0) { queue.push(n); return; }
        if (document.getElementById("l"+to2X(n)).className!=="on") { return; }
        queue.push(n);
        server.query(n, update);
    };
    function update(state) {
        updateLights(state);
        updateMessage(state);
        queue.shift();
        // handle further queued requests, in order.
        if (queue.length > 0) {
            server.query(queue[0], update);
        }
    }
    queue.push(9999);
    server.query("reset", update);
}

$.getScript(this.SERVER_BASE);
