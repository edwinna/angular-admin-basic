!function(){

	'use strict';
	angular.module("adminApp")
		.directive('echarts',['$rootScope',function($rootScope){
		return{
			restrict:'AE',
			scope:{
				data: '@'
				// type: '@', 
				// oncreate: '&'
			},
			// compile: function(scope, el, attr){
			// 	// console.log(scope)
			// 	var myChart = echarts.init(el[0]);
			// 	$(el).onload(function(){
			// 		console.log(123)
			// 	})
			// },
			// require: 'ngModel',
			link: function(scope, el, attr){
				// scope.oncreate(scope.data,el);
				//var myChart = echarts.init(el[0]);
				// scope.initData(myChart);
				//scope.$apply("initData(echarts)")
				// scope.oncreate(data);
				// myChart.setOption(scope.opts);
				



				//scope.$apply("load()")
			}
		}	
	}]).directive('uiDropzone',['$timeout',function($timeout){
		return{
			restrict: 'AE',
			scope: {
				'attrid': '@',
				'url': '@'
			},
			replace: false,
			template: '<form method="post" enctype="multipart/form-data" class="dropzone" id="{{attrid}}" action="{{url}}" src="{{imgUrl}}">'+'</form>',
			link: function(scope, el, attr){
				var timer = $timeout(function(){
					var mydz = new Dropzone("#"+attr.attrid, { 
						url: attr.url,
						addRemoveLinks: true,
						dictCancelUpload: "x",
						dictDefaultMessage: attr.message,
						init: function(){
							
						}
					});
				},500);
				// if(el.find("form").attr("id")){
				// 	console.log(el.find("form").attr("id"))
				// }
				// setTimeout(function(){
				// },400)
			}
		}
	}])
}()