<?php defined('SYSPATH') or die('No direct script access.');

abstract class OAuth_Request extends Kohana_OAuth_Request {  

	public function nonce()
	{
        $mt = microtime();
        $rand = mt_rand();

        return md5($mt . $rand);
	}

}
