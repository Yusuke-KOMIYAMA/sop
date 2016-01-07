<?php

require_once __DIR__ . '/../../src/bootstrap.php';

\Sop\Database::setupRedBean();

// user
$values = array(
    array('iit0001', 'iit0001', '', '111', 1),
    array('iit0002', 'iit0002', '', '111', 1),
    array('core0001', 'core0001', '', '111', 1),
    array('core0002', 'core0002', '', '111', 1),
    array('core0003', 'core0003', '', '111', 1),
    array('tims', 'tims', '', '111', 1),
);
foreach ($values as $v) {
    R::exec('INSERT INTO `user` (`user_id`, `user_name`, `password`, `role`, `admin_flag`) VALUES (?, ?, ?, ?, ?)', $v);
}

// user_grp
$values = array(
    array('iit0001',2),
    array('iit0002',2),
    array('core0001',2),
    array('core0002',2),
    array('core0003',2),
    array('tims',2),
);
foreach ($values as $v) {
    R::exec('INSERT INTO `user_grp` (`user_id`, `grp_id`) VALUES (?, ?)', $v);
}
