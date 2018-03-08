# ng-zhihu.github.io
用angular JS仿知乎app 数据来源于知乎网站 仅供项目实践参考 不做其它用途 需要删除立即删除
知乎api数据分析：github地址:https://github.com/izzyleung/ZhihuDailyPurify/wiki/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5-API-%E5%88%86%E6%9E%90

1.nginx反向代理：因知乎数据不能直接在本地反问（存在跨域问题）,也不能通过jsonp去请求,于是需要通过反向代理处理
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
192.168.10.141:8888/news-at/****  ===  http://news-at.zhihu.com/***


2.图片防盗链问题
知乎API返回的数据中的图片都是存储在知乎服务器上的url地址，直接请求会返回403，所以需要进行一些处理，这里我采用了yatessss同学在使用vue完成知乎日报web版的解决方案，使用Images.weserv.nl进行缓存图片，并在需要使用图片url的地方进行相应的替换。