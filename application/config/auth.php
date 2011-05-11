<?php defined('SYSPATH') OR die('No direct access allowed.');

return array(
    'setting' => array(
        'required' => array('index', 'rm_personal', 'add_personality', 'update_personality'),
    ),
    'home' => array(
        'required' => array('index', 'profile'),   
    ),
    'public' => array(
        'skipped' => array(),   
    ),
    'message' => array(
        'skipped' => array(),   
        'required' => array('index', 'add', 'delete'),   
    ),
    'favorite' => array(
        'skipped' => array(),   
        'required' => array('index', 'add', 'delete')
    ),
    'attention' => array(
        'skipped' => array(),   
        'required' => array('index', 'add', 'delete', 'delfans')
    ),
    'friend' => array(
        'skipped' => array(),   
        'required' => array('index', 'add', 'delete')
    ),
    'help' => array(
        'skipped' => array()
    ),
    'block' => array(
        'skipped' => array(),
        'required' => array('index', 'delete', 'add'),
    ),  
    'comment' => array(
        'skipped' => array(),
        'required' => array('index', 'delete', 'add'),
    ),
    'weibo' => array(
        'skipped' => array('comment_index'),
        'required' => array(),
    ),
);
