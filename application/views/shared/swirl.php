<!--{include file="header.php"}--> 
<script src='media/js/compiled-history.js'></script>
</head>
<body style='margin:0px'>
<div id="overwrite">
    <span>Search User:</span>
</div>
<div id="search_user"></div>
<div style='position:absolute;top:0px;left:0px;bottom:0px;right:0px;overflow:hidden'>
    <object id='swfobj' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"
        width="100%" height="100%">
        <param name=movie value="clusterBrowser.swf?q=<!--{$name|default:''}-->&version=<!--{$version|default:'0'}-->&s=<!--{$type|default:'user'}-->">
        <param name=bgcolor value="#ffffff">
        <param name=scale value="noScale">
        <param name=salign value="TL">
        <param name=wmode value="transparent">
        <param name="allowScriptAccess" value="sameDomain">
        <embed id='swfemb' src="media/swf/clusterBrowser.swf?q=<!--{$name|default:''}-->&version=<!--{$version|default:'0'}-->&s=<!--{$type|default:'user'}-->"
           scale="noScale"
           salign="TL"
           bgcolor="#ffffff"
           wmode="transparent"
           width="100%" height="100%"
           type="application/x-shockwave-flash"
           allowScriptAccess="sameDomain"
           pluginspage="http://www.macromedia.com/go/getflashplayer">
        </embed>
    </object>
</div>
</body>
</html>
