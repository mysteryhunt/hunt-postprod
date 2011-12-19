function imagemap() {
  return ''+
"<img src=\"key.png\" />"+
"<img src=\"cheerilee/-"+
(puzzle_solved.cheerilee?"solved":"unsolved")+
".png\" />"+
"<img src=\"fight_choreography/-"+
(puzzle_solved.fight_choreography?"solved":"unsolved")+
".png\" />"+
"<img src=\"magic_star/-"+
(puzzle_solved.magic_star?"solved":"unsolved")+
".png\" />"+
"<img src=\"potlines/-"+
(puzzle_solved.potlines?"solved":"unsolved")+
".png\" />"+
"<img src=\"pure_and_simple/-"+
(puzzle_solved.pure_and_simple?"solved":"unsolved")+
".png\" />"+
"<img src=\"revisiting_history/-"+
(puzzle_solved.revisiting_history?"solved":"unsolved")+
".png\" />"+
"<img src=\"skydancer/-"+
(puzzle_solved.skydancer?"solved":"unsolved")+
".png\" />"+
"<img src=\"star_search/-"+
(puzzle_solved.star_search?"solved":"unsolved")+
".png\" />"+
"<img src=\"the_wicked_switch/-"+
(puzzle_solved.the_wicked_switch?"solved":"unsolved")+
".png\" />"+
"<img src=\"truly/-"+
(puzzle_solved.truly?"solved":"unsolved")+
".png\" />"+
"<img src=\"../1px.png\" usemap=\"#map\" />"+
"<map name=\"map\">"+
"<area FILL ME IN href=\"cheerilee/\" alt=\"Cheerilee\" title=\"Cheerilee\" />"+
"<area FILL ME IN href=\"fight_choreography/\" alt=\"Fight Choreography\" title=\"Fight Choreography\" />"+
"<area FILL ME IN href=\"magic_star/\" alt=\"Magic Star\" title=\"Magic Star\" />"+
"<area FILL ME IN href=\"potlines/\" alt=\"Potlines\" title=\"Potlines\" />"+
"<area FILL ME IN href=\"pure_and_simple/\" alt=\"Pure and Simple\" title=\"Pure and Simple\" />"+
"<area FILL ME IN href=\"revisiting_history/\" alt=\"Revisiting History\" title=\"Revisiting History\" />"+
"<area FILL ME IN href=\"skydancer/\" alt=\"Skydancer\" title=\"Skydancer\" />"+
"<area FILL ME IN href=\"star_search/\" alt=\"Star Search\" title=\"Star Search\" />"+
"<area FILL ME IN href=\"the_wicked_switch/\" alt=\"The Wicked Switch\" title=\"The Wicked Switch\" />"+
"<area FILL ME IN href=\"truly/\" alt=\"Truly\" title=\"Truly\" />"+
"</map>"+
'';
}
function puzzlelist() {
  return ""+
"<tr>"+
"<td><a href=\"cheerilee/\" class=\""+
(puzzle_solved.cheerilee?"solved":"unsolved")+
"\">Cheerilee</a></td>"+
"<td><a href=\"revisiting_history/\" class=\""+
(puzzle_solved.revisiting_history?"solved":"unsolved")+
"\">Revisiting History</a></td>"+
"</tr>"+
"<tr>"+
"<td><a href=\"fight_choreography/\" class=\""+
(puzzle_solved.fight_choreography?"solved":"unsolved")+
"\">Fight Choreography</a></td>"+
"<td><a href=\"skydancer/\" class=\""+
(puzzle_solved.skydancer?"solved":"unsolved")+
"\">Skydancer</a></td>"+
"</tr>"+
"<tr>"+
"<td><a href=\"magic_star/\" class=\""+
(puzzle_solved.magic_star?"solved":"unsolved")+
"\">Magic Star</a></td>"+
"<td><a href=\"star_search/\" class=\""+
(puzzle_solved.star_search?"solved":"unsolved")+
"\">Star Search</a></td>"+
"</tr>"+
"<tr>"+
"<td><a href=\"potlines/\" class=\""+
(puzzle_solved.potlines?"solved":"unsolved")+
"\">Potlines</a></td>"+
"<td><a href=\"the_wicked_switch/\" class=\""+
(puzzle_solved.the_wicked_switch?"solved":"unsolved")+
"\">The Wicked Switch</a></td>"+
"</tr>"+
"<tr>"+
"<td><a href=\"pure_and_simple/\" class=\""+
(puzzle_solved.pure_and_simple?"solved":"unsolved")+
"\">Pure and Simple</a></td>"+
"<td><a href=\"truly/\" class=\""+
(puzzle_solved.truly?"solved":"unsolved")+
"\">Truly</a></td>"+
"</tr>"+
'';
}
function onLoad() {
document.getElementById('index-image').innerHTML = imagemap();
document.getElementById('puzzle-list').innerHTML = puzzlelist();
}