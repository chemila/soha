<!--{if $index % 2 == 0}--> 
<li class="clearfix">
    <div class="user">
        <a href="/home/profile/<!--{$weibo.uid}-->"><img src="<!--{$weibo.user.portrait|fix_portrait}-->" uid="<!--{$weibo.uid}-->" namecard="true"></a>
        <!--<a href="#" class="city_chat">同城聊天</a>-->
    </div>
    <div class="info_left">
        <div class="info_t"></div>
        <div class="info_c"> 
            <span></span>
            <p><!--{$weibo.content|parse_content}--></p>
        </div>
        <div class="info_b"></div>
    </div>
</li>
<!--{else}--> 
<li class="clearfix">
    <div class="info_right">
        <div class="info_t"></div>
        <div class="info_c"> 
            <span></span>
            <p><!--{$weibo.content|parse_content}--></p>
        </div>
        <div class="info_b"></div>
    </div>
    <div class="user">
        <a href="/home/profile/<!--{$weibo.uid}-->"><img src="<!--{$weibo.user.portrait|fix_portrait}-->" uid="<!--{$weibo.uid}-->" namecard="true"></a>
        <!--<a href="#" class="city_chat">同城聊天</a>-->
    </div>
</li>
<!--{/if}--> 
