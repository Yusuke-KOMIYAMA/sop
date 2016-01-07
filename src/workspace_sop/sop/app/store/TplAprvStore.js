/**
 * テンプレート Store 承認待ち一覧用
 */
Ext.define(
    'sop.store.TplAprvStore', {
        extend: 'Ext.data.Store',
        storeId: 'TplAprvStore',

        model: 'sop.model.Tpl',
        proxy: {
            type: 'ajax',
            url: './src/json_tpl.php',
            reader: {
                type: 'json',
                root: 'root',
                totalProperty: 'total'
            },
            extraParams: {
                aprvgrid: true
            },
            listeners: {
                exception: function(proxy, response, operation, eOpts) {
                    sop.common.Utilities.showSessionExpiredError();
                }
            }
        }
    }
);
