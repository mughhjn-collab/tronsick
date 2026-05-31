<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Games &ndash; TronSick</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
  <link rel="stylesheet" href="dashboard.css?v=7"/>
  <link rel="stylesheet" href="games_new.css?v=7"/>
  <link rel="stylesheet" href="dice_fixes.css?v=2"/>
<script>function doSiteLogout(){['userName','userEmail','userLoggedIn','userId','userBalance','regUser','bonusRolls','newUserBonus','lastFaucet','lastBonus','totalWagered','userLevel','userRef'].forEach(function(k){localStorage.removeItem(k);});window.location.replace('https://tronsick.io/login.php');}</script></head>
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
    <a class="sb-item"        id="nav-surveys"     href="/surveys.php">   <i>&#x1F4CB;</i><s>Surveys</s></a>
    <a class="sb-item"        id="nav-affiliates"  href="/affiliates.php"><i>&#x1F91D;</i><s>Affiliates</s></a>
    <a class="sb-item"        id="nav-gifts"       href="/gifts.php">     <i>&#x1F381;</i><s>Gifts</s></a>
    <a class="sb-item"        id="nav-settings"    href="/settings.php">  <i>&#9881;</i><s>Settings</s></a>
    <a class="sb-item"        id="nav-contact"     href="/contact.php">   <i>&#9993;</i><s>Contact</s></a>
    <div class="sb-gap"></div>
    <a class="sb-item sb-stake" id="nav-stake" href="https://stake.com" target="_blank" rel="noopener"><i>&#x1F3B0;</i><s>Stake</s></a>
    <div class="sb-gap"></div>
    <a class="sb-item sb-out" href="javascript:void(0)" onclick="doSiteLogout()">                              <i>&#x1F534;</i><s>Logout</s></a>
  </nav>
</aside>

<!-- TOPBAR -->
<header class="topbar">
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
        <p class="wlc">Welcome back, <strong id="userName">User</strong></p>
      </div>

      <div class="tabs">
        <button class="tab active" id="tabFaucet" onclick="tab('faucet')">Faucet</button>
        <button class="tab"        id="tabBonus"  onclick="tab('bonus')">Bonus</button>
      </div>

      <!-- FAUCET PANE -->
      <div class="pane active" id="paneFaucet">
        <p class="fdesc">To receive rewards from Hourly faucet, please fill the correct captcha and press <strong>CLAIM</strong> button. The amount of free TRX that you earn will depend on your level and paid out according to the table below. Your level is <span class="hl">Stone</span>, to reach the next level please play our games.</p>

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

      <!-- BONUS PANE "” Roll System -->
      <div class="pane" id="paneBonus">
        <p class="fdesc">Roll a number between 0 and 10000. The higher the number, the bigger the reward! Each captcha gives you one free roll.</p>

        <!-- ROLL TABLE -->
        <div class="tbl-box">
          <div class="tbl-hd roll-hd">REMAINING ROLLS: <span id="rollCount">0</span></div>
          <table class="tbl">
            <thead><tr><th>Number</th><th>Payout</th></tr></thead>
            <tbody>
              <tr><td>0 "“ 9885</td><td>0.005000 TRX</td></tr>
              <tr><td>9886 "“ 9985</td><td>0.150000 TRX</td></tr>
              <tr><td>9986 "“ 9993</td><td>1.500000 TRX</td></tr>
              <tr><td>9994 "“ 9997</td><td>15.000000 TRX</td></tr>
              <tr><td>9998 "“ 9999</td><td>150.000000 TRX</td></tr>
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
  <div class="pg active" id="sec-games">
    <!-- Level Progress Bar (same as home) -->
    <div class="games-level-bar" id="gamesLevelBar">
      <p class="fdesc" style="margin-bottom:10px">Your level is <span class="hl">Stone</span>, to reach the next level please play our games.</p>
      <div class="prog-info" style="text-align:center;font-size:13px;color:rgba(232,240,235,.58);margin-bottom:8px">Wagered: <strong id="gWagered">0.000000</strong> / Target: <strong>30 TRX</strong></div>
      <div class="prog-row"><span>Stone</span><span>Iron</span></div>
      <div class="prog-track"><div class="prog-fill" style="width:0%" id="gProgFill"></div></div>
      <div class="prog-pct" id="gProgPct">0%</div>
    </div>

    <!-- Games Grid -->
    <div class="game-grid-new" id="gameGrid">

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

      <div class="gc-wrap2" onclick="openGame('tower')" id="gc-tower">
        <div class="gc-art gc-art-tower">
          <div class="tower-icon-3d">&#x1F3D7;</div>
          <div class="tower-diff-3d">EASY &bull; HARD</div>
        </div>
        <div class="gc-label2">Tower</div>
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
    <div class="game-panel" id="gamePanel" style="display:none">
      <button class="back-btn" onclick="closeGame()">&#8592; Back to Games</button>
      <div class="game-frame" id="gameFrame"></div>
    </div>

    <!-- MY ALL BETS -->
    <div class="all-bets-section" id="allBetsSection">
      <div class="all-bets-hd">
        <span>&#127922; My All Bets</span>
        <button class="all-bets-refresh" onclick="renderAllBets()">&#8635; Refresh</button>
      </div>
      <div class="all-bets-tabs">
        <button class="ab-tab" id="abTabAll" onclick="abSetTab('all')">All Games</button>
        <button class="ab-tab" id="abTabDice" onclick="abSetTab('dice')">&#127922; Dice</button>
        <button class="ab-tab" id="abTabLimbo" onclick="abSetTab('limbo')">&#128640; Limbo</button>
        <button class="ab-tab" id="abTabWheel" onclick="abSetTab('wheel')">&#127905; Wheel</button>
        <button class="ab-tab" id="abTabMines" onclick="abSetTab('mines')">&#128163; Mines</button>
        <button class="ab-tab" id="abTabSicbo" onclick="abSetTab('sicbo')">&#127922; Sic Bo</button>
        <button class="ab-tab" id="abTabDiamond" onclick="abSetTab('diamond')">&#9670; Diamond</button>
        <button class="ab-tab" id="abTabTower" onclick="abSetTab('tower')">&#127959; Tower</button>
        <button class="ab-tab" id="abTabCoinflip" onclick="abSetTab('coinflip')">&#x1FA99; Coin Flip</button>
      </div>
      <div class="all-bets-body" id="allBetsBody">
        <div class="dg-no-bets">No bets yet. Play a game to see your history here!</div>
      </div>
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

      <div class="ct-header">
        <h2 class="ct-title">&#127942; Weekly Contest</h2>
        <p class="ct-subtitle">Wager the most this week and win big TRX prizes! Leaderboard resets every Monday.</p>
      </div>

      <!-- My Stats -->
      <div class="ct-my-stats">
        <div class="ct-my-hd">&#128100; My Statistics</div>
        <div class="ct-my-grid">
          <div class="ct-my-card">
            <div class="ct-my-val" id="ctMyRank">#&#8212;</div>
            <div class="ct-my-lbl">My Rank</div>
          </div>
          <div class="ct-my-card">
            <div class="ct-my-val" id="ctMyWager">0.000000</div>
            <div class="ct-my-lbl">My Wager (TRX)</div>
          </div>
          <div class="ct-my-card">
            <div class="ct-my-val" id="ctMyReward">&#8212;</div>
            <div class="ct-my-lbl">My Prize</div>
          </div>
          <div class="ct-my-card">
            <div class="ct-my-val" id="ctTimeLeft">6d 12h</div>
            <div class="ct-my-lbl">Time Left</div>
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

      <!-- Live Leaderboard -->
      <div class="ct-board-box">
        <div class="ct-board-hd">&#128293; Live Leaderboard</div>
        <div class="ct-board-sub">Updates in real-time &mdash; wager more to climb the ranks!</div>
        <table class="ct-tbl">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Wager (TRX)</th>
              <th>Prize</th>
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
        <div class="sett-field-row" style="margin-top:14px">
          <input class="sett-fi twofa-code-inp" id="tfaCode" type="text" maxlength="6" placeholder="000000"/>
          <button class="sett-save-btn" style="margin-top:0;width:auto;padding:12px 22px" onclick="enable2FA()">ENABLE</button>
        </div>
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
      <div class="fl-col"><div class="flogo">Tron<span>Sick</span></div><p>The fastest TRON faucet. Earn free TRX every 30 minutes, play provably fair games, and earn 50% lifetime referral commission.</p></div>
      <div class="fc"><h4>Account</h4><a href="/settings.php">Settings</a><a href="/withdraw.php">Withdraw</a><a href="/deposit.php">Deposit</a></div>
      <div class="fc"><h4>Earn TRX</h4><a href="/faucet.php">Faucet</a><a href="/games.php">Games</a><a href="/affiliates.php">Referrals</a></div>
      <div class="fc"><h4>Help</h4><a href="/contact.php">Contact</a><a href="#">FAQ</a><a href="#">Privacy</a><a href="#">Terms</a></div>
    </div>
    <div class="foot-bot">&copy; 2026 TronSick.io &ndash; All Rights Reserved &#183; Powered by TRON Blockchain</div>
  </footer>

</main>


<!-- BET INFO MODAL — shared by all games -->
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

<script src="dashboard.js?v=7"></script>
<script>
window._INIT_SECTION='games';
if(typeof addBal!=='function'){window.addBal=function(amt){try{var b=parseFloat(localStorage.getItem('userBalance')||'0');b=Math.max(0,b+amt);localStorage.setItem('userBalance',b.toString());var e=document.getElementById('userBalance');if(e)e.textContent=b.toFixed(6);}catch(x){}};}
if(typeof syncBal!=='function'){window.syncBal=function(){try{var b=parseFloat(localStorage.getItem('userBalance')||'0');var e=document.getElementById('userBalance');if(e)e.textContent=b.toFixed(6);}catch(x){}};}
if(typeof updateWager!=='function'){window.updateWager=function(){};}
if(typeof setWdMax!=='function'){window.setWdMax=function(){};}
// My All Bets logic
var _abTab='all';
function abSetTab(t){_abTab=t;['all','dice','limbo','wheel','mines','sicbo','diamond','tower','coinflip'].forEach(function(k){var el=document.getElementById('abTab'+k.charAt(0).toUpperCase()+k.slice(1));if(el)el.classList.toggle('ab-tab-act',k===t);});renderAllBets();}
function renderAllBets(){
  var keys={dice:'diceHistory',limbo:'limboHistory',wheel:'wheelHistory',mines:'mnHistory',sicbo:'sbHistory',diamond:'dmHistory',tower:'twHistory',coinflip:'cfHistory'};
  var gameNames={dice:'&#127922; Dice',limbo:'&#128640; Limbo',wheel:'&#127905; Wheel',mines:'&#128163; Mines',sicbo:'&#127922; Sic Bo',diamond:'&#9670; Diamond',tower:'&#127959; Tower',coinflip:'&#x1FA99; Coin Flip'};
  var all=[];
  var filter=_abTab==='all'?Object.keys(keys):[_abTab];
  filter.forEach(function(g){
    try{var d=JSON.parse(localStorage.getItem(keys[g])||'[]');d.forEach(function(b){b._game=g;b._gname=gameNames[g]||g;});all=all.concat(d);}catch(e){}
  });
  all.sort(function(a,b){return (b.id||0)-(a.id||0);});
  var body=document.getElementById('allBetsBody');
  if(!body)return;
  if(!all.length){body.innerHTML='<div class="dg-no-bets">No bets yet. Play a game to see your history here!</div>';return;}
  var html='<table class="dg-hist-tbl"><thead><tr><th>Time</th><th>Game</th><th>Bet</th><th>Result</th><th>Profit</th></tr></thead><tbody>';
  all.slice(0,100).forEach(function(b){
    var mult=b.mult!=null?b.mult:b.payout!=null?b.payout:b.result!=null?b.result:null;
    var multStr=mult!=null?(b.win?parseFloat(mult).toFixed(2)+'x':'LOSE'):(b.win?'WIN':'LOSE');
    var profit=b.profit!=null?b.profit:(b.win?(b.bet||0)*((mult||1)-1):-(b.bet||0));
    html+='<tr class="dg-hist-row">';
    html+='<td class="dg-tc-time">'+(b.ts||'--')+'</td>';
    html+='<td>'+b._gname+'</td>';
    html+='<td>'+(parseFloat(b.bet||b.betAmt||0).toFixed(6))+'</td>';
    html+='<td class="'+(b.win?'dg-mult-win':'dg-mult-lose')+'">'+multStr+'</td>';
    html+='<td class="'+(profit>=0?'dg-pos':'dg-neg')+'">'+(profit>=0?'+':'')+parseFloat(profit).toFixed(6)+'</td>';
    html+='</tr>';
  });
  html+='</tbody></table>';
  body.innerHTML=html;
}
document.addEventListener('DOMContentLoaded',function(){renderAllBets();});
</script>
</body>
</html>
