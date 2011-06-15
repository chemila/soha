<?php
abstract class phpQueryPlugin_Scripts {
	public static $scriptMethods = array();
	public static function __initialize() {
		if (file_exists(dirname(__FILE__)."/Scripts/__config.php")) {
			include dirname(__FILE__)."/Scripts/__config.php";
			phpQueryObjectPlugin_Scripts::$config = $config;
		}
	}
	/**
	 * Extend scripts' namespace with $name related with $callback.
	 * 
	 * Callback parameter order looks like this:
	 * - $this
	 * - $params
	 * - &$return
	 * - $config
	 * 
	 * @param $name
	 * @param $callback
	 * @return bool
	 */
	public static function script($name, $callback) {
		if (phpQueryPlugin_Scripts::$scriptMethods[$name])
			throw new Exception("Script name conflict - '$name'");
		phpQueryPlugin_Scripts::$scriptMethods[$name] = $callback;
	}
}
