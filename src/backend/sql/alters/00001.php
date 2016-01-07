<?php

public static function apply()
{
    R::exec('ALTER TABLE `tpl` ADD `aprv_ready_flg` BOOLEAN NOT NULL DEFAULT false');
}
