<?php

namespace Sop;

class Resource
{
    private static function _baseDirectory()
    {
        return dirname(dirname(__DIR__)) . '/resources';
    }

    public static function getImageFilePath($filename)
    {
        return self::_baseDirectory() . '/images/' . $filename;
    }
}
