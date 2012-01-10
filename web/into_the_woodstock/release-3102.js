function imagemap() {
  return ''+
"<img src=\"key.png\" />"+
"<img src=\"braeburn/-"+
(puzzle_solved["braeburn"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"bubbles/-"+
(puzzle_solved["bubbles"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"dawn_of_a_new_era/-"+
(puzzle_solved["dawn_of_a_new_era"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"of_course/-"+
(puzzle_solved["of_course"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"sounds_good_to_me/-"+
(puzzle_solved["sounds_good_to_me"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"tax_in_space/-"+
(puzzle_solved["tax_in_space"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"the_answers_are_somehow_connected/-"+
(puzzle_solved["the_answers_are_somehow_connected"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"../1px.png\" usemap=\"#map\" style=\"z-index:99\" />"+
"<map name=\"map\">"+
"<area shape=\"rect\" coords=\"163,245,249,296\" alt=\"Braeburn\" title=\"Braeburn\" href=\"braeburn/\" />\n<area shape=\"rect\" coords=\"250,259,253,287\" alt=\"Braeburn\" title=\"Braeburn\" href=\"braeburn/\" />\n<area shape=\"rect\" coords=\"172,297,244,316\" alt=\"Braeburn\" title=\"Braeburn\" href=\"braeburn/\" />\n<area shape=\"rect\" coords=\"185,317,229,352\" alt=\"Braeburn\" title=\"Braeburn\" href=\"braeburn/\" />\n<area shape=\"rect\" coords=\"171,242,188,244\" alt=\"Braeburn\" title=\"Braeburn\" href=\"braeburn/\" />"+
"<area shape=\"rect\" coords=\"198,381,249,459\" alt=\"Bubbles\" title=\"Bubbles\" href=\"bubbles/\" />\n<area shape=\"rect\" coords=\"195,460,249,469\" alt=\"Bubbles\" title=\"Bubbles\" href=\"bubbles/\" />\n<area shape=\"rect\" coords=\"264,372,292,477\" alt=\"Bubbles\" title=\"Bubbles\" href=\"bubbles/\" />\n<area shape=\"rect\" coords=\"250,379,263,474\" alt=\"Bubbles\" title=\"Bubbles\" href=\"bubbles/\" />\n<area shape=\"rect\" coords=\"293,376,300,425\" alt=\"Bubbles\" title=\"Bubbles\" href=\"bubbles/\" />"+
"<area shape=\"rect\" coords=\"112,313,172,360\" alt=\"Dawn of a New Era\" title=\"Dawn of a New Era\" href=\"dawn_of_a_new_era/\" />\n<area shape=\"rect\" coords=\"173,326,178,355\" alt=\"Dawn of a New Era\" title=\"Dawn of a New Era\" href=\"dawn_of_a_new_era/\" />\n<area shape=\"rect\" coords=\"130,276,176,306\" alt=\"Dawn of a New Era\" title=\"Dawn of a New Era\" href=\"dawn_of_a_new_era/\" />\n<area shape=\"rect\" coords=\"126,307,160,312\" alt=\"Dawn of a New Era\" title=\"Dawn of a New Era\" href=\"dawn_of_a_new_era/\" />\n<area shape=\"rect\" coords=\"118,361,136,363\" alt=\"Dawn of a New Era\" title=\"Dawn of a New Era\" href=\"dawn_of_a_new_era/\" />"+
"<area shape=\"rect\" coords=\"16,360,86,365\" alt=\"Of Course!\" title=\"Of Course!\" href=\"of_course/\" />\n<area shape=\"rect\" coords=\"10,366,91,393\" alt=\"Of Course!\" title=\"Of Course!\" href=\"of_course/\" />\n<area shape=\"rect\" coords=\"11,394,77,409\" alt=\"Of Course!\" title=\"Of Course!\" href=\"of_course/\" />\n<area shape=\"rect\" coords=\"17,410,61,449\" alt=\"Of Course!\" title=\"Of Course!\" href=\"of_course/\" />\n<area shape=\"rect\" coords=\"19,353,43,359\" alt=\"Of Course!\" title=\"Of Course!\" href=\"of_course/\" />"+
"<area shape=\"rect\" coords=\"292,231,309,234\" alt=\"Sounds Good to Me\" title=\"Sounds Good to Me\" href=\"sounds_good_to_me/\" />\n<area shape=\"rect\" coords=\"284,235,322,329\" alt=\"Sounds Good to Me\" title=\"Sounds Good to Me\" href=\"sounds_good_to_me/\" />\n<area shape=\"rect\" coords=\"332,258,366,325\" alt=\"Sounds Good to Me\" title=\"Sounds Good to Me\" href=\"sounds_good_to_me/\" />\n<area shape=\"rect\" coords=\"265,242,283,352\" alt=\"Sounds Good to Me\" title=\"Sounds Good to Me\" href=\"sounds_good_to_me/\" />\n<area shape=\"rect\" coords=\"323,245,331,327\" alt=\"Sounds Good to Me\" title=\"Sounds Good to Me\" href=\"sounds_good_to_me/\" />"+
"<area shape=\"rect\" coords=\"18,222,78,270\" alt=\"Tax... In... Space\" title=\"Tax... In... Space\" href=\"tax_in_space/\" />\n<area shape=\"rect\" coords=\"25,271,74,276\" alt=\"Tax... In... Space\" title=\"Tax... In... Space\" href=\"tax_in_space/\" />\n<area shape=\"rect\" coords=\"20,165,56,221\" alt=\"Tax... In... Space\" title=\"Tax... In... Space\" href=\"tax_in_space/\" />\n<area shape=\"rect\" coords=\"27,277,69,296\" alt=\"Tax... In... Space\" title=\"Tax... In... Space\" href=\"tax_in_space/\" />\n<area shape=\"rect\" coords=\"79,232,86,264\" alt=\"Tax... In... Space\" title=\"Tax... In... Space\" href=\"tax_in_space/\" />"+
"<area shape=\"rect\" coords=\"299,163,302,200\" alt=\"The Answers Are Somehow Connected\" title=\"The Answers Are Somehow Connected\" href=\"the_answers_are_somehow_connected/\" />\n<area shape=\"rect\" coords=\"303,153,345,210\" alt=\"The Answers Are Somehow Connected\" title=\"The Answers Are Somehow Connected\" href=\"the_answers_are_somehow_connected/\" />\n<area shape=\"rect\" coords=\"346,158,373,206\" alt=\"The Answers Are Somehow Connected\" title=\"The Answers Are Somehow Connected\" href=\"the_answers_are_somehow_connected/\" />\n<area shape=\"rect\" coords=\"306,211,341,237\" alt=\"The Answers Are Somehow Connected\" title=\"The Answers Are Somehow Connected\" href=\"the_answers_are_somehow_connected/\" />\n<area shape=\"rect\" coords=\"313,148,336,152\" alt=\"The Answers Are Somehow Connected\" title=\"The Answers Are Somehow Connected\" href=\"the_answers_are_somehow_connected/\" />"+
"</map>"+
'';
}
function puzzlelist() {
  return ""+
"<tr>"+
"<td>"+
"<a href=\"braeburn/\" class=\""+
(puzzle_solved["braeburn"]?"solved":"unsolved")+
"\">Braeburn</a>"+
"</td>"+
"<td>"+
"<a href=\"sounds_good_to_me/\" class=\""+
(puzzle_solved["sounds_good_to_me"]?"solved":"unsolved")+
"\">Sounds Good to Me</a>"+
"</td>"+
"</tr>"+
"<tr>"+
"<td>"+
"<a href=\"bubbles/\" class=\""+
(puzzle_solved["bubbles"]?"solved":"unsolved")+
"\">Bubbles</a>"+
"</td>"+
"<td>"+
"<a href=\"tax_in_space/\" class=\""+
(puzzle_solved["tax_in_space"]?"solved":"unsolved")+
"\">Tax... In... Space</a>"+
"</td>"+
"</tr>"+
"<tr>"+
"<td>"+
"<a href=\"dawn_of_a_new_era/\" class=\""+
(puzzle_solved["dawn_of_a_new_era"]?"solved":"unsolved")+
"\">Dawn of a New Era</a>"+
"</td>"+
"<td>"+
"<a href=\"the_answers_are_somehow_connected/\" class=\""+
(puzzle_solved["the_answers_are_somehow_connected"]?"solved":"unsolved")+
"\">The Answers Are Somehow Connected</a>"+
"</td>"+
"</tr>"+
"<tr>"+
"<td>"+
"<a href=\"of_course/\" class=\""+
(puzzle_solved["of_course"]?"solved":"unsolved")+
"\">Of Course!</a>"+
"</td>"+
"<td>"+
"</td>"+
"</tr>"+
'';
}
function onLoad() {
document.getElementById('index-image').innerHTML = imagemap();
document.getElementById('puzzle-list').innerHTML = puzzlelist();
}