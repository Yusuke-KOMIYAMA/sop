/**
 * テーブルビュー セル
 */
Ext.define(
    'tablet.view.VCell', {
        extend: 'Ext.table.Cell',
        xtype: 'vcell',

        config: {
            defaults: {
                style: 'font-size:80%;',
                labelWidth: 130
            }
        }
    }
);
