<?php /* Smarty version 2.6.26, created on 2011-06-13 14:50:55
         compiled from /home/ethan/www/t.pagodabox.com/application/views/error/index.php */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'default', '/home/ethan/www/t.pagodabox.com/application/views/error/index.php', 11, false),)), $this); ?>
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "header.php", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
</head>
<body>
<div id="wrap_blog">
	<div class="mxk_header">
        <!--start: header top--> 
        <?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "header/top.php", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?> 
	</div>
	<div class="clearfix help_center">
		<div class="main_blog_top">
			<div class="blog_title"><span class="f20"><?php echo ((is_array($_tmp=@$this->_tpl_vars['message'])) ? $this->_run_mod_handler('default', true, $_tmp, '错误提示') : smarty_modifier_default($_tmp, '错误提示')); ?>
</span></div>
		</div>
		
				<div class="error">
					<div class="title">
                        <img class="PY_ib PY_ib_1" src="media/img/common/PY_ib.gif">
                        <?php echo ((is_array($_tmp=@$this->_tpl_vars['message'])) ? $this->_run_mod_handler('default', true, $_tmp, '抱歉你所访问的内容不存在') : smarty_modifier_default($_tmp, '抱歉你所访问的内容不存在')); ?>
。</div>
					<div class="con">
		                <p class="con_mtop"><em id="timeout">5</em>秒之后页面自动跳转，你还可以：</p>
		                <p><span class="rank">1</span><a href="/star">返回首页</a></p>
		                <p><span class="rank">2</span>去其它地方逛逛&nbsp;&nbsp;<a href="home">我的首页</a> | <a href="home/profile">我的微博</a> | <a href="message">我的私信</a> | <a href="attention">我的关注</a></p>
		            </div> 
				</div>
			
		<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
	</div>
    <!--
	<script type="text/javascript">
		var timeout = 10;
		var timeouthandle = setInterval(function(){
			timeout--;
			if(timeout <= 0){
				clearInterval(timeouthandle);
				window.location.replace('/star');
				return;
			}
			document.getElementById('timeout').innerHTML = timeout;
		}, 1000);
	
	</script>
    -->
	
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "footer.php", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>