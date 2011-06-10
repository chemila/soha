<!--{include file="header/setting.php"}-->

<div class="main">
<!--{include file="setting/top.php"}-->
		<div class="main_c clearfix">
			<div class="content">
				<div class="title">
					<h2 style=" background:none;">我的黑名单</h2>
					<span>（已有<!--{$block_count}-->个拉黑人）</span> </div>
				<span class="g_a">  <span class="g_b">  <span class="g_c">&nbsp;</span>  <span class="g_d">被加入黑名单的用户将无法关注你、评论你。如果你已经关注他，也会自动解除关系。</span>  </span> </span> 
				<ul class="user_list" id="feed_list">
				<!--{foreach from=$blocks item=block key=index}--> 
					<li id="<!--{$block.uid}-->">
						<div class="user_info clearfix">
						<div class="cancel">
						<a href="javascript:;" onclick="App.remove_from_blacklist('<!--{$block.uid}-->', this, '<!--{$block.nick}-->','他','1')">解除</a>
							<p><!--{$block.datetime|date_format:"%Y-%m-%d %H:%I"}--></p>
						</div>
						<a href="home/profile/<!--{$block.uid}-->" class="user_img"><img src="<!--{$block.portrait|fix_portrait}-->" style="width: 50px; height: 50px;" uid="<!--{$block.uid}-->" namecard="true"></a> <a href="home/profile/<!--{$block.uid}-->" uid="<!--{$block.uid}-->" namecard="true"><!--{$block.nick}--></a>
							<p><!--{$block.location}--></p>
						</div>
					</li>
				<!--{foreachelse}-->
					<li>
						还没有人被你拉入黑名单呢。
					</li>
				<!--{/foreach}-->
				</ul>
				<div class="page"> <span class="fr"><!--{pagination total=$count|default:0}--></span> <a href="#" class="top">返回顶部</a> </div>
			</div>
<!--{include file="setting/right.php"}-->
		</div>
		<div class="main_b"></div>
<!--{include file="footer/setting.php"}-->
