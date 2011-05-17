<li onmouseout="App.hideExtendBtn(this);return false" onmouseover="App.showExtendBtn(this);return false" cacheid="8" class="MIB_linedot3"> <a href="/home/profile/<!--{$comment.uid}-->"><img src="<!--{$comment.user.portrait|fix_portrait}-->" title="<!--{$comment.user.nick}-->" class="picborder_l lf" uid="<!--{$comment.uid}-->" namecard="true"></a>
    <!--delete comment if self-->
    <!--{if $current_user|default:false and $current_user == $comment.uid}--> 
    <div onclick="scope.deleteCommentByRid(<!--{$comment.id}-->, <!--{$comment.uid}-->, <!--{$comment.wid}-->, <!--{$comment.id}-->, 'miniblog2', 1, 1)" title="删除" style="visibility: hidden; " class="icon_closel rt">x</div>
    <!--{/if}-->
    <!--comment content-->
    <div class="txt">
        <!--comment author info--> 
        <div class="txtinfo"> <a href="/home/profile/<!--{$comment.uid}-->" uid="<!--{$comment.uid}-->" namecard="true"><!--{$comment.user.nick}--></a>:<!--{$comment.content}--><span class="MIB_txtbl">(<!--{$comment.created_at|date_format:"%Y-%m-%d %H:%M:%S"}-->)</span> 
        </div>
        <!--actions: delete reply etc.-->
        <p class="MIB_more MIB_linkbl"> <a class="lose" onclick="scope.replyByCid(<!--{$comment.uid}-->, <!--{$weibo.uid}-->, <!--{$comment.wid}-->, <!--{$comment.id}-->, '<!--{$comment.user.nick}-->', '<!--{$comment.content}-->', 'miniblog2', 1, 1);" href="javascript:;">回复</a> </p>
    </div>
    <span class="clear"></span> 
</li>