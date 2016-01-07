/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when upgrading.
*/

Ext.Loader.setPath('sop.common', '../sop_common');

Ext.application({
    name: 'sop_mng',

    extend: 'sop_mng.Application',

    requires: [
        'sop.common.Session',
        'sop.common.SystemVersion',
        'sop.common.Utilities'
    ],

    autoCreateViewport: true
});
