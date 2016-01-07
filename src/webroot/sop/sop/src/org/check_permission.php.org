<?php
include_once(__DIR__."/config.php");
include_once(__DIR__."/db_common.php");

function isPermittedForShowTpl($db, $grp_id, $pj_id, $sop_id){
        $sql = "SELECT count(*) as count FROM grp_pj LEFT JOIN tpl ON tpl.pj_id = grp_pj.pj_id WHERE grp_pj.pj_id = :pj_id AND tpl.sop_id = :sop_id AND grp_pj.grp_id = :grp_id";

        $params = array();
        $params[':grp_id'] = $grp_id;
        $params[':pj_id'] = $pj_id;
        $params[':sop_id'] = $sop_id;

        $stmt = $db->prepare($sql);
        $stmt->execute($params);

        $count = 0;
        foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
                $count = (int)$row['count'];
        }

        return ($count > 0);
}
