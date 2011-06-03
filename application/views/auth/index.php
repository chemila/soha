<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html>
<head> 
<base href="<!--{php}-->echo URL::base(false, true);<!--{/php}-->" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>明星控</title>
<link href="media/css/index.css" type="text/css" rel="stylesheet" />
<link href="media/css/base.css" rel="stylesheet" type="text/cs">
<link href="media/css/style.css" rel="stylesheet" type="text/css">
<link href="media/css/pub.css" rel="stylesheet" type="text/css">
<link href="media/css/jCarousel/skin.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="media/js/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="media/js/ui.js"></script>
<script type="text/javascript" src="media/js/select_split.js"></script>
<!--header end-->
<body>

<script>
function login()
{
	document.location.href="auth/login/"+$("#source").val();
}
function selFunc(){
	$("#selText").text($("#source").val())
}
</script>
<div id="wrap_blog">
  <a class="wrap_bg_box" href="javascript:onclick=login();"></a>
	<p class="add"><a href="" class="add_btn">加入我们</a></p>
</div>
<div class="mod_popup" style="display:none;">
		<div class="mod_popup_bg"></div>
		<iframe class="mod_popup_bg_cover"></iframe>
		<div class="upload_popup">
			<div class="upload_popup_t"><a href="#" class="close"></a></div>
			<p>请选择微博帐号登录:</p>
			<div class="select">
				<select onchange='selFunc()' id="source">
					<option value="sina">新浪微博</option>
					<option value="qq">腾讯微博</option>
					<option value="sohu">搜狐微博</option>
					<option value="163">网易微博</option>
				</select>
			</div>
			<a href="javascript:onclick=login();" class="go">go</a>
		</div>
	</div>
</body>
</html>
