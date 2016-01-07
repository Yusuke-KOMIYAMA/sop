<?php

namespace Sop;

class Log
{
    public static function error($file, $line, $message)
    {
        error_log('SOP_ERROR:' . self::buildMessage($file, $line, $message));
    }

    public static function warning($file, $line, $message)
    {
        error_log('SOP_WARNING:' . self::buildMessage($file, $line, $message));
    }

    private static function buildMessage($file, $line, $message)
    {
        return
            ' version:' . Config::get('system_version') .
            ' file:' . basename($file) .
            ' line:' . $line .
            ' user:' . Session::getSiteData('user_id') .
            ' message:' . $message;
    }
}
