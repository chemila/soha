<!--{if $index % 2 == 0}--> 
<li class="clearfix">
    <div class="user">
        <a href="#"><img src="/media/img/img.png"></a>
        <a href="#" class="city_chat">同城聊天</a>
    </div>
    <div class="info_left">
        <div class="info_t"></div>
        <div class="info_c"> 
            <span></span>
            <p><!--{$weibo.content}--></p>
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
            <p><!--{$weibo.content}--></p>
        </div>
        <div class="info_b"></div>
    </div>
    <div class="user">
        <a href="#"><img src="/media/img/img.png"></a>
        <a href="#" class="city_chat">同城聊天</a>
    </div>
</li>
<!--{/if}--> 
