/**
 * フォーム追加用コントローラ
 */
Ext.define('sop.helper.TplForm', {
    tplEditPanel: null,
    containers: [],

    constructor: function(tplEditPanel) {
        this.tplEditPanel = tplEditPanel;
    },

    clearContainers: function() {
        Ext.Array.each(this.containers, function(c) {
            c.destroy();
        });
        this.containers = [];
    },

    getTplEditPanel: function() {
        return this.tplEditPanel;
    },

    getScale: function() {
        var img = this.getTplEditPanel().el.down('img');
        var img_width = img.getWidth();
        var original_img_width = parseInt(img.getAttribute('data-original-width'));
        if (original_img_width == 0) {
            return 1;
        }
        var scale_ratio = img_width / original_img_width;
        return scale_ratio;
    },

    makeTextbox: function(opts) {
        defaultOpts = {
            width: 150 * this.getScale(),
            height: 60 * this.getScale(),
            items: {
                xtype: 'textarea'
            },
            type: 'textbox',
            style: {
                borderStyle: 'solid',
                borderColor: 'blue'
            },
            preserveRatio: false,
            maxHeight: 500
        };
        opts = Ext.Object.merge(defaultOpts, opts);
        var textbox = this.makeForm(opts);
        if (opts.defaultValue) {
            var textarea = textbox.items.items[0];
            textarea.setValue(opts.defaultValue);
        }
        return textbox;
    },

    textBoxChangeDefault: function(element) {
        var defaultValueController = Ext.create('sop.controller.TplDefaultValueWindow');
        var msgBox = defaultValueController.getView('TplDefaultValueWindow').create();
        defaultValueController.fireEvent('setElement', element);
        msgBox.show();
    },

    makeCheckbox: function(opts) {
        defaultOpts = {
            html: '<div class="input-box"><div class="checkbox"><div class="border"></div><div class="checkmark"></div></div></div>',
            width: 25 * this.getScale(),
            height: 25 * this.getScale(),
            type: 'checkbox',
            preserveRatio: true,
            resizable: false,
            maxWidth: 300
        };
        opts = Ext.Object.merge(defaultOpts, opts);
        var checkbox = this.makeForm(opts);
        if (!opts.defaultValue) {
            checkbox.defaultValue = opts.defaultValue;
            checkbox.el.down('.checkmark').setVisible((opts.defaultValue == 'on'));
        }
        return checkbox;
    },

    checkBoxChangeDefault: function(element) {
        var checkmark = element.el.down('.checkmark');
        var visibility = !checkmark.isVisible();
        checkmark.setVisible(visibility);
        element.defaultValue = visibility ? 'on' : 'off';
    },

    makePulldown: function(opts) {
        defaultOpts = {
            width: 150,
            height: 30,
            items: {
                xtype: 'combobox',
                store: Ext.create('Ext.data.Store', {
                    fields: ['item'],
                    data: [{
                        'item': 'item1'
                    }, {
                        'item': 'item2'
                    }, {
                        'item': 'item3'
                    }]
                }),
                displayField: 'item',
                valueField: 'item'
            },
            type: 'pulldown',
            preserveRatio: false
        };
        opts = Ext.Object.merge(defaultOpts, opts);
        return this.makeForm(opts);
    },

    makeRadio: function(opts) {
        defaultOpts = {
            width: 150,
            height: 30,
            items: {
                xtype: 'radio'
            },
            type: 'radio',
            preserveRatio: false
        };
        opts = Ext.Object.merge(defaultOpts, opts);
        return this.makeForm(opts);
    },

    makeForm: function(opts) {
        var tpl_edit_panel = this.getTplEditPanel();
        var container = this.makeContainer(tpl_edit_panel, opts);

        if (opts.x && opts.y) {
            container.setPosition(opts.x, opts.y);
            container.x = opts.x;
            container.y = opts.y;
        } else {
            container.showAt(container.x, container.y);
        }
        if (opts.form_id) {
            container.saved_form_id = opts.form_id;
        }

        this.setContextMenu(container);
        this.addNewElement(container);
        return container;
    },

    makeContainer: function(tpl_edit_panel, opts) {
        var box = tpl_edit_panel.getBox();
        var container = Ext.create('Ext.Container', {
            html: opts.html ? opts.html : '',
            items: opts.items ? opts.items : {},
            width: opts.width,
            height: opts.height,
            border: 2,
            floating: true,
            shadow: false,
            constrain: true,
            constrainTo: new Ext.util.Region(0, box.right, box.bottom, 0),
            renderTo: tpl_edit_panel.down('panel').id,
            style: opts.style ? opts.style : {},
            draggable: {
                listeners: {
                    dragend: {
                        fn: this.dragEnd,
                        scope: this
                    }
                }
            },
            resizable: (opts.resizable !== undefined) ? opts.resizable : {
                handles: 'se',
                pinned: true,
                preserveRatio: opts.preserveRatio,
                maxWidth: opts.maxWidth ? opts.maxWidth : 10000,
                maxHeight: opts.maxHeight ? opts.maxHeight : 10000
            },
            listeners: {
                resize: this.resizeForm
            }
        });
        container.defaultValue = (opts.defaultValue) ? opts.defaultValue : '';
        container.type = opts.type;
        container.scrollTop =
            tpl_edit_panel.down('panel').el.down('.x-panel-body').getScroll().top;
        container.isDrag = false;
        container.isDragged = false;

        this.containers.push(container);

        return container;
    },

    addNewElement: function(element) {
        var tpl_edit_panel = this.getTplEditPanel();
        if (!tpl_edit_panel.elements) {
            tpl_edit_panel.elements = {};
        }
        tpl_edit_panel.elements[element.id] = element;
    },

    // ----- Events for container -----
    dragEnd: function(dragger, e, eopts) {
        var container = dragger.dragTarget;
        if (container.isDrag) return;
        var scroller = dragger.el.prev('.x-panel-body').getScroll();
        var elements = this.getTplEditPanel().elements;
        elements[container.id].scrollTop = scroller.top;
        elements[container.id].isDragged = true;
    },
    resizeForm: function(elm, w, h, old_w, old_h, opts) {
        var frame = elm.getEl().down('.input-box');
        if (frame) {
            frame.setSize(w, h);
        } else {
            var items = elm.items.items;
            items[0].setSize(w, h);
        }
    },
    // ----------

    // ----- Events for resizer -----
    beforeResize: function(width, height, e, eopts) {
        target.beforeResizePageX = this.target.getX();
        target.beforeResizeX = this.target.x;
        target.beforeResizeY = this.target.y;
    },
    resize: function(width, height, e, eopts) {
        var el = this.getEl();
        el.down(".input-box").setHeight(el.getHeight());
        target.isDrag = false;
        target.isDragged = true;
        target.pageX = target.beforeResizePageX;
        target.x = target.beforeResizeX;
        target.y = target.beforeResizeY;
    },
    resizeDrag: function(width, height, e, eopts) {
        target.dd.panelProxy.hide();
        var el = this.getEl();
        el.down(".input-box").setHeight(el.getHeight());
        el.setVisible(true);
        target.isDrag = true;
    },
    // ----------

    menuItems: [{
        text: 'Change Parameters' // 初期値変更
    }, {
        text: 'Delete Items' // アイテム削除
    }],

    setContextMenu: function(container, opts) {
        var menu = Ext.create('Ext.menu.Menu', {
            width: 200,
            renderTo: this.getTplEditPanel().getEl(),
            items: this.menuItems,
            listeners: {
                click: {
                    fn: this.onClickDefaultValueMenuItem,
                    scope: this
                }
            }
        });
        menu.bindedContainer = container;
        container.getEl().on({
            'contextmenu': {
                fn: function(evt, el, o) {
                    evt.preventDefault();
                    var box = this.getTplEditPanel().getBox();
                    menu.showAt(
                        evt.browserEvent.x - box.left,
                        evt.browserEvent.y - box.top
                    );
                },
                scope: this
            }
        });
    },

    onClickDefaultValueMenuItem: function(menu, item, e, eopts) {
        var elements = this.getTplEditPanel().elements;
        switch (item.text) {
            case this.menuItems[0].text: // 初期値変更
                var e = elements[menu.bindedContainer.id];
                if (e.type == 'textbox') {
                    this.textBoxChangeDefault(elements[menu.bindedContainer.id]);
                } else if (e.type == 'checkbox') {
                    this.checkBoxChangeDefault(elements[menu.bindedContainer.id]);
                }
                break;
            case this.menuItems[1].text: //アイテム削除
                delete elements[menu.bindedContainer.id];
                menu.bindedContainer.destroy();
                break;
        }
    }
});
