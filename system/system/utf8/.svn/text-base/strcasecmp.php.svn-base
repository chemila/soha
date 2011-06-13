<?php defined('SYSPATH') or die('No direct script access.');
/**
 * UTF8::strcasecmp
 *
 */
function _strcasecmp($str1, $str2)
{
	if (UTF8::is_ascii($str1) AND UTF8::is_ascii($str2))
		return strcasecmp($str1, $str2);

	$str1 = UTF8::strtolower($str1);
	$str2 = UTF8::strtolower($str2);
	return strcmp($str1, $str2);
}
