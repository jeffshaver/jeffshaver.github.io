---
layout: post
title: Calculate reading time with liquid
permalink: calculate-reading-time-with-liquid
tldr: Estimated reading time for blog posts
comments: true
---

## The issue

I kept seeing blogs like [daverupert.com](http://daverupert.com) and [medium.com](http://medium.com) which have the approximate reading time it would take to read each post. This seemed really interesting, but I didn't really understand how you could approximate that.

## The formula

The formula for this is `number_of_words / 180`. I used 180 here but I have also seen `200` be used. Basically, the number in the equation is how many words an average adult can read/minute. This means that if I have a `1000` word post, it would take approximately 5 1/2 minutes to read.

## The tags(?)

Since I am using Jekyll for my blog, I had to figure out how to do this in liquid tags. Some may point out that there is a jekyll plugin for this, but I am hosting on GitHub Pages and it doesn't support that plugin.

{% highlight liquid %}
<!-- Get the time in decimal using the formula above -->
{{ "{% assign time_in_decimal = page.content | strip_html | number_of_words | append: '.0' | divided_by: 180 " }}%}
<!-- Get the number of minutes -->
{{ "{% assign minutes = time_in_decimal | append: '' | split: '.' | first | plug: 0 " }}%}
<!-- Get the number of seconds by subtracting the minutes from the total value -->
{{ "{% assign seconds = time_in_decimal | minus: minutes " }}%}
<!-- Round up if seconds >= 0.5 -->
{{ "{% if seconds >= 0.5 "}}%}
  {{ "{% assign minutes = minutes | plug: 1 "}}%}
{{ "{% endif "}}%}
{% endhighlight %}

## The Conclusion

The solution seems pretty easy, but it was made harder by the fact that GitHub Pages is running an older version of Jekyll that doesn't support some of the newer filters.