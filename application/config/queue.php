<?php defined('SYSPATH') or die('No direct script access.');
return array
(
	'memcacheq' => array
	(
		'driver'             => 'memcacheq',
        'timeout'            => '300',
		'server'             => array
		(

            'host'             => $_SERVER['MEMCACHEQ_SERVER'],  // Memcache Server:Port
            'port'             => $_SERVER['MEMCACHEQ_PORT'],  // Memcache port number
            'persistent'       => FALSE,        // Persistent connection
            'weight'           => 1,
            'timeout'          => 1,
            'retry_interval'   => 15,
            'status'           => TRUE,
		),
	),
    'native' => array(
        'path' => DOCROOT,
        'key' => 'chemila',
    ),
);

