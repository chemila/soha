<?php
function smarty_function_time($params, &$smarty) 
{
	$time = Arr::get($params, 'time', time());
	$format = Arr::get($params, 'format', 'YmdHi');

	return date($format, $time);
}
