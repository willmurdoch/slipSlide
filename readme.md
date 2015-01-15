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

#Options:

###count  
Int, minimum slides for nav to appear    
###focusMode  
int, 1 focuses on the left and 2 focuses on the center
###speed   
int, animation speed in ms