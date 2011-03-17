<?php defined('SYSPATH') or die('No direct script access.');
/**
 * UTF8::strlen
 *
 */
function _strlen($str)
{
	if (UTF8::is_ascii($str))
		return strlen($str);

	return strlen(utf8_decode($str));
}
