/**
 * SOP 共同実験者
 */
Ext.define(
    'tablet.store.CheckUserStore', {
        extend: 'Ext.data.Store',
        xtype: 'checkuser-store',
        config: {
            storeId: 'CheckUserStore',

            model: 'tablet.model.CheckUser',
            proxy: {
                type: 'ajax',
                url: 'src/json_check_users.php',
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
