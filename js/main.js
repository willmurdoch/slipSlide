$(document).ready(function(){
	$('.slide').wuSlide({
		color:"red"
	});
});
/*Wu Slider Core*/
(function($){
	$.fn.wuSlide = function(options){
		 var settings = $.extend({
			// These are the defaults.
			color: "#556b2f",
		}, options );
		$(this).css('background',settings.color);
		console.log(this);
		 return this.css({
			color: settings.backgroundColor
		});
	};
}(jQuery));
