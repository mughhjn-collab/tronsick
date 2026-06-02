
// ═══════════════════════════════════════════════════════════════
// LIMBO GAME — v3 — All bugs fixed
// ═══════════════════════════════════════════════════════════════

var limboAutoRunning = false;
var limboAutoBase = 0;
var limboAutoTimer = null;
var limboAutoProfit = 0;
var limboAutoBets = 0;
var limboBetHistory = [];

function buildLimbo() {
  limboAutoRunning = false;
  if(limboAutoTimer) { clearTimeout(limboAutoTimer); limboAutoTimer = null; }

  var h = '<div class="tp-game-wrap">';

  // ── ROCKET STAGE ──
  h += '<div class="lb-stage" id="lbStage">';
  h +=   '<div class="lb-stars" id="lbStars"></div>';
  h +=   '<div class="lb-result-overlay" id="lbResultOverlay" style="display:none">';
  h +=     '<div class="lb-result-mult" id="lbResultMult">2.00x</div>';
  h +=     '<div class="lb-result-label" id="lbResultLabel">WIN</div>';
  h +=   '</div>';
  h +=   '<div class="lb-rocket-wrap" id="lbRocketWrap">';
  h +=     '<svg class="lb-rocket" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">';
  h +=       '<ellipse cx="40" cy="50" rx="18" ry="28" fill="#d0d0d0" stroke="#bbb" stroke-width="1.5"/>';
  h +=       '<polygon points="40,8 24,38 56,38" fill="#e74c3c"/>';
  h +=       '<rect x="22" y="60" width="10" height="16" rx="3" fill="#bbb"/>';
  h +=       '<rect x="48" y="60" width="10" height="16" rx="3" fill="#bbb"/>';
  h +=       '<ellipse cx="40" cy="46" rx="9" ry="11" fill="#87ceeb" opacity="0.9"/>';
  h +=       '<g id="lbFlames">';
  h +=         '<ellipse cx="40" cy="82" rx="9" ry="7" fill="#f39c12" opacity="0.9"/>';
  h +=         '<ellipse cx="40" cy="88" rx="6" ry="9" fill="#e74c3c" opacity="0.7"/>';
  h +=         '<ellipse cx="40" cy="94" rx="4" ry="7" fill="#f1c40f" opacity="0.5"/>';
  h +=       '</g>';
  h +=     '</svg>';
  h +=   '</div>';
  h += '</div>';

  // ── ACTION ROW: Auto checkbox + BET button ──
  h += '<div class="tp-action-row" style="margin-top:14px">';
  h +=   '<label class="tp-auto-chk-lbl"><input type="checkbox" id="limboAutoChk" onchange="limboToggleMode()"> Auto</label>';
  h +=   '<button class="tp-roll-btn" id="limboRollBtn" onclick="limboRoll()">BET</button>';
  h += '</div>';

  // ── BET AMOUNT ──
  h += '<div class="tp-field" style="margin-top:14px">';
  h +=   '<div class="tp-label">Bet Amount</div>';
  h +=   '<div class="tp-inp-row">';
  h +=     '<img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" class="tp-trx-ico" alt="TRX">';
  h +=     '<input type="number" id="limboAmt" class="tp-inp" value="0.000100" step="0.000001" min="0">';
  h +=     '<button class="tp-btn-green" onclick="limboMultAmt(2)">2X</button>';
  h +=     '<button class="tp-btn-green" onclick="limboMultAmt(0.5)">1/2</button>';
  h +=   '</div>';
  h += '</div>';

  // ── TARGET MULTIPLIER + WIN CHANCE ──
  h += '<div class="tp-row-2" style="margin-top:14px">';
  h += '<div class="tp-field">';
  h +=   '<div class="tp-label">Target Multiplier</div>';
  h +=   '<div class="tp-inp-row">';
  h +=     '<input type="number" id="limboMult" class="tp-inp" value="2.00" step="0.01" min="1.0104" max="4850" oninput="limboByMult()">';
  h +=     '<span class="tp-inp-suffix">✕</span>';
  h +=   '</div>';
  h += '</div>';
  h += '<div class="tp-field">';
  h +=   '<div class="tp-label">Win Chance</div>';
  h +=   '<div class="tp-inp-row">';
  h +=     '<input type="number" id="limboWC" class="tp-inp" value="48.50" step="0.01" min="0.02" max="96.04" oninput="limboByWC()">';
  h +=     '<span class="tp-inp-suffix">%</span>';
  h +=   '</div>';
  h += '</div>';
  h += '</div>';

  // ── AUTO SECTION ──
  h += '<div id="limboAutoSec" style="display:none;margin-top:18px">';

  h += '<div class="tp-auto-cols">';
  h += '<div class="tp-auto-box">';
  h +=   '<div class="tp-auto-hd">On Win</div>';
  h +=   '<label class="tp-radio"><input type="radio" name="limboWin" id="limboWinReset" value="reset" checked> <span class="tp-radio-dot tp-green-dot"></span> Reset</label>';
  h +=   '<div class="tp-radio-inc-row"><label class="tp-radio"><input type="radio" name="limboWin" id="limboWinInc" value="increase"> <span class="tp-radio-dot"></span> Increase By</label><div class="tp-pct-box"><input type="number" id="limboWinPct" class="tp-pct-inp" value="100"> <span>%</span></div></div>';
  h += '</div>';
  h += '<div class="tp-auto-box">';
  h +=   '<div class="tp-auto-hd">On Loss</div>';
  h +=   '<label class="tp-radio"><input type="radio" name="limboLoss" id="limboLossReset" value="reset" checked> <span class="tp-radio-dot tp-green-dot"></span> Reset</label>';
  h +=   '<div class="tp-radio-inc-row"><label class="tp-radio"><input type="radio" name="limboLoss" id="limboLossInc" value="increase"> <span class="tp-radio-dot"></span> Increase By</label><div class="tp-pct-box"><input type="number" id="limboLossPct" class="tp-pct-inp" value="100"> <span>%</span></div></div>';
  h += '</div>';
  h += '</div>';

  h += '<div class="tp-auto-stops">';
  h += '<div class="tp-field"><div class="tp-label tp-green">Stop On Profit</div><div class="tp-inp-row"><img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" class="tp-trx-ico" alt="TRX"><input type="number" id="limboStopProfit" class="tp-inp" value="0.000000" step="0.000001" min="0"></div></div>';
  h += '<div class="tp-field"><div class="tp-label tp-green">Stop On Loss</div><div class="tp-inp-row"><img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" class="tp-trx-ico" alt="TRX"><input type="number" id="limboStopLoss" class="tp-inp" value="0.000000" step="0.000001" min="0"></div></div>';
  h += '</div>';

  h += '<div class="tp-auto-stops" style="margin-top:12px">';
  h += '<div class="tp-field"><div class="tp-label tp-green">Rolls</div><div class="tp-inp-row"><input type="number" id="limboAutoRolls" class="tp-inp" value="0" min="0" step="1"></div></div>';
  h += '<div class="tp-field"><div class="tp-label tp-green">Total Profit</div><div class="tp-inp-row"><img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" class="tp-trx-ico" alt="TRX"><input type="number" id="limboAutoTotalProfit" class="tp-inp" value="0.000000" readonly></div></div>';
  h += '</div>';

  h += '</div>'; // limboAutoSec

  // ── HISTORY ──
  h += '<div style="margin-top:22px">';
  h += '<div class="dg-bet-tabs"><button class="dg-btab dg-btab-act" id="limboTabMy" onclick="limboShowTab(\'my\')">My Bets</button><button class="dg-btab" id="limboTabAll" onclick="limboShowTab(\'all\')">All Bets</button></div>';
  h += '<div id="limboMyBetList" class="tp-hist-wrap"></div>';
  h += '<div id="limboAllBetList" class="tp-hist-wrap" style="display:none"></div>';
  h += '</div>';

  h += '</div>'; // tp-game-wrap

  document.getElementById('gameFrame').innerHTML = h;
  limboAddStars();
  limboBetHistory = [];
  try { var s = localStorage.getItem('limboHistory'); if(s) limboBetHistory = JSON.parse(s) || []; } catch(e) {}
  limboRenderMyBets();
  limboRenderAllBets();
}

function limboAddStars() {
  var c = document.getElementById('lbStars'); if(!c) return;
  var h = '';
  for(var i = 0; i < 30; i++) {
    var x = Math.random() * 100;
    var y = Math.random() * 100;
    var s = 1 + Math.random() * 2;
    var o = 0.3 + Math.random() * 0.7;
    h += '<div style="position:absolute;left:' + x + '%;top:' + y + '%;width:' + s + 'px;height:' + s + 'px;border-radius:50%;background:#fff;opacity:' + o + ';animation:lb-twinkle ' + (1 + Math.random() * 2).toFixed(1) + 's ease-in-out infinite alternate"></div>';
  }
  c.innerHTML = h;
}

// ── CALCULATIONS ──
function limboByMult() {
  var m = Math.max(1.0104, Math.min(4850, parseFloat(document.getElementById('limboMult').value) || 2));
  var wc = Math.max(0.02, Math.min(96.04, parseFloat((97 / m).toFixed(2))));
  var wcEl = document.getElementById('limboWC');
  if(wcEl) wcEl.value = wc.toFixed(2);
}

function limboByWC() {
  var wc = Math.max(0.02, Math.min(96.04, parseFloat(document.getElementById('limboWC').value) || 48.5));
  var m = Math.max(1.0104, Math.min(4850, parseFloat((97 / wc).toFixed(2))));
  var mEl = document.getElementById('limboMult');
  if(mEl) mEl.value = m.toFixed(2);
}

function limboMultAmt(f) {
  var el = document.getElementById('limboAmt'); if(!el) return;
  el.value = (parseFloat(el.value || 0) * f).toFixed(6);
}

function limboToggleMode() {
  var isAuto = (document.getElementById('limboAutoChk') || {}).checked;
  var sec = document.getElementById('limboAutoSec');
  var btn = document.getElementById('limboRollBtn');
  if(sec) sec.style.display = isAuto ? '' : 'none';
  if(btn) { btn.textContent = isAuto ? 'AUTO BET' : 'BET'; btn.style.background = ''; }
  if(!isAuto && limboAutoRunning) limboStopAuto();
}

// ── ANIMATION ──
function limboAnimate(win, resultMult) {
  var wrap = document.getElementById('lbRocketWrap');
  var overlay = document.getElementById('lbResultOverlay');
  var multEl = document.getElementById('lbResultMult');
  var lblEl = document.getElementById('lbResultLabel');

  if(!wrap) return;

  // Rocket launch
  wrap.style.transition = 'transform 1s cubic-bezier(0.2,0.8,0.4,1)';
  wrap.style.transform = win ? 'translateY(-80px) scale(1.1)' : 'translateY(-20px)';

  setTimeout(function() {
    if(overlay) {
      overlay.style.display = 'flex';
      if(multEl) {
        multEl.textContent = resultMult.toFixed(2) + 'x';
        multEl.style.color = win ? '#2ecc71' : '#e74c3c';
      }
      if(lblEl) {
        lblEl.textContent = win ? '🎉 WIN' : '❌ LOSS';
        lblEl.style.color = win ? '#2ecc71' : '#e74c3c';
      }
    }
    setTimeout(function() {
      // Reset
      wrap.style.transition = 'transform 0.5s ease-in';
      wrap.style.transform = 'translateY(0) scale(1)';
      if(overlay) overlay.style.display = 'none';
    }, 1500);
  }, 700);
}

// ── MANUAL BET ──
function limboRoll() {
  var isAuto = (document.getElementById('limboAutoChk') || {}).checked;
  if(isAuto) {
    if(limboAutoRunning) { limboStopAuto(); return; }
    limboStartAuto(); return;
  }

  var btn = document.getElementById('limboRollBtn');
  if(!btn || btn.disabled) return;
  var bet = parseFloat((document.getElementById('limboAmt') || {}).value) || 0;
  if(bet <= 0) { showToast('Enter bet amount!'); return; }
  var bal = parseFloat(document.getElementById('userBalance').textContent) || 0;
  if(bet > bal) { showToast('Insufficient balance!'); return; }

  btn.disabled = true; btn.textContent = 'Rolling...';
  addBal(-bet); updateWager(bet);

  setTimeout(function() {
    var target = Math.max(1.0104, parseFloat((document.getElementById('limboMult') || {}).value) || 2);
    var wc = parseFloat((document.getElementById('limboWC') || {}).value) || 48.5;

    // Exponential distribution: P(result >= target) = 97/100/target ≈ winChance%
    // Generate crash point
    var rand = Math.random();
    // crash point = 0.97 / (1 - rand) but capped
    var crash = parseFloat((0.97 / Math.max(0.0001, 1 - rand)).toFixed(2));
    crash = Math.max(1.00, Math.min(crash, 10000));
    var win = crash >= target;

    if(win) addBal(bet * target);
    var profit = win ? bet * (target - 1) : -bet;

    limboAnimate(win, crash);
    limboSaveResult(bet, target, wc, win, profit, crash);
    btn.disabled = false; btn.textContent = 'BET';
  }, 500);
}

// ── AUTO BET ──
function limboStartAuto() {
  var bet = parseFloat((document.getElementById('limboAmt') || {}).value) || 0;
  if(bet <= 0) { showToast('Enter bet amount!'); return; }
  var bal = parseFloat(document.getElementById('userBalance').textContent) || 0;
  if(bet > bal) { showToast('Insufficient balance!'); return; }

  limboAutoRunning = true;
  limboAutoBase = bet;
  limboAutoProfit = 0;
  limboAutoBets = 0;
  var tp = document.getElementById('limboAutoTotalProfit'); if(tp) tp.value = '0.000000';
  var btn = document.getElementById('limboRollBtn');
  if(btn) { btn.textContent = 'STOP AUTO'; btn.style.background = '#dc3545'; }
  limboAutoStep();
}

function limboStopAuto() {
  limboAutoRunning = false;
  if(limboAutoTimer) { clearTimeout(limboAutoTimer); limboAutoTimer = null; }
  var btn = document.getElementById('limboRollBtn');
  if(btn) { btn.textContent = 'AUTO BET'; btn.style.background = ''; }
  showToast('Auto stopped. Rolls: ' + limboAutoBets + ' | Profit: ' + (limboAutoProfit >= 0 ? '+' : '') + limboAutoProfit.toFixed(6));
}

function limboAutoStep() {
  if(!limboAutoRunning) return;

  var bet = parseFloat((document.getElementById('limboAmt') || {}).value) || limboAutoBase;
  var bal = parseFloat(document.getElementById('userBalance').textContent) || 0;
  var stopProfit = parseFloat((document.getElementById('limboStopProfit') || {}).value) || 0;
  var stopLoss = parseFloat((document.getElementById('limboStopLoss') || {}).value) || 0;
  var maxRolls = parseInt((document.getElementById('limboAutoRolls') || {}).value) || 0;

  if(stopProfit > 0 && limboAutoProfit >= stopProfit) { showToast('✅ Profit target hit!'); limboStopAuto(); return; }
  if(stopLoss > 0 && limboAutoProfit <= -stopLoss) { showToast('❌ Stop loss hit!'); limboStopAuto(); return; }
  if(maxRolls > 0 && limboAutoBets >= maxRolls) { showToast('✅ Roll count reached!'); limboStopAuto(); return; }
  if(bet > bal) { showToast('❌ Insufficient balance!'); limboStopAuto(); return; }

  addBal(-bet); updateWager(bet);
  var target = Math.max(1.0104, parseFloat((document.getElementById('limboMult') || {}).value) || 2);
  var wc = parseFloat((document.getElementById('limboWC') || {}).value) || 48.5;
  var rand = Math.random();
  var crash = parseFloat((0.97 / Math.max(0.0001, 1 - rand)).toFixed(2));
  crash = Math.max(1.00, Math.min(crash, 10000));
  var win = crash >= target;

  if(win) addBal(bet * target);
  var profit = win ? bet * (target - 1) : -bet;
  limboAutoProfit += profit;
  limboAutoBets++;

  var tp = document.getElementById('limboAutoTotalProfit');
  if(tp) tp.value = limboAutoProfit.toFixed(6);

  limboSaveResult(bet, target, wc, win, profit, crash);

  // On Win/Loss
  var winReset = document.getElementById('limboWinReset');
  var lossReset = document.getElementById('limboLossReset');
  var winMode = (winReset && winReset.checked) ? 'reset' : 'increase';
  var lossMode = (lossReset && lossReset.checked) ? 'reset' : 'increase';
  var winPct = parseFloat((document.getElementById('limboWinPct') || {}).value) || 100;
  var lossPct = parseFloat((document.getElementById('limboLossPct') || {}).value) || 100;

  var nextBet;
  if(win) { nextBet = winMode === 'increase' ? bet * (1 + winPct / 100) : limboAutoBase; }
  else { nextBet = lossMode === 'increase' ? bet * (1 + lossPct / 100) : limboAutoBase; }

  var amtEl = document.getElementById('limboAmt');
  if(amtEl) amtEl.value = nextBet.toFixed(6);

  limboAutoTimer = setTimeout(limboAutoStep, 700);
}

// ── SAVE & RENDER ──
function limboSaveResult(bet, target, wc, win, profit, crash) {
  var now = new Date();
  var ts = (now.getDate() < 10 ? '0' : '') + now.getDate() + '/' + (now.getMonth() < 9 ? '0' : '') + (now.getMonth() + 1) + ' ' + now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
  var rec = { game: 'Limbo', bet: bet, target: target, crash: crash, wc: wc, win: win, profit: profit, ts: ts };
  limboBetHistory.unshift(rec);
  try { localStorage.setItem('limboHistory', JSON.stringify(limboBetHistory.slice(0, 100))); } catch(e) {}
  try {
    var ab = JSON.parse(localStorage.getItem('site_all_bets') || '[]');
    ab.unshift({ u: localStorage.getItem('userName') || 'Player', g: 'Limbo', b: bet, p: target, w: win, pr: profit, t: ts });
    localStorage.setItem('site_all_bets', JSON.stringify(ab.slice(0, 200)));
  } catch(e) {}
  limboRenderMyBets();
  limboRenderAllBets();
  try { renderGlobalBets(); } catch(e) {}
}

function limboRenderMyBets() {
  var list = document.getElementById('limboMyBetList');
  if(!list) return;
  if(!limboBetHistory.length) { list.innerHTML = '<div class="tp-no-bets">No bets yet. Press BET to start!</div>'; return; }
  var h = '<table class="tp-hist-tbl"><thead><tr><th>Time</th><th>Game</th><th>Bet</th><th>Target</th><th>Result</th><th>Profit</th></tr></thead><tbody>';
  limboBetHistory.slice(0, 50).forEach(function(b, i) {
    var cls = b.win ? 'tp-win' : 'tp-lose';
    var p = (b.profit >= 0 ? '+' : '') + b.profit.toFixed(6);
    h += '<tr><td>' + b.ts + '</td><td>🚀 Limbo</td><td>' + b.bet.toFixed(6) + '</td><td>' + b.target.toFixed(2) + 'x</td><td class="' + cls + '">' + b.crash.toFixed(2) + 'x</td><td class="' + cls + '">' + p + '</td></tr>';
  });
  h += '</tbody></table>';
  list.innerHTML = h;
}

function limboRenderAllBets() {
  var list = document.getElementById('limboAllBetList');
  if(!list) return;
  try {
    var ab = JSON.parse(localStorage.getItem('site_all_bets') || '[]');
    if(!ab.length) { list.innerHTML = '<div class="tp-no-bets">No bets yet.</div>'; return; }
    var h = '<table class="tp-hist-tbl"><thead><tr><th>Time</th><th>User</th><th>Game</th><th>Bet</th><th>Target</th><th>Profit</th></tr></thead><tbody>';
    ab.slice(0, 50).forEach(function(b) {
      var p = (b.pr >= 0 ? '+' : '') + parseFloat(b.pr).toFixed(6);
      var cls = b.w ? 'tp-win' : 'tp-lose';
      h += '<tr><td>' + b.t + '</td><td>' + b.u + '</td><td>' + b.g + '</td><td>' + parseFloat(b.b).toFixed(6) + '</td><td>' + parseFloat(b.p).toFixed(2) + 'x</td><td class="' + cls + '">' + p + '</td></tr>';
    });
    h += '</tbody></table>';
    list.innerHTML = h;
  } catch(e) { list.innerHTML = '<div class="tp-no-bets">Error loading bets.</div>'; }
}


// ── LIMBO BET INFO MODAL ──
function limboOpenBetInfo(idx) {
  var b = limboBetHistory[idx];
  if(!b) return;
  var modal = document.getElementById('betModal');
  if(!modal) { try { modal = _ensureBetModal(); } catch(e) {} }
  if(!modal) return;
  var title = document.getElementById('bmTitle');
  if(title) title.textContent = '\u{1F680} Limbo \u2014 Bet Info';
  var res = document.getElementById('bmResult');
  if(res) {
    res.textContent = b.win ? ('\u2705 WIN +' + b.profit.toFixed(6) + ' TRX') : ('\u274C LOSS \u2212' + Math.abs(b.profit).toFixed(6) + ' TRX');
    res.style.cssText = b.win
      ? 'text-align:center;padding:14px;border-radius:10px;font-size:15px;font-weight:900;margin-bottom:14px;background:rgba(40,167,69,.15);border:1px solid #28a745;color:#28a745'
      : 'text-align:center;padding:14px;border-radius:10px;font-size:15px;font-weight:900;margin-bottom:14px;background:rgba(220,53,69,.15);border:1px solid #dc3545;color:#dc3545';
  }
  var seeds = document.getElementById('bmSeeds');
  if(seeds) seeds.innerHTML =
    '<table style="width:100%;font-size:13px;color:rgba(232,240,235,.8);border-collapse:collapse">' +
    '<tr><td style="padding:6px 4px;color:#3ecf8e;font-weight:700">Result</td><td>' + (b.crash||0).toFixed(2) + 'x</td>' +
    '<td style="color:#3ecf8e;font-weight:700">Target</td><td>' + (b.target||0).toFixed(2) + 'x</td></tr>' +
    '<tr><td style="padding:6px 4px;color:#3ecf8e;font-weight:700">Bet</td><td>' + b.bet.toFixed(6) + ' TRX</td>' +
    '<td style="color:#3ecf8e;font-weight:700">Win Chance</td><td>' + (b.wc||0).toFixed(2) + '%</td></tr>' +
    '<tr><td style="padding:6px 4px;color:#3ecf8e;font-weight:700">Outcome</td><td colspan="3" style="color:' + (b.win?'#28a745':'#dc3545') + ';font-weight:700">' + (b.win ? 'WIN ('+b.crash.toFixed(2)+'x >= '+b.target.toFixed(2)+'x)' : 'LOSS ('+b.crash.toFixed(2)+'x < '+b.target.toFixed(2)+'x)') + '</td></tr>' +
    '</table>';
  var vl = document.getElementById('bmVerifyLink');
  if(vl) vl.innerHTML = '<a href="https://tronsick.io/verify.php" target="_blank" style="color:#3ecf8e;font-size:13px;font-weight:700;text-decoration:underline">\u{1F512} Verify Provable Fairness</a>';
  modal.style.display = 'flex';
}

function limboShowTab(tab) {
  var my = document.getElementById('limboMyBetList');
  var all = document.getElementById('limboAllBetList');
  var tMy = document.getElementById('limboTabMy');
  var tAll = document.getElementById('limboTabAll');
  if(tab === 'my') {
    if(my) my.style.display = '';
    if(all) all.style.display = 'none';
    if(tMy) tMy.classList.add('dg-btab-act');
    if(tAll) tAll.classList.remove('dg-btab-act');
    limboRenderMyBets();
  } else {
    if(my) my.style.display = 'none';
    if(all) all.style.display = '';
    if(tMy) tMy.classList.remove('dg-btab-act');
    if(tAll) tAll.classList.add('dg-btab-act');
    limboRenderAllBets();
  }
}
