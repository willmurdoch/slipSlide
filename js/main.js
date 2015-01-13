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
		/*Settings*/
		var settings = $.extend({
			background: "red",
		}, options );
		/*Layout*/
		this.wrapInner("<div class='slideWrap'></div>");
		this.prepend("<div class='slideNav'><div class='lBtn'></div><div class='rBtn'></div></div>");
		/*Output*/
		slide.width(slideWidth);
		slide.height(slideHeight);
		$('.slideWrap').width((slide.outerWidth(true)*(slide.length+1)));
		
		/*Resize*/
		$(window).resize(function(){
			slide.removeAttr('style');
			$('.slideWrap').removeAttr('style');
			slideWidth = slide.outerWidth()-1;
			slideHeight = slide.outerHeight();
			slide.width(slideWidth);
			slide.height(slideHeight);
			$('.slideWrap').width((slide.outerWidth(true)*(slide.length+1)));
		});
	};
}(jQuery));
