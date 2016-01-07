<?php
include_once(__DIR__."/login_check.php");
include_once(__DIR__."/config.php");
include_once(__DIR__."/../../src/db_common.php");

\Sop\Database::setupRedBean();

/**
 * 入力開始承認 → ファイル情報取得
 */
$db = createDBConnection();

// ---------------------------
// parameters 取得
// ---------------------------
$grp_id  = \Sop\Session::getSiteData('grp_id');
$user_id = \Sop\Session::getSiteData('user_id');

$hidden_params = (array_key_exists('hdn_params', $_REQUEST) ? $_REQUEST['hdn_params'] : '');
$user_id_2 = (array_key_exists('user_id_2', $_REQUEST) ? $_REQUEST['user_id_2'] : '');
$param_obj = json_decode($hidden_params);

$div = $param_obj->div;
$pj_id = $param_obj->pj_id;
$sop_id = $param_obj->sop_id;
$tpl_id = $param_obj->tpl_id;
$schema_id = $param_obj->schema_id;
$schema_type = $param_obj->schema_type;
$file_id = ($div != 'add') ? $param_obj->file_id : null;
$smpl_given_no = $param_obj->smpl_given_no;
$checker_required_flag = isset($param_obj->checker_required_flag) ? $param_obj->checker_required_flag : true;

// ---------------------------
// 入力開始承認
// ---------------------------
// 入力状態が fix 以外で、証人が必要な場合、user_id のチェックを行う。
if($div != 'fix' && $checker_required_flag)
{
    $user_id_2 = (array_key_exists('user_id_2', $_REQUEST) ? $_REQUEST['user_id_2'] : '');

    // --- 入力チェック
    if($user_id_2 == '')
    {
        \Sop\Log::warning(__FILE__, __LINE__, 'Check user is not specified.');
        $msg001 = "Please assign a witness."; // 証人を指定してください
        \Sop\Api::exitWithError(array($msg001));
    }

    if($user_id == $user_id_2)
    {
        \Sop\Log::warning(__FILE__, __LINE__, 'User specified oneself as check user.');
        $msg002 = "You can not assign a witness about yourself."; // 証人は入力者と異なる人を指定してください
        \Sop\Api::exitWithError(array($msg002));
    }

    // --- データ存在チェック
    $sel_sql = getSQLBaseForUser();
    $sel_sql .= " AND v_user.user_id = :user_id AND v_user.grp_id = :grp_id";
    $sql = "SELECT count(*) cnt FROM ($sel_sql) as tmp";

    // user2
    $params = array();
    $params[':user_id'] = $user_id_2;
    $params[':grp_id'] = $grp_id;

    $stmt = $db->prepare($sql);
    $stmt->execute($params);

    $cnt = 0;
    foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
        $cnt = (int)$row['cnt'];
    }

    if($cnt == 0){
        \Sop\Log::warning(__FILE__, __LINE__, 'Specified check user does not exist.');
        $msg003 = "There is not the inputted user."; // 入力したユーザーは存在しません
        \Sop\Api::exitWithError(array($msg003));
    }

    // DB更新 (TBL: history)
    $history_id = -1;
    $rslt = addHistory($db, $history_id, $pj_id, $sop_id, $tpl_id, $schema_id, $file_id, $smpl_given_no, $HISTORY_ACTION_FILE_ADD_APRV, date("Y-m-d H:i:s"), $user_id, $user_id_2, null);
    if(!$rslt)
    {
        \Sop\Log::error(__FILE__, __LINE__, 'Failed to add history.');
        $msg004 = "The update failed.: history"; // 更新に失敗しました: history
        \Sop\Api::exitWithError(array($msg004));
    }
}

// ---------------------------
// ファイル情報取得
// ---------------------------
// --- tpl データ存在チェック
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
    \Sop\Log::warning(__FILE__, __LINE__, 'User tries to get non-existent sop.');
    $msg005 = "The object of data already has been deleted."; // 対象のデータは既に削除されています
    \Sop\Api::exitWithError(array($msg005));
}

// --- schema 取得
$sql = getSQLBaseForSchemaList();
$sql .= " AND schema.tpl_id = :tpl_id AND v_tpl.grp_id = :grp_id";

$params = array();
$params[':tpl_id'] = $tpl_id;
$params[':grp_id'] = $grp_id;

$stmt = $db->prepare($sql);
$stmt->execute($params);

$schema = null;
foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
    $schema = $row;
}

$schema_id = (int)$schema['schema_id'];
$schema_type = (int)$schema['schema_type'];
$param_obj->schema_id = $schema_id;
$param_obj->schema_type = $schema_type;


// --- 表示コンテンツ取得
$config = "";
if($schema_type == $SCHEMA_TYPE_SRC)
{
    $file_path = $schema['file_path'];
    $config = str_replace(array("\r\n", "\r", "\n", "\t"), '', file_get_contents($file_path));
    $config = \Sop\Form::replaceFormInjectionTag($config, $tpl_id, $file_id, true);
}
if($schema_type == $SCHEMA_TYPE_TBL)
{
    $config = getSchemaVcfgForTouch($db, $schema_id, $div, $file_id);
}

// ---------------------------
// 出力
// ---------------------------
$db = null;

header("Content-type:application/json; charset=utf-8");
echo json_encode(array('success'=> true, 'config'=>$config, 'hdn_params'=>json_encode($param_obj), 'user_id_2'=>$user_id_2));
exit;
