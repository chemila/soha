<!--weibo feed item-->
<li class="MIB_linedot_l" id="mid_<!--{$weibo.id}-->">
    <!--user head image, namecard attr bind loading namecard event--> 
    <div class="head_pic">
        <a namecard="true" uid="<!--{$weibo.uid}-->" href="home/profile/<!--{$weibo.uid}-->" >
            <img src="<!--{$weibo.user.portrait|fix_portrait}-->">
        </a> 
    </div>
    <div class="MIB_feed_c">
        <p class="sms" mid="<!--{$weibo.id}-->" type="1">
            <!--weibo author info: uid, domain_name, name, verified etc-->
            <a  namecard="true" uid="<!--{$weibo.uid}-->" href="home/profile/<!--{$weibo.uid}-->" title="<!--{$weibo.user.nick}-->"><!--{$weibo.user.nick}--></a>
            <!--{if $weibo.user.verified|default:false}-->  
            <img class="small_icon vip" dynamic-src="media/img/transparent.gif" title="新浪认证" alt=""/>
            <!--{/if}--> 
            </a>：<!--{$weibo.content|parse_content}-->
        </p>
        <div class="MIB_assign">
            <!--start forward weibo--> 
            <!--{if $weibo.rid}--> 
            <div class="MIB_asarrow_l"></div>
            <div class="MIB_assign_t"></div>
            <div class="MIB_assign_c MIB_txtbl">
                <p class="source" mid="<!--{$weibo.id}-->" type="2"> 
                    <a  namecard="true" uid="<!--{$weibo.root.uid}-->" href="home/profile/<!--{$weibo.root.uid}-->" title="<!--{$weibo.root.user.nick}-->">@<!--{$weibo.root.user.nick}-->
                    <!--{if $weibo.root.user.verified|default:false}-->
                        <img class="small_icon vip" dynamic-src="media/img/transparent.gif" title="新浪认证" alt=""/>
                    <!--{/if}--> 
                    </a>
                    ：<!--{$weibo.root.content|parse_content}-->
                    <span class="source_att MIB_linkbl">
                        <a href="weibo/show/<!--{$weibo.rid}-->"><strong lang="CL1005">原文转发</strong><strong rid="<!--{$weibo.rid}-->" type="rttCount">(<!--{$weibo.root.forward_count|default:0}-->)</strong></a>
                    <span class="MIB_line_l">|</span>
                        <a href="weibo/show/<!--{$weibo.rid}-->"><strong lang="CC0603">原文评论</strong><strong rid="<!--{$weibo.rid}-->" type="commtCount">(<!--{$weibo.root.comment_count|default:0}-->)</strong></a>
                    </span>
                </p>
                <!--weibo media data--> 
                <!--{if $weibo.root.type > 0 && $weibo.root.media_data}--> 
                <div class="feed_preview" id="prev_<!--{$weibo.id}-->">
                    <div class="feed_img">
                        <a onclick="App.scaleImg(this,'<!--{$weibo.root.media_data|to_weibo_media:'middle'}-->');" href="javascript:;"><img dynamic-src="<!--{$weibo.root.media_data|to_weibo_media:'small'}-->" class="imgicon" vimg="1"></a>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="MIB_assign" id="disp_<!--{$weibo.id}-->" style="display:none;"></div>
                <!--{/if}--> 
            </div>
            <div class="MIB_assign_b"></div>
            <!--{/if}--> 
        </div>
        <!--{if $weibo.media_data}-->
        <div class="feed_preview" id="prev_<!--{$weibo.id}-->">
            <div class="feed_img">
                <a onclick="App.scaleImg(this,'<!--{$weibo.media_data|to_weibo_media:'middle'}-->');" href="javascript:;"><img dynamic-src="<!--{$weibo.media_data|to_weibo_media:'small'}-->" class="imgicon" vimg="1"></a>
            </div>
            <div class="clear"></div>
        </div>
        <!--{/if}-->
        <div class="MIB_assign" id="disp_<!--{$weibo.id}-->" style="display:none;"></div>
        <div class="feed_att MIB_linkbl MIB_txtbl">
            <div class="lf">
                <cite>
                    <!--publish timeline counter--> 
                    <!-- <a href="<!--{$weibo.uid}-->/<!--{$weibo.id}-->"> --><strong><!--{$weibo.timeline|fuzzy_time}--></strong><!--</a> -->
                </cite> 
                <strong lang="CL1006">来自</strong>
                <!--weibo source field--> 
                <cite>
                    <a href="<!--{$weibo.source|default:0|message:'weibo.link'}-->" target="new"><!--{$weibo.source|default:0|message:'weibo.source'}--></a>
                </cite>
            </div>
            <!--start: forward, favorite, and comment goes here--> 
            <div class="rt">
                <!--{if $current_user|default:false and $current_user == $weibo.uid}--> 
                <a onclick="App.miniblogDel('<!--{$weibo.id}-->',null,this)" href="javascript:void(0);"><strong lang="CX0043">删除</strong></a><span class="MIB_line_l">|</span>
                <!--{/if}--> 
                <a onClick="App.ModForward('<!--{$weibo.id}-->','<!--{$weibo.content|strip|strip_tags|escape}-->',0,this,'num_<!--{$weibo.id}-->','<!--{$weibo.user.nick}-->',' ','')" href="javascript:void(0);"><strong lang="CD0023">转发</strong><strong type="rttCount" rid="<!--{$weibo.rid}-->" id="num_<!--{$weibo.rid}-->">(<!--{$weibo.forward_count|default:0}-->)</strong></a>
                <span class="MIB_line_l">|</span>
                <a onclick="App.addfavorite_miniblog('<!--{$weibo.id}-->');" href="javascript:void(0);"><strong lang="CL1003">收藏</strong></a>
                <span class="MIB_line_l">|</span>
                <a href="javascript:void(0);"  lastforwarder="" lastforwardername="" initbloger=""  initblogername="" id="_comment_count_miniblog2_<!--{$weibo.id}-->" onClick="scope.loadCommentByRid(<!--{$weibo.uid}-->, 'miniblog2', '新浪微博', '<!--{$weibo.id}-->', '<!--{$weibo.content|strip|strip_tags|escape}-->', '', '', 1, 0, 1);"><strong lang="CL1004">评论</strong><strong rid="<!--{$weibo.id}-->" type="commtCount">(<!--{$weibo.comment_count|default:0}-->)</strong></a> 
            </div>
        </div>
        <!--start: comments goes here--> 
        <div id="_comment_list_miniblog2_<!--{$weibo.id}-->"></div>
	</div>
</li>
