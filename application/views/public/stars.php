<!-- pagination for stars --> 
<div class="pages">
    <a href="#" class="prev">上一页</a><span class="current">[<a href="#">1</a>]</span><a href="#">2</a><a href="#">3</a><a href="#">4</a><a href="#">5</a><a href="#" class="next">下一页</a>
</div>
<ul id="scroll_star_list" class="jcarousel-skin-tango">
    <!--{foreach from=$stars item=star}--> 
    <li>
        <div class="star_info">
            <div><a href="/user/<!--{$star.uid}-->"><img src="<!--{$star.portrait}-->/50"></a> <a href="/user/<!--{$star.uid}-->"><!--{$star.nick}--></a><br>
                粉丝：
                <!--{$star.followers_count}--></div>
            <p><a href="#" class="btn3">已关注</a><a href="#"class="btn2">送礼品</a></p>
        </div>

    </li>
    <!--{/foreach}--> 
</ul>
