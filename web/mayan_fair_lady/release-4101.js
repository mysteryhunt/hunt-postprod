function imagemap() {
  return ''+
"<img src=\"key.png\" />"+
"<img src=\"itinerant_people_of_america/-"+
(puzzle_solved["itinerant_people_of_america"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"the_rainbow_connection/-"+
(puzzle_solved["the_rainbow_connection"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"stage_lines/-"+
(puzzle_solved["stage_lines"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"princess_primrose/-"+
(puzzle_solved["princess_primrose"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"../1px.png\" usemap=\"#map\" style=\"z-index:99\" />"+
"<map name=\"map\">"+
"<area shape=\"rect\" coords=\"121,221,143,247\" alt=\"Itinerant People of America\" title=\"Itinerant People of America\" href=\"itinerant_people_of_america/\" />\n<area shape=\"rect\" coords=\"144,223,169,250\" alt=\"Itinerant People of America\" title=\"Itinerant People of America\" href=\"itinerant_people_of_america/\" />\n<area shape=\"rect\" coords=\"285,235,329,263\" alt=\"Itinerant People of America\" title=\"Itinerant People of America\" href=\"itinerant_people_of_america/\" />\n<area shape=\"rect\" coords=\"65,216,98,242\" alt=\"Itinerant People of America\" title=\"Itinerant People of America\" href=\"itinerant_people_of_america/\" />\n<area shape=\"rect\" coords=\"330,240,367,268\" alt=\"Itinerant People of America\" title=\"Itinerant People of America\" href=\"itinerant_people_of_america/\" />\n<area shape=\"rect\" coords=\"99,218,120,245\" alt=\"Itinerant People of America\" title=\"Itinerant People of America\" href=\"itinerant_people_of_america/\" />"+
"<area shape=\"rect\" coords=\"112,275,153,300\" alt=\"The Rainbow Connection\" title=\"The Rainbow Connection\" href=\"the_rainbow_connection/\" />\n<area shape=\"rect\" coords=\"154,279,190,304\" alt=\"The Rainbow Connection\" title=\"The Rainbow Connection\" href=\"the_rainbow_connection/\" />\n<area shape=\"rect\" coords=\"373,294,436,319\" alt=\"The Rainbow Connection\" title=\"The Rainbow Connection\" href=\"the_rainbow_connection/\" />\n<area shape=\"rect\" coords=\"323,290,372,317\" alt=\"The Rainbow Connection\" title=\"The Rainbow Connection\" href=\"the_rainbow_connection/\" />\n<area shape=\"rect\" coords=\"28,268,72,293\" alt=\"The Rainbow Connection\" title=\"The Rainbow Connection\" href=\"the_rainbow_connection/\" />\n<area shape=\"rect\" coords=\"73,271,111,297\" alt=\"The Rainbow Connection\" title=\"The Rainbow Connection\" href=\"the_rainbow_connection/\" />"+
"<area shape=\"rect\" coords=\"121,371,175,408\" alt=\"Stage Lines\" title=\"Stage Lines\" href=\"stage_lines/\" />\n<area shape=\"rect\" coords=\"176,375,241,411\" alt=\"Stage Lines\" title=\"Stage Lines\" href=\"stage_lines/\" />\n<area shape=\"rect\" coords=\"471,391,565,427\" alt=\"Stage Lines\" title=\"Stage Lines\" href=\"stage_lines/\" />\n<area shape=\"rect\" coords=\"390,384,470,422\" alt=\"Stage Lines\" title=\"Stage Lines\" href=\"stage_lines/\" />\n<area shape=\"rect\" coords=\"6,363,63,402\" alt=\"Stage Lines\" title=\"Stage Lines\" href=\"stage_lines/\" />\n<area shape=\"rect\" coords=\"64,367,120,405\" alt=\"Stage Lines\" title=\"Stage Lines\" href=\"stage_lines/\" />"+
"<area shape=\"rect\" coords=\"148,436,261,464\" alt=\"Princess Primrose\" title=\"Princess Primrose\" href=\"princess_primrose/\" />\n<area shape=\"rect\" coords=\"148,465,271,490\" alt=\"Princess Primrose\" title=\"Princess Primrose\" href=\"princess_primrose/\" />\n<area shape=\"rect\" coords=\"10,452,147,487\" alt=\"Princess Primrose\" title=\"Princess Primrose\" href=\"princess_primrose/\" />\n<area shape=\"rect\" coords=\"440,452,619,480\" alt=\"Princess Primrose\" title=\"Princess Primrose\" href=\"princess_primrose/\" />\n<area shape=\"rect\" coords=\"461,481,638,500\" alt=\"Princess Primrose\" title=\"Princess Primrose\" href=\"princess_primrose/\" />\n<area shape=\"rect\" coords=\"2,432,147,451\" alt=\"Princess Primrose\" title=\"Princess Primrose\" href=\"princess_primrose/\" />"+
"</map>"+
'';
}
function puzzlelist() {
  return ""+
"<tr>"+
"<td class=\"num\">1.</td>"+
"<td>"+
"</td>"+
"<td class=\"num\">7.</td>"+
"<td>"+
"</td>"+
"</tr>"+
"<tr>"+
"<td class=\"num\">2.</td>"+
"<td>"+
"</td>"+
"<td class=\"num\">8.</td>"+
"<td>"+
"</td>"+
"</tr>"+
"<tr>"+
"<td class=\"num\">3.</td>"+
"<td>"+
"<a href=\"itinerant_people_of_america/\" class=\""+
(puzzle_solved["itinerant_people_of_america"]?"solved":"unsolved")+
"\">Itinerant People of America</a>"+
"</td>"+
"<td class=\"num\">9.</td>"+
"<td>"+
"<a href=\"stage_lines/\" class=\""+
(puzzle_solved["stage_lines"]?"solved":"unsolved")+
"\">Stage Lines</a>"+
"</td>"+
"</tr>"+
"<tr>"+
"<td class=\"num\">4.</td>"+
"<td>"+
"</td>"+
"<td class=\"num\">10.</td>"+
"<td>"+
"</td>"+
"</tr>"+
"<tr>"+
"<td class=\"num\">5.</td>"+
"<td>"+
"<a href=\"the_rainbow_connection/\" class=\""+
(puzzle_solved["the_rainbow_connection"]?"solved":"unsolved")+
"\">The Rainbow Connection</a>"+
"</td>"+
"<td class=\"num\">11.</td>"+
"<td>"+
"<a href=\"princess_primrose/\" class=\""+
(puzzle_solved["princess_primrose"]?"solved":"unsolved")+
"\">Princess Primrose</a>"+
"</td>"+
"</tr>"+
"<tr>"+
"<td class=\"num\">6.</td>"+
"<td>"+
"</td>"+
"<td class=\"num\">12.</td>"+
"<td>"+
"</td>"+
"</tr>"+
'';
}
function onLoad() {
document.getElementById('index-image').innerHTML = imagemap();
document.getElementById('puzzle-list').innerHTML = puzzlelist();
}