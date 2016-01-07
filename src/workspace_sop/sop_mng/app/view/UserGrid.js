/**
 * ユーザー Grid
 */
Ext.define(
    "sop_mng.view.UserGrid", {
        extend: 'Ext.grid.Panel',
        xtype: 'user-grid',

        store: 'UserStore',
        selModel: {
            selType: 'rowmodel'
        },

        columns: [{
            xtype: 'rownumberer'
        }, {
            dataIndex: 'user_id',
            text: 'User ID', // ユーザーID
            width: 150
        }, {
            dataIndex: 'user_name',
            text: 'User Name', // ユーザー名
            width: 200
        }, {
            dataIndex: 'grp_name',
            text: 'Affiliation Group', // 所属グループ
            width: 300
        }, {
            dataIndex: 'role_aprv',
            text: 'Approval', // 承認
            width: 100,
            xtype: 'templatecolumn',
            tpl: '<tpl if="role_aprv==1">YES<tpl else>NO</tpl>',
            sortable: false
        }, {
            dataIndex: 'role_upld',
            text: 'Registration', // 登録
            width: 100,
            xtype: 'templatecolumn',
            tpl: '<tpl if="role_upld==1">YES<tpl else>NO</tpl>',
            sortable: false
        }, {
            dataIndex: 'role_user',
            text: 'Ordinary', // 一般
            width: 100,
            xtype: 'templatecolumn',
            tpl: '<tpl if="role_user==1">YES<tpl else>NO</tpl>',
            sortable: false
        }, {
            dataIndex: 'admin_flag',
            text: 'Administration', // 管理
            width: 100,
            xtype: 'templatecolumn',
            tpl: '<tpl if="admin_flag==1">YES<tpl else>NO</tpl>',
            sortable: false
        }, {
            dataIndex: 'email',
            text: 'e-mail', // メールアドレス
            width: 250,
            sortable: false
        }, {
            dataIndex: 'note',
            text: 'Remark', // 備考
            width: 250,
            sortable: false
        }],

        features: [{
            ftype: 'filters',
            filters: [{
                type: 'string',
                dataIndex: 'user_id'
            }, {
                type: 'string',
                dataIndex: 'user_name'
            }, {
                type: 'string',
                dataIndex: 'email'
            }]
        }],

        bbar: [{
            xtype: 'pagingtoolbar',
            store: 'UserStore',
            displayInfo: true
        }],

        initComponent: function() {
            this.menu = this.buildMenu();
            this.callParent();
            this.on({
                scope: this,
                itemcontextmenu: this.onItemContextMenu
            });
        },

        buildMenu: function() {
            return Ext.create(
                'Ext.menu.Menu', {
                    itemId: 'user_grid_menu',
                    items: [{
                        itemId: 'user_add_menu',
                        iconCls: 'icon-add',
                        text: 'Add' // 追加 
                    }, {
                        itemId: 'user_upd_menu',
                        iconCls: 'icon-upd',
                        text: 'Edit' // 編集
                    }, {
                        itemId: 'user_pwd_menu',
                        iconCls: 'icon-upd',
                        text: 'Change Password' // パスワード変更
                    }, {
                        itemId: 'user_del_menu',
                        iconCls: 'icon-del',
                        text: 'Delete' // 削除
                    }]
                }
            );
        },

        onDestroy: function() {
            this.menu.destroy();
            this.callParent();
        },

        onItemContextMenu: function(grid, rec, item, idx, e, eopts) {
            var systemConfig = Ext.getStore('SystemConfigStore').getAt(0);
            if (systemConfig.get('use_sso')) {
                this.menu.items.map.user_pwd_menu.hidden = true;
            }
            e.stopEvent();
            this.menu.showAt(e.getXY());
        }
    }
);
