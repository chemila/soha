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
        <!--start: header top--> 
        <!--{include file="header/top.php"}--> 
		<ul class="nav">
			<li><a href="#">微博明星(999999)</a></li>
			<li><a href="#">行业大腕(999999)</a></li>
			<li><a href="#">草根红人(999999)</a></li>
			<li><a href="#" class="current">我关注的(999999)</a></li>
		</ul>
	</div>
	<div class="main">
		<div class="main_leftimg"></div>
		<div class="main_t"></div>
		<div class="main_c"> 
            <!-- start: search --> 
			<div class="search">
                <!--{include file="search/quick.php"}--> 				
                <!--{include file="search/input.php"}--> 				
			</div>
			
			<div class="star_list">
                <!-- pagination for stars --> 
				<div class="pages">
                    <a href="#" class="prev">上一页</a><span class="current">[<a href="#">1</a>]</span><a href="#">2</a><a href="#">3</a><a href="#">4</a><a href="#">5</a><a href="#" class="next">下一页</a>
                </div>
				<ul id="scroll_star_list" class="jcarousel-skin-tango">
				
				  <!--{foreach from=$messages item=message key=index}--> 
                   <li>
                   		<!--{$message.nick}-->
                   		<!--{$message.content}-->
                   		<!--{$message.datetime|date_format:"%Y-%m-%d %H:%I:%S"}-->
                    </li>
                    <!--{foreachelse}-->
                    	无数据
                    <!--{/foreach}-->
				</ul>
			</div>
		</div>

            <!-- pagination --> 
			<div class="pages">
                <a href="#" class="prev2">首页</a><a href="#" class="prev">上一页</a><span class="current">[<a href="#">1</a>]</span><a href="#">2</a><a href="#">3</a><a href="#">4</a><a href="#">5</a><a href="#">6</a><a href="#">7</a><a href="#">8</a><a href="#">9</a><a href="#">10</a><a href="#" class="next">下一页</a><a href="#" class="next2">末页</a>
            </div>
		</div>
		<div class="main_b"></div>
	</div>
<!--{include file="footer.php"}-->

