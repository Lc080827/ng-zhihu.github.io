var app = angular.module('myapp',['ngRoute','ngSanitize','ngAnimate']);
app.config(['$routeProvider',function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl:'html/homepage.html',
        controller:'homepageController'
    }).when('/detail/:id',{
        templateUrl:'html/detail.html',
        controller:'detailController'
    }).when("/them/:id",{
        templateUrl:'html/them.html',
        controller:'themController'
    }).when("/themDetail/:id",{
        templateUrl:'html/themDetail.html',
        controller:'themDetailController'
    }).when("/comment/:id",{
        templateUrl:'html/comment.html',
        controller:'commentController'
    });
}]);

//主页面控制器 homepage
app.controller('homepageController',function($scope,$http){
    $http({
       method:'GET',
       url:'http://192.168.10.141:8888/news-at/api/4/news/latest',
    }).then(function(data){
        $scope.newsList = data.data.stories;
        console.log($scope.newsList);
    });
    //下拉刷新数据 采用infinite-scroll插件
    // $scope.Reddit = new Reddit();
    $scope.isShowSidebar = false;
    $scope.toggleSidebar = function(){
        $scope.isShowSidebar = !$scope.isShowSidebar;
        //遮罩层弹出使body样式为fixed 禁止下拉框
        window.document.body.style.position = 'fixed';
        window.document.body.style.width = '100%';
    }
        $scope.hideSidebar = function(){
        $scope.isShowSidebar = !$scope.isShowSidebar;
        console.log($scope.isShowSidebar);
        window.document.body.style.position = 'relative';
    }
    //主题日报获取
    $http({
        method:'GET',
        url:'http://192.168.10.141:8888/news-at/api/4/themes'
    }).then(function(data){
        $scope.themsList = data.data.others;
    });
});

//轮播图控制器
app.controller("lunboController",function($scope,$http){
   $http({
      method:'GET',
      url:'http://192.168.10.141:8888/news-at/api/4/news/latest'
   }).then(function(data){
       $scope.picList = data.data.top_stories;
       console.log($scope.picList);
   });
   //图片轮播插件参数配置
    setTimeout(function(){$('#sliderBox').bxSlider({
        mode:'horizontal', //默认的是水平
        displaySlideQty:1,//显示li的个数
        moveSlideQty: 1,//移动li的个数
        captions: true,//自动控制
        auto: true,
        controls: false,//隐藏左右按钮
        pager:true,
        pause:3000,
    });},500)
});

//新闻详细页控制器
app.controller("detailController",function($scope,$http,$routeParams){
    $http({
        method:'GET',
        url:'http://192.168.10.141:8888/news-at/api/4/news/'+$routeParams.id
    }).then(function(data){
         $scope.detail = data.data;
         console.log($scope.detail);
    });
    //获取评论数以及赞的数量url地址
    $http({
       method:'GET',
       url:'http://192.168.10.141:8888/news-at/api/4/story-extra/'+$routeParams.id
    }).then(function(data){
        $scope.storyExtra = data.data;
    });
    //返回上一级目录
    $scope.back = function(){
        history.go(-1);
    }
});

//主题日报新闻列表页
app.controller("themController",function($scope,$http,$routeParams){
    $http({
       method:'GET',
       url:'http://192.168.10.141:8888/news-at/api/4/theme/'+$routeParams.id
    }).then(function(data){
        $scope.themList = data.data.stories;
        $scope.themHeader = data.data;
        window.document.body.style.position = 'relative';
    });
});

//主题日报详细页控制器
app.controller("themDetailController",function($scope,$http,$routeParams){
    $http({
        method:'GET',
        url:'http://192.168.10.141:8888/news-at/api/4/news/'+$routeParams.id
    }).then(function(data){
        $scope.themDetail = data.data;
        $scope.recommenders = data.data.recommenders;
        console.log($scope.recommenders)
    });
    //获取评论数以及赞的数量url地址
    $http({
        method:'GET',
        url:'http://192.168.10.141:8888/news-at/api/4/story-extra/'+$routeParams.id
    }).then(function(data){
        $scope.storyExtra = data.data;
    });
    //返回上一级目录
    $scope.back = function(){
        history.go(-1);
    }
});

//评论控制器comment
app.controller("commentController",function($scope,$http,$routeParams){
    //总评论数获取
    $http({
        method:'GET',
        url:'http://192.168.10.141:8888/news-at/api/4/story-extra/'+$routeParams.id
    }).then(function(data){
        $scope.storyExtra = data.data;
    });
    //长评论
    $http({
       method:'GET',
       url:'http://192.168.10.141:8888/news-at/api/4/story/'+$routeParams.id+'/long-comments'
    }).then(function(data){
        $scope.longComment = data.data.comments;
        console.log($scope.longComment.length);
    });
    //评论显示与隐藏
    $scope.isCommentLongToggle = true;
    $scope.commentLongToggle = function(){
        $scope.isCommentLongToggle = !$scope.isCommentLongToggle;
    }
    //短评获取
    $http({
        method:'GET',
        url:'http://192.168.10.141:8888/news-at/api/4/story/'+$routeParams.id+'/short-comments'
    }).then(function (data) {
        $scope.shortComment = data.data.comments;
        console.log($scope.shortComment.length);
    });
    //评论显示与隐藏
    $scope.isCommentShortToggle = true;
    $scope.commentShortToggle = function(){
        $scope.isCommentShortToggle = !$scope.isCommentShortToggle;
    };
    //返回上一级
    $scope.back = function(){
        history.go(-1);
    };
});

// app.controller("sidebarController",function($scope,$http){
// //侧边栏显示与隐藏
//     $scope.isShowSidebar = true;
//     $scope.hideSidebar = function(){
//         $scope.isShowSidebar = !$scope.isShowSidebar;
//         console.log($scope.isShowSidebar);
//         window.document.body.style.position = 'relative';
//     }
//     //主题日报获取
//     $http({
//         method:'GET',
//         url:'http://192.168.10.141:8888/news-at/api/4/themes'
//     }).then(function(data){
//         $scope.themsList = data.data.others;
//     });
// });

//自定义图片缓存过滤器
app.filter("attachImageUr",function(){
    // 修改图片链接 直接访问知乎图片显示403 需要缓存处理
    return function(srcUrl){
        //防止变量为空的情况
        if( srcUrl !== undefined ){
            return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
        }
    }
});

//组件复用 图片轮播组件
app.component("lunbo",{
    templateUrl:'component/lunbo.html',
    controller:'lunboController'
});

//组件复用 侧边栏sidebar组件
// app.component("sidebar",{
//     templateUrl:'component/sidebar.html',
//     controller:'sidebarController'
// });