<!--{include file="header.php"}-->
<body>
<div id="wrap_blog">
    <!--{include file="header/top.php"}--> 
    <div class="main_leftimg"></div>
    <div class="main_t"></div>
    <div class="main_blog clearfix">
        <div class="blog_sidebar">
        <!--{include file="header/user.php"}--> 
        <!--{include file="home/nav.php"}--> 
        <div class="line"></div>
		<div id="user_list"><!--{include file="home/sidebar.php"}--></div>
    </div>
    <div class="MIB_600"> 
        <!--{include file="weibo/publish.php"}-->
    </div>	
	<h2 class="new_title_ml"><!--{$title}--></h2>	
    <!--start: list feeds--> 
    <ul class="MIB_feed" id="feed_list">
        <!--<div style="overflow-x: hidden; overflow-y: hidden;">
            <a href="javascript:;" class="newMblog_ts1" style="display: none;" id="feed_msg_new">有新微博，点击查看</a>
        </div>-->
        <!--{foreach from=$feeds item=weibo}--> 
			<!--{include file='weibo/feed.php' weibo=$weibo current_user=$current_user|default:0}-->  	
        <!--{/foreach}--> 
    </ul>
    <div class="pages"><!--{pagination total=$count|default:0 perpage=$perpage|default:20 tpl="public/pagination"}--></div>
</div>
<!--{include file="footer.php"}--> 
