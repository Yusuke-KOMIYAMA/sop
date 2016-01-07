<?php

public static function apply()
{
    R::exec('ALTER TABLE `hwr` ADD COLUMN `update_time` DATETIME');
    R::exec('ALTER TABLE `hwr` ADD COLUMN `mark_position_y` INTEGER');
}
