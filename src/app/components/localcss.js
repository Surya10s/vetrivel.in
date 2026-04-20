export const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #f5f0eb; }
    :root {
      --sand: #e8dfd0;
      --earth: #c4a882;
      --dark: #1a1612;
      --accent: #d4522a;
      --text-muted: #6b5e4e;
      --ff-head: 'Bebas Neue', sans-serif;
      --ff-body: 'DM Sans', sans-serif;
    }
 
    /* ── scrollbar ── */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #f5f0eb; }
    ::-webkit-scrollbar-thumb { background: var(--earth); border-radius: 2px; }
 
    /* ── nav ── */
    .nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 200;
      display: flex; align-items: center; justify-content: space-between;
      padding: 20px 48px;
      mix-blend-mode: multiply;
    }
    .nav-logo {
      font-family: var(--ff-head);
      font-size: 28px;
      letter-spacing: 3px;
      color: var(--dark);
    }
    .nav-links { display: flex; gap: 36px; }
    .nav-links a {
      font-family: var(--ff-body);
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: var(--dark);
      text-decoration: none;
      transition: color .2s;
    }
    .nav-links a:hover { color: var(--accent); }
 
    /* ── 3-D canvas wrapper ── */
    .canvas-bg {
      position: sticky; top: 0; width: 100%; height: 100vh;
      z-index: 1; background: #f5f0eb; margin-top: -100vh;
    }
 
    /* ── sections ── */
    .section-wrapper { position: relative; z-index: 10; }
 
    /* HERO */
    .hero {
      height: 100vh;
      display: flex; flex-direction: column; justify-content: flex-end;
      padding: 0 48px 80px;
    }
    .hero-eyebrow {
      font-family: var(--ff-body);
      font-size: 11px; font-weight: 500;
      letter-spacing: 3px; text-transform: uppercase;
      color: var(--accent); margin-bottom: 16px;
    }
    .hero-h1 {
      font-family: var(--ff-head);
      font-size: clamp(72px, 12vw, 160px);
      line-height: .92; letter-spacing: 2px;
      color: var(--dark);
    }
    .hero-h1 span { color: var(--accent); }
    .hero-sub {
      max-width: 420px;
      font-family: var(--ff-body);
      font-size: 15px; line-height: 1.7;
      color: var(--text-muted);
      margin-top: 24px; margin-bottom: 36px;
    }
    .hero-ctas { display: flex; gap: 16px; align-items: center; }
    .btn-primary {
      font-family: var(--ff-body); font-size: 13px; font-weight: 500;
      letter-spacing: 1.5px; text-transform: uppercase;
      background: var(--dark); color: #f5f0eb;
      border: none; padding: 16px 36px;
      cursor: pointer; transition: background .2s, transform .15s;
    }
    .btn-primary:hover { background: var(--accent); transform: translateY(-1px); }
    .btn-ghost {
      font-family: var(--ff-body); font-size: 13px; font-weight: 500;
      letter-spacing: 1.5px; text-transform: uppercase;
      background: transparent; color: var(--dark);
      border: 1px solid var(--earth);
      padding: 16px 36px; cursor: pointer; transition: border-color .2s, color .2s;
    }
    .btn-ghost:hover { border-color: var(--accent); color: var(--accent); }
 
    /* STATS BAR */
    .stats-bar {
      display: flex; gap: 0;
      background: var(--dark);
      pointer-events: auto;
    }
    .stat-item {
      flex: 1; padding: 28px 40px;
      border-right: 1px solid #2e2720;
    }
    .stat-item:last-child { border-right: none; }
    .stat-num {
      font-family: var(--ff-head);
      font-size: 44px; letter-spacing: 1px;
      color: var(--earth);
    }
    .stat-label {
      font-family: var(--ff-body); font-size: 12px; font-weight: 500;
      letter-spacing: 2px; text-transform: uppercase;
      color: #7a6e64; margin-top: 4px;
    }
 
    /* PRODUCTS */
    .products {
      min-height: 100vh;
      padding: 120px 48px;
    }
    .section-tag {
      font-family: var(--ff-body); font-size: 11px; font-weight: 500;
      letter-spacing: 4px; text-transform: uppercase;
      color: var(--accent); margin-bottom: 20px;
    }
    .section-h2 {
      font-family: var(--ff-head);
      font-size: clamp(52px, 7vw, 100px);
      line-height: .92; letter-spacing: 1px;
      color: var(--dark); margin-bottom: 72px;
    }
    .products-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2px;
    }
    .prod-card {
      position: relative; overflow: hidden;
      background: var(--sand);
      cursor: pointer;
      transition: transform .3s ease;
    }
    .prod-card:hover { transform: translateY(-4px); }
    .prod-card:hover .prod-overlay { opacity: 1; }
    .prod-card:hover .prod-img { transform: scale(1.06); }
    .prod-img {
      width: 100%; height: 260px; object-fit: cover;
      display: block; transition: transform .5s ease;
    }
    .prod-body { padding: 20px 24px 24px; }
    .prod-title {
      font-family: var(--ff-head); font-size: 28px;
      letter-spacing: 1px; color: var(--dark);
    }
    .prod-desc {
      font-family: var(--ff-body); font-size: 13px;
      color: var(--text-muted); line-height: 1.6; margin-top: 6px;
    }
    .prod-overlay {
      position: absolute; inset: 0;
      background: rgba(212, 82, 42, .08);
      opacity: 0; transition: opacity .3s;
      pointer-events: none;
    }
    .prod-tag {
      display: inline-block;
      font-family: var(--ff-body); font-size: 10px; font-weight: 500;
      letter-spacing: 2px; text-transform: uppercase;
      background: var(--accent); color: #f5f0eb;
      padding: 4px 10px; margin-bottom: 10px;
    }
 
    /* WHY US */
    .why {
      background: var(--dark);
      padding: 120px 48px;
    }
    .why .section-tag { color: var(--earth); }
    .why .section-h2 { color: var(--sand); margin-bottom: 64px; }
    .why-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px;
    }
    .why-item { border-top: 1px solid #2e2720; padding-top: 28px; }
    .why-num {
      font-family: var(--ff-head); font-size: 52px;
      color: var(--accent); line-height: 1;
    }
    .why-title {
      font-family: var(--ff-head); font-size: 22px;
      letter-spacing: 1px; color: var(--earth);
      margin: 10px 0 12px;
    }
    .why-text {
      font-family: var(--ff-body); font-size: 14px; line-height: 1.7;
      color: #7a6e64;
    }
 
    /* CONTACT */
    .contact {
      min-height: 100vh; padding: 120px 48px;
      display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
      align-items: center;
    }
    .contact-left {}
    .contact-tagline {
      font-family: var(--ff-head);
      font-size: clamp(48px, 6vw, 88px);
      line-height: .92; color: var(--dark);
      margin-bottom: 32px;
    }
    .contact-tagline span { color: var(--accent); }
    .contact-info { display: flex; flex-direction: column; gap: 20px; margin-top: 48px; }
    .contact-info-item {
      display: flex; align-items: flex-start; gap: 20px;
      border-top: 1px solid var(--earth);
      padding-top: 20px;
    }
    .info-label {
      font-family: var(--ff-body); font-size: 10px; font-weight: 500;
      letter-spacing: 2.5px; text-transform: uppercase;
      color: var(--earth); min-width: 80px; margin-top: 2px;
    }
    .info-val {
      font-family: var(--ff-body); font-size: 15px;
      color: var(--dark); line-height: 1.5;
    }
 
    /* form */
    .contact-form { display: flex; flex-direction: column; gap: 0; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin-bottom: 2px; }
    .form-group { display: flex; flex-direction: column; }
    .form-group label {
      font-family: var(--ff-body); font-size: 10px; font-weight: 500;
      letter-spacing: 2px; text-transform: uppercase;
      color: var(--text-muted);
      background: var(--sand); padding: 16px 20px 4px;
    }
    .form-group input,
    .form-group textarea,
    .form-group select {
      font-family: var(--ff-body); font-size: 15px; font-weight: 300;
      background: var(--sand); color: var(--dark);
      border: none; outline: none;
      padding: 4px 20px 16px;
      resize: none;
      transition: background .2s;
    }
    .form-group input:focus,
    .form-group textarea:focus,
    .form-group select:focus { background: #ddd8cf; }
    .form-group select { cursor: pointer; }
    .form-wide { margin-bottom: 2px; }
    .form-wide label, .form-wide textarea { width: 100%; }
    .submit-btn {
      font-family: var(--ff-head); font-size: 20px;
      letter-spacing: 3px; text-transform: uppercase;
      background: var(--accent); color: #f5f0eb;
      border: none; padding: 22px;
      cursor: pointer; transition: background .2s, transform .15s;
    }
    .submit-btn:hover { background: var(--dark); transform: translateY(-1px); }
 
    /* FOOTER */
    .footer {
      background: var(--dark); color: var(--earth);
      padding: 32px 48px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .footer-logo {
      font-family: var(--ff-head); font-size: 22px;
      letter-spacing: 3px;
    }
    .footer-copy {
      font-family: var(--ff-body); font-size: 12px;
      color: #4a433c;
    }
 
    /* ── responsive ── */
    @media (max-width: 768px) {
      .nav { padding: 16px 24px; }
      .nav-links { display: none; }
      .hero { padding: 0 24px 60px; }
      .products { padding: 80px 24px; }
      .products-grid { grid-template-columns: 1fr; }
      .why { padding: 80px 24px; }
      .why-grid { grid-template-columns: 1fr; gap: 32px; }
      .contact { padding: 80px 24px; grid-template-columns: 1fr; }
      .footer { padding: 24px; flex-direction: column; gap: 12px; text-align: center; }
      .stats-bar { flex-direction: column; }
    }
  `}</style>
)