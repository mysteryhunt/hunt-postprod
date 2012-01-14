---
# ensure that we use the templating engine for this file
---
this.memos_from_the_management = [
    ["Introduction to the Hunt", "introduction/"]
    ,["Opening Skit", "skit/"]
{% if site.release.solutions %}
    ,["The Coin Has Been Found", "the_coin_has_been_found/"]
{% endif %}
];
