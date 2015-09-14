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

