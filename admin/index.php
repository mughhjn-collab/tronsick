<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Admin Login – TronSick</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;overflow:hidden;font-family:'Inter',sans-serif}
a{text-decoration:none;color:inherit}
input,button{font-family:inherit}

/* ── SPLIT LAYOUT ── */
.auth-page{display:grid;grid-template-columns:42% 58%;height:100vh;overflow:hidden}

/* ── LEFT PANEL ── */
.auth-left{background:linear-gradient(160deg,#0a0f1a 0%,#0d1829 60%,#091522 100%);display:flex;flex-direction:column;justify-content:center;padding:50px 48px;position:relative;overflow:hidden}
.auth-left::before{content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(62,207,142,.15),transparent 70%);top:-100px;right:-100px;pointer-events:none}
.auth-left::after{content:'';position:absolute;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,.1),transparent 70%);bottom:-80px;left:-60px;pointer-events:none}
.al-logo{font-size:24px;font-weight:900;color:#fff;letter-spacing:-.3px;margin-bottom:12px;position:relative;z-index:1}
.al-logo span{color:#3ecf8e}
.al-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(62,207,142,.1);border:1px solid rgba(62,207,142,.25);color:#3ecf8e;font-size:11px;font-weight:700;padding:5px 14px;border-radius:20px;letter-spacing:1px;text-transform:uppercase;margin-bottom:40px;position:relative;z-index:1}
.al-h{font-size:clamp(22px,2.5vw,34px);font-weight:900;color:#fff;line-height:1.15;letter-spacing:-.5px;margin-bottom:12px;position:relative;z-index:1}
.al-p{font-size:14px;color:rgba(255,255,255,.5);line-height:1.7;margin-bottom:32px;position:relative;z-index:1}
.al-perks{display:flex;flex-direction:column;gap:13px;margin-bottom:36px;position:relative;z-index:1}
.al-perk{display:flex;align-items:center;gap:12px;font-size:13px;color:rgba(255,255,255,.7)}
.al-perk strong{color:#3ecf8e}
.al-ck{width:20px;height:20px;flex-shrink:0;background:rgba(62,207,142,.15);border:1px solid rgba(62,207,142,.35);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;color:#3ecf8e}
.al-stats{display:flex;border-top:1px solid rgba(255,255,255,.08);padding-top:24px;position:relative;z-index:1}
.al-stat{flex:1;text-align:center}
.al-stat strong{display:block;font-size:20px;font-weight:800;color:#3ecf8e}
.al-stat span{font-size:10px;color:rgba(255,255,255,.3);text-transform:uppercase;letter-spacing:.5px}

/* ── RIGHT PANEL ── */
.auth-right{background:#0a0f1a;display:flex;flex-direction:column;overflow-y:auto;border-left:1px solid rgba(255,255,255,.05)}
.ar-topbar{display:flex;justify-content:flex-end;align-items:center;padding:20px 40px;flex-shrink:0}
.ar-topbar span{font-size:13px;color:rgba(255,255,255,.4)}
.ar-topbar a{color:#3ecf8e;font-weight:700;margin-left:6px}
.ar-body{flex:1;display:flex;align-items:center;justify-content:center;padding:20px 40px 40px}
.ar-card{background:rgba(20,28,40,.9);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:40px 40px;width:100%;max-width:460px;box-shadow:0 24px 80px rgba(0,0,0,.5),0 0 0 1px rgba(62,207,142,.05)}
.ar-card h2{font-size:22px;font-weight:800;color:#fff;letter-spacing:-.3px;margin-bottom:4px}
.ar-switch{font-size:13px;color:rgba(255,255,255,.4);margin-bottom:28px}

/* ── FORM ── */
.ff{margin-bottom:16px}
.ff label{display:block;font-size:12px;font-weight:700;color:rgba(255,255,255,.5);margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px}
.ff-iw{position:relative}
.ff-iw input{width:100%;padding:13px 42px 13px 16px;background:rgba(0,0,0,.3);border:1.5px solid rgba(255,255,255,.1);border-radius:10px;font-size:14px;color:#fff;outline:none;transition:border-color .2s,background .2s}
.ff-iw input:focus{border-color:rgba(62,207,142,.5);background:rgba(0,0,0,.4)}
.ff-iw input::placeholder{color:rgba(255,255,255,.2)}
.ff-eye{position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;font-size:14px;color:rgba(255,255,255,.3);padding:0;line-height:1;transition:color .2s}
.ff-eye:hover{color:rgba(255,255,255,.6)}

/* Error */
.ff-err{background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.25);color:#f87171;font-size:13px;padding:11px 14px;border-radius:9px;margin-bottom:14px;display:none;line-height:1.4}

/* Submit */
.auth-btn{width:100%;padding:14px;background:linear-gradient(135deg,#3ecf8e,#22c55e);color:#052e16;font-weight:900;font-size:14px;letter-spacing:.5px;border-radius:10px;border:none;cursor:pointer;transition:all .25s;margin-bottom:14px;box-shadow:0 4px 20px rgba(62,207,142,.25)}
.auth-btn:hover{transform:translateY(-1px);box-shadow:0 8px 28px rgba(62,207,142,.35);filter:brightness(1.05)}
.auth-btn:disabled{opacity:.6;cursor:not-allowed;transform:none;box-shadow:none}

/* Security notice */
.auth-note{font-size:11px;color:rgba(255,255,255,.25);text-align:center;line-height:1.5;margin-top:4px}
.auth-note a{color:rgba(62,207,142,.6);font-weight:600}

/* Lock icon */
.al-icon-wrap{text-align:center;margin-bottom:20px}
.al-icon-wrap i{font-size:48px;color:#3ecf8e;opacity:.8}

/* Animated border on card */
@keyframes borderPulse{0%,100%{box-shadow:0 24px 80px rgba(0,0,0,.5),0 0 0 1px rgba(62,207,142,.05)}50%{box-shadow:0 24px 80px rgba(0,0,0,.5),0 0 0 1px rgba(62,207,142,.15),0 0 30px rgba(62,207,142,.05)}}
.ar-card{animation:borderPulse 4s ease-in-out infinite}

/* Brute-force protection badge */
.sec-badge{display:flex;align-items:center;gap:8px;background:rgba(99,102,241,.1);border:1px solid rgba(99,102,241,.2);border-radius:8px;padding:10px 14px;margin-bottom:20px;font-size:12px;color:rgba(255,255,255,.5)}
.sec-badge i{color:#818cf8;font-size:14px}

/* Responsive */
@media(max-width:768px){
  html,body{overflow:auto}
  .auth-page{grid-template-columns:1fr;height:auto}
  .auth-left{display:none}
  .auth-right{background:#0a0f1a;min-height:100vh;border-left:none}
  .ar-body{padding:20px}
}
</style>
</head>
<body>
<div class="auth-page">

  <!-- LEFT PANEL -->
  <div class="auth-left">
    <a href="/faucet.php" class="al-logo">Tron<span>Sick</span></a>
    <span class="al-badge"><i class="fas fa-shield-halved"></i> Admin Control Center</span>
    <h2 class="al-h">Admin Panel</h2>
    <p class="al-p">Full control over your platform — manage users, payouts, games, faucet settings, and more from one place.</p>
    <div class="al-perks">
      <div class="al-perk"><span class="al-ck">✓</span><span>Manage <strong>Faucet & Bonus</strong> settings</span></div>
      <div class="al-perk"><span class="al-ck">✓</span><span>Control <strong>Games & Win Rates</strong></span></div>
      <div class="al-perk"><span class="al-ck">✓</span><span>Handle <strong>Withdrawals & Deposits</strong></span></div>
      <div class="al-perk"><span class="al-ck">✓</span><span>Configure <strong>OxaPay Gateway</strong></span></div>
      <div class="al-perk"><span class="al-ck">✓</span><span>Manage <strong>Users & Security</strong></span></div>
    </div>
    <div class="al-stats">
      <div class="al-stat"><strong id="slUsers">—</strong><span>Total Users</span></div>
      <div class="al-stat"><strong id="slWithdraws">—</strong><span>Withdrawals</span></div>
      <div class="al-stat"><strong id="slBalance">—</strong><span>Site Balance</span></div>
    </div>
  </div>

  <!-- RIGHT PANEL -->
  <div class="auth-right">
    <div class="ar-topbar">
      <span>TronSick Platform</span>
      <a href="/faucet.php">← Back to Site</a>
    </div>
    <div class="ar-body">
      <div class="ar-card">
        <div class="al-icon-wrap"><i class="fas fa-lock"></i></div>
        <h2>Administrator Login</h2>
        <p class="ar-switch">Restricted access — authorized personnel only</p>

        <div class="sec-badge">
          <i class="fas fa-shield-check"></i>
          <span>Protected by brute-force lockout · Session-secured access</span>
        </div>

        <form onsubmit="doAdminLogin(event)" id="loginForm">
          <div class="ff-err" id="apErr"></div>

          <div class="ff">
            <label for="apUser"><i class="fas fa-user" style="margin-right:5px;opacity:.6"></i>Admin Username</label>
            <div class="ff-iw">
              <input type="text" id="apUser" placeholder="Enter admin username" autocomplete="username" required/>
            </div>
          </div>

          <div class="ff">
            <label for="apPw"><i class="fas fa-key" style="margin-right:5px;opacity:.6"></i>Password</label>
            <div class="ff-iw">
              <input type="password" id="apPw" placeholder="Enter admin password" autocomplete="current-password" required/>
              <button type="button" class="ff-eye" onclick="toggleVis('apPw',this)">👁</button>
            </div>
          </div>

          <button type="submit" class="auth-btn" id="apBtn">
            <i class="fas fa-right-to-bracket"></i> LOGIN TO ADMIN PANEL
          </button>

          <p class="auth-note">🔒 All admin actions are logged and monitored · <a href="/faucet.php">Return to site →</a></p>
        </form>
      </div>
    </div>
  </div>

</div>
<script>
// Default credentials (stored in localStorage so they can be changed from admin panel)
var ADMIN_USER = localStorage.getItem('adminUser') || 'admin';
var ADMIN_PASS = localStorage.getItem('adminPass') || 'TronSick@2024';

// Brute force protection
var loginAttempts = parseInt(sessionStorage.getItem('loginAttempts') || '0');
var lockoutUntil  = parseInt(sessionStorage.getItem('lockoutUntil')  || '0');

function toggleVis(id, btn) {
  var i = document.getElementById(id);
  i.type = i.type === 'password' ? 'text' : 'password';
  btn.textContent = i.type === 'password' ? '👁' : '🙈';
}

function doAdminLogin(e) {
  e.preventDefault();
  var err  = document.getElementById('apErr');
  var btn  = document.getElementById('apBtn');
  var user = document.getElementById('apUser').value.trim();
  var pw   = document.getElementById('apPw').value;

  // Check lockout
  var now = Date.now();
  if (lockoutUntil > now) {
    var secs = Math.ceil((lockoutUntil - now) / 1000);
    err.style.display = 'block';
    err.innerHTML = '<i class="fas fa-ban"></i> Too many failed attempts. Try again in <strong>' + secs + 's</strong>.';
    return;
  }

  // Reload creds in case changed from another panel
  ADMIN_USER = localStorage.getItem('adminUser') || 'admin';
  ADMIN_PASS = localStorage.getItem('adminPass') || 'TronSick@2024';

  if (user === ADMIN_USER && pw === ADMIN_PASS) {
    loginAttempts = 0;
    sessionStorage.removeItem('loginAttempts');
    sessionStorage.removeItem('lockoutUntil');
    err.style.display = 'none';
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in…';
    btn.disabled = true;
    // Set session
    sessionStorage.setItem('adminAuth', btoa(user + ':' + Date.now()));
    localStorage.setItem('adminLastLogin', new Date().toISOString());
    setTimeout(function(){ window.location.href = 'dashboard.php'; }, 1000);
  } else {
    loginAttempts++;
    sessionStorage.setItem('loginAttempts', loginAttempts);
    if (loginAttempts >= 5) {
      lockoutUntil = Date.now() + 5 * 60 * 1000; // 5 minute lockout
      sessionStorage.setItem('lockoutUntil', lockoutUntil);
      err.style.display = 'block';
      err.innerHTML = '<i class="fas fa-ban"></i> Too many failed attempts. Locked for <strong>5 minutes</strong>.';
    } else {
      err.style.display = 'block';
      err.innerHTML = '<i class="fas fa-circle-xmark"></i> Invalid username or password. ' + (5 - loginAttempts) + ' attempts remaining.';
    }
    document.getElementById('apPw').value = '';
  }
}

// If already logged in, redirect
if (sessionStorage.getItem('adminAuth')) {
  window.location.href = 'dashboard.php';
}

// Populate left panel stats from localStorage
document.getElementById('slUsers').textContent     = parseInt(localStorage.getItem('stat_users')      || '0').toLocaleString();
document.getElementById('slWithdraws').textContent = parseInt(localStorage.getItem('stat_withdraws')  || '0').toLocaleString();
document.getElementById('slBalance').textContent   = parseFloat(localStorage.getItem('site_balance')  || '0').toFixed(2) + ' TRX';
</script>
</body>
</html>
