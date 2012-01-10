this.SERVER_BASE = this.SERVER_BASE || 'https://mysteryhunt2012.appspot.com';
this.PUZZLE_NAME = "twenty_questions";
this.PUZZLE_AUTH = "467982318ae425c3ee4ea6a4dcc6a1a04abe0771";

var start;
var deadline;

function countDown() {
  var remaining = deadline - Date.now();
  if (remaining <= 0) {
    window.location.reload()
  } else {
    var elem = document.getElementById("delay");
    elem.textContent = Math.round(remaining / 1000);
  }
}

function startDelay(delay) {
  var elem = document.getElementById("delay");
  elem.textContent = delay;
  start = Date.now();
  deadline = start + (delay * 1000);
  window.setInterval(countDown, 1000);
}

function showHide() {
  var l = document.getElementById("pl");
  var n = document.getElementById("pn");
  if (n.style.display == "none") {
    l.textContent = "Hide previous secret numbers";
    n.style.display = "block";
  } else {
    l.textContent = "Show previous secret numbers";
    n.style.display = "none";
  }
}

var qid1;
var qid2;

function callback(data) {
  // Hide everything
  $('#lockout').hide();
  $('#correct').hide();
  $('#completely_done').hide();
  $('#correct2').hide();
  $('#puzzle').hide();
  $('#answer_div').hide();
  $('#last_guess_div').hide();
  $('#error_div').hide();
  $('#pl').hide();
  $('#pn').hide();

  // Unhide correct UI based on puzzle state
  if (data['delay_secs']) {
    startDelay(data['delay_secs']);
    $('#lockout').show();
  } else if (data['correct']) {
    $('#correct_last_guess').text(data['last_guess']);
    $('#correct').show();
    if (data['completely_done']) {
      var number_html = "";
      for (var number in data['numbers']) {
        number_html += "" + data['numbers'][number] + "<br>";
      }
      $('#completely_done_numbers').html(number_html);
      $('#completely_done').show();
    } else {
      $('#correct2').show();
    }
  } else {
    $('#puzzle').show();
    $('#number').val("");
    if (data['answer']) {
      $('#question').text(data['question']);
      $('#answer').text(data['answer']);
      $('#answer_div').show();
    } else if (data['last_guess']) {
      $('#last_guess').text(data['last_guess']);
      $('#last_guess_div').show();
    }
    if (data['error']) {
      $('#error').text(data['error']);
      $('#error_div').show();
    }
    qid1 = data['questions'][0]['id'];
    $('#question_1').text(data['questions'][0]['description']);
    qid2 = data['questions'][1]['id'];
    $('#question_2').text(data['questions'][1]['description']);

    if (data['numbers']) {
      $('#pl').show();
      var number_html = "";
      for (var number in data['numbers']) {
        number_html += "" + data['numbers'][number] + "<br>";
      }
      $('#pn').html(number_html);
    }
  }
}

var server;

function framework_ready(_server) {
  server = _server;
  server.query({'cmd': 'get'}, callback);
}

function restart() {
  server.query({'cmd': 'restart'}, callback);
}

function next() {
  server.query({'cmd': 'next'}, callback);
}

function guess() {
  server.query({'cmd': 'guess', 'number': $('#number').val()}, callback);
}

function ask1() {
  server.query({'cmd': 'ask', 'qid': qid1}, callback);
}

function ask2() {
  server.query({'cmd': 'ask', 'qid': qid2}, callback);
}

$.getScript(this.SERVER_BASE);
