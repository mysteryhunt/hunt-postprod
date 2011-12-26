// load framework.  This is boilerplate for all appengine puzzles.
this.SERVER_BASE = this.SERVER_BASE || 'https://mysteryhunt2012.appspot.com';
this.PUZZLE_NAME = 'winning_conditions';
this.PUZZLE_AUTH = '1de3ba785fe40a5d86d1ef63e84f4442a65726b1';

var server;
function framework_ready(_server) {
    server = _server;
    $("#form input").removeAttr("disabled");
    start_over();
}

// puzzle code starts here.
function process_guess(data) {
    var guess = $("#guess");
    guess.removeAttr("disabled");
    guess.val("");
    guess.focus();

    var results = $("#results");
    results.append("<tr class='spacer'><td colspan='2'>&nbsp;</td></tr>");

    if (data.rule) {
        $("#num").html("Guess " + (data.attempts + 1) + ":");
        results.append('<tr class="error"><td class="guess">Guess ' + data.attempts + ': <b>' + data.guess + '</b></td><td>Failed due to Rule ' + data.rule + '/10: ' + data.message + '</td></tr>');

        if (data.violations == 2) {
            results.append('<tr class="warning"><td class="guess">&nbsp;</td><td>Warning: This is your second violation of Rule ' + data.rule + '. If you break Rule ' + data.rule + ' one more time, the game will be over.</td></tr>');
        }
        else if (data.violations == 3) {
            results.append('<tr class="warning"><td class="guess">&nbsp;</td><td>This is your third violation of Rule ' + data.rule + '. <b>GAME OVER!</b></td></tr>');
            game_over();
        }
    }
    else {
        results.append('<tr class="winner"><td>&nbsp;</td><td>' + data.message + '</td></tr>');
        game_over();
    }
    $("#guess")[0].scrollIntoView(false);
}

function submit_guess() {
    var guess = $("#guess");
    if (!guess.val()) return; // ignore blank guesses
    guess.attr("disabled", true);
    server.query({'guess': guess.val()}, process_guess);
}

function start_over() {
    server.clear();
    $("#results").html("");
    $("#num").html("Guess 1:");
    $(".during_game").removeAttr("disabled");
    $("#guess").focus();
}

function game_over() {
    $("#num").html("");
    $(".during_game").attr("disabled", true);
}

$.getScript(this.SERVER_BASE);
