
angular.module('myApp')
.controller('addListCtrl',function ($state,$http,$stateParams,myTypes,myIndustry) {
    //载入页面时
    let vm=this;
    vm.Types = myTypes.slice(1);//取出type
    vm.Industry = myIndustry;//取出industry
    vm.id = $stateParams.id;//get out "id
    vm.titleA=vm.id?'编辑Article':'新增Article';
    if(vm.id){
        $http({
            method: 'GET',
            url: '/carrots-admin-ajax/a/article/'+vm.id,
            headers:{"Content-Type":"application/x-www-form-urlencoded"}
        }).then(function callBackSuccess(res) {
            if(res.data.code===0){
                vm.list=res.data.data.article;
                vm.type=vm.list.type;
                vm.title=vm.list.title;
                vm.content=vm.list.content;
                vm.url=vm.list.url;
                vm.img=vm.list.img;
                vm.industry=vm.list.industry;
                vm.createAt=vm.list.createAt;//以上数据为取出的response内容
                //将Type数组的第vm.type项赋给select当前项
                vm.currentType=vm.Types[vm.type];//默认选择的type
            }else{
                alert(res.data.message);
            }
        });
    }
    //立即上线
    vm.online=function () {
        vm.id=vm.id?vm.id:'';
        $http({
            method: vm.id?'PUT':'POST',
            url: '/carrots-admin-ajax/a/u/article/'+vm.id,
            params: {
                title: vm.title,
                status: 2,
                img: vm.img,
                url: vm.url,
                createAt: vm.createAt,
                type: vm.currentType.type,
                id: vm.id,
                industry: vm.industry,
                content: vm.content,
            },
            dataType: 'json',
            headers: {'Content-Type': undefined}
        }).then(function successCallBack(res) {
            if(res.data.code===0){
                bootbox.alert('上线成功');
                $state.go('frameState.articleList',{},{reload:true})
            }else{
                bootbox.alert('上线失败');
            }
        })
    };
    //存为草稿
    vm.sketch=function () {
        vm.id=vm.id?vm.id:'';
        $http({
            method: vm.id?'PUT':'POST',
            url: '/carrots-admin-ajax/a/u/article/'+vm.id,
            params: {
                title: vm.title,
                status: 1,
                img: vm.img,
                url: vm.url,
                createAt: vm.createAt,
                type: vm.currentType.type,
                id: vm.id,
                industry: vm.industry,
                content: vm.content,
            },
            dataType: 'json',
            headers: {'Content-Type': undefined}
        }).then(function successCallBack(res) {
            if(res.data.code===0){
                bootbox.alert('存稿成功');
                $state.go('frameState.articleList',{},{reload:true})
            }else{
                bootbox.alert('存稿失败');
            }
        })
    };
    //取消
    vm.cancel=function () {
        let keep=confirm('确定取消吗？');
        if(keep===true){
            $state.go('frameState.articleList',{},{reload:true});
        }else{
            return false;
        }
    };
});


