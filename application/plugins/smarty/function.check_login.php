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
function smarty_function_check_login($params, &$smarty) 
{
    // Check session or cookie whether user info exists
    $session = Session::instance();

    if($uid = $session->get('uid'))
    {
        return '<a href="#">已授权</a> 您已开通微博授权应';
    }

    return '<a href="/auth/login">未授权</a> 请先认证';
}


