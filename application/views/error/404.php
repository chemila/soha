<!--{include file="header.php"}--> 
<style>
.persistent {
    margin: 0;
    padding: 15px 0 15px 60px;
    width: auto;
    position: relative;
    text-align: center;
}
.persistent.failure {
    color: white;
    background: url('media/img/error/persistent-red.png') repeat;
    -moz-box-shadow: 0px 2px 6px #666 inset;
    -webkit-box-shadow: 0px 2px 6px #666 inset;
    box-shadow: 0px 2px 6px #666 inset;
}
</style>
</head>
<body>
<!--{if $error}--> 
<div class="failure persistent">
    <span class="sprite icon"></span>
    <p><!--{$error}--></p>
</div>
<!--{/if}--> 
<table width="100%" border="0" cellspacing="0" cellpadding="0" height="70%">
    <tr align="center" valign="bottom"> 
        <td>
            <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=4,0,2,0" width="600" height="400" align="top">
            <param name=movie value="fuckoff3.swf">
            <param name=quality value=high><param name="SCALE" value="exactfit"><param name="LOOP" value="false">
            <embed src="media/swf/fuckoff3.swf" quality=high pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="600" height="400" scale="exactfit" loop="false" align="top">
            </embed> 
            </object>
        </td>
    </tr>
</table>
<div class="content" style="text-align:center;margin-top:10px;">
    <a href="auth">Log in</a> | 
    <a href="mailto:chemila@gmail.com">Email me</a> 
</div>
</body>
</html>
