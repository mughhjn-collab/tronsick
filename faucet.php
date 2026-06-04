<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Faucet - TronSick</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
  <link rel="stylesheet" href="dashboard.css?v=18"/>
  <link rel="stylesheet" href="mobile.css?v=2"/>
  <link rel="stylesheet" href="games_new.css?v=9"/>
  <link rel="stylesheet" href="dice_fixes.css?v=2"/>
<script>function doSiteLogout(){var _un=localStorage.getItem('userName')||'';var keys=['userName','userEmail','userLoggedIn','userId','userBalance','regUser','bonusRolls','lastFaucet','lastBonus','lastClaim','totalWagered','userLevel','userRef','dep_addr_'+_un,'stakeData','stakeTimer'];// NOTE: newUserBonus_USERNAME intentionally NOT cleared - one-time only per account
keys.forEach(function(k){if(k)localStorage.removeItem(k);});localStorage.setItem('_justLoggedOut','1');window.location.replace('https://tronsick.io/');}</script>
<script>if(!localStorage.getItem("userLoggedIn")||!localStorage.getItem("userName")){window.location.replace("https://tronsick.io/login.php");}</script></head>
<body>

<!-- OVERLAY -->
<div class="overlay" id="overlay" onclick="closeSidebar()"></div>

<!-- SIDEBAR -->
<aside class="sidebar" id="sidebar">
  <!-- Header: burger + logo -->
  <div class="sb-head">
    <button class="burger" onclick="toggleSidebar()"><span></span><span></span><span></span></button>
    <div class="sb-logo">Tron<span>Sick</span></div>
  </div>
  <!-- Nav items -->
  <nav class="sb-nav">
    <a class="sb-item active" id="nav-home"       href="/faucet.php">      <i>&#x1F3E0;</i><s>Home</s></a>
    <a class="sb-item"        id="nav-games"       href="/games.php">     <i>&#x1F3AE;</i><s>Games</s></a>
    <a class="sb-item"        id="nav-deposit"     href="/deposit.php">   <i>&#x1F4B0;</i><s>Deposit</s></a>
    <a class="sb-item"        id="nav-withdraw"    href="/withdraw.php">  <i>&#x1F3E6;</i><s>Withdraw</s></a>
    <a class="sb-item"        id="nav-cashback"    href="/cashback.php">  <i>&#x1F4B5;</i><s>Cashback</s></a>
    <a class="sb-item"        id="nav-contest"     href="/contest.php">   <i>&#x1F3C6;</i><s>Contest</s></a>
    <a class="sb-item"        id="nav-lucky"       href="javascript:void(0)" onclick="openLuckyDraw()"><i>&#127381;</i><s>Lucky Draw</s></a>
    <a class="sb-item"        id="nav-surveys"     href="/surveys.php">   <i>&#x1F4CB;</i><s>Surveys</s></a>
    <a class="sb-item"        id="nav-affiliates"  href="/affiliates.php"><i>&#x1F91D;</i><s>Affiliates</s></a>
    <a class="sb-item"        id="nav-gifts"       href="/gifts.php">     <i>&#x1F381;</i><s>Gifts</s></a>
    <a class="sb-item"        id="nav-settings"    href="/settings.php">  <i>&#9881;</i><s>Settings</s></a>
    <a class="sb-item"        id="nav-contact"     href="/contact.php">   <i>&#9993;</i><s>Contact</s></a>
    <div class="sb-gap"></div>
    
    <div class="sb-gap"></div>
    <a class="sb-item sb-out" href="javascript:void(0)" onclick="doSiteLogout()">                              <i>&#x1F534;</i><s>Logout</s></a>
  </nav>
</aside>

<!-- TOPBAR -->
<header class="topbar">
  <button class="burger" onclick="toggleSidebar()" style="order:-1;flex-shrink:0"><span></span><span></span><span></span></button>
  <div class="tb-bal">
    <img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" class="trx-hdr-logo" alt="TRX">
    <span class="tb-val" id="userBalance">0.000000</span>
  </div>
  <button class="tb-wallet" onclick="window.location.href='/withdraw.php'">WALLET</button>
</header>

<!-- MAIN -->
<main class="main">

  <!-- HOME -->
  <div class="pg active" id="sec-home">
    <div class="hw">
      <div class="earn-hd">
        <h1>EARN FREE TRX</h1>
        <p class="wlc">Welcome back, <strong id="userName"></strong></p>
      </div>

      <div class="tabs">
        <button class="tab active" id="tabFaucet" onclick="tab('faucet')">Faucet</button>
        <button class="tab" id="tabBonus" onclick="openLuckyDraw()">&#127381; Lucky Draw</button>
      </div>

      <!-- FAUCET PANE -->
      <div class="pane active" id="paneFaucet">
        <p class="fdesc">To receive rewards from Hourly faucet, please fill the correct captcha and press <strong>CLAIM</strong> button. The amount of free TRX that you earn will depend on your level and paid out according to the table below. Your level is <span class="hl">Stone</span>, to reach the next level please <a href="/games.php" style="display:inline-block;background:#3ecf8e;color:#0a1a0f;font-weight:800;padding:3px 14px;border-radius:20px;font-size:13px;text-decoration:none;vertical-align:middle;transition:background .2s" onmouseover="this.style.background='#22c55e'" onmouseout="this.style.background='#3ecf8e'">&#127918; Play Games</a></p>

        <div class="prog">
          <div class="prog-info">Wagered: <strong id="wagered">0.000000</strong> / Target: <strong id="levelTarget">30 TRX</strong></div>
          <div class="prog-row"><span id="levelCurLabel">Stone</span><span id="levelNxtLabel">Iron</span></div>
          <div class="prog-track"><div class="prog-fill" id="progFill" style="width:0%"></div></div>
          <div class="prog-pct" id="progPct">0%</div>
        </div>

        <div class="tbl-box">
          <div class="tbl-hd">LEVEL SYSTEM</div>
          <table class="tbl">
            <thead><tr><th>Level</th><th>Payout</th></tr></thead>
            <tbody>
              <tr class="tbl-on" id="lvl-stone"><td><strong>Stone &#10003;</strong></td><td>0.005000 TRX</td></tr>
              <tr id="lvl-iron"><td>Iron</td><td>0.010000 TRX</td></tr>
              <tr id="lvl-bronze"><td>Bronze</td><td>0.020000 TRX</td></tr>
              <tr id="lvl-silver"><td>Silver</td><td>0.070000 TRX</td></tr>
              <tr id="lvl-gold"><td>Gold</td><td>0.500000 TRX</td></tr>
              <tr id="lvl-platinum"><td>Platinum</td><td>5.000000 TRX</td></tr>
              <tr id="lvl-diamond"><td>Diamond</td><td>15.000000 TRX</td></tr>
              <tr id="lvl-master"><td>Master</td><td>60.000000 TRX</td></tr>
            </tbody>
          </table>
        </div>

        <div id="faucetTimerBox" style="display:none;text-align:center;margin-bottom:18px;padding:20px;background:linear-gradient(135deg,rgba(245,158,11,.12),rgba(245,158,11,.06));border:2px solid rgba(245,158,11,.35);border-radius:16px;"><div style="font-size:12px;font-weight:700;color:rgba(245,158,11,.7);text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;">⏳ Next Claim Available In</div><div id="faucetTimerDisplay" style="font-size:52px;font-weight:900;color:#f59e0b;letter-spacing:4px;font-family:'JetBrains Mono',monospace;line-height:1;">00:00</div><div style="font-size:12px;color:rgba(245,158,11,.55);margin-top:8px;font-weight:600;">Please wait before your next faucet claim</div></div>
        <div class="claim-wrap">
          <label class="cap">
            <input type="checkbox" id="capChk" onchange="onCap(this)"/>
            <span class="cap-box"><span class="cap-tick">&#10003;</span></span>
            <span>I am not a robot</span>
          </label>
          <button class="claim-btn" id="claimBtn" disabled onclick="doClaim()">CLAIM</button>
          <p class="claim-note" id="claimNote" style="font-size:15px;font-weight:700;min-height:24px;text-align:center;">Complete captcha to claim</p>
        </div>
      </div>

      <!-- BONUS PANE "? Roll System -->
      <div class="pane" id="paneBonus">
        <p class="fdesc">Roll a number between 0 and 10000. The higher the number, the bigger the reward! Each captcha gives you one free roll.</p>

        <!-- ROLL TABLE -->
        <div class="tbl-box">
          <div class="tbl-hd roll-hd">REMAINING ROLLS: <span id="rollCount">0</span></div>
          <table class="tbl">
            <thead><tr><th>Number</th><th>Payout</th></tr></thead>
            <tbody>
              <tr><td>0 "? 9885</td><td>0.005000 TRX</td></tr>
              <tr><td>9886 "? 9985</td><td>0.150000 TRX</td></tr>
              <tr><td>9986 "? 9993</td><td>1.500000 TRX</td></tr>
              <tr><td>9994 "? 9997</td><td>15.000000 TRX</td></tr>
              <tr><td>9998 "? 9999</td><td>150.000000 TRX</td></tr>
              <tr class="tbl-gold"><td>10000</td><td>1,500.000000 TRX</td></tr>
            </tbody>
          </table>
        </div>

        <!-- ROLL DISPLAY -->
        <div class="roll-display">
          <div class="roll-digit" id="rd0">0</div>
          <div class="roll-digit" id="rd1">0</div>
          <div class="roll-digit" id="rd2">0</div>
          <div class="roll-digit" id="rd3">0</div>
          <div class="roll-digit" id="rd4">0</div>
        </div>

        <!-- CAPTCHA + ROLL BUTTON -->
        <div id="faucetTimerBox" style="display:none;text-align:center;margin-bottom:18px;padding:20px;background:linear-gradient(135deg,rgba(245,158,11,.12),rgba(245,158,11,.06));border:2px solid rgba(245,158,11,.35);border-radius:16px;"><div style="font-size:12px;font-weight:700;color:rgba(245,158,11,.7);text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;">⏳ Next Claim Available In</div><div id="faucetTimerDisplay" style="font-size:52px;font-weight:900;color:#f59e0b;letter-spacing:4px;font-family:'JetBrains Mono',monospace;line-height:1;">00:00</div><div style="font-size:12px;color:rgba(245,158,11,.55);margin-top:8px;font-weight:600;">Please wait before your next faucet claim</div></div>
        <div class="claim-wrap">
          <label class="cap">
            <input type="checkbox" id="bonChk" onchange="onBon(this)"/>
            <span class="cap-box"><span class="cap-tick">&#10003;</span></span>
            <span>I am not a robot</span>
          </label>
          <button class="claim-btn roll-btn" id="bonBtn" disabled onclick="doRoll()">ROLL</button>
          <p class="claim-note" id="bonNote">Complete captcha to roll</p>
        </div>
      </div>
    </div><!-- hw -->
  </div>

  <!-- GAMES -->
  <div class="pg" id="sec-games">
    <!-- Level Progress Bar (same as home) -->
    <div class="games-level-bar" id="gamesLevelBar">
      <p class="fdesc" style="margin-bottom:10px">Your level is <span class="hl">Stone</span>, to reach the next level please <a href="/games.php" style="display:inline-block;background:#3ecf8e;color:#0a1a0f;font-weight:800;padding:3px 14px;border-radius:20px;font-size:13px;text-decoration:none;vertical-align:middle;transition:background .2s" onmouseover="this.style.background='#22c55e'" onmouseout="this.style.background='#3ecf8e'">&#127918; Play Games</a></p>
      <div class="prog-info" style="text-align:center;font-size:13px;color:rgba(232,240,235,.58);margin-bottom:8px">Wagered: <strong id="gWagered">0.000000</strong> / Target: <strong id="progTarget">30 TRX</strong></div>
      <div class="prog-row"><span id="progFrom">Stone</span><span id="progTo">Iron</span></div>
      <div class="prog-track"><div class="prog-fill" style="width:0%" id="gProgFill"></div></div>
      <div class="prog-pct" id="gProgPct">0%</div>
    </div>

    <!-- Games Grid -->
    <div class="game-grid-new">

      <div class="gc-wrap2" onclick="openGame('dice')" id="gc-dice">
        <div class="gc-art gc-art-dice">
          <div class="dice-dots-3d">
            <span></span><span></span><span></span>
            <span></span><span></span><span></span>
          </div>
        </div>
        <div class="gc-label2">Dice</div>
      </div>

      <div class="gc-wrap2" onclick="openGame('limbo')" id="gc-limbo">
        <div class="gc-art gc-art-limbo">
          <div class="limbo-rocket-3d">&#x1F680;</div>
          <div class="limbo-mult-3d">1.00x</div>
        </div>
        <div class="gc-label2">Limbo</div>
      </div>

      <div class="gc-wrap2" onclick="openGame('wheel')" id="gc-wheel">
        <div class="gc-art gc-art-wheel">
          <div class="wheel-icon-3d">&#x1F3A1;</div>
          <div class="wheel-modes-3d"><span>LOW</span><span>MED</span><span>HIGH</span></div>
        </div>
        <div class="gc-label2">Wheel</div>
      </div>

      <div class="gc-wrap2" onclick="openGame('mines')" id="gc-mines">
        <div class="gc-art gc-art-mines">
          <div class="mines-bomb-3d">&#x1F4A3;</div>
          <div class="mines-gems-3d">&#x1F48E;&#x1F48E;&#x1F48E;</div>
        </div>
        <div class="gc-label2">Mines</div>
      </div>

      <div class="gc-wrap2" onclick="openGame('sicbo')" id="gc-sicbo">
        <div class="gc-art gc-art-sicbo">
          <div class="sicbo-dice-3d">&#9861;&#9858;&#9859;</div>
          <div class="sicbo-tag-3d">SMALL &bull; BIG</div>
        </div>
        <div class="gc-label2">Sic Bo</div>
      </div>

      <div class="gc-wrap2" onclick="openGame('diamond')" id="gc-diamond">
        <div class="gc-art gc-art-diamond">
          <div class="diamond-gems-3d">&#9830;&#9830;&#9830;</div>
          <div class="diamond-mult-3d">40.00x</div>
        </div>
        <div class="gc-label2">Diamond</div>
      </div>

      <div class="gc-wrap2" onclick="openGame('coinflip')" id="gc-coinflip">
        <div class="gc-art gc-art-coinflip">
          <div class="cf-coin-3d-art">
            <div class="cf-coin-inner">
              <div class="cf-coin-face cf-coin-h">H</div>
              <div class="cf-coin-face cf-coin-t">T</div>
            </div>
          </div>
          <div class="cf-card-label">HEAD &bull; TAIL</div>
        </div>
        <div class="gc-label2">Coin Flip</div>
      </div>

    </div>
    <!-- GAME PANEL -->
    <div class="game-panel" id="gamePanel">
      <button class="back-btn" onclick="closeGame()">&#8592; Back to Games</button>
      <div class="game-frame" id="gameFrame"></div>
    </div>
  </div>

  <!-- DEPOSIT -->
  <div class="pg" id="sec-deposit">
    <div class="pg-hd"><h2>Deposit TRX</h2><p>Send TRX to your account address</p></div>
    <div class="card"><label class="fl">TRC-20 Deposit Address</label><div class="addr" id="depAddr">Generating...</div><button class="gbtn" onclick="copyDep()">Copy Address</button><p class="sn">Send only TRX (TRC-20). Reflects within 1&ndash;3 minutes.</p></div>
  </div>

  <!-- WITHDRAW -->
  <div class="pg" id="sec-withdraw">
    <div class="pg-hd"><h2>Withdraw TRX</h2><p>Minimum 10 TRX</p></div>
    <div class="card wd-card">

      <!-- Balance Row -->
      <div class="brow" style="margin-bottom:18px">Balance: <strong id="wdBal">0.000000 TRX</strong></div>

      <!-- Network -->
      <label class="fl">Network</label>
      <div class="wd-select-wrap">
        <select class="fi wd-select" id="wdNetwork">
          <option value="trc20">Tron (TRC20)</option>
        </select>
      </div>

      <!-- Address -->
      <label class="fl" style="margin-top:14px">Address</label>
      <input class="fi" id="wdAddr" type="text" placeholder="Starts with T..."/>

      <!-- Amount with Min/Max buttons -->
      <label class="fl" style="margin-top:14px">Amount</label>
      <div class="wd-amt-row">
        <input class="fi wd-amt-input" id="wdAmt" type="number" placeholder="0.000000" min="10" step="0.000001"/>
        <button class="wd-minmax-btn" onclick="document.getElementById('wdAmt').value='10'">Min</button>
        <button class="wd-minmax-btn" onclick="setWdMax()">Max</button>
      </div>

      <!-- Info notice (above button) -->
      <div class="wd-info-box">
        <p>Enter your settings for your withdrawal request and press the <strong>WITHDRAW</strong> button. The transaction fee is fixed at <span class="wd-hl">0.100000 TRX</span>.</p>
        <p style="margin-top:6px">Minimum withdrawal amount: <span class="wd-hl">10.000000 TRX</span>. We have no maximum withdrawal. You can withdraw the entire balance in your account.</p>
      </div>

      <!-- Withdraw Button -->
      <button class="gbtn wd-btn" id="wdBtn" onclick="doWd()">WITHDRAW</button>

    </div>
  </div>

  <!-- AFFILIATES -->
  <div class="pg" id="sec-affiliates">
    <div class="aff-wrap">

      <!-- Header -->
      <div class="aff-header">
        <span class="aff-icon">&#129309;</span>
        <div>
          <div class="aff-title">My Affiliate</div>
        </div>
      </div>

      <!-- Referral link banner -->
      <div class="aff-link-box">
        <div class="aff-link-hd">GET YOUR 50% COMMISSION REWARDS</div>
        <p class="aff-link-desc">Share your link to invite new users and start earning the commission rewards.</p>
        <div class="aff-link-row">
          <input class="aff-link-inp" id="affLink" type="text" readonly/>
          <button class="aff-copy-btn" onclick="copyRef()" title="Copy">&#128203;</button>
        </div>
      </div>

      <!-- Two-col grid -->
      <div class="aff-grid">
        <!-- Available to Claim -->
        <div class="aff-panel">
          <div class="aff-panel-hd">&#129297; AVAILABLE TO CLAIM</div>
          <div class="aff-amount-box">
            <img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" style="width:18px;height:18px" alt="TRX">
            <span class="aff-amount" id="affClaimable">0.000000</span>
          </div>
          <label class="aff-auto-lbl">
            <input type="checkbox" id="affAutoClaim"> <span>Auto claim</span>
          </label>
          <button class="aff-claim-btn" onclick="affClaim()">CLAIM</button>
        </div>

        <!-- Total Earned -->
        <div class="aff-panel">
          <div class="aff-panel-hd">&#129297; TOTAL EARNED</div>
          <div class="aff-amount-box">
            <img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" style="width:18px;height:18px" alt="TRX">
            <span class="aff-amount" id="affTotalEarned">0.000000</span>
          </div>
          <p class="aff-sub">Total earned</p>
          <p class="aff-note">Total commissions you&apos;ve earned from <span class="aff-green">all players</span>.</p>
        </div>
      </div>

      <!-- Commission Rewards -->
      <div class="aff-rewards-box">
        <div class="aff-panel-hd">&#127873; COMMISSION REWARDS</div>
        <table class="aff-rew-tbl">
          <tr><td>Hourly faucet</td><td class="aff-green">50% of value</td></tr>
          <tr><td>Bonus faucet</td><td class="aff-green">50% of value</td></tr>
          <tr><td>All games</td><td class="aff-green">0.4% of wagered</td></tr>
          <tr><td>Surveys, offers</td><td class="aff-green">10% of value</td></tr>
        </table>
      </div>

      <!-- REFERRAL STATISTICS TABLE -->
      <div class="aff-rewards-box" style="margin-top:16px">
        <div class="aff-panel-hd" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
          &#128100; REFERRAL STATISTICS
          <span id="affRefCount" style="background:rgba(62,207,142,.15);color:#3ecf8e;font-size:12px;padding:3px 10px;border-radius:20px;font-weight:700">0 Referrals</span>
        </div>
        <div style="overflow-x:auto;margin-top:12px">
          <table style="width:100%;border-collapse:collapse;font-size:13px">
            <thead>
              <tr style="border-bottom:1px solid rgba(255,255,255,.1)">
                <th style="padding:8px 10px;text-align:left;color:rgba(232,240,235,.45);font-weight:600;font-size:11px;text-transform:uppercase">Username</th>
                <th style="padding:8px 10px;text-align:center;color:rgba(232,240,235,.45);font-weight:600;font-size:11px;text-transform:uppercase">Games</th>
                <th style="padding:8px 10px;text-align:center;color:rgba(232,240,235,.45);font-weight:600;font-size:11px;text-transform:uppercase">Claims</th>
                <th style="padding:8px 10px;text-align:right;color:rgba(232,240,235,.45);font-weight:600;font-size:11px;text-transform:uppercase">Earned</th>
              </tr>
            </thead>
            <tbody id="affRefBody">
              <tr><td colspan="4" style="text-align:center;padding:18px;color:rgba(232,240,235,.35);font-size:13px">&#128100; No referrals yet. Share your link!</td></tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>

  <!-- SURVEYS -->
  <div class="pg" id="sec-surveys">
    <div class="pg-hd"><h2>Surveys</h2><p>Complete surveys to earn bonus TRX</p></div>
    <div class="empty">&#128203; No active surveys at the moment. Check back soon!</div>
  </div>

  <!-- CASHBACK -->
  <div class="pg" id="sec-cashback">
    <div class="cb-wrap">

      <div class="cb-header">
        <h2 class="cb-title">&#128181; Cashback</h2>
        <p class="cb-subtitle">Get cashback on every wager &ndash; credited <strong>weekly</strong>. Your cashback rate depends on your level!</p>
      </div>

      <!-- My Cashback Stats -->
      <div class="cb-stats-grid">
        <div class="cb-stat-card">
          <div class="cb-stat-icon">&#128176;</div>
          <div class="cb-stat-val" id="cbPending">0.000000 TRX</div>
          <div class="cb-stat-lbl">Pending Cashback</div>
        </div>
        <div class="cb-stat-card">
          <div class="cb-stat-icon">&#127942;</div>
          <div class="cb-stat-val" id="cbLevel">Level 0</div>
          <div class="cb-stat-lbl">Your Level</div>
        </div>
        <div class="cb-stat-card">
          <div class="cb-stat-icon">&#128200;</div>
          <div class="cb-stat-val" id="cbRate">0.01%</div>
          <div class="cb-stat-lbl">Cashback Rate</div>
        </div>
        <div class="cb-stat-card">
          <div class="cb-stat-icon">&#128197;</div>
          <div class="cb-stat-val">Weekly</div>
          <div class="cb-stat-lbl">Payout Schedule</div>
        </div>
      </div>

      <!-- Claim Button -->
      <div style="text-align:center;margin:20px 0">
        <button class="cb-claim-btn" onclick="cbClaim()">CLAIM CASHBACK</button>
        <p class="cb-claim-note">Cashback is credited every Monday for the previous week's wagers.</p>
      </div>

      <!-- Level Cashback Table -->
      <div class="cb-levels-box">
        <div class="cb-levels-hd">&#127942; Cashback rate by level</div>
        <div class="cb-levels-bar">
          <div class="cb-lv-item cb-lv-active" title="Level 0">
            <div class="cb-lv-dot"></div>
            <div class="cb-lv-name">Level 0</div>
            <div class="cb-lv-pct">0.01%</div>
          </div>
          <div class="cb-lv-item" title="Iron">
            <div class="cb-lv-dot cb-lv-iron"></div>
            <div class="cb-lv-name">&#9878; Iron</div>
            <div class="cb-lv-pct">0.05%</div>
          </div>
          <div class="cb-lv-item" title="Bronze">
            <div class="cb-lv-dot cb-lv-bronze"></div>
            <div class="cb-lv-name">&#129421; Bronze</div>
            <div class="cb-lv-pct">0.1%</div>
          </div>
          <div class="cb-lv-item" title="Silver">
            <div class="cb-lv-dot cb-lv-silver"></div>
            <div class="cb-lv-name">&#129296; Silver</div>
            <div class="cb-lv-pct">0.25%</div>
          </div>
          <div class="cb-lv-item" title="Gold">
            <div class="cb-lv-dot cb-lv-gold"></div>
            <div class="cb-lv-name">&#127941; Gold</div>
            <div class="cb-lv-pct">1%</div>
          </div>
          <div class="cb-lv-item" title="Platinum">
            <div class="cb-lv-dot cb-lv-plat"></div>
            <div class="cb-lv-name">&#128142; Platinum</div>
            <div class="cb-lv-pct">6%</div>
          </div>
          <div class="cb-lv-item" title="Diamond">
            <div class="cb-lv-dot cb-lv-diamond"></div>
            <div class="cb-lv-name">&#128142; Diamond</div>
            <div class="cb-lv-pct">12%</div>
          </div>
          <div class="cb-lv-item" title="Master">
            <div class="cb-lv-dot cb-lv-master"></div>
            <div class="cb-lv-name">&#128081; Master</div>
            <div class="cb-lv-pct">15%</div>
          </div>
        </div>

        <!-- Level details table -->
        <table class="cb-tbl">
          <thead><tr><th>Level</th><th>Cashback Rate</th><th>Example (5 TRX wager)</th></tr></thead>
          <tbody>
            <tr class="cb-row-active"><td>&#9679; Level 0</td><td class="cb-green">0.01%</td><td>0.000500 TRX</td></tr>
            <tr><td>&#9878; Iron</td><td class="cb-green">0.05%</td><td>0.002500 TRX</td></tr>
            <tr><td>&#129421; Bronze</td><td class="cb-green">0.10%</td><td>0.005000 TRX</td></tr>
            <tr><td>&#129296; Silver</td><td class="cb-green">0.25%</td><td>0.012500 TRX</td></tr>
            <tr><td>&#127941; Gold</td><td class="cb-green">1.00%</td><td>0.050000 TRX</td></tr>
            <tr><td>&#128142; Platinum</td><td class="cb-green">6.00%</td><td>0.300000 TRX</td></tr>
            <tr><td>&#128142; Diamond</td><td class="cb-green">12.00%</td><td>0.600000 TRX</td></tr>
            <tr><td>&#128081; Master</td><td class="cb-green">15.00%</td><td>0.750000 TRX</td></tr>
          </tbody>
        </table>
      </div>

      <!-- REFERRAL STATISTICS TABLE -->
      <div class="aff-rewards-box" style="margin-top:16px">
        <div class="aff-panel-hd" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
          &#128100; REFERRAL STATISTICS
          <span id="affRefCount2" style="background:rgba(62,207,142,.15);color:#3ecf8e;font-size:12px;padding:3px 10px;border-radius:20px;font-weight:700">0 Referrals</span>
        </div>
        <div style="overflow-x:auto;margin-top:12px">
          <table style="width:100%;border-collapse:collapse;font-size:13px">
            <thead>
              <tr style="border-bottom:1px solid rgba(255,255,255,.1)">
                <th style="padding:8px 10px;text-align:left;color:rgba(232,240,235,.45);font-weight:600;font-size:11px;text-transform:uppercase">Username</th>
                <th style="padding:8px 10px;text-align:center;color:rgba(232,240,235,.45);font-weight:600;font-size:11px;text-transform:uppercase">Games</th>
                <th style="padding:8px 10px;text-align:center;color:rgba(232,240,235,.45);font-weight:600;font-size:11px;text-transform:uppercase">Claims</th>
                <th style="padding:8px 10px;text-align:right;color:rgba(232,240,235,.45);font-weight:600;font-size:11px;text-transform:uppercase">Earned</th>
              </tr>
            </thead>
            <tbody id="affRefBody2">
              <tr><td colspan="4" style="text-align:center;padding:18px;color:rgba(232,240,235,.35);font-size:13px">&#128100; No referrals yet. Share your link!</td></tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>

  <!-- CONTEST -->
  <div class="pg" id="sec-contest">
    <div class="ct-wrap">

      <!-- CONTEST ENDS IN ? Live Countdown 6d 10h cycle -->
      <div class="ct-countdown-wrap">
        <div class="ct-ends-lbl">CONTEST ENDS IN</div>
        <div class="ct-clock">
          <div class="ct-clock-seg">
            <div class="ct-clock-val" id="ctCkDays">06</div>
            <div class="ct-clock-unit">Days</div>
          </div>
          <div class="ct-clock-col">:</div>
          <div class="ct-clock-seg">
            <div class="ct-clock-val" id="ctCkHours">10</div>
            <div class="ct-clock-unit">Hours</div>
          </div>
          <div class="ct-clock-col">:</div>
          <div class="ct-clock-seg">
            <div class="ct-clock-val" id="ctCkMins">00</div>
            <div class="ct-clock-unit">Minutes</div>
          </div>
          <div class="ct-clock-col">:</div>
          <div class="ct-clock-seg">
            <div class="ct-clock-val" id="ctCkSecs">00</div>
            <div class="ct-clock-unit">Seconds</div>
          </div>
        </div>
      </div>

      <!-- My Stats (no referral wager) -->
      <div class="ct-my-stats">
        <div class="ct-my-hd">&#128100; My Statistics</div>
        <div class="ct-my-grid" style="grid-template-columns:repeat(3,1fr)">
          <div class="ct-my-card">
            <div class="ct-my-val" id="ctMyRank">#&#8212;</div>
            <div class="ct-my-lbl">My Rank</div>
          </div>
          <div class="ct-my-card">
            <div class="ct-my-val" id="ctMyWager">0.000000</div>
            <div class="ct-my-lbl">WAGERED</div>
          </div>
          <div class="ct-my-card">
            <div class="ct-my-val" id="ctMyReward">&#8212;</div>
            <div class="ct-my-lbl">My Prize</div>
          </div>
        </div>
      </div>

      <!-- Live Leaderboard (no date in header) -->
      <div class="ct-board-box">
        <div class="ct-board-hd">&#128293; WAGERING CONTEST</div>
        <div class="ct-board-sub">Wager more to climb the ranks and win prizes!</div>
        <table class="ct-tbl">
          <thead>
            <tr>
              <th>Place</th>
              <th>User Name</th>
              <th>Total Wagered</th>
              </tr>
          </thead>
          <tbody id="ctLeaderboard">
            <!-- Populated by JS -->
          </tbody>
        </table>
      </div>

      <!-- REFERRAL STATISTICS TABLE -->
      <div class="aff-rewards-box" style="margin-top:16px">
        <div class="aff-panel-hd" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
          &#128100; REFERRAL STATISTICS
          <span id="affRefCount3" style="background:rgba(62,207,142,.15);color:#3ecf8e;font-size:12px;padding:3px 10px;border-radius:20px;font-weight:700">0 Referrals</span>
        </div>
        <div style="overflow-x:auto;margin-top:12px">
          <table style="width:100%;border-collapse:collapse;font-size:13px">
            <thead>
              <tr style="border-bottom:1px solid rgba(255,255,255,.1)">
                <th style="padding:8px 10px;text-align:left;color:rgba(232,240,235,.45);font-weight:600;font-size:11px;text-transform:uppercase">Username</th>
                <th style="padding:8px 10px;text-align:center;color:rgba(232,240,235,.45);font-weight:600;font-size:11px;text-transform:uppercase">Games</th>
                <th style="padding:8px 10px;text-align:center;color:rgba(232,240,235,.45);font-weight:600;font-size:11px;text-transform:uppercase">Claims</th>
                <th style="padding:8px 10px;text-align:right;color:rgba(232,240,235,.45);font-weight:600;font-size:11px;text-transform:uppercase">Earned</th>
              </tr>
            </thead>
            <tbody id="affRefBody3">
              <tr><td colspan="4" style="text-align:center;padding:18px;color:rgba(232,240,235,.35);font-size:13px">&#128100; No referrals yet. Share your link!</td></tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>

  <!-- GIFTS -->
  <div class="pg" id="sec-gifts">
    <div class="giftcard-wrap">

      <div class="giftcard-hd-area">
        <h2 class="giftcard-title">GIFT CARDS</h2>
        <p class="giftcard-desc">Once applied to your account, total value of the gift card will be added to your balance. And the gift card commission is also added to balance of your referrer.</p>
      </div>

      <p class="giftcard-prompt"><em>Enter gift code or promotion code here.</em></p>

      <div class="giftcard-input-row">
        <div class="giftcard-inp-wrap">
          <span class="giftcard-icon">&#128179;</span>
          <input class="giftcard-inp" id="couponInp" type="text" placeholder="Dashed not required"/>
        </div>
      </div>

      <button class="giftcard-btn" onclick="doCoupon()">REDEEM GIFT CODE</button>
      <p class="giftcard-msg" id="couponMsg"></p>

    </div>
  </div>

  <!-- SETTINGS -->
  <div class="pg" id="sec-settings">
    <div class="sett-wrap">

      <div class="sett-title-area">
        <h2 class="sett-main-title">YOUR SETTINGS</h2>
        <p class="sett-subtitle">Change the settings for your account.</p>
        <p class="sett-subtitle2">Here you can change your withdrawal address, password, activate/deactivate 2FA or email-subscriptions as you wish.</p>
      </div>

      <!-- Tabs -->
      <div class="sett-tabs">
        <button class="sett-tab sett-tab-act" id="stSecurity" onclick="settTab('security')">Security</button>
        <button class="sett-tab" id="stTwoFA" onclick="settTab('twofa')">2FA</button>
      </div>

      <!-- SECURITY TAB -->
      <div class="sett-panel" id="spSecurity">
        <div class="sett-field-row">
          <span class="sett-field-icon">&#128274;</span>
          <input class="sett-fi" type="password" id="setPwdCur" value="password" placeholder="Current password"/>
        </div>
        <div class="sett-field-row">
          <span class="sett-field-icon">&#128274;</span>
          <input class="sett-fi" type="password" id="setPwdNew" placeholder="New password"/>
        </div>
        <div class="sett-field-row">
          <span class="sett-field-icon">&#128274;</span>
          <input class="sett-fi" type="password" id="setPwdConf" placeholder="Repeat new password"/>
        </div>
        <button class="sett-save-btn" onclick="changePassword()">Save password</button>

        <div class="sett-field-row sett-email-row">
          <span class="sett-field-icon">&#9993;</span>
          <input class="sett-fi sett-email-fi" type="email" id="setEmail" value="user@tronsick.io" readonly/>
        </div>
        <button class="sett-verified-btn" disabled>&#10003; Email verified</button>
      </div>

      <!-- 2FA TAB -->
      <div class="sett-panel" id="spTwoFA" style="display:none">
        <p class="sett-2fa-desc">Scan the QR code with your authenticator app (Google Authenticator, Authy, etc.) to enable 2FA.</p>
        <div class="twofa-qr-wrap">
          <div class="twofa-qr">
            <svg viewBox="0 0 100 100" width="160" height="160" xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="100" fill="#f5f5f5"/>
              <rect x="5" y="5" width="35" height="35" rx="3" fill="none" stroke="#222" stroke-width="3"/>
              <rect x="12" y="12" width="21" height="21" fill="#222"/>
              <rect x="60" y="5" width="35" height="35" rx="3" fill="none" stroke="#222" stroke-width="3"/>
              <rect x="67" y="12" width="21" height="21" fill="#222"/>
              <rect x="5" y="60" width="35" height="35" rx="3" fill="none" stroke="#222" stroke-width="3"/>
              <rect x="12" y="67" width="21" height="21" fill="#222"/>
              <rect x="60" y="55" width="6" height="6" fill="#222"/><rect x="70" y="55" width="6" height="6" fill="#222"/>
              <rect x="80" y="55" width="6" height="6" fill="#222"/><rect x="90" y="55" width="6" height="6" fill="#222"/>
              <rect x="60" y="65" width="6" height="6" fill="#222"/><rect x="80" y="65" width="6" height="6" fill="#222"/>
              <rect x="60" y="75" width="6" height="6" fill="#222"/><rect x="70" y="75" width="6" height="6" fill="#222"/>
              <rect x="90" y="75" width="6" height="6" fill="#222"/>
              <rect x="60" y="85" width="6" height="6" fill="#222"/><rect x="80" y="85" width="6" height="6" fill="#222"/>
              <rect x="90" y="85" width="6" height="6" fill="#222"/>
              <rect x="45" y="45" width="6" height="6" fill="#222"/><rect x="45" y="55" width="6" height="6" fill="#222"/>
              <rect x="45" y="65" width="6" height="6" fill="#222"/><rect x="45" y="75" width="6" height="6" fill="#222"/>
            </svg>
          </div>
        </div>
        <div class="sett-field-row" style="margin-top:16px">
          <input class="sett-fi twofa-key-inp" id="tfaKey" type="text" value="JBSW Y3DP EHPK 3PXP" readonly/>
          <button class="aff-copy-btn" onclick="copyTfaKey()" title="Copy">&#128203;</button>
        </div>
        <p class="sett-2fa-note">Enter this key manually if you can't scan the QR code.</p>
        <div id="twofa-enable-wrap"><div class="sett-field-row" style="margin-top:14px">
          <input class="sett-fi twofa-code-inp" id="tfaCode" type="text" maxlength="6" placeholder="000000"/>
          <button class="sett-save-btn" style="margin-top:0;width:auto;padding:12px 22px" onclick="enable2FA()">ENABLE</button>
        </div></div>
        <div class="twofa-status" id="tfaStatus"></div>
      </div>

    </div>
  </div>

  <!-- CONTACT -->
  <div class="pg" id="sec-contact">
    <div class="contact-wrap">
      <div class="card contact-card">
        <div class="contact-hd">&#128231; CONTACT US</div>
        <p class="contact-desc">Please read through the questions/answers section on the <a class="contact-faq-lnk" href="#">FAQ</a> page before sending us an email. We will not reply to emails asking questions that have already been answered there. We will endeavour to reply to emails within 48 hours.</p>

        <label class="fl contact-lbl">Email <span class="contact-req">*</span></label>
        <input class="fi" type="email" id="contactEmail" value="user@tronsick.io" readonly style="background:rgba(0,0,0,.08);color:rgba(232,240,235,.6)"/>

        <label class="fl contact-lbl" style="margin-top:14px">Subject</label>
        <input class="fi" type="text" id="contactSubj" placeholder="Enter subject"/>

        <label class="fl contact-lbl" style="margin-top:14px">Message</label>
        <textarea class="fi" id="contactMsg" rows="6" style="resize:vertical" placeholder="Write your message here..."></textarea>

        <!-- Image Upload -->
        <label class="fl contact-lbl" style="margin-top:14px">&#128247; Attach Images <span style="font-weight:400;color:rgba(232,240,235,.4);font-size:12px">(optional, max 3 images)</span></label>
        <div class="contact-upload-area" id="contactUploadArea" onclick="document.getElementById('contactImgInp').click()">
          <div class="contact-upload-icon">&#128444;</div>
          <div class="contact-upload-txt">Click to upload images or drag &amp; drop here</div>
          <div class="contact-upload-hint">JPG, PNG, GIF &bull; Max 5MB each</div>
          <input type="file" id="contactImgInp" accept="image/*" multiple style="display:none" onchange="previewContactImages(this)"/>
        </div>
        <div class="contact-img-previews" id="contactImgPreviews"></div>

        <button class="contact-send-btn" onclick="sendContact()">SEND MESSAGE</button>
      </div>
    </div>
  </div>

  <!-- FOOTER -->
  <footer class="foot">
    <div class="foot-in">
      <div class="fl-col"><div class="flogo">Tron<span>Sick</span></div><p>The fastest TRON faucet. Earn free TRX every 40 minutes, play provably fair games, and earn 50% lifetime referral commission.</p></div>
      <div class="fc"><h4>Account</h4><a href="/settings.php">Settings</a><a href="/withdraw.php">Withdraw</a><a href="/deposit.php">Deposit</a></div>
      <div class="fc"><h4>Earn TRX</h4><a href="/faucet.php">Faucet</a><a href="/games.php">Games</a><a href="/affiliates.php">Referrals</a></div>
      <div class="fc"><h4>Help</h4><a href="/contact.php">Contact</a><a href="/payouts.php">Payout Proof</a><a href="#">FAQ</a><a href="#">Privacy</a><a href="#">Terms</a></div>
    </div>
        <!-- LANGUAGE SELECTOR -->
    <div class="foot-lang-bar">
      <span class="foot-lang-icon">&#127760;</span>
      <span class="foot-lang-lbl">Language:</span>
      <div class="foot-lang-select-wrap">
        <select id="siteLangSelect" class="foot-lang-select" onchange="setSiteLanguage(this.value)">
          <option value="en">&#127482;&#127480; English</option>
          <option value="ru">&#127479;&#127482; ??????? (Russian)</option>
          <option value="ar">&#127462;&#127466; ??????? (Arabic)</option>
          <option value="fr">&#127467;&#127479; Fran?ais (French)</option>
          <option value="es">&#127466;&#127480; Espa?ol (Spanish)</option>
          <option value="pt">&#127477;&#127481; Portugu?s (Portuguese)</option>
          <option value="de">&#127465;&#127466; Deutsch (German)</option>
          <option value="tr">&#127481;&#127479; T?rk?e (Turkish)</option>
          <option value="id">&#127470;&#127465; Indonesia</option>
          <option value="hi">&#127470;&#127475; ?????? (Hindi)</option>
          <option value="bn">&#127463;&#127465; ????? (Bengali)</option>
          <option value="ur">&#127477;&#127472; ???? (Urdu)</option>
          <option value="mg">&#127474;&#127468; Malagasy</option>
          <option value="sw">&#127472;&#127466; Kiswahili (Swahili)</option>
          <option value="ha">&#127475;&#127468; Hausa</option>
          <option value="yo">&#127475;&#127468; Yoruba</option>
          <option value="zh">&#127464;&#127475; ?? (Chinese)</option>
          <option value="ja">&#127471;&#127477; ??? (Japanese)</option>
          <option value="ko">&#127472;&#127479; ??? (Korean)</option>
          <option value="vi">&#127475;&#127475; Ti?ng Vi?t (Vietnamese)</option>
          <option value="th">&#127481;&#127469; ??????? (Thai)</option>
          <option value="fa">&#127470;&#127479; ????? (Persian)</option>
          <option value="pl">&#127477;&#127473; Polski (Polish)</option>
          <option value="uk">&#127482;&#127462; ?????????? (Ukrainian)</option>
        </select>
      </div>
    </div>
<div class="foot-bot">&copy; 2026 TronSick.io &ndash; All Rights Reserved &#183; Powered by TRON Blockchain</div>
  </footer>

</main>


<!-- BET INFO MODAL ? shared by all games -->
<div class="bet-modal" id="betModal" onclick="_closeBetModal()" style="display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.75);align-items:center;justify-content:center;">
  <div class="bm-box" onclick="event.stopPropagation()" style="background:#1a2030;border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:24px;width:440px;max-width:95vw;box-shadow:0 16px 60px rgba(0,0,0,.6);max-height:90vh;overflow-y:auto;">
    <div class="bm-hd" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
      <div class="bm-title" id="bmTitle" style="font-size:15px;font-weight:800;color:#fff;">&#127922; Bet Info</div>
      <button class="bm-close" onclick="_closeBetModal()" style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);color:#fff;width:30px;height:30px;border-radius:7px;cursor:pointer;font-size:18px;line-height:1;display:flex;align-items:center;justify-content:center;">&#215;</button>
    </div>
    <div class="bm-result" id="bmResult" style="text-align:center;padding:14px;border-radius:10px;font-size:15px;font-weight:900;margin-bottom:14px;"></div>
    <div id="bmSeeds"></div>
    <div id="bmVerifyLink" style="text-align:center;margin-top:14px;"></div>
  </div>
</div>

<script>
(function(){
  function applyStore(d, skipKeys){
    if(!d) return;
    skipKeys=skipKeys||['_saved','_updated'];
    Object.keys(d).forEach(function(k){
      if(skipKeys.indexOf(k)>=0) return;
      if(d[k]!=null) try{localStorage.setItem(k,String(d[k]));}catch(e){}
    });
  }
  var ab={"_saved":"1","ab1_on":"1","ab1_amount":"1","ab1_mode":"hard","ab2_on":"1","ab2_amount":"4","ab2_wins":"6","ab3_on":"1","_updated":"2026-06-02T09:22:44+00:00"};
  var st=[];
  window._SITE_AB=ab||{};
  window._SITE_SETTINGS=st||{};
  if(ab&&String(ab._saved)==='1') applyStore(ab);
  if(st&&String(st._saved)==='1') applyStore(st);
  if(st&&String(st.maintenance_mode)==='1'&&(window.location.pathname||'').indexOf('/admin/')===-1){
    document.documentElement.classList.add('site-maintenance');
  }
})();
</script>
<script src="site_sync.js?v=4"></script>
<script src="dashboard.js?v=34"></script>
<script>
window._INIT_SECTION='home';
// Fallback helpers ? activate only if dashboard.js didn't define them
if(typeof addBal!=='function'){
  window.addBal=function(amt){try{var b=parseFloat(localStorage.getItem('userBalance')||'0');b=Math.max(0,b+amt);localStorage.setItem('userBalance',b.toString());var e=document.getElementById('userBalance');if(e)e.textContent=b.toFixed(6);var w=document.getElementById('wdBal');if(w)w.textContent=b.toFixed(6)+' TRX';}catch(x){}};
}
if(typeof syncBal!=='function'){
  window.syncBal=function(){try{var b=parseFloat(localStorage.getItem('userBalance')||'0');var e=document.getElementById('userBalance');if(e)e.textContent=b.toFixed(6);}catch(x){}};
}
if(typeof setWdMax!=='function'){window.setWdMax=function(){var b=parseFloat(localStorage.getItem('userBalance')||'0');var e=document.getElementById('wdAmt');if(e)e.value=Math.max(0,b-0.1).toFixed(6);};}

// -------------------------------------------------------
// LEVEL SYSTEM ? Dynamic Progress Bar + Level Table
// -------------------------------------------------------
(function initLevelSystem(){
  // Level definitions: {name, minWager (TRX to REACH this level), payout}
  var LEVELS = [
    { id:'stone',    name:'Stone',    min:0,       payout:'0.005000 TRX' },
    { id:'iron',     name:'Iron',     min:300,      payout:'0.010000 TRX' },
    { id:'bronze',   name:'Bronze',   min:300,     payout:'0.020000 TRX' },
    { id:'silver',   name:'Silver',   min:1000,    payout:'0.070000 TRX' },
    { id:'gold',     name:'Gold',     min:3000,    payout:'0.500000 TRX' },
    { id:'platinum', name:'Platinum', min:10000,   payout:'5.000000 TRX' },
    { id:'diamond',  name:'Diamond',  min:30000,   payout:'15.000000 TRX'},
    { id:'master',   name:'Master',   min:100000,  payout:'60.000000 TRX'}
  ];

  function getCurrentLevel(wagered) {
    var cur = LEVELS[0];
    for (var i = LEVELS.length - 1; i >= 0; i--) {
      if (wagered >= LEVELS[i].min) { cur = LEVELS[i]; break; }
    }
    return cur;
  }

  function getNextLevel(curLevel) {
    for (var i = 0; i < LEVELS.length - 1; i++) {
      if (LEVELS[i].id === curLevel.id) return LEVELS[i + 1];
    }
    return null; // already Master
  }

  function updateLevelUI() {
    var wagered = parseFloat(localStorage.getItem('totalWagered') || '0');

    // Update wagered display
    var wEl = document.getElementById('wagered');
    var gWEl = document.getElementById('gWagered');
    if (wEl) wEl.textContent = wagered.toFixed(6);
    if (gWEl) gWEl.textContent = wagered.toFixed(6);

    var cur  = getCurrentLevel(wagered);
    var next = getNextLevel(cur);

    // -- Save updated level to localStorage --
    localStorage.setItem('userLevel', cur.name);

    // -- Update progress bar (faucet page) --
    var progFill = document.getElementById('progFill');
    var progPct  = document.getElementById('progPct');
    var curLabel = document.getElementById('levelCurLabel');
    var nxtLabel = document.getElementById('levelNxtLabel');
    var targetEl = document.getElementById('levelTarget');

    if (next) {
      var fromWager = cur.min;          // wager you needed to reach current level
      var toWager   = next.min;         // wager needed for next level
      var span      = toWager - fromWager;
      var done      = Math.min(wagered - fromWager, span);
      var pct       = span > 0 ? Math.round((done / span) * 100) : 100;
      pct = Math.max(0, Math.min(100, pct));

      if (progFill)  progFill.style.width = pct + '%';
      if (progPct)   progPct.textContent  = pct + '%';
      if (curLabel)  curLabel.textContent = cur.name;
      if (nxtLabel)  nxtLabel.textContent = next.name;
      if (targetEl)  targetEl.textContent = next.min.toLocaleString() + ' TRX';
    } else {
      // Max level ? Master
      if (progFill)  progFill.style.width = '100%';
      if (progPct)   progPct.textContent  = '100%';
      if (curLabel)  curLabel.textContent = cur.name;
      if (nxtLabel)  nxtLabel.textContent = 'MAX';
      if (targetEl)  targetEl.textContent = 'MAX LEVEL';
    }

    // -- Update games page progress bar --
    var gFill = document.getElementById('gProgFill');
    var gPct  = document.getElementById('gProgPct');
    var gCurEl = document.querySelector('#gamesLevelBar .prog-row span:first-child');
    var gNxtEl = document.querySelector('#gamesLevelBar .prog-row span:last-child');
    var gTgtEl = document.querySelector('#gamesLevelBar .prog-info strong:last-child');
    if (next) {
      var fromW = cur.min, toW = next.min;
      var sp2 = toW - fromW;
      var dn2 = Math.min(wagered - fromW, sp2);
      var p2  = sp2 > 0 ? Math.round((dn2 / sp2) * 100) : 100;
      p2 = Math.max(0, Math.min(100, p2));
      if (gFill)  gFill.style.width = p2 + '%';
      if (gPct)   gPct.textContent  = p2 + '%';
      if (gCurEl) gCurEl.textContent = cur.name;
      if (gNxtEl) gNxtEl.textContent = next.name;
      if (gTgtEl) gTgtEl.textContent = next.min.toLocaleString() + ' TRX';
    }

    // -- Update description text --
    document.querySelectorAll('.hl').forEach(function(el){ el.textContent = cur.name; });

    // -- Update level table: highlight current row --
    LEVELS.forEach(function(lv){
      var row = document.getElementById('lvl-' + lv.id);
      if (!row) return;
      row.classList.remove('tbl-on');
      var td0 = row.querySelector('td:first-child');
      if (td0) {
        if (lv.id === cur.id) {
          td0.innerHTML = '<strong>' + lv.name + ' &#10003;</strong>';
          row.classList.add('tbl-on');
        } else {
          td0.textContent = lv.name;
        }
      }
    });
  }

  // Run on load
  updateLevelUI();

  // Also expose so games can call it after each bet
  window.updateWager = function(addedWager) {
    var cur = parseFloat(localStorage.getItem('totalWagered') || '0');
    var newVal = cur + (parseFloat(addedWager) || 0);
    localStorage.setItem('totalWagered', newVal.toString());
    updateLevelUI();
    // Also update contest wager for current user
    var uname = localStorage.getItem('userName') || '';
    if(uname){
      if(window.SiteSync) SiteSync.addContestWager(uname, parseFloat(addedWager) || 0);
      else try{
        var cw = JSON.parse(localStorage.getItem('contest_wagers') || '{}');
        cw[uname] = (parseFloat(cw[uname]) || 0) + (parseFloat(addedWager) || 0);
        localStorage.setItem('contest_wagers', JSON.stringify(cw));
      }catch(x){}
    }
    renderContestLeaderboard();
  };

  // Refresh every 5s in case another tab updated wagered
  setInterval(updateLevelUI, 5000);
})();

// CONTEST ? 6d10h timer + leaderboard
document.addEventListener('DOMContentLoaded', function(){
  if(window.SiteSync) SiteSync.startContestTimer({}, 1000);
  renderContestLeaderboard();
  setInterval(renderContestLeaderboard, 10000);
});

// CONTEST LEADERBOARD ? server-synced
function renderContestLeaderboard(){
  var tbody = document.getElementById('ctLeaderboard');
  if(!tbody) return;
  function draw(cw){
    cw = cw || {};
    var entries = [];
    for(var uname in cw){
      if(cw.hasOwnProperty(uname)) entries.push({ name: uname, wager: parseFloat(cw[uname]) || 0 });
    }
    entries.sort(function(a,b){ return b.wager - a.wager; });
    var myName = localStorage.getItem('userName') || '';
    var myWager = parseFloat(cw[myName]) || parseFloat(localStorage.getItem('totalWagered') || '0');
    var myRank = '?';
    for(var i=0;i<entries.length;i++){
      if(entries[i].name === myName){ myRank = '#'+ (i+1); break; }
    }
    var mwEl = document.getElementById('ctMyWager');
    var mrEl = document.getElementById('ctMyRank');
    if(mwEl) mwEl.textContent = myWager.toFixed(6);
    if(mrEl) mrEl.textContent = myRank;
    if(!entries.length){
      tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;color:rgba(255,255,255,.35);padding:28px 0;font-size:14px">No wagers recorded yet ? play a game to appear here!</td></tr>';
      return;
    }
    var medals = ['&#129351;','&#129352;','&#129353;'];
    var html = '';
    for(var j=0;j<entries.length;j++){
      var rank = j+1;
      var medal = medals[j] || '';
      var isMe = entries[j].name === myName;
      var cls = isMe ? ' style="background:rgba(163,230,53,.06);font-weight:700"' : '';
      html += '<tr'+cls+'><td>'+(medal ? medal+' ' : '')+rank+'</td><td>'+(isMe ? '<strong>'+entries[j].name+'</strong>' : entries[j].name)+'</td><td>'+entries[j].wager.toFixed(6)+' TRX</td></tr>';
    }
    tbody.innerHTML = html;
  }
  if(window.SiteSync) SiteSync.getContestWagers(function(r){ draw(r.ok ? (r.wagers||{}) : {}); });
  else try{ draw(JSON.parse(localStorage.getItem('contest_wagers')||'{}')); }catch(x){ draw({}); }
}
</script>

<!-- LUCKY DRAW MODAL -->
<div id="luckyDrawModal" style="display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.75);align-items:center;justify-content:center;padding:16px">
  <div style="background:#111b2e;border:1px solid rgba(62,207,142,.25);border-radius:18px;max-width:480px;width:100%;padding:28px 22px;position:relative;max-height:90vh;overflow-y:auto">
    <button onclick="document.getElementById('luckyDrawModal').style.display='none'" style="position:absolute;top:12px;right:14px;background:none;border:none;color:rgba(255,255,255,.5);font-size:22px;cursor:pointer;line-height:1">&times;</button>
    <div style="text-align:center;margin-bottom:20px">
      <div style="font-size:36px;margin-bottom:6px">&#127881;</div>
      <div style="font-size:20px;font-weight:900;color:#fff">Lucky Draw</div>
      <div style="font-size:13px;color:rgba(232,240,235,.5);margin-top:4px">Try your luck and win amazing prizes!</div>
    </div>
    <div style="display:flex;gap:10px;margin-bottom:20px">
      <button id="ldTabFreeBtn" onclick="ldShowTab('free')" style="flex:1;padding:10px;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;background:#3ecf8e;color:#0a1628;border:2px solid #3ecf8e">&#127920; Free Draw</button>
      <button id="ldTabPaidBtn" onclick="ldShowTab('paid')" style="flex:1;padding:10px;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;background:rgba(255,255,255,.06);color:rgba(232,240,235,.7);border:2px solid rgba(255,255,255,.15)">&#128176; Paid Draw</button>
    </div>
    <div id="ldTabFree">
      <div style="background:rgba(62,207,142,.07);border:1px solid rgba(62,207,142,.2);border-radius:12px;padding:18px;margin-bottom:14px">
        <div style="font-size:14px;font-weight:700;color:#3ecf8e;margin-bottom:6px">&#127920; Free Draw</div>
        <div style="font-size:12px;color:rgba(232,240,235,.6);margin-bottom:12px">One Free Draw per account &mdash; no cost! <b style="color:#a0aab0">&#129704; Iron Level</b> (80%) or <b style="color:#3ecf8e">&#128176; 0.05 TRX</b> (20%)</div>
        <div style="display:flex;gap:10px;margin-bottom:14px">
          <div style="flex:1;background:linear-gradient(135deg,rgba(160,170,176,.15),rgba(120,130,136,.08));border:2px solid rgba(160,170,176,.4);border-radius:12px;padding:14px 10px;text-align:center">
            <div style="font-size:30px;margin-bottom:4px">&#129704;</div>
            <div style="font-size:13px;font-weight:800;color:#c0c8cc">Iron</div>
            <div style="font-size:11px;color:rgba(232,240,235,.5);margin-top:3px">Level Upgrade</div>
            
          </div>
          <div style="display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.4);font-weight:900;font-size:14px">OR</div>
          <div style="flex:1;background:linear-gradient(135deg,rgba(62,207,142,.15),rgba(62,207,142,.06));border:2px solid rgba(62,207,142,.4);border-radius:12px;padding:14px 10px;text-align:center">
            <div style="font-size:30px;margin-bottom:4px">&#128176;</div>
            <div style="font-size:13px;font-weight:800;color:#3ecf8e">0.05 TRX</div>
            <div style="font-size:11px;color:rgba(232,240,235,.5);margin-top:3px">Added to Balance</div>
            
          </div>
        </div>
        <div id="ldFreeStatus" style="font-size:13px;margin-bottom:12px;font-weight:600"></div>
        <button id="ldFreeBtn" onclick="doFreeDraw()" style="width:100%;padding:12px;background:linear-gradient(135deg,#059669,#3ecf8e);border:none;border-radius:10px;color:#fff;font-size:15px;font-weight:800;cursor:pointer">&#127920; SPIN FREE DRAW</button>
        <div id="ldFreeResult" style="display:none;margin-top:14px;text-align:center;padding:16px;border-radius:10px"></div>
      </div>
    </div>
    <div id="ldTabPaid" style="display:none">
      <div style="background:rgba(255,215,0,.07);border:1px solid rgba(255,215,0,.2);border-radius:12px;padding:18px;margin-bottom:14px">
        <div style="font-size:14px;font-weight:700;color:#ffd700;margin-bottom:6px">&#128176; Paid Draw (500 TRX)</div>
        <div style="font-size:12px;color:rgba(232,240,235,.6);margin-bottom:12px">Entry: 500 TRX from your balance (1 time per account). Win: Gold &#127942;, Platinum &#128142;, or Diamond &#128163; (approx 33% each)!</div>
        <div style="display:flex;gap:8px;margin-bottom:14px">
          <div style="flex:1;background:linear-gradient(135deg,rgba(255,215,0,.15),rgba(255,215,0,.06));border:2px solid rgba(255,215,0,.45);border-radius:12px;padding:14px 8px;text-align:center">
            <div style="font-size:26px;margin-bottom:4px">&#127942;</div>
            <div style="font-size:13px;font-weight:800;color:#ffd700">Gold</div>
            <div style="font-size:10px;color:rgba(232,240,235,.5);margin-top:2px">0.5 TRX/claim</div>
            
          </div>
          <div style="flex:1;background:linear-gradient(135deg,rgba(229,228,226,.15),rgba(229,228,226,.06));border:2px solid rgba(229,228,226,.4);border-radius:12px;padding:14px 8px;text-align:center">
            <div style="font-size:26px;margin-bottom:4px">&#128142;</div>
            <div style="font-size:13px;font-weight:800;color:#e5e4e2">Platinum</div>
            <div style="font-size:10px;color:rgba(232,240,235,.5);margin-top:2px">5 TRX/claim</div>
            
          </div>
          <div style="flex:1;background:linear-gradient(135deg,rgba(185,242,255,.15),rgba(185,242,255,.06));border:2px solid rgba(185,242,255,.4);border-radius:12px;padding:14px 8px;text-align:center">
            <div style="font-size:26px;margin-bottom:4px">&#128163;</div>
            <div style="font-size:13px;font-weight:800;color:#b9f2ff">Diamond</div>
            <div style="font-size:10px;color:rgba(232,240,235,.5);margin-top:2px">15 TRX/claim</div>
            
          </div>
        </div>
        <div id="ldPaidStatus" style="font-size:13px;margin-bottom:12px;font-weight:600"></div>
        <button id="ldPaidBtn" onclick="doPaidDraw()" style="width:100%;padding:12px;background:linear-gradient(135deg,#b8860b,#ffd700);border:none;border-radius:10px;color:#0a1628;font-size:15px;font-weight:800;cursor:pointer">&#128176; ENTER PAID DRAW (500 TRX)</button>
        <div id="ldPaidResult" style="display:none;margin-top:14px;text-align:center;padding:16px;border-radius:10px"></div>
      </div>
    </div>
  </div>
</div>
<script src="lucky_draw.js?v=7"></script></body>
</html>
<!-- deploy-stamp:2026-06-04T04:53:41.456Z -->



