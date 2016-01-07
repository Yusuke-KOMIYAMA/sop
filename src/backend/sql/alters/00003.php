<?php

public static function apply()
{
    R::exec('ALTER TABLE `file` ADD COLUMN `provisional_fix_date` DATETIME');
}
