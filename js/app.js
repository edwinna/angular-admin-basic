"use strict";
/**
 * 路由配置
*/
angular.module('adminApp', [
	'ngAnimate',
	'ui.load',	
	'app.directives',
	'ui.router',
	'ui.grid',
	'app.market',
	'smart-table'
]).run(['$rootScope','$state','$stateParams', function($rootScope,$state, $statePramas){
		$rootScope.$state = $state;
		$rootScope.$statePramas =$statePramas;
	}])  
   .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,$urlRouterProvider){
	   	//$urlRouterProvider.when("", "/app");  //如果没有路由引擎能匹配当前的导航状态，那它就会默认将路径路由至home.html 
	    $urlRouterProvider
              .otherwise('/app/dashboard');
	    $stateProvider.state("app",{
	   		url: '/app',
            abstract: true,
	   		templateUrl: 'views/start.html'
	   	}).state("app.dashboard", {
	   		url:"/dashboard",
	   		templateUrl: 'views/dashboard.html'
	   	}).state("app.ui",{
	   		url: '/ui',
	   		template: '<div ui-view class></div>'
	   	}).state("app.ui.charts",{
	   		url:'/charts',
	   		templateUrl: 'views/charts.html'
	   	}).state("app.ui.datatable",{
	   		url:'/datatables',
	   		templateUrl: 'views/datatables.html'
	   	}).state("app.ui.elements",{
	   		url:'/elements',
	   		templateUrl: 'views/ui-elements.html'
	   	}).state("app.ui.smartTable",{
	   		url:'/smartTable',
	   		templateUrl: 'views/smartTables.html'
	   	}).state("app.ui.tools",{
	   		url: '/tools',
	   		templateUrl:'views/tools.html'
	   	}).state("app.ui.uigrid",{
	   		url: '/uigrid',
	   		templateUrl:'views/ui-grid.html'
	   	}).state("app.ui.forms",{
	   		url: '/forms',
	   		templateUrl: 'views/forms.html'
	   	}).state('app.channel',{
	   		url: '/channel',
	   		template: '<div ui-view class></div>'
	   	}).state('app.channel.wechat',{
	   		url: '/wechat',
	   		templateUrl: 'views/wechat.html'
	   	}).state('app.channel.website',{
	   		url: '/website',
	   		templateUrl: 'views/website.html'
	   	}).state('app.channel.addShortcut',{
	   		url: '/addShortcut',
	   		templateUrl: 'views/wechat/addShortcut.html'
	   	}).state('app.channel.appContent',{
	   		url:'/appContent',
	   		templateUrl: 'views/appContent.html'
	   	}).state('app.channel.wifi',{
	   		url: '/wifi',
	   		templateUrl: 'views/wifi.html'
	   	}).state('app.permission',{
	   		url: '/permission',
	   		template: '<div ui-view class></div>'
	   	}).state('app.permission.user',{
	   		url: '/user',
	   		templateUrl: 'views/user-admin.html'
	   	}).state('app.market',{
	   		url: '/market',
	   		templateUrl: '<div ui-view class></div>'
	   	}).state('app.market.activityManage',{
	   		url: '/activityManage',
	   		templateUrl: 'views/market/activityManage.html'
	   	}).state('app.market.messageManage',{
	   		url: '/messageManage',
	   		templateUrl: 'views/market/messageManage.html'
	   	}).state('app.market.ticketManage',{
	   		url: '/ticketManage',
	   		templateUrl: 'views/market/ticketManage.html'
	   	}).state('app.basic',{
	   		url:'/basic',
	   		template: '<div ui-view class></div>'
	   	}).state('app.basic.account',{
	   		url:'/account',
	   		templateUrl: 'views/account.html'
	   	}).state('app.authority',{
	   		url:'/account',
	   		template: '<div ui-view class></div>'
	   	}).state('app.authority.user',{
	   		url:'/user',
	   		templateUrl: 'views/authority/user-admin.html'
	   	}).state('app.authority.role',{
	   		url:'/role',
	   		templateUrl: 'views/authority/role-admin.html'
	   	}).state('app.authority.addUser',{ 
	   		url:'/addUser/:user',
	   		templateUrl: 'views/authority/add-user.html',
	   		controller: function($scope, $stateParams){
	   			$scope.user = $stateParams.user;
	   			console.log($scope.user)
	   		}
	   	})
	}
]);		
