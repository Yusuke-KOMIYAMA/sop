/**
 * SOP 共同実験者
 */
Ext.define(
    'tablet.model.CheckUser', {
        extend: 'Ext.data.Model',
        config: {
            fields: [{
                name: 'user_id',
                type: 'string'
            }, {
                name: 'text',
                type: 'string'
            }]
        }
    }
);
