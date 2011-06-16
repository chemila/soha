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
        'uri' => '(test(/<action>))',
        'patterns' => array(),
        'defaults' => array('controller' => 'test', 'action' => 'index'),
    ),
    'test' => array(
        'uri' => '(test(/<action>))',
        'patterns' => array(),
        'defaults' => array('controller' => 'test', 'action' => 'index'),
    ),
    'error' => array(
        'uri' => '(error(/<action>))',
        'patterns' => array(),
        'defaults' => array('controller' => 'error', 'action' => 'index'),
    ),
    'photo' => array(
        'uri' => '(photo(/<action>))',
        'patterns' => array(),
        'defaults' => array('controller' => 'photo', 'action' => 'index'),
    ),
);
