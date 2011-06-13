<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Log writer abstract class. All [Log] writers must extend this class.
 *
 */
abstract class Log_Writer {

	/**
	 * Write an array of messages.
	 *
	 *     $writer->write($messages);
	 *
	 * @param   array  messages
	 * @return  void
	 */
	abstract public function write(array $messages);

	/**
	 * Allows the writer to have a unique key when stored.
	 *
	 *     echo $writer;
	 *
	 * @return  string
	 */
	final public function __toString()
	{
		return spl_object_hash($this);
	}

} // End Log_Writer
