<?php

public static function apply()
{
    R::exec('ALTER TABLE `tpl` DROP COLUMN `aprv_ready_flg`');
}
