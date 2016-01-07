/**
 * オートセーブのローカルストレージ用モデル
 */
Ext.define(
    'tablet.model.AutoSaveVal', {
        extend: 'Ext.data.Model',
        config: {
            fields: [
                'id',
                'val_name',
                'requesttime',
                'seq_no',
                'params'
            ]
        }
    }
);
