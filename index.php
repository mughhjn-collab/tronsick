<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>TronSick – Win Free TRX Every 30 Minutes | Faucet, Games & Referrals</title>
  <meta name="description" content="Claim free TRX every 40 minutes on TronSick. Play provably fair games, earn referral commissions, and withdraw instantly. Join 47,000+ users today."/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="style.css"/>
  <script>
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
      <a href="register.php" class="nbtn-red" id="navSignup">Sign Up</a>
    </div>
    <button class="burger" onclick="toggleNav()"><span></span><span></span><span></span></button>
  </div>
  <div class="mob-nav" id="mobNav">
    <a href="#features" onclick="toggleNav()">Features</a>
    <a href="#games" onclick="toggleNav()">Games</a>
    <a href="#payouts" onclick="toggleNav()">Payouts</a>
    <a href="#faq" onclick="toggleNav()">FAQ</a>
    <a href="login.php" class="nbtn-ghost">Log In</a>
    <a href="register.php" class="nbtn-red">Sign Up Free</a>
  </div>
</nav>

<!-- ═══ HERO ═══ -->
<section class="hero" id="hero">
  <div class="hero-overlay"></div>
  <div class="hero-wrap">

    <!-- LEFT: Features -->
    <div class="hero-left">
      <h1 id="heroH1">WIN FREE TRX<br/>EVERY 30 MINUTES!</h1>
      <ul class="feat-list" id="featList">
        <li><span class="fcheck">✔</span><span>Claim up to <strong>500 TRX</strong> every 40 minutes — completely free</span></li>
        <li><span class="fcheck">✔</span><span>Multiply your TRX playing <strong>Hi-Lo, Dice &amp; Mines</strong></span></li>
        <li><span class="fcheck">✔</span><span>Earn <strong>Daily Bonus Rewards</strong> with streak multipliers</span></li>
        <li><span class="fcheck">✔</span><span><strong>Weekly Contest</strong> — compete and win big TRX prizes</span></li>
        <li><span class="fcheck">✔</span><span><strong>VIP Levels</strong> — higher rank, bigger claim rewards</span></li>
        <li><span class="fcheck">✔</span><span><strong>50% Referral Commission</strong> on every claim, forever</span></li>
        <li><span class="fcheck">✔</span><span>Instant TRC-20 withdrawals — <strong>no hidden fees</strong></span></li>
      </ul>
      <a href="register.php" class="btn-orange" id="heroPlayBtn">CLAIM FREE TRX NOW</a>
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
      <h2>Three Ways to Earn TRX Daily</h2>
      <p>Start with the faucet, grow with referrals, multiply with games — each method compounds your daily income.</p>
    </div>
    <div class="how-grid">

      <div class="how-card" id="hw1">
        <div class="how-num">01</div>
        <div class="how-content">
          <div class="how-icon-box ic-blue">💧</div>
          <h3>40-Minute Faucet</h3>
          <p>Click Claim every 40 minutes and receive free TRX — instantly. No tasks, no surveys, no tricks. Maintain a daily streak to unlock <strong>bonus multipliers up to 3×</strong> your base reward.</p>
          <a href="register.php" class="how-cta">Start Claiming Free TRX →</a>
        </div>
      </div>

      <div class="how-card how-card-featured" id="hw2">
        <div class="how-badge">Top Earner</div>
        <div class="how-num">02</div>
        <div class="how-content">
          <div class="how-icon-box ic-red">👥</div>
          <h3>Lifetime Referral Income</h3>
          <p>Share your unique referral link. Every time your referrals earn TRX on TronSick, you collect <strong>50% commission automatically</strong> — with no limit on referrals and no expiry date.</p>
          <a href="register.php" class="how-cta">Get My Referral Link →</a>
        </div>
      </div>

      <div class="how-card" id="hw3">
        <div class="how-num">03</div>
        <div class="how-content">
          <div class="how-icon-box ic-gold">🎰</div>
          <h3>Provably Fair Casino</h3>
          <p>Grow your balance playing 9 fully verifiable casino games — Dice, Mines, Tower, Limbo, Keno, Wheel, Plinko and more. Every outcome is cryptographically sealed. <strong>Only 1% house edge.</strong></p>
          <a href="register.php" class="how-cta">Browse All 9 Games →</a>
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
      <p>Every game result uses a public cryptographic seed system. Verify any outcome yourself — we can never manipulate results. House edge is always 1%.</p>
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
    <p class="games-cta">All games require a free account. <a href="register.php">Sign up in 30 seconds →</a></p>
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
      <a href="register.php" class="btn-red-sm" id="ptCta">Join & Start Earning</a>
    </div>
  </div>
</section>

<!-- ═══ FAQ ═══ -->
<section class="faq-sec" id="faq">
  <div class="container faq-layout">
    <div class="faq-left">
      <h2>Your Questions,<br/>Answered.</h2>
      <p>Everything you need to know before you start earning TRX on TronSick.</p>
      <a href="register.php" class="btn-red" style="margin-top:24px;display:inline-flex" id="faqCta">Create Free Account →</a>
    </div>
    <div class="faq-list">
      <div class="fq" id="fq1"><button class="fq-btn" onclick="fqOpen(this)">Is TronSick completely free?<span class="fq-ic">+</span></button><div class="fq-body"><p>Yes — 100% free. Sign up with an email address only. No deposit, no credit card, no subscription. You can claim TRX from the faucet immediately after verifying your account at absolutely zero cost.</p></div></div>
      <div class="fq" id="fq2"><button class="fq-btn" onclick="fqOpen(this)">How does the 40-minute faucet work?<span class="fq-ic">+</span></button><div class="fq-body"><p>After logging in, click the Claim button. TRX is credited instantly to your balance. A 30-minute cooldown begins. When it expires, you can claim again — up to 48 times every day. Claim every day to build a streak multiplier that increases your reward.</p></div></div>
      <div class="fq" id="fq3"><button class="fq-btn" onclick="fqOpen(this)">How does the 50% referral commission work?<span class="fq-ic">+</span></button><div class="fq-body"><p>Every account gets a unique referral URL. When someone joins through your link and claims TRX, you receive 50% of their claim value as commission — automatically added to your balance. This runs forever with no cap on how many people you refer.</p></div></div>
      <div class="fq" id="fq4"><button class="fq-btn" onclick="fqOpen(this)">Are the casino games provably fair?<span class="fq-ic">+</span></button><div class="fq-body"><p>Absolutely. Every game uses a server seed + client seed cryptographic system. After each round you receive the original server seed hash so you can independently verify the result using any SHA256 tool online. We cannot alter outcomes — the math is public and immutable.</p></div></div>
      <div class="fq" id="fq5"><button class="fq-btn" onclick="fqOpen(this)">When and how do I withdraw?<span class="fq-ic">+</span></button><div class="fq-body"><p>Go to your dashboard Withdraw page, enter your TRC-20 TRON wallet address, enter the amount, and confirm. Withdrawals are processed instantly on the TRON network. Minimum withdrawal is 50 TRX with no maximum limit per transaction.</p></div></div>
      <div class="fq" id="fq6"><button class="fq-btn" onclick="fqOpen(this)">What is the minimum withdrawal amount?<span class="fq-ic">+</span></button><div class="fq-body"><p>The minimum is 50 TRX. This covers TRON network transaction fees and ensures your full amount arrives without deductions on small transfers. There is no maximum withdrawal limit.</p></div></div>
    </div>
  </div>
</section>

<!-- ═══ BOTTOM CTA ═══ -->
<section class="cta-sec" id="ctaSec">
  <div class="container cta-inner">
    <div class="cta-badge">⚡ Free · No Deposit · Instant Access</div>
    <h2>47,000+ Users Are Earning<br/>Free TRX Right Now</h2>
    <p>Your first claim is waiting. Create your free account and start earning TRX every 40 minutes — no payment of any kind required.</p>
    <a href="register.php" class="btn-orange btn-xl" id="ctaBtn">CREATE MY FREE ACCOUNT →</a>
  </div>
</section>

<!-- FOOTER -->
<footer class="footer">
  <div class="container footer-grid">
    <div class="fb">
      <div class="footer-logo">Tron<span>Sick</span></div>
      <p>The fastest TRON faucet. Earn free TRX every 40 minutes through faucet, provably fair games, and a 50% lifetime referral program.</p>
    </div>
    <div class="fc"><h4>Account</h4><a href="login.php" id="fLogin">Log In</a><a href="register.php" id="fReg">Register Free</a></div>
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
