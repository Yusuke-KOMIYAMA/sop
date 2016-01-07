/**
 * ログインパネル
 */
Ext.define(
    'tablet.view.LoginPanel', {
        extend: 'Ext.Panel',
        xtype: 'login-panel',

        config: {
            fullscreen: true,
            layout: 'fit',
            items: [{
                xtype: 'formpanel',
                scrollable: false,
                height: '100%',
                submitOnAction: true,
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },
                items: [{
                    xtype: 'fieldset',
                    title: 'Welcome', // ようこそ
                    defaults: {
                        labelWidth: 130,
                        width: 330
                    },
                    items: [{
                        xtype: 'textfield',
                        itemId: 'user_id',
                        name: 'user_id',
                        label: '<span style="font-size:80%;">User ID</span>' // ユーザーID
                    }, {
                        xtype: 'passwordfield',
                        itemId: 'password',
                        name: 'password',
                        label: '<span style="font-size:80%;">Password</span>' // パスワード
                    }, {
                        itemId: 'sso_field',
                        xtype: 'panel',
                        html: '<div style="text-align:center">Login to the Single Sign-On</div>', // シングル・サインオンでログインします
                        hidden: true
                    }]
                }, {
                    xtype: 'button',
                    itemId: 'login_btn',
                    text: 'Log In',
                    ui: 'round',
                    margin: 5
                }]
            }]
        }
    }
);
