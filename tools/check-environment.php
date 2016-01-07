<?php

if (! function_exists('openssl_random_pseudo_bytes')) {
    print 'WARNING: php-openid-connect-client use insecure state hash' . "\n";
    exit(1);
}

print 'check-environment: OK' . "\n";
