<?php
include_once(__DIR__."/config.php");
include_once(__DIR__."/../../src/db_common.php");

/**
 * ログインチェック
 */
if (\Sop\Session::getSiteData('user_id') === NULL) {
    \Sop\Api::exitWithSessionExpired();
}
