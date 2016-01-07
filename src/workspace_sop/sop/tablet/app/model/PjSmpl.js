/**
 * プロジェクト 検体サンプル
 */
Ext.define(
    'tablet.model.PjSmpl', {
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
            }]
        }
    }
);
