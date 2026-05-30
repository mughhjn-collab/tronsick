<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Create Free Account – TronSick</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="auth.css"/>
</head>
<body>
<div class="auth-page">

  <!-- LEFT PANEL -->
  <div class="auth-left">
    <a href="index.php" class="al-logo">Tron<span>Sick</span></a>
    <h2 class="al-h">Start Earning Free TRX Today.</h2>
    <p class="al-p">Create your account in 60 seconds. No deposit, no credit card — start claiming immediately.</p>
    <div class="al-perks">
      <div class="al-perk"><span class="al-ck">✓</span><span>Claim free TRX every <strong>30 minutes</strong></span></div>
      <div class="al-perk"><span class="al-ck">✓</span><span>Win up to <strong>500 TRX</strong> per single claim</span></div>
      <div class="al-perk"><span class="al-ck">✓</span><span>Earn <strong>50% referral commission</strong> — forever</span></div>
      <div class="al-perk"><span class="al-ck">✓</span><span>9 provably fair games — <strong>1% house edge</strong></span></div>
      <div class="al-perk"><span class="al-ck">✓</span><span>Instant withdrawals — <strong>minimum 50 TRX</strong></span></div>
    </div>
    <div class="al-stats">
      <div class="al-stat"><strong>47K+</strong><span>Active Users</span></div>
      <div class="al-stat"><strong>1.28M</strong><span>TRX Paid</span></div>
      <div class="al-stat"><strong>100%</strong><span>Free to Join</span></div>
    </div>
  </div>

  <!-- RIGHT PANEL -->
  <div class="auth-right">
    <div class="ar-topbar">
      <span>Already have an account?</span>
      <a href="login.php">Log in →</a>
    </div>
    <div class="ar-body">
      <div class="ar-card">
        <h2>Create Your Free Account</h2>
        <p class="ar-switch">Already registered? <a href="login.php">Log in here →</a></p>

        <form onsubmit="handleReg(event)">

          <div class="ff">
            <label for="rUser">Username</label>
            <div class="ff-iw">
              <input type="text" id="rUser" placeholder="Choose a unique username" required minlength="3" maxlength="20" autocomplete="username"/>
            </div>
            <p class="ff-hint">3–20 characters · Letters, numbers, underscores only</p>
          </div>

          <div class="ff">
            <label for="rEmail">Email Address</label>
            <div class="ff-iw">
              <input type="email" id="rEmail" placeholder="your@email.com" required autocomplete="email"/>
            </div>
          </div>

          <div class="ff">
            <label for="rPw">Password</label>
            <div class="ff-iw">
              <input type="password" id="rPw" placeholder="Create a strong password (min 8 chars)" required minlength="8" autocomplete="new-password"/>
              <button type="button" class="ff-eye" onclick="toggleVis('rPw',this)">👁</button>
            </div>
            <div class="pw-bar"><div class="pw-fill" id="pwFill"></div></div>
            <p class="ff-hint" id="pwHint">Enter password to check strength</p>
          </div>

          <div class="ff">
            <label for="rPw2">Confirm Password</label>
            <div class="ff-iw">
              <input type="password" id="rPw2" placeholder="Re-enter your password" required autocomplete="new-password"/>
              <button type="button" class="ff-eye" onclick="toggleVis('rPw2',this)">👁</button>
            </div>
          </div>

          <div class="ff">
            <label for="rRef">Referral Code <span class="ff-opt">(optional)</span></label>
            <div class="ff-iw">
              <input type="text" id="rRef" placeholder="Enter referral code if you have one"/>
            </div>
          </div>

          <div class="ff-ck">
            <input type="checkbox" id="rTerms" required/>
            <label for="rTerms">I have read and agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
          </div>

          <div class="ff-err" id="regErr"></div>

          <button type="submit" class="auth-btn" id="regBtn">CREATE FREE ACCOUNT — CLAIM TRX</button>

          <div class="ff-div"><span>or sign up with</span></div>
          <button type="button" class="google-btn" onclick="alert('Google signup coming soon')">
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>

          <p class="auth-note">Your data is encrypted and never shared · <a href="#">Privacy Policy</a></p>
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
document.getElementById('rPw').addEventListener('input', function() {
  const v = this.value, fill = document.getElementById('pwFill'), hint = document.getElementById('pwHint');
  let s = 0;
  if (v.length >= 8) s++; if (/[A-Z]/.test(v)) s++; if (/[0-9]/.test(v)) s++; if (/[^A-Za-z0-9]/.test(v)) s++;
  const cfg = [
    {w:'0%',c:'transparent',t:'Enter password to check strength'},
    {w:'25%',c:'#ef4444',t:'Weak — add uppercase & numbers'},
    {w:'50%',c:'#f59e0b',t:'Fair — add numbers & symbols'},
    {w:'75%',c:'#3b82f6',t:'Good — add a special character'},
    {w:'100%',c:'#22c55e',t:'Strong password ✓'}
  ];
  const l = cfg[s];
  fill.style.width = l.w; fill.style.background = l.c;
  hint.textContent = l.t; hint.style.color = s === 0 ? '#9ca3af' : l.c;
});
function handleReg(e) {
  e.preventDefault();
  const err = document.getElementById('regErr');
  const show = m => { err.style.display='block'; err.textContent=m; };
  const u = document.getElementById('rUser').value.trim();
  const em = document.getElementById('rEmail').value.trim();
  const pw = document.getElementById('rPw').value;
  const pw2 = document.getElementById('rPw2').value;
  const terms = document.getElementById('rTerms').checked;
  if (!u || u.length < 3) return show('Username must be at least 3 characters.');
  if (!/^[a-zA-Z0-9_]+$/.test(u)) return show('Username: letters, numbers and underscores only.');
  if (!em || !em.includes('@')) return show('Please enter a valid email address.');
  if (pw.length < 8) return show('Password must be at least 8 characters.');
  if (pw !== pw2) return show('Passwords do not match — please re-enter.');
  if (!terms) return show('You must agree to the Terms of Service to continue.');
  err.style.display='none';
  const btn = document.getElementById('regBtn');
  btn.textContent='Creating Account…'; btn.disabled=true;
  setTimeout(() => { window.location.href='login.php'; }, 1800);
}
</script>
</body>
</html>
