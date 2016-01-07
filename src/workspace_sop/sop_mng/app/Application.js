Ext.define('sop_mng.Application', {
    name: 'sop_mng',

    extend: 'Ext.app.Application',

    models: [
        'User',
        'Grp'
    ],

    views: [
        'Viewport'
    ],

    controllers: [
        'Main'
    ],

    stores: [
        'UserStore',
        'GrpStore',
        'SystemConfigStore'
    ],

    init: function() {
        Ext.setGlyphFontFamily('FontAwesome');
    }
});
