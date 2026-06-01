<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Live Payout Proof — TronSick</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
  <link rel="stylesheet" href="dashboard.css?v=18"/>
  <style>
    body{background:#0a0f1a;min-height:100vh;display:flex;flex-direction:column}
    .po-top{display:flex;align-items:center;justify-content:space-between;padding:16px 24px;border-bottom:1px solid rgba(255,255,255,.06)}
    .po-logo{font-size:20px;font-weight:900;color:#fff;text-decoration:none}
    .po-logo span{color:#3ecf8e}
    .po-nav{display:flex;gap:12px}
    .po-nav a{font-size:13px;font-weight:600;color:rgba(255,255,255,.5);text-decoration:none;padding:8px 14px;border-radius:8px;transition:all .2s}
    .po-nav a:hover{color:#fff;background:rgba(255,255,255,.06)}
    .po-nav a.po-active{color:#3ecf8e;background:rgba(62,207,142,.08)}
    .po-foot{margin-top:auto;text-align:center;padding:24px;font-size:12px;color:rgba(255,255,255,.25);border-top:1px solid rgba(255,255,255,.05)}
    .po-foot a{color:rgba(255,255,255,.4);margin:0 10px;text-decoration:none}
    .po-foot a:hover{color:#3ecf8e}
  </style>
</head>
<body>

<header class="po-top">
  <a href="/faucet.php" class="po-logo">Tron<span>Sick</span></a>
  <nav class="po-nav">
    <a href="/faucet.php">Home</a>
    <a href="/withdraw.php">Withdraw</a>
    <a href="/payouts.php" class="po-active">Payout Proof</a>
    <a href="/login.php">Login</a>
  </nav>
</header>

<main class="po-wrap">
  <div class="po-hdr">
    <h1><i class="fas fa-receipt" style="color:#3ecf8e;margin-right:8px"></i>Live Payout Proof</h1>
    <p>Real-time withdrawal payouts processed on the TRON blockchain. Click any TxID to verify on Tronscan.</p>
    <div class="po-live"><span class="po-live-dot"></span> LIVE UPDATES</div>
  </div>

  <div class="po-tbl-wrap">
    <table class="po-tbl">
      <thead>
        <tr>
          <th>User</th>
          <th>Amount</th>
          <th>TxID</th>
          <th>Address</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody id="poTbody">
        <tr><td colspan="5" class="po-empty">Loading payouts...</td></tr>
      </tbody>
    </table>
  </div>
</main>

<footer class="po-foot">
  <a href="/contact.php">Contact</a>
  <a href="/withdraw.php">Withdraw</a>
  <a href="/payouts.php">Payout Proof</a>
  <div style="margin-top:10px">&copy; 2026 TronSick.io — All Rights Reserved</div>
</footer>

<script src="site_sync.js?v=5"></script>
<script>
(function(){
  function esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); }
  function fmtDate(iso){
    try{ return new Date(iso).toLocaleString(); }catch(e){ return iso||''; }
  }
  function render(list){
    var tb = document.getElementById('poTbody');
    if(!tb) return;
    if(!list || !list.length){
      tb.innerHTML = '<tr><td colspan="5" class="po-empty">No payouts yet. Check back soon.</td></tr>';
      return;
    }
    var html = '';
    list.slice().reverse().forEach(function(p){
      var tx = esc(p.txid||'');
      var txShort = tx.length > 18 ? tx.substr(0,16)+'...' : tx;
      var addr = esc(p.address||'');
      var addrShort = addr.length > 20 ? addr.substr(0,18)+'...' : addr;
      html += '<tr>';
      html += '<td><strong>'+esc(p.username)+'</strong></td>';
      html += '<td class="po-amt">'+esc(p.amount)+' TRX</td>';
      html += '<td class="po-txid"><a href="https://tronscan.org/#/transaction/'+tx+'" target="_blank" rel="noopener">'+txShort+' <i class="fas fa-external-link-alt" style="font-size:9px"></i></a></td>';
      html += '<td class="po-addr" title="'+addr+'">'+addrShort+'</td>';
      html += '<td style="font-size:12px;color:rgba(232,240,235,.45)">'+fmtDate(p.date)+'</td>';
      html += '</tr>';
    });
    tb.innerHTML = html;
  }
  function load(){
    if(window.SiteSync){
      SiteSync.getGenPayouts(function(r){
        render(r.ok ? (r.payouts||[]) : []);
      });
    } else {
      try{ render(JSON.parse(localStorage.getItem('gen_payouts')||'[]')); }catch(e){ render([]); }
    }
  }
  load();
  setInterval(load, 12000);
})();
</script>
</body>
</html>
