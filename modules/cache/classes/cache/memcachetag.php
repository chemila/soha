<?php defined('SYSPATH') or die('No direct script access.');

class Cache_MemcacheTag extends Cache_Memcache implements Cache_Tagging {

	/**
	 * Constructs the memcache object
	 *
	 * @param  array     configuration
	 * @throws  Cache_Exception
	 */
	protected function __construct(array $config)
	{
		if ( ! method_exists($this->_memcache, 'tag_add'))
		{
			throw new Cache_Exception('Memcached-tags PHP plugin not present. Please see http://code.google.com/p/memcached-tags/ for more information');
		}

		parent::__construct($config);
	}

	/**
	 * Set a value based on an id with tags
	 * 
	 * @param   string   id 
	 * @param   mixed    data 
	 * @param   integer  lifetime [Optional]
	 * @param   array    tags [Optional]
	 * @return  boolean
	 */
	public function set_with_tags($id, $data, $lifetime = NULL, array $tags = NULL)
	{
		$result = $this->set($id, $data, $lifetime);

		if ($result and $tags)
		{
			foreach ($tags as $tag)
			{
				$this->_memcache->tag_add($tag, $id);
			}
		}

		return $result;
	}

	/**
	 * Delete cache entries based on a tag
	 *
	 * @param   string   tag 
	 * @return  boolean
	 */
	public function delete_tag($tag)
	{
		return $this->_memcache->tag_delete($tag);
	}

	/**
	 * Find cache entries based on a tag
	 *
	 * @param   string   tag 
	 * @return  void
	 * @throws  Cache_Exception
	 */
	public function find($tag)
	{
		throw new Cache_Exception('Memcached-tags does not support finding by tag');
	}	
}
