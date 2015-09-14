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
    }]).controller('wechatMenuController',['$scope','$q', function($scope,$q){
         $scope.menuList = [
        {icon: "fa fa-car", name: '淘宝商城', type: '链接', order: '1', isShow: '显示'},
        {icon: "fa fa-search", name: '3', type: '优惠券', order: '中文', isShow: '显示'},
        {icon: "fa fa-edit", name: '导航', type: '导航', order: '中文', isShow: '显示'}
         ];
        $scope.displayedCollection = [].concat($scope.menuList);

        $scope.removeItem = function removeItem(row) {
            var index = $scope.menuList.indexOf(row);
            if (index !== -1) {
                $scope.menuList.splice(index, 1);
            }
        }

        $scope.chooseIcons = function(event){
            var deferred = $q.defer();  
            var iconList =  ["heart","cog","th-large","camera","refresh","eye",
            "folder","glass","star","user","remove","gear","headphones","bookmark"];
            var  $iconwrap = $('<ul class="wx-icon-list" id="W_icon_list"></ul>');
            iconList.forEach(function(icon, i){
                 $iconwrap.append('<li><i class="fa fa-'+icon+'" data-icon="'+icon+'"></i></li>').appendTo("body").hide();
            })
            var index = layer.open({
                type: 1,
                title: '选择图标',
                closeBtn: false,
                shadeClose: true,
                content: $("#W_icon_list")
            }); 
            $("#W_icon_list li").on("click", function(){
               $(event.target).empty().removeClass().addClass("fa fa-"+$(this).find("i").attr("data-icon"));
               layer.close(index);
            })
        }
    }]).controller('websiteController', ['$scope', function($scope){
        // $scope.operate = function(event){
        //     console.log($(event.target))
        //     event.stopPropagation();
        //     $(event.target).parent().find(".site-hover").show();
        // }
    }]);