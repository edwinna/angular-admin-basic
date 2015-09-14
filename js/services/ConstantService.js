angular.module('adminApp').factory('ConstantService', [function(){
	return{
		LINECHART_REQ_URL: '/js/data/lineChartData.json',
		BARCHART_REQ_URL: '/js/data/barChartData.json',
		PIECHART_REQ_URL: '/js/data/pieChartData.json'
	}
}])