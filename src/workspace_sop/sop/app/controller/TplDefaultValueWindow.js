Ext.define(
    'sop.controller.TplDefaultValueWindow', {
        extend: 'Ext.app.Controller',
        requires: [
            'sop.helper.TplForm'
        ],

        refs: [{
            ref: 'ThisWindow',
            selector: 'tpl-default-value-window'
        }, {
            ref: 'Textarea',
            selector: '#tpl_default_value_textarea'
        }, {
            ref: 'TplEditPanel',
            selector: 'tpl-edit-window > tabpanel'
        }],

        element: null,
        containerId: null,

        init: function() {
            this.listen({
                controller: {
                    '*': {
                        setElement: this.setElement
                    }
                }
            });
            this.control({
                '#tpl_default_value_name_btn': {
                    click: this.onClickTplDefaultValueToolBtn
                },
                '#tpl_default_value_group_btn': {
                    click: this.onClickTplDefaultValueToolBtn
                },
                '#tpl_default_value_mail_btn': {
                    click: this.onClickTplDefaultValueToolBtn
                },
                '#tpl_default_value_ok_btn': {
                    click: this.onClickTplDefaultValueOkBtn
                },
                '#tpl_default_value_cancel_btn': {
                    click: this.onClickTplDefaultValueCancelBtn
                }
            });
        },

        onClickTplDefaultValueToolBtn: function(btn, e, eopts) {
            var textarea = this.getTextarea();
            var text = textarea.getValue();
            var caretPos = textarea.getEl().down('textarea').dom.selectionStart;
            var template = btn.itemId;
            template = template.replace('tpl_default_value_', '');
            template = template.substring(0, template.length - 4);
            template = '{%' + template + '%}';
            textarea.setValue(text.substring(0, caretPos) + template + text.substring(caretPos));
        },

        onClickTplDefaultValueOkBtn: function() {
            var text = this.getTextarea().getValue();
            this.element.items.items[0].setValue(text);
            this.element.defaultValue = text;
            this.getThisWindow().close();
        },

        onClickTplDefaultValueCancelBtn: function() {
            this.getThisWindow().close();
        },

        setElement: function(element) {
            this.element = element;
            this.getTextarea().setValue(element.defaultValue);
        }
    }
);
