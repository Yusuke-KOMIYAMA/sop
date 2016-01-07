/**
 * ファイルパネル
 */
Ext.define(
    'tablet.view.FixedFilePanel', {
        extend: 'Ext.Panel',
        xtype: 'fixed-file-panel',

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
                    itemId: 'dwnld_btn',
                    iconCls: 'organize',
                    glyph: 0xf015,
                    iconCls: 'organize',
                    text: '<p style="font-size:75%;">PDF DL</p>',
                    align: 'center',
                    handler: function() {
                        var params = {
                            div: this.up('fixed-file-panel').query('#hdn_div')[0].getValue(),
                            smpl_given_no: this.up('fixed-file-panel').query('#hdn_smpl_given_no')[0].getValue(),
                            pj_id: this.up('fixed-file-panel').query('#hdn_pj_id')[0].getValue(),
                            sop_id: this.up('fixed-file-panel').query('#hdn_sop_id')[0].getValue(),
                            tpl_id: this.up('fixed-file-panel').query('#hdn_tpl_id')[0].getValue(),
                            schema_id: this.up('fixed-file-panel').query('#hdn_schema_id')[0].getValue(),
                            schema_type: this.up('fixed-file-panel').query('#hdn_schema_type')[0].getValue(),
                            file_id: this.up('fixed-file-panel').query('#hdn_file_id')[0].getValue()
                        };
                        Ext.util.openLink('/sop/tablet/src/file_pdf.php?' + Ext.urlEncode(params));
                    }
                }, {
                    xtype: 'spacer'
                }]
            }]
        }
    }
);
