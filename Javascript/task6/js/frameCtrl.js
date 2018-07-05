angular.module('myApp')
    .controller('frameCtrl',function ($state,$http,sidebar) {
    let vm=this;    
    //退出登录
    vm.logOut=function (){
        bootbox.confirm({
            title: '退出登录',
            message: '<p class="text-center">确认退出吗？</p>',
            buttons: {
                confirm: {
                    label: '确认',
                    className: 'btn-success'
                },
                cancel: {
                    label: '取消',
                    className: 'btn-danger'
                }
            },
            callback: function(result){
                if(result===true){
                    $http({
                        method: 'POST',
                        url: '/carrots-admin-ajax/a/logout'
                    }).then(function (res) {
                        if(res.data.code===0){
                            $state.go('loginState');
                        }else{
                            alert(res.data.message);
                        }
                    })
                }
            }
        });
        sessionStorage.clear()
    };

//侧栏高亮
    //取出sidebar
    vm.sidebar=sidebar;
    vm.first=sessionStorage.getItem('first');
    vm.second=sessionStorage.getItem('second');
    vm.level1=function (index) {
        vm.first=(vm.first===index)?undefined:index;
        let lv1=$('.lv1');
        lv1.css({
            background: 'none',
            borderLeft: 'none'
        });
        lv1.eq(index).css({
            background: '#fec73f',
            borderLeft: '3px solid #fff'
        });
    };
    vm.level2=function (y,index) {
        let lv1=$('.lv1');
        vm.second=y;
        lv1.css({
            background: 'none'
        });
        lv1.eq(index).css({
            borderLeft: '3px solid #fff'
        });
        sessionStorage.setItem('first',index);
        sessionStorage.setItem('second',y);
    };
});