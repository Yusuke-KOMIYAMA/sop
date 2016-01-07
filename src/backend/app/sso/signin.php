<?php
require_once __DIR__ . '/../../src/bootstrap.php';

use InoOicClient\Flow\Basic;

if (! isset($_REQUEST['session_site_key'])
    || ! isset($_REQUEST['pathname'])
) {
    exit;
}
\Sop\Session::setSiteData('siteKey',  $_REQUEST['session_site_key']);
\Sop\Session::setSiteData('pathname', $_REQUEST['pathname']);

if (\Sop\Config::get('debug_pseudo_sso')) {
    session_write_close();
    header('Location:' . 'callback');

} else {
    $flow = new Basic(Sop\SingleSignOn::getConfig());

    try {
        $uri = $flow->getAuthorizationRequestUri('openid email profile');
        session_write_close();
        header('Location: ' . $uri);
    } catch (\Exception $e) {
        printf("Exception during authorization URI creation: [%s] %s", get_class($e), $e->getMessage());
    }
}
