<?php
/**
 * TronSick site data API — shared antibot, users, contest wagers (server-side)
 */
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$ADMIN_AUTH = 'TronSick@Admin2024';
$dataDir = __DIR__ . '/data';

if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

$usersFile   = $dataDir . '/users.json';
$antibotFile = $dataDir . '/antibot.json';
$contestFile = $dataDir . '/contest_wagers.json';

function readJson($file, $default = []) {
    if (!file_exists($file)) return $default;
    $data = json_decode(file_get_contents($file), true);
    return is_array($data) ? $data : $default;
}

function writeJson($file, $data) {
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);
}

function requireAdmin() {
    global $ADMIN_AUTH;
    $auth = $_POST['auth'] ?? $_GET['auth'] ?? '';
    if ($auth !== $ADMIN_AUTH) {
        http_response_code(403);
        echo json_encode(['ok' => false, 'error' => 'Unauthorized']);
        exit;
    }
}

$action = $_GET['action'] ?? $_POST['action'] ?? '';

switch ($action) {

    case 'get_antibot':
        $defaults = [
            'ab1_on' => '0', 'ab1_amount' => '0', 'ab1_mode' => 'medium',
            'ab2_on' => '0', 'ab2_amount' => '0', 'ab2_wins' => '6',
            'ab3_on' => '0'
        ];
        echo json_encode(['ok' => true, 'data' => array_merge($defaults, readJson($antibotFile, []))]);
        break;

    case 'save_antibot':
        requireAdmin();
        $keys = ['ab1_on','ab1_amount','ab1_mode','ab2_on','ab2_amount','ab2_wins','ab3_on'];
        $data = readJson($antibotFile, []);
        foreach ($keys as $k) {
            if (isset($_POST[$k])) $data[$k] = trim((string)$_POST[$k]);
        }
        writeJson($antibotFile, $data);
        echo json_encode(['ok' => true, 'saved' => array_keys($data)]);
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
                'id'     => 'u_' . preg_replace('/[^a-z0-9]/', '', strtolower($name)),
                'name'   => $name,
                'email'  => $email ?: ($name . '@tronsick.io'),
                'joined' => date('c'),
                'last_seen' => date('c')
            ];
        }
        writeJson($usersFile, $users);
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
        writeJson($contestFile, $wagers);
        echo json_encode(['ok' => true, 'wagers' => $wagers]);
        break;

    case 'set_contest_wagers':
        requireAdmin();
        $raw = $_POST['wagers'] ?? '{}';
        $wagers = json_decode($raw, true);
        if (!is_array($wagers)) $wagers = [];
        writeJson($contestFile, $wagers);
        echo json_encode(['ok' => true, 'wagers' => $wagers]);
        break;

    case 'remove_contest_entry':
        requireAdmin();
        $user = trim($_POST['user'] ?? '');
        $wagers = readJson($contestFile, []);
        unset($wagers[$user]);
        writeJson($contestFile, $wagers);
        echo json_encode(['ok' => true, 'wagers' => $wagers]);
        break;

    case 'reset_contest':
        requireAdmin();
        writeJson($contestFile, []);
        echo json_encode(['ok' => true, 'message' => 'Contest leaderboard cleared']);
        break;

    default:
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Unknown action']);
}
