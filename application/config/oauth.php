<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Configuration for OAuth providers.
 */
return array(
	/**
	 * Twitter applications can be registered at https://twitter.com/apps.
	 * You will be given a "consumer key" and "consumer secret", which must
	 * be provided when making OAuth requests.
	 */
	'twitter' => array(
		'key' => 'your consumer key',
		'secret' => 'your consumer secret'
	),
    'sina' => array(
        'oauth_version' => '1.0a',
        'key' => '42451484400',
        'secret' => '98244228d48d7bec9628719657bf0a350',
        'callback' => 'http://www.google.com',
    ),
);

