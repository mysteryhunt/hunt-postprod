// this is the bit which is on a server for the actual hunt

// IF YOU ARE TEST SOLVING, DON'T LOOK AT THIS.
var DEBUG=false;
var PROVIDE_SOLUTION=false;

var ANSWERS = [{0: '110110110100110', 1: '110101100100101', 2: '101111010101000', 3: '101110110110111'}];
var SOLUTION = [
    /* givens */
    [{"id":"round0_game07","winner":1,"fixed":true},{"id":"round0_game24","winner":0,"fixed":true},{"id":"round0_game42","winner":0,"fixed":true},{"id":"round0_game54","winner":0,"fixed":true},{"id":"round1_game00","winner":1,"fixed":true},{"id":"round1_game01","winner":1,"fixed":true},{"id":"round1_game02","winner":0,"fixed":true},{"id":"round1_game05","winner":0,"fixed":true},{"id":"round1_game08","winner":1,"fixed":true},{"id":"round1_game09","winner":1,"fixed":true},{"id":"round1_game13","winner":1,"fixed":true},{"id":"round1_game14","winner":1,"fixed":true},{"id":"round1_game17","winner":0,"fixed":true},{"id":"round1_game18","winner":1,"fixed":true},{"id":"round1_game19","winner":1,"fixed":true},{"id":"round1_game22","winner":0,"fixed":true},{"id":"round1_game24","winner":1,"fixed":true},{"id":"round1_game26","winner":1,"fixed":true},{"id":"round1_game28","winner":1,"fixed":true},{"id":"round1_game29","winner":0,"fixed":true}],
    /* top-left */
    [{"id":"round1_game03","winner":1,"fixed":true},{"id":"round1_game04","winner":1,"fixed":true},{"id":"round1_game06","winner":1,"fixed":true},{"id":"round1_game07","winner":1,"fixed":true},{"id":"round2_game00","winner":0,"fixed":true},{"id":"round2_game01","winner":1,"fixed":true},{"id":"round2_game02","winner":0,"fixed":true},{"id":"round2_game03","winner":0,"fixed":true},{"id":"round3_game00","winner":1,"fixed":true},{"id":"round3_game01","winner":1,"fixed":true},{"id":"round4_game00","winner":0,"fixed":true}],
    /* bottom-left */
    [{"id":"round1_game10","winner":0,"fixed":true},{"id":"round1_game11","winner":1,"fixed":true},{"id":"round1_game12","winner":0,"fixed":true},{"id":"round1_game15","winner":0,"fixed":true},{"id":"round2_game04","winner":0,"fixed":true},{"id":"round2_game05","winner":1,"fixed":true},{"id":"round2_game06","winner":0,"fixed":true},{"id":"round2_game07","winner":0,"fixed":true},{"id":"round3_game02","winner":1,"fixed":true},{"id":"round3_game03","winner":0,"fixed":true},{"id":"round4_game01","winner":1,"fixed":true}],
    /* top-right */
    [{"id":"round1_game16","winner":1,"fixed":true},{"id":"round1_game20","winner":1,"fixed":true},{"id":"round1_game21","winner":1,"fixed":true},{"id":"round1_game23","winner":1,"fixed":true},{"id":"round2_game08","winner":0,"fixed":true},{"id":"round2_game09","winner":1,"fixed":true},{"id":"round2_game10","winner":0,"fixed":true},{"id":"round2_game11","winner":1,"fixed":true},{"id":"round3_game04","winner":0,"fixed":true},{"id":"round3_game05","winner":0,"fixed":true},{"id":"round4_game02","winner":0,"fixed":true}],
    /* bottom-right */
    [{"id":"round1_game25","winner":0,"fixed":true},{"id":"round1_game27","winner":1,"fixed":true},{"id":"round1_game30","winner":1,"fixed":true},{"id":"round1_game31","winner":1,"fixed":true},{"id":"round2_game12","winner":0,"fixed":true},{"id":"round2_game13","winner":1,"fixed":true},{"id":"round2_game14","winner":1,"fixed":true},{"id":"round2_game15","winner":0,"fixed":true},{"id":"round3_game06","winner":1,"fixed":true},{"id":"round3_game07","winner":1,"fixed":true},{"id":"round4_game03","winner":1,"fixed":true}]
];

var SECRET_MESSAGE = ""+
"<p>Congratulations on your correct prediction of all the winners through the Regional Finals!</p>"+
"<p>To win the contest, you&rsquo;ll now have to correctly predict the final scores of all three Final Four games.</p>"+
"<p>Submit your answer to this part of the contest through the normal &ldquo;Check Answer&rdquo; link.  Good luck!</p>"+
"<div id='finalbracket'>"+
"<div id='SemiFinalTeam1' class='finalteam'><span class='l'>Longhorns</span><span class='blank r'>___</span></div>"+
"<div id='SemiFinalTeam2' class='finalteam'><span class='l'>Mastodons</span><span class='blank r'>___</span></div>"+
"<div id='SemiFinalTeam3' class='finalteam'><span class='blank l'>___</span><span class='r'>Greyhounds</span></div>"+
"<div id='SemiFinalTeam4' class='finalteam'><span class='blank l'>___</span><span class='r'>Hawks</span></div>"+
"<div id='FinalTeam1' class='finalteam'><span class='blank r'>___</span></div>"+
"<div id='FinalTeam2' class='finalteam'><span class='blank l'>___</span></div>"+
"<div id='finalLeftConnectorVertical'>"+
"<div id='finalRightConnectorVertical'>"+
"</div></div>"+
"</div>"+
"<div class='ps-note'>"+
"P.S. A cute old lady walked by and told us that due to the changing of the guard from the rabbit to the dragon and the fact that all four teams in the Final Four are animals, it will be a piece of mooncake to foretell this year's Final Four results. She let us in on some of her divinations&hellip;"+
"<ul>"+
"  <li>The Greyhounds will win the championship game by 13 points.</li>"+
"  <li>The Greyhounds&rsquo; opponents in the championship game will score the same number of points as the Greyhounds themselves will score in their semifinal game.</li>"+
"  <li>All scores will be in the range 65&ndash;90.</li>"+
"  <li>The Longhorns&rsquo; score in their semifinal game will be the only score in the 70s. The Greyhounds&rsquo; score in the championship game will be the only score in the 80s.</li>"+
"  <li>The semifinal between the Greyhounds and the Hawks will go down to the wire and be decided by 1 point.</li>"+
"  <li>The scores for the 4 teams in the semifinal games will be multiples of 4 consecutive odd prime numbers.</li>"+
"</ul>"+
"</div>"+
    "";


function dump_unfixed() {
    var s = get_state();
    var r = [];
    for (var i=0; i<s.winners.length; i++) {
        if (!s.winners[i].fixed) r.push(s.winners[i]);
    }
    return JSON.stringify(r);
}

var DELAY=20/*minutes*/ * 60 * 1000;
if (DEBUG) DELAY=10*1000;

function FakeServer() {
    this.lastQuery = Date.now() - DELAY;
    this.known = SOLUTION[0]; // givens
    this.correct = [];
}
FakeServer.prototype.query = function(args, callback) {
    var reset = false, time_error = false;
    if (typeof(args)==="string" || !('winners' in args)) {
        this.clear();
        reset = true;
    } else if ((this.lastQuery + DELAY) > Date.now()) {
	time_error = true;
    } else {
        this.lastQuery = Date.now();
        /* check submission */
        var submitted = {};
        var knowns = [];
        for (var i=0; i<ANSWERS.length; i++) {
            if (args.winners[i].result = ANSWERS[i]) {
                /* copy correct part into knowns */
                for (var j=0; j<SOLUTION[i+1].length; j++) {
                    knowns.push(SOLUTION[i+1][j]);
                }
                this.correct[i+1] = true;
            }
        }
        this.known = knowns;
    }
    // debugging
    if (PROVIDE_SOLUTION) {
        this.known = [];
        for (var i=0; i<SOLUTION.length; i++) {
            for (var j=0; j<SOLUTION[i].length; j++) {
                var s = SOLUTION[i][j];
                this.known.push({id:s.id, winner:s.winner, fixed:!!(i==0)});
            }
        }
	this.lastQuery = 10*1000 + Date.now() - DELAY;
    }
    /* return fixed part */
    var time_left = (this.lastQuery + DELAY) - Date.now();
    if (time_left < 0) time_left = 0;
    var result = { winners: this.known, clock: Math.ceil(time_left/1000)};
    /* return messages */
    var m = [];
    for (var i=1; i<SOLUTION.length; i++)
        if (this.correct[i])
            m.push(''+i);
    if ((m.length+1) === SOLUTION.length)
        result.message = SECRET_MESSAGE;
    else if (m.length == 1)
        result.error = "Regional "+m[0]+" is correct.";
    else if (m.length > 1) {
        var last = m.pop();
        result.error = "Regionals "+m.join(', ')+(m.length>2?',':'')+
            " and "+last+" are correct.";
    } else if (m.length == 0 && !reset)
        result.error = "None of the four regionals are correct.";
    if (time_error)
	result.error = "Too soon since your last submission.";
    callback(result);
};
FakeServer.prototype.clear = function() {
};

framework_ready(new FakeServer());
