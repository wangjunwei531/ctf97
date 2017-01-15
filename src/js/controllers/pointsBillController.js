/**
 * Created by lx on 2017/1/2.
 */
angular.module('ctfApp.pointsBill',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.pointsBill',{
        url:'pointsBill',
        views:{
            'tabs-points':{
                templateUrl:'pointsBill.html',
                controller:'pointsBillController'
            }
        }
        
    });
    
}]).controller('pointsBillController',['$scope',function ($scope) {
    
}]);
