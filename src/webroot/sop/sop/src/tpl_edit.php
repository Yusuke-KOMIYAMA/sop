<?php
include_once(__DIR__."/login_check.php");
include_once(__DIR__."/config.php");
include_once(__DIR__."/db_common.php");

/**
 * テンプレート 詳細編集
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
$tpl_id = (array_key_exists('tpl_id', $_REQUEST) ? $_REQUEST['tpl_id'] : '');
$tpl_name = (array_key_exists('tpl_name', $_REQUEST) ? $_REQUEST['tpl_name'] : '');
$upld_cmnt = (array_key_exists('upld_cmnt', $_REQUEST) ? $_REQUEST['upld_cmnt'] : '');

// --- データ存在チェック (親データ)
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
    \Sop\Log::warning(__FILE__, __LINE__, 'Specified template does not exist.');
    $msg001 = "The template already has been deleted."; // テンプレートは既に削除されています
    \Sop\Api::exitWithError(array($msg001));
}

//データの取得
$params = array();
$params[':tpl_id'] = $tpl_id;

$stmt = $db->prepare($sel_sql);
$stmt->execute($params);
foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
    $schema_id = (int)$row['schema_id'];
}


// ---------------------------
// データ登録
// ---------------------------
$db->beginTransaction();

$date = date("Y-m-d H:i:s");
// --- TBL: tpl
$rslt = updTplDetail($db, $tpl_id, $tpl_name, $upld_cmnt);
if(!$rslt)
{
    \Sop\Log::error(__FILE__, __LINE__, 'Failed to update tpl.');
    $msg002 = "The update failed.: tpl"; // 更新に失敗しました: tpl
    \Sop\Api::exitWithError(array($msg002));
}


// --- TBL: history
$history_id = -1;
$rslt = addHistory($db, $history_id, $pj_id, $sop_id, $tpl_id, $schema_id, null, null, $HISTORY_ACTION_TPL_DETAIL_EDIT, $date, $user_id, null, $upld_cmnt);
if(!$rslt)
{
    \Sop\Log::error(__FILE__, __LINE__, 'Failed to add history.');
    $msg003 = "The registoration failed: history"; // 登録に失敗しました: history
    \Sop\Api::exitWithError(array($msg003));
}


// ---------------------------
// 終了処理
// ---------------------------
$db->commit();
$db = null;

$msg004 = "The edit complted."; // 編集が完了しました
echo json_encode(array('success'=>true, 'msg'=> \Sop\Api::htmlEncodeLines(array($msg004)), 'role_aprv'=>(bool)$role_aprv, 'role_upld'=>(bool)$role_upld));
exit;
