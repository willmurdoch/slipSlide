/*slipSlide Core*/
(function($){
	$.fn.slipSlide = function(options){
		var sStart = 0, sCount = 0, sPos = 0;
		var sParent = this;
		var slide = this.children();
		
		/*Settings*/
		var settings = $.extend({
			count: 1,
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
		slideFocus();
		
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
							sPos = - sWrap.find('.current').first().position().left;
							myFocus.removeClass('focus').prev().addClass('focus');
						}
						else{
							myFocus.removeClass('focus').prev().addClass('current focus');
							sPos = - sWrap.find('.focus').position().left;
						}
					}
					else{
						myFocus.removeClass('focus');
						slide.last().addClass('current focus');
						if(myFocus.siblings('.current').length > 1){
							sPos = - (slide.last().position().left - (sParent.find('.slideSize').width() - slide.last().outerWidth(true)));
						}
						else{
							sPos = - slide.last().position().left;
						}
					}
				}
				
				/*Right*/
				else{
					if(myFocus.next().length){
						if(myFocus.next().hasClass('current')){
							sPos = - sWrap.find('.current').first().position().left;
							myFocus.removeClass('focus').next().addClass('focus');
						}
						else{
							sPos = - sWrap.find('.current').first().next().position().left;
							myFocus.removeClass('focus').next().addClass('current focus');
						}
					}
					else{
						myFocus.removeClass('focus');
						slide.first().addClass('current focus');
						sPos = 0;
					}
				}
				/*Animate wrapper then re-check visible elements*/
				sWrap.animate({'left': sPos +'px'},settings.speed,function(){
					slideCheck();
					stopSpam = false;
				});
			}
		});
		
		/*Resize*/
		var sOrig;
		$(window).resize(function(){
			sOrig = sWrap.find('.current').first();
			slideWidth = 0;
			sWrap.css('left', -(sWrap.find('.current').first().position().left));
			if((sWrap.find('.focus').offset().left < 0) || (sWrap.find('.focus').offset().left > (sWrap.width() - 1))){
				sWrap.css('left', -(sWrap.find('.focus').position().left));
			}
			slide.each(function(){
				slideWidth += $(this).outerWidth(true);
			});
			slideCheck();
		});
		
		
		/*Detect which slides are visible*/
		function slideCheck(){
			sCount = 0;
			slide.removeClass('current');
			slide.each(function(){
				if(($(this).offset().left > 0) && ($(this).offset().left < ($(window).width() - $(this).width()-1))){
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
