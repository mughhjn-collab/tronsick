<?php
// forgot_pw.php — sends password reset email
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$email = trim($_POST['email'] ?? '');
$token = trim($_POST['token'] ?? '');
$link  = trim($_POST['link'] ?? '');

if(!$email || !$token || !$link){
  echo json_encode(['success'=>false,'msg'=>'Missing fields']);exit;
}

// Store token server-side
$tokensFile = __DIR__.'/pw_reset_tokens.json';
$tokens = file_exists($tokensFile) ? json_decode(file_get_contents($tokensFile),true) : [];
$tokens[$token] = [
  'email'   => strtolower($email),
  'expires' => time() + 3600,
  'used'    => false
];
// Cleanup old tokens
foreach($tokens as $k=>$v){ if($v['expires'] < time()) unset($tokens[$k]); }
file_put_contents($tokensFile, json_encode($tokens));

// Send email
$subject = 'TronSick — Password Reset Request';
$body = "Hello,\n\nYou requested a password reset for your TronSick account.\n\nClick the link below to reset your password:\n{$link}\n\nThis link expires in 1 hour.\n\nIf you did not request this, please ignore this email.\n\n— TronSick Team\nhttps://tronsick.io";

$headers  = "From: noreply@tronsick.io\r\n";
$headers .= "Reply-To: support@tronsick.io\r\n";
$headers .= "X-Mailer: TronSick/1.0";

$sent = @mail($email, $subject, $body, $headers);
echo json_encode(['success'=>true,'sent'=>$sent]);
