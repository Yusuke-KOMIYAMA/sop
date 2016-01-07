<?php

namespace Sop;

class Constant
{
    const FILE_STATUS_NOT             = 0; // 未入力
    const FILE_STATUS_INP             = 1; // 入力中
    const FILE_STATUS_PROVISIONAL_FIX = 2; // 作業完了(証人待ち)
    const FILE_STATUS_RE              = 3; // 再入力
    const FILE_STATUS_FIX             = 4; // 作業完了

    const APRV_FLG_NG  = 0; // 未承認
    const APRV_FLG_OK  = 1; // 承認
    const APRV_FLG_RTN = 2; // 差戻し
    const APRV_FLG_RE  = 3; // 再申請
    const APRV_FLG_PRE = 4; // 入力中状態

    const FORM_INJECTION_TAG = '<!-- FORM_INJECTION_TAG -->';

    const PDF_MULTICELL_RIGHT = 4; //pdf出力時のテキストの行の高さ(mm)
}
