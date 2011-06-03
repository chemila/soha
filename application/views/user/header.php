<div class="user_head">
    <div class="picborder_r fl">
        <a namecard="true" href="home/profile/<!--{$user.uid}-->" uid="<!--{$user.uid}-->"><img title="<!--{$user.nick}-->" src="<!--{$user.portrait|fix_portrait}-->"/></a>
    </div>
    <div class="fl">
        <p class="f14">
            <a namecard="true" href="home/profile/<!--{$user.uid}-->" uid="<!--{$user.uid}-->" class="black"><!--{$user.nick}--></a>
        </p>
        <div>
            <img class="ico_ZStatus online_ZStatus" title="在线" alt="在线" src="media/img/common/transparent.gif"><em >在线</em>
        </div>
        <p>
            <em><!--{$user.location|default:''}--></em>
        </p>
    </div>
</div>
