<?php
class Queue_Native extends Queue
{
    protected $_key;
    protected $_path;
    protected $_res;
    protected $_queues = array();

    public function __construct($options)
    {
        if( ! function_exists(msg_get_queue))
            throw new Queue_Exception('Unsupported message queue method');

        $this->_path = Arr::get($options, 'path', __FILE__);
    }

    public function isExists($name)
    {
        if ($this->_queues) 
            return in_array($name, $this->_queues);

        $this->_key = ftok($this->_path, 't');
        $this->_res = msg_get_queue($this->_key, 0666);
        
        return (bool)$this->count();
    }

    public function getQueues()
    {
        return $this->_queues;
    }

    public function create($name, $timeout = null)
    {
        return $this->isExists($name);
    }

    public function delete($name)
    {
        msg_remove_queue($this->_res);
        unset($this->_queues[$name]);
    }

    public function count()
    {
        $stat = msg_stat_queue($this->_res);

        return Arr::get($stat, 'msg_qnum', 0);
    }

    public function send($name, $message)
    {
        if( ! msg_send($this->_res, 1, $message))
        {
            throw new Queue_Exception('Send message failed, name: :name, message: :message', array(
                ':name' => $name,
                ':message' => $message,
            ));
        }

        return $this;
    }

    public function receive($name, $maxMessages = 1, $timeout = 0)
    {
        if ( ! $this->isExists($name)) 
        {
            throw new Queue_Exception('Queue does not exist: :name', array(':name' => $name));
        }

        if(msg_receive($this->_res, 0, $msgtype, 1024000, $message, true, MSG_IPC_NOWAIT))
        {
            return $message;
        }        
    }

    public function deleteMessage($message)
    {
        throw new Queue_Exception('deleteMessage() is not supported in  native');
    }

    public function __destruct()
    {
        msg_remove_queue($this->_res);
        unset($this->_res);
        $this->_queues = array();
    }
}
