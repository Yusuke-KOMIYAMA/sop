/**
 * Form
 */
Ext.define(
    'sop.model.Form', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'form_id',
            type: 'int'
        }, {
            name: 'pj_id',
            type: 'int'
        }, {
            name: 'sop_id',
            type: 'int'
        }, {
            name: 'tpl_id',
            type: 'int'
        }, {
            name: 'schema_id',
            type: 'int'
        }, {
            name: 'x',
            type: 'int'
        }, {
            name: 'y',
            type: 'int'
        }, {
            name: 'height',
            type: 'int'
        }, {
            name: 'width',
            type: 'int'
        }, {
            name: 'type',
            type: 'string'
        }, {
            name: 'default_value',
            type: 'string'
        }]
    }
);
