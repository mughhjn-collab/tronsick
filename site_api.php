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

$usersFile     = $dataDir . '/users.json';
$antibotFile   = $dataDir . '/antibot.json';
$contestFile   = $dataDir . '/contest_wagers.json';
$settingsFile  = $dataDir . '/site_settings.json';
$payoutsFile   = $dataDir . '/gen_payouts.json';

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

    case 'get_balance':
        // Public endpoint: get user balance by username
        \ = trim(\['name'] ?? \['name'] ?? '');
        if(!\){ echo json_encode(['ok'=>false,'error'=>'Missing name']); break; }
        \ = readJson(\, []);
        \ = null;
        foreach(\ as \){
            if(strcasecmp(\['name'] ?? '', \) === 0){ \ = \; break; }
        }
        if(\){
            echo json_encode(['ok'=>true,'balance'=>\['balance']??'0','level'=>\['level']??'Stone','ref_commission'=>\['ref_commission']??5]);
        } else {
            echo json_encode(['ok'=>false,'error'=>'User not found']);
        }
        break;

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

    case 'get_site_settings':
        $stored = readJson($settingsFile, []);
        $configured = isset($stored['_saved']) && ($stored['_saved'] === '1' || $stored['_saved'] === 1);
        echo json_encode(['ok' => true, 'configured' => $configured, 'settings' => $stored]);
        break;

    case 'save_site_settings':
        requireAdmin();
        $data = readJson($settingsFile, []);
        if (isset($_POST['settings'])) {
            $incoming = json_decode($_POST['settings'], true);
            if (is_array($incoming)) {
                foreach ($incoming as $k => $v) {
                    if (strpos($k, '_') !== 0) $data[$k] = is_scalar($v) ? trim((string)$v) : $v;
                }
            }
        }
        foreach ($_POST as $k => $v) {
            if (in_array($k, ['action', 'auth', 'settings'], true)) continue;
            if (strpos($k, '_') === 0) continue;
            $data[$k] = trim((string)$v);
        }
        $data['_saved'] = '1';
        $data['_updated'] = date('c');
        if (!writeJson($settingsFile, $data)) {
            jsonFail('Cannot write site settings. Check data/ folder permissions.');
        }
        echo json_encode(['ok' => true, 'settings' => $data]);
        break;

    case 'get_gen_payouts':
        $payouts = readJson($payoutsFile, []);
        if (!is_array($payouts)) $payouts = [];
        echo json_encode(['ok' => true, 'payouts' => $payouts]);
        break;

    case 'add_gen_payout':
        requireAdmin();
        $raw = $_POST['payout'] ?? '';
        $p = json_decode($raw, true);
        if (!is_array($p) || empty($p['username']) || empty($p['txid'])) {
            jsonFail('Invalid payout data', 400);
        }
        $payouts = readJson($payoutsFile, []);
        if (!is_array($payouts)) $payouts = [];
        $payouts[] = [
            'id'       => $p['id'] ?? ('pg' . time()),
            'username' => trim($p['username']),
            'amount'   => (string)$p['amount'],
            'txid'     => trim($p['txid']),
            'address'  => trim($p['address'] ?? ''),
            'date'     => $p['date'] ?? date('c')
        ];
        if (!writeJson($payoutsFile, $payouts)) {
            jsonFail('Cannot write payouts file.');
        }
        echo json_encode(['ok' => true, 'payouts' => $payouts]);
        break;

    case 'set_gen_payouts':
        requireAdmin();
        $raw = $_POST['payouts'] ?? '[]';
        $payouts = json_decode($raw, true);
        if (!is_array($payouts)) $payouts = [];
        if (!writeJson($payoutsFile, $payouts)) {
            jsonFail('Cannot write payouts file.');
        }
        echo json_encode(['ok' => true, 'payouts' => $payouts]);
        break;

    case 'clear_gen_payouts':
        requireAdmin();
        if (!writeJson($payoutsFile, [])) {
            jsonFail('Cannot clear payouts file.');
        }
        echo json_encode(['ok' => true, 'payouts' => []]);
        break;


    case 'update_user_balance':
        requireAdmin();
        $name    = trim($_POST['name'] ?? '');
        $balance = (string)floatval($_POST['balance'] ?? 0);
        $email   = trim($_POST['email'] ?? '');
        if(!$name){ jsonFail('Missing username', 400); }
        $users = readJson($usersFile, []);
        $found = false;
        foreach($users as &$u){
            if(strcasecmp($u['name'] ?? '', $name) === 0){
                $u['balance'] = $balance;
                if($email) $u['email'] = $email;
                $level_post = trim($_POST['level'] ?? '');
                $ref_comm_post = isset($_POST['ref_commission']) ? $_POST['ref_commission'] : null;
                if($level_post) $u['level'] = $level_post;
                if($ref_comm_post !== null) $u['ref_commission'] = floatval($ref_comm_post);
                $u['balance_updated'] = date('c');
                $found = true;
                break;
            }
        }
        unset($u);
        if(!$found){
            // Create user record if doesn't exist
            $users[] = [
                'id'      => 'u_'.preg_replace('/[^a-z0-9]/', '', strtolower($name)),
                'name'    => $name,
                'email'   => $email ?: ($name.'@tronsick.io'),
                'balance' => $balance,
                'joined'  => date('c'),
                'balance_updated' => date('c')
            ];
        }
        if(!writeJson($usersFile, $users)){
            jsonFail('Cannot write users file.');
        }
        echo json_encode(['ok' => true, 'name' => $name, 'balance' => $balance]);
        break;

    default:
        jsonFail('Unknown action', 400);
}
