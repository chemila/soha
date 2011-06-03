<div class="user_info clearfix">
		<div style="float: left; margin: 0px; width: 50px; padding: 0px; display:block;">
	   		<a href="home/profile/<!--{$favorite.weibo.uid}-->" class="user_img">
	        <img src="<!--{$favorite.weibo.user.portrait|fix_portrait}-->" uid="<!--{$favorite.weibo.uid}-->" namecard="true"></a>
	    </div>
	    <div style="float: right; width: 494px; overflow:hidden; margin:0; padding:0; display:block;"> 
		    <a href="home/profile/<!--{$favorite.weibo.uid}-->" uid="<!--{$favorite.weibo.uid}-->" namecard="true">
		    <!--{$favorite.weibo.user.nick}-->：</a>
		    <!--{$favorite.weibo.content|parse_content}-->
		    <div class="MIB_assign">
		            <!--start forward weibo--> 
		            <!--{if $favorite.weibo.rid}--> 
		            <div class="MIB_asarrow_l"></div>
		            <div class="MIB_assign_t"></div>
		            <div class="MIB_assign_c MIB_txtbl">
		                <p class="source" mid="<!--{$favorite.weibo.id}-->" type="2"> 
		                    <a  namecard="true" uid="<!--{$favorite.weibo.root.uid}-->" href="home/profile/<!--{$favorite.weibo.root.uid}-->" title="<!--{$favorite.weibo.root.user.nick}-->">@<!--{$favorite.weibo.root.user.nick}-->
		                    <!--{if $weibo.root.user.verified|default:false}-->
		                        <img class="small_icon vip" dynamic-src="media/img/transparent.gif" title="新浪认证" alt=""/>
		                    <!--{/if}--> 
		                    </a>
		                    ：<!--{$favorite.weibo.root.content|parse_content}-->
		                    <span class="source_att MIB_linkbl">
		                        <a href="weibo/show/<!--{$favorite.weibo.rid}-->"><strong lang="CL1005">原文转发</strong><strong rid="<!--{$favorite.weibo.rid}-->" type="rttCount">(<!--{$favorite.weibo.root.forward_count|default:0}-->)</strong></a>
		                    <span class="MIB_line_l">|</span>
		                        <a href="weibo/show/<!--{$favorite.weibo.rid}-->"><strong lang="CC0603">原文评论</strong><strong rid="<!--{$favorite.weibo.rid}-->" type="commtCount">(<!--{$favorite.weibo.root.comment_count|default:0}-->)</strong></a>
		                    </span>
		                </p>
		                <!--weibo media data--> 
		                <!--{if $favorite.weibo.root.type > 0 && $favorite.weibo.root.media_data}--> 
		                <div class="feed_preview" id="prev_<!--{$favorite.weibo.rid}-->">
		                    <div class="feed_img">
		                        <a onclick="App.scaleImg(this,'<!--{$favorite.weibo.root.media_data|to_weibo_media:'middle'}-->');" href="javascript:;"><img dynamic-src="<!--{$favorite.weibo.root.media_data|to_weibo_media:'small'}-->" class="imgicon" vimg="1"></a>
		                    </div>
		                    <div class="clear"></div>
		                </div>
		                <div class="MIB_assign" id="disp_<!--{$favorite.weibo.rid}-->" style="display:none;"></div>
		                <!--{/if}--> 
		            </div>
		            <div class="MIB_assign_b"></div>
		            <!--{/if}--> 
		    </div>
            <div class="MIB_assign" id="disp_<!--{$favorite.weibo.id}-->" style="display:none;"></div>
            <!--{if $favorite.weibo.media_data}-->
            <div class="feed_preview" id="prev_<!--{$favorite.weibo.id}-->">
                <div class="feed_img">
                    <a onclick="App.scaleImg(this,'<!--{$favorite.weibo.media_data|to_weibo_media:'middle'}-->');" href="javascript:;"><img dynamic-src="<!--{$favorite.weibo.media_data|to_weibo_media:'small'}-->" class="imgicon" vimg="1"></a>
                </div>
                <div class="clear"></div>
            </div>
            <!--{/if}-->
			<div style="clear: left">
			    <p class="claerfix">发布时间:  
			        <a href="weibo/show/<!--{$favorite.weibo.id}-->"><!--{$favorite.weibo.created_at|date_format:"%Y-%m-%d %H:%I"}--></a>&nbsp;&nbsp;
			        <a onclick="App.deletefavorite_miniblog('<!--{$favorite.id}-->');" href="javascript:void(0);">
			        取消收藏</a></p>
			</div>
	</div>
</div>

