<?php
/**
 * Smarty parse_content modifier plugin
 *
 * Type:     modifier<br>
 * Name:     parse_content<br>
 * Purpose:  formats variable contents for display in the console
 * @param content|String
 * @param with_user|Bool
 * @return string
 */
function smarty_modifier_parse_content($content, $with_user = TRUE) {
    $pattern_face = '~\[(.+?)\]~s';
    if(preg_match_all($pattern_face, $content, $match))
    {
        $config = Core::config('face');
        $replace = array();

        foreach($match[1] as $face)
        {
            if($config->offsetExists($face))
            {
                $src = $config->get($face);
                $replace["[$face]"] = sprintf('<img src="%s" title="%s" type="face">', $src, $face);
            }
        }
        
        $content = strtr($content, $replace);
    }

    $pattern = '~@([^\s:：]+)~su';
    if($with_user and preg_match($pattern, $content, $match))
    {
        $nick = $match[1];
        $user = New Model_User;

        try
        {
            $uid = $user->get_uid($nick);

            if($uid)
            {
                $content = preg_replace($pattern, sprintf('<a href="/home/profile/%d" namecard="true" uid="%d" action-type="namecard" action-data="uid=%d&amp;name=@%s&amp;reason=&amp;type=&amp;direction=auto&amp;urltype=usercard&amp;param=type###uid###name###reason">@%s</a>', $uid, $uid, $uid, $nick, $nick), $content);
            }
        }
        catch(Model_API_Exception $e){}
    }

    return $content;
}
