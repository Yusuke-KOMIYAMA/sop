<?php
include_once(__DIR__."/login_check.php");
include_once(__DIR__."/config.php");
include_once(__DIR__."/../../src/db_common.php");

/**
 * プロジェクト検体サンプル一覧
 */
$db = createDBConnection();

// ---------------------
// parameters 取得
// ---------------------
$grp_id  = \Sop\Session::getSiteData('grp_id');
$user_id = \Sop\Session::getSiteData('user_id');

$pj_id = (array_key_exists('pj_id', $_REQUEST)) ? $_REQUEST['pj_id'] : '';

$start = (array_key_exists('start', $_REQUEST)) ? intval($_REQUEST['start']) : 0;
$limit = (array_key_exists('limit', $_REQUEST)) ? intval($_REQUEST['limit']) : 25;

// ---------------------
// データ取得
// ---------------------
$sel_sql = getSQLBaseForPjSmplList();
$sel_sql .= " WHERE pj_smpl.pj_id = :pj_id AND v_pj.grp_id = :grp_id";

$params = array();
$params[':pj_id'] = $pj_id;
$params[':grp_id'] = $grp_id;

// --- 件数取得
$sql = "SELECT count(*) cnt FROM ($sel_sql) as tmp";

$stmt = $db->prepare($sql);
$stmt->execute($params);

$cnt = 0;
foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
    $cnt = (int)$row['cnt'];
}

// --- データ取得
$sql = $sel_sql;
$sql .= " ORDER BY display_order LIMIT $limit OFFSET $start ";

$stmt = $db->prepare($sql);
$stmt->execute($params);

$pjsmpl_list = array();
foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
    array_push($pjsmpl_list, $row);
}

// ---------------------
// 出力
// ---------------------
$db = null;

header("Content-type:application/json; charset=utf-8");
$msg001 = "The system succeeded to obtaion the data."; // データの取得に成功しました
echo json_encode(
    array('success' => true,
          'msg'     => \Sop\Api::htmlEncodeLines(array($msg001)),
          'root'    => \Sop\Api::htmlEncode($pjsmpl_list),
          'total'   => $cnt));
exit;
