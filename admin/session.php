<?php
if (session_status() === PHP_SESSION_NONE) {
    $isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https');
    if (PHP_VERSION_ID >= 70300) {
        session_set_cookie_params([
            'lifetime' => 86400,
            'path'     => '/',
            'secure'   => $isHttps,
            'httponly' => true,
            'samesite' => 'Lax',
        ]);
    } else {
        session_set_cookie_params(86400, '/; samesite=Lax', '', $isHttps, true);
    }
    session_start();
}

function adminIsLoggedIn() {
    return !empty($_SESSION['admin_auth']);
}

function adminRequireLogin() {
    if (!adminIsLoggedIn()) {
        header('Location: /login.php?staff=1');
        exit;
    }
}
