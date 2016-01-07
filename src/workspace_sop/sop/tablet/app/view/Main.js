/**
 * メインビュー
 */
Ext.define(
    'tablet.view.Main', {
        extend: 'Ext.Container',
        xtype: 'main',

        requires: [
            'Ext.form.*',
            'Ext.field.*',
            'Ext.plugin.*',
            'Ext.TitleBar',
            'Ext.Toolbar',
            'Ext.Button',
            'Ext.Spacer',
            'Ext.Label',
            'Ext.LoadMask',
            'Ext.ActionSheet',
            'Ext.data.Store',
            'Ext.data.proxy.LocalStorage',

            'tablet.view.VTable',

            // --- LoginPanel
            'tablet.view.LoginPanel',

            // --- PjList
            'tablet.view.PjList',
            'tablet.store.PjStore',
            'tablet.model.Pj',

            // --- Provisionalfix
            'tablet.view.ProvisionalFixList',
            'tablet.store.ProvisionalfixStore',
            'tablet.model.Provisionalfix',

            // --- PjSmplList
            'tablet.view.PjSmplList',
            'tablet.store.PjSmplStore',
            'tablet.model.PjSmpl',

            // --- SopList
            'tablet.view.SopList',
            'tablet.store.SopStore',
            'tablet.model.Sop',

            // --- CheckUser
            'tablet.store.CheckUserStore',
            'tablet.model.CheckUser',

            // --- FilePanel
            'tablet.view.FilePanel',
            'tablet.view.FileForm',

            // --- FixedFilePanel
            'tablet.view.FixedFilePanel',
            'tablet.view.FixedFileForm',

            // --- InputAprvPanel
            'tablet.view.InputAprvPanel',

            // --- InktoolPanel
            'tablet.view.InktoolPanel',
            'tablet.view.InkfepPanel',

            // --- AutoSave
            'tablet.store.AutoSaveValStore',
            'tablet.model.AutoSaveVal',

            // --- System Config
            'tablet.store.SystemConfigStore',
            'tablet.model.SystemConfig'

        ],

        config: {
            fullscreen: true,
            layout: 'card',
            items: [{
                xtype: 'login-panel'
            }, {
                xtype: 'pj-list'
            }, {
                xtype: 'pjsmpl-list'
            }, {
                xtype: 'sop-list'
            }, {
                xtype: 'file-panel'
            }, {
                xtype: 'inputaprv-panel'
            }, {
                xtype: 'inktool-panel'
            }, {
                xtype: 'inkfep-panel'
            }, {
                xtype: 'provisionalfix-list'
            }, {
                xtype: 'fixed-file-panel'
            }]
        }
    }
);
