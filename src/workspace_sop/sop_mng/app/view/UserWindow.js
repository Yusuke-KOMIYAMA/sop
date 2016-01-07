/**
 * ユーザー 登録編集 Window
 */
Ext.define(
    "sop_mng.view.UserWindow", {
        extend: 'Ext.window.Window',
        xtype: 'user-window',

        title: '',
        width: 500,
        height: 520,
        bodyPadding: 10,
        closable: false,
        modal: true,

        layout: {
            type: 'fit'
        },
        items: [{
            xtype: 'form',
            itemId: 'user_form',

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
                itemId: 'user_name',
                name: 'user_name',
                fieldLabel: 'User Name', // ユーザー名
                msgTarget: 'side'
            }, {
                xtype: 'checkboxgroup',
                fieldLabel: 'Permission', // 権限
                columns: 4,
                vertical: true,
                allowBlank: false,
                msgTarget: 'side',
                items: [{
                    itemId: 'role_aprv',
                    name: 'role_aprv',
                    boxLabel: 'Approval' // 承認
                }, {
                    itemId: 'role_upld',
                    name: 'role_upld',
                    boxLabel: 'Registration' // 登録
                }, {
                    itemId: 'role_user',
                    name: 'role_user',
                    boxLabel: 'Ordinary' // 一般
                }, {
                    itemId: 'admin_flag',
                    name: 'admin_flag',
                    boxLabel: 'Administration' // 管理
                }]
            }, {
                xtype: 'combobox',
                itemId: 'grp_name',
                name: 'grp_name',
                fieldLabel: 'Affiliation Group', // 所属グループ
                store: 'GrpStore',
                displayField: 'grp_name',
                valueField: 'grp_name',
                allowBlank: false,
                msgTarget: 'side',

                displayTpl: Ext.create('Ext.XTemplate',
                    '<tpl for=".">',
                    '{grp_name:htmlDecode}',
                    '</tpl>'
                )
            }, {
                xtype: 'textfield',
                itemId: 'email',
                name: 'email',
                fieldLabel: 'e-mail', // メールアドレス
                msgTarget: 'side',
                vtype: 'email'
            }, {
                xtype: 'textarea',
                itemId: 'note',
                name: 'note',
                fieldLabel: 'Remarks' // 備考
            }]
        }],

        buttonAlign: 'center',
        buttons: [{
            itemId: 'user_submit_btn',
            text: 'Submit', // 送信
            formBind: true
        }, {
            itemId: 'user_cancel_btn',
            text: 'Cancel' // キャンセル
        }]
    }
);
