// Stitchers shared script: signed-in nav, EN/FR switch, and the site footer.
// Every Stitchers page loads this one file.
(function () {
  var SB_URL = window.STITCHERS.url;
  var SB_ANON = window.STITCHERS.anon;
  var KEY = 'stitchers_lang';
  var sb = null;

  var FR = {
    "Find a Stitcher": "Trouver une couturière",
    "Specialties": "Spécialités",
    "How It Works": "Comment ça marche",
    "Post a Project": "Publier un projet",
    "Sign In": "Connexion",
    "Sign Out": "Se déconnecter",
    "Join Free": "S'inscrire gratuitement",
    "Home": "Accueil",
    "← Home": "← Accueil",
    "← Back to home": "← Retour à l'accueil",
    "Back to home": "Retour à l'accueil",
    "My Dashboard": "Mon tableau de bord",
    "Dashboard": "Tableau de bord",
    "Overview": "Aperçu",
    "My Profile": "Mon profil",
    "Portfolio": "Portfolio",
    "Messages": "Messages",
    "Reviews": "Avis",
    "My Plan": "Mon forfait",
    "Settings": "Paramètres",
    "For Clients": "Pour les clients",
    "For Stitchers": "Pour les couturières",
    "Company": "Entreprise",
    "Browse Specialties": "Parcourir les spécialités",
    "Gift Cards": "Cartes-cadeaux",
    "Pro Membership": "Abonnement Pro",
    "Studio Plan": "Forfait Studio",
    "Resources": "Ressources",
    "Community Guidelines": "Règles de la communauté",
    "About Us": "À propos",
    "Blog": "Blogue",
    "Press": "Presse",
    "Careers": "Carrières",
    "Contact": "Contact",
    "Privacy Policy": "Politique de confidentialité",
    "© 2026 Stitchers Canada Inc. All rights reserved. Made with": "© 2026 Stitchers Canada Inc. Tous droits réservés. Fait avec",
    "in Canada.": "au Canada.",
    "Canada's community for seamstresses, dressmakers, and garment restoration specialists. 🍁": "La communauté canadienne des couturières, retoucheuses et restauratrices de vêtements. 🍁",
    "Browse Stitchers": "Parcourir les couturières",
    "Find a Stitcher Now": "Trouver une couturière maintenant",
    "Join as a Stitcher — Free": "S'inscrire comme couturière — gratuit",
    "Start Your Free Trial": "Commencer l'essai gratuit",
    "Start Pro — $19/month": "Commencer Pro — 19 $/mois",
    "Start Studio — $49/month": "Commencer Studio — 49 $/mois",
    "Post My Project — Free": "Publier mon projet — gratuit",
    "Send Message": "Envoyer le message",
    "Notify Me": "M'avertir",
    "Get in Touch": "Nous joindre",
    "Our Story": "Notre histoire",
    "Our Values": "Nos valeurs",
    "Compare plans": "Comparer les forfaits",
    "Frequently asked questions": "Questions fréquentes",
    "Read guide →": "Lire le guide →",
    "Continue →": "Continuer →"
  };

  function getLang() { return localStorage.getItem(KEY) || 'en'; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }

  // ── Language ────────────────────────────────────────────────────────────
  function applyLanguage(lang) {
    document.documentElement.lang = lang === 'fr' ? 'fr-CA' : 'en-CA';
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      var parent = node.parentNode;
      if (!parent || /^(SCRIPT|STYLE|TEXTAREA)$/.test(parent.nodeName)) continue;
      if (parent.closest && (parent.closest('[data-no-i18n]') || parent.closest('[data-fr-toggle]'))) continue;
      if (node._orig === undefined) node._orig = node.nodeValue;
      var raw = node._orig;
      var key = raw.trim();
      if (lang === 'fr' && FR[key]) {
        node.nodeValue = raw.match(/^\s*/)[0] + FR[key] + raw.match(/\s*$/)[0];
      } else {
        node.nodeValue = raw;
      }
    }
    document.querySelectorAll('[data-fr-toggle]').forEach(function (b) {
      b.textContent = lang === 'fr' ? 'English' : 'Français';
    });
    window.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
  }

  function addToggle() {
    var bar = document.querySelector('nav > div');
    if (!bar || bar.querySelector('[data-fr-toggle]')) return;
    var b = document.createElement('button');
    b.setAttribute('data-fr-toggle', '');
    b.className = 'sfx-btn';
    b.style.marginLeft = '12px';
    b.onclick = function () {
      var next = getLang() === 'fr' ? 'en' : 'fr';
      localStorage.setItem(KEY, next);
      applyLanguage(next);
    };
    bar.appendChild(b);
  }

  // ── Footer (same on every page) ─────────────────────────────────────────
  var FOOTER_CSS = 'footer#site-footer{background:#2C2C2C;color:#fff;padding:52px 0 28px;margin-top:auto;font-family:Inter,system-ui,sans-serif;}' +
    'footer#site-footer .sf-inner{max-width:1200px;margin:0 auto;padding:0 24px;}' +
    'footer#site-footer .sf-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px;margin-bottom:36px;}' +
    'footer#site-footer .sf-brand{font-family:"Playfair Display",Georgia,serif;font-size:18px;font-weight:700;}' +
    'footer#site-footer .sf-brand p{font-family:Inter,system-ui,sans-serif;font-size:13px;font-weight:400;color:rgba(255,255,255,0.45);line-height:1.65;margin-top:10px;max-width:240px;}' +
    'footer#site-footer h4{font-family:Inter,system-ui,sans-serif;font-size:11px;font-weight:700;color:rgba(255,255,255,0.4);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:14px;}' +
    'footer#site-footer a{display:block;font-size:13px;color:rgba(255,255,255,0.6);text-decoration:none;margin-bottom:8px;}' +
    'footer#site-footer a:hover{color:#fff;}' +
    'footer#site-footer .sf-bottom{border-top:1px solid rgba(255,255,255,0.08);padding-top:20px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;font-size:12px;color:rgba(255,255,255,0.35);}' +
    'footer#site-footer .maple{color:#C4716A;}' +
    '.sfx-btn{background:none;border:1.5px solid rgba(255,255,255,0.4);color:#fff;border-radius:100px;padding:7px 16px;font-size:13px;font-weight:600;cursor:pointer;font-family:Inter,system-ui,sans-serif;text-decoration:none;white-space:nowrap;}' +
    '.sfx-btn:hover{background:rgba(255,255,255,0.12);}' +
    '.sfx-banner{background:#F5F0F8;border-bottom:1px solid #E8E0D8;color:#4A2040;font-family:Inter,system-ui,sans-serif;font-size:14px;padding:12px 24px;display:flex;justify-content:center;align-items:center;gap:16px;flex-wrap:wrap;}' +
    '.sfx-banner a{color:#4A2040;font-weight:600;}' +
    '.sfx-badge{display:none;background:#C4716A;color:#fff;border-radius:100px;font-size:11px;font-weight:700;padding:1px 7px;margin-left:6px;}' +
    '@media(max-width:900px){footer#site-footer .sf-grid{grid-template-columns:1fr 1fr;}}';

  var FOOTER_HTML =
    '<div class="sf-inner"><div class="sf-grid">' +
      '<div class="sf-brand">Stitchers<p>Canada\'s community for seamstresses, dressmakers, and garment restoration specialists. 🍁</p></div>' +
      '<div><h4>For Clients</h4>' +
        '<a href="find.html">Find a Stitcher</a><a href="specialties.html">Browse Specialties</a>' +
        '<a href="how-it-works.html">How It Works</a><a href="post-project.html">Post a Project</a><a href="gift-cards.html">Gift Cards</a></div>' +
      '<div><h4>For Stitchers</h4>' +
        '<a href="index.html">Join Free</a><a href="pro.html">Pro Membership</a><a href="studio.html">Studio Plan</a>' +
        '<a href="resources.html">Resources</a><a href="guidelines.html">Community Guidelines</a></div>' +
      '<div><h4>Company</h4>' +
        '<a href="about.html">About Us</a><a href="blog.html">Blog</a><a href="press.html">Press</a>' +
        '<a href="careers.html">Careers</a><a href="contact.html">Contact</a><a href="privacy.html">Privacy Policy</a></div>' +
    '</div>' +
    '<div class="sf-bottom"><span>© 2026 Stitchers Canada Inc. All rights reserved. Made with <span class="maple">♥</span> in Canada.</span><span>English · Français</span></div>' +
    '</div>';

  function renderFooter() {
    document.querySelectorAll('footer').forEach(function (f) { f.remove(); });
    if (!document.getElementById('site-shared-css')) {
      var st = document.createElement('style');
      st.id = 'site-shared-css';
      st.textContent = FOOTER_CSS;
      document.head.appendChild(st);
    }
    var footer = document.createElement('footer');
    footer.id = 'site-footer';
    footer.innerHTML = FOOTER_HTML;
    document.body.appendChild(footer);
  }

  // ── Sign-in state (shown in the top bar on every page) ──────────────────
  function loadSupabase(cb) {
    if (window.supabase && window.supabase.createClient) return cb(window.supabase);
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.3/dist/umd/supabase.js';
    s.onload = function () { cb(window.supabase); };
    s.onerror = function () { cb(null); };
    document.head.appendChild(s);
  }

  var currentUid = null;

  function refreshUnread() {
    if (!sb || !currentUid) return;
    sb.from('messages').select('id', { count: 'exact', head: true })
      .eq('recipient_id', currentUid).eq('is_read', false)
      .then(function (r) {
        var n = r.count || 0;
        var el = document.getElementById('sfx-unread');
        if (el) { el.textContent = n; el.style.display = n ? 'inline-block' : 'none'; }
        document.title = (n ? '(' + n + ') ' : '') + document.title.replace(/^\(\d+\) /, '');
      });
  }

  function subscribeMessages(uid) {
    sb.channel('sfx-msgs-' + uid)
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'messages', filter: 'recipient_id=eq.' + uid },
        function () { refreshUnread(); })
      .subscribe();
  }

  function showSignedIn(session) {
    var area = document.querySelector('#nc, #nav-ctas, .nc, .nav-ctas');
    if (!area) return;
    var user = session.user;
    sb.from('profiles').select('first_name, last_name, business_name, avatar_url')
      .eq('id', user.id).maybeSingle().then(function (res) {
        var p = res.data || {};
        var meta = user.user_metadata || {};
        var name = p.business_name ||
          [p.first_name, p.last_name].filter(Boolean).join(' ') ||
          meta.first_name || user.email.split('@')[0];
        var initial = esc((name.trim()[0] || '?').toUpperCase());
        var avatar = p.avatar_url
          ? '<img src="' + esc(p.avatar_url) + '" alt="" style="width:100%;height:100%;object-fit:cover;">'
          : initial;
        var fr = getLang() === 'fr';
        area.innerHTML =
          '<a href="dashboard.html" title="' + (fr ? 'Tableau de bord' : 'Dashboard') + '" style="display:flex;align-items:center;gap:10px;text-decoration:none;color:#fff;">' +
            '<span style="width:34px;height:34px;border-radius:50%;overflow:hidden;background:#C4716A;display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;border:2px solid rgba(255,255,255,0.35);">' + avatar + '</span>' +
            '<span style="font-size:13px;font-weight:600;">' + esc(name) + '</span></a>' +
    '<a class="sfx-btn" href="dashboard.html?panel=messages">Messages <span id="sfx-unread" class="sfx-badge"></span></a>' +
                '<a class="sfx-btn" href="dashboard.html">' + (fr ? 'Tableau de bord' : 'Dashboard') + '</a>' +
          '<button class="sfx-btn" data-signout>' + (fr ? 'Se déconnecter' : 'Sign Out') + '</button>';
        area.style.display = 'flex';
        area.style.alignItems = 'center';
        area.style.gap = '12px';
        area.querySelector('[data-signout]').onclick = function () {
          sb.auth.signOut().then(function () { location.href = 'home.html'; });
        };
        applyLanguage(getLang());
        currentUid = user.id;
        refreshUnread();
        subscribeMessages(user.id);
      });
  }

  function showBanner(session) {
    var nav = document.querySelector('nav');
    if (!nav || document.getElementById('sfx-banner')) return;
    var fr = getLang() === 'fr';
    var b = document.createElement('div');
    b.id = 'sfx-banner';
    b.className = 'sfx-banner';
    b.innerHTML = (fr ? 'Vous êtes connectée comme ' : "You're signed in as ") + '<strong>' + esc(session.user.email) + '</strong>' +
      ' · <a href="dashboard.html">' + (fr ? 'Aller au tableau de bord' : 'Go to dashboard') + '</a>' +
      ' · <a href="#" data-signout>' + (fr ? 'Se déconnecter' : 'Sign out') + '</a>';
    nav.insertAdjacentElement('afterend', b);
    b.querySelector('[data-signout]').onclick = function (e) {
      e.preventDefault();
      sb.auth.signOut().then(function () { location.href = 'home.html'; });
    };
  }

  function checkSession() {
    sb.auth.getSession().then(function (r) {
      var session = r.data && r.data.session;
      if (!session) return;
      showSignedIn(session);
      if (/index\.html$|\/stitchers\/?$/.test(location.pathname)) showBanner(session);
    });
  }

  // ── Mobile layout (shared across every page) ───────────────────────────
  var MOBILE_CSS = `
@media (max-width: 700px) {
  html, body { overflow-x: hidden; }
  nav > div { flex-wrap: wrap !important; height: auto !important; min-height: 60px; padding: 10px 14px !important; row-gap: 8px; }
  nav .logo, nav a.logo { font-size: 18px !important; }
  nav .nl { display: flex !important; order: 3; width: 100%; justify-content: center; flex-wrap: wrap; gap: 6px 14px !important; }
  nav .nl a { font-size: 12px !important; }
  #nc, #nav-ctas, .nc, .nav-ctas, .nav-r { flex-wrap: wrap !important; gap: 6px !important; justify-content: flex-end; }
  #nav-av { width: 30px !important; height: 30px !important; }
  #nav-nm, #nav-pl { display: none !important; }
  .sfx-btn, .bg, .bp, .btn-ghost, .btn-primary, .btn-so, .btn-home { padding: 6px 12px !important; font-size: 12px !important; }
  .sfx-banner { flex-direction: column; gap: 6px; text-align: center; padding: 10px 14px; }
  h1, .pt, .section-title, .st, .form-title { font-size: 26px !important; }
  .card, .wrap, .c, .container, .s, .section { padding-left: 14px !important; padding-right: 14px !important; }
  .card { padding: 18px !important; max-width: 100%; }
  .grid2, .grid3, .grid4, .row, .frow, .form-row, .name-row, .plan-grid, .spec-grid, .how-grid, .testimonial-grid {
    grid-template-columns: 1fr !important;
  }
  .stats, .stats-row { grid-template-columns: repeat(2, 1fr) !important; }
  .photos, .port-grid { grid-template-columns: repeat(2, 1fr) !important; }
  input, select, textarea { font-size: 16px !important; max-width: 100%; }
  img { max-width: 100%; height: auto; }
  .welcome { flex-direction: column; align-items: flex-start; gap: 12px; }
  .search-box { flex-direction: column; border-radius: 16px !important; }
  .sf { border-right: none !important; border-bottom: 1px solid #E8E0D8; }
  .btn-search { border-radius: 0 0 16px 16px !important; width: 100%; }
  .msg-layout { grid-template-columns: 1fr !important; }
  .msg-list { display: block !important; max-height: 220px; overflow-y: auto; border-right: none !important; border-bottom: 1px solid #E8E0D8; }
  .msg-thread { min-height: 320px; }
  .layout { padding: 16px 14px !important; gap: 16px !important; }
  .sb { position: static !important; }
  .head { grid-template-columns: 1fr !important; text-align: center; }
  footer#site-footer .sf-grid { grid-template-columns: 1fr !important; gap: 22px !important; }
  footer#site-footer .sf-bottom { flex-direction: column; align-items: flex-start; gap: 6px; }
  footer#site-footer .sf-inner { padding: 0 16px; }
}`;

  function injectMobileCss() {
    if (!document.getElementById('site-mobile-css')) {
      var st = document.createElement('style');
      st.id = 'site-mobile-css';
      st.textContent = MOBILE_CSS;
      document.head.appendChild(st);
    }
    if (!document.querySelector('meta[name="viewport"]')) {
      var m = document.createElement('meta');
      m.name = 'viewport';
      m.content = 'width=device-width, initial-scale=1.0';
      document.head.appendChild(m);
    }
  }

  // ── Country choice (each country has its own database) ─────────────────
  function showPicker() {
    if (document.getElementById('sfx-country-picker')) return;
    var nav = document.querySelector('nav');
    if (!nav) return;
    var fr = getLang() === 'fr';
    var box = document.createElement('div');
    box.id = 'sfx-country-picker';
    box.className = 'sfx-banner';
    box.innerHTML = '<span>' + (fr ? 'Choisissez votre pays :' : 'Where are you joining from?') + '</span>' +
      '<button class="sfx-btn" data-pick="CA" style="color:#4A2040;border-color:#4A2040;">Canada</button>' +
      '<button class="sfx-btn" data-pick="US" style="color:#4A2040;border-color:#4A2040;">United States</button>';
    nav.insertAdjacentElement('afterend', box);
    box.querySelectorAll('[data-pick]').forEach(function (btn) {
      btn.onclick = function () {
        localStorage.setItem('stitchers_country', btn.getAttribute('data-pick'));
        location.reload();
      };
    });
  }

  function renderCountryChoice() {
    var C = window.STITCHERS;
    var bar = document.querySelector('nav > div');
    if (bar && !bar.querySelector('[data-country-switch]')) {
      var other = C.country === 'CA' ? 'US' : 'CA';
      var b = document.createElement('button');
      b.setAttribute('data-country-switch', '');
      b.className = 'sfx-btn';
      b.style.marginLeft = '8px';
      b.textContent = C.country ? (C.label + ' · switch') : 'Choose country';
      b.onclick = function () {
        if (!C.country) { showPicker(); return; }
        localStorage.setItem('stitchers_country', other);
        location.reload();
      };
      bar.appendChild(b);
    }
    if (!C.country) showPicker();
  }

  function init() {
    injectMobileCss();
    renderFooter();
    addToggle();
    renderCountryChoice();
    applyLanguage(getLang());
    loadSupabase(function (lib) {
      if (!lib) return;
      sb = lib.createClient(SB_URL, SB_ANON);
      // The dashboard manages its own top bar, so leave it alone
      if (document.getElementById('nav-nm')) return;
      checkSession();
    });
    // Re-translate after the top bar has been redrawn
    setTimeout(function () { applyLanguage(getLang()); }, 1500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
