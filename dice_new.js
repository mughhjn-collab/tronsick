
// ═══════════════════════════════════════════════════════════════
// DICE GAME — Complete rebuild matching tronpick.io layout
// Formula: Multiplier = 97 / WinChance
// Slider: value = Roll Over threshold (0–100)
//   Roll Over: win if roll > threshold → WinChance = 100 - threshold
//   Roll Under: win if roll < threshold → WinChance = threshold
//   Left = more green (bigger win zone in Roll Over mode)
// ═══════════════════════════════════════════════════════════════

var diceDir = 'over';          // 'over' | 'under'
var diceAutoRunning = false;
var diceAutoBase = 0;
var diceAutoTimer = null;
var diceAutoProfit = 0;
var diceAutoBets = 0;
var diceBetHistory = [];

function buildDice() {
  var h = '';
  h += '<div class="tp-game-wrap">';

  // ── TOP ROW: Bet Amount | Profit On Win ──
  h += '<div class="tp-row-2">';
  h += '<div class="tp-field">';
  h +=   '<div class="tp-label">Bet Amount</div>';
  h +=   '<div class="tp-inp-row">';
  h +=     '<img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" class="tp-trx-ico" alt="TRX">';
  h +=     '<input type="number" id="diceAmt" class="tp-inp" value="0.000100" step="0.000001" min="0" oninput="diceCalcProfit()">';
  h +=     '<button class="tp-btn-green" onclick="diceMultAmt(2)">2X</button>';
  h +=     '<button class="tp-btn-green" onclick="diceMultAmt(0.5)">1/2</button>';
  h +=   '</div>';
  h += '</div>';
  h += '<div class="tp-field">';
  h +=   '<div class="tp-label">Profit On Win</div>';
  h +=   '<div class="tp-inp-row">';
  h +=     '<img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" class="tp-trx-ico" alt="TRX">';
  h +=     '<input type="number" id="diceProfitWin" class="tp-inp" readonly>';
  h +=   '</div>';
  h += '</div>';
  h += '</div>';

  // ── MIDDLE ROW: Roll Over | Multiplier | Win Chance ──
  h += '<div class="tp-row-3" style="margin-top:14px">';

  h += '<div class="tp-field">';
  h +=   '<div class="tp-label" id="diceDirLbl">Roll over to win</div>';
  h +=   '<div class="tp-inp-row">';
  h +=     '<input type="number" id="diceTarget" class="tp-inp" value="50.00" step="0.01" min="0.01" max="99.99" oninput="diceByTarget()">';
  h +=     '<button class="tp-icon-btn" onclick="diceToggleDir()" title="Toggle Roll Over/Under">⇄</button>';
  h +=   '</div>';
  h += '</div>';

  h += '<div class="tp-field">';
  h +=   '<div class="tp-label">Multiplier</div>';
  h +=   '<div class="tp-inp-row">';
  h +=     '<input type="number" id="diceMult" class="tp-inp" value="1.94" step="0.01" min="1.0104" max="4850" oninput="diceByMult()">';
  h +=     '<span class="tp-inp-suffix">✕</span>';
  h +=   '</div>';
  h += '</div>';

  h += '<div class="tp-field">';
  h +=   '<div class="tp-label">Win Chance</div>';
  h +=   '<div class="tp-inp-row">';
  h +=     '<input type="number" id="diceWC" class="tp-inp" value="50.00" step="0.01" min="0.02" max="96.04" oninput="diceByWC()">';
  h +=     '<span class="tp-inp-suffix">%</span>';
  h +=   '</div>';
  h += '</div>';

  h += '</div>';

  // ── TOGGLE + ROLL BUTTON ──
  h += '<div class="tp-action-row" style="margin-top:16px">';
  h += '<div class="tp-toggle-wrap">';
  h +=   '<label class="tp-toggle" id="diceToggleLabel">';
  h +=     '<input type="checkbox" id="diceAutoChk" onchange="diceToggleMode()">';
  h +=     '<span class="tp-toggle-slider"></span>';
  h +=   '</label>';
  h +=   '<span class="tp-toggle-lbl" id="diceModeLbl">Manual</span>';
  h += '</div>';
  h += '<button class="tp-roll-btn" id="diceRollBtn" onclick="diceRoll()">ROLL DICE</button>';
  h += '</div>';

  // ── SLIDER ──
  h += '<div class="tp-slider-wrap" style="margin-top:16px">';
  h +=   '<span class="tp-sl-num">0</span>';
  h +=   '<input type="range" id="diceSlider" class="tp-slider" min="0.01" max="99.99" step="0.01" value="50" oninput="diceBySlider()">';
  h +=   '<span class="tp-sl-num">100</span>';
  h += '</div>';

  // ── AUTO SECTION (hidden by default) ──
  h += '<div id="diceAutoSec" style="display:none;margin-top:18px">';

  h += '<div class="tp-auto-cols">';

  // On Win
  h += '<div class="tp-auto-box">';
  h +=   '<div class="tp-auto-hd">On Win</div>';
  h +=   '<label class="tp-radio"><input type="radio" name="diceWin" value="reset" checked onchange="diceWinMode()"> <span class="tp-radio-ico tp-green">✔</span> Reset</label>';
  h +=   '<label class="tp-radio"><input type="radio" name="diceWin" value="increase" onchange="diceWinMode()"> <span class="tp-radio-ico"></span> Increase By <input type="number" id="diceWinPct" class="tp-pct-inp" value="100"> %</label>';
  h += '</div>';

  // On Loss
  h += '<div class="tp-auto-box">';
  h +=   '<div class="tp-auto-hd">On Loss</div>';
  h +=   '<label class="tp-radio"><input type="radio" name="diceLoss" value="reset" checked onchange="diceLossMode()"> <span class="tp-radio-ico tp-green">✔</span> Reset</label>';
  h +=   '<label class="tp-radio"><input type="radio" name="diceLoss" value="increase" onchange="diceLossMode()"> <span class="tp-radio-ico"></span> Increase By <input type="number" id="diceLossPct" class="tp-pct-inp" value="100"> %</label>';
  h += '</div>';

  h += '</div>';

  h += '<div class="tp-auto-stops">';
  h += '<div class="tp-field">';
  h +=   '<div class="tp-label tp-green">Stop On Profit</div>';
  h +=   '<div class="tp-inp-row"><img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" class="tp-trx-ico" alt="TRX"><input type="number" id="diceStopProfit" class="tp-inp" value="0.000000" step="0.000001" min="0"></div>';
  h += '</div>';
  h += '<div class="tp-field">';
  h +=   '<div class="tp-label tp-green">Stop On Loss</div>';
  h +=   '<div class="tp-inp-row"><img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" class="tp-trx-ico" alt="TRX"><input type="number" id="diceStopLoss" class="tp-inp" value="0.000000" step="0.000001" min="0"></div>';
  h += '</div>';
  h += '</div>';

  h += '<div class="tp-auto-stops" style="margin-top:12px">';
  h += '<div class="tp-field">';
  h +=   '<div class="tp-label tp-green">Bets</div>';
  h +=   '<div class="tp-inp-row"><input type="number" id="diceAutoBetsInput" class="tp-inp" value="0" min="0" step="1"></div>';
  h += '</div>';
  h += '<div class="tp-field">';
  h +=   '<div class="tp-label tp-green">Total Profit</div>';
  h +=   '<div class="tp-inp-row"><img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" class="tp-trx-ico" alt="TRX"><input type="number" id="diceAutoTotalProfit" class="tp-inp" value="0.000000" readonly></div>';
  h += '</div>';
  h += '</div>';

  h += '</div>'; // end diceAutoSec

  h += '</div>'; // end tp-game-wrap

  document.getElementById('gameFrame').innerHTML = h;
  diceUpdate();
  diceBetHistory = [];
  try { var s = localStorage.getItem('diceHistory'); if(s) diceBetHistory = JSON.parse(s) || []; } catch(e){}
  diceRenderBets();
}

// ── CALCULATIONS ──
function diceGetWC() {
  var t = parseFloat(document.getElementById('diceSlider').value) || 50;
  return diceDir === 'over' ? (100 - t) : t;
}

function diceUpdate() {
  var sl = document.getElementById('diceSlider'); if(!sl) return;
  var t = parseFloat(sl.value); // threshold
  var wc = diceDir === 'over' ? (100 - t) : t;
  wc = Math.max(0.02, Math.min(96.04, wc));
  var mult = parseFloat((97 / wc).toFixed(2));
  mult = Math.max(1.0104, Math.min(4850, mult));

  var tEl = document.getElementById('diceTarget');
  var mEl = document.getElementById('diceMult');
  var wEl = document.getElementById('diceWC');
  var lEl = document.getElementById('diceDirLbl');

  if(tEl) tEl.value = t.toFixed(2);
  if(mEl) mEl.value = mult.toFixed(2);
  if(wEl) wEl.value = wc.toFixed(2);
  if(lEl) lEl.textContent = diceDir === 'over' ? 'Roll over to win' : 'Roll under to win';

  // Gradient
  var gr = '#28a745', rd = '#dc3545';
  if(diceDir === 'over') {
    // Win zone RIGHT of thumb
    sl.style.background = 'linear-gradient(to right,' + rd + ' 0%,' + rd + ' ' + t + '%,' + gr + ' ' + t + '%,' + gr + ' 100%)';
  } else {
    // Win zone LEFT of thumb
    sl.style.background = 'linear-gradient(to right,' + gr + ' 0%,' + gr + ' ' + t + '%,' + rd + ' ' + t + '%,' + rd + ' 100%)';
  }

  diceCalcProfit();
}

function diceCalcProfit() {
  var amt = parseFloat((document.getElementById('diceAmt') || {}).value) || 0;
  var mult = parseFloat((document.getElementById('diceMult') || {}).value) || 1.94;
  var profit = amt * (mult - 1);
  var pw = document.getElementById('diceProfitWin');
  if(pw) pw.value = profit.toFixed(6);
}

// ── INPUT HANDLERS ──
function diceBySlider() { diceUpdate(); }

function diceByTarget() {
  var t = parseFloat(document.getElementById('diceTarget').value) || 50;
  t = Math.max(0.01, Math.min(99.99, t));
  document.getElementById('diceSlider').value = t;
  diceUpdate();
}

function diceByMult() {
  var m = parseFloat(document.getElementById('diceMult').value) || 1.94;
  m = Math.max(1.0104, Math.min(4850, m));
  var wc = parseFloat((97 / m).toFixed(4));
  wc = Math.max(0.02, Math.min(96.04, wc));
  // threshold from wc
  var t = diceDir === 'over' ? (100 - wc) : wc;
  document.getElementById('diceSlider').value = t;
  diceUpdate();
}

function diceByWC() {
  var wc = parseFloat(document.getElementById('diceWC').value) || 50;
  wc = Math.max(0.02, Math.min(96.04, wc));
  var t = diceDir === 'over' ? (100 - wc) : wc;
  document.getElementById('diceSlider').value = t;
  diceUpdate();
}

function diceToggleDir() {
  diceDir = diceDir === 'over' ? 'under' : 'over';
  // Keep same win chance, flip threshold
  var wc = parseFloat((document.getElementById('diceWC') || {}).value) || 50;
  var t = diceDir === 'over' ? (100 - wc) : wc;
  document.getElementById('diceSlider').value = t;
  diceUpdate();
}

function diceMultAmt(factor) {
  var el = document.getElementById('diceAmt'); if(!el) return;
  var v = parseFloat(el.value) || 0;
  el.value = (v * factor).toFixed(6);
  diceCalcProfit();
}

// ── MODE TOGGLE ──
function diceToggleMode() {
  var chk = document.getElementById('diceAutoChk');
  var isAuto = chk && chk.checked;
  var lbl = document.getElementById('diceModeLbl');
  var sec = document.getElementById('diceAutoSec');
  var btn = document.getElementById('diceRollBtn');
  if(lbl) lbl.textContent = isAuto ? 'Auto' : 'Manual';
  if(sec) sec.style.display = isAuto ? '' : 'none';
  if(btn) btn.textContent = isAuto ? 'AUTO DICE' : 'ROLL DICE';
  if(!isAuto && diceAutoRunning) diceStopAuto();
}

// ── MANUAL ROLL ──
function diceRoll() {
  var isAuto = (document.getElementById('diceAutoChk') || {}).checked;
  if(isAuto) {
    // Start/stop auto
    if(diceAutoRunning) { diceStopAuto(); return; }
    diceStartAuto(); return;
  }

  var btn = document.getElementById('diceRollBtn'); if(!btn || btn.disabled) return;
  var bet = parseFloat((document.getElementById('diceAmt') || {}).value) || 0;
  if(bet <= 0) { showToast('Enter bet amount!'); return; }
  var bal = parseFloat(document.getElementById('userBalance').textContent) || 0;
  if(bet > bal) { showToast('Insufficient balance!'); return; }

  btn.disabled = true; btn.textContent = 'Rolling...';
  addBal(-bet); updateWager(bet);

  setTimeout(function() {
    var roll = parseFloat((Math.random() * 100).toFixed(2));
    var t = parseFloat(document.getElementById('diceSlider').value);
    var win = diceDir === 'over' ? roll > t : roll < t;
    var mult = parseFloat((document.getElementById('diceMult') || {}).value) || 1.94;
    var wc = parseFloat((document.getElementById('diceWC') || {}).value) || 50;

    if(win) addBal(bet * mult);
    var profit = win ? bet * (mult - 1) : -bet;
    diceSaveResult(bet, mult, wc, win, profit, roll);

    btn.disabled = false; btn.textContent = 'ROLL DICE';
  }, 600);
}

// ── AUTO BET ──
function diceStartAuto() {
  var bet = parseFloat((document.getElementById('diceAmt') || {}).value) || 0;
  if(bet <= 0) { showToast('Enter bet amount!'); return; }
  var bal = parseFloat(document.getElementById('userBalance').textContent) || 0;
  if(bet > bal) { showToast('Insufficient balance!'); return; }

  diceAutoRunning = true;
  diceAutoBase = bet;
  diceAutoProfit = 0;
  diceAutoBets = 0;
  var tp = document.getElementById('diceAutoTotalProfit'); if(tp) tp.value = '0.000000';
  var btn = document.getElementById('diceRollBtn');
  if(btn) { btn.textContent = 'STOP'; btn.style.background = '#dc3545'; }
  diceAutoStep();
}

function diceStopAuto() {
  diceAutoRunning = false;
  if(diceAutoTimer) { clearTimeout(diceAutoTimer); diceAutoTimer = null; }
  var btn = document.getElementById('diceRollBtn');
  if(btn) { btn.textContent = 'AUTO DICE'; btn.style.background = ''; }
  showToast('Auto bet stopped. Bets: ' + diceAutoBets);
}

function diceAutoStep() {
  if(!diceAutoRunning) return;

  var bet = parseFloat((document.getElementById('diceAmt') || {}).value) || diceAutoBase;
  var bal = parseFloat(document.getElementById('userBalance').textContent) || 0;

  // Check stop conditions
  var stopProfit = parseFloat((document.getElementById('diceStopProfit') || {}).value) || 0;
  var stopLoss = parseFloat((document.getElementById('diceStopLoss') || {}).value) || 0;
  var maxBets = parseInt((document.getElementById('diceAutoBetsInput') || {}).value) || 0;

  if(stopProfit > 0 && diceAutoProfit >= stopProfit) { showToast('✅ Stop on profit reached!'); diceStopAuto(); return; }
  if(stopLoss > 0 && diceAutoProfit <= -stopLoss) { showToast('❌ Stop on loss reached!'); diceStopAuto(); return; }
  if(maxBets > 0 && diceAutoBets >= maxBets) { showToast('✅ Bet count reached!'); diceStopAuto(); return; }
  if(bet > bal) { showToast('❌ Insufficient balance!'); diceStopAuto(); return; }

  addBal(-bet); updateWager(bet);
  var roll = parseFloat((Math.random() * 100).toFixed(2));
  var t = parseFloat(document.getElementById('diceSlider').value);
  var win = diceDir === 'over' ? roll > t : roll < t;
  var mult = parseFloat((document.getElementById('diceMult') || {}).value) || 1.94;
  var wc = parseFloat((document.getElementById('diceWC') || {}).value) || 50;

  if(win) addBal(bet * mult);
  var profit = win ? bet * (mult - 1) : -bet;
  diceAutoProfit += profit;
  diceAutoBets++;

  // Update total profit display
  var tp = document.getElementById('diceAutoTotalProfit');
  if(tp) tp.value = diceAutoProfit.toFixed(6);

  diceSaveResult(bet, mult, wc, win, profit, roll);

  // Adjust bet for next round
  var winMode = (document.querySelector('[name="diceWin"]:checked') || {}).value || 'reset';
  var lossMode = (document.querySelector('[name="diceLoss"]:checked') || {}).value || 'reset';
  var winPct = parseFloat((document.getElementById('diceWinPct') || {}).value) || 100;
  var lossPct = parseFloat((document.getElementById('diceLossPct') || {}).value) || 100;

  var nextBet = diceAutoBase;
  if(win) {
    nextBet = winMode === 'increase' ? bet * (1 + winPct / 100) : diceAutoBase;
  } else {
    nextBet = lossMode === 'increase' ? bet * (1 + lossPct / 100) : diceAutoBase;
  }

  var amtEl = document.getElementById('diceAmt');
  if(amtEl) amtEl.value = nextBet.toFixed(6);
  diceCalcProfit();

  diceAutoTimer = setTimeout(diceAutoStep, 700);
}

// ── SAVE & RENDER BETS ──
function diceSaveResult(bet, mult, wc, win, profit, roll) {
  var now = new Date();
  var ts = (now.getDate() < 10 ? '0' : '') + now.getDate() + '/' + (now.getMonth() < 9 ? '0' : '') + (now.getMonth() + 1);
  var rec = { game: 'Dice', bet: bet, mult: mult, wc: wc, win: win, profit: profit, roll: roll, ts: ts };
  diceBetHistory.unshift(rec);
  try { localStorage.setItem('diceHistory', JSON.stringify(diceBetHistory.slice(0, 100))); } catch(e) {}
  // Save to site all bets
  try {
    var ab = JSON.parse(localStorage.getItem('site_all_bets') || '[]');
    ab.unshift({ u: localStorage.getItem('userName') || '?', g: 'Dice', b: bet, p: mult, w: win, pr: profit, t: ts });
    localStorage.setItem('site_all_bets', JSON.stringify(ab.slice(0, 200)));
  } catch(e) {}
  diceRenderBets();
  try { renderGlobalBets(); } catch(e) {}
}

function diceRenderBets() {
  var list = document.getElementById('gBetList');
  if(!list) return;
  if(!diceBetHistory.length) { list.innerHTML = '<div class="tp-no-bets">No bets yet.</div>'; return; }
  var h = '<table class="tp-hist-tbl"><thead><tr><th>Time</th><th>Game</th><th>Bet</th><th>Multiplier</th><th>Profit</th></tr></thead><tbody>';
  diceBetHistory.slice(0, 50).forEach(function(b) {
    var m = b.win ? b.mult.toFixed(2) + 'x' : '0.00x';
    var p = (b.profit >= 0 ? '+' : '') + b.profit.toFixed(6);
    var cls = b.win ? 'tp-win' : 'tp-lose';
    h += '<tr><td>' + b.ts + '</td><td>🎲 Dice</td><td>' + b.bet.toFixed(6) + '</td><td class="' + cls + '">' + m + '</td><td class="' + cls + '">' + p + '</td></tr>';
  });
  h += '</tbody></table>';
  list.innerHTML = h;
}

function diceWinMode() { /* radio handled by browser */ }
function diceLossMode() { /* radio handled by browser */ }
