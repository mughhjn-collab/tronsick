<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Settings &ndash; TronSick</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
  <link rel="stylesheet" href="dashboard.css?v=17"/>
  <link rel="stylesheet" href="mobile.css?v=1"/>
  <link rel="stylesheet" href="games_new.css?v=9"/>
  <link rel="stylesheet" href="dice_fixes.css?v=2"/>
<script>function doSiteLogout(){var keys=['userName','userEmail','userLoggedIn','userId','userBalance','regUser','bonusRolls','lastFaucet','lastBonus','lastClaim','totalWagered','userLevel','userRef','dep_addr_'+localStorage.getItem('userName'),'stakeData','stakeTimer'];keys.forEach(function(k){if(k)localStorage.removeItem(k);});localStorage.setItem('_justLoggedOut','1');window.location.replace('https://tronsick.io/');}</script>
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
    <a class="sb-item" id="nav-home"       href="/faucet.php">      <i>&#x1F3E0;</i><s>Home</s></a>
    <a class="sb-item"        id="nav-games"       href="/games.php">     <i>&#x1F3AE;</i><s>Games</s></a>
    <a class="sb-item"        id="nav-deposit"     href="/deposit.php">   <i>&#x1F4B0;</i><s>Deposit</s></a>
    <a class="sb-item"        id="nav-withdraw"    href="/withdraw.php">  <i>&#x1F3E6;</i><s>Withdraw</s></a>
    <a class="sb-item"        id="nav-cashback"    href="/cashback.php">  <i>&#x1F4B5;</i><s>Cashback</s></a>
    <a class="sb-item"        id="nav-contest"     href="/contest.php">   <i>&#x1F3C6;</i><s>Contest</s></a>
    <a class="sb-item" id="nav-lucky" href="javascript:void(0)" onclick="openLuckyDraw()"><i>&#127381;</i><s>Lucky Draw</s></a>
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
  <button class="tb-wallet" href="/withdraw.php">WALLET</button>
</header>

<!-- MAIN -->
<main class="main">

  <!-- HOME -->
  <div class="pg" id="sec-home">
    <div class="hw">
      <div class="earn-hd">
        <h1>EARN FREE TRX</h1>
        <p class="wlc">Welcome back, <strong id="userName"></strong></p>
      </div>

      <div class="tabs">
        <button class="tab active" id="tabFaucet" onclick="tab('faucet')">Faucet</button>
        <button class="tab"        id="tabBonus"  onclick="tab('bonus')">Bonus</button>
      </div>

      <!-- FAUCET PANE -->
      <div class="pane active" id="paneFaucet">
        <p class="fdesc">To receive rewards from Hourly faucet, please fill the correct captcha and press <strong>CLAIM</strong> button. The amount of free TRX that you earn will depend on your level and paid out according to the table below. Your level is <span class="hl">Stone</span>, to reach the next level please <a href="/games.php" style="display:inline-block;background:#3ecf8e;color:#0a1a0f;font-weight:800;padding:3px 14px;border-radius:20px;font-size:13px;text-decoration:none;vertical-align:middle;transition:background .2s" onmouseover="this.style.background='#22c55e'" onmouseout="this.style.background='#3ecf8e'">&#127918; Play Games</a></p>

        <div class="prog">
          <div class="prog-info">Wagered: <strong id="wagered">0.000000</strong> / Target: <strong>30 TRX</strong></div>
          <div class="prog-row"><span>Stone</span><span>Iron</span></div>
          <div class="prog-track"><div class="prog-fill" style="width:3%"></div></div>
          <div class="prog-pct">0%</div>
        </div>

        <div class="tbl-box">
          <div class="tbl-hd">LEVEL SYSTEM</div>
          <table class="tbl">
            <thead><tr><th>Level</th><th>Payout</th></tr></thead>
            <tbody>
              <tr class="tbl-on"><td><strong>Stone &#10003;</strong></td><td>0.005000 TRX</td></tr>
              <tr><td>Iron</td><td>0.010000 TRX</td></tr>
              <tr><td>Bronze</td><td>0.020000 TRX</td></tr>
              <tr><td>Silver</td><td>0.070000 TRX</td></tr>
              <tr><td>Gold</td><td>0.500000 TRX</td></tr>
              <tr><td>Platinum</td><td>5.000000 TRX</td></tr>
              <tr><td>Diamond</td><td>15.000000 TRX</td></tr>
              <tr><td>Master</td><td>60.000000 TRX</td></tr>
            </tbody>
          </table>
        </div>

        <div class="claim-wrap">
          <label class="cap">
            <input type="checkbox" id="capChk" onchange="onCap(this)"/>
            <span class="cap-box"><span class="cap-tick">&#10003;</span></span>
            <span>I am not a robot</span>
          </label>
          <button class="claim-btn" id="claimBtn" disabled onclick="doClaim()">CLAIM</button>
          <p class="claim-note" id="claimNote">Complete captcha to claim</p>
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
      <div class="prog-info" style="text-align:center;font-size:13px;color:rgba(232,240,235,.58);margin-bottom:8px">Wagered: <strong id="gWagered">0.000000</strong> / Target: <strong>30 TRX</strong></div>
      <div class="prog-row"><span>Stone</span><span>Iron</span></div>
      <div class="prog-track"><div class="prog-fill" style="width:3%" id="gProgFill"></div></div>
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

    </div>
  </div>
  <!-- STAKE -->
  <div class="pg" id="sec-stake">
    <div class="stake-wrap">
      <div class="stake-header">
        <div class="stake-icon">&#x1F4B0;</div>
        <div>
          <h2 class="stake-title">TRX Staking</h2>
          <p class="stake-subtitle">Lock your TRX for 24 hours and earn daily rewards automatically</p>
        </div>
      </div>

      <!-- Current Stake Status -->
      <div class="stake-status-card" id="stakeStatusCard" style="display:none">
        <div class="stake-status-hd">&#x23F3; Active Stake</div>
        <div class="stake-status-grid">
          <div class="stake-stat"><div class="stake-stat-v" id="stakeLockedAmt">0</div><div class="stake-stat-l">Staked TRX</div></div>
          <div class="stake-stat"><div class="stake-stat-v" id="stakeRewardAmt" style="color:#3ecf8e">0</div><div class="stake-stat-l">Daily Reward</div></div>
          <div class="stake-stat"><div class="stake-stat-v" id="stakeCountdown">--:--:--</div><div class="stake-stat-l">Time Left</div></div>
        </div>
        <button class="stake-claim-btn" id="stakeClaimBtn" onclick="stakeClaim()" disabled>Claim Reward</button>
        <div class="stake-claim-note" id="stakeClaimNote">Stake is locked for 24 hours</div>
        <button class="stake-unstake-btn" id="stakeUnstakeBtn" onclick="stakeUnstake()" disabled>Unstake &amp; Withdraw</button>
      </div>

      <!-- Stake Tiers -->
      <div class="stake-tiers" id="stakeTiersPanel">
        <div class="stake-tiers-hd">&#x1F4CA; Choose Stake Tier</div>
        <div class="stake-tiers-grid">
          <div class="stake-tier-card" onclick="stakeSelect(10)">
            <div class="stake-tier-amount">10 TRX</div>
            <div class="stake-tier-reward">+0.05 TRX/day</div>
            <button class="stake-tier-btn">Stake 10 TRX</button>
          </div>
          <div class="stake-tier-card stake-tier-popular" onclick="stakeSelect(200)">
            <div class="stake-tier-badge">POPULAR</div>
            <div class="stake-tier-amount">200 TRX</div>
            <div class="stake-tier-reward">+0.5 TRX/day</div>
            <button class="stake-tier-btn">Stake 200 TRX</button>
          </div>
          <div class="stake-tier-card" onclick="stakeSelect(2000)">
            <div class="stake-tier-amount">2000 TRX</div>
            <div class="stake-tier-reward">+2 TRX/day</div>
            <button class="stake-tier-btn">Stake 2000 TRX</button>
          </div>
          <div class="stake-tier-card stake-tier-vip" onclick="stakeSelect(5000)">
            <div class="stake-tier-badge">VIP</div>
            <div class="stake-tier-amount">5000 TRX</div>
            <div class="stake-tier-reward">+10 TRX/day</div>
            <button class="stake-tier-btn">Stake 5000 TRX</button>
          </div>
        </div>
        <div class="stake-info-box">
          &#x26A0; Your TRX will be locked for <strong>24 hours</strong>. You can claim your reward and unstake after the lock period ends.
          Maximum 1 active stake at a time.
        </div>
      </div>

      <!-- Stake History -->
      <div class="stake-hist-wrap">
        <div class="stake-hist-hd">&#x1F4CB; Stake History</div>
        <div id="stakeHistBody"><div class="dg-no-bets">No stake history yet.</div></div>
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

    </div>
  </div>

  <!-- CONTEST -->
  <div class="pg" id="sec-contest">
    <div class="ct-wrap">

      <!-- CONTEST ENDS IN ? Big Countdown -->
      <div class="ct-countdown-wrap">
        <div class="ct-ends-lbl">CONTEST ENDS IN</div>
        <div class="ct-clock">
          <div class="ct-clock-seg">
            <div class="ct-clock-val" id="ctCkDays">00</div>
            <div class="ct-clock-unit">Days</div>
          </div>
          <div class="ct-clock-col">:</div>
          <div class="ct-clock-seg">
            <div class="ct-clock-val" id="ctCkHours">00</div>
            <div class="ct-clock-unit">Hours</div>
          </div>
          <div class="ct-clock-col">:</div>
          <div class="ct-clock-seg">
            <div class="ct-clock-val" id="ctCkMins">00</div>
            <div class="ct-clock-unit">Minutes</div>
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

      <!-- Prize Pool -->
      <div class="ct-prizes">
        <div class="ct-prizes-hd">&#127881; Prize Pool</div>
        <div class="ct-prize-row"><span class="ct-rank ct-rank-1">&#129351; 1st</span><span class="ct-prize">500 TRX</span></div>
        <div class="ct-prize-row"><span class="ct-rank ct-rank-2">&#129352; 2nd</span><span class="ct-prize">250 TRX</span></div>
        <div class="ct-prize-row"><span class="ct-rank ct-rank-3">&#129353; 3rd</span><span class="ct-prize">100 TRX</span></div>
        <div class="ct-prize-row"><span class="ct-rank">4th &ndash; 10th</span><span class="ct-prize">25 TRX each</span></div>
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
              <th>Reward</th>
            </tr>
          </thead>
          <tbody id="ctLeaderboard">
            <!-- Populated by JS -->
          </tbody>
        </table>
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
  <div class="pg active" id="sec-settings">
    <div class="sett-wrap">

      <div class="sett-title-area">
        <h2 class="sett-main-title">YOUR SETTINGS</h2>
        <p class="sett-subtitle">Change the settings for your account.</p>
        <p class="sett-subtitle2">Here you can change your withdrawal address, password, activate/deactivate 2FA or email-subscriptions as you wish.</p>
      </div>

      <!-- Tabs -->
      <div class="sett-tabs">
        <button class="sett-tab sett-tab-act" id="stSecurity" onclick="document.getElementById('spSecurity').style.display='block';document.getElementById('spTwoFA').style.display='none';document.getElementById('stSecurity').classList.add('sett-tab-act');document.getElementById('stTwoFA').classList.remove('sett-tab-act');">Security</button>
        <button class="sett-tab" id="stTwoFA" onclick="document.getElementById('spSecurity').style.display='none';document.getElementById('spTwoFA').style.display='block';document.getElementById('stSecurity').classList.remove('sett-tab-act');document.getElementById('stTwoFA').classList.add('sett-tab-act');">2FA</button>
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
          <div class="twofa-qr" id="tfaQrBox">
            <!-- Real QR code generated by JS on load -->
            <img id="tfaQrImg" src="" alt="2FA QR Code" width="160" height="160" style="border-radius:8px;display:block"/>
          </div>
        </div>
        <div class="sett-field-row" style="margin-top:16px">
          <span class="sett-field-icon">&#128274;</span>
          <input class="sett-fi twofa-key-inp" id="tfaKey" type="text" value="SR34I45HNEKH4EKN" readonly/>
          <button class="aff-copy-btn" onclick="copyTfaKey()" title="Copy">&#128203;</button>
        </div>
        <p class="sett-2fa-note">Enter this key manually if you can't scan the QR code.</p>
        <div id="twofa-enable-wrap">
          <div class="sett-field-row" style="margin-top:14px">
            <span class="sett-field-icon">&#9000;</span>
            <input class="sett-fi twofa-code-inp" id="tfaCode" type="text" maxlength="6" placeholder="Enter 2FA code"/>
          </div>
          <button class="sett-save-btn" style="margin-top:12px" onclick="enable2FA()">Enable 2FA</button>
        </div>
        <div class="twofa-status" id="tfaStatus"></div>
        <script>
        (function(){
          var user = localStorage.getItem('userName') || 'user';
          var key  = 'SR34I45HNEKH4EKN';
          var uri  = 'otpauth://totp/TronSick%3A' + encodeURIComponent(user) + '?secret=' + key + '&issuer=TronSick&algorithm=SHA1&digits=6&period=30';
          var qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=' + encodeURIComponent(uri);
          var img = document.getElementById('tfaQrImg');
          if(img) img.src = qrUrl;
        })();
        </script>
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
          <option value="fr">&#127467;&#127479; Français (French)</option>
          <option value="es">&#127466;&#127480; Español (Spanish)</option>
          <option value="pt">&#127477;&#127481; Português (Portuguese)</option>
          <option value="de">&#127465;&#127466; Deutsch (German)</option>
          <option value="tr">&#127481;&#127479; Türkçe (Turkish)</option>
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

<?php include __DIR__ . '/site_inject.php'; ?>
<script src="site_sync.js?v=4"></script>
<script src="dashboard.js?v=31"></script>
<script>window._INIT_SECTION='settings';</script>
<script>
// -- SETTINGS GUARANTEED INLINE INIT --
(function init(){
  // Email from localStorage
  var uemail = localStorage.getItem('userEmail') || '';
  var uname  = localStorage.getItem('userName')  || 'User';
  var emEl = document.getElementById('setEmail');
  if(emEl && uemail) emEl.value = uemail;
  var unEl = document.getElementById('userName');
  if(unEl) unEl.textContent = uname;

  // Override settTab with guaranteed version using exact IDs
  window.settTab = function(tab){
    var sp = {security: document.getElementById('spSecurity'), twofa: document.getElementById('spTwoFA')};
    var st = {security: document.getElementById('stSecurity'), twofa: document.getElementById('stTwoFA')};
    for(var k in sp){ if(sp[k]) sp[k].style.display='none'; }
    for(var k in st){ if(st[k]) st[k].classList.remove('sett-tab-act'); }
    if(sp[tab]) sp[tab].style.display='block';
    if(st[tab]) st[tab].classList.add('sett-tab-act');
  };

  // enable2FA inline
  window.enable2FA = function(){
    var code = (document.getElementById('tfaCode')||{}).value||'';
    var st = document.getElementById('tfaStatus');
    if(code.length !== 6){ alert('Please enter a 6-digit code from your authenticator app'); return; }
    if(st){
      st.style.cssText = 'color:#3ecf8e;font-size:14px;font-weight:700;margin-top:12px;padding:10px;background:rgba(62,207,142,.1);border-radius:8px;border:1px solid rgba(62,207,142,.3)';
      st.textContent = '\u2705 2FA Enabled Successfully!';
    }
    localStorage.setItem('tfa_enabled','1');
  };

  // copyTfaKey inline
  window.copyTfaKey = function(){
    var k = document.getElementById('tfaKey');
    if(!k) return;
    navigator.clipboard.writeText(k.value).then(function(){
      var btn = document.querySelector('.aff-copy-btn');
      if(btn){ btn.textContent='\u2714'; setTimeout(function(){ btn.innerHTML='&#128203;'; },1500); }
    }).catch(function(){
      k.select(); document.execCommand('copy');
    });
  };

  // changePassword inline
  window.changePassword = function(){
    var cur = (document.getElementById('setPwdCur')||{}).value||'';
    var nw  = (document.getElementById('setPwdNew')||{}).value||'';
    var cf  = (document.getElementById('setPwdConf')||{}).value||'';
    if(nw.length < 8){ alert('Password must be at least 8 characters'); return; }
    if(nw !== cf){ alert('Passwords do not match'); return; }
    localStorage.setItem('userPwd', nw);
    var el = document.getElementById('setPwdCur');
    var el2= document.getElementById('setPwdNew');
    var el3= document.getElementById('setPwdConf');
    if(el) el.value=''; if(el2) el2.value=''; if(el3) el3.value='';
    alert('\u2705 Password changed successfully!');
  };
})();
</script>

<!-- --- 2FA SETUP SECTION --- -->
<div class="pg-section" id="sec-2fa-setup" style="margin-top:24px">
<div style="background:#111b2e;border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:22px 20px">
  <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:18px">
    <div>
      <div style="font-size:15px;font-weight:800;color:#fff;margin-bottom:4px">?? Two-Factor Authentication (2FA)</div>
      <div style="font-size:13px;color:rgba(255,255,255,.45)" id="twofa-status-txt">Protect your account with Google Authenticator</div>
    </div>
    <div id="twofa-badge" style="padding:5px 14px;border-radius:99px;font-size:12px;font-weight:700;background:rgba(239,68,68,.1);color:#f87171;border:1px solid rgba(239,68,68,.2)">DISABLED</div>
  </div>

  <div id="twofa-disabled-view">
    <p style="font-size:13px;color:rgba(255,255,255,.45);margin-bottom:16px;line-height:1.6">When enabled, you must enter a 6-digit code from your authenticator app each time you log in.</p>
    <button onclick="setupTwoFA()" style="padding:10px 22px;background:linear-gradient(135deg,#059669,#3ecf8e);border:none;border-radius:9px;color:#fff;font-size:13px;font-weight:800;cursor:pointer">Enable 2FA</button>
  </div>

  <div id="twofa-setup-view" style="display:none">
    <div style="font-size:13px;color:rgba(255,255,255,.6);margin-bottom:14px;line-height:1.6"><strong style="color:#fff">Step 1:</strong> Install Google Authenticator or Authy on your phone.<br/><strong style="color:#fff">Step 2:</strong> Scan the QR code below.<br/><strong style="color:#fff">Step 3:</strong> Enter the 6-digit code to verify and activate.</div>
    <div style="display:flex;gap:20px;flex-wrap:wrap;align-items:flex-start;margin-bottom:18px">
      <div>
        <div id="twofa-qr" style="background:#fff;padding:10px;border-radius:10px;width:fit-content"></div>
        <div style="font-size:11px;color:rgba(255,255,255,.35);margin-top:8px;max-width:200px;text-align:center">Scan with Google Authenticator</div>
      </div>
      <div style="flex:1;min-width:200px">
        <div style="font-size:11px;color:rgba(255,255,255,.4);margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px">Manual entry secret key</div>
        <div id="twofa-secret-show" style="font-family:monospace;font-size:14px;font-weight:700;color:#a3e635;background:#0a1628;padding:10px 14px;border-radius:8px;word-break:break-all;letter-spacing:2px;cursor:pointer" title="Click to copy" onclick="copySecret()"></div>
        <div style="font-size:11px;color:rgba(255,255,255,.3);margin-top:6px">Click secret to copy</div>
      </div>
    </div>
    <div style="margin-bottom:14px">
      <label style="font-size:12px;color:rgba(255,255,255,.5);display:block;margin-bottom:6px;text-transform:uppercase;letter-spacing:.3px">Verification Code</label>
      <input type="text" id="twofa-verify-code" placeholder="Enter 6-digit code from app" maxlength="6" inputmode="numeric" style="width:100%;max-width:280px;padding:11px 14px;background:#132920;border:1.5px solid rgba(255,255,255,.1);border-radius:9px;font-size:15px;color:#fff;font-family:monospace;letter-spacing:4px;outline:none"/>
    </div>
    <div style="display:flex;gap:10px;flex-wrap:wrap">
      <button onclick="verifyAndEnable2FA()" style="padding:10px 22px;background:linear-gradient(135deg,#059669,#3ecf8e);border:none;border-radius:9px;color:#fff;font-size:13px;font-weight:800;cursor:pointer">Verify & Enable</button>
      <button onclick="cancelTwoFA()" style="padding:10px 18px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:9px;color:rgba(255,255,255,.5);font-size:13px;cursor:pointer">Cancel</button>
    </div>
    <div id="twofa-verify-err" style="display:none;margin-top:12px;padding:10px 14px;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.25);border-radius:8px;font-size:13px;color:#f87171"></div>
  </div>

  <div id="twofa-enabled-view" style="display:none">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
      <span style="font-size:28px">?</span>
      <div><div style="color:#3ecf8e;font-weight:700;font-size:14px">2FA is Active</div><div style="color:rgba(255,255,255,.4);font-size:12px">Your account is protected</div></div>
    </div>
    <button onclick="disableTwoFA()" style="padding:10px 20px;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);border-radius:9px;color:#f87171;font-size:13px;font-weight:700;cursor:pointer">Disable 2FA</button>
  </div>
</div>
</div>

<script>
// -- TOTP helpers (same as login.php) ----------------------
var B32C='ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
function b32decode(s){s=s.toUpperCase().replace(/=+$/,'');var bits=0,val=0,out=[];for(var i=0;i<s.length;i++){val=(val<<5)|B32C.indexOf(s[i]);bits+=5;if(bits>=8){bits-=8;out.push((val>>bits)&0xff);}}return new Uint8Array(out);}
async function verifyTOTP2(secret,code){if(!code||code.length!==6)return false;var key=b32decode(secret);var t=Math.floor(Date.now()/1000/30);for(var i=-1;i<=1;i++){var c=t+i;var buf=new ArrayBuffer(8);new DataView(buf).setUint32(4,c,false);try{var ck=await crypto.subtle.importKey('raw',key,{name:'HMAC',hash:'SHA-1'},false,['sign']);var sig=await crypto.subtle.sign('HMAC',ck,buf);var h=new Uint8Array(sig);var off=h[h.length-1]&0x0f;var n=((h[off]&0x7f)<<24)|((h[off+1]&0xff)<<16)|((h[off+2]&0xff)<<8)|(h[off+3]&0xff);if(String(n%1000000).padStart(6,'0')===String(code))return true;}catch(ex){}}return false;}

// Generate random base32 secret
function genSecret(len){var chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';var s='';for(var i=0;i<(len||32);i++)s+=chars[Math.floor(Math.random()*32)];return s;}

var _pendingSecret='';

function init2FAStatus(){
  var uname=localStorage.getItem('userName')||'';
  var secret=localStorage.getItem('2fa_secret_'+uname.toLowerCase());
  var badge=document.getElementById('twofa-badge');
  var statusTxt=document.getElementById('twofa-status-txt');
  if(secret){
    document.getElementById('twofa-disabled-view').style.display='none';
    document.getElementById('twofa-setup-view').style.display='none';
    document.getElementById('twofa-enabled-view').style.display='block';
    if(badge){badge.textContent='ENABLED';badge.style.background='rgba(62,207,142,.1)';badge.style.color='#3ecf8e';badge.style.borderColor='rgba(62,207,142,.2)';}
    if(statusTxt) statusTxt.textContent='Your account is protected with 2FA';
  } else {
    document.getElementById('twofa-disabled-view').style.display='block';
    document.getElementById('twofa-setup-view').style.display='none';
    document.getElementById('twofa-enabled-view').style.display='none';
    if(badge){badge.textContent='DISABLED';badge.style.background='rgba(239,68,68,.1)';badge.style.color='#f87171';badge.style.borderColor='rgba(239,68,68,.2)';}
    if(statusTxt) statusTxt.textContent='Protect your account with Google Authenticator';
  }
}

function setupTwoFA(){
  _pendingSecret=genSecret(32);
  var uname=localStorage.getItem('userName')||'account';
  var otpauth='otpauth://totp/TronSick:'+encodeURIComponent(uname)+'?secret='+_pendingSecret+'&issuer=TronSick';
  var qrUrl='https://api.qrserver.com/v1/create-qr-code/?size=160x160&data='+encodeURIComponent(otpauth);
  document.getElementById('twofa-qr').innerHTML='<img src="'+qrUrl+'" width="160" height="160" style="display:block;border-radius:6px"/>';
  document.getElementById('twofa-secret-show').textContent=_pendingSecret;
  document.getElementById('twofa-verify-code').value='';
  document.getElementById('twofa-verify-err').style.display='none';
  document.getElementById('twofa-disabled-view').style.display='none';
  document.getElementById('twofa-setup-view').style.display='block';
}

function copySecret(){
  navigator.clipboard.writeText(_pendingSecret).then(function(){
    var el=document.getElementById('twofa-secret-show');
    el.textContent='Copied!';
    setTimeout(function(){el.textContent=_pendingSecret;},1500);
  });
}

function cancelTwoFA(){
  _pendingSecret='';
  document.getElementById('twofa-setup-view').style.display='none';
  document.getElementById('twofa-disabled-view').style.display='block';
}

async function verifyAndEnable2FA(){
  var code=document.getElementById('twofa-verify-code').value.trim();
  var errEl=document.getElementById('twofa-verify-err');
  if(!code||code.length!==6){errEl.style.display='block';errEl.textContent='Please enter the 6-digit code from your app.';return;}
  var valid=await verifyTOTP2(_pendingSecret,code);
  if(!valid){errEl.style.display='block';errEl.textContent='Invalid code. Make sure your phone clock is correct and try again.';return;}
  // Save secret
  var uname=localStorage.getItem('userName')||'';
  localStorage.setItem('2fa_secret_'+uname.toLowerCase(),_pendingSecret);
  _pendingSecret='';
  init2FAStatus();
  showToast('?? 2FA enabled successfully! Your account is now protected.');
}

function disableTwoFA(){
  // Show inline disable form instead of confirm
  var enabledView=document.getElementById('twofa-enabled-view');
  if(!enabledView) return;
  // Remove existing disable form if any
  var existing=document.getElementById('twofa-disable-form');
  if(existing){existing.remove();return;}
  var form=document.createElement('div');
  form.id='twofa-disable-form';
  form.style.cssText='margin-top:16px;padding:16px;background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2);border-radius:10px';
  form.innerHTML='<div style="font-size:13px;color:rgba(255,255,255,.7);margin-bottom:10px;">Enter your current 6-digit 2FA code to disable:</div>'+
    '<input type="text" id="twofa-disable-code" placeholder="6-digit code" maxlength="6" inputmode="numeric" style="width:180px;padding:10px 14px;background:#0a1628;border:1.5px solid rgba(239,68,68,.3);border-radius:8px;font-size:15px;color:#fff;font-family:monospace;letter-spacing:4px;outline:none;margin-bottom:10px;display:block"/>'+
    '<div id="twofa-disable-err" style="display:none;color:#f87171;font-size:12px;margin-bottom:8px"></div>'+
    '<div style="display:flex;gap:10px"><button onclick="confirmDisableTwoFA()" style="padding:9px 18px;background:rgba(239,68,68,.2);border:1px solid rgba(239,68,68,.4);border-radius:8px;color:#f87171;font-size:13px;font-weight:700;cursor:pointer">Disable 2FA</button>'+
    '<button onclick="document.getElementById(\'twofa-disable-form\').remove()" style="padding:9px 16px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:8px;color:rgba(255,255,255,.5);font-size:13px;cursor:pointer">Cancel</button></div>';
  enabledView.appendChild(form);
  setTimeout(function(){var inp=document.getElementById('twofa-disable-code');if(inp)inp.focus();},100);
}

async function confirmDisableTwoFA(){
  var uname=localStorage.getItem('userName')||'';
  var secret=localStorage.getItem('2fa_secret_'+uname.toLowerCase());
  var code=(document.getElementById('twofa-disable-code')||{value:''}).value.trim();
  var errEl=document.getElementById('twofa-disable-err');
  if(!code||code.length!==6){if(errEl){errEl.style.display='block';errEl.textContent='Enter your 6-digit 2FA code.';}return;}
  var valid=false;
  if(secret&&secret!=='enabled'){
    try{valid=await verifyTOTP2(secret,code);}catch(e){valid=false;}
  } else { valid=true; }
  if(!valid){if(errEl){errEl.style.display='block';errEl.textContent='Invalid code. Check your authenticator app.';}return;}
  localStorage.removeItem('2fa_secret_'+uname.toLowerCase());
  localStorage.removeItem('tfa_enabled_'+uname.toLowerCase());
  localStorage.removeItem('tfa_enabled');
  var form=document.getElementById('twofa-disable-form');
  if(form)form.remove();
  init2FAStatus();
  if(typeof showToast==='function')showToast('2FA disabled successfully.');
}

// Init on page load
document.addEventListener('DOMContentLoaded',init2FAStatus);
setTimeout(init2FAStatus,200);
</script>
<script src="/lucky_draw.js?v=3"></script></body></html>