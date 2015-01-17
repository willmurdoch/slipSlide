/*slipSlide Core*/
(function($){
	$.fn.slipSlide = function(options){
		var sStart = 0, sCount = 0, sPos = 0,sOrig,focusSize,focusSlide,currentSlides;
		var sParent = this;
		var slide = this.children();
		
		/*Settings*/
		var settings = $.extend({
			focusMode: 1,
			clickable: true,
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
			var stopSpam = false,endSlide = false;
			slideCheck();
			slideFocus();
			var sPos = slide.first().position().left;
			this.find('.slideNav div').click(function(e){
				var dir = '';
				if(stopSpam == false){
					/*Figure out which button you clicked, the focus, and where it should move to*/
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
						endSlide = false;
						myFocus.removeClass('focus');
						nextFocus.addClass('focus');
						if(!nextFocus.hasClass('current')){
							if(dir == 'left') sPos = - nextFocus.position().left;
							else sPos = - sWrap.find('.current').first().next().position().left;
						}
						if(settings.focusMode == 2){
							if(nextFocus.hasClass('current')){
								if (sCount > 2){
									if(dir == 'left'){
										if(slide.first().offset().left < - slide.first().width()){
											sPos = - nextFocus.prev().position().left;
										}
									}
									else{
										if(slide.last().offset().left > sWrap.width()){
											sPos = - nextFocus.prev().position().left;
										}
									}
								}
							}
							
						}
					}
					/*If there are no more slides*/
					else{
						endSlide = true;
						myFocus.removeClass('focus');
						if(dir == 'left'){
							/*Move to last slide*/
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
							/*Move to first slide*/
							nextFocus = slide.first();
							sPos = 0;
						}
						if(settings.focusMode == 1){
							nextFocus.addClass('focus');
						}
						else{
							nextFocus.addClass('focus');
						}
					}
					
					/*Animate wrapper then re-check visible elements*/
					sWrap.animate({'left': sPos +'px'},settings.speed,function(){
						slideCheck();
						stopSpam = false;
					});
				}
			});
		} 
		if(settings.clickable == true){
			slide.click(function(){
				sWrap.find('.focus').removeClass('focus');
				$(this).addClass('focus');
			});
		}
		/*Resize*/
		var sOrig;
		$(window).resize(function(){
			sOrig = sWrap.find('.current').first();
			slideWidth = 0;
			sWrap.css('left', -(sWrap.find('.current').first().position().left));
			if((sWrap.find('.focus').offset().left < 0) || (sWrap.find('.focus').offset().left > (sWrap.width() - 1))){
				sPos = - sWrap.find('.focus').position().left;
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
			focusSlide = 0;
			currentSlides = sWrap.find('.current');
			focusSize = currentSlides.length;
			if(focusSize > 1){
				if(settings.focusMode == 1){
					currentSlides.first().addClass('focus');
				}
				else{
					focusSlide = (focusSize/2).toFixed(0) - 1;
					currentSlides.eq(focusSlide).addClass('focus');
				}
			}
			else{
				currentSlides.addClass('focus');
			}
			
		}
	};
}(jQuery));