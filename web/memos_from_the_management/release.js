---
# ensure that we use the templating engine for this file
---
this.memos_from_the_management = [
    ["Introduction to the Hunt", "introduction/"],
{% if site.release.solutions %}
    ["Opening Skit", "skit/"]
{% endif %}
];
