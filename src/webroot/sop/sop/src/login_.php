<?php
include_once(__DIR__."/config.php");
include_once(__DIR__."/db_common.php");

\Sop\Database::setupRedBean();

/**
 * ログイン
 */
$user = \Sop\Login::getUser();

// --- ロール判定（一般権限のみはエラー）
if ($user['role_aprv'] == false && $user['role_upld'] == false) {
    $msg001 = "You do not have the permission."; // 権限がありません 
    $message = array($msg001);
    \Sop\Log::warning(__FILE__, __LINE__, 'User (' . $user['user_id'] . ') does not have role.');
    \Sop\Login::exitWithLoginError($message, $message);
}

\Sop\Login::registerToSession($user);
\Sop\Login::exitWithSuccess();
