/**
 * メインコントローラー
 */
Ext.define(
    'tablet.controller.Main', {
        extend: 'Ext.app.Controller',
        config: {
            refs: {
                main: 'main',

                // --- LoginPanel -------------
                loginForm: 'login-panel > formpanel',
                loginBtn: 'login-panel #login_btn',

                // --- PjList -----------------
                pjList: 'pj-list',
                pjListHomeBtn: 'pj-list #home_btn',
                pjListProvisionalfixBtn: 'pj-list #provisional_fix_btn',

                // --- ProvisionalFixList -----
                provisionalfixList: 'provisionalfix-list',
                provisionalfixListTbar: 'provisionalfix-list > titlebar',
                provisionalfixListBackBtn: 'provisionalfix-list #back_btn',
                provisionalfixListHomeBtn: 'provisionalfix-list #home_btn',
                provisionalfixListMainBtn: 'provisionalfix-list #main_btn',

                // --- PjSmplList -------------
                pjSmplList: 'pjsmpl-list',
                pjSmplListTbar: 'pjsmpl-list > titlebar',
                pjSmplListBackBtn: 'pjsmpl-list #back_btn',
                pjSmplListHomeBtn: 'pjsmpl-list #home_btn',
                pjSmplListMainBtn: 'pjsmpl-list #main_btn',

                // --- SopList ----------------
                sopList: 'sop-list',
                sopListTbar: 'sop-list > titlebar',
                sopListBackBtn: 'sop-list #back_btn',
                sopListHomeBtn: 'sop-list #home_btn',
                sopListMainBtn: 'sop-list #main_btn',

                // --- FilePanel --------------
                filePanel: 'file-panel',
                filePanelBackBtn: 'file-panel #back_btn',
                filePanelHomeBtn: 'file-panel #home_btn',
                filePanelFixBtn: 'file-panel #fix_btn',
                filePanelUnFixBtn: 'file-panel #unfix_btn',
                filePanelDwnldBtn: 'file-panel #dwnld_btn',
                filePanelHwBtn: 'file-panel #hw_btn',
                filePanelMainBtn: 'file-panel #main_btn',
                filePanelNotification: 'file-panel #notification',
                filePanelErrorNotification: 'file-panel #error_notification',

                // --- FixedFilePanel --------------
                fixedFilePanel: 'fixed-file-panel',
                fixedFilePanelHwBtn: 'fixed-file-panel #hw_btn',
                fixedFilePanelBackBtn: 'fixed-file-panel #back_btn',
                fixedFilePanelHomeBtn: 'fixed-file-panel #home_btn',
                fixedFilePanelMainBtn: 'fixed-file-panel #main_btn',

                // --- InputAprvPanel ---------
                inputAprvPanel: 'inputaprv-panel',
                inputAprvBtn: 'inputaprv-panel #aprv_btn',

                // --- inkfepPanel -----------
                inkfepPanel: 'inkfep-panel',

                // --- inktoolPanel -----------
                inktoolPanel: 'inktool-panel',
                inktoolPanelClearBtn: 'inktool-panel #clear_btn',
                inktoolPanelUndoBtn: 'inktool-panel #undo_btn',
                inktoolPanelRedoBtn: 'inktool-panel #redo_btn'
            },
            control: {
                // --- LoginPanel -------------
                loginBtn: {
                    tap: 'onTapLoginBtn'
                },

                // --- PjList -----------------
                pjList: {
                    itemtap: 'onTapPj'
                },
                pjListHomeBtn: {
                    tap: 'onTapPjListHomeBtn'
                },
                pjListProvisionalfixBtn: {
                    tap: 'onTapPjListProvisionalfixBtn'
                },

                // --- ProvisionalfixList -----------------
                provisionalfixList: {
                    itemtap: 'onTapProvisionalfix'
                },
                provisionalfixListHomeBtn: {
                    tap: 'onTapProvisionalfixListHomeBtn'
                },
                provisionalfixListBackBtn: {
                    tap: 'onTapProvisionalfixListBackBtn'
                },
                provisionalfixListMainBtn: {
                    tap: 'onTapProvisionalfixListMainBtn'
                },

                // --- PjSmplList -------------
                pjSmplList: {
                    itemtap: 'onTapPjSmpl'
                },
                pjSmplListBackBtn: {
                    tap: 'onTapPjSmplListBackBtn'
                },
                pjSmplListHomeBtn: {
                    tap: 'onTapPjSmplListHomeBtn'
                },
                pjSmplListMainBtn: {
                    tap: 'onTapPjSmplListMainBtn'
                },

                // --- SopList ----------------
                sopList: {
                    itemtap: 'onTapSop'
                },
                sopListBackBtn: {
                    tap: 'onTapSopListBackBtn'
                },
                sopListHomeBtn: {
                    tap: 'onTapSopListHomeBtn'
                },
                sopListMainBtn: {
                    tap: 'onTapSopListMainBtn'
                },

                // --- FilePanel --------------
                filePanel: {
                    show: 'onShowFilePanel'
                },
                filePanelBackBtn: {
                    tap: 'onTapFilePanelBackBtn'
                },
                filePanelHomeBtn: {
                    tap: 'onTapFilePanelHomeBtn'
                },
                filePanelFixBtn: {
                    tap: 'onTapFilePanelFixBtn'
                },
                filePanelUnFixBtn: {
                    tap: 'onTapFilePanelUnFixBtn'
                },
                filePanelDwnldBtn: {
                    tap: 'onTapFilePanelDwnldBtn'
                },
                filePanelHwBtn: {
                    tap: 'onTapFilePanelHwBtn'
                },
                filePanelMainBtn: {
                    tap: 'onTapFilePanelMainBtn'
                },

                // --- FixedFilePanel --------------
                fixedFilePanel: {
                    show: 'onShowFixedFilePanel'
                },
                fixedFilePanelHwBtn: {
                    tap: 'onTapFixedFilePanelHwBtn'
                },
                fixedFilePanelBackBtn: {
                    tap: 'onTapFixedFilePanelBackBtn'
                },
                fixedFilePanelHomeBtn: {
                    tap: 'onTapFixedFilePanelHomeBtn'
                },
                fixedFilePanelMainBtn: {
                    tap: 'onTapFixedFilePanelMainBtn'
                },

                // --- InputAprvPanel ---------
                inputAprvBtn: {
                    tap: 'onTapInputAprvBtn'
                },

                // --- inktoolPanel -----------
                inkfepPanel: {
                    show: 'onShowInkfepPanel',
                    hide: 'onHideInkfepPanel'
                },

                // --- inktoolPanel -----------
                inktoolPanel: {
                    show: 'onShowInktoolPanel',
                    hide: 'onHideInktoolPanel'
                },
                inktoolPanelClearBtn: {
                    tap: 'onTapInktoolPanelClearBtn'
                },
                inktoolPanelUndoBtn: {
                    tap: 'onTapInktoolPanelUndoBtn'
                },
                inktoolPanelRedoBtn: {
                    tap: 'onTapInktoolPanelRedoBtn'
                }
            }
        },

        // ----------------------
        // 初期化時の処理
        // ----------------------
        launch: function(app) {
            // 各イベント設定
            this.on('showloginpanel', this.showLoginPanel);
            this.on('showpjlist', this.showPjList);
            this.on('showprovisionalfixlist', this.showProvisionalfixList);
            this.on('showpjsmpllist', this.showPjSmplList);
            this.on('showsoplist', this.showSopList);
            this.on('showfilepanel', this.showFilePanel);
            this.on('showfilepanelskipinputaprvpanel', this.showFilePanelSkipInputAprvPanel);
            this.on('showfixfilepanel', this.showProvisionalFixFilePanel);
            this.on('showinputaprvpanel', this.showInputAprvPanel);
            this.on('showfixconfirmdialog', this.showFixConfirmDialog);
            this.on('showconfirmfixfilepanel', this.showConfirmFixFilePanel);

            Ext.getStore('PjStore').on({
                load: 'onLoadPjStore',
                scope: this
            });
            Ext.getStore('PjSmplStore').on({
                load: 'onLoadPjSmplStore',
                scope: this
            });
            Ext.getStore('SopStore').on({
                load: 'onLoadSopStore',
                scope: this
            });
            Ext.getStore('ProvisionalfixStore').on({
                load: 'onLoadProvisionalfixStore',
                scope: this
            });

            Ext.Msg.defaultAllowedConfig.showAnimation = false;
            // currentFilePanelはgetFilePanel() or getFixedFilePanel()のいずれか
            this.currentFilePanel = null;
            this.currentFilePanelIsReadOnly = true;
            this.handWriteMap = {};

            // 初期表示
            this.getLoginForm().hide();
            this.fireEvent('showloginpanel', {
                from_fn: 'launch'
            });

            var that = this;
            Ext.create('tablet.store.SystemConfigStore').load(
                function(records, operation, success) {
                    var system_version = records[0].get('system_version');
                    sop.common.SystemVersion.check(system_version);

                    that.checkSession();
                },
                this
            );

            var delay = 10 * 1000;
            setInterval(this.autoSaveRetry, delay);
        },

        // --- セッションチェック ---------
        checkSession: function() {
            Ext.Ajax.request({
                url: './src/login_.php',
                timeout: 5000,
                scope: this,
                success: function(response) {
                    var json = Ext.JSON.decode(response.responseText);
                    if (json.success == true) {
                        this.onLoginSucceed(json);
                    }

                    if (json.sso_msg) {
                        Ext.Msg.alert('Failure', json.sso_msg);
                    }

                    this.resetLoginForm();
                    this.getLoginForm().show();
                }
            });
        },

        resetLoginForm: function() {
            this.getLoginForm().reset();

            var systemConfig = Ext.getStore('SystemConfigStore').getAt(0);
            if (systemConfig.get('use_sso')) {
                // シングル・サインオン用にログインフォームを変更する。

                this.getLoginForm().query('#user_id')[0].hide();
                this.getLoginForm().query('#password')[0].hide();
                this.getLoginForm().query('#sso_field')[0].show();
            }
        },

        // --- ログイン成功時 ----------
        onLoginSucceed: function(params) {
            Ext.getStore('PjStore').loadPage(1);
            Ext.ComponentQuery.query('main')[0].animateActiveItem('pj-list', {
                type: 'pop'
            });
            Ext.ComponentQuery.query('pj-list > titlebar')[0].setTitle(
                'Project List&nbsp;&nbsp;&nbsp;<span style="font-size:80%;">' +
                params.grp_name +
                '<span style="margin: 0 10px 0 10px">' +
                params.user_id +
                '</span>'); // プロジェクト一覧

            that = this;
            Ext.Ajax.request({
                url: './src/json_provisional_fixes.php',
                success: function(res, eopts) {
                    if (Ext.decode(res.responseText).total > 0) {
                        Ext.Msg.show({
                            title: 'Notice', // 通知
                            message: 'There is an operation completed template that wait for the confirmation.', // 作業完了（チェック待ち）のテンプレートがあります。
                            scope: this,
                            buttons: [{
                                itemId: 'yes',
                                text: 'Go to an operation completed list that wait for the confirmation.' // 作業完了（チェック待ち）一覧へ
                            }, {
                                itemId: 'no',
                                text: 'Skip' // スキップ
                            }],
                            fn: function(btn) {
                                if (btn == 'yes') {
                                    that.fireEvent('showprovisionalfixlist', {
                                        from_fn: 'onTapConfirmMoveToProvisionalFixListYes'
                                    });
                                }
                            }
                        });
                    }
                },
                failure: function(res, eopts) {
                    sop.common.Utilities.showFailureResponse(Ext.decode(res.responseText));
                }
            });
        },

        setupAutoSave: function() {
            // それぞれの入力要素に対して、オートセーブを設定

            Ext.ns('SOP_TABLET.Globals');
            SOP_TABLET.Globals.seq_no = 1;
            var templateElements = Ext.ComponentQuery.query('file-panel')[0].element.query('.autosave');
            for (var i in templateElements) {
                Ext.get(templateElements[i]).on('change', this.autoSave);
            }

            // エクセルのチェックボックス
            var checkboxes = Ext.ComponentQuery.query('file-panel checkboxfield');
            for (var i in checkboxes) {
                var args = {
                    target: {
                        name: checkboxes[i].getName()
                    },
                    timeStamp: new Date().getTime()
                };
                var that = this;
                checkboxes[i].on('change', function() {
                    that.autoSave(args);
                });
            }
        },

        adjustInjectedInputPosition: function(img, readonly) {
            // エクセルの場合は画像が存在しない
            if (!img) {
                return;
            }

            var f = function() {
                // 注入されたフォームの位置調整
                var img_width = img.getWidth();
                var original_img_width = parseInt(img.getAttribute('data-original-width'));
                var scale_ratio = img_width / original_img_width;

                if (readonly) {
                    Ext.Array.each(Ext.query('.injected-input > input'), function(node) {
                        node.readOnly = true;
                    });
                    Ext.Array.each(Ext.query('.injected-input > textarea'), function(node) {
                        node.readOnly = true;
                    });
                    Ext.Array.each(Ext.query('.injected-input > input[type=checkbox]'), function(node) {
                        node.disabled = true;
                    });
                }

                // 位置
                Ext.Array.each(Ext.query('.injected-input'), function(node) {
                    var original_top = parseInt(node.getAttribute('data-original-top'));
                    var original_left = parseInt(node.getAttribute('data-original-left'));
                    node.style.display = 'block';
                    node.style.top = parseInt(original_top * scale_ratio) + 'px';
                    node.style.left = parseInt(original_left * scale_ratio) + 'px';
                });

                // サイズ
                Ext.Array.each(Ext.query('.injected-input-resizable'), function(node) {
                    var original_width = parseInt(node.getAttribute('data-original-width'));
                    var original_height = parseInt(node.getAttribute('data-original-height'));
                    node.style.width = parseInt(original_width * scale_ratio) + 'px';
                    node.style.height = parseInt(original_height * scale_ratio) + 'px';
                });
            };

            f();
            img.on('load', f);
        },

        loadHandWrite: function(file_id, filepanel) {
            var that = this;
            sop.common.InkTool.clearMyInk();

            Ext.Ajax.request({
                url: './src/hwr_get.php',
                params: {
                    file_id: file_id
                },
                success: function(res, eopts) {
                    var schema_type = filepanel.query('#hdn_schema_type')[0].getValue();
                    if (schema_type == 1) { // src
                        var img = filepanel.element.down('img');
                        var img_width = img.getWidth();
                        var original_img_width = parseInt(img.getAttribute('data-original-width'));
                        var scale_ratio = img_width / original_img_width;
                    }
                    if (schema_type == 2) { // tbl
                        var scale_ratio = 1;
                    }

                    var hwr_val = Ext.decode(res.responseText).hwr_val;
                    for (i in hwr_val) {
                        var hwr = hwr_val[i];

                        // スケール変更済みのデータなので、表示環境に合わせて比率を戻す。
                        var mark_position_y = Math.round(hwr.mark_position_y * scale_ratio);
                        var hwrMarkBtn = that.addHWRMarkBtn(mark_position_y);
                        that.handWriteMap[hwrMarkBtn.id] = hwr;
                    }
                },
                failure: function(res, eopts) {
                    sop.common.Utilities.showFailureResponse(Ext.decode(res.responseText));
                }
            });
        },

        // ----------------------
        // 各パネル毎の処理
        // ----------------------
        // --- LoginPanel -------------
        onTapLoginBtn: function(btn, e, eopts) {
            var systemConfig = Ext.getStore('SystemConfigStore').getAt(0);
            if (systemConfig.get('use_sso')) {
                window.location.href = '/sop/sso/signin?' + Ext.urlEncode({
                    session_site_key: systemConfig.get('session_site_key'),
                    pathname: window.location.pathname
                });
            } else {
                this.getLoginForm().submit({
                    url: './src/login_.php',
                    scope: this,
                    success: function(form, result, data) {
                        this.onLoginSucceed(result);
                    },
                    failure: function(form, result) {
                        sop.common.Utilities.showFailureResponse(result);
                    }
                });
            }
        },

        // --- PjList -----------------
        onLoadPjStore: function(store, recs, success, ope, eopts) {
            var response = Ext.decode(ope.getResponse().responseText);
            this.getPjList().query('toolbar')[0].setTitle(response.total + 'items'); // 件のアイテム
        },

        onTapPjListHomeBtn: function(btn, e, eopts) {
            this.fireEvent('showloginpanel', {
                from_fn: 'onTapPjListHomeBtn'
            });
        },

        onTapPjListProvisionalfixBtn: function(btn, e, eopts) {
            this.fireEvent('showprovisionalfixlist', {
                from_fn: 'onTapPjListProvisionalfixBtn'
            });
        },

        onTapPj: function(list, idx, trgt, rec, e, eopts) {
            this.fireEvent('showpjsmpllist', {
                pj_id: rec.data.pj_id,
                pj_name: rec.data.pj_name,
                from_fn: 'onTapPj'
            });
        },

        // --- ProvisionalfixList -------------
        onLoadProvisionalfixStore: function(store, recs, success, ope, eopts) {
            var response = Ext.decode(ope.getResponse().responseText);
            this.getProvisionalfixList().query('toolbar')[0].setTitle(response.total + 'itemes'); // 件のアイテム
        },

        onTapProvisionalfixListBackBtn: function(btn, e, eopts) {
            this.fireEvent('showpjlist', {
                from_fn: 'onTapProvisionalfixListBackBtn'
            });
        },

        onTapProvisionalfixListMainBtn: function(btn, e, eopts) {
            this.fireEvent('showpjlist', {
                from_fn: 'onTapProvisionalfixListMainBtn'
            });
        },

        onTapProvisionalfixListHomeBtn: function(btn, e, eopts) {
            this.fireEvent('showloginpanel', {
                from_fn: 'onTapProvisionalfixListHomeBtn'
            });
        },

        onTapProvisionalfix: function(list, idx, trgt, rec, e, eopts) {
            var params = {};
            params.smpl_given_no = rec.data.smpl_given_no;
            params.pj_id = rec.data.pj_id;
            params.pj_name = rec.data.pj_name;
            params.sop_id = rec.data.sop_id;
            params.sop_name = rec.data.sop_name;
            params.tpl_id = rec.data.tpl_id;
            params.schema_type = rec.data.schema_type;
            params.schema_id = rec.data.schema_id;
            params.file_id = rec.data.file_id;
            params.div = 'fix';
            params.back_to = 'provisionalfix-list';

            this.fireEvent('showfixconfirmdialog', params);
        },

        // --- PjSmplList -------------
        onLoadPjSmplStore: function(store, recs, success, ope, eopts) {
            var response = Ext.decode(ope.getResponse().responseText);
            this.getPjSmplList().query('toolbar')[0].setTitle(response.total + 'items'); // 件のアイテム
        },

        onTapPjSmplListBackBtn: function(btn, e, eopts) {
            this.fireEvent('showpjlist', {
                from_fn: 'onTapPjSmplListBackBtn'
            });
        },

        onTapPjSmplListHomeBtn: function(btn, e, eopts) {
            this.fireEvent('showloginpanel', {
                from_fn: 'onTapPjSmplListHomeBtn'
            });
        },

        onTapPjSmplListMainBtn: function(btn, e, eopts) {
            this.fireEvent('showpjlist', {
                from_fn: 'onTapPjSmplListMainBtn'
            });
        },

        onTapPjSmpl: function(list, idx, trgt, rec, e, eopts) {
            this.fireEvent('showsoplist', {
                pj_id: rec.data.pj_id,
                pj_name: rec.data.pj_name,
                smpl_given_no: rec.data.smpl_given_no,
                from_fn: 'onTapPjSmpl'
            });
        },

        // --- SopList ----------------
        onLoadSopStore: function(store, recs, success, ope, eopts) {
            var response = Ext.decode(ope.getResponse().responseText);
            this.getSopList().query('toolbar')[0].setTitle(response.total + 'items'); // 件のアイテム
        },

        onTapSopListBackBtn: function(btn, e, eopts) {
            this.fireEvent('showpjsmpllist', {
                pj_id: this.getSopListTbar().query('#hdn_pj_id')[0].getValue(),
                pj_name: this.getSopListTbar().query('#hdn_pj_name')[0].getValue(),
                from_fn: 'onTapSopListBackBtn'
            });
        },

        onTapSopListHomeBtn: function(btn, e, eopts) {
            this.fireEvent('showloginpanel', {
                from_fn: 'onTapSopListHomeBtn'
            });
        },

        onTapSopListMainBtn: function(btn, e, eopts) {
            this.fireEvent('showpjlist', {
                from_fn: 'onTapSopListMainBtn'
            });
        },

        onTapSop: function(list, idx, trgt, rec, e, eopts) {
            if (rec.data.file_status == 0) // 未入力
            {
                if (rec.data.latest_tpl_id == null) // 承認済みテンプレートが存在しない場合
                {
                    Ext.Msg.alert('Notice', 'This item is prepareing a input file.'); // このアイテムは入力ファイルを準備中です
                    return;
                }

                var params = {};
                params.div = 'add';
                params.smpl_given_no = rec.data.smpl_given_no;
                params.pj_id = rec.data.pj_id;
                params.pj_name = rec.data.pj_name;
                params.sop_id = rec.data.sop_id;
                params.sop_name = rec.data.sop_name;
                params.tpl_id = rec.data.latest_tpl_id;
                params.schema_type = rec.data.schema_type;
                params.schema_id = rec.data.schema_id;
                params.file_id = rec.data.file_id;
                params.checker_required_flag = rec.data.checker_required_flag;

                // ここで証人の要否によるスキップ判定する。
                if (params.checker_required_flag) {
                    // 要チェック
                    this.fireEvent('showinputaprvpanel', params);
                } else {
                    this.fireEvent('showfilepanelskipinputaprvpanel', params);
                }

            } else {
                var params = {};
                params.smpl_given_no = rec.data.smpl_given_no;
                params.pj_id = rec.data.pj_id;
                params.pj_name = rec.data.pj_name;
                params.sop_id = rec.data.sop_id;
                params.sop_name = rec.data.sop_name;
                params.tpl_id = rec.data.tpl_id;
                params.schema_type = rec.data.schema_type;
                params.schema_id = rec.data.schema_id;
                params.file_id = rec.data.file_id;
                params.checker_required_flag = rec.data.checker_required_flag;

                if (rec.data.file_status == 1) // 入力中
                {
                    params.div = 'upd';

                    // ここで証人の要否によるスキップ判定する。
                    if (params.checker_required_flag) {
                        // 要チェック
                        var fix_user = rec.data.fix_user;
                        this.fireEvent('showinputaprvpanel', params, fix_user);
                    } else {
                        this.fireEvent('showfilepanelskipinputaprvpanel', params);
                    }

                }
                if (rec.data.file_status == 2) // 作業完了（チェック待ち）
                {
                    params.div = 'fix';
                    var fix_user = rec.data.fix_user;
                    this.fireEvent('showfixfilepanel', params, fix_user, true);
                }

                if (rec.data.file_status == 4) // 作業完了
                {
                    params.div = 'fix';
                    var fix_user = rec.data.fix_user;
                    this.fireEvent('showfixfilepanel', params, fix_user, false);
                }
            }
        },

        // --- InputAprvPanel ---------
        onTapInputAprvBtn: function(btn, e, eopts) {
            this.fireEvent('showfilepanel', {});
        },

        // --- FilePanel --------------
        onShowFilePanel: function(pnl, eopts) {
            this.currentFilePanel = this.getFilePanel();

            sop.common.Session.refreshSessionWhileComponentIsVisible(this.getFilePanel());

            // 注入されたフォームの位置調整
            var img = pnl.element.down('img');
            this.adjustInjectedInputPosition(img, this.currentFilePanelIsReadOnly);

            // オートセーブ
            if (!this.currentFilePanelIsReadOnly) {
                this.setupAutoSave();
            }

            // 手書き
            var file_id = pnl.query('#hdn_file_id')[0];
            if (file_id) {
                this.loadHandWrite(file_id.getValue(), this.getFilePanel());
            }
        },

        onShowFixedFilePanel: function(pnl, eopts) {
            this.currentFilePanel = this.getFixedFilePanel();

            // 注入されたフォームの位置調整
            var img = pnl.element.down('img');
            this.adjustInjectedInputPosition(img, true);
        },

        onTapFilePanelBackBtn: function(btn, e, eopts) {
            this.handWriteMap = {};

            var pj_id = this.getFilePanel().query('#hdn_pj_id')[0].getValue();
            var pj_name = this.getFilePanel().query('#hdn_pj_name')[0].getValue();
            var smpl_given_no = this.getFilePanel().query('#hdn_smpl_given_no')[0].getValue();

            var div = this.getFilePanel().query('#hdn_div')[0].getValue();

            // fix 状態のときは、確認なしで遷移
            if (div != 'fix') {
                var that = this;
                Ext.Msg.confirm('Confirm', 'Are you sure you want to return to the SOP list?', submit); // 標準作業手順書一覧に戻ります。よろしいですか？

                function submit(btn) {
                    if (btn == 'yes') {
                        that.fireEvent('showsoplist', {
                            pj_id: pj_id,
                            pj_name: pj_name,
                            smpl_given_no: smpl_given_no,
                            from_fn: 'onTapFilePanelBackBtn'
                        });
                    }
                }
            } else {
                this.fireEvent('showsoplist', {
                    pj_id: pj_id,
                    pj_name: pj_name,
                    smpl_given_no: smpl_given_no,
                    from_fn: 'onTapFilePanelBackBtn'
                });
            }
        },

        onTapFilePanelHomeBtn: function(btn, e, eopts) {
            this.fireEvent('showloginpanel', {
                from_fn: 'onTapFilePanelHomeBtn'
            });
        },

        onTapFilePanelHwBtn: function(btn, e, eopts) {
            SOP_TABLET.Globals.handWriteIndex = null;
            this.getInktoolPanel().show();
        },

        onTapFilePanelMainBtn: function(btn, e, eopts) {
            this.showBackMainPanel();
        },

        onTapFilePanelFixBtn: function(btn, e, eopts) {
            if (this.getFilePanel().query('#hdn_div')[0].getValue() == 'add') {
                Ext.Msg.alert('Notice', 'Please save the data as temporary'); // 一旦保存してください
                return;
            }

            var params = {};
            params.pj_id = this.getFilePanel().query('#hdn_pj_id')[0].getValue();
            params.sop_id = this.getFilePanel().query('#hdn_sop_id')[0].getValue();
            params.tpl_id = this.getFilePanel().query('#hdn_tpl_id')[0].getValue();
            params.schema_id = this.getFilePanel().query('#hdn_schema_id')[0].getValue();
            params.file_id = this.getFilePanel().query('#hdn_file_id')[0].getValue();
            params.smpl_given_no = this.getFilePanel().query('#hdn_smpl_given_no')[0].getValue();

            var that = this;

            Ext.Msg.show({
                title: 'Notice', // 
                message: 'Complete the operation.', // 作業完了します 
                scope: this,
                buttons: [{
                    itemId: 'yes',
                    text: 'Complete' // 完了します 
                }, {
                    itemId: 'no',
                    text: 'Cancel' // キャンセル
                }],
                fn: function(btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: './src/file_fix.php',
                            params: params,
                            success: function(res, eopts) {
                                var filepanel = Ext.ComponentQuery.query('file-panel')[0];
                                filepanel.query('#hw_btn')[0].setDisabled(true);
                                filepanel.query('#fix_btn')[0].setDisabled(true);

                                filepanel.query('#fix_btn')[0].hide();
                                filepanel.query('#unfix_btn')[0].show();

                                Ext.Msg.alert('Success', Ext.decode(res.responseText).msg, function() {
                                    var pj_id = that.getFilePanel().query('#hdn_pj_id')[0].getValue();
                                    var pj_name = that.getFilePanel().query('#hdn_pj_name')[0].getValue();
                                    var smpl_given_no = that.getFilePanel().query('#hdn_smpl_given_no')[0].getValue();
                                    that.fireEvent('showsoplist', {
                                        pj_id: pj_id,
                                        pj_name: pj_name,
                                        smpl_given_no: smpl_given_no,
                                        from_fn: 'onTapFilePanelBackBtn'
                                    });
                                });
                            },
                            failure: function(res, eopts) {
                                sop.common.Utilities.showFailureResponse(Ext.decode(res.responseText));
                            }
                        });
                    }
                }
            });
        },

        onTapFilePanelUnFixBtn: function(btn, e, eopts) {
            var params = {};
            params.pj_id = this.getFilePanel().query('#hdn_pj_id')[0].getValue();
            params.sop_id = this.getFilePanel().query('#hdn_sop_id')[0].getValue();
            params.tpl_id = this.getFilePanel().query('#hdn_tpl_id')[0].getValue();
            params.schema_id = this.getFilePanel().query('#hdn_schema_id')[0].getValue();
            params.file_id = this.getFilePanel().query('#hdn_file_id')[0].getValue();
            params.smpl_given_no = this.getFilePanel().query('#hdn_smpl_given_no')[0].getValue();

            var that = this;

            Ext.Msg.show({
                title: 'Notice', // 通知
                message: 'Cancellation of the operation complete state that wait for the confirmation.', // 作業完了（チェック待ち）状態を解除します。
                scope: this,
                buttons: [{
                    itemId: 'yes',
                    text: 'Delete' // 解除する
                }, {
                    itemId: 'no',
                    text: 'Cancel' // キャンセル
                }],
                fn: function(btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: './src/file_unfix.php',
                            params: params,
                            success: function(res, eopts) {
                                var filepanel = Ext.ComponentQuery.query('file-panel')[0];
                                filepanel.query('#hw_btn')[0].setDisabled(false);
                                filepanel.query('#fix_btn')[0].setDisabled(false);

                                filepanel.query('#fix_btn')[0].show();
                                filepanel.query('#unfix_btn')[0].hide();

                                Ext.Msg.alert('Success', Ext.decode(res.responseText).msg, function() {
                                    var pj_id = that.getFilePanel().query('#hdn_pj_id')[0].getValue();
                                    var pj_name = that.getFilePanel().query('#hdn_pj_name')[0].getValue();
                                    var smpl_given_no = that.getFilePanel().query('#hdn_smpl_given_no')[0].getValue();
                                    that.fireEvent('showsoplist', {
                                        pj_id: pj_id,
                                        pj_name: pj_name,
                                        smpl_given_no: smpl_given_no,
                                        from_fn: 'onTapFilePanelBackBtn'
                                    });
                                });
                            },
                            failure: function(res, eopts) {
                                sop.common.Utilities.showFailureResponse(Ext.decode(res.responseText));
                            }
                        });
                    }
                }
            });
        },

        // --- FixedFilePanel --------------
        onTapFixedFilePanelHwBtn: function(btn, e, eopts) {
            SOP_TABLET.Globals.handWriteIndex = null;
            this.getInktoolPanel().show();
        },

        onTapFixedFilePanelBackBtn: function(btn, e, eopts) {
            this.handWriteMap = {};
            this.fireEvent('showprovisionalfixlist', {
                from_fn: 'onTapFixedFilePanelBackBtn'
            });
        },

        onTapFixedFilePanelHomeBtn: function(btn, e, eopts) {
            this.fireEvent('showloginpanel', {
                from_fn: 'onTapFixedFilePanelHomeBtn'
            });
        },

        onTapFixedFilePanelMainBtn: function(btn, e, eopts) {
            this.showBackMainPanel();
        },

        // --- InkfepPanel -----------
        onShowInkfepPanel: function(pnl, eopts) {
            setupMyFep();
        },

        onHideInkfepPanel: function(pnl, eopts) {
            if (this.getFilePanel().query(sop.common.InkTool.trgt_item_Id).length == 1) {
                var str = getMyFep();
                var org_str = this.getFilePanel().query(sop.common.InkTool.trgt_item_Id)[0].getValue();
                this.getFilePanel().query(sop.common.InkTool.trgt_item_Id)[0].setValue(org_str + str);
            }
        },

        // --- InktoolPanel -----------
        onShowInktoolPanel: function(pnl, eopts) {
            sop.common.InkTool.setupMyInk();

            var schema_type = this.currentFilePanel.query('#hdn_schema_type')[0].getValue();
            if (schema_type == 1) { // src
                var index = SOP_TABLET.Globals.handWriteIndex;
                if (index == null) {
                    sop.common.InkTool.clearMyInk();

                    // 手書きマークボタン全てを取得
                    var fileform = Ext.ComponentQuery.query('file-form')[0];
                    var mark_list = fileform.element.down('#hwr_mark_list');
                    var button_list = mark_list.dom.children;

                    var currentY = fileform.getScrollable().getScroller().position.y;

                    if (button_list.length != 0) {
                        // 上 (gap * 2 / 3) px 下 gap px のずれは許容する。一番高い位置にある手書きデータを使用する。
                        var gap = 39;
                        var min = currentY - Math.round(gap * 2 / 3);
                        var max = currentY + gap;

                        SELECT_HWR_MARK_BUTTON: for (var i = 0; i < button_list.length; i++) {
                            var hwrMarkDiv = button_list[i];
                            var hwrY = parseInt(hwrMarkDiv.style.top);

                            for (var t = min; t < max; t++) {
                                if (t == hwrY) {
                                    var buttonId = hwrMarkDiv.id;
                                    SOP_TABLET.Globals.handWriteIndex = buttonId;
                                    sop.common.InkTool.loadMyInk(this.handWriteMap[buttonId]['hwr_val']);

                                    // 2重ループを抜ける。
                                    break SELECT_HWR_MARK_BUTTON;
                                }
                            }
                        }
                    }
                } else {
                    sop.common.InkTool.loadMyInk(this.handWriteMap[index]['hwr_val']);
                }
            }
            if (schema_type == 2) { // tbl
                // エクセルの場合は一つだけなので、最初の項目を表示
                for (var id in this.handWriteMap) {
                    sop.common.InkTool.loadMyInk(this.handWriteMap[id]['hwr_val']);
                    break;
                }
            }

            sop.common.InkTool.setReadOnly(this.currentFilePanelIsReadOnly);
            sop.common.InkTool.limitTotalStrokeCells(this.getInktoolPanel());
        },

        onHideInktoolPanel: function(pnl, eopts) {
            if (this.currentFilePanelIsReadOnly) {
                return;
            }

            var ink = sop.common.InkTool.saveMyInk();
            if (ink != null) {
                var index = SOP_TABLET.Globals.handWriteIndex;

                var inkParams = new Object();
                var schema_type = this.currentFilePanel.query('#hdn_schema_type')[0].getValue();
                if (schema_type == 1) { // src
                    var img = this.currentFilePanel.element.down('img');
                    var img_width = img.getWidth();
                    var original_img_width = parseInt(img.getAttribute('data-original-width'));
                    var scale_ratio = img_width / original_img_width;

                    if (index == null) {
                        var fileform = Ext.ComponentQuery.query('file-form')[0];
                        var hwrY = fileform.getScrollable().getScroller().position.y;

                        // 画面に追加するボタンは、スケール変更なし。
                        var hwrMarkBtn = this.addHWRMarkBtn(hwrY);
                        index = hwrMarkBtn.getId();

                        // データを保存するときは、スケール変更する。
                        inkParams.mark_position_y = parseInt(hwrY / scale_ratio);
                    } else {
                        inkParams = this.handWriteMap[index];
                    }

                }
                if (schema_type == 2) { // tbl
                    index = 0;
                    var scale_ratio = 1;
                }

                inkParams.hwr_val = ink;
                inkParams.hwr_image = sop.common.InkTool.saveImageMyInk();
                inkParams.update_time = parseInt(new Date().getTime() / 1000);

                this.handWriteMap[index] = inkParams;

                args = {
                    target: {
                        name: index
                    },
                    timeStamp: new Date().getTime()
                };

                // autoSave 内で div による保存可否の判定を行っているので、ここでの判定はしない。
                this.autoSave(args);
            }
        },

        onTapInktoolPanelClearBtn: function(btn, e, eopts) {
            sop.common.InkTool.clearMyInk();
        },

        onTapInktoolPanelUndoBtn: function(btn, e, eopts) {
            sop.common.InkTool.undoMyInk();
        },

        onTapInktoolPanelRedoBtn: function(btn, e, eopts) {
            sop.common.InkTool.redoMyInk();
        },

        onTapHWRMarhBtn: function(btn, e, eopts) {
            SOP_TABLET.Globals.handWriteIndex = btn.getId();

            Ext.ComponentQuery.query('inktool-panel')[0].show();
        },

        addHWRMarkBtn: function(index) {
            // 手書きマークの挿入
            var hwrMark = Ext.create('Ext.Button', {
                itemId: 'hw_mark_' + index,

                top: parseInt(index),
                right: 20,
                width: 40,
                height: 30,
                floatingCls: 'x-button',
                iconCls: 'compose',
                style: 'position: absolute;',

                renderTo: 'hwr_mark_list',

                handler: this.onTapHWRMarhBtn,

                text: ''
            });
            return hwrMark;
        },

        // ----------------------
        // 共通処理
        // ----------------------
        // --- Logout
        showLoginPanel: function(args) {
            if (args.from_fn == 'launch') {
                this.getMain().setActiveItem('login-panel');
                this.getLoginForm().query('#user_id')[0].focus();
            } else {
                var that = this;
                Ext.Msg.confirm('Confirm', 'Are you sure you want to logout?', submit); // ログアウトします。よろしいですか？

                function submit(btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: './src/logout_.php',
                            success: function(res, eopts) {
                                Ext.ComponentQuery.query('main')[0].setActiveItem('login-panel');
                                that.resetLoginForm();
                                Ext.ComponentQuery.query('login-panel #user_id')[0].focus();

                                var systemConfig = Ext.getStore('SystemConfigStore').getAt(0);
                                if (systemConfig.get('use_sso') && !systemConfig.get('debug_pseudo_sso')) {
                                    location.href = systemConfig.get('oauth2_logout_uri');
                                }
                            },
                            failure: function(res, eopts) {}
                        });
                    }
                }
            }
        },

        // --- Return to Main Page
        showBackMainPanel: function(args) {
            var that = this;
            Ext.Msg.confirm('Confirm', 'Are you sure you want to return to the home?', submit); // ホームに戻ります。よろしいですか？

            function submit(btn) {
                if (btn == 'yes') {
                    that.fireEvent('showpjlist', {
                        from_fn: 'onTapFilePanelMainBtn'
                    });
                }
            }
        },

        // --- PjList 表示
        showPjList: function(args) {
            var animation = {};
            if (args.from_fn == 'onTapPjSmplListBackBtn') animation = {
                type: 'cover',
                direction: 'right'
            };
            if (args.from_fn == 'onTapProvisionalfixListBackBtn') animation = {
                type: 'cover',
                direction: 'right'
            };
            //          if(args.from_fn == 'onTapPjSmplListHomeBtn') animation = {type:'pop'};
            //          if(args.from_fn == 'onTapSopListHomeBtn') animation = {type:'pop'};
            //          if(args.from_fn == 'onTapFilePanelHomeBtn') animation = {type:'pop'};
            if (args.from_fn == 'onTapPjSmplListMainBtn') animation = {
                type: 'cover',
                direction: 'right'
            };
            if (args.from_fn == 'onTapFilePanelMainBtn') animation = {
                type: 'cover',
                direction: 'right'
            };
            if (args.from_fn == 'onTapSopListMainBtn') animation = {
                type: 'cover',
                direction: 'right'
            };
            if (args.from_fn == 'onTapProvisionalfixListMainBtn') animation = {
                type: 'cover',
                direction: 'right'
            };

            this.getMain().animateActiveItem('pj-list', animation);
        },

        // --- PjProvisionalFixList 表示
        showProvisionalfixList: function(args) {
            // tbar タイトル、戻るボタン テキスト設定
            this.getProvisionalfixListTbar().setTitle('List of the operation completed SOP that wait for the confirmation.'); // 作業完了（チェック待ち）標準作業手順書一覧

            // store load
            Ext.getStore('ProvisionalfixStore').getProxy().setExtraParams({
                pj_id: args.pj_id
            });
            Ext.getStore('ProvisionalfixStore').loadPage(1);

            // animation 設定
            var animation = {};
            if (args.from_fn == 'onTapPjListProvisionalfixBtn') animation = {
                type: 'slide',
                direction: 'left'
            };
            if (args.from_fn == 'onTapConfirmMoveToProvisionalFixListYes') animation = {
                type: 'flip'
            };
            if (args.from_fn == 'onTapFixedFilePanelBackBtn') animation = {
                type: 'slide',
                direction: 'right'
            };

            this.getMain().animateActiveItem('provisionalfix-list', animation);
        },

        // --- PjSmplList 表示
        showPjSmplList: function(args) {
            // tbar タイトル、戻るボタン テキスト設定
            this.getPjSmplListTbar().setTitle(args.pj_name + '&nbsp;&nbsp;&nbsp; List of the object of sample.'); // 対象サンプル一覧

            // store load
            Ext.getStore('PjSmplStore').getProxy().setExtraParams({
                pj_id: args.pj_id
            });
            Ext.getStore('PjSmplStore').loadPage(1);

            // animation 設定
            var animation = {};
            if (args.from_fn == 'onTapPj') animation = {
                type: 'slide',
                direction: 'left'
            };
            if (args.from_fn == 'onTapSopListBackBtn') animation = {
                type: 'cover',
                direction: 'right'
            };

            this.getMain().animateActiveItem('pjsmpl-list', animation);
        },

        // --- SopList 表示
        showSopList: function(args) {
            // hidden 設定
            this.getSopListTbar().add({
                xtype: 'hiddenfield',
                itemId: 'hdn_pj_id',
                value: args.pj_id
            });
            this.getSopListTbar().add({
                xtype: 'hiddenfield',
                itemId: 'hdn_pj_name',
                value: args.pj_name
            });

            // tbar タイトル、戻るボタン テキスト設定
            this.getSopListTbar().setTitle(args.smpl_given_no + '&nbsp;&nbsp;&nbsp;SOP list'); // 標準作業手順書一覧
            this.getSopListBackBtn().setText('<span style="font-size:80%;">' + args.pj_name + '</span>');

            // store load
            Ext.getStore('SopStore').getProxy().setExtraParams({
                pj_id: args.pj_id,
                smpl_given_no: args.smpl_given_no
            });
            Ext.getStore('SopStore').loadPage(1);

            // animation 設定
            var animation = {};
            if (args.from_fn == 'onTapPjSmpl') animation = {
                type: 'slide',
                direction: 'left'
            };
            if (args.from_fn == 'onTapFilePanelBackBtn') animation = {
                type: 'cover',
                direction: 'right'
            };

            this.getMain().animateActiveItem('sop-list', animation);
        },

        // --- InputAprvPanel 表示
        showInputAprvPanel: function(args, fix_user) {
            var that = this;
            Ext.getStore('CheckUserStore').loadPage(1, function(records, operation, success) {
                if (fix_user != null) {
                    that.getInputAprvPanel().down('formpanel').down('fieldset').down('selectfield').setValue(fix_user);
                }
            });

            this.getInputAprvPanel().down('formpanel').add({
                xtype: 'hiddenfield',
                itemId: 'hdn_params',
                name: 'hdn_params',
                value: Ext.encode(args)
            });
            this.getInputAprvPanel().show();
        },

        // --- FilePanel 表示
        showFilePanel: function(args) {
            var that = this;
            this.currentFilePanelIsReadOnly = false;

            this.getInputAprvPanel().down('formpanel').submit({
                url: './src/file_get.php',
                waitMsg: 'Loading...',
                success: function(form, result, data) {
                    form.reset();

                    var retprms = Ext.decode(result.hdn_params);

                    // config 取得
                    var configobj = {};
                    if (retprms.schema_type == 1) { // src
                        configobj = {
                            html: result.config
                        };
                    }
                    if (retprms.schema_type == 2) { // tbl
                        configobj = Ext.decode(result.config);
                    }

                    // form 作成、hidden 設定
                    var fileform = Ext.create('tablet.view.FileForm', configobj);

                    fileform.add({
                        xtype: 'hiddenfield',
                        itemId: 'hdn_div',
                        name: 'div',
                        value: retprms.div
                    });
                    fileform.add({
                        xtype: 'hiddenfield',
                        itemId: 'hdn_pj_id',
                        name: 'pj_id',
                        value: retprms.pj_id
                    });
                    fileform.add({
                        xtype: 'hiddenfield',
                        itemId: 'hdn_pj_name',
                        name: 'pj_name',
                        value: retprms.pj_name
                    });
                    fileform.add({
                        xtype: 'hiddenfield',
                        itemId: 'hdn_smpl_given_no',
                        name: 'smpl_given_no',
                        value: retprms.smpl_given_no
                    });
                    fileform.add({
                        xtype: 'hiddenfield',
                        itemId: 'hdn_sop_id',
                        name: 'sop_id',
                        value: retprms.sop_id
                    });
                    fileform.add({
                        xtype: 'hiddenfield',
                        itemId: 'hdn_tpl_id',
                        name: 'tpl_id',
                        value: retprms.tpl_id
                    });
                    fileform.add({
                        xtype: 'hiddenfield',
                        itemId: 'hdn_schema_id',
                        name: 'schema_id',
                        value: retprms.schema_id
                    });
                    fileform.add({
                        xtype: 'hiddenfield',
                        itemId: 'hdn_schema_type',
                        name: 'schema_type',
                        value: retprms.schema_type
                    });
                    fileform.add({
                        xtype: 'hiddenfield',
                        itemId: 'hdn_file_id',
                        name: 'file_id',
                        value: retprms.file_id
                    });
                    fileform.add({
                        xtype: 'hiddenfield',
                        itemId: 'hdn_user_id_2',
                        name: 'user_id_2',
                        value: result.user_id_2
                    }); // これだけ取得経路が違うので注意。

                    // panel 設定
                    var main = Ext.ComponentQuery.query('main')[0];

                    var filepanel = main.down('file-panel');
                    if (filepanel.getInnerItems().length > 0) { // 以前のフォーム情報を消去
                        filepanel.removeInnerAt(0);
                    }
                    filepanel.add(fileform);

                    filepanel.query('#hw_btn')[0].setDisabled(false);
                    filepanel.query('#fix_btn')[0].setDisabled(false);

                    filepanel.query('#fix_btn')[0].show();
                    filepanel.query('#unfix_btn')[0].hide();

                    // tbar タイトル、戻るボタン テキスト設定
                    filepanel.down('titlebar').setTitle(retprms.sop_name);
                    filepanel.down('titlebar').down('#back_btn').setText('<span style="font-size:80%;">' + retprms.smpl_given_no + '</span>');

                    // 表示
                    Ext.ComponentQuery.query('inputaprv-panel')[0].hide();
                    main.animateActiveItem('file-panel', {
                        type: 'flip'
                    });
                },
                failure: function(form, result) {
                    form.reset();
                    sop.common.Utilities.showFailureResponse(result);
                }
            });
        },

        // --- FilePanel 表示 証人選択画面スキップ
        showFilePanelSkipInputAprvPanel: function(args) {
            this.currentFilePanelIsReadOnly = false;

            Ext.Viewport.setMasked({
                xtype: 'loadmask',
                message: 'Loading...'
            });
            Ext.Ajax.request({
                url: './src/file_get.php',
                params: {
                    hdn_params: Ext.encode(args)
                },
                success: function(res, eopts) {
                    Ext.Viewport.setMasked(false);

                    var result = Ext.decode(res.responseText);
                    var retprms = Ext.decode(result.hdn_params);

                    // config 取得
                    var configobj = {};
                    if (retprms.schema_type == 1) { // src
                        configobj = {
                            html: result.config
                        };
                    }
                    if (retprms.schema_type == 2) { // tbl
                        configobj = Ext.decode(result.config);
                    }

                    // form 作成、hidden 設定
                    var fileform = Ext.create('tablet.view.FileForm', configobj);

                    fileform.add({
                        xtype: 'hiddenfield',
                        itemId: 'hdn_div',
                        name: 'div',
                        value: retprms.div
                    });
                    fileform.add({
                        xtype: 'hiddenfield',
                        itemId: 'hdn_pj_id',
                        name: 'pj_id',
                        value: retprms.pj_id
                    });
                    fileform.add({
                        xtype: 'hiddenfield',
                        itemId: 'hdn_pj_name',
                        name: 'pj_name',
                        value: retprms.pj_name
                    });
                    fileform.add({
                        xtype: 'hiddenfield',
                        itemId: 'hdn_smpl_given_no',
                        name: 'smpl_given_no',
                        value: retprms.smpl_given_no
                    });
                    fileform.add({
                        xtype: 'hiddenfield',
                        itemId: 'hdn_sop_id',
                        name: 'sop_id',
                        value: retprms.sop_id
                    });
                    fileform.add({
                        xtype: 'hiddenfield',
                        itemId: 'hdn_tpl_id',
                        name: 'tpl_id',
                        value: retprms.tpl_id
                    });
                    fileform.add({
                        xtype: 'hiddenfield',
                        itemId: 'hdn_schema_id',
                        name: 'schema_id',
                        value: retprms.schema_id
                    });
                    fileform.add({
                        xtype: 'hiddenfield',
                        itemId: 'hdn_schema_type',
                        name: 'schema_type',
                        value: retprms.schema_type
                    });
                    fileform.add({
                        xtype: 'hiddenfield',
                        itemId: 'hdn_file_id',
                        name: 'file_id',
                        value: retprms.file_id
                    });
                    fileform.add({
                        xtype: 'hiddenfield',
                        itemId: 'hdn_user_id_2',
                        name: 'user_id_2',
                        value: ''
                    });

                    // panel 設定
                    var main = Ext.ComponentQuery.query('main')[0];

                    var filepanel = main.down('file-panel');
                    if (filepanel.getInnerItems().length > 0) { // 以前のフォーム情報を消去
                        filepanel.removeInnerAt(0);
                    }
                    filepanel.add(fileform);

                    filepanel.query('#hw_btn')[0].setDisabled(false);
                    filepanel.query('#fix_btn')[0].setDisabled(false);

                    filepanel.query('#fix_btn')[0].show();
                    filepanel.query('#unfix_btn')[0].hide();

                    // tbar タイトル、戻るボタン テキスト設定
                    filepanel.down('titlebar').setTitle(retprms.sop_name);
                    filepanel.down('titlebar').down('#back_btn').setText('<span style="font-size:80%;">' + retprms.smpl_given_no + '</span>');

                    // 表示
                    main.animateActiveItem('file-panel', {
                        type: 'flip'
                    });
                },
                failure: function(res, eopts) {
                    Ext.Viewport.setMasked(false);
                    sop.common.Utilities.showFailureResponse(Ext.decode(res.responseText));
                }
            });
        },

        // --- FilePanel 表示 作業完了（チェック待ち）一覧用
        showProvisionalFixFilePanel: function(args, fix_user, refixable) {
            var that = this;
            this.currentFilePanelIsReadOnly = true;

            Ext.Msg.alert('Notice', 'This item already has been completely inputted.', submit); // このアイテムは入力が完了しています

            function submit(btn) {
                if (btn == 'ok') {
                    Ext.Viewport.setMasked({
                        xtype: 'loadmask',
                        message: 'Loading...'
                    });
                    Ext.Ajax.request({
                        url: './src/file_get.php',
                        params: {
                            hdn_params: Ext.encode(args),
                            user_id_2: fix_user
                        },
                        success: function(res, eopts) {
                            Ext.Viewport.setMasked(false);

                            var result = Ext.decode(res.responseText);
                            var retprms = Ext.decode(result.hdn_params);

                            // config 取得
                            var configobj = {};
                            if (retprms.schema_type == 1) { // src
                                configobj = {
                                    html: result.config
                                };
                            }
                            if (retprms.schema_type == 2) { // tbl
                                configobj = Ext.decode(result.config);
                            }

                            // form 作成、hidden 設定
                            var fileform = Ext.create('tablet.view.FileForm', configobj);

                            fileform.add({
                                xtype: 'hiddenfield',
                                itemId: 'hdn_div',
                                name: 'div',
                                value: retprms.div
                            });
                            fileform.add({
                                xtype: 'hiddenfield',
                                itemId: 'hdn_pj_id',
                                name: 'pj_id',
                                value: retprms.pj_id
                            });
                            fileform.add({
                                xtype: 'hiddenfield',
                                itemId: 'hdn_pj_name',
                                name: 'pj_name',
                                value: retprms.pj_name
                            });
                            fileform.add({
                                xtype: 'hiddenfield',
                                itemId: 'hdn_smpl_given_no',
                                name: 'smpl_given_no',
                                value: retprms.smpl_given_no
                            });
                            fileform.add({
                                xtype: 'hiddenfield',
                                itemId: 'hdn_sop_id',
                                name: 'sop_id',
                                value: retprms.sop_id
                            });
                            fileform.add({
                                xtype: 'hiddenfield',
                                itemId: 'hdn_tpl_id',
                                name: 'tpl_id',
                                value: retprms.tpl_id
                            });
                            fileform.add({
                                xtype: 'hiddenfield',
                                itemId: 'hdn_schema_id',
                                name: 'schema_id',
                                value: retprms.schema_id
                            });
                            fileform.add({
                                xtype: 'hiddenfield',
                                itemId: 'hdn_schema_type',
                                name: 'schema_type',
                                value: retprms.schema_type
                            });
                            fileform.add({
                                xtype: 'hiddenfield',
                                itemId: 'hdn_file_id',
                                name: 'file_id',
                                value: retprms.file_id
                            });
                            fileform.add({
                                xtype: 'hiddenfield',
                                itemId: 'hdn_user_id_2',
                                name: 'user_id_2',
                                value: result.user_id_2
                            }); // これだけ取得経路が違うので注意。

                            // panel 設定
                            var main = Ext.ComponentQuery.query('main')[0];

                            var filepanel = main.down('file-panel');
                            if (filepanel.getInnerItems().length > 0) { // 以前のフォーム情報を消去
                                filepanel.removeInnerAt(0);
                            }
                            filepanel.add(fileform);

                            filepanel.query('#hw_btn')[0].setDisabled(false);
                            filepanel.query('#fix_btn')[0].setDisabled(true);

                            if (refixable) {
                                filepanel.query('#fix_btn')[0].hide();
                                filepanel.query('#unfix_btn')[0].show();
                            } else {
                                filepanel.query('#fix_btn')[0].show();
                                filepanel.query('#unfix_btn')[0].hide();
                            }

                            // tbar タイトル、戻るボタン テキスト設定
                            filepanel.down('titlebar').setTitle(retprms.sop_name);
                            filepanel.down('titlebar').down('#back_btn').setText('<span style="font-size:80%;">' + retprms.smpl_given_no + '</span>');

                            // 表示
                            main.animateActiveItem('file-panel', {
                                type: 'flip'
                            });
                        },
                        failure: function(res, eopts) {
                            Ext.Viewport.setMasked(false);
                            sop.common.Utilities.showFailureResponse(Ext.decode(res.responseText));
                        }
                    });
                }
            }
        },

        // --- 作業完了確認ダイアログ 表示
        showFixConfirmDialog: function(args) {
            Ext.Msg.show({
                title: 'Check the input', // 入力チェック
                message: 'Are you sure you want to confirm this check?', // チェックOKとします。よろしいですか？
                scope: this,
                buttons: [{
                    itemId: 'yes',
                    text: 'YES' // はい
                }, {
                    itemId: 'confirm',
                    text: 'Confirm the content' // 内容を確認する
                }, {
                    itemId: 'no',
                    text: 'NO' // いいえ
                }],
                fn: function(btn) {
                    if (btn == 'confirm') {
                        this.fireEvent('showconfirmfixfilepanel', args);
                    } else if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: './src/fix.php',
                            params: args,
                            success: function(res, eopts) {
                                Ext.Viewport.setMasked(false);
                                Ext.Msg.alert('Notice', Ext.decode(res.responseText).msg);

                                // store load
                                Ext.getStore('ProvisionalfixStore').getProxy().setExtraParams({
                                    pj_id: args.pj_id
                                });
                                Ext.getStore('ProvisionalfixStore').loadPage(1);

                            },
                            failure: function(res, eopts) {
                                Ext.Viewport.setMasked(false);
                                sop.common.Utilities.showFailureResponse(Ext.decode(res.responseText));
                            }
                        });
                    }
                }
            });
        },

        // --- 作業完了時の入力内容確認 表示
        showConfirmFixFilePanel: function(args) {
            var that = this;

            Ext.Viewport.setMasked({
                xtype: 'loadmask',
                message: 'Loading...'
            });
            Ext.Ajax.request({
                url: './src/file_get.php',
                params: {
                    hdn_params: Ext.encode(args)
                },
                success: function(res, eopts) {
                    Ext.Viewport.setMasked(false);

                    var result = Ext.decode(res.responseText);
                    var retprms = Ext.decode(result.hdn_params);

                    // config 取得
                    var configobj = {};
                    if (retprms.schema_type == 1) { // src
                        configobj = {
                            html: result.config
                        };
                    }
                    if (retprms.schema_type == 2) { // tbl
                        configobj = Ext.decode(result.config);
                    }

                    // form 作成、hidden 設定
                    var fileform = Ext.create('tablet.view.FixedFileForm', configobj);

                    fileform.add({
                        xtype: 'hiddenfield',
                        itemId: 'hdn_div',
                        name: 'div',
                        value: 'fix'
                    });
                    fileform.add({
                        xtype: 'hiddenfield',
                        itemId: 'hdn_pj_id',
                        name: 'pj_id',
                        value: retprms.pj_id
                    });
                    fileform.add({
                        xtype: 'hiddenfield',
                        itemId: 'hdn_pj_name',
                        name: 'pj_name',
                        value: retprms.pj_name
                    });
                    fileform.add({
                        xtype: 'hiddenfield',
                        itemId: 'hdn_smpl_given_no',
                        name: 'smpl_given_no',
                        value: retprms.smpl_given_no
                    });
                    fileform.add({
                        xtype: 'hiddenfield',
                        itemId: 'hdn_sop_id',
                        name: 'sop_id',
                        value: retprms.sop_id
                    });
                    fileform.add({
                        xtype: 'hiddenfield',
                        itemId: 'hdn_tpl_id',
                        name: 'tpl_id',
                        value: retprms.tpl_id
                    });
                    fileform.add({
                        xtype: 'hiddenfield',
                        itemId: 'hdn_schema_id',
                        name: 'schema_id',
                        value: retprms.schema_id
                    });
                    fileform.add({
                        xtype: 'hiddenfield',
                        itemId: 'hdn_schema_type',
                        name: 'schema_type',
                        value: retprms.schema_type
                    });
                    fileform.add({
                        xtype: 'hiddenfield',
                        itemId: 'hdn_file_id',
                        name: 'file_id',
                        value: retprms.file_id
                    });

                    // panel 設定
                    var main = Ext.ComponentQuery.query('main')[0];

                    var filepanel = main.down('fixed-file-panel');
                    if (filepanel.getInnerItems().length > 0) { // 以前のフォーム情報を消去
                        filepanel.removeInnerAt(0);
                    }
                    filepanel.add(fileform);

                    // tbar タイトル、戻るボタン テキスト設定
                    filepanel.down('titlebar').setTitle(retprms.sop_name);
                    filepanel.down('titlebar').down('#back_btn').setText('<span style="font-size:80%;">List of the operation complete that wait for the confirmation.</span>'); // 作業完了（チェック待ち）一覧 

                    // 表示
                    main.animateActiveItem('fixed-file-panel', {
                        type: 'flip'
                    });

                    that.loadHandWrite(filepanel.query('#hdn_file_id')[0].getValue(), filepanel);
                },
                failure: function(res, eopts) {
                    Ext.Viewport.setMasked(false);
                    sop.common.Utilities.showFailureResponse(Ext.decode(res.responseText));
                }
            });

        },

        // --- オートセーブ
        autoSave: function(args) {

            // 入力値とテンプレートに関連するデータの取得。
            var main = Ext.ComponentQuery.query('main')[0];
            var filepanel = main.down('file-panel');

            var params = {};
            var hdn_div = filepanel.query('#hdn_div')[0];
            // fix-file-panelの場合はhdn_divが存在しないのでスキップ。
            if (!hdn_div) {
                return;
            }
            params.div = hdn_div.getValue();

            // div が fix の場合は、保存してはいけない
            if (params.div == 'fix') {
                return;
            }

            params.smpl_given_no = filepanel.query('#hdn_smpl_given_no')[0].getValue();
            params.pj_id = filepanel.query('#hdn_pj_id')[0].getValue();
            params.sop_id = filepanel.query('#hdn_sop_id')[0].getValue();
            params.tpl_id = filepanel.query('#hdn_tpl_id')[0].getValue();
            params.schema_type = filepanel.query('#hdn_schema_type')[0].getValue();
            params.schema_id = filepanel.query('#hdn_schema_id')[0].getValue();
            params.file_id = filepanel.query('#hdn_file_id')[0].getValue();
            params.user_id_2 = filepanel.query('#hdn_user_id_2')[0].getValue();
            params.hwr_list = (this.handWriteMap == {}) ? '' : Ext.JSON.encode(this.handWriteMap);

            // onChange イベントから取得する情報。
            //
            // ミリ秒の削除。
            var timestamp = args.timeStamp / 1000;
            var val_name = args.target.name;

            // システムから取得する情報。
            var seq_no = SOP_TABLET.Globals.seq_no;
            // ミリ秒の削除。
            var requesttime = Math.round(new Date().getTime() / 1000);

            params.request_time = requesttime;
            params.seq_no = seq_no;
            params.val_name = val_name;
            params.update_time = timestamp;

            var inputs = Ext.urlDecode(Ext.Element.serializeForm(filepanel.down('formpanel').getId()));
            for (var name in inputs) {
                params[name] = inputs[name];
            }

            // Local Storage からデータの読み出し。
            var store = Ext.create('tablet.store.AutoSaveValStore');
            store.filter('val_name', val_name);
            store.load();

            // store のロード時に、val_name でフィルタ済み。
            store.each(function(record) {
                store.remove(record);
            });
            store.sync();

            var record = {
                val_name: val_name,
                requesttime: requesttime,
                seq_no: seq_no,
                params: params
            };
            store.add(record);
            store.sync();

            // 通し番号のインクリメント
            SOP_TABLET.Globals.seq_no++;

            if (params != null) {
                // ajax request;
                Ext.Ajax.request({
                    url: './src/auto_save.php',
                    params: params,
                    success: function(res, eopts) {
                        store.filter('val_name', val_name);
                        store.load();

                        // store のロード時に、val_name でフィルタ済み。
                        store.each(function(record) {
                            store.remove(record);
                        });
                        store.sync();

                        var result = Ext.decode(res.responseText);

                        filepanel.query('#hdn_div')[0].setValue(result.div);
                        filepanel.query('#hdn_file_id')[0].setValue(result.file_id);

                        var notification = filepanel.down('#notification');
                        clearTimeout(SOP_TABLET.Globals.notification_timer);
                        notification.setHtml(result.msg);
                        notification.show();

                        SOP_TABLET.Globals.notification_timer = setTimeout(function() {
                            notification.hide();
                        }, 3000);

                        var error_notification = filepanel.down('#error_notification');
                        error_notification.hide();
                    },
                    failure: function(res, eopts) {
                        var notification = filepanel.down('#notification');
                        notification.hide();

                        var error_notification = filepanel.down('#error_notification');
                        error_notification.setHtml('The data could not save to the server.<br />Please check to establish the connection to the network.'); // サーバにデータを保存できませんでした。<br />ネットワークに繋がっているかどうか確>認してください。
                        error_notification.show();
                    }
                });
            }

        },

        // オートセーブ リトライ
        autoSaveRetry: function() {
            // Local Storage からデータの読み出し。
            // こちらはリトライなので、全件
            var store = Ext.create('tablet.store.AutoSaveValStore');
            store.load();

            if (store.getCount() > 0) {
                var that = this;
                var main = Ext.ComponentQuery.query('main')[0];
                var filepanel = main.down('file-panel');

                store.each(function(record) {
                    params = record.raw.params;

                    // ajax request;
                    Ext.Ajax.request({
                        url: './src/auto_save.php',
                        params: params,
                        success: function(res, eopts) {
                            store.remove(record);
                            store.sync();

                            var result = Ext.decode(res.responseText);
                            // 入力中状態の時は、常に div の値が upd なので、都度書き換えOK
                            filepanel.query('#hdn_div')[0].setValue(result.div);
                            // ネットワーク断の場合、他の手順書は開けないので file_id も都度書き換える
                            filepanel.query('#hdn_file_id')[0].setValue(result.file_id);

                            var notification = filepanel.down('#notification');
                            clearTimeout(SOP_TABLET.Globals.notification_timer);
                            notification.setHtml(result.msg);
                            notification.show();

                            SOP_TABLET.Globals.notification_timer = setTimeout(function() {
                                notification.hide();
                            }, 5000);

                            var error_notification = filepanel.down('#error_notification');
                            error_notification.hide();
                        },
                        failure: function(res, eopts) {
                            var notification = filepanel.down('#notification');
                            notification.hide();

                            var error_notification = filepanel.down('#error_notification');
                            error_notification.setHtml('The data could not save to the server.<br />Please check to establish the connection to the network.'); // サーバにデータを保存できませんでした。<br />ネットワークに繋がっているかどう>か確認してください。
                            error_notification.show();
                        }
                    });
                });

                // 最終状態を同期
                store.sync();

            }
        }
    }
);
