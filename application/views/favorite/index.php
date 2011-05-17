<!--{include file="header_setting.php"}-->

<link href="http://img.t.sinajs.cn/t35/style/css/privateMsg/privatemsg.css" type="text/css" rel="stylesheet" />
	<div class="main">
<!--{include file="menu_top_setting.php"}-->
		<div class="main_c clearfix">
			<div class="content" id="feed_title">
			<!-- 
				<div class="favorites">
					<ul class="subtab">
						<li class="current"><a href="#">拼房</a></li>
					</ul>
					
					<ul class="subtab_con">
						<li>排序方式：</li>
						<li>
							<div class="sort">
								<div><a href="#" class="up">关注时间</a></div>
							</div>
						</li>
						<li>
							<div class="sort">
								<div><a href="#" class="up_on">最新更新</a></div>
							</div>
						</li>
						<li>
							<div class="sort">
								<div><a href="#" class="down">昵称是首字母</a></div>
							</div>
						</li>
						<li>
							<div class="sort">
								<div><a href="#" class="down_on">昵称是首字母</a></div>
							</div>
						</li>
					</ul>
					 
				</div>
				-->
				<ul class="mail_list" id="feed_list">
                    <!--{foreach from=$list_my_favorites item=list_my_favorite key=index}--> 
					<li>
						<div class="user_info clearfix"><a href="/home/profile/<!--{$list_my_favorite.uid}-->" class="user_img"><img src="<!--{get_user uid=$list_my_favorite.uid attr='portrait|fix_portrait'}-->" uid="<!--{$list_my_favorite.uid}-->" namecard="true"></a> <a href="/home/profile/<!--{$list_my_favorite.uid}-->" uid="<!--{$list_my_favorite.uid}-->" namecard="true"><!--{$list_my_favorite.uid}-->：</a><!--{$list_my_favorite.content}-->
							<p class="claerfix">发布时间: <!--{$list_my_favorite.created_at|date_format:"%Y-%m-%d %H:%I"}-->&nbsp;&nbsp;&nbsp;<a onclick="App.deletefavorite_miniblog('<!--{$list_my_favorite.favorite_id}-->');" href="javascript:void(0);">取消<strong lang="CL1003">收藏</strong></a></p>
						</div>
					</li>
					<!--{foreachelse}-->
					<li>
						无收藏信息
					</li>
					<!--{/foreach}-->
				</ul>
				<div class="page"> <span class="fr"><!--{pagination total=$count|default:0}--></span> <a href="#" class="top">返回顶部</a> </div>
			</div>
<!--{include file="right_setting.php"}-->
		</div>
		<div class="main_b"></div>
	</div>
	
	<!--弹出框-->
	<span id="msgid" style="display:none">
	<div style="position: absolute; visibility: visible; z-index: 1000; left: 409px; top: 216.5px;"><form action="/message/add" method="post" onsubmit="return checkform();"><table class="mBlogLayer"><tbody><tr><td class="top_l"></td><td class="top_c"></td><td class="top_r"></td></tr><tr><td class="mid_l"></td><td class="mid_c"><div class="layerBox"><div class="layerBoxTop"><div class="topCon"><strong>发私信</strong><a title="关闭" class="close" href="javascript:msgclose();"></a><div class="clear"></div></div></div><div class="layerBoxCon" style="width: 430px; height: auto;"><table class="noteTab2"><tbody>	<tr>	<th>发私信给：&nbsp;</th><td><input type="text" name="fuid" value="" class="PY_input" id="nickID" style="color: rgb(153, 153, 153);" readonly="ye">&nbsp;&nbsp;</td></tr>	<tr class="tPadding"><th>私信内容：&nbsp;</th><td><textarea name="content" class="PY_input" id="contentID" style="overflow: hidden;"></textarea></td>	</tr>	 <tr class="tPadding1"><th></th><td><a title="表情" href="javascript:void(0);" id="insert_face_icon" class="faceicon1"></a></td></tr>	<tr><th></th><td><input type="submit" value="发送">		<span class="errorTs2 error_color" style="display: none;" id="popUpError">密码错误</span></td></tr>	<tr><td></td><td><p class="inviteLayer_tip gray9">说明：长度不能超过300字</p></td></tr> 	</tbody></table></div></div></td><td class="mid_r"></td></tr>			    	<tr><td class="bottom_l"></td><td class="bottom_c"></td><td class="bottom_r"></td></tr></tbody></table></form></div>
	</span>
	<!--弹出框-->
	
<!--{include file="footer_setting.php"}-->
