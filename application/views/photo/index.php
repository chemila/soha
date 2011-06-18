<!--{include file="header.php"}--> 
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
    var page = 1;
    show(page);

    function show(page) {
        if(page < 0) return;
        // specify the url to the xml-file, default is photos.xml
        so.addVariable("xmlURL","photo/xml/" + page);
        so.write("photos");
    }
    
    function weibo(json) {
        alert(json.content);
    }
    //]]>
</script>
</body>
</html>

