<?php
include_once(__DIR__."/login_check.php");
include_once(__DIR__."/config.php");
include_once(__DIR__."/../../src/db_common.php");

/**
 * ファイル 保存
 */
$db = createDBConnection();

function upsertHwr($db, $file_id, $hwr_list, $image_output_path){
    // 手書きデータの id 取得。
    $sql = getSQLBaseForFilehwrList();
    $sql .= " AND file_hwr.file_id = :file_id";

    $params = array();
    $params[':file_id'] = $file_id;

    $stmt = $db->prepare($sql);
    $stmt->execute($params);

    $saved_hwr_list = array();
    foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row)
    {
        $saved_hwr_list[$row['mark_position_y']] = $row;
    }

    foreach($hwr_list as $index => $hwr){
        $hwr_val = $hwr['hwr_val'];
        $update_time = date("Y-m-d H:i:s", $hwr['update_time']);
        $mark_position_y = isset($hwr['mark_position_y']) ? $hwr['mark_position_y'] : '0';

        $hwr_image = (array_key_exists('hwr_image', $hwr) ? $hwr['hwr_image'] : null);

        if (array_key_exists('hwr_id', $hwr)) {
            $hwr_id = $hwr['hwr_id'];
            // --- TBL: hwr
            $rslt = updHwr($db, $hwr_id, $hwr_val, $update_time);
            if(!$rslt)
            {
                \Sop\Log::error(__FILE__, __LINE__, 'Failed to update hwr.');
                $msg001 = "The update failed.: hwr"; // 更新に失敗しました: hwr
                \Sop\Api::exitWithError(array($msg001));
            }
        } else if (array_key_exists($mark_position_y, $saved_hwr_list)) {
            $hwr_id = $saved_hwr_list[$mark_position_y]['hwr_id'];
            // --- TBL: hwr
            $rslt = updHwr($db, $hwr_id, $hwr_val, $update_time);
            if(!$rslt)
            {
                \Sop\Log::error(__FILE__, __LINE__, 'Failed to update hwr.');
                $msg002 = "The update failed.: hwr"; // 更新に失敗しました: hwr
                \Sop\Api::exitWithError(array($msg002));
            }
        } else {
            // insert
            // --- TBL: hwr
            $hwr_id = -1;
            $rslt = addHwr($db, $hwr_id, $hwr_val, $update_time, $mark_position_y);
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
        }

        // ---------------------------
        // 手書きの画像をファイルに書き出す。
        // ---------------------------
        if($hwr_image != null){
            $file_path = $image_output_path . '/' . $file_id . '_' . $hwr_id . '.png';
            $hwr_image = preg_replace('#^data:image/png;base64,#', '', $hwr_image);
            $hwr_image = base64_decode($hwr_image);
            file_put_contents($file_path, $hwr_image);
        }
    }
}

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

$hwr_temp = (array_key_exists('hwr_list', $_REQUEST)) ? $_REQUEST['hwr_list'] : '';
if ($hwr_temp == 'null') {
    $hwr_temp = '';
}
$hwr_list = $hwr_temp ? json_decode($hwr_temp, true) : array();

$user_id_2 = (array_key_exists('user_id_2', $_REQUEST)) ? $_REQUEST['user_id_2'] : '';

$seq_no = (array_key_exists('seq_no', $_REQUEST)) ? $_REQUEST['seq_no'] : '';
$request_time = (array_key_exists('request_time', $_REQUEST)) ? date("Y-m-d H:i:s", $_REQUEST['request_time']) : NULL;
$update_time = (array_key_exists('update_time', $_REQUEST)) ? date("Y-m-d H:i:s", $_REQUEST['update_time']) : NULL;
$target_val_name = (array_key_exists('val_name', $_REQUEST)) ? $_REQUEST['val_name'] : '';

$date = date("Y-m-d H:i:s");

// チェック待ちの場合
if($div == 'fix'){
    header("Content-type:application/json; charset=utf-8");
    $msg005 = "The data does not save now, because it waits for the connfirmation."; // チェック待ちのため、保存されません。
    echo json_encode(array('success'=>true, 'msg'=> \Sop\Api::htmlEncodeLines(array($msg005))));
    exit();
}

// ネットワーク断により、add 要求が複数きた場合
if($div == 'add')
{
    $sel_sql = getSQLBaseForFileList();
    $sel_sql .= " AND v_schema.pj_id = :pj_id AND v_schema.sop_id = :sop_id AND v_schema.tpl_id = :tpl_id AND file.smpl_given_no = :smpl_given_no";

    $sql = "SELECT count(*) cnt FROM ($sel_sql) as tmp";

    $params = array();
    $params[':pj_id'] = $pj_id;
    $params[':sop_id'] = $sop_id;
    $params[':tpl_id'] = $tpl_id;
    $params[':smpl_given_no'] = $smpl_given_no;

    $stmt = $db->prepare($sql);
    $stmt->execute($params);

    $cnt = 0;
    foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
        $cnt = (int)$row['cnt'];
    }


    // レコードがある場合はネットワーク断などの影響により複数回 add のクエリが送信されたため、upd のクエリとして処理を継続する。
    if($cnt != 0){
        $stmt = $db->prepare($sel_sql);
        $stmt->execute($params);

        foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row)
        {
            $file_id = $row['file_id'];
            $div = 'upd';
        }
    }
}

// 更新の場合
if($div == 'upd')
{
    // 更新可否の判断。
    // 以下の条件でレコードがある場合、古いデータとして扱い更新しない。
    //   1. リクエスト送信時刻がレコードの値以上
    //   2. リクエスト送信時刻が同じ、かつリクエストの通し番号がレコードの値以上。
    $sel_sql = getSQLBaseForFileList();
    $sel_sql .= " AND file.file_id = :file_id AND ( file.request_time > :request_time OR ( file.request_time = :request_time AND file.seq_no >= :seq_no ))";

    $sql = "SELECT count(*) cnt FROM ($sel_sql) as tmp";

    $params = array();
    $params[':file_id'] = $file_id;
    $params[':request_time'] = $request_time;
    $params[':seq_no'] = $seq_no;

    $stmt = $db->prepare($sql);
    $stmt->execute($params);

    $cnt = 0;
    foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
        $cnt = (int)$row['cnt'];
    }

    // flie テーブルにレコードがある場合は、リクエストが古いので破棄する。
    if($cnt != 0){

        $db->beginTransaction();

        // 過去のリクエストでも、フォームごとの最終時刻がない、もしくは古い場合は更新する。
        $sel_sql = getSQLBaseForValList();
        $sel_sql .= " AND val_name = :val_name AND (update_time < :update_time OR update_time IS NULL)";

        $sql = "SELECT count(*) cnt FROM ($sel_sql) as tmp";

        $params = array();
        $params[':file_id'] = $file_id;
        $params[':val_name'] = $target_val_name;
        $params[':update_time'] = $update_time;

        $stmt = $db->prepare($sql);
        $stmt->execute($params);

        $cnt = 0;
        foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
            $cnt = (int)$row['cnt'];
        }

        if($cnt > 0){
            // --- フォームの最終更新日時の更新。
            $rslt = updValLastUpdateTime($db, $file_id, $target_val_name, $update_time);
            if(!$rslt)
            {
                \Sop\Log::error(__FILE__, __LINE__, 'Failed to update last update time.');
                $msg006 = "Failed to update last update time.: val"; // フォーム最終更新時刻の更新に失敗しました: val
                \Sop\Api::exitWithError(array($msg006));
                exit;
            }
        }

        // 手書きデータを DB に反映する。
        upsertHwr($db, $file_id, $hwr_list, $DATA_DIR_PATH_HWR);

        $db->commit();
        $db = null;

        header("Content-type:application/json; charset=utf-8");
        $msg007 = "The input was saved (time"; // 入力を保存しました（時刻
        echo json_encode(
            array('success'=>true,
                  'msg'=> \Sop\Api::htmlEncodeLines(array('{$msg007} ' . date('H:i:s') . '）')),
                  'file_id'=>$file_id,
                  'div'=>'upd'));
        exit();
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
    $rslt = addFile($db, $file_id, $pj_id, $sop_id, $tpl_id, $schema_id, $schema_type, $smpl_given_no, $FILE_STATUS_INP, $date, $user_id, $user_id_2, $request_time, $seq_no);
    if(!$rslt)
    {
        \Sop\Log::error(__FILE__, __LINE__, 'Failed to add file.');
        $msg008 = "The registration failed.: file"; // 登録に失敗しました: file"
        \Sop\Api::exitWithError(array($msg008));
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
                $msg009 = "The registration failed.: val"; // 登録に失敗しました: val
                \Sop\Api::exitWithError(array("{$msg009} $value (: $val_name)"));
            }
        }
    }

    // --- TBL: history
    $history_id = -1;
    $rslt = addHistory($db, $history_id, $pj_id, $sop_id, $tpl_id, $schema_id, $file_id, $smpl_given_no, $HISTORY_ACTION_FILE_ADD, $date, $user_id, $user_id_2, null);
    if(!$rslt)
    {
        \Sop\Log::error(__FILE__, __LINE__, 'Failed to add history.');
        $msg010 = "The registration failed.: history"; // 登録に失敗しました: history
        \Sop\Api::exitWithError(array($msg010));
    }
}

if($div == 'upd')
{
    // --- TBL: file
    $rslt = updFile($db, $file_id, $date, $user_id, $user_id_2, $request_time, $seq_no);
    if(!$rslt)
    {
        \Sop\Log::error(__FILE__, __LINE__, 'Failed to update file.');
        $msg011 = "The update failed.: file"; // 更新に失敗しました: file
        \Sop\Api::exitWithError(array($msg011));
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
                $msg012 = "The update failed.: val"; // 更新に失敗しました: val
                \Sop\Api::exitWithError(array("{$msg012} $value (: $val_name)"));
            }
        }
    }

    // --- TBL: history
    $history_id = -1;
    $rslt = addHistory($db, $history_id, $pj_id, $sop_id, $tpl_id, $schema_id, $file_id, $smpl_given_no, $HISTORY_ACTION_FILE_UPD, $date, $user_id, $user_id_2, null);
    if(!$rslt)
    {
        \Sop\Log::error(__FILE__, __LINE__, 'Failed to add history.');
        $msg013 = "The update failed.: history"; // 更新に失敗しました: history
        \Sop\Api::exitWithError(array($msg013));
    }
}

// --- フォームの最終更新日時の更新。
$rslt = updValLastUpdateTime($db, $file_id, $target_val_name, $update_time);
if(!$rslt)
{
    \Sop\Log::error(__FILE__, __LINE__, 'Failed to update last update time.');
    $msg014 = "Failed to update last update time.: val"; // フォーム最終更新時刻の更新に失敗しました: val
    \Sop\Api::exitWithError(array($msg014));
    exit;
}

// 手書きデータを DB に反映する。
upsertHwr($db, $file_id, $hwr_list, $DATA_DIR_PATH_HWR);

// ---------------------------
// 出力
// ---------------------------
$db->commit();
$db = null;

$msg015 = "The input was saved.(time"; // 入力を保存しました（時刻
$msg = "{$msg015}" . date("H:i:s") . "）";

header("Content-type:application/json; charset=utf-8");
echo json_encode(array('success'=>true, 'msg'=> \Sop\Api::htmlEncodeLines(array($msg)), 'file_id'=>$file_id, 'div'=>'upd'));
exit;
