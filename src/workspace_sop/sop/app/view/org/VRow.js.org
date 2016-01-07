/**
 * テーブルビュー 行
 */
Ext.define(
    "sop.view.VRow", {
        extend: 'sop.view.VCell',
        xtype: 'vrow',

        requires: ['sop.view.VCell'],

        // baseCls:'x-table-row',
        defaultType: 'vcell',
        defaults: {
            padding: 10
        },
        style: 'display:table-row;'
    }
);
