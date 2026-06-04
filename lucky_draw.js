
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// LUCKY DRAW â€” Full Logic v4
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

// Level targets & names (same as dashboard.js)
var _LD_LEVEL_TARGETS = [300, 300, 3000, 30000, 300000, 3000000, 30000000];
var _LD_LEVEL_NAMES   = ['Stone','Iron','Bronze','Silver','Gold','Platinum','Diamond','Master'];
var _LD_LEVEL_ORDER   = {stone:0, iron:1, bronze:2, silver:3, gold:4, platinum:5, diamond:6, master:7};

// Apply a level from Lucky Draw â€” updates localStorage + all visible UI elements
function _ldApplyLevel(levelId) {
  var levelName = levelId.charAt(0).toUpperCase() + levelId.slice(1);

  // === CRITICAL FIX ===
  // faucet.php's updateLevelUI() calculates level ONLY from totalWagered.
  // It completely ignores userLevel in localStorage.
  // If totalWagered < levelMin, updateLevelUI() resets to Stone, overriding the win.
  // Solution: boost totalWagered to the level minimum before calling updateLevelUI().
  var _LD_MIN_WAGER = {
    stone: 0, iron: 300, bronze: 300, silver: 1000,
    gold: 3000, platinum: 10000, diamond: 30000, master: 100000
  };
  var levelMin = _LD_MIN_WAGER[levelId.toLowerCase()] || 0;
  var currentWager = parseFloat(localStorage.getItem('totalWagered') || '0');

  // Only set wager to minimum if user is below it â€” never reduce existing wager
  if (currentWager < levelMin) {
    localStorage.setItem('totalWagered', levelMin.toString());
  }
  localStorage.setItem('userLevel', levelName);

  // Now updateLevelUI sees totalWagered >= levelMin and correctly shows won level
  try { if (typeof updateLevelUI === 'function') updateLevelUI(); } catch(e) {}
  try { if (typeof updateLevelDisplay === 'function') updateLevelDisplay(); } catch(e2) {}
  try { syncBal(); } catch(e3) {}
}

function openLuckyDraw() {
  var modal = document.getElementById('luckyDrawModal');
  if(!modal) {
    // Build modal if not present (for pages that don't have it inline)
    _buildLuckyDrawModal();
    modal = document.getElementById('luckyDrawModal');
  }
  if(!modal) return;
  ldRefreshStatus();
  modal.style.display = 'flex';
}

function _buildLuckyDrawModal() {
  if(document.getElementById('luckyDrawModal')) return;
  var el = document.createElement('div');
  el.id = 'luckyDrawModal';
  el.style.cssText = 'display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.8);align-items:center;justify-content:center;padding:16px';
  el.innerHTML = _luckyDrawHTML();
  document.body.appendChild(el);
  // Load lucky_draw.js script if not yet loaded
}

function _luckyDrawHTML() {
  return '<div style="background:linear-gradient(160deg,#0d1f35 0%,#111b2e 100%);border:1px solid rgba(62,207,142,.3);border-radius:20px;max-width:500px;width:100%;padding:30px 24px 24px;position:relative;max-height:92vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.6)">' +
    '<button onclick="document.getElementById(\'luckyDrawModal\').style.display=\'none\'" style="position:absolute;top:14px;right:16px;background:rgba(255,255,255,.08);border:none;color:rgba(255,255,255,.6);font-size:20px;cursor:pointer;border-radius:6px;width:32px;height:32px;line-height:32px;text-align:center">&times;</button>' +
    '<div style="text-align:center;margin-bottom:20px">' +
      '<div style="font-size:40px;margin-bottom:6px">&#127881;</div>' +
      '<div style="font-size:22px;font-weight:900;color:#fff;letter-spacing:.5px">Lucky Draw</div>' +
      '<div style="font-size:12px;color:rgba(232,240,235,.5);margin-top:5px">Each account gets <strong style="color:#3ecf8e">1 Free Draw</strong> &amp; <strong style="color:#ffd700">1 Paid Draw</strong></div>' +
    '</div>' +
    '<div style="display:flex;gap:10px;margin-bottom:20px">' +
      '<button id="ldTabFreeBtn" onclick="ldShowTab(\'free\')" style="flex:1;padding:11px;border-radius:11px;font-size:13px;font-weight:800;cursor:pointer;background:#3ecf8e;color:#0a1628;border:2px solid #3ecf8e;transition:all .2s">&#127920; Free Draw</button>' +
      '<button id="ldTabPaidBtn" onclick="ldShowTab(\'paid\')" style="flex:1;padding:11px;border-radius:11px;font-size:13px;font-weight:800;cursor:pointer;background:rgba(255,255,255,.06);color:rgba(232,240,235,.7);border:2px solid rgba(255,255,255,.15);transition:all .2s">&#128176; Paid Draw</button>' +
    '</div>' +

    '<!-- FREE TAB -->' +
    '<div id="ldTabFree">' +
      '<div style="background:rgba(62,207,142,.07);border:1px solid rgba(62,207,142,.18);border-radius:12px;padding:12px 14px;margin-bottom:14px;font-size:12px;color:rgba(232,240,235,.65);line-height:1.6">' +
        '<strong style="color:#3ecf8e">&#127920; Free Draw â€” How it works:</strong><br>' +
        'Every new account gets <strong>1 free spin</strong> â€” no cost! Randomly win: <strong style="color:#a0aab0">Iron Level upgrade</strong> (80%) or <strong style="color:#3ecf8e">0.05 TRX</strong> added to balance (20%). One-time per account.' +
      '</div>' +
      '<div style="font-size:11px;color:rgba(232,240,235,.45);text-align:center;margin-bottom:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px">&#127381; Prize Wheel</div>' +
      '<div style="display:flex;gap:10px;margin-bottom:16px">' +
        '<div class="ld-prize-card" style="flex:1;background:linear-gradient(135deg,rgba(160,170,176,.18),rgba(160,170,176,.06));border:2px solid rgba(160,170,176,.45);border-radius:14px;padding:16px 10px;text-align:center">' +
          '<div style="font-size:38px;margin-bottom:6px">&#129704;</div>' +
          '<div style="font-size:15px;font-weight:900;color:#c8cfd3">Iron Level</div>' +
          '<div style="font-size:10px;color:rgba(232,240,235,.4);margin-top:3px">Account Upgrade</div>' +
        '</div>' +
        '<div style="display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.35);font-size:14px;font-weight:900;min-width:24px">OR</div>' +
        '<div class="ld-prize-card" style="flex:1;background:linear-gradient(135deg,rgba(62,207,142,.18),rgba(62,207,142,.06));border:2px solid rgba(62,207,142,.45);border-radius:14px;padding:16px 10px;text-align:center">' +
          '<div style="font-size:38px;margin-bottom:6px">&#128176;</div>' +
          '<div style="font-size:15px;font-weight:900;color:#3ecf8e">0.05 TRX</div>' +
          '<div style="font-size:10px;color:rgba(232,240,235,.4);margin-top:3px">Added to Balance</div>' +
        '</div>' +
      '</div>' +
      '<div id="ldFreeStatus" style="text-align:center;font-size:13px;margin-bottom:12px;font-weight:600"></div>' +
      '<button id="ldFreeBtn" onclick="doFreeDraw()" style="width:100%;padding:14px;background:linear-gradient(135deg,#059669,#3ecf8e);border:none;border-radius:12px;color:#fff;font-size:16px;font-weight:900;cursor:pointer;letter-spacing:.5px;box-shadow:0 4px 20px rgba(62,207,142,.3)">&#127920; SPIN FREE DRAW</button>' +
      '<div id="ldFreeResult" style="display:none;margin-top:16px;text-align:center;padding:18px;border-radius:12px"></div>' +
    '</div>' +

    '<!-- PAID TAB -->' +
    '<div id="ldTabPaid" style="display:none">' +
      '<div style="background:rgba(255,215,0,.07);border:1px solid rgba(255,215,0,.18);border-radius:12px;padding:12px 14px;margin-bottom:14px;font-size:12px;color:rgba(232,240,235,.65);line-height:1.6">' +
        '<strong style="color:#ffd700">&#128176; Paid Draw â€” How it works:</strong><br>' +
        'Entry: <strong>500 TRX</strong> from your balance (1 time per account). Randomly win one of three premium level upgrades (â‰ˆ33% each). Level upgraded instantly!' +
      '</div>' +
      '<div style="font-size:11px;color:rgba(232,240,235,.45);text-align:center;margin-bottom:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px">&#127942; Prize Wheel</div>' +
      '<div style="display:flex;gap:8px;margin-bottom:16px">' +
        '<div class="ld-prize-card" style="flex:1;background:linear-gradient(135deg,rgba(255,215,0,.18),rgba(255,215,0,.06));border:2px solid rgba(255,215,0,.5);border-radius:14px;padding:16px 8px;text-align:center">' +
          '<div style="font-size:34px;margin-bottom:5px">&#127942;</div>' +
          '<div style="font-size:14px;font-weight:900;color:#ffd700">Gold</div>' +
          '<div style="font-size:9px;color:rgba(232,240,235,.4);margin-top:2px">0.5 TRX/claim</div>' +
        '</div>' +
        '<div class="ld-prize-card" style="flex:1;background:linear-gradient(135deg,rgba(229,228,226,.18),rgba(229,228,226,.06));border:2px solid rgba(229,228,226,.45);border-radius:14px;padding:16px 8px;text-align:center">' +
          '<div style="font-size:34px;margin-bottom:5px">&#129351;</div>' +
          '<div style="font-size:14px;font-weight:900;color:#e5e4e2">Platinum</div>' +
          '<div style="font-size:9px;color:rgba(232,240,235,.4);margin-top:2px">5 TRX/claim</div>' +
        '</div>' +
        '<div class="ld-prize-card" style="flex:1;background:linear-gradient(135deg,rgba(185,242,255,.18),rgba(185,242,255,.06));border:2px solid rgba(185,242,255,.45);border-radius:14px;padding:16px 8px;text-align:center">' +
          '<div style="font-size:34px;margin-bottom:5px">&#128142;</div>' +
          '<div style="font-size:14px;font-weight:900;color:#b9f2ff">Diamond</div>' +
          '<div style="font-size:9px;color:rgba(232,240,235,.4);margin-top:2px">15 TRX/claim</div>' +
        '</div>' +
      '</div>' +
      '<div id="ldPaidStatus" style="text-align:center;font-size:13px;margin-bottom:12px;font-weight:600"></div>' +
      '<button id="ldPaidBtn" onclick="doPaidDraw()" style="width:100%;padding:14px;background:linear-gradient(135deg,#b8860b,#ffd700);border:none;border-radius:12px;color:#0a1628;font-size:16px;font-weight:900;cursor:pointer;letter-spacing:.5px;box-shadow:0 4px 20px rgba(255,215,0,.3)">&#128176; SPIN PAID DRAW (500 TRX)</button>' +
      '<div id="ldPaidResult" style="display:none;margin-top:16px;text-align:center;padding:18px;border-radius:12px"></div>' +
    '</div>' +
  '</div>';
}
function ldShowTab(tab) {
  var freeDiv = document.getElementById('ldTabFree');
  var paidDiv = document.getElementById('ldTabPaid');
  var freeBtn = document.getElementById('ldTabFreeBtn');
  var paidBtn = document.getElementById('ldTabPaidBtn');
  if(tab === 'free') {
    if(freeDiv) freeDiv.style.display = '';
    if(paidDiv) paidDiv.style.display = 'none';
    if(freeBtn) { freeBtn.style.background='#3ecf8e'; freeBtn.style.color='#0a1628'; freeBtn.style.border='2px solid #3ecf8e'; }
    if(paidBtn) { paidBtn.style.background='rgba(255,255,255,.06)'; paidBtn.style.color='rgba(232,240,235,.7)'; paidBtn.style.border='2px solid rgba(255,255,255,.15)'; }
  } else {
    if(freeDiv) freeDiv.style.display = 'none';
    if(paidDiv) paidDiv.style.display = '';
    if(paidBtn) { paidBtn.style.background='#ffd700'; paidBtn.style.color='#0a1628'; paidBtn.style.border='2px solid #ffd700'; }
    if(freeBtn) { freeBtn.style.background='rgba(255,255,255,.06)'; freeBtn.style.color='rgba(232,240,235,.7)'; freeBtn.style.border='2px solid rgba(255,255,255,.15)'; }
  }
}

function ldRefreshStatus() {
  var user = (localStorage.getItem('userName') || 'guest').toLowerCase();
  var freeDone = localStorage.getItem('ld_free_' + user) === '1';
  var paidDone = localStorage.getItem('ld_paid_' + user) === '1';

  var freeStatus = document.getElementById('ldFreeStatus');
  var paidStatus = document.getElementById('ldPaidStatus');
  var freeBtn = document.getElementById('ldFreeBtn');
  var paidBtn = document.getElementById('ldPaidBtn');
  var freeResult = document.getElementById('ldFreeResult');
  var paidResult = document.getElementById('ldPaidResult');

  if(freeDone) {
    if(freeStatus) { freeStatus.innerHTML = '&#9989; You have already used your Free Draw!'; freeStatus.style.color = '#3ecf8e'; }
    if(freeBtn) { freeBtn.disabled = true; freeBtn.textContent = 'âœ… Free Draw Used'; freeBtn.style.opacity = '0.5'; freeBtn.style.cursor = 'not-allowed'; }
    var stored = localStorage.getItem('ld_free_result_' + user);
    if(stored && freeResult) { freeResult.innerHTML = stored; freeResult.style.display = 'block'; }
  } else {
    if(freeStatus) { freeStatus.innerHTML = '&#127881; You have <strong>1 Free Draw</strong> available â€” spin now!'; freeStatus.style.color = '#3ecf8e'; }
    if(freeBtn) { freeBtn.disabled = false; freeBtn.innerHTML = '&#127920; SPIN FREE DRAW'; freeBtn.style.opacity = '1'; freeBtn.style.cursor = 'pointer'; }
    if(freeResult) freeResult.style.display = 'none';
  }

  if(paidDone) {
    if(paidStatus) { paidStatus.innerHTML = '&#9989; You have already used your Paid Draw!'; paidStatus.style.color = '#ffd700'; }
    if(paidBtn) { paidBtn.disabled = true; paidBtn.textContent = 'âœ… Paid Draw Used'; paidBtn.style.opacity = '0.5'; paidBtn.style.cursor = 'not-allowed'; }
    var storedP = localStorage.getItem('ld_paid_result_' + user);
    if(storedP && paidResult) { paidResult.innerHTML = storedP; paidResult.style.display = 'block'; }
  } else {
    if(paidStatus) {
      var bal = parseFloat(localStorage.getItem('userBalance')) || 0;
      if(bal < 500) {
        paidStatus.innerHTML = '&#9888;&#65039; You need <strong>500 TRX</strong> to enter. Your balance: <strong>' + bal.toFixed(4) + ' TRX</strong>';
        paidStatus.style.color = '#f87171';
        if(paidBtn) { paidBtn.disabled = true; paidBtn.style.opacity = '0.5'; paidBtn.style.cursor = 'not-allowed'; }
      } else {
        paidStatus.innerHTML = '&#128176; You have enough balance! Cost: <strong>500 TRX</strong>. Win Gold, Platinum or Diamond!';
        paidStatus.style.color = '#ffd700';
        if(paidBtn) { paidBtn.disabled = false; paidBtn.style.opacity = '1'; paidBtn.style.cursor = 'pointer'; }
      }
    }
    if(paidResult) paidResult.style.display = 'none';
  }
}

// â”€â”€ FREE DRAW â”€â”€
function doFreeDraw() {
  var user = (localStorage.getItem('userName') || 'guest').toLowerCase();
  if(localStorage.getItem('ld_free_' + user) === '1') {
    try { showToast('You already used your Free Draw!'); } catch(e) {}
    return;
  }

  var btn = document.getElementById('ldFreeBtn');
  if(btn) { btn.disabled = true; btn.innerHTML = '&#127920; Spinning...'; }

  // Animate prize cards
  var cards = document.querySelectorAll('#ldTabFree .ld-prize-card');
  var flashCount = 0;
  var flashInterval = setInterval(function(){
    cards.forEach(function(c,i){ c.style.opacity = (flashCount % 2 === i % 2) ? '1' : '0.3'; });
    flashCount++;
    if(flashCount > 8) { clearInterval(flashInterval); cards.forEach(function(c){ c.style.opacity='1'; }); }
  }, 200);

  setTimeout(function() {
    var prizes = [
      { id: 'iron',   label: 'âš™ï¸ Iron Level', icon: '&#129704;', htmlLabel: '&#129704; Iron Level',   desc: 'Your account level has been upgraded to <strong>Iron</strong>!',    color: '#a0aab0', bg: 'rgba(160,170,176,.12)', border: 'rgba(160,170,176,.3)' },
      { id: 'iron',   label: 'âš™ï¸ Iron Level', icon: '&#129704;', htmlLabel: '&#129704; Iron Level',   desc: 'Your account level has been upgraded to <strong>Iron</strong>!',    color: '#a0aab0', bg: 'rgba(160,170,176,.12)', border: 'rgba(160,170,176,.3)' },
      { id: 'iron',   label: 'âš™ï¸ Iron Level', icon: '&#129704;', htmlLabel: '&#129704; Iron Level',   desc: 'Your account level has been upgraded to <strong>Iron</strong>!',    color: '#a0aab0', bg: 'rgba(160,170,176,.12)', border: 'rgba(160,170,176,.3)' },
      { id: 'iron',   label: 'âš™ï¸ Iron Level', icon: '&#129704;', htmlLabel: '&#129704; Iron Level',   desc: 'Your account level has been upgraded to <strong>Iron</strong>!',    color: '#a0aab0', bg: 'rgba(160,170,176,.12)', border: 'rgba(160,170,176,.3)' },
      { id: 'trx005', label: '0.05 TRX',      icon: '&#128176;', htmlLabel: '&#128176; 0.05 TRX',      desc: '<strong>0.05 TRX</strong> has been added to your balance!', color: '#3ecf8e', bg: 'rgba(62,207,142,.1)',   border: 'rgba(62,207,142,.3)'  }
    ];
    var won = prizes[Math.floor(Math.random() * prizes.length)];

    if(won.id === 'iron') {
      _ldApplyLevel('iron');
    } else if(won.id === 'trx005') {
      try { addBal(0.05); } catch(e) {
        var b = parseFloat(localStorage.getItem('userBalance')||'0');
        localStorage.setItem('userBalance', (b + 0.05).toString());
      }
    }

    localStorage.setItem('ld_free_' + user, '1');
    // Force level + wager UI update
    try { if(typeof updateLevelUI==='function') updateLevelUI(); } catch(e) {}
    try { if(typeof initLevelSystem==='function') initLevelSystem(); } catch(e) {}
    try { if(typeof updateLevelDisplay==='function') updateLevelDisplay(); } catch(e) {}
    try { if(typeof updateWager==='function') updateWager(0); } catch(e) {}
    try { if(typeof renderContestLeaderboard==='function') renderContestLeaderboard(); } catch(e) {}
    try { if(typeof _ctUpdateMyStats==='function') _ctUpdateMyStats(); } catch(e) {}

    var resultHTML = '<div style="font-size:38px;margin-bottom:10px">&#127881;</div>' +
      '<div style="font-size:13px;color:rgba(232,240,235,.6);margin-bottom:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px">You Won!</div>' +
      '<div style="color:' + won.color + ';font-size:24px;font-weight:900;margin-bottom:8px">' + won.htmlLabel + '</div>' +
      '<div style="color:rgba(232,240,235,.7);font-size:13px">' + won.desc + '</div>';
    localStorage.setItem('ld_free_result_' + user, resultHTML);

    var res = document.getElementById('ldFreeResult');
    if(res) {
      res.innerHTML = resultHTML;
      res.style.cssText = 'display:block;margin-top:16px;text-align:center;padding:20px;border-radius:14px;background:' + won.bg + ';border:2px solid ' + won.border + ';animation:ldPop .4s ease';
    }

    ldRefreshStatus();
    try { showToast('ðŸŽ‰ ' + won.label + ' â€” Won!'); } catch(e) {}
  }, 1800);
}

// â”€â”€ PAID DRAW â”€â”€
function doPaidDraw() {
  var user = (localStorage.getItem('userName') || 'guest').toLowerCase();
  if(localStorage.getItem('ld_paid_' + user) === '1') {
    try { showToast('You already used your Paid Draw!'); } catch(e) {}
    return;
  }

  var bal = parseFloat(localStorage.getItem('userBalance')) || 0;
  if(bal < 500) {
    try { showToast('&#9888; You need 500 TRX to enter the Paid Draw!'); } catch(e) {}
    return;
  }

  if(!confirm('This will deduct 500 TRX from your balance.\n\nYou will win Gold, Platinum, or Diamond level!\n\nConfirm?')) return;

  var btn = document.getElementById('ldPaidBtn');
  if(btn) { btn.disabled = true; btn.innerHTML = '&#128176; Spinning...'; }

  // Animate prize cards
  var cards = document.querySelectorAll('#ldTabPaid .ld-prize-card');
  var flashCount = 0;
  var flashInterval = setInterval(function(){
    cards.forEach(function(c,i){ c.style.opacity = (flashCount % 3 === i) ? '1' : '0.2'; });
    flashCount++;
    if(flashCount > 12) { clearInterval(flashInterval); cards.forEach(function(c){ c.style.opacity='1'; }); }
  }, 180);

  setTimeout(function() {
    try { addBal(-500); } catch(e) {
      var b = parseFloat(localStorage.getItem('userBalance')||'0');
      localStorage.setItem('userBalance', Math.max(0, b - 500).toString());
    }

    var prizes = [
      { id: 'gold',     label: 'ðŸ¥‡ Gold Level',     htmlLabel: '&#127942; Gold Level',     color: '#ffd700', bg: 'rgba(255,215,0,.1)',     border: 'rgba(255,215,0,.4)',     desc: 'Earn <strong>0.5 TRX</strong> per faucet claim!' },
      { id: 'platinum', label: 'ðŸª§ Platinum Level', htmlLabel: '&#129351; Platinum Level', color: '#e5e4e2', bg: 'rgba(229,228,226,.1)',   border: 'rgba(229,228,226,.4)',   desc: 'Earn <strong>5 TRX</strong> per faucet claim!' },
      { id: 'diamond',  label: 'ðŸ’Ž Diamond Level',  htmlLabel: '&#128142; Diamond Level',  color: '#b9f2ff', bg: 'rgba(185,242,255,.1)',   border: 'rgba(185,242,255,.4)',   desc: 'Earn <strong>15 TRX</strong> per faucet claim!' }
    ];
    var won = prizes[Math.floor(Math.random() * prizes.length)];

    _ldApplyLevel(won.id);

    localStorage.setItem('ld_paid_' + user, '1');
    // Force level + wager UI update
    try { if(typeof updateLevelUI==='function') updateLevelUI(); } catch(e) {}
    try { if(typeof initLevelSystem==='function') initLevelSystem(); } catch(e) {}
    try { if(typeof updateLevelDisplay==='function') updateLevelDisplay(); } catch(e) {}
    try { if(typeof updateWager==='function') updateWager(0); } catch(e) {}
    try { if(typeof renderContestLeaderboard==='function') renderContestLeaderboard(); } catch(e) {}
    try { if(typeof _ctUpdateMyStats==='function') _ctUpdateMyStats(); } catch(e) {}
    // Sync wagered display
    try { var wv=parseFloat(localStorage.getItem('totalWagered')||'0'); ['wagered','gWagered'].forEach(function(id){var el=document.getElementById(id);if(el)el.textContent=wv.toFixed(6);}); } catch(e) {}
    // Update wager progress bar for new level
    var newLvl = won.id.toLowerCase();
    var lvlWagerTargets = {stone:0,iron:30,bronze:100,silver:500,gold:2000,platinum:5000,diamond:15000,master:50000};
    var nextLvlIdx = ['stone','iron','bronze','silver','gold','platinum','diamond','master'].indexOf(newLvl)+1;
    var nextTarget = nextLvlIdx < 8 ? Object.values(lvlWagerTargets)[nextLvlIdx] : 50000;
    ['progTarget','gProgTarget'].forEach(function(id){ var el=document.getElementById(id); if(el) el.textContent=nextTarget+' TRX'; });

    var resultHTML = '<div style="font-size:42px;margin-bottom:10px">&#127881;</div>' +
      '<div style="font-size:13px;color:rgba(232,240,235,.6);margin-bottom:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px">Congratulations!</div>' +
      '<div style="color:' + won.color + ';font-size:26px;font-weight:900;margin-bottom:8px">' + won.htmlLabel + '</div>' +
      '<div style="color:rgba(232,240,235,.7);font-size:13px;margin-bottom:6px">' + won.desc + '</div>' +
      '<div style="color:rgba(232,240,235,.4);font-size:11px">500 TRX entry fee deducted</div>';
    localStorage.setItem('ld_paid_result_' + user, resultHTML);

    var res = document.getElementById('ldPaidResult');
    if(res) {
      res.innerHTML = resultHTML;
      res.style.cssText = 'display:block;margin-top:16px;text-align:center;padding:22px;border-radius:14px;background:' + won.bg + ';border:2px solid ' + won.border;
    }

    ldRefreshStatus();
    try { showToast('ðŸŽ‰ ' + won.label + ' â€” Level Upgraded!'); } catch(e) {}
  }, 2200);
}

// CSS animation for result pop
(function(){
  var st = document.createElement('style');
  st.textContent = '@keyframes ldPop{0%{transform:scale(.8);opacity:0}100%{transform:scale(1);opacity:1}}';
  document.head.appendChild(st);
})();
/* deploy-stamp:2026-06-04T04:53:41.456Z */

