<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Configuration for OAuth providers.
 */
return array(
    'sina' => array(
        'source' => 0,
        'oauth_version' => '1.0a',
        'key' => '3327753974',
        'secret' => 'f53173d88b19577c55446adae813dd5e',
        'callback' => 'http://'.$_SERVER['SERVER_NAME'].'/auth/oauth_callback',
    ),
    'qq' => array(
        'source' => 1,
        'oauth_version' => '1.0',
        'key' => '1f3753ef450043dc8d76776a854af1a8',
        'secret' => 'cfa2cd474ce1d4b6fe7314004c43b96b',
        'callback' => 'http://'.$_SERVER['SERVER_NAME'].'/auth/oauth_callback',
    ),
    'sohu' => array(
        'source' => 2,
        'oauth_version' => '1.0',
        'key' => 'LVndlxxu3SJK9Q3fB6Jf',
        'secret' => 'D(u5MyFJ^2CZdnRO)zCEQgYaK=QaiJ#tQkWQ*ADk',
        'callback' => 'http://'.$_SERVER['SERVER_NAME'].'/auth/oauth_callback',
    ),
    '163' => array(
        'source' => 3,
        'oauth_version' => '1.0',
        'key' => 'uKTa7XQYOiiMnPYo',
        'secret' => 'ueHYVlbd0pGp8FAC5Bt0ObPxBqh6YvmM',
        'callback' => 'http://'.$_SERVER['SERVER_NAME'].'/auth/oauth_callback',
    ),
);

