<?php

public static function apply()
{
    R::exec('ALTER TABLE `val` ADD COLUMN `update_time` DATETIME');
    R::exec('ALTER TABLE `file` ADD COLUMN `request_time` DATETIME');
    R::exec('ALTER TABLE `file` ADD COLUMN `seq_no` INTEGER');
}
