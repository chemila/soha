<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Configuration for OAuth providers.
 */
return array(
    'sina' => array(
        'oauth_version' => '1.0a',
        //'key' => '1612564805',
        'key' => '4055761090',
        //'secret' => '2857fb55fe21979cda0be6c299c293ed',
        'secret' => '7a5002cea6ca07a6ed1cf846b2d39cdc',
        'callback' => URL::site('auth/oauth_callback', true),
    ),
    'qq' => array(
        'oauth_version' => '1.0',
        'key' => 'c636552a7f484f248e983a82e419b044',
        'secret' => 'b48d5d925cbad01ba42b4faf4c663fdd',
        'callback' => URL::site('auth/oauth_callback', true),
    ),
    'sohu' => array(
        'oauth_version' => '1.0',
        'key' => 'S936oeVspCiWdykUpXDD',
        'secret' => '8HpZ^jF^v7TW=n%)REz$1MWS9gy2D-(5pdJCMo=P',
        'callback' => URL::site('auth/oauth_callback', true),
    ),
    '163' => array(
        'oauth_version' => '1.0',
        'key' => 'HbAwd16QTcVbMQCa',
        'secret' => 'b55XviEHJktWDLdQVj82kjatgvjg2RVI',
        'callback' => URL::site('auth/oauth_callback', true),
    ),
    'google' => array(
        'oauth_version' => '1.0',
        'key' => 't.pagodabox.com',
        'secret' => 'pBg177sWMW2nzXi17yQJk3qM',
        'callback' => URL::site('auth/oauth_google', true),
    ),
    'yahoo' => array(
        'oauth_version' => '1.0',
        'key' => '7865e2715349ac7d9a1c5c5d38474cda',
        'secret' => 'c40a8377b35c1966',
        'callback' => URL::site('auth/oauth_yahoo', true),
    ),
);

