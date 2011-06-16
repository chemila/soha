<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<base href="<!--{php}-->echo URL::base(false, true);<!--{/php}-->" />
<title>photos</title>
<script type="text/javascript" src="media/js/swfobject.js"></script>
<style type="text/css">
/* CSS For Polaroid Gallery */
html, body {
    height:100%;
    width:100%;
    margin:0;
    color:#4a4d50;
    background:#e8eae6;
}
a {
    color:#333333;
    font-weight:bold;
    text-decoration:none;
}
h1 {
    font-size:30px;
    margin:15px 0 5px 0;
}
h2 {
    font-size:16px;
    border-bottom:1px solid #979a9d;
    margin:0 0 2px 0;
}
p {
    margin:4px 0 10px 0;
    font-size:10px;
}
#wrapper {
    margin:0 auto;
    width:815px;
}
#header {
    border-top:5px solid #4a4d50;
    border-bottom:1px solid #4a4d50;
    margin:0 0 15px 0;
}
#demo {
    height:600px;
    width:600px;
    margin:0 15px 0 0;
}
#flickr {
    background:url(flickr.gif) no-repeat;
    padding:0 0 0 110px;
    margin:5px 0 0 0;
}
#fullscreendemo {
    height:100%;
    width:100%;
}
#left {
    float:left;
    width:600px;
}
#right {
    width:200px;
    float:right;
}
ul {
    margin:0;
    padding:0;
    margin:4px 0 10px 0;
}
ul ul {
    padding: 0 0 0 20px;
    margin:0;
}
li {
    font-style:italic;
    list-style:none;
    font-weight:bold;
}
li li {
    font-style:normal;
    list-style:circle;
    margin:5px 0 0 0;
    font-weight:normal;
}
</style> 
</head>

<body>
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

