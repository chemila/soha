<?php defined('SYSPATH') or die('No direct script access.');
/**
 * UTF8::trim
 *
 */
function _trim($str, $charlist = NULL)
{
	if ($charlist === NULL)
		return trim($str);

	return UTF8::ltrim(UTF8::rtrim($str, $charlist), $charlist);
}
