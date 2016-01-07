Ext.define('sop.common.SystemVersion', {
    statics: {
        version: '2.0.6',

        check: function(server_version) {
            var client_version = sop.common.SystemVersion.version;
            if (client_version != server_version) {
                Ext.Msg.alert('Notice',
                              'The system was updated. <br />' +
                              '<br />' +
                              'Server Version: '  + server_version + '<br />' +
                              'Client Version: '  + client_version + '<br />' +
                              '<br />' +
                              'The system start loading.',
                              function() {
                                  location.reload();
                              });  // システムが更新されました。|'サーババージョン: |'クライアントバージョン: |リロードします。
            }
        }
    }
});
