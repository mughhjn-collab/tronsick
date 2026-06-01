<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Bonus &ndash; TronSick</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
  <link rel="stylesheet" href="dashboard.css?v=17"/>
  <link rel="stylesheet" href="mobile.css?v=1"/>
  <link rel="stylesheet" href="games_new.css?v=9"/>
<script>if(!localStorage.getItem("userLoggedIn")||!localStorage.getItem("userName")){window.location.replace("https://tronsick.io/login.php");}</script>
<script>function doSiteLogout(){var keys=['userName','userEmail','userLoggedIn','userId','userBalance','regUser','bonusRolls','newUserBonus','lastFaucet','lastBonus','lastClaim','totalWagered','userLevel','userRef','dep_addr_'+localStorage.getItem('userName'),'stakeData','stakeTimer'];keys.forEach(function(k){if(k)localStorage.removeItem(k);});localStorage.setItem('_justLoggedOut','1');window.location.replace('https://tronsick.io/');}</script>
<style>
/* ------------------------------------
   BONUS PAGE STYLES
------------------------------------ */
.bonus-outer{max-width:700px;margin:0 auto;padding:24px 16px 80px}

/* Hero Banner */
.bonus-hero{background:linear-gradient(135deg,#0a1628 0%,#0d2040 50%,#0a1628 100%);border:1px solid rgba(200,168,75,.25);border-radius:18px;padding:36px 28px;text-align:center;position:relative;overflow:hidden;margin-bottom:28px}
.bonus-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(200,168,75,.1),transparent 70%)}
.bonus-hero-icon{font-size:52px;margin-bottom:12px;display:block}
.bonus-hero-title{font-size:26px;font-weight:900;color:#fff;margin:0 0 8px;letter-spacing:.5px}
.bonus-hero-sub{font-size:14px;color:rgba(255,255,255,.55);margin:0}

/* Tier Cards */
.bonus-tiers{display:flex;flex-direction:column;gap:16px;margin-bottom:28px}
.tier-card{background:#111b2e;border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:22px 20px;position:relative;overflow:hidden;transition:border-color .25s,transform .2s}
.tier-card:hover{border-color:rgba(255,255,255,.18);transform:translateY(-2px)}
.tier-card.locked{opacity:.85}
.tier-card.unlocked{border-color:rgba(62,207,142,.35)}
.tier-card.claimed{border-color:rgba(100,100,100,.3);opacity:.6}
.tier-glow-gold{box-shadow:0 0 24px rgba(200,168,75,.08)}
.tier-glow-green{box-shadow:0 0 24px rgba(62,207,142,.08)}
.tier-glow-blue{box-shadow:0 0 24px rgba(99,179,237,.08)}

.tier-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.tier-badge{display:flex;align-items:center;gap:10px}
.tier-icon{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
.ti-gold{background:linear-gradient(135deg,#92400e,#d97706)}
.ti-green{background:linear-gradient(135deg,#065f46,#059669)}
.ti-blue{background:linear-gradient(135deg,#1e3a5f,#2563eb)}
.tier-name{font-size:15px;font-weight:800;color:#fff}
.tier-dep{font-size:12px;color:rgba(255,255,255,.45);margin-top:2px}

.tier-pct{text-align:right}
.tier-pct-val{font-size:28px;font-weight:900;line-height:1}
.pct-gold{color:#c8a84b}
.pct-green{color:#3ecf8e}
.pct-blue{color:#63b3ed}
.tier-pct-lbl{font-size:11px;color:rgba(255,255,255,.35);text-transform:uppercase;letter-spacing:1px}

/* Progress bar */
.tier-progress-wrap{margin-bottom:14px}
.tier-prog-labels{display:flex;justify-content:space-between;font-size:11px;color:rgba(255,255,255,.35);margin-bottom:6px}
.tier-prog-bar{height:8px;background:rgba(255,255,255,.07);border-radius:99px;overflow:hidden}
.tier-prog-fill{height:100%;border-radius:99px;transition:width .6s ease}
.fill-gold{background:linear-gradient(90deg,#92400e,#f59e0b)}
.fill-green{background:linear-gradient(90deg,#065f46,#3ecf8e)}
.fill-blue{background:linear-gradient(90deg,#1e3a5f,#63b3ed)}

/* Info row */
.tier-info-row{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px}
.tier-info-chip{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:8px 12px;font-size:12px;flex:1;min-width:130px}
.tic-label{color:rgba(255,255,255,.4);margin-bottom:3px;font-size:11px;text-transform:uppercase;letter-spacing:.5px}
.tic-val{color:#fff;font-weight:700}

/* Status badges */
.tier-status{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:99px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.8px}
.ts-locked{background:rgba(239,68,68,.1);color:#f87171;border:1px solid rgba(239,68,68,.2)}
.ts-unlocked{background:rgba(62,207,142,.1);color:#3ecf8e;border:1px solid rgba(62,207,142,.2)}
.ts-claimed{background:rgba(100,116,139,.1);color:#94a3b8;border:1px solid rgba(100,116,139,.2)}
.ts-pending{background:rgba(245,158,11,.1);color:#f59e0b;border:1px solid rgba(245,158,11,.2)}

/* Claim button */
.tier-actions{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px}
.claim-btn{padding:10px 22px;border-radius:9px;font-size:13px;font-weight:800;cursor:pointer;border:none;transition:all .2s;letter-spacing:.5px}
.cb-unlocked{background:linear-gradient(135deg,#059669,#3ecf8e);color:#fff}
.cb-unlocked:hover{transform:scale(1.04);box-shadow:0 4px 20px rgba(62,207,142,.3)}
.cb-locked{background:rgba(255,255,255,.06);color:rgba(255,255,255,.3);cursor:not-allowed}
.cb-claimed{background:rgba(100,116,139,.1);color:#64748b;cursor:not-allowed;border:1px solid rgba(100,116,139,.2)}

/* Empty state (no deposit yet) */
.bonus-empty{text-align:center;padding:48px 24px;background:#111b2e;border:1px dashed rgba(255,255,255,.12);border-radius:16px;margin-bottom:24px}
.bonus-empty-icon{font-size:48px;margin-bottom:14px}
.bonus-empty-title{font-size:18px;font-weight:800;color:#fff;margin-bottom:8px}
.bonus-empty-desc{font-size:13px;color:rgba(255,255,255,.45);line-height:1.7;max-width:380px;margin:0 auto 20px}
.go-deposit-btn{display:inline-flex;align-items:center;gap:8px;padding:12px 26px;background:linear-gradient(135deg,#c8a84b,#f59e0b);border:none;border-radius:10px;color:#000;font-size:14px;font-weight:800;cursor:pointer;text-decoration:none;transition:all .2s}
.go-deposit-btn:hover{transform:scale(1.04);box-shadow:0 6px 24px rgba(200,168,75,.3)}

/* How it works */
.bonus-how{background:#0d1726;border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:20px;margin-bottom:24px}
.bonus-how-title{font-size:13px;font-weight:800;color:rgba(255,255,255,.5);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:16px}
.how-steps{display:flex;flex-direction:column;gap:12px}
.how-step{display:flex;align-items:flex-start;gap:12px}
.how-num{width:26px;height:26px;background:linear-gradient(135deg,#1e3a5f,#2563eb);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:#fff;flex-shrink:0;margin-top:2px}
.how-text{font-size:13px;color:rgba(255,255,255,.6);line-height:1.6}
.how-text strong{color:#fff}

/* Toast */
.bonus-toast{position:fixed;top:24px;left:50%;transform:translateX(-50%) translateY(-80px);background:#1a2635;border:1px solid rgba(62,207,142,.3);color:#3ecf8e;padding:12px 24px;border-radius:10px;font-size:13px;font-weight:700;z-index:9999;transition:transform .3s;white-space:nowrap}
.bonus-toast.show{transform:translateX(-50%) translateY(0)}

@media(max-width:480px){
  .tier-card{padding:16px 14px}
  .bonus-hero{padding:24px 16px}
  .tier-info-chip{min-width:110px}
}
</style>
</head>
<body>

<!-- OVERLAY -->
<div class="overlay" id="overlay" onclick="closeSidebar()"></div>

<!-- SIDEBAR -->
<aside class="sidebar" id="sidebar">
  <div class="sb-head">
    <button class="burger" onclick="toggleSidebar()"><span></span><span></span><span></span></button>
    <div class="sb-logo">Tron<span>Sick</span></div>
  </div>
  <nav class="sb-nav">
    <a class="sb-item"        id="nav-home"       href="/faucet.php">      <i>&#x1F3E0;</i><s>Home</s></a>
    <a class="sb-item"        id="nav-games"       href="/games.php">     <i>&#x1F3AE;</i><s>Games</s></a>
    <a class="sb-item"        id="nav-deposit"     href="/deposit.php">   <i>&#x1F4B0;</i><s>Deposit</s></a>
    <a class="sb-item"        id="nav-withdraw"    href="/withdraw.php">  <i>&#x1F3E6;</i><s>Withdraw</s></a>
    <a class="sb-item"        id="nav-cashback"    href="/cashback.php">  <i>&#x1F4B5;</i><s>Cashback</s></a>
    <a class="sb-item"        id="nav-contest"     href="/contest.php">   <i>&#x1F3C6;</i><s>Contest</s></a>
    <a class="sb-item active" id="nav-bonus"       href="/bonus.php">     <i>&#127873;</i><s>Bonus</s></a>
    <a class="sb-item"        id="nav-surveys"     href="/surveys.php">   <i>&#x1F4CB;</i><s>Surveys</s></a>
    <a class="sb-item"        id="nav-affiliates"  href="/affiliates.php"><i>&#x1F91D;</i><s>Affiliates</s></a>
    <a class="sb-item"        id="nav-gifts"       href="/gifts.php">     <i>&#x1F381;</i><s>Gifts</s></a>
    <a class="sb-item"        id="nav-settings"    href="/settings.php">  <i>&#9881;</i><s>Settings</s></a>
    <a class="sb-item"        id="nav-contact"     href="/contact.php">   <i>&#9993;</i><s>Contact</s></a>
    <div class="sb-gap"></div>
    <div class="sb-gap"></div>
    <a class="sb-item sb-out" href="javascript:void(0)" onclick="doSiteLogout()"><i>&#x1F534;</i><s>Logout</s></a>
  </nav>
</aside>

<!-- TOPBAR -->
<header class="topbar">
  <div class="tb-left">
    <button class="burger" onclick="toggleSidebar()"><span></span><span></span><span></span></button>
  </div>
  <div class="tb-bal">
    <img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" class="trx-hdr-logo" alt="TRX"/>
    <span id="userBalance">0.000000</span> TRX
  </div>
  <div class="tb-user">
    <span class="tb-uname" id="userName"></span>
  </div>
</header>

<!-- MAIN -->
<div class="main">
  <div class="bonus-outer">

    <!-- HERO -->
    <div class="bonus-hero">
      <span class="bonus-hero-icon">??</span>
      <h1 class="bonus-hero-title">Deposit Bonus</h1>
      <p class="bonus-hero-sub">Deposit TRX and earn instant bonus rewards ? unlock by wagering</p>
    </div>

    <!-- HOW IT WORKS -->
    <div class="bonus-how">
      <div class="bonus-how-title">How It Works</div>
      <div class="how-steps">
        <div class="how-step"><div class="how-num">1</div><div class="how-text"><strong>Deposit TRX</strong> ? Make your first deposit to qualify for a bonus tier</div></div>
        <div class="how-step"><div class="how-num">2</div><div class="how-text"><strong>Bonus is Added</strong> ? Your bonus is credited automatically but stays <strong>locked</strong></div></div>
        <div class="how-step"><div class="how-num">3</div><div class="how-text"><strong>Wager to Unlock</strong> ? Play games to meet the wager requirement and unlock your bonus</div></div>
        <div class="how-step"><div class="how-num">4</div><div class="how-text"><strong>Claim</strong> ? Once wagering is complete, click Claim to add bonus to your balance</div></div>
      </div>
    </div>

    <!-- BONUS TIERS / STATUS -->
    <div id="bonusContent">
      <!-- Rendered by JS -->
    </div>

  </div>
</div>

<!-- BONUS TOAST -->
<div class="bonus-toast" id="bonusToast"></div>

<?php include __DIR__ . '/site_inject.php'; ?>
<script src="site_sync.js?v=4"></script>
<script src="dashboard.js?v=21"></script>
<script>
// -------------------------------------------
// BONUS SYSTEM
// -------------------------------------------

var BONUS_TIERS = [
  {
    id: 'b100',
    name: 'Starter Bonus',
    icon: '??',
    iconCls: 'ti-gold',
    pctCls: 'pct-gold',
    fillCls: 'fill-gold',
    glowCls: 'tier-glow-gold',
    depositMin: 100,
    bonusPct: 5,
    wagerReq: 50,
    label: '100 TRX Deposit'
  },
  {
    id: 'b500',
    name: 'Silver Bonus',
    icon: '??',
    iconCls: 'ti-green',
    pctCls: 'pct-green',
    fillCls: 'fill-green',
    glowCls: 'tier-glow-green',
    depositMin: 500,
    bonusPct: 8,
    wagerReq: 200,
    label: '500 TRX Deposit'
  },
  {
    id: 'b2000',
    name: 'Gold Bonus',
    icon: '??',
    iconCls: 'ti-blue',
    pctCls: 'pct-blue',
    fillCls: 'fill-blue',
    glowCls: 'tier-glow-blue',
    depositMin: 2000,
    bonusPct: 20,
    wagerReq: 1000,
    label: '2000 TRX Deposit'
  }
];

function getBonusData(){
  try{ return JSON.parse(localStorage.getItem('userBonuses')||'{}'); }catch(e){ return {}; }
}
function saveBonusData(d){
  localStorage.setItem('userBonuses', JSON.stringify(d));
}

function renderBonus(){
  var data = getBonusData();
  var wager = parseFloat(localStorage.getItem('totalWagered')||'0');
  var hasAny = BONUS_TIERS.some(function(t){ return data[t.id]; });

  var html = '';

  if(!hasAny){
    html += '<div class="bonus-empty">' +
      '<div class="bonus-empty-icon">??</div>' +
      '<div class="bonus-empty-title">No Active Bonus</div>' +
      '<div class="bonus-empty-desc">Make your first deposit to unlock exclusive bonus rewards. The more you deposit, the bigger your bonus!</div>' +
      '<a href="/deposit.php" class="go-deposit-btn"><i class="fas fa-arrow-up"></i> Make a Deposit</a>' +
      '</div>';

    // Show all tiers as preview
    html += '<div class="bonus-tiers">';
    BONUS_TIERS.forEach(function(t){
      var bonusAmt = (t.depositMin * t.bonusPct / 100).toFixed(1);
      html += '<div class="tier-card locked '+t.glowCls+'">' +
        '<div class="tier-top">' +
          '<div class="tier-badge"><div class="tier-icon '+t.iconCls+'">'+t.icon+'</div>' +
            '<div><div class="tier-name">'+t.name+'</div><div class="tier-dep">Deposit '+t.depositMin+' TRX</div></div>' +
          '</div>' +
          '<div class="tier-pct"><div class="tier-pct-val '+t.pctCls+'">'+t.bonusPct+'%</div><div class="tier-pct-lbl">Bonus</div></div>' +
        '</div>' +
        '<div class="tier-info-row">' +
          '<div class="tier-info-chip"><div class="tic-label">Min Deposit</div><div class="tic-val">'+t.depositMin+' TRX</div></div>' +
          '<div class="tier-info-chip"><div class="tic-label">Bonus Amount</div><div class="tic-val">+'+bonusAmt+' TRX</div></div>' +
          '<div class="tier-info-chip"><div class="tic-label">Wager Required</div><div class="tic-val">'+t.wagerReq+' TRX</div></div>' +
        '</div>' +
        '<div class="tier-actions">' +
          '<span class="tier-status ts-pending"><i class="fas fa-lock"></i> Deposit to Activate</span>' +
          '<button class="claim-btn cb-locked" disabled>Locked</button>' +
        '</div>' +
      '</div>';
    });
    html += '</div>';
  } else {
    html += '<div class="bonus-tiers">';
    BONUS_TIERS.forEach(function(t){
      if(!data[t.id]) return;
      var b = data[t.id];
      var wagered = wager - (b.wagerStart||0);
      wagered = Math.max(0, wagered);
      var progress = Math.min(100, (wagered / t.wagerReq) * 100);
      var remaining = Math.max(0, t.wagerReq - wagered).toFixed(2);
      var status = b.claimed ? 'claimed' : (progress >= 100 ? 'unlocked' : 'locked');
      var bonusAmt = parseFloat(b.bonusAmount||0).toFixed(6);

      var statusBadge = '';
      var claimBtn = '';
      if(status === 'claimed'){
        statusBadge = '<span class="tier-status ts-claimed"><i class="fas fa-check-double"></i> Claimed</span>';
        claimBtn = '<button class="claim-btn cb-claimed" disabled>Claimed ?</button>';
      } else if(status === 'unlocked'){
        statusBadge = '<span class="tier-status ts-unlocked"><i class="fas fa-unlock"></i> Ready to Claim!</span>';
        claimBtn = '<button class="claim-btn cb-unlocked" onclick="claimBonus(\''+t.id+'\')"><i class="fas fa-gift"></i> Claim '+bonusAmt+' TRX</button>';
      } else {
        statusBadge = '<span class="tier-status ts-locked"><i class="fas fa-lock"></i> Locked ? '+remaining+' TRX wager left</span>';
        claimBtn = '<button class="claim-btn cb-locked" disabled>Wager to Unlock</button>';
      }

      html += '<div class="tier-card '+status+' '+t.glowCls+'">' +
        '<div class="tier-top">' +
          '<div class="tier-badge"><div class="tier-icon '+t.iconCls+'">'+t.icon+'</div>' +
            '<div><div class="tier-name">'+t.name+'</div><div class="tier-dep">'+t.label+'</div></div>' +
          '</div>' +
          '<div class="tier-pct"><div class="tier-pct-val '+t.pctCls+'">+'+bonusAmt+'</div><div class="tier-pct-lbl">TRX Bonus</div></div>' +
        '</div>' +
        '<div class="tier-progress-wrap">' +
          '<div class="tier-prog-labels"><span>Wagered: '+wagered.toFixed(2)+' TRX</span><span>Required: '+t.wagerReq+' TRX</span></div>' +
          '<div class="tier-prog-bar"><div class="tier-prog-fill '+t.fillCls+'" style="width:'+progress+'%"></div></div>' +
        '</div>' +
        '<div class="tier-info-row">' +
          '<div class="tier-info-chip"><div class="tic-label">Deposit</div><div class="tic-val">'+parseFloat(b.depositAmount||0).toFixed(2)+' TRX</div></div>' +
          '<div class="tier-info-chip"><div class="tic-label">Progress</div><div class="tic-val">'+progress.toFixed(0)+'%</div></div>' +
          '<div class="tier-info-chip"><div class="tic-label">Wager Left</div><div class="tic-val">'+(status==='claimed'||status==='unlocked'?'0.00':remaining)+' TRX</div></div>' +
        '</div>' +
        '<div class="tier-actions">'+statusBadge+claimBtn+'</div>' +
      '</div>';
    });
    html += '</div>';
  }

  document.getElementById('bonusContent').innerHTML = html;
}

function claimBonus(tierId){
  var data = getBonusData();
  var b = data[tierId];
  if(!b || b.claimed) return;
  var wager = parseFloat(localStorage.getItem('totalWagered')||'0');
  var wagered = wager - (b.wagerStart||0);
  var tier = BONUS_TIERS.find(function(t){ return t.id===tierId; });
  if(wagered < tier.wagerReq){ showBonusToast('? Wager requirement not met yet!'); return; }
  b.claimed = true;
  b.claimedAt = Date.now();
  data[tierId] = b;
  saveBonusData(data);
  // Add bonus to balance
  addBal(parseFloat(b.bonusAmount||0));
  showBonusToast('?? '+parseFloat(b.bonusAmount).toFixed(6)+' TRX bonus claimed!');
  setTimeout(renderBonus, 500);
}

function showBonusToast(msg){
  var t = document.getElementById('bonusToast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function(){ t.classList.remove('show'); }, 3500);
}

// Check if bonus should be awarded based on deposit
function checkAndAwardBonus(depositAmtTRX){
  var data = getBonusData();
  var wager = parseFloat(localStorage.getItem('totalWagered')||'0');
  var awarded = false;
  BONUS_TIERS.slice().reverse().forEach(function(t){
    if(depositAmtTRX >= t.depositMin && !data[t.id]){
      var bonusAmt = depositAmtTRX * t.bonusPct / 100;
      data[t.id] = {
        depositAmount: depositAmtTRX,
        bonusAmount: bonusAmt.toFixed(6),
        bonusPct: t.bonusPct,
        wagerStart: wager,
        wagerReq: t.wagerReq,
        claimed: false,
        awardedAt: Date.now()
      };
      awarded = true;
    }
  });
  if(awarded){
    saveBonusData(data);
    renderBonus();
  }
}

// Expose globally for deposit page
window.checkAndAwardBonus = checkAndAwardBonus;

// Init
syncBal();
renderBonus();
</script>
</body>
</html>
