<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>TronSick – Claim Free TRX Every 40 Minutes | Faucet, Casino Games & Cashback</title>
  <meta name="description" content="TronSick is the #1 TRON faucet — claim free TRX every 40 minutes, compete in weekly contests, earn daily cashback rewards, and play 9 provably fair games. 100% free to join."/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="style.css"/>
  <script>
    // Clear logout flag if present
    localStorage.removeItem('_justLoggedOut');
    // If user is already logged in, go to faucet (not landing page)
    if(localStorage.getItem('userLoggedIn')==='1' && localStorage.getItem('userName')){
      window.location.replace('faucet.php');
    }
  </script>
</head>
<body>

<!-- NAVBAR -->
<nav class="nav" id="nav">
  <div class="nav-wrap">
    <a href="index.php" class="logo" id="logo">Tron<span>Sick</span></a>
    <ul class="nav-menu">
      <li><a href="#features">Features</a></li>
      <li><a href="#games">Games</a></li>
      <li><a href="#payouts">Payouts</a></li>
      <li><a href="#faq">FAQ</a></li>
    </ul>
    <div class="nav-right">
      <span class="trx-live"><span class="live-dot"></span>TRX <strong id="navPrice">$0.3502</strong></span>
      <a href="login.php" class="nbtn-ghost" id="navLogin">Log In</a>
      <a href="login.php?tab=register" class="nbtn-red" id="navSignup">Sign Up</a>
    </div>
    <button class="burger" onclick="toggleNav()"><span></span><span></span><span></span></button>
  </div>
  <div class="mob-nav" id="mobNav">
    <a href="#features" onclick="toggleNav()">Features</a>
    <a href="#games" onclick="toggleNav()">Games</a>
    <a href="#payouts" onclick="toggleNav()">Payouts</a>
    <a href="#faq" onclick="toggleNav()">FAQ</a>
    <a href="login.php" class="nbtn-ghost">Log In</a>
    <a href="login.php?tab=register" class="nbtn-red">Sign Up Free</a>
  </div>
</nav>

<!-- ═══ HERO ═══ -->
<section class="hero" id="hero">
  <div class="hero-overlay"></div>
  <div class="hero-wrap">

    <!-- LEFT: Features -->
    <div class="hero-left">
      <h1 id="heroH1">CLAIM FREE TRX<br/>EVERY 40 MINUTES!</h1>
      <ul class="feat-list" id="featList">
        <li><span class="fcheck">✔</span><span>Free faucet — claim <strong>up to 500 TRX every 40 minutes</strong>, no deposit needed</span></li>
        <li><span class="fcheck">✔</span><span><strong>Weekly Contest</strong> — compete on leaderboard and win massive TRX prize pools</span></li>
        <li><span class="fcheck">✔</span><span><strong>Daily Cashback</strong> — earn back a % of losses every 24 hours, automatically</span></li>
        <li><span class="fcheck">✔</span><span>9 provably fair games — <strong>Dice, Mines, Tower, Limbo & more</strong></span></li>
        <li><span class="fcheck">✔</span><span><strong>50% Referral Commission</strong> on every friend's claim — lifetime, unlimited</span></li>
        <li><span class="fcheck">✔</span><span><strong>VIP Levels</strong> — higher rank = bigger faucet rewards & exclusive perks</span></li>
        <li><span class="fcheck">✔</span><span>Instant TRC-20 withdrawals — <strong>minimum 50 TRX, no hidden fees</strong></span></li>
      </ul>
      <a href="login.php?tab=register" class="btn-orange" id="heroPlayBtn">CLAIM FREE TRX NOW</a>
    </div>

    <!-- RIGHT: Inline signup form -->
    <div class="hero-right">
      <div class="signup-box" id="signupBox">
        <h2 class="sb-title">CREATE A FREE ACCOUNT</h2>
        <p class="sb-sub">Start claiming free TRX in under 60 seconds</p>
        <form class="sb-form" id="sbForm" onsubmit="heroSignup(event)">
          <div class="sb-field">
            <label for="sbUser">Username</label>
            <input type="text" id="sbUser" placeholder="Choose a username" autocomplete="username" required minlength="3" maxlength="20"/>
          </div>
          <div class="sb-field">
            <label for="sbEmail">Email Address</label>
            <input type="email" id="sbEmail" placeholder="your@email.com" autocomplete="email" required/>
          </div>
          <div class="sb-field">
            <label for="sbPass">Password</label>
            <input type="password" id="sbPass" placeholder="Create a strong password" required minlength="8"/>
          </div>
          <div class="sb-field">
            <label for="sbPass2">Confirm Password</label>
            <input type="password" id="sbPass2" placeholder="Re-enter your password" required/>
          </div>
          <div class="sb-field">
            <label for="sbRef">Referral Code <span class="optional">(optional)</span></label>
            <input type="text" id="sbRef" placeholder="Enter referral code if you have one"/>
          </div>
          <button type="submit" class="btn-orange w100" id="sbSubmit">
            SIGN UP FREE — CLAIM NOW
          </button>
          <p class="sb-err" id="sbErr" style="display:none;color:#e11d48;font-size:12px;margin-top:8px;text-align:center"></p>
          <p class="sb-terms">By signing up you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></p>
        </form>
        <div class="sb-login-row">Already have an account? <a href="login.php" id="sbLoginLink">Log In →</a></div>
      </div>
    </div>

  </div>
</section>

<!-- ═══ HOW IT WORKS ═══ -->
<section class="how-sec" id="features">
  <div class="container">
    <div class="sec-head">
      <span class="sec-tag">How It Works</span>
      <h2>Multiple Ways to Earn Free TRX Daily</h2>
      <p>Start with the faucet, boost with cashback & contests, grow with referrals, and multiply with casino games — every method stacks on top of the other.</p>
    </div>
    <div class="how-grid">

      <div class="how-card" id="hw1">
        <div class="how-num">01</div>
        <div class="how-content">
          <div class="how-icon-box ic-blue">💧</div>
          <h3>40-Minute Free Faucet</h3>
          <p>Log in and hit Claim every 40 minutes to receive free TRX credited instantly to your balance. No surveys, no tasks, no tricks. Keep a daily streak going to unlock <strong>bonus multipliers up to 3× your base reward</strong>.</p>
          <a href="login.php?tab=register" class="how-cta">Start Claiming Free TRX →</a>
        </div>
      </div>

      <div class="how-card how-card-featured" id="hw2">
        <div class="how-badge">🏆 Most Popular</div>
        <div class="how-num">02</div>
        <div class="how-content">
          <div class="how-icon-box ic-red">🏆</div>
          <h3>Weekly Contest &amp; Cashback</h3>
          <p>Every week the top earners and bettors split a <strong>massive TRX prize pool</strong>. Miss the top? Don't worry — our <strong>Daily Cashback system</strong> returns a percentage of your losses straight back to your account every 24 hours, automatically.</p>
          <a href="login.php?tab=register" class="how-cta">Join the Contest Now →</a>
        </div>
      </div>

      <div class="how-card" id="hw3">
        <div class="how-num">03</div>
        <div class="how-content">
          <div class="how-icon-box ic-gold">🎰</div>
          <h3>9 Provably Fair Games</h3>
          <p>Multiply your free TRX playing 9 fully cryptographically verifiable casino games — Dice, Mines, Tower, Limbo, Keno, Wheel, Plinko, Sic Bo and more. Every result is provable. <strong>Only 1% house edge</strong>, lowest in the industry.</p>
          <a href="login.php?tab=register" class="how-cta">Browse All 9 Games →</a>
        </div>
      </div>

      <div class="how-card" id="hw4" style="grid-column:span 3">
        <div class="how-num" style="display:inline-block;margin-right:20px">04</div>
        <div class="how-content" style="flex-direction:row;align-items:center;gap:24px;flex-wrap:wrap">
          <div class="how-icon-box ic-blue" style="flex-shrink:0">👥</div>
          <div>
            <h3>Lifetime 50% Referral Commission</h3>
            <p style="max-width:800px">Share your unique referral link with friends. Every time someone you referred claims TRX on TronSick, you automatically receive <strong>50% of their claim value</strong> as commission — deposited directly to your balance. No expiry. No cap. Unlimited referrals.</p>
            <a href="login.php?tab=register" class="how-cta">Get My Referral Link →</a>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ═══ GAMES ═══ -->
<section class="games-sec" id="games">
  <div class="container">
    <div class="sec-head light-head">
      <h2>9 Provably Fair Casino Games</h2>
      <p>Every game uses a cryptographic server seed + client seed system. Verify any result independently — outcomes cannot be manipulated. Every game has just <strong>1% house edge</strong>. Your bets also count toward the Weekly Contest leaderboard.</p>
    </div>
    <div class="games-grid">
      <div class="game-tile" id="g1"><span class="gt-em">🎲</span><span class="gt-nm">Dice</span><span class="gt-eg">1% Edge</span></div>
      <div class="game-tile" id="g2"><span class="gt-em">💣</span><span class="gt-nm">Mines</span><span class="gt-eg">1% Edge</span></div>
      <div class="game-tile" id="g3"><span class="gt-em">🏰</span><span class="gt-nm">Tower</span><span class="gt-eg">1% Edge</span></div>
      <div class="game-tile" id="g4"><span class="gt-em">🚀</span><span class="gt-nm">Limbo</span><span class="gt-eg">1% Edge</span></div>
      <div class="game-tile" id="g5"><span class="gt-em">🎱</span><span class="gt-nm">Keno</span><span class="gt-eg">1% Edge</span></div>
      <div class="game-tile" id="g6"><span class="gt-em">🎡</span><span class="gt-nm">Wheel</span><span class="gt-eg">1% Edge</span></div>
      <div class="game-tile" id="g7"><span class="gt-em">🎰</span><span class="gt-nm">Sic Bo</span><span class="gt-eg">1% Edge</span></div>
      <div class="game-tile" id="g8"><span class="gt-em">📍</span><span class="gt-nm">Plinko</span><span class="gt-eg">1% Edge</span></div>
      <div class="game-tile" id="g9"><span class="gt-em">🎯</span><span class="gt-nm">Chuck-a-Luck</span><span class="gt-eg">1% Edge</span></div>
    </div>
    <p class="games-cta">All games require a free account. <a href="login.php?tab=register">Sign up in 30 seconds →</a></p>
  </div>
</section>

<!-- ═══ PAYOUTS ═══ -->
<section class="payouts-sec" id="payouts">
  <div class="container">
    <div class="sec-head">
      <h2>Live Withdrawal Feed</h2>
      <p>Every withdrawal is processed instantly on the TRON blockchain and permanently recorded on Tronscan. Full transparency — nothing hidden.</p>
    </div>
    <div class="ptbl-wrap">
      <table class="ptbl">
        <thead><tr><th>Time</th><th>Amount</th><th>Wallet Address</th><th>Status</th></tr></thead>
        <tbody id="ptbody">
          <tr><td>2 min ago</td><td class="pa">+18.50 TRX</td><td class="pw">TAbc3F…xK9</td><td><span class="ps">✔ Confirmed</span></td></tr>
          <tr><td>11 min ago</td><td class="pa">+31.20 TRX</td><td class="pw">TQr7mN…p3W</td><td><span class="ps">✔ Confirmed</span></td></tr>
          <tr><td>25 min ago</td><td class="pa">+8.75 TRX</td><td class="pw">TLk9xY…h2M</td><td><span class="ps">✔ Confirmed</span></td></tr>
          <tr><td>40 min ago</td><td class="pa">+45.00 TRX</td><td class="pw">TRv2sB…j6F</td><td><span class="ps">✔ Confirmed</span></td></tr>
          <tr><td>1 hr ago</td><td class="pa">+22.30 TRX</td><td class="pw">TWq8cD…n4L</td><td><span class="ps">✔ Confirmed</span></td></tr>
          <tr><td>1 hr ago</td><td class="pa">+67.80 TRX</td><td class="pw">TYf1nH…v7R</td><td><span class="ps">✔ Confirmed</span></td></tr>
          <tr><td>2 hrs ago</td><td class="pa">+14.60 TRX</td><td class="pw">TSm5pG…u8K</td><td><span class="ps">✔ Confirmed</span></td></tr>
          <tr><td>2 hrs ago</td><td class="pa">+9.40 TRX</td><td class="pw">TDw4eJ…q2T</td><td><span class="ps">✔ Confirmed</span></td></tr>
        </tbody>
      </table>
    </div>
    <div class="ptbl-foot">
      <span>Verified on TRON blockchain · <a href="#" id="tronscanLink">View on Tronscan →</a></span>
      <a href="login.php?tab=register" class="btn-red-sm" id="ptCta">Join & Start Earning</a>
    </div>
  </div>
</section>

<!-- ═══ FAQ ═══ -->
<section class="faq-sec" id="faq">
  <div class="container faq-layout">
    <div class="faq-left">
      <h2>Your Questions,<br/>Answered.</h2>
      <p>Everything you need to know before you start earning TRX on TronSick.</p>
      <a href="login.php?tab=register" class="btn-red" style="margin-top:24px;display:inline-flex" id="faqCta">Create Free Account →</a>
    </div>
    <div class="faq-list">
      <div class="fq" id="fq1"><button class="fq-btn" onclick="fqOpen(this)">Is TronSick completely free to join?<span class="fq-ic">+</span></button><div class="fq-body"><p>Yes — 100% free, forever. Create an account with just your email and username. No deposit, no credit card, no subscription required. Your first faucet claim is available the moment you sign up. You can earn real TRX without spending a single cent.</p></div></div>
      <div class="fq" id="fq2"><button class="fq-btn" onclick="fqOpen(this)">How does the 40-minute faucet work?<span class="fq-ic">+</span></button><div class="fq-body"><p>After logging in, visit the Faucet page and click Claim. TRX is credited instantly to your on-site balance. A 40-minute cooldown timer then begins. Once it expires you can claim again — up to 36 times per day. Claim every day to build a streak multiplier that boosts your reward up to 3× the base amount.</p></div></div>
      <div class="fq" id="fq3"><button class="fq-btn" onclick="fqOpen(this)">What is the Weekly Contest and how do I win?<span class="fq-ic">+</span></button><div class="fq-body"><p>Every week TronSick runs a leaderboard contest. Players earn points by claiming from the faucet and by betting in the casino. At the end of each week the top-ranked players share a TRX prize pool automatically credited to their account. The contest resets every Monday. Check the Contest page for current standings and prize tiers.</p></div></div>
      <div class="fq" id="fq4"><button class="fq-btn" onclick="fqOpen(this)">What is Daily Cashback?<span class="fq-ic">+</span></button><div class="fq-body"><p>Daily Cashback is an automatic reward system. If you had a negative balance day from casino play, TronSick returns a percentage of your net losses directly to your account balance each day at midnight UTC. No codes, no requests — it happens automatically. Higher VIP levels receive higher cashback percentages.</p></div></div>
      <div class="fq" id="fq5"><button class="fq-btn" onclick="fqOpen(this)">How does the 50% referral commission work?<span class="fq-ic">+</span></button><div class="fq-body"><p>Every account gets a unique referral link. When someone registers through your link and claims TRX, you automatically receive 50% of their claim value as commission — added directly to your balance in real time. There is no limit on how many friends you can refer and no expiry date on your commission.</p></div></div>
      <div class="fq" id="fq6"><button class="fq-btn" onclick="fqOpen(this)">Are the casino games provably fair?<span class="fq-ic">+</span></button><div class="fq-body"><p>Yes. Every game on TronSick uses a server seed + client seed cryptographic system. Before each bet, a hashed server seed is shown to you. After the result, the original seed is revealed so you can verify the outcome yourself using any SHA-256 tool online. We are mathematically unable to alter results.</p></div></div>
      <div class="fq" id="fq7"><button class="fq-btn" onclick="fqOpen(this)">When and how do I withdraw my TRX?<span class="fq-ic">+</span></button><div class="fq-body"><p>Go to the Withdraw section in your dashboard. Enter your TRC-20 TRON wallet address and the amount you wish to withdraw. Withdrawals are processed instantly on the TRON blockchain. Minimum withdrawal is 50 TRX. There is no maximum withdrawal limit and no hidden fees.</p></div></div>
    </div>
  </div>
</section>

<!-- ═══ BOTTOM CTA ═══ -->
<section class="cta-sec" id="ctaSec">
  <div class="container cta-inner">
    <div class="cta-badge">⚡ Free · No Deposit · Faucet + Contest + Cashback</div>
    <h2>47,000+ Users Are Earning<br/>Free TRX Every Day</h2>
    <p>Your first claim is waiting right now. Sign up free in under 60 seconds — claim every 40 minutes, compete in the weekly contest, earn daily cashback, and play 9 provably fair games. Zero cost to start.</p>
    <a href="login.php?tab=register" class="btn-orange btn-xl" id="ctaBtn">CLAIM MY FREE TRX NOW →</a>
    <div style="display:flex;justify-content:center;gap:32px;margin-top:28px;flex-wrap:wrap">
      <div style="text-align:center"><strong style="display:block;font-size:22px;color:#f59e0b;font-family:monospace">40 Min</strong><span style="font-size:12px;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:1px">Faucet Timer</span></div>
      <div style="width:1px;background:rgba(255,255,255,.1)"></div>
      <div style="text-align:center"><strong style="display:block;font-size:22px;color:#f59e0b;font-family:monospace">Weekly</strong><span style="font-size:12px;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:1px">Contest Prize Pool</span></div>
      <div style="width:1px;background:rgba(255,255,255,.1)"></div>
      <div style="text-align:center"><strong style="display:block;font-size:22px;color:#f59e0b;font-family:monospace">Daily</strong><span style="font-size:12px;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:1px">Cashback Rewards</span></div>
      <div style="width:1px;background:rgba(255,255,255,.1)"></div>
      <div style="text-align:center"><strong style="display:block;font-size:22px;color:#f59e0b;font-family:monospace">50%</strong><span style="font-size:12px;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:1px">Referral Commission</span></div>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer class="footer">
  <div class="container footer-grid">
    <div class="fb">
      <div class="footer-logo">Tron<span>Sick</span></div>
      <p>The fastest TRON faucet. Earn free TRX every 40 minutes through faucet, provably fair games, and a 50% lifetime referral program.</p>
    </div>
    <div class="fc"><h4>Account</h4><a href="login.php" id="fLogin">Log In</a><a href="login.php?tab=register" id="fReg">Register Free</a></div>
    <div class="fc"><h4>Earn TRX</h4><a href="#">Faucet</a><a href="#games">Casino Games</a><a href="#">Referral Program</a><a href="#payouts">Payment Proofs</a></div>
    <div class="fc"><h4>Help</h4><a href="#faq">FAQ</a><a href="#">Contact Us</a><a href="#">Privacy Policy</a><a href="#">Terms of Service</a><a href="#">Provably Fair</a></div>
  </div>
  <div class="footer-bottom">
    <div class="container footer-bottom-row">
      <span>© 2026 TronSick.io — All Rights Reserved</span>
      <span>Powered by the <strong>TRON</strong> Blockchain</span>
    </div>
  </div>
</footer>

<script src="script.js"></script>
</body>
</html>
