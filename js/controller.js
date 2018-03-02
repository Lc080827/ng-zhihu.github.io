var app = angular.module('myapp',['ngRoute']);
app.config(['$routeProvider',function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl:'html/homepage.html',
        controller:'homepageController'
    });
}]);

//组件复用
app.component("lunbo",{
    templateUrl:'component/lunbo.html',
    controller:'lunboController'
});

//主页面控制器
app.controller('homepageController',function($scope,$http,$routeParams){
    $scope.id = $routeParams.id;
    $http({
       method:'GET',
       url:'http://192.168.10.141:8888/news-at/api/4/news/latest',
        params:{
            columnId:$scope.id
        }
    }).then(function(data){
        $scope.newsList = data.data.stories;
        for(var i=0;i<$scope.newsList.length;i++){
            $scope.newsList[i].url = 'http://192.168.10.141:8888/news-at/api/4/news/latest?id='+$scope.newsList[i].id;
        }
        // 修改图片链接 直接访问知乎图片显示403 需要缓存处理
        $scope.attachImageUrl=function(srcUrl) {
            if (srcUrl !== undefined) {
                return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
            }
        }
    });
});

//轮播图控制器
app.controller("lunboController",function($scope,$http){
   $http({
      method:'GET',
      url:'http://192.168.10.141:8888/news-at/api/4/news/latest',
      params:{
          columnId:$scope.id
      }
   }).then(function(data){
       $scope.picList = data.data.top_stories;
       console.log($scope.picList);
       // 修改图片链接 直接访问知乎图片显示403 需要缓存处理
       $scope.attachImageUrl=function(srcUrl) {
           if (srcUrl !== undefined) {
               return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
           }
       }
       // for(var i=0;i<$scope.picList.length;i++){
       //     $scope.picList[i].url = 'json/serviceCenter.json?docId='+$scope.picList[i].id;
       // }
   });
    //轮播图
    setTimeout(function(){$('#sliderBox').bxSlider({
        mode:'horizontal', //默认的是水平
        displaySlideQty:1,//显示li的个数
        moveSlideQty: 1,//移动li的个数
        captions: true,//自动控制
        auto: true,
        controls: false,//隐藏左右按钮
        pager:true,
        pause:2000,
    });},0)
});