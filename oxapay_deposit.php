<?php
/**
 * OxaPay Deposit Backend — Fixed response parser
 * OxaPay returns: {"data":{"address":"T...","qr_code":"...","track_id":"..."},"message":"Operation completed successfully!","status":200}
 */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

define('OXAPAY_KEY',   'B5CXIY-CK6Z0Y-NKKTI7-JR6C1N');
define('OXAPAY_API',   'https://api.oxapay.com/v1/payment/static-address');
define('SITE_URL',     'https://tronsick.io');
define('DEPOSIT_FILE', __DIR__ . '/deposits.json');

// Key from admin_keys.json or hardcoded fallback
$apiKey = OXAPAY_KEY;
$keysFile = __DIR__ . '/admin_keys.json';
if(file_exists($keysFile)){
    $k = json_decode(file_get_contents($keysFile), true) ?: [];
    if(!empty($k['oxa_key'])) $apiKey = $k['oxa_key'];
}

$user  = preg_replace('/[^a-zA-Z0-9_-]/', '', $_GET['user'] ?? $_POST['user'] ?? 'guest');
$email = trim($_GET['email'] ?? $_POST['email'] ?? 'user@tronsick.io');
if(!$user) $user = 'guest';

// ── Return cached address if already generated ──────────
$deps = [];
if(file_exists(DEPOSIT_FILE)){
    $deps = json_decode(file_get_contents(DEPOSIT_FILE), true) ?: [];
}
if(!empty($deps[$user]['address'])){
    $a = $deps[$user]['address'];
    echo json_encode([
        'success' => true,
        'address' => $a,
        'qr_url'  => 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data='.urlencode($a),
        'cached'  => true
    ]);
    exit;
}

// ── Call OxaPay API ─────────────────────────────────────
$payload = json_encode([
    'currency'    => 'TRX',
    'network'     => 'TRX',
    'callbackUrl' => SITE_URL . '/oxapay_webhook.php',
    'email'       => $email,
    'orderId'     => 'TSK_' . $user
]);

$ch = curl_init(OXAPAY_API);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_HTTPHEADER     => ['Content-Type: application/json', 'merchant_api_key: '.$apiKey],
    CURLOPT_TIMEOUT        => 20,
    CURLOPT_SSL_VERIFYPEER => false
]);
$resp    = curl_exec($ch);
$curlErr = curl_error($ch);
curl_close($ch);

if($curlErr){
    echo json_encode(['success'=>false,'error'=>'Connection error: '.$curlErr]);
    exit;
}

$r = json_decode($resp, true);
if(!$r){ echo json_encode(['success'=>false,'error'=>'Invalid response from OxaPay']); exit; }

// ── ACTUAL OxaPay format: {"data":{"address":"T..."},"message":"...","status":200} ──
$addr   = $r['data']['address'] ?? null;
$qrCode = $r['data']['qr_code'] ?? null;

// Fallbacks for other possible formats
if(!$addr) $addr = $r['address'] ?? $r['wallet'] ?? $r['data']['wallet'] ?? null;

if($addr){
    // Save to deposits.json
    $deps[$user] = ['address'=>$addr, 'email'=>$email, 'created'=>time(), 'balance'=>0];
    file_put_contents(DEPOSIT_FILE, json_encode($deps, JSON_PRETTY_PRINT));

    echo json_encode([
        'success' => true,
        'address' => $addr,
        'qr_url'  => $qrCode ?: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data='.urlencode($addr)
    ]);
} else {
    echo json_encode(['success'=>false,'error'=>$r['message'] ?? 'Could not generate address']);
}
