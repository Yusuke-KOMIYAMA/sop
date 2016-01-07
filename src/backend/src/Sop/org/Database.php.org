<?php

namespace Sop;

require_once __DIR__ . '/../RedBean/rb.php';

use R;
use PDO;

class Database
{
    private static $_redBeanInitialized = false;

    public static function setupRedBean()
    {
        try {
            if (! self::$_redBeanInitialized) {
                self::$_redBeanInitialized = true;

                R::setup(
                    Config::get('database_dsn'),
                    Config::get('database_user'),
                    Config::get('database_password')
                );
                R::freeze(true);

                R::exec('SET NAMES utf8');

                define('REDBEAN_MODEL_PREFIX', '\\Sop\\Model\\');
            }
        } catch (\Exception $e) {
            \Sop\Log::error(__FILE__, __LINE__, 'Failed to setup database connection');
            throw $e;
        }
    }

    public static function setupPDO()
    {
        try {
            $options = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8');
            $pdo = new PDO(
                Config::get('database_dsn'),
                Config::get('database_user'),
                Config::get('database_password'),
                $options
            );
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            return $pdo;
        } catch (\Exception $e) {
            \Sop\Log::error(__FILE__, __LINE__, 'Failed to setup database connection');
            throw $e;
        }
    }
}
