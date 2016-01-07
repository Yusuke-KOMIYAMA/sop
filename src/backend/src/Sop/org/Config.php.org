<?php

namespace Sop;

use Symfony\Component\Yaml\Parser;

class Config
{
    private static $_values = null;

    public static function initialize($config_directory)
    {
        // load default values
        $yaml = new Parser();
        self::$_values = $yaml->parse(file_get_contents($config_directory . '/config.default.yaml'));

        // load local values
        $filepath = $config_directory . '/config.yaml';
        if (file_exists($filepath)) {
            $values = $yaml->parse(file_get_contents($filepath));
            if ($values) {
                foreach ($values as $k => $v) {
                    if (isset(self::$_values[$k])) {
                        self::$_values[$k] = $v;
                    }
                }
            }
        }
    }

    public static function get($key)
    {
        if (! isset(self::$_values[$key])) {
            throw new \Exception("invalid config key: $key");
        }
        return self::$_values[$key];
    }
}
