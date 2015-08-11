---
layout: post
title: Tooltips for range inputs
permalink: tooltips-for-range-inputs
tldr: Range input tooltips ftw
comments: true
---

A few days ago I wrote a color conversion codepen:

<p data-height="268" data-theme-id="17657" data-slug-hash="KAGaB" data-default-tab="result" data-user="jeffshaver" class='codepen'>See the Pen <a href='http://codepen.io/jeffshaver/pen/KAGaB/'>Colorscape Converter</a> by Jeffrey Shaver (<a href='http://codepen.io/jeffshaver'>@jeffshaver</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

Note: As of right now, this only seems to work in Chrome. Although I have added the styles for what mozilla/ie/safari, Chrome seems to be the only one that listens to them.

I have been fixing it up and styling it the past few days and it's slowly looking nicer. However, at one point I really wanted to have a little tooltip that followed the "grabber" on the range input that said the value of the input (so I could potentially get rid of the the Red, Green, Blue, Hue, Saturation and Luminance boxes). But I did not want to go through the trouble of tracking the position it was supposed to be in and all that. I just wanted to put the value somewhere and have it work.

After some googling. I found that Chrome, Firefox and IE all have different ways of styling range inputs (crazy pseudo selectors). Lets say you want to style the grabber:

{% highlight css %}
input[type=range]::-webkit-slider-thumb
input[type=range]::-ms-thumb
input[type=range]::-moz-range-thumb
{% endhighlight %}

However, for some reason you can't apply these styles using the comma operator:

{% highlight css %}
/* Doesn't work */
input[type=range]::-webkit-slider-thumb, input[type=range]::-ms-thumb, input[type=range]::-moz-range-thumb {}
{% endhighlight %}

I don't know why this is happening (if someone knows, it would be cool to put it in the comments).

UPDATE:
After some more research, it appears that combining the selectors fail because of spec reasons. If one selector "errors out", all styles regarding the entire style block should be discarded for consistency reasons ([see this answer](http://stackoverflow.com/questions/13816764/invalid-css-selector-causes-rule-to-be-dropped-what-is-the-rationale/13831877#13831877)).

UPDATE 2:
After learning about the above spec implications, I added the CSS to the pens to handle Chrome, Safari, IE and Firefox. I also ended up changing my own utility (styl.js) to be able to separate out vendor prefixed selectors.

I digress...

Knowing this, we can use all those weird thumb pseudo selectors and the :focus/:after pseudo selectors in order to make a little tooltip when the range input is focused... That would look like this:

{% highlight css %}
input[type=range]:focus::-webkit-slider-thumb:after {}
input[type=range]:focus::-ms-thumb:after {}
input[type=range]:focus::-moz-range-thumb:after {}
{% endhighlight %}

The last issue that had to be solved was to have the content attribute when the input changes values. I had remember seeing somewhere that in newer browsers you could use ```content: attr(attribute-name)``` to set content dynamically, but you can't obtain the value that way (from what I understand). The only other option that I could think of was to just use JavaScript. In the color converter, I run this code:

{% highlight js %}
$('input[type="range"]').on('mousedown input', function() {
  styl.inject('input[type=range]:focus::-webkit-slider-thumb:after', [{content: "'"+this.value+"'"}]).apply();
});
{% endhighlight %}

styl is a small utility I wrote myself for CSS injection. Basically I just give it a selector and styles and then throw them into a stylesheet before the ```</body>``` tag. This updates the content property on mousedown and input events.

After all that, I found one final issue. Just getting it to work cross-browser. styl.js automatically combines css blocks that have the same styles. So ```-webkit-slider-thumb```, ```-ms-thumb``` and ```-moz-range-thumb``` would all be combined, and as I found out before, browsers don't like that...

Here is a pen that has the styles for chrome

<p data-height="268" data-theme-id="17657" data-slug-hash="hyqmv" data-default-tab="result" data-user="jeffshaver" class='codepen'>See the Pen <a href='http://codepen.io/jeffshaver/pen/hyqmv/'>Tooltips for Range Inputs</a> by Jeffrey Shaver (<a href='http://codepen.io/jeffshaver'>@jeffshaver</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>