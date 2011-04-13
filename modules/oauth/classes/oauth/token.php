<?php defined('SYSPATH') or die('No direct script access.');

abstract class OAuth_Token extends Kohana_OAuth_Token {  

    /**
     * session foctory, fetch data from session
     */
    public static function session_factory($name)
    {
		$class = 'OAuth_Token_'.$name;

        $options = array(
            'token' => session::instance()->get($name.'_token'),
            'secret' => session::instance()->get($name.'_secret'),
        );

        return new $class($options);
    }

    /**
     * save token into session
     */
    public function session_save()
    {
        session::instance()->set($this->name.'_token', $this->token);
        session::instance()->set($this->name.'_secret', $this->secret);

        return $this;
    }
}
