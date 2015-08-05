---
layout: page
title: Archive
---

{% for post in site.posts %}
  {::options parse_block_html="true" /}
<div class="archive-post">
  {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})

  <p class="post-tldr">{{post.tldr}}</p>
</div>
{% endfor %}