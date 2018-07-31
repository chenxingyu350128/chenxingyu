let app=angular.module('huaer',[])
    .controller('myCtrl',function ($scope,$q) {
        $scope.text = '测试用，可忽略';
        let defer1 = $q.defer();
        let promise1 = defer1.promise;
        promise1
            .then(function (value) {
                    console.log("in promise1 ----success");
                    console.log(value);
                },
                function (value) {
                    console.log("in promise1 ----error");
                    console.log(value);
                },
                function (value) {
                    console.log("in promise1 ----notify");
                    console.log(value);
                })
            .catch(function (e) {
                console.log("in promise1 ----catch");
                console.log(e);
            })
            .finally(function (e) {
                console.log("in promise1 ----finally");
                console.log(e);
            });
        defer1.resolve("hello");
    });