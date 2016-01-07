<?php
include_once(__DIR__."/login_check.php");
include_once(__DIR__."/config.php");
include_once(__DIR__."/db_common.php");

/**
 * プロジェクト登録 更新
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
$pj_name = (array_key_exists('pj_name', $_REQUEST)) ? $_REQUEST['pj_name'] : '';
if($pj_name == ''){
    \Sop\Log::warning(__FILE__, __LINE__, 'User entered empty pj_name.');
    $msg001 = "Please input a project name."; // プロジェクト名を入力してください
    \Sop\Api::exitWithError(array($msg001));
}

$div = (trim($pj_id) == '') ? 'add' : 'upd';

// 更新の場合
if($div == 'upd')
{
    // --- 既に入力が開始している場合は更新しない
    $sel_sql = getSQLBaseForFileList();
    $sel_sql .= " AND file.pj_id = :pj_id";

    $sql = "SELECT count(*) cnt FROM ($sel_sql) as tmp";

    $params = array();
    $params[':pj_id'] = $pj_id;

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
    $sel_sql = getSQLBaseForPjList();
    $sel_sql .= " AND pj.pj_id = :pj_id";

    $sql = "SELECT count(*) cnt FROM ($sel_sql) as tmp";

    $params = array();
    $params[':pj_id'] = $pj_id;

    $stmt = $db->prepare($sql);
    $stmt->execute($params);

    $cnt = 0;
    foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
        $cnt = (int)$row['cnt'];
    }

    if($cnt == 0){
        \Sop\Log::warning(__FILE__, __LINE__, 'User tries to update non-existent project.');
        $msg003 = "The data already has been deleted."; // 対象のデータは既に削除されています
        \Sop\Api::exitWithError(array($msg003));
    }
}

// ---------------------------
// ファイルアップロード
// ---------------------------
$upld_file = $_FILES['upld_file'];

// --- エラーコードが 0(:OK) 以外の場合
if($upld_file['error'] != UPLOAD_ERR_OK)
{
    \Sop\Log::warning(__FILE__, __LINE__, 'Failed to update file. error code:' . $upld_file['error']);
    $msg004 = "Please confirm the file. Error code: "; // ファイルを確認してください エラーコード：
    \Sop\Api::exitWithError(array($msg004{$upld_file['error']}));
}

// --- HTTP POST でアップロードされたファイルではない場合
if(!is_uploaded_file($upld_file['tmp_name']))
{
    \Sop\Log::warning(__FILE__, __LINE__, 'Invalid file is uploaded.');
    $msg005 = "This is not a correct file."; // 正しいファイルではありません
    \Sop\Api::exitWithError(array($msg005));
}

// --- 拡張子が違う場合
$tmp = explode(".", $upld_file['name']);
$ext = end($tmp); // 拡張子
if($ext != 'txt')
{
    \Sop\Log::warning(__FILE__, __LINE__, 'User did not uploade text file.');
    $msg006 = "Please upload a file as the text format."; // Text形式でアップロードしてください
    \Sop\Api::exitWithError(array($msg006));
}

// --- move_uploaded_file で失敗した場合
$file_path = "$DATA_DIR_PATH_TMP/".date('YmdHis'); // 移動先ファイルパス
if(!move_uploaded_file($upld_file['tmp_name'], $file_path))
{
    \Sop\Log::error(__FILE__, __LINE__, 'Failed to move_uploaded_file.');
    $msg007 = "The upload failed."; // アップロードに失敗しました
    \Sop\Api::exitWithError(array($msg007));
}

// --- 重複行が存在する場合
$smpl_list = file($file_path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
$smpl_list_unique = array_unique($smpl_list);
if(count($smpl_list) != count($smpl_list_unique))
{
    unlink($file_path);
    \Sop\Log::warning(__FILE__, __LINE__, 'Duplicate lines in smpl file.');
    $msg008 = "There are redundant lines in the sample file."; // サンプルファイルに重複行が存在します
    \Sop\Api::exitWithError(array($msg008));
}

// --- 無効な文字が存在する場合
$smpl_file = file_get_contents($file_path);
if(strpos($smpl_file, "'") !== false || strpos($smpl_file, '"') !== false)
{
    unlink($file_path);
    \Sop\Log::warning(__FILE__, __LINE__, 'Invalid characters in smpl file.');
    $msg009 = "You do not use ['] and [\"]."; // 「'」「\"」は使用できません"
    \Sop\Api::exitWithError(array($msg009));
}

// --- 文字コード変換
$file_src = mb_convert_encoding(file_get_contents($file_path), "UTF-8", "SJIS-win"); // 文字コード変換
file_put_contents($file_path, $file_src); // 一旦ファイル内容保存

// ---------------------------
// データ登録
// ---------------------------
$db->beginTransaction();

if($div == 'add')
{
    // --- TBL: pj
    $pj_id = -1;
    $rslt = addPj($db, $pj_id, $pj_name);
    if(!$rslt)
    {
        unlink($file_path);
        \Sop\Log::error(__FILE__, __LINE__, 'Failed to add project.');
    $msg010 = "The registration failed.: pj"; // 登録に失敗しました: pj
        \Sop\Api::exitWithError(array($msg010));
    }
    $pj_id = getLastID($db);

    // --- TBL: grp_pj
    $rslt = addGrpPj($db, $grp_id, $pj_id);
    if(!$rslt)
    {
        unlink($file_path);
        \Sop\Log::error(__FILE__, __LINE__, 'Failed to add grp_pj.');
    $msg011 = "The registration failed.: grp_pj"; // 登録に失敗しました: grp_pj
        \Sop\Api::exitWithError(array($msg011));
    }

    // --- TBL: history
    $history_id = -1;
    $rslt = addHistory($db, $history_id, $pj_id, null, null, null, null, null, $HISTORY_ACTION_PJ_ADD, date("Y-m-d H:i:s"), $user_id, null, null);
    if(!$rslt)
    {
        unlink($file_path);
        \Sop\Log::error(__FILE__, __LINE__, 'Failed to add history.');
    $msg012 = "The registration failed.: history"; // 登録に失敗しました: history
        \Sop\Api::exitWithError(array($msg012));
    }
}

if($div == 'upd')
{
    // --- TBL: pj
    $rslt = updPj($db, $pj_id, $pj_name);
    if(!$rslt)
    {
        unlink($file_path);
        \Sop\Log::error(__FILE__, __LINE__, 'Failed to update pj.');
    $msg013 = "The update failed.: pj"; // 更新に失敗しました: pj
        \Sop\Api::exitWithError(array($msg013));
    }

    // --- TBL: pj_smpl 一旦全レコード物理削除
    $rslt = delPjSmpl($db, $pj_id);
    if(!$rslt)
    {
        unlink($file_path);
        \Sop\Log::error(__FILE__, __LINE__, 'Failed to delete pj_smpl.');
    $msg014 = "The update failed.: pj_smpl del"; // 更新に失敗しました: pj_smpl del
        \Sop\Api::exitWithError(array($msg014));
    }

    // --- TBL: history
    $history_id = -1;
    $rslt = addHistory($db, $history_id, $pj_id, null, null, null, null, null, $HISTORY_ACTION_PJ_UPD, date("Y-m-d H:i:s"), $user_id, null, null);
    if(!$rslt)
    {
        unlink($file_path);
        \Sop\Log::error(__FILE__, __LINE__, 'Failed to add history.');
    $msg015 = "The update failed.: history"; // 更新に失敗しました: history
        \Sop\Api::exitWithError(array($msg015));
    }
}

foreach($smpl_list as $display_order => $smpl_given_no)
{
    // --- TBL: pj_smpl
    $rslt = addPjSmpl($db, $pj_id, $smpl_given_no, $display_order);
    if(!$rslt)
    {
        unlink($file_path);
        \Sop\Log::error(__FILE__, __LINE__, 'Failed to add pj_smpl.');
    $msg016 = "The update failed.: pj_smpl"; // 更新に失敗しました: pj_smpl
        \Sop\Api::exitWithError(array($msg016));
        exit;
    }
}

// ---------------------------
// 終了処理
// ---------------------------
$db->commit();
$db = null;
unlink($file_path);

if($div == 'add'){
    $msg017 = "The registration completed."; // 登録が完了しました
    echo json_encode(array('success'=>true, 'msg'=> \Sop\Api::htmlEncodeLines(array($msg017)), 'role_aprv'=>(bool)$role_aprv, 'role_upld'=>(bool)$role_upld));
}
if($div == 'upd'){
    $msg018 = "The update completed."; // 更新が完了しました 
    echo json_encode(array('success'=>true, 'msg'=> \Sop\Api::htmlEncodeLines(array($msg018)), 'role_aprv'=>(bool)$role_aprv, 'role_upld'=>(bool)$role_upld));
}
exit;
