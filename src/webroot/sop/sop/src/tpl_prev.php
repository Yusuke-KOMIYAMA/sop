<?php
include_once(__DIR__."/login_check.php");
include_once(__DIR__."/config.php");
include_once(__DIR__."/db_common.php");

\Sop\Database::setupRedBean();

/**
 * テンプレート プレビュー
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

$tpl_id = (array_key_exists('tpl_id', $_REQUEST)) ? $_REQUEST['tpl_id'] : '';

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
    \Sop\Log::warning(__FILE__, __LINE__, 'Specified template does not exist.');
    $msg001 = "The data already has been deleted."; // 対象のデータは既に削除されています
    \Sop\Api::exitWithError(array($msg001));
}

// ---------------------------
// データ取得
// ---------------------------
// --- 関連付く schema を全て取得
$sql = getSQLBaseForSchemaList();
$sql .= " AND `schema`.tpl_id = :tpl_id";

$params = array();
$params[':tpl_id'] = $tpl_id;

$stmt = $db->prepare($sql);
$stmt->execute($params);

$schema_list = array();
foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row)
{
    $schema = $row;

    if($schema['schema_type'] == $SCHEMA_TYPE_SRC)
    {
        $html = str_replace(array("\r\n", "\r", "\n", "\t"), '', file_get_contents($schema['file_path']));
        $html = \Sop\Form::replaceFormInjectionTag($html, $tpl_id);
        $schema['config'] = $html;
    }
    if($schema['schema_type'] == $SCHEMA_TYPE_TBL)
    {
        $schema['config'] = getSchemaVcfgForExt($db, $schema['schema_id']);
    }
    array_push($schema_list, $schema);
}

if(count($schema_list) == 0)
{
    \Sop\Log::warning(__FILE__, __LINE__, 'There is not associated schema.');
    $msg002 = "There is not the schema information."; // スキーマ情報が存在しません
    \Sop\Api::exitWithError(array($msg002));
}

// ---------------------------
// 終了処理
// ---------------------------
$db = null;

$msg003 = "The system succeeded in an accession to the data."; // データの取得に成功しました
echo json_encode(array('success'=>true, 'msg'=> \Sop\Api::htmlEncodeLines(array($msg003)), 'schema_list'=>$schema_list));
exit;
