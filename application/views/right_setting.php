<div class="sidebar">
	<div class="user_info clearfix"> <a href="/home/profile/<!--{$user_info.uid}-->" class="user_img"><img src="<!--{$user_info.portrait|fix_portrait}-->"></a> <a href="/home/profile/<!--{$user_info.uid}-->"><!--{$user_info.nick}--></a>
		<p><!--{$user_info.location}--></p>
	</div>
	<ul class="num clearfix">
		<li><strong><a href="/attention"><!--{$user_info.friends_count}--></a></strong>
			<p><a href="/attention">关注</a></p>
		</li>
		<li><strong><a href="/attention/fans"><!--{$user_info.followers_count}--></a></strong>
			<p><a href="/attention/fans">粉丝</a></p>
		</li>
		<li class="last"><strong><a href="/home/profile/<!--{$user_info.uid}-->"><!--{$user_info.statuses_count}--></a></strong>
			<p><a href="/home/profile/<!--{$user_info.uid}-->">微博</a></p>
		</li>
	</ul>
</div>
