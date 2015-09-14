angular.module("adminApp").directive('tabswitch',[function(){
	return{
		restrict: 'A',
		link: function(scope, el, attr){
			el.find("li").find("a").on("click", function(e){
				e.preventDefault();
				$(this).tab("show");
			})
		}
	}
}]).directive('siteCustomize', [function(){
	return{
		restrict: 'EA',
		
		link: function(scope, el, attrs){
			el.on("mouseover", function(){
				console.log($(this).find(".site-hover"))
			    $(this).find(".site-hover").show();
				// el.find(".site-hover").show();
			}).on("mouseout", function(){
				 $(this).find(".site-hover").hide();
			})
		}
	}
}]).directive('siteCustomizeBtn', [function(){
	return{
		restrict: 'EA',
		replace: true,
		template: '<div class="site-hover"><div class="btn btn-info s-btn-info btn-edit">修改</div>'+
		'<div class="btn btn-info s-btn-info btn-delete">删除</div></div>',
		link: function(scope, el, attr){
			el.parent().on("mouseover", function(){
				$(this).find(".site-hover").show();
			}).on("mouseout", function(){
				$(this).find(".site-hover").hide();
			});
			$(el).on("click", 'div.btn-edit', function(){
				$(".site-edit-box").fadeIn();
			})
		}
	}
}])