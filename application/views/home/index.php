<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>明星控</title>
<link href="http://img.t.sinajs.cn/t3/style/css/common/index.css" type="text/css" rel="stylesheet" />
<link href="/media/css/home/base.css" rel="stylesheet" type="text/css">
<link href="/media/css/home/style.css" rel="stylesheet" type="text/css">
</head>
<body>
<div id="wrap_blog">
    <!--{include file="header/top.php"}--> 
	<div class="main_blog clearfix">
		<div class="blog_sidebar">
            <!--{include file="header/user.php"}--> 
			<ul class="main_nav_r">
				<li class="on"><s class="s1"></s><a href="">我的主页</a></li>
				<li><p><s class="s2"></s><a href="">@提到我的</a></p></li>
				<li><s class="s3"></s><a href="">我的评论</a></li>
			</ul>
			<div class="line"></div>
			<!--关注的明星 start-->
			<div class="blog_sidebar_title">
				<div class="clearfix">
					<h2 class="fl f14 fb">你关注的明星</h2>
				</div>
                <!--TODO: count--> 
            </div>
			<ul class="fans_list clearfix">
                <!--{foreach from=$followers item=follower}--> 
				<li> 
                    <a href="/home/profile/<!--{$follower.uid}-->"><img src="<!--{$follower.portrait}-->" width="50" height="50"></a> 
                    <a href="/home/profile/<!--{$follower.uid}-->" class="name"><!--{$follower.nick}--></a> 
                </li>
                <!--{foreachelse}--> 
                <li>没有关注</li>
                <!--{/foreach}--> 
			</ul>
			<div class="more tr"><a href="#">更多&gt;&gt;</a></div>
			<div class="line"></div>
			<!--关注的明星 end--> 
            <div class="blog_sidebar_title">
				<div class="clearfix">
					<h2 class="fl f14 fb">朋友们关注的</h2>
				</div>
                <!--TODO: count--> 
            </div>
			<ul class="fans_list clearfix">
                <!--{foreach from=$followers_of_friends item=follower}--> 
				<li> 
                    <a href="/home/profile/<!--{$follower.uid}-->"><img src="<!--{$follower.portrait}-->" width="50" height="50"></a> 
                    <a href="/home/profile/<!--{$follower.uid}-->" class="name"><!--{$follower.nick}--></a> 
                </li>
                <!--{foreachelse}--> 
                <li>没有关注</li>
                <!--{/foreach}--> 
			</ul>
			<div class="more tr"><a href="#">更多&gt;&gt;</a></div>
			<div class="line"></div>
			
			<!--和我互粉的 start-->
			<div class="blog_sidebar_title">
				<h2 class="f14 fb">和我互粉的</h2>
            </div>
			<ul class="fans_list clearfix">
            <!--{foreach from=$friends item=follower}--> 
				<li> 
                    <a href="/home/profile/<!--{$follower.uid}-->"><img src="<!--{$follower.portrait}-->" width="50" height="50"></a> 
                    <a href="/home/profile/<!--{$follower.uid}-->" class="name"><!--{$follower.nick}--></a> 
                </li>
                <!--{foreachelse}--> 
                <li>没有关注</li>
                <!--{/foreach}--> 
            </ul>
			<div class="more tr"><a href="#">更多&gt;&gt;</a></div>
			<div class="line"></div>
			<!--和我互粉的 end--> 
		</div>
		<div class="MIB_600"> 
            <!--{include file="weibo/publish.php"}--> 
        </div>	
			
			
		<h2 class="new_title_ml">提到我的微博<span>(2323条)</span></h2>	
<ul class="MIB_feed" id="feed_list">
						<li id="mid_5598313365219725929" class="MIB_linedot_l">
  <div class="head_pic"><a href="http://weibo.com/1139996885" uid="1139996885" namecard="true"><img dynamic-src="http://tp2.sinaimg.cn/1139996885/50/1300423275" imgtype="head" uid="1139996885" title="牛蕾蕾" src="http://tp2.sinaimg.cn/1139996885/50/1300423275"></a>
</div>
  <div class="MIB_feed_c">
    <p type="3" mid="5598313365219725929" class="sms"><a title="牛蕾蕾" href="http://weibo.com/1139996885" uid="1139996885" namecard="true">牛蕾蕾</a>：时尚杂志拍的照片也忒时尚了，像武打功夫巨星，呵呵 //<a namecard="true" href="http://weibo.com/n/%E4%B8%B9%E4%B8%B9VB%E7%A9%BA%E9%97%B4">@丹丹VB空间</a>:帅 //<a namecard="true" href="http://weibo.com/n/%E5%A4%A7%E5%A4%A7%E5%A4%A7%E7%BB%B4">@大大大维</a>:曹国伟什么时候这么有型了 // <a namecard="true" href="http://weibo.com/n/V%E5%BE%90%E7%90%B3V">@V徐琳V</a> :// <a namecard="true" href="http://weibo.com/n/%E5%BA%B7%E5%9B%BD%E8%8B%B1">@康国英</a> :<img type="face" title="给力" dynamic-src="http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c9/geili_org.gif" src="http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c9/geili_org.gif"> 有型啊// <a namecard="true" href="http://weibo.com/n/%E5%85%AB%E5%9B%9B%E5%85%AC%E7%A4%BE">@八四公社</a> ：// <a namecard="true" href="http://weibo.com/n/%E6%BD%98%E6%BD%98%E6%BD%98%E9%9C%9E">@潘潘潘霞</a> :有型有款，太/ <a namecard="true" href="http://weibo.com/n/%E6%96%B0%E6%B5%AA%E5%A5%B3%E6%80%A7">@新浪女性</a> :<img type="face" title="鼓掌" dynamic-src="http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/1b/gz_org.gif" src="http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/1b/gz_org.gif"> 恭喜“厂长曹国伟”~~~~</p>
<!-- 转发 -->
    <div class="MIB_assign">
  <div class="MIB_asarrow_l"></div>
  <div class="MIB_assign_t"></div>
  <div class="MIB_assign_c MIB_txtbl"> 
    <p type="2" mid="5598313365219725929" class="source">
      <a uid="1765148101" namecard="true" href="http://weibo.com/1765148101">@新浪时尚<img alt="" title="新浪认证" dynamic-src="http://img.t.sinajs.cn/t35/style/images/common/transparent.gif" class="small_icon vip" src="http://img.t.sinajs.cn/t35/style/images/common/transparent.gif"></a>：【帅不帅？】新浪网CEO曹国伟成为美国《时代》周刊2011年度全球最具影响力人物，同时登上《芭莎男士》5月号封面，帅不帅？请注意左侧标题：“厂长曹国伟”<img type="face" title="偷笑" dynamic-src="http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/7e/hei_org.gif" src="http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/7e/hei_org.gif"> <a namecard="true" href="http://weibo.com/n/%E6%97%B6%E5%B0%9A%E8%8A%AD%E8%8E%8E">@时尚芭莎</a> <a namecard="true" href="http://weibo.com/n/%E6%99%AF%E7%92%90BAZAAR">@景璐BAZAAR</a> <a namecard="true" href="http://weibo.com/n/HaoNing">@HaoNing</a> <a namecard="true" href="http://weibo.com/n/%E8%8A%AD%E8%8E%8E%E8%89%BA%E6%9C%AF">@芭莎艺术</a> <a namecard="true" href="http://weibo.com/n/%E8%8A%AD%E8%8E%8E%E7%94%B7%E5%A3%AB%E5%BA%B7%E4%B9%90">@芭莎男士康乐</a> <a namecard="true" href="http://weibo.com/n/%E6%96%B0%E6%B5%AA%E5%A5%B3%E6%80%A7">@新浪女性</a> <a namecard="true" href="http://weibo.com/n/%E6%9B%B9%E5%9B%BD%E4%BC%9F">@曹国伟</a>
    <span class="source_att MIB_linkbl"><a href="http://weibo.com/1765148101/eyW8oZkDVas"><strong lang="CL1005">原文转发</strong><strong type="rttCount" rid="5598220026829514548">(168)</strong></a><span class="MIB_line_l">|</span><a href="http://weibo.com/1765148101/eyW8oZkDVas"><strong lang="CC0603">原文评论</strong><strong type="commtCount" rid="5598220026829514548">(45)</strong></a></span></p>
    <div id="prev_5598313365219725929" class="feed_preview">
            <div class="feed_img"><a href="javascript:void(0);" onclick="App.scaleImg(this,'693605c5jw1dgh1m45ag0j',true);"><img vimg="1" dynamic-src="http://ww1.sinaimg.cn/thumbnail/693605c5jw1dgh1m45ag0j.jpg" class="imgicon" src="http://ww1.sinaimg.cn/thumbnail/693605c5jw1dgh1m45ag0j.jpg"></a>
      </div>
            <div class="clear"></div>
    </div>
    <div style="display: none;" id="disp_5598313365219725929" class="blogPicOri"> </div>
     </div>
  <div class="MIB_assign_b"></div>
</div>
<!-- 转发 -->
        <div class="feed_att MIB_linkbl">
      <div class="lf MIB_txtbl"><cite><a href="http://weibo.com/1139996885/eyX5BGNEO9P"><strong date="2011-04-22 15:55:04">7分钟前</strong></a></cite>
<strong lang="CL1006">来自</strong><cite><a target="_blank" href="http://weibo.com">新浪微博</a></cite></div>
      <div class="rt">
<!-- 转发 -->
<a action-data="fid=eyX5BGNEO9P&amp;uid=1139996885&amp;mid=5598313365219725929&amp;name=%E7%89%9B%E8%95%BE%E8%95%BE&amp;rootuid=1765148101&amp;rootmid=5598220026829514548&amp;rootname=%E6%96%B0%E6%B5%AA%E6%97%B6%E5%B0%9A&amp;allowComment=1&amp;allowRootComment=1&amp;pic=693605c5jw1dgh1m45ag0j" action-type="forward" onclick="return false;" href="javascript:void(0);"><strong lang="CD0023" pop="true">转发</strong><strong type="rttCount" rid="5598313365219725929" id="num_5598313365219725929"></strong></a>
<!-- 转发 -->
<span class="MIB_line_l">|</span>
<a onclick="App.addfavorite_miniblog('5598313365219725929');" href="javascript:void(0);"><strong lang="CL1003">收藏</strong></a>
<!-- 评论 -->
	<span class="MIB_line_l">|</span>
		<a onclick="scope.loadCommentByRid(1139996885, 'miniblog2', '新浪微博', '5598313365219725929', '', '', '', 1, 0, 1);" href="javascript:void(0);" id="_comment_count_miniblog2_5598313365219725929"><strong lang="CL1004">评论</strong><strong type="commtCount" rid="5598313365219725929"></strong></a>
	<!-- 评论 -->
	 </div>
    </div>
    <div id="_comment_list_miniblog2_5598313365219725929"><div popcontainer="true" class="MIB_assign rt"> 
	<div class="MIB_asarrow_r"></div>
	<div class="MIB_assign_t"></div>
	<div class="MIB_assign_c MIB_txtbl">
		
		<div class="logininput new_position">

			<div style="display: none;" id="_comment_logindiv_miniblog2_5598313365219725929" class="login_sboxs">
				登录名：<input type="text" class="" id="_comment_loginuser_miniblog2_5598313365219725929" style="color: rgb(153, 153, 153);" title="电子邮箱/UC号/会员帐号/手机号" alt="电子邮箱/UC号/会员帐号/手机号">
				密码：<input type="password" class="" id="_comment_loginpassword_miniblog2_5598313365219725929">
				<a target="_blank" href="http://login.sina.com.cn/cgi/getpwd/getpwd0.php?entry=sso">找回密码</a><span class="MIB_line_l">|</span><a target="_blank" href="http://weibo.com/reg.php">注册</a>
			</div>							
			 <a onclick="App.showFaces(this,$E('_comment_content_miniblog2_5598313365219725929'),-30,5);return false;" class="faceicon1" href="javascript:void(0);" title="表情"></a>
			<textarea class="lf" style="overflow: hidden; height: 18px; font-family: Tahoma,宋体; border-style: solid; border-width: 1px; word-wrap: break-word; font-size: 12px; line-height: 18px;" id="_comment_content_miniblog2_5598313365219725929"></textarea>
			<a href="javascript:void(0);" id="_comment_post_miniblog2_5598313365219725929" class="btn_normal"><em>评论</em></a>
			<div class="margin_b MIB_txtbl ml35">
				<p><input type="checkbox" id="agree_5598313365219725929"><label for="agree_5598313365219725929">同时转发到我的微博</label></p>
				<p><input type="checkbox" id="isroot_5598313365219725929"><label for="isroot_5598313365219725929">同时评论给原文作者 新浪时尚</label></p>			</div>
		</div>
		
		<ul class="PL_list oddline">
								</ul>
		
							</div>
	<div class="MIB_assign_b"></div>
</div>
<!--评论-->
</div>
  </div>
</li>
						<li id="mid_5598226774396292659" class="MIB_linedot_l">
  <div class="head_pic"><a href="http://weibo.com/1788193873" uid="1788193873" namecard="true"><img dynamic-src="http://tp2.sinaimg.cn/1788193873/50/1299829266" imgtype="head" uid="1788193873" title="togetherforeverhz" src="http://tp2.sinaimg.cn/1788193873/50/1299829266"></a>
</div>
  <div class="MIB_feed_c">
    <p type="3" mid="5598226774396292659" class="sms"><a title="togetherforeverhz" href="http://weibo.com/1788193873" uid="1788193873" namecard="true">togetherforeverhz</a>：//<a namecard="true" href="http://weibo.com/n/%E5%BA%B7%E5%9B%BD%E8%8B%B1">@康国英</a>://<a namecard="true" href="http://weibo.com/n/4%E5%8F%B7HEROIN_TB%E5%8D%A2%E8%99%8E">@4号HEROIN_TB卢虎</a>：//<a namecard="true" href="http://weibo.com/n/MLikeasong">@MLikeasong</a>:最近破财，看来得转//<a namecard="true" href="http://weibo.com/n/%E6%B7%98%E5%8B%BE%E5%8B%BE">@淘勾勾</a>：这个得转~ //<a namecard="true" href="http://weibo.com/n/zuuu">@zuuu</a>: //<a namecard="true" href="http://weibo.com/n/JJIGG">@JJIGG</a>:恩 转一下 // <a namecard="true" href="http://weibo.com/n/%E4%BD%95%E5%B0%8F%E5%B0%8F%E9%B9%8F">@何小小鹏</a> :那必须要转发一下了</p>
<!-- 转发 -->
    <div class="MIB_assign">
  <div class="MIB_asarrow_l"></div>
  <div class="MIB_assign_t"></div>
  <div class="MIB_assign_c MIB_txtbl"> 
    <p type="2" mid="5598226774396292659" class="source">
      <a uid="1252373132" namecard="true" href="http://weibo.com/1252373132">@全球热门排行榜</a>：最近运气低的朋友们！请拜一拜！很灵验！祈求能得好运气的请转发！
    <span class="source_att MIB_linkbl"><a href="http://weibo.com/1252373132/wr4n3wtO3M"><strong lang="CL1005">原文转发</strong><strong type="rttCount" rid="201110419427103946">(51493)</strong></a><span class="MIB_line_l">|</span><a href="http://weibo.com/1252373132/wr4n3wtO3M"><strong lang="CC0603">原文评论</strong><strong type="commtCount" rid="201110419427103946">(3805)</strong></a></span></p>
    <div id="prev_5598226774396292659" class="feed_preview">
            <div class="feed_img"><a href="javascript:void(0);" onclick="App.scaleImg(this,'4aa5b28cjw1dgdwivr97wj',true);"><img vimg="1" dynamic-src="http://ww1.sinaimg.cn/thumbnail/4aa5b28cjw1dgdwivr97wj.jpg" class="imgicon" src="http://ww1.sinaimg.cn/thumbnail/4aa5b28cjw1dgdwivr97wj.jpg"></a>
      </div>
            <div class="clear"></div>
    </div>
    <div style="display: none;" id="disp_5598226774396292659" class="blogPicOri"> </div>
     </div>
  <div class="MIB_assign_b"></div>
</div>
<!-- 转发 -->
        <div class="feed_att MIB_linkbl">
      <div class="lf MIB_txtbl"><cite><a href="http://weibo.com/1788193873/eyWbewvqp0v"><strong date="2011-04-22 10:19:03">今天 10:19</strong></a></cite>
<strong lang="CL1006">来自</strong><cite><a target="_blank" href="http://weibo.com">新浪微博</a></cite></div>
      <div class="rt">
<!-- 转发 -->
<a action-data="fid=eyWbewvqp0v&amp;uid=1788193873&amp;mid=5598226774396292659&amp;name=togetherforeverhz&amp;rootuid=1252373132&amp;rootmid=201110419427103946&amp;rootname=%E5%85%A8%E7%90%83%E7%83%AD%E9%97%A8%E6%8E%92%E8%A1%8C%E6%A6%9C&amp;allowComment=1&amp;allowRootComment=1&amp;pic=4aa5b28cjw1dgdwivr97wj" action-type="forward" onclick="return false;" href="javascript:void(0);"><strong lang="CD0023" pop="true">转发</strong><strong type="rttCount" rid="5598226774396292659" id="num_5598226774396292659"></strong></a>
<!-- 转发 -->
<span class="MIB_line_l">|</span>
<strong>已收藏</strong>
<!-- 评论 -->
	<span class="MIB_line_l">|</span>
		<a onclick="scope.loadCommentByRid(1788193873, 'miniblog2', '新浪微博', '5598226774396292659', '', '', '', 1, 0, 1);" href="javascript:void(0);" id="_comment_count_miniblog2_5598226774396292659"><strong lang="CL1004">评论</strong><strong type="commtCount" rid="5598226774396292659"></strong></a>
	<!-- 评论 -->
	 </div>
    </div>
    <div id="_comment_list_miniblog2_5598226774396292659"></div>
  </div>
</li>
						<li id="mid_5598296099450384673" class="MIB_linedot_l">
  <div class="head_pic"><a href="http://weibo.com/1644242917" uid="1644242917" namecard="true"><img dynamic-src="http://tp2.sinaimg.cn/1644242917/50/1278420927" imgtype="head" uid="1644242917" title="瑶Yao" src="http://tp2.sinaimg.cn/1644242917/50/1278420927"></a>
</div>
  <div class="MIB_feed_c">
    <p type="3" mid="5598296099450384673" class="sms"><a title="瑶Yao" href="http://weibo.com/1644242917" uid="1644242917" namecard="true">瑶Yao</a>：//<a namecard="true" href="http://weibo.com/n/%E5%BA%B7%E5%9B%BD%E8%8B%B1">@康国英</a>：转发微博。</p>
<!-- 转发 -->
    <div class="MIB_assign">
  <div class="MIB_asarrow_l"></div>
  <div class="MIB_assign_t"></div>
  <div class="MIB_assign_c MIB_txtbl"> 
    <p type="2" mid="5598296099450384673" class="source">
      <a uid="1764452651" namecard="true" href="http://weibo.com/1764452651">@傅蔚冈<img alt="" title="新浪认证" dynamic-src="http://img.t.sinajs.cn/t35/style/images/common/transparent.gif" class="small_icon vip" src="http://img.t.sinajs.cn/t35/style/images/common/transparent.gif"></a>：从今日起到4月30日00：00分，凡转一次本微博，我将为张妙女士的女儿捐助1元人民币，有愿意转？！
    <span class="source_att MIB_linkbl"><a href="http://weibo.com/1764452651/eyWkHFxuZqd"><strong lang="CL1005">原文转发</strong><strong type="rttCount" rid="5598249344277385949">(154570)</strong></a><span class="MIB_line_l">|</span><a href="http://weibo.com/1764452651/eyWkHFxuZqd"><strong lang="CC0603">原文评论</strong><strong type="commtCount" rid="5598249344277385949">(45212)</strong></a></span></p>
    <div id="prev_5598296099450384673" class="feed_preview">
            <div class="clear"></div>
    </div>
    <div style="display: none;" id="disp_5598296099450384673" class="blogPicOri"> </div>
     </div>
  <div class="MIB_assign_b"></div>
</div>
<!-- 转发 -->
        <div class="feed_att MIB_linkbl">
      <div class="lf MIB_txtbl"><cite><a href="http://weibo.com/1644242917/eyWEjZ71C4p"><strong date="2011-04-22 14:48:04">今天 14:48</strong></a></cite>
<strong lang="CL1006">来自</strong><cite><a target="_blank" href="http://weibo.com">新浪微博</a></cite></div>
      <div class="rt">
<!-- 转发 -->
<a action-data="fid=eyWEjZ71C4p&amp;uid=1644242917&amp;mid=5598296099450384673&amp;name=%E7%91%B6Yao&amp;rootuid=1764452651&amp;rootmid=5598249344277385949&amp;rootname=%E5%82%85%E8%94%9A%E5%86%88&amp;allowComment=1&amp;allowRootComment=1" action-type="forward" onclick="return false;" href="javascript:void(0);"><strong lang="CD0023" pop="true">转发</strong><strong type="rttCount" rid="5598296099450384673" id="num_5598296099450384673"></strong></a>
<!-- 转发 -->
<span class="MIB_line_l">|</span>
<a onclick="App.addfavorite_miniblog('5598296099450384673');" href="javascript:void(0);"><strong lang="CL1003">收藏</strong></a>
<!-- 评论 -->
	<span class="MIB_line_l">|</span>
		<a onclick="scope.loadCommentByRid(1644242917, 'miniblog2', '新浪微博', '5598296099450384673', '', '', '', 1, 0, 1);" href="javascript:void(0);" id="_comment_count_miniblog2_5598296099450384673"><strong lang="CL1004">评论</strong><strong type="commtCount" rid="5598296099450384673"></strong></a>
	<!-- 评论 -->
	 </div>
    </div>
    <div id="_comment_list_miniblog2_5598296099450384673"></div>
  </div>
</li>
						<li id="mid_5598296099450384673" class="MIB_linedot_l">
  <div class="head_pic"><a href="http://weibo.com/1644242917" uid="1644242917" namecard="true"><img dynamic-src="http://tp2.sinaimg.cn/1644242917/50/1278420927" imgtype="head" uid="1644242917" title="瑶Yao" src="http://tp2.sinaimg.cn/1644242917/50/1278420927"></a>
</div>
  <div class="MIB_feed_c">
    <p type="3" mid="5598296099450384673" class="sms"><a title="瑶Yao" href="http://weibo.com/1644242917" uid="1644242917" namecard="true">瑶Yao</a>：//<a namecard="true" href="http://weibo.com/n/%E5%BA%B7%E5%9B%BD%E8%8B%B1">@康国英</a>：转发微博。</p>
<!-- 转发 -->
    <div class="MIB_assign">
  <div class="MIB_asarrow_l"></div>
  <div class="MIB_assign_t"></div>
  <div class="MIB_assign_c MIB_txtbl"> 
    <p type="2" mid="5598296099450384673" class="source">
      <a uid="1764452651" namecard="true" href="http://weibo.com/1764452651">@傅蔚冈<img alt="" title="新浪认证" dynamic-src="http://img.t.sinajs.cn/t35/style/images/common/transparent.gif" class="small_icon vip" src="http://img.t.sinajs.cn/t35/style/images/common/transparent.gif"></a>：从今日起到4月30日00：00分，凡转一次本微博，我将为张妙女士的女儿捐助1元人民币，有愿意转？！
    <span class="source_att MIB_linkbl"><a href="http://weibo.com/1764452651/eyWkHFxuZqd"><strong lang="CL1005">原文转发</strong><strong type="rttCount" rid="5598249344277385949">(154570)</strong></a><span class="MIB_line_l">|</span><a href="http://weibo.com/1764452651/eyWkHFxuZqd"><strong lang="CC0603">原文评论</strong><strong type="commtCount" rid="5598249344277385949">(45212)</strong></a></span></p>
    <div id="prev_5598296099450384673" class="feed_preview">
            <div class="clear"></div>
    </div>
    <div style="display: none;" id="disp_5598296099450384673" class="blogPicOri"> </div>
     </div>
  <div class="MIB_assign_b"></div>
</div>
<!-- 转发 -->
        <div class="feed_att MIB_linkbl">
      <div class="lf MIB_txtbl"><cite><a href="http://weibo.com/1644242917/eyWEjZ71C4p"><strong date="2011-04-22 14:48:04">今天 14:48</strong></a></cite>
<strong lang="CL1006">来自</strong><cite><a target="_blank" href="http://weibo.com">新浪微博</a></cite></div>
      <div class="rt">
<!-- 转发 -->
<a action-data="fid=eyWEjZ71C4p&amp;uid=1644242917&amp;mid=5598296099450384673&amp;name=%E7%91%B6Yao&amp;rootuid=1764452651&amp;rootmid=5598249344277385949&amp;rootname=%E5%82%85%E8%94%9A%E5%86%88&amp;allowComment=1&amp;allowRootComment=1" action-type="forward" onclick="return false;" href="javascript:void(0);"><strong lang="CD0023" pop="true">转发</strong><strong type="rttCount" rid="5598296099450384673" id="num_5598296099450384673"></strong></a>
<!-- 转发 -->
<span class="MIB_line_l">|</span>
<a onclick="App.addfavorite_miniblog('5598296099450384673');" href="javascript:void(0);"><strong lang="CL1003">收藏</strong></a>
<!-- 评论 -->
	<span class="MIB_line_l">|</span>
		<a onclick="scope.loadCommentByRid(1644242917, 'miniblog2', '新浪微博', '5598296099450384673', '', '', '', 1, 0, 1);" href="javascript:void(0);" id="_comment_count_miniblog2_5598296099450384673"><strong lang="CL1004">评论</strong><strong type="commtCount" rid="5598296099450384673"></strong></a>
	<!-- 评论 -->
	 </div>
    </div>
    <div id="_comment_list_miniblog2_5598296099450384673"></div>
  </div>
</li>
					</ul>
			
			<div class="pages"><a href="#" class="prev2">首页</a><a href="#" class="prev">上一页</a><span class="current">[<a href="#">1</a>]</span><a href="#">2</a><a href="#">3</a><a href="#">4</a><a href="#">5</a><a href="#">6</a><a href="#">7</a><a href="#">8</a><a href="#">9</a><a href="#">10</a><a href="#" class="next">下一页</a><a href="#" class="next2">末页</a></div>
		</div>
	</div>
</div>
</body>
</html>
