<?php

require_once __DIR__ . '/../../../../backend/src/bootstrap.php';

function createDBConnection(){
    return \Sop\Database::setupPDO();
}

function getLastID($db){
    $query = "SELECT LAST_INSERT_ID()";
    foreach($db->query($query) as $row){
        if(array_key_exists('LAST_INSERT_ID()', $row)){
            return $row['LAST_INSERT_ID()'];
        }
    }
}

// 現在取得できる ID に 1 足した値を返す。
// DB の ID が決まる前に ID を用いるケースに使用する。
// 例) ファイル名に ID を使用しており、ファイルアップロードが正常に完了したあと、DB にレコードを追加する場合。
function getNextID($db, $table_name, $id_column_name){
    $query = "SELECT max($id_column_name) as max FROM $table_name";
    foreach($db->query($query) as $row){
        if(array_key_exists('max', $row)){
            return $row['max'] + 1;
        }
    }
}

/**
 * DB 共通クラス
 */

// ---------------------------
// TBL: grp
// ---------------------------
function getSQLBaseForGrp()
{
    $sql = "SELECT grp_id, grp_name FROM grp WHERE del_flg = 0";
    return $sql;
}

function addGrp($db, $grp_id, $grp_name)
{
    $sql = " INSERT INTO grp (grp_name, del_flg) VALUES (:grp_name, 0)";

    $params = array();
    $params[':grp_name'] = $grp_name;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function updGrp($db, $grp_id, $grp_name)
{
    $sql = "";
    $sql .= " UPDATE grp SET";
    $sql .= "   grp_name = :grp_name";
    $sql .= " WHERE grp_id = :grp_id AND del_flg = 0";

    $params = array();
    $params[':grp_id'] = $grp_id;
    $params[':grp_name'] = $grp_name;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function delGrp($db, $grp_id)
{
    $sql = "";
    $sql .= " UPDATE grp SET";
    $sql .= "   del_flg = 1";
    $sql .= " WHERE grp_id = :grp_id AND del_flg = 0";

    $params = array();
    $params[':grp_id'] = $grp_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}



// ---------------------------
// TBL: user
// ---------------------------
function getSQLBaseForOneUser()
{
    $sql = "";
    $sql .= " SELECT";
    $sql .= "   user_id,";
    $sql .= "   user_name,";
    $sql .= "   password,";
    $sql .= "   role,";
    $sql .= "   email,";
    $sql .= "   note,";
    $sql .= "   admin_flag";
    $sql .= " FROM";
    $sql .= "   user";
    $sql .= " WHERE";
    $sql .= "   del_flg = 0";
    return $sql;
}

function getSQLDeletedBaseForOneUser()
{
    $sql = "";
    $sql .= " SELECT";
    $sql .= "   user_id,";
    $sql .= "   user_name,";
    $sql .= "   password,";
    $sql .= "   role,";
    $sql .= "   email,";
    $sql .= "   note,";
    $sql .= "   admin_flag";
    $sql .= " FROM";
    $sql .= "   user";
    $sql .= " WHERE";
    $sql .= "   del_flg = 1";
    return $sql;
}


function getSQLBaseForUser()
{
    $sql = "";
    $sql .= " SELECT";
    $sql .= "   v_user.grp_id grp_id,";
    $sql .= "   grp.grp_name grp_name,";
    $sql .= "   v_user.user_id user_id,";
    $sql .= "   v_user.user_name user_name,";
    $sql .= "   v_user.password password,";
    $sql .= "   v_user.role role,";
    $sql .= "   v_user.admin_flag admin_flag,";
    $sql .= "   v_user.email email,";
    $sql .= "   v_user.note note";
    $sql .= " FROM";
    $sql .= "   (";
    $sql .= "     SELECT";
    $sql .= "       user_grp.grp_id,";
    $sql .= "       user.user_id,";
    $sql .= "       user.user_name,";
    $sql .= "       user.password,";
    $sql .= "       user.role,";
    $sql .= "       user.admin_flag,";
    $sql .= "       user.email,";
    $sql .= "       user.note";
    $sql .= "     FROM";
    $sql .= "       user";
    $sql .= "     LEFT OUTER JOIN user_grp ON user.user_id = user_grp.user_id";
    $sql .= "     WHERE";
    $sql .= "       user.del_flg = 0";
    $sql .= "   ) v_user";
    $sql .= " LEFT OUTER JOIN grp ON v_user.grp_id = grp.grp_id";
    $sql .= " WHERE grp.del_flg = 0";
    return $sql;
}

function addUser($db, $user_id, $password, $user_name, $role, $email, $note, $admin_flag)
{
    $sql = " INSERT INTO user (user_id, password, user_name, role, email, note, del_flg, admin_flag) VALUES (:user_id, :password, :user_name, :role, :email, :note, 0, :admin_flag)";

    $params = array();
    $params[':user_id'] = $user_id;
    $params[':password'] = $password;
    $params[':user_name'] = $user_name;
    $params[':role'] = $role;
    $params[':email'] = $email;
    $params[':note'] = $note;
    $params[':admin_flag'] = $admin_flag;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params))
    {
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function updUser($db, $user_id, $user_name, $role, $email, $note, $admin_flag)
{
    $sql = "";
    $sql .= " UPDATE user SET";
    $sql .= "   user_name = :user_name, role = :role, email = :email, note = :note, admin_flag = :admin_flag";
    $sql .= " WHERE user_id = :user_id AND del_flg = 0";

    $params = array();
    $params[':user_id'] = $user_id;
    $params[':user_name'] = $user_name;
    $params[':role'] = $role;
    $params[':email'] = $email;
    $params[':note'] = $note;
    $params[':admin_flag'] = $admin_flag;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function updPwd($db, $user_id, $password)
{
    $sql = "";
    $sql .= " UPDATE user SET";
    $sql .= "   password = :password";
    $sql .= " WHERE user_id = :user_id AND del_flg = 0";

    $params = array();
    $params[':user_id'] = $user_id;
    $params[':password'] = $password;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function reviveAndUpdUser($db, $user_id, $password, $user_name, $role, $email, $note, $admin_flag)
{
    $sql = "";
    $sql .= " UPDATE user SET";
    $sql .= "   password = :password, user_name = :user_name, role = :role, email = :email, note = :note, admin_flag = :admin_flag, del_flg = :del_flg";
    $sql .= " WHERE user_id = :user_id AND del_flg = 1";

    $params = array();
    $params[':user_id'] = $user_id;
    $params[':password'] = $password;
    $params[':user_name'] = $user_name;
    $params[':role'] = $role;
    $params[':email'] = $email;
    $params[':note'] = $note;
    $params[':admin_flag'] = $admin_flag;
    $params[':del_flg'] = 0;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}


function delUser($db, $user_id)
{
    $sql = "";
    $sql .= " UPDATE user SET";
    $sql .= "   del_flg = 1";
    $sql .= " WHERE user_id = :user_id AND del_flg = 0";

    $params = array();
    $params[':user_id'] = $user_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}


// ---------------------------
// TBL: user_grp
// ---------------------------
function getSQLBaseForUserGrp()
{
    $sql = "SELECT user_id, grp_id FROM user_grp";
    return $sql;
}

function addUserGrp($db, $user_id, $grp_id)
{
    $sql = " INSERT INTO user_grp (user_id, grp_id) VALUES (:user_id, :grp_id)";

    $params = array();
    $params[':user_id'] = $user_id;
    $params[':grp_id'] = $grp_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params))
    {
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function delUserGrp($db, $user_id)
{
    $sql = " DELETE FROM user_grp WHERE user_id = :user_id";

    $params = array();
    $params[':user_id'] = $user_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

// ---------------------------
// TBL: grp_pj
// ---------------------------
function addGrpPj($db, $grp_id, $pj_id)
{
    $sql = " INSERT INTO grp_pj (grp_id, pj_id) VALUES (:grp_id, :pj_id) ";

    $params = array();
    $params[':grp_id'] = $grp_id;
    $params[':pj_id'] = $pj_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params))
    {
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function delGrpPj($db, $grp_id, $pj_id)
{
    $sql = "";
    $sql .= " UPDATE grp_pj SET";
    $sql .= "   del_flg = 1";
    $sql .= " WHERE grp_id = :grp_id AND pj_id = :pj_id AND del_flg = 0";

    $params = array();
    $params[':grp_id'] = $grp_id;
    $params[':pj_id'] = $pj_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

// ---------------------------
// TBL: pj
// ---------------------------
function getSQLBaseForPjList()
{
    $sql = "";
    $sql .= " SELECT";
    $sql .= "   grp_pj.grp_id grp_id,";
    $sql .= "   pj.pj_id pj_id,";
    $sql .= "   pj.pj_name pj_name";
    $sql .= " FROM grp_pj";
    $sql .= " LEFT OUTER JOIN pj ON grp_pj.pj_id = pj.pj_id";
    $sql .= " WHERE pj.del_flg = 0";
    return $sql;
}

function addPj($db, $pj_id, $pj_name)
{
    $sql = " INSERT INTO pj (pj_name, del_flg) VALUES (:pj_name, 0) ";

    $params = array();
    $params[':pj_name'] = $pj_name;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function updPj($db, $pj_id, $pj_name)
{
    $sql = "";
    $sql .= " UPDATE pj SET";
    $sql .= "   pj_name = :pj_name";
    $sql .= " WHERE pj_id = :pj_id AND del_flg = 0";

    $params = array();
    $params[':pj_id'] = $pj_id;
    $params[':pj_name'] = $pj_name;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function delPj($db, $pj_id)
{
    $sql = "";
    $sql .= " UPDATE pj SET";
    $sql .= "   del_flg = 1";
    $sql .= " WHERE pj_id = :pj_id AND del_flg = 0";

    $params = array();
    $params[':pj_id'] = $pj_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

// ---------------------------
// TBL: pj_smpl
// ---------------------------
function getSQLBaseForPjSmplList()
{
    $sql = "";
    $sql .= " SELECT";
    $sql .= "   v_pj.grp_id grp_id,";
    $sql .= "   v_pj.pj_id pj_id,";
    $sql .= "   v_pj.pj_name pj_name,";
    $sql .= "   pj_smpl.smpl_given_no smpl_given_no,";
    $sql .= "   pj_smpl.display_order display_order";
    $sql .= " FROM pj_smpl";
    $sql .= " LEFT OUTER JOIN";
    $sql .= "   (";
    $sql .= "     SELECT";
    $sql .= "       grp_pj.grp_id,";
    $sql .= "       pj.pj_id,";
    $sql .= "       pj.pj_name";
    $sql .= "     FROM grp_pj";
    $sql .= "     LEFT OUTER JOIN pj ON grp_pj.pj_id = pj.pj_id";
    $sql .= "     WHERE pj.del_flg = 0";
    $sql .= "   ) v_pj";
    $sql .= " ON pj_smpl.pj_id = v_pj.pj_id";
    return $sql;
}

function addPjSmpl($db, $pj_id, $smpl_given_no, $display_order)
{
    $sql = " INSERT INTO pj_smpl (pj_id, smpl_given_no, display_order) VALUES (:pj_id, :smpl_given_no, :display_order) ";

    $params = array();
    $params[':pj_id'] = $pj_id;
    $params[':smpl_given_no'] = $smpl_given_no;
    $params[':display_order'] = $display_order;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function delPjSmpl($db, $pj_id) // pj_id に関連付くレコードを全て削除
{
    $sql = " DELETE FROM pj_smpl WHERE pj_id = :pj_id";

    $params = array();
    $params[':pj_id'] = $pj_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

// ---------------------------
// TBL: sop
// ---------------------------
function getSQLBaseForSopList()
{
    $sql = "";
    $sql .= " SELECT";
    $sql .= "   v_pj.grp_id grp_id,";
    $sql .= "   v_pj.pj_id pj_id,";
    $sql .= "   v_pj.pj_name pj_name,";
    $sql .= "   sop.sop_id sop_id,";
    $sql .= "   sop.sop_name sop_name,";
    $sql .= "   sop.sop_name_en sop_name_en,";
    $sql .= "   sop.checker_required_flag checker_required_flag,";
    $sql .= "   sop.latest_tpl_id latest_tpl_id";
    $sql .= " FROM sop";
    $sql .= " LEFT OUTER JOIN";
    $sql .= "   (";
    $sql .= "     SELECT";
    $sql .= "       grp_pj.grp_id,";
    $sql .= "       pj.pj_id,";
    $sql .= "       pj.pj_name";
    $sql .= "     FROM grp_pj";
    $sql .= "     LEFT OUTER JOIN pj ON grp_pj.pj_id = pj.pj_id";
    $sql .= "     WHERE pj.del_flg = 0";
    $sql .= "   ) v_pj";
    $sql .= " ON sop.pj_id = v_pj.pj_id";
    $sql .= " WHERE sop.del_flg = 0";
    return $sql;
}

function addSop($db, $sop_id, $pj_id, $sop_name, $checker_required_flag)
{
    $sql = " INSERT INTO sop (pj_id, sop_name, checker_required_flag, del_flg) VALUES (:pj_id, :sop_name, :checker_required_flag, 0) ";

    $params = array();
    $params[':pj_id'] = $pj_id;
    $params[':sop_name'] = $sop_name;
    $params['checker_required_flag'] = $checker_required_flag;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function updSop($db, $sop_id, $sop_name, $checker_required_flag)
{
    $sql = "";
    $sql .= " UPDATE sop SET";
    $sql .= "   sop_name = :sop_name, ";
    $sql .= "   checker_required_flag = :checker_required_flag";
    $sql .= " WHERE sop_id = :sop_id AND del_flg = 0";

    $params = array();
    $params[':sop_name'] = $sop_name;
    $params[':checker_required_flag'] = $checker_required_flag;
    $params[':sop_id'] = $sop_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function updSopAprv($db, $sop_id, $latest_tpl_id)
{
    $sql = "";
    $sql .= " UPDATE sop SET";
    $sql .= "   latest_tpl_id = :latest_tpl_id";
    $sql .= " WHERE sop_id = :sop_id AND del_flg = 0";

    $params = array();
    $params[':latest_tpl_id'] = $latest_tpl_id;
    $params[':sop_id'] = $sop_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function delPjSop($db, $pj_id) // pj_id に関連付くレコードを全て削除
{
    $sql = "";
    $sql .= " UPDATE sop SET";
    $sql .= "   del_flg = 1";
    $sql .= " WHERE pj_id = :pj_id AND del_flg = 0";

    $params = array();
    $params[':pj_id'] = $pj_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function delSop($db, $sop_id)
{
    $sql = "";
    $sql .= " UPDATE sop SET";
    $sql .= "   del_flg = 1";
    $sql .= " WHERE sop_id = :sop_id AND del_flg = 0";

    $params = array();
    $params[':sop_id'] = $sop_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

// ---------------------------
// TBL: tpl
// ---------------------------
function getSQLBaseForTplList()
{
    $sql = "";
    $sql .= " SELECT";
    $sql .= "   v_sop.grp_id grp_id,";
    $sql .= "   v_sop.pj_id pj_id,";
    $sql .= "   v_sop.pj_name pj_name,";
    $sql .= "   v_sop.sop_id sop_id,";
    $sql .= "   v_sop.sop_name sop_name,";
    $sql .= "   v_sop.sop_name_en sop_name_en,";
    $sql .= "   tpl.tpl_id tpl_id,";
    $sql .= "   tpl.tpl_name tpl_name,";
    $sql .= "   tpl.latest_flg latest_flg,";
    $sql .= "   tpl.aprv_flg aprv_flg,";
    $sql .= "   tpl.upld_date upld_date,";
    $sql .= "   (SELECT user_name FROM user WHERE del_flg = 0 AND user_id = tpl.upld_user) upld_user,";
    $sql .= "   tpl.upld_cmnt upld_cmnt,";
    $sql .= "   tpl.aprv_date aprv_date,";
    $sql .= "   (SELECT user_name FROM user WHERE del_flg = 0 AND user_id = tpl.aprv_user) aprv_user,";
    $sql .= "   tpl.aprv_cmnt aprv_cmnt,";
    $sql .= "   tpl.rtn_date rtn_date,";
    $sql .= "   (SELECT user_name FROM user WHERE del_flg = 0 AND user_id = tpl.rtn_user) rtn_user,";
    $sql .= "   tpl.rtn_cmnt rtn_cmnt,";
    $sql .= "   tpl.revision_no revision_no,";
    $sql .= "   (SELECT schema_type FROM `schema` WHERE del_flg = 0 AND tpl_id = tpl.tpl_id) schema_type,";
    $sql .= "   (SELECT schema_id FROM `schema` WHERE del_flg = 0 AND tpl_id = tpl.tpl_id) schema_id";
    $sql .= " FROM tpl";
    $sql .= " LEFT OUTER JOIN";
    $sql .= "   (";
    $sql .= "     SELECT";
    $sql .= "       v_pj.grp_id,";
    $sql .= "       v_pj.pj_id,";
    $sql .= "       v_pj.pj_name,";
    $sql .= "       sop.sop_id,";
    $sql .= "       sop.sop_name,";
    $sql .= "       sop.sop_name_en,";
    $sql .= "       sop.latest_tpl_id";
    $sql .= "     FROM sop";
    $sql .= "     LEFT OUTER JOIN";
    $sql .= "       (";
    $sql .= "         SELECT";
    $sql .= "           grp_pj.grp_id,";
    $sql .= "           pj.pj_id,";
    $sql .= "           pj.pj_name";
    $sql .= "         FROM grp_pj";
    $sql .= "         LEFT OUTER JOIN pj ON grp_pj.pj_id = pj.pj_id";
    $sql .= "         WHERE pj.del_flg = 0";
    $sql .= "       ) v_pj";
    $sql .= "     ON sop.pj_id = v_pj.pj_id";
    $sql .= "     WHERE sop.del_flg = 0";
    $sql .= "   ) v_sop";
    $sql .= " ON tpl.sop_id = v_sop.sop_id";
    $sql .= " WHERE tpl.del_flg = 0";
    return $sql;
}

function addTpl($db, $tpl_id, $pj_id, $sop_id, $tpl_name, $aprv_flg, $latest_flg, $upld_date, $upld_user, $upld_cmnt)
{
    $sql = " INSERT INTO tpl (tpl_id, pj_id, sop_id, tpl_name, aprv_flg, latest_flg, upld_date, upld_user, upld_cmnt, del_flg) VALUES (:tpl_id, :pj_id, :sop_id, :tpl_name, :aprv_flg, :latest_flg, :upld_date, :upld_user, :upld_cmnt, 0) ";

    $params = array();
    $params[':tpl_id'] = $tpl_id;
    $params[':pj_id'] = $pj_id;
    $params[':sop_id'] = $sop_id;
    $params[':tpl_name'] = $tpl_name;
    $params[':aprv_flg'] = $aprv_flg;
    $params[':latest_flg'] = $latest_flg;
    $params[':upld_date'] = $upld_date;
    $params[':upld_user'] = $upld_user;
    $params[':upld_cmnt'] = $upld_cmnt;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function updTplTransitAprv($db, $tpl_id, $new_aprv_flg)
{
    $sql = "";
    $sql .= " UPDATE tpl SET";
    $sql .= "   aprv_flg = :aprv_flg";
    $sql .= " WHERE tpl_id = :tpl_id AND del_flg = 0";

    $params = array();
    $params[':aprv_flg'] = $new_aprv_flg;
    $params[':tpl_id'] = $tpl_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function updTplAprv($db, $tpl_id, $aprv_flg, $latest_flg, $aprv_cmnt, $aprv_date, $aprv_user, $revision_no)
{
    $sql = "";
    $sql .= " UPDATE tpl SET";
    $sql .= "   aprv_flg = :aprv_flg, latest_flg = :latest_flg, aprv_cmnt = :aprv_cmnt, aprv_date = :aprv_date, aprv_user = :aprv_user, revision_no = :revision_no";
    $sql .= " WHERE tpl_id = :tpl_id AND del_flg = 0";

    $params = array();
    $params[':aprv_flg'] = $aprv_flg;
    $params[':latest_flg'] = $latest_flg;
    $params[':aprv_cmnt'] = $aprv_cmnt;
    $params[':aprv_date'] = $aprv_date;
    $params[':aprv_user'] = $aprv_user;
    $params[':revision_no'] = $revision_no;
    $params[':tpl_id'] = $tpl_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function updTplLatest($db, $tpl_id, $latest_flg)
{
    $sql = "";
    $sql .= " UPDATE tpl SET";
    $sql .= "   latest_flg = :latest_flg";
    $sql .= " WHERE tpl_id = :tpl_id AND del_flg = 0";

    $params = array();
    $params[':latest_flg'] = $latest_flg;
    $params[':tpl_id'] = $tpl_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function updTplDetail($db, $tpl_id, $tpl_name, $upld_cmnt)
{
    $sql = "";
    $sql .= " UPDATE tpl SET";
    $sql .= "   tpl_name = :tpl_name,";
    $sql .= "   upld_cmnt = :upld_cmnt";
    $sql .= " WHERE tpl_id = :tpl_id AND del_flg = 0";

    $params = array();
    $params[':tpl_name'] = $tpl_name;
    $params[':upld_cmnt'] = $upld_cmnt;
    $params[':tpl_id'] = $tpl_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}


function updTplRtn($db, $tpl_id, $aprv_flg, $rtn_cmnt, $rtn_date, $rtn_user)
{
    $sql = "";
    $sql .= " UPDATE tpl SET";
    $sql .= "   aprv_flg = :aprv_flg, rtn_cmnt = :rtn_cmnt, rtn_date = :rtn_date, rtn_user = :rtn_user";
    $sql .= " WHERE tpl_id = :tpl_id AND del_flg = 0";

    $params = array();
    $params[':aprv_flg'] = $aprv_flg;
    $params[':rtn_cmnt'] = $rtn_cmnt;
    $params[':rtn_date'] = $rtn_date;
    $params[':rtn_user'] = $rtn_user;
    $params[':tpl_id'] = $tpl_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function delPjTpl($db, $pj_id) // pj_id に関連付くレコードを全て削除
{
    $sql = "";
    $sql .= " UPDATE tpl SET";
    $sql .= "   del_flg = 1";
    $sql .= " WHERE pj_id = :pj_id AND del_flg = 0";

    $params = array();
    $params[':pj_id'] = $pj_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function delSopTpl($db, $sop_id) // sop_id に関連付くレコードを全て削除
{
    $sql = "";
    $sql .= " UPDATE tpl SET";
    $sql .= "   del_flg = 1";
    $sql .= " WHERE sop_id = :sop_id AND del_flg = 0";

    $params = array();
    $params[':sop_id'] = $sop_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function delTpl($db, $tpl_id)
{
    $sql = "";
    $sql .= " UPDATE tpl SET";
    $sql .= "   del_flg = 1";
    $sql .= " WHERE tpl_id = :tpl_id AND del_flg = 0";

    $params = array();
    $params[':tpl_id'] = $tpl_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

// ---------------------------
// TBL: schema
// ---------------------------
function getSQLBaseForSchemaList()
{
    $sql = "";
    $sql .= " SELECT";
    $sql .= "   v_tpl.grp_id grp_id,";
    $sql .= "   v_tpl.pj_id pj_id,";
    $sql .= "   v_tpl.pj_name pj_name,";
    $sql .= "   v_tpl.sop_id sop_id,";
    $sql .= "   v_tpl.sop_name sop_name,";
    $sql .= "   v_tpl.checker_required_flag checker_required_flag,";
    $sql .= "   v_tpl.tpl_id tpl_id,";
    $sql .= "   `schema`.schema_type schema_type,";
    $sql .= "   `schema`.schema_id schema_id,";
    $sql .= "   `schema`.file_path file_path,";
    $sql .= "   `schema`.original_filename original_filename";
    $sql .= " FROM";
    $sql .= "   `schema`";
    $sql .= " LEFT OUTER JOIN";
    $sql .= "   (";
    $sql .= "     SELECT";
    $sql .= "       v_sop.grp_id,";
    $sql .= "       v_sop.pj_id,";
    $sql .= "       v_sop.pj_name,";
    $sql .= "       v_sop.sop_id,";
    $sql .= "       v_sop.sop_name,";
    $sql .= "       v_sop.sop_name_en,";
    $sql .= "       v_sop.checker_required_flag,";
    $sql .= "       tpl.tpl_id,";
    $sql .= "       tpl.tpl_name,";
    $sql .= "       tpl.latest_flg,";
    $sql .= "       tpl.aprv_flg,";
    $sql .= "       tpl.upld_date,";
    $sql .= "       (SELECT user_name FROM user WHERE del_flg = 0 AND user_id = tpl.upld_user) upld_user,";
    $sql .= "       tpl.upld_cmnt,";
    $sql .= "       tpl.aprv_date,";
    $sql .= "       (SELECT user_name FROM user WHERE del_flg = 0 AND user_id = tpl.aprv_user) aprv_user,";
    $sql .= "       tpl.aprv_cmnt,";
    $sql .= "       tpl.rtn_date,";
    $sql .= "       (SELECT user_name FROM user WHERE del_flg = 0 AND user_id = tpl.rtn_user) rtn_user,";
    $sql .= "       tpl.rtn_cmnt,";
    $sql .= "       tpl.revision_no";
    $sql .= "     FROM tpl";
    $sql .= "     LEFT OUTER JOIN";
    $sql .= "       (";
    $sql .= "         SELECT";
    $sql .= "           v_pj.grp_id,";
    $sql .= "           v_pj.pj_id,";
    $sql .= "           v_pj.pj_name,";
    $sql .= "           sop.sop_id,";
    $sql .= "           sop.sop_name,";
    $sql .= "           sop.sop_name_en,";
    $sql .= "           sop.latest_tpl_id,";
    $sql .= "           sop.checker_required_flag";
    $sql .= "         FROM sop";
    $sql .= "         LEFT OUTER JOIN";
    $sql .= "           (";
    $sql .= "             SELECT";
    $sql .= "               grp_pj.grp_id,";
    $sql .= "               pj.pj_id,";
    $sql .= "               pj.pj_name";
    $sql .= "             FROM grp_pj";
    $sql .= "             LEFT OUTER JOIN pj ON grp_pj.pj_id = pj.pj_id";
    $sql .= "             WHERE pj.del_flg = 0";
    $sql .= "           ) v_pj";
    $sql .= "         ON sop.pj_id = v_pj.pj_id";
    $sql .= "         WHERE sop.del_flg = 0";
    $sql .= "       ) v_sop";
    $sql .= "     ON tpl.sop_id = v_sop.sop_id";
    $sql .= "     WHERE tpl.del_flg = 0";
    $sql .= "   ) v_tpl";
    $sql .= " ON `schema`.tpl_id = v_tpl.tpl_id";
    $sql .= " WHERE `schema`.del_flg = 0";
    return $sql;
}

function isExistSchema($db, $pj_id, $sop_id, $tpl_id, $schema_id){

    $sql = "SELECT count(*) as count FROM `schema` WHERE pj_id = :pj_id AND sop_id = :sop_id AND tpl_id = :tpl_id AND schema_id = :schema_id";

    $params = array();
    $params[':pj_id'] = $pj_id;
    $params[':sop_id'] = $sop_id;
    $params[':tpl_id'] = $tpl_id;
    $params[':schema_id'] = $schema_id;

    $stmt = $db->prepare($sql);
    $stmt->execute($params);

    $count = 0;
    foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
        $count = (int)$row['count'];
    }

    return ($count > 0);

}

function addSchema($db, $schema_id, $pj_id, $sop_id, $tpl_id, $schema_type, $file_path, $original_filename)
{
    $sql = " INSERT INTO `schema` (schema_id, pj_id, sop_id, tpl_id, schema_type, file_path, del_flg, original_filename) VALUES (:schema_id, :pj_id, :sop_id, :tpl_id, :schema_type, :file_path, 0, :original_filename) ";

    $params = array();
    $params[':schema_id'] = $schema_id;
    $params[':pj_id'] = $pj_id;
    $params[':sop_id'] = $sop_id;
    $params[':tpl_id'] = $tpl_id;
    $params[':schema_type'] = $schema_type;
    $params[':file_path'] = $file_path;
    $params[':original_filename'] = $original_filename;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function delPjSchema($db, $pj_id) // pj_id に関連付くレコードを全て削除
{
    $sql = "";
    $sql .= " UPDATE `schema` SET";
    $sql .= "   del_flg = 1";
    $sql .= " WHERE pj_id = :pj_id AND del_flg = 0";

    $params = array();
    $params[':pj_id'] = $pj_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function delSopSchema($db, $sop_id) // sop_id に関連付くレコードを全て削除
{
    $sql = "";
    $sql .= " UPDATE `schema` SET";
    $sql .= "   del_flg = 1";
    $sql .= " WHERE sop_id = :sop_id AND del_flg = 0";

    $params = array();
    $params[':sop_id'] = $sop_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function delTplSchema($db, $tpl_id) // tpl_id に関連付くレコードを全て削除
{
    $sql = "";
    $sql .= " UPDATE `schema` SET";
    $sql .= "   del_flg = 1";
    $sql .= " WHERE tpl_id = :tpl_id AND del_flg = 0";

    $params = array();
    $params[':tpl_id'] = $tpl_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

// ---------------------------
// TBL: tbl
// ---------------------------
function getSQLBaseForTblList()
{
    $sql = "";
    $sql .= " SELECT";
    $sql .= "   tbl_id, pj_id, sop_id, tpl_id, schema_id, tbl_title";
    $sql .= " FROM";
    $sql .= "   tbl";
    $sql .= " WHERE";
    $sql .= "   del_flg = 0";
    return $sql;
}

function addTbl($db, $tbl_id, $pj_id, $sop_id, $tpl_id, $schema_id, $tbl_title)
{
    $sql = " INSERT INTO tbl (pj_id, sop_id, tpl_id, schema_id, tbl_title, del_flg) VALUES (:pj_id, :sop_id, :tpl_id, :schema_id, :tbl_title, 0) ";

    $params = array();
    $params[':pj_id'] = $pj_id;
    $params[':sop_id'] = $sop_id;
    $params[':tpl_id'] = $tpl_id;
    $params[':schema_id'] = $schema_id;
    $params[':tbl_title'] = $tbl_title;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function delPjTbl($db, $pj_id) // pj_id に関連付くレコードを全て削除
{
    $sql = "";
    $sql .= " UPDATE tbl SET";
    $sql .= "   del_flg = 1";
    $sql .= " WHERE pj_id = :pj_id AND del_flg = 0";

    $params = array();
    $params[':pj_id'] = $pj_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function delSopTbl($db, $sop_id) // sop_id に関連付くレコードを全て削除
{
    $sql = "";
    $sql .= " UPDATE tbl SET";
    $sql .= "   del_flg = 1";
    $sql .= " WHERE sop_id = :sop_id AND del_flg = 0";

    $params = array();
    $params[':sop_id'] = $sop_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function delTplTbl($db, $tpl_id) // tpl_id に関連付くレコードを全て削除
{
    $sql = "";
    $sql .= " UPDATE tbl SET";
    $sql .= "   del_flg = 1";
    $sql .= " WHERE tpl_id = :tpl_id AND del_flg = 0";

    $params = array();
    $params[':tpl_id'] = $tpl_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

// ---------------------------
// TBL: clmn
// ---------------------------
function getSQLBaseForClmnList()
{
    $sql = "";
    $sql .= " SELECT";
    $sql .= "   v_tbl.pj_id,";
    $sql .= "   v_tbl.sop_id,";
    $sql .= "   v_tbl.tpl_id,";
    $sql .= "   v_tbl.schema_id,";
    $sql .= "   v_tbl.tbl_id,";
    $sql .= "   v_tbl.tbl_title,";
    $sql .= "   clmn.clmn_id,";
    $sql .= "   clmn.clmn_name,";
    $sql .= "   clmn.input_type,";
    $sql .= "   clmn.input_required";
    $sql .= " FROM";
    $sql .= "   clmn";
    $sql .= " LEFT OUTER JOIN";
    $sql .= "   (";
    $sql .= "       SELECT";
    $sql .= "         tbl_id, pj_id, sop_id, tpl_id, schema_id, tbl_title";
    $sql .= "       FROM";
    $sql .= "         tbl";
    $sql .= "       WHERE";
    $sql .= "         del_flg = 0";
    $sql .= "   ) v_tbl";
    $sql .= " ON clmn.tbl_id = v_tbl.tbl_id";
    $sql .= " WHERE";
    $sql .= "   clmn.del_flg = 0";
    return $sql;
}

function addClmn($db, $clmn_id, $pj_id, $sop_id, $tpl_id, $schema_id, $tbl_id, $clmn_name, $input_type, $input_required)
{
    $sql = " INSERT INTO clmn (pj_id, sop_id, tpl_id, schema_id, tbl_id, clmn_name, input_type, input_required, del_flg) VALUES (:pj_id, :sop_id, :tpl_id, :schema_id, :tbl_id, :clmn_name, :input_type, :input_required, 0) ";

    $params = array();
    $params[':pj_id'] = $pj_id;
    $params[':sop_id'] = $sop_id;
    $params[':tpl_id'] = $tpl_id;
    $params[':schema_id'] = $schema_id;
    $params[':tbl_id'] = $tbl_id;
    $params[':clmn_name'] = $clmn_name;
    $params[':input_type'] = $input_type;
    $params[':input_required'] = $input_required;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function delPjClmn($db, $pj_id) // pj_id に関連付くレコードを全て削除
{
    $sql = "";
    $sql .= " UPDATE clmn SET";
    $sql .= "   del_flg = 1";
    $sql .= " WHERE pj_id = :pj_id AND del_flg = 0";

    $params = array();
    $params[':pj_id'] = $pj_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function delSopClmn($db, $sop_id) // sop_id に関連付くレコードを全て削除
{
    $sql = "";
    $sql .= " UPDATE clmn SET";
    $sql .= "   del_flg = 1";
    $sql .= " WHERE sop_id = :sop_id AND del_flg = 0";

    $params = array();
    $params[':sop_id'] = $sop_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function delTplClmn($db, $tpl_id) // tpl_id に関連付くレコードを全て削除
{
    $sql = "";
    $sql .= " UPDATE clmn SET";
    $sql .= "   del_flg = 1";
    $sql .= " WHERE tpl_id = :tpl_id AND del_flg = 0";

    $params = array();
    $params[':tpl_id'] = $tpl_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

// ---------------------------
// TBL: row
// ---------------------------
function getSQLBaseForRowList()
{
    $sql = "";
    $sql .= " SELECT";
    $sql .= "   v_clmn.pj_id,";
    $sql .= "   v_clmn.sop_id,";
    $sql .= "   v_clmn.tpl_id,";
    $sql .= "   v_clmn.schema_id,";
    $sql .= "   v_clmn.tbl_id,";
    $sql .= "   v_clmn.tbl_title,";
    $sql .= "   v_clmn.clmn_id,";
    $sql .= "   v_clmn.clmn_name,";
    $sql .= "   v_clmn.input_type,";
    $sql .= "   v_clmn.input_required,";
    $sql .= "   row.row_id,";
    $sql .= "   row.row_text,";
    $sql .= "   row.row_order";
    $sql .= " FROM";
    $sql .= "   row";
    $sql .= " LEFT OUTER JOIN";
    $sql .= "   (";
    $sql .= "     SELECT";
    $sql .= "       v_tbl.pj_id,";
    $sql .= "       v_tbl.sop_id,";
    $sql .= "       v_tbl.tpl_id,";
    $sql .= "       v_tbl.schema_id,";
    $sql .= "       v_tbl.tbl_id,";
    $sql .= "       v_tbl.tbl_title,";
    $sql .= "       clmn.clmn_id,";
    $sql .= "       clmn.clmn_name,";
    $sql .= "       clmn.input_type,";
    $sql .= "       clmn.input_required";
    $sql .= "     FROM";
    $sql .= "       clmn";
    $sql .= "     LEFT OUTER JOIN";
    $sql .= "       (";
    $sql .= "         SELECT";
    $sql .= "           tbl_id, pj_id, sop_id, tpl_id, schema_id, tbl_title";
    $sql .= "         FROM";
    $sql .= "           tbl";
    $sql .= "         WHERE";
    $sql .= "           del_flg = 0";
    $sql .= "       ) v_tbl";
    $sql .= "     ON clmn.tbl_id = v_tbl.tbl_id";
    $sql .= "     WHERE";
    $sql .= "       clmn.del_flg = 0";
    $sql .= "   ) v_clmn";
    $sql .= " ON row.clmn_id = v_clmn.clmn_id";
    $sql .= " WHERE";
    $sql .= "   row.del_flg = 0";
    return $sql;
}

function addRow($db, $row_id, $pj_id, $sop_id, $tpl_id, $schema_id, $tbl_id, $clmn_id, $row_text, $row_order)
{
    $sql = " INSERT INTO row (pj_id, sop_id, tpl_id, schema_id, tbl_id, clmn_id, row_text, row_order, del_flg) VALUES (:pj_id, :sop_id, :tpl_id, :schema_id, :tbl_id, :clmn_id, :row_text, :row_order, 0) ";

    $params = array();
    $params[':pj_id'] = $pj_id;
    $params[':sop_id'] = $sop_id;
    $params[':tpl_id'] = $tpl_id;
    $params[':schema_id'] = $schema_id;
    $params[':tbl_id'] = $tbl_id;
    $params[':clmn_id'] = $clmn_id;
    $params[':row_text'] = $row_text;
    $params[':row_order'] = $row_order;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function delPjRow($db, $pj_id) // pj_id に関連付くレコードを全て削除
{
    $sql = "";
    $sql .= " UPDATE row SET";
    $sql .= "   del_flg = 1";
    $sql .= " WHERE pj_id = :pj_id AND del_flg = 0";

    $params = array();
    $params[':pj_id'] = $pj_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function delSopRow($db, $sop_id) // sop_id に関連付くレコードを全て削除
{
    $sql = "";
    $sql .= " UPDATE row SET";
    $sql .= "   del_flg = 1";
    $sql .= " WHERE sop_id = :sop_id AND del_flg = 0";

    $params = array();
    $params[':sop_id'] = $sop_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function delTplRow($db, $tpl_id) // tpl_id に関連付くレコードを全て削除
{
    $sql = "";
    $sql .= " UPDATE row SET";
    $sql .= "   del_flg = 1";
    $sql .= " WHERE tpl_id = :tpl_id AND del_flg = 0";

    $params = array();
    $params[':tpl_id'] = $tpl_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

// ---------------------------
// TBL: file
// ---------------------------
function getSQLBaseForFileList()
{
    $sql = "";
    $sql .= " SELECT";
    $sql .= "   v_schema.grp_id grp_id,";
    $sql .= "   v_schema.pj_id pj_id,";
    $sql .= "   v_schema.pj_name pj_name,";
    $sql .= "   v_schema.sop_id sop_id,";
    $sql .= "   v_schema.tpl_id tpl_id,";
    $sql .= "   v_schema.schema_id schema_id,";
    $sql .= "   v_schema.schema_type schema_type,";
    $sql .= "   v_schema.sop_name sop_name,";
    $sql .= "   file.file_id file_id,";
    $sql .= "   file.smpl_given_no smpl_given_no,";
    $sql .= "   file.status status,";
    $sql .= "   file.fix_date fix_date,";
    $sql .= "   file.fix_user fix_user,";
    $sql .= "   file.provisional_fix_date provisional_fix_date,";
    $sql .= "   file.upd_date upd_date,";
    $sql .= "   file.upd_user upd_user,";
    $sql .= "   file.request_time request_time,";
    $sql .= "   file.seq_no seq_no";
    $sql .= " FROM";
    $sql .= "   file";
    $sql .= " LEFT OUTER JOIN";
    $sql .= "   (";
    $sql .= "     SELECT";
    $sql .= "       v_tpl.grp_id,";
    $sql .= "       v_tpl.pj_id,";
    $sql .= "       v_tpl.pj_name,";
    $sql .= "       v_tpl.sop_id,";
    $sql .= "       v_tpl.sop_name,";
    $sql .= "       v_tpl.tpl_id,";
    $sql .= "       `schema`.schema_type,";
    $sql .= "       `schema`.schema_id,";
    $sql .= "       `schema`.file_path";
    $sql .= "     FROM";
    $sql .= "       `schema`";
    $sql .= "     LEFT OUTER JOIN";
    $sql .= "       (";
    $sql .= "         SELECT";
    $sql .= "           v_sop.grp_id,";
    $sql .= "           v_sop.pj_id,";
    $sql .= "           v_sop.pj_name,";
    $sql .= "           v_sop.sop_id,";
    $sql .= "           v_sop.sop_name,";
    $sql .= "           v_sop.sop_name_en,";
    $sql .= "           tpl.tpl_id,";
    $sql .= "           tpl.tpl_name,";
    $sql .= "           tpl.latest_flg,";
    $sql .= "           tpl.aprv_flg,";
    $sql .= "           tpl.upld_date,";
    $sql .= "           (SELECT user_name FROM user WHERE del_flg = 0 AND user_id = tpl.upld_user) upld_user,";
    $sql .= "           tpl.upld_cmnt,";
    $sql .= "           tpl.aprv_date,";
    $sql .= "           (SELECT user_name FROM user WHERE del_flg = 0 AND user_id = tpl.aprv_user) aprv_user,";
    $sql .= "           tpl.aprv_cmnt,";
    $sql .= "           tpl.rtn_date,";
    $sql .= "           (SELECT user_name FROM user WHERE del_flg = 0 AND user_id = tpl.rtn_user) rtn_user,";
    $sql .= "           tpl.rtn_cmnt,";
    $sql .= "           tpl.revision_no";
    $sql .= "         FROM tpl";
    $sql .= "         LEFT OUTER JOIN";
    $sql .= "           (";
    $sql .= "             SELECT";
    $sql .= "               v_pj.grp_id,";
    $sql .= "               v_pj.pj_id,";
    $sql .= "               v_pj.pj_name,";
    $sql .= "               sop.sop_id,";
    $sql .= "               sop.sop_name,";
    $sql .= "               sop.sop_name_en,";
    $sql .= "               sop.latest_tpl_id";
    $sql .= "             FROM sop";
    $sql .= "             LEFT OUTER JOIN";
    $sql .= "               (";
    $sql .= "                 SELECT";
    $sql .= "                   grp_pj.grp_id,";
    $sql .= "                   pj.pj_id,";
    $sql .= "                   pj.pj_name";
    $sql .= "                 FROM grp_pj";
    $sql .= "                 LEFT OUTER JOIN pj ON grp_pj.pj_id = pj.pj_id";
    $sql .= "                 WHERE pj.del_flg = 0";
    $sql .= "               ) v_pj";
    $sql .= "             ON sop.pj_id = v_pj.pj_id";
    $sql .= "             WHERE sop.del_flg = 0";
    $sql .= "           ) v_sop";
    $sql .= "         ON tpl.sop_id = v_sop.sop_id";
    $sql .= "         WHERE tpl.del_flg = 0";
    $sql .= "       ) v_tpl";
    $sql .= "     ON `schema`.tpl_id = v_tpl.tpl_id";
    $sql .= "     WHERE `schema`.del_flg = 0";
    $sql .= "   ) v_schema";
    $sql .= " ON file.schema_id = v_schema.schema_id";
    $sql .= " WHERE file.del_flg = 0";
    return $sql;
}

function addFile($db, $file_id, $pj_id, $sop_id, $tpl_id, $schema_id, $schema_type, $smpl_given_no, $status, $upd_date, $upd_user, $fix_user, $request_time, $seq_no)
{
    $sql = " INSERT INTO file (pj_id,  sop_id,  tpl_id,  schema_id,  schema_type,  smpl_given_no,  status,  upd_date,  upd_user, del_flg,  fix_user,  request_time,  seq_no) " . 
                     "VALUES (:pj_id, :sop_id, :tpl_id, :schema_id, :schema_type, :smpl_given_no, :status, :upd_date, :upd_user, 0,       :fix_user, :request_time, :seq_no) ";

    $params = array();
    $params[':pj_id'] = $pj_id;
    $params[':sop_id'] = $sop_id;
    $params[':tpl_id'] = $tpl_id;
    $params[':schema_id'] = $schema_id;
    $params[':schema_type'] = $schema_type;
    $params[':smpl_given_no'] = $smpl_given_no;
    $params[':status'] = $status;
    $params[':upd_date'] = $upd_date;
    $params[':upd_user'] = $upd_user;
    $params[':fix_user'] = $fix_user;
    $params[':request_time'] = $request_time;
    $params[':seq_no'] = $seq_no;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function updFile($db, $file_id, $upd_date, $upd_user, $fix_user, $request_time, $seq_no)
{
    $sql = "";
    $sql .= " UPDATE file SET";
    $sql .= "   upd_date = :upd_date, upd_user = :upd_user, fix_user = :fix_user, request_time = :request_time, seq_no = :seq_no";
    $sql .= " WHERE file_id = :file_id AND del_flg = 0";

    $params = array();
    $params[':file_id'] = $file_id;
    $params[':upd_date'] = $upd_date;
    $params[':upd_user'] = $upd_user;
    $params[':fix_user'] = $fix_user;
    $params[':request_time'] = $request_time;
    $params[':seq_no'] = $seq_no;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function updFileProvisionalFix($db, $file_id, $provisional_fix_date)
{
    $sql = "";
    $sql .= " UPDATE file SET";
    $sql .= "   status = :status, provisional_fix_date = :provisional_fix_date";
    $sql .= " WHERE file_id = :file_id AND del_flg = 0";

    $params = array();
    $params[':file_id'] = $file_id;
    $params[':status'] = \Sop\Constant::FILE_STATUS_PROVISIONAL_FIX;
    $params[':provisional_fix_date'] = $provisional_fix_date;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function updFileProvisionalUnfix($db, $file_id)
{
    $sql = "";
    $sql .= " UPDATE file SET";
    $sql .= "   status = :status, provisional_fix_date = :provisional_fix_date";
    $sql .= " WHERE file_id = :file_id AND del_flg = 0";

    $params = array();
    $params[':file_id'] = $file_id;
    $params[':status'] = \Sop\Constant::FILE_STATUS_INP;
    $params[':provisional_fix_date'] = NULL;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function updFileFix($db, $file_id, $fix_date, $fix_user)
{
    $sql = "";
    $sql .= " UPDATE file SET";
    $sql .= "   status = :status, fix_date = :fix_date, fix_user = :fix_user";
    $sql .= " WHERE file_id = :file_id AND del_flg = 0";

    $params = array();
    $params[':file_id'] = $file_id;
    $params[':status'] = \Sop\Constant::FILE_STATUS_FIX;
    $params[':fix_date'] = $fix_date;
    $params[':fix_user'] = $fix_user;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

/*
  function delFile($db, $sop_id, $tpl_id, $schema_id, $file_id)
  {
  $sql = "";
  $sql .= "  UPDATE file SET";
  $sql .= "    del_flg = 1";
  $sql .= "  WHERE sop_id = :sop_id AND tpl_id = :tpl_id AND schema_id = :schema_id AND file_id = :file_id AND del_flg = 0";

  $params = array();
  $params[':sop_id'] = $sop_id;
  $params[':tpl_id'] = $tpl_id;
  $params[':schema_id'] = $schema_id;
  $params[':file_id'] = $file_id;

  $stmt = $db->prepare($sql);
  if(!$stmt->execute($params)){
  if($db->inTransaction()) $db->rollBack();
  return false;
  }
  return true;
  }
*/

// ---------------------------
// TBL: val
// ---------------------------
function getSQLBaseForValList()
{
    $sql = "";
    $sql .= " SELECT";
    $sql .= "   file_id, val_id, val_name, tbl_id, clmn_id, row_id, value, del_flg";
    $sql .= " FROM";
    $sql .= "   val";
    $sql .= " WHERE";
    $sql .= "   file_id = :file_id AND del_flg = 0";
    return $sql;
}

function addVal($db, $val_id, $file_id, $val_name, $value)
{
    $sql = " INSERT INTO val (file_id, val_name, value, del_flg) VALUES (:file_id, :val_name, :value, 0) ";

    $params = array();
    $params[':file_id'] = $file_id;
    $params[':val_name'] = $val_name;
    $params[':value'] = $value;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function updVal($db, $file_id, $val_name, $value)
{
    $sql = "";
    $sql .= "  UPDATE val SET";
    $sql .= "    value = :value";
    $sql .= "  WHERE file_id = :file_id AND val_name = :val_name AND del_flg = 0";

    $params = array();
    $params[':value'] = $value;
    $params[':file_id'] = $file_id;
    $params[':val_name'] = $val_name;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function updValLastUpdateTime($db, $file_id, $val_name, $update_time)
{
    $sql = "";
    $sql .= "  UPDATE val SET";
    $sql .= "    update_time = :update_time";
    $sql .= "  WHERE file_id = :file_id AND val_name = :val_name AND del_flg = 0";

    $params = array();
    $params[':update_time'] = $update_time;
    $params[':file_id'] = $file_id;
    $params[':val_name'] = $val_name;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

/*
  function delFileVal($db, $file_id) // file_id に関連付くレコードを全て削除
  {
  $sql = "";
  $sql .= "  UPDATE val SET";
  $sql .= "    del_flg = 1";
  $sql .= "  WHERE file_id = :file_id AND del_flg = 0";

  $params = array();
  $params[':file_id'] = $file_id;

  $stmt = $db->prepare($sql);
  if(!$stmt->execute($params)){
  if($db->inTransaction()) $db->rollBack();
  return false;
  }
  return true;
  }
*/

// ---------------------------
// TBL: hwr
// ---------------------------
function getSQLBaseForFilehwrList()
{
    $sql = "";
    $sql .= "  SELECT";
    $sql .= "    file_hwr.file_id file_id,";
    $sql .= "    hwr.hwr_id hwr_id,";
    $sql .= "    hwr.hwr_val hwr_val, ";
    $sql .= "    hwr.update_time update_time, ";
    $sql .= "    hwr.mark_position_y mark_position_y";
    $sql .= "  FROM file_hwr";
    $sql .= "  LEFT OUTER JOIN hwr ON file_hwr.hwr_id = hwr.hwr_id";
    $sql .= "  WHERE hwr.del_flg = 0";
    return $sql;
}

function addHwr($db, $hwr_id, $hwr_val, $update_time, $mark_position_y)
{
    $sql = " INSERT INTO hwr (hwr_val, update_time, mark_position_y, del_flg) VALUES (:hwr_val, :update_time, :mark_position_y, 0) ";

    $params = array();
    $params[':hwr_val'] = $hwr_val;
    $params[':update_time'] = $update_time;
    $params[':mark_position_y'] = $mark_position_y;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function updHwr($db, $hwr_id, $hwr_val, $update_time)
{
    $sql = " UPDATE hwr SET hwr_val = :hwr_val, update_time = :update_time WHERE hwr_id = :hwr_id";

    $params = array();
    $params[':hwr_id'] = $hwr_id;
    $params[':hwr_val'] = $hwr_val;
    $params[':update_time'] = $update_time;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function delHwr($db, $hwr_id)
{
    $sql = " UPDATE hwr SET del_flg = 1 WHERE hwr_id = :hwr_id AND del_flg = 0";

    $params = array();
    $params[':hwr_id'] = $hwr_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

// ---------------------------
// TBL: file_hwr
// ---------------------------
function addFilehwr($db, $file_id, $hwr_id)
{
    $sql = " REPLACE INTO file_hwr (file_id, hwr_id, del_flg) VALUES (:file_id, :hwr_id, 0) ";

    $params = array();
    $params[':file_id'] = $file_id;
    $params[':hwr_id'] = $hwr_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

/*
  function delFilehwr($db, $file_id, $hwr_id)
  {
  $sql = " UPDATE file_hwr SET del_flg = 1 WHERE file_id = :file_id AND hwr_id = :hwr_id AND del_flg = 0";

  $params = array();
  $params[':file_id'] = $file_id;
  $params[':hwr_id'] = $hwr_id;

  $stmt = $db->prepare($sql);
  if(!$stmt->execute($params)){
  if($db->inTransaction()) $db->rollBack();
  return false;
  }
  return true;
  }
*/

// ---------------------------
// TBL: history
// ---------------------------
function addHistory($db, $history_id, $pj_id, $sop_id, $tpl_id, $schema_id, $file_id, $smpl_given_no, $action, $date, $user_1, $user_2, $cmnt)
{
    $sql = "";
    $sql .= " INSERT INTO history";
    $sql .= "   (pj_id, sop_id, tpl_id, schema_id, file_id, smpl_given_no, action, date, user_1, user_2, cmnt)";
    $sql .= " VALUES";
    $sql .= "   (:pj_id, :sop_id, :tpl_id, :schema_id, :file_id, :smpl_given_no, :action, :date, :user_1, :user_2, :cmnt)";

    $params = array();
    $params[':pj_id'] = $pj_id;
    $params[':sop_id'] = $sop_id;
    $params[':tpl_id'] = $tpl_id;
    $params[':schema_id'] = $schema_id;
    $params[':file_id'] = $file_id;
    $params[':smpl_given_no'] = $smpl_given_no;
    $params[':action'] = $action;
    $params[':date'] = $date;
    $params[':user_1'] = $user_1;
    $params[':user_2'] = $user_2;
    $params[':cmnt'] = $cmnt;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}


// ---------------------------
// vcfg 生成
// ---------------------------
// --- Ext用
function getSchemaVcfgForExt($db, $schema_id)
{
    $vcfg = array();
    $vcfg['items'] = array();

    // tbl (sheet)
    $tbl_sql = getSQLBaseForTblList()." AND tbl.schema_id = :schema_id ORDER BY tbl.tbl_id";
    $stmt = $db->prepare($tbl_sql);
    $stmt->execute(array(':schema_id'=>$schema_id));

    foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $tbl)
    {
        $tbl_id = $tbl['tbl_id'];
        $tbl_title = $tbl['tbl_title'];

        $tbl_vcfg = array();
        $tbl_vcfg['xtype'] = 'fieldset';
        $tbl_vcfg['title'] = $tbl_title;
        $tbl_vcfg['items'] = array();
        $tbl_vcfg['items'][0] = array();
        $tbl_vcfg['items'][0]['xtype'] = 'vtable';
        $tbl_vcfg['items'][0]['items'] = array();

        // ヘッダー行
        $clmn_sql = getSQLBaseForClmnList()." AND clmn.tbl_id = :tbl_id ORDER BY clmn.clmn_id";
        $stmt = $db->prepare($clmn_sql);
        $stmt->execute(array(':tbl_id'=>$tbl_id));

        $row_vcfg = array();
        $row_vcfg['style'] = 'background:#157fcc;color:#ffffff;';
        $row_vcfg['items'] = array();
        foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $idx=>$clmn)
        {
            $clmn_vcfg = array();
            $clmn_vcfg['html'] = $clmn['clmn_name'];

            array_push($row_vcfg['items'], $clmn_vcfg);
        }
        array_push($tbl_vcfg['items'][0]['items'], $row_vcfg);

        // データ行
        $clmn_cnt = $idx+1;
        $row_idx = 0;

        $row_sql = getSQLBaseForRowList()." AND row.tbl_id = :tbl_id ORDER BY row.row_order, row.clmn_id";
        $stmt = $db->prepare($row_sql);
        $stmt->execute(array(':tbl_id'=>$tbl_id));
        foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $idx=>$row)
        {
            if($idx % $clmn_cnt == 0)
            {
                if($idx != 0) // 2行目以降
                {
                    array_push($tbl_vcfg['items'][0]['items'], $row_vcfg); // 直前行の row_vcfg を tbl_vcfg に追加
                    $row_idx++;
                }

                // 次行の処理に移る
                $row_vcfg = array();
                if($row_idx % 2 == 1){$row_vcfg['style'] = 'background:#c1ddf1;';}
                $row_vcfg['items'] = array();
            }

            $tbl_id = $row['tbl_id'];
            $clmn_id = $row['clmn_id'];
            $row_id = $row['row_id'];
            $input_type = $row['input_type'];
            $input_required = $row['input_required'];
            $row_text = $row['row_text'];

            $clmn_vcfg = array();
            if($row_text == '') // 初期値なしの場合
            {
                $xtype = $input_type;
                if($input_type == 'datepickerfield') $xtype = 'datefield';

                $clmn_vcfg['items'][0]['xtype'] = $xtype;
                $clmn_vcfg['items'][0]['itemId'] = "input_{$tbl_id}_{$clmn_id}_{$row_id}";
                $clmn_vcfg['items'][0]['name'] = "input_{$tbl_id}_{$clmn_id}_{$row_id}";
                $clmn_vcfg['items'][0]['inputCls'] = "autosave";
            }
            else
            {
                $clmn_vcfg['html'] = $row_text;
            }
            array_push($row_vcfg['items'], $clmn_vcfg);
        }
        array_push($vcfg['items'], $tbl_vcfg);
    }

    return(json_encode($vcfg));
}

// --- Touch用
function getSchemaVcfgForTouch($db, $schema_id, $div, $file_id)
{
    $vcfg = array();
    $vcfg['items'] = array();

    // tbl (sheet)
    $tbl_sql = getSQLBaseForTblList()." AND tbl.schema_id = :schema_id ORDER BY tbl.tbl_id";
    $stmt = $db->prepare($tbl_sql);
    $stmt->execute(array(':schema_id'=>$schema_id));

    foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $tbl)
    {
        $tbl_id = $tbl['tbl_id'];
        $tbl_title = $tbl['tbl_title'];

        $tbl_vcfg = array();
        $tbl_vcfg['xtype'] = 'fieldset';
        $tbl_vcfg['title'] = $tbl_title;
        $tbl_vcfg['items'] = array();
        $tbl_vcfg['items'][0] = array();
        $tbl_vcfg['items'][0]['xtype'] = 'vtable';
        $tbl_vcfg['items'][0]['items'] = array();

        // ヘッダー行
        $clmn_sql = getSQLBaseForClmnList()." AND clmn.tbl_id = :tbl_id ORDER BY clmn.clmn_id";
        $stmt = $db->prepare($clmn_sql);
        $stmt->execute(array(':tbl_id'=>$tbl_id));

        $row_vcfg = array();
        $row_vcfg['style'] = 'background:#157fcc;color:#ffffff;';
        $row_vcfg['items'] = array();
        foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $idx=>$clmn)
        {
            $clmn_vcfg = array();
            $clmn_vcfg['items'] = array();
            $clmn_vcfg['items'][0] = array();
            $clmn_vcfg['items'][0]['html'] = $clmn['clmn_name'];

            array_push($row_vcfg['items'], $clmn_vcfg);
        }
        array_push($tbl_vcfg['items'][0]['items'], $row_vcfg);

        // データ行
        $clmn_cnt = $idx+1;
        $row_idx = 0;

        $row_sql = getSQLBaseForRowList()." AND row.tbl_id = :tbl_id ORDER BY row.row_order, row.clmn_id";
        $stmt = $db->prepare($row_sql);
        $stmt->execute(array(':tbl_id'=>$tbl_id));
        foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $idx=>$row)
        {
            if($idx % $clmn_cnt == 0)
            {
                if($idx != 0) // 2行目以降
                {
                    array_push($tbl_vcfg['items'][0]['items'], $row_vcfg); // 直前行の row_vcfg を tbl_vcfg に追加
                    $row_idx++;
                }

                // 次行の処理に移る
                $row_vcfg = array();
                if($row_idx % 2 == 1){$row_vcfg['style'] = 'background:#c1ddf1;';}
                $row_vcfg['items'] = array();
            }

            $tbl_id = $row['tbl_id'];
            $clmn_id = $row['clmn_id'];
            $row_id = $row['row_id'];
            $input_type = $row['input_type'];
            $input_required = $row['input_required'];
            $row_text = $row['row_text'];
            $item_id = "input_{$tbl_id}_{$clmn_id}_{$row_id}";

            // チェックボックスがoffのときのためのhiddenを追加
            if ($input_type == 'checkboxfield') {
                array_push($vcfg['items'], array(
                    'items' => array(
                        array(
                            'xtype' => 'hiddenfield',
                            'name'  => $item_id,
                            'value' => 'off',
                        ),
                    ),
                ));
            }

            $clmn_vcfg = array();
            $clmn_vcfg['items'] = array();
            $clmn_vcfg['items'][0] = array();
            $clmn_vcfg['items'][0]['inputCls'] = "autosave";
            if($row_text == '') // 初期値なしの場合
            {
                $xtype = $input_type;

                $clmn_vcfg['items'][0]['xtype'] = $xtype;
                $clmn_vcfg['items'][0]['itemId'] = $item_id;
                $clmn_vcfg['items'][0]['name'] = $item_id;
                $clmn_vcfg['items'][0]['style'] = "font-size:80%;border-bottom:solid 1px #cccccc;";

                if($xtype == 'datepickerfield')
                {
                    $clmn_vcfg['items'][0]['xtype'] = 'textfield';
                    $clmn_vcfg['items'][0]['component'] = array('type'=>'date');
                }
                if($xtype == 'checkboxfield')
                {
                    $clmn_vcfg['items'][0]['inputValue'] = 'on';
                    $clmn_vcfg['items'][0]['checked'] = false;
                }
            }
            else
            {
                $clmn_vcfg['items'][0]['html'] = $row_text;
            }

            // updの場合はvalueをセット
            if($div != 'add')
            {
                $xtype = $input_type;

                $val_sql = getSQLBaseForValList()." AND val.file_id = :file_id AND val.val_name = :val_name";
                $stmt = $db->prepare($val_sql);
                $stmt->execute(array(':file_id'=>$file_id, ':val_name'=>$item_id));

                foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $val)
                {
                    $clmn_vcfg['items'][0]['value'] = $val['value'];
                    if($xtype == 'checkboxfield')
                    {
                        $clmn_vcfg['items'][0]['inputValue'] = 'on';
                        $clmn_vcfg['items'][0]['checked'] = ($val['value'] == 'on');
                    }
                }
            }

            array_push($row_vcfg['items'], $clmn_vcfg);
        }
        array_push($vcfg['items'], $tbl_vcfg);
    }

    return(json_encode($vcfg));
}

// --- PDF用
function getSchemaHtmlForPdf($db, $schema_id, $div, $file_id)
{
    $html = "";
    $html .= "<html><head></head><body>";

    // tbl (sheet)
    $tbl_sql = getSQLBaseForTblList()." AND tbl.schema_id = :schema_id ORDER BY tbl.tbl_id";
    $stmt = $db->prepare($tbl_sql);
    $stmt->execute(array(':schema_id'=>$schema_id));

    foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $tbl)
    {
        $tbl_id = $tbl['tbl_id'];
        $tbl_title = $tbl['tbl_title'];

        $tbl_html = "";
        $tbl_html .= "<p>{$tbl_title}</p>";
        $tbl_html .= "<table border=\"1\" width='100%'>";

        // ヘッダー行
        $tr_html = "";
        $tr_html .= "<tr>";

        $clmn_sql = getSQLBaseForClmnList()." AND clmn.tbl_id = :tbl_id ORDER BY clmn.clmn_id";
        $stmt = $db->prepare($clmn_sql);
        $stmt->execute(array(':tbl_id'=>$tbl_id));

        foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $idx=>$clmn)
        {
            $clmn_name = $clmn['clmn_name'];

            $tr_html .= "<td bgcolor=\"#c1ddf1\">{$clmn_name}</td>";
                }
        $tr_html .= "</tr>";
        $tbl_html .= $tr_html;

        // データ行
        $clmn_cnt = $idx+1;

        $row_sql = getSQLBaseForRowList()." AND row.tbl_id = :tbl_id ORDER BY row.row_order, row.clmn_id";
        $stmt = $db->prepare($row_sql);
        $stmt->execute(array(':tbl_id'=>$tbl_id));

        foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $idx=>$row)
        {
            if($idx % $clmn_cnt == 0)
            {
                if($idx != 0){ // 2行目以降
                    $tr_html .= "</tr>";
                    $tbl_html .= $tr_html;
                }

                // 次行の処理に移る
                $tr_html = "";
                $tr_html .= "<tr>";
            }

            $tbl_id = $row['tbl_id'];
            $clmn_id = $row['clmn_id'];
            $row_id = $row['row_id'];
            $input_type = $row['input_type'];
            $input_required = $row['input_required'];
            $row_text = $row['row_text'];

            if($row_text == '') // 初期値なしの場合
            {
                $xtype = $input_type;
                $item_id = "input_{$tbl_id}_{$clmn_id}_{$row_id}";

                if($div == 'add')
                {
                    // add の場合は空欄
                    $tr_html .= "<td>&nbsp;</td>";
                }
                else
                {
                    // upd or fix の場合はvalueをセット
                    $val_sql = getSQLBaseForValList()." AND val.file_id = :file_id AND val.val_name = :val_name";
                    $stmt = $db->prepare($val_sql);
                    $stmt->execute(array(':file_id'=>$file_id, ':val_name'=>$item_id));

                    $td_html = "<td>&nbsp;</td>";
                    foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $val)
                    {
                        $value = $val['value'];
                        if($xtype == 'checkboxfield'){
                            $td_html = ($value == 'on') ? "<td>○</td>" : "<td>&nbsp;</td>";
                        }else{
                            $td_html = "<td>{$value}</td>";
                        }
                    }
                    $tr_html .= $td_html;
                }
            }
            else
            {
                $tr_html .= "<td>{$row_text}</td>";
            }
        }
        $tr_html .= "</tr>";
        $tbl_html .= $tr_html;
        $tbl_html .= "</table><br/>";
        $html .= $tbl_html;
    }

    $html .= "</body></html>";

    return $html;
}


// ---------------------------
// TBL: hwr
// ---------------------------
function getSQLBaseForFormList()
{
    $sql = "";
    $sql .= "  SELECT";
    $sql .= "    form.form_id form_id,";
    $sql .= "    form.pj_id   pj_id,";
    $sql .= "    form.sop_id  sop_id,";
    $sql .= "    form.tpl_id  tpl_id,";
    $sql .= "    form.x       x,";
    $sql .= "    form.y       y,";
    $sql .= "    form.width   width,";
    $sql .= "    form.height  height,";
    $sql .= "    form.type    type,";
    $sql .= "    form.default_value    default_value";
    $sql .= "  FROM form";
    $sql .= "  WHERE form.del_flg = 0";
    return $sql;
}

function addForm($db, $pj_id, $sop_id, $tpl_id, $x, $y, $width, $height, $type, $default_value)
{
    $sql = " INSERT INTO form (pj_id, sop_id, tpl_id, x, y, width, height, type, default_value, del_flg) VALUES (:pj_id, :sop_id, :tpl_id, :x, :y, :width, :height, :type, :default_value, 0) ";

    $params = array();
    $params[':pj_id'] = $pj_id;
    $params[':sop_id'] = $sop_id;
    $params[':tpl_id'] = $tpl_id;
    $params[':x'] = $x;
    $params[':y'] = $y;
    $params[':width'] = $width;
    $params[':height'] = $height;
    $params[':type'] = $type;
    $params[':default_value'] = $default_value;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function updForm($db, $form_id, $pj_id, $sop_id, $tpl_id, $x, $y, $width, $height, $type, $default_value)
{

    $sql  = " UPDATE form SET ";
    $sql .= "   pj_id  = :pj_id, ";
    $sql .= "   sop_id = :sop_id, ";
    $sql .= "   tpl_id = :tpl_id, ";
    $sql .= "   x      = :x, ";
    $sql .= "   y      = :y, ";
    $sql .= "   width  = :width, ";
    $sql .= "   height = :height, ";
    $sql .= "   type   = :type, ";
    $sql .= "   default_value   = :default_value ";
    $sql .= " WHERE form_id = :form_id";

    $params = array();
    $params[':pj_id'] = $pj_id;
    $params[':sop_id'] = $sop_id;
    $params[':tpl_id'] = $tpl_id;
    $params[':x'] = $x;
    $params[':y'] = $y;
    $params[':width'] = $width;
    $params[':height'] = $height;
    $params[':type'] = $type;
    $params[':form_id'] = $form_id;
    $params[':default_value'] = $default_value;

    error_log(print_r($params,true));

    $stmt = $db->prepare($sql);
    error_log($stmt->queryString);
    if(!$stmt->execute($params)){
        if($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function delForm($db, $tpl_id)
{
    $sql = "DELETE FROM form WHERE tpl_id = :tpl_id";

    $params = array();
    $params[':tpl_id'] = $tpl_id;

    $stmt = $db->prepare($sql);
    if(!$stmt->execute($params)){
        if ($db->inTransaction()) $db->rollBack();
        return false;
    }
    return true;
}

function inheritanceForm($db, $pj_id, $sop_id, $tpl_id) {
    // 同じSOPに所属するテンプレートの中で一番新しいものを取得。
    $sql = getSQLBaseForTplList() .
        " AND tpl.pj_id = :pj_id AND tpl.sop_id = :sop_id AND tpl.tpl_id < :tpl_id ORDER BY tpl.tpl_id DESC LIMIT 1";
    $row = R::getRow($sql, array(':pj_id' => $pj_id,
                                 ':sop_id' => $sop_id,
                                 ':tpl_id' => $tpl_id));
    if (! $row) {
        return;
    }
    $src_tpl_id = $row['tpl_id'];

    $sql = getSQLBaseForFormList() .
        " AND pj_id = :pj_id AND sop_id = :sop_id AND tpl_id = :tpl_id ORDER BY form_id";
    foreach (R::getAll($sql, array(':pj_id' => $pj_id,
                                   ':sop_id' => $sop_id,
                                   ':tpl_id' => $src_tpl_id)) as $form) {
        addForm($db,
                $pj_id,
                $sop_id,
                $tpl_id,
                $form['x'],
                $form['y'],
                $form['width'],
                $form['height'],
                $form['type'],
                $form['default_value']);
    }
}
