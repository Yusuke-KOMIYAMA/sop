<?php
// ログインチェックは不要（ログインしていない状態でも使う情報なのでチェックしてはいけない）
include_once(__DIR__."/../../sop/src/config.php");
include_once(__DIR__."/../../sop/src/db_common.php");

/**
 * Global config の取得
 */

// ---------------------
// 出力
// ---------------------

header("Content-type:application/json; charset=utf-8");
$msg001 = "The system succeeded in an accession to the data.";
echo json_encode(array('success'=> true, 'msg'=>\Sop\Api::htmlEncodeLines(array($msg001)), 'root'=> \Sop\SystemConfigForUI::getConfigs()));
exit;
