/**
 * Created by lx on 2016/12/27.
 */
angular.module('ctfApp.home',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.home',{
        url:'/home',
        views:{
            'tabs-home':{
                templateUrl:'tabs_home.html',
                controller:'homeController'
            }

        }
    });
}]).controller('homeController',['$scope','$http','$ionicSideMenuDelegate','$ionicModal','$state','$ionicTabsDelegate','$ionicGesture','RongCustomerService',function ($scope,$http,$ionicSideMenuDelegate,$ionicModal,$state,$ionicTabsDelegate,$ionicGesture,RongCustomerService) {
    $scope.home = {
        goodsData:'',//存储商品信息数据
        dragEnd:dragEnd,//实现客服按钮最后定位
        dragPosition:{},
        openShoppingCart:openShoppingCart,
        modal:'',
        goGoodsDetail:goGoodsDetail,
        bannerData:''//轮播图数据
    };

    $scope.shopCartModal = {
        goodsNum:1, //商品的数量
        changeNum:changeNum
    };


    function cusServiceMove(event) {
        event.stopPropagation();
        var ionContent = document.querySelector('.scroll-content');
        ionContent.setAttribute('has-bouncing','false');
        var moveX = 0,moveY = 0;
        var item = event.target;

        if ($scope.home.dragPosition.x === undefined){
            $scope.home.dragPosition.x = event.gesture.center.pageX;
            $scope.home.dragPosition.y = event.gesture.center.pageY;
            $scope.home.dragPosition.starLeft = item.offsetLeft;
        }else {
            moveX = event.gesture.center.pageX - $scope.home.dragPosition.x;
            moveY = event.gesture.center.pageY - $scope.home.dragPosition.y;
            console.log(moveX,moveY);
            item.style.left = ( moveX + item.offsetLeft)/10 + 'rem';
            item.style.top = ( moveY + item.offsetTop)/10 + 'rem';
            $scope.home.dragPosition.x = event.gesture.center.pageX;
            $scope.home.dragPosition.y = event.gesture.center.pageY;
        }
    }

    function dragEnd(event) {
        console.log('end');
        event.stopPropagation();
        var ionContent = document.body;
        ionContent.setAttribute('has-bouncing','false');
        var item = event.target;
        item.style.left = '';
        item.style.right = '1rem';
        $scope.home.dragPosition = {};
    }

   function openShoppingCart(event,data) {
       event.stopPropagation();
       $scope.home.modal.show();
   }

   function goGoodsDetail() {
       $state.go('tabs.goodsDetail');

   }

    function changeNum(variate) {
        $scope.shopCartModal.goodsNum = $scope.shopCartModal.goodsNum + variate;
        if (!$scope.shopCartModal.goodsNum){
            $scope.shopCartModal.goodsNum = 1;
        }
    }


    $scope.$on('$destroy',function () {
        $scope.home.modal.remove();
    });


    $scope.$on('$ionicView.beforeEnter', function (index) {
        console.log(index);
        $ionicTabsDelegate.showBar(true);
        $ionicSideMenuDelegate.canDragContent(false);
    });


    $ionicModal.fromTemplateUrl('shoppingCartModal.html',{
        scope:$scope,
        animation:'slide-in-up'
    }).then(function (modal) {
        $scope.home.modal = modal;
    });
    var url = 'http://114.112.94.166/sunny/wap/api/getGoods';
    $http.get(url).then(function (result) {
        result = result.data;
        console.log(result);
        console.log(result.bannerData,'???');
        $scope.home.goodsData = result.goodsData;
        $scope.home.bannerData = result.bannerData;
    });

    var cusWidth = document.querySelector('.home .scroll-content').offsetWidth;
    var cusHeight = document.querySelector('.home .scroll-content').offsetHeight;

    RongCustomerService.init({
        appkey:"m7ua80gbm7jfm",
        token:"JgfBqAr0BPyPWIO4LIJKVNTdqtWeP+zOLoOqGqlK+mwdP/q4SjystKOpYMMHz4uM8KeMTNp1LzaMQgoDTiE67g==",
        customerServiceId:"KEFU148292934047516",
        reminder:' ',
        style:{
            width: cusWidth,
            height: cusHeight,
            left: 10
        },
        position:RongCustomerService.Position.right,
        // displayConversationList:true,
        displayMinButton:true,
        onSuccess:function () {
            console.log(minBtn);
            //初始化完成
            //设置客服按钮位置
            var kf = angular.element(document.getElementById('rong-widget-minbtn'));
            kf.css('bottom','8rem');
            kf.css('right','2rem');
            var minBtn =angular.element(document.getElementById('rong-widget-minbtn'));
            // minBtn.addEventListener('drag',cusServiceMove);
            // // console.log(minBtn);
            $ionicGesture.on('drag',cusServiceMove,minBtn);
            $ionicGesture.on('dragend',dragEnd,minBtn);
        }


    });



}]);

