/**
 * テーブルビュー 行
 */
Ext.define(
    'tablet.view.VRow', {
        extend: 'Ext.table.Row',
        xtype: 'vrow',
        requires: ['tablet.view.VCell'],

        config: {
            defaults: {
                style: 'padding:10px;'
            },
            defaultType: 'vcell'
        }
    }
);
