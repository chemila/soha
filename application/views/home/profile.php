<!--{include file="header.php"}-->
<body>
<div id="wrap_blog">
<!--{include file="header/top.php"}--> 
    <div class="main_leftimg"></div>
    <div class="main_t"></div>
    <div class="main_blog clearfix">
	<div class="main_blog_top">
		<div class="blog_title"><span class="f20"><!--{$user.nick}--></span> 的博客</div>
	</div>
	<div class="blog_sidebar">
		<!--{include file="header/user.php"}--> 
        <!--{include file="home/nav.php"}--> 
		<div class="line"></div>
		<div id="user_list"><!--{include file="home/sidebar.php"}--></div>
	</div>
	<div class="news ">
    <div class="news_img"> 
      <span class="alph_img"></span>
			<img src="<!--{$user.portrait|fix_portrait:large}-->">
		</div>
		<div class="news_neme">
    <div class="clearfix">
      <h2 class="fb f20 fl"><!--{$user.nick}--></h2>
        <!--{if $show_attention_button eq 1}-->
        <div class="lf loc_btn_new01">
            <!--{if $followed}-->
            <div id="atnRelation" class="MIB_btn2">已关注<span class="MIB_line_sp">|</span><a onclick="App.removeFollow('<!--{$user.uid}-->',this,'<!--{$user.nick}-->',{'refer_sort':'profile','atnId':'profile'});return false;" href="javascript:void(0);" class="MIB_linkbl" id="cancelfollow"><em>取消</em></a></div>
            <!--{else}-->
            <div><a style="vertical-align: middle; margin-bottom:4px;" onclick="_S_uaTrack('tblog_attention_click','<!--{$user.uid}-->');App.userCardFollow('<!--{$user.uid}-->',this,'<!--{$user.nick}-->',{'refer_sort':'profile','atnId':'profile'});" href="javascript:void(0);" class="btn_add" id="add_atn" pop="true"><img class="SG_icon" dynamic-src="media/img/transparent.gif" title="加关注" src="media/img/transparent.gif"><em>加关注</em></a></div>
            <!--{/if}-->
          </div>
        <!--{/if}-->
      </div>
      
      <!--{if $user.location}-->
      <p>
        <img src="media/img/transparent.jpg" /><!--{$user.location}-->
      <br /></p>
      <!--{/if}-->
      
				<h4>简介：</h4>
				<p><!--{if $user.intro eq ""}-->暂无<!--{else}--><!--{$user.intro}--><!--{/if}--></p>
			<!--{if $user.category eq 1}-->
			<dl>
				<dt>最新动态：</dt>
				<dd><!--{if $user.intro eq ""}-->暂无最新动态<!--{else}--><!--{$user.intro}--><!--{/if}--></dd>
			</dl>
			<!--{/if}-->
		</div>
	</div>
	
	<!--start: list feeds--> 
	<ul class="MIB_feed" id="feed_list">
		<!--{foreach from=$feeds item=weibo}--> 
			<!--{include file='weibo/feed.php'}--> 
		<!--{/foreach}--> 
	
    <div class="pages"><!--{pagination total=$count|default:0 perpage=$perpage|default:20 tpl="public/pagination"}--></div>
    </ul>
</div>
<!--{include file="footer.php"}--> 
