<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Kohana translation/internationalization function. The PHP function
 * [strtr](http://php.net/strtr) is used for replacing parameters.
 *
 *    __('Welcome back, :user', array(':user' => $username));
 *
 * @param   string  text to translate
 * @param   array   values to replace in the translated text
 * @return  string
 */
function __($string, array $values = NULL)
{
	return empty($values) ? $string : strtr($string, $values);
}
