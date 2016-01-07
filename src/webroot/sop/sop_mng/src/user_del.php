<?php
include_once(__DIR__."/login_check.php");
include_once(__DIR__."/../../sop/src/config.php");
include_once(__DIR__."/../../sop/src/db_common.php");

/**
 * ユーザー 削除
 */
$db = createDBConnection();

// ---------------------------
// parameters 取得
// ---------------------------
$user_id = (array_key_exists('user_id', $_REQUEST)) ? $_REQUEST['user_id'] : '';

// --- ユーザー 存在チェック
$sel_sql = getSQLBaseForOneUser();
$sel_sql .= " AND user_id = :user_id";

$sql = "SELECT count(*) cnt FROM ($sel_sql) as tmp";

$params = array();
$params[':user_id'] = $user_id;

$stmt = $db->prepare($sql);
$stmt->execute($params);

$cnt = 0;
foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
    $cnt = (int)$row['cnt'];
}

if($cnt == 0)
{
    \Sop\Log::warning(__FILE__, __LINE__, 'User tried to delete non-existent user.');
    $msg001 = "This usr already has been delted."; // このユーザーは既に削除されています
    \Sop\Api::exitWithError(array($msg001));
}

// 自分自身は削除不可
if (\Sop\Session::getSiteData('user_id') == $user_id) {
    \Sop\Log::warning(__FILE__, __LINE__, 'User tried to delete oneself.');
    $msg002 = "You can not delete oneself."; // 自分自身は削除できません。
    \Sop\Api::exitWithError(array($msg002));
}

// ---------------------------
// データ削除
// ---------------------------
$db->beginTransaction();

// --- TBL: user
$rslt = delUser($db, $user_id);
if(!$rslt)
{
    \Sop\Log::error(__FILE__, __LINE__, 'Failed to delete user.');
    $msg003 = "The delete failed.: user"; // 削除に失敗しました: user
    \Sop\Api::exitWithError(array($msg003));
}

// --- TBL: user_grp
$rslt = delUserGrp($db, $user_id);
if(!$rslt)
{
    \Sop\Log::error(__FILE__, __LINE__, 'Failed to delete user_grp.');
    $msg004 = "The delete failed.: user_grp"; // 削除に失敗しました: user_grp
    \Sop\Api::exitWithError(array($msg004));
}

// ---------------------------
// 終了処理
// ---------------------------
$db->commit();
$db = null;

$msg005 = "The delete completed."; // 削除が完了しました
echo json_encode(array('success'=>true, 'msg'=> \Sop\Api::htmlEncodeLines(array($msg005))));
exit;
