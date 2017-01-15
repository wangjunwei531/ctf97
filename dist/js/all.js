/**
 * Created by lx on 2016/12/27.
 */
angular.module('ctfApp',['ionic','RongWebIMWidget','ctfApp.tabs','ctfApp.home','ctfApp.franchisee','ctfApp.points','ctfApp.personal','cftApp.httpFactory','cftApp.slideBox','ctfApp.cusServices','ctfApp.goodsDetail','cftApp.myOrder','ctfApp.pointsBill','cftApp.slideBox','ctfApp.myShCart','ctfApp.myPoints','ctfApp.myCollect','ctfApp.shopAddress','ctfApp.payRecord','ctfApp.appraise','ctfApp.orderDetail']).config([function () {
    
}]);

/**
 * Created by lx on 2017/1/8.
 */
angular.module('ctfApp.appraise',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.appraise',{
        url:'appraise',
        views:{
            'tabs-personal':{
                templateUrl:'appraise.html',
                controller:'appraiseController'
            }
        }

    });

}]).controller('appraiseController',['$scope',function ($scope) {
    $scope.appraise = {
        choseStar:choseStar
    };

    function choseStar(event) {
        var allStar = angular.element(event.currentTarget).children();
        if (event.target != event.currentTarget){
            allStar.removeClass('active');
            for (var i = 0; i < 5; i++){
                allStar.eq(i).addClass('active');
                if (allStar[i] == event.target){
                    allStar.eq(i).addClass('active');
                    break;
                }
            }
        }
    }
}]);

/**
 * Created by lx on 2016/12/28.
 */
angular.module('ctfApp.cusServices',["RongWebIMWidget"]).controller('cusServicesController',['$scope','',function ($scope) {
    console.log('$$$$');
    RongCustomerService.init({
        appkey:" m7ua80gbm7jfm ",
        token:"kwgZ8fNdE8gJj+nhALYtL9TdqtWeP+zOLoOqGqlK+mwdP/q4SjystMLOkhq4X5MnQ8sqKP07fBtmmgjTT9OAew==",
        customerServiceId:"wjw123",
        reminder:"在线咨询",
        position:RongCustomerService.Position.left
    });
}]);

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

/**
 * Created by lx on 2016/12/9.
 */
angular.module('cftApp.myOrder',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.myOrder',{
        url:'/myOrder',
        views: {
           'tabs-personal': {
               templateUrl:'myOrder.html',
               controller:'myOrderController'
           }
        }
    });
}]).controller('myOrderController',['$rootScope','$scope','$state','$ionicViewSwitcher','$ionicPopup','$ionicTabsDelegate',function ($rootScope,$scope,$state,$ionicViewSwitcher,$ionicPopup,$ionicTabsDelegate) {
    $scope.myOrder = {
        keyWords:'',//用于过滤数据的关键字
        navData:navData,//导航栏选项再点击选项按钮时触发的事件
        allData:'',//存储订单商品信息
        cancelBill:cancelBill,//取消订单的方法
        payment:payment,//付款的方法
        refund:refund,//退款的方法
        confirm:confirm,//确认订单的方法
        appraise:appraise,//评价的方法
        goOrderDetail: goOrderDetail,//跳转订单详情
        popup:''

    };
    //隐藏 tabs
    $scope.$on('$ionicView.beforeEnter', function () {
        $ionicTabsDelegate.showBar(true);

    });

    $scope.$on('$ionicView.beforeLeave', function () {
        console.log('???');
        if ($scope.myOrder.popup){
            $scope.myOrder.popup.close();
        }

    });


        $scope.myOrder.allData = [{ serial:"23456788", orde:"3",status:"待付款", goodsArray:[{ imgSrc:"dist/images/myOrder.png", price:"258",origin:"99", num:"2",orde:"3", sname:"买一份送一份日汪洋澄湖大闸蟹全母螃蟹3.2-3.0两6只鲜活现货礼盒装"},{ imgSrc:"dist/images/myOrder.png", price:"258",origin:"99", num:"2",orde:"2", sname:"买一份送一份日汪洋澄湖大闸蟹全母螃蟹3.2-3.0两6只鲜活现货礼盒装"},{ "imgSrc":"dist/images/myOrder.png", "price":"258",origin:"99", "num":"2", "sname":"买一份送一份日汪洋澄湖大闸蟹全母螃蟹3.2-3.0两6只鲜活现货礼盒装"}], "totalNum":"4", "totalPrice":"1032.00", "freight":"30.00"
},{ serial:"23456788", orde:"0",status:"待收货", goodsArray:[{ imgSrc:"dist/images/myOrder.png", price:"258",origin:"99", num:"2", sname:"买一份送一份日汪洋澄湖大闸蟹全母螃蟹3.2-3.0两6只鲜活现货礼盒装"},{ imgSrc:"dist/images/myOrder.png", price:"258",origin:"99", num:"2",orde:"5", sname:"买一份送一份日汪洋澄湖大闸蟹全母螃蟹3.2-3.0两6只鲜活现货礼盒装"},{ imgSrc:"dist/images/myOrder.png", price:"258",origin:"99", num:"2", sname:"买一份送一份日汪洋澄湖大闸蟹全母螃蟹3.2-3.0两6只鲜活现货礼盒装"}], totalNum:"4", totalPrice:"1032.00", freight:"30.00"
},{ serial:"23456788", orde:"2",status:"交易成功", isAppraise:false,goodsArray:[{ imgSrc:"dist/images/myOrder.png", price:"258",origin:"99", num:"2", sname:"买一份送一份日汪洋澄湖大闸蟹全母螃蟹3.2-3.0两6只鲜活现货礼盒装"},{ imgSrc:"dist/images/myOrder.png", price:"258",origin:"99", num:"2",orde:"1", sname:"买一份送一份日汪洋澄湖大闸蟹全母螃蟹3.2-3.0两6只鲜活现货礼盒装"},{ imgSrc:"dist/images/myOrder.png", price:"258",origin:"99", num:"2", sname:"买一份送一份日汪洋澄湖大闸蟹全母螃蟹3.2-3.0两6只鲜活现货礼盒装"}], totalNum:"4", totalPrice:"1032.00", freight:"30.00"
},{ serial:"23456788", orde:"5",status:"待发货", goodsArray:[{ imgSrc:"dist/images/myOrder.png", price:"258",origin:"99", num:"2", sname:"买一份送一份日汪洋澄湖大闸蟹全母螃蟹3.2-3.0两6只鲜活现货礼盒装"},{ imgSrc:"dist/images/myOrder.png", "price":"258",origin:"99", "num":"2", "sname":"买一份送一份日汪洋澄湖大闸蟹全母螃蟹3.2-3.0两6只鲜活现货礼盒装"},{ imgSrc:"dist/images/myOrder.png", "price":"258",origin:"99", "num":"2", "sname":"买一份送一份日汪洋澄湖大闸蟹全母螃蟹3.2-3.0两6只鲜活现货礼盒装"}], totalNum:"4", "totalPrice":"1032.00", "freight":"30.00"
},{ serial:"23456788", orde:"7",status:"退款中", goodsArray:[{ imgSrc:"dist/images/myOrder.png", price:"258",origin:"99", num:"2", sname:"买一份送一份日汪洋澄湖大闸蟹全母螃蟹3.2-3.0两6只鲜活现货礼盒装"},{ imgSrc:"dist/images/myOrder.png", price:"258",origin:"99", num:"2", sname:"买一份送一份日汪洋澄湖大闸蟹全母螃蟹3.2-3.0两6只鲜活现货礼盒装"},{ imgSrc:"dist/images/myOrder.png", price:"258",origin:"99", num:"2", sname:"买一份送一份日汪洋澄湖大闸蟹全母螃蟹3.2-3.0两6只鲜活现货礼盒装"}], totalNum:"4", totalPrice:"1032.00", freight:"30.00"
}];
    //    跳转到订单详情
    function goOrderDetail(items) {
        // console.log(items);
        // $state.go('tabs.orderDetail',{orderData:items});
        // $ionicViewSwitcher.nextDirection("forward");
    }
    function navData(event) {
        var list = angular.element(event.currentTarget).children();
        // console.log(list);
        var item = angular.element(event.target);
        // console.log(item);
        console.log(item.text());
        //对数据进行过滤
        // if (item.text() == '全部'){
        //     $scope.myOrder.keyWords = '';
        // }
        //改变元素的样式.
        // console.log(item);
        if (event.currentTarget != event.target){
            list.removeClass('active');
            item.addClass('active');
            switch (item.text()){
                case '待付款':
                    $scope.myOrder.keyWords = '待付款';
                    break;
                case '待发货':
                    $scope.myOrder.keyWords = '待发货';
                    break;
                case '待收货':
                    $scope.myOrder.keyWords = '待收货';
                    break;
                case '待评价':
                    $scope.myOrder.keyWords = '交易成功';
                    break;
                default:
                    $scope.myOrder.keyWords = '';
                    break;
            }
        }
    }
    function cancelBill(items,event) {
        event.stopPropagation();
        //弹出弹框
            $scope.myOrder.popup = $ionicPopup.show({
            cssClass:'myOrder',
            template:'确认要取消订单吗？',
            buttons:[{
                text:'取消',
                onTap:function () {

                }
            },{
                text:'确定',
                onTap:function () {
                    items.status = '交易关闭';
                }
            }]

        });
        console.log($scope.myOrder.popup);

    }

    function payment(items,event) {
        event.stopPropagation();
        console.log('跳转到微信支付页面');
    }

    function refund(items,event) {
        event.stopPropagation();
        $scope.myOrder.popup = $ionicPopup.show({
            cssClass:'myOrder refund',
            template:'<p>申请退款</p><textarea placeholder="请输入申请退款的原因？"></textarea><div>10/100</div>',
            buttons:[{
                text:'取消',
                onTap:function (e) {


                }
            },{
                text:'确定',
                onTap:function () {

                    items.status = '退款中';

                }
            }]

        });
    }

    function confirm(items,event) {
        event.stopPropagation();
        $scope.myOrder.popup = $ionicPopup.show({
            cssClass:'myOrder',
            template:'确认是否已收到货？',
            buttons:[{
                text:'取消',
                onTap:function () {

                }
            },{
                text:'确定',
                onTap:function () {
                    items.status = '交易成功';

                }
            }]
        });
    }
    function appraise(items,event) {
        event.stopPropagation();
        $state.go('tabs.appraise');
    }

}]);





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

/**
 * Created by lx on 2017/1/6.
 */
angular.module('ctfApp.myShCart',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.myShCart',{
        url:'myShCart',
        views:{
            'tabs-personal':{
                templateUrl:'myShoppingCart.html',
                controller:'myShCartController'
            }
        }
    })
}]).controller('myShCartController',['$scope','$http','$ionicPopup',function ($scope,$http,$ionicPopup) {
    $scope.myShCart = {
        goodsData:[],//请求到的数据
        doRefresh:doRefresh,//下拉刷新
        loadMore:loadMore,//上拉加载
        isLoadMore:true,//是否关闭无限公洞
        deleteGoods:deleteGoods,//删除数据
        popup:''

    };

    var more = -1;

    function doRefresh() {
        $scope.myShCart.isLoadMore = true;

        more = 0;
        var url = 'http://114.112.94.166/sunny/wap/api/ushoppingCart?page=0';
        $http.get(url).then(function (result) {
            $scope.myShCart.goodsData = result.data.shoppingCart;
        }).finally(function () {


        });
        $scope.$broadcast('scroll.refreshComplete');

    }

    function loadMore() {
        more += 1;
        console.log('loadMore');
        var url = 'http://114.112.94.166/sunny/wap/api/ushoppingCart?page=' + more + '';
        $http.get(url).then(function (result) {
            result = result.data;
            if (result.shoppingCart <10){
                $scope.myShCart.isLoadMore = false;
            }
                $scope.myShCart.goodsData = $scope.myShCart.goodsData.concat(result.shoppingCart);
        }).finally(function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }

    function deleteGoods(goods,event) {
        event.stopPropagation();
        //弹出弹框
        $scope.myShCart.popup = $ionicPopup.show({
            cssClass:'myOrder',
            template:'确实要删除该商品吗？',
            buttons:[{
                text:'取消',
                onTap:function () {

                }
            },{
                text:'确定',
                onTap:function () {
                    // $http({
                    //     method:'DELETE'
                    //
                    // });
                    var index = $scope.myShCart.goodsData.indexOf(goods);
                    $scope.myShCart.goodsData.splice(index,1);
                    // $http({
                    //     url:'http://114.112.94.166/sunny/wap/api/ushoppingCart',
                    //     method:'DELETE',
                    //     params:{
                    //         id:goods.id
                    //
                    //     }
                    // }).then(function (result) {
                    //     console.log(result);
                    //
                    // });


                }
            }]

        });


    }


    $http({
        url:'http://114.112.94.166/sunny/wap/api/ushoppingCart',
        method:'DELETE',
        params:{
            id:'19'

        }
    }).then(function (result) {
        console.log(result);

    });

    
}]);

/**
 * Created by lx on 2017/1/8.
 */
angular.module('ctfApp.orderDetail',[]).config(['$stateProvider',function ($stateProvider) {
    $stateProvider.state('tabs.orderDetail',{
        url:'/orderDetail',
        views:{
            'tabs-personal':{
                templateUrl:'orderDetail.html',
                controller:'orderDetailController'
            }
        }
    })

}]).controller('orderDetailController',['$scope',function ($scope) {

}]);


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
/**
 * Created by lx on 2016/12/29.
 */

/**
 * Created by lx on 2016/12/27.
 */
angular.module('ctfApp.tabs',[]).config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state('tabs',{
        url:'/tabs',
        distract:true,
        views:{
            'indexPage':{
                templateUrl:'tabs.html',
                controller:'tabsController'
            }

        }
    });
    $urlRouterProvider.otherwise('/tabs/home');

}]).controller('tabsController',['$scope','$ionicSideMenuDelegate','$timeout','$ionicLoading','$state',function ($scope,$ionicSideMenuDelegate,$timeout,$ionicLoading,$state) {
    $scope.tabs = {
        slideToggle:slideToggle,//打开侧边栏
        addShopCart:addShopCart
    };

    function slideToggle() {
        console.log('???');
        $timeout(function () {
            $ionicSideMenuDelegate.$getByHandle('mainPageMenus').toggleRight();
        });


    }

    function addShopCart() {
        $ionicLoading.show({
            template:'已加入购物车',
            noBackdrop:true,
            duration:500
        });
        $state.go('tabs.myShCart');
    }

    $scope.$on('$stateChangeSuccess',function (evt,current,previous) {
        var update_wx_title = function(title) {
            var body = document.getElementsByTagName('body')[0];
            document.title = title;
            var iframe = document.createElement("iframe");
            iframe.setAttribute("src", "../empty.png");
            iframe.addEventListener('load', function() {
                setTimeout(function() {
                    // iframe.removeEventListener('load');
                    document.body.removeChild(iframe);
                });
            });
            document.body.appendChild(iframe);
        };
        switch (current.url){
            case '/home':
                update_wx_title('SUNNY SHU官方商城');
                break;
            case  '/points':
                update_wx_title('我的积分');
                break;
            case '/franchisee':
                update_wx_title('加盟店');
                break;
            case '/personal':
                update_wx_title('个人中心');
                break;
            default:
                break;

        }
        //隐藏客服按钮
        var minBtn = angular.element(document.getElementById('rong-widget-minbtn'));
        switch (current.url){
            case '/home':
            case '/points':
                minBtn.css('display','block');
                break;
            default:
                minBtn.css('display','none');
                break;
        }
        //设置侧边栏不能拖动
        $ionicSideMenuDelegate.canDragContent(false);
    });
}]);

/**
 * Created by qingyun on 16/12/2.
 */
angular.module('cftApp.httpFactory',[]).factory('HttpFactory',['$http','$q',function ($http,$q) {
    return {
        getData:function (url,type) {
            if (url){
                var promise = $q.defer();
                // url = "http://192.168.0.100:3000/?myUrl=" + encodeURIComponent(url);
                url = "http://localhost:3000/?myUrl=" + encodeURIComponent(url);
                type = type ? type:"GET";
                $http({
                    url:url,
                    method:type,
                    timeout:20000
                }).then(function (reslut) {
                    reslut =reslut.data;
                    promise.resolve(reslut);
                },function (err) {
                    promise.reject(err);
                });
                return promise.promise;
            }
        }
    };
}]);
/**
 * Created by qingyun on 16/12/2.
 */
angular.module('cftApp.slideBox',[]).directive('mgSlideBox',[function () {
    return{
        restrict:"E",
        scope:{sourceArray:'='},
        template:'<div class="topCarousel"><ion-slide-box  does-continue="true" delegate-handle="topCarouselSlideBox" on-slide-changed="slideHasChanged($index)" show-pager="true"  ng-if="isShowSlideBox" on-drag="drag($event)"> <ion-slide ng-repeat="img in sourceArray track by $index" ng-click="goToDetailView($index)"><img ng-src="{{addPrefix(img.image_url)}}" class="topCarouselImg"></ion-slide> </ion-slide-box></div>',
        controller:['$scope','$element','$ionicSlideBoxDelegate','$timeout',function ($scope,$element,$ionicSlideBoxDelegate,$timeout) {
            $scope.goToDetailView = function (index) {
                // console.log('进入详情页' + index);
            };
            // var lastSpan = $element[0].lastElementChild;
            $scope.addPrefix = function (str) {
                str = 'http://114.112.94.166' + str;
                return str;

            };


            $scope.$watch('sourceArray',function (newVal,oldVal) {

                if (newVal && newVal.length){

                    if (oldVal && oldVal.length && newVal.length != oldVal.length) {
                        $scope.isShowSlideBox = false;
                        $timeout(function () {
                            $scope.isShowSlideBox = true;
                        });
                    }else {
                        $scope.isShowSlideBox = true;
                    }
                    /*
                    * 两种方案解决轮播不能立刻显示或者显示错位的bug 改bug由于ng-repeat和slideBox的特性造成
                    * 完美的解决方案是使用添加ng-if 另一种是用update 和 loop
                    *
                    * */

                    // $ionicSlideBoxDelegate.$getByHandle('topCarouselSlideBox').update();
                    // $ionicSlideBoxDelegate.$getByHandle('topCarouselSlideBox').loop(true);
                    // console.log(lastSpan);
                    // lastSpan.innerText = $scope.sourceArray[0].title;
                }
            });
            // $scope.slideHasChanged = function (index) {
            //     lastSpan.innerText = $scope.sourceArray[index].title;
            // };
            //页面刚加载出来的时候禁止滑动
            // $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(false);
            //拖拽轮播图的时候也要禁止底层的slideBox滑动
            $scope.drag = function (event) {
                event.stopPropagation();
                $ionicSlideBoxDelegate.loop(true);
                // $ionicSlideBoxDelegate.$getByHandle('mainSlideBox').enableSlide(false);
                //阻止事件冒泡
                // event.stopPropagation();
            };

        }],
        replace:true,
        link:function (scope,tElement,tAtts) {
        }
    };
}]);