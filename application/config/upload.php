<?php defined('SYSPATH') or die('No direct script access.');

return array
(
    'rsync' => array(
        'host' => $_SERVER['SINASRV_NDATA_CACHE_URL'],
        'module' => 't_leju_com_storage',
        'servers' => array(
            '172.16.244.156',
            '10.71.32.156',
            //'127.0.0.1',
        ),
    ),
    'remove_spaces' => TRUE,
    'path' => 'star/upload/',
);


