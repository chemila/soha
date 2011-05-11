<!--{include file="header.php"}-->
<body>
<div id="wrap_blog">
    <!--{include file="header/top.php"}--> 
    <div class="main_t"></div>
    <div class="main_leftimg"></div>
    <div class="main_blog clearfix">
        <div class="blog_sidebar">
        <!--{include file="header/user.php"}--> 
        <!--{include file="home/nav.php"}--> 
        <div class="line"></div>
	    <!--{include file="home/sidebar.php"}--> 	
    </div>
    <div class="MIB_600"> 
        <!--{include file="weibo/publish.php"}-->
    </div>	
	<h2 class="new_title_ml">提到我的微博<span>(<!--{$count}-->条)</span></h2>	
    <!--start: list feeds--> 
    <ul class="MIB_feed" id="feed_list">
        <!--{foreach from=$feeds item=weibo}--> 
			<!--{include file='weibo/feed.php' weibo=$weibo}-->  	
        <!--{/foreach}--> 
    </ul>
    <div class="pages"><!--{pagination total=$count}--></div>
</div>
<!--{include file="footer.php"}--> 
