/**
 * Created by lx on 2017/1/7.
 */
angular.module('ctfApp.myCollect',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.myCollect',{
        url:'/myCollect',
        views:{
            'tabs-personal':{
                templateUrl:'myCollect.html',
                controller:'myCollectController'
            }
        }

    });

}]).controller('myCollectController',['$scope',function ($scope) {

}]);
