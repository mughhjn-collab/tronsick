<?php http_response_code(404); ?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>404 — Page Not Found | TronSick</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0a0f1a;font-family:'Inter',sans-serif;color:#fff;padding:24px;text-align:center}
.err-code{font-size:72px;font-weight:900;color:#ef4444;line-height:1;margin-bottom:12px}
.err-title{font-size:22px;font-weight:800;margin-bottom:10px}
.err-msg{font-size:14px;color:rgba(255,255,255,.5);max-width:420px;line-height:1.7;margin-bottom:28px}
.err-btn{display:inline-block;padding:12px 28px;background:#3ecf8e;color:#052e16;font-weight:800;border-radius:10px;text-decoration:none;font-size:14px}
.err-btn:hover{filter:brightness(1.05)}
</style>
</head>
<body>
<div>
  <div class="err-code">404</div>
  <h1 class="err-title">Page Not Found</h1>
  <p class="err-msg">This URL is not available. If you are looking for your account, please use the regular login page.</p>
  <a class="err-btn" href="/panel-login.php">Staff Login</a>
</div>
</body>
</html>
