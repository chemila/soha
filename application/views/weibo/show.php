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
    <!--start: list feeds--> 
    <ul class="MIB_feed" id="feed_list">
        <!--{foreach from=$feeds item=weibo}--> 
			<!--{include file='weibo/feed.php' weibo=$weibo current_user=$current_user|default:0}-->  	
        <!--{/foreach}--> 
    </ul>

    <div class="pages"><!--{pagination total=$count|default:0 perpage=$perpage|default:20}--></div>
</div>

<!--{include file="footer.php"}-->
<script>
scope.loadCommentByRid(<!--{$feeds[0].uid}-->, 'miniblog2', '', '<!--{$feeds[0].id}-->', ' ', '', '', 1, 0, 1);
</script>
