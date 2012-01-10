function imagemap_mainpage() {
  return ''+
"<img src=\"mainpage.jpg\" />"+
"<img src=\"a_circus_line/mainpage-overlay.png\" />"+
"<img src=\"betsy_johnson/mainpage-overlay.png\" />"+
"<img src=\"1px.png\" usemap=\"#map\" style=\"z-index:99\" />"+
"<map name=\"map\">"+
"<area shape=\"rect\" coords=\"345,158,498,280\" alt=\"A Circus Line\" title=\"A Circus Line\" href=\"a_circus_line/\" />\n<area shape=\"rect\" coords=\"393,281,498,286\" alt=\"A Circus Line\" title=\"A Circus Line\" href=\"a_circus_line/\" />\n<area shape=\"rect\" coords=\"558,146,618,296\" alt=\"A Circus Line\" title=\"A Circus Line\" href=\"a_circus_line/\" />\n<area shape=\"rect\" coords=\"499,157,557,289\" alt=\"A Circus Line\" title=\"A Circus Line\" href=\"a_circus_line/\" />\n<area shape=\"rect\" coords=\"334,158,344,202\" alt=\"A Circus Line\" title=\"A Circus Line\" href=\"a_circus_line/\" />"+
"<area shape=\"rect\" coords=\"574,601,582,629\" alt=\"Betsy Johnson\" title=\"Betsy Johnson\" href=\"betsy_johnson/\" />\n<area shape=\"rect\" coords=\"583,595,676,626\" alt=\"Betsy Johnson\" title=\"Betsy Johnson\" href=\"betsy_johnson/\" />\n<area shape=\"rect\" coords=\"605,544,648,571\" alt=\"Betsy Johnson\" title=\"Betsy Johnson\" href=\"betsy_johnson/\" />\n<area shape=\"rect\" coords=\"604,572,647,594\" alt=\"Betsy Johnson\" title=\"Betsy Johnson\" href=\"betsy_johnson/\" />\n<area shape=\"rect\" coords=\"614,540,638,543\" alt=\"Betsy Johnson\" title=\"Betsy Johnson\" href=\"betsy_johnson/\" />"+
"</map>"+
'';
}
function puzzlelist_mainpage() {
  return ""+
"<tr><th><h2>Shows</h2></th>"+
"<th><h2>Critics</h2>"+
"</tr>"+
"<tr><td><a href=\"a_circus_line/\">A Circus Line</a></td>"+
"<td><a href=\"betsy_johnson/\">Betsy Johnson</a></td>"+
"</tr>"+
'';
}
function load_mainpage() {
document.getElementById('index-image').innerHTML = imagemap_mainpage();
document.getElementById('index-table').innerHTML = puzzlelist_mainpage();
}