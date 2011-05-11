<html> 
<head> 
<script type="text/javascript"> 
/** parse location.search to an Object **/
 
var queryToJson = function(QS,isDecode){
    var _Qlist = QS.split("&");
    var _json = {};
    for(var i = 0, len = _Qlist.length; i < len; i++){
        var _hsh = _Qlist[i].split("=");
        if(!_json[_hsh[0]]){
            _json[_hsh[0]] = _hsh[1];
        }else{
            _json[_hsh[0]] = [_hsh[1]].concat(_json[_hsh[0]]);
        }
    }
    return _json;
};

var loc = window.location.search + '&pid=<!--{$filename}-->';
var res = queryToJson(loc.slice(1),true);
if(window.parent){
    if(res.domain)
        document.domain="dev.pin.com";
    window.parent.scope.addImgSuccess(res);
}
</script> 
</head> 
<body> 
</body> 
</html> 
