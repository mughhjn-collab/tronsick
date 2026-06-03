<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Verify Bet — TronSick</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;background:#0b1120;color:#e8f0eb;min-height:100vh;padding:0}

/* HEADER */
.vf-header{background:rgba(0,0,0,.4);border-bottom:1px solid rgba(255,255,255,.07);padding:14px 20px;display:flex;align-items:center;gap:12px}
.vf-logo{font-size:18px;font-weight:900;color:#3ecf8e;letter-spacing:1px}
.vf-back{margin-left:auto;display:inline-flex;align-items:center;gap:6px;color:#3ecf8e;font-size:12px;font-weight:700;cursor:pointer;padding:7px 14px;background:rgba(62,207,142,.08);border:1px solid rgba(62,207,142,.2);border-radius:8px;text-decoration:none}
.vf-back:hover{background:rgba(62,207,142,.15)}

/* WRAP */
.vf-wrap{max-width:560px;margin:0 auto;padding:24px 16px 40px}

/* HERO */
.vf-hero{text-align:center;padding:28px 0 20px}
.vf-hero-title{font-size:11px;font-weight:700;color:rgba(255,255,255,.35);text-transform:uppercase;letter-spacing:2px;margin-bottom:8px}
.vf-hero-game{font-size:26px;font-weight:900;color:#fff;margin-bottom:4px}
.vf-hero-sub{font-size:13px;color:rgba(255,255,255,.4)}

/* RESULT BANNER */
.vf-result{border-radius:14px;padding:20px 24px;margin-bottom:16px;display:flex;align-items:center;gap:16px}
.vf-result.win{background:linear-gradient(135deg,rgba(34,197,94,.12),rgba(62,207,142,.08));border:1px solid rgba(34,197,94,.3)}
.vf-result.lose{background:linear-gradient(135deg,rgba(239,68,68,.12),rgba(220,38,38,.08));border:1px solid rgba(239,68,68,.3)}
.vf-result-icon{font-size:32px;line-height:1}
.vf-result-label{font-size:22px;font-weight:900;letter-spacing:.5px}
.vf-result.win .vf-result-label{color:#22c55e}
.vf-result.lose .vf-result-label{color:#ef4444}
.vf-result-profit{font-size:14px;font-weight:700;margin-top:2px}
.vf-result.win .vf-result-profit{color:#3ecf8e}
.vf-result.lose .vf-result-profit{color:#ef4444}

/* STATS GRID */
.vf-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px}
.vf-stat{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:14px 10px;text-align:center}
.vf-stat-v{font-family:'JetBrains Mono',monospace;font-size:16px;font-weight:700;color:#fff;margin-bottom:4px}
.vf-stat-l{font-size:10px;color:rgba(255,255,255,.3);text-transform:uppercase;letter-spacing:.5px}
.vf-stat-v.green{color:#3ecf8e}
.vf-stat-v.red{color:#ef4444}

/* SEED CARD */
.vf-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:20px;margin-bottom:16px}
.vf-card-title{font-size:11px;font-weight:700;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:16px;display:flex;align-items:center;gap:8px}
.vf-card-title::after{content:'';flex:1;height:1px;background:rgba(255,255,255,.06)}

/* SEED ROW */
.vf-seed-row{margin-bottom:14px}
.vf-seed-label{display:flex;align-items:center;gap:8px;margin-bottom:6px}
.vf-seed-icon{width:28px;height:28px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex-shrink:0}
.vf-seed-icon.srv{background:rgba(96,165,250,.12);color:#60a5fa;border:1px solid rgba(96,165,250,.2)}
.vf-seed-icon.hash{background:rgba(245,158,11,.12);color:#f59e0b;border:1px solid rgba(245,158,11,.2)}
.vf-seed-icon.cli{background:rgba(62,207,142,.12);color:#3ecf8e;border:1px solid rgba(62,207,142,.2)}
.vf-seed-icon.nonce{background:rgba(167,139,250,.12);color:#a78bfa;border:1px solid rgba(167,139,250,.2)}
.vf-seed-name{font-size:11px;font-weight:700;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.8px}
.vf-seed-val{font-family:'JetBrains Mono',monospace;font-size:11.5px;color:#e8f0eb;background:rgba(0,0,0,.3);border:1px solid rgba(255,255,255,.07);border-radius:8px;padding:10px 14px;word-break:break-all;line-height:1.6}
.vf-seed-val.gold{color:#f59e0b}
.vf-seed-val.blue{color:#60a5fa}
.vf-seed-val.green{color:#3ecf8e}
.vf-seed-val.purple{color:#a78bfa;font-size:15px;font-weight:700}

/* NOTICE */
.vf-notice{background:rgba(245,158,11,.07);border:1px solid rgba(245,158,11,.18);border-radius:10px;padding:12px 16px;font-size:12px;color:#f59e0b;line-height:1.6;display:flex;gap:10px;align-items:flex-start}
.vf-notice-icon{font-size:16px;flex-shrink:0;margin-top:1px}

/* EMPTY */
.vf-empty{text-align:center;padding:60px 20px}
.vf-empty-icon{font-size:48px;margin-bottom:16px}
.vf-empty-title{font-size:18px;font-weight:700;color:#fff;margin-bottom:8px}
.vf-empty-sub{font-size:14px;color:rgba(255,255,255,.4);line-height:1.7}

/* PROVABLY FAIR INFO */
.vf-pf-info{background:rgba(62,207,142,.05);border:1px solid rgba(62,207,142,.1);border-radius:12px;padding:16px;font-size:12px;color:rgba(255,255,255,.5);line-height:1.8;margin-bottom:16px}
.vf-pf-info strong{color:#3ecf8e}
</style>
</head>
<body>

<div class="vf-header">
  <div class="vf-logo">🎰 TronSick</div>
  <a href="javascript:history.back()" class="vf-back">← Back to Game</a>
</div>

<div class="vf-wrap">
  <div class="vf-hero">
    <div class="vf-hero-title">Provably Fair</div>
    <div class="vf-hero-game" id="heroGame">Bet Verification</div>
    <div class="vf-hero-sub">Every bet is cryptographically verifiable</div>
  </div>

  <div id="vfContent">
    <!-- Filled by JS -->
    <div class="vf-empty">
      <div class="vf-empty-icon">🔍</div>
      <div class="vf-empty-title">No Bet Data Found</div>
      <div class="vf-empty-sub">
        Go back to the game, place a bet,<br>
        click <strong style="color:#3ecf8e">Bet Info</strong> on any bet, then click<br>
        <strong style="color:#3ecf8e">🔒 Verify Fairness</strong>
      </div>
    </div>
  </div>
</div>

<script>
(function(){
  // ── 1. Load data — try ALL sources ──
  var d = null;

  // Primary: localStorage dgVerifyData (set by Diamond, Wheel, Limbo old)
  try {
    var raw = localStorage.getItem('dgVerifyData');
    if(raw) d = JSON.parse(raw);
  } catch(e){}

  // Secondary: sessionStorage vfy_* (set by dice_new.js / limbo_new.js)
  if(!d || !d.bet){
    var ss_game = sessionStorage.getItem('vfy_game');
    if(ss_game){
      d = {
        game: ss_game,
        clientSeed:    sessionStorage.getItem('vfy_client') || '',
        serverSeed:    sessionStorage.getItem('vfy_server') || '',
        serverSeedHash:sessionStorage.getItem('vfy_hash') || '',
        nonce:         parseInt(sessionStorage.getItem('vfy_nonce')||'1'),
        bet: {
          win:    sessionStorage.getItem('vfy_win') === '1',
          bet:    parseFloat(sessionStorage.getItem('vfy_bet')||'0'),
          profit: parseFloat(sessionStorage.getItem('vfy_profit')||'0'),
          roll:   parseFloat(sessionStorage.getItem('vfy_roll')||'0'),
          mult:   parseFloat(sessionStorage.getItem('vfy_mult')||'1'),
          wc:     parseFloat(sessionStorage.getItem('vfy_wc')||'0')
        }
      };
    }
  }

  // Tertiary: URL params (used by Tower, Mines, SicBo verify buttons)
  if(!d || !d.bet){
    var params = new URLSearchParams(window.location.search);
    var gParam = params.get('game');
    if(gParam){
      var betWin = params.get('win') === '1';
      var betAmt = parseFloat(params.get('bet')||'0');
      var betProfit = parseFloat(params.get('profit')||'0');
      d = {
        game:          gParam,
        clientSeed:    decodeURIComponent(params.get('client')||''),
        serverSeed:    decodeURIComponent(params.get('seed')||''),
        serverSeedHash:decodeURIComponent(params.get('hash')||''),
        nonce:         parseInt(params.get('nonce')||'1'),
        bet: {
          win:    betWin,
          bet:    betAmt,
          profit: betProfit,
          mult:   parseFloat(params.get('mult')||'0'),
          payout: parseFloat(params.get('mult')||'0'),
          wc:     parseFloat(params.get('wc')||'0'),
          roll:   parseFloat(params.get('roll')||'0'),
          // Mines
          mines:  params.get('mines') || '',
          picks:  params.get('picks') || '',
          // SicBo
          choice: decodeURIComponent(params.get('choice')||''),
          sum:    params.get('sum') || '',
          // Tower
          mode:   params.get('mode') || '',
          // Wheel
          segment: params.get('segment') || ''
        }
      };
    }
  }

  if(!d || !d.bet) return; // Show empty state

  // ── 2. Extract fields ──
  var b      = d.bet;
  var game   = d.game || 'Game';
  var win    = !!b.win;
  var bet    = parseFloat(b.bet||0);
  var profit = parseFloat(b.profit||0);
  var payout = parseFloat(b.payout||b.mult||b.multiplier||1);
  var roll   = parseFloat(b.roll||b.crash||0);
  var wc     = parseFloat(b.wc||0);

  // Seeds
  var clientSeed = d.clientSeed || '';
  var serverSeed = d.serverSeed || '';
  var serverHash = d.serverSeedHash || '';
  var nonce      = d.nonce || b.nonce || b.id || 1;

  // ── 3. Game icon + name ──
  var icons = {
    'Dice':'🎲','dice':'🎲',
    'Limbo':'🚀','limbo':'🚀',
    'Wheel':'🎡','wheel':'🎡',
    'Diamond':'♦','diamond':'♦',
    'Mines':'💣','mines':'💣',
    'Sic Bo':'🎯','sicbo':'🎯','SicBo':'🎯',
    'Tower':'🏰','tower':'🏰',
    'Coin Flip':'🪙','coinflip':'🪙','CoinFlip':'🪙'
  };
  var icon = icons[game] || '🎰';
  document.getElementById('heroGame').textContent = icon + ' ' + game;

  // ── 4. Profit string ──
  var profitStr = (profit >= 0 ? '+' : '') + parseFloat(profit).toFixed(6) + ' TRX';

  // ── 5. Extra info per game ──
  var extraRows = '';
  var gLow = game.toLowerCase();
  if(gLow === 'dice'){
    extraRows +=
      seedRow('hash','🎲','Roll Result', roll.toFixed(2)) +
      seedRow('cli','→','Direction', b.dir || (b.roll < (b.wc||50) ? 'Under' : 'Over'));
  } else if(gLow === 'limbo'){
    extraRows +=
      seedRow('hash','🚀','Crash Point', roll.toFixed(2)+'x') +
      seedRow('cli','🎯','Target', payout.toFixed(2)+'x');
  } else if(gLow === 'wheel'){
    extraRows += seedRow('hash','🎡','Result Segment', b.segment || roll || '—');
  } else if(gLow === 'mines'){
    extraRows +=
      seedRow('hash','💣','Mines Count', b.mines || '—') +
      seedRow('cli','✅','Safe Picks', b.picks || '—');
  } else if(gLow === 'diamond'){
    extraRows += seedRow('hash','♦','Payout', payout.toFixed(2)+'x');
  } else if(gLow === 'sicbo' || gLow === 'sic bo'){
    extraRows += seedRow('hash','🎯','Dice Sum', b.sum || roll || '—');
  } else if(gLow === 'tower'){
    extraRows += seedRow('hash','🏰','Difficulty', b.mode || '—');
  }
  if(wc > 0) extraRows += seedRow('nonce','%','Win Chance', wc.toFixed(2)+'%');
  if(payout > 0 && payout !== 1) extraRows += seedRow('srv','×','Payout', payout.toFixed(2)+'x');

  // ── 6. Render HTML ──
  var html = '';

  // Result banner
  html += '<div class="vf-result ' + (win ? 'win' : 'lose') + '">' +
    '<div class="vf-result-icon">' + (win ? '✅' : '❌') + '</div>' +
    '<div>' +
      '<div class="vf-result-label">' + (win ? 'WIN' : 'LOSS') + '</div>' +
      '<div class="vf-result-profit">' + profitStr + '</div>' +
    '</div>' +
  '</div>';

  // Stats grid
  html += '<div class="vf-stats">' +
    '<div class="vf-stat"><div class="vf-stat-v">' + bet.toFixed(6) + '</div><div class="vf-stat-l">Bet (TRX)</div></div>' +
    '<div class="vf-stat"><div class="vf-stat-v ' + (win?'green':'red') + '">' + profitStr + '</div><div class="vf-stat-l">Profit</div></div>' +
    '<div class="vf-stat"><div class="vf-stat-v purple">#' + nonce + '</div><div class="vf-stat-l">Nonce</div></div>' +
  '</div>';

  // PF info
  html += '<div class="vf-pf-info">' +
    '<strong>How it works:</strong> Before your bet, we committed a <strong>Server Seed Hash</strong>. ' +
    'After your bet, we reveal the full <strong>Server Seed</strong>. You can verify the hash matches, ' +
    'proving the result was never changed. Your <strong>Client Seed</strong> is mixed with the server seed ' +
    'to generate an unpredictable, fair result.' +
  '</div>';

  // Seed card
  html += '<div class="vf-card">' +
    '<div class="vf-card-title">🔐 Seed Information</div>' +
    seedRow('srv','=','Server Seed', serverSeed || '—', 'blue') +
    seedRow('hash','</>','Server Seed Hash', serverHash || '—', 'gold') +
    seedRow('cli','@','Client Seed', clientSeed || '—', 'green') +
    seedRow('nonce','#','Nonce', String(nonce), 'purple') +
    extraRows +
  '</div>';

  // Notice
  html += '<div class="vf-notice">' +
    '<div class="vf-notice-icon">🔒</div>' +
    '<div>The server seed was committed <strong>BEFORE</strong> your bet was placed. ' +
    'The hash proves the seed was not changed after your bet. ' +
    'You can verify: <code style="background:rgba(0,0,0,.3);padding:2px 6px;border-radius:4px;font-size:11px">SHA256(serverSeed) === serverSeedHash</code></div>' +
  '</div>';

  document.getElementById('vfContent').innerHTML = html;
})();

function seedRow(iconClass, symbol, label, value, valClass){
  valClass = valClass || '';
  return '<div class="vf-seed-row">' +
    '<div class="vf-seed-label">' +
      '<div class="vf-seed-icon ' + iconClass + '">' + symbol + '</div>' +
      '<div class="vf-seed-name">' + label + '</div>' +
    '</div>' +
    '<div class="vf-seed-val ' + valClass + '">' + (value || '—') + '</div>' +
  '</div>';
}
</script>
</body>
</html>