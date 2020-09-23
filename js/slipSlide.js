/*slipSlide Core*/
(function($){
	$.fn.slipSlide = function(options){
		var sParent = this;
		var spamBlock = false;
		var slide = this.children();
		/*Settings*/
		var settings = $.extend({
			speed: 500,
			nav: true,
			navDots: false,
			navArrows: true
		}, options );
		/*Layout*/
		this.wrap('<div class="ssContainer"></div>');
		var sWrap = this;
		var ssContainer = this.parents('.ssContainer');
		if(settings.navDots == true) dotNav();
		if(settings.navArrows == true) arrowNav();

		/*Dot based navigation*/
		function dotNav(){
			ssContainer.prepend('<div class="slideNav"></div>');
			slide.each(function(i){
				$(this).addClass('slide').attr('data-count',i);
				ssContainer.find('.slideNav').append('<div class="sCirc" data-count="'+i+'"></div>');
			});
			ssContainer.find('.sCirc').first().addClass('current');
			ssContainer.find('.sCirc').click(function(){
				if(spamBlock == false){
					spamBlock = true;
					ssContainer.find('.sCirc').removeClass('current');
					$(this).addClass('current');
					var nextSlide = $(this).attr('data-count');
					var nextPos = sWrap.scrollLeft() + sWrap.find('.slide[data-count="'+nextSlide+'"]').position().left;
					console.log(nextPos);
					sWrap.animate({
						scrollLeft: nextPos
					},settings.speed,function(){
						spamBlock = false;
					});
				}
			});
		}

		/*Left/right arrow based navigation*/
		function arrowNav(){
			ssContainer.prepend('<div class="slideNav"><div class="lBtn"></div><div class="rBtn"></div></div>');
			$('.slideNav .lBtn, .slideNav .rBtn').click(function(){
				if(spamBlock == false){
					spamBlock = true;
					if($(this).hasClass('lBtn')){
						sWrap.animate({
							scrollLeft: sWrap.scrollLeft() - slide.outerWidth(true)
						},settings.speed);
					}
					else{
						sWrap.animate({
							scrollLeft: sWrap.scrollLeft() + slide.outerWidth(true)
						},settings.speed);
					}
					setTimeout(function(){
						spamBlock = false;
					},settings.speed);
				}
			});
		}
	};
}(jQuery))
