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