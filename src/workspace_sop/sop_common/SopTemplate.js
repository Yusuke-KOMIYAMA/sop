Ext.define('sop.common.SopTemplate', {
    statics: {
        aprvFlgToString: function(aprv_flg) {
            if (aprv_flg == 0) {
                return 'Require Approval'; // 承認待ち
            } else if (aprv_flg == 1) {
                return 'Accepted'; // 承認済
            } else if (aprv_flg == 2) {
                return 'Send Back'; // 差戻し
            } else if (aprv_flg == 3) {
                return 'Reapply'; // 再申請
            } else if (aprv_flg == 4) {
                return 'Form Editing'; // 入力フォーム設定中
            }
            return '';
        }
    }
});
