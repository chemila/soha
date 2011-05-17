<?php
function smarty_modifier_fix_portrait($url, $type = 'small')
{
    if(empty($url))
        return '/media/img/portrait/default.gif';

    $map = array(
        'small' => '50',
        'm' => '50',
        'origin' => '180',
        'large' => '180',
    );

    if(is_int($type))
    {
        $size = (int)$type;
    }
    else
    {
        $size = $map[$type];
    }

    $url_info = parse_url($url);

    //http://app.qlogo.cn/mbloghead/591dc79542b72247b080/
    //if(preg_match('~^http://app\.qlogo\.cn/mbloghead/\w+/?$~', $url, $match))
    if(strpos($url_info['host'], "qlogo.cn"))
    {
        $url = rtrim($url, '/').'/'.$size;
    }
    //http://tp2.sinaimg.cn/1282005885/50/1290884345/1
    //elseif(preg_match('~^http://\w+\.sinaimg\.cn~', $url, $match))
    elseif(strpos($url_info['host'], "sinaimg.cn"))
    {
        $url = preg_replace('~http://(\w+)\.sinaimg\.cn/(\w+)/\d+/(\w+)/(\d+)/?$~i', 
                'http://\\1.sinaimg.cn/\\2/'.$size.'/\\3/\\4', $url);
    }
    //http://s4.cr.itc.cn/mblog/icon/00/ec/m_13031059556067.jpg
    //elseif(preg_match('~^http://\w+.\w+\.itc\.cn~', $url, $match))
    elseif(strpos($url_info['host'], "cr.itc.cn"))
    {
        if(50 != $size)
        {
    	    $url = preg_replace('~http://(\w+)\.(\w+)\.itc\.cn/(\w+)/(\w+)/(\w+)/(\w+)/m_(\w+)~i',
                'http://\\1.\\2.itc.cn/\\3/\\4/\\5/\\6/\\7', $url);
        }
    }
    //http://oimagec1.ydstatic.com/image?w=48&h=48&url=http%3A%2F%2F126.fm%2F2y8Xi5
    //elseif(preg_match('~^http://\w+\.ydstatic\.com~', $url, $match))
    elseif(strpos($url_info['host'], "ydstatic.com"))
    {
    	$query = str_replace("=48", "=180", $url_info['query']);
    	$url = $url_info['scheme']."://".$url_info['host']."".$url_info['path']."?".$query;
    }
	
    return $url;
}
?>


