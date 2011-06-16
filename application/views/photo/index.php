<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<base href="<!--{php}-->echo URL::base(false, true);<!--{/php}-->" />
<title>photos</title>
<script type="text/javascript" src="media/js/photo.js"></script>
<link href="media/css/photo.css" rel="stylesheet" type="text/css">
</head>
<body>
<div id="header">
    <div id="header-inner">
        <div id="logo">
            <a href="/">chemila is best</a>
        </div>
        <div id="nav">
            <ul>
                <li id="nav-home" class="active"><a href="/">首页</a></li>
                <li id="nav-profile"><a href="u/chemila">我的主页</a></li>
            </ul>
        </div>
    </div>
</div>
<div id="fullscreendemo">
<strong>This site requires Flash Player 8.0 or greater</strong><br />
Please click <a href="http://www.adobe.com/products/flashplayer/">here</a> to download.<br />
<p>
email: <a href="mailto:chemila@gmail.com">chemila@gmail.com</a>
</div>
<script type="text/javascript">
//<![CDATA[
var so = new SWFObject("media/swf/photos.swf", "polaroid", "100%", "100%", "8", "#FFFFFF");
// specify the url to the xml-file, default is photos.xml
so.addVariable("xmlURL","photo/xml");
so.write("fullscreendemo");
//]]>
</script>
</body>
</html>

