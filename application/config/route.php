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
        'uri' => '(weibo(/<action>(/<id>)))',
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
    ),
    'message' => array(
        'uri' => '(message(/<action>(/<id>)))',
        'patterns' => array('id' => '\d+'),
        'defaults' => array('controller' => 'message', 'action' => 'index'),
    ),
    'attention' => array(
        'uri' => '(attention(/<action>(/<id>)))',
        'patterns' => array('id' => '\d+'),
        'defaults' => array('controller' => 'attention', 'action' => 'index'),
    ),
    'friend' => array(
        'uri' => '(friend(/<action>(/<id>)))',
        'patterns' => array('id' => '\d+'),
        'defaults' => array('controller' => 'friend', 'action' => 'index'),
    ),
    'help' => array(
        'uri' => '(help(/<action>))',
        'patterns' => array(),
        'defaults' => array('controller' => 'help', 'action' => 'index'),
    ),
    'block' => array(
        'uri' => '(block(/<action>(/<id>)))',
        'patterns' => array('id' => '\d+'),
        'defaults' => array('controller' => 'block', 'action' => 'index'),
    ),
	'home' => array(
        'uri' => '(home(/<action>(/<uid>)))',
        'patterns' => array('uid' => '\d+'),
        'defaults' => array('controller' => 'home', 'action' => 'index'),
    ),
	'comment' => array(
        'uri' => '(comment(/<action>(/<uid>)))',
        'patterns' => array('uid' => '\d+'),
        'defaults' => array('controller' => 'comment', 'action' => 'index'),
    ),
    'user' => array(
        'uri' => '(user(/<action>(/<uid>)))',
        'patterns' => array('uid' => '\d+'),
        'defaults' => array('controller' => 'user', 'action' => 'index'),
    ),
    'cron' => array(
        'uri' => '(cron(/<action>(/<uid>)))',
        'patterns' => array('uid' => '\d+'),
        'defaults' => array('controller' => 'cron', 'action' => 'index'),
    ),
    'person' => array(
        'uri' => '(person(/<action>(/<uid>)))',
        'patterns' => array('uid' => '\d+'),
        'defaults' => array('controller' => 'person', 'action' => 'index'),
    ),
    'face' => array(
        'uri' => '(face(/<action>(/<uid>)))',
        'patterns' => array(),
        'defaults' => array('controller' => 'face', 'action' => 'index'),
    ),
    'collect' => array(
        'uri' => '(collect(/<action>))',
        'patterns' => array(),
        'defaults' => array('controller' => 'collect', 'action' => 'index'),
    ),
);
