function imagemap_mainpage() {
  return ''+
"<img src=\"mainpage.jpg\" />"+
"<img src=\"a_circus_line/mainpage-overlay.png\" />"+
"<img src=\"betsy_johnson/mainpage-overlay.png\" />"+
"<img src=\"okla_holmes_a/mainpage-overlay.png\" />"+
"<img src=\"charles_lutwidge_dodgson/mainpage-overlay.png\" />"+
"<img src=\"into_the_woodstock/mainpage-overlay.png\" />"+
"<img src=\"william_s_bergman/mainpage-overlay.png\" />"+
"<img src=\"1px.png\" usemap=\"#map\" style=\"z-index:99\" />"+
"<map name=\"map\">"+
"<area shape=\"rect\" coords=\"345,158,498,280\" alt=\"A Circus Line\" title=\"A Circus Line\" href=\"a_circus_line/\" />\n<area shape=\"rect\" coords=\"393,281,498,286\" alt=\"A Circus Line\" title=\"A Circus Line\" href=\"a_circus_line/\" />\n<area shape=\"rect\" coords=\"558,146,618,296\" alt=\"A Circus Line\" title=\"A Circus Line\" href=\"a_circus_line/\" />\n<area shape=\"rect\" coords=\"499,157,557,289\" alt=\"A Circus Line\" title=\"A Circus Line\" href=\"a_circus_line/\" />\n<area shape=\"rect\" coords=\"334,158,344,202\" alt=\"A Circus Line\" title=\"A Circus Line\" href=\"a_circus_line/\" />"+
"<area shape=\"rect\" coords=\"574,601,582,629\" alt=\"Betsy Johnson\" title=\"Betsy Johnson\" href=\"betsy_johnson/\" />\n<area shape=\"rect\" coords=\"583,595,676,626\" alt=\"Betsy Johnson\" title=\"Betsy Johnson\" href=\"betsy_johnson/\" />\n<area shape=\"rect\" coords=\"605,544,648,571\" alt=\"Betsy Johnson\" title=\"Betsy Johnson\" href=\"betsy_johnson/\" />\n<area shape=\"rect\" coords=\"604,572,647,594\" alt=\"Betsy Johnson\" title=\"Betsy Johnson\" href=\"betsy_johnson/\" />\n<area shape=\"rect\" coords=\"614,540,638,543\" alt=\"Betsy Johnson\" title=\"Betsy Johnson\" href=\"betsy_johnson/\" />"+
"<area shape=\"rect\" coords=\"65,168,180,283\" alt=\"Okla-Holmes-a!\" title=\"Okla-Holmes-a!\" href=\"okla_holmes_a/\" />\n<area shape=\"rect\" coords=\"65,284,154,292\" alt=\"Okla-Holmes-a!\" title=\"Okla-Holmes-a!\" href=\"okla_holmes_a/\" />\n<area shape=\"rect\" coords=\"181,160,273,285\" alt=\"Okla-Holmes-a!\" title=\"Okla-Holmes-a!\" href=\"okla_holmes_a/\" />\n<area shape=\"rect\" coords=\"274,166,358,302\" alt=\"Okla-Holmes-a!\" title=\"Okla-Holmes-a!\" href=\"okla_holmes_a/\" />\n<area shape=\"rect\" coords=\"32,176,64,296\" alt=\"Okla-Holmes-a!\" title=\"Okla-Holmes-a!\" href=\"okla_holmes_a/\" />"+
"<area shape=\"rect\" coords=\"338,558,378,566\" alt=\"Charles Lutwidge Dodgson\" title=\"Charles Lutwidge Dodgson\" href=\"charles_lutwidge_dodgson/\" />\n<area shape=\"rect\" coords=\"337,567,379,602\" alt=\"Charles Lutwidge Dodgson\" title=\"Charles Lutwidge Dodgson\" href=\"charles_lutwidge_dodgson/\" />\n<area shape=\"rect\" coords=\"306,603,406,637\" alt=\"Charles Lutwidge Dodgson\" title=\"Charles Lutwidge Dodgson\" href=\"charles_lutwidge_dodgson/\" />\n<area shape=\"rect\" coords=\"341,552,377,557\" alt=\"Charles Lutwidge Dodgson\" title=\"Charles Lutwidge Dodgson\" href=\"charles_lutwidge_dodgson/\" />\n<area shape=\"rect\" coords=\"347,548,371,551\" alt=\"Charles Lutwidge Dodgson\" title=\"Charles Lutwidge Dodgson\" href=\"charles_lutwidge_dodgson/\" />"+
"<area shape=\"rect\" coords=\"574,336,576,450\" alt=\"Into the Woodstock\" title=\"Into the Woodstock\" href=\"into_the_woodstock/\" />\n<area shape=\"rect\" coords=\"577,331,859,488\" alt=\"Into the Woodstock\" title=\"Into the Woodstock\" href=\"into_the_woodstock/\" />\n<area shape=\"rect\" coords=\"860,343,873,487\" alt=\"Into the Woodstock\" title=\"Into the Woodstock\" href=\"into_the_woodstock/\" />\n<area shape=\"rect\" coords=\"874,385,882,484\" alt=\"Into the Woodstock\" title=\"Into the Woodstock\" href=\"into_the_woodstock/\" />\n<area shape=\"rect\" coords=\"581,328,737,330\" alt=\"Into the Woodstock\" title=\"Into the Woodstock\" href=\"into_the_woodstock/\" />"+
"<area shape=\"rect\" coords=\"411,509,452,538\" alt=\"William S. Bergman\" title=\"William S. Bergman\" href=\"william_s_bergman/\" />\n<area shape=\"rect\" coords=\"412,539,451,558\" alt=\"William S. Bergman\" title=\"William S. Bergman\" href=\"william_s_bergman/\" />\n<area shape=\"rect\" coords=\"380,560,480,595\" alt=\"William S. Bergman\" title=\"William S. Bergman\" href=\"william_s_bergman/\" />\n<area shape=\"rect\" coords=\"420,505,444,508\" alt=\"William S. Bergman\" title=\"William S. Bergman\" href=\"william_s_bergman/\" />\n<area shape=\"rect\" coords=\"410,559,452,559\" alt=\"William S. Bergman\" title=\"William S. Bergman\" href=\"william_s_bergman/\" />"+
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
"<tr><td><a href=\"okla_holmes_a/\">Okla-Holmes-a!</a></td>"+
"<td><a href=\"charles_lutwidge_dodgson/\">Charles Lutwidge Dodgson</a></td>"+
"</tr>"+
"<tr><td><a href=\"into_the_woodstock/\">Into the Woodstock</a></td>"+
"<td><a href=\"william_s_bergman/\">William S. Bergman</a></td>"+
"</tr>"+
'';
}
function load_mainpage() {
document.getElementById('index-image').innerHTML = imagemap_mainpage();
document.getElementById('index-table').innerHTML = puzzlelist_mainpage();
}