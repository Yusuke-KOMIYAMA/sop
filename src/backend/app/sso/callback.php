<?php
require_once __DIR__ . '/../../src/bootstrap.php';

\Sop\Database::setupRedBean();

use InoOicClient\Flow\Basic;

// 既存の情報はリセットする。
unset($_SESSION[\Sop\Session::getSiteData('siteKey')]);

if (\Sop\Config::get('debug_pseudo_sso')) {
    $userInfo = array(
        'sub' => \Sop\Config::get('debug_pseudo_sso_user'),
        'updated_at' => 1424903837,
        'email' => 'sop@example.com',
        'name'  => 'test user',
        'family_name' => 'YAMADA',
        'given_name'  => 'Taro',
    );
    $_SESSION[\Sop\Session::getSiteData('siteKey')]['sso_user_id'] = $userInfo['sub'];
    \Sop\SingleSignOn::registerInitialUser($userInfo);
    \Sop\SingleSignOn::updateUserData($userInfo);

} else {
    $flow = new Basic(Sop\SingleSignOn::getConfig());

    try {
        $userInfo = $flow->process();
        if ($userInfo['sub']) {
            $_SESSION[\Sop\Session::getSiteData('siteKey')]['sso_user_id'] = $userInfo['sub'];
        }
        \Sop\SingleSignOn::registerInitialUser($userInfo);
        \Sop\SingleSignOn::updateUserData($userInfo);
    } catch (\Exception $e) {
        $_SESSION[\Sop\Session::getSiteData('siteKey')]['sso_errors'] = array(
            'シングル・サインオンの認証でエラーが発生しました。もう一度ログインを試してみてください。',
            $e->getMessage());
    }
}

session_write_close();
header('Location:' . \Sop\Session::getSiteData('pathname'));
