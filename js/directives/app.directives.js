!function(){

	'use strict';
	angular.module("app.directives",[])
	.directive('fullscreen',['uiLoad','$document', '$window', function(uiLoad, $document, $window){
		return{
			restrict: 'AC',
			template: '<i class="fa fa-expand fa-fw icon-expand"></i><i class="fa fa-compress fa-fw icon-compress"></i>',
			link: function(scope, el, attr){
				el.addClass('hide');
				uiLoad.load('vendor/libs/screenfull.min.js').then(function(){
	 
				    // disable on ie11
					if(screenfull.enabled && !navigator.userAgent.match(/Trident.*rv:11\./)){
						el.removeClass('hide');
					}
					el.on("click", function(){
						var target;
						attr.target &&　(target == $(attr.target)[0]);
						screenfull.toggle(target);
					});
					$document.on(screenfull.raw.fullscreenchange, function(){
						if(screenfull.isFullscreen){
							el.addClass('active');
						}else{
							el.removeClass('active');
						}
					})
				});																														
			}
		}
	}]).directive('collapseAccordion',[function(){
	 	return{
	 		restrict: 'A',
	 		link: function(scope, el, attr){
	 			el.find("a").on("click", function(){
	 				$(this).parent().siblings().find("ul").slideUp(300);
	 				$(this).parent().find("ul").slideToggle(300);
	 			})
	 		}
	 	}
	}]).directive('tabswitch',[function(){
		return{
			restrict: 'A',
			link: function(scope, el, attr){
				el.find("li").find("a").on("click", function(e){
					e.preventDefault();
					$(this).tab("show");
				})
			}
		}
	}]).directive('uiToggleClass', ['$timeout', '$document', function($timeout, $document) {
    return {
      	restrict: 'AC',
      	link: function(scope, el, attr) {
	        el.on('click', function(e) {
	          	e.preventDefault();
	         	var classes = attr.uiToggleClass.split(','),
	             	targets = (attr.target && attr.target.split(',')) || Array(el),
	             	key = 0;
	          	angular.forEach(classes, function( _class ) {
		            var target = targets[(targets.length && key)];  
		            ( _class.indexOf( '*' ) !== -1 ) && magic(_class, target);
		            $( target ).toggleClass(_class);
		            key ++;
	          	});
	          	//$(el).toggleClass('active');

	          	function magic(_class, target){
		            var patt = new RegExp( '\\s' + 
		                _class.
		                  replace( /\*/g, '[A-Za-z0-9-_]+' ).
		                  split( ' ' ).
		                  join( '\\s|\\s' ) + 
		                '\\s', 'g' );
		            var cn = ' ' + $(target)[0].className + ' ';
		            while ( patt.test( cn ) ) {
		              cn = cn.replace( patt, ' ' );
		            }
		            $(target)[0].className = $.trim( cn );
	          	}
	        });
	    }
    };
  }])
}();

