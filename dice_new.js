
// ═══════════════════════════════════════════════════════════════
// DICE GAME — v3 — All bugs fixed
// ═══════════════════════════════════════════════════════════════

var diceDir = 'over';
var diceAutoRunning = false;
var diceAutoBase = 0;
var diceAutoTimer = null;
var diceAutoProfit = 0;
var diceAutoBets = 0;
var diceBetHistory = [];

function buildDice() {
  diceDir = 'over';
  diceAutoRunning = false;
  if(diceAutoTimer) { clearTimeout(diceAutoTimer); diceAutoTimer = null; }

  var h = '<div class="tp-game-wrap">';


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
  h +=   '<label class="tp-toggle">';
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
  h +=   '<div style="position:relative;flex:1;display:flex;align-items:center">';
  h +=     '<input type="range" id="diceSlider" class="tp-slider" min="0.01" max="99.99" step="0.01" value="50" oninput="diceBySlider()" style="width:100%;margin:0">';
  h +=     '<div id="diceRollBubble" style="display:none;position:absolute;top:-30px;transform:translateX(-50%);color:#fff;font-size:12px;font-weight:900;padding:3px 8px;border-radius:5px;pointer-events:none;z-index:5;white-space:nowrap"></div>';
  h +=     '<div id="diceRollDot" style="display:none;position:absolute;top:50%;transform:translate(-50%,-50%);width:12px;height:12px;border-radius:50%;border:2px solid #fff;pointer-events:none;z-index:5"></div>';
  h +=   '</div>';
  h +=   '<span class="tp-sl-num">100</span>';
  h += '</div>';

  // ── AUTO SECTION ──
  h += '<div id="diceAutoSec" style="display:none;margin-top:18px">';

  h += '<div class="tp-auto-cols">';

  h += '<div class="tp-auto-box">';
  h +=   '<div class="tp-auto-hd">On Win</div>';
  h +=   '<label class="tp-radio"><input type="radio" name="diceWin" id="diceWinReset" value="reset" checked> <span class="tp-radio-dot tp-green-dot"></span> Reset</label>';
  h +=   '<div class="tp-radio-inc-row">';
  h +=     '<label class="tp-radio"><input type="radio" name="diceWin" id="diceWinInc" value="increase"> <span class="tp-radio-dot"></span> Increase By</label>';
  h +=     '<div class="tp-pct-box"><input type="number" id="diceWinPct" class="tp-pct-inp" value="100"> <span>%</span></div>';
  h +=   '</div>';
  h += '</div>';

  h += '<div class="tp-auto-box">';
  h +=   '<div class="tp-auto-hd">On Loss</div>';
  h +=   '<label class="tp-radio"><input type="radio" name="diceLoss" id="diceLossReset" value="reset" checked> <span class="tp-radio-dot tp-green-dot"></span> Reset</label>';
  h +=   '<div class="tp-radio-inc-row">';
  h +=     '<label class="tp-radio"><input type="radio" name="diceLoss" id="diceLossInc" value="increase"> <span class="tp-radio-dot"></span> Increase By</label>';
  h +=     '<div class="tp-pct-box"><input type="number" id="diceLossPct" class="tp-pct-inp" value="100"> <span>%</span></div>';
  h +=   '</div>';
  h += '</div>';

  h += '</div>'; // tp-auto-cols

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

  h += '</div>'; // diceAutoSec

  // ── HISTORY TABLE inside game wrap ──
  h += '<div style="margin-top:22px">';
  h += '<div class="dg-bet-tabs"><button class="dg-btab dg-btab-act" id="diceTabMy" onclick="diceShowTab(\'my\')">My Bets</button><button class="dg-btab" id="diceTabAll" onclick="diceShowTab(\'all\')">All Bets</button></div>';
  h += '<div id="diceMyBetList" class="tp-hist-wrap"></div>';
  h += '<div id="diceAllBetList" class="tp-hist-wrap" style="display:none"></div>';
  h += '</div>';

  h += '</div>'; // tp-game-wrap

  document.getElementById('gameFrame').innerHTML = h;
  diceUpdate();
  diceBetHistory = [];
  try { var s = localStorage.getItem('diceHistory'); if(s) diceBetHistory = JSON.parse(s) || []; } catch(e) {}
  diceRenderMyBets();
  diceRenderAllBets();
}

// ── CALCULATIONS ──
function diceUpdate() {
  var sl = document.getElementById('diceSlider'); if(!sl) return;
  var t = parseFloat(sl.value);
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

  var gr = '#28a745', rd = '#dc3545';
  if(diceDir === 'over') {
    sl.style.background = 'linear-gradient(to right,' + rd + ' 0%,' + rd + ' ' + t + '%,' + gr + ' ' + t + '%,' + gr + ' 100%)';
  } else {
    sl.style.background = 'linear-gradient(to right,' + gr + ' 0%,' + gr + ' ' + t + '%,' + rd + ' ' + t + '%,' + rd + ' 100%)';
  }
  diceCalcProfit();
}

function diceCalcProfit() {
  var amt = parseFloat((document.getElementById('diceAmt') || {}).value) || 0;
  var mult = parseFloat((document.getElementById('diceMult') || {}).value) || 1.94;
  var pw = document.getElementById('diceProfitWin');
  if(pw) pw.value = (amt * (mult - 1)).toFixed(6);
}

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
  var wc = Math.max(0.02, Math.min(96.04, parseFloat((97 / m).toFixed(4))));
  var t = diceDir === 'over' ? (100 - wc) : wc;
  document.getElementById('diceSlider').value = t;
  diceUpdate();
}

function diceByWC() {
  var wc = Math.max(0.02, Math.min(96.04, parseFloat(document.getElementById('diceWC').value) || 50));
  var t = diceDir === 'over' ? (100 - wc) : wc;
  document.getElementById('diceSlider').value = t;
  diceUpdate();
}

function diceToggleDir() {
  diceDir = diceDir === 'over' ? 'under' : 'over';
  var wc = parseFloat((document.getElementById('diceWC') || {}).value) || 50;
  var t = diceDir === 'over' ? (100 - wc) : wc;
  document.getElementById('diceSlider').value = t;
  diceUpdate();
}

function diceMultAmt(f) {
  var el = document.getElementById('diceAmt'); if(!el) return;
  el.value = (parseFloat(el.value || 0) * f).toFixed(6);
  diceCalcProfit();
}

function diceToggleMode() {
  var isAuto = (document.getElementById('diceAutoChk') || {}).checked;
  var lbl = document.getElementById('diceModeLbl');
  var sec = document.getElementById('diceAutoSec');
  var btn = document.getElementById('diceRollBtn');
  if(lbl) lbl.textContent = isAuto ? 'Auto' : 'Manual';
  if(sec) sec.style.display = isAuto ? '' : 'none';
  if(btn) { btn.textContent = isAuto ? 'AUTO DICE' : 'ROLL DICE'; btn.style.background = ''; }
  if(!isAuto && diceAutoRunning) diceStopAuto();
}


// ── MANUAL ROLL ──
function diceRoll() {
  var isAuto = (document.getElementById('diceAutoChk') || {}).checked;
  if(isAuto) {
    if(diceAutoRunning) { diceStopAuto(); return; }
    diceStartAuto(); return;
  }

  var btn = document.getElementById('diceRollBtn');
  if(!btn || btn.disabled) return;
  var bet = parseFloat((document.getElementById('diceAmt') || {}).value) || 0;
  if(bet <= 0) { showToast('Enter bet amount!'); return; }
  var bal = (parseFloat(localStorage.getItem('userBalance')) || 0);
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

    diceShowRollPoint(roll, win);
    diceSaveResult(bet, mult, wc, win, profit, roll);
    btn.disabled = false; btn.textContent = 'ROLL DICE';
  }, 600);
}

// ── AUTO BET ──
function diceStartAuto() {
  var bet = parseFloat((document.getElementById('diceAmt') || {}).value) || 0;
  if(bet <= 0) { showToast('Enter bet amount!'); return; }
  var bal = (parseFloat(localStorage.getItem('userBalance')) || 0);
  if(bet > bal) { showToast('Insufficient balance!'); return; }

  diceAutoRunning = true;
  diceAutoBase = bet;
  diceAutoProfit = 0;
  diceAutoBets = 0;
  var tp = document.getElementById('diceAutoTotalProfit'); if(tp) tp.value = '0.000000';
  var btn = document.getElementById('diceRollBtn');
  if(btn) { btn.textContent = 'STOP AUTO'; btn.style.background = '#dc3545'; }
  diceAutoStep();
}

function diceStopAuto() {
  diceAutoRunning = false;
  if(diceAutoTimer) { clearTimeout(diceAutoTimer); diceAutoTimer = null; }
  var btn = document.getElementById('diceRollBtn');
  if(btn) { btn.textContent = 'AUTO DICE'; btn.style.background = ''; }
  showToast('Auto stopped. Total bets: ' + diceAutoBets + ' | Profit: ' + (diceAutoProfit >= 0 ? '+' : '') + diceAutoProfit.toFixed(6));
}

function diceAutoStep() {
  if(!diceAutoRunning) return;

  var bet = parseFloat((document.getElementById('diceAmt') || {}).value) || diceAutoBase;
  var bal = (parseFloat(localStorage.getItem('userBalance')) || 0);

  var stopProfit = parseFloat((document.getElementById('diceStopProfit') || {}).value) || 0;
  var stopLoss = parseFloat((document.getElementById('diceStopLoss') || {}).value) || 0;
  var maxBets = parseInt((document.getElementById('diceAutoBetsInput') || {}).value) || 0;

  if(stopProfit > 0 && diceAutoProfit >= stopProfit) { showToast('✅ Profit target hit!'); diceStopAuto(); return; }
  if(stopLoss > 0 && diceAutoProfit <= -stopLoss) { showToast('❌ Stop loss hit!'); diceStopAuto(); return; }
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

  var tp = document.getElementById('diceAutoTotalProfit');
  if(tp) tp.value = diceAutoProfit.toFixed(6);

  diceShowRollPoint(roll, win);
  diceSaveResult(bet, mult, wc, win, profit, roll);

  // Read radio buttons correctly
  var winReset = document.getElementById('diceWinReset');
  var lossReset = document.getElementById('diceLossReset');
  var winMode = (winReset && winReset.checked) ? 'reset' : 'increase';
  var lossMode = (lossReset && lossReset.checked) ? 'reset' : 'increase';
  var winPct = parseFloat((document.getElementById('diceWinPct') || {}).value) || 100;
  var lossPct = parseFloat((document.getElementById('diceLossPct') || {}).value) || 100;

  var nextBet;
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


// ── ROLL POINT ON SLIDER ──
function diceShowRollPoint(roll, win) {
  var bubble = document.getElementById('diceRollBubble');
  var dot = document.getElementById('diceRollDot');
  if(!bubble || !dot) return;
  var pct = Math.max(0, Math.min(100, roll));
  var col = win ? '#28a745' : '#dc3545';
  bubble.style.display = 'block';
  bubble.style.left = pct + '%';
  bubble.textContent = roll.toFixed(2);
  bubble.style.background = col;
  dot.style.display = 'block';
  dot.style.left = pct + '%';
  dot.style.background = col;
}

// ── SAVE & RENDER ──
function diceSaveResult(bet, mult, wc, win, profit, roll) {
  var now = new Date();
  var ts = (now.getDate() < 10 ? '0' : '') + now.getDate() + '/' + (now.getMonth() < 9 ? '0' : '') + (now.getMonth() + 1) + ' ' + now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
  var rec = { game: 'Dice', bet: bet, mult: mult, wc: wc, win: win, profit: profit, roll: roll, ts: ts };
  diceBetHistory.unshift(rec);
  try { localStorage.setItem('diceHistory', JSON.stringify(diceBetHistory.slice(0, 100))); } catch(e) {}
  try {
    var ab = JSON.parse(localStorage.getItem('site_all_bets') || '[]');
    ab.unshift({ u: localStorage.getItem('userName') || 'Player', g: 'Dice', b: bet, p: mult, w: win, pr: profit, t: ts });
    localStorage.setItem('site_all_bets', JSON.stringify(ab.slice(0, 200)));
  } catch(e) {}
  diceRenderMyBets();
  diceRenderAllBets();
  // Update global bet section if visible
  try { renderGlobalBets(); } catch(e) {}
}

function diceRenderMyBets() {
  var list = document.getElementById('diceMyBetList');
  if(!list) return;
  if(!diceBetHistory.length) { list.innerHTML = '<div class="tp-no-bets">No bets yet. Roll to start!</div>'; return; }
  var h = '<table class="tp-hist-tbl"><thead><tr><th>Time</th><th>Game</th><th>Bet</th><th>Multiplier</th><th>Profit</th></tr></thead><tbody>';
  diceBetHistory.slice(0, 50).forEach(function(b, i) {
    var m = b.win ? b.mult.toFixed(2) + 'x' : '0.00x';
    var p = (b.profit >= 0 ? '+' : '') + b.profit.toFixed(6);
    var cls = b.win ? 'tp-win' : 'tp-lose';
    h += '<tr><td>' + b.ts + '</td><td>🎲 Dice</td><td>' + b.bet.toFixed(6) + '</td><td class="' + cls + '">' + m + '</td><td class="' + cls + '">' + p + '</td></tr>';
  });
  h += '</tbody></table>';
  list.innerHTML = h;
}

function diceRenderAllBets() {
  var list = document.getElementById('diceAllBetList');
  if(!list) return;
  try {
    var ab = JSON.parse(localStorage.getItem('site_all_bets') || '[]');
    if(!ab.length) { list.innerHTML = '<div class="tp-no-bets">No bets yet.</div>'; return; }
    var h = '<table class="tp-hist-tbl"><thead><tr><th>Time</th><th>User</th><th>Game</th><th>Bet</th><th>Multiplier</th><th>Profit</th></tr></thead><tbody>';
    ab.slice(0, 50).forEach(function(b) {
      var p = (b.pr >= 0 ? '+' : '') + parseFloat(b.pr).toFixed(6);
      var cls = b.w ? 'tp-win' : 'tp-lose';
      h += '<tr><td>' + b.t + '</td><td>' + b.u + '</td><td>' + b.g + '</td><td>' + parseFloat(b.b).toFixed(6) + '</td><td class="' + cls + '">' + (b.w ? parseFloat(b.p).toFixed(2) + 'x' : '0.00x') + '</td><td class="' + cls + '">' + p + '</td></tr>';
    });
    h += '</tbody></table>';
    list.innerHTML = h;
  } catch(e) { list.innerHTML = '<div class="tp-no-bets">Error loading bets.</div>'; }
}


// ── BET INFO MODAL ──
function diceOpenBetInfo(idx) {
  var b = diceBetHistory[idx];
  if(!b) return;

  var modal = document.getElementById('betModal');
  if(!modal) {
    modal = document.createElement('div');
    modal.id = 'betModal';
    modal.style.cssText = 'display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.8);align-items:center;justify-content:center;';
    var inner = document.createElement('div');
    inner.style.cssText = 'background:#0d2137;border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:24px;min-width:320px;max-width:480px;width:90%;position:relative';
    var hdr = document.createElement('div');
    hdr.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:16px';
    var ttl = document.createElement('span');
    ttl.id = 'bmTitle';
    ttl.style.cssText = 'font-size:16px;font-weight:800;color:#e8f0eb';
    var closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = 'background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);color:#fff;width:30px;height:30px;border-radius:7px;cursor:pointer;font-size:18px';
    closeBtn.onclick = function(){ modal.style.display='none'; };
    hdr.appendChild(ttl); hdr.appendChild(closeBtn);
    var res = document.createElement('div');
    res.id = 'bmResult';
    res.style.cssText = 'text-align:center;padding:14px;border-radius:10px;font-size:15px;font-weight:900;margin-bottom:14px';
    var seeds = document.createElement('div');
    seeds.id = 'bmSeeds';
    var vlink = document.createElement('div');
    vlink.id = 'bmVerifyLink';
    vlink.style.cssText = 'text-align:center;margin-top:14px';
    inner.appendChild(hdr); inner.appendChild(res); inner.appendChild(seeds); inner.appendChild(vlink);
    modal.appendChild(inner);
    modal.onclick = function(e){ if(e.target===modal) modal.style.display='none'; };
    document.body.appendChild(modal);
  }
  var title = document.getElementById('bmTitle');
  if(title) title.textContent = '\u{1F3B2} Dice \u2014 Bet Info';
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
    '<tr><td style="padding:6px 4px;color:#3ecf8e;font-weight:700">Rolled</td><td>' + (b.roll||0).toFixed(2) + '</td>' +
    '<td style="color:#3ecf8e;font-weight:700">Multiplier</td><td>' + (b.mult||0).toFixed(2) + 'x</td></tr>' +
    '<tr><td style="padding:6px 4px;color:#3ecf8e;font-weight:700">Bet</td><td>' + b.bet.toFixed(6) + ' TRX</td>' +
    '<td style="color:#3ecf8e;font-weight:700">Win Chance</td><td>' + (b.wc||0).toFixed(2) + '%</td></tr>' +
    '<tr><td style="padding:6px 4px;color:#3ecf8e;font-weight:700">Result</td><td colspan="3" style="color:' + (b.win?'#28a745':'#dc3545') + ';font-weight:700">' + (b.win?'WIN':'LOSS') + '</td></tr>' +
    '</table>';
  var vl = document.getElementById('bmVerifyLink');
  if(vl) vl.innerHTML = '<a href="https://tronsick.io/verify.php" target="_blank" style="color:#3ecf8e;font-size:13px;font-weight:700;text-decoration:underline">\u{1F512} Verify Provable Fairness</a>';
  modal.style.display = 'flex';
}

function diceShowTab(tab) {
  var my = document.getElementById('diceMyBetList');
  var all = document.getElementById('diceAllBetList');
  var tMy = document.getElementById('diceTabMy');
  var tAll = document.getElementById('diceTabAll');
  if(tab === 'my') {
    if(my) my.style.display = '';
    if(all) all.style.display = 'none';
    if(tMy) { tMy.classList.add('dg-btab-act'); }
    if(tAll) { tAll.classList.remove('dg-btab-act'); }
    diceRenderMyBets();
  } else {
    if(my) my.style.display = 'none';
    if(all) all.style.display = '';
    if(tMy) { tMy.classList.remove('dg-btab-act'); }
    if(tAll) { tAll.classList.add('dg-btab-act'); }
    diceRenderAllBets();
  }
}
