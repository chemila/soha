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
            <!--{if $count > 0}-->  
            <!--{foreach from=$comments item=comment}--> 
               <!--{include file='weibo/comment_reply.php' comment=$comment weibo=$weibo}-->  
            <!--{/foreach}--> 
            <!--{/if}--> 
        </ul>
        <!--list more comments if available--> 
        <!--{if $count > 10}--> 
        <div class="list_head MIB_linedot3 moreheight"> 
            后面还有<span><!--{$count - 10}--></span>条评论，
            <a href="/weibo/show/<!--{$weibo.id}-->">点击查看<em>&gt;&gt;</em> </a> 
        </div>
        <!--{/if}--> 
    </div>
    <div class="MIB_assign_b"></div>
</div>
