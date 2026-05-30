<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Log In – TronSick</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="auth.css"/>
</head>
<body>
<div class="auth-page">

  <!-- LEFT PANEL -->
  <div class="auth-left">
    <a href="index.php" class="al-logo">Tron<span>Sick</span></a>
    <h2 class="al-h">Welcome Back.</h2>
    <p class="al-p">Your faucet timer is running. Log in now and claim your free TRX before the next reset.</p>
    <div class="al-perks">
      <div class="al-perk"><span class="al-ck">✓</span><span>Claim free TRX every <strong>30 minutes</strong></span></div>
      <div class="al-perk"><span class="al-ck">✓</span><span>Earn <strong>50% referral commission</strong> for life</span></div>
      <div class="al-perk"><span class="al-ck">✓</span><span>9 provably fair games — <strong>1% house edge</strong></span></div>
      <div class="al-perk"><span class="al-ck">✓</span><span>Instant withdrawals — <strong>no delays or fees</strong></span></div>
    </div>
    <div class="al-stats">
      <div class="al-stat"><strong>47K+</strong><span>Active Users</span></div>
      <div class="al-stat"><strong>1.28M</strong><span>TRX Paid Out</span></div>
      <div class="al-stat"><strong>30 Min</strong><span>Faucet Timer</span></div>
    </div>
  </div>

  <!-- RIGHT PANEL -->
  <div class="auth-right">
    <div class="ar-topbar">
      <span>New to TronSick?</span>
      <a href="register.php">Create free account →</a>
    </div>
    <div class="ar-body">
      <div class="ar-card">
        <h2>Log In to Your Account</h2>
        <p class="ar-switch">No account yet? <a href="register.php">Sign up free →</a></p>

        <form onsubmit="handleLogin(event)">

          <div class="ff">
            <label for="lId">Email Address or Username</label>
            <div class="ff-iw">
              <input type="text" id="lId" placeholder="email@example.com or @username" required autocomplete="username"/>
            </div>
          </div>

          <div class="ff">
            <div class="ff-lrow">
              <label for="lPw">Password</label>
              <a href="forgot.html" class="ff-forgot">Forgot password?</a>
            </div>
            <div class="ff-iw">
              <input type="password" id="lPw" placeholder="Enter your password" required autocomplete="current-password"/>
              <button type="button" class="ff-eye" onclick="toggleVis('lPw',this)">👁</button>
            </div>
          </div>

          <div class="twofa-box">
            <span class="tfl">Two-Factor Authentication (2FA)</span>
            <input type="text" id="l2fa" placeholder="Enter 6-digit code — leave blank if 2FA not enabled" maxlength="6" inputmode="numeric" autocomplete="one-time-code"/>
            <p class="tfd">Only required if you have 2FA enabled in your account settings.</p>
          </div>

          <div class="ff-remrow">
            <label class="ff-rem">
              <input type="checkbox" id="lRem"/> Keep me logged in for 30 days
            </label>
          </div>

          <div class="ff-err" id="loginErr"></div>

          <button type="submit" class="auth-btn" id="loginBtn">LOG IN TO MY ACCOUNT</button>

          <div class="ff-div"><span>or continue with</span></div>
          <button type="button" class="google-btn" onclick="alert('Google login coming soon')">
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>

          <p class="auth-note">Protected by encryption · <a href="#">Privacy Policy</a> · <a href="#">Terms</a></p>
        </form>
      </div>
    </div>
  </div>

</div>
<script>
function toggleVis(id, btn) {
  const i = document.getElementById(id);
  i.type = i.type === 'password' ? 'text' : 'password';
  btn.textContent = i.type === 'password' ? '👁' : '🙈';
}
function handleLogin(e) {
  e.preventDefault();
  const err = document.getElementById('loginErr');
  const id = document.getElementById('lId').value.trim();
  const pw = document.getElementById('lPw').value;
  if (!id || !pw) { err.style.display='block'; err.textContent='Please enter your email/username and password.'; return; }
  err.style.display='none';
  const btn = document.getElementById('loginBtn');
  btn.textContent='Logging in…'; btn.disabled=true;
  setTimeout(() => { window.location.href='faucet.php'; }, 1500);
}
// Show registration success banner
(function(){
  const p=new URLSearchParams(window.location.search);
  if(p.get('registered')==='1'){
    const name=decodeURIComponent(p.get('user')||'');
    const banner=document.createElement('div');
    banner.style.cssText='position:fixed;top:18px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#052e16,#065f46);border:1px solid #10b981;color:#34d399;padding:14px 28px;border-radius:12px;font-size:14px;font-weight:700;z-index:9999;box-shadow:0 8px 32px rgba(0,0,0,.4);text-align:center;';
    banner.innerHTML='&#127881; Welcome'+(name?' <strong>'+name+'</strong>':'')+' ! Account created.<br><span style="font-size:12px;opacity:.8">&#127922; You received <strong>3 FREE bonus rolls</strong> — login to use them!</span>';
    document.body.appendChild(banner);
    setTimeout(()=>banner.remove(),5000);
    // Clean URL
    history.replaceState(null,'',window.location.pathname);
  }
})();
</script>
</body>
</html>

