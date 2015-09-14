angular.module('app.market',[]).controller('ActivityController', ['$scope', function($scope){
	 $scope.rowCollection = [
        {name: "MANGO SIX价值118元双人下午茶免费送", brief: 'sdf', bname: '芋观园甜品', starttime: '2015-07-29',endtime: '2015-08-08'}
    ];

    $scope.removeItem = function removeItem(row) {
        var index = $scope.rowCollection.indexOf(row);
        if (index !== -1) {
            $scope.rowCollection.splice(index, 1);
        }
    }
}])