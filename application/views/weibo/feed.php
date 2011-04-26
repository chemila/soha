<!--weibo feed item-->
<li class="MIB_linedot_l" id="mid_221110315125335821">
    <!--user head image, namecard attr bind loading namecard event--> 
    <div class="head_pic">
        <a namecard="true" uid="<!--{$weibo.uid}-->" href="<!--{$weibo.uid}-->" >
            <img src="<!--{$weibo.user.portrait}-->">
        </a> 
    </div>
    <div class="MIB_feed_c">
        <p class="sms" mid="<!--{$weibo.id}-->" type="3">
            <!--weibo author info: uid, domain_name, name, verified etc-->
            <a  namecard="true" uid="<!--{$weibo.uid}-->" href="/home/profile/<!--{$weibo.uid}-->" title="<!--{$weibo.user.nick}-->"><!--{$weibo.user.nick}-->
            <!--{if false}-->  
            <img class="small_icon vip" dynamic-src="<!--{$weibo.user.portrait}-->" title="新浪认证" alt=""/>
            <!--{/if}--> 
            </a>：<!--{$weibo.content}-->
        </p>
        <div class="MIB_assign">
            <!--start forward weibo--> 
            <!--{if $weibo.rid}--> 
            <div class="MIB_asarrow_l"></div>
            <div class="MIB_assign_t"></div>
            <div class="MIB_assign_c MIB_txtbl">
                <p class="source" mid="221110315125335821" type="2"> 
                    <a  namecard="true" uid="<!--{$weibo.root.uid}-->" href="/home/profile/<!--{$weibo.root.uid}-->" title="<!--{$weibo.root.user.nick}-->">@<!--{$weibo.root.user.nick}-->
                    <!--{if $weibo.root.user.verified}--><!--{/if}--> 
                    </a>
                    ：<!--{$weibo.root.content}-->
                    <span class="source_att MIB_linkbl">
                        <a href="<!--{if 0 == $weibo.root.src}-->/1998321847/wr4klidqWo<!--{else}-->#<!--{/if}-->"><strong lang="CL1005">原文转发</strong><strong rid="201110315123201828" type="rttCount">(<!--{$weibo.root.forward_count}-->)</strong></a>
                    <span class="MIB_line_l">|</span>
                        <a href="<!--{if 0 == $weibo.root.src}-->/1998321847/wr4klidqWo<!--{else}-->#<!--{/if}-->"><strong lang="CC0603">原文评论</strong><strong rid="201110315123201828" type="commtCount">(<!--{$weibo.root.comment_count}-->)</strong></a>
                    </span>
                </p>
                <!--original weibo media data--> 
                <div class="feed_preview" id="prev_221110315125335821">
                    <!--preview media src like image, video, music etc--> 
                    <div class="feed_img"><a onClick="App.scaleImg(this,'771bf8b7jw6df986o6szyj',true);" href="javascript:void(0);"><img class="imgicon" dynamic-src="http://ww3.sinaimg.cn/thumbnail/771bf8b7jw6df986o6szyj.jpg" vimg="1" /></a> </div>
                    <div class="clear"></div>
                </div>
                <div class="blogPicOri" id="disp_221110315125335821" style="display:none;" ></div>
            </div>
            <div class="MIB_assign_b"></div>
            <!--{/if}--> 
        </div>
        <div class="feed_att MIB_linkbl MIB_txtbl">
            <div class="lf">
                <cite>
                    <!--publish timeline counter--> 
                    <a href="<!--{$weibo.uid}-->/<!--{$weibo.id}-->"><strong date="<!--{$weibo.timeline}-->"><!--{$weibo.timeline|date_format:"%H:%M:%S"}--></strong></a>
                </cite> 
                <strong lang="CL1006">来自</strong>
                <!--weibo source field--> 
                <cite>
                    <a href="http://t.sina.com.cn" target="_blank"><!--{$weibo.src|message:'weibo.src'}--></a>
                </cite>
            </div>
            <!--start: forward, favorite, and comment goes here--> 
            <div class="rt">
                <a onClick="location.href='/mblog/forward/<!--{$weibo.id}-->'" href="javascript::void())"><strong lang="CD0023">转发</strong><strong type="rttCount" rid="221110415327173016" id="num_221110415327173016">(<!--{$weibo.forward_count}-->)</strong></a>
                <span class="MIB_line_l">|</span>
                <a onclick="App.addfavorite_miniblog('<!--{$weibo.id}-->');" href="javascript:void(0);"><strong lang="CL1003">收藏</strong></a>
                <span class="MIB_line_l">|</span>
                <a href="javascript:void(0);"  lastforwarder="1645903643" lastforwardername="360安全卫士" initbloger="1998321847"  initblogername="360桌面" onClick="App.ModForward('test', '', '', 1, 0, 1);"><strong lang="CL1004">评论</strong><strong rid="221110315125335821" type="commtCount">(<!--{$weibo.comment_count}-->)</strong></a> 
            </div>
        </div>
        <!--start: comments goes here--> 
        <div id="_comment_list_miniblog2_221110415327173016">
        </div>
	</div>
</li>
