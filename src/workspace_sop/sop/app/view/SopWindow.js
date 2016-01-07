/**
 * SOP 登録・編集
 */
Ext.define(
    "sop.view.SopWindow", {
        extend: 'Ext.window.Window',
        xtype: 'sop-window',

        title: '',
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
            itemId: 'sop_form',

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
                xtype: 'textfield',
                itemId: 'sop_name',
                name: 'sop_name',
                fieldLabel: 'Title', // タイトル
                allowBlank: false,
                msgTarget: 'side'
            }, {
                xtype: 'checkboxfield',
                itemId: 'checker_required_flag',
                name: 'checker_required_flag',
                fieldLabel: 'Require Witness', // 要証人
                boxLabel: 'Please undo the check at a single worker SOP.' // 単独作業の手順書の場合は、チェックを外して下さい。
            }]
        }],

        buttonAlign: 'center',
        buttons: [{
            itemId: 'sop_submit_btn',
            text: 'Submit', // 送信
            formBind: true
        }, {
            itemId: 'sop_cancel_btn',
            text: 'Cancel' // キャンセル
        }]
    }
);
