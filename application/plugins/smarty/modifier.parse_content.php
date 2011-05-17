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
	$content = strip_tags($content);
    $pattern_face = '~\[(.+?)\]~s';
    $content = preg_replace('~http://([\w\.&\?/=]+)~iu', '<a href="http://\\1" target="new">http://\\1</a>', $content);
    
    if(preg_match_all($pattern_face, $content, $match))
    {
        $config = Core::config('face');
        $replace = array();

        foreach($match[1] as $face)
        {
            $src = $config->get($face, '/media/img/face/default.gif');
            $replace["[$face]"] = sprintf('<img src="%s" title="%s" type="face">', $src, $face);
        }
        
        $content = strtr($content, $replace);
    }

    $pattern = '~@([\x{4e00}-\x{9fa5}\w]+)~su';
    if($with_user and preg_match_all($pattern, $content, $match))
    {
    	if(count($match[1]))
    	{
    		array_unique($match[1]);
    		
		    $user = New Model_User;
    		foreach ($match[1] as $key => $nick)
    		{
		        $nick = strip_tags($nick);
		
		        try
		        {
		            $uid = $user->get_uid($nick);
		        }
		        catch(Model_API_Exception $e)
		        {
		            $uid = NULL;
		        }
		        
		        $content = preg_replace('~@'.$nick.'~su', sprintf('<a href="/home/profile/%d" namecard="true" uid="%d">@%s</a>', $uid, $uid, $nick), $content);
    		}
    	}
    }

    return $content;
}
