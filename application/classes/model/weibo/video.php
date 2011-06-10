<?php defined('SYSPATH') or die('No direct script access.');

class Model_Weibo_Video extends Model_Weibo {
    public static $supported_hosts = array(
        'sina.com.cn',
        'tudou.com',
        'youku.com',
        'ku6.com',
        '56.com',
    );

    public function get_media_data()
    {
        $this->_load();
        $data = unserialize($this->media_data);

        return array(
            'src' => $data['video']['src'],       
        );
    }

    public function set_media_data(Array $data)
    {
        if($file = self::upload($data))
        {
            $this->media_data = serialize(array(
                'video' => array(
                    'src' => $file,
                ),                
            ));
        }

        return $this;
    }

    public static function upload(Array $data)
    {
        // TODO: Upload video from local file
        // Currently only upload video from remote is supported 
        if( ! isset($data['src']))
            return false;

        //http://player.ku6.com/refer/fk9F1i_1H52WdBHb/v.swf
        //http://player.56.com/v_NTk5NjM2ODU.swf
        $tmp = parse_url($data['src']);

        $valid_host = false;
        foreach(self::$supported_hosts as $host)
        {
            if(strpos($host, $tmp['host']))
            {
                $valid_host = true;
                break;
            }
        }

        if($valid_host and '.swf' === substr($tmp['path'], -4))
            return $data['src'];
    }
}


