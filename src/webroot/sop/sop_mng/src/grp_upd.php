<?php
include_once(__DIR__."/login_check.php");
include_once(__DIR__."/../../sop/src/config.php");
include_once(__DIR__."/../../sop/src/db_common.php");

/**
 * グループ 登録 更新
 */
$db = createDBConnection();

// ---------------------------
// parameters 取得
// ---------------------------
$grp_id = (array_key_exists('grp_id', $_REQUEST)) ? $_REQUEST['grp_id'] : '';
$grp_name = (array_key_exists('grp_name', $_REQUEST)) ? $_REQUEST['grp_name'] : '';

$div = (trim($grp_id) == '') ? 'add' : 'upd';

if($div == 'upd')
{
    // --- 存在チェック
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
        \Sop\Log::warning(__FILE__, __LINE__, 'User tried to update non-existent group.');
        $msg001 = "This group already has been deleted."; // このグループは既に削除されています
        \Sop\Api::exitWithError(array($msg001));
    }
}

// ---------------------------
// データ登録
// ---------------------------
$db->beginTransaction();

if($div == 'add')
{
    // --- TBL: grp
    $grp_id = -1;
    $rslt = addGrp($db, $grp_id, $grp_name);
    if(!$rslt)
    {
        \Sop\Log::error(__FILE__, __LINE__, 'Failed to insert group.');
        $msg002 = "The registration failed.: grp"; // 登録に失敗しました: grp
        \Sop\Api::exitWithError(array($msg002));
    }
}

if($div == 'upd')
{
    // --- TBL: grp
    $rslt = updGrp($db, $grp_id, $grp_name);
    if(!$rslt)
    {
        \Sop\Log::error(__FILE__, __LINE__, 'Failed to update group.');
        $msg003 = "The update failed.: grp"; // 更新に失敗しました: grp
        \Sop\Api::exitWithError(array($msg003));
    }
}

// ---------------------------
// 終了処理
// ---------------------------
$db->commit();
$db = null;

if($div == 'add'){
    $msg004 = "The registration completed."; // 登録が完了しました
    echo json_encode(array('success'=>true, 'msg'=> \Sop\Api::htmlEncodeLines(array($msg004))));
}
if($div == 'upd'){
    $msg005 = "The update completed."; // 更新が完了しました
    echo json_encode(array('success'=>true, 'msg'=> \Sop\Api::htmlEncodeLines(array($msg005))));
}
exit;
