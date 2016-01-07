<?php //-*- Mode: php; indent-tabs-mode: nil; Coding: utf-8; -*-

// 特定のディレクトリを効率良くスキップするため、
// RecursiveDirectoryIterator ではなく再帰関数を用いる

// ディレクトリについて chmod 0755 を、
// ファイルについて chmod 0644 を実行する。
// ただし、*.sh については 0755

function setpermission($path) {
    foreach (new DirectoryIterator($path) as $child) {
        if ($child->isDot()) continue;

        $childpath = $child->getPathname();
        $basename  = $child->getFilename();

        if ($child->isFile()) {
            if (preg_match('/\.sh$/', $childpath)) {
                chmod($childpath, 0755);
            } else {
                chmod($childpath, 0644);
            }

        } elseif ($child->isDir()) {
            if (preg_match('%web/uploaded_files/file$%', $childpath) ||
                preg_match('%web/uploaded_files/hwr$%', $childpath) ||
                preg_match('%web/uploaded_files/tmp$%', $childpath)) {
                chmod($childpath, 0777);
            } else if (! preg_match('/^\.git$/', $basename) &&
                       ! preg_match('/^\.vagrant$/', $basename)) {
                chmod($childpath, 0755);
                setpermission($childpath);
            }
        }
    }
}
setpermission(dirname(__FILE__) . DIRECTORY_SEPARATOR . '..');
