<?php
if (session_status() === PHP_SESSION_NONE) {
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
