<?php defined('SYSPATH') or die('No direct script access.');
/**
 * UTF8::strrev
 *
 */
function _strrev($str)
{
	if (UTF8::is_ascii($str))
		return strrev($str);

	preg_match_all('/./us', $str, $matches);
	return implode('', array_reverse($matches[0]));
}
