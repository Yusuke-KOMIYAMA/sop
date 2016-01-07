Ext.define(
    "sop.view.TplAprvGrid", {
        extend: 'Ext.grid.Panel',
        xtype: 'tpl-aprv-grid',

        store: 'TplAprvStore',
        selModel: {
            selType: 'rowmodel'
        },

        columns: [{
            xtype: 'rownumberer'
        }, {
            dataIndex: 'grp_id',
            text: 'grp_id',
            hidden: true
        }, {
            dataIndex: 'pj_id',
            text: 'pj_id',
            hidden: true
        }, {
            dataIndex: 'pj_name',
            text: 'Project', // プロジェクト
            width: 220
        }, {
            dataIndex: 'sop_id',
            text: 'sop_id',
            hidden: true
        }, {
            dataIndex: 'sop_name',
            text: 'SOP',
            width: 180
        }, {
            dataIndex: 'sop_name_en',
            text: 'sop_name_en',
            hidden: true
        }, {
            dataIndex: 'tpl_id',
            text: 'ID',
            hidden: true
        }, {
            dataIndex: 'tpl_name',
            text: 'version', // バージョン
            width: 110
        }, {
            dataIndex: 'revision_no',
            text: 'revision_no',
            hidden: true
        }, {
            dataIndex: 'latest_flg',
            text: 'Latest', // 最新
            width: 80,
            xtype: 'templatecolumn',
            tpl: '<tpl if="latest_flg==1">YES<tpl else>NO</tpl>'
        }, {
            dataIndex: 'aprv_flg',
            text: 'Status', // ステータス
            width: 110,
            xtype: 'templatecolumn',
            tpl: '<tpl if="aprv_flg==0">Require Approval<tpl elseif="aprv_flg==1">Accepted<tpl elseif="aprv_flg==2"><span style="color:#FF0000;">Send Back</span></tpl>' // <tpl if="aprv_flg==0">承認待ち<tpl elseif="aprv_flg==1">承認済<tpl elseif="aprv_flg==2"><span style="color:#FF0000;">差戻し</span></tpl>
        }, {
            dataIndex: 'upld_user',
            text: 'Registrar', // 登録者
            width: 110
        }, {
            dataIndex: 'upld_date',
            text: 'Registration Date', // 登録日時
            width: 160,
            xtype: 'datecolumn',
            format: 'Y/m/d H:i:s'
        }, {
            dataIndex: 'upld_cmnt',
            text: 'Registration Comment', // 登録コメント
            width: 400
        }, {
            dataIndex: 'rtn_user',
            text: 'Send Back Director', // 差戻し者
            hidden: true
        }, {
            dataIndex: 'rtn_date',
            text: 'Send Back Date', // 差戻し日時
            hidden: true,
            xtype: 'datecolumn',
            format: 'Y/m/d H:i:s'
        }, {
            dataIndex: 'rtn_cmnt',
            text: 'Send Back Comment', // 差戻しコメント
            hidden: true
        }, {
            dataIndex: 'aprv_user',
            text: 'Approval Supervisor', // 承認者
            hidden: true
        }, {
            dataIndex: 'aprv_date',
            text: 'Acceptable Date', // 承認日時
            hidden: true,
            xtype: 'datecolumn',
            format: 'Y/m/d H:i:s'
        }, {
            dataIndex: 'aprv_cmnt',
            text: 'Acceptable Comment', // 承認コメント
            hidden: true
        }],
        features: [{
            ftype: 'filters',
            filters: [{
                type: 'string',
                dataIndex: 'pj_name'
            }, {
                type: 'string',
                dataIndex: 'sop_name'
            }, {
                type: 'numeric',
                dataIndex: 'revision_no'
            }, {
                type: 'list',
                dataIndex: 'latest_flg',
                options: [
                    [1, 'YES'],
                    [0, 'NO']
                ],
                phpMode: true
            }, {
                type: 'list',
                dataIndex: 'aprv_flg',
                options: [
                    [0, 'Require Approval'], // 承認待ち
                    [1, 'Accepted'], // 承認済
                    [2, 'Send Back'] // 差戻し
                ],
                phpMode: true
            }, {
                type: 'date',
                dataIndex: 'upld_date',
                dateFormat: 'Y/m/d'
            }, {
                type: 'date',
                dataIndex: 'aprv_date',
                dateFormat: 'Y/m/d'
            }, {
                type: 'date',
                dataIndex: 'rtn_date',
                dateFormat: 'Y/m/d'
            }]
        }],

        bbar: [{
            xtype: 'pagingtoolbar',
            store: 'TplAprvStore',
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
                    itemId: 'tpl_aprv_grid_menu',
                    items: [{
                        itemId: 'tpl_prev_menu',
                        iconCls: 'icon-prev',
                        text: 'Preview' // プレビュー
                    }, {
                        itemId: 'tpl_aprv_menu',
                        iconCls: 'icon-aprv',
                        text: 'Accept' // 承認
                    }, {
                        itemId: 'tpl_rtn_menu',
                        iconCls: 'icon-rtn',
                        text: 'Send Back' // 差戻し
                    }]
                }
            );
        },

        onDestroy: function() {
            this.menu.destroy();
            this.callParent();
        },

        onItemContextMenu: function(grid, rec, item, idx, e, eopts) {
            e.stopEvent();
            this.menu.showAt(e.getXY());
        }
    }
);
