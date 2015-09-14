"use strict";
    angular.module('adminApp')
    .controller('userAdminController', ['$scope', 'queryUserService',function($scope,queryUserService){
		queryUserService.queryUserData('http://192.168.1.122:8002/test/test').success(function(rs){
			$scope.opts = {
      			// "processing": true,
        	// 	"serverSide": true,
        		"data": rs.data,
      			columns: [{"data": "name"},
		                {"data": "realName"},
		                {"data": "roleName"},
		                {"data": "sex"},
		                {"data": "tel"},
		                {"data": "remarks"},
		                {"data": null} ], 
		        columnDefs: [{
		        	targets: 6,
	                render: function ( data, type, item, meta ) {
	                        return '<button class="btn btn-default btn-edit"  style="margin-right:5px;">修改</button><button class="btn btn-default btn-delete">删除</button>';
	                }
		        }],
		        "deferRender": true //延迟加载提高datatable的渲染速度
      		};
      		var tb = $("#userTb").dataTable($scope.opts);
      	// 	tb.on('xhr', function(){
      	// 		var json = table.ajax.json();
    			// console.log( json.data.length +' row(s) were loaded' );
      	// 	})

		})
    		
    		// window.jsonpCallback = function(data){
    		// 	console.log("data" + data)
    		// }
			// queryUserService.queryUserData('http://192.168.1.122:8002/test/test',function(data){

			// 	console.log(JSON.parse(data))
			// })
    }])
"use strict";
    angular.module('adminApp')
    .controller('WechatController', ['$scope','weChatService',function($scope, weChatService){
    	$scope.opts = {
      			 // "processing": true,
        		// "serverSide": true,
      			// "ajax": $.fn.dataTable.pipeline( {
         //    		url: '/js/data/table.json',
         //    		pages: 5 // number of pages to cache
        	// 	}),
    		"ajax": '/js/data/table.json',
  			columns: [{"data": "name"},
	                {"data": "position"},
	                {"data": "office"},
	                {"data": "extn"},
	                {"data": "start_date"},
	                {"data": "salary"},
	                {"data": null} ],
	        columnDefs: [{
	        	targets: 6,
                render: function ( data, type, item, meta ) {
                        return '<button class="btn btn-default btn-edit"  style="margin-right:5px;">修改</button><button class="btn btn-default btn-delete">删除</button>';
                }
	        }],
		    "deferRender": true //延迟加载提高datatable的渲染速度
      	};
    }]).controller('sefDefMenuController', ['$scope','wechatService', function($scope, weChatService){
    	weChatService.querySefDefMenuArr('js/data/defMenu.json').success(function(data){
    		$scope.menuData = data;
    		$scope.isLast = function(index){
    			if(index != data.length-1){
    				return "border-r";
    			}else{
    				return false;
    			}
    		}
    	}).then(function(){
    		weChatService.querySefDefSubMenuArr('js/data/defSubMenu.json').success(function(data){
    			var subMenuData = data;
    			$scope.menuGroup = [];
    			$scope.menuData.forEach(function(menuItem, i){
    				var menuId = menuItem.id;
    				var group = [];
    				subMenuData.forEach(function(subItem, subIndex){
    					if(menuId == subItem.parentId){
    						group.push(subItem);
    					}
    				})
    				$scope.menuGroup.push({
    					id: menuId,
    					subMenu: group
    				}); 
    			})
    		})
    	})
    }]).controller('defMenuController', ['$scope','wechatService', 'wechartStorageService',function($scope, weChatService,store){
    	weChatService.querySefDefMenuArr('js/data/selfDefMenu.json').success(function(data){
            $scope.menus = data;
            var menus = store.get() || data;
           
            $scope.addSubMenu = function(menu){
                menu.subMenus.push({
                    "namwe":"",
                    "addOper": menu.addOper,
                    "parentId": menu.id,
                    "updOper":menu.addOper,
                    "addTime": new Date().getTime()
                });
                menus = $scope.menus;
                store.put(menus);
            }

            $scope.editMenu = function(sub,menu){
                sub.isabled = true;
            }
            $scope.doneEditing = function(sub, menu){
                sub.isabled = false;
                sub.name = sub.name.trim();
                store.put($scope.menus);
            }
            $scope.removeMenu = function(sub,menu){
                menu.subMenus.splice(menu.subMenus.indexOf(sub),1);
                menus[menus.indexOf(menu)] = menu;
                $scope.menus = menus;
                store.put(menus);
            }
     	});


    }])
"use strict";
    angular.module('adminApp')
		.controller('tableCtrl',['$scope','httpReqService',function($scope,httpReqService){
      		$scope.opts = {
      			 // "processing": true,
        		// "serverSide": true,
      			// "ajax": $.fn.dataTable.pipeline( {
         //    		url: '/js/data/table.json',
         //    		pages: 5 // number of pages to cache
        	// 	}),
        		"ajax": '/js/data/table.json',
      			columns: [{"data": "name"},
		                {"data": "position"},
		                {"data": "office"},
		                {"data": "extn"},
		                {"data": "start_date"},
		                {"data": "salary"},
		                {"data": null} ],
		        columnDefs: [{
		        	targets: 6,
	                render: function ( data, type, item, meta ) {
	                        return '<button class="btn btn-default btn-edit"  style="margin-right:5px;">修改</button><button class="btn btn-default btn-delete">删除</button>';
	                }
		        }],
		        "deferRender": true //延迟加载提高datatable的渲染速度
      		};
      	
}]).controller('chartCtrl', ['$scope','httpReqService','queryChartService','ConstantService', function($scope,httpReqService,queryChartService,ConstantService){
	// $scope.options = "123"
	 var _defaultOpts = {
	 	tooltip : {
        	trigger: 'axis'
		},
		calculable : true,
		yAxis : [{
		    type : 'value'
		}]
	 };

	var createChart = function(id,opts){
		var myChart = echarts.init(document.getElementById(id)); 
	 	myChart.setOption(opts); 
	}
	//查询折线图的数据
	queryChartService.getChartModel(ConstantService.LINECHART_REQ_URL).then(function(data){
		var stackSeries = new Array();
		$scope.lineOpts = $.extend({
			legend: {
				data: data.legend
			},
			xAxis : [{
		            type : 'category',
		            boundaryGap : false,
		            data : data.xField
			    }
			],
			series: data.series
		},_defaultOpts);
		data.series.forEach(function(item, i){
			item["itemStyle"] = { normal: {areaStyle: {type: 'default'}}},
			stackSeries.push(item);
		})
		$scope.stackOpts = $scope.lineOpts;
		$scope.stackOpts.series = stackSeries;
		createChart("linechart", $scope.stackOpts);
		createChart("stackchart", $scope.lineOpts);
	}).then(function(){                   
		queryChartService.getChartModel(ConstantService.BARCHART_REQ_URL).then(function(data){
			$scope.barOpts = $.extend({
				legend: {
					data: data.legend
				},
				xAxis : [{
			            type : 'category',
			            data : data.xField
				    }
				],
				series: data.series
			},_defaultOpts);
			createChart("barchart", $scope.barOpts);
		});
	});
 	httpReqService.queryChartData(ConstantService.PIECHART_REQ_URL).success(function(data){
 		$scope.pieOpts = {
 			 	tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
   				},
				legend: {
			  		orient : 'vertical',
			        x : 'left',
					data: data.legend
				},
				series: data.series
			};
			createChart("piechart", $scope.pieOpts);
 	})

}]).controller('dropzoneCtrl', ['$scope', function($scope){
	// var myDropzone = new dropzone("#dropz", { 
 //        url: "/upload",
 //        maxFiles: 10,
 //        maxFilesize: 5
 //    });
    $("#dropz").dropzone({
    	 url: "/upload",
        maxFiles: 10,
        maxFilesize: 5
    });
}]).controller('configChartCtrl',['$scope', function($scope){
	$scope.changeChart = function(){
		layer.confirm('你确定要修改图表么？', {icon: 3}, function(index){
			layer.close(index);
		});
	}
	$scope.addChart = function(){
		layer.open({
	            type: 1,
	            skin: 'layui-layer-demo', //样式类名
	            closeBtn: false, //不显示关闭按钮
	            shift: 2,
	            shadeClose: true, //开启遮罩关闭
	            content: '<div>showing</div>'
	        });
		}
}]).controller('uigridController',['$scope','httpReqService', function($scope,httpReqService){
	$scope.gridOptions =  {
    	enableSorting: true,
	    columnDefs: [
	      { field: 'name' },
	      { field: 'position' },
	      { field: 'salary', enableSorting: false },
	      {field:'start_date'},
	      {field:'office'},
	      {field:'extn'}
	    ],
	    onRegisterApi: function( gridApi ) {
	      $scope.grid1Api = gridApi;
	    }
  	};
    httpReqService.queryTableData('js/data/table.json').success(function(rs){
    	 $scope.gridOptions.data = rs.data;
    });
}]).controller('HeaderController',['$scope', function($scope){
	$.toggleSidebar = function(){

	}

	$.toggleDropdown = function(){
		
	}
}])
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
  }]); 
}();


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
}])
!function(){

	'use strict';
	angular.module("adminApp")
	.directive('uiDatatable',[function(){
		return{
			restrict: 'AE',
			scope: {
				opts: "=",
				initComplete: '&',
				resOpts: '@',
				onOrder: '&',
				onPage: '&',
				onSearch: '&'
			},
			link: function(scope, el, attr){

				
			var tableOpts = scope.opts;
			var resOpts = scope.resOpts ? JSON.parse(scope.resOpts) : null;

			//个性化列查询,下拉列表查询，选择某一列的值进行查询
			if(resOpts){
				$.extend(tableOpts, {

					initComplete: function(){
						var api = this.api();
						api.columns().indexes().flatten().each( function (i) {
			                var column = api.column( i );
			                if(resOpts.filterIndex && resOpts.filterWrapper && column.index() == resOpts.filterIndex){
			                	var fname = $("thead").find("tr").eq(0).find("th").eq(resOpts.filterIndex).text();
			                	var select = $('<select class="form-control input-sm"><option value="">'+ fname + '</option></select>')
			                    .prependTo($(resOpts.filterWrapper).empty() )
			                    .on('change', function () {
			                        var val = $.fn.dataTable.util.escapeRegex(
	                    				$(this).val()
	                				);
			                        column.search( val ? '^'+val+'$' : '', true, false ).draw();
			                    });
			 
				                column.data().unique().sort().each( function ( d, j ) {
				                    select.append( '<option value="'+d+'">'+d+'</option>' )
				                });	       
			                }
	            		});
					}				
				});
			}

			var dta = $(el).DataTable(tableOpts);
			

			

 				//自定义排序、搜索和分页的监听事件
				$(el).on('order.dt',function(event) {
				        scope.onOrder(event);
				    }).on('search.dt',function(event) {
				        scope.onSearch(event);
				    }).on('page.dt', function() {
				        scope.onPage(event);
			    });

				//删除操作
			    $(el).find('tbody').on( 'click', 'tr td.btn-edit', function () {
			        // var tr = $(this).closest('tr');
			        // var row = dt.row( tr );
			        // var idx = $.inArray( tr.attr('id'), detailRows );
			 
			        // if ( row.child.isShown() ) {
			        //     tr.removeClass( 'details' );
			        //     row.child.hide();
			 
			        //     // Remove from the 'open' array
			        //     detailRows.splice( idx, 1 );
			        // }
			        // else {
			        //     tr.addClass( 'details' );
			        //     row.child( format( row.data() ) ).show();
			 
			        //     // Add to the 'open' array
			        //     if ( idx === -1 ) {
			        //         detailRows.push( tr.attr('id') );
			        //     }
			        // }
			    });

			    //编辑操作

 
    			
			}
		}
	}])
}();


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
			template: '<form method="post" enctype="multipart/form-data" class="dropzone" id="{{attrid}}" action="{{url}}"></form>',
			link: function(scope, el, attr){
				var timer = $timeout(function(){
					var myDropzone = new Dropzone("#"+attr.attrid, { url: attr.url});
				},500)
				// if(el.find("form").attr("id")){
				// 	console.log(el.find("form").attr("id"))
				// }
				// setTimeout(function(){
				// },400)
			}
		}
	}])
}()
angular.module('adminApp').factory('httpReqService',['$http',function($http){
	var req = function(url) {
	     return $http({
	        method: 'GET',
	        url: url
	    });
    }
    return {
	    queryNav: function(url) { 
		    return req(url); 
		},
		queryChartData: function(url){
			return req(url);
		},
		queryTableData: function(url){
			return req(url);
		}
    };
}]).factory('queryChartService', ['$http','$q', function($http, $q){
	var req = function(url){
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: url
		}).success(function(data){
			// callback(data);
			deferred.resolve(data);
		}).error(function(data){
			deferred.resolve(data);
		});
		return deferred.promise;
	}
	return{
		getChartModel: function(url){
			return req(url);
		}
	}
}]).factory('queryUserService', ['$http','$q',function($http, $q){
	var req = function(url) {
	     return $http({
	        method: 'GET',
	        url: url
	    });
    }
	return {
		queryUserData: function(url){
			return req(url);
		}
	}
}])




angular.module('adminApp').factory('ConstantService', [function(){
	return{
		LINECHART_REQ_URL: '/js/data/lineChartData.json',
		BARCHART_REQ_URL: '/js/data/barChartData.json',
		PIECHART_REQ_URL: '/js/data/pieChartData.json'
	}
}])
'use strict';

/**
 * 0.1.1
 * Deferred load js/css file, used for ui-jq.js and Lazy Loading.
 * 
 * @ flatfull.com All Rights Reserved.
 * Author url: #user/flatfull
 */

angular.module('ui.load', [])
	.service('uiLoad', ['$document', '$q', '$timeout', function ($document, $q, $timeout) {

		var loaded = [];
		var promise = false;
		var deferred = $q.defer();

		/**
		 * Chain loads the given sources
		 * @param srcs array, script or css
		 * @returns {*} Promise that will be resolved once the sources has been loaded.
		 */
		this.load = function (srcs) {
			srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
			var self = this;
			if(!promise){
				promise = deferred.promise;
			}
      angular.forEach(srcs, function(src) {
      	promise = promise.then( function(){
      		return src.indexOf('.css') >=0 ? self.loadCSS(src) : self.loadScript(src);
      	} );
      });
      deferred.resolve();
      return promise;
		}

		/**
		 * Dynamically loads the given script
		 * @param src The url of the script to load dynamically
		 * @returns {*} Promise that will be resolved once the script has been loaded.
		 */
		this.loadScript = function (src) {
			if(loaded[src]) return loaded[src].promise;

			var deferred = $q.defer();
			var script = $document[0].createElement('script');
			script.src = src;
			script.onload = function (e) {
				$timeout(function () {
					deferred.resolve(e);
				});
			};
			script.onerror = function (e) {
				$timeout(function () {
					deferred.reject(e);
				});
			};
			$document[0].body.appendChild(script);
			loaded[src] = deferred;

			return deferred.promise;
		};

		/**
		 * Dynamically loads the given CSS file
		 * @param href The url of the CSS to load dynamically
		 * @returns {*} Promise that will be resolved once the CSS file has been loaded.
		 */
		this.loadCSS = function (href) {
			if(loaded[href]) return loaded[href].promise;

			var deferred = $q.defer();
			var style = $document[0].createElement('link');
			style.rel = 'stylesheet';
			style.type = 'text/css';
			style.href = href;
			style.onload = function (e) {
				$timeout(function () {
					deferred.resolve(e);
				});
			};
			style.onerror = function (e) {
				$timeout(function () {
					deferred.reject(e);
				});
			};
			$document[0].head.appendChild(style);
			loaded[href] = deferred;

			return deferred.promise;
		};
}]);
angular.module('adminApp').factory('tableService',[function(){
	return{
		
	}
}])
angular.module('adminApp').factory('wechatService',['$http',function($http){
	var req = function(url) {
	     return $http({
	        method: 'GET',
	        url: url
	    });
    }

    return {
		querySefDefMenuArr: function(url) { 
		    return req(url); 
		},
		querySefDefSubMenuArr: function(url){
			return req(url);
		},
		
    };
}]).factory('wechartStorageService',['$http', function($http){
	var STORE_ID = '_selfMenu';
	return{
		menus:[],
		get: function(){
			return localStorage.getItem(STORE_ID);
		},
		put: function(menu){
			localStorage.setItem(STORE_ID,menu);
		}
	}
}])