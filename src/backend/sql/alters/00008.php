<?php

public static function apply()
{
    R::exec('ALTER TABLE `form` ADD COLUMN `default_value` text');
}
