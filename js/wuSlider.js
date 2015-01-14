/*WuSlider Core*/
(function($){
	$.fn.wuSlide = function(options){
		var wuStart = 0, wuCount = 0, wuDir = 0;
		var wuParent = this;
		var slide = this.children();
		
		/*Settings*/
		var settings = $.extend({
			focus: false,
			focusMode: 1,
			cycle: true,
			speed: 500,
			nav: true
		}, options );
		
		/*Get width of all elements together*/
		var slideWidth = 0;
		slide.each(function(){
			slideWidth += $(this).outerWidth(true);
		});
		
		/*Layout*/
		this.wrapInner("<div class='slideWrap'></div>");
		this.find('.slideWrap').wrap("<div class='slideSize'></div>");
		if(settings.nav == true){
			this.prepend("<div class='slideNav'><div class='lBtn'></div><div class='rBtn'></div></div>");
		}
		slideCheck();
		
		/*Bindings*/
		
		
		$('.slideNav div').click(function(e){
			if($(this).hasClass('lBtn')){
				wuDir = wuStart + slide.outerWidth(true);
				if($('.slideWrap .focus').prev().length){
					$('.slideWrap .focus').removeClass('focus').prev().addClass('current focus');
				}
				else{
					wuDir = -(slide.outerWidth(true)*(slide.length-wuCount));
				}
			}
			else{
				wuDir = wuStart - slide.outerWidth(true);
				if($('.slideWrap .focus').next().length){
					$('.slideWrap .focus').removeClass('focus').next().addClass('current focus');
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
		
		/*Resize*/
		$(window).resize(function(){
			wuStart = 0;
			$('.slideWrap').removeAttr('style');
			slideCheck();
		});
		
		
		/*Detect which slides are visible*/
		function slideCheck(){
			wuCount = 0;
			slide.removeClass('current').removeClass('focus');
			slide.each(function(){
				if(($(this).offset().left > 0) && ($(this).offset().left < $(window).width()-$(this).width())){
					$(this).addClass('current');
					wuCount++;
				}
			});
			if(settings.focus == true){
				slideFocus();
			}
		}
		
		/*Determine which element gets the focus class*/
		function slideFocus(){
			var focusSlide = 0;
			if(settings.focusMode == 1){
				if($('.slideWrap .current').length > 1){
					$('.slideWrap .current').first().addClass('focus');
				}
				else{
					$('.slideWrap .current').addClass('focus');
				}
			}
			else{
				if($('.slideWrap .current').length > 1){
					focusSlide = ($('.slideWrap .current').length/2).toFixed(0) - 1;
					$('.slideWrap .current').eq(focusSlide).addClass('focus');
				}
				else{
					$('.slideWrap .current').addClass('focus');
				}
			}
		}
	};
}(jQuery));
