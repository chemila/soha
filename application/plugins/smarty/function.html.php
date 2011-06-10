<?php
/**
 * Smarty __ plugin
 *
 * Type:     function
 * Name:     html
 *
 * @param  array   ['tag'] - the tag name to be compared
 *                 ['attributes'] - the attributes name
 * @param  Smarty
 * @return string  The translation (and substitution) of the string
 */
function smarty_function_html($params, &$smarty) 
{
    $method = $params['tag'];
    unset($params['tag']);

    if('a' == $method)
    {
        $method = 'anchor';
    }

    if( ! in_array($method, array('anchor', 'image', 'style', 'script')))
        return '';

    if('anchor' == $method)
    {
        $uri = $params['uri'];
        $title = Arr::get($params, 'title', '');

        unset($params['uri'], $params['title']);
        return HTML::$method($uri, $title, $params);
    }

    $file = $params['file'];
    unset($params['file']);

    return HTML::$method($file, $params);
}
