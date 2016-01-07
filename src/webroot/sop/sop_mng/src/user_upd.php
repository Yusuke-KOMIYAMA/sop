<?php
include_once(__DIR__."/login_check.php");
include_once(__DIR__."/../../sop/src/config.php");
include_once(__DIR__."/../../sop/src/db_common.php");

\Sop\Database::setupRedBean();

/**
 * ユーザー 登録 更新
 */
$db = createDBConnection();

// ---------------------------
// parameters 取得
// ---------------------------
$div = (array_key_exists('div', $_REQUEST)) ? $_REQUEST['div'] : '';

$user_id    = \Sop\Request::value('user_id');
$user_name  = \Sop\Request::value('user_name');
$password   = \Sop\Request::value('password');
$role_aprv  = \Sop\Request::value('role_aprv');
$role_upld  = \Sop\Request::value('role_upld');
$role_user  = \Sop\Request::value('role_user');
$admin_flag = \Sop\Request::value('admin_flag');
$grp_name   = \Sop\Request::value('grp_name');
$email      = \Sop\Request::value('email');
$note       = \Sop\Request::value('note');

if ($password) {
    $password = crypt($password);
}

$sql = getSQLBaseForGrp();
$sql .= ' AND grp_name = :grp_name';
$grp = R::getRow($sql, array('grp_name' => \Sop\Api::htmlDecode($grp_name)));
if (! $grp) {
    \Sop\Log::warning(__FILE__, __LINE__, 'Invalid group is specified.');
    $msg001 = "The group does not find."; // グループが見つかりません 
    \Sop\Api::exitWithError(array($msg001));
}
$grp_id = $grp['grp_id'];

// --- ユーザー 存在チェック
$sel_sql = getSQLBaseForOneUser();
$sel_sql .= " AND user_id = :user_id";

$sql = "SELECT count(*) cnt FROM ($sel_sql) as tmp";

$params = array();
$params[':user_id'] = $user_id;

$stmt = $db->prepare($sql);
$stmt->execute($params);

$cnt = 0;
foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
    $cnt = (int)$row['cnt'];
}

if($div == 'add')
{
    if($cnt > 0)
    {
        \Sop\Log::warning(__FILE__, __LINE__, 'User tried to add existent user_id.');
        $msg002 = "This user ID already has been used by another user."; // このユーザーIDは既に使用されています 
        \Sop\Api::exitWithError(array($msg002));
    }
}

if($div == 'upd')
{
    if($cnt == 0)
    {
        \Sop\Log::warning(__FILE__, __LINE__, 'User tried to update non-existent user.');
        $msg003 = "This user already has been deleted."; // このユーザーは既に削除されています
        \Sop\Api::exitWithError(array($msg003));
    }
}

// --- 所属グループ 存在チェック
// 1アカウント、複数グループだったときのコードの名残。
//$grp_id_list = explode(',', $grp_name);
//foreach($grp_id_list as $grp_id)
//{
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

    if($cnt == 0)
    {
        \Sop\Log::warning(__FILE__, __LINE__, 'Invalid group is specified.');
        $msg004 = "This group already has been deleted."; // このグループは既に削除されています:
        \Sop\Api::exitWithError(array("{$msg004} {$grp_id}"));
    }
//}

// --- 権限
$role_aprv = ($role_aprv == '') ? '0' : '1';
$role_upld = ($role_upld == '') ? '0' : '1';
$role_user = ($role_user == '') ? '0' : '1';
$role = "{$role_aprv}{$role_upld}{$role_user}"; // 承認、登録、一般 の順で連結 ※例）100：承認、001：一般、101：承認＋一般

$admin_flag = ($admin_flag != '') ? 1 : 0;

// 自分の管理権限は変更不可
if (\Sop\Session::getSiteData('user_id') == $user_id &&
    $admin_flag == 0) {
    \Sop\Log::warning(__FILE__, __LINE__, 'User tried to delete own admin role.');
    $msg005 = "You can not undo the administrative permission by oneself."; // 自分自身の管理権限は外せません。
    \Sop\Api::exitWithError(array($msg005));
}

// ---------------------------
// データ登録
// ---------------------------
$db->beginTransaction();

if($div == 'add')
{
    //削除済みユーザー
    $sel_sql = getSQLDeletedBaseForOneUser();
    $sel_sql .= " AND user_id = :user_id";

    $sql = "SELECT count(*) deleted_cnt FROM ($sel_sql) as tmp";

    $params = array();
    $params[':user_id'] = $user_id;

    $stmt = $db->prepare($sql);
    $stmt->execute($params);

    $deleted_cnt = 0;
    foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
        $deleted_cnt = (int)$row['deleted_cnt'];
    }
    
    //削除済みユーザに同じuser_idが含まれていた場合、そのuser_idのdelete_flagを0にして、更新する。
    if($deleted_cnt > 0){
    	// --- TBL: user
    	$rslt = reviveAndUpdUser($db, $user_id, $password, $user_name, $role, $email, $note, $admin_flag);
    	if(!$rslt)
    	{
            \Sop\Log::error(__FILE__, __LINE__, 'Failed to add user.');
            $msg006 = "Ths registration failed.: user"; // 登録に失敗しました: user
            \Sop\Api::exitWithError(array($msg006));
    	}

    	// --- TBL: user_grp
    	$rslt = delUserGrp($db, $user_id);
    	if(!$rslt)
    	{
            \Sop\Log::error(__FILE__, __LINE__, 'Failed to delete user_grp.');
            $msg007 = "The delete failed.: user_grp"; // 削除に失敗しました: user_grp
            \Sop\Api::exitWithError(array($msg007));
    	}

    } else {
        // --- TBL: user
        $rslt = addUser($db, $user_id, $password, $user_name, $role, $email, $note, $admin_flag);
        if(!$rslt)
        {
            \Sop\Log::error(__FILE__, __LINE__, 'Failed to add user.');
            $msg008 = "The registration failed.: user"; // 登録に失敗しました: user
            \Sop\Api::exitWithError(array($msg008));
        }
    }
}

if($div == 'upd')
{
    // --- TBL: user
    $rslt = updUser($db, $user_id, $user_name, $role, $email, $note, $admin_flag);
    if(!$rslt)
    {
        \Sop\Log::error(__FILE__, __LINE__, 'Failed to update user.');
        $msg009 = "The update failed.: user"; // 更新に失敗しました: user
        \Sop\Api::exitWithError(array($msg009));
    }

    // --- TBL: user_grp
    $rslt = delUserGrp($db, $user_id);
    if(!$rslt)
    {
        \Sop\Log::error(__FILE__, __LINE__, 'Failed to delete user_grp.');
        $msg010 = "The delete failed.: user_grp"; // 削除に失敗しました: user_grp
        \Sop\Api::exitWithError(array($msg010));
    }
}

//foreach($grp_id_list as $grp_id)
//{
    // --- TBL: user_grp
    $rslt = addUserGrp($db, $user_id, $grp_id);
    if(!$rslt)
    {
        \Sop\Log::error(__FILE__, __LINE__, 'Failed to add user_grp.');
        $msg011 = "The registration failed.: grp_id"; // 登録に失敗しました: grp_id
        \Sop\Api::exitWithError(array($msg011));
    }
//}

// ---------------------------
// 終了処理
// ---------------------------
$db->commit();
$db = null;

if($div == 'add'){
    $msg012 = "The registration completed."; // 登録が完了しました
    echo json_encode(array('success'=>true, 'msg'=> \Sop\Api::htmlEncodeLines(array($msg012))));
}
if($div == 'upd'){
    $msg013 = "The update completed."; // 更新が完了しました
    echo json_encode(array('success'=>true, 'msg'=> \Sop\Api::htmlEncodeLines(array($msg013))));
}
exit;
