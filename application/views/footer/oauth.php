<!--footer start-->
</div>
<script type="text/javascript">
var $CONFIG = {
    $lang			: "zh",
    $oid			: "<!--{$current_user|default:0}-->",
    $uid			: "<!--{$current_user|default:0}-->",
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
		var TrayUID = <!--{$current_user|default:0}-->;
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
