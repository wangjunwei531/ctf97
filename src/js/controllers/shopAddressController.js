/**
 * Created by lx on 2017/1/7.
 */
angular.module('ctfApp.shopAddress',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.shopAddress',{
        url:'/shopAddress',
        views:{
            'tabs-personal':{
                templateUrl:'shopAddress.html',
                controller:'shopAddressController'
            }
        }

    });

}]).controller('shopAddressController',['$scope',function ($scope) {

}]);