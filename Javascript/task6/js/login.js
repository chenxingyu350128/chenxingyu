//登陆请求
angular.module('myApp')
    .controller('loginPage',function ($http,$state) {
    let vm=this;
    vm.login=function () {
        $http({
            method: 'POST',
            url: '/carrots-ajax/a/login',
            params: {
                name:vm.username,
                pwd: vm.password
            }
        }).
        then(function successCallback(response) {
            if(response.data.code===0){
                vm.loginMsg="登陆成功";
                $state.go('frameState')
            }else{
                vm.loginMsg=response.data.message;
            }
        });
    }
});


