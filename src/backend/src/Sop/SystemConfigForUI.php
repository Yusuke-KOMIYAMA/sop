<?php

namespace Sop;

class SystemConfigForUI
{
    public static function getConfigs()
    {
        // Caution: Do not include secret values (eg. database_password)
        $configs = array();

        foreach (array(
            'footer',
            'system_version',
            'use_sso',
            'debug_pseudo_sso',
            'header_home_button_url',
            'oauth2_logout_uri',
        ) as $key) {
            $configs[$key] = Config::get($key);
        }

        $configs['session_site_key'] = Session::siteKey();

        return Api::htmlEncode($configs);
    }
}
