/**
 * オートセーブ
 */
Ext.define(
    'tablet.store.AutoSaveValStore', {
        extend: 'Ext.data.Store',
        xtype: 'autosaveval-store',
        config: {
            storeId: 'AutoSaveValStore',

            model: 'tablet.model.AutoSaveVal',

            sorters: [{
                property: 'requesttime',
                direction: 'DESC'
            }, {
                property: 'seq_no',
                direction: 'DESC'
            }],

            proxy: {
                type: 'localstorage',
                id: 'AutoSaveVal'
            }
        }
    }
);
