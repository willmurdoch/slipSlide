$(document).ready(function(){
	$('#spot1').wuSlide({
		speed: 500
	});
});
var wuSlide;
/*Wu Slider Core*/
(function($){
	$.fn.wuSlide = function(options){
		var slide = this.children();
		var wuParent = this;
		var slideWidth = slide.outerWidth()-1;
		var slideHeight = slide.outerHeight();
		
		/*Settings*/
		var settings = $.extend({
			speed: 750
		}, options );
		
		/*Layout*/
		this.wrapInner("<div class='slideWrap'></div>");
		this.find('.slideWrap').wrap("<div class='slideSize'></div>");
		this.prepend("<div class='slideNav'><div class='lBtn'></div><div class='rBtn'></div></div>");
		
		/*Output*/
		slideSize();
		
		/*Bindings*/
		var wuStart = 0,wuDir,wuTar;
		$('.slideNav div').click(function(e){
			if($(this).hasClass('lBtn')){
				wuDir = wuStart + slide.outerWidth(true);
			}
			else{
				wuDir = wuStart - slide.outerWidth(true);
			}
			wuParent.find('.slideWrap').animate({'left':wuDir+'px'},settings.speed,function(){
				wuStart = wuDir;
			});
		});
		
		/*Resize*/
		$(window).resize(function(){
			wuStart = 0;
			slideSize();
		});
		
		function slideSize(){
			slide.removeAttr('style');
			slideWidth = slide.outerWidth()-1;
			slideHeight = slide.outerHeight();
			slide.css({
				'width':slideWidth,
				'height':slideHeight,
				
			});
		}	
	};
}(jQuery));
