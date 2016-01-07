/**
 * プロジェクト 検体サンプル
 */
Ext.define(
    'tablet.store.PjSmplStore', {
        extend: 'Ext.data.Store',
        xtype: 'pjsmpl-store',
        config: {
            storeId: 'PjSmplStore',

            model: 'tablet.model.PjSmpl',
            proxy: {
                type: 'ajax',
                url: 'src/json_pjsmpl.php',
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
