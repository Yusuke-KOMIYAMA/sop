<?php
include_once(__DIR__."/login_check.php");
include_once(__DIR__."/../../sop/src/config.php");
include_once(__DIR__."/../../sop/src/db_common.php");

/**
 * グループ 削除
 */
$db = createDBConnection();

// ---------------------------
// parameters 取得
// ---------------------------
$grp_id = (array_key_exists('grp_id', $_REQUEST)) ? $_REQUEST['grp_id'] : '';

// --- グループ 存在チェック
$sel_sql = getSQLBaseForGrp();
$sel_sql .= " AND grp_id = :grp_id";

$sql = "SELECT count(*) cnt FROM ($sel_sql) as tmp";

$params = array();
$params[':grp_id'] = $grp_id;

$stmt = $db->prepare($sql);
$stmt->execute($params);

$cnt = 0;
foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
    $cnt = (int)$row['cnt'];
}

if($cnt == 0){
    \Sop\Log::warning(__FILE__, __LINE__, 'User tried to delete non-existent group.');
    $msg001 = "The group already has been deleted."; // このグループは既に削除されています
    \Sop\Api::exitWithError(array($msg001));
}

// --- ユーザー 存在チェック
$sel_sql = getSQLBaseForUserGrp();
$sel_sql .= " WHERE grp_id = :grp_id";

$sql = "SELECT count(*) cnt FROM ($sel_sql) as tmp";

$params = array();
$params[':grp_id'] = $grp_id;

$stmt = $db->prepare($sql);
$stmt->execute($params);

$cnt = 0;
foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
    $cnt = (int)$row['cnt'];
}

if($cnt > 0){
    \Sop\Log::warning(__FILE__, __LINE__, 'User tried to delete group that has users.');
    $msg002 = "Please delete an user that belong to this group."; // このグループに所属するユーザーを削除してください
    \Sop\Api::exitWithError(array($msg002));
}

// ---------------------------
// データ削除
// ---------------------------
$db->beginTransaction();

// --- TBL: grp
$rslt = delGrp($db, $grp_id);
if(!$rslt)
{
    \Sop\Log::error(__FILE__, __LINE__, 'Failed to delete group.');
    $msg003 = "The delete failed.: grp"; // 削除に失敗しました: grp
    \Sop\Api::exitWithError(array($msg003));
}

// ---------------------------
// 終了処理
// ---------------------------
$db->commit();
$db = null;

$msg004 = "The delete completed."; // 削除が完了しました
echo json_encode(array('success'=>true, 'msg'=> \Sop\Api::htmlEncodeLines(array($msg004))));
exit;
