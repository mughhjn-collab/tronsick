// TronSick Admin Panel v2.2 — 2026-05-31T14:57:19.268Z — 2026-05-31 06:44

// Auth guard — redirect to staff login (NOT /admin/ which is blocked)
(function(){
  var auth = localStorage.getItem('adminAuth');
  var authTime = parseInt(localStorage.getItem('adminAuthTime') || '0');
  if(!auth || !authTime || (Date.now() - authTime) > 8 * 3600000){
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminAuthTime');
    window.location.href = '/panel-login.php';
  }
})();

// State
var S={
  users:(function(){
    var a=JSON.parse(localStorage.getItem('adm_users')||'[]');
    var b=JSON.parse(localStorage.getItem('site_registered_users')||'[]');
    b.forEach(function(u){if(!a.find(function(x){return x.name===u.name;}))a.push(u);});
    return a;
  })(),
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
  oxaKey:localStorage.getItem('oxa_key')||'B5CXIY-CK6Z0Y-NKKTI7-JR6C1N',
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
  bonusPayouts:{range1:0.005,range2:0.15,range3:1.5,range4:15,range5:150,jackpot:1500},
  ab1On:localStorage.getItem('ab1_on')==='1',
  ab1Mode:localStorage.getItem('ab1_mode')||'medium',
  ab1Amount:parseFloat(localStorage.getItem('ab1_amount')||'0'),
  ab2On:localStorage.getItem('ab2_on')==='1',
  ab2Amount:parseFloat(localStorage.getItem('ab2_amount')||'0'),
  ab2Wins:parseInt(localStorage.getItem('ab2_wins')||'6'),
  ab3On:localStorage.getItem('ab3_on')==='1'
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
  settings: buildSettings,
  payout_gen: buildPayoutGen,
  contest_gen: buildContestGen,
  fake_check: buildFakeCheck
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
  if(sec==='games' && window.SiteSync){
    SiteSync.loadAntibot(function(){
      document.getElementById('admContent').innerHTML=buildGames();
    });
  } else if(sec==='payout_gen'){
    document.getElementById('admContent').innerHTML=buildPayoutGen();
  } else {
    document.getElementById('admContent').innerHTML=SECTIONS[sec]?SECTIONS[sec]():'';
    if(sec==='contest') setTimeout(function(){ buildAdmContestLb(); }, 50);
  }
  if(sec==='dashboard') refreshServerUserCount();
  if(sec==='users') refreshServerUsers();
}

function doLogout(){
  // Clear ALL admin session keys — NEVER touch user session keys
  ['adminAuth','adminAuthTime','adminUser','adminLastLogin'].forEach(function(k){
    localStorage.removeItem(k);
  });
  window.location.href = '/panel-login.php';
}

function refreshServerUsers(){
  if(!window.SiteSync){ rebuildUserTable(); return; }
  SiteSync.getUsers(function(r){
    if(r && r.users && r.users.length > 0){
      // Merge server users with local
      var serverUsers = r.users;
      var localUsers = JSON.parse(localStorage.getItem('adm_users')||'[]');
      serverUsers.forEach(function(su){
        if(!localUsers.find(function(lu){return lu.name===su.name||lu.id===su.id;})){
          localUsers.push(su);
        }
      });
      S.users = localUsers;
      localStorage.setItem('adm_users', JSON.stringify(localUsers));
    }
    rebuildUserTable();
  });
}

function rebuildUserTable(){
  var tbody = document.getElementById('userTbody');
  if(!tbody) return;
  var users = JSON.parse(localStorage.getItem('adm_users')||'[]');
  if(!users.length){ tbody.innerHTML='<tr><td colspan="6" style="text-align:center;color:rgba(255,255,255,.3);padding:24px">No registered users yet.</td></tr>'; return; }
  tbody.innerHTML = users.map(function(u){
    return '<tr>'+
    '<td><strong>'+u.name+'</strong></td>'+
    '<td style="color:rgba(255,255,255,.6)">'+(u.email||'-')+'</td>'+
    '<td style="color:#3ecf8e;font-weight:700">'+parseFloat(u.balance||0).toFixed(4)+' TRX</td>'+
    '<td><span class="tbl-badge '+(u.banned?'tbl-red':'tbl-green')+'">'+(u.banned?'🔴 Banned':'🟢 Active')+'</span></td>'+
    '<td>'+new Date(u.joined||Date.now()).toLocaleDateString()+'</td>'+
    '<td style="white-space:nowrap">'+
    '<button class="btn btn-sm btn-primary" onclick="editUserModal(\'' + u.id + '\')"><i class="fas fa-edit"></i> Edit</button> '+
    '<button class="btn btn-sm '+(u.banned?'btn-success':'btn-danger')+'" onclick="banUser(\'' + u.id + '\')"><i class="fas fa-'+(u.banned?'unlock':'ban')+'"></i> '+(u.banned?'Unban':'Ban')+'</button>'+
    '</td></tr>';
  }).join('');
  // Update count badge
  var badge = document.querySelector('.badge-blue');
  if(badge) badge.textContent = users.length + ' Total';
}

function save(key,val){
  localStorage.setItem(key,val);
  if(window.SiteSync) SiteSync.queueSetting(key,val);
}

function saveLiveToast(msg, cb){
  if(window.SiteSync){
    SiteSync.flushSettings(function(r){
      toast(msg+(r&&r.ok?' ✓ Live on site!':' (saved locally)'), r&&r.ok?'success':'error');
      if(cb) cb(r);
    });
  } else toast(msg);
}

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
  saveLiveToast((stateKey.replace(/([A-Z])/g,' $1'))+' updated');
}

function fld(label,id,val,type,extra){
  return '<div class="form-group"><label>'+label+'</label><input type="'+(type||'text')+'" id="'+id+'" value="'+val+'" '+(extra||'')+'/></div>';
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
  saveLiveToast('Maintenance mode '+(S.maintenanceMode?'ENABLED':'DISABLED'), function(){
    document.getElementById('admContent').innerHTML=buildDashboard();
  });
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
  saveLiveToast('Faucet settings saved');
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
  saveLiveToast('Bonus settings saved');
}

// -- GAMES + 3 ANTIBOT SYSTEM --
function buildGames(){
  var he=parseFloat(localStorage.getItem('game_house_edge')||'1');
  var games=['Dice','Limbo','Wheel','Mines','Sic Bo','Diamond','Tower','Coin Flip'];
  var rows=games.map(function(g){var key='game_win_'+g.toLowerCase().replace(/ /g,'');var wr=parseFloat(localStorage.getItem(key)||'49');return '<div class="toggle-row"><div class="toggle-info"><strong>'+g+'</strong><span>Win Rate: '+wr+'%</span></div><div style="display:flex;align-items:center;gap:10px"><input type="range" min="1" max="95" value="'+wr+'" style="width:100px;accent-color:#3ecf8e" oninput="updateGameRate(this,\''+key+'\')" id="gwr_'+key+'"/><span id="gwrv_'+key+'" style="min-width:40px;font-size:13px;font-weight:700;color:#3ecf8e">'+wr+'%</span></div></div>';}).join('');
  var ab1On=localStorage.getItem('ab1_on')==='1';var ab1Mode=localStorage.getItem('ab1_mode')||'medium';var ab1Amt=localStorage.getItem('ab1_amount')||'';
  var ab2On=localStorage.getItem('ab2_on')==='1';var ab2Amt=localStorage.getItem('ab2_amount')||'';var ab2Wins=parseInt(localStorage.getItem('ab2_wins')||'6');
  var ab3On=localStorage.getItem('ab3_on')==='1';
  var ss='background:#0f1520;color:#fff;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:10px 14px;font-size:13px;width:100%';
  var winOpts=[4,5,6,7,8,9,10].map(function(n){return '<option value="'+n+'" '+(ab2Wins===n?'selected':'')+'>'+n+' wins then 1 loss</option>';}).join('');
  return '<div class="pg-hdr"><h1>Games & Antibot Control</h1><p>Manage win rates and antibot systems for all games.</p></div>'+
  card('Global House Edge','sliders',null,'<div class="form-row"><div class="form-group"><label>House Edge (%)</label><input type="number" id="gHouseEdge" value="'+he+'" min="0" max="50" step="0.1"/></div></div><button class="btn btn-primary" onclick="saveHouseEdge()"><i class="fas fa-save"></i> Save</button>')+
  card('Per-Game Win Rate','gamepad',null,'<div class="adm-alert alert-warn"><i class="fas fa-triangle-exclamation"></i> Changing win rates affects fairness.</div>'+rows+'<div style="margin-top:16px"><button class="btn btn-primary" onclick="saveGameRates()"><i class="fas fa-save"></i> Save All Rates</button></div>')+
  card('Antibot 1 - Amount-Based Loss Control','robot',{cls:ab1On?'badge-green':'badge-red',txt:ab1On?'ACTIVE':'OFF'},'<div class="adm-alert alert-warn"><i class="fas fa-circle-info"></i> Works on Dice, Limbo, Mines. When user bets set amount:<br><b>Medium:</b> Normal first, then more losses with some wins.<br><b>Hard:</b> Continuous losses only.<br><em>Special: If AB2 ON and win chance 96%-65% → AB2 overrides. Below 65%: AB1 works.</em></div><div class="toggle-row"><div class="toggle-info"><strong>Enable Antibot 1</strong><span>Amount-based loss control</span></div><label class="toggle-sw"><input type="checkbox" id="ab1Check" '+(ab1On?'checked':'')+' onchange="abToggle(1,this.checked)"><span class="slider"></span></label></div><div class="form-row" style="margin-top:14px"><div class="form-group"><label>Trigger Bet Amount (TRX)</label><input type="number" id="ab1Amount" value="'+ab1Amt+'" step="0.000001" min="0" placeholder="e.g. 0.001"/></div><div class="form-group"><label>Mode</label><select id="ab1Mode" style="'+ss+'"><option value="medium" '+(ab1Mode==="medium"?'selected':'')+'>Medium - More losses, some wins</option><option value="hard" '+(ab1Mode==="hard"?'selected':'')+'>Hard - Continuous losses only</option></select></div></div><button class="btn btn-primary" onclick="saveAb1()"><i class="fas fa-save"></i> Save Antibot 1</button>')+
  card('Antibot 2 - High Win Chance Pattern (96%-65%)','shield-halved',{cls:ab2On?'badge-green':'badge-red',txt:ab2On?'ACTIVE':'OFF'},'<div class="adm-alert alert-warn"><i class="fas fa-circle-info"></i> Works on Dice, Limbo, Mines. When user uses 96%-65% win chance AND bets set amount:<br><b>1st bet = LOSS</b> then N wins then 1 LOSS repeating. Below 65%: AB1 takes over.</div><div class="toggle-row"><div class="toggle-info"><strong>Enable Antibot 2</strong><span>Win chance pattern control</span></div><label class="toggle-sw"><input type="checkbox" id="ab2Check" '+(ab2On?'checked':'')+' onchange="abToggle(2,this.checked)"><span class="slider"></span></label></div><div class="form-row" style="margin-top:14px"><div class="form-group"><label>Trigger Bet Amount (TRX)</label><input type="number" id="ab2Amount" value="'+ab2Amt+'" step="0.000001" min="0" placeholder="e.g. 0.001"/></div><div class="form-group"><label>Wins Between Each Loss</label><select id="ab2Wins" style="'+ss+'">'+winOpts+'</select></div></div><button class="btn btn-primary" onclick="saveAb2()"><i class="fas fa-save"></i> Save Antibot 2</button>')+
  card('Antibot 3 - High Payout Cycles (4x to 9700x)','fire',{cls:ab3On?'badge-green':'badge-red',txt:ab3On?'ACTIVE':'OFF'},'<div class="adm-alert alert-warn"><i class="fas fa-circle-info"></i> Controls high-payout bets in Dice, Limbo.<br><b>4x:</b> 3 losses then 1 win then random 4 losses then 1 win.<br><b>5x:</b> 5 losses then 1 win then random 6-7 losses then 1 win.<br>Higher payout = more losses. If user increases bet after win: cycle resets from start.</div><div class="toggle-row"><div class="toggle-info"><strong>Enable Antibot 3</strong><span>High payout cycle control</span></div><label class="toggle-sw"><input type="checkbox" id="ab3Check" '+(ab3On?'checked':'')+' onchange="abToggle(3,this.checked)"><span class="slider"></span></label></div><div style="margin-top:14px"><button class="btn btn-primary" onclick="saveAb3()"><i class="fas fa-save"></i> Save Antibot 3</button></div>');
}
function abToggle(n,val){
  localStorage.setItem('ab'+n+'_on',val?'1':'0');
  var payload={};
  payload['ab'+n+'_on']=val?'1':'0';
  _syncAntibot(payload,'Antibot '+n+' '+(val?'ENABLED':'DISABLED'));
}
function _syncAntibot(payload,msg){
  if(window.SiteSync){
    SiteSync.saveAntibot(payload,function(r){
      if(r&&r.ok){
        toast(msg+' ✓ Live on site!','success');
      } else {
        toast((r&&r.error)?r.error:(msg+' — server save FAILED'),'error');
      }
    });
  } else toast(msg);
}
function saveAb1(){
  var on=document.getElementById('ab1Check').checked;
  var payload={ab1_on:on?'1':'0',ab1_amount:document.getElementById('ab1Amount').value,ab1_mode:document.getElementById('ab1Mode').value};
  localStorage.setItem('ab1_on',payload.ab1_on);
  localStorage.setItem('ab1_amount',payload.ab1_amount);
  localStorage.setItem('ab1_mode',payload.ab1_mode);
  _syncAntibot(payload,'Antibot 1 saved!');
}
function saveAb2(){
  var on=document.getElementById('ab2Check').checked;
  var payload={ab2_on:on?'1':'0',ab2_amount:document.getElementById('ab2Amount').value,ab2_wins:document.getElementById('ab2Wins').value};
  localStorage.setItem('ab2_on',payload.ab2_on);
  localStorage.setItem('ab2_amount',payload.ab2_amount);
  localStorage.setItem('ab2_wins',payload.ab2_wins);
  _syncAntibot(payload,'Antibot 2 saved!');
}
function saveAb3(){
  var on=document.getElementById('ab3Check').checked?'1':'0';
  localStorage.setItem('ab3_on',on);
  _syncAntibot({ab3_on:on},'Antibot 3 saved!');
}
function updateGameRate(el,key){var s=document.getElementById('gwrv_'+key);if(s)s.textContent=el.value+'%';}
function saveHouseEdge(){var v=document.getElementById('gHouseEdge').value;save('game_house_edge',v);S.gameHouseEdge=parseFloat(v);saveLiveToast('House edge saved');}
function saveGameRates(){['Dice','Limbo','Wheel','Mines','Sic Bo','Diamond','Tower','Coin Flip'].forEach(function(g){var key='game_win_'+g.toLowerCase().replace(/ /g,'');var el=document.getElementById('gwr_'+key);if(el)save(key,el.value);});saveLiveToast('Game rates saved');}

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
  card('Live Leaderboard','list-ol',null,
    '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px">'+
    '<button class="btn btn-danger" onclick="resetContestLeaderboard()"><i class="fas fa-trash"></i> Reset Leaderboard</button>'+
    '<button class="btn btn-warning" onclick="showSectionByKey(\'contest_gen\')"><i class="fas fa-trophy"></i> Contest Generator</button>'+
    '</div>'+
    '<div id=\"admCtLbWrap\"></div>'
  );
}


function resetContestLeaderboard(){
  if(!confirm('Clear ALL contest leaderboard entries on the live site?')) return;
  function done(){
    toast('Leaderboard reset! All wagers cleared on site.','success');
    document.getElementById('admContent').innerHTML = buildContest();
    setTimeout(function(){ buildAdmContestLb(); }, 80);
  }
  if(window.SiteSync){
    SiteSync.resetContest(function(r){ if(r&&r.ok) done(); else toast('Reset failed','error'); });
  } else {
    localStorage.removeItem('contest_wagers');
    done();
  }
}

function buildAdmContestLb(){
  var wrap = document.getElementById('admCtLbWrap');
  if(!wrap) return;
  wrap.innerHTML = '<p style="color:rgba(255,255,255,.3);padding:16px;font-size:13px">Loading leaderboard...</p>';
  function render(cw){
  cw = cw || {};
  var entries = Object.keys(cw).map(function(u){ return {name:u,wager:parseFloat(cw[u])||0}; });
  entries.sort(function(a,b){ return b.wager-a.wager; });
  if(!entries.length){
    wrap.innerHTML = '<p style="color:rgba(255,255,255,.3);padding:16px;font-size:13px">Leaderboard is empty.</p>';
    return;
  }
  var medals = [String.fromCodePoint(0x1F947),String.fromCodePoint(0x1F948),String.fromCodePoint(0x1F949)];
  var rows = entries.map(function(e,i){
    var medal = medals[i] || ('#'+(i+1));
    return '<tr><td>'+medal+'</td><td>'+e.name+'</td><td>'+e.wager.toFixed(3)+'</td>'+
    '<td><button class="btn btn-sm btn-danger" onclick="removeCtEntry(\'' + e.name + '\');buildAdmContestLb()"><i class="fas fa-trash"></i></button></td></tr>';
  }).join('');
  wrap.innerHTML = '<div class="adm-tbl-wrap"><table class="adm-tbl"><thead><tr><th>Rank</th><th>Username</th><th>Wagered (TRX)</th><th>Remove</th></tr></thead><tbody>' + rows + '</tbody></table></div>';
  }
  if(window.SiteSync){
    SiteSync.getContestWagers(function(r){ render(r.ok ? (r.wagers||{}) : {}); });
  } else {
    var cw={};
    try{ cw=JSON.parse(localStorage.getItem('contest_wagers')||'{}'); }catch(e){}
    render(cw);
  }
}

function refreshServerUserCount(){
  if(!window.SiteSync){ console.warn('SiteSync not loaded'); return; }
  if(!window.SiteSync) return;
  var el = document.querySelector('.stat-grid .stat-card .stat-val');
  if(el) el.textContent = '…';
  SiteSync.syncLocalUsers(function(){
    SiteSync.getUsers(function(r){
      if(!r||!r.ok){
        if(r&&r.error) toast('User count: '+r.error,'error');
        if(el) el.textContent = S.users.length;
        return;
      }
      S.users = r.users || [];
      if(el) el.textContent = r.count || S.users.length;
    });
  });
}

function saveContest(){
  save('contest_prize1',document.getElementById('cp1').value);
  save('contest_prize2',document.getElementById('cp2').value);
  save('contest_prize3',document.getElementById('cp3').value);
  save('contest_prize4',document.getElementById('cp4').value);
  save('contest_day',document.getElementById('cpDay').value);
  saveLiveToast('Contest settings saved');
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
  saveLiveToast('Cashback rates saved');
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
  saveLiveToast('Affiliate rates saved');
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
  saveLiveToast('Withdrawal settings saved');
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
  saveLiveToast('Deposit settings saved');
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
  if(!localStorage.getItem('oxa_key')){localStorage.setItem('oxa_key','B5CXIY-CK6Z0Y-NKKTI7-JR6C1N');localStorage.setItem('oxa_merchant','tronspin');localStorage.setItem('oxa_currency','TRX');localStorage.setItem('oxa_enabled','1');}
  var OXA_KEY=localStorage.getItem('oxa_key')||'B5CXIY-CK6Z0Y-NKKTI7-JR6C1N';
  var OXA_MER=localStorage.getItem('oxa_merchant')||'tronspin';
  var OXA_CUR=localStorage.getItem('oxa_currency')||'TRX';
  var WEBHOOK='https://tronsick.io/oxapay_webhook.php';
  var deps=JSON.parse(localStorage.getItem('adm_deposits')||'[]');
  var depVol=deps.reduce(function(a,d){return a+parseFloat(d.amount||0);},0).toFixed(2);
  return '<div class="pg-hdr"><h1>OxaPay Gateway</h1><p>TRX deposit integration — configured and ready.</p></div>'+
  card('OxaPay Configuration','credit-card',{cls:'badge-green',txt:'CONNECTED'},
    '<div class="gw-logo-row"><span class="gw-logo" style="font-size:20px;font-weight:900;color:#3ecf8e">OxaPay</span><span style="font-size:13px;color:rgba(255,255,255,.5)">Merchant: <strong style="color:#fff">tronspin</strong></span><span class="gw-status-dot dot-green"></span></div>'+
    togRow('','Enable OxaPay Deposits','Allow users to deposit TRX via OxaPay','oxaEnabled','oxa_enabled')+
    '<div style="height:12px"></div>'+
    '<div class="adm-alert" style="background:rgba(62,207,142,.08);border:1px solid rgba(62,207,142,.25);color:#3ecf8e;margin-bottom:14px"><i class="fas fa-circle-check"></i> <strong>API Key configured & active.</strong> Deposits auto-credited via webhook.</div>'+
    '<div class="form-row"><div class="form-group"><label><i class="fas fa-key"></i> Merchant API Key</label><div style="display:flex;gap:8px"><input type="text" id="oxaKey" value="'+OXA_KEY+'" style="font-family:monospace;font-size:12px"/><button class="btn btn-sm btn-secondary" onclick="var e=document.getElementById(\'oxaKey\');e.type=e.type===\'password\'?\'text\':\'password\'"><i class="fas fa-eye"></i></button></div></div><div class="form-group"><label><i class="fas fa-store"></i> Merchant Name</label><input type="text" id="oxaMerchant" value="'+OXA_MER+'"/></div></div>'+
    '<div class="form-group"><label><i class="fas fa-link"></i> Webhook URL <span style="font-size:11px;color:rgba(255,255,255,.4)">(Set in OxaPay → Merchant → Callback)</span></label><div style="display:flex;gap:8px"><input type="text" id="oxaWebhookUrl" value="'+WEBHOOK+'" readonly style="font-family:monospace;font-size:12px;color:#3ecf8e;background:#0a0f1a"/><button class="btn btn-sm btn-secondary" onclick="navigator.clipboard.writeText(\''+WEBHOOK+'\').then(function(){toast(\'Copied!\')})" title="Copy"><i class="fas fa-copy"></i></button></div></div>'+
    '<div class="form-row" style="margin-top:12px"><div class="form-group"><label>Currency</label><select id="oxaCurrency"><option value="TRX" '+(OXA_CUR==='TRX'?'selected':'')+'>TRX (Tron)</option><option value="USDT" '+(OXA_CUR==='USDT'?'selected':'')+'>USDT</option></select></div></div>'+
    '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px"><button class="btn btn-primary" onclick="saveOxaPay()"><i class="fas fa-save"></i> Save</button><button class="btn btn-secondary" onclick="saveOxaPayToServer()"><i class="fas fa-server"></i> Save to Server</button><button class="btn btn-success" onclick="testOxaPayLive()"><i class="fas fa-plug"></i> Test Connection</button></div>'
  )+
  card('Deposit Statistics','chart-bar',null,
    '<div class="stat-grid"><div class="stat-card"><div class="stat-icon si-green"><i class="fas fa-arrow-down"></i></div><div class="stat-info"><div class="stat-val">'+deps.length+'</div><div class="stat-lbl">Total Deposits</div></div></div><div class="stat-card"><div class="stat-icon si-blue"><i class="fas fa-coins"></i></div><div class="stat-info"><div class="stat-val">'+depVol+'</div><div class="stat-lbl">Volume (TRX)</div></div></div><div class="stat-card"><div class="stat-icon si-teal"><i class="fas fa-check-circle"></i></div><div class="stat-info"><div class="stat-val" style="color:#3ecf8e;font-size:14px">LIVE</div><div class="stat-lbl">Webhook</div></div></div></div>'
  )+
  card('Setup Guide','circle-info',null,
    '<div style="font-size:13px;line-height:2;color:rgba(255,255,255,.7)">'+
    '<p><span style="color:#3ecf8e;font-weight:700">Step 1 ✅</span> API Key <code style="background:rgba(255,255,255,.08);padding:2px 8px;border-radius:4px;font-family:monospace">B5CXIY-***</code> configured.</p>'+
    '<p><span style="color:#f59e0b;font-weight:700">Step 2 ⚠</span> Set Webhook URL in OxaPay:</p>'+
    '<div style="background:#0a0f1a;border:1px solid rgba(62,207,142,.2);border-radius:6px;padding:10px;font-family:monospace;font-size:12px;color:#3ecf8e;margin:4px 0">https://tronsick.io/oxapay_webhook.php</div>'+
    '<p style="font-size:12px;color:rgba(255,255,255,.4)">OxaPay Dashboard → Merchant Service → tronspin → Callback URL</p>'+
    '<p><span style="color:#3ecf8e;font-weight:700">Step 3 ✅</span> Users deposit → balance auto-credited within 30 seconds.</p>'+
    '</div>'
  );
}
function saveOxaPay(){
  save('oxa_key',document.getElementById('oxaKey').value);
  save('oxa_merchant',document.getElementById('oxaMerchant').value);
  save('oxa_currency',document.getElementById('oxaCurrency').value);
  save('oxa_enabled','1');
  saveLiveToast('OxaPay settings saved');
}
function saveOxaPayToServer(){
  var key=document.getElementById('oxaKey').value;
  var mer=document.getElementById('oxaMerchant').value;
  if(!key){toast('Enter API key first','error');return;}
  var fd=new FormData();
  fd.append('auth','TronSick@Admin2024');
  fd.append('oxa_key',key);
  fd.append('oxa_merchant',mer);
  fd.append('site_url','https://tronsick.io');
  fetch('/save_admin_keys.php',{method:'POST',body:fd})
    .then(function(r){return r.json();})
    .then(function(d){toast(d.ok?'Saved to server!':('Error: '+(d.error||'?')),d.ok?'success':'error');})
    .catch(function(){toast('Server unreachable','error');});
}
function testOxaPayLive(){
  toast('Testing OxaPay connection...');
  fetch('/oxapay_deposit.php?user=admintest&email=admin@tronsick.io')
    .then(function(r){return r.json();})
    .then(function(d){if(d.success)toast('Connected! Address: '+d.address.substr(0,14)+'...');else toast('Error: '+(d.error||'Failed'),'error');})
    .catch(function(){toast('Cannot reach API','error');});
}

// â”€â”€ CONTACT MESSAGES â”€â”€
function buildContact(){
  var msgs=JSON.parse(localStorage.getItem('adm_msgs')||'[]');
  var unread=msgs.filter(function(m){return m.status==='unread';}).length;
  var rows=msgs.map(function(m){
    var replies=m.replies?m.replies.length:0;
    return '<tr id="msgrow_'+m.id+'" style="cursor:pointer" onclick="openMsgModal(\''+m.id+'\')">'+
    '<td><strong style="color:#fff">'+m.user+'</strong></td>'+
    '<td style="color:rgba(255,255,255,.6)">'+m.email+'</td>'+
    '<td style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+m.subject+'</td>'+
    '<td><span class="tbl-badge '+(m.status==='unread'?'tbl-yellow':m.status==='replied'?'tbl-blue':'tbl-green')+'">'+m.status+'</span></td>'+
    '<td style="color:rgba(255,255,255,.4)">'+new Date(m.date).toLocaleDateString()+'</td>'+
    '<td onclick="event.stopPropagation()">'+
    '<button class="btn btn-sm btn-primary" style="margin-right:4px" onclick="openMsgModal(\''+m.id+'\')"><i class="fas fa-envelope-open-text"></i> View</button>'+
    '<button class="btn btn-sm btn-danger" onclick="deleteMsg(\''+m.id+'\')"><i class="fas fa-trash"></i></button>'+
    '</td></tr>';
  }).join('')||'<tr><td colspan="6" style="text-align:center;color:rgba(255,255,255,.3);padding:28px"><i class="fas fa-inbox" style="font-size:24px;margin-bottom:8px;display:block"></i>No messages yet</td></tr>';

  return '<div class="pg-hdr"><h1>Contact Messages</h1><p>View and reply to user support messages.</p></div>'+
  card('Messages','envelope',{cls:unread>0?'badge-yellow':'badge-green',txt:unread+' Unread'},
    '<div class="tbl-toolbar">'+
    '<input class="tbl-search" placeholder="Search by user, email or subject..." oninput="filterTable(\'msgTbody\',this.value)"/>'+
    '<button class="btn btn-sm btn-secondary" onclick="markAllRead()"><i class="fas fa-check-double"></i> Mark All Read</button>'+
    '<button class="btn btn-sm btn-danger" onclick="if(confirm(\'Delete all messages?\')) {localStorage.removeItem(\'adm_msgs\');document.getElementById(\'admContent\').innerHTML=buildContact();}"><i class="fas fa-trash"></i> Clear All</button>'+
    '<button class="btn btn-sm btn-warning" onclick="addDemoMsg()"><i class="fas fa-plus"></i> Test Msg</button>'+
    '</div>'+
    '<div class="adm-tbl-wrap"><table class="adm-tbl"><thead><tr><th>User</th><th>Email</th><th>Subject</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead><tbody id="msgTbody">'+rows+'</tbody></table></div>'
  )+
  '<div id="msgModal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:9999;align-items:center;justify-content:center;overflow-y:auto;padding:20px" onclick="if(event.target===this)closeMsgModal()">'+
  '<div style="background:#111827;border:1px solid rgba(255,255,255,.1);border-radius:18px;width:100%;max-width:620px;margin:auto;box-shadow:0 24px 80px rgba(0,0,0,.6)">'+
  '<div style="display:flex;justify-content:space-between;align-items:center;padding:20px 24px;border-bottom:1px solid rgba(255,255,255,.08)">'+
  '<div style="font-size:16px;font-weight:800;color:#fff"><i class="fas fa-envelope" style="color:#3ecf8e;margin-right:8px"></i><span id="mmSubject">Message</span></div>'+
  '<button onclick="closeMsgModal()" style="background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);color:#fff;width:32px;height:32px;border-radius:8px;cursor:pointer;font-size:16px">Ã—</button>'+
  '</div>'+
  '<div style="padding:20px 24px">'+
  '<div style="display:flex;gap:20px;margin-bottom:16px;flex-wrap:wrap">'+
  '<div><div style="font-size:11px;color:rgba(255,255,255,.4);font-weight:700;text-transform:uppercase;margin-bottom:3px">From</div><div id="mmUser" style="font-size:14px;color:#fff;font-weight:600"></div></div>'+
  '<div><div style="font-size:11px;color:rgba(255,255,255,.4);font-weight:700;text-transform:uppercase;margin-bottom:3px">Email</div><div id="mmEmail" style="font-size:14px;color:#3ecf8e"></div></div>'+
  '<div><div style="font-size:11px;color:rgba(255,255,255,.4);font-weight:700;text-transform:uppercase;margin-bottom:3px">Date</div><div id="mmDate" style="font-size:14px;color:rgba(255,255,255,.6)"></div></div>'+
  '</div>'+
  '<div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:16px;margin-bottom:16px">'+
  '<div style="font-size:11px;color:rgba(255,255,255,.4);font-weight:700;text-transform:uppercase;margin-bottom:8px">Message</div>'+
  '<div id="mmBody" style="font-size:14px;color:rgba(255,255,255,.85);line-height:1.7;white-space:pre-wrap"></div>'+
  '</div>'+
  '<div id="mmImages" style="display:none;margin-bottom:16px"><div style="font-size:11px;color:rgba(255,255,255,.4);font-weight:700;text-transform:uppercase;margin-bottom:8px">Attached Images</div><div id="mmImgList"></div></div>'+
  '<div id="mmReplies" style="margin-bottom:16px"></div>'+
  '<div style="background:rgba(62,207,142,.05);border:1px solid rgba(62,207,142,.2);border-radius:12px;padding:16px">'+
  '<div style="font-size:12px;font-weight:700;color:#3ecf8e;margin-bottom:10px"><i class="fas fa-reply"></i> Reply to User</div>'+
  '<textarea id="mmReplyText" placeholder="Type your reply here..." style="width:100%;background:rgba(0,0,0,.3);border:1.5px solid rgba(255,255,255,.1);border-radius:9px;padding:12px 14px;color:#fff;font-size:13px;font-family:inherit;resize:vertical;min-height:100px;outline:none" onfocus="this.style.borderColor=\'rgba(62,207,142,.4)\'"></textarea>'+
  '<div style="display:flex;gap:10px;margin-top:12px;justify-content:flex-end">'+
  '<button class="btn btn-secondary" onclick="closeMsgModal()">Cancel</button>'+
  '<button class="btn btn-primary" id="mmReplyBtn" onclick="sendMsgReply()"><i class="fas fa-paper-plane"></i> Send Reply</button>'+
  '</div></div>'+
  '</div></div></div>';
}

var _currentMsgId = null;

function openMsgModal(id){
  var msgs=JSON.parse(localStorage.getItem('adm_msgs')||'[]');
  var m=msgs.find(function(x){return x.id===id;});
  if(!m) return;
  _currentMsgId=id;
  if(m.status==='unread'){
    m.status='read';
    localStorage.setItem('adm_msgs',JSON.stringify(msgs));
    var badge=document.querySelector('.adm-card-hd .hd-badge');
    if(badge){
      var unread=msgs.filter(function(x){return x.status==='unread';}).length;
      badge.textContent=unread+' Unread';
      badge.className='hd-badge '+(unread>0?'badge-yellow':'badge-green');
    }
  }
  var row=document.getElementById('msgrow_'+id);
  if(row){var b=row.querySelector('.tbl-badge');if(b){b.textContent=m.status;b.className='tbl-badge '+(m.status==='replied'?'tbl-blue':'tbl-green');}}
  document.getElementById('mmSubject').textContent=m.subject;
  document.getElementById('mmUser').textContent=m.user;
  document.getElementById('mmEmail').textContent=m.email;
  document.getElementById('mmDate').textContent=new Date(m.date).toLocaleString();
  document.getElementById('mmBody').textContent=m.message||'(no message body)';
  document.getElementById('mmReplyText').value='';
  var imgs = m.imageData || (m.images||[]).map(function(n){return {name:n,data:null};});
  var imgDiv=document.getElementById('mmImages');
  var imgList=document.getElementById('mmImgList');
  if(imgs.length>0){
    imgDiv.style.display='block';
    imgList.innerHTML=imgs.map(function(img,i){
      if(img.data){
        return '<div style="display:inline-block;margin:0 8px 8px 0;vertical-align:top">'+
        '<img src="'+img.data+'" alt="'+img.name+'" '+
        'onclick="openImgLightbox(this.src,\''+img.name+'\')" '+
        'style="width:90px;height:90px;object-fit:cover;border-radius:10px;border:2px solid rgba(62,207,142,.35);cursor:zoom-in;transition:transform .15s,border-color .15s" '+
        'onmouseover="this.style.transform=\'scale(1.08)\';this.style.borderColor=\'#3ecf8e\'" '+
        'onmouseout="this.style.transform=\'scale(1)\';this.style.borderColor=\'rgba(62,207,142,.35)\'" '+
        'title="Click to view full size"/>'+
        '<div style="font-size:10px;color:rgba(255,255,255,.4);text-align:center;margin-top:4px;max-width:90px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+img.name+'</div>'+
        '</div>';
      } else {
        return '<span style="background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:6px;padding:5px 12px;font-size:12px;color:rgba(255,255,255,.5);margin-right:6px;display:inline-block"><i class="fas fa-image" style="margin-right:5px;color:#3ecf8e"></i>'+img.name+'</span>';
      }
    }).join('');
  } else { imgDiv.style.display='none'; }
  _renderReplies(m);
  var modal=document.getElementById('msgModal');
  if(modal) modal.style.display='flex';
}

function _renderReplies(m){
  var container=document.getElementById('mmReplies');
  if(!container) return;
  var replies=m.replies||[];
  if(!replies.length){container.innerHTML='';return;}
  container.innerHTML='<div style="font-size:11px;color:rgba(255,255,255,.4);font-weight:700;text-transform:uppercase;margin-bottom:8px">Conversation ('+replies.length+')</div>'+
  replies.map(function(r){
    var isAdmin=r.admin===true;
    var bg=isAdmin?'rgba(62,207,142,.06)':'rgba(96,165,250,.06)';
    var border=isAdmin?'rgba(62,207,142,.15)':'rgba(96,165,250,.15)';
    var labelColor=isAdmin?'#3ecf8e':'#60a5fa';
    var label=isAdmin?'<i class="fas fa-shield-halved"></i> Admin Reply':'<i class="fas fa-user"></i> User Reply';
    var imgs=(r.imageData||[]).map(function(img){
      if(!img||!img.data) return '';
      return '<img src="'+img.data+'" onclick="openImgLightbox(this.src,\''+( img.name||'')+'\''+')" '+
        'style="width:70px;height:70px;object-fit:cover;border-radius:8px;cursor:zoom-in;border:2px solid rgba(255,255,255,.15);margin-right:6px;margin-top:6px" title="Click to view"/>';
    }).join('');
    return '<div style="background:'+bg+';border:1px solid '+border+';border-radius:10px;padding:12px 16px;margin-bottom:8px">'+
    '<div style="display:flex;justify-content:space-between;margin-bottom:6px">'+
    '<span style="font-size:12px;font-weight:700;color:'+labelColor+'">'+label+'</span>'+
    '<span style="font-size:11px;color:rgba(255,255,255,.3)">'+new Date(r.date).toLocaleString()+'</span>'+
    '</div>'+
    '<div style="font-size:13px;color:rgba(255,255,255,.8);line-height:1.6;white-space:pre-wrap">'+r.text+'</div>'+
    (imgs?'<div style="margin-top:8px">'+imgs+'</div>':'')+
    '</div>';
  }).join('');
}

function sendMsgReply(){
  var text=(document.getElementById('mmReplyText')||{}).value;
  if(!text||!text.trim()){toast('Reply cannot be empty','error');return;}
  if(!_currentMsgId){toast('No message selected','error');return;}
  var btn=document.getElementById('mmReplyBtn');
  if(btn){btn.disabled=true;btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Sending...';}
  setTimeout(function(){
    var msgs=JSON.parse(localStorage.getItem('adm_msgs')||'[]');
    var m=msgs.find(function(x){return x.id===_currentMsgId;});
    if(!m){toast('Message not found','error');return;}
    if(!m.replies) m.replies=[];
    m.replies.push({text:text.trim(),date:new Date().toISOString(),admin:true});
    m.status='replied';
    localStorage.setItem('adm_msgs',JSON.stringify(msgs));
    if(btn){btn.disabled=false;btn.innerHTML='<i class="fas fa-paper-plane"></i> Send Reply';}
    document.getElementById('mmReplyText').value='';
    _renderReplies(m);
    toast('Reply sent to '+m.email+'!');
    var row=document.getElementById('msgrow_'+_currentMsgId);
    if(row){var b=row.querySelector('.tbl-badge');if(b){b.textContent='replied';b.className='tbl-badge tbl-blue';}}
  },600);
}

function closeMsgModal(){
  var modal=document.getElementById('msgModal');
  if(modal) modal.style.display='none';
  _currentMsgId=null;
}

function viewMsg(id){ openMsgModal(id); }

// Image Lightbox
function openImgLightbox(src, name){
  var lb = document.getElementById('_imgLb');
  if(!lb){
    lb = document.createElement('div');
    lb.id = '_imgLb';
    lb.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:99999;display:flex;align-items:center;justify-content:center;flex-direction:column;cursor:zoom-out';
    lb.onclick = function(){ lb.remove(); };
    document.body.appendChild(lb);
  } else {
    lb.innerHTML = '';
    lb.style.display = 'flex';
  }
  // Close btn
  var cls = document.createElement('button');
  cls.innerHTML = '&times;';
  cls.style.cssText = 'position:absolute;top:18px;right:22px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);color:#fff;width:40px;height:40px;border-radius:10px;cursor:pointer;font-size:22px;font-weight:700;line-height:1;z-index:2';
  cls.onclick = function(e){ e.stopPropagation(); lb.remove(); };
  lb.appendChild(cls);
  // Image
  var img = document.createElement('img');
  img.src = src;
  img.style.cssText = 'max-width:90vw;max-height:80vh;border-radius:12px;box-shadow:0 20px 80px rgba(0,0,0,.8);object-fit:contain;cursor:default';
  img.onclick = function(e){ e.stopPropagation(); };
  lb.appendChild(img);
  // Caption
  var cap = document.createElement('div');
  cap.textContent = name || '';
  cap.style.cssText = 'margin-top:14px;color:rgba(255,255,255,.55);font-size:13px;font-weight:500;text-align:center;max-width:90vw;overflow:hidden;text-overflow:ellipsis;white-space:nowrap';
  lb.appendChild(cap);
  // Download button
  var dl = document.createElement('a');
  dl.href = src; dl.download = name || 'image';
  dl.innerHTML = '<i class="fas fa-download"></i> Download';
  dl.style.cssText = 'margin-top:12px;background:rgba(62,207,142,.15);border:1px solid rgba(62,207,142,.3);color:#3ecf8e;padding:8px 18px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;text-decoration:none';
  dl.onclick = function(e){ e.stopPropagation(); };
  lb.appendChild(dl);
  // ESC key to close
  var esc = function(e){ if(e.key==='Escape'){ lb.remove(); document.removeEventListener('keydown',esc); } };
  document.addEventListener('keydown', esc);
}

function deleteMsg(id){
  var msgs=JSON.parse(localStorage.getItem('adm_msgs')||'[]').filter(function(m){return m.id!==id;});
  localStorage.setItem('adm_msgs',JSON.stringify(msgs));
  closeMsgModal();
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
  var subjects=['Withdrawal Problem','Login Issue','Faucet Not Working','Game Bug Report','Balance Missing'];
  var bodies=['Hello, I have an issue with my withdrawal. Please help!','I cannot login to my account.','The faucet is not giving me TRX today.','I found a bug in the dice game.','My balance disappeared after playing.'];
  var i=Math.floor(Math.random()*5);
  // Small 8x8 green dot as test image (real base64 PNG)
  var testImg='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAK0lEQVQY02NgYGD4z8BAAGAEYiIwMgIxAwMTiMmIyQAAAAAA//8DAAj+Av7dA1oAAAAASUVORK5CYII=';
  msgs.unshift({
    id:'msg'+Date.now(),
    user:'TestUser'+Math.floor(Math.random()*999),
    email:'user'+Math.floor(Math.random()*999)+'@example.com',
    subject:subjects[i],
    message:bodies[i]+'\n\nI have attached a screenshot for reference.',
    images:['screenshot.png'],
    imageData:[{name:'screenshot.png',data:testImg}],
    status:'unread',
    date:new Date().toISOString()
  });
  localStorage.setItem('adm_msgs',JSON.stringify(msgs));
  toast('Test message added (with image)');
  document.getElementById('admContent').innerHTML=buildContact();
}

function buildMsgTable(limit){
  var msgs=JSON.parse(localStorage.getItem('adm_msgs')||'[]').slice(0,limit||5);
  if(!msgs.length) return '<p style="color:rgba(255,255,255,.3);font-size:13px;padding:12px 0">No messages yet</p>';
  return '<div class="adm-tbl-wrap"><table class="adm-tbl"><thead><tr><th>User</th><th>Subject</th><th>Status</th></tr></thead><tbody>'+
  msgs.map(function(m){
    var s=m.status==='replied'?'tbl-blue':m.status==='unread'?'tbl-yellow':'tbl-green';
    return '<tr><td>'+m.user+'</td><td>'+m.subject+'</td><td><span class="tbl-badge '+s+'">'+m.status+'</span></td></tr>';
  }).join('')+
  '</tbody></table></div>';
}

function buildUsers(){
  var users=JSON.parse(localStorage.getItem('adm_users')||'[]');
  var rows=users.map(function(u){
    return '<tr>'+
    '<td><strong>'+u.name+'</strong></td>'+
    '<td style="color:rgba(255,255,255,.6)">'+u.email+'</td>'+
    '<td><span style="color:#3ecf8e;font-weight:700">'+parseFloat(u.balance||0).toFixed(4)+' TRX</span></td>'+
    '<td><span class="tbl-badge '+(u.banned?'tbl-red':'tbl-green')+'">'+(u.banned?'🔴 Banned':'🟢 Active')+'</span></td>'+
    '<td>'+new Date(u.joined||Date.now()).toLocaleDateString()+'</td>'+
    '<td style="white-space:nowrap">'+
    '<button class="btn btn-sm btn-primary" onclick="editUserModal(\''+u.id+'\')"><i class="fas fa-edit"></i> Edit</button> '+
    '<button class="btn btn-sm '+(u.banned?'btn-success':'btn-danger')+'" onclick="banUser(\''+u.id+'\')"><i class="fas fa-'+(u.banned?'unlock':'ban')+'"></i> '+(u.banned?'Unban':'Ban')+'</button>'+
    '</td></tr>';
  }).join('')||'<tr><td colspan="6" style="text-align:center;color:rgba(255,255,255,.3);padding:24px">No users yet. <button class="btn btn-sm btn-secondary" onclick="addDemoUser()" style="margin-left:10px">Add Test Users</button></td></tr>';
  return '<div class="pg-hdr"><h1>User Management</h1><p>View, edit and manage all registered users.</p></div>'+
  card('Users','users',{cls:'badge-blue',txt:users.length+' Total'},
    '<div class="tbl-toolbar">'+
    '<input class="tbl-search" placeholder="Search users..." oninput="filterTable(\'userTbody\',this.value)"/>'+
    '<button class="btn btn-sm btn-success" onclick="showAddUserModal()"><i class="fas fa-user-plus"></i> Add User</button>'+
    '<button class="btn btn-sm btn-warning" onclick="addDemoUser()"><i class="fas fa-plus"></i> Test User</button>'+
    '</div>'+
    '<div class="adm-tbl-wrap"><table class="adm-tbl"><thead><tr><th>Username</th><th>Email</th><th>Balance</th><th>Status</th><th>Joined</th><th>Actions</th></tr></thead><tbody id="userTbody">'+rows+'</tbody></table></div>'+
    // Edit User Modal
    '<div id="editUserModal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:9999;align-items:center;justify-content:center" onclick="if(event.target===this)closeEditUser()">'+
    '<div style="background:#0f1a14;border:1px solid rgba(62,207,142,.2);border-radius:16px;padding:28px;width:100%;max-width:460px;max-height:90vh;overflow-y:auto">'+
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">'+
    '<h3 style="margin:0;color:#fff;font-size:16px">✏️ Edit User</h3>'+
    '<button onclick="closeEditUser()" style="background:rgba(255,255,255,.1);border:none;color:#fff;width:30px;height:30px;border-radius:8px;cursor:pointer;font-size:18px">×</button>'+
    '</div>'+
    '<div class="form-group"><label>Username</label><input type="text" id="euName" style="width:100%;box-sizing:border-box"/></div>'+
    '<div class="form-group"><label>Email</label><input type="email" id="euEmail" style="width:100%;box-sizing:border-box"/></div>'+
    '<div class="form-group"><label>Current Balance (TRX)</label><input type="number" id="euBalance" step="0.000001" style="width:100%;box-sizing:border-box"/></div>'+
    '<div class="form-group"><label>Add / Subtract Balance</label>'+
    '<div style="display:flex;gap:8px">'+
    '<input type="number" id="euAdjust" placeholder="e.g. +10 or -5" step="0.01" style="flex:1"/>'+
    '<button class="btn btn-success" onclick="applyBalAdj()" style="white-space:nowrap">Apply</button>'+
    '</div></div>'+
    '<input type="hidden" id="euId"/>'+
    '<div style="display:flex;gap:10px;margin-top:20px">'+
    '<button class="btn btn-primary" onclick="saveEditUser()" style="flex:1">💾 Save Changes</button>'+
    '<button class="btn btn-secondary" onclick="closeEditUser()" style="flex:1">Cancel</button>'+
    '</div></div></div>'+
    // Add User Modal
    '<div id="addUserModal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:9999;align-items:center;justify-content:center" onclick="if(event.target===this)closeAddUser()">'+
    '<div style="background:#0f1a14;border:1px solid rgba(62,207,142,.2);border-radius:16px;padding:28px;width:100%;max-width:400px">'+
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">'+
    '<h3 style="margin:0;color:#fff;font-size:16px">➕ Add New User</h3>'+
    '<button onclick="closeAddUser()" style="background:rgba(255,255,255,.1);border:none;color:#fff;width:30px;height:30px;border-radius:8px;cursor:pointer;font-size:18px">×</button>'+
    '</div>'+
    '<div class="form-group"><label>Username</label><input type="text" id="auName" placeholder="username" style="width:100%;box-sizing:border-box"/></div>'+
    '<div class="form-group"><label>Email</label><input type="email" id="auEmail" placeholder="user@example.com" style="width:100%;box-sizing:border-box"/></div>'+
    '<div class="form-group"><label>Starting Balance (TRX)</label><input type="number" id="auBalance" value="0" step="0.01" style="width:100%;box-sizing:border-box"/></div>'+
    '<button class="btn btn-success" onclick="saveNewUser()" style="width:100%;margin-top:10px">✅ Create User</button>'+
    '</div></div>'
  );
}

function editUserModal(id){
  var users=JSON.parse(localStorage.getItem('adm_users')||'[]');
  var u=users.find(function(x){return x.id===id;});
  if(!u) return;
  document.getElementById('euId').value=u.id;
  document.getElementById('euName').value=u.name;
  document.getElementById('euEmail').value=u.email;
  document.getElementById('euBalance').value=parseFloat(u.balance||0).toFixed(6);
  document.getElementById('euAdjust').value='';
  var modal=document.getElementById('editUserModal');
  if(modal){ modal.style.display='flex'; }
}
function applyBalAdj(){
  var adj=parseFloat(document.getElementById('euAdjust').value||'0');
  if(isNaN(adj)){ toast('Enter a valid amount'); return; }
  var cur=parseFloat(document.getElementById('euBalance').value||'0');
  document.getElementById('euBalance').value=Math.max(0,cur+adj).toFixed(6);
  document.getElementById('euAdjust').value='';
  toast('Balance updated — click Save to confirm');
}
function saveEditUser(){
  var id=document.getElementById('euId').value;
  var name=document.getElementById('euName').value.trim();
  var email=document.getElementById('euEmail').value.trim();
  var bal=parseFloat(document.getElementById('euBalance').value||'0');
  if(!name||!email){ toast('Name and email required'); return; }
  var users=JSON.parse(localStorage.getItem('adm_users')||'[]');
  users.forEach(function(u){
    if(u.id===id){ u.name=name; u.email=email; u.balance=bal.toFixed(6); }
  });
  localStorage.setItem('adm_users',JSON.stringify(users));

  // ── KEY FIX: Write balance to user-specific key so dashboard picks it up ──
  // Store as pending credit — when user opens site, syncBal() applies it
  var pendKey = 'adm_bal_' + name.toLowerCase();
  localStorage.setItem(pendKey, bal.toFixed(6));

  // Also try to write directly to userBalance if this user is currently logged in
  var curUser = localStorage.getItem('userName')||'';
  if(curUser.toLowerCase() === name.toLowerCase()){
    localStorage.setItem('userBalance', bal.toFixed(6));
    // Update visible balance element if on same browser
    var el=document.getElementById('userBalance');
    if(el) el.textContent=bal.toFixed(6);
    toast('User saved ✅ — Balance updated live!');
  } else {
    toast('User saved ✅ — Balance will apply on their next login.');
  }

  closeEditUser();
  document.getElementById('admContent').innerHTML=buildUsers();
}
function closeEditUser(){
  var m=document.getElementById('editUserModal');
  if(m) m.style.display='none';
}
function showAddUserModal(){
  document.getElementById('auName').value='';
  document.getElementById('auEmail').value='';
  document.getElementById('auBalance').value='0';
  var m=document.getElementById('addUserModal');
  if(m) m.style.display='flex';
}
function saveNewUser(){
  var name=document.getElementById('auName').value.trim();
  var email=document.getElementById('auEmail').value.trim();
  var bal=parseFloat(document.getElementById('auBalance').value||'0');
  if(!name||!email){ toast('Name and email required'); return; }
  var users=JSON.parse(localStorage.getItem('adm_users')||'[]');
  users.push({id:'u'+Date.now(),name:name,email:email,balance:bal.toFixed(6),banned:false,joined:new Date().toISOString()});
  localStorage.setItem('adm_users',JSON.stringify(users));
  toast('User added ✅');
  closeAddUser();
  document.getElementById('admContent').innerHTML=buildUsers();
}
function closeAddUser(){
  var m=document.getElementById('addUserModal');
  if(m) m.style.display='none';
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
  if(newUser) {save('adminUser',newUser); save('admin_user',newUser);}
  if(newPw)   {save('adminPass',newPw); save('admin_pass',newPw);}
  toast('Admin credentials updated! Please login again.');
  setTimeout(function(){doLogout();},2000);
}

function saveSiteSettings(){
  save('site_name',document.getElementById('ss_name').value);
  save('site_balance',document.getElementById('ss_bal').value);
  save('admin_email',document.getElementById('ss_email').value);
  save('max_attempts',document.getElementById('ss_attempts').value);
  saveLiveToast('Site settings saved');
}

// Init — load settings from server then dashboard
window.addEventListener('DOMContentLoaded', function(){
  function initDash(){
    document.getElementById('admContent').innerHTML = buildDashboard();
    refreshServerUserCount();
  }
  if(window.SiteSync){
    SiteSync.loadSettings(function(){ initDash(); });
  } else initDash();
  setInterval(function(){
    var d = new Date();
    var el = document.getElementById('tbTime');
    if(el) el.textContent = d.toLocaleTimeString();
  }, 1000);
});
// ═══════════════════════════════════════════════════════
// FIX: User count — merge site_registered_users into adm_users on load
// ═══════════════════════════════════════════════════════
(function syncUsers(){
  try{
    var au = JSON.parse(localStorage.getItem('adm_users')||'[]');
    var ru = JSON.parse(localStorage.getItem('site_registered_users')||'[]');
    var changed = false;
    ru.forEach(function(u){
      if(!au.find(function(x){return x.name===u.name||x.email===u.email;})){
        au.push({id:'u_'+u.name.toLowerCase().replace(/[^a-z0-9]/g,''),name:u.name,email:u.email||u.name+'@tronsick.io',balance:'0.000000',banned:false,joined:u.joined||new Date().toISOString()});
        changed=true;
      }
    });
    if(changed) localStorage.setItem('adm_users',JSON.stringify(au));
    S.users = au;
  }catch(e){}
})();

// ═══════════════════════════════════════════════════════
// SECTION: PAYOUT GENERATE
// ═══════════════════════════════════════════════════════
SECTIONS.payout_gen = buildPayoutGen;
TITLES.payout_gen = 'Payout Generator';

function buildPayoutGen(){
  var payouts = _getPayoutDraft();
  var rows = payouts.slice().reverse().map(function(p){
    return '<tr><td>'+p.username+'</td><td style="color:#3ecf8e;font-weight:700">'+p.amount+' TRX</td><td style="font-family:monospace;font-size:11px;color:rgba(255,255,255,.5)">'+p.txid.substr(0,16)+'...</td><td style="font-family:monospace;font-size:11px;color:rgba(255,255,255,.4)">'+p.address.substr(0,14)+'...</td><td style="color:rgba(255,255,255,.4);font-size:12px">'+new Date(p.date).toLocaleString()+'</td><td><button class="btn btn-sm btn-danger" onclick="deleteGenPayout(\''+p.id+'\')"><i class="fas fa-trash"></i></button></td></tr>';
  }).join('') || '<tr><td colspan="6" style="text-align:center;color:rgba(255,255,255,.3);padding:24px">No generated payouts yet</td></tr>';

  return '<div class="pg-hdr"><h1>Payout Generator</h1><p>Create payout records, then click <strong>Save Live to Site</strong> to publish on Payout Proof page.</p></div>'+
  card('Generate Payout','money-bill-wave',null,
    '<div class="adm-alert" style="background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.2);color:#f59e0b;margin-bottom:16px"><i class="fas fa-circle-info"></i> Generate payouts here first. They go live on site only after you click <strong>Save Live to Site</strong>.</div>'+
    '<div class="form-row">'+
    '<div class="form-group"><label><i class="fas fa-user"></i> Username</label><input type="text" id="pgUser" placeholder="e.g. cryptoking99"/></div>'+
    '<div class="form-group"><label><i class="fas fa-coins"></i> Amount (TRX)</label><input type="number" id="pgAmt" value="10" min="0.000001" step="0.000001" placeholder="Exact TRX amount"/></div>'+
    '<div class="form-group"><label><i class="fas fa-wallet"></i> Recipient Address</label><input type="text" id="pgAddr" placeholder="TXXX... (TRX wallet address)"/></div>'+
    '</div>'+
    '<div class="form-group" style="margin-top:8px"><label><i class="fas fa-link"></i> Real TxID <span style="color:#f59e0b;font-size:11px">(Copy from TronScan/your wallet — must be a real 64-char hash)</span></label><input type="text" id="pgTxid" placeholder="e.g. a1b2c3d4e5f6... (64 hex characters)" style="font-family:monospace;font-size:12px"/></div>'+
    '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:8px">'+
    '<button class="btn btn-primary" onclick="generateOnePayout()"><i class="fas fa-bolt"></i> Generate Payout</button>'+
    '<button class="btn btn-secondary" onclick="generateBulkPayouts()"><i class="fas fa-layer-group"></i> Generate 5 Random</button>'+
    '<button class="btn btn-success" id="pgLiveBtn" onclick="pushPayoutsLive()" style="background:linear-gradient(135deg,#3ecf8e,#22c55e);font-weight:800;border:none"><i class="fas fa-broadcast-tower"></i> Save Live to Site</button>'+
    '<button class="btn btn-danger" onclick="clearAllGenPayouts()"><i class="fas fa-trash"></i> Clear All</button>'+
    '</div>'
  )+
  card('Generated Payout History (Draft)','history',{cls:'badge-yellow',txt:payouts.length+' Draft'},
    '<div class="adm-tbl-wrap"><table class="adm-tbl"><thead><tr><th>Username</th><th>Amount</th><th>TxID</th><th>Address</th><th>Time</th><th>Del</th></tr></thead><tbody id="pgTbody">'+rows+'</tbody></table></div>'
  );
}

function _getPayoutDraft(){
  try{
    var d = JSON.parse(localStorage.getItem('gen_payouts_draft')||'[]');
    if(!d.length){
      var old = JSON.parse(localStorage.getItem('gen_payouts')||'[]');
      if(old.length){
        localStorage.setItem('gen_payouts_draft', JSON.stringify(old));
        return old;
      }
    }
    return d;
  }catch(e){ return []; }
}
function _savePayoutDraft(list){
  localStorage.setItem('gen_payouts_draft', JSON.stringify(list||[]));
}
function _staggeredDate(index){
  var hoursBack = 0;
  for(var i=0;i<index;i++) hoursBack += 1 + Math.random();
  return new Date(Date.now() - hoursBack * 3600000).toISOString();
}

function _randTxid(){
  var c='0123456789abcdef';
  var t='';for(var i=0;i<64;i++)t+=c[Math.floor(Math.random()*16)];
  return t;
}
function _randTronAddr(){
  var c='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var a='T';for(var i=0;i<33;i++)a+=c[Math.floor(Math.random()*36)];
  return a;
}
function _randBetween(min,max){ return (Math.random()*(max-min)+min); }

function generateOnePayout(){
  var user = (document.getElementById('pgUser').value||'').trim();
  var amt = parseFloat(document.getElementById('pgAmt')?document.getElementById('pgAmt').value:document.getElementById('pgMin')?document.getElementById('pgMin').value:10)||10;
  var txid = (document.getElementById('pgTxid')?document.getElementById('pgTxid').value:'').trim();
  var addr = (document.getElementById('pgAddr')?document.getElementById('pgAddr').value:'').trim()||_randTronAddr();
  if(!user){toast('Enter a username','error');return;}
  if(!txid||txid.length<60){toast('❌ Enter a real 64-char TxID from your TRX wallet!','error');return;}
  if(!addr.startsWith('T')){toast('Enter a valid TRX address (starts with T)','error');return;}
  var p = {id:'pg'+Date.now(),username:user,amount:amt.toFixed(6),txid:txid,address:addr,date:new Date().toISOString()};
  var payouts = _getPayoutDraft();
  payouts.push(p);
  _savePayoutDraft(payouts);
  toast('Payout generated (draft). Click Save Live to Site!','success');
  document.getElementById('admContent').innerHTML=buildPayoutGen();
}

function generateBulkPayouts(){
  var mn = parseFloat(document.getElementById('pgMin').value)||10;
  var mx = parseFloat(document.getElementById('pgMax').value)||100;
  var names=['TronUser','CryptoKing','DiamondHands','MoonWalker','TRXHunter','BlockMaster','DeFiPro','SatoshiFan','CoinFlipper','LimboPlayer'];
  var payouts = _getPayoutDraft();
  var base = Date.now();
  for(var i=0;i<5;i++){
    var uname = names[Math.floor(Math.random()*names.length)]+(Math.floor(Math.random()*9000)+1000);
    var amt = _randBetween(mn,mx).toFixed(6);
    payouts.push({id:'pg'+(base+i),username:uname,amount:amt,txid:_randTxid(),address:_randTronAddr(),date:_staggeredDate(i)});
  }
  _savePayoutDraft(payouts);
  toast('5 payouts generated with 1-2hr gaps. Click Save Live to Site!','success');
  document.getElementById('admContent').innerHTML=buildPayoutGen();
}

function pushPayoutsLive(){
  var payouts = _getPayoutDraft();
  if(!payouts.length){ toast('No payouts to publish. Generate some first.','error'); return; }
  if(!window.SiteSync){ toast('SiteSync not loaded','error'); return; }
  var btn = document.getElementById('pgLiveBtn');
  if(btn){ btn.disabled=true; btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Publishing...'; }
  SiteSync.setGenPayouts(payouts, function(r){
    if(r && r.ok){
      toast(payouts.length+' payouts live on site! Check Payout Proof page.','success');
    } else {
      toast('Failed to publish: '+(r&&r.error?r.error:'Server error'),'error');
    }
    if(btn){ btn.disabled=false; btn.innerHTML='<i class="fas fa-broadcast-tower"></i> Save Live to Site'; }
  });
}

function deleteGenPayout(id){
  var payouts = _getPayoutDraft().filter(function(p){return p.id!==id;});
  _savePayoutDraft(payouts);
  toast('Payout removed from draft');
  document.getElementById('admContent').innerHTML=buildPayoutGen();
}

function clearAllGenPayouts(){
  if(!confirm('Clear all draft payouts?')) return;
  _savePayoutDraft([]);
  if(window.SiteSync){
    SiteSync.clearGenPayouts(function(r){
      toast(r&&r.ok?'Draft cleared + removed from site':'Draft cleared locally','success');
      document.getElementById('admContent').innerHTML=buildPayoutGen();
    });
  } else {
    toast('All payouts cleared');
    document.getElementById('admContent').innerHTML=buildPayoutGen();
  }
}

// ═══════════════════════════════════════════════════════
// SECTION: CONTEST GENERATE (Fake Leaderboard Entries)
// ═══════════════════════════════════════════════════════
SECTIONS.contest_gen = buildContestGen;
TITLES.contest_gen = 'Contest Generator';

var _ctAutoTimers = [];

function buildContestGen(){
  var cw = JSON.parse(localStorage.getItem('contest_wagers')||'{}');
  var entries = Object.keys(cw).map(function(u){return {name:u,wager:parseFloat(cw[u])||0};}).sort(function(a,b){return b.wager-a.wager;});
  var lbRows = entries.map(function(e,i){
    return '<tr><td>#'+(i+1)+'</td><td>'+e.name+'</td><td>'+e.wager.toFixed(3)+' TRX</td><td><button class="btn btn-sm btn-danger" onclick="removeCtEntry(\''+e.name+'\')"><i class="fas fa-trash"></i></button></td></tr>';
  }).join('') || '<tr><td colspan="4" style="text-align:center;color:rgba(255,255,255,.3);padding:18px">No entries yet</td></tr>';

  var rows10 = '';
  for(var i=1;i<=10;i++){
    rows10 += '<div class="form-row" style="align-items:flex-end;gap:8px;margin-bottom:10px">'+
    '<div class="form-group" style="flex:2;margin-bottom:0"><label>Username '+i+'</label><input type="text" id="cg_user'+i+'" placeholder="e.g. player'+i+'"/></div>'+
    '<div class="form-group" style="flex:1;margin-bottom:0"><label>Wager (TRX)</label><input type="number" id="cg_wager'+i+'" value="'+(Math.floor(Math.random()*500+50))+'" min="0" step="0.001"/></div>'+
    '<div class="form-group" style="flex:1;margin-bottom:0"><label>Auto every (sec)</label><input type="number" id="cg_interval'+i+'" value="'+(30+i*5)+'" min="5" max="3600"/></div>'+
    '<div class="form-group" style="flex:1;margin-bottom:0"><label>Add (TRX/tick)</label><input type="number" id="cg_add'+i+'" value="'+(Math.random()*10+1).toFixed(3)+'" min="0" step="0.001"/></div>'+
    '</div>';
  }

  return '<div class="pg-hdr"><h1>Contest Generator</h1><p>Add fake users to the live leaderboard with auto-wagering simulation.</p></div>'+
  card('Add Contest Entries','trophy',null,
    '<div class="adm-alert" style="background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.2);color:#f59e0b;margin-bottom:16px"><i class="fas fa-circle-info"></i> These entries appear live on the site contest leaderboard. Auto-wager adds TRX to each user every N seconds.</div>'+
    rows10+
    '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:8px">'+
    '<button class="btn btn-primary" onclick="saveCtEntries()"><i class="fas fa-save"></i> Save & Apply to Leaderboard</button>'+
    '<button class="btn btn-success" onclick="startCtAuto()"><i class="fas fa-play"></i> Start Auto-Wager</button>'+
    '<button class="btn btn-danger" onclick="stopCtAuto()"><i class="fas fa-stop"></i> Stop Auto</button>'+
    '<button class="btn btn-warning" onclick="if(confirm(\'Clear all contest entries on live site?\')) { if(window.SiteSync){SiteSync.resetContest(function(r){if(r&&r.ok){document.getElementById(\'admContent\').innerHTML=buildContestGen();toast(\'Cleared\');}});} else {localStorage.removeItem(\'contest_wagers\');document.getElementById(\'admContent\').innerHTML=buildContestGen();}}"><i class="fas fa-trash"></i> Clear All</button>'+
    '</div>'
  )+
  card('Live Leaderboard Preview','list-ol',{cls:'badge-green',txt:entries.length+' Players'},
    '<div class="adm-tbl-wrap"><table class="adm-tbl"><thead><tr><th>Rank</th><th>Username</th><th>Wagered</th><th>Remove</th></tr></thead><tbody id="ctGenTbody">'+lbRows+'</tbody></table></div>'+
    '<div style="margin-top:12px"><button class="btn btn-secondary" onclick="document.getElementById(\'admContent\').innerHTML=buildContestGen()"><i class="fas fa-refresh"></i> Refresh Preview</button></div>'
  );
}

function saveCtEntries(){
  var cw = JSON.parse(localStorage.getItem('contest_wagers')||'{}');
  for(var i=1;i<=10;i++){
    var uEl = document.getElementById('cg_user'+i);
    var wEl = document.getElementById('cg_wager'+i);
    if(uEl && uEl.value.trim() && wEl){
      var uname = uEl.value.trim();
      var wager = parseFloat(wEl.value)||0;
      if(uname && wager>0) cw[uname] = wager;
    }
  }
  localStorage.setItem('contest_wagers',JSON.stringify(cw));
  function done(){ toast('Contest entries saved to live leaderboard!'); document.getElementById('admContent').innerHTML=buildContestGen(); }
  if(window.SiteSync) SiteSync.setContestWagers(cw, function(r){ if(r&&r.ok) done(); else toast('Save failed','error'); });
  else done();
}

function startCtAuto(){
  stopCtAuto();
  var added = 0;
  for(var i=1;i<=10;i++){
    (function(idx){
      var uEl = document.getElementById('cg_user'+idx);
      var intEl = document.getElementById('cg_interval'+idx);
      var addEl = document.getElementById('cg_add'+idx);
      if(!uEl||!uEl.value.trim()) return;
      var uname = uEl.value.trim();
      var interval = parseInt(intEl&&intEl.value)||30;
      var addAmt = parseFloat(addEl&&addEl.value)||1;
      var timer = setInterval(function(){
        var cw = JSON.parse(localStorage.getItem('contest_wagers')||'{}');
        cw[uname] = (parseFloat(cw[uname])||0) + addAmt;
        localStorage.setItem('contest_wagers',JSON.stringify(cw));
        if(window.SiteSync) SiteSync.setContestWagers(cw);
      }, interval*1000);
      _ctAutoTimers.push(timer);
    })(i);
    added++;
  }
  toast('Auto-wager started for '+added+' users!');
}

function stopCtAuto(){
  _ctAutoTimers.forEach(function(t){clearInterval(t);});
  _ctAutoTimers=[];
  toast('Auto-wager stopped','error');
}

function removeCtEntry(uname){
  function done(){ toast(uname+' removed from leaderboard'); if(document.getElementById('admContent')) document.getElementById('admContent').innerHTML=buildContestGen(); buildAdmContestLb(); }
  if(window.SiteSync){
    SiteSync.removeContestEntry(uname, function(r){ if(r&&r.ok) done(); else toast('Remove failed','error'); });
  } else {
    var cw = JSON.parse(localStorage.getItem('contest_wagers')||'{}');
    delete cw[uname];
    localStorage.setItem('contest_wagers',JSON.stringify(cw));
    done();
  }
}

// ═══════════════════════════════════════════════════════
// SECTION: FAKE ACCOUNT CHECKER
// ═══════════════════════════════════════════════════════
SECTIONS.fake_check = buildFakeCheck;
TITLES.fake_check = 'Fake Account Checker';

function buildFakeCheck(){
  return '<div class="pg-hdr"><h1>Fake Account Checker</h1><p>Search any username to check if it\'s a real registered user or a generated fake contest/payout entry.</p></div>'+
  card('Account Search','search',null,
    '<div class="form-row" style="align-items:flex-end">'+
    '<div class="form-group" style="flex:3;margin-bottom:0"><label><i class="fas fa-user"></i> Search Username</label><input type="text" id="fkSearch" placeholder="Enter exact username to check..." oninput="fakeCheckSearch(this.value)"/></div>'+
    '</div>'+
    '<div id="fkResult" style="margin-top:20px"></div>'
  )+
  card('All Generated (Fake) Contest Entries','robot',null,
    (function(){
      var cw = JSON.parse(localStorage.getItem('contest_wagers')||'{}');
      var au = JSON.parse(localStorage.getItem('adm_users')||'[]');
      var ru = JSON.parse(localStorage.getItem('site_registered_users')||'[]');
      var fakes = Object.keys(cw).filter(function(u){
        var inReal = au.find(function(x){return x.name.toLowerCase()===u.toLowerCase();}) ||
                     ru.find(function(x){return x.name&&x.name.toLowerCase()===u.toLowerCase();});
        return !inReal;
      });
      if(!fakes.length) return '<p style="color:rgba(255,255,255,.3);padding:12px 0;font-size:13px">No fake contest entries detected — all leaderboard users are real.</p>';
      return '<div class="adm-tbl-wrap"><table class="adm-tbl"><thead><tr><th>Username</th><th>Contest Wager</th><th>Status</th><th>Remove</th></tr></thead><tbody>'+
      fakes.map(function(u){
        var cw2=JSON.parse(localStorage.getItem('contest_wagers')||'{}');
        return '<tr><td style="color:#f59e0b;font-weight:700">'+u+'</td><td>'+((parseFloat(cw2[u])||0).toFixed(3))+' TRX</td><td><span class="tbl-badge tbl-yellow">FAKE</span></td><td><button class="btn btn-sm btn-danger" onclick="removeCtEntry(\''+u+'\');document.getElementById(\'admContent\').innerHTML=buildFakeCheck()"><i class="fas fa-trash"></i></button></td></tr>';
      }).join('')+
      '</tbody></table></div>';
    })()
  )+
  card('All Generated Payout Records','receipt',null,
    (function(){
      var gp = JSON.parse(localStorage.getItem('gen_payouts')||'[]');
      if(!gp.length) return '<p style="color:rgba(255,255,255,.3);padding:12px 0;font-size:13px">No generated payout records.</p>';
      return '<div class="adm-tbl-wrap"><table class="adm-tbl"><thead><tr><th>Username</th><th>Amount</th><th>TxID</th><th>Status</th></tr></thead><tbody>'+
      gp.slice().reverse().map(function(p){
        return '<tr><td style="color:#f59e0b;font-weight:700">'+p.username+'</td><td>'+p.amount+' TRX</td><td style="font-family:monospace;font-size:11px;color:rgba(255,255,255,.4)">'+p.txid.substr(0,20)+'...</td><td><span class="tbl-badge tbl-yellow">GENERATED</span></td></tr>';
      }).join('')+
      '</tbody></table></div>';
    })()
  );
}

function fakeCheckSearch(q){
  var res = document.getElementById('fkResult');
  if(!res) return;
  q = (q||'').trim();
  if(!q){ res.innerHTML=''; return; }

  var au = JSON.parse(localStorage.getItem('adm_users')||'[]');
  var ru = JSON.parse(localStorage.getItem('site_registered_users')||'[]');
  var cw = JSON.parse(localStorage.getItem('contest_wagers')||'{}');
  var gp = JSON.parse(localStorage.getItem('gen_payouts')||'[]');

  var isRealUser = au.find(function(x){return x.name.toLowerCase()===q.toLowerCase();}) ||
                   ru.find(function(x){return x.name&&x.name.toLowerCase()===q.toLowerCase();});
  var inContest  = Object.keys(cw).find(function(u){return u.toLowerCase()===q.toLowerCase();});
  var inGenPay   = gp.find(function(p){return p.username.toLowerCase()===q.toLowerCase();});

  var html = '';
  if(isRealUser){
    html += '<div style="background:rgba(62,207,142,.08);border:1px solid rgba(62,207,142,.3);border-radius:12px;padding:18px 20px;margin-bottom:12px">'+
    '<div style="font-size:15px;font-weight:800;color:#3ecf8e;margin-bottom:8px"><i class="fas fa-circle-check"></i> REAL USER — Registered Account</div>'+
    '<div style="font-size:13px;color:rgba(255,255,255,.7)">Username: <strong>'+isRealUser.name+'</strong> &nbsp;|&nbsp; Email: '+isRealUser.email+'&nbsp;|&nbsp; Balance: '+(isRealUser.balance||'0')+' TRX &nbsp;|&nbsp; Joined: '+new Date(isRealUser.joined||Date.now()).toLocaleDateString()+'</div>'+
    '</div>';
  } else {
    html += '<div style="background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.3);border-radius:12px;padding:18px 20px;margin-bottom:12px">'+
    '<div style="font-size:15px;font-weight:800;color:#f87171;margin-bottom:6px"><i class="fas fa-circle-xmark"></i> NOT A REAL USER — No registered account found</div>'+
    '</div>';
  }

  if(inContest){
    html += '<div style="background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.3);border-radius:12px;padding:14px 20px;margin-bottom:10px">'+
    '<div style="font-size:13px;font-weight:700;color:#f59e0b"><i class="fas fa-trophy"></i> FAKE CONTEST ENTRY — Appears in leaderboard with '+((parseFloat(cw[inContest])||0).toFixed(3))+' TRX wagered</div>'+
    '</div>';
  }

  if(inGenPay){
    html += '<div style="background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.3);border-radius:12px;padding:14px 20px;margin-bottom:10px">'+
    '<div style="font-size:13px;font-weight:700;color:#f59e0b"><i class="fas fa-receipt"></i> GENERATED PAYOUT RECORD — '+inGenPay.amount+' TRX on '+new Date(inGenPay.date).toLocaleString()+'</div>'+
    '</div>';
  }

  if(!isRealUser && !inContest && !inGenPay){
    html += '<div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:14px 20px">'+
    '<div style="font-size:13px;color:rgba(255,255,255,.5)"><i class="fas fa-question-circle"></i> Username not found anywhere in the system</div></div>';
  }

  res.innerHTML = html;
}


