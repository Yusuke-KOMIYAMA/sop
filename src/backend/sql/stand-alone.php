<?php

require_once __DIR__ . '/../src/bootstrap.php';

\Sop\Database::setupRedBean();

if (\Sop\Config::get('use_sso')) {
    print "SKIP: This system is using sso.\n";
    exit;
}

// grp
$values = array(
    array('管理グループ'),
);
foreach ($values as $v) {
    R::exec('INSERT INTO `grp` (`grp_name`) VALUES (?)', $v);
}

// user
$values = array(
    array('admin', 'admin', crypt('admin'), '000', 1),
);
foreach ($values as $v) {
    R::exec('INSERT INTO `user` (`user_id`, `user_name`, `password`, `role`, `admin_flag`) VALUES (?, ?, ?, ?, ?)', $v);
}

// user_grp
$values = array(
    array('admin',1),
);
foreach ($values as $v) {
    R::exec('INSERT INTO `user_grp` (`user_id`, `grp_id`) VALUES (?, ?)', $v);
}
