<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Admin Login – TronSick</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;font-family:'Inter',sans-serif;background:#0a0f1a;color:#e8f0eb}
.ap-login{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;
background:radial-gradient(ellipse at 20% 50%,rgba(62,207,142,.06) 0%,transparent 50%),
radial-gradient(ellipse at 80% 20%,rgba(99,102,241,.06) 0%,transparent 50%),
#0a0f1a;}
.ap-card{background:rgba(20,28,40,.9);border:1px solid rgba(255,255,255,.1);border-radius:20px;
padding:48px 44px;width:100%;max-width:420px;
box-shadow:0 24px 80px rgba(0,0,0,.6),0 0 0 1px rgba(62,207,142,.08);}
.ap-logo{text-align:center;margin-bottom:8px;font-size:26px;font-weight:900;color:#fff;letter-spacing:-0.5px}
.ap-logo span{color:#3ecf8e}
.ap-badge{display:flex;align-items:center;justify-content:center;gap:6px;margin-bottom:28px;}
.ap-badge-pill{background:rgba(99,102,241,.15);border:1px solid rgba(99,102,241,.3);color:#818cf8;
font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px;letter-spacing:1px;text-transform:uppercase;}
.ap-title{font-size:20px;font-weight:800;color:#fff;text-align:center;margin-bottom:6px}
.ap-sub{font-size:13px;color:rgba(255,255,255,.4);text-align:center;margin-bottom:28px}
.af-group{margin-bottom:18px}
.af-label{display:block;font-size:12px;font-weight:700;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.6px;margin-bottom:8px}
.af-inp{width:100%;background:rgba(0,0,0,.3);border:1.5px solid rgba(255,255,255,.1);border-radius:10px;
padding:13px 16px;color:#fff;font-size:14px;font-family:inherit;outline:none;transition:border-color .2s}
.af-inp:focus{border-color:rgba(62,207,142,.4);background:rgba(0,0,0,.4)}
.af-inp::placeholder{color:rgba(255,255,255,.2)}
.af-err{background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.25);color:#f87171;
border-radius:8px;padding:10px 14px;font-size:13px;margin-bottom:14px;display:none}
.ap-btn{width:100%;padding:15px;background:linear-gradient(135deg,#3ecf8e,#22c55e);
color:#052e16;font-weight:900;font-size:14px;letter-spacing:.5px;border:none;border-radius:10px;
cursor:pointer;transition:all .25s;margin-top:4px;
box-shadow:0 4px 20px rgba(62,207,142,.25)}
.ap-btn:hover{filter:brightness(1.08);transform:translateY(-1px);box-shadow:0 8px 28px rgba(62,207,142,.35)}
.ap-btn:disabled{opacity:.5;cursor:not-allowed;transform:none}
.ap-footer{text-align:center;margin-top:22px;font-size:12px;color:rgba(255,255,255,.25)}
.ap-footer a{color:rgba(62,207,142,.6);text-decoration:none}
.ap-footer a:hover{color:#3ecf8e}
.ap-lock{text-align:center;font-size:36px;margin-bottom:18px;opacity:.7}
</style>
</head>
<body>
<div class="ap-login">
  <div class="ap-card">
    <div class="ap-lock">🔐</div>
    <div class="ap-logo">Tron<span>Sick</span></div>
    <div class="ap-badge"><span class="ap-badge-pill">⚡ Admin Panel</span></div>
    <div class="ap-title">Administrator Login</div>
    <div class="ap-sub">Restricted access — authorized personnel only</div>

    <form onsubmit="doAdminLogin(event)">
      <div class="af-err" id="apErr"></div>

      <div class="af-group">
        <label class="af-label" for="apUser">Admin Username</label>
        <input class="af-inp" type="text" id="apUser" placeholder="Enter admin username" autocomplete="username" required/>
      </div>

      <div class="af-group">
        <label class="af-label" for="apPw">Password</label>
        <input class="af-inp" type="password" id="apPw" placeholder="Enter admin password" autocomplete="current-password" required/>
      </div>

      <button type="submit" class="ap-btn" id="apBtn">🔑 LOGIN TO ADMIN PANEL</button>
    </form>

    <div class="ap-footer">
      <a href="/faucet.php">← Back to TronSick</a> &nbsp;·&nbsp; Secure Admin Access
    </div>
  </div>
</div>
<script>
// Admin credentials stored in localStorage (can be changed from admin panel)
var ADMIN_USER = localStorage.getItem('adminUser') || 'admin';
var ADMIN_PASS = localStorage.getItem('adminPass') || 'TronSick@2024';

function doAdminLogin(e) {
  e.preventDefault();
  const err = document.getElementById('apErr');
  const user = document.getElementById('apUser').value.trim();
  const pw = document.getElementById('apPw').value;
  const btn = document.getElementById('apBtn');

  // Reload creds in case changed
  ADMIN_USER = localStorage.getItem('adminUser') || 'admin';
  ADMIN_PASS = localStorage.getItem('adminPass') || 'TronSick@2024';

  if(user === ADMIN_USER && pw === ADMIN_PASS) {
    err.style.display = 'none';
    btn.textContent = 'Logging in…';
    btn.disabled = true;
    // Set session token
    sessionStorage.setItem('adminAuth', btoa(user + ':' + Date.now()));
    localStorage.setItem('adminLastLogin', new Date().toISOString());
    setTimeout(() => { window.location.href = 'dashboard.php'; }, 1000);
  } else {
    err.style.display = 'block';
    err.textContent = '❌ Invalid username or password. Please try again.';
    document.getElementById('apPw').value = '';
  }
}
// If already logged in, redirect
if(sessionStorage.getItem('adminAuth')) {
  window.location.href = 'dashboard.php';
}
</script>
<script>if(!sessionStorage.getItem(" adminAuth)){window.location.href=index.php;}</script></body>
</html>
