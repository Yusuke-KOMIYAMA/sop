/**
 * テンプレート プレビュー
 */
Ext.define(
    "sop.view.TplDefaultValueWindow", {
        extend: 'Ext.window.Window',
        xtype: 'tpl-default-value-window',

        requires: [
            'sop.helper.TplForm'
        ],

        title: 'Change the default parameters.', // 初期値変更
        width: 300,
        height: 250,
        bodyPadding: 10,
        closable: true,
        modal: true,

        layout: {
            type: 'vbox'
        },

        tbar: [{
            xtype: 'label',
            text: 'Variable' // 変数
        }, {
            itemId: 'tpl_default_value_name_btn',
            text: 'Name' // 名前
        }, {
            itemId: 'tpl_default_value_group_btn',
            text: 'Affiliation' // 所属
        }, {
            itemId: 'tpl_default_value_mail_btn',
            text: 'e-mail' // メールアドレス
        }],

        items: [{
            xtype: 'textarea',
            itemId: 'tpl_default_value_textarea',
            width: 270,
            height: 110
        }],

        buttonAlign: 'center',
        buttons: [{
            itemId: 'tpl_default_value_ok_btn',
            text: 'OK'
        }, {
            itemId: 'tpl_default_value_cancel_btn',
            text: 'Cancel' // キャンセル
        }]
    }
);
