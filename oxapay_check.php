<?php
/**
 * Check and credit pending deposits to user's localStorage (via JSON response)
 * Frontend polls this every 30s to auto-credit confirmed deposits
 */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$user    = trim($_GET['user'] ?? '');
$userId  = preg_replace('/[^a-zA-Z0-9_-]/', '', $user);

if(!$userId){
    echo json_encode(['credit'=>0]);
    exit;
}

$pendingFile = __DIR__ . '/pending_credits.json';
$pending     = [];
if(file_exists($pendingFile)){
    $pending = json_decode(file_get_contents($pendingFile), true) ?: [];
}

$credit = $pending[$userId] ?? 0;
if($credit > 0){
    // Clear the credit (one-time claim)
    unset($pending[$userId]);
    file_put_contents($pendingFile, json_encode($pending, JSON_PRETTY_PRINT));
}

// Get user transactions for display
$txFile = __DIR__ . '/transactions.json';
$txs    = [];
if(file_exists($txFile)){
    $allTxs = json_decode(file_get_contents($txFile), true) ?: [];
    $txs    = array_values(array_filter($allTxs, function($t) use($userId){
        return ($t['userId'] ?? '') === $userId;
    }));
    // Latest first, max 20
    $txs = array_slice(array_reverse($txs), 0, 20);
}

echo json_encode(['credit'=>round($credit,6), 'transactions'=>$txs]);
