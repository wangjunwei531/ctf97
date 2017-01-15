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
