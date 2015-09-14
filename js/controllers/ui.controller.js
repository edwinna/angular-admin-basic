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
	      { field: 'name', name: 'name'},
	      { field: 'position',name: 'position'},
	      { field: 'salary', enableSorting: false,name: 'salary'},
	      {field:'start_date', name: 'start_date'},
	      {field:'office', name: 'office'},
	      {field:'extn', name: 'extn'},
	      {name: '操作', cellTemplate:'<button class="btn btn-operate" ng-click="grid.appScope.showMe()">编辑</button><button class="btn btn-operate" ng-click="grid.appScope.showMe()">删除</button>' } 
	    ],
	    onRegisterApi: function( gridApi ) {
	      $scope.grid1Api = gridApi;
	    }
  	};
    httpReqService.queryTableData('js/data/table.json').success(function(rs){
    	 $scope.gridOptions.data = rs.data;
    });
}]).controller('FormController',['$scope', function($scope){
	var fm = $scope.fm = {
		show_error: false,
        show_type: 1,
        user: {}
	}

    fm.submit = function (form) {
        fm.show_error = true;
        form.$setDirty();         
        if(form.$valid){
            alert("提交成功！");
        }
    };
}]).controller('smartTableController',['$scope',function($scope){
	 $scope.rowCollection = [
        {imgurl: "http://imagesy.airad.com/mbis/1727/images/14381558099301aoKorvx52.png", name: '时光尽头恋人', type: '剧情,爱情,奇幻', lan: '英文', time: '2015-06-01'},
        {imgurl: "http://imagesy.airad.com/mbis/1635/images/1438154797834ozT2sLaGjs.jpg", name: '新娘大作战', type: '爱情/剧情/喜剧', lan: '中文', time: '2015-08-20'},
        {imgurl: "http://imagesy.airad.com/mbis/1623/images/1438154668642xf7KLtFYeY.jpg", name: '太平轮·彼岸', type: '爱情/剧情/战争', lan: '中文', time: '2015-07-30'}
    ];
    $scope.displayedCollection = [].concat($scope.rowCollection);

    $scope.removeItem = function removeItem(row) {
        var index = $scope.rowCollection.indexOf(row);
        if (index !== -1) {
            $scope.rowCollection.splice(index, 1);
        }
    }
}])