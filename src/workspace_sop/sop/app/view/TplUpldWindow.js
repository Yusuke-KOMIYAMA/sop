/**
 * テンプレート アップロード
 */
Ext.define(
    "sop.view.TplUpldWindow", {
        extend: 'Ext.window.Window',
        xtype: 'tpl-upld-window',

        title: '',
        width: 480,
        height: 350,
        bodyPadding: 10,
        closable: false,
        modal: true,

        layout: {
            type: 'fit'
        },
        items: [{
            xtype: 'form',
            itemId: 'tpl_upld_form',

            bodyPadding: 10,
            defaults: {
                labelWidth: 120,
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
                xtype: 'radiogroup',
                itemId: 'schema_type_radiogroup',
                fieldLabel: 'File Type', // ファイルタイプ
                columns: 2,
                items: [{
                    name: 'schema_type',
                    inputValue: '1',
                    boxLabel: 'sopimage',
                    checked: true
                }, {
                    name: 'schema_type',
                    inputValue: '2',
                    boxLabel: 'Excel'
                }]
            }, {
                xtype: 'filefield',
                itemId: 'schema_file',
                name: 'schema_file',
                hideLabel: true,
                allowBlank: false,
                msgTarget: 'side',
                buttonText: 'Select File' // ファイルを選択
            }, {
                xtype: 'textfield',
                itemId: 'tpl_name',
                name: 'tpl_name',
                fieldLabel: 'Version' // バージョン
            }, {
                xtype: 'textareafield',
                itemId: 'upld_cmnt',
                name: 'upld_cmnt',
                fieldLabel: 'Comment' // コメント
            }, {
                xtype: 'filefield',
                itemId: 'word_file',
                name: 'word_file',
                fieldLabel: 'Original Word File', // 元のWordファイル
                allowBlank: false,
                msgTarget: 'side',
                buttonText: 'Select File' // ファイルを選択
            }]
        }],

        buttonAlign: 'center',
        buttons: [{
            itemId: 'tpl_upld_submit_btn',
            text: 'Submit', // 送信
            formBind: true
        }, {
            itemId: 'tpl_upld_cancel_btn',
            text: 'Cancel' // キャンセル
        }]
    }
);
