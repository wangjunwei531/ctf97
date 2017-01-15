/**
 * Created by lx on 2016/12/27.
 */
angular.module('ctfApp.franchisee',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.franchisee',{
        url:'/franchisee',
        views:{
            'tabs-franchisee':{
                templateUrl:'tabs_franchisee.html',
                controller:'franchiseeController'
            }

        }
    });
}]).controller('franchiseeController',['$scope',function ($scope) {

}]);
