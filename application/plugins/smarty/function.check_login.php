<?php
/**
 * Smarty check_login plugin
 *
 * Type:     function
 * Name:     check_login
 *
 * @param  Smarty
 * @return string  The translation (and substitution) of the string
 */
function smarty_function_check_login($params, &$smarty) 
{
    // Check session or cookie whether user info exists
    $su = Cookie::get(Controller_Auth::COOKIE_NAME, false);
    $result = '<a href="/auth/login">未授权</a> 请先认证';

    if($su)
    {
        preg_match('~^sid=(\w+);uid=(\d+)$~', $su, $match);

        if($match)
        {
            $result = '<a href="/auth/logout">退出</a> 您已授权微博应用';
        }
    }

    return $result;
}


