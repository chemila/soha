<!--{include file="header.php"}-->
<script type="text/javascript">
jQuery(document).ready(function() {
	jQuery('#scroll_star_list').jcarousel({
		auto:5
    });
});
</script>
</head>
<body>
<div id="wrap">
	<div class="mxk_header">
        <!--start: header top--> 
        <!--{include file="header/top.php"}--> 
		<ul class="nav">
			<li><a href="#" class="current">微博明星(999999)</a></li>
			<li><a href="#">行业大腕(999999)</a></li>
			<li><a href="#">草根红人(999999)</a></li>
			<li><a href="#">我关注的(999999)</a></li>
		</ul>
	</div>
	<div class="main">
		<div class="main_leftimg"></div>
		<div class="main_t"></div>
		<div class="main_c"> 
            <!-- start: search --> 
			<div class="search">
                <!--{include file="search/quick.php"}--> 				
                <!--{include file="search/input.php"}--> 				
			</div>
            <!--start: stars list--> 
			<div class="star_list">
                <!-- pagination for stars --> 
				<div class="pages">
                    <a href="#" class="prev">上一页</a><span class="current">[<a href="#">1</a>]</span><a href="#">2</a><a href="#">3</a><a href="#">4</a><a href="#">5</a><a href="#" class="next">下一页</a>
                </div>
				<ul id="scroll_star_list" class="jcarousel-skin-tango">
                    <!--{foreach from=$stars item=star}-->
					<li>
						<div class="star_info">
							<div><a href="/user/<!--{$star.uid}-->"><img src="<!--{$star.head_url}-->"></a> <a href="/user/<!--{$star.uid}-->"><!--{$star.nick}--></a><br>
								粉丝：
								<!--{$star.followers_count}--></div>
							<p><a href="#" class="btn3">已关注</a><a href="#"class="btn2">送礼品</a></p>
						</div>
                    </li>
                    <!--{/foreach}-->
					</li>
				</ul>
			</div>
			<!--start: weibo list including news and hot commented-->
			<div class="clearfix">
				<div class="fan_comments w280bg">
					<div class="title"> <a href="index2.html" class="show">展开查看</a>
						<h2 class="fan_comments_title">粉丝热议</h2>
					</div>
                    <!--start: hot commented weibo list-->
					<ul class="small_list">
                        <!--{foreach from=$hot_commented item=weibo key=index}--> 
                            <!--{include file="weibo/hot_commented.php" weibo=$weibo index=$index}--> 
                        <!--{/foreach}-->
					</ul>
				</div>
                <!--star stars news-->
				<div class="star_news w620bg">
					<div class="title">
						<h2 class="star_news_title">明星动态</h2>
					</div>
					<ul class="MIB_feed" id="feed_list">
                        <!--{foreach from=$stars_news item=weibo}-->
					        <!--{include file='weibo/feed.php' weibo=$weibo}-->  	
                        <!--{/foreach}-->
					</ul>
				</div>
			</div>
            <!-- pagination --> 
			<div class="pages">
                <a href="#" class="prev2">首页</a><a href="#" class="prev">上一页</a><span class="current">[<a href="#">1</a>]</span><a href="#">2</a><a href="#">3</a><a href="#">4</a><a href="#">5</a><a href="#">6</a><a href="#">7</a><a href="#">8</a><a href="#">9</a><a href="#">10</a><a href="#" class="next">下一页</a><a href="#" class="next2">末页</a>
            </div>
		</div>
		<div class="main_b"></div>
	</div>
<!--{include file="footer.php"}-->
