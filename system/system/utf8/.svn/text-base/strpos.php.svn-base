<?php defined('SYSPATH') or die('No direct script access.');
/**
 * UTF8::strpos
 *
 */
function _strpos($str, $search, $offset = 0)
{
	$offset = (int) $offset;

	if (UTF8::is_ascii($str) AND UTF8::is_ascii($search))
		return strpos($str, $search, $offset);

	if ($offset == 0)
	{
		$array = explode($search, $str, 2);
		return isset($array[1]) ? UTF8::strlen($array[0]) : FALSE;
	}

	$str = UTF8::substr($str, $offset);
	$pos = UTF8::strpos($str, $search);
	return ($pos === FALSE) ? FALSE : $pos + $offset;
}
