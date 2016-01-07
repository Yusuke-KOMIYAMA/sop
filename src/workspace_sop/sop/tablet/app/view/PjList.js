/**
 * プロジェクト一覧
 */
Ext.define(
    'tablet.view.PjList', {
        extend: 'Ext.dataview.List',
        xtype: 'pj-list',

        config: {
            scrollable: true,
            itemTpl: [
                '<div style="color:#333333;font-size:80%;padding-bottom:2px"><p>{pj_name}</p></div>'
            ],
            store: {
                xtype: 'pj-store'
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
                    itemId: 'home_btn',
                    xtype: 'button',
                    text: '<span style="font-size:80%;">Logout</span>', // ログアウト
                    align: 'right'
                }]
            }, {
                xtype: 'titlebar',
                title: 'Project List', // プロジェクト一覧
                docked: 'top'
            }, {
                xtype: 'toolbar',
                title: '',
                docked: 'bottom',
                items: [{
                    xtype: 'spacer'
                }, {
                    itemId: 'provisional_fix_btn',
                    xtype: 'button',
                    text: 'Operation complete list that wait for confirmation', // 作業完了（チェック待ち）一覧
                    align: 'right'
                }]
            }]
        }
    }
);
