<?php defined('SYSPATH') or die('No direct script access.');

class Model_API_User extends Model_API
{
    public function create($user_info)
    {
        $mute = array(
            'friends_count' => 0,
            'followers_count' => 0,
            'statuses_count' => 0,
            'domain_name' => '',
            'portrait' => '',
        );

        $response = $this->post('/user/checkin.php', $mute + $user_info);
        $response = json_decode($response, TRUE);

        if($this->failed($response))
        {
            return false;
        }

        return $response['result'];
    }

    public function update($data)
    {
        return $this->post('/user/modifyuserinf.php', $data);
    }
}

