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
