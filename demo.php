<?php
	$url = "http://10.207.10.242/pin_user/api/user/".$_SERVER['argv'][1];

	$post_data = $_SERVER['argv'][2];

         $ch = curl_init();
         curl_setopt($ch, CURLOPT_URL, $url);
         curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
         curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);

         if(!empty($cookie)) curl_setopt($ch, CURLOPT_COOKIE, $cookie);
         if(!empty($post_data)) curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
         if(!empty($refer)) curl_setopt($ch, CURLOPT_REFERER, $refer);

         $response = curl_exec($ch);
         curl_close($ch);

         echo "\n".$response."\n\n";
?>
