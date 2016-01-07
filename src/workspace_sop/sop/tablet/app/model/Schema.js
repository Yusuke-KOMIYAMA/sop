/**
 * スキーマ
 */
Ext.define(
    'tablet.model.Schema', {
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
                name: 'tpl_id',
                type: 'int'
            }, {
                name: 'schema_type',
                type: 'int'
            }, {
                name: 'schema_id',
                type: 'int'
            }, {
                name: 'file_path',
                type: 'string'
            }, {
                name: 'checker_required_flag',
                type: 'boolean'
            }]
        }
    }
);
