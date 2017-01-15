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
