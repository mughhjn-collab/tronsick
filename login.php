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
    .top-bar{display:flex;align-items:center;padding:18px 32px;position:relative;z-index:10}
    .tb-logo{font-size:22px;font-weight:900;color:#fff;letter-spacing:-.5px;text-decoration:none;transition:opacity .2s}
    .tb-logo:hover{opacity:.8}
    .tb-logo span{color:#a3e635}

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

    /* ── NAV TOPBAR ── */
    .top-bar{display:flex;align-items:center;justify-content:space-between;padding:16px 32px;position:relative;z-index:10;border-bottom:1px solid rgba(255,255,255,.05)}
    .tb-left{display:flex;align-items:center;gap:0}
    .tb-logo{font-size:21px;font-weight:900;color:#fff;letter-spacing:-.5px;text-decoration:none;transition:opacity .2s}
    .tb-logo:hover{opacity:.8}
    .tb-logo span{color:#a3e635}
    .tb-nav{display:flex;align-items:center;gap:6px}
    .tb-nav a{font-size:13px;font-weight:600;color:rgba(255,255,255,.5);padding:7px 14px;border-radius:8px;transition:all .2s;text-decoration:none}
    .tb-nav a:hover{color:#fff;background:rgba(255,255,255,.07)}
    .tb-nav a.tb-active{color:#a3e635}
    .tb-nav .tb-signup{background:#a3e635;color:#0f1a10;font-weight:800;padding:7px 16px}
    .tb-nav .tb-signup:hover{background:#b8f24a;color:#0f1a10}

    /* ── FOOTER ── */
    .auth-footer{text-align:center;padding:24px 20px 28px;border-top:1px solid rgba(255,255,255,.05);margin-top:auto}
    .auth-footer-links{display:flex;justify-content:center;gap:20px;flex-wrap:wrap;margin-bottom:10px}
    .auth-footer-links a{font-size:12px;color:rgba(255,255,255,.3);text-decoration:none;transition:color .2s}
    .auth-footer-links a:hover{color:rgba(255,255,255,.7)}
    .auth-footer-copy{font-size:11px;color:rgba(255,255,255,.2)}

    /* ── RESPONSIVE ── */
    @media(max-width:560px){
      .auth-card{padding:28px 22px 32px}
      .top-bar{padding:12px 16px}
      .tb-nav .tb-home{display:none}
    }
  </style>
</head>
<body>

<!-- TOPBAR -->
<div class="top-bar">
  <a href="index.php?landing=1" class="tb-logo">Tron<span>Sick</span></a>
  <nav class="tb-nav">
    <a href="index.php?landing=1" class="tb-home">Home</a>
    <a href="login.php" class="tb-active" id="navLoginLink">Log In</a>
    <a href="login.php?tab=register" class="tb-signup" id="navSignupLink">Sign Up</a>
  </nav>
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
        <div class="ff-iw"><input type="text" id="lId" placeholder="Enter username or email" autocomplete="username" onblur="check2FAField()" oninput="check2FAField()"/></div>
      </div>

      <div class="ff">
        <div class="ff-subrow">
          <label>Password</label>
          <span class="ff-link" onclick="switchTab('forgot')">Forgot password?</span>
        </div>
        <div class="ff-iw">
          <input type="password" id="lPw" placeholder="Enter password" autocomplete="current-password"/>
          <button type="button" class="ff-eye" onclick="toggleVis('lPw',this)">👁</button>
        </div>
      </div>

      <!-- 2FA field — always visible, required only if 2FA is enabled -->
      <div class="ff ff-plain" id="twofa-wrap">
        <label>2FA Code <span class="opt-label">(Optional — only if 2FA is enabled)</span></label>
        <div class="ff-iw"><input type="text" id="l2fa" placeholder="Enter 6-digit code from authenticator app" maxlength="6" autocomplete="one-time-code" inputmode="numeric" pattern="[0-9]*"/></div>
      </div>

      <button type="submit" class="auth-btn" id="loginBtn">LOG IN TO MY ACCOUNT</button>

      <div class="auth-switch">Not a member? <button type="button" onclick="switchTab('register')">Sign Up Free →</button></div>
    </form>

    <!-- ══════════ FORGOT PASSWORD PANEL ══════════ -->
    <div class="auth-form" id="formForgot">
      <div style="margin-bottom:18px">
        <div style="font-size:16px;font-weight:800;color:#fff;margin-bottom:6px">🔑 Reset Password</div>
        <div style="font-size:13px;color:rgba(255,255,255,.45)">Enter your registered email address and we'll send you a password reset link.</div>
      </div>
      <div class="auth-err" id="forgotErr"></div>
      <div id="forgotSuccess" style="display:none;background:rgba(62,207,142,.08);border:1px solid rgba(62,207,142,.2);border-radius:8px;padding:12px 14px;font-size:13px;color:#3ecf8e;margin-bottom:14px"></div>
      <div class="ff ff-plain" id="forgotEmailWrap">
        <label>Your Email Address</label>
        <div class="ff-iw"><input type="email" id="forgotEmail" placeholder="Enter your registered email" autocomplete="email"/></div>
      </div>
      <button type="button" class="auth-btn" id="forgotBtn" onclick="sendResetLink()" style="margin-bottom:12px">SEND RESET LINK</button>
      <div class="auth-switch"><button type="button" onclick="switchTab('login')">← Back to Login</button></div>
    </div>

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

  </div>
</div>


<script>
// ── TAB SWITCH ──────────────────────────────
function switchTab(tab){
  var tabs = ['login','register','forgot'];
  tabs.forEach(function(t){
    var f = document.getElementById(t==='login'?'formLogin':t==='register'?'formReg':'formForgot');
    if(f) f.classList.toggle('active', t===tab);
    var tb = document.getElementById('tab'+t.charAt(0).toUpperCase()+t.slice(1));
    if(tb) tb.classList.toggle('active', t===tab);
  });
  // Clear errors
  ['loginErr','regErr','forgotErr'].forEach(function(id){ var el=document.getElementById(id); if(el) el.style.display='none'; });
  var fs=document.getElementById('forgotSuccess'); if(fs) fs.style.display='none';
  var fw=document.getElementById('forgotEmailWrap'); if(fw) fw.style.display='block';
  var fb=document.getElementById('forgotBtn'); if(fb){fb.style.display='block';fb.disabled=false;fb.textContent='SEND RESET LINK';}
}

// ── PASSWORD TOGGLE ──────────────────────────
function toggleVis(id, btn){
  const i = document.getElementById(id);
  i.type = i.type==='password' ? 'text' : 'password';
  btn.textContent = i.type==='password' ? '👁' : '🙈';
}

// ── FORGOT PASSWORD ──────────────────────────
function showForgotPanel(){ switchTab('forgot'); }

function sendResetLink(){
  var email = document.getElementById('forgotEmail').value.trim();
  var err   = document.getElementById('forgotErr');
  var succ  = document.getElementById('forgotSuccess');
  err.style.display='none'; succ.style.display='none';

  if(!email||!email.includes('@')||!email.includes('.')){
    err.style.display='block'; err.textContent='Please enter a valid email address.'; return;
  }

  // ── Check if email is registered ──
  var emailLower = email.toLowerCase();
  var isRegistered = false;

  // Check site_registered_users
  try{
    var ru=JSON.parse(localStorage.getItem('site_registered_users')||'[]');
    if(ru.find(function(u){ return u.email && u.email.toLowerCase()===emailLower; })) isRegistered=true;
  }catch(e){}

  // Check adm_users
  if(!isRegistered){
    try{
      var au=JSON.parse(localStorage.getItem('adm_users')||'[]');
      if(au.find(function(u){ return u.email && u.email.toLowerCase()===emailLower; })) isRegistered=true;
    }catch(e){}
  }

  // Check userRealEmail_ keys
  if(!isRegistered){
    for(var k in localStorage){
      if(k.startsWith('userRealEmail_') && localStorage.getItem(k) && localStorage.getItem(k).toLowerCase()===emailLower){
        isRegistered=true; break;
      }
    }
  }

  if(!isRegistered){
    err.style.display='block';
    err.textContent='This email is not registered. Please check your email address or sign up for a new account.';
    return;
  }

  var btn = document.getElementById('forgotBtn');
  btn.textContent='Sending…'; btn.disabled=true;

  // Generate reset token
  var token = Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2);
  var expires = Date.now() + 60*60*1000; // 1 hour
  localStorage.setItem('pwreset_'+token, JSON.stringify({email:emailLower, expires:expires}));
  localStorage.setItem('pwreset_email_'+emailLower, token);

  var resetLink = window.location.origin+'/reset_password.php?token='+token;

  // Send email via PHP
  fetch('forgot_pw.php', {
    method:'POST',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    body:'email='+encodeURIComponent(email)+'&token='+encodeURIComponent(token)+'&link='+encodeURIComponent(resetLink)
  }).catch(function(){});

  // Show clean success message — no backup link shown
  setTimeout(function(){
    document.getElementById('forgotEmailWrap').style.display='none';
    btn.style.display='none';
    succ.innerHTML =
      '<strong style="font-size:14px">✅ Reset link sent!</strong><br/><br/>'+
      'A password reset link has been sent to <strong>'+email+'</strong>.<br/>'+
      'Please check your inbox (and spam folder) and click the link to reset your password.<br/><br/>'+
      '<span style="font-size:12px;opacity:.6">The link will expire in 1 hour.</span>';
    succ.style.display='block';
  }, 1500);
}


// ── CHECK URL PARAM (auto show register tab) ──
(function(){
  var p = new URLSearchParams(window.location.search);
  if(p.get('tab')==='register') switchTab('register');
})();

// ══════════════════════════════════════════════
// TOTP 2FA VERIFICATION (Google Authenticator)
// ══════════════════════════════════════════════
var B32_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
function base32Decode(s){
  s = s.toUpperCase().replace(/=+$/,'');
  var bits=0, val=0, out=[];
  for(var i=0;i<s.length;i++){
    val=(val<<5)|B32_CHARS.indexOf(s[i]);
    bits+=5;
    if(bits>=8){bits-=8;out.push((val>>bits)&0xff);}
  }
  return new Uint8Array(out);
}
async function verifyTOTP(secret,code){
  if(!code||code.length!==6) return false;
  var key=base32Decode(secret);
  var t=Math.floor(Date.now()/1000/30);
  for(var i=-1;i<=1;i++){
    var c=t+i;
    var buf=new ArrayBuffer(8);
    new DataView(buf).setUint32(4,c,false);
    try{
      var ck=await crypto.subtle.importKey('raw',key,{name:'HMAC',hash:'SHA-1'},false,['sign']);
      var sig=await crypto.subtle.sign('HMAC',ck,buf);
      var h=new Uint8Array(sig);
      var off=h[h.length-1]&0x0f;
      var n=((h[off]&0x7f)<<24)|((h[off+1]&0xff)<<16)|((h[off+2]&0xff)<<8)|(h[off+3]&0xff);
      if(String(n%1000000).padStart(6,'0')===String(code)) return true;
    }catch(ex){}
  }
  return false;
}

// Check if username has 2FA enabled — show field if so
function check2FAField(){
  var id=document.getElementById('lId').value.trim();
  var uname=id.includes('@')?id.split('@')[0]:id;
  var has2FA=localStorage.getItem('2fa_secret_'+uname.toLowerCase());
  var wrap=document.getElementById('twofa-wrap');
  if(wrap) wrap.style.display=has2FA?'block':'none';
}

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

  // Check 2FA before proceeding
  var uname0 = id.includes('@') ? id.split('@')[0] : id;
  var secret2fa = localStorage.getItem('2fa_secret_'+uname0.toLowerCase());
  var code2fa = document.getElementById('l2fa') ? document.getElementById('l2fa').value.trim() : '';

  if(secret2fa){
    if(!code2fa){ err.style.display='block'; err.textContent='Please enter your 2FA code from your authenticator app.'; btn.textContent='LOG IN TO MY ACCOUNT'; btn.disabled=false; return; }
    verifyTOTP(secret2fa, code2fa).then(function(valid){
      if(!valid){ err.style.display='block'; err.textContent='Invalid 2FA code. Please check your authenticator app and try again.'; btn.textContent='LOG IN TO MY ACCOUNT'; btn.disabled=false; return; }
      doLoginFinish(id, btn);
    });
  } else {
    setTimeout(function(){ doLoginFinish(id, btn); }, 1200);
  }
}
function doLoginFinish(id, btn){
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
  }, 800);
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

<!-- FOOTER -->
<footer class="auth-footer">
  <div class="auth-footer-links">
    <a href="index.php?landing=1">Home</a>
    <a href="index.php?landing=1#features">Features</a>
    <a href="index.php?landing=1#games">Games</a>
    <a href="index.php?landing=1#faq">FAQ</a>
    <a href="index.php?landing=1#payouts">Payouts</a>
  </div>
  <div class="auth-footer-copy">&copy; 2026 TronSick.io &mdash; Free TRX Faucet &amp; Casino</div>
</footer>

</body>
</html>

