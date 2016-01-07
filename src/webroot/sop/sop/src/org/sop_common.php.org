<?php
/*
    このファイルは tablet からも参照される。
    セッション情報などはこのファイル外で取得し、引数として渡していくこと。
*/

function readPageImageFile($db, $grp_id, $pj_id, $sop_id, $tpl_id, $schema_id, $page, $base_path){

    # 画像の閲覧資格があるかどうか確認。
    if( ! isPermittedForShowTpl($db, $grp_id, $pj_id, $sop_id)){
            error_log("No Permission. grp({$grp_id}) pj({$pj_id}) sop({$sop_id})");
            exit;
    }

    $file_path = "$base_path/{$pj_id}_{$sop_id}_{$tpl_id}_{$schema_id}/{$page}.png";
    $existsOnFile = file_exists($file_path);
    if( ! $existsOnFile){
            error_log("No exists file: $file_path");
            exit;
    }

    $existsOnDB = isExistSchema($db, $pj_id, $sop_id, $tpl_id, $schema_id);
    if( ! $existsOnDB){
            error_log("No exists record: pj({$pj_id}) sop({$sop_id}) tpl({$tpl_id}) schema({$schema_id})");
            exit;
    }

    header('Content-Type: image/png');
    header('Cache-Control: no-cache');
    header('Pragma: no-cache');
    header('Content-Length: '.filesize($file_path));
    ob_clean();
    flush();
    readfile($file_path);
}
