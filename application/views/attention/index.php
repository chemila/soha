<!--{include file="header_setting.php"}-->
<script type="text/javascript">
<!--
function del(id)
{
	if(confirm("确定要取消吗?"))
	{
		document.location.href="/attention/delete/"+id;
	}
}
//-->
</script>
<div class="main">
		<!--{include file="menu_top_setting.php"}-->
		<div class="main_c clearfix">
			<div class="content">
				<div class="title">
					<h2>我的关注</h2>
					<span>（已有<!--{$attention_count[0]}-->个关注人）</span> </div>
				<ul class="user_list">
				<!--{foreach from=$attentions item=attention key=index}--> 
					<li>
						<div class="user_info clearfix"><a href="javascript:void(0)" onclick='del("<!--{$attention.uid}-->");' class="btn_1">取消</a> <a href="/user/<!--{$attention.uid}-->" class="user_img"><img src="<!--{$attention.portrait}-->"></a> <a href="/user/<!--{$attention.uid}-->"><!--{$attention.nick}--></a>
							<p><!--{$attention.location}-->&nbsp;&nbsp;&nbsp;关注时间: <!--{$attention.datetime|date_format:"%Y-%m-%d %H:%I"}--></p>
						</div>
					</li>
				<!--{foreachelse}-->
                    	<li>
                    		<div class="user_info clearfix">您还没有关注人!</div>
                    	</li>
				<!--{/foreach}-->
				</ul>
				<div class="page"> <span class="fr"><a href="#">上一页</a> 1 <a href="#">2</a> <a href="#">3</a> <a href="#">下一页</a></span> <a href="#" class="top">返回顶部</a> </div>
			</div>
<!--{include file="right_setting.php"}-->
		</div>
		<div class="main_b"></div>
	</div>
<!--{include file="footer_setting.php"}-->