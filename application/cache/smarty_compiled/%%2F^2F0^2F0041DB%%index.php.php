<?php /* Smarty version 2.6.26, created on 2011-06-18 23:26:36
         compiled from /home/ethan/www/t.pagodabox.com/application/views/photo/index.php */ ?>
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "header.php", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?> 
<script type="text/javascript" src="media/js/photo.js"></script>
<link href="media/css/photo.css" rel="stylesheet" type="text/css">
<link href="media/css/nav.css" rel="stylesheet" type="text/css">
</head>
<body>
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "shared/nav_1.php", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?> 
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
