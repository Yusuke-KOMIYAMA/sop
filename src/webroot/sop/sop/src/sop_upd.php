<?php
include_once(__DIR__."/login_check.php");
include_once(__DIR__."/config.php");
include_once(__DIR__."/db_common.php");

/**
 * SOP 登録 更新
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

$pj_id = (array_key_exists('pj_id', $_REQUEST)) ? str_replace('pj_', '', $_REQUEST['pj_id']) : ''; // add の場合
$sop_id = (array_key_exists('sop_id', $_REQUEST)) ? str_replace('sop_', '', $_REQUEST['sop_id']) : '';
$sop_name = (array_key_exists('sop_name', $_REQUEST)) ? $_REQUEST['sop_name'] : '';
if($sop_name == ''){
    \Sop\Log::warning(__FILE__, __LINE__, 'User entered empty sop_name.');
    $msg001 = "Please input a SOP title."; // SOPタイトルを入力してください
    \Sop\Api::exitWithError(array($msg001));
}
$checker_required_flag = (array_key_exists('checker_required_flag', $_REQUEST)) ? ($_REQUEST['checker_required_flag'] == 'on' ? 1 : 0 ) : 0;

$div = (trim($sop_id) == '') ? 'add' : 'upd';

// 更新の場合
if($div == 'upd')
{
    // --- 既に入力が開始している場合は更新しない
    $sel_sql = getSQLBaseForFileList();
    $sel_sql .= " AND file.sop_id = :sop_id";

    $sql = "SELECT count(*) cnt FROM ($sel_sql) as tmp";

    $params = array();
    $params[':sop_id'] = $sop_id;

    $stmt = $db->prepare($sql);
    $stmt->execute($params);

    $cnt = 0;
    foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
        $cnt = (int)$row['cnt'];
    }

    if($cnt > 0){
        \Sop\Log::warning(__FILE__, __LINE__, 'Project is already used.');
         $msg002 = "This project already has been started the input."; // このプロジェクトは既に入力が開始しています
        \Sop\Api::exitWithError(array($msg002));
    }

    // --- データ存在チェック
    $sel_sql = getSQLBaseForSopList();
    $sel_sql .= " AND sop.sop_id = :sop_id";

    $sql = "SELECT count(*) cnt FROM ($sel_sql) as tmp";

    $params = array();
    $params[':sop_id'] = $sop_id;

    $stmt = $db->prepare($sql);
    $stmt->execute($params);

    $cnt = 0;
    foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
        $cnt = (int)$row['cnt'];
    }

    if($cnt == 0){
        \Sop\Log::warning(__FILE__, __LINE__, 'User tries to update non-existent sop.');
        $msg003 = "The data already has been deleted."; // 対象のデータは既に削除されています
        \Sop\Api::exitWithError(array($msg003));
    }
}

// ---------------------------
// データ登録
// ---------------------------
$db->beginTransaction();

if($div == 'add')
{
    // --- TBL: sop
    $sop_id = -1;
    $rslt = addSop($db, $sop_id, $pj_id, $sop_name, $checker_required_flag);
    if(!$rslt)
    {
        \Sop\Log::error(__FILE__, __LINE__, 'Failed to add sop.');
        $msg004 = "The registration failed.: sop"; // 登録に失敗しました: sop
        \Sop\Api::exitWithError(array($msg004));
    }
    $sop_id = getLastID($db);

    // --- TBL: history
    $history_id = -1;
    $rslt = addHistory($db, $history_id, $pj_id, $sop_id, null, null, null, null, $HISTORY_ACTION_SOP_ADD, date("Y-m-d H:i:s"), $user_id, null, null);
    if(!$rslt)
    {
        \Sop\Log::error(__FILE__, __LINE__, 'Failed to add history.');
        $msg005 = "The registration failed.: history"; // 登録に失敗しました: history
        \Sop\Api::exitWithError(array($msg005));
    }
}

if($div == 'upd')
{
    // --- TBL: sop
    $rslt = updSop($db, $sop_id, $sop_name, $checker_required_flag);
    if(!$rslt)
    {
        \Sop\Log::error(__FILE__, __LINE__, 'Failed to update sop.');
        $msg006 = "The update failed.: sop"; // 更新に失敗しました: sop
        \Sop\Api::exitWithError(array($msg006));
        exit;
    }

    // --- TBL: history
    $history_id = -1;
    $rslt = addHistory($db, $history_id, $pj_id, $sop_id, null, null, null, null, $HISTORY_ACTION_SOP_UPD, date("Y-m-d H:i:s"), $user_id, null, null);
    if(!$rslt)
    {
        \Sop\Log::error(__FILE__, __LINE__, 'Failed to add history.');
        $msg007 = "The update failed.: history"; // 更新に失敗しました: history
        \Sop\Api::exitWithError(array($msg007));
    }
}

// ---------------------------
// 終了処理
// ---------------------------
$db->commit();
$db = null;

if($div == 'add'){
    $msg008 = "The registration completed."; // 登録が完了しました
    echo json_encode(array('success'=>true, 'msg'=> \Sop\Api::htmlEncodeLines(array($msg008)), 'role_aprv'=>(bool)$role_aprv, 'role_upld'=>(bool)$role_upld));
}
if($div == 'upd'){
    $msg009 = "The update completed."; // 更新が完了しました
    echo json_encode(array('success'=>true, 'msg'=> \Sop\Api::htmlEncodeLines(array($msg009)), 'role_aprv'=>(bool)$role_aprv, 'role_upld'=>(bool)$role_upld));
}
exit;
