<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Test extends Controller_Twig {
    public function action_index()
    {
        $info = Model_Photo::get_image_size('http://dev.pagodabox.com/application/upload/b4/b46a9f30ac08365a94a245f04ff813fd5eedb357.jpg', 800, 600);
        var_dump($info);
    }


    public function action_delete_event()
    {
        $calendar = new Model_Calendar;
        $start = Arr::get($_GET, 'start', date('Y-m-d'));
        $end = Arr::get($_GET, 'end', date('Y-m-d'));

        $events = $calendar->query_by_date_range($start, $end);

        foreach($events as $event)
        {
            echo 'deleted '.$event->id->text. "<br>";
            $event->delete();
        }
    }

}// End Welcome
