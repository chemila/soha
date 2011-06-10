<!--{include file="header.php"}-->
<style type="text/css">
	/*20110607 by kgy*/
	.lead_page{ width:800px; }
	.lead_page .l_top{ display:block; height:9px; clear:both; overflow:hidden; background:url(media/img/load_line.png) no-repeat}
	.lead_page .l_box{ min-height:670px;_height:670px; background:url(media/img/load_line.png) -803px 0 repeat-y;}
	.lead_page .l_bottom{ display:block; height:9px; clear:both; overflow:hidden; background:url(media/img/load_line.png) -1605px 0 no-repeat;}
	.lead_page .lead_loop,.lead_page .lead_loop2,.lead_page .lead_loop3{ display:block; margin:0 auto; width:787px; height:36px; background:url(media/img/loop_bg.png) no-repeat;}
	.lead_page .lead_loop{ background-position:0 -60px}
	.lead_page .lead_loop2{ background-position:0 -105px}
	.lead_page .lead_loop3{ background-position:0 -149px}
	.lead_contan{ width:778px; margin:18px auto 0 auto; background:url(media/img/t_bg.png) top left no-repeat; text-align:center; font-size:18px; font-weight:bold; color:#6e6e6e; padding:82px 0 0 0;}
	.lead_contan p{ padding:0 0 90px 0px;}
	a.sure_l,a.no_sure_l{ margin:0 30px; float:left; width:153px; height:46px; background:url(media/img/loop_bg.png) no-repeat; text-indent:-9999px;}
	a.sure_l{ margin:0 30px 0 200px;}
	a.no_sure_l{ background-position:-165px 0;}
	/*list*/
	.lead_list{ padding:36px 40px;}
	.lead_list h3{ line-height:26px; border-bottom:1px solid #d19dbf; font-size:16px; color:#92178c; font-weight:bold;}
	.lead_list ul li{ float:left; border-bottom:1px  dashed #9f9f9f;  padding:18px 0 15px 0;}
	.lead_per{ width:360px; float:left;}
	.lead_per .select{ width:24px; float:left; padding:21px 0 0 0;}
	.lead_per .select input{ border:0;}
	.lead_per .l_comment{ margin-left:87px;}
	.lead_per .picborder_l{ float:left;}
	.lead_per .MIB_btn2{ padding:0 10px 0 20px; margin-right:50px;}
    .lead_list .btn_lead{ padding:7px 0 0 14px; margin-top:20px; height:47px; background-color:#f5eef5; clear:both; overflow:hidden;}
	.lead_list .btn_lead a{ display:block; width:154px; height:46px; background:url(media/img/loop_bg.png) -331px 0 no-repeat; text-indent:-99999px;}
</style>
<body>
<div id="wrap_blog">
    <!--{include file="header/top.php"}--> 
	<div class="lead_page">
		<span class="l_top"></span>
		<div class="l_box clearfix">
			<span class="lead_loop2"></span>
            <div class="lead_list">
            	<h3>选择明星</h3>
                <form action="person/choose" method="post" name="choose" id="choose">
                <ul  class="clearfix">
                    <!--{foreach from=$users item=user}--> 
                	<li>
                    	<div class="lead_per">
                        	<span class="select">
                                <input name="selected[]" type="checkbox" value="<!--{$user.uid}-->" checked />
                            </span>
                            <a href="home/profile/<!--{$user.uid}-->"><img class="picborder_l" uid="<!--{$user.uid}-->" title="<!--{$user.nick}-->" src="<!--{$user.portrait|fix_portrait}-->" /></a>
                            <div class="l_comment">
                                <p><a href="home/profile/<!--{$user.uid}-->"><!--{$user.nick}--></a>
                                <!--{if $user.verified|default:false}--> 
                                <img alt="" title="新浪认证" src="http://img.t.sinajs.cn/t35/style/media/img/common/transparent.gif" class="small_icon vip"></p>   
                                <!--{/if}--> 
                                <p>别名：<strong><!--{$user.domain_name}--></strong></p>
                                <p>粉丝：<strong><!--{$user.followers_count}--></strong></p>    
                             </div>
                        </div>
                    </li>
                    <!--{/foreach}--> 
                </ul>
                <p class="btn_lead">
                    <a href="javascript:;" onclick="document.getElementById('choose').submit();">导入已关注明星</a>
                </p>
                </form>
            </div>
		</div>
		<span class="l_bottom"></span>
	</div>
</div>
<!--{include file="footer.php"}--> 
<!--footer end--> 
