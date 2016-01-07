<?php

public static function apply()
{
    R::exec('ALTER TABLE `sop` CHANGE COLUMN `checker_unnecessary` `checker_required_flag` tinyint(1)');
    R::exec('UPDATE `sop` SET checker_required_flag = ! checker_required_flag');
}
