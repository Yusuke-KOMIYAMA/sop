/**
 * ユーザー
 */
Ext.define(
    'sop_mng.model.User', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'user_id',
            type: 'string'
        }, {
            name: 'user_name',
            type: 'string'
        }, {
            name: 'role_aprv',
            type: 'string'
        }, {
            name: 'role_upld',
            type: 'string'
        }, {
            name: 'role_user',
            type: 'string'
        }, {
            name: 'admin_flag',
            type: 'bool'
        }, {
            name: 'email',
            type: 'string'
        }, {
            name: 'note',
            type: 'string'
        }, {
            name: 'grp_name',
            type: 'string'
        }, {
            name: 'grp_id',
            type: 'int'
        }]
    }
);
