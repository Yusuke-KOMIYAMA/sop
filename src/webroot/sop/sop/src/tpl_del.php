<?php
include_once(__DIR__."/login_check.php");
include_once(__DIR__."/config.php");
include_once(__DIR__."/db_common.php");

/**
 * テンプレート 削除
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

// ---------------------------
// チェック
// ---------------------------
// --- 既に入力が開始している場合は削除しない
$sel_sql = getSQLBaseForFileList();
$sel_sql .= " AND file.tpl_id = :tpl_id";

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
    \Sop\Log::warning(__FILE__, __LINE__, 'Project is already used.');
    $msg001 = "This project already has been started the input."; // このプロジェクトは既に入力が開始しています 
    \Sop\Api::exitWithError(array($msg001));
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
    \Sop\Log::warning(__FILE__, __LINE__, 'User tries to delete non-existent template.');
    $msg002 = "The data already has been deleted."; // 
    \Sop\Api::exitWithError(array($msg002));
}

// --- 関連付く schema の file_path を全て取得
$sql = getSQLBaseForSchemaList();
$sql .= " AND schema.tpl_id = :tpl_id";

$params = array();
$params[':tpl_id'] = $tpl_id;

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

// --- TBL: tpl
$rslt = delTpl($db, $tpl_id);
if(!$rslt)
{
    \Sop\Log::error(__FILE__, __LINE__, 'Failed to delete tpl.');
    $msg003 = "The delete faild.: tpl"; // 削除に失敗しました: tpl
    \Sop\Api::exitWithError(array($msg003));
}

// --- TBL: schema
$rslt = delTplSchema($db, $tpl_id);
if(!$rslt)
{
    \Sop\Log::error(__FILE__, __LINE__, 'Failed to delete schema.');
    $msg004 = "The delete faild.: schema"; // 削除に失敗しました: schema
    \Sop\Api::exitWithError(array($msg004));
}

// --- TBL: tbl
$rslt = delTplTbl($db, $tpl_id);
if(!$rslt)
{
    \Sop\Log::error(__FILE__, __LINE__, 'Failed to delete tbl.');
    $msg005 = "The delete faild.: tbl"; // 削除に失敗しました: tbl
    \Sop\Api::exitWithError(array($msg005));
}

// --- TBL: clmn
$rslt = delTplClmn($db, $tpl_id);
if(!$rslt)
{
    \Sop\Log::error(__FILE__, __LINE__, 'Failed to delete clmn.');
    $msg006 = "The delete faild.: clmn"; // 削除に失敗しました: clmn
    \Sop\Api::exitWithError(array($msg006));
}

// --- TBL: row
$rslt = delTplRow($db, $tpl_id);
if(!$rslt)
{
    \Sop\Log::error(__FILE__, __LINE__, 'Failed to delete row.');
    $msg007 = "The delete faild.: row"; // 削除に失敗しました: row
    \Sop\Api::exitWithError(array($msg007));
}

// --- TBL: history
$history_id = -1;
$rslt = addHistory($db, $history_id, $pj_id, $sop_id, $tpl_id, null, null, null, $HISTORY_ACTION_TPL_DEL, date("Y-m-d H:i:s"), $user_id, null, null);
if(!$rslt)
{
    \Sop\Log::error(__FILE__, __LINE__, 'Failed to add history.');
    $msg008 = "The delete faild.: history"; // 削除に失敗しました: history
    \Sop\Api::exitWithError(array($msg008));
}


// ---------------------------
// 最新バージョン更新
// ---------------------------
// --- 承認済みの最新バージョン tpl を取得
$sql = getSQLBaseForTplList();
$sql .= " AND tpl.sop_id = :sop_id AND tpl.aprv_flg = :aprv_flg";
$sql .= " ORDER BY tpl.aprv_date DESC LIMIT 1";

$params = array();
$params[':sop_id'] = $sop_id;
$params[':aprv_flg'] = $APRV_FLG_OK;

$stmt = $db->prepare($sql);
$stmt->execute($params);

$latest_tpl = null;
foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
    $latest_tpl = $row;
}

// --- 承認済み tpl が存在しない場合はクリア、存在する場合は更新
if($latest_tpl == null)
{
    // --- TBL: sop
    $rslt = updSopAprv($db, $sop_id, null); // latest_tpl_id に null をセット
    if(!$rslt)
    {
        \Sop\Log::error(__FILE__, __LINE__, 'Failed to update sop.');
        $msg009 = "The update faild.: sop clear"; // 更新に失敗しました: sop clear
        \Sop\Api::exitWithError(array($msg009));
    }
}
else
{
    // --- TBL: sop
    $rslt = updSopAprv($db, $sop_id, $latest_tpl['tpl_id']); // 1つ前のバージョンを最新として更新
    if(!$rslt)
    {
        \Sop\Log::error(__FILE__, __LINE__, 'Failed to update sop.');
    $msg010 = "The update faild.: sop aprv"; // 更新に失敗しました: sop aprv
        \Sop\Api::exitWithError(array($msg010));
    }

    // --- TBL: tpl
    $rslt = updTplLatest($db, $latest_tpl['tpl_id'], $LATEST_FLG);
    if(!$rslt)
    {
        \Sop\Log::error(__FILE__, __LINE__, 'Failed to update tpl.');
    $msg011 = "The update faild.: tpl"; // 更新に失敗しました: tpl
        \Sop\Api::exitWithError(array($msg011));
    }
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

$msg012 = "The delete complited."; // 削除が完了しました
echo json_encode(array('success'=>true, 'msg'=> \Sop\Api::htmlEncodeLines(array($msg012)), 'role_aprv'=>(bool)$role_aprv, 'role_upld'=>(bool)$role_upld));
exit;
