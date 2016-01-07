/**
 * SOP 標準作業手順書
 */
Ext.define(
    'tablet.store.ProvisionalfixStore', {
        extend: 'Ext.data.Store',
        xtype: 'provisionalfix-store',
        config: {
            storeId: 'ProvisionalfixStore',

            model: 'tablet.model.Provisionalfix',
            proxy: {
                type: 'ajax',
                url: 'src/json_provisional_fixes.php',
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
