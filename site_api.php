<?php
/**
 * TronSick site data API — antibot, users, contest wagers
 */
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$ADMIN_AUTH = 'TronSick@Admin2024';
$dataDir = __DIR__ . '/data';

if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0755, true);
}

$usersFile   = $dataDir . '/users.json';
$antibotFile = $dataDir . '/antibot.json';
$contestFile = $dataDir . '/contest_wagers.json';

function readJson($file, $default = []) {
    if (!file_exists($file)) return $default;
    $raw = @file_get_contents($file);
    if ($raw === false || $raw === '') return $default;
    $data = json_decode($raw, true);
    return is_array($data) ? $data : $default;
}

function writeJson($file, $data) {
    $dir = dirname($file);
    if (!is_dir($dir)) {
        if (!@mkdir($dir, 0755, true)) {
            return false;
        }
    }
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    $ok = @file_put_contents($file, $json, LOCK_EX);
    return $ok !== false;
}

function jsonFail($msg, $code = 500) {
    http_response_code($code);
    echo json_encode(['ok' => false, 'error' => $msg]);
    exit;
}

function requireAdmin() {
    global $ADMIN_AUTH;
    $auth = $_POST['auth'] ?? $_GET['auth'] ?? '';
    if ($auth !== $ADMIN_AUTH) {
        jsonFail('Unauthorized', 403);
    }
}

$action = $_GET['action'] ?? $_POST['action'] ?? '';

switch ($action) {

    case 'get_antibot':
        $stored = readJson($antibotFile, []);
        $configured = isset($stored['_saved']) && ($stored['_saved'] === '1' || $stored['_saved'] === 1);
        echo json_encode([
            'ok' => true,
            'configured' => $configured,
            'data' => $stored
        ]);
        break;

    case 'save_antibot':
        requireAdmin();
        $keys = ['ab1_on','ab1_amount','ab1_mode','ab2_on','ab2_amount','ab2_wins','ab3_on'];
        $data = readJson($antibotFile, []);
        foreach ($keys as $k) {
            if (isset($_POST[$k])) {
                $data[$k] = trim((string)$_POST[$k]);
            }
        }
        $data['_saved'] = '1';
        $data['_updated'] = date('c');
        if (!writeJson($antibotFile, $data)) {
            jsonFail('Cannot write antibot settings. Check data/ folder permissions on server.');
        }
        echo json_encode(['ok' => true, 'data' => $data]);
        break;

    case 'register_user':
        $name  = trim($_POST['name'] ?? '');
        $email = trim($_POST['email'] ?? '');
        if (strlen($name) < 3) {
            echo json_encode(['ok' => false, 'error' => 'Invalid username']);
            break;
        }
        $users = readJson($usersFile, []);
        $found = false;
        foreach ($users as &$u) {
            if (strcasecmp($u['name'] ?? '', $name) === 0) {
                if ($email) $u['email'] = $email;
                $u['last_seen'] = date('c');
                $found = true;
                break;
            }
        }
        unset($u);
        if (!$found) {
            $users[] = [
                'id'        => 'u_' . preg_replace('/[^a-z0-9]/', '', strtolower($name)),
                'name'      => $name,
                'email'     => $email ?: ($name . '@tronsick.io'),
                'joined'    => date('c'),
                'last_seen' => date('c')
            ];
        }
        if (!writeJson($usersFile, $users)) {
            jsonFail('Cannot write users file.');
        }
        echo json_encode(['ok' => true, 'count' => count($users)]);
        break;

    case 'get_users':
        requireAdmin();
        $users = readJson($usersFile, []);
        echo json_encode(['ok' => true, 'users' => $users, 'count' => count($users)]);
        break;

    case 'get_user_count':
        $users = readJson($usersFile, []);
        echo json_encode(['ok' => true, 'count' => count($users)]);
        break;

    case 'get_contest_wagers':
        $wagers = readJson($contestFile, []);
        unset($wagers['_meta']);
        echo json_encode(['ok' => true, 'wagers' => $wagers]);
        break;

    case 'add_contest_wager':
        $user   = trim($_POST['user'] ?? '');
        $amount = floatval($_POST['amount'] ?? 0);
        if (!$user || $amount <= 0) {
            echo json_encode(['ok' => false, 'error' => 'Invalid wager']);
            break;
        }
        $wagers = readJson($contestFile, []);
        $wagers[$user] = round((floatval($wagers[$user] ?? 0) + $amount), 6);
        if (!writeJson($contestFile, $wagers)) {
            jsonFail('Cannot write contest wagers.');
        }
        echo json_encode(['ok' => true, 'wagers' => $wagers]);
        break;

    case 'set_contest_wagers':
        requireAdmin();
        $raw = $_POST['wagers'] ?? '{}';
        $wagers = json_decode($raw, true);
        if (!is_array($wagers)) $wagers = [];
        if (!writeJson($contestFile, $wagers)) {
            jsonFail('Cannot write contest wagers.');
        }
        echo json_encode(['ok' => true, 'wagers' => $wagers]);
        break;

    case 'remove_contest_entry':
        requireAdmin();
        $user = trim($_POST['user'] ?? '');
        $wagers = readJson($contestFile, []);
        unset($wagers[$user]);
        if (!writeJson($contestFile, $wagers)) {
            jsonFail('Cannot write contest wagers.');
        }
        echo json_encode(['ok' => true, 'wagers' => $wagers]);
        break;

    case 'reset_contest':
        requireAdmin();
        if (!writeJson($contestFile, [])) {
            jsonFail('Cannot reset contest wagers.');
        }
        echo json_encode(['ok' => true, 'message' => 'Contest leaderboard cleared', 'wagers' => []]);
        break;

    default:
        jsonFail('Unknown action', 400);
}
