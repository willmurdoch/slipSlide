$(document).ready(function(){
	$('#spot1').wuSlide({
		focus: true
	});
});

/*Wu Slider Core*/
(function($){
	$.fn.wuSlide = function(options){
		var slide = this.children();
		var wuParent = this;
		
		/*Settings*/
		var settings = $.extend({
			focus: false,
			speed: 500,
			count: 3
		}, options );
		
		/*Layout*/
		this.wrapInner("<div class='slideWrap'></div>");
		this.find('.slideWrap').wrap("<div class='slideSize'></div>");
		if(slide.length > settings.count){
			this.prepend("<div class='slideNav'><div class='lBtn'></div><div class='rBtn'></div></div>");
		}
		
		/*Bindings*/
		var wuStart = 0, wuCount = 0, wuDir = 0;
		$('.slideNav div').click(function(e){
			if($(this).hasClass('lBtn')){
				wuDir = wuStart + slide.outerWidth(true);
				if($('.slideWrap .current').first().prev(slide).length){
					$('.slideWrap .current').removeClass('current').prev(slide).addClass('current');
				}
				else{
					wuDir = -(slide.outerWidth(true)*(slide.length-wuCount));
				}
			}
			else{
				wuDir = wuStart - slide.outerWidth(true);
				if($('.slideWrap .current').last().next(slide).length){
					$('.slideWrap .current').removeClass('current').next(slide).addClass('current');
				}
				else{
					wuDir = 0;
				}
			}
			wuParent.find('.slideWrap').animate({'left':wuDir+'px'},settings.speed,function(){
				wuStart = wuDir;
				slideCheck();
			});
		});
		
		/*Output*/
		slideCheck();
		
		/*Resize*/
		$(window).resize(function(){
			wuStart = 0;
			slideSize();
		});
		
		function slideSize(){
			$('.slideWrap').removeAttr('style');
			slideCheck();
		}	
		function slideCheck(){
			wuCount = 0;
			slide.removeClass('current').removeClass('focus');
			slide.each(function(){
				if($(this).offset().left > 0 && $(this).offset().left < $(window).width()-$(this).width()){
					$(this).addClass('current');
					wuCount++;
				}
			});
			if(settings.focus == true){
				if($('.slideWrap .current').length > 1){
					$('.slideWrap .current').first().next().addClass('focus');
				}
				else{
					$('.slideWrap .current').addClass('focus');
				}
			}
		}
	};
}(jQuery));
