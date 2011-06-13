<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Provides remote server communications options using [curl](http://php.net/curl).
 *
 */
class Remote {

	// Default curl options
	public static $default_options = array
	(
		CURLOPT_USERAGENT      => 'Mozilla/5.0 (compatible;/)',
		CURLOPT_CONNECTTIMEOUT => 5000,
		CURLOPT_TIMEOUT        => 5000,
	);

	/**
	 * Returns the output of a remote URL. Any [curl option](http://php.net/curl_setopt)
	 * may be used.
	 *
	 *     // Do a simple GET request
	 *     $data = Remote::get($url);
	 *
	 *     // Do a POST request
	 *     $data = Remote::get($url, array(
	 *         CURLOPT_POST       => TRUE,
	 *         CURLOPT_POSTFIELDS => http_build_query($array),
	 *     ));
	 *
	 * @param   string   remote URL
	 * @param   array    curl options
	 * @return  string
	 * @throws  CE
	 */
	public static function get($url, array $options = NULL)
	{
		if ($options === NULL)
		{
			// Use default options
			$options = Remote::$default_options;
		}
		else
		{
			// Add default options
			$options = $options + Remote::$default_options;
		}

		// The transfer must always be returned
		$options[CURLOPT_RETURNTRANSFER] = TRUE;

        // Https request
        if(preg_match('~^https://~i', $url))
        {
            $options = $options + array(
                CURLOPT_SSL_VERIFYPEER => FALSE,
                CURLOPT_SSL_VERIFYHOST => FALSE,
            );
        }

		// Open a new remote connection
		$remote = curl_init($url);

		// Set connection options
		if ( ! curl_setopt_array($remote, $options))
		{
			throw new CE('Failed to set CURL options, check CURL documentation: :url',
				array(':url' => 'http://php.net/curl_setopt_array'));
		}

		// Get the response
		$response = curl_exec($remote);

		// Get the response information
		$code = curl_getinfo($remote, CURLINFO_HTTP_CODE);
		if ($code AND $code < 200 OR $code > 299)
		{
			$error = $response;
		}
		elseif ($response === FALSE)
		{
			$error = curl_error($remote);
		}
 
		// Close the connection
		curl_close($remote);

		if (isset($error))
		{
			throw new CE('Error fetching remote :url [ status :code ] :error',
				array(':url' => $url, ':code' => $code, ':error' => $error));
		}

		return $response;
	}

	/**
	 * Returns the status code (200, 500, etc) for a URL.
	 *
	 *     $status = Remote::status($url);
	 *
	 * @param   string  URL to check
	 * @return  integer
	 */
	public static function status($url)
	{
		// Get the hostname and path
		$url = parse_url($url);

		if (empty($url['path']))
		{
			// Request the root document
			$url['path'] = '/';
		}

		// Open a remote connection
		$port = isset($url['port']) ? $url['port'] : 80;
		$remote = fsockopen($url['host'], $port, $errno, $errstr, 5);

		if ( ! is_resource($remote))
			return FALSE;

		// Set CRLF
		$line_feed = "\r\n";

		// Send request
		fwrite($remote, 'HEAD '.$url['path'].' HTTP/1.0'.$line_feed);
		fwrite($remote, 'Host: '.$url['host'].$line_feed);
		fwrite($remote, 'Connection: close'.$line_feed);
		fwrite($remote, 'User-Agent: )'.$line_feed);

		// Send one more CRLF to terminate the headers
		fwrite($remote, $line_feed);

		// Remote is offline
		$response = FALSE;

		while ( ! feof($remote))
		{
			// Get the line
			$line = trim(fgets($remote, 512));

			if ($line !== '' AND preg_match('#^HTTP/1\.[01] (\d{3})#', $line, $matches))
			{
				// Response code found
				$response = (int) $matches[1];
				break;
			}
		}

		// Close the connection
		fclose($remote);

		return $response;
	}

} // End remote