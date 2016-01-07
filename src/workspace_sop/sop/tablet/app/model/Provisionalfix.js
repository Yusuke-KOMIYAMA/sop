/**
 * SOP 標準作業手順書
 */
Ext.define(
    'tablet.model.Provisionalfix', {
        extend: 'Ext.data.Model',
        config: {
            fields: [{
                name: 'grp_id',
                type: 'int'
            }, {
                name: 'pj_id',
                type: 'int'
            }, {
                name: 'pj_name',
                type: 'string'
            }, {
                name: 'smpl_given_no',
                type: 'string'
            }, {
                name: 'sop_id',
                type: 'int'
            }, {
                name: 'sop_name',
                type: 'string'
            }, {
                name: 'sop_name_en',
                type: 'string'
            }, {
                name: 'latest_tpl_id',
                type: 'int'
            }, {
                name: 'tpl_name',
                type: 'string'
            }, {
                name: 'revision_no',
                type: 'int'
            }, {
                name: 'latest_flg',
                type: 'int'
            }, {
                name: 'file_status',
                type: 'int'
            }, {
                name: 'file_id',
                type: 'int'
            }, {
                name: 'tpl_id',
                type: 'int'
            }, {
                name: 'schema_id',
                type: 'int'
            }, {
                name: 'schema_type',
                type: 'int'
            }, {
                name: 'upd_date',
                type: 'date'
            }]
        }
    }
);
