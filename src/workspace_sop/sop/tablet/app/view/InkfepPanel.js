/**
 * 手書きツールパネル（文字認識）
 */
Ext.define(
    'tablet.view.InkfepPanel', {
        extend: 'Ext.Panel',
        xtype: 'inkfep-panel',

        config: {
            modal: true,
            centered: true,
            hideOnMaskTap: true,
            styleHtmlContent: true,
            width: 140,
            height: 140,
            hidden: true,
            html: '<div id="inkfep"><img id="fepCan" src="resources/images/inkfep_bg_middle.jpg" width="100%" height="100%" /></div>'
        }
    }
);
