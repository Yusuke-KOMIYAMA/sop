/**
 * テンプレート 詳細
 */
Ext.define(
    "sop.view.TplWindow", {
        extend: 'Ext.window.Window',
        xtype: 'tpl-window',

        title: 'Show Template Details', // テンプレート 詳細閲覧
        width: 500,
        height: '70%',
        bodyPadding: 10,
        closable: false,
        modal: true,

        layout: {
            type: 'fit'
        },
        items: [{
            xtype: 'form',
            itemId: 'tpl_form',

            autoScroll: true,
            bodyPadding: 10,
            defaults: {
                labelWidth: 150,
                width: 430,
                margin: '0 0 10 0'
            },
            items: [{
                xtype: 'hiddenfield',
                itemId: 'pj_id',
                name: 'pj_id',
                value: ''
            }, {
                xtype: 'hiddenfield',
                itemId: 'sop_id',
                name: 'sop_id',
                value: ''
            }, {
                xtype: 'hiddenfield',
                itemId: 'tpl_id',
                name: 'tpl_id',
                value: ''
            }, {
                xtype: 'displayfield',
                itemId: 'pj_name',
                name: 'pj_name',
                fieldLabel: 'Project Name' // プロジェクト名 
            }, {
                xtype: 'displayfield',
                itemId: 'sop_name',
                name: 'sop_name',
                fieldLabel: 'SOP Name' // 手順書名
            }, {
                xtype: 'displayfield',
                itemId: 'tpl_name',
                name: 'tpl_name',
                fieldLabel: 'Version' // バージョン
            }, {
                xtype: 'displayfield',
                itemId: 'latest_flg',
                name: 'latest_flg',
                fieldLabel: 'Latest' // 最新
            }, {
                xtype: 'displayfield',
                itemId: 'aprv_flg',
                name: 'aprv_flg',
                fieldLabel: 'Status' // ステータス
            }, {
                xtype: 'displayfield',
                itemId: 'upld_user',
                name: 'upld_user',
                fieldLabel: 'Registrar' // 登録者
            }, {
                xtype: 'displayfield',
                itemId: 'upld_date',
                name: 'upld_date',
                fieldLabel: 'Registration Date' // 登録日時
            }, {
                xtype: 'displayfield',
                itemId: 'upld_cmnt',
                name: 'upld_cmnt',
                fieldLabel: 'Registration Comment' // 登録コメント
            }, {
                xtype: 'displayfield',
                itemId: 'rtn_user',
                name: 'rtn_user',
                fieldLabel: 'Send Back Director' // 差戻し者
            }, {
                xtype: 'displayfield',
                itemId: 'rtn_date',
                name: 'rtn_date',
                fieldLabel: 'Send Back Date' // 差戻し日時
            }, {
                xtype: 'displayfield',
                itemId: 'rtn_cmnt',
                name: 'rtn_cmnt',
                fieldLabel: 'Send Back Comment' // 差戻しコメント
            }, {
                xtype: 'displayfield',
                itemId: 'aprv_user',
                name: 'aprv_user',
                fieldLabel: 'Approval Supervisor' // 承認者
            }, {
                xtype: 'displayfield',
                itemId: 'aprv_date',
                name: 'aprv_date',
                fieldLabel: 'Acceptable Date' // 承認日時
            }, {
                xtype: 'displayfield',
                itemId: 'aprv_cmnt',
                name: 'aprv_cmnt',
                fieldLabel: 'Acceptable Comment' // 承認コメント
            }]
        }],

        buttonAlign: 'center',
        buttons: [{
            itemId: 'tpl_cancel_btn',
            text: 'Close' // 閉じる
        }]
    }
);
