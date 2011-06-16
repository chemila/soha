<?php defined('SYSPATH') or die('No direct script access.');

return array
(
    /**
     * disabled rsync
    'rsync' => array(
        'host' => $_SERVER['CACHE_URL'],
        'module' => 't_leju_com_storage',
        'servers' => array(
            //'127.0.0.1',
        ),
    ),
    **/
    'remove_spaces' => TRUE,
    'path' => $_SERVER['UPLOAD_DIR'],
);


