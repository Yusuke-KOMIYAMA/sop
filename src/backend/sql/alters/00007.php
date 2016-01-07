<?php

public static function apply()
{

    R::exec(
        "CREATE TABLE IF NOT EXISTS `form` ("
        . "`form_id` INTEGER PRIMARY KEY AUTO_INCREMENT,"
        . "`pj_id` INTEGER NOT NULL,"
        . "`sop_id` INTEGER NOT NULL,"
        . "`tpl_id` INTEGER NOT NULL,"
        . "`x` INTEGER NOT NULL,"
        . "`y` INTEGER NOT NULL,"
        . "`width` INTEGER NOT NULL,"
        . "`height` INTEGER NOT NULL,"
        . "`type` TEXT NOT NULL,"
        . "`del_flg` INTEGER NOT NULL DEFAULT '0'"
        . ") DEFAULT CHARACTER SET=utf8;"
    );

}
