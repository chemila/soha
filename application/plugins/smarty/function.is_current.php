<?php
/**
 * Smarty __ plugin
 *
 * Type:     function
 * Name:     find_file
 *
 * @param  array   ['uri'] - the controller name to be compared
 *                 ['class'] - the current class name
 * @param  Smarty
 * @return string  The translation (and substitution) of the string
 */
function smarty_function_is_current($params, &$smarty) 
{
    $uri = Arr::get($params, 'uri', '/');

    if($uri == '/')
    {
        $uri = 'public';
    }

    if($uri and $uri == substr(Request::detect_uri(), -1 * strlen($uri)))
        return sprintf('class="%s"', Arr::get($params, 'class', 'current'));
}
