"use strict";
    angular.module('adminApp')
    .controller('userAdminController', ['$scope','$filter', 'queryUserService',function($scope,$filter,queryUserService){
		$scope.userCollection = [];
		$scope.displayedCollection = [];
		queryUserService.queryUserData('js/data/userData.json').success(function(rs){
			$scope.userCollection = rs;
			$scope.displayedCollection = [].concat($scope.userCollection);
			$scope.removeItem = function (row) {
		        var index = $scope.userCollection.indexOf(row);
		        if (index !== -1) {
		            $scope.userCollection.splice(index, 1);
		        } 
			}
		})

		$scope.chooseRole = function(event){
			var roleList =  [" 临时用户","素材管理员","超级管理员","普通管理员","专用用户","销售管理员",
            "普通管理员01"];
            var  $roleWrap = $('<ul class="role-list" id="role_list"></ul>');
            roleList.forEach(function(role, i){
                 $roleWrap.append('<li><label class="checkbox-inline i-checks"><input type="radio" class="role-item" name="role" value='+role+'></label>'+ role + '</li>').appendTo("body").hide();
            }); 
			var  rolePanel = layer.open({
                type: 1,
                title: '选择角色',
                closeBtn: false,
                shadeClose: true,
                content: $("#role_list")
            }); 

            $(".role-item").on("change", function(){
            	var sval = $("input[name='role']:checked").val();
  				$(event.target).html("重新选择角色").prepend("<span class='control-role'>"+ sval + "</span>");
               layer.close(rolePanel);            
            })
		}

		$scope.rowCollection = [
	        {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
	        {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
	        {firstName: 'Francoise', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com'}
    	];

	    $scope.predicates = ['firstName', 'lastName', 'birthDate', 'balance', 'email'];
	    $scope.selectedPredicate = $scope.predicates[0];
		$scope.editUser = function(user){
			console.log(user)
			$scope.user = user;
		}    	
    }])	