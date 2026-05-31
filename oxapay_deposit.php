<?php
/**
 * OxaPay Deposit Backend
 * Creates a static TRX wallet address per user via OxaPay API
 * Returns JSON: {success, address, qr_url, error}
 */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// ── CONFIG ────────────────────────────────────────────
define('OXAPAY_MERCHANT_KEY', 'B5CXIY-CK6Z0Y-NKKTI7-JR6C1N');
define('OXAPAY_API_URL', 'https://api.oxapay.com/v1/payment/static-address');
define('SITE_URL', 'https://tronsick.io');
define('DEPOSIT_FILE', __DIR__ . '/deposits.json');
// ──────────────────────────────────────────────────────

// Read merchant key from admin settings file
$adminKey = '';
$keysFile = __DIR__ . '/admin_keys.json';
if(file_exists($keysFile)){
    $keys = json_decode(file_get_contents($keysFile), true);
    $adminKey = $keys['oxa_key'] ?? OXAPAY_MERCHANT_KEY;
}
// Fallback: check POST param (for testing)
if(!$adminKey && isset($_POST['key'])) $adminKey = trim($_POST['key']);

if(empty($adminKey)){
    echo json_encode(['success'=>false,'error'=>'OxaPay API key not configured. Set it in Admin → Payment Gateway.']);
    exit;
}

$user   = trim($_GET['user']  ?? $_POST['user']  ?? 'guest');
$email  = trim($_GET['email'] ?? $_POST['email'] ?? 'user@tronsick.io');
$userId = preg_replace('/[^a-zA-Z0-9_-]/', '', $user);

// Check if this user already has a saved address
$depositData = [];
if(file_exists(DEPOSIT_FILE)){
    $depositData = json_decode(file_get_contents(DEPOSIT_FILE), true) ?: [];
}
if(isset($depositData[$userId]['address'])){
    $addr = $depositData[$userId]['address'];
    echo json_encode([
        'success'  => true,
        'address'  => $addr,
        'qr_url'   => 'https://api.qrserver.com/v1/create-qr-code/?size=160x160&data='.urlencode($addr),
        'cached'   => true
    ]);
    exit;
}

// Create new static address via OxaPay
$payload = json_encode([
    'currency'    => 'TRX',
    'network'     => 'TRX',
    'callbackUrl' => SITE_URL . '/oxapay_webhook.php',
    'email'       => $email,
    'orderId'     => 'TSK_' . $userId . '_' . time()
]);

$ch = curl_init(OXAPAY_API_URL);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'merchant_api_key: ' . $adminKey
    ],
    CURLOPT_TIMEOUT        => 15,
    CURLOPT_SSL_VERIFYPEER => true
]);
$resp = curl_exec($ch);
$err  = curl_error($ch);
curl_close($ch);

if($err){
    echo json_encode(['success'=>false,'error'=>'cURL error: '.$err]);
    exit;
}

$data = json_decode($resp, true);
if(!$data){
    echo json_encode(['success'=>false,'error'=>'Invalid API response','raw'=>substr($resp,0,200)]);
    exit;
}

if(isset($data['result']) && $data['result'] === 'ok' && isset($data['data']['address'])){
    $addr = $data['data']['address'];
    // Save to deposits file
    $depositData[$userId] = [
        'address'  => $addr,
        'email'    => $email,
        'created'  => time(),
        'balance'  => 0
    ];
    file_put_contents(DEPOSIT_FILE, json_encode($depositData, JSON_PRETTY_PRINT));

    echo json_encode([
        'success' => true,
        'address' => $addr,
        'qr_url'  => 'https://api.qrserver.com/v1/create-qr-code/?size=160x160&data='.urlencode($addr)
    ]);
} else {
    echo json_encode([
        'success' => false,
        'error'   => $data['message'] ?? 'OxaPay error',
        'data'    => $data
    ]);
}
