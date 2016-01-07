<?php

namespace Sop;

class Api
{
    public static function htmlDecode($string) {
        return htmlspecialchars_decode($string);
    }

    public static function htmlEncode($string) {
        if (is_array($string)) {
            foreach ($string as $k => $v) {
                $string[$k] = self::htmlEncode($v);
            }
            return $string;
        } else {
            return htmlspecialchars($string);
        }
    }

    public static function htmlEncodeLines(array $msgLines)
    {
        $safeMsgLines = array();
        foreach ($msgLines as $line) {
            $safeMsgLines[] = self::htmlEncode($line);
        }
        return join('<br />', $safeMsgLines);
    }

    public static function exitWithError(array $msgLines)
    {
        header("Content-type:application/json; charset=utf-8");
        echo json_encode(array('success' => false, 'msg' => self::htmlEncodeLines($msgLines)));
        exit;
    }

    public static function exitWithSessionExpired()
    {
        header("Content-type:application/json; charset=utf-8");
        echo json_encode(array('success' => false, 'msg' => '', 'session_expired' => true));
        exit;
    }
}
