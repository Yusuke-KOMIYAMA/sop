/**
 * 手書きパネルツール
 *
 */
Ext.define(
    'tablet.view.InktoolPanel', {
        extend: 'Ext.Panel',
        xtype: 'inktool-panel',

        config: {
            modal: true,
            centered: true,
            hideOnMaskTap: true,
            styleHtmlContent: true,
            width: '80%',
            height: '80%',
            hidden: true,
            cls: 'inktool-panel',
            html: '<img id="inktool" width="100%" height="100%" src="resources/images/white.gif">',
            items: [{
                xtype: 'titlebar',
                title: 'Handwriting Board', // 手書きパネル
                docked: 'top',
                items: [{
                    xtype: 'label',
                    itemId: 'inktool-panel-total-stroke-cells',
                    html: '',
                    padding: '0 10 0 0',
                    style: 'font-size:80%;',
                    align: 'right'
                }]
            }, {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [{
                    itemId: 'clear_btn',
                    iconCls: 'refresh',
                    text: '<p style="font-size:75%;">clear</p>',
                    align: 'left'
                }, {
                    xtype: 'spacer'
                }, {
                    itemId: 'undo_btn',
                    text: '<p style="font-size:75%;">undo</p>',
                    iconCls: 'arrow_left'
                }, {
                    xtype: 'spacer'
                }, {
                    itemId: 'redo_btn',
                    text: '<p style="font-size:75%;">redo</p>',
                    iconCls: 'arrow_right',
                    align: 'right'
                }]
            }]
        }
    }
);
