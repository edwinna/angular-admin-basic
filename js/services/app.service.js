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



