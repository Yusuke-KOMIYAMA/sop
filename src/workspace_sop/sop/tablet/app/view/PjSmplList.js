/**
 * プロジェクト 対象サンプル一覧
 */
Ext.define(
    'tablet.view.PjSmplList', {
        extend: 'Ext.dataview.List',
        xtype: 'pjsmpl-list',

        config: {
            scrollable: true,
            itemTpl: [
                '<div style="color:#333333;font-size:80%;padding-bottom:2px"><p>{smpl_given_no}</p></div>'
            ],
            store: {
                xtype: 'pjsmpl-store'
            },

            plugins: [{
                xclass: 'Ext.plugin.ListPaging',
                autoPaging: true
            }],

            items: [{
                xtype: 'titlebar',
                title: '',
                docked: 'top',
                items: [{
                    itemId: 'back_btn',
                    align: 'left',
                    ui: 'back',
                    text: '<span style="font-size:80%;">Project List</span>' // プロジェクト一覧
                }, {
                    itemId: 'home_btn',
                    xtype: 'button',
                    text: '<span style="font-size:80%;">Logout</span>', // ログアウト
                    align: 'right'
                }]
            }, {
                xtype: 'toolbar',
                title: '',
                docked: 'bottom',
                items: [{
                    itemId: 'main_btn',
                    iconCls: 'home',
                    text: 'Home',
                    align: 'left'
                }]
            }]
        }
    }
);
