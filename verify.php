<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Verify Bet – TronSick</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;background:#0f1520;color:#e8f0eb;min-height:100vh;padding:24px}
.vf-wrap{max-width:720px;margin:0 auto}
.vf-logo{font-size:22px;font-weight:900;color:#fff;margin-bottom:8px}
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
.vf-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:0}
.vf-stat{background:rgba(0,0,0,.2);border:1px solid rgba(255,255,255,.07);border-radius:8px;padding:12px;text-align:center}
.vf-stat-v{font-family:'JetBrains Mono',monospace;font-size:16px;font-weight:900;color:#fff;margin-bottom:4px}
.vf-stat-l{font-size:10px;color:rgba(255,255,255,.3);text-transform:uppercase;letter-spacing:.4px}
.vf-tbl{width:100%;border-collapse:collapse;font-size:12px}
.vf-tbl th{padding:9px 12px;text-align:left;font-size:10px;font-weight:700;color:rgba(255,255,255,.3);text-transform:uppercase;letter-spacing:.4px;background:rgba(0,0,0,.2)}
.vf-tbl td{padding:9px 12px;border-top:1px solid rgba(255,255,255,.05);font-family:'JetBrains Mono',monospace;font-size:11px}
.vf-win{color:#22c55e;font-weight:700}
.vf-lose{color:#ef4444;font-weight:700}
.vf-empty{text-align:center;padding:40px;color:rgba(255,255,255,.3);font-size:14px}
.vf-badge{display:inline-block;padding:3px 10px;border-radius:6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px}
.vf-badge.dice{background:rgba(62,207,142,.15);color:#3ecf8e;border:1px solid rgba(62,207,142,.3)}
.vf-badge.limbo{background:rgba(100,130,255,.15);color:#6482ff;border:1px solid rgba(100,130,255,.3)}
.vf-badge.wheel{background:rgba(245,158,11,.15);color:#f59e0b;border:1px solid rgba(245,158,11,.3)}
</style>
</head>
<body>
<div class="vf-wrap">
  <div class="vf-logo">Tron<span>Sick</span> — Provably Fair</div>
  <div class="vf-sub">Verify the fairness of your bets using cryptographic seeds</div>

  <div class="vf-card" id="mainCard">
    <div class="vf-empty">Loading...</div>
  </div>

  <div class="vf-card" id="seedCard" style="display:none">
    <div class="vf-hd">Seed Information</div>
    <div class="vf-row"><div class="vf-lbl">Client Seed</div><div class="vf-val" id="vClientSeed">—</div></div>
    <div class="vf-row"><div class="vf-lbl">Server Seed Hash</div><div class="vf-val gold" id="vServerSeed">—</div></div>
    <div class="vf-row"><div class="vf-lbl">Server Seed (Revealed after rotation)</div><div class="vf-val" id="vServerSeedRaw">—</div></div>
    <div class="vf-row"><div class="vf-lbl">Nonce</div><div class="vf-val" id="vNonce">—</div></div>
  </div>

  <div class="vf-card" id="histCard" style="display:none">
    <div class="vf-hd">Bet History</div>
    <table class="vf-tbl"><thead><tr><th>#</th><th>Game</th><th>Bet</th><th>Result</th><th>Payout</th><th>Outcome</th><th>Profit</th></tr></thead>
    <tbody id="vBetBody"></tbody></table>
  </div>
</div>
<script>
var data=null;
try{data=JSON.parse(localStorage.getItem('dgVerifyData'));}catch(e){}
var mainCard=document.getElementById('mainCard');
var seedCard=document.getElementById('seedCard');
var histCard=document.getElementById('histCard');

if(!data){
  mainCard.innerHTML='<div class="vf-empty">⚠️ No verification data found.<br><br>Click <strong>VERIFY</strong> from inside a game to load data here.</div>';
}else{
  // Seeds
  seedCard.style.display='';
  document.getElementById('vClientSeed').textContent=data.clientSeed||'—';
  document.getElementById('vServerSeed').textContent=data.serverSeedHash||'—';
  document.getElementById('vServerSeedRaw').textContent=data.serverSeed||'(Not revealed until seed rotation)';
  document.getElementById('vNonce').textContent=(data.bet&&data.bet.id)||data.nonce||0;

  // Single bet view (from modal verify click)
  var bet=data.bet;
  if(bet){
    var game=data.game||'Game';
    var isWin=bet.win;
    var resultStr='';
    if(bet.roll!==undefined) resultStr='Roll: '+bet.roll.toFixed(2);
    else if(bet.result!==undefined) resultStr='Result: '+bet.result.toFixed(2)+'x';
    else if(bet.mult!==undefined) resultStr='Multiplier: '+bet.mult+'x';

    mainCard.innerHTML='<div class="vf-hd">'+game+' Bet Verification <span class="vf-badge '+game.toLowerCase()+'">'+game+'</span></div>'+
      '<div class="vf-result '+(isWin?'win':'lose')+'">'+(isWin?'✓ WIN':'✗ LOSS')+'</div>'+
      '<div class="vf-stats">'+
      '<div class="vf-stat"><div class="vf-stat-v">'+bet.bet.toFixed(6)+'</div><div class="vf-stat-l">Bet Amount</div></div>'+
      '<div class="vf-stat"><div class="vf-stat-v">'+resultStr+'</div><div class="vf-stat-l">Result</div></div>'+
      '<div class="vf-stat"><div class="vf-stat-v '+(bet.profit>=0?'vf-win':'vf-lose')+'">'+(bet.profit>=0?'+':'')+bet.profit.toFixed(6)+'</div><div class="vf-stat-l">Profit</div></div>'+
      '</div>';
  }

  // Bets history table
  var bets=data.bets||[];
  if(bets.length>0){
    histCard.style.display='';
    var tbody=document.getElementById('vBetBody');
    var html='';
    bets.forEach(function(b,i){
      var gameLabel=b.game||(b.roll!==undefined?'🎲 Dice':b.result!==undefined?'🚀 Limbo':'🎡 Wheel');
      var resultTxt=b.roll!==undefined?b.roll.toFixed(2):b.result!==undefined?b.result.toFixed(2)+'x':b.mult!==undefined?b.mult+'x':'—';
      var payoutTxt=b.payout!==undefined?b.payout.toFixed(4)+'x':b.mult!==undefined?b.mult+'x':'—';
      html+='<tr><td>'+(i+1)+'</td><td>'+gameLabel+'</td><td>'+b.bet.toFixed(6)+'</td><td>'+resultTxt+'</td><td>'+payoutTxt+'</td>';
      html+='<td class="'+(b.win?'vf-win':'vf-lose')+'">'+(b.win?'WIN':'LOSS')+'</td>';
      html+='<td class="'+(b.profit>=0?'vf-win':'vf-lose')+'">'+(b.profit>=0?'+':'')+b.profit.toFixed(6)+'</td></tr>';
    });
    tbody.innerHTML=html;
    if(!bet) mainCard.innerHTML='<div class="vf-hd">Session Summary</div><div class="vf-stats"><div class="vf-stat"><div class="vf-stat-v">'+bets.length+'</div><div class="vf-stat-l">Total Bets</div></div><div class="vf-stat"><div class="vf-stat-v">'+bets.reduce(function(s,b){return s+b.bet;},0).toFixed(6)+'</div><div class="vf-stat-l">Wagered</div></div><div class="vf-stat"><div class="vf-stat-v '+(bets.reduce(function(s,b){return s+b.profit;},0)>=0?'vf-win':'vf-lose')+'">'+((bets.reduce(function(s,b){return s+b.profit;},0)>=0?'+':'')+bets.reduce(function(s,b){return s+b.profit;},0).toFixed(6))+'</div><div class="vf-stat-l">Net Profit</div></div></div>';
  }else if(!bet){
    mainCard.innerHTML='<div class="vf-empty">Seeds loaded. Click a bet row in-game and press VERIFY to see details.</div>';
  }
}
</script>
</body>
</html>
