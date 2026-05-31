<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Login / Sign Up – TronSick | Free TRX Faucet & Casino</title>
  <meta name="description" content="Log in or create your free TronSick account. Claim free TRX every 40 minutes, compete in weekly contests, earn daily cashback, and play 9 provably fair games."/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
  <script>
    // If already logged in, go to dashboard
    if(localStorage.getItem('userLoggedIn')==='1' && localStorage.getItem('userName')){
      window.location.replace('faucet.php');
    }
  </script>
  <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html,body{height:100%;font-family:'Inter',sans-serif}
    body{background:#2a3f36;min-height:100vh;display:flex;flex-direction:column}
    a{text-decoration:none;color:inherit}

    /* ── TOPBAR ── */
    .top-bar{display:flex;align-items:center;justify-content:space-between;padding:18px 32px;position:relative;z-index:10}
    .tb-logo{font-size:22px;font-weight:900;color:#fff;letter-spacing:-.5px}
    .tb-logo span{color:#a3e635}
    .tb-back{font-size:13px;color:rgba(255,255,255,.45);display:flex;align-items:center;gap:6px;transition:color .2s}
    .tb-back:hover{color:#a3e635}

    /* ── MAIN LAYOUT ── */
    .auth-wrap{flex:1;display:flex;align-items:center;justify-content:center;padding:24px 16px 48px}

    /* ── CARD ── */
    .auth-card{background:#1e3530;border-radius:16px;padding:38px 40px 40px;width:100%;max-width:448px;box-shadow:0 32px 80px rgba(0,0,0,.45),0 0 0 1px rgba(255,255,255,.06)}

    /* ── LOGO ROW ── */
    .al-logo-row{display:flex;align-items:center;gap:10px;margin-bottom:20px}
    .al-icon{width:36px;height:36px;border-radius:9px;display:grid;grid-template-columns:1fr 1fr;gap:2px;padding:5px;background:#132920;flex-shrink:0}
    .al-icon span{border-radius:3px;display:block}
    .al-icon .c1{background:#e11d48}
    .al-icon .c2{background:#f59e0b}
    .al-icon .c3{background:#22c55e}
    .al-icon .c4{background:#3b82f6}
    .al-logo-txt{font-size:20px;font-weight:900;color:#fff;letter-spacing:-.3px}
    .al-logo-txt span{color:#a3e635}

    /* ── TABS ── */
    .auth-tabs{display:flex;gap:0;margin-bottom:26px;background:#132920;border-radius:10px;padding:4px}
    .auth-tab{flex:1;padding:10px;text-align:center;font-size:14px;font-weight:700;color:rgba(255,255,255,.4);cursor:pointer;border-radius:8px;transition:all .2s;border:none;background:none;font-family:inherit}
    .auth-tab.active{background:#2a4a3e;color:#a3e635;box-shadow:0 2px 8px rgba(0,0,0,.25)}

    /* ── FORM ── */
    .auth-form{display:none}
    .auth-form.active{display:block}

    .ff{margin-bottom:14px}
    .ff label{display:block;font-size:12px;font-weight:600;color:rgba(255,255,255,.5);margin-bottom:6px;letter-spacing:.3px;text-transform:uppercase}
    .ff-iw{position:relative}
    .ff-iw input{width:100%;padding:12px 40px 12px 14px;background:#132920;border:1.5px solid rgba(255,255,255,.08);border-radius:9px;font-size:14px;color:#fff;outline:none;font-family:inherit;transition:border-color .2s,box-shadow .2s}
    .ff-iw input:focus{border-color:#a3e635;box-shadow:0 0 0 3px rgba(163,230,53,.1)}
    .ff-iw input::placeholder{color:rgba(255,255,255,.2)}
    .ff-eye{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:rgba(255,255,255,.3);font-size:16px;line-height:1;padding:0;transition:color .2s}
    .ff-eye:hover{color:rgba(255,255,255,.6)}
    .ff-plain input{padding:12px 14px}

    /* ── ERROR ── */
    .auth-err{display:none;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.25);border-radius:8px;padding:10px 14px;font-size:13px;color:#f87171;margin-bottom:14px}

    /* ── SUB ROW ── */
    .ff-subrow{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
    .ff-subrow label{font-size:12px;font-weight:600;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.3px}
    .ff-link{font-size:12px;color:#a3e635;font-weight:600;cursor:pointer}
    .ff-link:hover{text-decoration:underline}

    /* ── SUBMIT BTN ── */
    .auth-btn{width:100%;padding:13px;background:#a3e635;border:none;border-radius:9px;font-size:15px;font-weight:800;color:#0f1a10;cursor:pointer;font-family:inherit;letter-spacing:.5px;text-transform:uppercase;transition:background .2s,transform .15s,box-shadow .2s;margin-top:6px}
    .auth-btn:hover{background:#b8f24a;transform:translateY(-1px);box-shadow:0 6px 20px rgba(163,230,53,.3)}
    .auth-btn:active{transform:translateY(0)}
    .auth-btn:disabled{opacity:.6;cursor:not-allowed;transform:none}

    /* ── SWITCH TEXT ── */
    .auth-switch{text-align:center;margin-top:18px;font-size:13px;color:rgba(255,255,255,.4)}
    .auth-switch a,.auth-switch button{color:#a3e635;font-weight:700;background:none;border:none;cursor:pointer;font-size:13px;font-family:inherit}
    .auth-switch a:hover,.auth-switch button:hover{text-decoration:underline}

    /* ── DIVIDER ── */
    .auth-divider{height:1px;background:rgba(255,255,255,.07);margin:18px 0}

    /* ── BENEFITS STRIP ── */
    .auth-benefits{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:22px}
    .benefit-chip{display:flex;align-items:center;gap:5px;background:rgba(163,230,53,.07);border:1px solid rgba(163,230,53,.15);border-radius:6px;padding:5px 9px;font-size:11px;font-weight:600;color:rgba(255,255,255,.6)}
    .benefit-chip i{color:#a3e635;font-size:10px}

    /* ── OPTIONAL LABEL ── */
    .opt-label{font-size:11px;color:rgba(255,255,255,.25);margin-left:6px;font-weight:400;text-transform:none;letter-spacing:0}

    /* ── SIDE INFO ── */
    .auth-info{text-align:center;margin-top:22px;padding-top:22px;border-top:1px solid rgba(255,255,255,.06)}
    .auth-info-title{font-size:12px;color:rgba(255,255,255,.3);text-transform:uppercase;letter-spacing:1px;margin-bottom:12px}
    .auth-stats{display:flex;justify-content:center;gap:24px}
    .astat{text-align:center}
    .astat-val{font-size:18px;font-weight:900;color:#a3e635}
    .astat-lbl{font-size:10px;color:rgba(255,255,255,.3);text-transform:uppercase;letter-spacing:.5px;margin-top:2px}

    /* ── RESPONSIVE ── */
    @media(max-width:480px){
      .auth-card{padding:28px 22px 32px}
      .top-bar{padding:14px 20px}
    }
  </style>
</head>
<body>

<!-- TOPBAR -->
<div class="top-bar">
  <a href="index.php" class="tb-logo">Tron<span>Sick</span></a>
  <a href="index.php" class="tb-back">← Back to Home</a>
</div>

<!-- AUTH CARD -->
<div class="auth-wrap">
  <div class="auth-card">

    <!-- Logo -->
    <div class="al-logo-row">
      <div class="al-icon"><span class="c1"></span><span class="c2"></span><span class="c3"></span><span class="c4"></span></div>
      <div class="al-logo-txt">Tron<span>Sick</span></div>
    </div>

    <!-- Tabs -->
    <div class="auth-tabs">
      <button class="auth-tab active" id="tabLogin" onclick="switchTab('login')">LOG IN</button>
      <button class="auth-tab" id="tabReg" onclick="switchTab('register')">SIGN UP</button>
    </div>

    <!-- ══════════ LOGIN FORM ══════════ -->
    <form class="auth-form active" id="formLogin" onsubmit="handleLogin(event)">
      <div class="auth-err" id="loginErr"></div>

      <div class="ff ff-plain">
        <label>Username or Email</label>
        <div class="ff-iw"><input type="text" id="lId" placeholder="Enter username or email" autocomplete="username"/></div>
      </div>

      <div class="ff">
        <div class="ff-subrow">
          <label>Password</label>
          <span class="ff-link" onclick="showForgot()">Forgot password?</span>
        </div>
        <div class="ff-iw">
          <input type="password" id="lPw" placeholder="Enter password" autocomplete="current-password"/>
          <button type="button" class="ff-eye" onclick="toggleVis('lPw',this)">👁</button>
        </div>
      </div>

      <button type="submit" class="auth-btn" id="loginBtn">LOG IN TO MY ACCOUNT</button>

      <div class="auth-switch">Not a member? <button type="button" onclick="switchTab('register')">Sign Up Free →</button></div>
    </form>

    <!-- ══════════ REGISTER FORM ══════════ -->
    <form class="auth-form" id="formReg" onsubmit="handleReg(event)">
      <div class="auth-err" id="regErr"></div>

      <!-- Benefits -->
      <div class="auth-benefits">
        <div class="benefit-chip"><i>✓</i> Free TRX every 40 min</div>
        <div class="benefit-chip"><i>✓</i> Weekly contest</div>
        <div class="benefit-chip"><i>✓</i> Daily cashback</div>
        <div class="benefit-chip"><i>✓</i> 50% referral bonus</div>
      </div>

      <div class="ff ff-plain">
        <label>Username</label>
        <div class="ff-iw"><input type="text" id="rUser" placeholder="Choose a username" autocomplete="username"/></div>
      </div>

      <div class="ff ff-plain">
        <label>Email</label>
        <div class="ff-iw"><input type="email" id="rEmail" placeholder="Your email address" autocomplete="email"/></div>
      </div>

      <div class="ff">
        <label>Password</label>
        <div class="ff-iw">
          <input type="password" id="rPw" placeholder="Create a password (min. 8 chars)" autocomplete="new-password"/>
          <button type="button" class="ff-eye" onclick="toggleVis('rPw',this)">👁</button>
        </div>
      </div>

      <div class="ff">
        <label>Repeat Password</label>
        <div class="ff-iw">
          <input type="password" id="rPw2" placeholder="Repeat password" autocomplete="new-password"/>
          <button type="button" class="ff-eye" onclick="toggleVis('rPw2',this)">👁</button>
        </div>
      </div>

      <div class="ff ff-plain">
        <label>Referrer <span class="opt-label">(Optional)</span></label>
        <div class="ff-iw"><input type="text" id="rRef" placeholder="Referrer username"/></div>
      </div>

      <button type="submit" class="auth-btn" id="regBtn">CREATE FREE ACCOUNT</button>
      <div class="auth-switch">Already have an account? <button type="button" onclick="switchTab('login')">Log In →</button></div>
    </form>

    <!-- Stats strip -->
    <div class="auth-info">
      <div class="auth-info-title">Join 47,000+ earners</div>
      <div class="auth-stats">
        <div class="astat"><div class="astat-val">40m</div><div class="astat-lbl">Faucet Timer</div></div>
        <div class="astat"><div class="astat-val">9</div><div class="astat-lbl">Casino Games</div></div>
        <div class="astat"><div class="astat-val">50%</div><div class="astat-lbl">Referral Cut</div></div>
        <div class="astat"><div class="astat-val">24h</div><div class="astat-lbl">Cashback</div></div>
      </div>
    </div>

  </div>
</div>

<script>
// ── TAB SWITCH ──────────────────────────────
function switchTab(tab){
  document.getElementById('tabLogin').classList.toggle('active', tab==='login');
  document.getElementById('tabReg').classList.toggle('active', tab==='register');
  document.getElementById('formLogin').classList.toggle('active', tab==='login');
  document.getElementById('formReg').classList.toggle('active', tab==='register');
  // Clear errors
  document.getElementById('loginErr').style.display='none';
  document.getElementById('regErr').style.display='none';
}

// ── PASSWORD TOGGLE ──────────────────────────
function toggleVis(id, btn){
  const i = document.getElementById(id);
  i.type = i.type==='password' ? 'text' : 'password';
  btn.textContent = i.type==='password' ? '👁' : '🙈';
}

// ── FORGOT PASSWORD ──────────────────────────
function showForgot(){
  var err = document.getElementById('loginErr');
  err.style.display='block';
  err.style.background='rgba(163,230,53,.08)';
  err.style.borderColor='rgba(163,230,53,.2)';
  err.style.color='#a3e635';
  err.textContent='Password recovery: Please contact support at support@tronsick.io with your username.';
}

// ── CHECK URL PARAM (auto show register tab) ──
(function(){
  var p = new URLSearchParams(window.location.search);
  if(p.get('tab')==='register') switchTab('register');
})();

// ── LOGIN ────────────────────────────────────
function handleLogin(e){
  e.preventDefault();
  var err = document.getElementById('loginErr');
  var id  = document.getElementById('lId').value.trim();
  var pw  = document.getElementById('lPw').value;
  err.style.background='rgba(239,68,68,.1)';
  err.style.borderColor='rgba(239,68,68,.25)';
  err.style.color='#f87171';
  if(!id||!pw){ err.style.display='block'; err.textContent='Please enter your username/email and password.'; return; }
  err.style.display='none';
  var btn = document.getElementById('loginBtn');
  btn.textContent='Logging in…'; btn.disabled=true;

  setTimeout(function(){
    var uname = id.includes('@') ? id.split('@')[0] : id;
    var uemail = id.includes('@') ? id : '';

    // Priority 1: dedicated real-email key
    var realKey = localStorage.getItem('userRealEmail_'+uname.toLowerCase());
    if(realKey && !realKey.endsWith('@tronsick.io')) uemail = realKey;

    // Priority 2: site_registered_users
    if(!uemail || uemail.endsWith('@tronsick.io')){
      try{
        var ru = JSON.parse(localStorage.getItem('site_registered_users')||'[]');
        var rMatch = ru.find(function(u){ return u.name.toLowerCase()===uname.toLowerCase() || (id.includes('@') && u.email.toLowerCase()===id.toLowerCase()); });
        if(rMatch && rMatch.email && !rMatch.email.endsWith('@tronsick.io')) uemail = rMatch.email;
      }catch(ex){}
    }

    // Priority 3: adm_users
    try{
      var au = JSON.parse(localStorage.getItem('adm_users')||'[]');
      var aMatch = au.find(function(u){ return u.name.toLowerCase()===uname.toLowerCase() || (id.includes('@') && u.email.toLowerCase()===id.toLowerCase()); });
      if(aMatch){
        if((!uemail||uemail.endsWith('@tronsick.io')) && aMatch.email && !aMatch.email.endsWith('@tronsick.io')) uemail=aMatch.email;
        var admBal=parseFloat(aMatch.balance||0);
        if(admBal>0) localStorage.setItem('userBalance',admBal.toFixed(6));
        if(uemail && !uemail.endsWith('@tronsick.io') && aMatch.email.endsWith('@tronsick.io')){
          aMatch.email=uemail; localStorage.setItem('adm_users',JSON.stringify(au));
        }
      } else {
        if(!uemail) uemail=uname+'@tronsick.io';
        var uid2='u_'+uname.toLowerCase().replace(/[^a-z0-9]/g,'');
        au.push({id:uid2,name:uname,email:uemail,balance:'0.000000',banned:false,joined:new Date().toISOString()});
        localStorage.setItem('adm_users',JSON.stringify(au));
      }
    }catch(ex){ if(!uemail) uemail=uname+'@tronsick.io'; }

    if(!uemail) uemail=uname+'@tronsick.io';
    if(uemail && !uemail.endsWith('@tronsick.io')) localStorage.setItem('userRealEmail_'+uname.toLowerCase(), uemail);

    localStorage.setItem('userName', uname);
    localStorage.setItem('userEmail', uemail);
    localStorage.setItem('userLoggedIn','1');
    localStorage.setItem('userId','u_'+uname.toLowerCase().replace(/[^a-z0-9]/g,''));
    if(!localStorage.getItem('bonusRollsGiven_'+uname)){
      localStorage.setItem('bonusRolls','3');
      localStorage.setItem('bonusRollsGiven_'+uname,'1');
    }
    localStorage.setItem('newUserBonus','0');
    window.location.href='faucet.php';
  }, 1200);
}

// ── REGISTER ─────────────────────────────────
function handleReg(e){
  e.preventDefault();
  var err  = document.getElementById('regErr');
  var show = function(m){ err.style.display='block'; err.textContent=m; };
  var u    = document.getElementById('rUser').value.trim();
  var em   = document.getElementById('rEmail').value.trim();
  var pw   = document.getElementById('rPw').value;
  var pw2  = document.getElementById('rPw2').value;
  var ref  = document.getElementById('rRef').value.trim();

  if(!u||u.length<3) return show('Username must be at least 3 characters.');
  if(!/^[a-zA-Z0-9_]+$/.test(u)) return show('Username: letters, numbers, and underscores only.');
  if(!em||!em.includes('@')||!em.includes('.')) return show('Please enter a valid email address.');
  if(pw.length<8) return show('Password must be at least 8 characters.');
  if(pw!==pw2) return show('Passwords do not match — please re-enter.');
  err.style.display='none';

  var btn=document.getElementById('regBtn');
  btn.textContent='Creating Account…'; btn.disabled=true;

  setTimeout(function(){
    var uid='u_'+u.toLowerCase().replace(/[^a-z0-9]/g,'');

    // Save ALL session data
    localStorage.setItem('bonusRolls','3');
    localStorage.setItem('bonusRollsGiven_'+u,'1');
    localStorage.setItem('newUserBonus','0');
    localStorage.setItem('regUser',u);
    localStorage.setItem('userName',u);
    localStorage.setItem('userEmail',em);
    localStorage.setItem('userLoggedIn','1');
    localStorage.setItem('userId',uid);
    // Permanent email key — survives logout
    localStorage.setItem('userRealEmail_'+u.toLowerCase(), em);
    if(ref) localStorage.setItem('userRef',ref);

    // site_registered_users
    try{
      var ru=JSON.parse(localStorage.getItem('site_registered_users')||'[]');
      if(!ru.find(function(x){return x.name===u;})){
        ru.push({name:u,email:em,joined:new Date().toISOString(),balance:'0'});
        localStorage.setItem('site_registered_users',JSON.stringify(ru));
      }
    }catch(ex){}

    // adm_users
    try{
      var au=JSON.parse(localStorage.getItem('adm_users')||'[]');
      if(!au.find(function(x){return x.name===u||x.email===em;})){
        au.push({id:uid,name:u,email:em,balance:'0.000000',banned:false,joined:new Date().toISOString()});
        localStorage.setItem('adm_users',JSON.stringify(au));
      }
    }catch(ex){}

    window.location.href='faucet.php';
  }, 1200);
}
</script>
</body>
</html>
