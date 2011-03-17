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
    'welcomes' => array(
        'uri' => 'welcome(/<action>(/<id>))',
        'patterns' => array(
            'id' => '\d+',
        ),
        'defaults' => array('controller' => 'welcome', 'action' => 'index'),
    ),
    'default' => array(
        'uri' => '(<controller>(/<action>))',
        'patterns' => array(),
        'defaults' => array('controller' => 'welcome', 'action' => 'index'),
    ),
);
