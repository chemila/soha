<!--{include file="header_setting.php"}-->

<link href="http://img.t.sinajs.cn/t35/style/css/privateMsg/privatemsg.css" type="text/css" rel="stylesheet" />
	<div class="main">
<!--{include file="menu_top_setting.php"}-->
		<div class="main_c clearfix">
			<div class="content">
				<div class="title"> <a href="javascript:void(0);" onclick="App.msgDialog('',true)" id="msg_publisher_submit" class="send_mail">发私信</a>
					<h2>我的私信</h2>
					<span>（已有<!--{$messages_count.revcount}-->条私信）</span> </div>
				<ul class="mail_list" id="feed_list">
				<!--{foreach from=$messages item=message key=index}--> 
					<li>
						<div class="user_info clearfix"><a href="/home/profile/<!--{$message.uid}-->" class="user_img"><img src="<!--{$message.portrait}-->" uid="<!--{$message.uid}-->" namecard="true"></a> <a href="/home/profile/<!--{$message.uid}-->" uid="<!--{$message.uid}-->" namecard="true"><!--{$message.nick}-->：</a><!--{$message.content|parse_content}-->
							<p class="tr">发信时间: <!--{$message.datetime|date_format:"%Y-%m-%d %H:%I"}-->&nbsp;&nbsp;&nbsp;<a class="close" onclick="App.delMsgGroup('<!--{$message.msg_id}-->','<!--{$message.nick}-->')" href="javascript:void(0);">删除</a> | <a onclick="if(parseInt(Math.random()*10000)%1000 &lt; 10){GB_SUDA._S_uaTrack('tblog_userprofile_layer','msgDialog')};App.msgDialog('<!--{$message.nick}-->',false);" href="javascript:void(0)">回复</a></p>
						</div>
					</li>
				<!--{foreachelse}-->
                    	<li>
                    		<div class="user_info clearfix">您还没有私信!</div>
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