// HERO SIGNUP VALIDATION
function heroSignup(e) {
  e.preventDefault();
  const err = document.getElementById('sbErr');
  const show = m => { err.style.display='block'; err.textContent=m; };
  const u = document.getElementById('sbUser').value.trim();
  const em = document.getElementById('sbEmail').value.trim();
  const pw = document.getElementById('sbPass').value;
  const pw2 = document.getElementById('sbPass2').value;
  if (!u || u.length < 3) return show('Username must be at least 3 characters.');
  if (!/^[a-zA-Z0-9_]+$/.test(u)) return show('Username: letters, numbers, underscores only.');
  if (!em || !em.includes('@')) return show('Please enter a valid email address.');
  if (pw.length < 8) return show('Password must be at least 8 characters.');
  if (pw !== pw2) return show('Passwords do not match. Please re-enter.');
  err.style.display = 'none';
  const btn = document.getElementById('sbSubmit');
  btn.textContent = 'Creating Account…'; btn.disabled = true;
  setTimeout(() => { window.location.href = 'register.html'; }, 1000);
}

// NAV SCROLL
const nav = document.getElementById('nav');
if(nav) window.addEventListener('scroll', () => nav.style.boxShadow = window.scrollY > 40 ? '0 4px 30px rgba(0,0,0,.4)' : '');

// MOBILE NAV
function toggleNav() {
  const m = document.getElementById('mobNav');
  if(m) m.classList.toggle('open');
}

// FAQ
function fqOpen(btn) {
  const item = btn.closest('.fq');
  const open = item.classList.contains('open');
  document.querySelectorAll('.fq.open').forEach(i => i.classList.remove('open'));
  if (!open) item.classList.add('open');
}

// 30-MIN TIMER
let total = 2400, left = 2387;
function tick() {
  const m = String(Math.floor(left / 60)).padStart(2, '0');
  const s = String(left % 60).padStart(2, '0');
  ['fwTimer','heroTimer'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = `00:${m}:${s}`;
  });
  const bar = document.getElementById('fwBar');
  if (bar) bar.style.width = ((total - left) / total * 100) + '%';
  left = left > 0 ? left - 1 : total;
}
tick();
setInterval(tick, 1000);

// TRX PRICE
let price = 0.3502;
function updatePrice() {
  price = Math.max(0.28, Math.min(0.48, price + (Math.random() - 0.5) * 0.002));
  const el = document.getElementById('navPrice');
  if (el) el.textContent = '$' + price.toFixed(4);
}
setInterval(updatePrice, 5000);

// COUNTERS
function countUp(id, target, dur) {
  const el = document.getElementById(id); if (!el) return;
  const t0 = performance.now();
  const run = ts => {
    const p = Math.min((ts - t0) / dur, 1);
    const v = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(v * target).toLocaleString();
    if (p < 1) requestAnimationFrame(run);
    else el.textContent = target.toLocaleString();
  };
  requestAnimationFrame(run);
}
const obs = new IntersectionObserver(e => {
  if (e[0].isIntersecting) {
    countUp('hs1', 47291, 2200);
    countUp('hs2', 1284650, 2200);
    obs.disconnect();
  }
}, { threshold: 0.2 });
const hh = document.getElementById('heroStats');
if (hh) obs.observe(hh);

// LIVE PAYOUTS
const wals = ['TAbc3F…xK9','TQr7mN…p3W','TLk9xY…h2M','TRv2sB…j6F','TWq8cD…n4L','TSm5pG…u8K','TYf1nH…v7R'];
function addRow() {
  const tb = document.getElementById('ptbody'); if (!tb) return;
  const amt = (Math.random() * 65 + 5).toFixed(2);
  const w = wals[Math.floor(Math.random() * wals.length)];
  const tr = document.createElement('tr');
  tr.innerHTML = `<td>Just now</td><td class="pa">+${amt} TRX</td><td class="pw">${w}</td><td><span class="ps">✔ Confirmed</span></td>`;
  tr.style.cssText = 'opacity:0;transition:opacity .4s';
  tb.prepend(tr);
  requestAnimationFrame(() => tr.style.opacity = '1');
  if (tb.children.length > 10) tb.lastElementChild.remove();
}
setInterval(addRow, 9000);

// SCROLL REVEAL
document.querySelectorAll('.how-card,.game-tile,.fq').forEach(el => {
  el.style.cssText += ';opacity:0;transform:translateY(20px);transition:opacity .5s ease,transform .5s ease';
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; }
  }, {threshold:0.1}).observe(el);
});
