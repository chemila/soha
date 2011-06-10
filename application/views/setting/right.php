<div class="sidebar">
	<div class="user_info clearfix"> 
        <a href="home/profile/<!--{$user.uid}-->" class="user_img"><img src="<!--{$user.portrait|fix_portrait}-->"></a> <a href="home/profile/<!--{$user.uid}-->"><!--{$user.nick}--></a>
		<p><!--{$user.location}--></p>
	</div>
    <!--{include file="user/count.php"}--> 
</div>
