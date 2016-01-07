/**
 * グループ
 */
Ext.define(
    'sop_mng.model.Grp', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'grp_id',
            type: 'int'
        }, {
            name: 'grp_name',
            type: 'string'
        }]
    }
);
