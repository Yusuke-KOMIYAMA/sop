CREATE TABLE IF NOT EXISTS `alters` (
    `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
    `version` INTEGER NOT NULL UNIQUE,
    `applied_date` DATETIME NOT NULL
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS `file_hwr` (
`file_id` INTEGER NOT NULL UNIQUE,
`hwr_id` INTEGER NOT NULL UNIQUE,
`del_flg` INTEGER NOT NULL DEFAULT '0',
PRIMARY KEY(file_id,hwr_id)
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS `pj` (
`pj_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
`pj_name` TEXT,
`del_flg` INTEGER NOT NULL DEFAULT '0'
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS `hwr` (
`hwr_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
`hwr_val` TEXT,
`del_flg` INTEGER NOT NULL DEFAULT '0'
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS `val` (
`val_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
`file_id` INTEGER NOT NULL,
`val_name` TEXT, -- type=src only
`tbl_id` INTEGER, -- type=tbl only
`clmn_id` INTEGER, -- type=tbl only
`row_id` INTEGER, -- type=tbl only
`value` TEXT,
`del_flg` INTEGER NOT NULL DEFAULT '0'
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS `grp_pj` (
`grp_id` INTEGER NOT NULL,
`pj_id` INTEGER NOT NULL,
`del_flg` INTEGER NOT NULL DEFAULT '0',
PRIMARY KEY(grp_id,pj_id)
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS `tbl` (
`tbl_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
`pj_id` INTEGER NOT NULL,
`sop_id` INTEGER NOT NULL,
`tpl_id` INTEGER NOT NULL,
`schema_id` INTEGER NOT NULL,
`tbl_title` TEXT,
`del_flg` INTEGER NOT NULL DEFAULT '0'
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS `clmn` (
`clmn_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
`pj_id` INTEGER NOT NULL,
`sop_id` INTEGER NOT NULL,
`tpl_id` INTEGER NOT NULL,
`schema_id` INTEGER NOT NULL,
`tbl_id` INTEGER NOT NULL,
`clmn_name` TEXT,
`input_type` TEXT NOT NULL,
`input_required` INTEGER NOT NULL DEFAULT '0',
`del_flg` INTEGER NOT NULL DEFAULT '0'
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS `row` (
`row_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
`pj_id` INTEGER NOT NULL,
`sop_id` INTEGER NOT NULL,
`tpl_id` INTEGER NOT NULL,
`schema_id` INTEGER NOT NULL,
`tbl_id` INTEGER NOT NULL,
`clmn_id` INTEGER NOT NULL,
`row_text` TEXT,
`row_order` INTEGER,
`del_flg` INTEGER NOT NULL DEFAULT '0'
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS `sop` (
`sop_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
`pj_id` INTEGER NOT NULL,
`sop_name` TEXT,
`sop_name_en` TEXT,
`latest_tpl_id` INTEGER,
`del_flg` INTEGER NOT NULL DEFAULT '0'
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS `file` (
`file_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
`pj_id` INTEGER NOT NULL,
`sop_id` INTEGER NOT NULL,
`tpl_id` INTEGER NOT NULL,
`schema_id` INTEGER NOT NULL,
`schema_type` INTEGER NOT NULL, -- 1:src,2:tbl
`smpl_given_no` TEXT NOT NULL,
`status` INTEGER NOT NULL DEFAULT '0',
`fix_date` DATETIME,
`fix_user` TEXT,
`upd_date` DATETIME,
`upd_user` TEXT,
`del_flg` INTEGER NOT NULL DEFAULT '0'
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS `pj_smpl` (
`pj_id` INTEGER NOT NULL,
`smpl_given_no` TEXT NOT NULL,
PRIMARY KEY(pj_id,smpl_given_no(128))
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS `schema` (
`schema_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
`pj_id` INTEGER NOT NULL,
`sop_id` INTEGER NOT NULL,
`tpl_id` INTEGER NOT NULL,
`schema_type` INTEGER NOT NULL, -- 1:src,2:tbl
`file_path` TEXT,
`del_flg` INTEGER NOT NULL DEFAULT '0'
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS `grp` (
`grp_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
`grp_name` TEXT,
`del_flg` INTEGER NOT NULL DEFAULT '0'
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS `user` (
-- `user_id` TEXT NOT NULL UNIQUE,
`user_id` VARCHAR(255) NOT NULL UNIQUE,
`user_name` TEXT,
`password` TEXT,
`role` TEXT,
`email` TEXT,
`note` TEXT,
`del_flg` INTEGER NOT NULL DEFAULT '0',
PRIMARY KEY(user_id)
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS `history` (
`history_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
`pj_id` INTEGER,
`sop_id` INTEGER,
`tpl_id` INTEGER,
`schema_id` INTEGER,
`file_id` INTEGER,
`smpl_given_no` TEXT,
`action` INTEGER,
`date` DATETIME,
`user_1` TEXT,
`user_2` TEXT,
`cmnt` TEXT
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS `tpl` (
`tpl_id` INTEGER PRIMARY KEY AUTO_INCREMENT,
`pj_id` INTEGER NOT NULL,
`sop_id` INTEGER NOT NULL,
`tpl_name` TEXT,
`latest_flg` INTEGER NOT NULL DEFAULT '0',
`aprv_flg` INTEGER NOT NULL DEFAULT '0',
`upld_date` DATETIME,
`upld_user` TEXT,
`upld_cmnt` TEXT,
`aprv_date` DATETIME,
`aprv_user` TEXT,
`aprv_cmnt` TEXT,
`rtn_date` DATETIME,
`rtn_user` TEXT,
`rtn_cmnt` TEXT,
`revision_no` INTEGER,
`del_flg` INTEGER NOT NULL DEFAULT '0'
) DEFAULT CHARACTER SET=utf8;

CREATE TABLE IF NOT EXISTS `user_grp` (
`user_id` VARCHAR(255) NOT NULL,
`grp_id` INTEGER NOT NULL,
PRIMARY KEY(user_id,grp_id)
) DEFAULT CHARACTER SET=utf8;

-- DELETE FROM sqlite_sequence;
-- INSERT INTO "sqlite_sequence" VALUES('pj',0);
-- INSERT INTO "sqlite_sequence" VALUES('hwr',0);
-- INSERT INTO "sqlite_sequence" VALUES('val',0);
-- INSERT INTO "sqlite_sequence" VALUES('tbl',0);
-- INSERT INTO "sqlite_sequence" VALUES('clmn',0);
-- INSERT INTO "sqlite_sequence" VALUES('row',0);
-- INSERT INTO "sqlite_sequence" VALUES('sop',0);
-- INSERT INTO "sqlite_sequence" VALUES('file',0);
-- INSERT INTO "sqlite_sequence" VALUES('schema',0);
-- INSERT INTO "sqlite_sequence" VALUES('grp',0);
-- INSERT INTO "sqlite_sequence" VALUES('history',0);
-- INSERT INTO "sqlite_sequence" VALUES('tpl',0);
CREATE INDEX `Index_hwr_0` ON `hwr`(`hwr_id`);
CREATE INDEX `Index_val_0` ON `val`(`val_id`);
CREATE INDEX `Index_tbl_0` ON `tbl`(`tbl_id`);
CREATE INDEX `Index_clmn_0` ON `clmn`(`clmn_id`);
CREATE INDEX `Index_row_0` ON `row`(`row_id`);
CREATE INDEX `Index_sop_0` ON `sop`(`sop_id`);
CREATE INDEX `Index_file_0` ON `file`(`file_id`);
CREATE INDEX `Index_schema_0` ON `schema`(`schema_id`);
CREATE INDEX `Index_grp_0` ON `grp`(`grp_id`);
CREATE INDEX `Index_user_0` ON `user`(`user_id`);
CREATE INDEX `Index_history_0` ON `history`(`history_id`);
CREATE INDEX `Index_tpl_0` ON `tpl`(`tpl_id`);
