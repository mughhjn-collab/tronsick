<?php
/**
 * OxaPay Webhook Handler
 * Called by OxaPay when a TRX deposit is confirmed
 * Saves the payment to deposits.json for balance crediting
 */

$payload = file_get_contents('php://input');
$data    = json_decode($payload, true);

// Log all incoming webhooks
$log = __DIR__ . '/webhook_log.txt';
file_put_contents($log, date('Y-m-d H:i:s') . ' ' . $payload . "\n", FILE_APPEND);

if(!$data){
    http_response_code(400);
    echo 'Bad request';
    exit;
}

// OxaPay sends: status, amount, currency, network, address, trackId, orderId
$status  = $data['status']   ?? '';
$amount  = floatval($data['amount']  ?? 0);
$address = $data['address']  ?? '';
$orderId = $data['orderId']  ?? '';
$trackId = $data['trackId']  ?? '';

// Only process confirmed payments
if($status !== 'Completed' && $status !== 'confirming'){
    echo 'OK';
    exit;
}

if($amount <= 0 || empty($address)){
    echo 'OK';
    exit;
}

// Find user by address
$depositFile = __DIR__ . '/deposits.json';
$deposits    = [];
if(file_exists($depositFile)){
    $deposits = json_decode(file_get_contents($depositFile), true) ?: [];
}

$userId = null;
foreach($deposits as $uid => $d){
    if(isset($d['address']) && $d['address'] === $address){
        $userId = $uid;
        break;
    }
}

if(!$userId){
    echo 'OK';
    exit;
}

// Record the transaction
$txFile = __DIR__ . '/transactions.json';
$txs    = [];
if(file_exists($txFile)){
    $txs = json_decode(file_get_contents($txFile), true) ?: [];
}

// Avoid duplicate transactions
$trackIds = array_column($txs, 'trackId');
if(in_array($trackId, $trackIds)){
    echo 'OK';
    exit;
}

// Add transaction record
$tx = [
    'userId'    => $userId,
    'address'   => $address,
    'amount'    => $amount,
    'currency'  => 'TRX',
    'status'    => $status,
    'trackId'   => $trackId,
    'orderId'   => $orderId,
    'time'      => time(),
    'credited'  => ($status === 'Completed')
];
$txs[] = $tx;
file_put_contents($txFile, json_encode($txs, JSON_PRETTY_PRINT));

// Mark pending_credit for user (frontend will pick it up)
$pendingFile = __DIR__ . '/pending_credits.json';
$pending = [];
if(file_exists($pendingFile)){
    $pending = json_decode(file_get_contents($pendingFile), true) ?: [];
}
if($status === 'Completed'){
    if(!isset($pending[$userId])) $pending[$userId] = 0;
    $pending[$userId] += $amount;
    file_put_contents($pendingFile, json_encode($pending, JSON_PRETTY_PRINT));
}

echo 'OK';
