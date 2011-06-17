<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<base href="<!--{php}-->echo URL::base(false, true);<!--{/php}-->" />
<title>photos</title>
<script type="text/javascript" src="media/js/photo.js"></script>
<link href="media/css/photo.css" rel="stylesheet" type="text/css">
<link href="media/css/nav.css" rel="stylesheet" type="text/css">
</head>
<body>
<!--{include file="shared/nav_1.php"}--> 
<div id="photos">
    <strong>This site requires Flash Player 8.0 or greater</strong><br />
    Please click <a href="http://www.adobe.com/products/flashplayer/">here</a> to download.<br />
    <p>
    email: <a href="mailto:chemila@gmail.com">chemila@gmail.com</a>
</div>
<script type="text/javascript">
    //<![CDATA[
    var so = new SWFObject("media/swf/photos.swf", "polaroid", "100%", "100%", "8", "#FFFFFF");
    var count = 20;
    show(count);

    function show(cnt) {
        cnt = Math.ceil(cnt);
        // specify the url to the xml-file, default is photos.xml
        so.addVariable("xmlURL","photo/xml?cnt=" + cnt);
        so.write("photos");
    }
    //]]>
</script>
</body>
</html>

