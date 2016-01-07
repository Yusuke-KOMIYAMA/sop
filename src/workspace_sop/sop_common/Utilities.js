Ext.define('sop.common.Utilities', {
    statics: {
        showSessionExpiredError: function() {
            Ext.Msg.alert('Failure',
                          'The system logged out of your session automatically. Please login once again.',
                          function() {
                              location.reload();
                          }); // '自動ログアウト済みです。もう一度ログインしてください。 
        },

        showFailureResponse: function(response) {
            if (response.session_expired) {
                sop.common.Utilities.showSessionExpiredError();
            } else {
                Ext.Msg.alert('Failure', response.msg);
            }
        }
    }
});
