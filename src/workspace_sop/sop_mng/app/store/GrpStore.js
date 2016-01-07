/**
 * グループ Store
 */
Ext.define(
    'sop_mng.store.GrpStore', {
        extend: 'Ext.data.Store',
        storeId: 'GrpStore',

        model: 'sop_mng.model.Grp',
        proxy: {
            type: 'ajax',
            url: './src/json_grp.php',
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
