/**
 * ログインパネル
 */
Ext.define(
    "sop.view.Login", {
        extend: 'Ext.panel.Panel',
        xtype: 'app-login',
        itemId: 'app-login-panel',

        layout: {
            type: 'border'
        },
        items: [{
                region: 'north',
                xtype: 'container',
                cls: 'main-view-header',

                layout: {
                    type: 'hbox',
                    align: 'middle'
                },
                height: 45,
                padding: 10,
                items: [{
                    xtype: 'button',
                    itemId: 'header-home-button',
                    glyph: 0xf015,
                    text: 'SOP Home', // 統合システムホーム
                    href: '/',
                    hrefTarget: '_self'
                }, {
                    xtype: 'label',
                    cls: 'header-main',
                    html: 'Open Source SOP Platform', // 準作業手順書 管理システム'
                    flex: 1
                }]
            },

            {
                region: 'center',
                xtype: 'panel',
                items: [{
                    xtype: 'form',
                    itemId: 'login_form',
                    name: 'submit_form',

                    title: 'Welcome',
                    titleAlign: 'center',
                    frame: true,
                    width: 320,
                    bodyPadding: 10,

                    items: [{
                        itemId: 'system_version_field',
                        xtype: 'panel',
                        html: ''
                    }, {
                        itemId: 'user_id_field',
                        xtype: 'textfield',
                        name: 'user_id',
                        fieldLabel: 'User ID', // ユーザーID
                        allowBlank: false,
                        msgTarget: 'side'
                    }, {
                        itemId: 'password_field',
                        xtype: 'textfield',
                        name: 'password',
                        fieldLabel: 'Password', // パスワード
                        allowBlank: false,
                        msgTarget: 'side',
                        inputType: 'password'
                    }, {
                        itemId: 'sso_field',
                        xtype: 'panel',
                        html: '<div style="text-align:center">Use Single Sign-On</div>', // シングル・サインオンでログインします
                        hidden: true
                    }],

                    buttonAlign: 'center',
                    buttons: [{
                        name: 'submit_btn',
                        itemId: 'login_btn',
                        text: 'Login', // ログイン
                        formBind: true
                    }]
                }]
            }
        ]
    }
);
