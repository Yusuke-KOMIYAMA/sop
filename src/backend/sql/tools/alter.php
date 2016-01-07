<?php

require_once __DIR__ . '/../../src/bootstrap.php';

\Sop\Database::setupRedBean();
R::freeze(false);

// ============================================================
// check schema version

$version = 0;
$entity = R::findOne('alters', 'ORDER BY `version` DESC');
if ($entity) {
    $version = $entity->version;
}

print "Current version: " . $version . "\n";

// ============================================================
// apply alters

foreach (glob(__DIR__ . '/../alters/*') as $alterfilepath) {
    $basename = basename($alterfilepath, '.php');
    $v = intval($basename);
    if ($v > $version) {
        print "Applying {$alterfilepath}.\n";

        R::begin();

        try {
            $className = 'Alters1418625556_' . $v;
            $code =
            'class ' . $className . ' { '. "\n" .
            preg_replace('/^<\?php/', '', file_get_contents($alterfilepath), 1) . "\n" .
            '}' . "\n" .
            $className . '::apply();' . "\n";
            eval($code);

            $entity = R::dispense('alters');
            $entity->version = $v;
            $entity->applied_date = date('c');
            R::store($entity);

            R::commit();

        } catch (Exception $e) {
            print $e->getMessage() . "\n";
            R::rollback();
            exit(1);
        }
    }
}
