/**
 * テンプレート プレビュー
 */
Ext.define(
    "sop.view.TplEditWindow", {
        extend: 'Ext.window.Window',
        xtype: 'tpl-edit-window',

        title: 'Add Input Form', // 入力フォーム追加
        width: '90%',
        height: '85%',
        bodyPadding: 10,
        closable: false,
        modal: true,

        layout: {
            type: 'border'
        },

        items: [{
            region: 'north',
            layout: {
                type: 'hbox'
            },
            xtype: 'container',
            padding: 5,
            border: 1,
            margin: '0 0 5 0',
            style: {
                borderStyle: 'solid',
                borderColor: 'white'
            },

            items: [{
                xtype: 'label',
                text: 'Tool Box', // ツールボックス
                margin: '2 0 0 0',
                style: {
                    color: 'white'
                }
            }, {
                xtype: 'tbspacer',
                width: 10
            }, {
                xtype: 'button',
                text: 'Text Area', // テキストエリア
                itemId: 'tpl_add_textarea_btn',
                style: {
                    background: 'MediumBlue'
                }
            }, {
                xtype: 'tbspacer',
                width: 10
            }, {
                xtype: 'button',
                text: 'Check Box', // チェックボックス
                itemId: 'tpl_add_checkbox_btn',
                style: {
                    background: 'DeepPink'
                }
            }, {
                xtype: 'tbspacer',
                width: 30
            }, {
                xtype: 'label',
                text: '*※ Additional items can change and delete the defalut parameters', // ※追加した項目は右クリックで初期値の変更や削除ができます。
                style: {
                    color: 'white'
                }
            }]
        }, {
            region: 'center',
            xtype: 'tabpanel',
            itemId: 'tpl_edit_prev_panel'
        }],

        buttonAlign: 'center',
        buttons: [{
            itemId: 'tpl_send_btn',
            text: 'Save' // 保存
        }, {
            itemId: 'tpl_edit_cancel_btn',
            text: 'Cancel' // キャンセル
        }]
    }
);