<!--{include file="header.php"}--> 
<link href="media/css/404.css" rel="stylesheet" type="text/css">
</head>
<body>
<div class="wrapper">
    <h1><a href="javascript:;"><span>Error</span></a></h1>
    <div class="box">
        <div class="corner tl"></div>
        <div class="corner tr"></div>
        <div class="header">
            <h2>Oops, some error happens</h2>
            <!--{if $error}--> 
            <img src="media/img/icon/warning-y16.png" alt="error" />
            <!--{/if}--> 
            <span style="margin:0 5px;"><font color="red"><!--{$error|default:''}--></font></span>
        </div>
        <div class="content">
            <div class="picture"></div>
            <hr />
            <p><a href="auth">Log in</a> | <a href="mailto:chemila@gmail.com">Email me</a></p>
        </div>
        <div class="corner bl"></div>
        <div class="corner br"></div>
    </div>
</div>
</body>
</html>
