/**
 * Created by lx on 2016/12/27.
 */
angular.module('ctfApp.points',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.points',{
        url:'/points',
        views:{
            'tabs-points':{
                templateUrl:'tabs_points.html',
                controller:'pointsController'
            }

        }
    });
}]).controller('pointsController',['$scope','$http','$ionicSideMenuDelegate','$ionicModal','$state','$ionicTabsDelegate',function ($scope,$http,$ionicSideMenuDelegate,$ionicModal,$state,$ionicTabsDelegate) {
    $scope.points = {
        goodsData:'',//存储商品信息数据

        openShoppingCart:openShoppingCart,
        modal:'',
        goGoodsDetail:goGoodsDetail,
        goPointsBill:goPointsBill
    };

    $scope.shopCartModal = {
        goodsNum:1, //商品的数量
        changeNum:changeNum
    };





    function openShoppingCart(event,data) {
        event.stopPropagation();
        $scope.points.modal.show();
    }

    function goGoodsDetail() {
        // $state.go('tabs.pointsGoodsDetail');

    }

    function changeNum(variate) {
        $scope.shopCartModal.goodsNum = $scope.shopCartModal.goodsNum + variate;
        if (!$scope.shopCartModal.goodsNum){
            $scope.shopCartModal.goodsNum = 1;
        }
    }

    function goPointsBill(event) {
        event.stopPropagation();
        $state.go('tabs.pointsBill');

    }
    $scope.$on('$destroy',function () {
        $scope.points.modal.remove();
    });


    $scope.$on('$ionicView.beforeEnter', function (index) {
        $ionicTabsDelegate.showBar(true);
    });


    $ionicModal.fromTemplateUrl('shoppingCartModal.html',{
        scope:$scope,
        animation:'slide-in-up'
    }).then(function (modal) {
        $scope.points.modal = modal;
    });
    var url = 'http://114.112.94.166/sunny/wap/api/getGoods';
    $http.get(url).then(function (result) {
        result = result.data;
        console.log(result);
        $scope.points.goodsData = result.goodsData;
    });

}]);
