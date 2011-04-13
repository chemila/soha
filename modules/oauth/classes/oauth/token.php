<?php defined('SYSPATH') or die('No direct script access.');

abstract class OAuth_Token extends Kohana_OAuth_Token {  
    /**
     * session foctory, fetch data from session
     */
    public static function session_factory($name, $consumer_name = '')
    {
		$class = 'OAuth_Token_'.$name;

        $token = session::instance()->get($consumer_name.'_'.$name.'_token');
        $secret = session::instance()->get($consumer_name.'_'.$name.'_secret');

        if(empty($token) or empty($secret))
            return false;

        $options = array(
            'token' => $token,
            'secret' => $secret,
        );

        return new $class($options);
    }

    /**
     * save token into session
     */
    public function session_save($consumer_name = '')
    {
        session::instance()->set($consumer_name.'_'.$this->name.'_token', $this->token);
        session::instance()->set($consumer_name.'_'.$this->name.'_secret', $this->secret);

        return $this;
    }
}
