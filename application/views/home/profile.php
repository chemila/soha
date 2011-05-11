<!--{include file="header.php"}-->
<body>
<div id="wrap_blog">
<!--{include file="header/top.php"}--> 
    <div class="main_t"></div>
    <div class="main_leftimg"></div>
    <div class="main_blog clearfix">
	<div class="main_blog_top">
		<div class="search_input">
			<input name="" type="button" class="btn">
			<input name="" type="text" class="text" onblur="if(this.value=='')this.value='输入你想找的明星'" onfocus="if(this.value=='输入你想找的明星')this.value=''" value="输入你想找的明星">
		</div>
		<div class="blog_title"><span class="f20"><!--{$user.nick}--></span> 的博客</div>
	</div>
	<div class="blog_sidebar">
		<!--{include file="header/user.php"}--> 
        <!--{include file="home/nav.php"}--> 
		<div class="line"></div>
		<!--{include file="home/sidebar.php"}-->
	</div>
	<div class="news ">
		<div class="news_img"> 
			<img src="<!--{$user.portrait|replace:"/50/":"/180/"}-->">
		</div>
		<div class="news_neme">
			<h2 class="fb f20"><!--{$user.nick}--></h2>
			<a href="http://<!--{$domain}-->/home/profile/<!--{$user.uid}-->" style="color: #0082CB;">http://<!--{$domain}-->/home/profile/<!--{$user.uid}--></a><br />
			<img src="/media/img/transparent.jpg" /><!--{$user.location}-->
			<br />
			<dl>
				<dt>最新动态：</dt>
				<dd><!--{if $user.intro eq ""}-->暂无最新动态<!--{else}--><!--{$user.intro}--><!--{/if}--></dd>
			</dl>
		</div>
		<!--{if $show_attention_button eq 1}-->
		<ul class="btn">
			<li>
				<!--{if $followed}-->
				<div id="atnRelation" class="MIB_btn2 lf">已关注<span class="MIB_line_sp">|</span><a onclick="App.removeFollow('<!--{$user.uid}-->',this,'<!--{$user.nick}-->',{'refer_sort':'profile','atnId':'profile'});return false;" href="javascript:void(0);" class="MIB_linkbl" id="cancelfollow"><em>取消</em></a></div>
				<!--{else}-->
				<a onclick="_S_uaTrack('tblog_attention_click','<!--{$user.uid}-->');App.followOne('<!--{$user.uid}-->',this,'<!--{$user.nick}-->',{'refer_sort':'profile','atnId':'profile'});" href="javascript:void(0);" class="btn_add" id="add_atn" pop="true"><img class="SG_icon" dynamic-src="/media/img/transparent.gif" title="加关注" src="/media/img/transparent.gif"><em>加关注</em></a>
				<!--{/if}-->
			</li>
		</ul>
		<!--{/if}-->
	</div>
	
	<!--start: list feeds--> 
	<ul class="MIB_feed" id="feed_list">
		<!--{foreach from=$feeds item=weibo}--> 
			<!--{include file='weibo/feed.php'}--> 
		<!--{/foreach}--> 
	</ul>
	<div class="pages"><!--{pagination total=$count}--></div>
</div>
<!--{include file="footer.php"}--> 
