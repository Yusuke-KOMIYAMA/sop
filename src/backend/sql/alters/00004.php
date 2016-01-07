<?php

public static function apply()
{
    R::exec('ALTER TABLE `user` ADD `admin_flag` BOOLEAN NOT NULL DEFAULT false');
}
