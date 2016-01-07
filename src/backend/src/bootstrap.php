<?php

error_reporting(E_ALL);
setlocale(LC_ALL, 'ja_JP.UTF-8');
date_default_timezone_set('Asia/Tokyo');
ini_set('display_errors', 0);
ini_set('log_errors', 1);

define('_MPDF_TEMP_PATH', __DIR__.'/../../uploaded_files/tmp/mpdf_tmp');
if (! is_dir(_MPDF_TEMP_PATH)) {
    mkdir(_MPDF_TEMP_PATH);
}

require_once __DIR__ . '/autoload.php';
require_once __DIR__ . '/../vendor/autoload.php';

\Sop\Config::initialize(__DIR__ . '/../config');

function sop_exception_handler($exception) {
    \Sop\Log::error(__FILE__, __LINE__, 'exception ' . $exception->getMessage());
}
set_exception_handler('sop_exception_handler');

if (isset($_SERVER['REMOTE_ADDR'])) {
    \Sop\Session::start();
}
