<ul class="commentsList" id="feed_list">
<!--{foreach from=$comments item=comment}--> 
<li onmouseout="App.hideExtendBtn(this);return false" onmouseover="App.showExtendBtn(this);return false" class="commentsCell MIB_linedot_l" id="<!--{$comment.id}-->">
    <div class="commentsTxt">
        <a href="/home/profile/<!--{$comment.weibo.user.uid}-->"><img src="<!--{$comment.weibo.user.portrait}-->" uid="<!--{$comment.weibo.user.uid}-->" namecard="true" class="picborder_l"></a>
        <div class="commentsContants">
            <p class="commentsParm MIB_txtal"><a href="/home/profile/<!--{$comment.weibo.user.uid}-->" uid="<!--{$comment.weibo.user.uid}-->" namecard="true"><!--{$comment.weibo.user.nick}--></a><!--{$comment.content|parse_content:false}-->
            <!--{$comment.created_at|date_format:"%Y-%m-%d %H:%I"}-->
            </p>
            <div class="commentOption">
            	<span class="from"><label class="MIB_txtbl">评论的微博：</label>“<a href="/weibo/<!--{$comment.wid}-->" target="_blank"> <!--{$comment.weibo.content|parse_content}--></a>”</span>
            </div>
            <!-- 评论回复框开始 -->
         </div>
    </div>
    <!-- 评论回复框结束 -->
<div class="clearit"></div>
</li>
<!--{/foreach}--> 
</ul>
