<?php
include_once(__DIR__."/login_check.php");
include_once(__DIR__."/config.php");
include_once(__DIR__."/db_common.php");

/**
 * プロジェクト一覧取得
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

$node_type = (array_key_exists('node_type', $_REQUEST)) ? $_REQUEST['node_type'] : 'all';
$node = (array_key_exists('node', $_REQUEST)) ? $_REQUEST['node'] : '';

// ---------------------------
// データ取得
// ---------------------------
$node_list = array();

if($node_type == 'all')
{
    $sql = getSQLBaseForPjList();
    $sql .= " AND grp_pj.grp_id = :grp_id";

    $params = array();
    $params[':grp_id'] = $grp_id;

    $stmt = $db->prepare($sql);
    $stmt->execute($params);

    foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row)
    {
        $node = array();
        $node['text'] = $row['pj_name'];
        $node['id']   = "pj_{$row['pj_id']}";
        $node['cls']  = 'folder';
        array_push($node_list, $node);
    }
}
else
{
    $pj_id = str_replace('pj_', '', $node);

    $sql = getSQLBaseForSopList();
    $sql .= " AND sop.pj_id = :pj_id AND v_pj.grp_id = :grp_id ORDER BY sop.sop_name";

    $params = array();
    $params[':pj_id'] = $pj_id;
    $params[':grp_id'] = $grp_id;

    $stmt = $db->prepare($sql);
    $stmt->execute($params);

    foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row)
    {
        $node = array();
        $node['checker_required_flag'] = $row['checker_required_flag'];
        $node['text'] = $row['sop_name'];
        $node['id'] = "sop_{$row['sop_id']}";
        $node['cls'] = 'file';
        $node['leaf'] = true;
        array_push($node_list, $node);
    }
}

// ---------------------------
// 終了処理
// ---------------------------
header("Content-Type: text/json");
echo json_encode(\Sop\Api::htmlEncode($node_list));
