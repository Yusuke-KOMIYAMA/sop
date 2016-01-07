<?php

require_once __DIR__ . '/../../src/bootstrap.php';

\Sop\Database::setupRedBean();

// grp
$values = array(
    array('test_東京大学医科学研究所附属病院'),
    array('test_セルフプロセッシング・輸血部'),
    array('test_検査部'),
);
foreach ($values as $v) {
    R::exec('INSERT INTO `grp` (`grp_name`) VALUES (?)', $v);
}

// user
$values = array(
    array('muser111', 'ユーザー111', crypt('user_111'), '111', 1),
    array('muser110', 'ユーザー110', crypt('user_110'), '110', 0),
    array('muser011', 'ユーザー011', crypt('user_011'), '011', 0),
    array('muser101', 'ユーザー101', crypt('user_101'), '101', 0),
    array('muser100', 'ユーザー100', crypt('user_100'), '100', 0),
    array('muser010', 'ユーザー010', crypt('user_010'), '010', 0),
    array('muser001', 'ユーザー001', crypt('user_001'), '001', 0),
    array('mog100', '他グループ100', crypt('og_100'),   '100', 0),
    array('mog010', '他グループ010', crypt('og_010'),   '010', 0),
    array('mog001', '他グループ001', crypt('og_001'),   '001', 0),
    array('mog111', '他グループ111', crypt('og_111'),   '111', 0),
);
foreach ($values as $v) {
    R::exec('INSERT INTO `user` (`user_id`, `user_name`, `password`, `role`, `admin_flag`) VALUES (?, ?, ?, ?, ?)', $v);
}

// user_grp
$values = array(
    array('muser111',2),
    array('muser110',2),
    array('muser011',2),
    array('muser101',2),
    array('muser100',2),
    array('muser010',2),
    array('muser001',2),
    array('mog100',3),
    array('mog010',3),
    array('mog001',3),
    array('mog111',3),
);
foreach ($values as $v) {
    R::exec('INSERT INTO `user_grp` (`user_id`, `grp_id`) VALUES (?, ?)', $v);
}
