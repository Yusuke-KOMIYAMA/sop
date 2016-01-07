<?php
include_once(__DIR__."/login_check.php");
include_once(__DIR__."/config.php");
include_once(__DIR__."/../../src/db_common.php");

/**
 * ファイル 保存
 */
$db = createDBConnection();

// ---------------------------
// parameters 取得
// ---------------------------
$grp_id  = \Sop\Session::getSiteData('grp_id');
$user_id = \Sop\Session::getSiteData('user_id');

$div = (array_key_exists('div', $_REQUEST)) ? $_REQUEST['div'] : '';
$smpl_given_no = (array_key_exists('smpl_given_no', $_REQUEST)) ? $_REQUEST['smpl_given_no'] : '';
$pj_id = (array_key_exists('pj_id', $_REQUEST)) ? $_REQUEST['pj_id'] : '';
$sop_id = (array_key_exists('sop_id', $_REQUEST)) ? $_REQUEST['sop_id'] : '';
$tpl_id = (array_key_exists('tpl_id', $_REQUEST)) ? $_REQUEST['tpl_id'] : '';
$schema_type = (array_key_exists('schema_type', $_REQUEST)) ? $_REQUEST['schema_type'] : '';
$schema_id = (array_key_exists('schema_id', $_REQUEST)) ? $_REQUEST['schema_id'] : '';
$file_id = (array_key_exists('file_id', $_REQUEST)) ? $_REQUEST['file_id'] : '';

$hwr_val = (array_key_exists('hwr_val', $_REQUEST)) ? $_REQUEST['hwr_val'] : '';
$hwr_image = (array_key_exists('hwr_image', $_REQUEST)) ? $_REQUEST['hwr_image'] : '';

$user_id_2 = (array_key_exists('user_id_2', $_REQUEST)) ? $_REQUEST['user_id_2'] : '';

$hwr_id = '';

$date = date("Y-m-d H:i:s");

// 更新の場合
if($div == 'upd')
{
    $sql = getSQLBaseForFilehwrList();
    $sql .= " AND file_hwr.file_id = :file_id";

    $params = array();
    $params[':file_id'] = $file_id;

    $stmt = $db->prepare($sql);
    $stmt->execute($params);

    foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row)
    {
        $hwr_id = $row['hwr_id'];
    }
}

// ---------------------------
// DB 登録 更新
// ---------------------------
$db->beginTransaction();

if($div == 'add')
{

    // --- TBL: file
    $file_id = -1;
    $rslt = addFile($db, $file_id, $pj_id, $sop_id, $tpl_id, $schema_id, $schema_type, $smpl_given_no, $FILE_STATUS_INP, $date, $user_id, $user_id_2);
    if(!$rslt)
    {
        \Sop\Log::error(__FILE__, __LINE__, 'Failed to add file.');
        $msg001 = "The registration failed.: file"; // 登録に失敗しました: file
        \Sop\Api::exitWithError(array($msg001));
    }
    $file_id = getLastId($db);

    // --- TBL: val
    $val_id = -1;
    foreach($_REQUEST as $val_name=>$value)
    {
        if(strpos($val_name, 'input_') !== false)
        {
            $value = urldecode($value);

            $rslt = addVal($db, $val_id, $file_id, $val_name, $value);
            if(!$rslt)
            {
                \Sop\Log::error(__FILE__, __LINE__, 'Failed to add val.');
                 $msg002 = "The registration failed.: val"; // 登録に失敗しました: val
                \Sop\Api::exitWithError(array("{$msg002} $value (: $val_name)"));
            }
        }
    }

    // --- TBL: hwr
    $hwr_id = -1;
    $rslt = addHwr($db, $hwr_id, $hwr_val);
    if(!$rslt)
    {
        \Sop\Log::error(__FILE__, __LINE__, 'Failed to add hwr.');
        $msg003 = "The registration failed.: hwr"; // 登録に失敗しました: hwr
        \Sop\Api::exitWithError(array($msg003));
    }
    $hwr_id = getLastId($db);

    // --- TBL: file_hwr
    $rslt = addFilehwr($db, $file_id, $hwr_id);
    if(!$rslt)
    {
        \Sop\Log::error(__FILE__, __LINE__, 'Failed to add file_hwr.');
        $msg004 = "The registration failed.: file_hwr"; // 登録に失敗しました: file_hwr
        \Sop\Api::exitWithError(array($msg004));
    }

    // --- TBL: history
    $history_id = -1;
    $rslt = addHistory($db, $history_id, $pj_id, $sop_id, $tpl_id, $schema_id, $file_id, $smpl_given_no, $HISTORY_ACTION_FILE_ADD, $date, $user_id, $user_id_2, null);
    if(!$rslt)
    {
        \Sop\Log::error(__FILE__, __LINE__, 'Failed to add history.');
        $msg005 = "The registration failed.: history"; // 登録に失敗しました: history
        \Sop\Api::exitWithError(array($msg005));
    }
}

if($div == 'upd')
{
    // --- TBL: file
    $rslt = updFile($db, $file_id, $date, $user_id, $user_id_2);
    if(!$rslt)
    {
        \Sop\Log::error(__FILE__, __LINE__, 'Failed to update file.');
        $msg006 = "The update failed.: file"; // 更新に失敗しました: file
        \Sop\Api::exitWithError(array($msg006));
        exit;
    }

    // --- TBL: val
    foreach($_REQUEST as $val_name=>$value)
    {
        if(strpos($val_name, 'input_') !== false)
        {
            $value = urldecode($value);

            $rslt = updVal($db, $file_id, $val_name, $value);
            if(!$rslt)
            {
                \Sop\Log::error(__FILE__, __LINE__, 'Failed to update val.');
                $msg007 = "The update failed.: val"; // 更新に失敗しました: val
                \Sop\Api::exitWithError(array("{$msg007} $value (: $val_name)"));
            }
        }
    }

    // --- TBL: hwr
    $rslt = updHwr($db, $hwr_id, $hwr_val);
    if(!$rslt)
    {
        \Sop\Log::error(__FILE__, __LINE__, 'Failed to update hwr.');
        $msg008 = "The update failed.: hwr"; // 更新に失敗しました: hwr
        \Sop\Api::exitWithError(array($msg008));
    }

    // --- TBL: history
    $history_id = -1;
    $rslt = addHistory($db, $history_id, $pj_id, $sop_id, $tpl_id, $schema_id, $file_id, $smpl_given_no, $HISTORY_ACTION_FILE_UPD, $date, $user_id, $user_id_2, null);
    if(!$rslt)
    {
        \Sop\Log::error(__FILE__, __LINE__, 'Failed to update history.');
        $msg009 = "The update failed.: history"; // 更新に失敗しました: history
        \Sop\Api::exitWithError(array($msg009));
    }
}

// ---------------------------
// 手書きの画像をファイルに書き出す。
// ---------------------------
$file_path = $DATA_DIR_PATH_HWR . '/' . $hwr_id . '.png';
$hwr_image = preg_replace('#^data:image/png;base64,#', '', $hwr_image);
$hwr_image = base64_decode($hwr_image);
file_put_contents($file_path, $hwr_image);

// ---------------------------
// 出力
// ---------------------------
$db->commit();
$db = null;

$msg010 = "The registration completed."; // 登録が完了しました
$msg011 = "The update completed."; // 更新が完了しました
$msg = ($div == 'add') ? '{$msg010}' : '{$msg011}';

header("Content-type:application/json; charset=utf-8");
echo json_encode(array('success'=>true, 'msg'=> \Sop\Api::htmlEncodeLines(array($msg)), 'file_id'=>$file_id, 'div'=>'upd'));
exit;
