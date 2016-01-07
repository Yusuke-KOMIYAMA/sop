<?php

public static function apply()
{
    R::exec('ALTER TABLE pj_smpl ADD display_order int DEFAULT 0 NOT NULL');
}
