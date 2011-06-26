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
        //'key' => 'c636552a7f484f248e983a82e419b044',
        //'secret' => 'b48d5d925cbad01ba42b4faf4c663fdd',
        'key' => '15da605744ae4571a784897831824ba6',
        'secret' => '7623b1c7a53189c7080da8eef45d23da',
        'callback' => URL::site('auth/oauth_callback', true),
    ),
    'sohu' => array(
        'oauth_version' => '1.0',
        //'key' => 'S936oeVspCiWdykUpXDD',
        //'secret' => '8HpZ^jF^v7TW=n%)REz$1MWS9gy2D-(5pdJCMo=P',
        'key' => 'Tre57LrccupJS5XJrpvl',
        'secret' => '#cp7iGw415c-6%N(#^OM!Gncl%AeSX^weH*$%D^6)',
        'callback' => URL::site('auth/oauth_callback', true),
    ),
    '163' => array(
        'oauth_version' => '1.0',
        //'key' => 'HbAwd16QTcVbMQCa',
        //'secret' => 'b55XviEHJktWDLdQVj82kjatgvjg2RVI',
        'key' => 'or5l4LOcNK8FVCxe',
        'secret' => '9R2T5f5mhlSkzzhU8NwAeXO6ov3c5rZ2',
        'callback' => URL::site('auth/oauth_callback', true),
    ),
    'google' => array(
        //account: pagodabox@gmail.com
        'oauth_version' => '1.0',
        'key' => 't.pagodabox.com',
        'secret' => 'pBg177sWMW2nzXi17yQJk3qM',
        'callback' => URL::site('auth/oauth_google', true),
    ),
    'flickr' => array(
        //account: pagodabox@gmail.com
        'oauth_version' => '1.0',
        //'key' => '7865e2715349ac7d9a1c5c5d38474cda',
        //'secret' => 'c40a8377b35c1966',
        'key' => '522d35664a7c2a4c028d9a0016be20c7',
        'secret' => 'd06a7a4ff6777809',
        'callback' => URL::site('auth/oauth_callback', true),
    ),
);

