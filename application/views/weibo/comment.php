<div popcontainer="true" class="MIB_assign rt">
    <div class="MIB_asarrow_r"></div>
    <div class="MIB_assign_t"></div>
    <div class="MIB_assign_c MIB_txtbl">
        <div class="logininput new_position">
            <!--show face list-->
            <a onclick="App.showFaces(this,$E('_comment_content_miniblog2_<!--{$weibo.id}-->'),-30,5);return false;" class="faceicon1" href="####" title="表情"></a>
            <!--add comment content here-->
            <textarea class="lf" style="overflow: hidden; height: 18px; font-family: Tahoma,宋体; border-style: solid; border-width: 1px; word-wrap: break-word; font-size: 12px; line-height: 18px;" id="_comment_content_miniblog2_<!--{$weibo.id}-->"></textarea>
            <!--reply to--> 
            <a href="javascript:void(0);" id="_comment_post_miniblog2_<!--{$weibo.id}-->" class="btn_normal"><em>评论</em></a>
            <!--choose to forward or comment at the same time--> 
            <div class="margin_b MIB_txtbl ml35">
                <p>
                    <input type="checkbox" id="agree_<!--{$weibo.id}-->">
                    <label for="agree_<!--{$weibo.id}-->">同时转发到我的微博</label>
                </p>
                <!--{if $comments_to|default:false}--> 
                <p>
                    <input type="checkbox" id="isroot_<!--{$weibo.id}-->">
                    <label for="isroot_<!--{$weibo.id}-->">同时评论给原文作者 <!--{$comments_to}--></label>
                </p>
                <!--{/if}--> 
            </div>
        </div>
        <ul class="PL_list oddline">
            <!--list all comments below--> 
            <!--{foreach from=$comments item=comment}--> 
            <li onmouseout="App.hideExtendBtn(this);return false" onmouseover="App.showExtendBtn(this);return false" cacheid="8" class="MIB_linedot3"> <a href="/home/profile/<!--{$comment.uid}-->"><img src="<!--{$comment.user.portrait}-->" title="<!--{$comment.user.nick}-->" class="picborder_l lf" uid="<!--{$comment.uid}-->" namecard="true"></a>
                <!--delete comment if self--> 
                <div onclick="scope.deleteCommentByRid('1779849751', '1069205631', '221110415327173016', '202110415342216996', 'miniblog2', 1, 1)" title="删除" style="visibility: hidden; " class="icon_closel rt">x</div>
                <!--comment content-->
                <div class="txt">
                    <!--comment author info--> 
                    <div class="txtinfo"> <a href="/home/profile/<!--{$comment.uid}-->" uid="<!--{$comment.uid}-->" namecard="true"><!--{$comment.user.nick}--></a><!--{$comment.content}--><span class="MIB_txtbl">(<!--{$comment.created_at|date_format:"%Y-%m-%d %H:%M:%S"}-->)</span> 
                    </div>
                    <!--actions: delete reply etc.-->
                    <p class="MIB_more MIB_linkbl"> <a class="lose" onclick="scope.replyByCid(&quot;1779849751&quot;, &quot;1069205631&quot;, &quot;221110415327173016&quot;, &quot;202110415342216996&quot;, &quot;自己也该学着成熟了&quot;, &quot;Array&quot;, &quot;miniblog2&quot;, 1, 1);" href="javascript:;">回复</a> </p>
                </div>
                <span class="clear"></span> 
            </li>
            <!--{/foreach}--> 
        </ul>
        <!--list more comments if available--> 
        <!--{if $count_more > 0}--> 
        <div class="list_head MIB_linedot3 moreheight"> 
            后面还有<span><!--{$count_more}--></span>条评论，
            <a href="/weibo/show/<!--{$weibo.id}-->">点击查看<em>&gt;&gt;</em> </a> 
        </div>
        <!--{/if}--> 
    </div>
    <div class="MIB_assign_b"></div>
</div>
