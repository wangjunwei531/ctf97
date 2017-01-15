/**
 * Created by lx on 2017/1/8.
 */
angular.module('ctfApp.orderDetail',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.orderDetail',{
        url:'/orderDetail',
        views:{
            'tabs-personal':{
                templateUrl:'orderDetail.html',
                controller:'orderDetailController'
            }
        }
    })

}]).controller('orderDetailController',['$scope',function ($scope) {

}]);

