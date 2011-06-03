<?php defined('SYSPATH') or die('No direct script access.');

class Model_Upload extends Upload {
	public static function save(array $file, $filename = NULL, $directory = NULL, $chmod = 0644)
    {
        if ( ! isset($file['tmp_name']) OR ! is_uploaded_file($file['tmp_name']))
		{
			// Ignore corrupted uploads
			return FALSE;
		}

		if ($filename === NULL)
		{
			// Use the default filename, with a timestamp pre-pended
			$filename = uniqid().$file['name'];
		}

        $config = Core::config('upload');

		if ($config->get('remove_spaces', TRUE) === TRUE)
		{
			// Remove spaces from the filename
			$filename = preg_replace('/\s+/', '_', $filename);
		}

		if ($directory === NULL)
		{
			// Use the pre-configured upload directory
			$directory = $config->get('path');
		}

        $abs_path = Core::$cache_dir.'/'.$config->get('path').$directory;

		if ( ! is_dir($abs_path) and ! @mkdir($abs_path, 0777, true))
		{
			throw new CE('Directory :dir create failed', array(':dir' => Core::debug_path($abs_path)));
		}

        if( ! is_writable(realpath($abs_path)) and ! @chmod($abs_path, 0777))
        {
			throw new CE('Directory :dir must be writable', array(':dir' => Core::debug_path($abs_path)));
        }

		// Make the filename into a complete path
		$abs_file = realpath($abs_path).DIRECTORY_SEPARATOR.$filename;

		if (move_uploaded_file($file['tmp_name'], $abs_file))
		{
			if ($chmod !== FALSE)
			{
				// Set permissions on filename
				chmod($abs_file, $chmod);
			}
            
            return $abs_file;
		}

		return FALSE;
    }

    public static function rsync_save($file, $path)
    {
        $path = trim($path, '/');
        $relative = Core::config('upload')->get('path').$path;
        $config = Core::config('upload')->get('rsync', FALSE);
        $filename = pathinfo($file, PATHINFO_BASENAME);

        if( ! $config)
            return FALSE;

        if( ! is_file($file))
            return FALSE;

        $servers = Arr::get($config, 'servers');

        if(empty($servers))
        {
            $dest = DOCROOT.$relative.DIRECTORY_SEPARATOR;

            if( ! self::rsync($file, $dest))
                return false;

            $res = sprintf('http://%s%s%s/%s', $_SERVER['SERVER_NAME'], Core::$base_url, $relative, $filename);
        }
        else
        {
            $dest = $config['module'];
            $src = sprintf('%s/./%s/%s', Core::$cache_dir, $relative, $filename);

            foreach($servers as $server)
            {
                if( ! self::rsync($src, $dest, $server))
                    return false;
            }

            $res = sprintf('%s/%s/%s', trim($config['host'], '/'), $relative, $filename);
        }
        
        return $res;
    }

    protected static function rsync($src, $dest, $server = NULL)
    {
        //rsync -avR /foo/bar/baz.c remote:/tmp/
        if($server)
        {
            // rsync -aR /path/to/dir/./star/large/12/1232fdsfda.png server::module/";
            $bin = "rsync -aR @src @server::@dest/";
        }
        else
        {
            $bin = "rsync -a @src @dest/";
        }

        $com = strtr($bin, array(
            '@src' => $src,
            '@server' => $server,
            '@dest' => $dest,
        ));

        system($com, $res);

        return $res === 0;
    }
}
