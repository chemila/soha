<?php defined('SYSPATH') or die('No direct script access.');

abstract class OAuth_Token extends Kohana_OAuth_Token {  

    public static function session_factory($name, $consumer_name = '')
    {
        $token = session::instance()->get_once($consumer_name.'_'.$name.'_token');
        $secret = session::instance()->get_once($consumer_name.'_'.$name.'_secret');

        $options = array(
            'token' => $token,
            'secret' => $secret,
        );

		$class = 'OAuth_Token_'.$name;
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
