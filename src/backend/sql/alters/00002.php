<?php

public static function apply()
{
    R::exec('ALTER TABLE `schema` ADD COLUMN `original_filename` VARCHAR(255) NOT NULL');
    R::exec('UPDATE `schema` SET `original_filename` = ?', array('手順書'));
}
