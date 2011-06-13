<?php defined('SYSPATH') or die('No direct script access.');
/**
 * UTF8::ucfirst
 *
 */
function _ucfirst($str)
{
	if (UTF8::is_ascii($str))
		return ucfirst($str);

	preg_match('/^(.?)(.*)$/us', $str, $matches);
	return UTF8::strtoupper($matches[1]).$matches[2];
}
