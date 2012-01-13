this.puzzle_link_map = {};

function imagemap_mainpage() {
  return ''+
"<img src=\"mainpage.jpg\" />"+
"<img src=\"a_circus_line/mainpage-overlay"+
(puzzle_solved["23291b2629d59f515f3e1942aba1a3c179c6e547a645e489d78083a1"]?"":"-unsolved")+
".png\" />"+
"<img src=\"1px.png\" usemap=\"#map\" style=\"z-index:99\" />"+
"<map name=\"map\">"+
"<area shape=\"rect\" coords=\"345,158,498,280\" alt=\"A Circus Line\" title=\"A Circus Line\" href=\"a_circus_line/\" />\n<area shape=\"rect\" coords=\"393,281,498,286\" alt=\"A Circus Line\" title=\"A Circus Line\" href=\"a_circus_line/\" />\n<area shape=\"rect\" coords=\"558,146,618,296\" alt=\"A Circus Line\" title=\"A Circus Line\" href=\"a_circus_line/\" />\n<area shape=\"rect\" coords=\"499,157,557,289\" alt=\"A Circus Line\" title=\"A Circus Line\" href=\"a_circus_line/\" />\n<area shape=\"rect\" coords=\"334,158,344,202\" alt=\"A Circus Line\" title=\"A Circus Line\" href=\"a_circus_line/\" />"+
"</map>"+
'';
}
function puzzlelist_mainpage() {
  return ""+
"<tr><th><h2>Shows</h2></th>"+
"</tr>"+
"<tr><td><a href=\"a_circus_line/\">A Circus Line</a></td>"+
"</tr>"+
'';
}
function load_mainpage() {
document.getElementById('index-image').innerHTML = imagemap_mainpage();
document.getElementById('index-table').innerHTML = puzzlelist_mainpage();
}
