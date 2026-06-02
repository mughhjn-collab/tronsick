<?php
// Check token validity (for cross-tab reset)
if(isset($_POST['action']) && $_POST['action'] === 'check_token') {
    $token = trim($_POST['token'] ?? '');
    // Since tokens are localStorage-based, we just return valid:true with empty email
    // In production this would check DB
    if(!empty($token) && strlen($token) > 10) {
        echo json_encode(['valid' => true, 'email' => '']);
    } else {
        echo json_encode(['valid' => false]);
    }
    exit;
}

// forgot_pw.php — sends password reset email via PHP mail() with fallback
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$email = trim($_POST['email'] ?? '');
$token = trim($_POST['token'] ?? '');
$link  = trim($_POST['link'] ?? '');

if(!$email || !$token || !$link){
  echo json_encode(['success'=>false,'msg'=>'Missing fields']);exit;
}

// Store token server-side (so reset link actually works)
$tokensFile = __DIR__.'/data/pw_reset_tokens.json';
if(!is_dir(__DIR__.'/data')) @mkdir(__DIR__.'/data', 0755, true);
$tokens = file_exists($tokensFile) ? (json_decode(file_get_contents($tokensFile),true) ?: []) : [];
$tokens[$token] = [
  'email'   => strtolower($email),
  'expires' => time() + 3600,
  'used'    => false
];
// Cleanup expired tokens
foreach($tokens as $k=>$v){ if(($v['expires']??0) < time()) unset($tokens[$k]); }
file_put_contents($tokensFile, json_encode($tokens, JSON_PRETTY_PRINT));

// --- Try to send email ---
$subject = '=?UTF-8?B?'.base64_encode('TronSick — Password Reset').'?=';
$body = "Hello,\n\nYou requested a password reset for your TronSick account.\n\nClick the link below to reset your password:\n{$link}\n\nThis link expires in 1 hour.\n\nIf you did not request this, please contact support: support@tronsick.io\n\n— TronSick Team\nhttps://tronsick.io";
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "From: TronSick <noreply@tronsick.io>\r\n";
$headers .= "Reply-To: support@tronsick.io\r\n";
$headers .= "X-Mailer: PHP/".phpversion();

$sent = @mail($email, $subject, $body, $headers);

// Always return success=true with the link so user can copy it if email fails
echo json_encode([
  'success' => true,
  'sent'    => $sent,
  'link'    => $link,   // Return link so JS can show it as fallback
  'msg'     => $sent ? 'Email sent!' : 'Email could not be sent automatically. Copy the link below.'
]);
