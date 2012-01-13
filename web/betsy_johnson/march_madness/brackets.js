this.SERVER_BASE = this.SERVER_BASE || 'https://mysteryhunt2012.appspot.com';
this.PUZZLE_NAME = "march_madness";
this.PUZZLE_AUTH = "96be150d4b66374215f989c37fea3ea2058ce553";

var Game = function(id, parent, bracketNum, attachmentNode) {
    this.parent     = parent;
    this.teams  = [null, null];
    this.id = id;
    this.winner = null;
    this.fixed  = false;
    this.bracketNum = bracketNum;
    this.teamsdivs  = [];
    this.gameContainer = attachmentNode;

    for (var idex = 0; idex < 2; ++idex)
    {
        var self    = this;
        this.teamsdivs[idex]   = document.createElement("div");
        $(this.teamsdivs[idex]).addClass("team mutable loc"+idex);
        var span = document.createElement("span");
        $(span).addClass("name_container");
        this.teamsdivs[idex].appendChild(span);

        function setListener(jdex)
        {
            self.teamsdivs[idex].addEventListener("click",
                                                  function(event)
                                                  {
                                                    self.toggleWinner(jdex);
                                                  },
                                                  false);
        }

        setListener(idex);

        attachmentNode.appendChild(this.teamsdivs[idex]);
    }
};

Game.prototype = {
    toggleWinner: function(index)
    {
        if (this.fixed) return;
        if (!this.teams[index]) return;
        if (!this.teams[index^1]) return;

        if (this.winner == index)
        {
                this.winner = null;
                this.parent.unsetTeam(this.teams[index], this.bracketNum & 1, this.fixed);
                $(this.teamsdivs[index]).removeClass("selected");
        }
        else
        {
            if (this.winner !== null)
            {
                this.parent.unsetTeam(this.teams[this.winner], this.bracketNum & 1);
            }

            this.winner = index;
            this.parent.setTeam(this.teams[index], this.bracketNum & 1, this.fixed);
            $(this.teamsdivs[index]).addClass("selected");
            $(this.teamsdivs[index ^ 1]).removeClass("selected");
        }
        this.parent.checkMutability();
    },

    checkMutability: function() {
        var mutable = (this.teams[0] && this.teams[1] && !this.fixed);
        $(this.gameContainer).toggleClass("mutable", !!mutable);
    },


    fixWinner:  function(index)
    {
        var self    = this;
        if (this.winner !== index) this.toggleWinner(index);
        this.fixed  = true;

        $(this.teamsdivs[0]).addClass("fixed");
        $(this.teamsdivs[1]).addClass("fixed");
        this.checkMutability();

        this.parent.setTeam(this.teams[index], this.bracketNum & 1, this.fixed);
    },

    setTeam:    function(teamName, index, fixedfont)
    {
        this.teams[index]   = teamName;
        this.teamsdivs[index].firstChild.innerHTML = teamName;

        $(this.teamsdivs[index]).toggleClass("fixed-font", !!fixedfont);
    },

    unsetTeam:  function(teamName, index)
    {
        if (this.winner != null)
        {
            this.toggleWinner(this.winner);
        }

        this.teams[index]   = null;
        this.teamsdivs[index].firstChild.innerHTML  = "";
    }
};

var Bracket = function(games, round5set)
{
    this.games  = games;
    this.round5set = round5set;
    // sort list of games
    this.sortedGames = [];
    for (var id in games) {
        this.sortedGames.push(id);
    }
    this.sortedGames.sort();
}

Bracket.prototype   =
{
    checkFilledBracket: function() {
        checkFilledBracket(this.round5set);
    },
    isFilled: function() {
        return this.round5set[0] && this.round5set[1] &&
            this.round5set[2] && this.round5set[3];
    },
    to_string:  function()
    {
        var winners = {};

        for (var idex = 0; idex < this.games.length; ++idex)
        {
            winners[this.games[idex].id] = this.games[idex].winner;
        }

        return JSON.stringify(winners);
    }
}

var clock_timer = null;

/* Width calculations:
  Games currently have width 120
  Games currently have height 40
  Vertical space between round 2 games is 20; subsequent rounds should be vertically aligned to match their child games
  Horizontal space between rounds is 50
*/
var game_width = 130;
var game_height = 40;
var horizontal_space = 50;
var vertical_space = 20;
var extra_vertical_space = 130;
//((130 + 50) * 3 + 720) = 180 * 3 + 720 = 1260
function pad(width, n) {
    var r = '' + n;
    while (r.length < width) {
        r = '0' + r;
    }
    return r;
}
function    addGame(games, round, index)
{
    var id  = "round" + round + "_game" + pad(2, index);
    var parent_id   = "round" + (round + 1) + "_game" + pad(2, (index >> 1));
    var parent_node = document.getElementById(id);

    if (round > 0)
    {
        var top = 0;
        var left = 0;

        if (index < (1 << (5 - round)))
        {
            top   = (((game_height + vertical_space) * (index + 1) - 30) << (round - 1)) + extra_vertical_space;
            left  = (game_width + horizontal_space) * (round - 1) + 10;
        }
        else
        {
            top   = (game_height + vertical_space) * ((((index - (1 << (5 - round))) + 1)) << (round - 1)) - (30 << (round - 1)) + extra_vertical_space;
            left = (game_width + horizontal_space) * (4 - round) + 720;
        }

        if (((index >> (4 - round)) & 1) == 1)
        {
            top += vertical_space;
        }

        parent_node.style.top = "" + top + "px";
        parent_node.style.left = "" + left + "px";

        if (round < 4)
        {
            var connector_node  = document.getElementById("round" + round + "_index" + (index >> 1) + "_connector");

            if (index < (1 << (5 - round)))
            {
                top   = (game_height + vertical_space) * ((index + 1) << (round - 1)) - (90 << (round - 1)) + extra_vertical_space + 25;
                left  = (game_width + horizontal_space) * (round - 1) + 147;
            }
            else
            {
                top   = (game_height + vertical_space) * (((index - (1 << (5 - round))) + 1) << (round - 1)) - (90 << (round - 1)) + extra_vertical_space + 25;
                left  = (game_width + horizontal_space) * (4 - round) + 677;
            }

            if (((index >> (4 - round)) & 1) == 1)
            {
                top += vertical_space;
            }

			var height_val = 60 << (round - 1);

            connector_node.style.top = "" + top + "px";
            connector_node.style.left = "" + left + "px";
            connector_node.style.height = "" + height_val + "px";
        }
    }

    games[id]  = new Game(id, games[parent_id], index, parent_node);
}

function checkFilledBracket(round5set)
{
    var ok = true;
    if (round5set[0] || round5set[1] || round5set[2] || round5set[3]) {
        $('#complete_message').html('');
    } else {
        $('#complete_message').html('At least one regional must be complete before submission.');
        ok = false;
    }
    if (ok) {
        $('#submitter button').removeAttr('disabled');
    } else {
        $('#submitter button').attr('disabled', 'disabled');
    }
    $('#server_message').html('');
}

function mkround5(round5set, r5i) {
    return {
    setTeam: function(name, index, fixedfont)
    {
        //console.assert(index==0);
        var teamdiv = $("#round5_game"+pad(2,r5i)+"_team");
        teamdiv.html(name);
        round5set[r5i] = true;
        checkFilledBracket(round5set);

        teamdiv.toggleClass("fixed-font", !!fixedfont);
    },
    unsetTeam: function(name, index)
    {
        var teamdiv = $("#round5_game"+pad(2,r5i)+"_team");
        teamdiv.html('');
        round5set[r5i] = false;
        checkFilledBracket(round5set);
    },
    checkMutability: function() {
        /* do nothing */
    },
    };
}

function init_games() {
    var games   = {};
    for (var round = 4; round > 0; --round) {
        for (var idex = 0; idex < (1 << (6 - round)); ++idex) {
            addGame(games, round, idex);
        }
    }

    addGame(games, 0, 7);
    addGame(games, 0, 24);
    addGame(games, 0, 54);
    addGame(games, 0, 42);

    var round5set = [false, false, false, false];
    games["round4_game00"].parent = mkround5(round5set, 0);
    games["round4_game01"].parent = mkround5(round5set, 1);
    games["round4_game02"].parent = mkround5(round5set, 2);
    games["round4_game03"].parent = mkround5(round5set, 3);
    return [games, round5set];
}

function init_bracket(games, round5set) {
    var team_names  = {
    /* Round 0 */
    "round0_game07":  ["Northeastern", "Texas"],
    "round0_game24":  ["IPFW", "Portland State"],
    "round0_game54":  ["Montana", "Southern Utah"],
    "round0_game42":  ["Georgia Tech", "Tulsa"],

    /* Round 1 */
    /* Division 1 */
    "round1_game00":  ["Albany", "Drexel"],
    "round1_game01":  ["Rhode Island", "Santa Clara"],
    "round1_game02":  ["Florida A&M", "Jacksonville State"],
    "round1_game03":  ["Princeton"],
    "round1_game04":  ["Arkansas", "VCU"],
    "round1_game05":  ["Coastal Carolina", "SIU-Carbondale"],
    "round1_game06":  ["Delaware", "Idaho State"],
    "round1_game07":  ["SMU", "South Dakota State"],

    /* Division 2 */
    "round1_game08":  ["Austin Peay", "Tennessee"],
    "round1_game09":  ["Duke", "Oklahoma"],
    "round1_game10":  ["Cleveland State", "GWU"],
    "round1_game11":  ["La Salle", "San Jose State"],
    "round1_game12":  [null, "Xavier"],
    "round1_game13":  ["Manhattan", "UALR"],
    "round1_game14":  ["Long Beach State", "San Diego State"],
    "round1_game15":  ["Massachusetts", "Notre Dame"],

    /* Division 3 */
    "round1_game16":  ["Alabama", "Loyola (Maryland)"],
    "round1_game17":  ["Middle Tennessee", "North Texas"],
    "round1_game18":  ["Army", "Rutgers"],
    "round1_game19":  ["Cornell", "Dartmouth"],
    "round1_game20":  ["DePaul", "Evansville"],
    "round1_game21":  [null, "Tulane"],
    "round1_game22":  ["LIU", "Minnesota"],
    "round1_game23":  ["Stanford", "Syracuse"],

    /* Division 4 */
    "round1_game24":  ["Alabama State", "Toledo"],
    "round1_game25":  ["Stony Brook", "UAB"],
    "round1_game26":  ["Marshall", "Ohio State"],
    "round1_game27":  [null, "Virginia"],
    "round1_game28":  ["Arkansas State", "South Florida"],
    "round1_game29":  ["Montana State", "Oakland"],
    "round1_game30":  ["Buffalo", "Saint Joseph's"],
    "round1_game31":  ["Sacramento State", "UT Arlington"],
    };
    for (var id in team_names) {
        games[id].setTeam(team_names[id][0], 0, true);
        games[id].setTeam(team_names[id][1], 1, true);
    }

    for (var id in games) {
        games[id].checkMutability();
    }

    return new Bracket(games, round5set);
}

var bracket  = init_bracket.apply(this, init_games());
var clock = document.getElementById("clock");

function set_clock(seconds)
{
    if (seconds < 0) { seconds = 0; }
    var time_str =
        pad(2, Math.floor(seconds / 60)) +
        pad(2, Math.ceil(seconds) % 60);

    for (var i=0; i<time_str.length; i++)
        $('#clock'+i).attr('src', time_str[i]+'.jpg');

    if (seconds > 0)
    {
        $('#clock').removeClass('zero');
        clock_timer = setTimeout(function(){set_clock(seconds - 1);}, 1000);
    }
    else
    {
        $('#clock').addClass('zero');
        clock_timer = null;
        bracket.checkFilledBracket();
    }
}

function set_state(state)
{
    $('body').removeClass('loading');

    if (state.clock !== undefined)
    {
        if (clock_timer)
        {
            clearTimeout(clock_timer);
        }
        set_clock(state.clock);
    }

    if (state.winners) {
        for (var i=0; i<state.winners.length; i++) {
            var winner = state.winners[i];
            var game = bracket.games[winner.id];
            if (winner.fixed) {
                game.fixWinner(winner.winner);
            } else if (game.winner !== winner.winner) {
                game.toggleWinner(winner.winner);
            }
        }
    }
    bracket.checkFilledBracket(); // ...and clock

    if (state.error) {
        $('#server_message').html(state.error);
    }
    if (state.message) {
        $('#bracket').hide();
        $('#message2').html(state.message);
    }
}

function get_winner(round, game)
{
  if (game < 10) { game = "0" + game; }
  winner = bracket.games["round" + round + "_game" + game].winner;
  if (winner !== null) {
    return winner;
  } else {
     return "9";
  }
}

function get_state()
{
    var retVal  = [];

    for (var region=0; region<4; region++) {
        region_result = "";
        for (var i=0; i<8; i++) {
          game = 8*region + i;
          region_result += get_winner(1, game);
        }
        for (var i=0; i<4; i++) {
          game = 4*region + i;
          region_result += get_winner(2, game);
        }
        for (var i=0; i<2; i++) {
          game = 2*region + i;
          region_result += get_winner(3, game);
        }
        for (var i=0; i<1; i++) {
          game = 1*region + i;
          region_result += get_winner(4, game);
        }
        
        retVal.push({r:region, result:region_result});
    }

    return {winners:retVal};
}

function framework_ready(_server) {
    $("#submitter button").click(function(event) {
        if (clock_timer) {
            set_state({error: "Too soon since your last submission."});
            return;
        }
        var c = "Are you sure you want to submit this bracket?";
        if (!bracket.isFilled()) {
            c += "  Your bracket is not complete.";
        }
        if (confirm(c))
        {
            $('body').addClass('loading');
            _server.query(get_state(), set_state);
        }
    });
    _server.query("reset", set_state);
}

$.getScript(this.SERVER_BASE);
