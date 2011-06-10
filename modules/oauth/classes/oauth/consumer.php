<?php defined('SYSPATH') or die('No direct script access.');

class OAuth_Consumer extends Kohana_OAuth_Consumer {  

    public function as_array()
    {
        return array(
            'key' => $this->key,
            'secret' => $this->secret,
            'callback' => $this->callback,
        );
    }

}
