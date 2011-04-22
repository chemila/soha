<?php defined('SYSPATH') or die('No direct script access.');

class Model_Comment extends ORM {

    protected $_belongs_to = array(
        'weibo' => array(
            'model' => 'weibo',
            'foreign_key' => 'wid',
        ),       
    );

    protected $_has_one = array(
        'author' => array(
            'model' => 'user',
            'foreign_key' => 'uid',
        ),       
        'reply_to' => array(
            'model' => 'comment',
            'foreign_key' => 'comment_to',
        ),
    );
}
