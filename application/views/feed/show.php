<!--{include file="header.php"}-->
<script type="text/javascript" src="media/js/photo.js"></script>
<script type="text/javascript" src="media/js/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="media/js/jquery.overlay.js"></script>
<script type="text/javascript" src="media/js/jquery.jshowoff.min.js"></script>
<script type="text/javascript" src="media/js/jquery.imagescale.js"></script>
<link rel="stylesheet" href="media/css/jshowoff.css" type="text/css" media="screen, projection" />
<body>
<div id="slidingFeatures">
    <div title="image" id="photo_container"> 
        <img src="<!--{$src}-->" alt="<!--{$weibo.content|truncate}-->" />
    </div>
    <div title="Content"><p><!--{$weibo.content}--></p></div>    
    <div title="User"><a href="http://gmail.com"><img src="<!--{$weibo.user.portrait}-->" alt="<!--{$weibo.user.nick}-->" /></a></div>
</div>
<script type="text/javascript">     
    $(document).ready(function(){ 
        $('#slidingFeatures').jshowoff({
            effect: 'fade',
            autoPlay: false,
            controls: true,
            controlText:{play:'Play',pause:'Pause',previous:'Previous',next:'Next'},
            hoverPause: false 
        }); 

        $("#photo_container").isc({
            imgArray: ['<!--{$src}-->']
        });	
    });
</script>
</body>
</html>
