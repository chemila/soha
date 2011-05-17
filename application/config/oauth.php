<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Configuration for OAuth providers.
 */
return array(
    'sina' => array(
        'source' => 1,
        'oauth_version' => '1.0a',
        'key' => '3327753974',
        'secret' => 'f53173d88b19577c55446adae813dd5e',
        'callback' => 'http://'.$_SERVER['SERVER_NAME'].'/auth/oauth_callback',
    ),
    'qq' => array(
        'source' => 2,
        'oauth_version' => '1.0',
        'key' => 'c636552a7f484f248e983a82e419b044',
        'secret' => 'b48d5d925cbad01ba42b4faf4c663fdd',
        'callback' => 'http://'.$_SERVER['SERVER_NAME'].'/auth/oauth_callback',
    ),
    'sohu' => array(
        'source' => 3,
        'oauth_version' => '1.0',
        'key' => 'S936oeVspCiWdykUpXDD',
        'secret' => '8HpZ^jF^v7TW=n%)REz$1MWS9gy2D-(5pdJCMo=P',
        'callback' => 'http://'.$_SERVER['SERVER_NAME'].'/auth/oauth_callback',
    ),
    '163' => array(
        'source' => 4,
        'oauth_version' => '1.0',
        'key' => 'HbAwd16QTcVbMQCa',
        'secret' => 'b55XviEHJktWDLdQVj82kjatgvjg2RVI',
        'callback' => 'http://'.$_SERVER['SERVER_NAME'].'/auth/oauth_callback',
    ),
);

