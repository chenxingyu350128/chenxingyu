angular.module('myApp')
.controller('articleListCtrl',function ($http,$state,$stateParams,myStatus,myTypes) {
    let vm=this;
    vm.Statuses=myStatus;
    vm.Types=myTypes;
    vm.params=$stateParams;
    vm.startAt=Number(vm.params.startAt);
    vm.endAt=Number(vm.params.endAt);
    if(!!vm.endAt){
        vm.endAt=Number(vm.params.endAt)-86399999;
    }
    vm.type=vm.params.type;
    vm.status=vm.params.status;
    //首次载入文章列表页
    $http({
        method:'GET',
        url: '/carrots-admin-ajax/a/article/search',
        params: $stateParams  //这个没填会导致后续的搜索无法使用
    }).then(function successCallBack(response) {
        vm.articleList = response.data.data.articleList;
        vm.size= response.data.data.size;
        vm.total = response.data.data.total;
    });
    vm.currentPage=$stateParams.page;
    //日历样式
    vm.format = "yyyy-MM-dd";
    vm.altInputFormats = ['yyyy/M!/d!'];
    vm.popup = {opened: false};
    vm.popup1 = {opened: false};
    vm.open = function () {
        vm.popup.opened = true
    };
    vm.open1 = function () {
        vm.popup1.opened = true;
    };
    //清除搜索
    vm.clear=function () {
        $state.go('frameState.articleList',
            {
                page: 1,
                size: vm.size,
                endAt: undefined,
                startAt:undefined,
                type: undefined,
                status: undefined,
            });
    };
    //search搜索按钮
    vm.search=function () {
        vm.startAt=Number(vm.startAt);//时间戳转换
        vm.endAt=Number(vm.endAt);
        $state.go('frameState.articleList',
            {
                startAt: vm.startAt||undefined,  //若不加undefined，日期未选时搜索将报错
                endAt: vm.endAt+86399999||undefined,
                type: vm.type,
                status: vm.status,
                page: 1
            },{reload: true});
    };
    //add article
    vm.addList=function(){
        $state.go('frameState.addArticleList')
    };
    //delete article
    vm.delete=function(id){//id为ng-repeat:x in ArticleList的x.id
        bootbox.confirm({
            title: '操作提示',
            message: '<p class="text-center">确认删除吗？</p></br><p class="text-center">删除后无法找回</p>',
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
                        method:'DELETE',
                        url: '/carrots-admin-ajax/a/u/article/'+id,
                        headers:{"Content-Type":"application/x-www-form-urlencoded"}
                    }).then(function successCallBack(res) {
                        if(res.data.code===0){
                            $state.go('frameState.articleList',{
                                size: vm.params.size,//删除后留在当前页，list条数不变
                                page: vm.params.page
                            },{reload: true})
                        }else{
                            alert(res.data.message);
                        }
                    })
                }
            }
        })
    };
    //edit article
    vm.editArticle=function(id){//id为ng-repeat:x in ArticleList的x.id
        $state.go('frameState.addArticleList',{
            id : id //编辑Article添加id
        })
    };
    //inline offline
    vm.changeStatus=function (id,status) {
        if(!!status){
            vm.upOrDown=status===1?"上线":"草稿";
            vm.newStatus=status===1?2:1;
            bootbox.confirm({
                title: '操作提示',
                message: '<p class="text-center">上线后该图片将展示站轮播banner中。</p></br><p class="text-center">是否执行下上线操作？</p>',
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
                callback: function (result) {
                    if(result===true){
                        $http({
                            method: 'PUT',
                            url: '/carrots-admin-ajax/a/u/article/status',
                            params: {
                                status: vm.newStatus,
                                id: id,
                            },
                            headers:{"Content-Type":"application/x-www-form-urlencoded"}
                        }).then(function successCallBack(res) {
                            if(res.data.code===0){
                                $state.go('frameState.articleList',{
                                    // page: vm.params.page    //不知道作用，但不加不能自动刷新
                                },{reload: true})
                            } else {
                                alert(res.data.message);
                            }
                        })
                    }
                }
            });
        }
    };
    //click page
    vm.pageChange=function () {
        $state.go('frameState.articleList', {page: vm.currentPage},{reload: true});
    };
    //change size/page
    vm.changePage=function(){
        vm.setPage=vm.setPage.replace(/[^0-9]/g, '');
        if(parseInt(vm.setPage)===0){
            vm.setPage=1;
        }
    };
    vm.changeSize=function(){
        vm.size=vm.size.replace(/[^0-9]/g, '');
        if(parseInt(vm.size)===0){
            vm.size=10;
        }
    };
    //certain button of page module
    vm.getNewPage=function () {
        vm.type=vm.listType;
        vm.status=vm.listStatus;
        $state.go('frameState.articleList',
            {
                page: vm.setPage,
                size: vm.size,
            },{reload: true});
    };
});
