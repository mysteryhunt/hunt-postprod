this.SERVER_BASE = this.SERVER_BASE || 'https://mysteryhunt2012.appspot.com';
this.PUZZLE_NAME = 'hear_you';
this.PUZZLE_AUTH = "46b9e73a2622b87ec981ae5e2cc18e8e4dfd7cfc";

function framework_ready(server) {
    function update(state) {
	$('input').removeAttr('disabled');
	$('#team_name').text(state.team);
	$('#team_score').text(state.score);
	$('#startup').toggle(state.state==='startup');
	$('#pleasewait').toggle(state.state==='pleasewait');
	$('#sender').toggle(state.state==='sender');
	$('#receiver').toggle(state.state==='receiver');
	$('#score').toggle(state.state==='sender'||state.state==='receiver');
	$('#startup .error').text(state.error || '');
	$('#receiver .error').text(state.error || '');
	$('#sender .message').text(state.sender || '');
    }

    $('#startup form').submit(function() {
	$('#startup input').attr('disabled', 'disabled');
	server.query({'startup': $('#startup .message').val()}, update);
	return false;
    });
    $('#pleasewait form').submit(function() {
	$('#pleasewait input').attr('disabled', 'disabled');
	server.query({'pleasewait': 1}, update);
	return false;
    });
    $('#sender form').submit(function() {
	$('#sender input').attr('disabled', 'disabled');
	server.query({'sender': 1}, update);
	$('#receiver .message').val('')
	return false;
    });
    $('#receiver form').submit(function() {
	$('#receiver input').attr('disabled', 'disabled');
	server.query({'receiver': $('#receiver .message').val()}, update);
	return false;
    });
    server.query({'reset': 1}, update);
}

$('input').attr('disabled','disabled');
$.getScript(this.SERVER_BASE);
