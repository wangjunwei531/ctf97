/**
 * Created by lx on 2016/12/27.
 */
angular.module('ctfApp.personal',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.personal',{
        url:'/personal',
        views:{
            'tabs-personal':{
                templateUrl:'tabs_personal.html',
                controller:'personalController'
            }

        }
    });
}]).controller('personalController',['$scope','$state','$ionicModal',function ($scope,$state,$ionicModal) {

    $scope.personal = {
        goMyOrder:goMyOrder,
        goMyShCart:goMyShCart,
        openShareModal:openShareModal,
        modal:'',
        goMyPoints:goMyPoints,
        goMyCollect:goMyCollect,
        goAddress:goAddress,
        goPayRecord:goPayRecord
    };

    function goMyOrder() {
        $state.go('tabs.myOrder');

    }
    function goMyShCart() {
        $state.go('tabs.myShCart')
    }
    function openShareModal() {
        $scope.personal.modal.show();

    }
    function goMyPoints() {
        $state.go('tabs.myPoints');
    }
    function goMyCollect() {
        $state.go('tabs.myCollect');

    }
    function goAddress() {
        $state.go('tabs.shopAddress');

    }

    function goPayRecord() {
        $state.go('tabs.payRecord');

    }

    $ionicModal.fromTemplateUrl('shareModal.html',{
        scope:$scope,
        animation:'fade-in'
    }).then(function (modal) {
        $scope.personal.modal = modal;
    });
}]);
