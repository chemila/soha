<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Requires Xcache
 * http://xcache.lighttpd.net/
 * 
 */
class Cache_Xcache extends Cache {

	/**
	 * Check for existence of the APC extension
	 *
	 * @param  array     configuration
	 * @throws  Cache_Exception
	 */
	protected function __construct(array $config)
	{
		if ( ! extension_loaded('xcache'))
		{
			throw new Cache_Exception('PHP Xcache extension is not available.');
		}

		parent::__construct($config);
	}

	/**
	 * Retrieve a value based on an id
	 *
	 * @param   string   id 
	 * @param   string   default [Optional] Default value to return if id not found
	 * @return  mixed
	 */
	public function get($id, $default = NULL)
	{
		return (($data = xcache_get($this->_sanitize_id($id))) === NULL) ? $default : $data;
	}

	/**
	 * Set a value based on an id. Optionally add tags.
	 * 
	 * @param   string   id 
	 * @param   string   data 
	 * @param   integer  lifetime [Optional]
	 * @return  boolean
	 */
	public function set($id, $data, $lifetime = NULL)
	{
		if (NULL === $lifetime)
		{
			$lifetime = Arr::get($this->_config, 'default_expire', Cache::DEFAULT_EXPIRE);
		}

		return xcache_set($this->_sanitize_id($id), $data, $lifetime);
	}

	/**
	 * Delete a cache entry based on id
	 *
	 * @param   string   id 
	 * @param   integer  timeout [Optional]
	 * @return  boolean
	 */
	public function delete($id)
	{
		return xcache_unset($this->_sanitize_id($id));
	}

	/**
	 * Delete all cache entries
	 * To use this method xcache.admin.enable_auth has to be Off in xcache.ini
	 *
	 * @return  void
	 */
	public function delete_all()
	{
		xcache_clear_cache(XC_TYPE_PHP, 0);
	}
}
