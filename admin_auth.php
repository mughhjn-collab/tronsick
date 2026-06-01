<?php
/**
 * Staff / admin login — server session (not /admin URL)
 */
require_once __DIR__ . '/admin/session.php';
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$settingsFile = __DIR__ . '/data/site_settings.json';
$settings = [];
if (is_file($settingsFile)) {
    $settings = json_decode(file_get_contents($settingsFile), true) ?: [];
}

$user = trim($_POST['user'] ?? '');
$pass = (string)($_POST['pass'] ?? '');
$validUser = $settings['admin_user'] ?? $settings['adminUser'] ?? 'admin';
$validPass = $settings['admin_pass'] ?? $settings['adminPass'] ?? 'TronSick@2024';

if ($user === $validUser && $pass === $validPass) {
    $_SESSION['admin_auth'] = bin2hex(random_bytes(16));
    $_SESSION['admin_user'] = $user;
    $_SESSION['admin_login'] = time();
    echo json_encode(['ok' => true]);
    exit;
}

http_response_code(403);
echo json_encode(['ok' => false, 'error' => 'Invalid username or password']);
