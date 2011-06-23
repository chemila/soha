<?php defined('SYSPATH') or die('No direct script access.');

class Model_Calendar {

    public function __construct()
    {
        $this->_config = Core::config('google');
        $this->_user = $this->_config->get('calendar');
        $authsub = $this->_config->get('authsub');
        // Create an authenticated HTTP Client to talk to Google.
        $this->_client = Zend_Gdata_AuthSub::getHttpClient($authsub['session']);
        // Create a Gdata object using the authenticated Http Client
        $this->_service = new Zend_Gdata_Calendar($this->_client);
    }

    public function create_event(array $params)
    {
        // Create a new entry using the calendar service's magic factory method
        $event= $this->_service->newEventEntry();
        // Populate the event with the desired information
        // Note that each attribute is crated as an instance of a matching class
        $event->title = $this->_service->newTitle(Arr::get($params, 'title'));
        $event->where = array($this->_service->newWhere(Arr::get($params, 'where')));
        $event->content = $this->_service->newContent(Arr::get($params, 'content'));
         
        // Set the date using RFC 3339 format.
        $startDate = Arr::get($params, 'start_date', date('Y-m-d'));
        $startTime = Arr::get($params, 'start_time', date('H:i'));
        $endDate = Arr::get($params, 'end_date', date('Y-m-d'));
        $endTime = Arr::get($params, 'end_time', date('H:i'));
        $tzOffset = "+08";
         
        $when = $this->_service->newWhen();
        $when->startTime = "{$startDate}T{$startTime}:00.000{$tzOffset}:00";
        $when->endTime = "{$endDate}T{$endTime}:00.000{$tzOffset}:00";
        $event->when = array($when);
         
        // Upload the event to the calendar server
        // A copy of the event as it is recorded on the server is returned
        $newEvent = $this->_service->insertEvent($event);
        return $newEvent->id->text;
    }

    /**
     * Creates a new web content event on the authenticated user's default
     * calendar with the specified event details. For simplicity, the event
     * is created as an all day event and does not include a description.
     *
     * @param  string  $title     The event title
     * @param  string  $startDate The start date of the event in YYYY-MM-DD format
     * @param  string  $endDate   The end time of the event in HH:MM 24hr format
     * @param  string  $icon      URL pointing to a 16x16 px icon representing the event.
     * @param  string  $url       The URL containing the web content for the event.
     * @param  string  $height    The desired height of the web content pane.
     * @param  string  $width     The desired width of the web content pane.
     * @param  string  $type      The MIME type of the web content.
     * @return string The ID URL for the event.
     */
    public function create_web_event(array $params)
    {
        $event = $this->_service->newEventEntry();
        $event->title = $this->_service->newTitle(Arr::get($params, 'title'));

        $when = $this->_service->newWhen();
        // Set the date using RFC 3339 format.
        $startDate = Arr::get($params, 'start_date', date('Y-m-d'));
        $startTime = Arr::get($params, 'start_time', date('H:i'));
        $endDate = Arr::get($params, 'end_date', date('Y-m-d'));
        $endTime = Arr::get($params, 'end_time', date('H:i'));
        $tzOffset = "+08";
         
        $when = $this->_service->newWhen();
        $when->startTime = "{$startDate}T{$startTime}:00.000{$tzOffset}:00";
        $when->endTime = "{$endDate}T{$endTime}:00.000{$tzOffset}:00";
        $event->when = array($when);

        $wc = $this->_service->newWebContent();
        $wc->url = Arr::get($params, 'url');
        $wc->height = Arr::get($params, 'height', '300');
        $wc->width = Arr::get($params, 'width', '300');

        $wcLink = $this->_service->newLink();
        $wcLink->rel = Arr::get($params, 'rel', "http://schemas.google.com/gCal/2005/webContent");
        $wcLink->title = Arr::get($params, 'title');
        $wcLink->type = Arr::get($params, 'type');
        $wcLink->href = Arr::get($params, 'icon');

        $wcLink->webContent = $wc;
        $event->link = array($wcLink);

        $createdEntry = $this->_service->insertEvent($event);
        return $createdEntry->id->text;
    }

    /**
     * Returns an entry object representing the event with the specified ID.
     *
     * @param  string           $eventId The event ID string
     * @return Zend_Gdata_Calendar_EventEntry|null if the event is found, null if it's not
     */
    public function get_event($eventId)
    {
        $query = $this->_service->newEventQuery();

        $query->setUser($this->_user);
        $query->setVisibility('public');
        $query->setProjection('full');
        $query->setEvent($eventId);

        try 
        {
            return $gdataCal->getCalendarEventEntry($query);
        } 
        catch(Zend_Gdata_App_Exception $e) 
        {
            return null;
        }
    }

    /**
     * Updates the title of the event with the specified ID to be
     * the title specified.  Also outputs the new and old title
     * with HTML br elements separating the lines
     *
     * @param  string           $eventId  The event ID string
     * @param  string           $newTitle The new title to set on this event
     * @return Zend_Gdata_Calendar_EventEntry|null The updated entry
     */
    public function update_event($eventId, array $params)
    {
        $eventOld = $this->get_event($eventId);
        if ( ! $eventOld) 
            return false;

        //TODO: update other properties
        $eventOld->title = $this->_service->newTitle($params['title']);
        try 
        {
            return $eventOld->save();
        } 
        catch(Zend_Gdata_App_Exception $e) 
        {
            return false;
        }
    }
    /**
     * Adds an extended property to the event specified as a parameter.
     * An extended property is an arbitrary name/value pair that can be added
     * to an event and retrieved via the API.  It is not accessible from the
     * calendar web interface.
     *
     * @param  string           $eventId The event ID string
     * @param  string           $name    The name of the extended property
     * @param  string           $value   The value of the extended property
     * @return Zend_Gdata_Calendar_EventEntry|null The updated entry
     */
    public function extend_property($eventId, array $params)
    {
        $event = $this->get_event($eventId);

        if( ! $event)
            return false;

        foreach($params as $name => $value)
        {
            $extProp = $this->_service->newExtendedProperty($name, $value);
            $extProps = array_merge($event->extendedProperty, array($extProp));
            $event->extendedProperty = $extProps;
        }

        return $event->save();
    }


    /**
     * Adds a reminder to the event specified as a parameter.
     *
     * @param  string           $eventId The event ID string
     * @param  integer          $minutes Minutes before event to set reminder
     * @return Zend_Gdata_Calendar_EventEntry|null The updated entry
     */
    public function set_reminder($eventId, $minutes = 15, $method = 'alert')
    {
        $event = $this->get_event($eventId);

        if ( ! $event)
            return false;

        $times = $event->when;

        foreach ($times as $when) 
        {
            $reminder = $this->_service->newReminder();
            $reminder->setMinutes($minutes);
            $reminder->setMethod($method);
            $when->reminders = array($reminder);
        }

        return $event->save();
    }

    /**
     * Deletes the event specified by retrieving the atom entry object
     * and calling Zend_Feed_EntryAtom::delete() method.  This is for
     * example purposes only, as it is inefficient to retrieve the entire
     * atom entry only for the purposes of deleting it.
     *
     * @param  string           $eventId The event ID string
     * @return void
     */
    public function delete_event_by_id($eventId)
    {
        $event = $this->get_event($eventId);
        $event->delete();
    }

    public function query_by_date_range($start, $end)
    {
        $query = $this->_service->newEventQuery();

        //$query->setFutureevents('true')
        $query->setUser($this->_user);
        $query->setVisibility('public');
        $query->setProjection('full');

        // Retrieve the event list by date range
        $query->setStartMin($start);
        $query->setStartMax($end);
         
        try 
        {
            return $this->_service->getCalendarEventFeed($query);
        } 
        catch(Zend_Gdata_App_Exception $e) 
        {
            var_dump($e);
            return false;
        }
    }

    public function query_by_text($text)
    {
        $query = $this->_service->newEventQuery();

        $query->setUser($this->_user);
        $query->setVisibility('public');
        $query->setProjection('full');
        
        $query->setQuery($text);
        try 
        {
            return $this->_service->getCalendarEventFeed($query);
        } 
        catch(Zend_Gdata_App_Exception $e) 
        {
            return false;
        }
    }
}
