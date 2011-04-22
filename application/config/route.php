<?php defined('SYSPATH') OR die('No direct access allowed.');
/**
 * Set the routes. Each route must have a minimum of a name, a URI and a set of
 * defaults for the URI.
 * Route::set('default', '(<controller>(/<action>(/<id>)))')
 *    ->defaults(array(
 *        'controller' => 'welcome',
 *        'action'     => 'index',
 *        'action'     => 'index',
 *    ));
 */
return array
(
    'default' => array(
        'uri' => '(public(/<action>))',
        'patterns' => array(),
        'defaults' => array('controller' => 'public', 'action' => 'index'),
    ),
    'auth' => array(
        'uri' => '(auth(/<action>(/<source>)))',
        'patterns' => array('source' => '\w+'),
        'defaults' => array('controller' => 'auth', 'action' => 'index'),
    ),
    'setting' => array(
        'uri' => '(setting(/<action>(/<id>)))',
        'patterns' => array('id' => '\d+'),
        'defaults' => array('controller' => 'setting', 'action' => 'index'),
    ),
    'weibo' => array(
        'uri' => '(<controller>(/<action>(/<id>)))',
        'patterns' => array('id' => '\d+'),
        'defaults' => array('controller' => 'weibo', 'action' => 'index'),
    ),
    'test' => array(
        'uri' => 'test(/<action>(/<id>))',
        'patterns' => array(),
        'defaults' => array('controller' => 'test', 'action' => 'index'),
    ),
    'favorite' => array(
        'uri' => '(favorite(/<action>(/<id>)))',
        'patterns' => array('id' => '\d+'),
        'defaults' => array('controller' => 'favorite', 'action' => 'index'),
    )
);
