<!--{include file="header/public.php"}-->
<div id="wrap">
	<div class="mxk_header">
        <!--start: header top--> 
        <!--{include file="header/top.php"}--> 
		<ul class="nav">
			<li><a href="/public" class="current">微博明星(<!--{$stars_count_all}-->)</a></li>
			<li><a href="/home">我关注的</a></li>
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
            <div id="tabContent">
            <!--{include file="public/stars.php"}--> 
            </div>
			<!--start: weibo list including news and hot commented-->
			<div class="clearfix">
				<div class="fan_comments w280bg">
					<div class="title"> 
                        <!--<a href="index2.html" class="show">展开查看</a>-->
						<h2 class="fan_comments_title">粉丝热议</h2>
					</div>
                    <!--start: hot commented weibo list-->
					<ul class="small_list" id="feed_comment_list">
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
            <div class="pages"><!--{pagination total=$count|default:0 perpage=$perpage|default:20}--></div>
		</div>
	<div class="main_b"></div>
</div>

<script type="text/javascript" src="/media/js/scroll.js"></script>
<!--{include file="footer.php"}-->
