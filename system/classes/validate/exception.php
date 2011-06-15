<?php defined('SYSPATH') or die('No direct script access.');
/**
 */
class Validate_Exception extends CE {

	/**
	 * @var  object  Validate instance
	 */
	public $array;

	public function __construct(Validate $array, $message = 'Failed to validate array', array $values = NULL, $code = 0)
	{
		$this->array = $array;

		parent::__construct($message, $values, $code);
	}

} // End Validate_Exception
