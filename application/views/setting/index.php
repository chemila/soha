<!--{include file="header_setting.php"}-->

<script type="text/javascript">
<!--
function check_confirm()
{
	if(confirm("确定要提交吗?"))
	{
		return true;
	}

	return false;
}
//-->
</script>
	<div class="main">
<!--{include file="menu_top_setting.php"}-->
		
		<form action="/setting/<!--{$action}-->" method="post" onsubmit="return check_confirm();">
		<div class="main_c clearfix">
			<div class="content settings_con"> 
				<!--设置 start-->
				<dl>
					<dt><span class="fb f14">评论</span> <span class="gray">设置谁可以评论我的微博</span></dt>
					<dd>
						<label>
							<input <!--{if $datas && $datas.comment_set eq "1"}--> checked <!--{/if}--> name="comment_set" type="radio" value="1" class="vm">
							所有人</label>
						（不包括你的黑名单用户）</dd>
					<dd>
						<label>
							<input <!--{if $datas && $datas.comment_set eq "2"}--> checked <!--{/if}--> name="comment_set" type="radio" value="2" class="vm">
							我关注的人</label>
					</dd>
				</dl>
				<dl>
					<dt><span class="fb f14">私信</span> 设置谁可以给我发私信/引推关注</dt>
					<dd>
						<label>
							<input <!--{if $datas && $datas.message_set eq "1"}--> checked <!--{/if}--> name="message_set" type="radio" value="1" class="vm">
							所有人</label>
						（不包括你的黑名单用户）</dd>
					<dd>
						<label>
							<input <!--{if $datas && $datas.message_set eq "2"}--> checked <!--{/if}--> name="message_set" type="radio" value="2" class="vm">
							我关注的人</label>
					</dd>
				</dl>
				<!-- 
				<dl>
					<dt><span class="fb f14">地理位置信息</span> <a href="#">【这是什么？】</a></dt>
					<dd>发布微博时，是否允许微博保存并显示你所处的地理位置信息，包括所有的第三方工具、客户端。<br>
						过去已保存的历史微博</dd>
					<dd>
						<label>
							<input <!--{if $datas && $datas.location_set eq "1"}--> checked <!--{/if}--> name="location_set" type="radio" value="1" class="vm">
							允许</label>
					</dd>
					<dd>
						<label>
							<input <!--{if $datas && $datas.location_set eq "2"}--> checked <!--{/if}--> name="location_set" type="radio" value="2" class="vm">
							不允许</label>
					</dd>
					<dd>你可以<a href="#">删除过去所有微博中保存的地理位置信息</a>，删除后不可回复。</dd>
				</dl>
				
				<dl>
					<dt><span class="fb f14">搜索</span> 允许别人通过一下信息搜索到我</dt>
					<dd>
						<label>
							<input <!--{if $datas && $datas.search_name_set eq "1"}--> checked <!--{/if}--> name="search_name" type="checkbox" value="1" class="vm">
							真实姓名</label>
					</dd>
					<dd>
						<label>
							<input <!--{if $datas && $datas.search_mobile_set eq "1"}--> checked <!--{/if}--> name="search_mobile" type="checkbox" value="1" class="vm">
							手机号码</label>
					</dd>
				</dl>
				 -->
				<div class="btn tc">
					<input name="" type="submit" value="">
				</div>
				
				<!--设置 end--> 
			</div>
			</form>
<!--{include file="right_setting.php"}-->
		</div>
		<div class="main_b"></div>
	</div>
<!--{include file="footer_setting.php"}-->