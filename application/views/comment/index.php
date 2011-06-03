<!--{include file="header.php"}-->
<body>
<div id="wrap_blog">
    <!--{include file="header/top.php"}-->
    <div class="main_t"></div>
	<div class="main_blog clearfix">
        <div class="blog_sidebar">
        <!--{include file="header/user.php"}--> 
        <!--{include file="home/nav.php"}--> 
        <div class="line"></div>
		<div id="user_list"><!--{include file="home/sidebar.php"}--></div>
	</div>
    <div class="MIB_600"> 
        <h2 class="new_title_ml" style="margin-top:10px;">
            <a href="comment/atme" class="current">回复我的评论</a>
            <b class="mb_line_r">|</b>
            <a href="comment">发出的评论</a>
        </h2>	
    </div>
    <div class="commentsmanage MIB_linkal">
        <!--{include file="comment/feed.php"}-->  
        <!-- 
        <div class="MIB_comheader">
            <input type="checkbox" onclick="scope.selectAllComment();" id="selectallbottom" class="selectall">
            <a onclick="scope.selectAllComment();" href="javascript:void(0);">全选</a><span class="MIB_line_l">|</span><a onclick="scope.deleteSeleced()" href="javascript:void(0);">删除</a>
        </div>
         -->
    </div>
    <div style="clear:both;"></div>
	<div class="pages"><!--{pagination total=$count|default:0 perpage=$perpage|default:20 tpl="public/pagination"}--></div>
</div>
<!--{include file="footer.php"}--> 
