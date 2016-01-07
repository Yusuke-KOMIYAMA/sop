/**
 * ユーザー Store
 */
Ext.define(
    'sop_mng.store.UserStore', {
        extend: 'Ext.data.Store',
        storeId: 'UserStore',

        model: 'sop_mng.model.User',
        proxy: {
            type: 'ajax',
            url: './src/json_user.php',
            reader: {
                type: 'json',
                root: 'root',
                totalProperty: 'total'
            },
            listeners: {
                exception: function(proxy, response, operation, eOpts) {
                    sop.common.Utilities.showSessionExpiredError();
                }
            }
        },

        autoLoad: false
    }
);
