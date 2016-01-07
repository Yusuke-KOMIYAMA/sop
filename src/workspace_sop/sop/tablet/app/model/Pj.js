/**
 * プロジェクト
 */
Ext.define(
    'tablet.model.Pj', {
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
            }]
        }
    }
);
