/*wmSlider Core*/
(function($){
	$.fn.wmSlider = function(options){
		var sStart = 0, sCount = 0, sPos = 0;
		var sParent = this;
		var slide = this.children();
		
		/*Settings*/
		var settings = $.extend({
			count: 1,
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
		var sWrap = this.find('.slideWrap');
		sWrap.wrap("<div class='slideSize'></div>");
		if(settings.nav == true){
			this.prepend("<div class='slideNav'><div class='lBtn'></div><div class='rBtn'></div></div>");
		} 
		slideCheck();
		if(settings.focus == true){
			slideFocus();
		}
		
		/*Bindings*/
		var stopSpam = false;
		this.find('.slideNav div').click(function(e){
			if(stopSpam == false){
				stopSpam = true;
				var myFocus = sParent.find('.focus');
				
				/*Left*/
				if($(this).hasClass('lBtn')){
					if(myFocus.prev().length){
						if(myFocus.prev().hasClass('current')){
							myFocus.removeClass('focus').prev().addClass('focus');
						}
						else{
							sPos = sStart + myFocus.prev().outerWidth(true);
							myFocus.removeClass('focus').prev().addClass('current focus');
						}
					}
					else{
						sPos = -(slide.last().position().left);
						myFocus.removeClass('focus');
						slide.last().addClass('current focus');
					}
				}
				
				/*Right*/
				else{
					if(myFocus.next().length){
						if(myFocus.next().hasClass('current')){
							myFocus.removeClass('focus').next().addClass('focus');
						}
						else{
							sPos = sStart - myFocus.next().outerWidth(true);
							myFocus.removeClass('focus').next().addClass('current focus');
						}
					}
					else{
						sPos = 0;
						myFocus.removeClass('focus');
						slide.first().addClass('current focus');
					}
				}
				
				/*Animate wrapper then re-check visible elements*/
				sWrap.animate({'left':sPos+'px'},settings.speed,function(){
					sStart = sPos;
					slideCheck();
					stopSpam = false;
				});
			}
		});
		
		/*Resize*/
		$(window).resize(function(){
			sStart = 0;
			slideWidth = 0;
			slide.each(function(){
				slideWidth += $(this).outerWidth(true);
			});
			sWrap.removeAttr('style');
			sWrap.css('left',-(sWrap.find('.focus').position().left));
			slideCheck();
		});
		
		
		/*Detect which slides are visible*/
		function slideCheck(){
			sCount = 0;
			slide.removeClass('current');
			slide.each(function(){
				if(($(this).offset().left > 0) && ($(this).offset().left < ($(window).width() - $(this).width()))){
					$(this).addClass('current');
					sCount++;
				}
			});	
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