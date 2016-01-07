<?php
include_once(__DIR__."/login_check.php");
include_once(__DIR__."/config.php");
include_once(__DIR__."/../../src/db_common.php");

/**
 * 手書きオブジェクト取得
 */
$db = createDBConnection();

// ---------------------------
// parameters 取得
// ---------------------------
$grp_id  = \Sop\Session::getSiteData('grp_id');
$user_id = \Sop\Session::getSiteData('user_id');

$file_id = (array_key_exists('file_id', $_REQUEST)) ? (int)$_REQUEST['file_id'] : '';

// ---------------------------
// 表示コンテンツ取得
// ---------------------------
$sql = getSQLBaseForFilehwrList();
$sql .= " AND file_hwr.file_id = :file_id";

$params = array();
$params[':file_id'] = $file_id;

$stmt = $db->prepare($sql);
$stmt->execute($params);

$hwr_val = array();
foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row)
{
    $row['update_time'] = strtotime($row['update_time']);
    $hwr_val[$row['mark_position_y']] = $row;
}

// ---------------------------
// 出力
// ---------------------------
header("Content-type:application/json; charset=utf-8");
echo json_encode(array('success'=>true, 'hwr_val'=>$hwr_val));
exit;
