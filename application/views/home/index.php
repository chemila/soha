<!--{include file="header.php"}-->
<script type="text/javascript">
jQuery(document).ready(function() {
	jQuery('#scroll_star_list').jcarousel({
		auto:5
    });
});
</script>
</head>
<body>
<div id="wrap">
	<div class="mxk_header">
		<p class="tr mxk_header_top"><a href="#">私信</a> | <a href="#">收藏</a> | <a href="#">设置</a> | <a href="#">帮助</a></p>
		<ul class="nav">
			<li><a href="#" class="current">微博明星(999999)</a></li>
			<li><a href="#">行业大腕(999999)</a></li>
			<li><a href="#">草根红人(999999)</a></li>
			<li><a href="#">我关注的(999999)</a></li>
			<li><a href="#">明星图集(999999)</a></li>
		</ul>
		<p class="accredit"><a href="#">已授权</a> 您已开通微博授权应用</p>
	</div>
	<div class="main">
		<div class="main_leftimg"></div>
		<div class="main_t"></div>
		<div class="main_c"> 
			<!--search start-->
			<div class="search">
				<p class="quick_search"><span class="fb f14">快速检索：</span><a href="#" class="current">A</a><a href="#">B</a><a href="#">C</a><a href="#">D</a><a href="#">E</a><a href="#">F</a><a href="#">G</a><a href="#">H</a><a href="#">I</a><a href="#">J</a><a href="#">K</a><a href="#">L</a><a href="#">M</a><a href="#">N</a><a href="#">O</a><a href="#">P</a><a href="#">Q</a><a href="#">R</a><a href="#">S</a><a href="#">T</a><a href="#">U</a><a href="#">V</a><a href="#">W</a><a href="#">X</a><a href="#">Y</a><a href="#">Z</a></p>
				<div class="search_input">
					<input name="" type="button" class="btn">
					<input name="" type="text" class="text" onblur="if(this.value=='')this.value='输入你想找的明星'" onfocus="if(this.value=='输入你想找的明星')this.value=''" value="输入你想找的明星">
				</div>
			</div>
			<!--search end--> 
			<!--star list start-->
			<div class="star_list">
				<div class="pages"><a href="#" class="prev">上一页</a><span class="current">[<a href="#">1</a>]</span><a href="#">2</a><a href="#">3</a><a href="#">4</a><a href="#">5</a><a href="#" class="next">下一页</a></div>
				<ul id="scroll_star_list" class="jcarousel-skin-tango">
                    <!--{foreach from=$stars item=star}-->
					<li>
						<div class="star_info">
							<div><a href="/user/<!--{$star.uid}-->"><img src="<!--{$star.head_url}-->"></a> <a href="/user/<!--{$star.uid}-->"><!--{$star.nick}--></a><br>
								粉丝：
								<!--{$star.followers_count}--></div>
							<p><a href="#" class="btn3">已关注</a><a href="#"class="btn2">送礼品</a></p>
						</div>
                    </li>
                    <!--{/foreach}-->
					</li>
				</ul>
			</div>
			<!--star list end-->
			<div class="clearfix">
				<div class="fan_comments w280bg">
					<div class="title"> <a href="index2.html" class="show">展开查看</a>
						<h2 class="fan_comments_title">粉丝热议</h2>
					</div>
					<ul class="small_list">
						<li class="clearfix">
							<div class="user"><a href="#"><img src="/application/media/img/img.png"></a><a href="#" class="city_chat">同城聊天</a></div>
							<div class="info_left">
								<div class="info_t"></div>
								<div class="info_c"> <span></span>
									<p>在综合听取体验版用户反馈和建议之后，360安全桌面靓丽变身，正式更名为360桌面，并推出1.0beta版，</p>
								</div>
								<div class="info_b"></div>
							</div>
						</li>
						<li class="clearfix">
							<div class="info_right">
								<div class="info_t"></div>
								<div class="info_c"> <span></span>
									<p>在综合听取体验版用户反馈和建议之后，360安全桌面靓丽变身，正式更名为360桌面，并推出1.0beta版，</p>
								</div>
								<div class="info_b"></div>
							</div>
							<div class="user"><a href="#"><img src="/application/media/img/img.png"></a><a href="#" class="city_chat">同城聊天</a></div>
						</li>
						<li class="clearfix">
							<div class="user"><a href="#"><img src="/application/media/img/img.png"></a></div>
							<div class="info_left">
								<div class="info_t"></div>
								<div class="info_c"> <span></span>
									<p>在综合听取体验版用户反馈和建议之后</p>
								</div>
								<div class="info_b"></div>
							</div>
						</li>
						<li class="clearfix">
							<div class="info_right">
								<div class="info_t"></div>
								<div class="info_c"> <span></span>
									<p>在综合听取体验版用户反馈和建议之后，360安全桌面靓丽变身，正式更名为360桌面，并推出1.0beta版，在综合听取体验版用户反馈和建议之后，360安全桌面靓丽变身，正式更名为360桌面，并推出1.0beta版</p>
								</div>
								<div class="info_b"></div>
							</div>
							<div class="user"><a href="#"><img src="/application/media/img/img.png"></a></div>
						</li>
						<li class="clearfix">
							<div class="user"><a href="#"><img src="/application/media/img/img.png"></a><a href="#" class="city_chat">同城聊天</a></div>
							<div class="info_left">
								<div class="info_t"></div>
								<div class="info_c"> <span></span>
									<p>在综合听取体验版用户反馈和建议之后，360安全桌面靓丽变身，正式更名为360桌面，并推出1.0beta版，</p>
								</div>
								<div class="info_b"></div>
							</div>
						</li>
						<li class="clearfix">
							<div class="info_right">
								<div class="info_t"></div>
								<div class="info_c"> <span></span>
									<p>在综合听取体验版用户反馈和建议之后，360安全桌面靓丽变身，正式更名为360桌面，并推出1.0beta版，</p>
								</div>
								<div class="info_b"></div>
							</div>
							<div class="user"><a href="#"><img src="/application/media/img/img.png"></a><a href="#" class="city_chat">同城聊天</a></div>
						</li>
						<li class="clearfix">
							<div class="user"><a href="#"><img src="/application/media/img/img.png"></a></div>
							<div class="info_left">
								<div class="info_t"></div>
								<div class="info_c"> <span></span>
									<p>在综合听取体验版用户反馈和建议之后</p>
								</div>
								<div class="info_b"></div>
							</div>
						</li>
						<li class="clearfix">
							<div class="info_right">
								<div class="info_t"></div>
								<div class="info_c"> <span></span>
									<p>在综合听取体验版用户反馈和建议之后，360安全桌面靓丽变身，正式更名为360桌面，并推出1.0beta版，在综合听取体验版用户反馈和建议之后，360安全桌面靓丽变身，正式更名为360桌面，并推出1.0beta版</p>
								</div>
								<div class="info_b"></div>
							</div>
							<div class="user"><a href="#"><img src="/application/media/img/img.png"></a></div>
						</li>
					</ul>
				</div>
                <!--star stars news-->
				<div class="star_news w620bg">
					<div class="title">
						<h2 class="star_news_title">明星动态</h2>
					</div>
					<ul class="MIB_feed" id="feed_list">
                        <!--{foreach from=$stars_news item=weibo}-->
						<li class="MIB_linedot_l" id="mid_221110315125335821">
							<div class="head_pic"><a namecard="true" uid="<!--{$weibo.uid}-->" href="http://t.sina.com.cn/<!--{$weibo.domain_name}-->" ><img src="/application/media/img/img.png"></a> </div>
							<div class="MIB_feed_c">
								<p class="sms" mid="<!--{$weibo.id}-->" type="3"><a  namecard="true" uid="<!--{$weibo.uid}-->" href="http://t.sina.com.cn/<!--{$weibo.domain_name}-->" title="<!--{$weibo.name}-->"><!--{$weibo.name}--><img class="small_icon vip" dynamic-src="http://img.t.sinajs.cn/t3/style/images/common/transparent.gif" title="新浪认证" alt=""/></a>：<!--{$weibo.content}--><a href="http://t.sina.com.cn/n/<!--{$weibo.name}-->"   namecard="true">@<!--{$weibo.name}--></a></p>
								<div class="MIB_assign">
									<div class="MIB_asarrow_l"></div>
									<div class="MIB_assign_t"></div>
									<div class="MIB_assign_c MIB_txtbl">
										<p class="source" mid="221110315125335821" type="2"> <a href="http://t.sina.com.cn/1998321847" namecard="true" uid="1998321847">@<!--{$weibo.name}--></a>：<!--{$weibo.original_content}--><a href="http://sinaurl.cn/h5xb7a" target="_blank" mt="url" >http://sinaurl.cn/h5xb7a</a> <span class="source_att MIB_linkbl"><a href="http://t.sina.com.cn/1998321847/wr4klidqWo"><strong lang="CL1005">原文转发</strong><strong rid="201110315123201828" type="rttCount">(<!--{$weibo.forward_count}-->)</strong></a><span class="MIB_line_l">|</span><a href="http://t.sina.com.cn/1998321847/wr4klidqWo"><strong lang="CC0603">原文评论</strong><strong rid="201110315123201828" type="commtCount">(<!--{$weibo.comment_count}-->)</strong></a></span></p>
										<div class="feed_preview" id="prev_221110315125335821">
											<div class="feed_img"><a onClick="App.scaleImg(this,'771bf8b7jw6df986o6szyj',true);" href="javascript:void(0);"><img class="imgicon" dynamic-src="http://ww3.sinaimg.cn/thumbnail/771bf8b7jw6df986o6szyj.jpg" vimg="1" /></a> </div>
											<div class="clear"></div>
										</div>
										<div class="blogPicOri" id="disp_221110315125335821" style="display:none;" > </div>
									</div>
									<div class="MIB_assign_b"></div>
								</div>
								<div class="feed_att MIB_linkbl MIB_txtbl">
									<div class="lf"><cite><a href="http://t.sina.com.cn/1645903643/zF4klimo5D"><strong date="1300166557"><!--{$weibo.timeline|date_format:"%H:%M:%S"}--></strong></a></cite> <strong lang="CL1006">来自</strong><cite><a href="http://t.sina.com.cn" target="_blank"><!--{$weibo.src|message:'weibo.src'}--></a></cite></div>
									<div class="rt"><a href="javascript:void(0);"  lastforwarder="1645903643" lastforwardername="360安全卫士" initbloger="1998321847"  initblogername="360桌面" onClick="App.ModForward('221110315125335821','360%E5%AE%89%E5%85%A8%E6%A1%8C%E9%9D%A21.0beta%E5%8F%91%E5%B8%83%E5%95%A6%7E%EF%BC%81%E4%BB%8E%E6%9C%AC%E7%89%88%E6%9C%AC%E5%BC%80%E5%A7%8B%EF%BC%8C%E8%BD%AF%E4%BB%B6%E5%90%8D%E7%A7%B0%E6%AD%A3%E5%BC%8F%E5%AE%9A%E4%B8%BA%E2%80%9C360%E6%A1%8C%E9%9D%A2%E2%80%9D%EF%BC%8C%E5%90%8C%E6%97%B6%E4%B9%9F%E6%96%B0%E5%A2%9E%E4%BA%86%E5%B9%BF%E5%A4%A7%E7%94%A8%E6%88%B7%E5%85%B3%E6%B3%A8%E7%9A%84%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B7%BB%E5%8A%A0%E6%96%87%E4%BB%B6%E3%80%81%E7%BD%91%E5%9D%80%E5%8A%9F%E8%83%BD%EF%BC%8C%E4%BB%A5%E5%8F%8A%E4%B8%80%E7%B3%BB%E5%88%97%E4%BD%93%E9%AA%8C%E7%BB%86%E8%8A%82%E7%9A%84%E4%BC%98%E5%8C%96%EF%BC%8C%E6%88%91%E4%BB%AC%E6%8E%A5%E4%B8%8B%E6%9D%A5%E5%B0%86%E4%B8%80%E4%B8%80%E4%B8%BA%E5%A4%A7%E5%AE%B6%E6%8F%AD%E7%A7%98%7E%20%E7%AB%8B%E5%8D%B3%E4%BD%93%E9%AA%8C360%E6%A1%8C%E9%9D%A21.0beta%E7%89%88%EF%BC%8C%E8%AF%B7%E6%9E%9C%E6%96%AD%E8%AE%BF%E9%97%AE%E5%AE%98%E7%BD%91%EF%BC%9A%3Ca%20href%3D%22http%3A%2F%2Fsinaurl.cn%2Fh5xb7a%22%20target%3D%22_blank%22%20mt%3D%22url%22%20%3Ehttp%3A%2F%2Fsinaurl.cn%2Fh5xb7a%3C%2Fa%3E',0,this,'num_221110315125335821','360安全卫士','%E5%9C%A8%E7%BB%BC%E5%90%88%E5%90%AC%E5%8F%96%E4%BD%93%E9%AA%8C%E7%89%88%E7%94%A8%E6%88%B7%E5%8F%8D%E9%A6%88%E5%92%8C%E5%BB%BA%E8%AE%AE%E4%B9%8B%E5%90%8E%EF%BC%8C360%E5%AE%89%E5%85%A8%E6%A1%8C%E9%9D%A2%E9%9D%93%E4%B8%BD%E5%8F%98%E8%BA%AB%EF%BC%8C%E6%AD%A3%E5%BC%8F%E6%9B%B4%E5%90%8D%E4%B8%BA360%E6%A1%8C%E9%9D%A2%EF%BC%8C%E5%B9%B6%E6%8E%A8%E5%87%BA1.0beta%E7%89%88%EF%BC%8C%E5%A4%9A%E9%A1%B9%E6%94%B9%E8%BF%9B%EF%BC%8C%E5%90%84%E7%A7%8D%E7%BB%99%E5%8A%9B%EF%BC%8C%E8%BF%98%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%A0%E6%B8%B4%E6%9C%9B%E5%AE%9E%E7%8E%B0%E7%9A%84%EF%BC%8C%E8%B5%B6%E7%B4%A7%E5%91%8A%E8%AF%89%40360%E6%A1%8C%E9%9D%A2%20%E5%90%A7','')"><strong lang="CD0023">转发</strong><strong id="num_221110315125335821" rid="221110315125335821" type="rttCount"></strong></a> <span class="MIB_line_l">|</span> <a href="javascript:void(0);" onClick="App.addfavorite_miniblog('221110315125335821');"><strong lang="CL1003">收藏</strong></a> <span class="MIB_line_l">|</span> <a id="_comment_count_miniblog2_221110315125335821" href="javascript:void(0);" onClick="scope.loadCommentByRid(1645903643, 'miniblog2', '新浪微博', '221110315125335821', '%E5%9C%A8%E7%BB%BC%E5%90%88%E5%90%AC%E5%8F%96%E4%BD%93%E9%AA%8C%E7%89%88%E7%94%A8%E6%88%B7%E5%8F%8D%E9%A6%88%E5%92%8C%E5%BB%BA%E8%AE%AE%E4%B9%8B%E5%90%8E%EF%BC%8C360%E5%AE%89%E5%85%A8%E6%A1%8C%E9%9D%A2%E9%9D%93%E4%B8%BD%E5%8F%98%E8%BA%AB%EF%BC%8C%E6%AD%A3%E5%BC%8F%E6%9B%B4%E5%90%8D%E4%B8%BA360%E6%A1%8C%E9%9D%A2%EF%BC%8C%E5%B9%B6%E6%8E%A8%E5%87%BA1.0beta%E7%89%88%EF%BC%8C%E5%A4%9A%E9%A1%B9%E6%94%B9%E8%BF%9B%EF%BC%8C%E5%90%84%E7%A7%8D%E7%BB%99%E5%8A%9B%EF%BC%8C%E8%BF%98%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%A0%E6%B8%B4%E6%9C%9B%E5%AE%9E%E7%8E%B0%E7%9A%84%EF%BC%8C%E8%B5%B6%E7%B4%A7%E5%91%8A%E8%AF%89%3Ca%20href%3D%22http%3A%2F%2Ft.sina.com.cn%2Fn%2F360%25E6%25A1%258C%25E9%259D%25A2%22%20%20%20namecard%3D%22true%22%3E%40360%E6%A1%8C%E9%9D%A2%3C%2Fa%3E%20%E5%90%A7', '', '', 1, 0, 1);"><strong lang="CL1004">评论</strong><strong rid="221110315125335821" type="commtCount"></strong></a> </div>
								</div>
								<div id="_comment_list_miniblog2_221110315125335821"></div>
							</div>
						</li>
                        <!--{/foreach}-->
						<li class="MIB_linedot_l" id="mid_201110315124347475">
							<div class="head_pic"><a namecard="true" uid="1231687250" href="http://t.sina.com.cn/dfyuan" ><img src="/application/media/img/img.png"></a> </div>
							<div class="MIB_feed_c">
								<p class="sms" mid="201110315124347475" type="1"><a  namecard="true" uid="1231687250" href="http://t.sina.com.cn/dfyuan" title="徐德亮">徐德亮<img class="small_icon vip" dynamic-src="http://img.t.sinajs.cn/t3/style/images/common/transparent.gif" title="新浪认证" alt=""/></a>：录正大综艺"墙来了"，和俺的美女队员们。<a href="http://t.sina.com.cn/n/%E9%BB%84%E8%B6%85%E7%87%95"   namecard="true">@黄超燕</a></p>
								<div class="feed_preview" id="prev_201110315124347475">
									<div class="feed_img"><a onClick="App.scaleImg(this,'496a0e52jw6df9a3ql9iuj');" href="javascript:;"><img dynamic-src="http://ww4.sinaimg.cn/thumbnail/496a0e52jw6df9a3ql9iuj.jpg" class="imgicon" vimg="1" /></a></div>
									<div class="clear"></div>
								</div>
								<div class="MIB_assign" id="disp_201110315124347475" style="display:none;" > </div>
								<div class="feed_att MIB_linkbl MIB_txtbl">
									<div class="lf"><cite><a href="http://t.sina.com.cn/1231687250/wr4kliieYz"><strong date="1300166469">2分钟前</strong></a></cite> <strong lang="CL1006">来自</strong><cite><a href="http://t.sina.com.cn/mobile/msg.php" target="_blank">彩信</a></cite></div>
									<div class="rt"><a href="javascript:void(0);"  lastforwarder="1231687250" lastforwardername="徐德亮" initbloger="0"  initblogername="" onClick="App.ModForward('201110315124347475','%E5%BD%95%E6%AD%A3%E5%A4%A7%E7%BB%BC%E8%89%BA%E2%80%9C%E5%A2%99%E6%9D%A5%E4%BA%86%E2%80%9D%EF%BC%8C%E5%92%8C%E4%BF%BA%E7%9A%84%E7%BE%8E%E5%A5%B3%E9%98%9F%E5%91%98%E4%BB%AC%E3%80%82%3Ca%20href%3D%22http%3A%2F%2Ft.sina.com.cn%2Fn%2F%25E9%25BB%2584%25E8%25B6%2585%25E7%2587%2595%22%20%20%20namecard%3D%22true%22%3E%40%E9%BB%84%E8%B6%85%E7%87%95%3C%2Fa%3E',0,this,'num_201110315124347475','徐德亮','','')"><strong lang="CD0023">转发</strong><strong id="num_201110315124347475" rid="201110315124347475" type="rttCount">(1)</strong></a> <span class="MIB_line_l">|</span> <a href="javascript:void(0);" onClick="App.addfavorite_miniblog('201110315124347475');"><strong lang="CL1003">收藏</strong></a> <span class="MIB_line_l">|</span> <a id="_comment_count_miniblog2_201110315124347475" href="javascript:void(0);" onClick="scope.loadCommentByRid(1231687250, 'miniblog2', '新浪微博', '201110315124347475', '%E5%BD%95%E6%AD%A3%E5%A4%A7%E7%BB%BC%E8%89%BA%E2%80%9C%E5%A2%99%E6%9D%A5%E4%BA%86%E2%80%9D%EF%BC%8C%E5%92%8C%E4%BF%BA%E7%9A%84%E7%BE%8E%E5%A5%B3%E9%98%9F%E5%91%98%E4%BB%AC%E3%80%82%3Ca%20href%3D%22http%3A%2F%2Ft.sina.com.cn%2Fn%2F%25E9%25BB%2584%25E8%25B6%2585%25E7%2587%2595%22%20%20%20namecard%3D%22true%22%3E%40%E9%BB%84%E8%B6%85%E7%87%95%3C%2Fa%3E', '', '', 1, 0, 1);"><strong lang="CL1004">评论</strong><strong rid="201110315124347475" type="commtCount">(5)</strong></a> </div>
								</div>
								<div id="_comment_list_miniblog2_201110315124347475"></div>
							</div>
						</li>
						<li class="MIB_linedot_l" id="mid_221110315126245660">
							<div class="head_pic"><a namecard="true" uid="1638607954" href="http://t.sina.com.cn/sellstars" ><img src="/application/media/img/img.png"></a> </div>
							<div class="MIB_feed_c">
								<p class="sms" mid="221110315126245660" type="3"><a  namecard="true" uid="1638607954" href="http://t.sina.com.cn/sellstars" title="陶志勇">陶志勇</a>：//<a href="http://t.sina.com.cn/n/DJ%E9%9B%AF%E5%A9%B7"   namecard="true">@DJ雯婷</a>://<a href="http://t.sina.com.cn/n/%E6%9E%9C%E5%A3%B3%E7%88%B1%E5%AE%A0"   namecard="true">@果壳爱宠</a>:多可爱的喵啊，强烈pat</p>
								<div class="MIB_assign">
									<div class="MIB_asarrow_l"></div>
									<div class="MIB_assign_t"></div>
									<div class="MIB_assign_c MIB_txtbl">
										<p class="source" mid="221110315126245660" type="2"> <a href="http://t.sina.com.cn/1529573474" namecard="true" uid="1529573474">@科学松鼠会<img class="small_icon vip" dynamic-src="http://img.t.sinajs.cn/t3/style/images/common/transparent.gif" title="新浪认证" alt=""/></a>：【预测死亡的奇猫奥斯卡】在美国罗德岛医院，到2007年时，奥斯卡已成功预测了至少25名患者数小时后的死亡。于是当护士发现奥斯卡睡在患者身边时，就开始通知亲属和牧师，奥斯卡使临终患者的最后时刻可以与家人团<img dynamic-src="http://img.t.sinajs.cn/t3/style/images/common/face/ext/normal/a5/wind_org.gif" title="微风" type="face" /> 聚，失去亲人的家属们对奥斯卡也心怀感激。<a href="http://sinaurl.cn/htadKg" target="_blank" mt="url" >http://sinaurl.cn/htadKg</a> <span class="source_att MIB_linkbl"><a href="http://t.sina.com.cn/1529573474/5en1hFLeIS6"><strong lang="CL1005">原文转发</strong><strong rid="2011103062653509082" type="rttCount">(1330)</strong></a><span class="MIB_line_l">|</span><a href="http://t.sina.com.cn/1529573474/5en1hFLeIS6"><strong lang="CC0603">原文评论</strong><strong rid="2011103062653509082" type="commtCount">(331)</strong></a></span></p>
										<div class="feed_preview" id="prev_221110315126245660">
											<div class="feed_img"><a onClick="App.scaleImg(this,'5b2b7062jw6dez8mcrg2jj',true);" href="javascript:void(0);"><img class="imgicon" dynamic-src="http://ww4.sinaimg.cn/thumbnail/5b2b7062jw6dez8mcrg2jj.jpg" vimg="1" /></a> </div>
											<div class="clear"></div>
										</div>
										<div class="blogPicOri" id="disp_221110315126245660" style="display:none;" > </div>
									</div>
									<div class="MIB_assign_b"></div>
								</div>
								<div class="feed_att MIB_linkbl MIB_txtbl">
									<div class="lf"><cite><a href="http://t.sina.com.cn/1638607954/zF4kliqcMs"><strong date="1300166430">3分钟前</strong></a></cite> <strong lang="CL1006">来自</strong><cite><a href="http://t.sina.com.cn" target="_blank">新浪微博</a></cite></div>
									<div class="rt"><a href="javascript:void(0);"  lastforwarder="1638607954" lastforwardername="陶志勇" initbloger="1529573474"  initblogername="科学松鼠会" onClick="App.ModForward('221110315126245660','%E3%80%90%E9%A2%84%E6%B5%8B%E6%AD%BB%E4%BA%A1%E7%9A%84%E5%A5%87%E7%8C%AB%E5%A5%A5%E6%96%AF%E5%8D%A1%E3%80%91%E5%9C%A8%E7%BE%8E%E5%9B%BD%E7%BD%97%E5%BE%B7%E5%B2%9B%E5%8C%BB%E9%99%A2%EF%BC%8C%E5%88%B02007%E5%B9%B4%E6%97%B6%EF%BC%8C%E5%A5%A5%E6%96%AF%E5%8D%A1%E5%B7%B2%E6%88%90%E5%8A%9F%E9%A2%84%E6%B5%8B%E4%BA%86%E8%87%B3%E5%B0%9125%E5%90%8D%E6%82%A3%E8%80%85%E6%95%B0%E5%B0%8F%E6%97%B6%E5%90%8E%E7%9A%84%E6%AD%BB%E4%BA%A1%E3%80%82%E4%BA%8E%E6%98%AF%E5%BD%93%E6%8A%A4%E5%A3%AB%E5%8F%91%E7%8E%B0%E5%A5%A5%E6%96%AF%E5%8D%A1%E7%9D%A1%E5%9C%A8%E6%82%A3%E8%80%85%E8%BA%AB%E8%BE%B9%E6%97%B6%EF%BC%8C%E5%B0%B1%E5%BC%80%E5%A7%8B%E9%80%9A%E7%9F%A5%E4%BA%B2%E5%B1%9E%E5%92%8C%E7%89%A7%E5%B8%88%EF%BC%8C%E5%A5%A5%E6%96%AF%E5%8D%A1%E4%BD%BF%E4%B8%B4%E7%BB%88%E6%82%A3%E8%80%85%E7%9A%84%E6%9C%80%E5%90%8E%E6%97%B6%E5%88%BB%E5%8F%AF%E4%BB%A5%E4%B8%8E%E5%AE%B6%E4%BA%BA%E5%9B%A2%3Cimg%20src%3D%22http%3A%2F%2Fimg.t.sinajs.cn%2Ft3%2Fstyle%2Fimages%2Fcommon%2Fface%2Fext%2Fnormal%2Fa5%2Fwind_org.gif%22%20title%3D%22%E5%BE%AE%E9%A3%8E%22%20type%3D%22face%22%20%2F%3E%20%E8%81%9A%EF%BC%8C%E5%A4%B1%E5%8E%BB%E4%BA%B2%E4%BA%BA%E7%9A%84%E5%AE%B6%E5%B1%9E%E4%BB%AC%E5%AF%B9%E5%A5%A5%E6%96%AF%E5%8D%A1%E4%B9%9F%E5%BF%83%E6%80%80%E6%84%9F%E6%BF%80%E3%80%82%3Ca%20href%3D%22http%3A%2F%2Fsinaurl.cn%2FhtadKg%22%20target%3D%22_blank%22%20mt%3D%22url%22%20%3Ehttp%3A%2F%2Fsinaurl.cn%2FhtadKg%3C%2Fa%3E',0,this,'num_221110315126245660','陶志勇','%2F%2F%40DJ%E9%9B%AF%E5%A9%B7%3A%2F%2F%40%E6%9E%9C%E5%A3%B3%E7%88%B1%E5%AE%A0%3A%E5%A4%9A%E5%8F%AF%E7%88%B1%E7%9A%84%E5%96%B5%E5%95%8A%EF%BC%8C%E5%BC%BA%E7%83%88pat','')"><strong lang="CD0023">转发</strong><strong id="num_221110315126245660" rid="221110315126245660" type="rttCount"></strong></a> <span class="MIB_line_l">|</span> <a href="javascript:void(0);" onClick="App.addfavorite_miniblog('221110315126245660');"><strong lang="CL1003">收藏</strong></a> <span class="MIB_line_l">|</span> <a id="_comment_count_miniblog2_221110315126245660" href="javascript:void(0);" onClick="scope.loadCommentByRid(1638607954, 'miniblog2', '新浪微博', '221110315126245660', '%2F%2F%3Ca%20href%3D%22http%3A%2F%2Ft.sina.com.cn%2Fn%2FDJ%25E9%259B%25AF%25E5%25A9%25B7%22%20%20%20namecard%3D%22true%22%3E%40DJ%E9%9B%AF%E5%A9%B7%3C%2Fa%3E%3A%2F%2F%3Ca%20href%3D%22http%3A%2F%2Ft.sina.com.cn%2Fn%2F%25E6%259E%259C%25E5%25A3%25B3%25E7%2588%25B1%25E5%25AE%25A0%22%20%20%20namecard%3D%22true%22%3E%40%E6%9E%9C%E5%A3%B3%E7%88%B1%E5%AE%A0%3C%2Fa%3E%3A%E5%A4%9A%E5%8F%AF%E7%88%B1%E7%9A%84%E5%96%B5%E5%95%8A%EF%BC%8C%E5%BC%BA%E7%83%88pat', '', '', 1, 0, 1);"><strong lang="CL1004">评论</strong><strong rid="221110315126245660" type="commtCount"></strong></a> </div>
								</div>
								<div id="_comment_list_miniblog2_221110315126245660"></div>
							</div>
						</li>
						<li class="MIB_linedot_l" id="mid_221110315125197701">
							<div class="head_pic"><a namecard="true" uid="1787217070" href="http://t.sina.com.cn/xiaohua" ><img src="/application/media/img/img.png"></a> </div>
							<div class="MIB_feed_c">
								<p class="sms" mid="221110315125197701" type="1"><a  namecard="true" uid="1787217070" href="http://t.sina.com.cn/xiaohua" title="笑话">笑话</a>：【日本震后民众表情】3月14日，日本二本松市受到高级别放射线的少女被隔离，透过玻璃看着自己的爱犬。<img dynamic-src="http://img.t.sinajs.cn/t3/style/images/common/face/ext/normal/d8/sad.gif" title="泪" type="face" /></p>
								<div class="feed_preview" id="prev_221110315125197701">
									<div class="feed_img"><a onClick="App.scaleImg(this,'6a86c4aejw6df99z2ff2zj');" href="javascript:;"><img dynamic-src="http://ww2.sinaimg.cn/thumbnail/6a86c4aejw6df99z2ff2zj.jpg" class="imgicon" vimg="1" /></a></div>
									<div class="clear"></div>
								</div>
								<div class="MIB_assign" id="disp_221110315125197701" style="display:none;" > </div>
								<div class="feed_att MIB_linkbl MIB_txtbl">
									<div class="lf"><cite><a href="http://t.sina.com.cn/1787217070/zF4klilO9T"><strong date="1300166205">6分钟前</strong></a></cite> <strong lang="CL1006">来自</strong><cite><a href="http://t.sina.com.cn" target="_blank">新浪微博</a></cite></div>
									<div class="rt"><a href="javascript:void(0);"  lastforwarder="1787217070" lastforwardername="笑话" initbloger="0"  initblogername="" onClick="App.ModForward('221110315125197701','%E3%80%90%E6%97%A5%E6%9C%AC%E9%9C%87%E5%90%8E%E6%B0%91%E4%BC%97%E8%A1%A8%E6%83%85%E3%80%913%E6%9C%8814%E6%97%A5%EF%BC%8C%E6%97%A5%E6%9C%AC%E4%BA%8C%E6%9C%AC%E6%9D%BE%E5%B8%82%E5%8F%97%E5%88%B0%E9%AB%98%E7%BA%A7%E5%88%AB%E6%94%BE%E5%B0%84%E7%BA%BF%E7%9A%84%E5%B0%91%E5%A5%B3%E8%A2%AB%E9%9A%94%E7%A6%BB%EF%BC%8C%E9%80%8F%E8%BF%87%E7%8E%BB%E7%92%83%E7%9C%8B%E7%9D%80%E8%87%AA%E5%B7%B1%E7%9A%84%E7%88%B1%E7%8A%AC%E3%80%82%3Cimg%20src%3D%22http%3A%2F%2Fimg.t.sinajs.cn%2Ft3%2Fstyle%2Fimages%2Fcommon%2Fface%2Fext%2Fnormal%2Fd8%2Fsad.gif%22%20title%3D%22%E6%B3%AA%22%20type%3D%22face%22%20%2F%3E',0,this,'num_221110315125197701','笑话','','')"><strong lang="CD0023">转发</strong><strong id="num_221110315125197701" rid="221110315125197701" type="rttCount">(8)</strong></a> <span class="MIB_line_l">|</span> <a href="javascript:void(0);" onClick="App.addfavorite_miniblog('221110315125197701');"><strong lang="CL1003">收藏</strong></a> <span class="MIB_line_l">|</span> <a id="_comment_count_miniblog2_221110315125197701" href="javascript:void(0);" onClick="scope.loadCommentByRid(1787217070, 'miniblog2', '新浪微博', '221110315125197701', '%E3%80%90%E6%97%A5%E6%9C%AC%E9%9C%87%E5%90%8E%E6%B0%91%E4%BC%97%E8%A1%A8%E6%83%85%E3%80%913%E6%9C%8814%E6%97%A5%EF%BC%8C%E6%97%A5%E6%9C%AC%E4%BA%8C%E6%9C%AC%E6%9D%BE%E5%B8%82%E5%8F%97%E5%88%B0%E9%AB%98%E7%BA%A7%E5%88%AB%E6%94%BE%E5%B0%84%E7%BA%BF%E7%9A%84%E5%B0%91%E5%A5%B3%E8%A2%AB%E9%9A%94%E7%A6%BB%EF%BC%8C%E9%80%8F%E8%BF%87%E7%8E%BB%E7%92%83%E7%9C%8B%E7%9D%80%E8%87%AA%E5%B7%B1%E7%9A%84%E7%88%B1%E7%8A%AC%E3%80%82%3Cimg%20src%3D%22http%3A%2F%2Fimg.t.sinajs.cn%2Ft3%2Fstyle%2Fimages%2Fcommon%2Fface%2Fext%2Fnormal%2Fd8%2Fsad.gif%22%20title%3D%22%E6%B3%AA%22%20type%3D%22face%22%20%2F%3E', '', '', 1, 0, 1);"><strong lang="CL1004">评论</strong><strong rid="221110315125197701" type="commtCount">(10)</strong></a> </div>
								</div>
								<div id="_comment_list_miniblog2_221110315125197701"></div>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="pages"><a href="#" class="prev2">首页</a><a href="#" class="prev">上一页</a><span class="current">[<a href="#">1</a>]</span><a href="#">2</a><a href="#">3</a><a href="#">4</a><a href="#">5</a><a href="#">6</a><a href="#">7</a><a href="#">8</a><a href="#">9</a><a href="#">10</a><a href="#" class="next">下一页</a><a href="#" class="next2">末页</a></div>
		</div>
		<div class="main_b"></div>
	</div>
<!--{include file="footer.php"}-->
