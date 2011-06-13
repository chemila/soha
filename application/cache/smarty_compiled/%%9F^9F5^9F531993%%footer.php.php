<?php /* Smarty version 2.6.26, created on 2011-06-13 14:47:27
         compiled from footer.php */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'default', 'footer.php', 6, false),)), $this); ?>
<!--footer start-->
</div>
<script type="text/javascript">
var $CONFIG = {
    $lang			: "zh",
    $oid			: "<?php echo ((is_array($_tmp=@$this->_tpl_vars['current_user'])) ? $this->_run_mod_handler('default', true, $_tmp, 0) : smarty_modifier_default($_tmp, 0)); ?>
",
    $uid			: "<?php echo ((is_array($_tmp=@$this->_tpl_vars['current_user'])) ? $this->_run_mod_handler('default', true, $_tmp, 0) : smarty_modifier_default($_tmp, 0)); ?>
",
    $severtime		: "",
    $token			: "",
    $product		: "",
    $pageid			: "", 
    $cuser_status	: "",
    $skin			: "",
    $domain         : "",
    $FW			    : ""
};
var scope = $CONFIG;
    scope.$totalnum       = "500";
    scope.groupList = []; // 关注人分组信息
    scope.dosplitload = 1;
</script>
<script type="text/javascript" src="media/js/lang_zh.js"></script>
<script type="text/javascript" src="media/js/myprofile.js"></script>

<script type="text/javascript"> 
	(function() {
		var TrayUserName = 'chemila';
		var TrayUID = <?php echo ((is_array($_tmp=@$this->_tpl_vars['current_user'])) ? $this->_run_mod_handler('default', true, $_tmp, 0) : smarty_modifier_default($_tmp, 0)); ?>
;
		var TrayLogin = TrayUID;
		var TrayCONFIG = {};
		TrayCONFIG['uid'] = TrayUID;
		TrayCONFIG['name'] = TrayUserName;
		TrayCONFIG['isLogin'] = TrayLogin;
		typeof(WBTopTray)!='undefined'&&WBTopTray.init(TrayCONFIG);
	})();
</script> 
<style>
.magic{display:none!important;}
</style>
</body>
</html>
<!--footer end-->