/**
 * テーブルビュー
 */
Ext.define(
    "sop.view.VTable", {
        extend: 'Ext.container.Container',
        xtype: 'vtable',

        requires: ['sop.view.VRow'],

        // baseCls:'x-table',
        defaultType: 'vrow',
        defaults: {
            padding: 10
        },
        style: 'display:table;width:100%;height:100%;'

        /*
         cachedConfig:
         {
         fixedLayout:false
         },

         fixedLayoutCls:'x-table-fixed',

         updateFixedLayout:function(fixedLayout)
         {
         this.innerElement[fixedLayout ? 'addCls' :'removeCls'](this.fixedLayoutCls);
         }
         */
    }
);
