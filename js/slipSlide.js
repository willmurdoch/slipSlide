/*slipSlide Core*/
(function($){
	$.fn.slipSlide = function(options){
		var sStart = 0, sCount = 0, sPos = 0,sOrig;
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
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			sParent.find('.slideSize').addClass('mobile');
		}
		else if(settings.nav == true){
			this.prepend("<div class='slideNav'><div class='lBtn'></div><div class='rBtn'></div></div>");
			var stopSpam = false;
			slideCheck();
			slideFocus();
			var sPos = slide.first().position().left;
			this.find('.slideNav div').click(function(e){
				var dir = '';
				if(stopSpam == false){
				
					/*Figure out the focus, and where it should move to*/
					stopSpam = true;
					var myFocus = sParent.find('.focus');
					if($(this).hasClass('lBtn')){
						var nextFocus = myFocus.prev();
						dir = 'left';
					}
					else{
						var nextFocus = myFocus.next();
						dir = 'right';
					}
					
					/*If there's another slide to bring in*/
					if(nextFocus.length){
						myFocus.removeClass('focus');
						nextFocus.addClass('focus');
						if(!nextFocus.hasClass('current')){
							if(dir == 'left') sPos = - nextFocus.position().left;
							else sPos = - sWrap.find('.current').first().next().position().left;
						}
					}
					/*If there are no more slides*/
					else{
						myFocus.removeClass('focus');
						if(dir == 'left'){
							if(myFocus.siblings('.current').length >= 1){
								nextFocus = slide.last();
								sPos = - (nextFocus.position().left - (sParent.find('.slideSize').width() -nextFocus.outerWidth(true)));
							}
							else{
								nextFocus = slide.last();
								sPos = - nextFocus.position().left;
							}
						}
						else{
							nextFocus = slide.first();
							sPos = 0;
						}
						nextFocus.addClass('focus');
					}
					
					/*Animate wrapper then re-check visible elements*/
					sWrap.animate({'left': sPos +'px'},settings.speed,function(){
						slideCheck();
						stopSpam = false;
					});
				}
			});
		} 
		
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
		
		/*Determine which element gets the focus class on load*/
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
