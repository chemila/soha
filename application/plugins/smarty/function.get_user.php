<?php
/**
 * Smarty __ plugin
 *
 * Type:     function
 * Name:     find_file
 *
 * @param  array   ['dir'] - the text to translate
 *                 ['file'] - the language the text is in
 *                 ['ext']  - the value of the variable $key to substitute
 *                            :$key in the string
 * @param  Smarty
 * @return string  The translation (and substitution) of the string
 */
function smarty_function_get_user($params, &$smarty) 
{
    if( ! isset($params['uid']))
    {
        return;
    }

    $cache = Cache::instance();

    if( ! $user = Cache::get('user:'.$params['uid']))
    {
        $user = new model_user($params['uid']);
        $user->load();
        $user = $user->as_array();

        $cache->set('user:'.$params['uid'], $user);
    }

    if( ! isset($params['attr']))
    {
        return arr::get($user, $params['attr'], array());
    }

    return arr::get($user, $params['attr'], '');
}



