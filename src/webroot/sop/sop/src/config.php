<?php

require_once __DIR__ . '/../../../../backend/src/bootstrap.php';

/**
 * 共通定義ファイル
 * 
 * 一部、mobileでも使用
 */
set_time_limit(0);
date_default_timezone_set('Asia/Tokyo');
ini_set('memory_limit', -1)."\n";

// --- ディレクトリ
$DATA_DIR_PATH_FILE = __DIR__."/../../../../uploaded_files/file";
$DATA_DIR_PATH_HWR = __DIR__."/../../../../uploaded_files/hwr";
$DATA_DIR_PATH_TMP = __DIR__."/../../../../uploaded_files/tmp";

// --- スキーマ編集用
$INPUT_TYPE_LIST_SRC = array('text', 'textarea', 'checkbox', 'date', 'time');
$INPUT_TYPE_LIST_TBL = array('textfield', 'textareafield', 'checkboxfield', 'datepickerfield');

$PAGE_BREAK_TAG = '<!-- PAGE_BREAK_SOP_SYSTEM_TAG -->';

// --- 定数
$ROLE_ID_APPROVERS = 1; // 承認者
$ROLE_ID_UPLOADERS = 2; // 登録者
$ROLE_ID_USERS = 3; // 一般ユーザー

$APRV_FLG_NG  = \Sop\Constant::APRV_FLG_NG;
$APRV_FLG_OK  = \Sop\Constant::APRV_FLG_OK;
$APRV_FLG_RTN = \Sop\Constant::APRV_FLG_RTN;
$APRV_FLG_RE  = \Sop\Constant::APRV_FLG_RE;
$APRV_FLG_PRE = \Sop\Constant::APRV_FLG_PRE;

$LATEST_FLG = 1;     // 最新バージョン
$LATEST_FLG_NOT = 0; // 最新バージョンではない

$SCHEMA_TYPE_SRC = 1; // SOP Imageソース
$SCHEMA_TYPE_TBL = 2; // TBL構造（Excel以外もOK）

$INPUT_REQUIRED = 1;     // 必須
$INPUT_REQUIRED_NOT = 0; // 必須でない

$FILE_STATUS_NOT             = \Sop\Constant::FILE_STATUS_NOT;
$FILE_STATUS_INP             = \Sop\Constant::FILE_STATUS_INP;
$FILE_STATUS_PROVISIONAL_FIX = \Sop\Constant::FILE_STATUS_PROVISIONAL_FIX;
$FILE_STATUS_RE              = \Sop\Constant::FILE_STATUS_RE;
$FILE_STATUS_FIX             = \Sop\Constant::FILE_STATUS_FIX;

// --- history action div
$HISTORY_ACTION_PJ_ADD = 11;
$HISTORY_ACTION_PJ_UPD = 12;
$HISTORY_ACTION_PJ_DEL = 13;

$HISTORY_ACTION_SOP_ADD = 21;
$HISTORY_ACTION_SOP_UPD = 22;
$HISTORY_ACTION_SOP_DEL = 23;

$HISTORY_ACTION_TPL_UPLD = 31;
$HISTORY_ACTION_TPL_DEL = 32;
$HISTORY_ACTION_TPL_APRV = 33;
$HISTORY_ACTION_TPL_RTN = 34;
$HISTORY_ACTION_TPL_TRANSIT = 35;
$HISTORY_ACTION_TPL_FORM_UPSERT = 36;
$HISTORY_ACTION_TPL_DETAIL_EDIT = 37;

$HISTORY_ACTION_FILE_ADD = 41;
$HISTORY_ACTION_FILE_ADD_APRV = 42;
$HISTORY_ACTION_FILE_UPD = 43;
$HISTORY_ACTION_FILE_PROVISIONAL_FIX = 44;
$HISTORY_ACTION_FILE_PROVISIONAL_FIX_APRV = 44;
$HISTORY_ACTION_FILE_FIX = 45;
$HISTORY_ACTION_FILE_FIX_APRV = 45;
$HISTORY_ACTION_FILE_UNFIX = 47;
