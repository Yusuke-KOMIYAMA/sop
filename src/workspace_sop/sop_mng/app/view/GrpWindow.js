Ext.define(
    "sop_mng.view.GrpWindow", {
        extend: 'Ext.window.Window',
        xtype: 'grp-window',

        title: '',
        width: 500,
        height: 170,
        bodyPadding: 10,
        closable: false,
        modal: true,

        layout: {
            type: 'fit'
        },
        items: [{
            xtype: 'form',
            itemId: 'grp_form',

            autoScroll: true,
            bodyPadding: 10,
            defaults: {
                labelWidth: 110,
                width: 450,
                margin: '0 0 10 0'
            },
            items: [{
                xtype: 'hidden',
                itemId: 'grp_id',
                name: 'grp_id',
                value: ''
            }, {
                xtype: 'textfield',
                itemId: 'grp_name',
                name: 'grp_name',
                fieldLabel: 'Group Name', // グループ名
                allowBlank: false,
                msgTarget: 'side'
            }]
        }],

        buttonAlign: 'center',
        buttons: [{
            itemId: 'grp_submit_btn',
            text: 'Submit', // 送信 
            formBind: true
        }, {
            itemId: 'grp_cancel_btn',
            text: 'Cancel' // キャンセル
        }]
    }
);
