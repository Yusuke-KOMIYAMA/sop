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

$params_temp = (array_key_exists('params', $_REQUEST)) ? $_REQUEST['params'] : '';
$form_params = json_decode($params_temp, true);

$pj_id = $form_params['pj_id'];
$sop_id = $form_params['sop_id'];
$tpl_id = $form_params['tpl_id'];

$form_list = $form_params['form_list'];

// ---------------------------
// 実施要否判定
// ---------------------------

// --- 既に承認済みの場合は更新しない
$sel_sql = getSQLBaseForTplList();
$sel_sql .= " AND tpl.tpl_id = :tpl_id AND aprv_date IS NOT NULL AND aprv_user IS NOT NULL AND aprv_cmnt IS NOT NULL";

$sql = "SELECT count(*) cnt FROM ($sel_sql) as tmp";

$params = array();
$params[':tpl_id'] = $tpl_id;

$stmt = $db->prepare($sql);
$stmt->execute($params);

$cnt = 0;
foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
    $cnt = (int)$row['cnt'];
}

if($cnt > 0){
    \Sop\Log::warning(__FILE__, __LINE__, 'sop is already approved.');
    $msg001 = "This SOP already has been accepted."; // この手順書は既に承認されています
    \Sop\Api::exitWithError(array($meg001));
}

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
    \Sop\Log::warning(__FILE__, __LINE__, 'sop is already deleted.');
    $msg002 = "The data already has been deleted."; // 対象のデータは既に削除されています
    \Sop\Api::exitWithError(array($msg002));
}

// ---------------------------
// データ登録
// ---------------------------
$db->beginTransaction();

// 既存のデータを削除する。
delForm($db, $tpl_id);

$div = 'upd';

foreach($form_list as $form){

    $form_id = (array_key_exists('form_id', $form) ? $form['form_id'] : '');
    $div = (trim($form_id) == '') ? 'add' : 'upd';

    $x = $form['x'];
    $y = $form['y'];
    $width = $form['width'];
    $height = $form['height'];
    $element_type = $form['element_type'];
    $default_value = isset($form['default_value']) ? $form['default_value'] : '';

    if($div == 'add') {
        // --- TBL: form
        $rslt = addForm($db, $pj_id, $sop_id, $tpl_id, $x, $y, $width, $height, $element_type, $default_value);
        if(!$rslt)
        {
            \Sop\Log::error(__FILE__, __LINE__, 'Failed to add form.');
            $msg003="The registration failed."; // 登録に失敗しました: form
            \Sop\Api::exitWithError(array($msg003));
        }

    }

    if($div == 'upd') {
        // --- TBL: form
        $rslt = updForm($db, $form_id, $pj_id, $sop_id, $tpl_id, $x, $y, $width, $height, $element_type, $default_value);
        if(!$rslt)
        {
            \Sop\Log::error(__FILE__, __LINE__, 'Failed to update form.');
            $msg004 = "The update failed."; // 更新に失敗しました: form
            \Sop\Api::exitWithError(array($msg004));
        }
    }
}

// --- TBL: history
$history_id = -1;
$rslt = addHistory($db, $history_id, $pj_id, $sop_id, $tpl_id, null, null, null, $HISTORY_ACTION_TPL_FORM_UPSERT, date("Y-m-d H:i:s"), $user_id, null, null);
if(!$rslt)
{
    \Sop\Log::error(__FILE__, __LINE__, 'Failed to update form.');
    $msg005 = "The registration and/or update failed.: history"; // 登録・更新に失敗しました: history
    \Sop\Api::exitWithError(array($msg005));
}

// ---------------------------
// 終了処理
// ---------------------------
$db->commit();
$db = null;

if($div == 'add'){
    $msg006 = "The registration completed.";
    echo json_encode(array('success'=>true, 'msg'=> \Sop\Api::htmlEncodeLines(array($msg006)))); // 登録が完了しました
}
if($div == 'upd'){
    $msg007 = "The update completed.";
    echo json_encode(array('success'=>true, 'msg'=> \Sop\Api::htmlEncodeLines(array($msg007)))); // 更新が完了しました 
}
exit;
