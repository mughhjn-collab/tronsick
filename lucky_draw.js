
// ═══════════════════════════════════════════════════════
// LUCKY DRAW — Full Logic v4
// ═══════════════════════════════════════════════════════

// Level targets & names (same as dashboard.js)
var _LD_LEVEL_TARGETS = [300, 300, 3000, 30000, 300000, 3000000, 30000000];
var _LD_LEVEL_NAMES   = ['Stone','Iron','Bronze','Silver','Gold','Platinum','Diamond','Master'];
var _LD_LEVEL_ORDER   = {stone:0, iron:1, bronze:2, silver:3, gold:4, platinum:5, diamond:6, master:7};

// Apply a level from Lucky Draw — updates localStorage + all visible UI elements
function _ldApplyLevel(levelId) {
  var levelName = levelId.charAt(0).toUpperCase() + levelId.slice(1);
  localStorage.setItem('userLevel', levelName);

  var lvlIdx = _LD_LEVEL_ORDER[levelId.toLowerCase()] || 0;

  // 1) Update level label (header / faucet page)
  ['curLevelLabel','gCurLevelLabel'].forEach(function(id){
    var el = document.getElementById(id); if(el) el.textContent = levelName;
  });

  // 2) Update progress bar TARGET to next level's wager requirement
  var nextTarget = lvlIdx < _LD_LEVEL_TARGETS.length ? _LD_LEVEL_TARGETS[lvlIdx] : _LD_LEVEL_TARGETS[_LD_LEVEL_TARGETS.length-1];
  var targetStr  = nextTarget + ' TRX';
  ['progTarget','gProgTarget','levelTarget'].forEach(function(id){
    var el = document.getElementById(id); if(el) el.textContent = targetStr;
  });

  // 3) Update "from" and "to" level labels on progress bar
  ['progFrom','gProgFrom'].forEach(function(id){
    var el = document.getElementById(id); if(el) el.textContent = levelName;
  });
  ['progTo','gProgTo'].forEach(function(id){
    var nextName = _LD_LEVEL_NAMES[Math.min(lvlIdx+1,7)];
    var el = document.getElementById(id); if(el) el.textContent = nextName;
  });

  // 4) Update level table row highlights (remove tbl-on from all, add to current)
  var levels = ['stone','iron','bronze','silver','gold','platinum','diamond','master'];
  levels.forEach(function(l){
    var row = document.getElementById('lvl-'+l);
    if(!row) return;
    row.classList.remove('tbl-on');
    row.innerHTML = '<td>'+l.charAt(0).toUpperCase()+l.slice(1)+'</td>' + row.innerHTML.match(/<td>.*?<\/td>$/)?.[0];
  });
  var activeRow = document.getElementById('lvl-'+levelId.toLowerCase());
  if(activeRow){
    activeRow.classList.add('tbl-on');
    // Add checkmark to level name
    var firstTd = activeRow.querySelector('td');
    if(firstTd && !firstTd.querySelector('strong')){
      firstTd.innerHTML = '<strong>'+levelName+' &#10003;</strong>';
    }
  }

  // 5) Try calling syncBal to re-render everything if available
  try { syncBal(); } catch(e) {}
  // 6) Try native updateLevelDisplay if it exists
  try { if(typeof updateLevelDisplay==='function') updateLevelDisplay(); } catch(e2) {}
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
    '<div style="text-align:center;margin-bottom:24px">' +
      '<div style="font-size:42px;margin-bottom:8px">&#127881;</div>' +
      '<div style="font-size:22px;font-weight:900;color:#fff;letter-spacing:.5px">Lucky Draw</div>' +
      '<div style="font-size:13px;color:rgba(232,240,235,.5);margin-top:6px;line-height:1.5">Try your luck! Spin to win exclusive prizes.<br>Each account gets <strong style="color:#3ecf8e">1 Free Draw</strong> &amp; <strong style="color:#ffd700">1 Paid Draw</strong>.</div>' +
    '</div>' +
    '<div style="display:flex;gap:10px;margin-bottom:22px">' +
      '<button id="ldTabFreeBtn" onclick="ldShowTab(\'free\')" style="flex:1;padding:11px;border-radius:11px;font-size:13px;font-weight:800;cursor:pointer;background:#3ecf8e;color:#0a1628;border:2px solid #3ecf8e;transition:all .2s">&#127920; Free Draw</button>' +
      '<button id="ldTabPaidBtn" onclick="ldShowTab(\'paid\')" style="flex:1;padding:11px;border-radius:11px;font-size:13px;font-weight:800;cursor:pointer;background:rgba(255,255,255,.06);color:rgba(232,240,235,.7);border:2px solid rgba(255,255,255,.15);transition:all .2s">&#128176; Paid Draw</button>' +
    '</div>' +
    '<div id="ldTabFree">' +
      '<div style="font-size:13px;color:rgba(232,240,235,.6);margin-bottom:14px;line-height:1.6;background:rgba(62,207,142,.06);border:1px solid rgba(62,207,142,.15);border-radius:10px;padding:12px 14px">' +
        '<strong style="color:#3ecf8e">&#127920; Free Draw — How it works:</strong><br>' +
        'Every new account gets <b>1 Free Draw</b> — completely free, no deposit needed! Spin the wheel and randomly win one of two prizes: either an <b style="color:#a0aab0">Iron Level</b> account upgrade OR <b style="color:#3ecf8e">0.05 TRX</b> added directly to your balance. Both prizes have equal chance (50/50 random). One-time only per account.' +
      '</div>' +
      '<div style="font-size:12px;color:rgba(232,240,235,.5);text-align:center;margin-bottom:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px">Possible Prizes</div>' +
      '<div style="display:flex;gap:12px;margin-bottom:18px">' +
        '<div class="ld-prize-card" style="flex:1;background:rgba(160,170,176,.08);border:2px solid rgba(160,170,176,.25);border-radius:14px;padding:16px 12px;text-align:center">' +
          '<div style="font-size:30px;margin-bottom:6px">&#129704;</div>' +
          '<div style="font-size:14px;font-weight:800;color:#a0aab0">Iron Level</div>' +
          '<div style="font-size:11px;color:rgba(232,240,235,.4);margin-top:4px">Account level upgrade</div>' +
          '<div style="margin-top:8px;background:#a0aab0;color:#0a1628;font-size:10px;font-weight:900;padding:3px 8px;border-radius:99px;display:inline-block">50% chance</div>' +
        '</div>' +
        '<div style="display:flex;align-items:center;color:rgba(255,255,255,.3);font-size:18px;font-weight:700">OR</div>' +
        '<div class="ld-prize-card" style="flex:1;background:rgba(62,207,142,.08);border:2px solid rgba(62,207,142,.25);border-radius:14px;padding:16px 12px;text-align:center">' +
          '<div style="font-size:30px;margin-bottom:6px">&#128142;</div>' +
          '<div style="font-size:14px;font-weight:800;color:#3ecf8e">0.05 TRX</div>' +
          '<div style="font-size:11px;color:rgba(232,240,235,.4);margin-top:4px">Added to your balance</div>' +
          '<div style="margin-top:8px;background:#3ecf8e;color:#0a1628;font-size:10px;font-weight:900;padding:3px 8px;border-radius:99px;display:inline-block">50% chance</div>' +
        '</div>' +
      '</div>' +
      '<div id="ldFreeStatus" style="text-align:center;font-size:13px;margin-bottom:12px;font-weight:600"></div>' +
      '<button id="ldFreeBtn" onclick="doFreeDraw()" style="width:100%;padding:14px;background:linear-gradient(135deg,#059669,#3ecf8e);border:none;border-radius:12px;color:#fff;font-size:16px;font-weight:900;cursor:pointer;letter-spacing:.5px;box-shadow:0 4px 20px rgba(62,207,142,.3)">&#127920; SPIN FREE DRAW</button>' +
      '<div id="ldFreeResult" style="display:none;margin-top:16px;text-align:center;padding:18px;border-radius:12px"></div>' +
    '</div>' +
    '<div id="ldTabPaid" style="display:none">' +
      '<div style="font-size:13px;color:rgba(232,240,235,.6);margin-bottom:14px;line-height:1.6;background:rgba(255,215,0,.06);border:1px solid rgba(255,215,0,.15);border-radius:10px;padding:12px 14px">' +
        '<strong style="color:#ffd700">&#128176; Paid Draw — How it works:</strong><br>' +
        '<b style="color:#ffd700">Entry Cost: 500 TRX</b> (deducted from your balance). One spin per account.<br><br><b>What you can win (randomly):</b><br>&#127942; <b style="color:#ffd700">Gold Level</b> — earn 0.5 TRX per faucet claim<br>&#129352; <b style="color:#e5e4e2">Platinum Level</b> — earn 5 TRX per faucet claim<br>&#128142; <b style="color:#b9f2ff">Diamond Level</b> — earn 15 TRX per faucet claim<br><br>Each prize has equal probability (approx. 33% each). Your account level is upgraded <b>immediately</b> after the spin. This offer is available <b>1 time per account</b>.' +
      '</div>' +
      '<div style="font-size:12px;color:rgba(232,240,235,.5);text-align:center;margin-bottom:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px">Possible Prizes</div>' +
      '<div style="display:flex;gap:10px;margin-bottom:18px">' +
        '<div class="ld-prize-card" style="flex:1;background:rgba(255,215,0,.08);border:2px solid rgba(255,215,0,.3);border-radius:14px;padding:14px 8px;text-align:center">' +
          '<div style="font-size:28px;margin-bottom:5px">&#127942;</div>' +
          '<div style="font-size:13px;font-weight:800;color:#ffd700">Gold</div>' +
          '<div style="font-size:10px;color:rgba(232,240,235,.4);margin-top:3px">0.5 TRX/hr</div>' +
          '<div style="margin-top:6px;background:#ffd700;color:#0a1628;font-size:9px;font-weight:900;padding:2px 7px;border-radius:99px;display:inline-block">~33%</div>' +
        '</div>' +
        '<div class="ld-prize-card" style="flex:1;background:rgba(229,228,226,.08);border:2px solid rgba(229,228,226,.3);border-radius:14px;padding:14px 8px;text-align:center">' +
          '<div style="font-size:28px;margin-bottom:5px">&#129351;</div>' +
          '<div style="font-size:13px;font-weight:800;color:#e5e4e2">Platinum</div>' +
          '<div style="font-size:10px;color:rgba(232,240,235,.4);margin-top:3px">5 TRX/hr</div>' +
          '<div style="margin-top:6px;background:#e5e4e2;color:#0a1628;font-size:9px;font-weight:900;padding:2px 7px;border-radius:99px;display:inline-block">~33%</div>' +
        '</div>' +
        '<div class="ld-prize-card" style="flex:1;background:rgba(185,242,255,.08);border:2px solid rgba(185,242,255,.3);border-radius:14px;padding:14px 8px;text-align:center">' +
          '<div style="font-size:28px;margin-bottom:5px">&#128142;</div>' +
          '<div style="font-size:13px;font-weight:800;color:#b9f2ff">Diamond</div>' +
          '<div style="font-size:10px;color:rgba(232,240,235,.4);margin-top:3px">15 TRX/hr</div>' +
          '<div style="margin-top:6px;background:#b9f2ff;color:#0a1628;font-size:9px;font-weight:900;padding:2px 7px;border-radius:99px;display:inline-block">~33%</div>' +
        '</div>' +
      '</div>' +
      '<div id="ldPaidStatus" style="text-align:center;font-size:13px;margin-bottom:12px;font-weight:600"></div>' +
      '<button id="ldPaidBtn" onclick="doPaidDraw()" style="width:100%;padding:14px;background:linear-gradient(135deg,#b8860b,#ffd700);border:none;border-radius:12px;color:#0a1628;font-size:16px;font-weight:900;cursor:pointer;letter-spacing:.5px;box-shadow:0 4px 20px rgba(255,215,0,.3)">&#128176; SPIN PAID DRAW — 500 TRX</button>' +
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
    if(freeBtn) { freeBtn.disabled = true; freeBtn.textContent = '✅ Free Draw Used'; freeBtn.style.opacity = '0.5'; freeBtn.style.cursor = 'not-allowed'; }
    var stored = localStorage.getItem('ld_free_result_' + user);
    if(stored && freeResult) { freeResult.innerHTML = stored; freeResult.style.display = 'block'; }
  } else {
    if(freeStatus) { freeStatus.innerHTML = '&#127881; You have <strong>1 Free Draw</strong> available — spin now!'; freeStatus.style.color = '#3ecf8e'; }
    if(freeBtn) { freeBtn.disabled = false; freeBtn.innerHTML = '&#127920; SPIN FREE DRAW'; freeBtn.style.opacity = '1'; freeBtn.style.cursor = 'pointer'; }
    if(freeResult) freeResult.style.display = 'none';
  }

  if(paidDone) {
    if(paidStatus) { paidStatus.innerHTML = '&#9989; You have already used your Paid Draw!'; paidStatus.style.color = '#ffd700'; }
    if(paidBtn) { paidBtn.disabled = true; paidBtn.textContent = '✅ Paid Draw Used'; paidBtn.style.opacity = '0.5'; paidBtn.style.cursor = 'not-allowed'; }
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

// ── FREE DRAW ──
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
      { id: 'iron', label: '&#129704; Iron Level', desc: 'Your account level has been upgraded to <strong>Iron</strong>!', color: '#a0aab0', bg: 'rgba(160,170,176,.12)', border: 'rgba(160,170,176,.3)' },
      { id: 'trx005', label: '&#128142; 0.05 TRX', desc: '<strong>0.05 TRX</strong> has been added to your balance!', color: '#3ecf8e', bg: 'rgba(62,207,142,.1)', border: 'rgba(62,207,142,.3)' }
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

    var resultHTML = '<div style="font-size:38px;margin-bottom:10px">&#127881;</div>' +
      '<div style="font-size:13px;color:rgba(232,240,235,.6);margin-bottom:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px">You Won!</div>' +
      '<div style="color:' + won.color + ';font-size:24px;font-weight:900;margin-bottom:8px">' + won.label + '</div>' +
      '<div style="color:rgba(232,240,235,.7);font-size:13px">' + won.desc + '</div>';
    localStorage.setItem('ld_free_result_' + user, resultHTML);

    var res = document.getElementById('ldFreeResult');
    if(res) {
      res.innerHTML = resultHTML;
      res.style.display = 'block';
      res.style.cssText = 'display:block;margin-top:16px;text-align:center;padding:20px;border-radius:14px;background:' + won.bg + ';border:2px solid ' + won.border + ';animation:ldPop .4s ease';
    }

    ldRefreshStatus();
    try { showToast('&#127881; ' + won.label.replace(/<[^>]+>/g,'') + ' — Won!'); } catch(e) {}
  }, 1800);
}

// ── PAID DRAW ──
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
      { id: 'gold',     label: '&#127942; Gold Level',     color: '#ffd700', bg: 'rgba(255,215,0,.1)',     border: 'rgba(255,215,0,.4)',     desc: 'Earn <strong>0.5 TRX</strong> per faucet claim!' },
      { id: 'platinum', label: '&#129351; Platinum Level', color: '#e5e4e2', bg: 'rgba(229,228,226,.1)',   border: 'rgba(229,228,226,.4)',   desc: 'Earn <strong>5 TRX</strong> per faucet claim!' },
      { id: 'diamond',  label: '&#128142; Diamond Level',  color: '#b9f2ff', bg: 'rgba(185,242,255,.1)',   border: 'rgba(185,242,255,.4)',   desc: 'Earn <strong>15 TRX</strong> per faucet claim!' }
    ];
    var won = prizes[Math.floor(Math.random() * prizes.length)];

    _ldApplyLevel(won.id);

    localStorage.setItem('ld_paid_' + user, '1');

    var resultHTML = '<div style="font-size:42px;margin-bottom:10px">&#127881;</div>' +
      '<div style="font-size:13px;color:rgba(232,240,235,.6);margin-bottom:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px">Congratulations!</div>' +
      '<div style="color:' + won.color + ';font-size:26px;font-weight:900;margin-bottom:8px">' + won.label + '</div>' +
      '<div style="color:rgba(232,240,235,.7);font-size:13px;margin-bottom:6px">' + won.desc + '</div>' +
      '<div style="color:rgba(232,240,235,.4);font-size:11px">500 TRX entry fee deducted</div>';
    localStorage.setItem('ld_paid_result_' + user, resultHTML);

    var res = document.getElementById('ldPaidResult');
    if(res) {
      res.innerHTML = resultHTML;
      res.style.cssText = 'display:block;margin-top:16px;text-align:center;padding:22px;border-radius:14px;background:' + won.bg + ';border:2px solid ' + won.border;
    }

    ldRefreshStatus();
    try { showToast('&#127881; ' + won.label.replace(/<[^>]+>/g,'') + ' — Level Upgraded!'); } catch(e) {}
  }, 2200);
}

// CSS animation for result pop
(function(){
  var st = document.createElement('style');
  st.textContent = '@keyframes ldPop{0%{transform:scale(.8);opacity:0}100%{transform:scale(1);opacity:1}}';
  document.head.appendChild(st);
})();
