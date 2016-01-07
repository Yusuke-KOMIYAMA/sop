<?php
require_once __DIR__."/login_check.php";
require_once __DIR__."/config.php";
require_once __DIR__."/db_common.php";

\Sop\Database::setupRedBean();

/**
 * テンプレート 承認可能状態へ変更
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

$pj_id        = \Sop\Request::requiredValue('pj_id');
$sop_id       = \Sop\Request::requiredValue('sop_id');
$tpl_id       = \Sop\Request::requiredValue('tpl_id');
$new_aprv_flg = \Sop\Request::requiredValue('new_aprv_flg');

// --- 関連付く schema を全て取得
$sql = getSQLBaseForSchemaList();
$sql .= " AND `schema`.tpl_id = :tpl_id";
foreach (R::getAll($sql, array(':tpl_id' => $tpl_id)) as $schema) {
    // sopimageの場合、入力フォームが設定されていない場合は許可しない。
    if ($schema['schema_type'] == $SCHEMA_TYPE_SRC) {
        $sql = getSQLBaseForFormList();
        $sql .= " AND form.tpl_id = :tpl_id";
        if (count(R::getAll($sql, array(':tpl_id' => $tpl_id))) == 0) {
            \Sop\Log::warning(__FILE__, __LINE__, 'There is no associated form.');
            $msg001 = ""; // 入力フォームを追加してから申請してください。
            \Sop\Api::exitWithError(array($msg001));
        }
    }
}

// ---------------------------
// 承認可能状態に変更
// ---------------------------
$db->beginTransaction();

$date = date("Y-m-d H:i:s");
// --- TBL: tpl
$rslt = updTplTransitAprv($db, $tpl_id, $new_aprv_flg);
if (!$rslt) {
    \Sop\Log::error(__FILE__, __LINE__, 'Failed to update tpl.');
    $msg002 = ""; // 登録に失敗しました: transit_aprv
    \Sop\Api::exitWithError(array($msg002));
}

// --- TBL: history
$history_id = -1;
$rslt = addHistory($db, $history_id, $pj_id, $sop_id, $tpl_id, null, null, null, $HISTORY_ACTION_TPL_TRANSIT, $date, $user_id, null, null);
if (!$rslt) {
    \Sop\Log::error(__FILE__, __LINE__, 'Failed to add history.');
    $msg003 = "The registration failed: history"; // 登録に失敗しました: history
    \Sop\Api::exitWithError(array($msg003));
}

// ---------------------------
// 終了処理
// ---------------------------
$db->commit();
$db = null;

$msg004 = "The data was changed to the acceptance available."; // 承認可能にしました
$msg005 = "The data was chaged to the acceptance disable."; // 承認申請を取り消しました
echo json_encode(
    array('success'=>true,
          'msg'=> \Sop\Api::htmlEncodeLines(array($new_aprv_flg == 0 ? $msg004 : $msg005)),
          'role_aprv'=>(bool)$role_aprv,
          'role_upld'=>(bool)$role_upld)
);
exit;
