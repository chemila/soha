<?php defined('SYSPATH') or die('No direct script access.');
/**
 * UTF8::rtrim
 *
 */
function _rtrim($str, $charlist = NULL)
{
	if ($charlist === NULL)
		return rtrim($str);

	if (UTF8::is_ascii($charlist))
		return rtrim($str, $charlist);

	$charlist = preg_replace('#[-\[\]:\\\\^/]#', '\\\\$0', $charlist);

	return preg_replace('/['.$charlist.']++$/uD', '', $str);
}
