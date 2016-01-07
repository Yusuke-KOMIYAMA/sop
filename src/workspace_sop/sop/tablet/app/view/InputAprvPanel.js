/**
 * 入力開始パネル
 */
Ext.define(
    'tablet.view.InputAprvPanel', {
        extend: 'Ext.Panel',
        xtype: 'inputaprv-panel',

        config: {
            modal: true,
            centered: true,
            styleHtmlContent: true,
            width: '50%',
            height: '40%',
            hidden: true,
            layout: 'fit',
            items: [{
                xtype: 'titlebar',
                title: '<span style="font-size:80%;">Start the input</span>', // 入力を開始します
                docked: 'top'
            }, {
                xtype: 'formpanel',
                scrollable: false,
                height: '100%',
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },
                items: [{
                    xtype: 'label',
                    html: 'Input the ID by your coworker as witness', // 共同実験者（証人）のIDを入力'
                    padding: '0 0 5 0',
                    style: 'font-size:80%;'
                }, {
                    xtype: 'fieldset',
                    defaults: {
                        labelWidth: 130,
                        width: 330
                    },
                    items: [{
                        xtype: 'selectfield',
                        itemId: 'user_id_2',
                        name: 'user_id_2',
                        label: 'User ID', // ユーザーID
                        store: {
                            xtype: 'checkuser-store'
                        },
                        valueField: 'user_id',
                        displayField: 'text'
                    }]
                }]
            }, {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [{
                    xtype: 'spacer'
                }, {
                    itemId: 'aprv_btn',
                    text: '<span style="font-size:80%;">OK</span>'
                }, {
                    itemId: 'cancel_btn',
                    text: '<span style="font-size:80%;">CANCEL</span>',
                    handler: function() {
                        this.up('panel').query('formpanel')[0].reset();
                        this.up('panel').hide();
                    }
                }, {
                    xtype: 'spacer'
                }]
            }]
        }
    }
);
