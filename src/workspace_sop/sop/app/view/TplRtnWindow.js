/**
 * テンプレート 差戻し
 */
Ext.define(
    "sop.view.TplRtnWindow", {
        extend: 'Ext.window.Window',
        xtype: 'tpl-rtn-window',

        title: 'Input Send Back Descriptions', // 差戻し内容を入力
        width: 500,
        height: 200,
        bodyPadding: 10,
        closable: false,
        modal: true,

        layout: {
            type: 'fit'
        },
        items: [{
            xtype: 'form',
            itemId: 'tpl_rtn_form',

            bodyPadding: 10,
            defaults: {
                labelWidth: 110,
                width: 450,
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
                xtype: 'textareafield',
                itemId: 'rtn_cmnt',
                name: 'rtn_cmnt',
                fieldLabel: 'Comment', // コメント
                allowBlank: false
            }]
        }],

        buttonAlign: 'center',
        buttons: [{
            itemId: 'tpl_rtn_submit_btn',
            text: 'Submit', // 送信
            formBind: true
        }, {
            itemId: 'tpl_rtn_cancel_btn',
            text: 'Cancel' // キャンセル
        }]
    }
);
