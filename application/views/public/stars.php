<div class="blk_29">
	<div class="LeftBotton" id="turn_left_recom"></div> 
     <div class="Cont" id="ISL_Cont_1">
        <div class="ScrCont">
            <ul id="scroll_star_list">
                <!--{foreach from=$stars item=chunk}-->
                <li>
                    <!--{foreach from=$chunk item=star}-->
                    <div class="star_info">
                        <div class="head_pic">
                            <a namecard="true" href="/home/profile/<!--{$star.uid}-->" uid="<!--{$star.uid}-->"><img src="<!--{$star.portrait|fix_portrait}-->"></a>
                            <a namecard="true" uid="<!--{$star.uid}-->" href="/home/profile/<!--{$star.uid}-->" title="<!--{$star.nick}-->"><!--{$star.nick}--></a><br>粉丝：<!--{$star.followers_count}-->
                        </div>
                    </div>
                    <!--{/foreach}-->
                </li>
                <!--{foreachelse}-->
                	没有你要查找的信息!
                <!--{/foreach}-->
            </ul>
            <div id="List2_1"></div>
        </div>
    </div>
    <div class="RightBotton" id="turn_right_recom"></div>
</div>