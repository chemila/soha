<!--{include file="header.php"}--> 
<style>
.logos {
float:
    overflow: hidden;
    cursor: pointer;
}
.container {
    text-align: center;
}
.clear {
	clear: both;
	padding: 0;
	margin: 0;
}
.logos {
}
.logos div {
    float: left;
    padding: 10px;
    margin: 10px;
}

</style>
</header>
<div class="container">
    <div class="center">
        <h1>选择登录方式﹕</h1>
    </div>
    <div class="logos">
        <div><a href="auth/login?source=sina" id="logo_sina">
            <img src="media/img/auth/sina.png" >
        </a></div>
        <div><a href="auth/login?source=qq" id="logo_qq">
            <img src="media/img/auth/qq.jpg">
        </a></div>
        <div><a href="auth/login?source=sohu" id="logo_sohu">
            <img src="media/img/auth/sohu-weibo-logo.png">
        </a></div>
        <div><a href="auth/login?source=163" id="logo_163">
            <img src="media/img/auth/163.png">
        </a></div>
        <!--
        <div><a href="auth/login?source=flickr" id="logo_flickr">
            <img src="media/img/auth/flickr.png">
        </a></div>
        -->
    </div>   
    <div class="clear"></div>
</div>
<!--{include file="footer/main.php"}--> 

