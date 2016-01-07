/**
 * System Config
 */
Ext.define(
    'sop.model.SystemConfig', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'system_version',
            type: 'string'
        }, {
            name: 'footer',
            type: 'string'
        }, {
            name: 'use_sso',
            type: 'bool'
        }, {
            name: 'debug_pseudo_sso',
            type: 'bool'
        }, {
            name: 'session_site_key',
            type: 'string'
        }, {
            name: 'header_home_button_url',
            type: 'string'
        }, {
            name: 'oauth2_logout_uri',
            type: 'string'
        }]
    }
);
