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
    var _params=new URLSearchParams(window.location.search);
    if(_params.get('landing')!=='1'){
      localStorage.removeItem('_justLoggedOut');
      if(localStorage.getItem('userLoggedIn')==='1'&&localStorage.getItem('userName')){window.location.replace('faucet.php');}
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
      <h1 id="heroH1">COLLECT FREE TRX<br/>EVERY 40 MINUTES!</h1>
      <ul class="feat-list" id="featList">
        <li><span class="fcheck">✔</span><span>Open the faucet, hit Claim — <strong>up to 60 TRX lands in your account instantly</strong>, no deposit, no tasks</span></li>
        <li><span class="fcheck">✔</span><span><strong>Weekly Leaderboard Prize Pool</strong> — top players split TRX rewards every single Monday</span></li>
        <li><span class="fcheck">✔</span><span><strong>Automatic Daily Cashback</strong> — a portion of your losses returned to your balance every night, hands-free</span></li>
        <li><span class="fcheck">✔</span><span>9 casino games you can actually verify — <strong>Dice, Mines, Tower, Keno, Limbo, Wheel & more</strong></span></li>
        <li><span class="fcheck">✔</span><span>Your referral link pays <strong>50% commission on every friend's claim — for life, no cap</strong></span></li>
        <li><span class="fcheck">✔</span><span><strong>VIP system</strong> — every rank unlocks bigger faucet amounts, higher cashback & exclusive bonuses</span></li>
        <li><span class="fcheck">✔</span><span>Withdraw straight to your TRON wallet — <strong>50 TRX minimum, processed instantly</strong></span></li>
      </ul>
      <a href="login.php?tab=register" class="btn-orange" id="heroPlayBtn">CLAIM FREE TRX NOW</a>
    </div>

    <!-- RIGHT: Auth buttons -->
    <div class="hero-right">
      <div class="hero-auth-box" id="signupBox">
        <div class="hab-title">Start Earning Free TRX</div>
        <div class="hab-sub">Join 47,000+ users — 100% free, no deposit needed</div>
        <div class="hab-stats">
          <div class="hab-stat"><span class="hab-val">40m</span><span class="hab-lbl">Faucet Timer</span></div>
          <div class="hab-sep"></div>
          <div class="hab-stat"><span class="hab-val">9</span><span class="hab-lbl">Casino Games</span></div>
          <div class="hab-sep"></div>
          <div class="hab-stat"><span class="hab-val">50%</span><span class="hab-lbl">Referral Cut</span></div>
        </div>
        <a href="login.php?tab=register" class="hab-btn-signup" id="heroSignupBtn">SIGN UP FREE — START CLAIMING</a>
        <a href="login.php" class="hab-btn-login" id="heroLoginBtn">Already have an account? Log In →</a>
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
          <div class="how-icon-box ic-blue">⚡</div>
          <h3>Free TRX Every 40 Minutes</h3>
          <p>Hit Claim once every 40 minutes and watch real TRX drop into your account — no tasks, no surveys, no tricks required. Show up daily and your streak multiplier kicks in, quietly stacking bonuses on top of every single claim.</p>
          <a href="login.php?tab=register" class="how-cta">Start Your First Claim →</a>
        </div>
      </div>

      <div class="how-card how-card-featured" id="hw2">
        <div class="how-badge">🏆 Most Popular</div>
        <div class="how-num">02</div>
        <div class="how-content">
          <div class="how-icon-box ic-red">🎯</div>
          <h3>Win Weekly. Recover Daily.</h3>
          <p>Every Monday, TronSick pays out a shared TRX prize pool to the top players on the leaderboard — earned just by playing and claiming. And if the week didn't go your way? Our <strong>Daily Cashback</strong> quietly refunds a portion of your losses, automatically, every night.</p>
          <a href="login.php?tab=register" class="how-cta">Join This Week's Contest →</a>
        </div>
      </div>

      <div class="how-card" id="hw3">
        <div class="how-num">03</div>
        <div class="how-content">
          <div class="how-icon-box ic-gold">💎</div>
          <h3>VIP Ranks That Actually Pay</h3>
          <p>The more you claim and play, the higher your VIP rank climbs — and every rank upgrade means real rewards: bigger faucet amounts, higher cashback rates, deposit bonuses up to <strong>20% bonus TRX</strong>, and early access to new features before anyone else.</p>
          <a href="login.php?tab=register" class="how-cta">Check VIP Tiers →</a>
        </div>
      </div>

      <div class="how-card" id="hw4">
        <div class="how-num">04</div>
        <div class="how-content">
          <div class="how-icon-box ic-blue">🔗</div>
          <h3>50% Commission. Forever.</h3>
          <p>Share one link. Every time someone you referred makes a faucet claim on TronSick, exactly <strong>50% of their reward value</strong> is instantly credited to your balance — no waiting, no caps, no expiry. Refer 10 people and effectively claim 6× per cycle.</p>
          <a href="login.php?tab=register" class="how-cta">Get My Referral Link →</a>
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
