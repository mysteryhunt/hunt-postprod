function imagemap() {
  return ''+
"<img src=\"photo.png\" />"+
"<img src=\"blinkenlights/-"+
(puzzle_solved["blinkenlights"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"1-"+
(puzzle_solved["fight_choreography"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"jekyll_and_hyde/-"+
(puzzle_solved["jekyll_and_hyde"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"2-"+
(puzzle_solved["potlines"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"3-"+
(puzzle_solved["pure_and_simple"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"slash_fiction/-"+
(puzzle_solved["slash_fiction"]?"solved":"unsolved")+
".png\" />"+
"<img src=\"4-"+
(puzzle_solved["star_search"]?"solved":"unsolved")+
".png\" />"+
"<div class=\"paperclip\"></div>"+
"<img src=\"../1px.png\" usemap=\"#map\" style=\"z-index:99\" />"+
"<map name=\"map\">"+
"<area shape=\"rect\" coords=\"533,95,563,135\" alt=\"Blinkenlights\" title=\"Blinkenlights\" href=\"blinkenlights/\" />\n<area shape=\"rect\" coords=\"536,136,562,150\" alt=\"Blinkenlights\" title=\"Blinkenlights\" href=\"blinkenlights/\" />\n<area shape=\"rect\" coords=\"564,60,584,131\" alt=\"Blinkenlights\" title=\"Blinkenlights\" href=\"blinkenlights/\" />\n<area shape=\"rect\" coords=\"585,17,613,110\" alt=\"Blinkenlights\" title=\"Blinkenlights\" href=\"blinkenlights/\" />\n<area shape=\"rect\" coords=\"530,79,563,94\" alt=\"Blinkenlights\" title=\"Blinkenlights\" href=\"blinkenlights/\" />"+
"<area shape=\"rect\" coords=\"272,386,306,391\" alt=\"Fight Choreography\" title=\"Fight Choreography\" href=\"../a_circus_line/fight_choreography/\" />\n<area shape=\"rect\" coords=\"238,392,312,426\" alt=\"Fight Choreography\" title=\"Fight Choreography\" href=\"../a_circus_line/fight_choreography/\" />\n<area shape=\"rect\" coords=\"246,443,318,465\" alt=\"Fight Choreography\" title=\"Fight Choreography\" href=\"../a_circus_line/fight_choreography/\" />\n<area shape=\"rect\" coords=\"243,427,315,442\" alt=\"Fight Choreography\" title=\"Fight Choreography\" href=\"../a_circus_line/fight_choreography/\" />\n<area shape=\"rect\" coords=\"250,466,285,471\" alt=\"Fight Choreography\" title=\"Fight Choreography\" href=\"../a_circus_line/fight_choreography/\" />"+
"<area shape=\"rect\" coords=\"301,198,321,242\" alt=\"Jekyll and Hyde\" title=\"Jekyll and Hyde\" href=\"jekyll_and_hyde/\" />\n<area shape=\"rect\" coords=\"322,220,324,239\" alt=\"Jekyll and Hyde\" title=\"Jekyll and Hyde\" href=\"jekyll_and_hyde/\" />\n<area shape=\"rect\" coords=\"246,207,267,250\" alt=\"Jekyll and Hyde\" title=\"Jekyll and Hyde\" href=\"jekyll_and_hyde/\" />\n<area shape=\"rect\" coords=\"268,204,284,248\" alt=\"Jekyll and Hyde\" title=\"Jekyll and Hyde\" href=\"jekyll_and_hyde/\" />\n<area shape=\"rect\" coords=\"285,201,300,245\" alt=\"Jekyll and Hyde\" title=\"Jekyll and Hyde\" href=\"jekyll_and_hyde/\" />"+
"<area shape=\"rect\" coords=\"391,223,425,228\" alt=\"Potlines\" title=\"Potlines\" href=\"../a_circus_line/potlines/\" />\n<area shape=\"rect\" coords=\"355,229,431,263\" alt=\"Potlines\" title=\"Potlines\" href=\"../a_circus_line/potlines/\" />\n<area shape=\"rect\" coords=\"363,281,436,301\" alt=\"Potlines\" title=\"Potlines\" href=\"../a_circus_line/potlines/\" />\n<area shape=\"rect\" coords=\"360,264,434,280\" alt=\"Potlines\" title=\"Potlines\" href=\"../a_circus_line/potlines/\" />\n<area shape=\"rect\" coords=\"366,302,403,307\" alt=\"Potlines\" title=\"Potlines\" href=\"../a_circus_line/potlines/\" />"+
"<area shape=\"rect\" coords=\"491,197,538,221\" alt=\"Pure and Simple\" title=\"Pure and Simple\" href=\"../a_circus_line/pure_and_simple/\" />\n<area shape=\"rect\" coords=\"495,222,519,225\" alt=\"Pure and Simple\" title=\"Pure and Simple\" href=\"../a_circus_line/pure_and_simple/\" />\n<area shape=\"rect\" coords=\"487,170,533,184\" alt=\"Pure and Simple\" title=\"Pure and Simple\" href=\"../a_circus_line/pure_and_simple/\" />\n<area shape=\"rect\" coords=\"489,185,535,196\" alt=\"Pure and Simple\" title=\"Pure and Simple\" href=\"../a_circus_line/pure_and_simple/\" />\n<area shape=\"rect\" coords=\"506,166,530,169\" alt=\"Pure and Simple\" title=\"Pure and Simple\" href=\"../a_circus_line/pure_and_simple/\" />"+
"<area shape=\"rect\" coords=\"275,165,329,171\" alt=\"Slash Fiction\" title=\"Slash Fiction\" href=\"slash_fiction/\" />\n<area shape=\"rect\" coords=\"271,172,329,181\" alt=\"Slash Fiction\" title=\"Slash Fiction\" href=\"slash_fiction/\" />\n<area shape=\"rect\" coords=\"286,147,321,158\" alt=\"Slash Fiction\" title=\"Slash Fiction\" href=\"slash_fiction/\" />\n<area shape=\"rect\" coords=\"281,159,326,164\" alt=\"Slash Fiction\" title=\"Slash Fiction\" href=\"slash_fiction/\" />\n<area shape=\"rect\" coords=\"274,182,312,190\" alt=\"Slash Fiction\" title=\"Slash Fiction\" href=\"slash_fiction/\" />"+
"<area shape=\"rect\" coords=\"398,186,401,210\" alt=\"Star Search\" title=\"Star Search\" href=\"../a_circus_line/star_search/\" />\n<area shape=\"rect\" coords=\"402,183,422,232\" alt=\"Star Search\" title=\"Star Search\" href=\"../a_circus_line/star_search/\" />\n<area shape=\"rect\" coords=\"423,180,438,229\" alt=\"Star Search\" title=\"Star Search\" href=\"../a_circus_line/star_search/\" />\n<area shape=\"rect\" coords=\"439,178,454,226\" alt=\"Star Search\" title=\"Star Search\" href=\"../a_circus_line/star_search/\" />\n<area shape=\"rect\" coords=\"455,197,458,224\" alt=\"Star Search\" title=\"Star Search\" href=\"../a_circus_line/star_search/\" />"+
"</map>"+
'';
}
function puzzlelist() {
  return ""+
"<table class=\"materials\">"+
"<tr>"+
"<td class=\"betsy_johnson "+
(puzzle_solved["blinkenlights"]?"solved":"unsolved")+
"\"><a href=\"blinkenlights/\"><span>Blinkenlights</span></a></td>"+
"<td class=\"a_circus_line "+
(puzzle_solved["pure_and_simple"]?"solved":"unsolved")+
"\"><a href=\"../a_circus_line/pure_and_simple/\"><span>Pure and Simple</span></a></td>"+
"</tr>"+
"<tr>"+
"<td></td>"+
"<td class=\"betsy_johnson "+
(puzzle_solved["slash_fiction"]?"solved":"unsolved")+
"\"><a href=\"slash_fiction/\"><span>Slash Fiction</span></a></td>"+
"</tr>"+
"<tr>"+
"<td class=\"a_circus_line "+
(puzzle_solved["fight_choreography"]?"solved":"unsolved")+
"\"><a href=\"../a_circus_line/fight_choreography/\"><span>Fight Choreography</span></a></td>"+
"<td></td>"+
"</tr>"+
"<tr>"+
"<td class=\"betsy_johnson "+
(puzzle_solved["jekyll_and_hyde"]?"solved":"unsolved")+
"\"><a href=\"jekyll_and_hyde/\"><span>Jekyll and Hyde</span></a></td>"+
"<td class=\"a_circus_line "+
(puzzle_solved["star_search"]?"solved":"unsolved")+
"\"><a href=\"../a_circus_line/star_search/\"><span>Star Search</span></a></td>"+
"</tr>"+
"<tr>"+
"<td class=\"a_circus_line "+
(puzzle_solved["potlines"]?"solved":"unsolved")+
"\"><a href=\"../a_circus_line/potlines/\"><span>Potlines</span></a></td>"+
"<td></td>"+
"</tr>"+
"</table>"+
'';
}
function onLoad() {
document.getElementById('photo').innerHTML = imagemap();
document.getElementById('materials').innerHTML = puzzlelist();
}