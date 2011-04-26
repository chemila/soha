<!--{include file="header_setting.php"}-->

<script type="text/javascript">
<!--
function del(id)
{
	if(confirm("确认将此用户从你的黑名单中解除吗？?"))
	{
		document.location.href="/block/delete/"+id;
	}
}
//-->
</script>

<div class="main">
<!--{include file="menu_top_setting.php"}-->
		<div class="main_c clearfix">
			<div class="content">
				<div class="title">
					<h2 style=" background:none;">我的黑名单</h2>
					<span>（已有<!--{$block_count}-->个拉黑人）</span> </div>
				<span class="g_a">  <span class="g_b">  <span class="g_c">&nbsp;</span>  <span class="g_d">被加入黑名单的用户将无法关注你、评论你。如果你已经关注他，也会自动解除关系。</span>  </span> </span> 
				<ul class="user_list">
				<!--{foreach from=$blocks item=block key=index}--> 
					<li>
						<div class="user_info clearfix">
						<div class="cancel">
							<a href="#" onclick="del(<!--{$block.uid}-->);" class="x_a">  <span class="x_b">  <span class="x_c">解除</span>  </span> </a> 
							<p><!--{$block.datetime|date_format:"%Y-%m-%d %H:%I"}--></p>
						</div>
						<a href="/user/<!--{$block.uid}-->" class="user_img"><img src="<!--{$block.portrait}-->" style="width: 50px; height: 50px;"></a> <a href="/user/<!--{$block.uid}-->"><!--{$block.nick}--></a>
							<p><!--{$block.location}--></p>
						</div>
					</li>
				<!--{foreachelse}-->
					<li>
						还没有人被你拉入黑名单呢。
					</li>
				<!--{/foreach}-->
				</ul>
				<div class="page"> <span class="fr"><a href="#">上一页</a> 1 <a href="#">2</a> <a href="#">3</a> <a href="#">下一页</a></span> <a href="#" class="top">返回顶部</a> </div>
			</div>
<!--{include file="right_setting.php"}-->
		</div>
		<div class="main_b"></div>
<!--{include file="footer_setting.php"}-->
