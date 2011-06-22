<?php defined('SYSPATH') or die('No direct script access.');

return array
(
    'calendar' => 'pagodabox@gmail.com',
    //'calendar' => '49gg0968q726ucooh02a2tu76c@group.calendar.google.com',
    'oauth' => array(
        'name' => 'access',
        'token' => '1/bkGRRaoUsGN55WqPtcw_8YCUrKcrQWYQj3Fa6Ea-5Ls',
        'secret' => '1Jk5JiVv0842HbXmn81WZhy4', 
    ),
    'authsub' => array(
        'session' => '1/qAvbDSrLZ9IILf7uRXzI8V-CeUBVRm7Fyirhp9Q8lJw',
        'next' => URL::site('/auth/authsub', true),
        // Note: http is different from https, it is dangerous
        'scope' => 'http://www.google.com/calendar/feeds/',
    ),
);

