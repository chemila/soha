<!--{include file="header.php"}--> 
<script type="text/javascript" src="media/js/photo.js"></script>
<script type="text/javascript" src="media/js/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="media/js/jquery.fancybox-1.3.4.js"></script>
<link rel="stylesheet" href="media/css/fancybox/main.css" type="text/css" media="screen" />
<link href="media/css/photo.css" rel="stylesheet" type="text/css">
<link href="media/css/nav/main.css" rel="stylesheet" type="text/css">
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
        $('#photos').hide();
        //$("#weibo_container").show();

        $('#weibo').attr('title', json.content);
        $('#weibo').attr('href', json.image);

        //$('#weibo_image').attr('src', json.image);
        //$('#weibo_image').attr('alt', json.content);

        $('#weibo').trigger('click');
    }

	$(document).ready(function() {
        $("#weibo").fancybox({
            /**
            'titlePosition'		: 'outside',
            'scrolling' : 'yes',
            **/
            'scrolling' : 'no',
            'titlePosition'		: 'inside',
            'showCloseButton' : true,
            'overlayColor'		: '#E8EAE6',
            'overlayOpacity'	: 0.9,
            'onClosed'      : function() {
                $("#photos").show();
            }
        });
    });
    //]]>
</script>
<div id="weibo_container" style="display:none;">
    <a id="weibo" href="#inline" title=""></a>
</div>
</body>
</html>

