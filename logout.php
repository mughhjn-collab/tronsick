<?php
// Clear PHP session if any
if (session_status() === PHP_SESSION_NONE) session_start();
session_unset();
session_destroy();
?><!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>Logging out… — TronSick</title>
<style>
  body{margin:0;background:#050d08;display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:Inter,sans-serif}
  .lo-box{text-align:center;color:#fff}
  .lo-spin{width:40px;height:40px;border:3px solid rgba(62,207,142,.2);border-top-color:#3ecf8e;border-radius:50%;animation:spin .8s linear infinite;margin:0 auto 16px}
  @keyframes spin{to{transform:rotate(360deg)}}
  .lo-txt{font-size:14px;color:rgba(255,255,255,.5)}
</style>
</head>
<body>
<div class="lo-box">
  <div class="lo-spin"></div>
  <div class="lo-txt">Logging out…</div>
</div>
<script>
// Clear all user session data from localStorage
var keysToRemove = [
  'userName','userEmail','userLoggedIn','userId',
  'userBalance','regUser','bonusRolls','newUserBonus',
  'lastFaucet','lastBonus'
];
keysToRemove.forEach(function(k){ localStorage.removeItem(k); });
// Redirect to landing page
setTimeout(function(){ window.location.href = 'index.php'; }, 800);
</script>
</body>
</html>
