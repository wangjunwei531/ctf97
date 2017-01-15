/**
 * Created by lx on 2017/1/7.
 */
angular.module('ctfApp.myPoints',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.myPoints',{
        url:'myPoints',
        views:{
            'tabs-personal':{
                templateUrl:'myPoints.html',
                controller:'myPointsController'
            }
        }
    })
    
}]).controller('myPointsController',['$scope','$http','$state',function ($scope,$http,$state) {
    $scope.myPoints = {
        goPoints:goPoints
    };

    function goPoints() {
        $state.go('tabs.personal');
        $state.go('tabs.points');
    }
    
}]);
