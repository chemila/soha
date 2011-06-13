<?php defined('SYSPATH') or die('No direct script access.');

abstract class OAuth_Request extends Kohana_OAuth_Request {  

	public function nonce()
	{
        $mt = microtime();
        $rand = mt_rand();

        return md5($mt . $rand);
	}

    public function make_boundary(Array $params)
    {
        self::$boundary = $boundary = uniqid('------------------');
        uksort($params, 'strcmp'); 
		$MPboundary = '--'.$boundary;
		$endMPboundary = $MPboundary. '--';
		$multipartbody = '';

        foreach ($params as $parameter => $value) 
        {
            if(in_array($parameter, array('pic', 'image')) and '@' == $value{0})
            {
                $url = ltrim($value , '@');
                $content = @file_get_contents($url);
                if(empty($content))
                {
                    return false;
                }
                $filename = @reset(@explode('?', basename($url)));
                $extension = strtolower(pathinfo($url, PATHINFO_EXTENSION));
                $mime = 'image/'.('jpeg' == $extension ? 'jpg' : $extension) ;
                
                $multipartbody .= $MPboundary."\r\n";
                $multipartbody .= 'Content-Disposition: form-data; name="'.$parameter.'"; filename="'.$filename . '"'. "\r\n";
                $multipartbody .= 'Content-Type: '.$mime."\r\n\r\n";
                $multipartbody .= $content."\r\n";
            }
            else
            {
                $multipartbody .= $MPboundary."\r\n";
                $multipartbody .= 'content-disposition: form-data; name="'.$parameter."\"\r\n\r\n";
                $multipartbody .= $value."\r\n";
            }    
        } 
        
        $multipartbody .=  $endMPboundary;

        return $multipartbody; 
    }
}
