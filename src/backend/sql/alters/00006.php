<?php

public static function apply()
{
    R::exec('UPDATE `user` SET admin_flag = true WHERE user_id = ?', array('muser111'));
}
