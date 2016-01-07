<?php

public static function apply()
{
    // 一つの手順書に複数の手書きデータが保存されるので
    // file_idに対するUNIQUE KEYを削除する。
    R::exec('ALTER TABLE file_hwr DROP INDEX `file_id`');
    R::exec('ALTER TABLE file_hwr ADD UNIQUE (`file_id`, `hwr_id`)');
}
