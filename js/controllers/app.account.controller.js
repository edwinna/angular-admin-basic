"use strict";
    angular.module('adminApp')
    .controller('accountController', ['$scope', 'queryUserService',function($scope,queryUserService){
		$scope.account = {
  			name: "生源",
  			tel:'15895950000',
  			logoUrl: 'http://imagesy.airad.com/mbis/1138/images/1433139076734mCZu2aCApQ.png',
  			storeUrl:"http://imagesy.airad.com/mbis/1302/images/14357191423569VwNnJfVLF.jpg",
  			qrcodeUrl:"http://imagesy.airad.com/mbis/1240/images/1433837076476U4wZGMpKoN.jpg",
  			addr: "湖南省郴州市苏仙区八一路生源时代广场",
  			introduction: '生源时代广场'
      	};  

        $("#dropz").dropzone({
            url: "/upload",
            maxFiles: 10,
            maxFilesize: 5
        });	
    }])