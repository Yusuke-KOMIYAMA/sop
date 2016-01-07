/**
 * テーブルビュー セル
 */
Ext.define(
    "sop.view.VCell", {
        extend: 'Ext.container.Container',
        xtype: 'vcell',

        // baseCls:'x-table-cell',
        style: 'display:table-cell;vertical-align:middle;',
        defaults: {
            style: 'font-size:80%;',
            labelWidth: 130
        },

        getElementConfig: function() {
            var config = this.callParent();
            config.children.length = 0;
            return config;
        }
    }
);
