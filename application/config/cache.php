<?php defined('SYSPATH') or die('No direct script access.');
return array
(
	'memcache' => array
	(
		'driver'             => 'memcache',
		'default_expire'     => 3600,
		'compression'        => FALSE,              // Use Zlib compression (can cause issues with integers)
        //'servers'            => $_SERVER['MEMCACHED_SERVERS'],
		'servers'            => array
		(
			array
			(
				'host'             => $_SERVER['MEMCACHED_HOST'],  // Memcache Server
				'port'             => $_SERVER['MEMCACHED_PORT'],  // Memcache port number
				'persistent'       => FALSE,        // Persistent connection
				'weight'           => 1,
				'timeout'          => 1,
				'retry_interval'   => 15,
				'status'           => TRUE,
			),
		),
        'key_prefix'         => 'chemila',
		'instant_death'      => FALSE,               // Take server offline immediately on first fail (no retry)
	),
	'file'    => array
	(
		'drivers'             => 'file',
		'cache_dir'          => Core::$cache_dir,
		'default_expire'     => 3600,
	)
);
