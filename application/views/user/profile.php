<!--{include file="header.php"}--> 
<script type="text/javascript" src="media/js/photo.js"></script>
<script type="text/javascript" src="media/js/jquery-1.4.2.min.js"></script>
<script type='text/javascript' src='media/js/google_jsapi.js'></script>
<script type="text/javascript" src="media/js/jquery.fancybox-1.3.4.js"></script>
<script type="text/javascript" src="media/js/fancy.js"></script>
<link href="media/css/fancybox/main.css" rel="stylesheet" type="text/css" />
<link href="media/css/photo.css" rel="stylesheet" type="text/css">
<link href="media/css/nav/main.css" rel="stylesheet" type="text/css">
</head>
<body>
<!--{include file="user/nav.php"}--> 
<div id="photos">
    <strong>This site requires Flash Player 8.0 or greater</strong><br />
    Please click <a href="http://www.adobe.com/products/flashplayer/">here</a> to download.<br />
    <p>
    email: <a href="mailto:chemila@gmail.com">chemila@gmail.com</a>
</div>
<div style="display:none;"><a id="fancy_layer" href="#inline" title=""></a></div>
<script type="text/javascript">
    showVisual({type: 'profile', uid: <!--{$uid|default:0}-->});
</script>
<!--{include file="footer/main.php"}-->
