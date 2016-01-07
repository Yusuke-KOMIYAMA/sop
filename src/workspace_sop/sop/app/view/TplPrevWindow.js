/**
 * テンプレート プレビュー
 */
Ext.define(
    "sop.view.TplPrevWindow", {
        extend: 'Ext.window.Window',
        xtype: 'tpl-prev-window',

        title: 'Preview', // プレビュー
        width: '70%',
        height: '85%',
        bodyPadding: 10,
        closable: false,
        modal: true,

        layout: {
            type: 'fit'
        },
        items: [{
            xtype: 'tabpanel',
            width: '100%',
            height: '100%'
        }],

        buttonAlign: 'center',
        buttons: [{
            itemId: 'tpl_src_dwnld_btn',
            text: 'Download Word File' // Wordファイルダウンロード 
        }, {
            itemId: 'tpl_dwnld_btn',
            text: 'Download SOP File' // ファイルダウンロード
        }, {
            itemId: 'tpl_close_btn',
            text: 'Close' // 閉じる
        }]
    }
);
