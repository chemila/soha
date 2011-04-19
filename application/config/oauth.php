<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Configuration for OAuth providers.
 */
return array(
    'sina' => array(
        'source' => 0,
        'oauth_version' => '1.0a',
        'key' => '2527660317',
        'secret' => '6bbeef399be20617b48f760e443c6b2e',
        'callback' => 'http://dev.pin.com/index.php/auth/oauth_callback',
    ),
    'qq' => array(
        'source' => 1,
        'oauth_version' => '1.0',
        'key' => '1f3753ef450043dc8d76776a854af1a8',
        'secret' => 'cfa2cd474ce1d4b6fe7314004c43b96b',
        'callback' => 'http://dev.pin.com/index.php/auth/oauth_callback',
    ),
    'sohu' => array(
        'source' => 2,
        'oauth_version' => '1.0',
        'key' => 'LVndlxxu3SJK9Q3fB6Jf',
        'secret' => 'D(u5MyFJ^2CZdnRO)zCEQgYaK=QaiJ#tQkWQ*ADk',
        'callback' => 'http://dev.pin.com/index.php/auth/oauth_callback',
    ),
    '163' => array(
        'source' => 3,
        'oauth_version' => '1.0',
        'key' => 'uKTa7XQYOiiMnPYo',
        'secret' => 'ueHYVlbd0pGp8FAC5Bt0ObPxBqh6YvmM',
        'callback' => 'http://dev.pin.com/index.php/auth/oauth_callback',
    ),
);

