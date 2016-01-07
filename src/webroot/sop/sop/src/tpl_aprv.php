<?php
include_once(__DIR__."/login_check.php");
include_once(__DIR__."/config.php");
include_once(__DIR__."/db_common.php");

/**
 * テンプレート 承認
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
$sop_id = (array_key_exists('sop_id', $_REQUEST)) ? str_replace('sop_', '', $_REQUEST['sop_id']) : '';
$tpl_id = (array_key_exists('tpl_id', $_REQUEST)) ? $_REQUEST['tpl_id'] : '';
$aprv_cmnt = (array_key_exists('aprv_cmnt', $_REQUEST)) ? $_REQUEST['aprv_cmnt'] : '';

// --- データ存在チェック
$sel_sql = getSQLBaseForTplList();
$sel_sql .= " AND tpl.tpl_id = :tpl_id";

$sql = "SELECT count(*) cnt FROM ($sel_sql) as tmp";

$params = array();
$params[':tpl_id'] = $tpl_id;

$stmt = $db->prepare($sql);
$stmt->execute($params);

$cnt = 0;
foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
    $cnt = (int)$row['cnt'];
}

if($cnt == 0){
    \Sop\Log::warning(__FILE__, __LINE__, 'User tries to approve non-existent sop.');
    \Sop\Api::exitWithError(array("対象のデータは既に削除されています"));
}

// --- データ更新前に最新バージョンtpl_idを取得しておく
$sql = getSQLBaseForSopList();
$sql .= " AND sop.sop_id = :sop_id";

$params = array();
$params[':sop_id'] = $sop_id;

$stmt = $db->prepare($sql);
$stmt->execute($params);

$ex_latest_tpl_id = null;
foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
    $ex_latest_tpl_id = $row['latest_tpl_id'];
}

// --- 最新の revision_no を取得しておく
$ex_latest_tpl_ver = 0;
if($ex_latest_tpl_id != null)
{
    $sql = getSQLBaseForTplList();
    $sql .= " AND tpl.tpl_id = :tpl_id";

    $params = array();
    $params[':tpl_id'] = $ex_latest_tpl_id;

    $stmt = $db->prepare($sql);
    $stmt->execute($params);

    foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
        $ex_latest_tpl_ver = $row['revision_no'];
    }
}

// ---------------------------
// DB更新
// ---------------------------
$db->beginTransaction();

$tpl_aprv_date = date("Y-m-d H:i:s");

// --- TBL: sop
$rslt = updSopAprv($db, $sop_id, $tpl_id); // 最新バージョン更新
if(!$rslt)
{
    \Sop\Log::error(__FILE__, __LINE__, 'Failed to update sop.');
    \Sop\Api::exitWithError(array("更新に失敗しました: sop"));
}

// --- TBL: tpl
$revision_no = $ex_latest_tpl_ver+1;
$rslt = updTplAprv($db, $tpl_id, $APRV_FLG_OK, $LATEST_FLG, $aprv_cmnt, $tpl_aprv_date, $user_id, $revision_no); // 承認
if(!$rslt)
{
    \Sop\Log::error(__FILE__, __LINE__, 'Failed to update tpl.');
    \Sop\Api::exitWithError(array("更新に失敗しました: tpl"));
}

// --- TBL: history
$history_id = -1;
$rslt = addHistory($db, $history_id, $pj_id, $sop_id, $tpl_id, null, null, null, $HISTORY_ACTION_TPL_APRV, $tpl_aprv_date, $user_id, null, $aprv_cmnt);
if(!$rslt)
{
    \Sop\Log::error(__FILE__, __LINE__, 'Failed to add history.');
    \Sop\Api::exitWithError(array("更新に失敗しました: history"));
}

if($ex_latest_tpl_id != null)
{
    $rslt = updTplLatest($db, $ex_latest_tpl_id, $LATEST_FLG_NOT); // 旧最新バージョン tpl の latest_flg を LATEST_FLG_NOT に更新
    if(!$rslt)
    {
        \Sop\Log::error(__FILE__, __LINE__, 'Failed to update latest_flg.');
        \Sop\Api::exitWithError(array("更新に失敗しました: tpl ex-latest"));
    }
}

// ---------------------------
// 終了処理
// ---------------------------
$db->commit();
$db = null;

echo json_encode(array('success'=>true, 'msg'=> \Sop\Api::htmlEncodeLines(array('承認が完了しました')), 'role_aprv'=>(bool)$role_aprv, 'role_upld'=>(bool)$role_upld));
exit;
