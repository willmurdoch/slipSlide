/*slipSlide Core*/
(function($){
	$.fn.slipSlide = function(options){
		var sParent = this;
		var seanBlock = false;
		var slide = this.children();
		/*Settings*/
		var settings = $.extend({
			speed: 500,
			nav: true
		}, options );
		/*Layout*/
		this.wrap('<div class="ssContainer"></div>');
		this.wrapInner('<div class="slideWrap"></div>');
		var sWrap = this.find('.slideWrap');
		var ssContainer = this.parents('.ssContainer');
		sWrap.wrap('<div class="slideSize"></div>');
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			sParent.find('.slideSize').addClass('mobile');
		}
		sWrap.append('<div class="slideSpacer"></div>');
		if(settings.nav == true){
			if(settings.navType == 'dot') dotNav();
			else arrowNav();
		}
		/*Dot based navigation*/
		var scroller = sWrap.parents('.slipSlide');
		function dotNav(){
			ssContainer.prepend('<div class="slideNav"></div>');
			slide.each(function(i){
				$(this).addClass('simpSli'+i);
				ssContainer.find('.slideNav').append('<div class="sCirc'+i+' sCirc"></div>');
			});
			ssContainer.find('.sCirc').first().addClass('current');
			ssContainer.find('.sCirc').click(function(){
				if(seanBlock == false){
					seanBlock = true;
					ssContainer.find('.sCirc').removeClass('current');
					$(this).addClass('current');
					var nextSlide = String($(this).attr('class').split(' ', 1));
					nextSlide = nextSlide.substr(5,6);
					scroller.animate({
						scrollLeft: $('.simpSli'+nextSlide).position().left
					},settings.speed,function(){
						seanBlock = false;
					});
				}
			});
		}
		
		/*Left/right arrow based navigation*/
		function arrowNav(){
			ssContainer.prepend('<div class="slideNav"><div class="lBtn"></div><div class="rBtn"></div></div>');
			$('.slideNav div').click(function(){
				if(seanBlock == false){
					seanBlock = true;
					if($(this).hasClass('lBtn')){
						scroller.animate({
							scrollLeft: parseInt(scroller.scrollLeft()) - (sWrap.find('.slide').width()+(parseInt(sWrap.find('.slide').css('margin-left'))*2))
						},settings.speed);
					}
					else{
						scroller.animate({
							scrollLeft: parseInt(scroller.scrollLeft()) + sWrap.find('.slide').width()+(parseInt(sWrap.find('.slide').css('margin-left'))*2)
						},settings.speed);
					}
					setTimeout(function(){
						seanBlock = false;
					},settings.speed);
				}
			});
		} 
	};
}(jQuery))