
// ═══════════════════════════════════════════════════════
// LUCKY DRAW — Full Logic
// ═══════════════════════════════════════════════════════

function openLuckyDraw() {
  var modal = document.getElementById('luckyDrawModal');
  if(!modal) return;
  ldRefreshStatus();
  modal.style.display = 'flex';
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
  var user = localStorage.getItem('userName') || 'guest';
  var freeDone = localStorage.getItem('ld_free_' + user) === '1';
  var paidDone = localStorage.getItem('ld_paid_' + user) === '1';

  var freeStatus = document.getElementById('ldFreeStatus');
  var paidStatus = document.getElementById('ldPaidStatus');
  var freeBtn = document.getElementById('ldFreeBtn');
  var paidBtn = document.getElementById('ldPaidBtn');
  var freeResult = document.getElementById('ldFreeResult');
  var paidResult = document.getElementById('ldPaidResult');

  if(freeDone) {
    if(freeStatus) { freeStatus.textContent = '✅ You have already used your Free Draw!'; freeStatus.style.color = '#3ecf8e'; }
    if(freeBtn) { freeBtn.disabled = true; freeBtn.textContent = '✅ Free Draw Used'; freeBtn.style.opacity = '0.5'; freeBtn.style.cursor = 'not-allowed'; }
    // Show stored result
    var stored = localStorage.getItem('ld_free_result_' + user);
    if(stored && freeResult) {
      freeResult.innerHTML = stored;
      freeResult.style.display = 'block';
    }
  } else {
    if(freeStatus) { freeStatus.textContent = '🎉 You have 1 Free Draw available!'; freeStatus.style.color = '#3ecf8e'; }
    if(freeBtn) { freeBtn.disabled = false; freeBtn.textContent = '🎰 SPIN FREE DRAW'; freeBtn.style.opacity = '1'; freeBtn.style.cursor = 'pointer'; }
    if(freeResult) freeResult.style.display = 'none';
  }

  if(paidDone) {
    if(paidStatus) { paidStatus.textContent = '✅ You have already used your Paid Draw!'; paidStatus.style.color = '#ffd700'; }
    if(paidBtn) { paidBtn.disabled = true; paidBtn.textContent = '✅ Paid Draw Used'; paidBtn.style.opacity = '0.5'; paidBtn.style.cursor = 'not-allowed'; }
    var storedP = localStorage.getItem('ld_paid_result_' + user);
    if(storedP && paidResult) {
      paidResult.innerHTML = storedP;
      paidResult.style.display = 'block';
    }
  } else {
    if(paidStatus) {
      var bal = parseFloat(localStorage.getItem('userBalance')) || 0;
      if(bal < 500) {
        paidStatus.textContent = '⚠️ Need 500 TRX balance! (You have: ' + bal.toFixed(4) + ' TRX)';
        paidStatus.style.color = '#e74c3c';
        if(paidBtn) { paidBtn.disabled = true; paidBtn.style.opacity = '0.5'; paidBtn.style.cursor = 'not-allowed'; }
      } else {
        paidStatus.textContent = '💰 You have 1 Paid Draw available! Balance: ' + bal.toFixed(4) + ' TRX';
        paidStatus.style.color = '#ffd700';
        if(paidBtn) { paidBtn.disabled = false; paidBtn.style.opacity = '1'; paidBtn.style.cursor = 'pointer'; }
      }
    }
    if(paidResult) paidResult.style.display = 'none';
  }
}

// ── FREE DRAW ──
function doFreeDraw() {
  var user = localStorage.getItem('userName') || 'guest';
  if(localStorage.getItem('ld_free_' + user) === '1') {
    showToast('You already used your Free Draw!');
    return;
  }

  var btn = document.getElementById('ldFreeBtn');
  if(btn) { btn.disabled = true; btn.textContent = '🎰 Spinning...'; }

  setTimeout(function() {
    // Only Iron Level or 0.05 TRX can actually be won
    var prizes = [
      { id: 'iron', label: '🪨 Iron Level', desc: 'Your level has been upgraded to Iron!', color: '#a0aab0' },
      { id: 'trx005', label: '💎 0.05 TRX', desc: '0.05 TRX added to your balance!', color: '#3ecf8e' }
    ];
    // 50/50 chance between the two real prizes
    var won = prizes[Math.floor(Math.random() * prizes.length)];

    // Apply prize
    if(won.id === 'iron') {
      localStorage.setItem('userLevel', 'Iron');
      try { updateLevelDisplay(); } catch(e) {}
    } else if(won.id === 'trx005') {
      try { addBal(0.05); } catch(e) {
        var b = parseFloat(localStorage.getItem('userBalance')||'0');
        localStorage.setItem('userBalance', (b + 0.05).toString());
      }
    }

    // Mark as used
    localStorage.setItem('ld_free_' + user, '1');

    // Show result
    var resultHTML = '<div style="font-size:32px;margin-bottom:8px">🎉</div><div style="color:' + won.color + ';font-size:20px;font-weight:900">' + won.label + '</div><div style="color:rgba(232,240,235,.7);font-size:13px;margin-top:6px">' + won.desc + '</div>';
    localStorage.setItem('ld_free_result_' + user, resultHTML);

    var res = document.getElementById('ldFreeResult');
    if(res) {
      res.innerHTML = resultHTML;
      res.style.display = 'block';
      res.style.background = 'rgba(62,207,142,.1)';
      res.style.border = '1px solid rgba(62,207,142,.3)';
      res.style.borderRadius = '10px';
      res.style.padding = '16px';
    }

    ldRefreshStatus();
    try { showToast('🎉 ' + won.label + ' Won!'); } catch(e) {}
  }, 1500);
}

// ── PAID DRAW ──
function doPaidDraw() {
  var user = localStorage.getItem('userName') || 'guest';
  if(localStorage.getItem('ld_paid_' + user) === '1') {
    showToast('You already used your Paid Draw!');
    return;
  }

  var bal = parseFloat(localStorage.getItem('userBalance')) || 0;
  if(bal < 500) {
    showToast('⚠️ Need 500 TRX to enter Paid Draw!');
    return;
  }

  if(!confirm('This will use 500 TRX from your balance. Confirm?')) return;

  var btn = document.getElementById('ldPaidBtn');
  if(btn) { btn.disabled = true; btn.textContent = '🎰 Spinning...'; }

  setTimeout(function() {
    // Deduct 500 TRX entry
    try { addBal(-500); } catch(e) {
      var b = parseFloat(localStorage.getItem('userBalance')||'0');
      localStorage.setItem('userBalance', Math.max(0, b - 500).toString());
    }

    var prizes = [
      { id: 'gold', label: '🏆 GOLD Level', color: '#ffd700', emoji: '🏆' },
      { id: 'platinum', label: '🥈 PLATINUM Level', color: '#e5e4e2', emoji: '🥈' },
      { id: 'diamond', label: '💎 DIAMOND Level', color: '#b9f2ff', emoji: '💎' }
    ];
    var won = prizes[Math.floor(Math.random() * prizes.length)];

    // Apply level
    localStorage.setItem('userLevel', won.id.charAt(0).toUpperCase() + won.id.slice(1));
    try { updateLevelDisplay(); } catch(e) {}

    // Deduct 20% of remaining balance as fee
    var newBal = parseFloat(localStorage.getItem('userBalance')) || 0;
    var fee = parseFloat((newBal * 0.20).toFixed(6));
    try { addBal(-fee); } catch(e) {
      localStorage.setItem('userBalance', Math.max(0, newBal - fee).toString());
    }

    var finalBal = parseFloat(localStorage.getItem('userBalance')) || 0;

    // Mark as used
    localStorage.setItem('ld_paid_' + user, '1');

    var resultHTML = '<div style="font-size:36px;margin-bottom:8px">' + won.emoji + '</div><div style="color:' + won.color + ';font-size:22px;font-weight:900">' + won.label + '</div><div style="color:rgba(232,240,235,.7);font-size:12px;margin-top:8px">Fee deducted: ' + fee.toFixed(4) + ' TRX (20%)<br>Remaining balance: ' + finalBal.toFixed(4) + ' TRX</div>';
    localStorage.setItem('ld_paid_result_' + user, resultHTML);

    var res = document.getElementById('ldPaidResult');
    if(res) {
      res.innerHTML = resultHTML;
      res.style.display = 'block';
      res.style.background = 'rgba(255,215,0,.08)';
      res.style.border = '1px solid rgba(255,215,0,.3)';
      res.style.borderRadius = '10px';
      res.style.padding = '16px';
    }

    ldRefreshStatus();
    try { showToast('🎉 ' + won.label + ' Won! Level upgraded!'); } catch(e) {}
  }, 2000);
}
