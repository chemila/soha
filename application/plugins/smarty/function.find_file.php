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
function smarty_function_find_file($params, &$smarty) 
{
    if(empty($params['dir']))
    {
        $smarty->trigger_error('dir is required');
    }

    if(empty($params['file']))
    {
        $smarty->trigger_error('file is required');
    }

    if(empty($params['ext']))
    {
        $params['ext'] = 'php';
    }
    
    return Core::find_file($params['dir'], $params['file'], $params['ext'], false);
}

