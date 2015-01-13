$(document).ready(function(){
	$('#spot1').wuSlide({
		background:"gold"
	});
});
var wuSlide;
/*Wu Slider Core*/
(function($){
	
	var wuSlide,slideWidth,slideHeight,settings;
	$.fn.wuSlide = function(options){
		var slide = this.children();
		var slideWidth = slide.outerWidth()-1;
		var slideHeight = slide.outerHeight();
		var settings = $.extend({
			// These are the defaults.
			background: "red",
		}, options );
		this.wrapInner("<div class='slideWrap'></div>");
		this.prepend("<div class='slideNav'><div class='lBtn'></div><div class='rBtn'></div></div>");
		$('.slideWrap').width((slide.outerWidth(true)*(slide.length+1)));
		/*Apply Options*/
		slide.width(slideWidth);
		slide.height(slideHeight);
	};
	$(this).parents(window).resize(function(){
		slide.removeAttr('style');
		console.log('going');
		slideWidth = slide.outerWidth()-1;
		slideHeight = slide.outerHeight();
		$('.slideWrap').width((slide.outerWidth(true)*(slide.length+1)));
	});
}(jQuery));
