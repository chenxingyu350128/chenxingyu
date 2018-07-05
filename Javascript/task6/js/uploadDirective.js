app.directive('upLoad',function ($http) {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: '../pages/uploadImage.html',
        scope: {
            img: '=',
        },
        link: function (scope) {
            //选择文件
            scope.uploadImage=function (fu) {
                scope.$apply(function () {
                    //fu即为input元素
                    scope.INPUT= fu;//将这个input元素节点赋给INPUT
                    scope.file=fu.files[0];
                    scope.fileName=scope.file.name;
                    scope.fileSize=scope.file.size;
                    scope.progress=0;
                    scope.showMe=true;
                })
            };
            //上传图片/删除图片
            scope.fr=new FileReader();//创建fileReader接口
            scope.upload=function(){
                //创建FormDate
                let formData=new FormData();
                //调用FileReader的readAsDataURL方法
                scope.fr.readAsDataURL(scope.file);
                //将数据以append方法传给formDate
                formData.append('file',scope.file);
                scope.fr.onprogress=function (a) {
                };
                //文件大小不得超过5M
                if(scope.fileSize < 5242880 ){
                    $http({
                        method: 'POST',
                        url: '/carrots-admin-ajax/a/u/img/task/',
                        data: formData,
                        dataType: 'json',
                        headers: {"Content-Type": undefined},
                        uploadEventHandlers: {//upload事件监听
                            progress: function (res) {
                                scope.progress = (res.loaded/res.total)*100;
                            }
                        }
                    }).then(function successCallBack(response) {
                        scope.img= response.data.data.url;
                    })
                }
            };
            //删除上传地图片
            scope.deleteImg=function(){
                scope.file='';
                scope.fileName='';
                scope.fileSize='';
                scope.progress=0;
                scope.img='';
                scope.INPUT.value = ''// 防止删除一个文件后不能再次上传同一个文件的问题
            };
        }
    }
});