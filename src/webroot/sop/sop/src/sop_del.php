<?php
include_once(__DIR__."/login_check.php");
include_once(__DIR__."/config.php");
include_once(__DIR__."/db_common.php");

/**
 * SOP 削除
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

// ---------------------------
// チェック
// ---------------------------
// --- 既に入力が開始している場合は削除しない
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
    $msg001 = "This project already has been started the input."; // このプロジェクトは既に入力が開始しています
    \Sop\Api::exitWithError(array($msg001));
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
    \Sop\Log::warning(__FILE__, __LINE__, 'User tried to delete non-existent sop.');
    $msg002 = "The data already has been deleted."; // 対象のデータは既に削除されています
    \Sop\Api::exitWithError(array($msg003));
}

// --- 関連付く schema の file_path を全て取得
$sql = getSQLBaseForSchemaList();
$sql .= " AND schema.sop_id = :sop_id";

$params = array();
$params[':sop_id'] = $sop_id;

$stmt = $db->prepare($sql);
$stmt->execute($params);

$file_path_list = array();
foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row)
{
    array_push($file_path_list, $row['file_path']);

    if($row['schema_type'] == $SCHEMA_TYPE_SRC)
    {
        $info = pathinfo($row['file_path']);
        $word_file_name = str_replace(".{$info['extension']}", '', $row['file_path']);
        if(file_exists($word_file_name.'.doc')){array_push($file_path_list, $word_file_name.'.doc');}
        if(file_exists($word_file_name.'.docx')){array_push($file_path_list, $word_file_name.'.docx');}
    }
}

// ---------------------------
// 削除処理
// ---------------------------
$db->beginTransaction();

// --- TBL: sop
$rslt = delSop($db, $sop_id);
if(!$rslt)
{
    \Sop\Log::error(__FILE__, __LINE__, 'Failed to delete sop.');
    $msg003 = "The delete failed.: sop"; // 削除に失敗しました: sop
    \Sop\Api::exitWithError(array($msg003));
}

// --- TBL: tpl
$rslt = delSopTpl($db, $sop_id);
if(!$rslt)
{
    \Sop\Log::error(__FILE__, __LINE__, 'Failed to delete tbl.');
    $msg004 = "The delete failed.: tpl"; // 削除に失敗しました: tpl
    \Sop\Api::exitWithError(array($msg004));
}

// --- TBL: schema
$rslt = delSopSchema($db, $sop_id);
if(!$rslt)
{
    \Sop\Log::error(__FILE__, __LINE__, 'Failed to delete schema.');
    $msg005 = "The delete failed.: schema"; // 削除に失敗しました: schema
    \Sop\Api::exitWithError(array($msg005));
}

// --- TBL: tbl
$rslt = delSopTbl($db, $sop_id);
if(!$rslt)
{
    \Sop\Log::error(__FILE__, __LINE__, 'Failed to delete tbl.');
    $msg006 = "The delete failed.: tbl"; // 削除に失敗しました: tbl
    \Sop\Api::exitWithError(array($msg006));
}

// --- TBL: clmn
$rslt = delSopClmn($db, $sop_id);
if(!$rslt)
{
    \Sop\Log::error(__FILE__, __LINE__, 'Failed to delete clmn.');
    $msg007 = "The delete failed.: clmn"; // 削除に失敗しました: clmn
    \Sop\Api::exitWithError(array($msg007));
}

// --- TBL: row
$rslt = delSopRow($db, $sop_id);
if(!$rslt)
{
    \Sop\Log::error(__FILE__, __LINE__, 'Failed to delete row.');
    $msg008 = "The delete failed.: row"; // 削除に失敗しました: row
    \Sop\Api::exitWithError(array($msg008));
}

// --- TBL: history
$history_id = -1;
$rslt = addHistory($db, $history_id, $pj_id, $sop_id, null, null, null, null, $HISTORY_ACTION_SOP_DEL, date("Y-m-d H:i:s"), $user_id, null, null);
if(!$rslt)
{
    \Sop\Log::error(__FILE__, __LINE__, 'Failed to add history.');
    $msg009 = "The delete failed.: history"; // 削除に失敗しました: history
    \Sop\Api::exitWithError(array($msg009));
}

// ---------------------------
// ファイル削除
// ---------------------------
foreach($file_path_list as $file_path)
{
    if(file_exists($file_path)) unlink($file_path);
}

// ---------------------------
// 終了処理
// ---------------------------
$db->commit();
$db = null;

$msg010 = "The delete completed."; // 削除が完了しました
echo json_encode(array('success'=>true, 'msg'=> \Sop\Api::htmlEncodeLines(array($msg010)), 'role_aprv'=>(bool)$role_aprv, 'role_upld'=>(bool)$role_upld));
exit;
