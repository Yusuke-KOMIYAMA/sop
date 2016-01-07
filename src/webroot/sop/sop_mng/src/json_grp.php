<?php
include_once(__DIR__."/login_check.php");
include_once(__DIR__."/../../sop/src/config.php");
include_once(__DIR__."/../../sop/src/db_common.php");

/**
 * グループ 一覧
 */
$db = createDBConnection();

$output_type = (array_key_exists('output_type', $_REQUEST)) ? $_REQUEST['output_type'] : 'json';

$filter_list = (array_key_exists('filter', $_REQUEST)) ? $_REQUEST['filter'] : array();
$sort = (array_key_exists('sort', $_REQUEST)) ? $_REQUEST['sort'] : '';
$start = (array_key_exists('start', $_REQUEST)) ? (int)$_REQUEST['start'] : 0;
$limit = (array_key_exists('limit', $_REQUEST)) ? (int)$_REQUEST['limit'] : 25;

// ---------------------------
// SQL作成
// ---------------------------
// --- WHERE 句
$where_sql_list = array();
foreach($filter_list as $filter)
{
    $field = getClmnName($filter['field']);
    $data = $filter['data'];

    if($data['type'] == 'string')
    {
        array_push($where_sql_list, " $field LIKE '%{$data['value']}%'");
    }
    if($data['type'] == 'numeric')
    {
        $sign = getSign($data['comparison']);
        array_push($where_sql_list, " $field {$sign} {$data['value']}");
    }
    if($data['type'] == 'list')
    {
        array_push($where_sql_list, " $field IN ({$data['value']})");
    }
    if($data['type'] == 'date')
    {
        $sign = getSign($data['comparison']);
        $date = str_replace('/', '-', $data['value']);

        if($sign == '=')
        {
            $sdate = "{$date} 00:00:00";
            $edate = date('Y-m-d H:i:s', strtotime("{$date} 00:00:00 +1 day"));
            array_push($where_sql_list, " $field >= '$sdate' AND $field < '$edate'");
        }
        else
        {
            array_push($where_sql_list, " $field $sign '{$date}'");
        }
    }
}
$where_sql = implode(" AND ", $where_sql_list);

// --- ORDER BY 句
$sort_prop = 'grp_id';
$sort_dir = 'ASC';
if($sort != '')
{
    $sort_obj = json_decode($sort);

    $sort_prop = '';
    $sort_dir = '';
    foreach($sort_obj as $tmp)
    {
        $sort_prop = getClmnName($tmp->property);
        $sort_dir = $tmp->direction;
    }
}
$sort_sql = " ORDER BY $sort_prop $sort_dir";

// --- LIMIT 句
$limit_sql = " LIMIT $limit OFFSET $start";

// --- 基本となるSQL
$sel_sql = getSQLBaseForGrp();
if(count($where_sql_list) > 0) $sel_sql .= " AND $where_sql";

// ---------------------------
// データ取得
// ---------------------------
// --- 件数取得
$sql = "SELECT count(*) cnt FROM ($sel_sql) as tmp";

$stmt = $db->prepare($sql);
$stmt->execute();

$count = 0;
foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
    $count = $row['cnt'];
}

// --- データ取得
$sql = "{$sel_sql}{$sort_sql}{$limit_sql}";

$stmt = $db->prepare($sql);
$stmt->execute();

$grp_list = array();
foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row)
{
    $grp = $row;

    array_push($grp_list, $grp);
}

// ---------------------------
// 終了処理
// ---------------------------
$db = null;

header("Content-type:application/json; charset=utf-8");
$msg001 = "The system succeeded in an accession to the data."; // データの取得に成功しました
echo json_encode(
    array('success' => true,
          'msg'     => \Sop\Api::htmlEncodeLines(array($msg001)),
          'root'    => \Sop\Api::htmlEncode($grp_list),
          'total'   => $count));
exit;


/**
 * GridFiltering 対応
 */
function getSign($comparison)
{
    $sign = '';

    switch($comparison)
    {
        case 'lt':
            $sign = '<';
            break;
        case 'gt':
            $sign = '>';
            break;
        case 'eq':
            $sign = '=';
            break;
    }

    return $sign;
}

function getClmnName($property)
{
    $clmn_name = $property;

    switch($property)
    {
        case 'grp_id':
            $clmn_name = 'grp_id';
            break;
        case 'grp_name':
            $clmn_name = 'grp_name';
            break;
    }

    return $clmn_name;
}
