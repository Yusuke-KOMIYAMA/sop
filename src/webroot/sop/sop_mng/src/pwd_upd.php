<?php
include_once(__DIR__."/login_check.php");
include_once(__DIR__."/../../sop/src/config.php");
include_once(__DIR__."/../../sop/src/db_common.php");

/**
 * パスワード 更新
 */
$db = createDBConnection();

// ---------------------------
// parameters 取得
// ---------------------------
$div = (array_key_exists('div', $_REQUEST)) ? $_REQUEST['div'] : '';

$user_id  = (array_key_exists('user_id', $_REQUEST)) ? $_REQUEST['user_id'] : '';
$password = (array_key_exists('password', $_REQUEST)) ? crypt($_REQUEST['password']) : '';
$password_confirm = (array_key_exists('password_confirm', $_REQUEST)) ? crypt($_REQUEST['password_confirm']) : '';

//パスワードの入力チェック
if($_REQUEST['password'] != $_REQUEST['password_confirm']){
    \Sop\Log::warning(__FILE__, __LINE__, 'password does not match');
    $msg001 = "The pasword does not match."; // パスワードが一致しません
    \Sop\Api::exitWithError(array($msg001));
}

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
    $msg002 = "This user already has been deleted."; // このユーザーは既に削除されています
    \Sop\Api::exitWithError(array($msg002));
}


// ---------------------------
// データ登録
// ---------------------------
$db->beginTransaction();

// --- TBL: user
$rslt = updPwd($db, $user_id, $password);
if(!$rslt)
{
    \Sop\Log::error(__FILE__, __LINE__, 'Failed to update user.');
    $msg003 = "The update failed.: user"; // 更新に失敗しました: user
    \Sop\Api::exitWithError(array($msg003));
}

// ---------------------------
// 終了処理
// ---------------------------
$db->commit();
$db = null;

$msg004 = "The change completed."; // 変更が完了しました
echo json_encode(array('success'=>true, 'msg'=> \Sop\Api::htmlEncodeLines(array($msg004))));
exit;
