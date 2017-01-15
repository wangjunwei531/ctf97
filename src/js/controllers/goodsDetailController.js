/**
 * Created by lx on 2016/12/29.
 */
angular.module('ctfApp.goodsDetail',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.goodsDetail',{
        url:'/goodsDetail',
        views:{
            'tabs-home':{
                templateUrl:'goodsDetail.html',
                controller:'goodsDetailController'
            }
        }
    });

}]).controller('goodsDetailController',['$scope','$ionicTabsDelegate','$ionicModal','$state','$ionicLoading',function ($scope,$ionicTabsDelegate,$ionicModal,$state,$ionicLoading) {
    $scope.goodsDetail = {
        addCollect:addCollect,//加入收藏
        selected:selected,//切换选项
        filePath:'realDetail.html',
        openShoppingCart:openShoppingCart,
        goHomePage:goHomePage,
        addShoppingCart:addShoppingCart,
        goShoppingCart:goShoppingCart
    };

    $scope.shopCartModal = {
        goodsNum:1, //商品的数量
        changeNum:changeNum
    };
    
    function addCollect(event) {
        event.stopPropagation();

        var img =angular.element(event.currentTarget).children()[0];
        var text = angular.element(event.currentTarget).children()[1];
        var imgSrc = img.getAttribute('src');
        if (imgSrc.indexOf('collectStar') > -1){
            imgSrc = imgSrc.replace('collectStar','commentfull');
            text.innerText = '已收藏';
            $ionicLoading.show({
                template:'已收藏',
                noBackdrop:true,
                duration:500
            });

            img.setAttribute('src',imgSrc);
        }else {
            imgSrc = imgSrc.replace('commentfull','collectStar');
            img.setAttribute('src',imgSrc);
            text.innerText = '收藏';
            $ionicLoading.show({
                template:'取消收藏',
                noBackdrop:true,
                duration:500
            });
        }





    }

    function selected(event) {
        event.stopPropagation();
        var allItems =angular.element(event.currentTarget).children();
        var item = angular.element(event.target);
        allItems.removeClass('active');
        item.addClass('active');

        switch (item.text()){
            case '商品详情':
                $scope.goodsDetail.filePath = 'realDetail.html';
                break;
            case '商品参数':
                $scope.goodsDetail.filePath = 'goodsParams.html';
                break;
            default:
                $scope.goodsDetail.filePath = 'appraise.html';
                break;
        }

    }

    function openShoppingCart() {
        $scope.goodsDetail.modal.show();

    }

    function changeNum(variate) {
        $scope.shopCartModal.goodsNum = $scope.shopCartModal.goodsNum + variate;
        if (!$scope.shopCartModal.goodsNum){
            $scope.shopCartModal.goodsNum = 1;
        }
    }

    function goHomePage() {
        $state.go('tabs.home');
    }

    function addShoppingCart() {
        $ionicLoading.show({
            template:'已加入购物车',
            noBackdrop:true,
            duration:500
        });


    }

    function goShoppingCart() {
        $state.go('tabs.myShCart');
    }

    $ionicModal.fromTemplateUrl('shoppingCartModal.html',{
        scope:$scope,
        animation:'slide-in-up'
    }).then(function (modal) {
        $scope.goodsDetail.modal = modal;
    });
    

    
    
    $scope.$on('$ionicView.beforeEnter', function () {
        $ionicTabsDelegate.showBar(false);
    });
}]);
