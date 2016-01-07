/**
 * ファイルパネル フォーム
 */
Ext.define(
    'tablet.view.FileForm', {
        extend: 'Ext.form.Panel',
        xtype: 'file-form',

        config: {
            scrollable: true,
            padding: 10,

            listeners: {
                initialize: function(fp, eopts) {
                    // checkbox
                    for (var i = 0; i < fp.query('checkboxfield').length; i++) {
                        var field = fp.query('checkboxfield')[i];
                        var listeners = {};
                        listeners.check = function(field, e, eopts) {
                            field.setValue(1);
                        };
                        listeners.uncheck = function(field, e, eopts) {
                            field.setValue(0);
                        };
                        field.setListeners(listeners);
                    }

                    // 以下、文字認識対応用
                    // date も textfield なので区別する必要あり
                    for (var i = 0; i < fp.query('textfield').length; i++) {
                        var txt = fp.query('textfield')[i];
                        if (txt.config.component.type == 'date') {
                            continue;
                        }

                        var listener = {};
                        listener.focus = function(txt, e, eopts) {
                            if (sop.common.InkTool.hw_flg == true) {
                                sop.common.InkTool.trgt_item_Id = "#" + txt.getItemId();
                                Ext.ComponentQuery.query('inkfep-panel')[0].showBy(txt);
                            }
                        };
                        txt.setListeners(listener);
                    }
                }
            }
        }
    }
);
