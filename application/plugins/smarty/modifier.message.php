<?php
function smarty_modifier_message($key, $group)
{
    if(empty($group) or ! isset($key))
    {
        return '';
    }

    if(strpos($group, '.'))
    {
        list($file, $path) = explode('.', $group, 2);
    }
    else
    {
        $file = $group;
        $path = $key;
    }

    $message = core::message($file, $path);

    if( ! $message)
    {
        return '';
    }

    return Arr::get($message, $key, '');
}
?>
