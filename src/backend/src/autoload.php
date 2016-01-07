<?php

class SopClassLoader
{
    /**
     * Autoloader
     *
     * @param string $className class name
     *
     * @return void
     */
    public static function autoload($className)
    {
        $className = ltrim($className, '\\');
        $fileName  = '';
        $namespace = '';
        if ($lastNsPos = strrpos($className, '\\')) {
            $namespace = substr($className, 0, $lastNsPos);
            $className = substr($className, $lastNsPos + 1);
            $fileName  = str_replace('\\', '/', $namespace) . '/';
        }
        $fileName .= str_replace('_', '/', $className) . '.php';
        $fileName = __DIR__ . '/' . $fileName;

        if (file_exists($fileName)) {
            include $fileName;
        }
    }
}

spl_autoload_register('SopClassLoader::autoload');
