/**
 * プロジェクト
 */
Ext.define(
    'tablet.store.PjStore', {
        extend: 'Ext.data.Store',
        xtype: 'pj-store',
        config: {
            storeId: 'PjStore',

            model: 'tablet.model.Pj',
            proxy: {
                type: 'ajax',
                url: 'src/json_pj.php',
                reader: {
                    type: 'json',
                    rootProperty: 'root'
                },
                listeners: {
                    exception: function(proxy, response, operation, eOpts) {
                        sop.common.Utilities.showSessionExpiredError();
                    }
                }
            }
        }
    }
);
