Ext.define('sop.common.InkTool', {
    statics: {
        // 文字認識用
        hw_flg: false,

        // 文字認識用
        trgt_item_Id: '',

        initialize: function() {
            InkTool.InkRecogLib.setServerURL("http://localhost:8080/InkLetterRecognizer/Mark"); // 文字認識サーバーのURLを設定
            InkTool.InkRecogLib.recogTry = 0;
            InkTool.InkRecogLib.recogInterval = 5000;
            InkTool.InkRecogLib.setRecognizeTime(1000);
        },

        setupMyFep: function() {
            var palette = InkTool.InkRecogLib.getRecogPalette('inkfep');
            if (palette == null) {
                var pen = new InkTool.InkBallpointPen();
                pen.setPenWidth(3);
                pen.setPenColor(new InkTool.InkColor('#000000'));

                palette = InkTool.InkRecogLib.createEmbeddedRecogPalette('inkfep', ['fepCan']);
                palette.setPen(pen);
            }
        },

        getMyFep: function() {
            var palette = InkTool.InkRecogLib.getRecogPalette('inkfep');
            if (palette == null) {
                return null;
            }

            var writtenText = palette.getText();
            palette.clearPalette();

            return writtenText;
        },

        setupMyInk: function() {
            var canvas = InkTool.InkCanvasLib.getCanvas('inktool');
            if (canvas == null) {
                var pen = new InkTool.InkBallpointPen();
                pen.setPenWidth(5);
                pen.setPenColor(new InkTool.InkColor('#000000'));

                canvas = InkTool.InkCanvasLib.createCanvas('inktool');
                canvas.setPen(pen);
            }
        },

        saveMyInk: function() {
            var canvas = InkTool.InkCanvasLib.getCanvas('inktool');
            if (canvas != null) {
                return canvas.saveInk();
            } else {
                return null;
            }
        },

        saveImageMyInk: function() {
            var canvas = InkTool.InkCanvasLib.getCanvas('inktool');
            if (canvas != null) {
                return canvas.saveImage();
            } else {
                return '';
            }
        },

        clearMyInk: function() {
            var canvas = InkTool.InkCanvasLib.getCanvas('inktool');
            if (canvas != null) {
                canvas.clearInk();
            }
        },

        undoMyInk: function() {
            var canvas = InkTool.InkCanvasLib.getCanvas('inktool');
            if (canvas != null) {
                canvas.undoInk();
            }
        },

        redoMyInk: function() {
            var canvas = InkTool.InkCanvasLib.getCanvas('inktool');
            if (canvas != null) {
                canvas.redoInk();
            }
        },

        loadMyInk: function(ink) {
            var canvas = InkTool.InkCanvasLib.getCanvas('inktool');
            if (canvas != null) {
                canvas.loadInk(ink);
            }
        },

        loadMyInk: function(ink) {
            var canvas = InkTool.InkCanvasLib.getCanvas('inktool');
            if (canvas != null) {
                canvas.loadInk(ink);
            }
        },

        setReadOnly: function(isReadOnly) {
            var canvas = InkTool.InkCanvasLib.getCanvas('inktool');
            if (canvas != null) {
                canvas.setDrawingMode(isReadOnly ? 0 : 1);
            }
        },

        totalStrokeCells: function() {
            var count = 0;
            var canvas = InkTool.InkCanvasLib.getCanvas('inktool');
            if (canvas != null) {
                var drawing = canvas.currentDrawing;
                if (drawing != null) {
                    var length = drawing.countDrawItems();
                    for (var i = 0; i < length; ++i) {
                        var stroke = drawing.getDrawItem(i);
                        count += stroke.countCells();
                    }
                }
            }
            return count;
        },

        limitTimerId: null,

        // 1000ストロークで、描写データのjsonの文字列長が45000程度。
        // 文字列超が65000を超えると動作が不安定になったり、
        // サーバに保存したデータが取り出せなくなるので、
        // 1000ストロークまでに制限する。
        limitCount: 1000,

        limitTotalStrokeCells: function(component) {
            var canvas = InkTool.InkCanvasLib.getCanvas('inktool');
            if (canvas != null) {
                var drawingMode = canvas.getDrawingMode();
                var label = component.down('#inktool-panel-total-stroke-cells');
                var update_label = function(total) {
                    if (drawingMode == 1) {
                        if (label) {
                            if (total < sop.common.InkTool.limitCount) {
                                label.setHtml('Num. of dots ' + total + '/' + sop.common.InkTool.limitCount); // 頂点数 
                            } else {
                                label.setHtml('<span style="color: red">You cannot write in a pixel any more.</span>'); // '<span style="color: red">これ以上>    書き込めません。</span>
                            }
                        }
                    } else {
                        label.setHtml('View mode'); //
                    }
                };
                update_label(sop.common.InkTool.totalStrokeCells());

                // リードオンリーのときは何もしない
                if (drawingMode == 1) {
                    var interval = 500; // 500ms

                    sop.common.InkTool.limitTimerId = setInterval(function() {
                        if ((component.isVisible && ! component.isVisible()) ||
                            (component.isHidden && component.isHidden())) {
                            clearInterval(sop.common.InkTool.limitTimerId);
                        }

                        var total = sop.common.InkTool.totalStrokeCells();
                        update_label(total);

                        if (total > sop.common.InkTool.limitCount) {
                            sop.common.InkTool.setReadOnly(true);
                        } else {
                            sop.common.InkTool.setReadOnly(false);
                        }

                    }, interval);
                }
            }
        }
    }
});
