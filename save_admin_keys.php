<?php
/**
 * Save admin keys to server file so backend PHP can read them
 * Called by admin panel when OxaPay key is saved
 */
header('Content-Type: application/json');

// Simple auth check
$auth = $_POST['auth'] ?? '';
if($auth !== 'TronSick@Admin2024'){
    echo json_encode(['ok'=>false,'error'=>'Unauthorized']);
    exit;
}

$keysFile = __DIR__ . '/admin_keys.json';
$keys = [];
if(file_exists($keysFile)){
    $keys = json_decode(file_get_contents($keysFile), true) ?: [];
}

$allowed = ['oxa_key','oxa_merchant','site_url'];
foreach($allowed as $k){
    if(isset($_POST[$k])) $keys[$k] = trim($_POST[$k]);
}

file_put_contents($keysFile, json_encode($keys, JSON_PRETTY_PRINT));
echo json_encode(['ok'=>true,'saved'=>array_keys($keys)]);
