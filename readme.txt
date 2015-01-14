A responsive jQuery based carousel plugin. Built using jQuery 1.10.2.
Include wuSlider.js and wuSlider.css.

Usage:

$(element).wuSlide();

Options:

$(element).wuSlide({
	option: value
});

focus - boolean, adds class to middle element (recommended only when displaying an odd number of slides)
speed - int, in ms
nav - 3 by default, if you have fewer than this many slides the nav will not be added