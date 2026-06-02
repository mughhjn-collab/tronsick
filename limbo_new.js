
// ═══════════════════════════════════════════════════════════════
// LIMBO GAME — Complete rebuild matching tronpick.io layout
// Formula: WinChance = 97 / TargetMultiplier
// NO slider - just Target Multiplier + Win Chance inputs
// Rocket animation on result
// ═══════════════════════════════════════════════════════════════

var limboAutoRunning = false;
var limboAutoBase = 0;
var limboAutoTimer = null;
var limboAutoProfit = 0;
var limboAutoBets = 0;
var limboBetHistory = [];

function buildLimbo() {
  var h = '';
  h += '<div class="tp-game-wrap">';

  // ── ROCKET ANIMATION AREA ──
  h += '<div class="lb-stage" id="lbStage">';
  h +=   '<div class="lb-rocket-wrap" id="lbRocketWrap">';
  h +=     '<div class="lb-result-val" id="lbResultVal" style="display:none"></div>';
  h +=     '<svg class="lb-rocket" id="lbRocket" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">';
  h +=       '<ellipse cx="40" cy="45" rx="18" ry="30" fill="#e8e8e8" stroke="#bbb" stroke-width="1.5"/>';
  h +=       '<polygon points="40,5 25,35 55,35" fill="#e74c3c"/>';
  h +=       '<rect x="22" y="55" width="10" height="18" rx="3" fill="#bbb"/>';
  h +=       '<rect x="48" y="55" width="10" height="18" rx="3" fill="#bbb"/>';
  h +=       '<ellipse cx="40" cy="42" rx="8" ry="10" fill="#87ceeb" stroke="#5ba3c9" stroke-width="1"/>';
  h +=       '<ellipse cx="40" cy="78" rx="10" ry="6" fill="#f39c12" opacity="0.8" id="lbFlame1"/>';
  h +=       '<ellipse cx="40" cy="84" rx="7" ry="8" fill="#e74c3c" opacity="0.6" id="lbFlame2"/>';
  h +=     '</svg>';
  h +=   '</div>';
  h += '</div>';

  // ── BET ROW: Auto checkbox + BET button ──
  h += '<div class="tp-action-row" style="margin-top:14px">';
  h += '<label class="tp-auto-chk-lbl">';
  h +=   '<input type="checkbox" id="limboAutoChk" onchange="limboToggleMode()"> Auto';
  h += '</label>';
  h += '<button class="tp-roll-btn" id="limboRollBtn" onclick="limboRoll()">BET</button>';
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

  // On Win
  h += '<div class="tp-auto-box">';
  h +=   '<div class="tp-auto-hd">On Win</div>';
  h +=   '<label class="tp-radio"><input type="radio" name="limboWin" value="reset" checked> <span class="tp-radio-ico tp-green">✔</span> Reset</label>';
  h +=   '<label class="tp-radio"><input type="radio" name="limboWin" value="increase"> <span class="tp-radio-ico"></span> Increase By <input type="number" id="limboWinPct" class="tp-pct-inp" value="100"> %</label>';
  h += '</div>';

  // On Loss
  h += '<div class="tp-auto-box">';
  h +=   '<div class="tp-auto-hd">On Loss</div>';
  h +=   '<label class="tp-radio"><input type="radio" name="limboLoss" value="reset" checked> <span class="tp-radio-ico tp-green">✔</span> Reset</label>';
  h +=   '<label class="tp-radio"><input type="radio" name="limboLoss" value="increase"> <span class="tp-radio-ico"></span> Increase By <input type="number" id="limboLossPct" class="tp-pct-inp" value="100"> %</label>';
  h += '</div>';

  h += '</div>';

  h += '<div class="tp-auto-stops">';
  h += '<div class="tp-field">';
  h +=   '<div class="tp-label tp-green">Stop On Profit</div>';
  h +=   '<div class="tp-inp-row"><img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" class="tp-trx-ico" alt="TRX"><input type="number" id="limboStopProfit" class="tp-inp" value="0.000000" step="0.000001" min="0"></div>';
  h += '</div>';
  h += '<div class="tp-field">';
  h +=   '<div class="tp-label tp-green">Stop On Loss</div>';
  h +=   '<div class="tp-inp-row"><img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" class="tp-trx-ico" alt="TRX"><input type="number" id="limboStopLoss" class="tp-inp" value="0.000000" step="0.000001" min="0"></div>';
  h += '</div>';
  h += '</div>';

  h += '<div class="tp-auto-stops" style="margin-top:12px">';
  h += '<div class="tp-field">';
  h +=   '<div class="tp-label tp-green">Rolls</div>';
  h +=   '<div class="tp-inp-row"><input type="number" id="limboAutoRolls" class="tp-inp" value="0" min="0" step="1"></div>';
  h += '</div>';
  h += '<div class="tp-field">';
  h +=   '<div class="tp-label tp-green">Total Profit</div>';
  h +=   '<div class="tp-inp-row"><img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" class="tp-trx-ico" alt="TRX"><input type="number" id="limboAutoTotalProfit" class="tp-inp" value="0.000000" readonly></div>';
  h += '</div>';
  h += '</div>';

  h += '</div>'; // end limboAutoSec
  h += '</div>'; // end tp-game-wrap

  document.getElementById('gameFrame').innerHTML = h;
  limboBetHistory = [];
  try { var s = localStorage.getItem('limboHistory'); if(s) limboBetHistory = JSON.parse(s) || []; } catch(e) {}
}

// ── CALCULATIONS ──
function limboByMult() {
  var m = parseFloat(document.getElementById('limboMult').value) || 2;
  m = Math.max(1.0104, Math.min(4850, m));
  var wc = parseFloat((97 / m).toFixed(2));
  wc = Math.max(0.02, Math.min(96.04, wc));
  var wcEl = document.getElementById('limboWC');
  if(wcEl) wcEl.value = wc.toFixed(2);
}

function limboByWC() {
  var wc = parseFloat(document.getElementById('limboWC').value) || 48.5;
  wc = Math.max(0.02, Math.min(96.04, wc));
  var m = parseFloat((97 / wc).toFixed(2));
  m = Math.max(1.0104, Math.min(4850, m));
  var mEl = document.getElementById('limboMult');
  if(mEl) mEl.value = m.toFixed(2);
}

function limboMultAmt(factor) {
  var el = document.getElementById('limboAmt'); if(!el) return;
  el.value = (parseFloat(el.value || 0) * factor).toFixed(6);
}

// ── MODE TOGGLE ──
function limboToggleMode() {
  var chk = document.getElementById('limboAutoChk');
  var isAuto = chk && chk.checked;
  var sec = document.getElementById('limboAutoSec');
  var btn = document.getElementById('limboRollBtn');
  if(sec) sec.style.display = isAuto ? '' : 'none';
  if(btn) btn.textContent = isAuto ? 'AUTO BET' : 'BET';
  if(!isAuto && limboAutoRunning) limboStopAuto();
}

// ── ANIMATION ──
function limboAnimate(win, resultMult, targetMult) {
  var wrap = document.getElementById('lbRocketWrap');
  var rocket = document.getElementById('lbRocket');
  var rv = document.getElementById('lbResultVal');

  if(!wrap || !rocket) return;

  // Animate rocket up
  wrap.style.transition = 'transform 0.8s ease-out';
  wrap.style.transform = 'translateY(-60px)';

  setTimeout(function() {
    if(rv) {
      rv.style.display = 'block';
      rv.textContent = resultMult.toFixed(2) + 'x';
      rv.style.color = win ? '#28a745' : '#dc3545';
      rv.style.fontSize = '28px';
      rv.style.fontWeight = '900';
    }
    // Flash rocket color
    if(rocket) rocket.style.filter = win ? 'drop-shadow(0 0 12px #28a745)' : 'drop-shadow(0 0 12px #dc3545)';
    setTimeout(function() {
      wrap.style.transition = 'transform 0.4s ease-in';
      wrap.style.transform = 'translateY(0)';
      if(rocket) rocket.style.filter = '';
      if(rv) setTimeout(function(){ rv.style.display='none'; }, 1200);
    }, 800);
  }, 600);
}

// ── MANUAL BET ──
function limboRoll() {
  var isAuto = (document.getElementById('limboAutoChk') || {}).checked;
  if(isAuto) {
    if(limboAutoRunning) { limboStopAuto(); return; }
    limboStartAuto(); return;
  }

  var btn = document.getElementById('limboRollBtn'); if(!btn || btn.disabled) return;
  var bet = parseFloat((document.getElementById('limboAmt') || {}).value) || 0;
  if(bet <= 0) { showToast('Enter bet amount!'); return; }
  var bal = parseFloat(document.getElementById('userBalance').textContent) || 0;
  if(bet > bal) { showToast('Insufficient balance!'); return; }

  btn.disabled = true; btn.textContent = 'Rolling...';
  addBal(-bet); updateWager(bet);

  setTimeout(function() {
    var target = parseFloat((document.getElementById('limboMult') || {}).value) || 2;
    var wc = parseFloat((document.getElementById('limboWC') || {}).value) || 48.5;
    // Generate result: random 1.00x to 10000x using exponential distribution
    var rand = Math.random();
    var resultMult = parseFloat((1 / (1 - rand * 0.97)).toFixed(2));
    resultMult = Math.min(resultMult, 10000);
    var win = resultMult >= target;

    if(win) addBal(bet * target);
    var profit = win ? bet * (target - 1) : -bet;

    limboAnimate(win, resultMult, target);
    limboSaveResult(bet, target, wc, win, profit, resultMult);

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
  if(btn) { btn.textContent = 'STOP'; btn.style.background = '#dc3545'; }
  limboAutoStep();
}

function limboStopAuto() {
  limboAutoRunning = false;
  if(limboAutoTimer) { clearTimeout(limboAutoTimer); limboAutoTimer = null; }
  var btn = document.getElementById('limboRollBtn');
  if(btn) { btn.textContent = 'AUTO BET'; btn.style.background = ''; }
  showToast('Auto stopped. Rolls: ' + limboAutoBets);
}

function limboAutoStep() {
  if(!limboAutoRunning) return;

  var bet = parseFloat((document.getElementById('limboAmt') || {}).value) || limboAutoBase;
  var bal = parseFloat(document.getElementById('userBalance').textContent) || 0;
  var stopProfit = parseFloat((document.getElementById('limboStopProfit') || {}).value) || 0;
  var stopLoss = parseFloat((document.getElementById('limboStopLoss') || {}).value) || 0;
  var maxRolls = parseInt((document.getElementById('limboAutoRolls') || {}).value) || 0;

  if(stopProfit > 0 && limboAutoProfit >= stopProfit) { showToast('✅ Profit target reached!'); limboStopAuto(); return; }
  if(stopLoss > 0 && limboAutoProfit <= -stopLoss) { showToast('❌ Loss limit reached!'); limboStopAuto(); return; }
  if(maxRolls > 0 && limboAutoBets >= maxRolls) { showToast('✅ Roll count reached!'); limboStopAuto(); return; }
  if(bet > bal) { showToast('❌ Insufficient balance!'); limboStopAuto(); return; }

  addBal(-bet); updateWager(bet);
  var target = parseFloat((document.getElementById('limboMult') || {}).value) || 2;
  var wc = parseFloat((document.getElementById('limboWC') || {}).value) || 48.5;
  var rand = Math.random();
  var resultMult = parseFloat((1 / (1 - rand * 0.97)).toFixed(2));
  resultMult = Math.min(resultMult, 10000);
  var win = resultMult >= target;

  if(win) addBal(bet * target);
  var profit = win ? bet * (target - 1) : -bet;
  limboAutoProfit += profit;
  limboAutoBets++;

  var tp = document.getElementById('limboAutoTotalProfit');
  if(tp) tp.value = limboAutoProfit.toFixed(6);

  limboSaveResult(bet, target, wc, win, profit, resultMult);

  // Adjust next bet
  var winMode = (document.querySelector('[name="limboWin"]:checked') || {}).value || 'reset';
  var lossMode = (document.querySelector('[name="limboLoss"]:checked') || {}).value || 'reset';
  var winPct = parseFloat((document.getElementById('limboWinPct') || {}).value) || 100;
  var lossPct = parseFloat((document.getElementById('limboLossPct') || {}).value) || 100;

  var nextBet = limboAutoBase;
  if(win) { nextBet = winMode === 'increase' ? bet * (1 + winPct / 100) : limboAutoBase; }
  else { nextBet = lossMode === 'increase' ? bet * (1 + lossPct / 100) : limboAutoBase; }

  var amtEl = document.getElementById('limboAmt');
  if(amtEl) amtEl.value = nextBet.toFixed(6);

  limboAutoTimer = setTimeout(limboAutoStep, 700);
}

// ── SAVE RESULT ──
function limboSaveResult(bet, target, wc, win, profit, resultMult) {
  var now = new Date();
  var ts = (now.getDate() < 10 ? '0' : '') + now.getDate() + '/' + (now.getMonth() < 9 ? '0' : '') + (now.getMonth() + 1);
  var rec = { game: 'Limbo', bet: bet, mult: target, result: resultMult, wc: wc, win: win, profit: profit, ts: ts };
  limboBetHistory.unshift(rec);
  try { localStorage.setItem('limboHistory', JSON.stringify(limboBetHistory.slice(0, 100))); } catch(e) {}
  try {
    var ab = JSON.parse(localStorage.getItem('site_all_bets') || '[]');
    ab.unshift({ u: localStorage.getItem('userName') || '?', g: 'Limbo', b: bet, p: target, w: win, pr: profit, t: ts });
    localStorage.setItem('site_all_bets', JSON.stringify(ab.slice(0, 200)));
  } catch(e) {}
  try { renderGlobalBets(); } catch(e) {}
}
