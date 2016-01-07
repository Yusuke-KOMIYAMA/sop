/**
 * System config
 */
Ext.define(
    'tablet.store.SystemConfigStore', {
        extend: 'Ext.data.Store',
        xtype: 'systemconfig-store',
        config: {
            storeId: 'SystemConfigStore',

            model: 'tablet.model.SystemConfig',
            proxy: {
                type: 'ajax',
                url: './src/json_system_config.php',
                reader: {
                    type: 'json',
                    rootProperty: 'root'
                },
                listeners: {
                    exception: function(proxy, response, operation, eOpts) {
                        sop.common.Utilities.showSessionExpiredError();
                    }
                }
            },

            autoLoad: false
        }
    }
);
