<?php
include_once(__DIR__."/login_check.php");
include_once(__DIR__."/config.php");
include_once(__DIR__."/../../src/db_common.php");

\Sop\Database::setupRedBean();

/**
 * PDF ファイル 作成
 */
$db = createDBConnection();

// ---------------------------
// parameters 取得
// ---------------------------
$grp_id  = \Sop\Session::getSiteData('grp_id');
$user_id = \Sop\Session::getSiteData('user_id');

$div = (array_key_exists('div', $_REQUEST)) ? $_REQUEST['div'] : '';
$smpl_given_no = (array_key_exists('smpl_given_no', $_REQUEST)) ? $_REQUEST['smpl_given_no'] : '';
$pj_id = (array_key_exists('pj_id', $_REQUEST)) ? $_REQUEST['pj_id'] : '';
$sop_id = (array_key_exists('sop_id', $_REQUEST)) ? $_REQUEST['sop_id'] : '';
$tpl_id = (array_key_exists('tpl_id', $_REQUEST)) ? $_REQUEST['tpl_id'] : '';
$schema_id = (array_key_exists('schema_id', $_REQUEST)) ? $_REQUEST['schema_id'] : '';
$schema_type = (array_key_exists('schema_type', $_REQUEST)) ? $_REQUEST['schema_type'] : '';
$file_id = (array_key_exists('file_id', $_REQUEST)) ? $_REQUEST['file_id'] : '';

// file_idが指定されていない場合はその他の情報から補間する
// （初回入力時にはfile_idが空の場合がある）
if (! $file_id) {
    $file = R::getRow(getSQLBaseForFileList() .
                      ' AND file.pj_id         = ?' .
                      ' AND file.sop_id        = ?' .
                      ' AND file.tpl_id        = ?' .
                      ' AND file.schema_id     = ?' .
                      ' AND file.schema_type   = ?' .
                      ' AND file.smpl_given_no = ?',
                      array($pj_id, $sop_id, $tpl_id, $schema_id, $schema_type, $smpl_given_no));
    $file_id = $file['file_id'];
}

// ---------------------------
// HTML 作成
// ---------------------------
$html_list = array();

// --- schema 取得
$sql = getSQLBaseForSchemaList();
$sql .= " AND schema.schema_id = :schema_id";

$params = array();
$params[':schema_id'] = $schema_id;

$stmt = $db->prepare($sql);
$stmt->execute($params);

$schema = null;
foreach($stmt->fetchAll(PDO::FETCH_ASSOC) as $row){
    $schema = $row;
}

// ----------------------------------------
//手書きパネル情報取得
//複数個の手書きパネルがある場合、高さでソートする。
$sql = getSQLBaseForFilehwrList();
$sql .= " AND file_hwr.file_id = :file_id ORDER BY mark_position_y ASC";

$params = array();
$params[':file_id'] = $file_id;

$stmt = $db->prepare($sql);
$stmt->execute($params);

$fileHwrList = $stmt->fetchAll(PDO::FETCH_ASSOC);

// 空のファイルを無視する。
foreach($fileHwrList as $k => $row) {
    $hwr_id = $row['hwr_id'];

    //画像のパスの取得
    $png_file_path = $DATA_DIR_PATH_HWR . '/' . $file_id . '_'  . $hwr_id . '.png';

    if (file_exists($png_file_path)
        && $hwr_id != ''
        && filesize($png_file_path) != 0
        && ! isPngValidButBlank($png_file_path)) {
        // 採用
    } else {
        unset($fileHwrList[$k]);
    }
}

// ----------------------------------------
// --- SOP Image 版
if($schema_type == $SCHEMA_TYPE_SRC)
{
    $file_path = $schema['file_path'];
    $file_path = str_replace('.html', '.entire.html', $file_path);

    $head_flg = false;
    $html = "";
    foreach(file($file_path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $lineNo => $line)
    {
        $edit_line = $line;

        if(strpos($edit_line, '</head>') !== false) $head_flg = false; // header終了 </head>は追加するためこの場所

        if($head_flg) continue;

        if(!$head_flg) // <head>～</head>があるとPDFに謎の改行が入るため、除外
        {
            if(strpos($edit_line, "style='") !== false) // style='...' を除去
            {
                $tmp = explode("style='", $edit_line);
                $pos = strpos($tmp[1], "'");
                $tmp = substr($tmp[1], 0, $pos);
                $edit_line = str_replace("style='{$tmp}'", '', $edit_line);
            }
            if(strpos($edit_line, "style=\"") !== false) // style="..." を除去
            {
                $tmp = explode("style=\"", $edit_line);
                $pos = strpos($tmp[1], "\"");
                $tmp = substr($tmp[1], 0, $pos);
                $edit_line = str_replace("style=\"{$tmp}\"", '', $edit_line);
            }

            $html .= $edit_line;
        }

        if(strpos($edit_line, '<head') !== false) $head_flg = true; // header開始 <head>は追加するためこの場所
    }

    //手書きパネル
    $count = 1;

    foreach($fileHwrList as $row)
    {
        $hwr_id = $row['hwr_id'];

        //画像のパスの取得
        $png_file_path = $DATA_DIR_PATH_HWR . '/' . $file_id . '_'  . $hwr_id . '.png';

        $html .= $PAGE_BREAK_TAG;
        $html .= '<div>NOTE ' . $count . '</div>';
        $html .= '<img src="'. $png_file_path .'" />';

        $count++;
    }

    $html = str_replace('border=0', 'border=1', $html);

    $html_list = explode($PAGE_BREAK_TAG, $html);
}

// --- Excel 版
if($schema_type == $SCHEMA_TYPE_TBL)
{
    $html = str_replace(array("\r\n", "\r", "\n", "\t"), '', getSchemaHtmlForPdf($db, $schema_id, $div, $file_id));
    array_push($html_list, $html);

    //手書きパネル（Excelの場合は一つしかないので、番号はふらなくて良い）
    foreach($fileHwrList as $row) {
        $hwr_id = $row['hwr_id'];

        $png_file_path = $DATA_DIR_PATH_HWR . '/' . $file_id . '_'  . $hwr_id . '.png';

        array_push($html_list, '<img src="'. $png_file_path .'" />');
    }
}

// ---------------------------
// PDF ファイル 作成
// ---------------------------
include_once(__DIR__."/mpdf/mpdf.php");

$pdf_path = $DATA_DIR_PATH_TMP . '/' . sha1('{$smpl_given_no}_{$pj_id}_{$sop_id}_{$tpl_id}_{$schema_id}') . '.pdf';

$mpdf=new mPDF('ja', 'A4', '', '', 0, 0, 0, 0, 0, 0);
$page_top = 0;
$page_bottom = 0;
$mm_per_inch = 25.4; //1インチは25.4mm

//$convertUnit = $mpdf->img_dpi;
$convertUnit = 150;

$hwr_mark_count = 1;

foreach($html_list as $idx=>$html)
{
    if($idx > 0) $mpdf->AddPage();

    $mpdf->WriteHTML($html);

    $page_top    = round((297 * $convertUnit * $idx) / $mm_per_inch);
    $page_bottom = round((297 * $convertUnit * ($idx + 1)) / $mm_per_inch);

    $sel_sql = getSQLBaseForFormList();
    $sel_sql .= ' AND tpl_id = :tpl_id AND y BETWEEN :page_top AND :page_bottom';

    $results = R::getAll($sel_sql, array(':tpl_id' => $tpl_id, ':page_top' => $page_top, ':page_bottom' => $page_bottom));

    foreach ($results as $form) {

        $valName = 'input_'.$form['form_id'];
        $sql = getSQLBaseForValList();
        $sql .= " AND val_name = :val_name";
        $sql .= " LIMIT 1";

        $row = R::getRow($sql, array(':file_id' => $file_id, ':val_name' => $valName));

        if ($row) {
            if($schema_type == $SCHEMA_TYPE_SRC)
            {
                //pixel→mm変換
                $vertical_mm = round((($form['y'] - $page_top) / $convertUnit) * $mm_per_inch);
                $horizontal_mm  = round(($form['x'] / $convertUnit) * $mm_per_inch);


                if ($form['type'] == 'checkbox'){
                    if($row['value'] == 'on'){
                        $mpdf->Image(\Sop\Resource::getImageFilePath('checkbox_on.png'),
                                     $horizontal_mm - 2,
                                     $vertical_mm - 2.4,
                                     3,
                                     3,
                                     'png');
                    } else {
                        $mpdf->Image(\Sop\Resource::getImageFilePath('checkbox_off.png'),
                                     $horizontal_mm - 2,
                                     $vertical_mm - 2.4,
                                     3,
                                     3,
                                     'png');
                    }
                } else{

                    $width_mm = round(($form['width'] / $convertUnit) * $mm_per_inch);
                    $height_mm = \Sop\Constant::PDF_MULTICELL_RIGHT; //一行の高さ

                    $mpdf->SetXY($horizontal_mm, $vertical_mm);
                    $mpdf->MultiCell($width_mm, $height_mm, $row['value'], 0);
                }
            }
        }
    }

    if ($schema_type == $SCHEMA_TYPE_SRC) {
        $mark_position_x = 1150;
        //pixel→mm変換
        $horizontal_mm  = round(($mark_position_x / $convertUnit) * $mm_per_inch);

        foreach ($fileHwrList as $row){
            $mark_position_y = $row['mark_position_y'];

            if($page_top <= $mark_position_y && $mark_position_y < $page_bottom){
                //pixel→mm変換
                $vertical_mm = round((($mark_position_y - $page_top) / $convertUnit) * $mm_per_inch);

                $width_mm = round((250 / $convertUnit) * $mm_per_inch);
                $height_mm = \Sop\Constant::PDF_MULTICELL_RIGHT; //一行の高さ

                $mpdf->SetTextColor(128, 128, 128);
                $mpdf->SetFontSize(8);
                $mpdf->SetXY($horizontal_mm, $vertical_mm);
                $mpdf->MultiCell($width_mm, $height_mm, 'NOTE ' . $hwr_mark_count, 0);
                $mpdf->SetTextColor(0, 0, 0);

                $hwr_mark_count++;
            }
        }
    }

}



$mpdf->Output($pdf_path, 'F');

$db = null;

$file_name = "{$smpl_given_no}_{$pj_id}_{$sop_id}_{$tpl_id}_{$schema_id}.pdf";
$file_path = $DATA_DIR_PATH_TMP . '/' . sha1('{$smpl_given_no}_{$pj_id}_{$sop_id}_{$tpl_id}_{$schema_id}') . '.pdf';

// ---------------------------
// PDF ダウンロード
// ---------------------------
header('Content-Description: File Transfer');
header('Content-Type: application/pdf');
header('Content-Disposition: attachment; filename='.$file_name);
header('Cache-Control: no-cache');
header('Pragma: no-cache');
header('Content-Length: '.filesize($file_path));
ob_clean();
flush();
readfile($file_path);
unlink($file_path);

exit;


// ---------------------------
// pngファイルの中身がblankかどうかのチェック:　blankの場合falseが返る
// ---------------------------
function isPngValidButBlank($filename) {
    $img = imagecreatefrompng($filename);
    if(!$img)
        return false;
    $width  = imagesx($img);
    $height = imagesy($img);
    if(!$width || !$height)
        return false;
    $firstcolor = imagecolorat($img, 0, 0);
    for($i = 0; $i < $width; $i++) {
        for($j = 0; $j < $height; $j++) {
            $color = imagecolorat($img, $i, $j);
            if($color != $firstcolor)
                return false;
        }
    }
    return true;
}
