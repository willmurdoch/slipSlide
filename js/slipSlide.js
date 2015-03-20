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
		var sWrap = this;
		var ssContainer = this.parents('.ssContainer');
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			this.addClass('ssMobile');
		}
		if(settings.nav == true){
			if(settings.navType == 'dot') dotNav();
			else{
				arrowNav();
				sWrap.append('<div class="slideSpacer"></div>');
			}
		}
		/*Dot based navigation*/
		function dotNav(){
			ssContainer.prepend('<div class="slideNav"></div>');
			slide.each(function(i){
				$(this).addClass('slide').attr('data-count',i);
				ssContainer.find('.slideNav').append('<div class="sCirc" data-count="'+i+'"></div>');
			});
			ssContainer.find('.sCirc').first().addClass('current');
			ssContainer.find('.sCirc').click(function(){
				if(seanBlock == false){
					seanBlock = true;
					ssContainer.find('.sCirc').removeClass('current');
					$(this).addClass('current');
					var nextSlide = $(this).attr('data-count');
					var nextPos = sWrap.outerWidth()*nextSlide;
					sWrap.animate({
						scrollLeft: nextPos
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
						sWrap.animate({
							scrollLeft: parseInt(sWrap.scrollLeft()) - (sWrap.find('.slide').width()+(parseInt(sWrap.find('.slide').css('margin-left')))+(parseInt(sWrap.find('.slide').css('margin-right'))))
						},settings.speed);
					}
					else{
						sWrap.animate({
							scrollLeft: parseInt(sWrap.scrollLeft()) + sWrap.find('.slide').width()+(parseInt(sWrap.find('.slide').css('margin-left')))+(parseInt(sWrap.find('.slide').css('margin-right')))
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