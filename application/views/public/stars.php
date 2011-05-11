<ul id="scroll_star_list" class="jcarousel-skin-tango">
    <!--{foreach from=$stars item=star}--> 
    <li>
        <div class="star_info">
            <div class="head_pic"><a namecard="true" href="/home/profile/<!--{$star.uid}-->" uid="<!--{$star.uid}-->"><img src="<!--{$star.portrait}-->/50"></a> <a href="/home/profile/<!--{$star.uid}-->"><!--{$star.nick}--></a><br>
                粉丝：
                <!--{$star.followers_count}--></div>
                <!-- 
            <p><a class="btn3" onclick="App.followadd('<!--{$star.uid}-->',this,false,false,{'location':'searchhome','refer_sort':'search','refer_flag':'search_name'});return false;" href="javascript:void(0);"><span class="addnew">+</span>加关注</a><a onclick="App.followcancel('<!--{$star.uid}-->',this,'0','<!--{$star.nick}-->','他');return false;" href="javascript:void(0);" class="btn3">取消</a></p>
             -->
        </div>
    </li>
    <!--{/foreach}--> 
</ul>
