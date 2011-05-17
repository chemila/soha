$(document).ready(function(){
  var body = document.documentElement || document.body;
	var wrap_h = body.clientHeight; 
	var wrap_w = body.clientWidth; 
	$(".mod_popup_bg_cover").height(wrap_h);
	$(".mod_popup_bg_cover").width(wrap_w-20);
	$(".mod_popup_bg").height(wrap_h);
	
	$(".add_btn").click(function() {
		$(".mod_popup").fadeIn(200);
		 return false;
	});
	
	$(".upload_popup .close").click(function() {
		$(".mod_popup").fadeOut(200);
		 return false;
	});
	
  $(".wrap_bg_box").click(function() {
		$(".mod_popup").fadeIn(200);
		 return false;
	});
	
	
});

