<div class="sidebar">
	<div class="user_info clearfix"> <a href="/home/profile/<!--{$user_info.uid}-->" class="user_img"><img src="<!--{$user_info.portrait}-->"></a> <a href="/home/profile/<!--{$user_info.uid}-->"><!--{$user_info.nick}--></a>
		<p><!--{$user_info.location}--></p>
	</div>
	<ul class="num clearfix">
		<li><strong><a href="/attention"><!--{$user_info.friends_count}--></a></strong>
			<p>关注</p>
		</li>
		<li><strong><a href="/attention/fans"><!--{$user_info.followers_count}--></a></strong>
			<p>粉丝</p>
		</li>
		<li class="last"><strong><a href="/home/profile/<!--{$user_info.uid}-->"><!--{$user_info.statuses_count}--></a></strong>
			<p>微博</p>
		</li>
	</ul>
</div>