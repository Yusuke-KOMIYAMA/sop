<?php
require_once __DIR__ . '/../../../../../backend/src/bootstrap.php';
include_once(__DIR__."/config.php");

/**
 * Global config の取得
 */

// ---------------------
// 出力
// ---------------------

header("Content-type:application/json; charset=utf-8");
$msg001 = "The system succeeded to obtaion the data."; // データの取得に成功しました
echo json_encode(array('success'=> true, 'msg'=> \Sop\Api::htmlEncodeLines(array($msg001)), 'root'=> \Sop\SystemConfigForUI::getConfigs()));
exit;
