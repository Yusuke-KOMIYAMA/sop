/**
 * SOP 標準作業手順書 一覧
 */
Ext.define(
    'tablet.view.SopList', {
        extend: 'Ext.dataview.List',
        xtype: 'sop-list',

        config: {
            scrollable: true,
            itemTpl: [
                '<div style="color:#333333;font-size:80%;padding-bottom:2px"><p style="">',
                '{sop_name}&nbsp;&nbsp;',
                '<tpl if="revision_no &gt; 0">version&nbsp;{tpl_name}</tpl>&nbsp;<tpl if="latest_flg==1">[NEW]</tpl>',
                '<span style="float:right">{upd_date:date("Y-m-d H:i:s")}&nbsp;&nbsp;&nbsp;<tpl if="latest_tpl_id!=null"><tpl if="file_status==0">To be marked<tpl elseif="file_status==1">Now inputting<tpl elseif="file_status==2">Wait for the check by {fix_user}&nbsp;&nbsp;&nbsp;Operation Complete<tpl elseif="file_status==4">Operation Complete</tpl><tpl else>Now preparing</tpl></span>', 
                '</p></div>' // '<span style="float:right">{upd_date:date("Y-m-d H:i:s")}&nbsp;&nbsp;&nbsp;<tpl if="latest_tpl_id!=null"><tpl if="file_status==0">未入力<tpl elseif="file_status==1">入力中<tpl elseif="file_status==2">{fix_user}によるチェック待ち&nbsp;&nbsp;&nbsp;作業完了<tpl elseif="file_status==4">作業完了</tpl><tpl else>準備中</tpl></span>'
            ],
            store: {
                xtype: 'sop-store'
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
                    text: ''
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
