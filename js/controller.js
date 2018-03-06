var app = angular.module('myapp',['ngRoute','ngSanitize']);
app.config(['$routeProvider',function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl:'html/homepage.html',
        controller:'homepageController'
    }).when('/detail/:id',{
        templateUrl:'html/detail.html',
        controller:'detailController'
    });
}]);

//主页面控制器
app.controller('homepageController',function($scope,$http){
    $http({
       method:'GET',
       url:'http://192.168.10.141:8888/news-at/api/4/news/latest',
    }).then(function(data){
        $scope.newsList = data.data.stories;
        console.log($scope.newsList);
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
   //图片轮播
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

//详细页控制器
app.controller("detailController",function($scope,$http,$routeParams){
    $http({
        method:'GET',
        url:'http://192.168.10.141:8888/news-at/api/4/news/'+$routeParams.id
    }).then(function(data){
         $scope.detail = data.data;
         console.log($scope.detail);
    });
    $scope.back = function(){
        history.go(-1);
    }
});

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


//组件复用
app.component("lunbo",{
    templateUrl:'component/lunbo.html',
    controller:'lunboController'
});