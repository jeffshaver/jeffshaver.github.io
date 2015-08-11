---
layout: post
title: Forcing a repaint
permalink: forcing-a-repaint
tldr: Transitioning dynamically inserted DOM elements
comments: true
---

## The pen

The other day, while writing this ES2015 "Toaster" implementation codepen, I ran into a problem.

<p data-height="268" data-theme-id="17657" data-slug-hash="RPEGwg" data-default-tab="result" data-user="jeffshaver" class='codepen'>See the Pen <a href='http://codepen.io/jeffshaver/pen/RPEGwg/'>Toaster</a> by Jeffrey Shaver (<a href='http://codepen.io/jeffshaver'>@jeffshaver</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## The problem

When a new "toast" was created, it didn't transition the way I wanted it to... Actually, it didn't transition at all. It just popped onto the screen. A lot of possibilities went through my head about just what the issue was. However, the real issue didn't occur to me until I was out walking my dog... why? It doesn't matter. I had time to ponder. What I figured out was that the element was being put in the DOM and was having the class added and then painted instead of being put into the DOM, painted and then having the class added. The following pen demonstrates the issue:

<p data-height="268" data-theme-id="17657" data-slug-hash="xGBaxe" data-default-tab="result" data-user="jeffshaver" class='codepen'>See the Pen <a href='http://codepen.io/jeffshaver/pen/xGBaxe/'>xGBaxe</a> by Jeffrey Shaver (<a href='http://codepen.io/jeffshaver'>@jeffshaver</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## The (initial) solution

Initially, I didn't have the time to figure it out, so instead of just adding the class right after, I use the tried-and-true solution for all JS developers and put the `classList.add` call into a setTimeout... Yeah... I know a hack of a solution.

{% highlight JavaScript %}
this.wrapper.appendChild(toast);
// THe 300 was chosen because it worked... most of the time -_-
setTimeout(() => this.show(id), 300);
{% endhighlight %}

This pen demonstrates that the initial "solution" actually "worked:"

<p data-height="268" data-theme-id="17657" data-slug-hash="bdZxBo" data-default-tab="result" data-user="jeffshaver" class='codepen'>See the Pen <a href='http://codepen.io/jeffshaver/pen/bdZxBo/'>bdZxBo</a> by Jeffrey Shaver (<a href='http://codepen.io/jeffshaver'>@jeffshaver</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## The (real) solution

After actually thinking about it for a little while, I realized that I could just force a repaint. This isn't something I usually have to do, but I remember reading about it a few times for cases very similar. Sooooo I changed the above solution to this:

{% highlight JavaScript %}
this.wrapper.appendChild(toast);
toast.offsetHeight;
window.requestAnimationFrame(() => this.show(id));
{% endhighlight %}

The second line of that code snippet is the one doing all the work. In order to get the `offsetHeight` attribute, the browser has to repaint everything to figure out the exact height, which forces a repaint :)

Now we have our desired chronological set of events:

1. Element is put in the DOM
2. The browser paints the element, which isn't visible
3. The browser adds a class that transitions it to being visible

<p data-height="268" data-theme-id="17657" data-slug-hash="xGBaRo" data-default-tab="result" data-user="jeffshaver" class='codepen'>See the Pen <a href='http://codepen.io/jeffshaver/pen/xGBaRo/'>xGBaRo</a> by Jeffrey Shaver (<a href='http://codepen.io/jeffshaver'>@jeffshaver</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>