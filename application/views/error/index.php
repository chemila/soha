<!--{include file="header.php"}-->
</head>
<body>
<div id="wrap_blog">
	<div class="mxk_header">
        <!--start: header top--> 
        <!--{include file="header/top.php"}--> 
	</div>
	<div class="clearfix help_center">
		<div class="main_blog_top">
			<div class="blog_title"><span class="f20"><!--{$message|default:'错误提示'}--></span></div>
		</div>
		
				<div class="error">
					<div class="title">
                        <img class="PY_ib PY_ib_1" src="media/img/common/PY_ib.gif">
                        <!--{$message|default:'抱歉你所访问的内容不存在'}-->。</div>
					<div class="con">
		                <p class="con_mtop"><em id="timeout">5</em>秒之后页面自动跳转，你还可以：</p>
		                <p><span class="rank">1</span><a href="/star">返回首页</a></p>
		                <p><span class="rank">2</span>去其它地方逛逛&nbsp;&nbsp;<a href="home">我的首页</a> | <a href="home/profile">我的微博</a> | <a href="message">我的私信</a> | <a href="attention">我的关注</a></p>
		            </div> 
				</div>
			
		<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
	</div>
    <!--
	<script type="text/javascript">
		var timeout = 10;
		var timeouthandle = setInterval(function(){
			timeout--;
			if(timeout <= 0){
				clearInterval(timeouthandle);
				window.location.replace('/star');
				return;
			}
			document.getElementById('timeout').innerHTML = timeout;
		}, 1000);
	
	</script>
    -->
	
<!--{include file="footer.php"}-->
