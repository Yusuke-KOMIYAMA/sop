Ext.define(
    'sop.Application', {
        name: 'sop',
        extend: 'Ext.app.Application',

        models: [
            'Tpl',
            'SystemConfig',
            'Form'
        ],

        views: [
            'Viewport'
        ],

        controllers: [
            'Main',
            'TplDefaultValueWindow'
        ],

        stores: [
            'PjTreeStore',
            'TplStore',
            'TplAprvStore',
            'SystemConfigStore',
            'FormStore'
        ],

        init: function() {
            Ext.setGlyphFontFamily('FontAwesome');
        }
    }
);
