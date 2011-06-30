<!--{include file="header.php"}--> 
<script type="text/javascript" src="media/js/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="media/js/main.js"></script>
<script type='text/javascript' src='media/js/google_jsapi.js'></script>
<script type="text/javascript" src="media/js/jquery.fancybox-1.3.4.js"></script>
<link href="media/css/fancybox/main.css" rel="stylesheet" type="text/css" />
<link href="media/css/nav/main.css" rel="stylesheet" type="text/css">
</head>
<body>
<!--{include file="user/nav.php"}--> 
<div style='position:absolute;top:60px;left:0px;bottom:0px;right:0px;overflow:hidden'>
    <noscript>
        <div>正在载入演示，请注意，您需要使用 Flash 和 Javascript。如果几秒钟后仍未显示此讯息，请检查您的设置。有关更多信息，请参见<a href=/intl/help.html>帮助页面</a></div>
    </noscript>
        <object id='swfobj' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"
        width="100%" height="100%">
        <param name=movie value="media/swf/clusterBrowser.swf?q=<!--{$query|default:''}-->&version=<!--{$version|default:'user'}-->&s=<!--{$sid|default:'0'}-->">
        <param name=bgcolor value="#ffffff">
        <param name=scale value="noScale">
        <param name=salign value="TL">
        <param name=wmode value="transparent">
        <param name="allowScriptAccess" value="sameDomain">
        <embed id='swfemb' src="media/swf/clusterBrowser.swf?q=<!--{$query|default:''}-->&version=<!--{$version|default:'user'}-->&s=<!--{$sid|default:'0'}-->" scale="noScale" salign="TL" bgcolor="#ffffff" wmode="transparent" width="100%" height="100%" type="application/x-shockwave-flash" allowScriptAccess="sameDomain" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed>
    </object>
</div>
<div style="display:none;"><a id="fancy_layer" href="#inline" title=""></a></div>
<!--{include file="footer/main.php"}-->
