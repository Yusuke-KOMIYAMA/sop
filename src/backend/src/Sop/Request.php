<?php

namespace Sop;

class Request
{
    /**
     * $_REQUESTから値を取得する。
     * 値が存在しない場合は、エラー終了。
     *
     * @param string $key キー
     *
     * @return mixed
     */
    public static function requiredValue($key)
    {
        if (! isset($_REQUEST[$key])) {
            $msg01 = "It is an wrong request."; // 不正なリクエストです。
            Api::exitWithError(array($msg01));
        }
        return $_REQUEST[$key];
    }

    /**
     * $_REQUESTから値を取得する。
     * 値が存在しない場合は、空文字列。
     *
     * @param string $key キー
     *
     * @return mixed
     */
    public static function value($key)
    {
        return isset($_REQUEST[$key]) ? $_REQUEST[$key] : '';
    }
}
