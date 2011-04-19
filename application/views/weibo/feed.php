<!--weibo feed item-->
<li class="MIB_linedot_l" id="mid_221110315125335821">
    <!--user head image, namecard attr bind loading namecard event--> 
    <div class="head_pic">
        <a namecard="true" uid="<!--{$weibo.uid}-->" href="<!--{$weibo.domain_name}-->" >
            <img src="/application/media/img/img.png">
        </a> 
    </div>
    <div class="MIB_feed_c">
        <p class="sms" mid="<!--{$weibo.id}-->" type="3">
            <!--weibo author info: uid, domain_name, name, verified etc-->
            <a  namecard="true" uid="<!--{$weibo.uid}-->" href="<!--{$weibo.domain_name}-->" title="<!--{$weibo.name}-->"><!--{$weibo.name}--><img class="small_icon vip" dynamic-src="http://img.t.sinajs.cn/t3/style/images/common/transparent.gif" title="新浪认证" alt=""/></a>：<!--{$weibo.content}-->
        </p>
        <div class="MIB_assign">
            <div class="MIB_asarrow_l"></div>
            <div class="MIB_assign_t"></div>
            <div class="MIB_assign_c MIB_txtbl">
                <!--start forward weibo--> 
                <p class="source" mid="221110315125335821" type="2"> 
                    <!--{$weibo.name}--></a>：<!--{$weibo.original_content}-->
                    <span class="source_att MIB_linkbl">
                        <a href="/1998321847/wr4klidqWo"><strong lang="CL1005">原文转发</strong><strong rid="201110315123201828" type="rttCount">(<!--{$weibo.forward_count}-->)</strong></a>
                    <span class="MIB_line_l">|</span><a href="/1998321847/wr4klidqWo"><strong lang="CC0603">原文评论</strong><strong rid="201110315123201828" type="commtCount">(<!--{$weibo.comment_count}-->)</strong></a>
                    </span>
                </p>
                <!--end forward weibo--> 
                <div class="feed_preview" id="prev_221110315125335821">
                    <!--preview media src like image, video, music etc--> 
                    <div class="feed_img"><a onClick="App.scaleImg(this,'771bf8b7jw6df986o6szyj',true);" href="javascript:void(0);"><img class="imgicon" dynamic-src="http://ww3.sinaimg.cn/thumbnail/771bf8b7jw6df986o6szyj.jpg" vimg="1" /></a> </div>
                    <div class="clear"></div>
                </div>
                <div class="blogPicOri" id="disp_221110315125335821" style="display:none;" ></div>
            </div>
            <div class="MIB_assign_b"></div>
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
                <a onClick="" href="javascript::void())"><strong lang="CD0023">转发</strong></a>
                <strong type="rttCount" rid="221110415327173016" id="num_221110415327173016">(27)</strong>
                <span class="MIB_line_l">|</span>
                <a onclick="App.addfavorite_miniblog('221110415327173016');" href="javascript:void(0);"><strong lang="CL1003">收藏</strong></a>
                <span class="MIB_line_l">|</span>
                <a href="javascript:void(0);"  lastforwarder="1645903643" lastforwardername="360安全卫士" initbloger="1998321847"  initblogername="360桌面" onClick="App.ModForward('test', '', '', 1, 0, 1);"><strong lang="CL1004">评论</strong><strong rid="221110315125335821" type="commtCount"></strong></a> 
            </div>
        </div>
        <!--start: weibo comment list--> 
        <div id="_comment_list_miniblog2_221110415327173016">
            <div popcontainer="true" class="MIB_assign rt">
                <div class="MIB_asarrow_r"></div>
                <div class="MIB_assign_t"></div>
                <div class="MIB_assign_c MIB_txtbl">
                    <div class="logininput new_position">
                        <!--login here-->
                        <div style="display: none;" id="_comment_logindiv_miniblog2_221110415327173016" class="login_sboxs"> 登录名：
                            <input type="text" class="" id="_comment_loginuser_miniblog2_221110415327173016" style="color: rgb(153, 153, 153); " title="电子邮箱/UC号/会员帐号/手机号" alt="电子邮箱/UC号/会员帐号/手机号">
                            密码：
                            <input type="password" class="" id="_comment_loginpassword_miniblog2_221110415327173016" style="color: rgb(153, 153, 153); ">
                            <a target="_blank" href="http://login.sina.com.cn/cgi/getpwd/getpwd0.php?entry=sso">找回密码</a><span class="MIB_line_l">|</span><a target="_blank" href="http://t.sina.com.cn/reg.php">注册</a> 
                        </div>

                        <!--show face list-->
                        <a onclick="App.showFaces(this,$E('_comment_content_miniblog2_221110415327173016'),-30,5);return false;" class="faceicon1" href="####" title="表情"></a>
                        <!--add comment content here-->
                        <textarea class="lf" style="overflow: hidden; height: 18px; font-family: Tahoma,宋体; border-style: solid; border-width: 1px; word-wrap: break-word; font-size: 12px; line-height: 18px;" id="_comment_content_miniblog2_221110415327173016"></textarea>
                        <!--reply to--> 
                        <a href="javascript:void(0);" id="_comment_post_miniblog2_221110415327173016" class="btn_normal"><em>评论</em></a>
                        <!--choose to forward or comment at the same time--> 
                        <div class="margin_b MIB_txtbl ml35">
                            <p>
                            <input type="checkbox" id="agree_221110415327173016">
                            <label for="agree_221110415327173016">同时转发到我的微博</label>
                            </p>
                            <p>
                            <input type="checkbox" id="isroot_221110415327173016">
                            <label for="isroot_221110415327173016">同时评论给原文作者 新浪房产</label>
                            </p>
                        </div>
                    </div>
                    <ul class="PL_list oddline">
                        <!--list all comments below--> 
                        <li onmouseout="App.hideExtendBtn(this);return false" onmouseover="App.showExtendBtn(this);return false" cacheid="8" class="MIB_linedot3"> <a href="http://t.sina.com.cn/1779849751"><img src="http://tp4.sinaimg.cn/1779849751/30/1279632716/0" title="自己也该学着成熟了" class="picborder_l lf" uid="1779849751" namecard="true"></a>
                            <!--delete comment if self--> 
                            <div onclick="scope.deleteCommentByRid('1779849751', '1069205631', '221110415327173016', '202110415342216996', 'miniblog2', 1, 1)" title="删除" style="visibility: hidden; " class="icon_closel rt">x</div>
                            <!--comment content-->
                            <div class="txt">
                                <!--comment author info--> 
                                <div class="txtinfo"> <a href="http://t.sina.com.cn/1779849751" uid="1779849751" namecard="true">自己也该学着成熟了</a> <img type="face" title="泪" src="http://img.t.sinajs.cn/t3/style/images/common/face/ext/normal/d8/sad.gif"> <span class="MIB_txtbl">(10秒前)</span> 
                                </div>
                                <!--actions: delete reply etc.-->
                                <p class="MIB_more MIB_linkbl"> <a class="lose" onclick="scope.replyByCid(&quot;1779849751&quot;, &quot;1069205631&quot;, &quot;221110415327173016&quot;, &quot;202110415342216996&quot;, &quot;自己也该学着成熟了&quot;, &quot;Array&quot;, &quot;miniblog2&quot;, 1, 1);" href="javascript:;">回复</a> </p>
                            </div>
                            <span class="clear"></span> 
                        </li>
                    </ul>
                    <!--list more comments--> 
                    <div class="list_head MIB_linedot3 moreheight"> 
                        后面还有<span>10</span>条评论，
                        <a href="/1069205631/zF4mWUu61O#a_comment">点击查看<em>&gt;&gt;</em> </a> 
                    </div>
                </div>
                <div class="MIB_assign_b"></div>
            </div>
        <!--end comments list-->
        </div>
	</div>
</li>
