// Strip any hash fragment from URL on load
if(window.location.hash)history.replaceState(null,'',window.location.pathname);

// ── LOGOUT ──
function doSiteLogout(){
  var keys=['userName','userEmail','userLoggedIn','userId','userBalance',
            'regUser','bonusRolls','newUserBonus','lastFaucet','lastBonus',
            'totalWagered','userLevel','userRef'];
  keys.forEach(function(k){ localStorage.removeItem(k); });
  window.location.href = '/index.php';
}

// â”€â”€ SIDEBAR â”€â”€
function toggleSidebar(){const sb=document.getElementById('sidebar'),ov=document.getElementById('overlay');if(sb.classList.contains('open')){sb.classList.remove('open');ov.classList.remove('show');}else{sb.classList.add('open');ov.classList.add('show');}}
function closeSidebar(){document.getElementById('sidebar').classList.remove('open');document.getElementById('overlay').classList.remove('show');}
const PAGES=['home','games','deposit','withdraw','surveys','affiliates','gifts','cashback','contest','settings','contact'];
var PAGE_TITLES={home:'Faucet',games:'Games',deposit:'Deposit',withdraw:'Withdraw',surveys:'Surveys',affiliates:'Affiliates',gifts:'Gift Cards',cashback:'Cashback',contest:'Contest',settings:'Settings',contact:'Contact'};
var PAGE_URLS={home:'/faucet.php',games:'/games.php',deposit:'/deposit.php',withdraw:'/withdraw.php',surveys:'/surveys.php',affiliates:'/affiliates.php',gifts:'/gifts.php',cashback:'/cashback.php',contest:'/contest.php',settings:'/settings.php',contact:'/contact.php'};
function _showSection(key){PAGES.forEach(k=>{const p=document.getElementById('sec-'+k);if(p)p.classList.remove('active');const n=document.getElementById('nav-'+k);if(n)n.classList.remove('active');});const p=document.getElementById('sec-'+key);if(p)p.classList.add('active');const n=document.getElementById('nav-'+key);if(n)n.classList.add('active');closeSidebar();window.scrollTo(0,0);document.title=(PAGE_TITLES[key]||key)+' – TronSick';}
function go(key,skipHistory){if(skipHistory){_showSection(key);return;}window.location.href=PAGE_URLS[key]||'/faucet.php';}

function tab(t){['Faucet','Bonus'].forEach(k=>{document.getElementById('tab'+k).classList.remove('active');document.getElementById('pane'+k).classList.remove('active');});document.getElementById('tab'+t[0].toUpperCase()+t.slice(1)).classList.add('active');document.getElementById('pane'+t[0].toUpperCase()+t.slice(1)).classList.add('active');}
// ── BALANCE HELPERS ──
function syncBal(){
try{
  var bal=parseFloat(localStorage.getItem('userBalance')||'0');
  var el=document.getElementById('userBalance');if(el)el.textContent=bal.toFixed(6);
  var wdBal=document.getElementById('wdBal');if(wdBal)wdBal.textContent=bal.toFixed(6)+' TRX';
  // Also restore wager display
  var w=parseFloat(localStorage.getItem('totalWagered')||'0');
  if(w>0){
    var LEVEL_TARGETS=[30,300,3000,30000,300000,3000000,30000000];
    var LEVEL_NAMES=['Stone','Iron','Bronze','Silver','Gold','Platinum','Diamond','Master'];
    var lvlIdx=0;
    for(var i=0;i<LEVEL_TARGETS.length;i++){if(w>=LEVEL_TARGETS[i])lvlIdx=i+1;}
    lvlIdx=Math.min(lvlIdx,7);
    var prevT=lvlIdx>0?LEVEL_TARGETS[lvlIdx-1]:0;
    var nextT=lvlIdx<LEVEL_TARGETS.length?LEVEL_TARGETS[lvlIdx]:LEVEL_TARGETS[LEVEL_TARGETS.length-1];
    var pct=lvlIdx>=LEVEL_TARGETS.length?100:Math.min(100,((w-prevT)/(nextT-prevT))*100);
    var pctStr=pct.toFixed(1)+'%';
    ['wagered','gWagered'].forEach(function(id){var e=document.getElementById(id);if(e)e.textContent=w.toFixed(6);});
    var fills=document.querySelectorAll('.prog-fill, #gProgFill');
    fills.forEach(function(e){e.style.width=pctStr;});
    var pcts=document.querySelectorAll('.prog-pct, #gProgPct');
    pcts.forEach(function(e){e.textContent=pct.toFixed(0)+'%';});
  }
}catch(e){}}
function addBal(amt){try{var bal=parseFloat(localStorage.getItem('userBalance')||'0');bal=Math.max(0,bal+amt);localStorage.setItem('userBalance',bal.toString());syncBal();}catch(e){}}
function updateWager(amt){
try{
  var LEVEL_TARGETS=[30,300,3000,30000,300000,3000000,30000000];
  var LEVEL_NAMES=['Stone','Iron','Bronze','Silver','Gold','Platinum','Diamond','Master'];
  var w=parseFloat(localStorage.getItem('totalWagered')||'0')+Math.abs(amt);
  localStorage.setItem('totalWagered',w.toString());
  // Calculate level
  var lvlIdx=0;
  for(var i=0;i<LEVEL_TARGETS.length;i++){if(w>=LEVEL_TARGETS[i])lvlIdx=i+1;}
  lvlIdx=Math.min(lvlIdx,7);
  var curLvl=LEVEL_NAMES[lvlIdx];
  var nextLvl=LEVEL_NAMES[Math.min(lvlIdx+1,7)];
  var prevT=lvlIdx>0?LEVEL_TARGETS[lvlIdx-1]:0;
  var nextT=lvlIdx<LEVEL_TARGETS.length?LEVEL_TARGETS[lvlIdx]:LEVEL_TARGETS[LEVEL_TARGETS.length-1];
  var pct=lvlIdx>=LEVEL_TARGETS.length?100:Math.min(100,((w-prevT)/(nextT-prevT))*100);
  var pctStr=pct.toFixed(1)+'%';
  // Update all wager display elements
  ['wagered','gWagered'].forEach(function(id){var el=document.getElementById(id);if(el)el.textContent=w.toFixed(6);});
  // Update progress bars
  var fills=document.querySelectorAll('.prog-fill, #gProgFill');
  fills.forEach(function(el){el.style.width=pctStr;});
  var pcts=document.querySelectorAll('.prog-pct, #gProgPct');
  pcts.forEach(function(el){el.textContent=pct.toFixed(0)+'%';});
  // Update level labels in prog-row spans
  var rows=document.querySelectorAll('.prog-row');
  rows.forEach(function(row){
    var spans=row.querySelectorAll('span');
    if(spans[0])spans[0].textContent=curLvl;
    if(spans[1])spans[1].textContent=nextLvl;
  });
  // Store level
  localStorage.setItem('userLevel',curLvl.toLowerCase());
}catch(e){}}

// ── GLOBAL BET MODAL HELPERS (replaced below in showBetModal) ──

function setWdMax(){var bal=parseFloat(localStorage.getItem('userBalance')||'0');var el=document.getElementById('wdAmt');if(el)el.value=Math.max(0,bal-0.1).toFixed(6);}
// ── END BALANCE HELPERS ──
document.addEventListener('DOMContentLoaded',()=>{
const dep=document.getElementById('depAddr');if(dep)dep.textContent='T'+Array.from({length:33},()=>'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[Math.floor(Math.random()*36)]).join('');
const aff=document.getElementById('affLink');if(aff)aff.value='https://tronsick.io/ref/'+Math.random().toString(36).substr(2,8);
try{var sb=localStorage.getItem('userBalance');if(sb&&parseFloat(sb)>0){var ubEl=document.getElementById('userBalance');if(ubEl)ubEl.textContent=parseFloat(sb).toFixed(6);}}catch(e){}
syncBal();initClaimTimer();initNewUserBonus();
// Show section based on PHP-injected variable (each page sets window._INIT_SECTION)
var _initSec=(typeof window._INIT_SECTION!=='undefined')?window._INIT_SECTION:'home';
_showSection(_initSec);
// Auto-restore of last game disabled — always show grid first
try{sessionStorage.removeItem('lastGame');}catch(e){}
});
function onCap(cb){const btn=document.getElementById('claimBtn'),note=document.getElementById('claimNote');btn.disabled=!cb.checked;note.textContent=cb.checked?'Click CLAIM to receive your TRX':'Complete captcha to claim';note.style.color=cb.checked?'#3ecf8e':'';}
function onBon(cb){const btn=document.getElementById('bonBtn'),note=document.getElementById('bonNote');if(cb.checked){rollsLeft=1;document.getElementById('rollCount').textContent=rollsLeft;btn.disabled=false;note.textContent='Click ROLL to spin!';note.style.color='#3ecf8e';}else{rollsLeft=0;btn.disabled=true;note.textContent='Complete captcha to roll';note.style.color='';}}
let claimTimerInterval=null;
function initClaimTimer(){const c=localStorage.getItem('lastClaim');if(!c)return;const rem=1800-Math.floor((Date.now()-parseInt(c))/1000);if(rem>0)startClaimCountdown(rem);else localStorage.removeItem('lastClaim');}
function startClaimCountdown(sec){const btn=document.getElementById('claimBtn'),note=document.getElementById('claimNote'),cap=document.getElementById('capChk');if(cap)cap.disabled=true;if(btn)btn.disabled=true;let left=sec;function r(){const m=String(Math.floor(left/60)).padStart(2,'0'),s=String(left%60).padStart(2,'0');if(btn)btn.textContent='Next claim in '+m+':'+s;if(note){note.textContent='Cooldown: '+m+':'+s;note.style.color='#f59e0b';}}r();if(claimTimerInterval)clearInterval(claimTimerInterval);claimTimerInterval=setInterval(()=>{left--;if(left<=0){clearInterval(claimTimerInterval);claimTimerInterval=null;localStorage.removeItem('lastClaim');if(btn){btn.textContent='CLAIM';btn.disabled=true;}if(cap){cap.disabled=false;cap.checked=false;}if(note){note.textContent='Complete captcha to claim';note.style.color='';}}else r();},1000);}
var LEVEL_PAYOUTS={stone:0.005,iron:0.01,bronze:0.02,silver:0.07,gold:0.5,platinum:5.0,diamond:15.0,master:60.0};
function doClaim(){const btn=document.getElementById('claimBtn'),note=document.getElementById('claimNote');btn.disabled=true;btn.textContent='Processing...';setTimeout(()=>{var lvl=(localStorage.getItem('userLevel')||'stone').toLowerCase();var amt=LEVEL_PAYOUTS[lvl]||0.005;addBal(amt);note.textContent='Claimed '+amt.toFixed(6)+' TRX!';note.style.color='#3ecf8e';btn.textContent='CLAIMED!';document.getElementById('capChk').checked=false;localStorage.setItem('lastClaim',Date.now().toString());setTimeout(()=>startClaimCountdown(1800),1500);},1200);}
let rollsLeft=0;
function initNewUserBonus(){if(localStorage.getItem('newUserBonus'))return;localStorage.setItem('newUserBonus','1');rollsLeft=3;const rc=document.getElementById('rollCount'),note=document.getElementById('bonNote'),btn=document.getElementById('bonBtn');if(rc)rc.textContent=rollsLeft;if(note){note.textContent='You have 3 bonus rolls!';note.style.color='#3ecf8e';}if(btn)btn.disabled=false;showToast('You received 3 FREE bonus rolls!');}
function showToast(msg){let t=document.getElementById('tfToast');if(!t){t=document.createElement('div');t.id='tfToast';t.style.cssText='position:fixed;bottom:24px;right:24px;z-index:9999;background:#1e2e24;border:1px solid #3ecf8e;color:#fff;padding:14px 22px;border-radius:10px;font-size:14px;font-weight:600;box-shadow:0 4px 20px rgba(0,0,0,.4);transition:opacity .4s;opacity:0;max-width:320px';document.body.appendChild(t);}t.textContent=msg;t.style.opacity='1';clearTimeout(t._to);t._to=setTimeout(()=>t.style.opacity='0',4000);}
function doRoll(){const btn=document.getElementById('bonBtn'),note=document.getElementById('bonNote'),chk=document.getElementById('bonChk'),rc=document.getElementById('rollCount');if(rollsLeft<=0){note.textContent='No rolls left.';return;}btn.disabled=true;btn.textContent='Rolling...';const digits=[0,1,2,3,4].map(i=>document.getElementById('rd'+i));digits.forEach(d=>d.classList.add('spin'));let ticks=0;const iv=setInterval(()=>{digits.forEach(d=>d.textContent=Math.floor(Math.random()*10));ticks++;if(ticks>=18){clearInterval(iv);const roll=Math.floor(Math.random()*10001),s=String(roll).padStart(5,'0');digits.forEach((d,i)=>{d.textContent=s[i];d.classList.remove('spin');});let p;if(roll===10000)p=1500;else if(roll>=9998)p=150;else if(roll>=9994)p=15;else if(roll>=9986)p=1.5;else if(roll>=9886)p=0.15;else p=0.005;addBal(p);rollsLeft=Math.max(0,rollsLeft-1);if(rc)rc.textContent=rollsLeft;note.textContent='Rolled '+roll+'! Won '+p.toFixed(6)+' TRX';note.style.color='#3ecf8e';btn.textContent='ROLL';if(rollsLeft>0)btn.disabled=false;else{btn.disabled=true;chk.checked=false;setTimeout(()=>{note.textContent='Complete captcha to roll';note.style.color='';},5000);}}},80);}
var betHistory=[];
var clientSeed=(Math.random().toString(36).substr(2,16)+Math.random().toString(36).substr(2,16));
var serverSeedHash='a3f8c2b1d9e4f7a6b2c8d1e5f3a9b7c4d6e2f8a1b5c3d7e9';
var serverSeed='srv_'+Math.random().toString(36).substr(2,32);
var nonce=0;
var dgDir='under';
var autoRunning=false,autoBasebet=0,autoBetsLeft=0,autoLoss=0,autoProfit=0,autoTimer=null;
var lbAutoRunning=false,lbAutoBase=0,lbAutoLoss=0,lbAutoProfit=0,lbAutoTimer=null,lbNonce=0;
var wlRotation=0,wlSpinning=false,wlMode='low',wlNonce=0,wlBetHistory=[];
var wlAutoRunning=false,wlAutoBase=0,wlAutoLoss=0,wlAutoProfit=0,wlAutoTimer=null;
var WL_SEGS={
low:[
  {m:0,c:'#1e2235'},{m:1.5,c:'#2563eb'},{m:0,c:'#1a1e30'},{m:2,c:'#059669'},
  {m:0,c:'#1e2235'},{m:1.5,c:'#2563eb'},{m:0,c:'#1a1e30'},{m:3,c:'#d97706'},
  {m:0,c:'#1e2235'},{m:1.5,c:'#2563eb'},{m:0,c:'#1a1e30'},{m:2,c:'#059669'},
  {m:0,c:'#1e2235'},{m:1.5,c:'#2563eb'},{m:0,c:'#1a1e30'}
],
medium:[
  {m:0,c:'#1a1025'},{m:3,c:'#2563eb'},{m:0,c:'#1e1530'},
  {m:0,c:'#1a1025'},{m:5,c:'#7c3aed'},{m:0,c:'#1e1530'},
  {m:3,c:'#2563eb'},{m:0,c:'#1a1025'},{m:10,c:'#d97706'},
  {m:0,c:'#1e1530'},{m:3,c:'#2563eb'},{m:0,c:'#1a1025'},
  {m:5,c:'#7c3aed'},{m:0,c:'#1e1530'},{m:0,c:'#1a1025'}
],
hard:[
  {m:0,c:'#120a1e'},{m:0,c:'#1a0f2e'},{m:10,c:'#0e7490'},
  {m:0,c:'#120a1e'},{m:0,c:'#1a0f2e'},{m:15,c:'#6d28d9'},
  {m:0,c:'#120a1e'},{m:0,c:'#1a0f2e'},{m:20,c:'#b45309'},
  {m:0,c:'#120a1e'},{m:0,c:'#1a0f2e'},{m:10,c:'#0e7490'},
  {m:0,c:'#120a1e'},{m:0,c:'#1a0f2e'},{m:15,c:'#6d28d9'}
]
};

function openGame(name, skipHistory){
go('games',true);
// CSS handles hide/show via .game-open class on #sec-games
var sec=document.getElementById('sec-games');
if(sec)sec.classList.add('game-open');
// Build game UI
var frame=document.getElementById('gameFrame');
if(!frame)return;
if(name==='dice'){frame.innerHTML=buildDiceUI();initDice();}
else if(name==='limbo'){frame.innerHTML=buildLimboUI();initLimbo();}
else if(name==='wheel'){frame.innerHTML=buildWheelUI();initWheel();}
else if(name==='mines'){frame.innerHTML=buildMinesUI();initMines();}
else if(name==='diamond'){frame.innerHTML=buildDiamondUI();initDiamond();}
else if(name==='sicbo'){frame.innerHTML=buildSicBoUI();initSicBo();}
else if(name==='tower'){frame.innerHTML=buildTowerUI();initTower();}
else{closeGame();return;}
window.scrollTo(0,0);
}
function closeGame(skipHistory){
// Remove game-open class — CSS restores grid automatically
var sec=document.getElementById('sec-games');
if(sec)sec.classList.remove('game-open');
var frame=document.getElementById('gameFrame');
if(frame)frame.innerHTML='';
try{stopAutoMode();}catch(e){}
try{sessionStorage.removeItem('lastGame');}catch(e){}
window.scrollTo(0,0);
try{if(typeof renderAllBets==='function')setTimeout(renderAllBets,50);}catch(e){}
}
// ==========================================
// DIAMOND GAME
// ==========================================
var dmNonce=0,dmBetHistory=[],dmSpinning=false;
var DM_TIERS=[{mult:40,pat:[1,1,1,1,1]},{mult:5,pat:[1,1,1,1,0]},{mult:4,pat:[1,1,1,0,1]},{mult:3,pat:[1,1,0,1,0]},{mult:2,pat:[1,1,0,0,0]},{mult:0.1,pat:[1,0,1,0,0]},{mult:0,pat:[0,0,0,0,0]}];
var DM_PROBS=[0.002,0.025,0.06,0.09,0.13,0.22,0.473];
function buildDiamondUI(){var h='<div class="dm-wrap">';h+='<div class="dm-table" id="dmTable">';DM_TIERS.forEach(function(t,i){h+='<div class="dm-row" id="dmRow'+i+'">';h+='<div class="dm-gems">';t.pat.forEach(function(lit){h+='<div class="dm-gem '+(lit?'dm-gem-lit':'dm-gem-dim')+'">&#9670;</div>';});h+='</div><div class="dm-mult-lbl">'+t.mult.toFixed(2)+'x</div></div>';});h+='</div>';h+='<div class="lb-bet-row"><div class="dg-amt-lbl"><span class="dg-dot"></span> Bet Amount</div><div class="dg-amt-row"><img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" class="dg-trx-logo" alt="TRX"><input class="dg-amt-inp" id="dmAmt" type="number" value="0.0001" step="0.000001" min="0"><button class="dg-sz-btn" onclick="dmSetAmt(\'min\')">MIN</button><button class="dg-sz-btn" onclick="dmSetAmt(\'half\')">1/2</button><button class="dg-sz-btn" onclick="dmSetAmt(\'2x\')">2x</button><button class="dg-sz-btn" onclick="dmSetAmt(\'max\')">MAX</button></div></div>';h+='<button class="dg-roll-btn" id="dmBetBtn" onclick="dmBet()">Bet</button>';h+='<div class="dg-win-row"><span class="dg-wlbl" id="dmPLLbl">Win Amount</span><div class="dg-wval"><img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" class="dg-trx-logo" alt="TRX"><span id="dmWinAmt">0.00000000</span></div></div>';h+='<div class="dg-bsec"><div class="dg-bet-tabs"><button class="dg-btab dg-btab-act">My Bets</button></div><div class="dg-bet-list" id="dmBetList"><div class="dg-no-bets">No bets yet.</div></div></div></div>';h+='<div class="bet-modal" id="dmModal" onclick="dmCloseModal()"><div class="bm-box" onclick="event.stopPropagation()"><div class="bm-hd"><div class="bm-title">&#9670; DIAMOND</div><button class="bm-close" onclick="dmCloseModal()">&#215;</button></div><div class="bm-result" id="dmBmResult"></div><div class="bm-sf-group" id="dmBmSeeds"></div><button class="bm-verify-btn" onclick="dmVerify()">VERIFY</button></div></div>';return h;}
function initDiamond(){dmBetHistory=[];try{var s=localStorage.getItem('dmHistory');if(s)dmBetHistory=JSON.parse(s)||[];}catch(e){}dmSpinning=false;dmRenderBets();}
function dmSetAmt(sz){var inp=document.getElementById('dmAmt');var bal=parseFloat(document.getElementById('userBalance').textContent)||0;var cur=parseFloat(inp.value)||0;if(sz==='min')inp.value='0.000001';else if(sz==='half')inp.value=(cur>0?cur/2:0.00005).toFixed(6);else if(sz==='2x')inp.value=(cur>0?cur*2:0.0002).toFixed(6);else if(sz==='max')inp.value=bal.toFixed(6);}
function dmRollTier(){var r=Math.random(),cum=0;for(var i=0;i<DM_PROBS.length;i++){cum+=DM_PROBS[i];if(r<cum)return i;}return DM_PROBS.length-1;}
function dmBet(){if(dmSpinning)return;var bet=parseFloat((document.getElementById('dmAmt')||{}).value)||0;var bal=parseFloat(document.getElementById('userBalance').textContent)||0;if(bet<=0){showToast('Enter bet!');return;}if(bal<bet){showToast('Insufficient balance!');return;}dmSpinning=true;var btn=document.getElementById('dmBetBtn');if(btn){btn.disabled=true;btn.textContent='Rolling...';}addBal(-bet);updateWager(bet);dmNonce++;var tier=dmRollTier();var mult=DM_TIERS[tier].mult;var win=mult>0;if(win)addBal(bet*mult);var profit=win?bet*(mult-1):-bet;document.querySelectorAll('.dm-row').forEach(function(r){r.classList.remove('dm-row-win','dm-row-lose','dm-row-active');});var count=0;var timer=setInterval(function(){count++;var flash=Math.floor(Math.random()*DM_TIERS.length);document.querySelectorAll('.dm-row').forEach(function(r){r.classList.remove('dm-row-active');});var fr=document.getElementById('dmRow'+flash);if(fr)fr.classList.add('dm-row-active');if(count>=7){clearInterval(timer);document.querySelectorAll('.dm-row').forEach(function(r){r.classList.remove('dm-row-active');});var tr=document.getElementById('dmRow'+tier);if(tr)tr.classList.add(win?'dm-row-win':'dm-row-lose');dmSpinning=false;if(btn){btn.disabled=false;btn.textContent='Bet';}var now=new Date();var ts=(now.getDate()<10?'0':'')+now.getDate()+'/'+(now.getMonth()<9?'0':'')+(now.getMonth()+1);dmBetHistory.unshift({id:dmNonce,mult:mult,bet:bet,win:win,profit:profit,ts:ts,cs:clientSeed,ssh:serverSeedHash,sv:serverSeed});try{localStorage.setItem('dmHistory',JSON.stringify(dmBetHistory.slice(0,50)));}catch(e){}dmRenderBets();var wa=document.getElementById('dmWinAmt');if(wa){wa.textContent=(profit>=0?'+':'')+profit.toFixed(6);wa.style.color=profit>=0?'#22c55e':'#ef4444';}}},120);}
function dmRenderBets(){var list=document.getElementById('dmBetList');if(!list)return;if(dmBetHistory.length===0){list.innerHTML='<div class="dg-no-bets">No bets yet.</div>';return;}var html='<table class="dg-hist-tbl"><thead><tr><th>Time</th><th>Game</th><th>Bet</th><th>Mult</th><th>Profit</th></tr></thead><tbody>';dmBetHistory.slice(0,50).forEach(function(b,i){html+='<tr class="dg-hist-row" onclick="dmShowModal('+i+')">';html+='<td class="dg-tc-time">'+b.ts+'</td><td>&#9670; Diamond</td><td>'+b.bet.toFixed(8)+'</td><td class="'+(b.win?'dg-mult-win':'dg-mult-lose')+'">'+b.mult.toFixed(2)+'x</td><td class="'+(b.profit>=0?'dg-pos':'dg-neg')+'">'+(b.profit>=0?'+':'')+b.profit.toFixed(8)+'</td></tr>';});html+='</tbody></table>';list.innerHTML=html;}
function dmShowModal(i){window._dmVerifyIdx=i;var b=dmBetHistory[i];if(!b)return;var modal=document.getElementById('dmModal');if(!modal)return;var res=document.getElementById('dmBmResult');if(res){res.textContent=(b.win?'WIN ':'LOSS ')+b.mult.toFixed(2)+'x  '+(b.profit>=0?'+':'')+b.profit.toFixed(6)+' TRX';res.className='bm-result '+(b.win?'bm-win':'bm-lose');}var seeds=document.getElementById('dmBmSeeds');if(seeds)seeds.innerHTML='<div class="bm-sf"><div class="bm-sf-lbl">Server seed</div><div class="bm-sf-row"><span class="bm-sf-ico">=</span><input class="bm-sf-inp" readonly value="'+b.sv+'"></div></div><div class="bm-sf"><div class="bm-sf-lbl">Hash</div><div class="bm-sf-row"><span class="bm-sf-ico">&lt;/&gt;</span><input class="bm-sf-inp" readonly value="'+b.ssh+'"></div></div><div class="bm-sf"><div class="bm-sf-lbl">Client</div><div class="bm-sf-row"><span class="bm-sf-ico">@</span><input class="bm-sf-inp" readonly value="'+b.cs+'"></div></div><div class="bm-sf"><div class="bm-sf-lbl">Nonce</div><div class="bm-sf-row"><span class="bm-sf-ico">#</span><input class="bm-sf-inp" readonly value="'+b.id+'"></div></div>';modal.style.display='flex';}
function dmCloseModal(){var m=document.getElementById('dmModal');if(m)m.style.display='none';}
function dmVerify(){var b=dmBetHistory[window._dmVerifyIdx||0];localStorage.setItem('dgVerifyData',JSON.stringify({game:'Diamond',clientSeed:clientSeed,serverSeedHash:serverSeedHash,serverSeed:serverSeed,nonce:dmNonce,bet:b||null,bets:dmBetHistory.slice(0,50)}));window.location.href='verify.php';}
// END DIAMOND GAME
// ==========================================
// SIC BO GAME
// ==========================================
var sbNonce=0,sbBetHistory=[],sbRolling=false,sbSelectedBet=null,sbAutoRunning=false,sbAutoTimer=null;
var sbAutoBase=0,sbAutoLoss=0,sbAutoProfit=0;
var SB_PAYOUTS={3:207,4:69,5:23,6:20.7,7:13.8,8:9.2,9:8.9,10:6.9,11:6.9,12:8.9,13:9.2,14:13.8,15:20.7,16:23,17:69,18:207};
var DICE_CHARS=['','1','2','3','4','5','6'];
function sbGetPayout(n){return SB_PAYOUTS[n]||0;}
function buildSicBoUI(){
var h='<div class="sb-wrap">';
h+='<div class="sb-display"><div class="sb-dice-row">';
for(var i=0;i<3;i++)h+='<div class="sb-die" id="sbDie'+i+'">&#x2685;</div>';
h+='</div><div class="sb-sum-badge" id="sbSum">Roll the dice!</div></div>';
h+='<div class="sb-bet-grid">';
h+='<div class="sb-bigsmall-row"><div class="sb-bet-btn sb-bigsmall-btn" id="sbBtnSmall" onclick="sbSelect(\'small\')"><div class="sb-btn-main">SMALL</div><div class="sb-btn-sub">4-10 &mdash; 1.94x</div></div><div class="sb-bet-btn sb-bigsmall-btn" id="sbBtnBig" onclick="sbSelect(\'big\')"><div class="sb-btn-main">BIG</div><div class="sb-btn-sub">11-17 &mdash; 1.94x</div></div></div>';
h+='<div class="sb-num-row">';
for(var n=3;n<=10;n++)h+='<div class="sb-bet-btn sb-num-btn" id="sbBtn'+n+'" onclick="sbSelect(\''+n+'\')"><div class="sb-btn-main">'+n+'</div><div class="sb-btn-sub">'+sbGetPayout(n)+'x</div></div>';
h+='</div><div class="sb-num-row">';
for(var n=11;n<=18;n++)h+='<div class="sb-bet-btn sb-num-btn" id="sbBtn'+n+'" onclick="sbSelect(\''+n+'\')"><div class="sb-btn-main">'+n+'</div><div class="sb-btn-sub">'+sbGetPayout(n)+'x</div></div>';
h+='</div></div>';
h+='<div class="dg-tabs" style="margin-top:12px"><button class="dg-tab dg-tab-act" id="sbTManual" onclick="sbTabMode(\'man\')">Manual</button><button class="dg-tab" id="sbTAuto" onclick="sbTabMode(\'auto\')">Auto</button></div>';
h+='<div id="sbManSec"><button class="dg-roll-btn" id="sbRollBtn" onclick="sbRoll()">Roll Dice</button></div>';
h+='<div id="sbAutoSec" style="display:none"><div class="dg-auto-cols"><div class="dg-auto-col"><div class="dg-auto-hd">On Win</div><div class="dg-aprow"><span>Change By</span><div class="dg-apinp"><input id="sbWinPct" type="number" value="0"><span>%</span></div></div><label class="dg-arl"><input type="radio" name="sbWin" value="reset" checked> Reset to Base</label><label class="dg-arl"><input type="radio" name="sbWin" value="stop"> Stop Betting</label></div><div class="dg-auto-col"><div class="dg-auto-hd">On Lose</div><div class="dg-aprow"><span>Change By</span><div class="dg-apinp"><input id="sbLosePct" type="number" value="100"><span>%</span></div></div><label class="dg-arl"><input type="radio" name="sbLose" value="reset" checked> Reset to Base</label><label class="dg-arl"><input type="radio" name="sbLose" value="stop"> Stop Betting</label></div></div><div class="dg-alims"><div class="dg-alim"><div class="dg-slbl">Stop on Loss</div><input class="dg-lim-inp" id="sbStopLoss" type="number" value="0" min="0" step="0.000001" placeholder="0=off"></div><div class="dg-alim"><div class="dg-slbl">Stop on Win</div><input class="dg-lim-inp" id="sbStopWin" type="number" value="0" min="0" step="0.000001" placeholder="0=off"></div><div class="dg-alim"><div class="dg-slbl">Bet Count</div><div class="dg-lim-inp dg-bc" id="sbBetCount">0</div></div></div><button class="dg-roll-btn" id="sbAutoBtn" onclick="sbToggleAuto()">Start Auto</button></div>';
h+='<div class="lb-bet-row"><div class="dg-amt-lbl"><span class="dg-dot"></span> Bet Amount</div><div class="dg-amt-row"><img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" class="dg-trx-logo" alt="TRX"><input class="dg-amt-inp" id="sbAmt" type="number" value="0.0001" step="0.000001" min="0"><button class="dg-sz-btn" onclick="sbSetAmt(\'min\')">MIN</button><button class="dg-sz-btn" onclick="sbSetAmt(\'half\')">1/2</button><button class="dg-sz-btn" onclick="sbSetAmt(\'2x\')">2x</button><button class="dg-sz-btn" onclick="sbSetAmt(\'max\')">MAX</button></div></div>';
h+='<div class="dg-win-row"><span class="dg-wlbl" id="sbPLLbl">Win Amount</span><div class="dg-wval"><img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" class="dg-trx-logo" alt="TRX"><span id="sbWinAmt">0.00000000</span></div></div>';
h+='<div class="dg-bsec"><div class="dg-bet-tabs"><button class="dg-btab dg-btab-act">My Bets</button></div><div class="dg-bet-list" id="sbBetList"><div class="dg-no-bets">No bets yet.</div></div></div>';
h+='</div>';
return h;
}
function initSicBo(){sbBetHistory=[];try{var s=localStorage.getItem('sbHistory');if(s)sbBetHistory=JSON.parse(s)||[];}catch(e){}sbRolling=false;sbSelectedBet=null;sbRenderBets();}
function sbSelect(key){sbSelectedBet=key;document.querySelectorAll('.sb-bet-btn').forEach(function(b){b.classList.remove('sb-selected');});var el=document.getElementById('sbBtn'+key)||document.getElementById('sbBtn'+key.charAt(0).toUpperCase()+key.slice(1));if(!el&&key==='small')el=document.getElementById('sbBtnSmall');if(!el&&key==='big')el=document.getElementById('sbBtnBig');if(el)el.classList.add('sb-selected');}
function sbSetAmt(sz){var inp=document.getElementById('sbAmt');var bal=parseFloat(document.getElementById('userBalance').textContent)||0;var cur=parseFloat(inp.value)||0;if(sz==='min')inp.value='0.000001';else if(sz==='half')inp.value=(cur>0?cur/2:0.00005).toFixed(6);else if(sz==='2x')inp.value=(cur>0?cur*2:0.0002).toFixed(6);else if(sz==='max')inp.value=bal.toFixed(6);}
function sbTabMode(m){var isA=m==='auto';document.getElementById('sbTManual').classList.toggle('dg-tab-act',!isA);document.getElementById('sbTAuto').classList.toggle('dg-tab-act',isA);document.getElementById('sbManSec').style.display=isA?'none':'';document.getElementById('sbAutoSec').style.display=isA?'':'none';}
function sbCheckWin(dice,bet){var sum=dice[0]+dice[1]+dice[2];var isTriple=dice[0]===dice[1]&&dice[1]===dice[2];if(bet==='small')return sum>=4&&sum<=10&&!isTriple;if(bet==='big')return sum>=11&&sum<=17&&!isTriple;return sum===parseInt(bet);}
function sbGetBetPayout(bet){if(bet==='small'||bet==='big')return 1.94;return SB_PAYOUTS[parseInt(bet)]||0;}
function sbAnimateDice(final,cb){var count=0,dur=22;var t=setInterval(function(){count++;for(var i=0;i<3;i++){var v=Math.floor(Math.random()*6)+1;var el=document.getElementById('sbDie'+i);if(el)el.textContent=DICE_CHARS[v];}if(count>=dur){clearInterval(t);for(var i=0;i<3;i++){var el=document.getElementById('sbDie'+i);if(el)el.textContent=DICE_CHARS[final[i]];}cb();}},55);}
function sbDoRoll(bet,betAmt,cb){if(sbRolling)return;if(!bet){showToast('Select a bet!');if(cb)cb(null);return;}var bal=parseFloat(document.getElementById('userBalance').textContent)||0;if(betAmt<=0){showToast('Enter bet!');if(cb)cb(null);return;}if(bal<betAmt){showToast('Insufficient balance!');if(cb)cb(null);return;}sbRolling=true;addBal(-betAmt);updateWager(betAmt);sbNonce++;var dice=[Math.floor(Math.random()*6)+1,Math.floor(Math.random()*6)+1,Math.floor(Math.random()*6)+1];var sum=dice[0]+dice[1]+dice[2];var win=sbCheckWin(dice,bet);var payout=sbGetBetPayout(bet);if(win)addBal(betAmt*payout);var profit=win?betAmt*(payout-1):-betAmt;sbAnimateDice(dice,function(){sbRolling=false;
// Clear all highlights
document.querySelectorAll('.sb-bet-btn').forEach(function(b){b.classList.remove('sb-result-win','sb-result-lose');});
if(win){
  // WIN: highlight the selected box green
  var wb=document.getElementById('sbBtn'+bet)||document.getElementById('sbBtn'+bet.charAt(0).toUpperCase()+bet.slice(1));
  if(!wb&&bet==='small')wb=document.getElementById('sbBtnSmall');
  if(!wb&&bet==='big')wb=document.getElementById('sbBtnBig');
  if(wb)wb.classList.add('sb-result-win');
}else{
  // LOSE: pick a random DIFFERENT box for the indicator
  var allKeys=['small','big','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18'];
  var others=allKeys.filter(function(k){return k!==String(bet);});
  var rndKey=others[Math.floor(Math.random()*others.length)];
  var lb=document.getElementById('sbBtn'+rndKey)||document.getElementById('sbBtn'+rndKey.charAt(0).toUpperCase()+rndKey.slice(1));
  if(!lb&&rndKey==='small')lb=document.getElementById('sbBtnSmall');
  if(!lb&&rndKey==='big')lb=document.getElementById('sbBtnBig');
  if(lb)lb.classList.add('sb-result-lose');
}
var now=new Date();var ts=(now.getDate()<10?'0':'')+now.getDate()+'/'+(now.getMonth()<9?'0':'')+(now.getMonth()+1);sbBetHistory.unshift({id:sbNonce,bet:bet,dice:dice,sum:sum,payout:payout,betAmt:betAmt,win:win,profit:profit,ts:ts,cs:clientSeed,ssh:serverSeedHash,sv:serverSeed});try{localStorage.setItem('sbHistory',JSON.stringify(sbBetHistory.slice(0,50)));}catch(e){}sbRenderBets();if(cb)cb(win,profit,betAmt);});}
function sbRoll(){var bet=sbSelectedBet;var betAmt=parseFloat((document.getElementById('sbAmt')||{}).value)||0;var btn=document.getElementById('sbRollBtn');if(btn)btn.disabled=true;sbDoRoll(bet,betAmt,function(win,profit,ba){if(btn){btn.disabled=false;}if(win!==null){var wa=document.getElementById('sbWinAmt');if(wa){wa.textContent=(profit>=0?'+':'')+profit.toFixed(6);wa.style.color=profit>=0?'#22c55e':'#ef4444';}}});}
function sbToggleAuto(){if(sbAutoRunning)sbStopAuto();else sbStartAuto();}
function sbStartAuto(){if(!sbSelectedBet){showToast('Select a bet!');return;}var bet=parseFloat((document.getElementById('sbAmt')||{}).value)||0;var bal=parseFloat(document.getElementById('userBalance').textContent)||0;if(bet<=0){showToast('Enter bet!');return;}if(bal<bet){showToast('Insufficient balance!');return;}sbAutoBase=bet;sbAutoLoss=0;sbAutoProfit=0;sbAutoRunning=true;var btn=document.getElementById('sbAutoBtn');if(btn){btn.textContent='Stop Auto';btn.style.background='#ef4444';}sbAutoTimer=setTimeout(sbAutoStep,300);}
function sbStopAuto(){sbAutoRunning=false;if(sbAutoTimer){clearTimeout(sbAutoTimer);sbAutoTimer=null;}var btn=document.getElementById('sbAutoBtn');if(btn){btn.textContent='Start Auto';btn.style.background='';}var pl=document.getElementById('sbPLLbl');if(pl)pl.textContent='Win Amount';var wa=document.getElementById('sbWinAmt');if(wa)wa.style.color='';}
function sbAutoStep(){if(!sbAutoRunning||sbRolling)return;var bal=parseFloat(document.getElementById('userBalance').textContent)||0;var bet=parseFloat((document.getElementById('sbAmt')||{}).value)||sbAutoBase;if(bet<=0||bal<bet){showToast('Insufficient balance!');sbStopAuto();return;}var sl=parseFloat((document.getElementById('sbStopLoss')||{}).value)||0;var sw=parseFloat((document.getElementById('sbStopWin')||{}).value)||0;if(sl>0&&sbAutoLoss>=sl){showToast('Stopped: Loss limit!');sbStopAuto();return;}if(sw>0&&sbAutoProfit>=sw){showToast('Stopped: Win target!');sbStopAuto();return;}var winOpt=(document.querySelector('input[name="sbWin"]:checked')||{}).value||'reset';var loseOpt=(document.querySelector('input[name="sbLose"]:checked')||{}).value||'reset';var winPct=parseFloat((document.getElementById('sbWinPct')||{}).value)||0;var losePct=parseFloat((document.getElementById('sbLosePct')||{}).value)||0;var inp=document.getElementById('sbAmt');sbDoRoll(sbSelectedBet,bet,function(win,profit,ba){if(win===null)return;if(win){sbAutoProfit+=profit;if(winOpt==='stop'){sbStopAuto();return;}if(inp)inp.value=winPct>0?(ba*(1+winPct/100)).toFixed(6):sbAutoBase.toFixed(6);}else{sbAutoLoss+=Math.abs(profit);if(loseOpt==='stop'){sbStopAuto();return;}if(inp)inp.value=losePct>0?(ba*(1+losePct/100)).toFixed(6):sbAutoBase.toFixed(6);}var bc=document.getElementById('sbBetCount');if(bc)bc.textContent=sbNonce;var netPL=sbAutoProfit-sbAutoLoss;var plEl=document.getElementById('sbWinAmt');var plLbl=document.getElementById('sbPLLbl');if(plEl){plEl.textContent=(netPL>=0?'+':'')+netPL.toFixed(6);plEl.style.color=netPL>=0?'#22c55e':'#ef4444';}if(plLbl)plLbl.textContent='Live P&L';if(sbAutoRunning)sbAutoTimer=setTimeout(sbAutoStep,200);});}
function sbRenderBets(){var list=document.getElementById('sbBetList');if(!list)return;if(sbBetHistory.length===0){list.innerHTML='<div class="dg-no-bets">No bets yet.</div>';return;}var html='<table class="dg-hist-tbl"><thead><tr><th>Time</th><th>Game</th><th>Bet</th><th>Result</th><th>Profit</th></tr></thead><tbody>';sbBetHistory.slice(0,50).forEach(function(b){html+='<tr class="dg-hist-row" onclick="showSbBetModal('+sbBetHistory.indexOf(b)+')">'; html+='<td class="dg-tc-time">'+b.ts+'</td><td>&#127922; Sic Bo</td><td>'+b.betAmt.toFixed(8)+'</td>';html+='<td class="'+(b.win?'dg-mult-win':'dg-mult-lose')+'">'+( b.win?b.payout+'x':'LOSE')+'</td>';html+='<td class="'+(b.profit>=0?'dg-pos':'dg-neg')+'">'+( b.profit>=0?'+':'')+b.profit.toFixed(8)+'</td></tr>';});html+='</tbody></table>';list.innerHTML=html;}
// END SIC BO GAME


// ==========================================
// MINES GAME
// ==========================================
var mnNonce=0,mnBetHistory=[],mnActive=false,mnGrid=[],mnMines=3,mnPickCount=0,mnBet=0;
var mnAutoRunning=false,mnAutoTimer=null;
function buildMinesUI(){var h='<div class="mn-wrap">';h+='<div class="mn-display"><div class="mn-top-bar"><div class="mn-info"><span class="mn-mult-badge" id="mnMult">1.00x</span><span class="mn-pick-cnt" id="mnPickCnt">Picks: 0</span></div><button class="mn-cashout-btn" id="mnCashOut" onclick="mnCashOut()" disabled>Cash Out &mdash; <span id="mnCashOutAmt">0.000000</span></button></div><div class="mn-grid" id="mnGrid">';for(var i=0;i<25;i++)h+='<div class="mn-cell mn-hidden" id="mnCell'+i+'" onclick="mnReveal('+i+')"></div>';h+='</div></div>';h+='<div class="mn-mines-sel"><span class="mn-sel-lbl">Mines (1-24)</span><input class="mn-mine-input" id="mnMinesInput" type="number" min="1" max="24" value="3" onchange="mnSetMines(parseInt(this.value)||3)"></div>';h+='<div class="dg-tabs" style="margin-top:10px"><button class="dg-tab dg-tab-act" id="mnTManual" onclick="mnTabMode(\'man\')">Manual</button><button class="dg-tab" id="mnTAuto" onclick="mnTabMode(\'auto\')">Auto</button></div>';h+='<div id="mnManSec"><button class="dg-roll-btn" id="mnBetBtn" onclick="mnBetStart()">Place Bet</button></div>';h+='<div id="mnAutoSec" style="display:none"><div class="mn-auto-row"><span class="dg-slbl">Picks per Round</span><input class="dg-lim-inp" id="mnAutoPicksInp" type="number" value="3" min="1" max="23" step="1" style="max-width:80px;margin-left:10px"></div><button class="dg-roll-btn" id="mnAutoBtn" onclick="mnToggleAuto()">Start Auto</button></div>';h+='<div class="lb-bet-row"><div class="dg-amt-lbl"><span class="dg-dot"></span> Bet Amount</div><div class="dg-amt-row"><img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" class="dg-trx-logo" alt="TRX"><input class="dg-amt-inp" id="mnAmt" type="number" value="0.0001" step="0.000001" min="0"><button class="dg-sz-btn" onclick="mnSetAmt(\'min\')">MIN</button><button class="dg-sz-btn" onclick="mnSetAmt(\'half\')">1/2</button><button class="dg-sz-btn" onclick="mnSetAmt(\'2x\')">2x</button><button class="dg-sz-btn" onclick="mnSetAmt(\'max\')">MAX</button></div></div>';h+='<div class="dg-win-row"><span class="dg-wlbl" id="mnPLLbl">Win Amount</span><div class="dg-wval"><img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" class="dg-trx-logo" alt="TRX"><span id="mnWinAmt">0.00000000</span></div></div>';h+='<div class="dg-bsec"><div class="dg-bet-tabs"><button class="dg-btab dg-btab-act">My Bets</button></div><div class="dg-bet-list" id="mnBetList"><div class="dg-no-bets">No bets yet.</div></div></div></div>';return h;}
function initMines(){mnBetHistory=[];try{var s=localStorage.getItem('mnHistory');if(s)mnBetHistory=JSON.parse(s)||[];}catch(e){}mnActive=false;mnGrid=[];for(var i=0;i<25;i++)mnGrid.push({mine:false,revealed:false});mnMines=3;mnRefreshGrid();mnRenderBets();}
function mnSetAmt(sz){var inp=document.getElementById('mnAmt');var bal=parseFloat(document.getElementById('userBalance').textContent)||0;var cur=parseFloat(inp.value)||0;if(sz==='min')inp.value='0.000001';else if(sz==='half')inp.value=(cur>0?cur/2:0.00005).toFixed(6);else if(sz==='2x')inp.value=(cur>0?cur*2:0.0002).toFixed(6);else if(sz==='max')inp.value=bal.toFixed(6);}
function mnTabMode(m){var isA=m==='auto';document.getElementById('mnTManual').classList.toggle('dg-tab-act',!isA);document.getElementById('mnTAuto').classList.toggle('dg-tab-act',isA);document.getElementById('mnManSec').style.display=isA?'none':'';document.getElementById('mnAutoSec').style.display=isA?'':'none';}
function mnSetMines(n){if(mnActive)return;mnMines=Math.min(24,Math.max(1,parseInt(n)||3));var inp=document.getElementById('mnMinesInput');if(inp)inp.value=mnMines;}
function mnCalcMult(picks,mines){var N=25,p=1;for(var i=0;i<picks;i++)p*=(N-mines-i)/(N-i);return Math.max(1.00,parseFloat((1/p*0.97).toFixed(4)));}
function mnRefreshGrid(){for(var i=0;i<25;i++){var cell=document.getElementById('mnCell'+i);if(!cell)continue;var g=mnGrid[i];if(g.revealed){if(g.mine){cell.className='mn-cell mn-mine';cell.textContent='💣';}else{cell.className='mn-cell mn-safe';cell.textContent='💎';}}else{cell.className='mn-cell mn-hidden';cell.textContent='';}}}
function mnBetStart(){if(mnActive)return;var bet=parseFloat((document.getElementById('mnAmt')||{}).value)||0;var bal=parseFloat(document.getElementById('userBalance').textContent)||0;if(bet<=0){showToast('Enter bet!');return;}if(bal<bet){showToast('Insufficient balance!');return;}mnBet=bet;addBal(-bet);updateWager(bet);mnNonce++;mnActive=true;mnGrid=[];for(var i=0;i<25;i++)mnGrid.push({mine:false,revealed:false});var pos=[];for(var j=0;j<25;j++)pos.push(j);pos.sort(function(){return Math.random()-0.5;});for(var k=0;k<mnMines;k++)mnGrid[pos[k]].mine=true;mnPickCount=0;mnRefreshGrid();var btn=document.getElementById('mnBetBtn');if(btn){btn.disabled=true;btn.textContent='Pick a cell!';}var co=document.getElementById('mnCashOut');if(co)co.disabled=false;var mu=document.getElementById('mnMult');if(mu)mu.textContent='1.00x';var pc=document.getElementById('mnPickCnt');if(pc)pc.textContent='Picks: 0';}
function mnReveal(idx){if(!mnActive)return;var g=mnGrid[idx];if(g.revealed)return;g.revealed=true;var cell=document.getElementById('mnCell'+idx);if(g.mine){cell.className='mn-cell mn-mine';cell.textContent='💣';mnActive=false;mnGrid.forEach(function(c,i){if(c.mine)c.revealed=true;});mnRefreshGrid();var now=new Date();var ts=(now.getDate()<10?'0':'')+now.getDate()+'/'+(now.getMonth()<9?'0':'')+(now.getMonth()+1);mnBetHistory.unshift({id:mnNonce,mines:mnMines,picks:mnPickCount,bet:mnBet,win:false,mult:0,profit:-mnBet,ts:ts,cs:clientSeed,ssh:serverSeedHash,sv:serverSeed});try{localStorage.setItem('mnHistory',JSON.stringify(mnBetHistory.slice(0,50)));}catch(e){}mnRenderBets();showToast('BOOM! Mine hit!');var wa=document.getElementById('mnWinAmt');if(wa){wa.textContent='-'+mnBet.toFixed(6);wa.style.color='#ef4444';}var co=document.getElementById('mnCashOut');if(co)co.disabled=true;var btn=document.getElementById('mnBetBtn');if(btn){btn.disabled=false;btn.textContent='Place Bet';}setTimeout(function(){mnGrid.forEach(function(c){c.revealed=false;c.mine=false;});mnRefreshGrid();if(mnAutoRunning)mnAutoNext();},1400);}else{cell.className='mn-cell mn-safe';cell.textContent='💎';mnPickCount++;var mult=mnCalcMult(mnPickCount,mnMines);var mu=document.getElementById('mnMult');if(mu)mu.textContent=mult.toFixed(2)+'x';var pc=document.getElementById('mnPickCnt');if(pc)pc.textContent='Picks: '+mnPickCount;var ca=document.getElementById('mnCashOutAmt');if(ca)ca.textContent=(mnBet*mult).toFixed(6);var safeLeft=mnGrid.filter(function(c){return !c.mine&&!c.revealed;}).length;if(safeLeft===0)mnCashOut();}}
function mnCashOut(){if(!mnActive)return;mnActive=false;var mult=mnCalcMult(mnPickCount,mnMines);var won=mnBet*mult;addBal(won);var profit=won-mnBet;var now=new Date();var ts=(now.getDate()<10?'0':'')+now.getDate()+'/'+(now.getMonth()<9?'0':'')+(now.getMonth()+1);mnBetHistory.unshift({id:mnNonce,mines:mnMines,picks:mnPickCount,bet:mnBet,win:true,mult:mult,profit:profit,ts:ts,cs:clientSeed,ssh:serverSeedHash,sv:serverSeed});try{localStorage.setItem('mnHistory',JSON.stringify(mnBetHistory.slice(0,50)));}catch(e){}mnRenderBets();showToast('Cashed out! +'+profit.toFixed(6)+' TRX');var wa=document.getElementById('mnWinAmt');if(wa){wa.textContent='+'+profit.toFixed(6);wa.style.color='#22c55e';}var co=document.getElementById('mnCashOut');if(co)co.disabled=true;var btn=document.getElementById('mnBetBtn');if(btn){btn.disabled=false;btn.textContent='Place Bet';}setTimeout(function(){mnGrid.forEach(function(c){c.revealed=false;c.mine=false;});mnRefreshGrid();if(mnAutoRunning)mnAutoNext();},600);}
function mnToggleAuto(){if(mnAutoRunning)mnStopAuto();else mnStartAuto();}
function mnStartAuto(){var bet=parseFloat((document.getElementById('mnAmt')||{}).value)||0;var bal=parseFloat(document.getElementById('userBalance').textContent)||0;if(bet<=0){showToast('Enter bet!');return;}if(bal<bet){showToast('Insufficient balance!');return;}mnAutoRunning=true;var btn=document.getElementById('mnAutoBtn');if(btn){btn.textContent='Stop Auto';btn.style.background='#ef4444';}mnAutoNext();}
function mnStopAuto(){mnAutoRunning=false;if(mnAutoTimer){clearTimeout(mnAutoTimer);mnAutoTimer=null;}var btn=document.getElementById('mnAutoBtn');if(btn){btn.textContent='Start Auto';btn.style.background='';}}
function mnAutoNext(){if(!mnAutoRunning)return;var bal=parseFloat(document.getElementById('userBalance').textContent)||0;var bet=parseFloat((document.getElementById('mnAmt')||{}).value)||0;if(bal<bet){showToast('Insufficient balance!');mnStopAuto();return;}mnAutoTimer=setTimeout(function(){mnBetStart();var picks=parseInt((document.getElementById('mnAutoPicksInp')||{}).value)||3;mnAutoTimer=setTimeout(function(){mnAutoPickN(picks,0);},400);},500);}
function mnAutoPickN(target,done){if(!mnAutoRunning||!mnActive)return;if(done>=target){mnCashOut();return;}var avail=[];mnGrid.forEach(function(c,i){if(!c.revealed)avail.push(i);});if(!avail.length){mnCashOut();return;}mnReveal(avail[Math.floor(Math.random()*avail.length)]);if(mnActive)mnAutoTimer=setTimeout(function(){mnAutoPickN(target,done+1);},400);}
function mnRenderBets(){var list=document.getElementById('mnBetList');if(!list)return;if(mnBetHistory.length===0){list.innerHTML='<div class="dg-no-bets">No bets yet.</div>';return;}var html='<table class="dg-hist-tbl"><thead><tr><th>Time</th><th>Mines</th><th>Picks</th><th>Bet</th><th>Mult</th><th>Profit</th></tr></thead><tbody>';mnBetHistory.slice(0,50).forEach(function(b,i){html+='<tr class="dg-hist-row" style="cursor:pointer" onclick="showMnBetModal('+i+')">'+'<td class="dg-tc-time">'+b.ts+'</td><td>'+b.mines+'</td><td>'+b.picks+'</td><td>'+b.bet.toFixed(8)+'</td><td class="'+(b.win?'dg-mult-win':'dg-mult-lose')+'">'+(b.win?b.mult.toFixed(2)+'x':'BOOM')+'</td><td class="'+(b.profit>=0?'dg-pos':'dg-neg')+'">'+(b.profit>=0?'+':'')+b.profit.toFixed(8)+'</td></tr>';});html+='</tbody></table>';list.innerHTML=html;}
// END MINES GAME

// ==========================================
// WHEEL GAME
// ==========================================
function buildWheelUI(){
var h='';
h+='<div class="wl-wrap">';
h+='<div class="wl-modes"><button class="wl-mode-btn wl-mode-act" id="wlBtnLow" onclick="wlSetMode(\'low\')">LOW</button><button class="wl-mode-btn" id="wlBtnMedium" onclick="wlSetMode(\'medium\')">MEDIUM</button><button class="wl-mode-btn" id="wlBtnHard" onclick="wlSetMode(\'hard\')">HARD</button></div>';
h+='<div class="wl-display"><div class="wl-pointer-wrap"><div class="wl-pointer">&#9660;</div></div><canvas id="wlCanvas" width="380" height="380"></canvas><div class="wl-result-badge" id="wlResult"></div></div>';
h+='<div class="wl-legend" id="wlLegend"></div>';
h+='<div class="dg-tabs" style="margin-top:12px"><button class="dg-tab dg-tab-act" id="wlTManual" onclick="wlTabMode(\'man\')">Manual</button><button class="dg-tab" id="wlTAuto" onclick="wlTabMode(\'auto\')">Auto</button></div>';
h+='<div id="wlManSec"><div class="lb-bet-row"><div class="dg-amt-lbl"><span class="dg-dot"></span> Bet Amount</div><div class="dg-amt-row"><img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" class="dg-trx-logo" alt="TRX"><input class="dg-amt-inp" id="wlAmt" type="number" value="0.0001" step="0.000001" min="0"><button class="dg-sz-btn" onclick="wlSetAmt(\'min\')">MIN</button><button class="dg-sz-btn" onclick="wlSetAmt(\'half\')">1/2</button><button class="dg-sz-btn" onclick="wlSetAmt(\'2x\')">2x</button><button class="dg-sz-btn" onclick="wlSetAmt(\'max\')">MAX</button></div></div><button class="dg-roll-btn" id="wlSpinBtn" onclick="wlSpin()">Spin</button></div>';
h+='<div id="wlAutoSec" style="display:none"><div class="dg-auto-cols"><div class="dg-auto-col"><div class="dg-auto-hd">On Win</div><div class="dg-aprow"><span>Change By</span><div class="dg-apinp"><input id="wlWinPct" type="number" value="0"><span>%</span></div></div><label class="dg-arl"><input type="radio" name="wlWin" value="reset" checked> Reset to Base</label><label class="dg-arl"><input type="radio" name="wlWin" value="stop"> Stop Betting</label></div><div class="dg-auto-col"><div class="dg-auto-hd">On Lose</div><div class="dg-aprow"><span>Change By</span><div class="dg-apinp"><input id="wlLosePct" type="number" value="100"><span>%</span></div></div><label class="dg-arl"><input type="radio" name="wlLose" value="reset" checked> Reset to Base</label><label class="dg-arl"><input type="radio" name="wlLose" value="stop"> Stop Betting</label></div></div><div class="dg-alims"><div class="dg-alim"><div class="dg-slbl">Stop on Loss</div><input class="dg-lim-inp" id="wlStopLoss" type="number" value="0" min="0" step="0.000001" placeholder="0=off"></div><div class="dg-alim"><div class="dg-slbl">Stop on Win</div><input class="dg-lim-inp" id="wlStopWin" type="number" value="0" min="0" step="0.000001" placeholder="0=off"></div><div class="dg-alim"><div class="dg-slbl">Bet Count</div><div class="dg-lim-inp dg-bc" id="wlBetCount">0</div></div></div><div class="lb-bet-row"><div class="dg-amt-lbl"><span class="dg-dot"></span> Bet Amount</div><div class="dg-amt-row"><img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" class="dg-trx-logo" alt="TRX"><input class="dg-amt-inp" id="wlAmtA" type="number" value="0.0001" step="0.000001" min="0"></div></div><button class="dg-roll-btn" id="wlAutoBtn" onclick="wlToggleAuto()">Start Auto</button></div>';
h+='<div class="dg-win-row"><span class="dg-wlbl" id="wlPLLbl">Win Amount</span><div class="dg-wval"><img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" class="dg-trx-logo" alt="TRX"><span id="wlWinAmt">0.00000000</span></div></div>';
h+='<div class="dg-bsec"><div class="dg-bet-tabs"><button class="dg-btab dg-btab-act">My Bets</button></div><div class="dg-bet-list" id="wlBetList"><div class="dg-no-bets">No bets yet.</div></div></div>';
h+='</div>';
h+='<div class="bet-modal" id="wlModal" onclick="wlCloseModal()"><div class="bm-box" onclick="event.stopPropagation()"><div class="bm-hd"><div class="bm-title">&#127905; WHEEL</div><button class="bm-close" onclick="wlCloseModal()">&#215;</button></div><div class="bm-result" id="wlBmResult"></div><div class="bm-sf-group" id="wlBmSeeds"></div><button class="bm-verify-btn" onclick="wlVerify()">VERIFY</button></div></div>';
return h;
}
function initWheel(){wlBetHistory=[];try{var s=localStorage.getItem('wheelHistory');if(s)wlBetHistory=JSON.parse(s)||[];}catch(e){}wlRotation=0;wlSpinning=false;wlDrawWheel();wlUpdateLegend();wlRenderBets();}
function wlSetMode(m){wlMode=m;['low','medium','hard'].forEach(function(k){var b=document.getElementById('wlBtn'+k.charAt(0).toUpperCase()+k.slice(1));if(b)b.classList.toggle('wl-mode-act',k===m);});wlRotation=0;wlDrawWheel();wlUpdateLegend();}
function wlTabMode(m){var isA=m==='auto';document.getElementById('wlTManual').classList.toggle('dg-tab-act',!isA);document.getElementById('wlTAuto').classList.toggle('dg-tab-act',isA);document.getElementById('wlManSec').style.display=isA?'none':'';document.getElementById('wlAutoSec').style.display=isA?'':'none';}
function wlSetAmt(sz){var inp=document.getElementById('wlAmt');var bal=parseFloat(document.getElementById('userBalance').textContent)||0;var cur=parseFloat(inp.value)||0;if(sz==='min')inp.value='0.000001';else if(sz==='half')inp.value=(cur>0?cur/2:0.00005).toFixed(6);else if(sz==='2x')inp.value=(cur>0?cur*2:0.0002).toFixed(6);else if(sz==='max')inp.value=bal.toFixed(6);}
function wlDrawWheel(){var canvas=document.getElementById('wlCanvas');if(!canvas)return;var ctx=canvas.getContext('2d');var segs=WL_SEGS[wlMode];var n=segs.length;var sa2=2*Math.PI/n;var cx=canvas.width/2,cy=canvas.height/2,r=Math.min(cx,cy)-10;ctx.clearRect(0,0,canvas.width,canvas.height);// outer glow
ctx.beginPath();ctx.arc(cx,cy,r+5,0,2*Math.PI);ctx.strokeStyle='rgba(100,120,220,0.3)';ctx.lineWidth=8;ctx.stroke();for(var i=0;i<n;i++){var sa=wlRotation-Math.PI/2+i*sa2,ea=sa+sa2;ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,sa,ea);ctx.closePath();ctx.fillStyle=segs[i].c;ctx.fill();ctx.strokeStyle='#0a0e1a';ctx.lineWidth=2;ctx.stroke();// text - horizontal, readable
var mid=sa+sa2/2,tx=cx+Math.cos(mid)*r*0.65,ty=cy+Math.sin(mid)*r*0.65;ctx.save();ctx.translate(tx,ty);ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='bold 11px JetBrains Mono,monospace';ctx.fillStyle=segs[i].m>0?'#fff':'rgba(255,255,255,0.25)';// shadow for readability
ctx.shadowColor='rgba(0,0,0,0.8)';ctx.shadowBlur=3;ctx.fillText(segs[i].m>0?segs[i].m+'x':'0x',0,0);ctx.shadowBlur=0;ctx.restore();}// outer ring border
ctx.beginPath();ctx.arc(cx,cy,r,0,2*Math.PI);ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.lineWidth=1;ctx.stroke();// center cap
ctx.beginPath();ctx.arc(cx,cy,24,0,2*Math.PI);ctx.fillStyle='#0d1117';ctx.fill();ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=1;ctx.stroke();ctx.beginPath();ctx.arc(cx,cy,8,0,2*Math.PI);ctx.fillStyle='rgba(100,120,220,0.7)';ctx.fill();}
function wlUpdateLegend(){var segs=WL_SEGS[wlMode];var uniq={};segs.forEach(function(s){if(!uniq[s.m])uniq[s.m]={c:s.c,count:0};uniq[s.m].count++;});var lg=document.getElementById('wlLegend');if(!lg)return;var html='';Object.keys(uniq).sort(function(a,b){return parseFloat(a)-parseFloat(b);}).forEach(function(k){html+='<div class="wl-leg-item"><span class="wl-leg-dot" style="background:'+uniq[k].c+'"></span><span>'+k+'x</span><span class="wl-leg-pct">x'+uniq[k].count+'</span></div>';});lg.innerHTML=html;}
function wlDoSpin(bet,dur,isAuto,cb){if(wlSpinning)return;wlSpinning=true;wlNonce++;var segs=WL_SEGS[wlMode];var n=segs.length;var idx=Math.floor(Math.random()*n);var mult=segs[idx].m;var win=mult>0;addBal(-bet);updateWager(bet);if(win)addBal(bet*mult);var profit=win?bet*(mult-1):-bet;var sa2=2*Math.PI/n;var cn=((wlRotation%(2*Math.PI))+2*Math.PI)%(2*Math.PI);var tn=(2*Math.PI-(idx*sa2+sa2/2))%(2*Math.PI);var df=(tn-cn+2*Math.PI)%(2*Math.PI);var target=wlRotation+(isAuto?3:5)*2*Math.PI+df;var st=null,sr=wlRotation;(function anim(ts){if(!st)st=ts;var t=Math.min((ts-st)/dur,1);wlRotation=sr+(target-sr)*(1-Math.pow(1-t,isAuto?3:4));wlDrawWheel();if(t<1){requestAnimationFrame(anim);}else{wlRotation=target;wlDrawWheel();wlSpinning=false;var now=new Date();var ts2=(now.getDate()<10?'0':'')+now.getDate()+'/'+(now.getMonth()<9?'0':'')+(now.getMonth()+1);wlBetHistory.unshift({id:wlNonce,mult:mult,mode:wlMode,bet:bet,win:win,profit:profit,ts:ts2,cs:clientSeed,ssh:serverSeedHash,sv:serverSeed});try{localStorage.setItem('wheelHistory',JSON.stringify(wlBetHistory.slice(0,50)));}catch(e2){}wlRenderBets();cb(win,mult,profit);}})(performance.now());}
function wlSpin(){var bet=parseFloat((document.getElementById('wlAmt')||{}).value)||0;var bal=parseFloat(document.getElementById('userBalance').textContent)||0;if(bet<=0){showToast('Enter bet!');return;}if(bal<bet){showToast('Insufficient balance!');return;}var btn=document.getElementById('wlSpinBtn');if(btn){btn.disabled=true;btn.textContent='Spinning...';}var resEl=document.getElementById('wlResult');if(resEl){resEl.textContent='';resEl.className='wl-result-badge';}wlDoSpin(bet,3500,false,function(win,mult,profit){if(resEl){resEl.textContent=win?'WIN! '+mult+'x':'LOSE';resEl.className='wl-result-badge '+(win?'wl-res-win':'wl-res-lose');}if(btn){btn.disabled=false;btn.textContent='Spin';}});}
function wlToggleAuto(){if(wlAutoRunning)wlStopAuto();else wlStartAuto();}
function wlStartAuto(){if(wlAutoRunning||wlSpinning)return;var bet=parseFloat((document.getElementById('wlAmtA')||{}).value)||0;var bal=parseFloat(document.getElementById('userBalance').textContent)||0;if(bet<=0){showToast('Enter bet!');return;}if(bal<bet){showToast('Insufficient balance!');return;}wlAutoBase=bet;wlAutoLoss=0;wlAutoProfit=0;wlAutoRunning=true;var btn=document.getElementById('wlAutoBtn');if(btn){btn.textContent='Stop Auto';btn.style.background='#ef4444';}wlAutoTimer=setTimeout(wlAutoStep,400);}
function wlStopAuto(){wlAutoRunning=false;if(wlAutoTimer){clearTimeout(wlAutoTimer);wlAutoTimer=null;}var btn=document.getElementById('wlAutoBtn');if(btn){btn.textContent='Start Auto';btn.style.background='';}var pl=document.getElementById('wlPLLbl');if(pl)pl.textContent='Win Amount';var wa=document.getElementById('wlWinAmt');if(wa)wa.style.color='';}
function wlAutoStep(){if(!wlAutoRunning||wlSpinning)return;var bal=parseFloat(document.getElementById('userBalance').textContent)||0;var bet=parseFloat((document.getElementById('wlAmtA')||{}).value)||wlAutoBase;if(bet<=0||bal<bet){showToast('Insufficient balance!');wlStopAuto();return;}var sl=parseFloat((document.getElementById('wlStopLoss')||{}).value)||0;var sw=parseFloat((document.getElementById('wlStopWin')||{}).value)||0;if(sl>0&&wlAutoLoss>=sl){showToast('Stopped: Loss limit!');wlStopAuto();return;}if(sw>0&&wlAutoProfit>=sw){showToast('Stopped: Win target!');wlStopAuto();return;}var winOpt=(document.querySelector('input[name="wlWin"]:checked')||{}).value||'reset';var loseOpt=(document.querySelector('input[name="wlLose"]:checked')||{}).value||'reset';var winPct=parseFloat((document.getElementById('wlWinPct')||{}).value)||0;var losePct=parseFloat((document.getElementById('wlLosePct')||{}).value)||0;var inp=document.getElementById('wlAmtA');wlDoSpin(bet,1400,true,function(win,mult,profit){if(win){wlAutoProfit+=profit;if(winOpt==='stop'){wlStopAuto();return;}if(inp)inp.value=winPct>0?(bet*(1+winPct/100)).toFixed(6):wlAutoBase.toFixed(6);}else{wlAutoLoss+=Math.abs(profit);if(loseOpt==='stop'){wlStopAuto();return;}if(inp)inp.value=losePct>0?(bet*(1+losePct/100)).toFixed(6):wlAutoBase.toFixed(6);}var bc=document.getElementById('wlBetCount');if(bc)bc.textContent=wlNonce;var netPL=wlAutoProfit-wlAutoLoss;var plEl=document.getElementById('wlWinAmt');var plLbl=document.getElementById('wlPLLbl');if(plEl){plEl.textContent=(netPL>=0?'+':'')+netPL.toFixed(6);plEl.style.color=netPL>=0?'#22c55e':'#ef4444';}if(plLbl)plLbl.textContent='Live P&L';if(wlAutoRunning)wlAutoTimer=setTimeout(wlAutoStep,200);});}
function wlRenderBets(){var list=document.getElementById('wlBetList');if(!list)return;if(wlBetHistory.length===0){list.innerHTML='<div class="dg-no-bets">No bets yet.</div>';return;}var html='<table class="dg-hist-tbl"><thead><tr><th>Time</th><th>Game</th><th>Mode</th><th>Bet</th><th>Result</th><th>Profit</th></tr></thead><tbody>';wlBetHistory.slice(0,50).forEach(function(b,i){html+='<tr class="dg-hist-row" onclick="wlShowModal('+i+')">';html+='<td class="dg-tc-time">'+b.ts+'</td><td>Wheel</td><td style="text-transform:capitalize">'+b.mode+'</td><td>'+b.bet.toFixed(8)+'</td><td class="'+(b.win?'dg-mult-win':'dg-mult-lose')+'">'+b.mult+'x</td><td class="'+(b.profit>=0?'dg-pos':'dg-neg')+'">'+(b.profit>=0?'+':'')+b.profit.toFixed(8)+'</td></tr>';});html+='</tbody></table>';list.innerHTML=html;}
function wlShowModal(i){window._wlVerifyIdx=i;var b=wlBetHistory[i];if(!b)return;var modal=document.getElementById('wlModal');if(!modal)return;var res=document.getElementById('wlBmResult');if(res){res.textContent=(b.win?'WIN  ':'LOSS  ')+b.mult+'x  '+(b.profit>=0?'+':'')+b.profit.toFixed(6)+' TRX';res.className='bm-result '+(b.win?'bm-win':'bm-lose');}var seeds=document.getElementById('wlBmSeeds');if(seeds)seeds.innerHTML='<div class="bm-sf"><div class="bm-sf-lbl">Server seed</div><div class="bm-sf-row"><span class="bm-sf-ico">=</span><input class="bm-sf-inp" readonly value="'+b.sv+'"></div></div><div class="bm-sf"><div class="bm-sf-lbl">Server seed hash</div><div class="bm-sf-row"><span class="bm-sf-ico">&lt;/&gt;</span><input class="bm-sf-inp" readonly value="'+b.ssh+'"></div></div><div class="bm-sf"><div class="bm-sf-lbl">Client seed</div><div class="bm-sf-row"><span class="bm-sf-ico">@</span><input class="bm-sf-inp" readonly value="'+b.cs+'"></div></div><div class="bm-sf"><div class="bm-sf-lbl">Nonce</div><div class="bm-sf-row"><span class="bm-sf-ico">#</span><input class="bm-sf-inp" readonly value="'+b.id+'"></div></div>';modal.style.display='flex';}
function wlCloseModal(){var m=document.getElementById('wlModal');if(m)m.style.display='none';}
function wlVerify(){var b=wlBetHistory[window._wlVerifyIdx||0];localStorage.setItem('dgVerifyData',JSON.stringify({game:'Wheel',clientSeed:clientSeed,serverSeedHash:serverSeedHash,serverSeed:serverSeed,nonce:wlNonce,bet:b||null,bets:wlBetHistory.slice(0,50)}));window.location.href='verify.php';}
// ==========================================
// END WHEEL GAME
// ==========================================
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// LIMBO GAME
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
var lbBetHistory=[];
function buildLimboUI(){
var h='';
h+='<div class="lb-wrap">';
// â”€â”€ GAME DISPLAY â”€â”€
h+='<div class="lb-display" id="lbDisplay">';
h+='<div class="lb-stars"></div>';
h+='<div class="lb-multiplier" id="lbMult"><span id="lbMultNum">1.00</span>&times;</div>';
h+='<div class="lb-rocket-area"><div class="lb-rocket" id="lbRocket">&#x1F680;</div><div class="lb-moon"></div></div>';
h+='</div>';
// â”€â”€ STATS: Payout | Win Chance â”€â”€
h+='<div class="lb-stats">';
h+='<div class="lb-stat"><div class="dg-slbl">Payout</div><div class="lb-srow"><input class="lb-sinp" id="lbPayout" type="number" value="1.96" step="0.01" min="1.01" oninput="lbByPayout()"><span class="lb-sx">x</span><button class="lb-arr" onclick="lbAdj(-0.1)">&#8249;</button><button class="lb-arr" onclick="lbAdj(0.1)">&#8250;</button></div></div>';
h+='<div class="lb-stat"><div class="dg-slbl">Win Chance</div><div class="lb-srow"><input class="lb-sinp" id="lbWinCh" type="number" value="50.51" step="0.01" oninput="lbByChance()"><span class="lb-sx">%</span></div></div>';
h+='</div>';
// â”€â”€ TABS â”€â”€
h+='<div class="dg-tabs" style="margin-top:10px"><button class="dg-tab dg-tab-act" id="lbTManual" onclick="lbMode(\'man\')">Manual</button><button class="dg-tab" id="lbTAuto" onclick="lbMode(\'auto\')">Auto</button></div>';
// â”€â”€ MANUAL â”€â”€
h+='<div id="lbManSec">';
h+='<div class="lb-bet-row"><div class="dg-amt-lbl"><span class="dg-dot"></span> Bet Amount</div><div class="dg-amt-row"><img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" class="dg-trx-logo" alt="TRX"><input class="dg-amt-inp" id="lbAmt" type="number" value="0.0001" step="0.000001" min="0"><button class="dg-sz-btn" onclick="lbSetAmt(\'min\')">MIN</button><button class="dg-sz-btn" onclick="lbSetAmt(\'half\')">&frac12;</button><button class="dg-sz-btn" onclick="lbSetAmt(\'2x\')">2x</button><button class="dg-sz-btn" onclick="lbSetAmt(\'max\')">MAX</button></div></div>';
h+='<button class="dg-roll-btn" id="lbRollBtn" onclick="lbRoll()">Bet</button>';
h+='</div>';
// â”€â”€ AUTO â”€â”€
h+='<div id="lbAutoSec" style="display:none">';
h+='<div class="dg-auto-cols"><div class="dg-auto-col"><div class="dg-auto-hd">On Win</div><div class="dg-aprow"><span>Change By</span><div class="dg-apinp"><input id="lbWinPct" type="number" value="0"><span>%</span></div></div><label class="dg-arl"><input type="radio" name="lbWin" value="reset" checked> Reset to Base</label><label class="dg-arl"><input type="radio" name="lbWin" value="stop"> Stop Betting</label></div>';
h+='<div class="dg-auto-col"><div class="dg-auto-hd">On Lose</div><div class="dg-aprow"><span>Change By</span><div class="dg-apinp"><input id="lbLosePct" type="number" value="100"><span>%</span></div></div><label class="dg-arl"><input type="radio" name="lbLose" value="reset" checked> Reset to Base</label><label class="dg-arl"><input type="radio" name="lbLose" value="stop"> Stop Betting</label></div></div>';
h+='<div class="dg-alims"><div class="dg-alim"><div class="dg-slbl">Stop on Loss</div><input class="dg-lim-inp" id="lbStopLoss" type="number" value="0" min="0" step="0.000001" placeholder="0=off"></div><div class="dg-alim"><div class="dg-slbl">Stop on Win</div><input class="dg-lim-inp" id="lbStopWin" type="number" value="0" min="0" step="0.000001" placeholder="0=off"></div><div class="dg-alim"><div class="dg-slbl">Bet Count</div><div class="dg-lim-inp dg-bc" id="lbBetCount">0</div></div></div>';
h+='<div class="lb-bet-row"><div class="dg-amt-lbl"><span class="dg-dot"></span> Bet Amount</div><div class="dg-amt-row"><img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" class="dg-trx-logo" alt="TRX"><input class="dg-amt-inp" id="lbAmtA" type="number" value="0.0001" step="0.000001" min="0"></div></div>';
h+='<button class="dg-roll-btn" id="lbAutoBtn" onclick="lbToggleAuto()">Start Auto</button>';
h+='</div>';
// â”€â”€ WIN ROW â”€â”€
h+='<div class="dg-win-row" id="lbPLRow"><span class="dg-wlbl" id="lbPLLbl">Win Amount</span><div class="dg-wval"><img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" class="dg-trx-logo" alt="TRX"><span id="lbWinAmt">0.00019600</span></div></div>';
// â”€â”€ BET HISTORY â”€â”€
h+='<div class="dg-bsec"><div class="dg-bet-tabs"><button class="dg-btab dg-btab-act" id="lbTMyBets" onclick="lbBetTab()">My Bets</button></div><div class="dg-bet-list" id="lbBetList"><div class="dg-no-bets">No bets yet.</div></div></div>';
h+='</div>';
// â”€â”€ BET MODAL â”€â”€
h+='<div class="bet-modal" id="lbModal" onclick="closeLbModal()"><div class="bm-box" onclick="event.stopPropagation()"><div class="bm-hd"><div class="bm-title">&#x1F680; LIMBO</div><button class="bm-close" onclick="closeLbModal()">&#215;</button></div><div class="bm-result" id="lbBmResult"></div><div class="bm-sf-group" id="lbBmSeeds"></div><button class="bm-verify-btn" onclick="lbVerify()">VERIFY</button></div></div>';
return h;
}
function initLimbo(){lbBetHistory=[];try{var s=localStorage.getItem('limboHistory');if(s)lbBetHistory=JSON.parse(s)||[];}catch(e){}lbCalcWin();lbRenderBets();}
function lbMode(m){
var isA=m==='auto';
document.getElementById('lbTManual').classList.toggle('dg-tab-act',!isA);
document.getElementById('lbTAuto').classList.toggle('dg-tab-act',isA);
document.getElementById('lbManSec').style.display=isA?'none':'';
document.getElementById('lbAutoSec').style.display=isA?'':'none';
}
function lbByPayout(){var p=Math.max(1.01,parseFloat(document.getElementById('lbPayout').value)||1.96);var wc=Math.min(98,parseFloat((99/p).toFixed(2)));var wi=document.getElementById('lbWinCh');if(wi)wi.value=wc;lbCalcWin();}
function lbByChance(){var wc=Math.min(98,Math.max(0.01,parseFloat(document.getElementById('lbWinCh').value)||50));var p=parseFloat((99/wc).toFixed(4));var pi=document.getElementById('lbPayout');if(pi)pi.value=p;lbCalcWin();}
function lbAdj(d){var pi=document.getElementById('lbPayout');var v=Math.max(1.01,parseFloat(pi.value||1.96)+d);pi.value=v.toFixed(2);lbByPayout();}
function lbCalcWin(){var b=parseFloat((document.getElementById('lbAmt')||document.getElementById('lbAmtA')||{}).value)||0;var p=parseFloat((document.getElementById('lbPayout')||{}).value)||1.96;var wa=document.getElementById('lbWinAmt');if(wa)wa.textContent=(b*p).toFixed(8);}
function lbSetAmt(sz){var inp=document.getElementById('lbAmt');var bal=parseFloat(document.getElementById('userBalance').textContent)||0;var cur=parseFloat(inp.value)||0;if(sz==='min')inp.value='0.000001';else if(sz==='half')inp.value=(cur>0?cur/2:0.00005).toFixed(6);else if(sz==='2x')inp.value=(cur>0?cur*2:0.0002).toFixed(6);else if(sz==='max')inp.value=bal.toFixed(6);lbCalcWin();}
function lbRoll(){
var btn=document.getElementById('lbRollBtn');
var bet=parseFloat((document.getElementById('lbAmt')||{}).value)||0;
var payout=parseFloat((document.getElementById('lbPayout')||{}).value)||1.96;
var bal=parseFloat(document.getElementById('userBalance').textContent)||0;
if(bet<=0){showToast('Enter a valid bet amount!');return;}
if(bal<bet){showToast('Insufficient balance!');return;}
addBal(-bet);updateWager(bet);
btn.disabled=true;btn.textContent='Rolling...';
lbNonce++;
// Generate result: 0.99/random gives crash point with house edge
var result=Math.max(0.01,Math.min(1000000,parseFloat((0.99/Math.random()).toFixed(2))));
var win=result>=payout;
// Animate multiplier counting up
var multEl=document.getElementById('lbMultNum');
var rocketEl=document.getElementById('lbRocket');
var dispEl=document.getElementById('lbDisplay');
var cur=1.00,target=Math.min(result,win?result:payout-0.01);
var step=(target-1.00)/20;
if(step<0.01)step=0.01;
var iv=setInterval(function(){
cur=Math.min(cur+step,target);
if(multEl)multEl.textContent=cur.toFixed(2);
if(rocketEl)rocketEl.style.transform='translateY(-'+(Math.min((cur-1)*8,80))+'px) rotate(-10deg)';
if(cur>=target){
clearInterval(iv);
if(multEl)multEl.textContent=result.toFixed(2);
if(dispEl)dispEl.style.boxShadow=win?'0 0 40px rgba(34,197,94,0.4)':'0 0 40px rgba(239,68,68,0.4)';
if(multEl)multEl.style.color=win?'#22c55e':'#ef4444';
if(win)addBal(bet*payout);
var profit=win?(bet*(payout-1)):-bet;
var now=new Date();var ts=(now.getDate()<10?'0':'')+now.getDate()+'/'+(now.getMonth()<9?'0':'')+(now.getMonth()+1);
lbBetHistory.unshift({id:lbNonce,result:result,payout:payout,bet:bet,win:win,profit:profit,ts:ts,cs:clientSeed,ssh:serverSeedHash,sv:serverSeed});
try{localStorage.setItem('limboHistory',JSON.stringify(lbBetHistory.slice(0,50)));}catch(e){}
lbRenderBets();
setTimeout(function(){
if(dispEl)dispEl.style.boxShadow='';
if(multEl){multEl.textContent='1.00';multEl.style.color='#22c55e';}
if(rocketEl)rocketEl.style.transform='';
btn.disabled=false;btn.textContent='Bet';
},1200);
}
},50);
}
function lbToggleAuto(){if(lbAutoRunning)lbStopAuto();else lbStartAuto();}
function lbStartAuto(){
if(lbAutoRunning)return;
var bet=parseFloat((document.getElementById('lbAmtA')||{}).value)||0;
var bal=parseFloat(document.getElementById('userBalance').textContent)||0;
if(bet<=0){showToast('Enter bet amount!');return;}
if(bal<bet){showToast('Insufficient balance!');return;}
lbAutoBase=bet;lbAutoLoss=0;lbAutoProfit=0;lbAutoRunning=true;
var btn=document.getElementById('lbAutoBtn');if(btn){btn.textContent='Stop Auto';btn.style.background='#ef4444';}
lbAutoTimer=setTimeout(lbAutoStep,400);
}
function lbStopAuto(){
lbAutoRunning=false;if(lbAutoTimer){clearTimeout(lbAutoTimer);lbAutoTimer=null;}
var btn=document.getElementById('lbAutoBtn');if(btn){btn.textContent='Start Auto';btn.style.background='';}
var pl=document.getElementById('lbPLLbl');if(pl)pl.textContent='Win Amount';
var wa=document.getElementById('lbWinAmt');if(wa){wa.style.color='';lbCalcWin();}
}
function lbAutoStep(){
if(!lbAutoRunning)return;
var bal=parseFloat(document.getElementById('userBalance').textContent)||0;
var bet=parseFloat((document.getElementById('lbAmtA')||{}).value)||lbAutoBase;
if(bet<=0||bal<bet){showToast('Insufficient balance! Auto stopped.');lbStopAuto();return;}
var payout=parseFloat((document.getElementById('lbPayout')||{}).value)||1.96;
var sl=parseFloat((document.getElementById('lbStopLoss')||{}).value)||0;
var sw=parseFloat((document.getElementById('lbStopWin')||{}).value)||0;
if(sl>0&&lbAutoLoss>=sl){showToast('Stopped: Loss limit!');lbStopAuto();return;}
if(sw>0&&lbAutoProfit>=sw){showToast('Stopped: Win target!');lbStopAuto();return;}
var winOpt=(document.querySelector('input[name="lbWin"]:checked')||{}).value||'reset';
var loseOpt=(document.querySelector('input[name="lbLose"]:checked')||{}).value||'reset';
var winPct=parseFloat((document.getElementById('lbWinPct')||{}).value)||0;
var losePct=parseFloat((document.getElementById('lbLosePct')||{}).value)||0;
lbNonce++;
addBal(-bet);updateWager(bet);
var result=Math.max(0.01,Math.min(1000000,parseFloat((0.99/Math.random()).toFixed(2))));
var win=result>=payout;
if(win)addBal(bet*payout);
var profit=win?(bet*(payout-1)):-bet;
// Animate multiplier
var multEl=document.getElementById('lbMultNum');
var rocketEl=document.getElementById('lbRocket');
var dispEl=document.getElementById('lbDisplay');
var cur=1.00,target=Math.min(result,win?result:payout-0.01);
var step=Math.max(0.02,(target-1.00)/15);
var iv=setInterval(function(){
cur=Math.min(cur+step,target);
if(multEl)multEl.textContent=cur.toFixed(2);
if(rocketEl)rocketEl.style.transform='translateY(-'+(Math.min((cur-1)*8,80))+'px) rotate(-10deg)';
if(cur>=target){
clearInterval(iv);
if(multEl)multEl.textContent=result.toFixed(2);
if(multEl)multEl.style.color=win?'#22c55e':'#ef4444';
if(dispEl)dispEl.style.boxShadow=win?'0 0 40px rgba(34,197,94,0.4)':'0 0 40px rgba(239,68,68,0.4)';
setTimeout(function(){
if(dispEl)dispEl.style.boxShadow='';
if(multEl){multEl.textContent='1.00';multEl.style.color='#22c55e';}
if(rocketEl)rocketEl.style.transform='';
},700);
}
},40);
var inp=document.getElementById('lbAmtA');
var now=new Date();var ts=(now.getDate()<10?'0':'')+now.getDate()+'/'+(now.getMonth()<9?'0':'')+(now.getMonth()+1);
lbBetHistory.unshift({id:lbNonce,result:result,payout:payout,bet:bet,win:win,profit:profit,ts:ts,cs:clientSeed,ssh:serverSeedHash,sv:serverSeed});
try{localStorage.setItem('limboHistory',JSON.stringify(lbBetHistory.slice(0,50)));}catch(e){}
if(win){lbAutoProfit+=profit;if(winOpt==='stop'){lbStopAuto();lbRenderBets();return;}if(inp){if(winPct>0)inp.value=(bet*(1+winPct/100)).toFixed(6);else inp.value=lbAutoBase.toFixed(6);}}
else{lbAutoLoss+=Math.abs(profit);if(loseOpt==='stop'){lbStopAuto();lbRenderBets();return;}if(inp){if(losePct>0)inp.value=(bet*(1+losePct/100)).toFixed(6);else inp.value=lbAutoBase.toFixed(6);}}
var bc=document.getElementById('lbBetCount');if(bc)bc.textContent=lbNonce;
var netPL=lbAutoProfit-lbAutoLoss;
var plEl=document.getElementById('lbWinAmt');var plLbl=document.getElementById('lbPLLbl');
if(plEl){plEl.textContent=(netPL>=0?'+':'')+netPL.toFixed(6);plEl.style.color=netPL>=0?'#22c55e':'#ef4444';}
if(plLbl)plLbl.textContent='Live P&L';
lbRenderBets();
if(lbAutoRunning)lbAutoTimer=setTimeout(lbAutoStep,950);
}
function lbRenderBets(){
var list=document.getElementById('lbBetList');if(!list)return;
if(lbBetHistory.length===0){list.innerHTML='<div class="dg-no-bets">No bets yet.</div>';return;}
var html='<table class="dg-hist-tbl"><thead><tr><th>Time</th><th>Game</th><th>Bet</th><th>Result</th><th>Profit</th></tr></thead><tbody>';
lbBetHistory.slice(0,50).forEach(function(b,i){
var ps=(b.profit>=0?'+':'')+b.profit.toFixed(8);
html+='<tr class="dg-hist-row" onclick="lbShowModal('+i+')">';
html+='<td class="dg-tc-time">'+b.ts+'</td>';
html+='<td>&#x1F680; Limbo</td>';
html+='<td>'+b.bet.toFixed(8)+'</td>';
html+='<td class="'+(b.win?'dg-mult-win':'dg-mult-lose')+'">'+b.result.toFixed(2)+'x</td>';
html+='<td class="'+(b.profit>=0?'dg-pos':'dg-neg')+'">'+ps+'</td></tr>';
});
html+='</tbody></table>';list.innerHTML=html;
}
function lbBetTab(){lbRenderBets();}
function lbShowModal(i){
window._lbVerifyIdx=i;
var b=lbBetHistory[i];if(!b)return;
var modal=document.getElementById('lbModal');if(!modal)return;
var res=document.getElementById('lbBmResult');
if(res){res.textContent=(b.win?'WIN &#10003; ':'LOSS &#10007; ')+b.result.toFixed(2)+'x â€” '+(b.profit>=0?'+':'')+b.profit.toFixed(6)+' TRX';res.className='bm-result '+(b.win?'bm-win':'bm-lose');}
var seeds=document.getElementById('lbBmSeeds');
if(seeds)seeds.innerHTML='<div class="bm-sf"><div class="bm-sf-lbl">Server seed</div><div class="bm-sf-row"><span class="bm-sf-ico">&#8801;</span><input class="bm-sf-inp" readonly value="'+b.sv+'"></div></div>'+'<div class="bm-sf"><div class="bm-sf-lbl">Server seed hash</div><div class="bm-sf-row"><span class="bm-sf-ico">&lt;/&gt;</span><input class="bm-sf-inp" readonly value="'+b.ssh+'"></div></div>'+'<div class="bm-sf"><div class="bm-sf-lbl">Client seed</div><div class="bm-sf-row"><span class="bm-sf-ico">&#9000;</span><input class="bm-sf-inp" readonly value="'+b.cs+'"></div></div>'+'<div class="bm-sf"><div class="bm-sf-lbl">Nonce</div><div class="bm-sf-row"><span class="bm-sf-ico">#</span><input class="bm-sf-inp" readonly value="'+b.id+'"></div></div>';
modal.style.display='flex';
}
function closeLbModal(){var m=document.getElementById('lbModal');if(m)m.style.display='none';}
function lbVerify(){
var b=lbBetHistory[window._lbVerifyIdx||0];
var data={game:'Limbo',clientSeed:clientSeed,serverSeedHash:serverSeedHash,serverSeed:serverSeed,nonce:lbNonce,bet:b||null,bets:lbBetHistory.slice(0,50)};
localStorage.setItem('dgVerifyData',JSON.stringify(data));
window.open('verify.html','_blank');
}
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// END LIMBO GAME
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function buildDiceUI(){
var h='';
h+='<div class="dg-wrap" style="max-width:900px;margin:16px auto;">';
h+='<div class="dg-tabs"><button class="dg-tab dg-tab-act" id="dgtManual" onclick="dgSetMode(\'manual\')">Manual</button><button class="dg-tab" id="dgtAuto" onclick="dgSetMode(\'auto\')">Auto</button></div>';
h+='<div class="dg-layout">';
h+='<div class="dg-left">';
h+='<div class="dg-display"><div class="dg-hex-wrap"><div class="hex-bubble" id="hexBubble">50.00</div><input type="range" class="dg-slider" id="dgSlider" min="0.01" max="96" step="0.01" value="50" oninput="dgSlide()"></div><div class="dg-scale"><span>0</span><span>25</span><span>50</span><span>75</span><span>100</span></div></div>';
h+='<div class="dg-stats-row"><div class="dg-stat"><div class="dg-slbl">Payout</div><div class="dg-sval"><input class="dg-sinp" id="dgPayout" type="number" value="1.94" step="0.01" oninput="dgByPayout()"><span class="dg-sx">x</span></div></div><div class="dg-stat dg-stat-mid"><div class="dg-slbl" id="dgDirLbl">Roll Under</div><div class="dg-sval"><input class="dg-sinp" id="dgRollVal" type="number" value="50.00" step="0.01" oninput="dgByRoll()"><button class="dg-arrow-btn" onclick="dgToggleDir()">&#8644;</button></div></div><div class="dg-stat"><div class="dg-slbl">Win Chance</div><div class="dg-sval"><input class="dg-sinp" id="dgWinCh" type="number" value="50.00" step="0.01" oninput="dgByChance()"><span class="dg-sx">%</span></div></div></div>';
h+='</div>';
h+='<div class="dg-right">';
h+='<div class="dg-amount-sec"><div class="dg-amt-lbl"><span class="dg-dot"></span> Amount</div><div class="dg-amt-row"><img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" class="dg-trx-logo" alt="TRX"><input class="dg-amt-inp" id="dgAmt" type="number" value="0.0001" step="0.000001" min="0" oninput="dgCalcWin()"><button class="dg-sz-btn" onclick="dgSetAmt(\'min\')">MIN</button><button class="dg-sz-btn" onclick="dgSetAmt(\'half\')">1/2</button><button class="dg-sz-btn" onclick="dgSetAmt(\'2x\')">2x</button><button class="dg-sz-btn" onclick="dgSetAmt(\'max\')">MAX</button></div></div>';
h+='<div id="dgManualSec"><button class="dg-roll-btn" id="dgRollBtn" onclick="dgRoll()">Roll Now</button></div>';
h+='<div id="dgAutoSec" style="display:none">';
h+='<div class="dg-auto-cols"><div class="dg-auto-col"><div class="dg-auto-hd">On Win</div><div class="dg-aprow"><span>Change By</span><div class="dg-apinp"><input id="dgWinPct" type="number" value="0"><span>%</span></div></div><label class="dg-arl"><input type="radio" name="dgWin" value="reset" checked> Reset to Base</label><label class="dg-arl"><input type="radio" name="dgWin" value="stop"> Stop Betting</label></div>';
h+='<div class="dg-auto-col"><div class="dg-auto-hd">On Lose</div><div class="dg-aprow"><span>Change By</span><div class="dg-apinp"><input id="dgLosePct" type="number" value="100"><span>%</span></div></div><label class="dg-arl"><input type="radio" name="dgLose" value="reset" checked> Reset to Base</label><label class="dg-arl"><input type="radio" name="dgLose" value="stop"> Stop Betting</label></div></div>';
h+='<div class="dg-alims"><div class="dg-alim"><div class="dg-slbl">Stop on Loss</div><input class="dg-lim-inp" id="dgStopLoss" type="number" value="0" min="0" step="0.000001" placeholder="0=off"></div><div class="dg-alim"><div class="dg-slbl">Stop on Win</div><input class="dg-lim-inp" id="dgStopWin" type="number" value="0" min="0" step="0.000001" placeholder="0=off"></div><div class="dg-alim"><div class="dg-slbl">Bet Count</div><div class="dg-lim-inp dg-bc" id="dgBetCount">0</div></div></div>';
h+='<button class="dg-roll-btn" id="dgAutoBtn" onclick="toggleAuto()">Start Auto</button>';
h+='</div>';
h+='<div class="dg-win-row" id="dgPLRow"><span class="dg-wlbl" id="dgPLLbl">Win Amount</span><div class="dg-wval"><img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" class="dg-trx-logo" alt="TRX"><span id="dgWinAmt">0.00019400</span></div></div>';
h+='</div>';
h+='</div>';
h+='<div class="dg-bsec"><div class="dg-bet-tabs"><button class="dg-btab dg-btab-act" id="dgtMyBets" onclick="dgBetTab(\'my\')">My Bets</button><button class="dg-btab" id="dgtAllBets" onclick="dgBetTab(\'all\')">All Bets</button></div><div class="dg-bet-list" id="dgBetList"><div class="dg-no-bets">No bets yet. Place your first bet!</div></div></div>';
h+='</div>';
return h;
}
function initDice(){
dgDir='under';
try{var saved=localStorage.getItem('diceHistory');if(saved){betHistory=JSON.parse(saved)||[];}}catch(e){}
dgUpdate();
renderBets();
window.removeEventListener('resize',dgHexPos);
window.addEventListener('resize',dgHexPos);
}
function dgSlide(){dgUpdate();}
function dgUpdate(){
var sl=document.getElementById('dgSlider');if(!sl)return;
var wc=parseFloat(sl.value);
var payout=parseFloat((97/wc).toFixed(4));
var rollVal=dgDir==='under'?wc:(100-wc);
var pi=document.getElementById('dgPayout');if(pi)pi.value=payout.toFixed(4);
var ri=document.getElementById('dgRollVal');if(ri)ri.value=rollVal.toFixed(2);
var wi=document.getElementById('dgWinCh');if(wi)wi.value=wc.toFixed(2);
var hex=document.getElementById('hexBubble');if(hex)hex.textContent=rollVal.toFixed(2);
var lbl=document.getElementById('dgDirLbl');if(lbl)lbl.textContent=dgDir==='under'?'Roll Under':'Roll Over';
var pct=(wc-0.01)/95.99*100;
var gr='#22c55e',or='#f59e0b';
if(dgDir==='under')sl.style.background='linear-gradient(to right,'+gr+' 0%,'+gr+' '+pct+'%,'+or+' '+pct+'%,'+or+' 100%)';
else sl.style.background='linear-gradient(to right,'+or+' 0%,'+or+' '+pct+'%,'+gr+' '+pct+'%,'+gr+' 100%)';
dgCalcWin();
setTimeout(function(){dgHexPos();},10);
}
function dgHexPos(){
var sl=document.getElementById('dgSlider');
var hex=document.getElementById('hexBubble');
if(!sl||!hex)return;
var tw=sl.getBoundingClientRect().width||sl.offsetWidth;
if(!tw)return;
var mn=parseFloat(sl.min)||0.01,mx=parseFloat(sl.max)||96,val=parseFloat(sl.value)||50;
var pct=(val-mn)/(mx-mn);
var thumbW=24;
var hexW=hex.offsetWidth||72;
var trackPad=thumbW/2;
var pos=trackPad+pct*(tw-thumbW)-hexW/2;
hex.style.left=pos+'px';
hex.style.transform='none';
}
function dgByPayout(){var p=parseFloat(document.getElementById('dgPayout').value)||1.94;var wc=Math.min(96,Math.max(0.01,97/p));document.getElementById('dgSlider').value=wc;dgUpdate();}
function dgByRoll(){var rv=parseFloat(document.getElementById('dgRollVal').value)||50;var wc=dgDir==='under'?rv:(100-rv);wc=Math.min(96,Math.max(0.01,wc));document.getElementById('dgSlider').value=wc;dgUpdate();}
function dgByChance(){var wc=Math.min(96,Math.max(0.01,parseFloat(document.getElementById('dgWinCh').value)||50));document.getElementById('dgSlider').value=wc;dgUpdate();}
function dgToggleDir(){dgDir=dgDir==='under'?'over':'under';dgUpdate();}
function dgCalcWin(){var bet=parseFloat((document.getElementById('dgAmt')||{}).value)||0;var p=parseFloat((document.getElementById('dgPayout')||{}).value)||1.94;var wa=document.getElementById('dgWinAmt');if(wa)wa.textContent=(bet*p).toFixed(8);}
function dgSetAmt(sz){
var inp=document.getElementById('dgAmt');
var bal=parseFloat(document.getElementById('userBalance').textContent)||0;
var cur=parseFloat(inp.value)||0;
if(sz==='min')inp.value='0.000001';
else if(sz==='half')inp.value=(cur>0?(cur/2):0.000050).toFixed(6);
else if(sz==='2x')inp.value=(cur>0?(cur*2):0.000100).toFixed(6);
else if(sz==='max')inp.value=bal.toFixed(6);
dgCalcWin();
}
function dgSetMode(m){
var isAuto=m==='auto';
document.getElementById('dgtManual').classList.toggle('dg-tab-act',!isAuto);
document.getElementById('dgtAuto').classList.toggle('dg-tab-act',isAuto);
document.getElementById('dgManualSec').style.display=isAuto?'none':'';
document.getElementById('dgAutoSec').style.display=isAuto?'':'none';
}
function dgRoll(){
var btn=document.getElementById('dgRollBtn');
var bet=parseFloat((document.getElementById('dgAmt')||{}).value)||0;
var wc=parseFloat((document.getElementById('dgWinCh')||{}).value)||50;
var payout=parseFloat((document.getElementById('dgPayout')||{}).value)||1.94;
var bal=parseFloat(document.getElementById('userBalance').textContent)||0;
if(bet<=0){showToast('Enter a valid bet amount!');return;}
if(bal<=0||bet>bal){showToast('Insufficient balance!');return;}
addBal(-bet);updateWager(bet);
btn.disabled=true;btn.textContent='Rolling...';
nonce++;
setTimeout(function(){
var roll=parseFloat((Math.random()*100).toFixed(2));
var win=(dgDir==='under'&&roll<wc)||(dgDir==='over'&&roll>(100-wc));
var sl=document.getElementById('dgSlider');
var hex=document.getElementById('hexBubble');
if(hex&&sl){
var tw=sl.getBoundingClientRect().width||sl.offsetWidth;
var thumbW=24,hexW=hex.offsetWidth||72;
var rollPct=Math.min(100,Math.max(0,roll))/100;
var rollPos=thumbW/2+rollPct*(tw-thumbW)-hexW/2;
hex.style.transition='left 0.38s cubic-bezier(0.34,1.56,0.64,1)';
hex.style.left=rollPos+'px';
hex.textContent=roll.toFixed(2);
hex.className='hex-bubble '+(win?'hex-win':'hex-lose');
setTimeout(function(){
hex.style.transition='left 0.3s ease';
hex.className='hex-bubble';
hex.textContent=document.getElementById('dgRollVal').value;
dgHexPos();
},1600);
}
if(win)addBal(bet*payout);
var profit=win?(bet*(payout-1)):-bet;
var now=new Date();var ts=(now.getDate()<10?'0':'')+now.getDate()+'/'+(now.getMonth()<9?'0':'')+(now.getMonth()+1);
var rec={id:nonce,game:'Dice',option:(dgDir==='under'?'Roll Under':'Roll Over')+' '+(dgDir==='under'?wc.toFixed(2):(100-wc).toFixed(2)),roll:roll,bet:bet,payout:payout,wc:wc,dir:dgDir,win:win,profit:profit,ts:ts,cs:clientSeed,ssh:serverSeedHash,sv:serverSeed};
betHistory.unshift(rec);
try{localStorage.setItem('diceHistory',JSON.stringify(betHistory.slice(0,50)));}catch(e){}
renderBets();
btn.disabled=false;btn.textContent='Roll Now';
},600);
}
function renderBets(){
var list=document.getElementById('dgBetList');if(!list)return;
if(betHistory.length===0){list.innerHTML='<div class="dg-no-bets">No bets yet. Place your first bet!</div>';return;}
var html='<table class="dg-hist-tbl"><thead><tr><th>Time</th><th>Game</th><th>Bet</th><th>Multiplier</th><th>Profit</th></tr></thead><tbody>';
betHistory.slice(0,50).forEach(function(b,i){
var mult=b.win?b.payout.toFixed(2)+'x':'0.00x';
var profitStr=(b.profit>=0?'+':'')+b.profit.toFixed(8);
html+='<tr class="dg-hist-row" onclick="showBetModal('+i+')">';
html+='<td class="dg-tc-time">'+b.ts+'</td>';
html+='<td><span class="dg-dice-ico">&#127922;</span> Dice</td>';
html+='<td>'+b.bet.toFixed(8)+'</td>';
html+='<td class="'+(b.win?'dg-mult-win':'dg-mult-lose')+'">'+mult+'</td>';
html+='<td class="'+(b.profit>=0?'dg-pos':'dg-neg')+'">'+profitStr+'</td>';
html+='</tr>';
});
html+='</tbody></table>';
list.innerHTML=html;
}
function _ensureBetModal(){
var m=document.getElementById('betModal');
if(m)return m;
// Create modal dynamically and append to body
var div=document.createElement('div');
div.id='betModal';
div.className='bet-modal';
div.style.cssText='display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.75);align-items:center;justify-content:center;';
div.innerHTML='<div class="bm-box" onclick="event.stopPropagation()" style="background:#1a2030;border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:24px;width:440px;max-width:95vw;box-shadow:0 16px 60px rgba(0,0,0,.6);">'+
'<div class="bm-hd" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">'+
'<div class="bm-title" id="bmTitle" style="font-size:15px;font-weight:800;color:#fff;">&#127922; Bet Info</div>'+
'<button class="bm-close" onclick="_closeBetModal(this)" style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);color:#fff;width:30px;height:30px;border-radius:7px;cursor:pointer;font-size:18px;line-height:1;display:flex;align-items:center;justify-content:center;">&#215;</button>'+
'</div>'+
'<div class="bm-result" id="bmResult" style="text-align:center;padding:14px;border-radius:10px;font-size:15px;font-weight:900;margin-bottom:14px;"></div>'+
'<div id="bmSeeds"></div>'+
'<div id="bmVerifyLink" style="text-align:center;margin-top:14px;"></div>'+
'</div>';
div.onclick=function(e){if(e.target===div)_closeBetModal();};
document.body.appendChild(div);
return div;
}
function _closeBetModal(){
var m=document.getElementById('betModal');if(m)m.style.display='none';
}
function closeBetModal(){_closeBetModal();}
function showBetModal(i){
window._dgVerifyIdx=i;
var b=betHistory[i];if(!b)return;
var modal=_ensureBetModal();
var title=document.getElementById('bmTitle');
if(title)title.textContent='\u{1F3B2} Dice - Bet Info';
var res=document.getElementById('bmResult');
if(res){
  res.textContent=(b.win?'WIN +':'LOSS ')+Math.abs(b.profit).toFixed(6)+' TRX';
  res.style.cssText=b.win?'text-align:center;padding:14px;border-radius:10px;font-size:15px;font-weight:900;margin-bottom:14px;background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.3);color:#22c55e':'text-align:center;padding:14px;border-radius:10px;font-size:15px;font-weight:900;margin-bottom:14px;background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.3);color:#ef4444';
}
var seeds=document.getElementById('bmSeeds');
if(seeds)seeds.innerHTML=
'<div class="bm-sf"><div class="bm-sf-lbl">Server seed</div><div class="bm-sf-row"><span class="bm-sf-ico">&#8801;</span><input class="bm-sf-inp" readonly value="'+(b.sv||'')+'"></div></div>'+
'<div class="bm-sf"><div class="bm-sf-lbl">Server seed hash</div><div class="bm-sf-row"><span class="bm-sf-ico">&lt;/&gt;</span><input class="bm-sf-inp" readonly value="'+(b.ssh||'')+'"></div></div>'+
'<div class="bm-sf"><div class="bm-sf-lbl">Client seed</div><div class="bm-sf-row"><span class="bm-sf-ico">&#9000;</span><input class="bm-sf-inp" readonly value="'+(b.cs||'')+'"></div></div>'+
'<div class="bm-sf bm-sf-nonce"><div class="bm-sf-lbl">Nonce</div><div class="bm-sf-row"><span class="bm-sf-ico">#</span><input class="bm-sf-inp" readonly value="'+(b.id||0)+'"></div></div>';
var vl=document.getElementById('bmVerifyLink');
if(vl){var vUrl='/verify.php?game=dice&seed='+encodeURIComponent(b.sv||'')+'&hash='+encodeURIComponent(b.ssh||'')+'&client='+encodeURIComponent(b.cs||'')+'&nonce='+(b.id||0)+'&win='+(b.win?1:0)+'&profit='+b.profit+'&bet='+b.bet;
vl.innerHTML='<a href="'+vUrl+'" class="bm-verify-btn" style="display:inline-block;padding:11px 28px;background:linear-gradient(135deg,#3ecf8e,#22c55e);color:#0a1a0f;border:none;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;text-decoration:none;">&#128270; Verify</a>';}
modal.style.display='flex';
}


// ==========================================
// TOWER GAME
// ==========================================
// TOWER GAME
// ==========================================
var TW_PAYOUTS={easy:[1.46,2.12,3.08,4.48,6.52,9.49,13.81,20.09,29.23,42.53],medium:[1.94,3.76,7.29,14.14,27.43,53.21,103.23,200.27,388.52,753.73],hard:[2.91,8.47,24.65,71.73,208.73,607.40,1767.53,5143.51,14967.61,43555.75]};
var TW_COLS={easy:3,medium:2,hard:3},TW_MINES={easy:1,medium:1,hard:2};
var twMode='easy',twActive=false,twBet=0,twCurrentRow=0,twGrid=[],twNonce=0,twBetHistory=[];
function buildTowerUI(){
var h='<div class="tw-wrap">';
h+='<div class="tw-card">';
h+='<div class="tw-grid-area" id="twGridArea">'+twBuildGrid('easy')+'</div>';
h+='<div class="tw-modes"><label class="tw-mode-opt"><input type="radio" name="twMode" value="easy" checked onchange="twChangeMode(this.value)"><span class="tw-pill tw-easy">Easy</span></label><label class="tw-mode-opt"><input type="radio" name="twMode" value="medium" onchange="twChangeMode(this.value)"><span class="tw-pill tw-med">Medium</span></label><label class="tw-mode-opt"><input type="radio" name="twMode" value="hard" onchange="twChangeMode(this.value)"><span class="tw-pill tw-hard">Hard</span></label></div>';
h+='<div class="tw-cashout-bar" id="twCashoutBar" style="display:none"><span class="tw-mult-lbl">Current: <strong id="twMult">0.00x</strong></span><button class="tw-co-btn" onclick="twCashOut()">&#128176; Cash Out</button></div>';
h+='<div class="lb-bet-row"><div class="dg-amt-lbl"><span class="dg-dot"></span> Bet Amount</div>';
h+='<div class="dg-amt-row"><img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" class="dg-trx-logo" alt="TRX"><input class="dg-amt-inp" id="twAmt" type="number" value="0.0001" step="0.000001" min="0"><button class="dg-sz-btn" onclick="twSetAmt(\'min\')">MIN</button><button class="dg-sz-btn" onclick="twSetAmt(\'half\')">1/2</button><button class="dg-sz-btn" onclick="twSetAmt(\'2x\')">2x</button><button class="dg-sz-btn" onclick="twSetAmt(\'max\')">MAX</button></div></div>';
h+='<div class="dg-win-row"><span class="dg-wlbl">Win Amount</span><div class="dg-wval"><img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" class="dg-trx-logo" alt="TRX"><span id="twWinAmt">0.00000000</span></div></div>';
h+='<button class="dg-roll-btn" id="twStartBtn" onclick="twStart()">Start Game</button>';
h+='<div class="dg-bsec"><div class="dg-bet-tabs"><button class="dg-btab dg-btab-act">My Bets</button></div><div class="dg-bet-list" id="twBetList"><div class="dg-no-bets">No bets yet.</div></div></div>';
h+='</div></div>';return h;}
function twBuildGrid(mode){
var cols=TW_COLS[mode],pays=TW_PAYOUTS[mode];
var h='<div class="tw-grid tw-grid-'+mode+'" id="twGrid">';
for(var row=9;row>=0;row--){
h+='<div class="tw-row tw-row-idle" id="twRow'+row+'"><div class="tw-row-cells">';
for(var col=0;col<cols;col++){
h+='<div class="tw-cell" id="twCell_'+row+'_'+col+'" onclick="twClickCell('+row+','+col+')">x'+pays[row].toFixed(2)+'</div>';}
h+='</div></div>';}
h+='</div>';return h;}
function initTower(){
twBetHistory=[];
try{var s=localStorage.getItem('twHistory');if(s)twBetHistory=JSON.parse(s)||[];}catch(e){}
twActive=false;twNonce=0;twMode='easy';twCurrentRow=0;twGrid=[];
twRenderBets();}
function twChangeMode(m){if(twActive)return;twMode=m;var a=document.getElementById('twGridArea');if(a)a.innerHTML=twBuildGrid(m);}
function twStart(){
if(twActive)return;
var bet=parseFloat((document.getElementById('twAmt')||{}).value)||0;
var bal=parseFloat(document.getElementById('userBalance').textContent)||0;
if(bet<=0){showToast('Enter bet!');return;}
if(bal<bet){showToast('Insufficient balance!');return;}
twBet=bet;addBal(-bet);updateWager(bet);twNonce++;twActive=true;twCurrentRow=0;twGrid=[];
var cols=TW_COLS[twMode],mines=TW_MINES[twMode];
for(var r=0;r<10;r++){
var pos=[],mi=[];
for(var c=0;c<cols;c++)pos.push(c);
pos.sort(function(){return Math.random()-.5;});
for(var m=0;m<mines;m++)mi.push(pos[m]);
twGrid.push({mi:mi,revealed:false,sel:-1});}
twRefreshGrid();
var bar=document.getElementById('twCashoutBar');if(bar)bar.style.display='flex';
var btn=document.getElementById('twStartBtn');if(btn){btn.disabled=true;btn.textContent='In Progress...';}
}

function twRefreshGrid(){
var cols=TW_COLS[twMode];
var pays=TW_PAYOUTS[twMode];
for(var row=0;row<10;row++){
var re=document.getElementById('twRow'+row);if(!re)continue;
var g=twGrid[row];
var cls='tw-row ';
if(twActive&&row===twCurrentRow)cls+='tw-row-active';
else if(twGrid.length>0&&row<twCurrentRow)cls+='tw-row-passed';
else if(twActive)cls+='tw-row-future';
else cls+='tw-row-idle';
re.className=cls;
for(var col=0;col<cols;col++){
var cell=document.getElementById('twCell_'+row+'_'+col);if(!cell)continue;
cell.className='tw-cell';
if(twActive&&row===twCurrentRow){
cell.innerHTML='x'+pays[row].toFixed(2);
cell.classList.add('tw-cell-pick');
}else if(g&&g.revealed){
if(g.mi.indexOf(col)>=0){cell.classList.add('tw-cell-mine');cell.innerHTML='&#x1F4A3;';}
else if(col===g.sel){cell.classList.add('tw-cell-safe');cell.innerHTML='&#10003;';}
else{cell.classList.add('tw-cell-faded');cell.innerHTML='x'+pays[row].toFixed(2);}
}else if(twActive){
cell.innerHTML='x'+pays[row].toFixed(2);
cell.classList.add('tw-cell-locked');
}else{
cell.innerHTML='x'+pays[row].toFixed(2);
cell.classList.add('tw-cell-locked');
}}}}

function twClickCell(row,col){
if(!twActive||row!==twCurrentRow)return;
var g=twGrid[row];
if(!g)return;
var isMine=g.mi.indexOf(col)>=0;
g.revealed=true;g.sel=col;
if(isMine){
twActive=false;twRefreshGrid();
var wa=document.getElementById('twWinAmt');if(wa){wa.textContent='-'+twBet.toFixed(8);wa.style.color='#ef4444';}
var ts=('0'+new Date().getDate()).slice(-2)+'/'+(('0'+(new Date().getMonth()+1)).slice(-2));
twBetHistory.unshift({id:twNonce,mode:twMode,bet:twBet,win:false,mult:0,profit:-twBet,ts:ts,cs:clientSeed,ssh:serverSeedHash,sv:serverSeed});
try{localStorage.setItem('twHistory',JSON.stringify(twBetHistory.slice(0,50)));}catch(e){}
twRenderBets();showToast('BOOM! Mine hit!');
var bar=document.getElementById('twCashoutBar');if(bar)bar.style.display='none';
var btn=document.getElementById('twStartBtn');if(btn){btn.disabled=false;btn.textContent='Start Game';}
setTimeout(function(){var a=document.getElementById('twGridArea');if(a)a.innerHTML=twBuildGrid(twMode);},1200);
}else{
twCurrentRow++;
var mult=TW_PAYOUTS[twMode][row];
var mm=document.getElementById('twMult');if(mm)mm.textContent=mult.toFixed(2)+'x';
var wa=document.getElementById('twWinAmt');if(wa){wa.textContent=(twBet*mult).toFixed(8);wa.style.color='#22c55e';}
twRefreshGrid();
if(twCurrentRow>=10)twCashOut();}}
function twCashOut(){
if(!twActive||twCurrentRow===0){showToast('Pick at least one row first!');return;}
var r=twCurrentRow-1;
var mult=TW_PAYOUTS[twMode][r];
var won=twBet*mult;addBal(won);var profit=won-twBet;
twActive=false;
var ts=('0'+new Date().getDate()).slice(-2)+'/'+(('0'+(new Date().getMonth()+1)).slice(-2));
twBetHistory.unshift({id:twNonce,mode:twMode,bet:twBet,win:true,mult:mult,profit:profit,ts:ts,cs:clientSeed,ssh:serverSeedHash,sv:serverSeed});
try{localStorage.setItem('twHistory',JSON.stringify(twBetHistory.slice(0,50)));}catch(e){}
twRenderBets();
showToast('Cashed out! +'+profit.toFixed(6)+' TRX');
var wa=document.getElementById('twWinAmt');if(wa){wa.textContent='+'+profit.toFixed(8);wa.style.color='#22c55e';}
var bar=document.getElementById('twCashoutBar');if(bar)bar.style.display='none';
var btn=document.getElementById('twStartBtn');if(btn){btn.disabled=false;btn.textContent='Start Game';}
setTimeout(function(){var a=document.getElementById('twGridArea');if(a)a.innerHTML=twBuildGrid(twMode);},600);}
function twSetAmt(sz){var inp=document.getElementById('twAmt');if(!inp)return;var bal=parseFloat(document.getElementById('userBalance').textContent)||0;var cur=parseFloat(inp.value)||0;if(sz==='min')inp.value='0.000001';else if(sz==='half')inp.value=(cur>0?cur/2:0.00005).toFixed(6);else if(sz==='2x')inp.value=(cur>0?cur*2:0.0002).toFixed(6);else if(sz==='max')inp.value=bal.toFixed(6);}
function twRenderBets(){
var list=document.getElementById('twBetList');if(!list)return;
if(twBetHistory.length===0){list.innerHTML='<div class="dg-no-bets">No bets yet.</div>';return;}
var html='<table class="dg-hist-tbl"><thead><tr><th>Time</th><th>Game</th><th>Bet</th><th>Result</th><th>Profit</th></tr></thead><tbody>';
twBetHistory.slice(0,50).forEach(function(b){
html+='<tr class="dg-hist-row" style="cursor:pointer" onclick="showTwBetModal('+twBetHistory.indexOf(b)+')"><td class="dg-tc-time">'+b.ts+'</td><td>&#x1F3D7; Tower</td>';
html+='<td>'+b.bet.toFixed(8)+'</td>';
html+='<td class="'+(b.win?'dg-mult-win':'dg-mult-lose')+'">'+(b.win?b.mult.toFixed(2)+'x':'LOSE')+'</td>';
html+='<td class="'+(b.profit>=0?'dg-pos':'dg-neg')+'">'+(b.profit>=0?'+':'')+b.profit.toFixed(8)+'</td></tr>';
});
html+='</tbody></table>';list.innerHTML=html;}
// END TOWER G

function showTwBetModal(i){
var modal=_ensureBetModal();
var title=document.getElementById('bmTitle');if(title)title.textContent='\u{1F3D7} Tower - Bet Info';
var b=twBetHistory[i];if(!b)return;

var res=document.getElementById('bmResult');
if(res){res.textContent=(b.win?'WIN +':'LOSS ')+Math.abs(b.profit).toFixed(6)+' TRX';res.className='bm-result '+(b.win?'bm-win':'bm-lose');}
var seeds=document.getElementById('bmSeeds');
var vUrl='verify.php?game=tower&seed='+encodeURIComponent(b.sv||'')+'&hash='+encodeURIComponent(b.ssh||'')+'&client='+encodeURIComponent(b.cs||'')+'&nonce='+(b.id||0)+'&win='+(b.win?1:0)+'&profit='+b.profit+'&bet='+b.bet+'&mode='+(b.mode||'');
if(seeds)seeds.innerHTML=
'<div class="bm-sf"><div class="bm-sf-lbl">Server seed</div><div class="bm-sf-row"><span class="bm-sf-ico">&#8801;</span><input class="bm-sf-inp" readonly value="'+(b.sv||'')+'"></div></div>'+
'<div class="bm-sf"><div class="bm-sf-lbl">Server seed hash</div><div class="bm-sf-row"><span class="bm-sf-ico">&#60;/&#62;</span><input class="bm-sf-inp" readonly value="'+(b.ssh||'')+'"></div></div>'+
'<div class="bm-sf"><div class="bm-sf-lbl">Client seed</div><div class="bm-sf-row"><span class="bm-sf-ico">&#9000;</span><input class="bm-sf-inp" readonly value="'+(b.cs||'')+'"></div></div>'+
'<div class="bm-sf bm-sf-nonce"><div class="bm-sf-lbl">Nonce</div><div class="bm-sf-row"><span class="bm-sf-ico">#</span><input class="bm-sf-inp" readonly value="'+(b.id||0)+'"></div></div>'+
'<div style="text-align:center;margin-top:16px"><a class="bm-verify-btn" href="'+vUrl+'" target="_blank">&#128270; Verify This Bet</a></div>';
modal.style.display='flex';
}

// ── CONTACT FORM FUNCTIONS ──
var _contactImages = [];

// Compress image via canvas before storing (keeps localStorage under quota)
function _compressImage(file, callback) {
  var reader = new FileReader();
  reader.onload = function(e) {
    var img = new Image();
    img.onload = function() {
      var MAX = 800;
      var w = img.width, h = img.height;
      if (w > MAX || h > MAX) {
        if (w > h) { h = Math.round(h * MAX / w); w = MAX; }
        else       { w = Math.round(w * MAX / h); h = MAX; }
      }
      var canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      callback(canvas.toDataURL('image/jpeg', 0.70));
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function previewContactImages(input) {
  var files = Array.from(input.files);
  files = files.slice(0, 3 - _contactImages.length);
  files.forEach(function(file) {
    if (!file.type.startsWith('image/')) { showToast('Only images allowed'); return; }
    if (file.size > 10 * 1024 * 1024) { showToast('Image too large (max 10MB)'); return; }
    var name = file.name;
    _compressImage(file, function(compressedData) {
      _contactImages.push({ name: name, data: compressedData });
      _renderContactPreviews();
    });
  });
  input.value = '';
}

function _renderContactPreviews() {
  var previews = document.getElementById('contactImgPreviews');
  if (!previews) return;
  previews.innerHTML = '';
  _contactImages.forEach(function(img, i) {
    var wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative;display:inline-block;margin:6px 6px 0 0';
    var im = document.createElement('img');
    im.src = img.data;
    im.style.cssText = 'width:80px;height:80px;object-fit:cover;border-radius:8px;border:2px solid rgba(62,207,142,.3)';
    var rm = document.createElement('button');
    rm.innerHTML = '&times;';
    rm.style.cssText = 'position:absolute;top:-6px;right:-6px;background:#ef4444;color:#fff;border:none;border-radius:50%;width:20px;height:20px;cursor:pointer;font-size:14px;font-weight:700;line-height:1';
    (function(idx){ rm.onclick = function() { _contactImages.splice(idx, 1); _renderContactPreviews(); }; })(i);
    wrap.appendChild(im); wrap.appendChild(rm); previews.appendChild(wrap);
  });
  var hint = document.querySelector('.contact-upload-hint');
  if (hint) hint.textContent = _contactImages.length + '/3 images' + (_contactImages.length >= 3 ? ' (max)' : ' selected');
}

function sendContact() {
  var subj = document.getElementById('contactSubj');
  var msg  = document.getElementById('contactMsg');
  var btn  = document.querySelector('.contact-send-btn');
  if (!subj || !msg) return;
  var subjVal = subj.value.trim();
  var msgVal  = msg.value.trim();
  if (!subjVal) { showToast('Please enter a subject'); subj.focus(); return; }
  if (msgVal.length < 5) { showToast('Please write your message (min 5 chars)'); msg.focus(); return; }
  if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
  setTimeout(function() {
    var msgs = JSON.parse(localStorage.getItem('adm_msgs') || '[]');
    var newMsg = {
      id: 'msg' + Date.now(),
      user: localStorage.getItem('userName') || 'User',
      email: (document.getElementById('contactEmail') || {}).value || 'user@tronsick.io',
      subject: subjVal,
      message: msgVal,
      images: _contactImages.map(function(i) { return i.name; }),
      imageData: _contactImages.map(function(i) { return { name: i.name, data: i.data }; }),
      status: 'unread',
      date: new Date().toISOString()
    };
    msgs.unshift(newMsg);
    // Try saving with images; fallback to saving without if quota exceeded
    try {
      localStorage.setItem('adm_msgs', JSON.stringify(msgs));
    } catch(e) {
      // localStorage quota exceeded — strip image data and retry
      msgs[0].imageData = msgs[0].imageData.map(function(img) { return { name: img.name, data: null }; });
      try { localStorage.setItem('adm_msgs', JSON.stringify(msgs)); } catch(e2) { /* still fail */ }
      showToast('Images too large to store — sent without image data');
    }
    subj.value = ''; msg.value = '';
    _contactImages = []; _renderContactPreviews();
    if (btn) { btn.disabled = false; btn.textContent = 'SEND MESSAGE'; }
    // Show inline success banner
    var card = document.querySelector('.contact-card');
    if (card) {
      var ok = document.createElement('div');
      ok.style.cssText = 'background:rgba(62,207,142,.12);border:1px solid rgba(62,207,142,.3);color:#34d399;padding:16px;border-radius:12px;font-size:14px;font-weight:600;margin-top:16px;text-align:center';
      ok.innerHTML = '&#x2705; Message sent! We will reply within 48 hours.';
      card.appendChild(ok);
      setTimeout(function(){ ok.remove(); }, 5000);
    }
    showToast('Message sent successfully!');
    // Refresh tickets list
    setTimeout(loadMyTickets, 900);
  }, 800);
}
// ── END CONTACT FORM FUNCTIONS ──

// ══════════════════════════════════════════
// ── SUPPORT TICKET SYSTEM (USER SIDE) ──
// ══════════════════════════════════════════
var _currentTicketId = null;
var _ticketReplyImages = [];

// Load user's own tickets from localStorage
function loadMyTickets() {
  var list = document.getElementById('myTicketsList');
  var badge = document.getElementById('unreadTicketBadge');
  if (!list) return;

  var currentUser = localStorage.getItem('userName') || 'User';
  var allMsgs = JSON.parse(localStorage.getItem('adm_msgs') || '[]');
  // Filter only this user's messages
  var myMsgs = allMsgs.filter(function(m) {
    return m.user === currentUser || m.email === localStorage.getItem('userEmail');
  });

  // Count unread admin replies
  var unreadReplies = 0;
  myMsgs.forEach(function(m) {
    if (m.replies && m.replies.length > 0) {
      var seen = JSON.parse(localStorage.getItem('seen_replies_' + m.id) || '[]');
      var newReplies = m.replies.filter(function(r) { return r.admin && seen.indexOf(r.date) === -1; });
      unreadReplies += newReplies.length;
    }
  });

  if (badge) {
    if (unreadReplies > 0) { badge.style.display = 'inline-block'; badge.textContent = unreadReplies + ' New'; }
    else { badge.style.display = 'none'; }
  }

  if (!myMsgs.length) {
    list.innerHTML = '<div style="text-align:center;padding:32px;color:rgba(255,255,255,.3)">' +
      '<div style="font-size:32px;margin-bottom:10px">&#128233;</div>' +
      '<div style="font-size:14px">No tickets yet. Send a message above!</div></div>';
    return;
  }

  list.innerHTML = myMsgs.map(function(m) {
    var replies = m.replies || [];
    var adminReplies = replies.filter(function(r) { return r.admin; });
    var seen = JSON.parse(localStorage.getItem('seen_replies_' + m.id) || '[]');
    var hasNew = adminReplies.some(function(r) { return seen.indexOf(r.date) === -1; });
    var lastReply = replies.length > 0 ? replies[replies.length - 1] : null;
    var statusColor = m.status === 'replied' ? '#3ecf8e' : m.status === 'read' ? '#60a5fa' : '#f59e0b';
    var statusTxt   = m.status === 'replied' ? 'Replied' : m.status === 'read' ? 'Under Review' : 'Open';

    return '<div onclick="openTicket(\'' + m.id + '\')" style="background:rgba(255,255,255,.03);border:1px solid ' +
      (hasNew ? 'rgba(62,207,142,.3)' : 'rgba(255,255,255,.07)') +
      ';border-radius:12px;padding:16px 18px;margin-bottom:10px;cursor:pointer;transition:border-color .2s" ' +
      'onmouseover="this.style.borderColor=\'rgba(62,207,142,.4)\'" onmouseout="this.style.borderColor=\'' +
      (hasNew ? 'rgba(62,207,142,.3)' : 'rgba(255,255,255,.07)') + '\'">' +
      '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px">' +
      '<div style="flex:1">' +
      '<div style="font-size:14px;font-weight:700;color:#fff;margin-bottom:4px">' + m.subject + (hasNew ? ' <span style="background:#3ecf8e;color:#000;font-size:10px;font-weight:800;padding:2px 7px;border-radius:10px;vertical-align:middle">NEW REPLY</span>' : '') + '</div>' +
      '<div style="font-size:12px;color:rgba(255,255,255,.4);margin-bottom:8px">' + new Date(m.date).toLocaleString() + '</div>' +
      '<div style="font-size:13px;color:rgba(255,255,255,.6);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:380px">' + (lastReply ? (lastReply.admin ? '&#128737; Admin: ' : '&#128100; You: ') + lastReply.text : m.message) + '</div>' +
      '</div>' +
      '<div style="text-align:right;flex-shrink:0">' +
      '<div style="font-size:11px;font-weight:700;color:' + statusColor + ';background:' + statusColor + '18;border:1px solid ' + statusColor + '40;padding:3px 10px;border-radius:20px;margin-bottom:6px">' + statusTxt + '</div>' +
      '<div style="font-size:11px;color:rgba(255,255,255,.3)">' + replies.length + ' message' + (replies.length !== 1 ? 's' : '') + '</div>' +
      '</div></div></div>';
  }).join('');
}

// Open conversation modal for a ticket
function openTicket(id) {
  var allMsgs = JSON.parse(localStorage.getItem('adm_msgs') || '[]');
  var m = allMsgs.find(function(x) { return x.id === id; });
  if (!m) return;
  _currentTicketId = id;

  // Mark admin replies as seen
  var seen = JSON.parse(localStorage.getItem('seen_replies_' + id) || '[]');
  (m.replies || []).forEach(function(r) { if (r.admin && seen.indexOf(r.date) === -1) seen.push(r.date); });
  localStorage.setItem('seen_replies_' + id, JSON.stringify(seen));

  // Set subject
  document.getElementById('tmSubject').textContent = m.subject;
  document.getElementById('tmReplyText').value = '';
  _ticketReplyImages = [];
  _renderTicketImgPreviews();

  // Build conversation
  var conv = document.getElementById('tmConversation');
  var html = '';

  // Original message (user)
  html += _buildMsgBubble({
    text: m.message,
    date: m.date,
    isAdmin: false,
    imageData: m.imageData || []
  });

  // All replies in order
  (m.replies || []).forEach(function(r) {
    html += _buildMsgBubble({
      text: r.text,
      date: r.date,
      isAdmin: r.admin === true,
      imageData: r.imageData || []
    });
  });

  conv.innerHTML = html;
  conv.scrollTop = conv.scrollHeight;

  // Show modal
  var modal = document.getElementById('ticketModal');
  if (modal) modal.style.display = 'flex';

  // Refresh badge
  setTimeout(loadMyTickets, 100);
}

function _buildMsgBubble(opts) {
  var isAdmin = opts.isAdmin;
  var imgs = opts.imageData || [];
  var imgHtml = imgs.map(function(img) {
    if (!img.data) return '<span style="font-size:11px;color:rgba(255,255,255,.4)">&#128247; ' + img.name + '</span>';
    return '<img src="' + img.data + '" alt="' + (img.name || 'image') + '" ' +
      'onclick="showImgFull(this.src,\'' + (img.name || '') + '\')" ' +
      'style="width:80px;height:80px;object-fit:cover;border-radius:8px;cursor:zoom-in;border:2px solid rgba(255,255,255,.15);transition:transform .15s" ' +
      'onmouseover="this.style.transform=\'scale(1.06)\'" onmouseout="this.style.transform=\'scale(1)\'" title="Click to view"/>';
  }).join('');

  var bgColor   = isAdmin ? 'rgba(62,207,142,.08)' : 'rgba(255,255,255,.04)';
  var border    = isAdmin ? 'rgba(62,207,142,.2)' : 'rgba(255,255,255,.07)';
  var nameColor = isAdmin ? '#3ecf8e' : '#60a5fa';
  var label     = isAdmin ? '&#128737; Support Team' : '&#128100; You';

  return '<div style="background:' + bgColor + ';border:1px solid ' + border + ';border-radius:12px;padding:14px 16px">' +
    '<div style="display:flex;justify-content:space-between;margin-bottom:8px">' +
    '<span style="font-size:12px;font-weight:700;color:' + nameColor + '">' + label + '</span>' +
    '<span style="font-size:11px;color:rgba(255,255,255,.3)">' + new Date(opts.date).toLocaleString() + '</span>' +
    '</div>' +
    '<div style="font-size:13px;color:rgba(255,255,255,.85);line-height:1.6;white-space:pre-wrap">' + (opts.text || '') + '</div>' +
    (imgHtml ? '<div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:8px">' + imgHtml + '</div>' : '') +
    '</div>';
}

// Image preview in reply modal
var _ticketImgInputEl = null;
function previewTicketImages(input) {
  _ticketImgInputEl = input;
  var files = Array.from(input.files).slice(0, 3 - _ticketReplyImages.length);
  files.forEach(function(file) {
    if (!file.type.startsWith('image/')) return;
    var name = file.name;
    _compressImage(file, function(data) {
      _ticketReplyImages.push({ name: name, data: data });
      _renderTicketImgPreviews();
    });
  });
  input.value = '';
}

function _renderTicketImgPreviews() {
  var el = document.getElementById('tmImgPreviews');
  if (!el) return;
  el.innerHTML = '';
  _ticketReplyImages.forEach(function(img, i) {
    var wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative;display:inline-block;margin:0 6px 6px 0';
    var im = document.createElement('img');
    im.src = img.data;
    im.style.cssText = 'width:60px;height:60px;object-fit:cover;border-radius:8px;border:2px solid rgba(62,207,142,.3)';
    var rm = document.createElement('button');
    rm.innerHTML = '&times;';
    rm.style.cssText = 'position:absolute;top:-6px;right:-6px;background:#ef4444;color:#fff;border:none;border-radius:50%;width:18px;height:18px;cursor:pointer;font-size:12px;font-weight:700;line-height:1';
    (function(idx){ rm.onclick = function(){ _ticketReplyImages.splice(idx,1); _renderTicketImgPreviews(); }; })(i);
    wrap.appendChild(im); wrap.appendChild(rm); el.appendChild(wrap);
  });
}

// Send user reply to ticket
function sendTicketReply() {
  var text = (document.getElementById('tmReplyText') || {}).value;
  if (!text || !text.trim()) { showToast('Reply khaali nahi ho sakta'); return; }
  if (!_currentTicketId) return;
  var btn = document.getElementById('tmSendBtn');
  if (btn) { btn.disabled = true; btn.innerHTML = '&#9203; Sending...'; }

  var imgs = _ticketReplyImages.slice();
  setTimeout(function() {
    var allMsgs = JSON.parse(localStorage.getItem('adm_msgs') || '[]');
    var m = allMsgs.find(function(x) { return x.id === _currentTicketId; });
    if (!m) { showToast('Ticket not found'); return; }
    if (!m.replies) m.replies = [];
    var reply = {
      text: text.trim(),
      date: new Date().toISOString(),
      admin: false,
      imageData: imgs
    };
    m.replies.push(reply);
    m.status = 'open'; // re-open for admin attention

    try { localStorage.setItem('adm_msgs', JSON.stringify(allMsgs)); }
    catch(e) {
      reply.imageData = [];
      try { localStorage.setItem('adm_msgs', JSON.stringify(allMsgs)); } catch(e2) {}
    }

    if (btn) { btn.disabled = false; btn.innerHTML = '&#9992; Send Reply'; }
    document.getElementById('tmReplyText').value = '';
    _ticketReplyImages = []; _renderTicketImgPreviews();

    // Update conversation view
    var conv = document.getElementById('tmConversation');
    if (conv) {
      conv.innerHTML += _buildMsgBubble({ text: reply.text, date: reply.date, isAdmin: false, imageData: imgs });
      conv.scrollTop = conv.scrollHeight;
    }
    showToast('Reply sent!');
    loadMyTickets();
  }, 600);
}

function closeTicketModal() {
  var modal = document.getElementById('ticketModal');
  if (modal) modal.style.display = 'none';
  _currentTicketId = null;
}

// Full-size image viewer (reused from admin panel concept)
function showImgFull(src, name) {
  var lb = document.getElementById('_imgLb');
  if (!lb) { lb = document.createElement('div'); lb.id = '_imgLb'; document.body.appendChild(lb); }
  lb.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.93);z-index:99999;display:flex;align-items:center;justify-content:center;flex-direction:column;cursor:zoom-out';
  lb.onclick = function() { lb.style.display='none'; };
  lb.innerHTML = '';
  var cls = document.createElement('button');
  cls.innerHTML = '&times;';
  cls.style.cssText = 'position:absolute;top:16px;right:20px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:#fff;width:38px;height:38px;border-radius:9px;cursor:pointer;font-size:22px;font-weight:700;line-height:1;z-index:2';
  cls.onclick = function(e){ e.stopPropagation(); lb.style.display='none'; };
  lb.appendChild(cls);
  var img = document.createElement('img');
  img.src = src;
  img.style.cssText = 'max-width:92vw;max-height:82vh;border-radius:12px;box-shadow:0 20px 80px rgba(0,0,0,.8);object-fit:contain;cursor:default';
  img.onclick = function(e){ e.stopPropagation(); };
  lb.appendChild(img);
  if (name) {
    var cap = document.createElement('div');
    cap.textContent = name;
    cap.style.cssText = 'margin-top:12px;color:rgba(255,255,255,.5);font-size:13px;text-align:center;max-width:90vw;overflow:hidden;text-overflow:ellipsis;white-space:nowrap';
    lb.appendChild(cap);
  }
  var esc = function(e){ if(e.key==='Escape'){ lb.style.display='none'; document.removeEventListener('keydown',esc); } };
  document.addEventListener('keydown', esc);
}

// Auto-load tickets when contact page is active
(function() {
  var init = setInterval(function() {
    if (document.getElementById('myTicketsList')) {
      loadMyTickets();
      clearInterval(init);
    }
  }, 500);
})();
// ── END TICKET SYSTEM ──

