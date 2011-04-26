<!--{include file="header_setting.php"}-->

<script type="text/javascript">
<!--
function del(msg_id)
{
	if(confirm("确定要删除此私信吗?"))
	{
		document.location.href="/message/delete/"+msg_id;
	}
}
function msgopen(fuid,nick)
{
	$("#nickID").val(nick);
	$('#fuidID').append("<input name='fuid' value="+fuid+" type='hidden'/>");
			
	$("#msgid").show();
}
function msgclose()
{
	$("#contentID").val("");
	$("#msgid").hide();
}
function checkform()
{
	if($("#nickID").val() == "" || $("#contentID").val() == "")
	{
		alert("请输入收件人和私信内容！");
		return false;
	}
}
//-->
</script>
<link href="http://img.t.sinajs.cn/t35/style/css/privateMsg/privatemsg.css" type="text/css" rel="stylesheet" />
	<div class="main">
<!--{include file="menu_top_setting.php"}-->
		<div class="main_c clearfix">
			<div class="content">
				<div class="title"> <a href="#" onclick="msgopen();" class="send_mail">发私信</a>
					<h2>我的私信</h2>
					<span>（已有<!--{$messages_count.revcount}-->条私信）</span> </div>
				<ul class="mail_list">
				<!--{foreach from=$messages item=message key=index}--> 
					<li>
						<div class="user_info clearfix"><a href="/user/<!--{$message.uid}-->" class="user_img"><img src="<!--{$message.portrait}-->"><span class="new"></span></a> <a href="/user/<!--{$message.uid}-->">@<!--{$message.nick}-->：</a><!--{$message.content}-->
							<p class="tr">发信时间: <!--{$message.datetime|date_format:"%Y-%m-%d %H:%I"}-->&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);" onclick='del("<!--{$message.msg_id}-->");'>删除</a> | <a href="javascript:void(0);" onclick="msgopen(<!--{$message.uid}-->,'<!--{$message.nick}-->');">回复</a></p>
						</div>
					</li>
				<!--{foreachelse}-->
                    	<li>
                    		<div class="user_info clearfix">您还没有私信!</div>
                    	</li>
				<!--{/foreach}-->
				</ul>
				<div class="page"> <span class="fr"><a href="#">上一页</a> 1 <a href="#">2</a> <a href="#">3</a> <a href="#">下一页</a></span> <a href="#" class="top">返回顶部</a> </div>
			</div>
<!--{include file="right_setting.php"}-->
		</div>
		<div class="main_b"></div>
	</div>
	
	<!--弹出框-->
	<span id="msgid" style="display:none">
	<div style="position: absolute; visibility: visible; z-index: 1000; left: 409px; top: 216.5px;"><form action="/message/add" method="post" onsubmit="return checkform();"><span id="fuidID"></span><table class="mBlogLayer"><tbody><tr><td class="top_l"></td><td class="top_c"></td><td class="top_r"></td></tr><tr><td class="mid_l"></td><td class="mid_c"><div class="layerBox"><div class="layerBoxTop"><div class="topCon"><strong>发私信</strong><a title="关闭" class="close" href="#" onclick="msgclose();"></a><div class="clear"></div></div></div><div class="layerBoxCon" style="width: 430px; height: auto;"><table class="noteTab2"><tbody>	<tr>	<th>发私信给：&nbsp;</th><td><input type="text" name="nick" value="" class="PY_input" id="nickID" style="color: rgb(153, 153, 153);">&nbsp;&nbsp;</td></tr>	<tr class="tPadding"><th>私信内容：&nbsp;</th><td><textarea name="content" class="PY_input" id="contentID" style="overflow: hidden;"></textarea></td>	</tr>	 <tr class="tPadding1"><th></th><td><a title="表情" href="javascript:void(0);" id="insert_face_icon" class="faceicon1"></a></td></tr>	<tr><th></th><td><input type="submit" value="发送">		<span class="errorTs2 error_color" style="display: none;" id="popUpError">密码错误</span></td></tr>	<tr><td></td><td><p class="inviteLayer_tip gray9">说明：长度不能超过300字</p></td></tr> 	</tbody></table></div></div></td><td class="mid_r"></td></tr>			    	<tr><td class="bottom_l"></td><td class="bottom_c"></td><td class="bottom_r"></td></tr></tbody></table></form></div>
	</span>
	<!--弹出框-->

<!--{include file="footer_setting.php"}-->