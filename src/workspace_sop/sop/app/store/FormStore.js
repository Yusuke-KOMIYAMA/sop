/**
 * From Store データ一覧用
 */
Ext.define(
    'sop.store.FormStore', {
        extend: 'Ext.data.Store',
        storeId: 'FormStore',

        model: 'sop.model.Form',
        proxy: {
            type: 'ajax',
            url: './src/json_form.php',
            reader: {
                type: 'json',
                root: 'root'
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
