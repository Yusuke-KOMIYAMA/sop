<?php
include_once(__DIR__."/login_check.php");
include_once(__DIR__."/config.php");
include_once(__DIR__."/../../src/db_common.php");

/**
 * SOP 標準作業手順書一覧
 */
$db = createDBConnection();

// ---------------------
// parameters 取得
// ---------------------
$grp_id  = \Sop\Session::getSiteData('grp_id');
$user_id = \Sop\Session::getSiteData('user_id');

$pj_id = (array_key_exists('pj_id', $_REQUEST)) ? $_REQUEST['pj_id'] : '';
$smpl_given_no = (array_key_exists('smpl_given_no', $_REQUEST)) ? $_REQUEST['smpl_given_no'] : '';

$start = (array_key_exists('start', $_REQUEST)) ? intval($_REQUEST['start']) : 0;
$limit = (array_key_exists('limit', $_REQUEST)) ? intval($_REQUEST['limit']) : 25;

// ---------------------
// データ取得
// ---------------------
$sel_sql = getSQLBaseForSopList();
$sel_sql .= " AND sop.pj_id = :pj_id AND v_pj.grp_id = :grp_id";

$params = array();
$params[':pj_id'] = $pj_id;
$params[':grp_id'] = $grp_id;

// --- 件数取得
$sql = "SELECT count(*) cnt FROM ($sel_sql) as tmp";

$stmt = $db->prepare($sql);
$stmt->execute($params);

$cnt = 0;
foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
    $cnt = (int)$row['cnt'];
}

// --- データ取得
$sql = $sel_sql;
$sql .= " ORDER BY sop.sop_name ASC LIMIT $limit OFFSET $start ";

$stmt = $db->prepare($sql);
$stmt->execute($params);

$sop_list = array();
foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row)
{
    $sop = $row;
    $sop['smpl_given_no'] = $smpl_given_no;

    // sop に関連する file を全て取得
    $sql = getSQLBaseForFileList();
    $sql .= " AND file.smpl_given_no = :smpl_given_no AND file.sop_id = :sop_id ";
    $sql .= " ORDER BY status DESC LIMIT 1 "; // schema 毎に file が複数存在することもあり得るので、status が一番大きいものを 1件 取得

    $params = array();
    $params[':smpl_given_no'] = $smpl_given_no;
    $params[':sop_id'] = $sop['sop_id'];

    $stmt = $db->prepare($sql);
    $stmt->execute($params);

    // file レコードが存在する場合のみ、status を付加する
    $sop['file_status'] = $FILE_STATUS_NOT; // デフォルトは未入力（レコードが存在しない場合）
    foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row)
    {
        $file = $row;

        $sop['file_status'] = $file['status'];
        $sop['file_id']     = $file['file_id'];
        $sop['tpl_id']      = $file['tpl_id'];
        $sop['schema_id']   = $file['schema_id'];
        $sop['schema_type'] = $file['schema_type'];
        $sop['fix_user']    = $file['fix_user'];
        $sop['upd_date']    = $file['upd_date'];
        if($sop['file_status'] == $FILE_STATUS_PROVISIONAL_FIX){
            $sop['upd_date'] = $file['fix_date'];
        }
    }

    // --- テンプレートバージョン情報を付加
    $sop['revision_no'] = 0;
    $sop['latest_flg'] = $LATEST_FLG_NOT;

    // 承認済み tpl がある場合
    if(!is_null($sop['latest_tpl_id']))
    {
        $trgt_tpl_id = (isset($sop['tpl_id'])) ? $sop['tpl_id'] : $sop['latest_tpl_id']; // $sop['tpl_id'] セット済みならfileあり、そうでなければfileなし

        $sql = getSQLBaseForTplList();
        $sql .= " AND tpl.tpl_id = :tpl_id";

        $params = array();
        $params[':tpl_id'] = $trgt_tpl_id;

        $stmt = $db->prepare($sql);
        $stmt->execute($params);

        foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row)
        {
            $tpl = $row;

            $sop['tpl_name']    = $tpl['tpl_name'];
            $sop['revision_no'] = $tpl['revision_no'];
            $sop['latest_flg']  = $tpl['latest_flg'];
        }
    }

    array_push($sop_list, $sop);
}

// ---------------------
// 出力
// ---------------------
$db = null;

header("Content-type:application/json; charset=utf-8");
echo json_encode(
    array('success' => true,
          'msg'     => \Sop\Api::htmlEncodeLines(array('データの取得に成功しました')),
          'root'    => \Sop\Api::htmlEncode($sop_list),
          'total'   => $cnt));
exit;
