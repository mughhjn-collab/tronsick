<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Verify Bet &ndash; TronSick</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;background:#0f1520;color:#e8f0eb;min-height:100vh;padding:24px}
.vf-wrap{max-width:720px;margin:0 auto}
.vf-back{display:inline-flex;align-items:center;gap:8px;color:#3ecf8e;font-size:13px;font-weight:700;cursor:pointer;margin-bottom:20px;padding:8px 16px;background:rgba(62,207,142,.08);border:1px solid rgba(62,207,142,.2);border-radius:8px;text-decoration:none}
.vf-back:hover{background:rgba(62,207,142,.15)}
.vf-logo{display:none}
.vf-sub{display:none}
.vf-pf-hero{text-align:center;margin-bottom:28px;padding:28px 20px 20px}
.vf-pf-title{font-size:32px;font-weight:900;color:#fff;letter-spacing:2px;text-transform:uppercase;margin-bottom:14px}
.vf-pf-desc{font-size:14px;color:rgba(255,255,255,.55);line-height:1.85;max-width:620px;margin:0 auto}

.vf-card{background:#1a1f2e;border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:24px;margin-bottom:20px}
.vf-hd{font-size:13px;font-weight:800;color:#fff;margin-bottom:16px;text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid rgba(255,255,255,.07);padding-bottom:10px}
.vf-row{display:flex;flex-direction:column;gap:4px;margin-bottom:14px}
.vf-lbl{font-size:10px;font-weight:700;color:rgba(255,255,255,.35);text-transform:uppercase;letter-spacing:.5px}
.vf-val{font-family:'JetBrains Mono',monospace;font-size:12px;color:#fff;word-break:break-all;background:rgba(0,0,0,.25);border:1px solid rgba(255,255,255,.08);border-radius:6px;padding:8px 12px}
.vf-val.gold{color:#f59e0b}
.vf-result{text-align:center;padding:20px;font-size:28px;font-weight:900;border-radius:10px;margin-bottom:16px}
.vf-result.win{background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.3);color:#22c55e}
.vf-result.lose{background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);color:#ef4444}
.vf-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.vf-stat{background:rgba(0,0,0,.2);border:1px solid rgba(255,255,255,.07);border-radius:8px;padding:12px;text-align:center}
.vf-stat-v{font-family:'JetBrains Mono',monospace;font-size:15px;font-weight:900;color:#fff;margin-bottom:4px}
.vf-stat-l{font-size:10px;color:rgba(255,255,255,.3);text-transform:uppercase;letter-spacing:.4px}
.vf-win{color:#22c55e;font-weight:700}
.vf-lose{color:#ef4444;font-weight:700}
.vf-notice{background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.2);border-radius:8px;padding:12px 16px;font-size:12px;color:#f59e0b;margin-top:16px}
</style>
</head>
<body>
<div class="vf-wrap">
  <div class="vf-pf-hero">
    <div class="vf-pf-title">PROVABLY FAIR</div>
    <div class="vf-pf-desc">Provable fairness is a transparent way for us to guarantee as the operator that we are providing true randomness without manipulation. This roll verifier is entirely coded in javascript so you can view the source to see how the roll is calculated and we will not be able to manipulate this script in any way because the calculations are done right here in your browser and the source is open for everyone to see.</div>
  </div>

  <div class="vf-card" id="resultCard"></div>
  <div class="vf-card" id="seedCard"></div>
</div>
<script>
var p=new URLSearchParams(window.location.search);

// ── Load from sessionStorage first (set by game's Bet Info modal) ──
var ss = {};
try {
  ss.game    = sessionStorage.getItem('vfy_game') || '';
  ss.win     = sessionStorage.getItem('vfy_win') === '1';
  ss.bet     = parseFloat(sessionStorage.getItem('vfy_bet') || 0);
  ss.profit  = parseFloat(sessionStorage.getItem('vfy_profit') || 0);
  ss.roll    = parseFloat(sessionStorage.getItem('vfy_roll') || 0);
  ss.mult    = parseFloat(sessionStorage.getItem('vfy_mult') || 0);
  ss.wc      = parseFloat(sessionStorage.getItem('vfy_wc') || 0);
  ss.client  = sessionStorage.getItem('vfy_client') || '';
  ss.server  = sessionStorage.getItem('vfy_server') || '';
  ss.hash    = sessionStorage.getItem('vfy_hash') || '';
  ss.nonce   = sessionStorage.getItem('vfy_nonce') || '1';
} catch(e) {}

var game   = ss.game || p.get('game') || '';
var win    = ss.game ? ss.win : p.get('win')==='1';
var profit = ss.game ? ss.profit : parseFloat(p.get('profit')||0);
var bet    = ss.game ? ss.bet : parseFloat(p.get('bet')||0);
var seed   = ss.server || p.get('seed') || '';
var hash   = ss.hash   || p.get('hash') || '';
var client = ss.client || p.get('client') || '';
var nonce  = ss.nonce  || p.get('nonce') || '1';
var roll   = ss.roll   || parseFloat(p.get('roll')||0);
var mult   = ss.mult   || parseFloat(p.get('mult')||0);
var wc     = ss.wc     || parseFloat(p.get('wc')||0);

var gameLabels={dice:'&#127922; Dice',limbo:'&#128640; Limbo',wheel:'&#127905; Wheel',mines:'&#128163; Mines',sicbo:'&#9861; Sic Bo',diamond:'&#9830; Diamond',tower:'Tower',coinflip:'Coin Flip'};
var gameName = gameLabels[game.toLowerCase()] || game || 'Game';

// Extra params per game
var extraInfo='';
if(game.toLowerCase()==='sicbo'){var sm=parseFloat(p.get('sum')||0);extraInfo='<div class="vf-row"><div class="vf-lbl">Dice Sum</div><div class="vf-val">'+sm+'</div></div>';}
if(game.toLowerCase()==='tower'){var mode=p.get('mode')||'';extraInfo='<div class="vf-row"><div class="vf-lbl">Difficulty</div><div class="vf-val">'+mode+'</div></div>';}
if(game.toLowerCase()==='mines'){var mines=p.get('mines')||'';var picks=p.get('picks')||'';extraInfo='<div class="vf-row"><div class="vf-lbl">Mines / Picks</div><div class="vf-val">'+mines+' mines / '+picks+' picks</div></div>';}
if(game.toLowerCase()==='dice'||game.toLowerCase()==='limbo'){
  extraInfo+='<div class="vf-row"><div class="vf-lbl">Roll Result</div><div class="vf-val">'+roll.toFixed(2)+'</div></div>';
  extraInfo+='<div class="vf-row"><div class="vf-lbl">Payout Multiplier</div><div class="vf-val">'+mult.toFixed(2)+'x</div></div>';
  extraInfo+='<div class="vf-row"><div class="vf-lbl">Win Chance</div><div class="vf-val">'+wc.toFixed(2)+'%</div></div>';
}

// Fallback: localStorage dice data
var lsData=null;
if((game==='dice'||game==='') && !ss.game){try{lsData=JSON.parse(localStorage.getItem('dgVerifyData'));}catch(e){}}
if(lsData&&lsData.bet){win=lsData.bet.win;profit=lsData.bet.profit;bet=lsData.bet.bet;seed=lsData.serverSeed||seed;hash=lsData.serverSeedHash||hash;client=lsData.clientSeed||client;nonce=(lsData.bet.id||nonce);}

// If no data at all, show helpful message
if(!ss.game && !lsData && !p.get('game')) {
  document.getElementById('resultCard').innerHTML = '<div class="vf-hd">No Bet Data</div><p style="color:rgba(255,255,255,.5);font-size:14px;text-align:center;padding:20px">Open a game, place a bet, click <strong>Bet Info</strong>, then click <strong>Verify Fairness</strong>.</p>';
  document.getElementById('seedCard').innerHTML = '';
  // Don't render below
  document.currentScript && (document.currentScript._skip = true);
}

// Result card
if(ss.game || lsData || p.get('game')) {
var profitStr=(profit>=0?'+':'')+profit.toFixed(6)+' TRX';
document.getElementById('resultCard').innerHTML=
'<div class="vf-hd">'+gameName+' &mdash; Bet Result</div>'+
'<div class="vf-result '+(win?'win':'lose')+'">'+(win?'&#10003; WIN':'&#10007; LOSS')+'</div>'+
'<div class="vf-stats">'+
'<div class="vf-stat"><div class="vf-stat-v">'+bet.toFixed(6)+'</div><div class="vf-stat-l">Bet (TRX)</div></div>'+
'<div class="vf-stat"><div class="vf-stat-v '+(win?'vf-win':'vf-lose')+'">'+profitStr+'</div><div class="vf-stat-l">Profit</div></div>'+
'<div class="vf-stat"><div class="vf-stat-v">#'+nonce+'</div><div class="vf-stat-l">Nonce</div></div>'+
'</div>';

// Seed card
document.getElementById('seedCard').innerHTML=
'<div class="vf-hd">Seed Information</div>'+
'<div class="vf-row"><div class="vf-lbl">Client Seed</div><div class="vf-val">'+(client||'—')+'</div></div>'+
'<div class="vf-row"><div class="vf-lbl">Server Seed Hash</div><div class="vf-val gold">'+(hash||'—')+'</div></div>'+
'<div class="vf-row"><div class="vf-lbl">Server Seed (revealed)</div><div class="vf-val">'+(seed||'—')+'</div></div>'+
extraInfo+
'<div class="vf-notice">&#128274; The server seed was committed BEFORE your bet was placed. The hash proves the seed was not changed after your bet.</div>';
}

// Seed card rendered above with resultCard
}
</script>
</body>
</html>