<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Password – TronSick</title>
  <meta name="description" content="Reset your TronSick account password."/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
  <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html,body{height:100%;font-family:'Inter',sans-serif}
    body{background:#2a3f36;min-height:100vh;display:flex;flex-direction:column}
    a{text-decoration:none;color:inherit}

    .top-bar{display:flex;align-items:center;padding:18px 32px;z-index:10}
    .tb-logo{font-size:22px;font-weight:900;color:#fff;letter-spacing:-.5px;transition:opacity .2s}
    .tb-logo:hover{opacity:.8}
    .tb-logo span{color:#a3e635}

    .auth-wrap{flex:1;display:flex;align-items:center;justify-content:center;padding:24px 16px 48px}
    .auth-card{background:#1e3530;border-radius:16px;padding:38px 40px 40px;width:100%;max-width:440px;box-shadow:0 32px 80px rgba(0,0,0,.45),0 0 0 1px rgba(255,255,255,.06)}

    .al-logo-row{display:flex;align-items:center;gap:10px;margin-bottom:24px}
    .al-icon{width:36px;height:36px;border-radius:9px;display:grid;grid-template-columns:1fr 1fr;gap:2px;padding:5px;background:#132920;flex-shrink:0}
    .al-icon span{border-radius:3px;display:block}
    .al-icon .c1{background:#e11d48}.al-icon .c2{background:#f59e0b}
    .al-icon .c3{background:#22c55e}.al-icon .c4{background:#3b82f6}
    .al-logo-txt{font-size:20px;font-weight:900;color:#fff;letter-spacing:-.3px}
    .al-logo-txt span{color:#a3e635}

    .page-title{font-size:18px;font-weight:800;color:#fff;margin-bottom:6px}
    .page-sub{font-size:13px;color:rgba(255,255,255,.45);margin-bottom:26px;line-height:1.5}

    .ff{margin-bottom:14px}
    .ff label{display:block;font-size:12px;font-weight:600;color:rgba(255,255,255,.5);margin-bottom:6px;letter-spacing:.3px;text-transform:uppercase}
    .ff-iw{position:relative}
    .ff-iw input{width:100%;padding:12px 40px 12px 14px;background:#132920;border:1.5px solid rgba(255,255,255,.08);border-radius:9px;font-size:14px;color:#fff;outline:none;font-family:inherit;transition:border-color .2s,box-shadow .2s}
    .ff-iw input:focus{border-color:#a3e635;box-shadow:0 0 0 3px rgba(163,230,53,.1)}
    .ff-iw input::placeholder{color:rgba(255,255,255,.2)}
    .ff-eye{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:rgba(255,255,255,.3);font-size:16px;line-height:1;padding:0}

    .auth-btn{width:100%;padding:13px;background:#a3e635;border:none;border-radius:9px;font-size:15px;font-weight:800;color:#0f1a10;cursor:pointer;font-family:inherit;letter-spacing:.5px;text-transform:uppercase;transition:background .2s,transform .15s;margin-top:6px}
    .auth-btn:hover{background:#b8f24a;transform:translateY(-1px)}
    .auth-btn:disabled{opacity:.6;cursor:not-allowed;transform:none}

    .auth-err{display:none;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.25);border-radius:8px;padding:10px 14px;font-size:13px;color:#f87171;margin-bottom:14px}
    .auth-succ{display:none;background:rgba(62,207,142,.08);border:1px solid rgba(62,207,142,.2);border-radius:8px;padding:14px;font-size:13px;color:#3ecf8e;margin-bottom:14px;line-height:1.6}

    .invalid-box{text-align:center;padding:30px 0}
    .invalid-box .ib-icon{font-size:48px;margin-bottom:16px}
    .invalid-box h2{color:#fff;font-size:18px;margin-bottom:8px}
    .invalid-box p{color:rgba(255,255,255,.45);font-size:13px;line-height:1.6;margin-bottom:20px}
    .go-login{display:inline-block;padding:11px 24px;background:#a3e635;border-radius:9px;color:#0f1a10;font-weight:800;font-size:14px;text-transform:uppercase;text-decoration:none}

    .pw-rules{font-size:11px;color:rgba(255,255,255,.35);margin-top:6px;line-height:1.5}

    @media(max-width:480px){.auth-card{padding:26px 20px 30px}}
  </style>
</head>
<body>

<div class="top-bar">
  <a href="index.php?landing=1" class="tb-logo">Tron<span>Sick</span></a>
</div>

<div class="auth-wrap">
  <div class="auth-card">

    <div class="al-logo-row">
      <div class="al-icon"><span class="c1"></span><span class="c2"></span><span class="c3"></span><span class="c4"></span></div>
      <div class="al-logo-txt">Tron<span>Sick</span></div>
    </div>

    <!-- Content injected by JS below -->
    <div id="reset-content"></div>

  </div>
</div>

<script>
(function(){
  var params = new URLSearchParams(window.location.search);
  var token  = params.get('token') || '';
  var content = document.getElementById('reset-content');

  if(!token){
    showInvalid('No Reset Token', 'This link is invalid. Please request a new password reset from the login page.');
    return;
  }

  // Validate token from localStorage
  var stored = localStorage.getItem('pwreset_'+token);
  // Also try sessionStorage as fallback (cross-tab)
  if(!stored) stored = sessionStorage.getItem('pwreset_'+token);
  if(!stored){
    // Token might have been set in different tab - try server validation
    fetch('forgot_pw.php', {
      method:'POST',
      headers:{'Content-Type':'application/x-www-form-urlencoded'},
      body:'action=check_token&token='+encodeURIComponent(token)
    }).then(function(r){return r.json();}).then(function(d){
      if(d&&d.valid){
        // Server says valid - create local data
        var expiry = Date.now() + 60*60*1000;
        var fakeData = JSON.stringify({email:d.email||'',expires:expiry});
        localStorage.setItem('pwreset_'+token, fakeData);
        showResetForm(token, d.email||'');
      } else {
        showInvalid('Invalid or Expired Link', 'This password reset link has already been used or has expired. Please request a new one from the login page.');
      }
    }).catch(function(){
      showInvalid('Invalid or Expired Link', 'This password reset link has already been used or has expired. Please request a new one from the login page.');
    });
    return;
  }

  var data;
  try{ data = JSON.parse(stored); }catch(e){ showInvalid('Invalid Link','This link is corrupted. Please request a new password reset.'); return; }

  if(Date.now() > data.expires){
    localStorage.removeItem('pwreset_'+token);
    showInvalid('Link Expired', 'This password reset link has expired (valid for 1 hour only). Please request a new one from the login page.');
    return;
  }

  // Show reset form
  showResetForm(token, data.email);

  function showInvalid(title, msg){
    content.innerHTML =
      '<div class="invalid-box">'+
        '<div class="ib-icon">⚠️</div>'+
        '<h2>'+title+'</h2>'+
        '<p>'+msg+'</p>'+
        '<a href="login.php" class="go-login">Back to Login</a>'+
      '</div>';
  }

  function showResetForm(token, email){
    content.innerHTML =
      '<div class="page-title">🔑 Set New Password</div>'+
      '<div class="page-sub">Choose a new password for your account associated with <strong style="color:#a3e635">'+email+'</strong></div>'+
      '<div class="auth-err" id="rpErr"></div>'+
      '<div class="auth-succ" id="rpSucc"></div>'+
      '<div class="ff"><label>New Password</label><div class="ff-iw">'+
        '<input type="password" id="rpPw" placeholder="Enter new password (min. 8 chars)" autocomplete="new-password"/>'+
        '<button type="button" class="ff-eye" onclick="toggleVis(\'rpPw\',this)">👁</button>'+
      '</div><div class="pw-rules">At least 8 characters. Mix letters, numbers and symbols for best security.</div></div>'+
      '<div class="ff"><label>Confirm New Password</label><div class="ff-iw">'+
        '<input type="password" id="rpPw2" placeholder="Repeat new password" autocomplete="new-password"/>'+
        '<button type="button" class="ff-eye" onclick="toggleVis(\'rpPw2\',this)">👁</button>'+
      '</div></div>'+
      '<button class="auth-btn" id="rpBtn" onclick="doReset(\''+token+'\',\''+email+'\')">SAVE NEW PASSWORD</button>'+
      '<div style="text-align:center;margin-top:16px"><a href="login.php" style="font-size:13px;color:rgba(255,255,255,.35)">← Back to Login</a></div>';
  }
})();

function toggleVis(id, btn){
  var i = document.getElementById(id);
  i.type = i.type==='password'?'text':'password';
  btn.textContent = i.type==='password'?'👁':'🙈';
}

function doReset(token, email){
  var err  = document.getElementById('rpErr');
  var succ = document.getElementById('rpSucc');
  var pw   = document.getElementById('rpPw').value;
  var pw2  = document.getElementById('rpPw2').value;
  var btn  = document.getElementById('rpBtn');
  err.style.display='none'; succ.style.display='none';

  if(pw.length < 8){ err.style.display='block'; err.textContent='Password must be at least 8 characters.'; return; }
  if(pw !== pw2){ err.style.display='block'; err.textContent='Passwords do not match — please re-enter.'; return; }

  btn.textContent='Saving…'; btn.disabled=true;

  setTimeout(function(){
    // Save new password to localStorage (keyed by email and any matching username)
    localStorage.setItem('userPw_email_'+email.toLowerCase(), pw);

    // Try to find username by email
    try{
      var ru = JSON.parse(localStorage.getItem('site_registered_users')||'[]');
      var match = ru.find(function(u){ return u.email && u.email.toLowerCase()===email.toLowerCase(); });
      if(match){ localStorage.setItem('userPw_'+match.name.toLowerCase(), pw); }
    }catch(e){}
    try{
      var au = JSON.parse(localStorage.getItem('adm_users')||'[]');
      var am = au.find(function(u){ return u.email && u.email.toLowerCase()===email.toLowerCase(); });
      if(am){ localStorage.setItem('userPw_'+am.name.toLowerCase(), pw); }
    }catch(e){}

    // Invalidate the token
    localStorage.removeItem('pwreset_'+token);
    localStorage.removeItem('pwreset_email_'+email.toLowerCase());

    // Also notify server to invalidate token
    fetch('forgot_pw.php?action=invalidate', {
      method:'POST',
      headers:{'Content-Type':'application/x-www-form-urlencoded'},
      body:'token='+encodeURIComponent(token)+'&action=invalidate'
    }).catch(function(){});

    // Show success
    succ.innerHTML = '✅ Password changed successfully!<br/>You can now <a href="login.php" style="color:#a3e635;font-weight:700">log in with your new password →</a>';
    succ.style.display='block';
    document.getElementById('rpBtn').style.display='none';
  }, 1000);
}
</script>
</body>
</html>
