<?php
/**
 * Callback type which on execution returns value passed during creation.
 * 
 * @author Tobiasz Cudnik <tobiasz.cudnik/gmail.com>
 */
class Callback_ReturnValue extends Callback implements Callback_Interface {
	protected $value;
	protected $name;
	public function __construct($value, $name = null){
		$this->value =& $value;
		$this->name = $name;
		$this->callback = array($this, 'callback');
	}
	public function callback() {
		return $this->value;
	}
	public function __toString() {
		return $this->getName();
	}
	public function getName() {
		return 'Callback: '.$this->name;
	}
	public function hasName() {
		return isset($this->name) && $this->name;
	}
}
