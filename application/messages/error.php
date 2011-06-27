<?php defined('SYSPATH') or die('No direct script access.');

return array(
    'default' => '未知错误',
    'oauth' => array(
        'request_token' => '获取请求令牌失败',
        'access_token' => '获取访问令牌失败',
        'user_info' => '获取用户信息失败',
    ),
    'auth' => array(
        'source' => '认证来源错误',   
    ),
    'session' => array(
        'create' => '用户session创建失败',   
    ),
    'token' => array(
        'create' => '用户令牌创建失败',
    ),
    'user' => array(
        'create' => '创建用户失败',   
    ),
);
