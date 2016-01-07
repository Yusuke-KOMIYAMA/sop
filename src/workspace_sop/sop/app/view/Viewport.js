/**
 * ビューポート
 */
Ext.define(
    'sop.view.Viewport', {
        extend: 'Ext.container.Viewport',
        requires: [
            'Ext.layout.container.*',
            'Ext.data.TreeStore',
            'Ext.form.*',
            'Ext.tree.*',
            'Ext.grid.*',
            'Ext.ux.grid.*',
            'Ext.tab.Panel',
            'Ext.selection.*',
            'Ext.menu.*',
            'Ext.util.Filter',

            'sop.view.VTable',

            'sop.view.Login',

            'sop.view.Main',
            'sop.view.PjTree',
            'sop.view.TplGrid',
            'sop.view.TplAprvGrid',

            'sop.view.PjWindow',
            'sop.view.SopWindow',
            'sop.view.TplWindow',
            'sop.view.TplUpldWindow',
            'sop.view.TplAprvWindow',
            'sop.view.TplRtnWindow',
            'sop.view.TplPrevWindow',
            'sop.view.TplEditWindow',
            'sop.view.TplDetailEditWindow',
            'sop.view.TplDefaultValueWindow'
        ],

        layout: {
            type: 'fit'
        },
        items: [{
            xtype: 'app-login'
        }, {
            xtype: 'app-main'
        }, {
            xtype: 'pj-window'
        }, {
            xtype: 'sop-window'
        }, {
            xtype: 'tpl-window'
        }, {
            xtype: 'tpl-upld-window'
        }, {
            xtype: 'tpl-aprv-window'
        }, {
            xtype: 'tpl-rtn-window'
        }, {
            xtype: 'tpl-prev-window'
        }, {
            xtype: 'tpl-edit-window'
        }, {
            xtype: 'tpldetailedit-window'
        }]
    }
);
