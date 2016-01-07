<?php

namespace Sop;

use R;

class Form
{
    /**
     * 手順書のHTMLに入力フォームを注入する。
     *
     * @param string $html HTML
     * @param int    $tpl_id tpl_id
     * @param int    $file_id ユーザー入力値を設定したい場合に指定する。nullの場合、初期値は空になる。
     * @param int    $replace_special {%name%}などを置換するかどうか
     */
    public static function replaceFormInjectionTag($html, $tpl_id, $file_id = null, $replace_special = false)
    {
        // ----------------------------------------
        // 入力欄とデフォルト値の取得
        $sql = getSQLBaseForFormList();
        $sql .= " AND form.tpl_id = :tpl_id";
        $form_list = R::getAll($sql, array(':tpl_id' => $tpl_id));

        // 初期値の設定
        $initial_values = array();

        $vals = array();
        if ($file_id !== null) {
            $sql = getSQLBaseForValList();
            $vals = R::getAll($sql, array('file_id' => $file_id));
        }
        if (empty($vals)) {
            // 入力値が無い場合はデフォルト値を使用
            foreach ($form_list as $form) {
                $name = 'input_' . intval($form['form_id']);
                $value = $form['default_value'];

                if ($replace_special) {
                    // デフォルト値の場合、{%name%}などを置換する
                    $value = str_replace('{%name%}',  Session::getSiteData('user_name'), $value);
                    $value = str_replace('{%group%}', Session::getSiteData('grp_name'),  $value);
                    $value = str_replace('{%mail%}',  Session::getSiteData('email'),     $value);
                }

                $initial_values[$name] = $value;
            }
        } else {
            foreach ($vals as $v) {
                $initial_values[$v['val_name']] = $v['value'];
            }
        }

        // ----------------------------------------
        // 入力欄の追加

        $formhtml = '';

        foreach ($form_list as $form) {
            $top    = intval($form['y']);
            $left   = intval($form['x']);
            $width  = intval($form['width']);
            $height = intval($form['height']);
            $name = 'input_' . intval($form['form_id']);

            $formhtml .=
                '<div' .
                '  class="injected-input"' .
                '  style="z-index:999; display:none; position:absolute; top:0; left:0"' .
                '  data-original-top="' . $top . '"' .
                '  data-original-left="' . $left . '"' .
                '  >';

            switch ($form['type']) {
            case 'textbox':
                if ($height > 80) {
                    $formhtml .=
                        '<textarea' .
                        '  class="injected-input-resizable autosave"' .
                        '  style="font-size: 14px; outline: 3px solid #FA9500;"'.
                        '  name="' . $name . '"' .
                        '  data-original-width="' . $width . '"'.
                        '  data-original-height="' . $height . '"'.
                        '  />';
                    if (isset($initial_values[$name])) {
                        $formhtml .= htmlspecialchars($initial_values[$name]);
                    }
                    $formhtml .= '</textarea>';

                } else {
                    $formhtml .=
                        '<input' .
                        '  class="injected-input-resizable autosave"' .
                        '  style="font-size: 14px; outline: 3px solid #FA9500;"'.
                        '  name="' . $name . '"' .
                        '  value="' . (isset($initial_values[$name]) ? htmlspecialchars($initial_values[$name]) : '') . '"' .
                        '  data-original-width="' . $width . '"'.
                        '  data-original-height="' . $height . '"'.
                        '  />';
                }

                break;
            case 'checkbox':
                $formhtml .= '<input type="hidden"   name="' . $name . '" value="off" />';
                $formhtml .=
                    '<input' .
                    '  type="checkbox"' .
                    '  class="autosave"' .
                    '  name="' . $name . '"' .
                    '  value="on"' .
                    ((isset($initial_values[$name]) && $initial_values[$name] == 'on') ? 'checked="checked"' : '') .
                    '  data-original-width="' . $width . '"'.
                    '  data-original-height="' . $height . '"'.
                    '  style="outline: 3px solid #FA9500;"'.
                    '  />';
                break;
            }

            $formhtml .= '</div>';
        }

        return str_replace(Constant::FORM_INJECTION_TAG, $formhtml, $html);
    }
}
