/**
 * テンプレート Store データ一覧用
 */
Ext.define(
    'sop.store.TplStore', {
        extend: 'Ext.data.Store',
        storeId: 'TplStore',

        model: 'sop.model.Tpl',
        proxy: {
            type: 'ajax',
            url: './src/json_tpl.php',
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
        }
    }
);
