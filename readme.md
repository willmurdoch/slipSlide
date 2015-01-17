This is a work in progress!  
#slipSlide  
###A responsive jQuery based carousel plugin  
####Built using jQuery 1.10.2  
*Because the layout depends on inline-block, the lowest supported version of Internet Explorer is IE8.

Demo  
http://willmurdoch.com/slipSlide  
http://willmurdoch.com/slipSlide/

#Instructions:

1) Include slipSlide.js and slipSlide.css  
2) When the document is ready, call  

```
$(element).slipSlide()
```

3) Options are available through the format below  

```
$(element).slipSlide({
	option: value
});
```

For the HTML, you need a container to call slipSlide on, and some sort with elements inside. Each child is a slide.  

For example,  
```
<div class="slide">
	<p>1</p>
	<img src="img/slide.png" />
</div>
<div class="slide">
	<p>2</p>
	<img src="img/slide.png" />
</div>
<div class="slide">
	<p>3</p>
	<img src="img/slide.png" />
</div>
```

Or  
```
<img src="img/test1.jpg" />
<img src="img/test2.jpg" />
<img src="img/test3.jpg" />
<img src="img/test4.jpg" />
<img src="img/test3.jpg" />
```

Or even
```
<img src="img/test1.jpg" />
<div class="slide">
	<p>1</p>
	<img src="img/slide.png" />
</div>
<img src="img/test3.jpg" />
<img src="img/test4.jpg" />
<div class="slide">
	<p>2</p>
	<img src="img/slide.png" />
</div>
```

I recommend styling your slides to use percentage based widths to keep everything responsive. The default stylesheet does so if you follow the example markup.

#Options:

###focusMode  
int, 1 focuses on the left and 2 focuses on the center.
###clickable

Boolean, true by default. Clicking a div will give it the focus.
###speed   
int, animation speed in ms. 500 by default.

###nav
Boolean, true by default. Disables navigation if set to false.