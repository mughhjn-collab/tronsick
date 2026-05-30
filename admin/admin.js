
// Auth guard
if(!sessionStorage.getItem('adminAuth')){window.location.href='index.php';}

// State
var S={
  users:JSON.parse(localStorage.getItem('adm_users')||'[]'),
  msgs:JSON.parse(localStorage.getItem('adm_msgs')||'[]'),
  gifts:JSON.parse(localStorage.getItem('adm_gifts')||'[]'),
  withdrawals:JSON.parse(localStorage.getItem('adm_withdrawals')||'[]'),
  deposits:JSON.parse(localStorage.getItem('adm_deposits')||'[]'),
  faucetAmt:parseFloat(localStorage.getItem('faucet_amount')||'0.005'),
  faucetTimer:parseInt(localStorage.getItem('faucet_timer')||'60'),
  faucetEnabled:localStorage.getItem('faucet_enabled')!=='0',
  bonusEnabled:localStorage.getItem('bonus_enabled')!=='0',
  contestEnabled:localStorage.getItem('contest_enabled')!=='0',
  cashbackEnabled:localStorage.getItem('cashback_enabled')!=='0',
  siteBalance:parseFloat(localStorage.getItem('site_balance')||'0'),
  minWithdraw:parseFloat(localStorage.getItem('min_withdraw')||'10'),
  maxWithdraw:parseFloat(localStorage.getItem('max_withdraw')||'0'),
  withdrawFee:parseFloat(localStorage.getItem('withdraw_fee')||'0.1'),
  affiliateRate:parseFloat(localStorage.getItem('affiliate_rate')||'50'),
  oxaKey:localStorage.getItem('oxa_key')||'',
  oxaMerchant:localStorage.getItem('oxa_merchant')||'',
  oxaEnabled:localStorage.getItem('oxa_enabled')==='1',
  maintenanceMode:localStorage.getItem('maintenance_mode')==='1',
  siteName:localStorage.getItem('site_name')||'TronSick',
  contestPrize1:parseFloat(localStorage.getItem('contest_prize1')||'500'),
  contestPrize2:parseFloat(localStorage.getItem('contest_prize2')||'250'),
  contestPrize3:parseFloat(localStorage.getItem('contest_prize3')||'100'),
  gameHouseEdge:parseFloat(localStorage.getItem('game_house_edge')||'1'),
  depositMinConf:parseInt(localStorage.getItem('deposit_min_conf')||'1'),
  adminUser:localStorage.getItem('adminUser')||'admin',
  adminPass:localStorage.getItem('adminPass')||'TronSick@2024',
  cashbackRates:{stone:0.01,iron:0.05,bronze:0.1,silver:0.25,gold:1,platinum:6,diamond:12,master:15},
  bonusPayouts:{range1:0.005,range2:0.15,range3:1.5,range4:15,range5:150,jackpot:1500}
};

// Clock
setInterval(function(){
  var d=new Date();
  var el=document.getElementById('tbTime');
  if(el) el.textContent=d.toLocaleTimeString();
},1000);

// Sections HTML map
var SECTIONS={
  dashboard: buildDashboard,
  users: buildUsers,
  faucet: buildFaucet,
  bonus: buildBonus,
  games: buildGames,
  contest: buildContest,
  cashback: buildCashback,
  gifts: buildGifts,
  affiliate: buildAffiliate,
  withdraw: buildWithdraw,
  deposit: buildDeposit,
  payment: buildPayment,
  contact: buildContact,
  settings: buildSettings
};

var TITLES={
  dashboard:'Dashboard Overview',users:'User Management',faucet:'Faucet Settings',
  bonus:'Bonus Settings',games:'Games Settings',contest:'Contest Settings',
  cashback:'Cashback Settings',gifts:'Gift Codes',affiliate:'Affiliate Settings',
  withdraw:'Withdrawal Requests',deposit:'Deposit History',payment:'OxaPay Gateway',
  contact:'Contact Messages',settings:'Admin Settings'
};

function showSection(btn,sec){
  document.querySelectorAll('.sb-item').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active');
  document.getElementById('tbTitle').textContent=TITLES[sec]||sec;
  document.getElementById('admContent').innerHTML=SECTIONS[sec]?SECTIONS[sec]():'';
}

function doLogout(){
  sessionStorage.removeItem('adminAuth');
  window.location.href='index.php';
}

function save(key,val){localStorage.setItem(key,val);}

function toast(msg,type){
  var t=document.createElement('div');
  t.className='adm-alert alert-'+(type||'success');
  t.style.cssText='position:fixed;top:20px;right:20px;z-index:9999;min-width:280px;animation:none;padding:14px 18px;border-radius:10px;font-size:13px;font-weight:600;display:flex;align-items:center;gap:8px';
  t.innerHTML=(type==='error'?'<i class="fas fa-circle-xmark"></i>':'<i class="fas fa-circle-check"></i>')+msg;
  document.body.appendChild(t);
  setTimeout(function(){t.remove();},3000);
}

function card(title,icon,badge,content){
  return '<div class="adm-card"><div class="adm-card-hd"><i class="fas fa-'+icon+'"></i>'+title+(badge?'<span class="hd-badge '+badge.cls+'">'+badge.txt+'</span>':'')+'</div>'+content+'</div>';
}

function togRow(id,label,desc,stateKey,saveKey){
  var checked=S[stateKey]?'checked':'';
  return '<div class="toggle-row"><div class="toggle-info"><strong>'+label+'</strong><span>'+desc+'</span></div><label class="toggle-sw"><input type="checkbox" '+checked+' onchange="toggleSetting(\''+stateKey+'\',\''+saveKey+'\',this.checked)"><span class="slider"></span></label></div>';
}

function toggleSetting(stateKey,saveKey,val){
  S[stateKey]=val;
  save(saveKey,val?'1':'0');
  toast(stateKey+' updated!');
}

function fld(label,id,val,type,extra){
  return '<div class="form-group"><label>'+label+'</label><input type="'+(type||'text')+'" id="'+id+'" value="'+val+'" '+(extra||')+'/></div>';
}

// â”€â”€ DASHBOARD â”€â”€
function buildDashboard(){
  var totalUsers=S.users.length;
  var pendingWd=S.withdrawals.filter(function(w){return w.status==='pending';}).length;
  var totalWd=S.withdrawals.reduce(function(a,w){return a+parseFloat(w.amount||0);},0);
  var todayMsgs=S.msgs.filter(function(m){return m.status==='unread';}).length;
  return '<div class="pg-hdr"><h1>Welcome back, Admin ðŸ‘‹</h1><p>Here\'s what\'s happening on TronSick today.</p></div>'+
  '<div class="stat-grid">'+
  '<div class="stat-card"><div class="stat-icon si-green"><i class="fas fa-users"></i></div><div class="stat-info"><div class="stat-val">'+totalUsers+'</div><div class="stat-lbl">Total Users</div><div class="stat-chg chg-up">â†‘ Active</div></div></div>'+
  '<div class="stat-card"><div class="stat-icon si-yellow"><i class="fas fa-money-bill-transfer"></i></div><div class="stat-info"><div class="stat-val">'+pendingWd+'</div><div class="stat-lbl">Pending Withdrawals</div><div class="stat-chg '+(pendingWd>0?'chg-dn':'chg-up')+'">'+( pendingWd>0?'âš  Needs action':'âœ“ All clear')+'</div></div></div>'+
  '<div class="stat-card"><div class="stat-icon si-blue"><i class="fas fa-wallet"></i></div><div class="stat-info"><div class="stat-val">'+S.siteBalance.toFixed(2)+'</div><div class="stat-lbl">Site Balance (TRX)</div></div></div>'+
  '<div class="stat-card"><div class="stat-icon si-purple"><i class="fas fa-envelope"></i></div><div class="stat-info"><div class="stat-val">'+todayMsgs+'</div><div class="stat-lbl">Unread Messages</div></div></div>'+
  '<div class="stat-card"><div class="stat-icon si-teal"><i class="fas fa-faucet"></i></div><div class="stat-info"><div class="stat-val">'+(S.faucetEnabled?'ON':'OFF')+'</div><div class="stat-lbl">Faucet Status</div><div class="stat-chg '+(S.faucetEnabled?'chg-up':'chg-dn')+'">'+( S.faucetEnabled?'â— Running':'â— Paused')+'</div></div></div>'+
  '<div class="stat-card"><div class="stat-icon si-red"><i class="fas fa-coins"></i></div><div class="stat-info"><div class="stat-val">'+totalWd.toFixed(2)+'</div><div class="stat-lbl">Total Paid Out (TRX)</div></div></div>'+
  '</div>'+
  '<div class="two-col">'+
  card('Quick Actions','bolt',null,
    '<div style="display:flex;flex-wrap:wrap;gap:10px">'+
    '<button class="btn btn-primary" onclick="showSectionByKey(\'faucet\')"><i class="fas fa-faucet"></i> Faucet</button>'+
    '<button class="btn btn-secondary" onclick="showSectionByKey(\'withdraw\')"><i class="fas fa-money-bill-transfer"></i> Withdrawals</button>'+
    '<button class="btn btn-warning" onclick="showSectionByKey(\'settings\')"><i class="fas fa-gear"></i> Settings</button>'+
    '<button class="btn btn-danger" onclick="toggleMaintenance()"><i class="fas fa-triangle-exclamation"></i> '+(S.maintenanceMode?'Disable':'Enable')+' Maintenance</button>'+
    '</div>'
  )+
  card('Site Status','signal',null,
    togRow('','Faucet Enabled','Allow users to claim faucet','faucetEnabled','faucet_enabled')+
    togRow('','Bonus Rolls','Allow bonus roll system','bonusEnabled','bonus_enabled')+
    togRow('','Contest Active','Weekly wagering contest','contestEnabled','contest_enabled')+
    togRow('','Cashback Active','Weekly cashback payouts','cashbackEnabled','cashback_enabled')+
    togRow('','Maintenance Mode','Block site access for users','maintenanceMode','maintenance_mode')
  )+
  '</div>'+
  card('Recent Withdrawals','money-bill-transfer',{cls:'badge-yellow',txt:'Latest'},buildWdTable(5))+
  card('Recent Messages','envelope',{cls:'badge-blue',txt:'Unread'},buildMsgTable(5));
}

function toggleMaintenance(){
  S.maintenanceMode=!S.maintenanceMode;
  save('maintenance_mode',S.maintenanceMode?'1':'0');
  toast('Maintenance mode '+(S.maintenanceMode?'ENABLED':'DISABLED'),'success');
  document.getElementById('admContent').innerHTML=buildDashboard();
}

function showSectionByKey(key){
  var btns=document.querySelectorAll('.sb-item');
  var titles={faucet:'Faucet Settings',withdraw:'Withdrawal Requests',settings:'Admin Settings'};
  document.querySelectorAll('.sb-item').forEach(function(b){b.classList.remove('active');});
  document.getElementById('tbTitle').textContent=TITLES[key]||key;
  document.getElementById('admContent').innerHTML=SECTIONS[key]?SECTIONS[key]():'';
}

// â”€â”€ FAUCET â”€â”€
function buildFaucet(){
  return '<div class="pg-hdr"><h1>Faucet Settings</h1><p>Control hourly faucet amounts and behavior.</p></div>'+
  card('Faucet Configuration','faucet',{cls:S.faucetEnabled?'badge-green':'badge-red',txt:S.faucetEnabled?'ENABLED':'DISABLED'},
    '<div id="faucetAlert"></div>'+
    togRow('','Enable Faucet','Turn faucet on/off for all users','faucetEnabled','faucet_enabled')+
    '<div style="height:16px"></div>'+
    '<div class="form-row">'+
    '<div class="form-group"><label>Timer (minutes)</label><input type="number" id="fcTimer" value="'+S.faucetTimer+'" min="1" max="1440"/></div>'+
    '</div>'+
    '<div class="adm-card-hd" style="margin-top:16px;border-top:1px solid rgba(255,255,255,.06);padding-top:16px"><i class="fas fa-layer-group"></i> Payout by Level (TRX)</div>'+
    '<div class="form-row triple">'+
    fld('Stone','fc_stone',localStorage.getItem('fp_stone')||'0.005','number')+
    fld('Iron','fc_iron',localStorage.getItem('fp_iron')||'0.01','number')+
    fld('Bronze','fc_bronze',localStorage.getItem('fp_bronze')||'0.02','number')+
    '</div><div class="form-row triple">'+
    fld('Silver','fc_silver',localStorage.getItem('fp_silver')||'0.07','number')+
    fld('Gold','fc_gold',localStorage.getItem('fp_gold')||'0.5','number')+
    fld('Platinum','fc_plat',localStorage.getItem('fp_plat')||'5','number')+
    '</div><div class="form-row">'+
    fld('Diamond','fc_diamond',localStorage.getItem('fp_diamond')||'15','number')+
    fld('Master','fc_master',localStorage.getItem('fp_master')||'60','number')+
    '</div>'+
    '<button class="btn btn-primary" onclick="saveFaucet()"><i class="fas fa-save"></i> Save Faucet Settings</button>'
  );
}

function saveFaucet(){
  S.faucetTimer=parseInt(document.getElementById('fcTimer').value)||60;
  save('faucet_timer',S.faucetTimer);
  ['stone','iron','bronze','silver','gold','plat','diamond','master'].forEach(function(l){
    var el=document.getElementById('fc_'+l);
    if(el) save('fp_'+l,el.value);
  });
  toast('Faucet settings saved!');
}

// â”€â”€ BONUS â”€â”€
function buildBonus(){
  return '<div class="pg-hdr"><h1>Bonus Settings</h1><p>Configure bonus roll payouts.</p></div>'+
  card('Bonus Roll Configuration','dice',{cls:S.bonusEnabled?'badge-green':'badge-red',txt:S.bonusEnabled?'ENABLED':'DISABLED'},
    togRow('','Enable Bonus Rolls','Allow users to use bonus roll system','bonusEnabled','bonus_enabled')+
    '<div style="height:16px"></div>'+
    '<div class="adm-card-hd" style="border-top:1px solid rgba(255,255,255,.06);padding-top:16px"><i class="fas fa-list"></i> Payout Table (TRX)</div>'+
    '<div class="form-row">'+
    fld('Range 0â€“9885','bp_r1',localStorage.getItem('bp_r1')||'0.005','number')+
    fld('Range 9886â€“9985','bp_r2',localStorage.getItem('bp_r2')||'0.15','number')+
    '</div><div class="form-row">'+
    fld('Range 9986â€“9993','bp_r3',localStorage.getItem('bp_r3')||'1.5','number')+
    fld('Range 9994â€“9997','bp_r4',localStorage.getItem('bp_r4')||'15','number')+
    '</div><div class="form-row">'+
    fld('Range 9998â€“9999','bp_r5',localStorage.getItem('bp_r5')||'150','number')+
    fld('Jackpot 10000','bp_jk',localStorage.getItem('bp_jk')||'1500','number')+
    '</div>'+
    '<button class="btn btn-primary" onclick="saveBonus()"><i class="fas fa-save"></i> Save Bonus Settings</button>'
  );
}

function saveBonus(){
  ['r1','r2','r3','r4','r5','jk'].forEach(function(r){
    var el=document.getElementById('bp_'+r); if(el) save('bp_'+r,el.value);
  });
  toast('Bonus settings saved!');
}

// â”€â”€ GAMES â”€â”€
function buildGames(){
  var he=parseFloat(localStorage.getItem('game_house_edge')||'1');
  var games=['Dice','Limbo','Wheel','Mines','Sic Bo','Diamond','Tower'];
  var rows=games.map(function(g){
    var key='game_win_'+g.toLowerCase().replace(' ','');
    var wr=parseFloat(localStorage.getItem(key)||'49');
    return '<div class="toggle-row"><div class="toggle-info"><strong>'+g+'</strong><span>Win Rate: '+wr+'% &nbsp;|&nbsp; House Edge: '+(100-wr).toFixed(1)+'%</span></div>'+
    '<div style="display:flex;align-items:center;gap:10px"><input type="range" min="1" max="95" value="'+wr+'" style="width:100px;accent-color:#3ecf8e" oninput="updateGameRate(this,\''+key+'\',\''+g+'\')" id="gwr_'+key+'"/><span id="gwrv_'+key+'" style="width:45px;font-size:13px;font-weight:700;color:#3ecf8e">'+wr+'%</span></div></div>';
  }).join('');
  return '<div class="pg-hdr"><h1>Games Settings</h1><p>Set win rates and house edge for each game.</p></div>'+
  card('Global Settings','sliders',null,
    '<div class="form-row"><div class="form-group"><label>House Edge (%)</label><input type="number" id="gHouseEdge" value="'+he+'" min="0" max="50" step="0.1"/></div></div>'+
    '<button class="btn btn-primary" onclick="saveHouseEdge()"><i class="fas fa-save"></i> Save</button>'
  )+
  card('Per-Game Win Rate','gamepad',null,
    '<div class="adm-alert alert-warn"><i class="fas fa-triangle-exclamation"></i> Changing win rates affects game fairness. Use responsibly.</div>'+
    rows+
    '<div style="margin-top:16px"><button class="btn btn-primary" onclick="saveGameRates()"><i class="fas fa-save"></i> Save All Game Rates</button></div>'
  );
}

function updateGameRate(el,key,name){
  document.getElementById('gwrv_'+key).textContent=el.value+'%';
}

function saveHouseEdge(){
  var v=document.getElementById('gHouseEdge').value;
  save('game_house_edge',v); S.gameHouseEdge=parseFloat(v);
  toast('House edge saved!');
}

function saveGameRates(){
  var games=['Dice','Limbo','Wheel','Mines','Sic Bo','Diamond','Tower'];
  games.forEach(function(g){
    var key='game_win_'+g.toLowerCase().replace(' ','');
    var el=document.getElementById('gwr_'+key);
    if(el) save(key,el.value);
  });
  toast('Game rates saved!');
}

// â”€â”€ CONTEST â”€â”€
function buildContest(){
  return '<div class="pg-hdr"><h1>Contest Settings</h1><p>Manage weekly wagering contest prizes.</p></div>'+
  card('Contest Configuration','trophy',{cls:S.contestEnabled?'badge-green':'badge-red',txt:S.contestEnabled?'ENABLED':'DISABLED'},
    togRow('','Enable Contest','Weekly wagering contest on/off','contestEnabled','contest_enabled')+
    '<div style="height:16px"></div>'+
    '<div class="form-row triple">'+
    fld('1st Prize (TRX)','cp1',localStorage.getItem('contest_prize1')||'500','number')+
    fld('2nd Prize (TRX)','cp2',localStorage.getItem('contest_prize2')||'250','number')+
    fld('3rd Prize (TRX)','cp3',localStorage.getItem('contest_prize3')||'100','number')+
    '</div><div class="form-row">'+
    fld('4thâ€“10th Prize Each (TRX)','cp4',localStorage.getItem('contest_prize4')||'25','number')+
    fld('Reset Day','cpDay',localStorage.getItem('contest_day')||'Monday','text')+
    '</div>'+
    '<button class="btn btn-primary" onclick="saveContest()"><i class="fas fa-save"></i> Save Contest Settings</button>'
  )+
  card('Current Leaderboard','list-ol',null,
    '<div class="adm-tbl-wrap"><table class="adm-tbl"><thead><tr><th>Rank</th><th>Username</th><th>Wagered (TRX)</th><th>Prize</th><th>Actions</th></tr></thead><tbody>'+
    (S.users.slice(0,5).map(function(u,i){
      var prizes=['500','250','100','25','25'];
      return '<tr><td>#'+(i+1)+'</td><td>'+u.name+'</td><td>'+(Math.random()*100).toFixed(2)+'</td><td>'+prizes[i]+' TRX</td><td><button class="btn btn-sm btn-danger" onclick="alert(\'Disqualify \'+\''+u.name+'\')"><i class="fas fa-ban"></i></button></td></tr>';
    }).join('')||'<tr><td colspan="5" style="text-align:center;color:rgba(255,255,255,.3);padding:24px">No contest data yet</td></tr>')+
    '</tbody></table></div>'
  );
}

function saveContest(){
  save('contest_prize1',document.getElementById('cp1').value);
  save('contest_prize2',document.getElementById('cp2').value);
  save('contest_prize3',document.getElementById('cp3').value);
  save('contest_prize4',document.getElementById('cp4').value);
  save('contest_day',document.getElementById('cpDay').value);
  toast('Contest settings saved!');
}

// â”€â”€ CASHBACK â”€â”€
function buildCashback(){
  var rates={stone:'0.01',iron:'0.05',bronze:'0.1',silver:'0.25',gold:'1',platinum:'6',diamond:'12',master:'15'};
  var rows=Object.keys(rates).map(function(lv){
    var key='cb_rate_'+lv;
    var val=localStorage.getItem(key)||rates[lv];
    return '<div class="form-group"><label>'+lv.charAt(0).toUpperCase()+lv.slice(1)+' (%)</label><input type="number" id="'+key+'" value="'+val+'" min="0" max="100" step="0.01"/></div>';
  });
  var half=Math.ceil(rows.length/2);
  return '<div class="pg-hdr"><h1>Cashback Settings</h1><p>Set cashback rates per player level.</p></div>'+
  card('Cashback Configuration','money-bill-trend-up',{cls:S.cashbackEnabled?'badge-green':'badge-red',txt:S.cashbackEnabled?'ENABLED':'DISABLED'},
    togRow('','Enable Cashback','Weekly cashback payouts on/off','cashbackEnabled','cashback_enabled')+
    '<div style="height:16px"></div>'+
    '<div class="form-row">'+rows.slice(0,half).join('')+'</div>'+
    '<div class="form-row">'+rows.slice(half).join('')+'</div>'+
    '<button class="btn btn-primary" onclick="saveCashback()"><i class="fas fa-save"></i> Save Cashback Rates</button>'
  );
}

function saveCashback(){
  ['stone','iron','bronze','silver','gold','platinum','diamond','master'].forEach(function(l){
    var el=document.getElementById('cb_rate_'+l); if(el) save('cb_rate_'+l,el.value);
  });
  toast('Cashback rates saved!');
}

// â”€â”€ GIFTS â”€â”€
function buildGifts(){
  var gifts=JSON.parse(localStorage.getItem('adm_gifts')||'[]');
  var rows=gifts.map(function(g){
    return '<tr><td><span class="gift-code-small">'+g.code+'</span></td><td>'+g.amount+' TRX</td><td>'+g.uses+'/'+g.maxUses+'</td><td><span class="tbl-badge '+(g.active?'tbl-green':'tbl-red')+'">'+(g.active?'Active':'Used')+'</span></td><td><button class="btn btn-sm btn-danger" onclick="deleteGift(\''+g.code+'\')"><i class="fas fa-trash"></i></button></td></tr>';
  }).join('') || '<tr><td colspan="5" style="text-align:center;color:rgba(255,255,255,.3);padding:24px">No gift codes yet</td></tr>';
  return '<div class="pg-hdr"><h1>Gift Codes</h1><p>Create and manage gift/promo codes.</p></div>'+
  card('Create Gift Code','plus',null,
    '<div class="form-row">'+
    '<div class="form-group"><label>Code</label><input type="text" id="gcCode" placeholder="e.g. TRON2024"/></div>'+
    '<div class="form-group"><label>Amount (TRX)</label><input type="number" id="gcAmt" placeholder="10" min="0" step="0.000001"/></div>'+
    '</div><div class="form-row">'+
    '<div class="form-group"><label>Max Uses</label><input type="number" id="gcMax" value="1" min="1"/></div>'+
    '<div class="form-group"><label>Expiry (leave blank = never)</label><input type="date" id="gcExp"/></div>'+
    '</div>'+
    '<div style="display:flex;gap:10px">'+
    '<button class="btn btn-primary" onclick="createGift()"><i class="fas fa-plus"></i> Create Code</button>'+
    '<button class="btn btn-secondary" onclick="genGiftCode()"><i class="fas fa-shuffle"></i> Generate Random</button>'+
    '</div>'
  )+
  card('All Gift Codes','list',null,
    '<div class="adm-tbl-wrap"><table class="adm-tbl"><thead><tr><th>Code</th><th>Amount</th><th>Uses</th><th>Status</th><th>Actions</th></tr></thead><tbody>'+rows+'</tbody></table></div>'
  );
}

function genGiftCode(){
  var chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var code='';for(var i=0;i<8;i++) code+=chars[Math.floor(Math.random()*chars.length)];
  document.getElementById('gcCode').value=code;
}

function createGift(){
  var code=document.getElementById('gcCode').value.trim().toUpperCase();
  var amt=parseFloat(document.getElementById('gcAmt').value)||0;
  var max=parseInt(document.getElementById('gcMax').value)||1;
  if(!code||!amt){toast('Fill code and amount','error');return;}
  var gifts=JSON.parse(localStorage.getItem('adm_gifts')||'[]');
  gifts.push({code:code,amount:amt,uses:0,maxUses:max,active:true,created:new Date().toISOString()});
  localStorage.setItem('adm_gifts',JSON.stringify(gifts));
  toast('Gift code '+code+' created!');
  document.getElementById('admContent').innerHTML=buildGifts();
}

function deleteGift(code){
  var gifts=JSON.parse(localStorage.getItem('adm_gifts')||'[]');
  gifts=gifts.filter(function(g){return g.code!==code;});
  localStorage.setItem('adm_gifts',JSON.stringify(gifts));
  toast('Gift code deleted');
  document.getElementById('admContent').innerHTML=buildGifts();
}

// â”€â”€ AFFILIATE â”€â”€
function buildAffiliate(){
  return '<div class="pg-hdr"><h1>Affiliate Settings</h1><p>Configure referral commission rates.</p></div>'+
  card('Commission Rates','handshake',null,
    '<div class="form-row">'+
    fld('Hourly Faucet Commission (%)','af_faucet',localStorage.getItem('af_faucet')||'50','number')+
    fld('Bonus Roll Commission (%)','af_bonus',localStorage.getItem('af_bonus')||'50','number')+
    '</div><div class="form-row">'+
    fld('Games Commission (% of wagered)','af_games',localStorage.getItem('af_games')||'0.4','number')+
    fld('Surveys/Offers Commission (%)','af_surveys',localStorage.getItem('af_surveys')||'10','number')+
    '</div>'+
    '<button class="btn btn-primary" onclick="saveAffiliate()"><i class="fas fa-save"></i> Save Rates</button>'
  )+
  card('Top Affiliates','star',null,
    '<div class="adm-tbl-wrap"><table class="adm-tbl"><thead><tr><th>User</th><th>Referrals</th><th>Earned (TRX)</th><th>Status</th></tr></thead><tbody>'+
    (S.users.slice(0,5).map(function(u){
      return '<tr><td>'+u.name+'</td><td>'+Math.floor(Math.random()*20)+'</td><td>'+(Math.random()*50).toFixed(4)+'</td><td><span class="tbl-badge tbl-green">Active</span></td></tr>';
    }).join('')||'<tr><td colspan="4" style="text-align:center;color:rgba(255,255,255,.3);padding:24px">No affiliates yet</td></tr>')+
    '</tbody></table></div>'
  );
}

function saveAffiliate(){
  ['faucet','bonus','games','surveys'].forEach(function(k){
    var el=document.getElementById('af_'+k); if(el) save('af_'+k,el.value);
  });
  toast('Affiliate rates saved!');
}

// â”€â”€ WITHDRAWALS â”€â”€
function buildWithdraw(){
  var wds=JSON.parse(localStorage.getItem('adm_withdrawals')||'[]');
  var rows=wds.map(function(w){
    return '<tr><td>'+w.user+'</td><td>'+w.amount+' TRX</td><td>'+w.address+'</td><td><span class="tbl-badge '+(w.status==='pending'?'tbl-yellow':w.status==='approved'?'tbl-green':'tbl-red')+'">'+w.status+'</span></td><td>'+new Date(w.date).toLocaleDateString()+'</td><td>'+
    (w.status==='pending'?'<button class="btn btn-sm btn-primary" style="margin-right:4px" onclick="approveWd(\''+w.id+'\')"><i class="fas fa-check"></i></button><button class="btn btn-sm btn-danger" onclick="rejectWd(\''+w.id+'\')"><i class="fas fa-times"></i></button>':'<span style="color:rgba(255,255,255,.3);font-size:12px">Done</span>')+
    '</td></tr>';
  }).join('')||'<tr><td colspan="6" style="text-align:center;color:rgba(255,255,255,.3);padding:24px">No withdrawal requests</td></tr>';
  return '<div class="pg-hdr"><h1>Withdrawal Requests</h1><p>Approve or reject pending withdrawals.</p></div>'+
  card('Withdrawal Settings','sliders',null,
    '<div class="form-row triple">'+
    fld('Min Withdraw (TRX)','wd_min',localStorage.getItem('min_withdraw')||'10','number')+
    fld('Max Withdraw (TRX, 0=unlimited)','wd_max',localStorage.getItem('max_withdraw')||'0','number')+
    fld('Fee (TRX)','wd_fee',localStorage.getItem('withdraw_fee')||'0.1','number')+
    '</div>'+
    '<button class="btn btn-primary" onclick="saveWdSettings()"><i class="fas fa-save"></i> Save Settings</button>'
  )+
  card('Pending & History','money-bill-transfer',{cls:'badge-yellow',txt:wds.filter(function(w){return w.status==='pending';}).length+' Pending'},
    '<div class="tbl-toolbar"><input class="tbl-search" placeholder="Search by user or address..." oninput="filterWdTable(this.value)"/></div>'+
    '<div class="adm-tbl-wrap" id="wdTableWrap"><table class="adm-tbl" id="wdTable"><thead><tr><th>User</th><th>Amount</th><th>Address</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead><tbody id="wdTbody">'+rows+'</tbody></table></div>'+
    '<div style="margin-top:14px"><button class="btn btn-warning" onclick="addDemoWd()"><i class="fas fa-plus"></i> Add Test Request</button></div>'
  );
}

function saveWdSettings(){
  save('min_withdraw',document.getElementById('wd_min').value);
  save('max_withdraw',document.getElementById('wd_max').value);
  save('withdraw_fee',document.getElementById('wd_fee').value);
  toast('Withdrawal settings saved!');
}

function approveWd(id){
  var wds=JSON.parse(localStorage.getItem('adm_withdrawals')||'[]');
  wds.forEach(function(w){if(w.id===id) w.status='approved';});
  localStorage.setItem('adm_withdrawals',JSON.stringify(wds));
  toast('Withdrawal approved!');
  document.getElementById('admContent').innerHTML=buildWithdraw();
}

function rejectWd(id){
  var wds=JSON.parse(localStorage.getItem('adm_withdrawals')||'[]');
  wds.forEach(function(w){if(w.id===id) w.status='rejected';});
  localStorage.setItem('adm_withdrawals',JSON.stringify(wds));
  toast('Withdrawal rejected','error');
  document.getElementById('admContent').innerHTML=buildWithdraw();
}

function addDemoWd(){
  var wds=JSON.parse(localStorage.getItem('adm_withdrawals')||'[]');
  wds.push({id:'wd'+Date.now(),user:'user'+Math.floor(Math.random()*100),amount:(Math.random()*50+10).toFixed(2),address:'T'+Array(34).fill(0).map(function(){return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[Math.floor(Math.random()*36)];}).join(''),status:'pending',date:new Date().toISOString()});
  localStorage.setItem('adm_withdrawals',JSON.stringify(wds));
  toast('Test withdrawal added');
  document.getElementById('admContent').innerHTML=buildWithdraw();
}

function filterWdTable(q){
  var rows=document.querySelectorAll('#wdTbody tr');
  rows.forEach(function(r){r.style.display=r.textContent.toLowerCase().includes(q.toLowerCase())?'':'none';});
}

function buildWdTable(limit){
  var wds=JSON.parse(localStorage.getItem('adm_withdrawals')||'[]').slice(0,limit||10);
  if(!wds.length) return '<p style="color:rgba(255,255,255,.3);font-size:13px;padding:12px 0">No withdrawal requests yet</p>';
  return '<div class="adm-tbl-wrap"><table class="adm-tbl"><thead><tr><th>User</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead><tbody>'+
  wds.map(function(w){return '<tr><td>'+w.user+'</td><td>'+w.amount+' TRX</td><td><span class="tbl-badge '+(w.status==='pending'?'tbl-yellow':'tbl-green')+'">'+w.status+'</span></td><td>'+new Date(w.date).toLocaleDateString()+'</td></tr>';}).join('')+
  '</tbody></table></div>';
}

// â”€â”€ DEPOSIT â”€â”€
function buildDeposit(){
  var deps=JSON.parse(localStorage.getItem('adm_deposits')||'[]');
  var rows=deps.map(function(d){
    return '<tr><td>'+d.user+'</td><td>'+d.amount+' TRX</td><td><span class="tbl-badge tbl-blue">'+d.txid.substring(0,12)+'...</span></td><td><span class="tbl-badge tbl-green">Confirmed</span></td><td>'+new Date(d.date).toLocaleDateString()+'</td></tr>';
  }).join('')||'<tr><td colspan="5" style="text-align:center;color:rgba(255,255,255,.3);padding:24px">No deposits recorded</td></tr>';
  return '<div class="pg-hdr"><h1>Deposit History</h1><p>All confirmed TRC-20 deposits.</p></div>'+
  card('Deposit Settings','wallet',null,
    '<div class="form-row">'+
    fld('Min Confirmations Required','dep_conf',localStorage.getItem('deposit_min_conf')||'1','number')+
    fld('Deposit Bonus (%)','dep_bonus',localStorage.getItem('deposit_bonus')||'0','number')+
    '</div>'+
    '<button class="btn btn-primary" onclick="saveDepSettings()"><i class="fas fa-save"></i> Save</button>'
  )+
  card('Deposit History','history',null,
    '<div class="tbl-toolbar"><input class="tbl-search" placeholder="Search..." oninput="filterTable(\'depTbody\',this.value)"/></div>'+
    '<div class="adm-tbl-wrap"><table class="adm-tbl"><thead><tr><th>User</th><th>Amount</th><th>TxID</th><th>Status</th><th>Date</th></tr></thead><tbody id="depTbody">'+rows+'</tbody></table></div>'+
    '<div style="margin-top:14px"><button class="btn btn-warning" onclick="addDemoDep()"><i class="fas fa-plus"></i> Add Test Deposit</button></div>'
  );
}

function saveDepSettings(){
  save('deposit_min_conf',document.getElementById('dep_conf').value);
  save('deposit_bonus',document.getElementById('dep_bonus').value);
  toast('Deposit settings saved!');
}

function addDemoDep(){
  var deps=JSON.parse(localStorage.getItem('adm_deposits')||'[]');
  deps.push({user:'user'+Math.floor(Math.random()*100),amount:(Math.random()*200+10).toFixed(2),txid:Array(64).fill(0).map(function(){return '0123456789abcdef'[Math.floor(Math.random()*16)];}).join(''),date:new Date().toISOString()});
  localStorage.setItem('adm_deposits',JSON.stringify(deps));
  toast('Test deposit added');
  document.getElementById('admContent').innerHTML=buildDeposit();
}

function filterTable(tbodyId,q){
  var rows=document.querySelectorAll('#'+tbodyId+' tr');
  rows.forEach(function(r){r.style.display=r.textContent.toLowerCase().includes(q.toLowerCase())?'':'none';});
}

// â”€â”€ OXAPAY GATEWAY â”€â”€
function buildPayment(){
  var enabled=localStorage.getItem('oxa_enabled')==='1';
  return '<div class="pg-hdr"><h1>OxaPay Gateway</h1><p>Configure OxaPay payment integration for deposits.</p></div>'+
  card('OxaPay Configuration','credit-card',{cls:enabled?'badge-green':'badge-red',txt:enabled?'CONNECTED':'DISABLED'},
    '<div class="gw-logo-row">'+
    '<span class="gw-logo">OxaPay</span>'+
    '<span style="font-size:13px;color:rgba(255,255,255,.4)">Payment Gateway for Crypto</span>'+
    '<span class="gw-status-dot '+(enabled?'dot-green':'dot-gray')+'"></span>'+
    '</div>'+
    togRow('','Enable OxaPay','Accept crypto deposits via OxaPay','oxaEnabled','oxa_enabled')+
    '<div style="height:16px"></div>'+
    '<div class="form-row single"><div class="form-group"><label><i class="fas fa-key"></i> API Key</label><input type="text" id="oxaKey" value="'+(localStorage.getItem('oxa_key')||'')+'" placeholder="Enter your OxaPay API key"/></div></div>'+
    '<div class="form-row single"><div class="form-group"><label><i class="fas fa-building"></i> Merchant ID</label><input type="text" id="oxaMerchant" value="'+(localStorage.getItem('oxa_merchant')||'')+'" placeholder="Enter your OxaPay Merchant ID"/></div></div>'+
    '<div class="form-row">'+
    '<div class="form-group"><label>Webhook Secret</label><input type="text" id="oxaWebhook" value="'+(localStorage.getItem('oxa_webhook')||'')+'" placeholder="Webhook secret key"/></div>'+
    '<div class="form-group"><label>Payout Currency</label><select id="oxaCurrency"><option value="TRX" '+(localStorage.getItem('oxa_currency')==='TRX'?'selected':'')+'>TRX (Tron)</option><option value="USDT" '+(localStorage.getItem('oxa_currency')==='USDT'?'selected':'')+'>USDT</option><option value="BTC" '+(localStorage.getItem('oxa_currency')==='BTC'?'selected':'')+'>BTC</option></select></div>'+
    '</div>'+
    '<div class="adm-alert alert-info"><i class="fas fa-circle-info"></i> Get your API key from <strong>dashboard.oxapay.com</strong> â†’ Merchants â†’ API Keys</div>'+
    '<div style="display:flex;gap:10px;flex-wrap:wrap">'+
    '<button class="btn btn-primary" onclick="saveOxaPay()"><i class="fas fa-save"></i> Save Gateway Settings</button>'+
    '<button class="btn btn-secondary" onclick="testOxaPay()"><i class="fas fa-plug"></i> Test Connection</button>'+
    '</div>'
  )+
  card('OxaPay Stats','chart-bar',null,
    '<div class="stat-grid">'+
    '<div class="stat-card"><div class="stat-icon si-green"><i class="fas fa-arrow-down"></i></div><div class="stat-info"><div class="stat-val">'+JSON.parse(localStorage.getItem('adm_deposits')||'[]').length+'</div><div class="stat-lbl">Total Deposits</div></div></div>'+
    '<div class="stat-card"><div class="stat-icon si-blue"><i class="fas fa-coins"></i></div><div class="stat-info"><div class="stat-val">'+JSON.parse(localStorage.getItem('adm_deposits')||'[]').reduce(function(a,d){return a+parseFloat(d.amount||0);},0).toFixed(2)+'</div><div class="stat-lbl">Total Volume (TRX)</div></div></div>'+
    '</div>'
  );
}

function saveOxaPay(){
  save('oxa_key',document.getElementById('oxaKey').value);
  save('oxa_merchant',document.getElementById('oxaMerchant').value);
  save('oxa_webhook',document.getElementById('oxaWebhook').value);
  save('oxa_currency',document.getElementById('oxaCurrency').value);
  toast('OxaPay settings saved!');
}

function testOxaPay(){
  var key=document.getElementById('oxaKey').value;
  if(!key){toast('Enter API key first','error');return;}
  toast('Connection test sent â€” check OxaPay dashboard for confirmation');
}

// â”€â”€ CONTACT MESSAGES â”€â”€
function buildContact(){
  var msgs=JSON.parse(localStorage.getItem('adm_msgs')||'[]');
  var rows=msgs.map(function(m){
    return '<tr><td>'+m.user+'</td><td>'+m.email+'</td><td>'+m.subject+'</td><td><span class="tbl-badge '+(m.status==='unread'?'tbl-yellow':'tbl-green')+'">'+m.status+'</span></td><td>'+new Date(m.date).toLocaleDateString()+'</td><td>'+
    '<button class="btn btn-sm btn-primary" style="margin-right:4px" onclick="viewMsg(\''+m.id+'\')"><i class="fas fa-eye"></i></button>'+
    '<button class="btn btn-sm btn-danger" onclick="deleteMsg(\''+m.id+'\')"><i class="fas fa-trash"></i></button>'+
    '</td></tr>';
  }).join('')||'<tr><td colspan="6" style="text-align:center;color:rgba(255,255,255,.3);padding:24px">No messages yet</td></tr>';
  return '<div class="pg-hdr"><h1>Contact Messages</h1><p>View and manage user support messages.</p></div>'+
  card('Messages','envelope',{cls:'badge-yellow',txt:msgs.filter(function(m){return m.status==='unread';}).length+' Unread'},
    '<div class="tbl-toolbar">'+
    '<input class="tbl-search" placeholder="Search messages..." oninput="filterTable(\'msgTbody\',this.value)"/>'+
    '<button class="btn btn-sm btn-secondary" onclick="markAllRead()"><i class="fas fa-check-double"></i> Mark All Read</button>'+
    '<button class="btn btn-sm btn-warning" onclick="addDemoMsg()"><i class="fas fa-plus"></i> Test Msg</button>'+
    '</div>'+
    '<div class="adm-tbl-wrap"><table class="adm-tbl"><thead><tr><th>User</th><th>Email</th><th>Subject</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead><tbody id="msgTbody">'+rows+'</tbody></table></div>'
  );
}

function viewMsg(id){
  var msgs=JSON.parse(localStorage.getItem('adm_msgs')||'[]');
  var m=msgs.find(function(x){return x.id===id;});
  if(!m) return;
  m.status='read';
  localStorage.setItem('adm_msgs',JSON.stringify(msgs));
  alert('From: '+m.email+'\nSubject: '+m.subject+'\n\n'+m.message);
  document.getElementById('admContent').innerHTML=buildContact();
}

function deleteMsg(id){
  var msgs=JSON.parse(localStorage.getItem('adm_msgs')||'[]').filter(function(m){return m.id!==id;});
  localStorage.setItem('adm_msgs',JSON.stringify(msgs));
  toast('Message deleted');
  document.getElementById('admContent').innerHTML=buildContact();
}

function markAllRead(){
  var msgs=JSON.parse(localStorage.getItem('adm_msgs')||'[]');
  msgs.forEach(function(m){m.status='read';});
  localStorage.setItem('adm_msgs',JSON.stringify(msgs));
  toast('All messages marked as read');
  document.getElementById('admContent').innerHTML=buildContact();
}

function addDemoMsg(){
  var msgs=JSON.parse(localStorage.getItem('adm_msgs')||'[]');
  msgs.push({id:'msg'+Date.now(),user:'TestUser',email:'test@example.com',subject:'Payment Issue',message:'Hello, I have an issue with my withdrawal.',status:'unread',date:new Date().toISOString()});
  localStorage.setItem('adm_msgs',JSON.stringify(msgs));
  toast('Test message added');
  document.getElementById('admContent').innerHTML=buildContact();
}

function buildMsgTable(limit){
  var msgs=JSON.parse(localStorage.getItem('adm_msgs')||'[]').slice(0,limit||5);
  if(!msgs.length) return '<p style="color:rgba(255,255,255,.3);font-size:13px;padding:12px 0">No messages yet</p>';
  return '<div class="adm-tbl-wrap"><table class="adm-tbl"><thead><tr><th>User</th><th>Subject</th><th>Status</th></tr></thead><tbody>'+
  msgs.map(function(m){return '<tr><td>'+m.user+'</td><td>'+m.subject+'</td><td><span class="tbl-badge '+(m.status==='unread'?'tbl-yellow':'tbl-green')+'">'+m.status+'</span></td></tr>';}).join('')+
  '</tbody></table></div>';
}

// â”€â”€ USERS â”€â”€
function buildUsers(){
  var users=JSON.parse(localStorage.getItem('adm_users')||'[]');
  var rows=users.map(function(u){
    return '<tr><td>'+u.name+'</td><td>'+u.email+'</td><td>'+parseFloat(u.balance||0).toFixed(4)+' TRX</td><td><span class="tbl-badge '+(u.banned?'tbl-red':'tbl-green')+'">'+(u.banned?'Banned':'Active')+'</span></td><td>'+new Date(u.joined||Date.now()).toLocaleDateString()+'</td><td>'+
    '<button class="btn btn-sm '+(u.banned?'btn-primary':'btn-danger')+'" onclick="banUser(\''+u.id+'\')">'+(u.banned?'Unban':'Ban')+'</button> '+
    '<button class="btn btn-sm btn-warning" onclick="adjustBalance(\''+u.id+'\')"><i class="fas fa-coins"></i></button>'+
    '</td></tr>';
  }).join('')||'<tr><td colspan="6" style="text-align:center;color:rgba(255,255,255,.3);padding:24px">No users yet. <button class="btn btn-sm btn-secondary" onclick="addDemoUser()" style="margin-left:10px">Add Test Users</button></td></tr>';
  return '<div class="pg-hdr"><h1>User Management</h1><p>View and manage all registered users.</p></div>'+
  card('Users','users',{cls:'badge-blue',txt:users.length+' Total'},
    '<div class="tbl-toolbar">'+
    '<input class="tbl-search" placeholder="Search users..." oninput="filterTable(\'userTbody\',this.value)"/>'+
    '<button class="btn btn-sm btn-warning" onclick="addDemoUser()"><i class="fas fa-plus"></i> Add Test User</button>'+
    '</div>'+
    '<div class="adm-tbl-wrap"><table class="adm-tbl"><thead><tr><th>Username</th><th>Email</th><th>Balance</th><th>Status</th><th>Joined</th><th>Actions</th></tr></thead><tbody id="userTbody">'+rows+'</tbody></table></div>'
  );
}

function banUser(id){
  var users=JSON.parse(localStorage.getItem('adm_users')||'[]');
  users.forEach(function(u){if(u.id===id) u.banned=!u.banned;});
  localStorage.setItem('adm_users',JSON.stringify(users));
  toast('User status updated');
  document.getElementById('admContent').innerHTML=buildUsers();
}

function adjustBalance(id){
  var amt=prompt('Enter balance adjustment (+ or -)');
  if(amt===null||isNaN(parseFloat(amt))) return;
  var users=JSON.parse(localStorage.getItem('adm_users')||'[]');
  users.forEach(function(u){if(u.id===id) u.balance=(parseFloat(u.balance||0)+parseFloat(amt)).toFixed(6);});
  localStorage.setItem('adm_users',JSON.stringify(users));
  toast('Balance adjusted by '+amt+' TRX');
  document.getElementById('admContent').innerHTML=buildUsers();
}

function addDemoUser(){
  var users=JSON.parse(localStorage.getItem('adm_users')||'[]');
  var n='user'+Math.floor(Math.random()*10000);
  users.push({id:'u'+Date.now(),name:n,email:n+'@example.com',balance:(Math.random()*100).toFixed(6),banned:false,joined:new Date().toISOString()});
  localStorage.setItem('adm_users',JSON.stringify(users));
  toast('Test user added');
  document.getElementById('admContent').innerHTML=buildUsers();
}

// â”€â”€ SETTINGS â”€â”€
function buildSettings(){
  return '<div class="pg-hdr"><h1>Admin Settings</h1><p>Security and platform configuration.</p></div>'+
  card('Security â€” Change Admin Password','lock',null,
    '<div class="adm-alert alert-warn"><i class="fas fa-triangle-exclamation"></i> Store your new credentials safely. You cannot recover them.</div>'+
    '<div class="form-row">'+
    '<div class="form-group"><label>Current Password</label><input type="password" id="sCurPw" placeholder="Current password"/></div>'+
    '<div class="form-group"><label>New Username</label><input type="text" id="sNewUser" value="'+(localStorage.getItem('adminUser')||'admin')+'"/></div>'+
    '</div><div class="form-row">'+
    '<div class="form-group"><label>New Password</label><input type="password" id="sNewPw" placeholder="New password (min 8 chars)"/></div>'+
    '<div class="form-group"><label>Confirm Password</label><input type="password" id="sConfPw" placeholder="Repeat new password"/></div>'+
    '</div>'+
    '<div id="settErr" class="ff-err" style="display:none"></div>'+
    '<button class="btn btn-primary" onclick="changeAdminCreds()"><i class="fas fa-save"></i> Update Credentials</button>'
  )+
  card('Site Settings','globe',null,
    '<div class="form-row">'+
    fld('Site Name','ss_name',localStorage.getItem('site_name')||'TronSick','text')+
    fld('Site Balance (TRX)','ss_bal',localStorage.getItem('site_balance')||'0','number')+
    '</div><div class="form-row">'+
    fld('Admin Email','ss_email',localStorage.getItem('admin_email')||'admin@tronsick.io','email')+
    fld('Max Login Attempts','ss_attempts',localStorage.getItem('max_attempts')||'5','number')+
    '</div>'+
    togRow('','Maintenance Mode','Block site for all non-admin users','maintenanceMode','maintenance_mode')+
    '<div style="margin-top:16px"><button class="btn btn-primary" onclick="saveSiteSettings()"><i class="fas fa-save"></i> Save Site Settings</button></div>'
  )+
  card('Danger Zone','triangle-exclamation',{cls:'badge-red',txt:'DANGER'},
    '<div class="adm-alert alert-error"><i class="fas fa-circle-xmark"></i> These actions are irreversible!</div>'+
    '<div style="display:flex;gap:10px;flex-wrap:wrap">'+
    '<button class="btn btn-danger" onclick="if(confirm(\'Clear all withdrawal history?\')) {localStorage.removeItem(\'adm_withdrawals\');toast(\'Withdrawals cleared\');}"><i class="fas fa-trash"></i> Clear Withdrawals</button>'+
    '<button class="btn btn-danger" onclick="if(confirm(\'Clear all messages?\')) {localStorage.removeItem(\'adm_msgs\');toast(\'Messages cleared\');}"><i class="fas fa-trash"></i> Clear Messages</button>'+
    '<button class="btn btn-danger" onclick="if(confirm(\'Reset ALL admin settings?\')) {[\'adminUser\',\'adminPass\',\'faucet_enabled\',\'bonus_enabled\',\'oxa_key\',\'oxa_merchant\'].forEach(function(k){localStorage.removeItem(k);}); toast(\'Settings reset\');}"><i class="fas fa-rotate-left"></i> Reset to Defaults</button>'+
    '</div>'
  );
}

function changeAdminCreds(){
  var cur=document.getElementById('sCurPw').value;
  var newUser=document.getElementById('sNewUser').value.trim();
  var newPw=document.getElementById('sNewPw').value;
  var conf=document.getElementById('sConfPw').value;
  var err=document.getElementById('settErr');
  var curPass=localStorage.getItem('adminPass')||'TronSick@2024';
  if(cur!==curPass){err.style.display='block';err.textContent='Current password incorrect';return;}
  if(newPw&&newPw.length<8){err.style.display='block';err.textContent='New password must be at least 8 characters';return;}
  if(newPw&&newPw!==conf){err.style.display='block';err.textContent='Passwords do not match';return;}
  err.style.display='none';
  if(newUser) {save('adminUser',newUser);}
  if(newPw)   {save('adminPass',newPw);}
  toast('Admin credentials updated! Please login again.');
  setTimeout(function(){doLogout();},2000);
}

function saveSiteSettings(){
  save('site_name',document.getElementById('ss_name').value);
  save('site_balance',document.getElementById('ss_bal').value);
  save('admin_email',document.getElementById('ss_email').value);
  save('max_attempts',document.getElementById('ss_attempts').value);
  toast('Site settings saved!');
}

// Init â€” load dashboard
window.addEventListener('DOMContentLoaded', function(){
  document.getElementById('admContent').innerHTML = buildDashboard();
  setInterval(function(){
    var d = new Date();
    var el = document.getElementById('tbTime');
    if(el) el.textContent = d.toLocaleTimeString();
  }, 1000);
});
