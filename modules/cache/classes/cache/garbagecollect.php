<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Garbage Collection interface for caches that have no GC methods
 * of their own, such as [Cache_File] and [Cache_Sqlite]. Memory based
 * cache systems clean their own caches periodically.
 *
 */
interface Cache_GarbageCollect {
	/**
	 * Garbage collection method that cleans any expired
	 * cache entries from the cache.
	 *
	 * @return void
	 */
	public function garbage_collect();
}
