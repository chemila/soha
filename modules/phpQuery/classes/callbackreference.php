<?php
class CallbackReference extends Callback {
	/**
	 *
	 * @param $reference
	 * @param $paramIndex
	 * @todo implement $paramIndex; param index choose which callback param will be passed to reference
	 */
	public function __construct(&$reference, $name = null){
		$this->callback =& $reference;
	}
}
