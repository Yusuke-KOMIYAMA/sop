/**
 * プロジェクト - SOP ツリー
 */
Ext.define(
    "sop.view.PjTree", {
        extend: 'Ext.tree.Panel',
        xtype: 'pj-tree',

        store: 'PjTreeStore',

        width: 270,
        hideHeaders: true,
        useArrows: true,
        autoScroll: true,
        animate: true,

        initComponent: function() {
            this.allNodeMenu = this.buildAllNodeMenu();
            this.pjNodeMenu = this.buildPjNodeMenu();
            this.sopNodeMenu = this.buildSopNodeMenu();

            this.callParent();

            this.on({
                scope: this,
                itemcontextmenu: this.onNodeContextMenu
            });
        },

        onDestroy: function() {
            this.allNodeMenu.destroy();
            this.pjNodeMenu.destroy();
            this.sopNodeMenu.destroy();

            this.callParent();
        },

        buildAllNodeMenu: function() {
            return Ext.create(
                'Ext.menu.Menu', {
                    items: [{
                        itemId: 'node_add_menu',
                        iconCls: 'icon-add',
                        text: 'Add' // 追加
                    }, {
                        itemId: 'node_refresh_menu',
                        iconCls: 'icon-refresh',
                        text: 'Refresh' // 最新の情報に更新'
                    }]
                }
            );
        },

        buildPjNodeMenu: function() {
            return Ext.create(
                'Ext.menu.Menu', {
                    items: [{
                        itemId: 'node_add_menu',
                        iconCls: 'icon-add',
                        text: 'Add' // 追加
                    }, {
                        itemId: 'node_upd_menu',
                        iconCls: 'icon-upd',
                        text: 'Edit' // 編集
                    }, {
                        itemId: 'node_del_menu',
                        iconCls: 'icon-del',
                        text: 'Delete' // 削除
                    }]
                }
            );
        },

        buildSopNodeMenu: function() {
            return Ext.create(
                'Ext.menu.Menu', {
                    items: [{
                        itemId: 'tpl_upld_menu',
                        iconCls: 'icon-upld',
                        text: 'Template Upload' // テンプレートアップロード
                    }, {
                        itemId: 'node_upd_menu',
                        iconCls: 'icon-upd',
                        text: 'Edit' // 編集
                    }, {
                        itemId: 'node_del_menu',
                        iconCls: 'icon-del',
                        text: 'Delete' // 削除
                    }]
                }
            );
        },

        onNodeContextMenu: function(tree, rec, item, idx, e, eopts) {
            e.stopEvent();

            if (rec.data.leaf == false) {
                if (rec.data.id == 'all') {
                    this.allNodeMenu.showAt(e.getXY());
                } else {
                    this.pjNodeMenu.showAt(e.getXY());
                }
            } else {
                this.sopNodeMenu.showAt(e.getXY());
            }
        }
    }
);
