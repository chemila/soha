<?php defined('SYSPATH') OR die('No direct access allowed.');

return array(
    'block' => array(
        'skipped' => array('test'),
        'required' => array('index', 'get'),
    ),        
    'setting' => array(
        'required' => array('rm_personal', 'add_personal'),
    ),
    'home' => array(
        'required' => array('index'),   
    ),
    'public' => array(
        'skipped' => array(),   
    ),
    'message' => array(
        'skipped' => array(),   
        'required' => array('index'),   
    ),
);
