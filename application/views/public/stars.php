<!--{foreach from=$stars item=chunk}-->
<li>
    <!--{foreach from=$chunk item=star}-->
    <div class="star_info">
        <div class="head_pic">
            <a namecard="true" href="home/profile/<!--{$star.uid}-->" uid="<!--{$star.uid}-->"><img src="<!--{$star.portrait|fix_portrait}-->"></a>
            <span class="text_name_cut"><a namecard="true" uid="<!--{$star.uid}-->" href="home/profile/<!--{$star.uid}-->" title="<!--{$star.nick}-->"><!--{$star.nick}--></a></span>粉丝：<br><!--{$star.followers_count}-->
        </div>
    </div>
    <!--{/foreach}-->
</li>
<!--{foreachelse}-->
    没有你要查找的信息!
<!--{/foreach}-->
