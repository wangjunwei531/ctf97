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
