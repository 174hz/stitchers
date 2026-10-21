// Stitchers — English / French switcher
// Translates visible text by matching it against the dictionary below.
// Text that is not in the dictionary stays in English.
(function () {
  var KEY = 'stitchers_lang';

  var FR = {
    // Navigation
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
    "Overview": "Aperçu",
    "My Profile": "Mon profil",
    "Portfolio": "Portfolio",
    "Messages": "Messages",
    "Reviews": "Avis",
    "My Plan": "Mon forfait",
    "Settings": "Paramètres",

    // Footer
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

    "Canada's community for seamstresses, dressmakers, and garment restoration specialists. 🍁":
      "La communauté canadienne des couturières, retoucheuses et restauratrices de vêtements. 🍁",

    // Common buttons
    "Browse Stitchers": "Parcourir les couturières",
    "Find a Stitcher Now": "Trouver une couturière maintenant",
    "Join as a Stitcher — Free": "S'inscrire comme couturière — gratuit",
    "Get Started with Studio": "Commencer avec Studio",
    "Start Your Free Trial": "Commencer l'essai gratuit",
    "Start Pro — $19/month": "Commencer Pro — 19 $/mois",
    "Start Studio — $49/month": "Commencer Studio — 49 $/mois",
    "Post My Project — Free": "Publier mon projet — gratuit",
    "Send Message": "Envoyer le message",
    "Read guide →": "Lire le guide →",
    "Back to Home": "Retour à l'accueil",
    "Notify Me": "M'avertir",
    "Continue →": "Continuer →",

    // Common headings
    "Get in Touch": "Nous joindre",
    "Our Story": "Notre histoire",
    "Our Values": "Nos valeurs",
    "Careers at Stitchers": "Carrières chez Stitchers",
    "Press & Media": "Presse et médias",
    "Stitcher Resources": "Ressources pour couturières",
    "Gift Cards": "Cartes-cadeaux",
    "Community Guidelines": "Règles de la communauté",
    "Privacy Policy": "Politique de confidentialité",
    "The Stitchers Blog": "Le blogue Stitchers",
    "Blog": "Blogue",
    "Pro Membership": "Abonnement Pro",
    "Studio Plan": "Forfait Studio",
    "Browse by Specialty": "Parcourir par spécialité",
    "Compare plans": "Comparer les forfaits",
    "Everything in Pro": "Tout ce qui est inclus dans Pro",
    "Frequently asked questions": "Questions fréquentes",
    "Post a Project": "Publier un projet"
  };

  function applyLanguage(lang) {
    document.documentElement.lang = lang === 'fr' ? 'fr-CA' : 'en-CA';
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      var parent = node.parentNode;
      if (!parent || /^(SCRIPT|STYLE|TEXTAREA)$/.test(parent.nodeName)) continue;
      if (parent.hasAttribute && parent.hasAttribute('data-fr-toggle')) continue;
      if (parent.closest && parent.closest('[data-no-i18n]')) continue;
      if (node._orig === undefined) node._orig = node.nodeValue;
      var raw = node._orig;
      var key = raw.trim();
      if (lang === 'fr' && FR[key]) {
        var lead = raw.match(/^\s*/)[0];
        var trail = raw.match(/\s*$/)[0];
        node.nodeValue = lead + FR[key] + trail;
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
    b.style.cssText = 'background:none;border:1.5px solid rgba(255,255,255,0.4);color:white;border-radius:100px;padding:6px 12px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;margin-left:12px;white-space:nowrap;';
    b.onclick = function () {
      var next = localStorage.getItem(KEY) === 'fr' ? 'en' : 'fr';
      localStorage.setItem(KEY, next);
      applyLanguage(next);
    };
    bar.appendChild(b);
  }


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
    if (!document.getElementById('site-footer-css')) {
      var st = document.createElement('style');
      st.id = 'site-footer-css';
      st.textContent = FOOTER_CSS;
      document.head.appendChild(st);
    }
    var footer = document.createElement('footer');
    footer.id = 'site-footer';
    footer.innerHTML = FOOTER_HTML;
    document.body.appendChild(footer);
  }

  function init() {
    renderFooter();
    addToggle();
    var lang = localStorage.getItem(KEY) || 'en';
    applyLanguage(lang);
    // Sign-in state changes the nav after load, so translate again shortly after
    setTimeout(function () { applyLanguage(localStorage.getItem(KEY) || 'en'); }, 1200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
