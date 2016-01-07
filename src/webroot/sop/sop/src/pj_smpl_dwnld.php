<?php
include_once(__DIR__."/login_check.php");
include_once(__DIR__."/config.php");
include_once(__DIR__."/db_common.php");

/**
 * テンプレート ダウンロード
 */
$db = createDBConnection();

// ---------------------------
// parameters 取得
// ---------------------------
$grp_id    = \Sop\Session::getSiteData('grp_id');
$role_aprv = \Sop\Session::getSiteData('role_aprv');
$role_upld = \Sop\Session::getSiteData('role_upld');
$role_user = \Sop\Session::getSiteData('role_user');
$user_id   = \Sop\Session::getSiteData('user_id');

$pj_id = (array_key_exists('pj_id', $_REQUEST)) ? str_replace('pj_', '', $_REQUEST['pj_id']) : '';

// ---------------------------
// データ取得
// ---------------------------
// --- pj_smpl 取得
$sql = getSQLBaseForPjSmplList();
$sql .= " WHERE pj_smpl.pj_id = :pj_id AND v_pj.grp_id = :grp_id ORDER BY display_order";

$params = array();
$params[':pj_id'] = $pj_id;
$params[':grp_id'] = $grp_id;

$stmt = $db->prepare($sql);
$stmt->execute($params);

$pj_smpl_list = array();
foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
	array_push($pj_smpl_list, $row['smpl_given_no']);
}

// --- 一時ファイルに書き込み
$file_path = "$DATA_DIR_PATH_TMP/smpl_list.txt";
file_put_contents($file_path, implode("\r\n", $pj_smpl_list));

// ---------------------------
// 終了処理
// ---------------------------
$db = null;

header('Content-Description: File Transfer');
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename='.basename($file_path));
header('Cache-Control: no-cache');
header('Pragma: no-cache');
header('Content-Length: '.filesize($file_path));
ob_clean();
flush();
readfile($file_path);
unlink($file_path);
exit;
