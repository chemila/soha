<!--{include file="header/setting.php"}-->

<script type="text/javascript">
<!--
function del(id)
{
	if(confirm("确定要删除吗?"))
	{
		document.location.href="friend/delete/"+id;
	}
}
//-->
</script>

<div class="main">
<!--{include file="setting/top.php"}-->
		<div class="main_c clearfix">
			<div class="content">
				<div class="title">
					<h2>我的粉丝</h2>
					<span>（已有<!--{$friends_count[0]}-->个粉丝）</span> </div>
				<ul class="home_list">
				<!--{foreach from=$friends item=friend key=index}--> 
					<li>
						<div class="home_info clearfix"><a  href="javascript:void(0)" onclick='del("<!--{$friend.uid}-->");' class="btn_1">删除</a> <a href="home/<!--{$friend.uid}-->" class="home_img"><img src="<!--{$friend.portrait}-->"></a> <a href="home/<!--{$friend.uid}-->"><!--{$friend.nick}--></a>
							<p><!--{$friend.location}-->&nbsp;&nbsp;&nbsp;添加时间: <!--{$friend.datetime|date_format:"%Y-%m-%d %H:%I"}--></p>
						</div>
					</li>
				<!--{foreachelse}-->
                    	<li>
                    		<div class="home_info clearfix">您还没有关注人!</div>
                    	</li>
				<!--{/foreach}-->
				</ul>
				<div class="page"> <span class="fr"><a href="#">上一页</a> 1 <a href="#">2</a> <a href="#">3</a> <a href="#">下一页</a></span> <a href="#" class="top">返回顶部</a> </div>
			</div>
<!--{include file="setting/right.php"}-->
		</div>
		<div class="main_b"></div>
	</div>
<!--{include file="footer/setting.php"}-->
