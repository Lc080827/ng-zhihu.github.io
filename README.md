# ng-zhihu.github.io
## 申明
*   『知乎』是 知乎. Inc 的注册商标。本软件与其代码非由知乎创作或维护。软件中所包含的信息与内容皆违反版权与知乎用户协议。本项目所有文字图片等稿件内容均由知乎提供，获取与共享之行为或有侵犯知乎权益的嫌疑。若被告知需停止共享与使用，本人会及时删除整个项目。请您了解相关情况，并遵守知乎协议。

## 技术栈
*   angularJS+angular-router+css+jquery ...

## 用到的插件
*   bxSlider+angular-animate+ng-infinite-scroll+sweetAlert(滑动效果、动画效果、下拉刷新、alert弹出效果) ...

## 访问地址
*	http://yu.sulishibaobei.com:8080/ng-zhihu/#/

## 效果截图
![首页效果截图](https://github.com/Lc080827/ng-zhihu.github.io/blob/master/images/QQ%E5%9B%BE%E7%89%8720180312105003.png)
![首页效果截图](https://github.com/Lc080827/ng-zhihu.github.io/blob/master/images/daohang_github.png)
![首页效果截图](https://github.com/Lc080827/ng-zhihu.github.io/blob/master/images/list_github.png)
![首页效果截图](https://github.com/Lc080827/ng-zhihu.github.io/blob/master/images/comment_github.png)
![首页效果截图](https://github.com/Lc080827/ng-zhihu.github.io/blob/master/images/commentDetail_github.png)


## 知乎api数据分析
*   [知乎api数据分析](https://github.com/izzyleung/ZhihuDailyPurify/wiki/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5-API-%E5%88%86%E6%9E%90)

# 问题解决
## 知乎api数据跨域解决
*   nginx反向代理：因知乎数据不能直接在本地反问（存在跨域问题）,也不能通过jsonp去请求,于是需要通过反向代理处理
```nginx配置
server {
    listen       8888; //端口
    server_name  192.168.10.141; //自己的ip地址
	location /news-at/{
	    proxy_pass http://news-at.zhihu.com/; //代理地址
	    add_header Content-Type "text/plain;charset=utf-8";
	    add_header 'Access-Control-Allow-Origin' '*';
	    add_header 'Access-Control-Allow-Credentials' 'true';
	    add_header 'Access-Control-Allow-Methods' 'GET';
	}
}
最后代理结果就是：   192.168.10.141:8888/news-at/****  ===  http://news-at.zhihu.com/***
```

## 图片防盗链问题
*   知乎API返回的数据中的图片都是存储在知乎服务器上的url地址，直接请求会返回403，所以需要进行一些处理，这里我采用了[yatessss](http://www.yatessss.com/2016/07/08/%E4%BD%BF%E7%94%A8vue%E5%AE%8C%E6%88%90%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5web%E7%89%88.html)同学在使用vue完成知乎日报web版的解决方案，使用Images.weserv.nl进行缓存图片，并在需要使用图片url的地方进行相应的替换。

## 项目未完成项
*   首页下拉刷新更新数据
*   收藏文章功能
*   详情页上下篇跳转功能
*   分享功能