/**
 * Created by lx on 2017/1/7.
 */
angular.module('ctfApp.payRecord',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.payRecord',{
        url:'/payRecord',
        views:{
            'tabs-personal':{
                templateUrl:'payRecord.html',
                controller:'payRecordController'
            }
        }
    });

}]).controller('payRecordController',['$scope',function ($scope) {

}]);