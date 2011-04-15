<?php defined('SYSPATH') or die('No direct script access.');
return array
(
	'memcacheq' => array
	(
		'driver'             => 'memcacheq',
        'timeout'            => '300',
		'server'             => array
		(
            'host'             => 'localhost',
            'port'             => '22221',
            'persistent'       => FALSE,        // Persistent connection
            'weight'           => 1,
            'timeout'          => 1,
            'retry_interval'   => 15,
            'status'           => TRUE,
		),
	),
);

