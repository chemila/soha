<div class="user_head">
    <div class="picborder_r fl">
        <a href="/home/profile/<!--{$user.uid}-->"><img title="<!--{$user.nick}-->" src="<!--{$user.portrait}-->"></a>
    </div>
    <div class="fl">
        <p class="f14">
            <a href="/home/profile/<!--{$user.uid}-->" class="black"><!--{$user.nick}--></a>
        </p>
        <div>
            <img class="ico_ZStatus online_ZStatus" title="在线" alt="在线" src="http://img.t.sinajs.cn/miniblog2style/images/common/transparent.gif"><em >在线</em>
        </div>
        <p>
            <em><!--{$user.location|default:''}--></em>
        </p>
    </div>
</div>
<ul class="num clearfix">
    <li><strong><!--{$user.friends_count}--></strong>
        <p>关注</p>
    </li>
    <li><strong><!--{$user.followers_count}--></strong>
        <p>粉丝</p>
    </li>
    <li class="last"><strong><!--{$user.statuses_count}--></strong>
        <p>微博</p>
    </li>
</ul>