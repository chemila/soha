<?php
class Queue_Memcacheq extends Queue
{
    const DEFAULT_HOST = '127.0.0.1';
    const DEFAULT_PORT = 21201;
    const EOL          = "\r\n";

    /**
     * @var \Memcache
     */
    protected $_memcache = null;

    /**
     * @var resource
     */
    protected $_flags = null;

    /**
     * @var resource
     */
    protected $_socket = NULl;

    /**
     * @var queues
     */
    protected $_queues = array();

    /**
     * Constructor
     *
     * @param  array|Config $options
     * @return void
     */
    public function __construct($options)
    {
        if (!extension_loaded('memcache')) {
            throw new Queue_Exception('Memcache extension does not appear to be loaded');
        }

        $this->_memcache = new Memcache;

        parent::__construct($options);

		// Load servers from configuration
		$server = Arr::get($this->_config, 'server', NULL);

		if ( ! $server)
		{
			// Throw an exception if no server found
			throw new Queue_Exception('No Memcacheq server defined in configuration');
		}

		// Setup default server configuration
		$config = array(
			'host'             => self::DEFAULT_HOST,
			'port'             => self::DEFAULT_PORT,
			'persistent'       => FALSE,
			'weight'           => 1,
			'timeout'          => self::TIMEOUT,
			'retry_interval'   => 15,
			'status'           => TRUE,
			'failure_callback' => array($this, '_failed_request'),
		);

		// Add the memcache servers to the pool
		// Merge the defined config with defaults
        $server += $config;
        
        if ( ! $this->_memcache->connect($server['host'], $server['port']))
        {
            throw new Queue_Exception('Memcache could not connect to host \':host\' using port \':port\'', array(':host' => $server['host'], ':port' => $server['port']));
        }

        $this->_host = $server['host'];
        $this->_port = $server['port'];

		// Setup the flags
		$this->_flags = Arr::get($this->_config, 'compression', FALSE) ? MEMCACHE_COMPRESSED : FALSE;
    }

    /**
     * Destructor
     *
     * @return void
     */
    public function __destruct()
    {
        $this->_memcache->close();

        if (is_resource($this->_socket)) {
            $cmd = 'quit' . self::EOL;
            fwrite($this->_socket, $cmd);
            fclose($this->_socket);
        }
    }

    /**
     * Does a queue already exist?
     *
     * Throws an exception if the adapter cannot determine if a queue exists.
     * use isSupported('isExists') to determine if an adapter can test for
     * queue existance.
     *
     * @param  string $name
     * @return boolean
     * @throws Queue_Exception
     */
    public function isExists($name)
    {
        if (empty($this->_queues)) {
            $this->getQueues();
        }

        return in_array($name, $this->_queues);
    }

    /**
     * Create a new queue
     *
     * Visibility timeout is how long a message is left in the queue "invisible"
     * to other readers.  If the message is acknowleged (deleted) before the
     * timeout, then the message is deleted.  However, if the timeout expires
     * then the message will be made available to other queue readers.
     *
     * @param  string  $name    queue name
     * @param  integer $timeout default visibility timeout
     * @return boolean
     * @throws Queue_Exception
     */
    public function create($name, $timeout=null)
    {
        if ($this->isExists($name)) {
            return false;
        }
        if ($timeout === null) {
            $timeout = self::TIMEOUT;
        }

        // MemcacheQ does not have a method to "create" a queue
        // queues are created upon sending a packet.
        // We cannot use the send() and receive() functions because those
        // depend on the current name.
        $result = $this->_memcache->set($name, 'creating queue', 0, 15);
        $result = $this->_memcache->get($name);

        $this->_queues[] = $name;

        return true;
    }

    /**
     * Delete a queue and all of it's messages
     *
     * Returns false if the queue is not found, true if the queue exists
     *
     * @param  string  $name queue name
     * @return boolean
     * @throws Queue_Exception
     */
    public function delete($name)
    {
        $response = $this->_sendCommand('delete ' . $name, array('DELETED', 'NOT_FOUND'), true);

        if (in_array('DELETED', $response)) {
            $key = array_search($name, $this->_queues);

            if ($key !== false) {
                unset($this->_queues[$key]);
            }
            return true;
        }

        return false;     
    }

    /**
     * Get an array of all available queues
     *
     * Not all adapters support getQueues(), use isSupported('getQueues')
     * to determine if the adapter supports this feature.
     *
     * @return array
     * @throws Queue_Exception
     */
    public function getQueues()
    {
        $this->_queues = array();

        $response = $this->_sendCommand('stats queue', array('END'));

        foreach ($response as $i => $line) {
            $this->_queues[] = str_replace('STAT ', '', $line);
        }

        return $this->_queues;
    }

    /**
     * Return the approximate number of messages in the queue
     *
     * @param  Queue $queue
     * @return integer
     * @throws Queue_Exception (not supported)
     */
    public function count()
    {
        throw new Queue_Exception('count() is not supported in this memcacheq');
    }

    /**
     * Send a message to the queue
     *
     * @param  string     $name the queue name to be inserted
     * @param  string     $message Message to send to the active queue
     * @return Queue $this
     * @throws Queue_Exception
     */
    public function send($name, $message)
    {
        if (!$this->isExists($name)) {
            throw new Queue_Exception('Queue does not exist: :name', array(':name' => $name));
        }

        if(empty($message))
        {
            throw new Queue_Exception('Invalid message: :message', 
                array(':message' => $message));
        }

        $message = (string) $message;
        $data    = array(
            'message_id' => md5(uniqid(rand(), true)),
            'handle'     => null,
            'body'       => $message,
            'md5'        => md5($message),
        );

        $result = $this->_memcache->set($name, $message, 0, 0);
        if ($result === false) {
            throw new Queue_Exception(
                'failed to insert message into queue: :name', 
                array(":name" => $name)
            );
        }

        return $this;
    }

    /**
     * Get messages in the queue
     *
     * @param  integer    $maxMessages  Maximum number of messages to return
     * @param  integer    $timeout      Visibility timeout for these messages
     * @return Queue_Message
     * @throws Queue_Exception
     */
    public function receive($name, $maxMessages = 1, $timeout=self::TIMEOUT)
    {
        if (!$this->isExists($name)) {
            throw new Queue_Exception('Queue does not exist: :name', array(':name' => $name));
        }

        $msgs = array();

        if ($maxMessages > 0 ) {
            for ($i = 0; $i < $maxMessages; $i++) {
                $data = array(
                    'handle' => md5(uniqid(rand(), true)),
                    'body'   => $this->_memcache->get($name),
                );

                $msgs[] = $data;
            }
        }

        return $msgs;
    }

    /**
     * Delete a message from the queue
     *
     * Returns true if the message is deleted, false if the deletion is
     * unsuccessful.
     *
     * @param  Queue_Message $message
     * @return boolean
     * @throws Queue_Exception (unsupported)
     */
    public function deleteMessage($message)
    {
        throw new Queue_Exception('deleteMessage() is not supported in  memcacheq');
    }

    /**
     * sends a command to MemcacheQ
     *
     * The memcache functions by php cannot handle all types of requests
     * supported by MemcacheQ
     * Non-standard requests are handled by this function.
     *
     * @param  string  $command - command to send to memcacheQ
     * @param  array   $terminator - strings to indicate end of memcacheQ response
     * @param  boolean $include_term - include terminator in response
     * @return array
     * @throws Queue_Exception if connection cannot be opened
     */
    protected function _sendCommand($command, array $terminator, $include_term=false)
    {
        if ( ! is_resource($this->_socket)) {
            $this->_socket = fsockopen($this->_host, $this->_port, $errno, $errstr, 10);
        }
        if ($this->_socket === false) {
            throw new Queue_Exception("Could not open a connection to $this->_host:$this->_port errno=$errno : $errstr");
        }

        $response = array();

        $cmd = $command . self::EOL;
        fwrite($this->_socket, $cmd);

        $continue_reading = true;
        while (!feof($this->_socket) && $continue_reading) {
            $resp = trim(fgets($this->_socket, 1024));
            if (in_array($resp, $terminator)) {
                if ($include_term) {
                    $response[] = $resp;
                }
                $continue_reading = false;
            } else {
                $response[] = $resp;
            }
        }

        return $response;
    }

    public function _failed_request()
    {
        throw new Queue_Exception('Memcacheq error');
    }
}
