<?php

namespace Sop;

class Session
{
    public static function start()
    {
        $session_lifetime = intval(Config::get('session_lifetime'));
        $session_path = Config::get('session_path');

        session_name(Config::get('session_name'));
        session_set_cookie_params($session_lifetime, $session_path);
        session_start();

        $secure = Config::get('session_cookie_secure');
        setcookie(session_name(), session_id(), time() + $session_lifetime, $session_path, '', $secure);
    }

    public static function destroy()
    {
        session_destroy();
    }

    public static function siteKey()
    {
        if (preg_match('#webroot/sop/sop_mng/src/#', $_SERVER['SCRIPT_FILENAME'])) {
            return 'sop_mng';
        } else if (preg_match('#webroot/sop/sop/tablet/src/#', $_SERVER['SCRIPT_FILENAME'])) {
            return 'sop_tablet';
        } else if (preg_match('#backend/app/sso/#', $_SERVER['SCRIPT_FILENAME'])) {
            return 'sso';
        } else {
            return 'sop';
        }
    }

    public static function getSiteData($key)
    {
        if (! isset($_SESSION[self::siteKey()][$key])) {
            return null;
        }
        return $_SESSION[self::siteKey()][$key];
    }

    public static function setSiteData($key, $value)
    {
        $_SESSION[self::siteKey()][$key] = $value;
    }

    public static function clearSiteData()
    {
        unset($_SESSION[self::siteKey()]);
    }
}
