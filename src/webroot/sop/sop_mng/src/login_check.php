<?php
include_once(__DIR__."/../../sop/src/config.php");
include_once(__DIR__."/../../sop/src/db_common.php");

/**
 * ログインチェック
 */
if (\Sop\Session::getSiteData('user_id') === NULL) {
    \Sop\Api::exitWithSessionExpired();
}
