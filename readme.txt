A responsive jQuery based carousel plugin. Built using jQuery 1.10.2.
Because the layout depends on inline-block, the lowest version of Internet Explorer supported is IE8.


Instructions:

1) Include slipSlide.js and slipSlide.css.
2) When the document is ready, call $(element).slipSlide()
3) Options are available through the format below

$(element).slipSlide({
	option: value
});


Options:

focus - boolean, adds class to middle element (recommended only when displaying an odd number of slides)
focusMode - int, 1 highlights the left and 2 highlights the center
speed - int, in ms
nav - 3 by default, if you have fewer than this many slides the nav will not be added