/**
 * ビューポート
 */
Ext.define(
    'sop_mng.view.Viewport', {
        extend: 'Ext.container.Viewport',

        requires: [
            'Ext.layout.container.*',
            'Ext.data.TreeStore',
            'Ext.form.*',
            'Ext.tree.*',
            'Ext.grid.*',
            'Ext.ux.grid.*',
            'Ext.ux.form.MultiSelect',
            'Ext.tab.Panel',
            'Ext.selection.*',
            'Ext.menu.*',
            'Ext.util.Filter',

            'sop_mng.view.Main',
            'sop_mng.view.Login',
            'sop_mng.view.GrpGrid',
            'sop_mng.view.GrpWindow',
            'sop_mng.view.UserGrid',
            'sop_mng.view.UserWindow',
            'sop_mng.view.PasswordWindow'
        ],

        layout: {
            type: 'fit'
        },
        items: [{
            xtype: 'app-login'
        }, {
            xtype: 'app-main'
        }, {
            xtype: 'grp-window'
        }, {
            xtype: 'user-window'
        }, {
            xtype: 'pwd-window'
        }]
    }
);
