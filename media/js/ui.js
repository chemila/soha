$(document).ready(function(){
//popup
	var wrap_h =$(document).height(); 
	var wrap_w =$(document).width(); 
	$(".mod_popup_bg_cover").height(wrap_h);
	$(".mod_popup_bg_cover").width(wrap_w-20);
	$(".mod_popup_bg").height(wrap_h);
	
///
	$(".add_btn").click(function() {
		$(".mod_popup").fadeIn(200);
		 return false;
	});
	
	$(".upload_popup .close").click(function() {
		$(".mod_popup").fadeOut(200);
		 return false;
	});
	
	
});

//ÏÂÀ­ËÑË÷¿ò
$(function(){
		   
	$(".select")
	.click(function(event){
		$(".super_select").fadeOut(200);
		$(this).children(".super_select").show();
	});
	
	$(".super_select a").click(function(event){
		var selected = $(this).text()
		$(this).parents(".super_select").fadeOut(200);
		$(this).parents(".super_select").siblings(".btn").text(selected);
		return false;
	});

	$(document).mouseup(function(event){
		$(".super_select").fadeOut(200);
	});

 }); 