<?php

public static function apply()
{
    R::exec('ALTER TABLE `sop` ADD COLUMN `checker_unnecessary` tinyint(1)');
}
