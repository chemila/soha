<!--{include file="header.php"}-->
<body>
<div id="wrap_blog">
<!--{include file="header/top.php"}-->
	<div class="main_blog clearfix">
		<div class="blog_sidebar">
            <!--{include file="header/user.php"}--> 
			<ul class="main_nav_r">
				<li><s class="s1"></s><a href="/home">我的主页</a></li>
				<li class="on"><p><s class="s2"></s><a href="/comment/me">提到我的</a></p></li>
				<li><s class="s3"></s><a href="/comment">我的评论</a></li>
			</ul>
			<div class="line"></div>
			<!--关注的明星 start-->
			<!--{include file="home/sidebar.php"}-->
		</div>
		<div class="MIB_600"> 
		
		<h2 class="new_title_ml" style="margin-top:10px;"><b>提到我的微博</b><b class="mb_line_r">|</b><a href="/comment">发出的评论</a></h2>
		<!-- 
		<div class="blog_search">
				<div class="search_input">
					<input name="" type="button" class="btn">
					<input name="" type="text" class="text" onBlur="if(this.value=='')this.value='输入你想找的明星'" onFocus="if(this.value=='输入你想找的明星')this.value=''" value="输入你想找的明星">
				</div>
			</div>
			 -->
<!--我的评论-->
<div class="commendBox">
<!-- commentsmanage -->
<div class="commentsmanage MIB_linkal">
    <!-- <div class="MIB_comheader">
        <input type="checkbox" onclick="scope.selectAllComment(this.checked);" id="selectall" class="selectall">
        <a onclick="scope.selectAllComment();" href="javascript:void(0);">全选</a><span class="MIB_line_l">|</span><a onclick="scope.deleteSeleced()" href="javascript:void(0);">删除</a>
        <div class="rt">共<span><!--{$comments_count}--></span>条</div>
    </div>-->
    
<!--{include file="comment/feed.php"}-->
                               <!-- <div class="MIB_comheader">
                                    <input type="checkbox" onclick="scope.selectAllComment();" id="selectallbottom" class="selectall">
                                    <a onclick="scope.selectAllComment();" href="javascript:void(0);">全选</a><span class="MIB_line_l">|</span><a onclick="scope.deleteSeleced()" href="javascript:void(0);">删除</a>
                                </div>-->
                            </div>
                                                        <!-- commentsmanage -->
                            
                                                
                        </div>
<!--/我的评论-->
			
			<div class="pages"><!--{pagination total=$count}--></div>
		</div>
<!--{include file="footer.php"}--> 
