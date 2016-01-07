/**
 * SOP 標準作業手順書
 */
Ext.define(
    'tablet.store.SopStore', {
        extend: 'Ext.data.Store',
        xtype: 'sop-store',
        config: {
            storeId: 'SopStore',

            model: 'tablet.model.Sop',
            proxy: {
                type: 'ajax',
                url: 'src/json_sop.php',
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
