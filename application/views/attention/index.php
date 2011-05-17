<!--{include file="header_setting.php"}-->
<div class="main">
		<!--{include file="menu_top_setting.php"}-->
		<div class="main_c clearfix">
			<div class="content">
				<div class="title">
					<h2>我的关注</h2>
					<span>（已有<!--{$count}-->个关注人）</span> </div>
				<ul class="user_list" id="feed_list">
				<!--{foreach from=$attentions item=attention key=index}--> 
					<li id="<!--{$attention.uid}-->" class="MIB_linedot_l">
						<div class="user_info clearfix"><!--{if $show_delete|default:0}--><a onclick="App.followcancel('<!--{$attention.uid}-->',this,'0','<!--{$attention.nick}-->','他');return false;" href="javascript:void(0);"  class="btn_1"><em>取消</em></a><!--{/if}--><div style="float:left;margin-right:10px;display:inline;"><a href="/home/profile/<!--{$attention.uid}-->"><img src="<!--{$attention.portrait|fix_portrait}-->"  uid="<!--{$attention.uid}-->" namecard="true"></a></div> <div style="float:left;"><a href="/home/profile/<!--{$attention.uid}-->" uid="<!--{$attention.uid}-->" namecard="true"><!--{$attention.nick}--></a>
							<p><!--{$attention.location}-->&nbsp;&nbsp;&nbsp;关注时间: <!--{$attention.datetime|date_format:"%Y-%m-%d %H:%I"}--></p>
							<div style="clear:both;height:0;overflow:hidden;"></div>
							</div>
						</div>
					</li>
				<!--{foreachelse}-->
                    	<li>
                    		<div class="user_info clearfix">您还没有关注人!</div>
                    	</li>
				<!--{/foreach}-->
				</ul>
				<div class="page"> <span class="fr"><!--{pagination total=$count|default:0}--></span></span> <a href="#" class="top">返回顶部</a> </div>
			</div>
<!--{include file="right_setting.php"}-->
		</div>
		<div class="main_b"></div>
	</div>
<!--{include file="footer_setting.php"}-->
