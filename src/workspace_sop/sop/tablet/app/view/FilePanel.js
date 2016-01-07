/**
 * ファイルパネル
 */
Ext.define(
    'tablet.view.FilePanel', {
        extend: 'Ext.Panel',
        xtype: 'file-panel',

        config: {
            fullscreen: true,
            layout: 'fit',
            items: [{
                xtype: 'titlebar',
                title: '',
                docked: 'top',
                items: [{
                    itemId: 'back_btn',
                    align: 'left',
                    ui: 'back',
                    text: ''
                }, {
                    itemId: 'home_btn',
                    xtype: 'button',
                    text: '<span style="font-size:80%;">Logout</span>', // ログアウト
                    align: 'right'
                }]
            }, {
                xtype: 'panel',
                itemId: 'notification',
                top: 15,
                right: 15,
                style: 'display: block; font-size: 80%; color: #444; background-color: white; border-radius: 10px; border: 1px solid RoyalBlue; padding: 2px 10px;',
                hidden: true
            }, {
                xtype: 'panel',
                itemId: 'error_notification',
                top: 55,
                right: 15,
                style: 'display: block; font-size: 80%; color: #c00; background-color: FireBrick; border-radius: 10px; border: 1px solid FireBrick; padding: 2px 10px;',
                hidden: true
            }, {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [{
                    itemId: 'main_btn',
                    iconCls: 'home',
                    text: 'Home',
                    align: 'left'
                }, {
                    xtype: 'spacer'
                }, {
                    itemId: 'hw_btn',
                    iconCls: 'compose',
                    text: '<p style="font-size:75%;">Writing</p>'
                }, {
                    xtype: 'spacer'
                }, {
                    itemId: 'fix_btn',
                    iconCls: 'reply',
                    text: '<p style="font-size:75%;">Operation Complete</p>' // 作業完了 
                }, {
                    itemId: 'unfix_btn',
                    iconCls: 'reply',
                    text: '<p style="font-size:75%;">Cancellation of Operation Complete State</p>' // 作業完了（チェック待ち）解除 
                }, {
                    xtype: 'spacer'
                }, {
                    xtype: 'button',
                    itemId: 'pdf_dwnld_btn',
                    glyph: 0xf015,
                    iconCls: 'organize',
                    text: '<p style="font-size:75%;">PDF DL</p>',
                    handler: function() {
                        var params = {
                            div: this.up('file-panel').query('#hdn_div')[0].getValue(),
                            smpl_given_no: this.up('file-panel').query('#hdn_smpl_given_no')[0].getValue(),
                            pj_id: this.up('file-panel').query('#hdn_pj_id')[0].getValue(),
                            sop_id: this.up('file-panel').query('#hdn_sop_id')[0].getValue(),
                            tpl_id: this.up('file-panel').query('#hdn_tpl_id')[0].getValue(),
                            schema_id: this.up('file-panel').query('#hdn_schema_id')[0].getValue(),
                            schema_type: this.up('file-panel').query('#hdn_schema_type')[0].getValue(),
                            file_id: this.up('file-panel').query('#hdn_file_id')[0].getValue()
                        };
                        Ext.util.openLink('/sop/tablet/src/file_pdf.php?' + Ext.urlEncode(params));
                    }
                }]
            }]
        }
    }
);
