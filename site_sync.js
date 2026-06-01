/**
 * TronSick server sync — antibot, users, contest wagers
 */
window.SiteSync = (function(){
  var ADMIN_AUTH = 'TronSick@Admin2024';
  var API = (function(){
    var p = window.location.pathname || '';
    return p.indexOf('/admin/') !== -1 ? '../site_api.php' : 'site_api.php';
  })();

  var AB_KEYS = ['ab1_on','ab1_amount','ab1_mode','ab2_on','ab2_amount','ab2_wins','ab3_on'];

  function post(action, data, cb){
    var fd = new FormData();
    fd.append('action', action);
    if(data){
      Object.keys(data).forEach(function(k){ fd.append(k, data[k]); });
    }
    fetch(API, { method:'POST', body:fd, credentials:'same-origin' })
      .then(function(r){ return r.json(); })
      .then(function(j){ if(cb) cb(j); })
      .catch(function(e){ if(cb) cb({ok:false, error:'Network error'}); });
  }

  function get(action, cb){
    fetch(API + '?action=' + encodeURIComponent(action), { credentials:'same-origin' })
      .then(function(r){ return r.json(); })
      .then(function(j){ if(cb) cb(j); })
      .catch(function(e){ if(cb) cb({ok:false, error:'Network error'}); });
  }

  function isConfigured(data){
    return !!(data && (data._saved === '1' || data._saved === 1));
  }

  function applyAntibotToLocal(data){
    if(!data || !isConfigured(data)) return false;
    AB_KEYS.forEach(function(k){
      if(data[k] !== undefined && data[k] !== null) {
        localStorage.setItem(k, String(data[k]));
      }
    });
    return true;
  }

  function readAllAntibotFromLocal(){
    return {
      ab1_on: localStorage.getItem('ab1_on') || '0',
      ab1_amount: localStorage.getItem('ab1_amount') || '0',
      ab1_mode: localStorage.getItem('ab1_mode') || 'medium',
      ab2_on: localStorage.getItem('ab2_on') || '0',
      ab2_amount: localStorage.getItem('ab2_amount') || '0',
      ab2_wins: localStorage.getItem('ab2_wins') || '6',
      ab3_on: localStorage.getItem('ab3_on') || '0'
    };
  }

  /** Contest end = most recent Monday 10:00 UTC + 6 days 10 hours */
  function getContestEnd(){
    var now = new Date();
    var d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 10, 0, 0, 0));
    var dow = d.getUTCDay();
    var daysBack = dow === 0 ? 6 : dow - 1;
    d.setUTCDate(d.getUTCDate() - daysBack);
    if(d > now) d.setUTCDate(d.getUTCDate() - 7);
    return new Date(d.getTime() + 554400000);
  }

  function pad2(n){ return n < 10 ? '0' + n : '' + n; }

  function tickContestTimer(ids){
    var ms = Math.max(0, getContestEnd() - Date.now());
    var totalMins = Math.floor(ms / 60000);
    var days  = Math.floor(totalMins / 1440);
    var hours = Math.floor(totalMins / 60) % 24;
    var mins  = totalMins % 60;
    var secs  = Math.floor((ms % 60000) / 1000);
    var dEl = ids.daysEl || document.getElementById('ctCkDays');
    var hEl = ids.hoursEl || document.getElementById('ctCkHours');
    var mEl = ids.minsEl || document.getElementById('ctCkMins');
    var sEl = ids.secsEl || document.getElementById('ctCkSecs');
    if(dEl)  dEl.textContent  = pad2(days);
    if(hEl) hEl.textContent = pad2(hours);
    if(mEl)  mEl.textContent  = pad2(mins);
    if(sEl)  sEl.textContent  = pad2(secs);
  }

  function startContestTimer(ids, intervalMs){
    function tick(){ tickContestTimer(ids || {}); }
    tick();
    return setInterval(tick, intervalMs || 1000);
  }

  return {
    ADMIN_AUTH: ADMIN_AUTH,
    isConfigured: isConfigured,
    readAllAntibotFromLocal: readAllAntibotFromLocal,
    loadAntibot: function(cb){
      get('get_antibot', function(r){
        if(r.ok && r.data && isConfigured(r.data)){
          applyAntibotToLocal(r.data);
        }
        if(cb) cb(r);
      });
    },
    saveAntibot: function(data, cb){
      var payload = readAllAntibotFromLocal();
      Object.keys(data || {}).forEach(function(k){ payload[k] = data[k]; });
      payload.auth = ADMIN_AUTH;
      post('save_antibot', payload, function(r){
        if(r.ok && r.data) applyAntibotToLocal(r.data);
        if(cb) cb(r);
      });
    },
    registerUser: function(name, email, cb){
      post('register_user', { name:name, email:email || '' }, cb);
    },
    syncLocalUsers: function(cb){
      var seen = {};
      var list = [];
      try{
        var ru = JSON.parse(localStorage.getItem('site_registered_users')||'[]');
        var au = JSON.parse(localStorage.getItem('adm_users')||'[]');
        ru.concat(au).forEach(function(u){
          if(u && u.name && !seen[u.name.toLowerCase()]){
            seen[u.name.toLowerCase()] = 1;
            list.push({name:u.name, email:u.email||''});
          }
        });
      }catch(e){}
      var i = 0;
      function next(){
        if(i >= list.length){ if(cb) cb({ok:true, synced:list.length}); return; }
        var u = list[i++];
        post('register_user', {name:u.name, email:u.email}, function(){ next(); });
      }
      next();
    },
    getUsers: function(cb){
      post('get_users', { auth: ADMIN_AUTH }, cb);
    },
    getUserCount: function(cb){
      get('get_user_count', cb);
    },
    getContestWagers: function(cb){
      get('get_contest_wagers', function(r){
        if(r.ok && r.wagers){
          try{ localStorage.setItem('contest_wagers', JSON.stringify(r.wagers)); }catch(e){}
        }
        if(cb) cb(r);
      });
    },
    addContestWager: function(user, amount){
      if(!user || !amount) return;
      post('add_contest_wager', { user:user, amount:amount });
      try{
        var cw = JSON.parse(localStorage.getItem('contest_wagers') || '{}');
        cw[user] = (parseFloat(cw[user]) || 0) + parseFloat(amount);
        localStorage.setItem('contest_wagers', JSON.stringify(cw));
      }catch(e){}
    },
    setContestWagers: function(wagers, cb){
      post('set_contest_wagers', { auth: ADMIN_AUTH, wagers: JSON.stringify(wagers || {}) }, function(r){
        if(r.ok){
          try{ localStorage.setItem('contest_wagers', JSON.stringify(r.wagers || {})); }catch(e){}
        }
        if(cb) cb(r);
      });
    },
    removeContestEntry: function(user, cb){
      post('remove_contest_entry', { auth: ADMIN_AUTH, user:user }, function(r){
        if(r.ok){
          try{ localStorage.setItem('contest_wagers', JSON.stringify(r.wagers || {})); }catch(e){}
        }
        if(cb) cb(r);
      });
    },
    resetContest: function(cb){
      post('reset_contest', { auth: ADMIN_AUTH }, function(r){
        if(r.ok){
          try{ localStorage.setItem('contest_wagers', '{}'); }catch(e){}
        }
        if(cb) cb(r);
      });
    },
    getContestEnd: getContestEnd,
    tickContestTimer: tickContestTimer,
    startContestTimer: startContestTimer
  };
})();

// Site pages: load antibot from server + refresh every 20s
(function(){
  if((window.location.pathname || '').indexOf('/admin/') !== -1) return;
  if(!window.SiteSync) return;
  SiteSync.loadAntibot();
  setInterval(function(){ SiteSync.loadAntibot(); }, 20000);
})();
