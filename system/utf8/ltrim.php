<?php defined('SYSPATH') or die('No direct script access.');
/**
 * UTF8::ltrim
 */
function _ltrim($str, $charlist = NULL)
{
	if ($charlist === NULL)
		return ltrim($str);

	if (UTF8::is_ascii($charlist))
		return ltrim($str, $charlist);

	$charlist = preg_replace('#[-\[\]:\\\\^/]#', '\\\\$0', $charlist);

	return preg_replace('/^['.$charlist.']+/u', '', $str);
}
