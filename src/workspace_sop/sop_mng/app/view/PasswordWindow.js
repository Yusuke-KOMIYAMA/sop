/**
 * パスワード変更 Window
 */
Ext.define(
    "sop_mng.view.PasswordWindow", {
        extend: 'Ext.window.Window',
        xtype: 'pwd-window',

        title: '',
        width: 500,
        height: 300,
        bodyPadding: 10,
        closable: false,
        modal: true,

        layout: {
            type: 'fit'
        },
        items: [{
            xtype: 'form',
            itemId: 'password_form',

            autoScroll: true,
            bodyPadding: 10,
            defaults: {
                labelWidth: 110,
                width: 450,
                margin: '0 0 10 0'
            },
            items: [{
                xtype: 'hidden',
                itemId: 'div',
                name: 'div',
                value: ''
            }, {
                xtype: 'textfield',
                itemId: 'user_id',
                name: 'user_id',
                fieldLabel: 'User ID', // ユーザーID
                allowBlank: false,
                msgTarget: 'side'
            }, {
                xtype: 'textfield',
                itemId: 'password',
                name: 'password',
                fieldLabel: 'Password', // パスワード
                allowBlank: false,
                msgTarget: 'side',
                inputType: 'password'
            }, {
                xtype: 'textfield',
                itemId: 'password_confirm',
                name: 'password_confirm',
                fieldLabel: 'Password (Verification)', // パスワード(確認)
                allowBlank: false,
                msgTarget: 'side',
                inputType: 'password'
            }]
        }],

        buttonAlign: 'center',
        buttons: [{
            itemId: 'pwd_submit_btn',
            text: 'Submit', // 送信
            formBind: true
        }, {
            itemId: 'pwd_cancel_btn',
            text: 'Cancel' // キャンセル
        }]
    }
);
