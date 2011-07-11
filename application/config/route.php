<?php defined('SYSPATH') OR die('No direct access allowed.');
/**
 * Set the routes. Each route must have a minimum of a name, a URI and a set of
 * defaults for the URI.
 * Route::set('default', '(<controller>(/<action>(/<id>)))')
 *    ->defaults(array(
 *        'controller' => 'welcome',
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
    'public' => array(
        'uri' => '(public(/<action>(/<type>(/<uid>))))',
        'patterns' => array('type' => '\w+', 'uid' => '\d+'),
        'defaults' => array('controller' => 'public', 'action' => 'index'),
    ),
    'auth' => array(
        'uri' => '(auth(/<action>))',
        'patterns' => array(),
        'defaults' => array('controller' => 'auth', 'action' => 'index'),
    ),
    'user' => array(
        'uri' => '(user(/<action>(/<uid>)))',
        'patterns' => array('uid' => '\d+'),
        'defaults' => array('controller' => 'user', 'action' => 'index'),
    ),
    'cron' => array(
        'uri' => '(cron(/<action>))',
        'patterns' => array(),
        'defaults' => array('controller' => 'cron', 'action' => 'index'),
    ),
    'log' => array(
        'uri' => '(log(/<action>))',
        'patterns' => array(),
        'defaults' => array('controller' => 'log', 'action' => 'index'),
    ),
    'xml' => array(
        'uri' => '(xml(/<action>))',
        'patterns' => array(),
        'defaults' => array('controller' => 'data', 'action' => 'index'),
    ),
    'suggest' => array(
        'uri' => '(suggest(/<action>))',
        'patterns' => array(),
        'defaults' => array('controller' => 'data', 'action' => 'suggest'),
    ),
    'html' => array(
        'uri' => '(html(/<action>))',
        'patterns' => array(),
        'defaults' => array('controller' => 'user', 'action' => 'index'),
    ),
    'intl' => array(
        'uri' => '(intl/help.html)',
        'patterns' => array(),
        'defaults' => array('controller' => 'help', 'action' => 'intl'),
    ),
    'feed' => array(
        'uri' => '(feed(/<action>(/<id>)))',
        'patterns' => array('id' => '\d+'),
        'defaults' => array('controller' => 'feed', 'action' => 'show'),
    ),
);
