<?php defined('SYSPATH') or die('No direct access allowed.');

return array
(
	'default' => array
	(
		'type'       => 'mysql',
		'connection' => array(
			/**
			 * The following options are available for MySQL:
			 *
			 * string   hostname     server hostname, or socket
			 * string   database     database name
			 * string   username     database username
			 * string   password     database password
			 * boolean  persistent   use persistent connections?
			 *
			 * Ports and sockets may be appended to the hostname.
			 */
			'hostname'   => $_SERVER['DB_HOST'],
			'port'       => $_SERVER['DB_PORT'],
			'database'   => $_SERVER['DB_NAME'],
			'username'   => $_SERVER['DB_USER'],
			'password'   => $_SERVER['DB_PASS'],
			'persistent' => FALSE,
		),
		'table_prefix' => 't_',
		'charset'      => 'utf8',
		'caching'      => TRUE,
	),
	'slave' => array(
		'type'       => 'mysql',
		'connection' => array(
			/**
			 * The following options are available for PDO:
			 *
			 * string   dsn         Data Source Name
			 * string   username    database username
			 * string   password    database password
			 * boolean  persistent  use persistent connections?
			 */
			'hostname'   => $_SERVER['DB_HOST'],
			'port'       => $_SERVER['DB_PORT'],
			'database'   => $_SERVER['DB_NAME'],
			'username'   => $_SERVER['DB_USER'],
			'password'   => $_SERVER['DB_PASS'],
			'persistent' => FALSE,
		),
		/**
		 * The following extra options are available for PDO:
		 *
		 * string   identifier  set the escaping identifier
		 */
		'table_prefix' => 't_',
		'charset'      => 'utf8',
		'caching'      => FALSE,
	),
);
