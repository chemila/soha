<!--{include file="header_setting.php"}-->
<div class="main">
		<!--{include file="menu_top_setting.php"}-->
		<div class="main_c clearfix">
			<div class="content">
				<div class="title">
					<h2>我的粉丝</h2>
					<span>（已有<!--{$count|default:0}-->个粉丝）</span> </div>
				<ul class="user_list" id="feed_list">
				<!--{foreach from=$attentions item=attention key=index}--> 
					<li>
						<div class="user_info clearfix"><!--{if $show_delete}--><a onclick="App.followcancel('<!--{$attention.uid}-->',this,1,'<!--{$attention.nick}-->','她');return false;" href="javascript:void(0);" class="btn_1">移除</a><!--{/if}--><a href="/home/profile/<!--{$attention.uid}-->" class="user_img"><img src="<!--{$attention.portrait}-->" uid="<!--{$attention.uid}-->" namecard="true"></a> <a href="/home/profile/<!--{$attention.uid}-->" uid="<!--{$attention.uid}-->" namecard="true"><!--{$attention.nick}--></a>
							<p><!--{$attention.location}-->&nbsp;&nbsp;&nbsp;添加时间: <!--{$attention.datetime|date_format:"%Y-%m-%d %H:%I"}--></p>
						</div>
					</li>
				<!--{foreachelse}-->
                    	<li>
                    		<div class="user_info clearfix">唉,还没有人关注你？赶紧邀请亲朋好友来支持啊~ </div>
                    	</li>
				<!--{/foreach}-->
				</ul>
				<div class="page"> <span class="fr"><!--{pagination total=$count|default:0}--></span> <a href="#" class="top">返回顶部</a> </div>
			</div>
<!--{include file="right_setting.php"}-->
		</div>
		<div class="main_b"></div>
	</div>
<!--{include file="footer_setting.php"}-->
