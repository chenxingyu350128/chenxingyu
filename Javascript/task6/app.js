var app=angular.module('myApp',['ui.router','ngMessages','ui.bootstrap','ng.ueditor','oc.lazyLoad'])
.config(function ($stateProvider,$urlRouterProvider,$locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.when('/','/login');
    $stateProvider
        .state('loginState',{
            url:'/login',
            templateUrl:'pages/loginPage.html',
            controller:'loginPage',
            controllerAs: 'login',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'js/login.js',
                        'css/reset.css',
                        'css/loginPage.css'
                    ]);
                }]
            }
        })
        .state('frameState',{
            url:'/mainFrame',
            templateUrl:'pages/frameCtrl.html',
            controller: 'frameCtrl',
            controllerAs:'frame',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'js/service/myConstant.js',
                        'js/service/myFilter.js',
                        'js/frameCtrl.js',
                        'css/mainFrame.css'
                    ]);
                }]
            }
        })
        .state('frameState.companyList',{
            url:'/companyList',
            templateUrl:'pages/companyList.html'
        })
        .state('frameState.positionList',{
            url:'/positionList',
            templateUrl:'pages/positionList.html'
        })
        .state('frameState.articleList',{
            url:'/articleList?startAt&(endAt+86399999)&type&status&size&page&id&createAt&url&updateAt',
            templateUrl:'pages/articleList.html',
            controller:'articleListCtrl',
            controllerAs:'article',
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'js/articleList.js',
                        'css/rightContent.css'
                    ]);
                }]
            }
        })
        .state('frameState.addArticleList',{
            url:'/addArticleList?id',
            templateUrl:'pages/addArticleList.html',
            controller:'addListCtrl',
            controllerAs:'add',
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'js/uploadDirective.js',
                        'js/addArticleList.js',
                        'css/editPage.css',
                        'js/ueditor/themes/default/css/ueditor.css'
                    ]);
                }]
            }
        })
        .state('frameState.usersManage',{
            url:'/usersManage',
            templateUrl:'pages/usersManage.html'
        })
});
app.run(function ($state) {
    $state.go('loginState');
});