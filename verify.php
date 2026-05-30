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
.vf-logo{font-size:22px;font-weight:900;color:#fff;margin-bottom:4px}
.vf-logo span{color:#3ecf8e}
.vf-sub{font-size:13px;color:rgba(255,255,255,.35);margin-bottom:24px}
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
  <a class="vf-back" href="/games.php">&#8592; Back to Games</a>
  <div class="vf-logo">Tron<span>Sick</span> &mdash; Provably Fair</div>
  <div class="vf-sub">Verify the fairness of your bet using cryptographic seeds</div>

  <div class="vf-card" id="resultCard"></div>
  <div class="vf-card" id="seedCard"></div>
</div>
<script>
var p=new URLSearchParams(window.location.search);
var game=p.get('game')||'';
var win=p.get('win')==='1';
var profit=parseFloat(p.get('profit')||0);
var bet=parseFloat(p.get('bet')||0);
var seed=p.get('seed')||'';
var hash=p.get('hash')||'';
var client=p.get('client')||'';
var nonce=p.get('nonce')||'0';
var gameLabels={dice:'&#127922; Dice',limbo:'&#128640; Limbo',wheel:'&#127905; Wheel',mines:'&#128163; Mines',sicbo:'&#9861; Sic Bo',diamond:'&#9830; Diamond',tower:'&#127959; Tower'};
var gameName=gameLabels[game]||game||'Game';

// Extra params per game
var extraInfo='';
if(game==='sicbo'){var sm=parseFloat(p.get('sum')||0);extraInfo='<div class="vf-row"><div class="vf-lbl">Dice Sum</div><div class="vf-val">'+sm+'</div></div>';}
if(game==='tower'){var mode=p.get('mode')||'';extraInfo='<div class="vf-row"><div class="vf-lbl">Difficulty</div><div class="vf-val">'+mode+'</div></div>';}
if(game==='mines'){var mines=p.get('mines')||'';var picks=p.get('picks')||'';extraInfo='<div class="vf-row"><div class="vf-lbl">Mines / Picks</div><div class="vf-val">'+mines+' mines / '+picks+' picks</div></div>';}

// Use localStorage dice data if game=dice and no URL params
var lsData=null;
if(game==='dice'||game===''){try{lsData=JSON.parse(localStorage.getItem('dgVerifyData'));}catch(e){}}
if(lsData&&lsData.bet){win=lsData.bet.win;profit=lsData.bet.profit;bet=lsData.bet.bet;seed=lsData.serverSeed||seed;hash=lsData.serverSeedHash||hash;client=lsData.clientSeed||client;nonce=(lsData.bet.id||nonce);}

// Result card
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
'<div class="vf-row"><div class="vf-lbl">Client Seed</div><div class="vf-val">'+client+'</div></div>'+
'<div class="vf-row"><div class="vf-lbl">Server Seed Hash</div><div class="vf-val gold">'+hash+'</div></div>'+
'<div class="vf-row"><div class="vf-lbl">Server Seed (revealed)</div><div class="vf-val">'+seed+'</div></div>'+
extraInfo+
'<div class="vf-notice">&#128274; The server seed was committed BEFORE your bet was placed. The hash proves the seed was not changed after your bet.</div>';
</script>
</body>
</html>