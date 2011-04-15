<?php
abstract class Queue 
{
    const TIMEOUT = 30;

    public static $default = 'memcacheq';
    public static $instances = array();

    /**
     * User-provided configuration
     *
     * @var array
     */
    protected $_config = array();

    public static function instance($adapter = NULL)
	{
		// If there is no group supplied
		if ($adapter === NULL)
		{
			// Use the default setting
			$adapter = Queue::$default;
		}

		if (isset(Queue::$instances[$adapter]))
		{
			// Return the current group if initiated already
			return Queue::$instances[$adapter];
		}

		$config = Core::config('queue');

		if ( ! $config->offsetExists($adapter))
		{
			throw new Queue_Exception('Failed to load queue adapter: :adapter', array(':adapter' => $adapter));
		}

		// Create a new cache type instance
		$queue_class = 'Queue_'.ucfirst($adapter);
		Queue::$instances[$adapter] = new $queue_class($config->get($adapter));

		// Return the instance
		return Queue::$instances[$adapter];
	}


    public function __construct(Array $config = NULL)
    {
        $this->_config = $config;
    }

    /**
     * Create a new queue
     *
     * @param  string           $name    queue name
     * @param  integer          $timeout default visibility timeout
     * @return Queue|false
     * @throws Queue_Exception
     */
    abstract public function create($name, $timeout = null);

    /**
     * Delete the queue this object is working on.
     *
     * This queue is disabled, regardless of the outcome of the deletion
     * of the queue, because the programmers intent is to disable this queue.
     *
     * @return boolean
     */
    abstract public function delete($name);

    /**
     * Delete a message from the queue
     *
     * Returns true if the message is deleted, false if the deletion is
     * unsuccessful.
     *
     * Returns true if the adapter doesn't support message deletion.
     *
     * @param  Queue_Message $message
     * @return boolean
     * @throws Queue_Exception
     */
    abstract public function deleteMessage($message);
    
    /**
     * Send a message to the queue
     *
     * @param  mixed $message message
     * @return Queue_Message
     * @throws Queue_Exception
     */
    abstract public function send($name, $message);

    /**
     * Returns the approximate number of messages in the queue
     *
     * @return integer
     */
    abstract public function count();

    /**
     * Return the first element in the queue
     *
     * @param  integer $maxMessages
     * @param  integer $timeout
     * @return Message_Iterator
     */
    abstract public function receive($name, $maxMessages = 1, $timeout = self::TIMEOUT);

    /**
     * Get an array of all available queues
     *
     * @return array
     * @throws Queue_Exception
     */
    abstract public function getQueues();
}
