Ext.define('sop.common.Session', {
    statics: {
        refreshSessionTimerId: null,

        refreshSessionWhileComponentIsVisible: function(component) {
            var interval = 60 * 1000;
            sop.common.Session.refreshSessionTimerId = setInterval(function() {
                if ((component.isVisible && ! component.isVisible()) ||
                    (component.isHidden && component.isHidden())) {
                    clearInterval(sop.common.Session.refreshSessionTimerId);
                }

                Ext.Ajax.request
                ({
                    url:'./src/refresh_session.php',
                    success:function(res, eopts)
                    {
                        // ignore
                    },
                    failure:function(res, eopts)
                    {
                        // ignore
                    }
                });
            }, interval);
        }
    }
});
