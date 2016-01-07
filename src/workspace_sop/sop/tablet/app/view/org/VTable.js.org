/**
 * テーブルビュー
 */
Ext.define(
    'tablet.view.VTable', {
        extend: 'Ext.table.Table',
        xtype: 'vtable',
        requires: ['tablet.view.VRow'],

        config: {
            defaultType: 'vrow',
            defaults: {
                style: 'padding:10px;'
            }
        }
    }
);
