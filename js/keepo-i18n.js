/* ══════════════════════════════════════════════════════════════════
   KEEPO — Moteur i18n bilingue FR / AR (Algérie)
   ------------------------------------------------------------------
   Utilisation dans le HTML :
     <span data-i18n="nav.login">Se connecter</span>      → remplace le texte
     <h1 data-i18n-html="hero.title">…</h1>                → remplace le HTML (balises internes)
     <input data-i18n-attr="placeholder:form.email">      → traduit un attribut
   Le choix de langue est mémorisé (localStorage) et applique
   automatiquement dir="rtl" + lang="ar" en arabe.
   Pour étendre : ajoutez des clés dans DICT (ou window.KEEPO_I18N_EXTRA
   défini AVANT le chargement de ce script pour les clés propres à une page).
   ══════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  const DICT = {
    /* ─── Navigation ─── */
    "nav.features":  { fr: "Fonctionnalités", ar: "الميزات" },
    "nav.marketing": { fr: "Marketing",       ar: "التسويق" },
    "nav.pricing":   { fr: "Tarifs",          ar: "الأسعار" },
    "nav.reviews":   { fr: "Avis",            ar: "الآراء" },
    "nav.faq":       { fr: "FAQ",             ar: "الأسئلة الشائعة" },
    "nav.login":     { fr: "Se connecter",    ar: "تسجيل الدخول" },
    "nav.trial":     { fr: "Essai gratuit",   ar: "تجربة مجانية" },
    "account.create":{ fr: "Créer un compte", ar: "إنشاء حساب" },

    /* ─── Hero (page d'accueil) ─── */
    "hero.badge": {
      fr: "Nouveau — Marketing automatisé inclus dans Pro",
      ar: "جديد — تسويق آلي مضمَّن في Pro"
    },
    "hero.title": {
      fr: 'Offrez à votre commerce un vrai <span class="grad-text">programme de fidélité</span>.',
      ar: 'امنح متجرك <span class="grad-text">برنامج ولاء</span> حقيقياً.'
    },
    "hero.sub": {
      fr: 'Bouchers, coiffeurs, restaurateurs, cavistes… Donnez à vos clients les avantages des grandes enseignes — points, cartes à tampons, récompenses — directement dans leur téléphone. Et <strong>récupérez leur nom et leur e-mail dès la première visite</strong>.',
      ar: 'الجزّارون، الحلّاقون، أصحاب المطاعم، الخبّازون… امنح زبائنك مزايا العلامات الكبرى — نقاط، وبطاقات أختام، ومكافآت — مباشرةً في هواتفهم. و<strong>احصل على اسمهم وبريدهم الإلكتروني منذ أوّل زيارة</strong>.'
    },
    "hero.cta_start": { fr: "Démarrer l'essai gratuit", ar: "ابدأ التجربة المجانية" },
    "hero.cta_demo":  { fr: "Essayer la démo",          ar: "جرّب العرض التوضيحي" },
    "hero.proof_2min":{ fr: "Prêt en 2 minutes",        ar: "جاهز في دقيقتين" }
  };

  // Permet à une page d'ajouter ses propres clés sans modifier ce fichier
  if (window.KEEPO_I18N_EXTRA && typeof window.KEEPO_I18N_EXTRA === "object") {
    Object.assign(DICT, window.KEEPO_I18N_EXTRA);
  }
  window.KEEPO_DICT = DICT;

  const STORAGE_KEY = "keepo_lang";
  function currentLang() {
    return localStorage.getItem(STORAGE_KEY) === "ar" ? "ar" : "fr";
  }

  function translate(lang) {
    const html = document.documentElement;
    html.lang = lang;
    html.dir  = (lang === "ar") ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const t = DICT[el.getAttribute("data-i18n")];
      if (t) el.textContent = t[lang] || t.fr;
    });
    document.querySelectorAll("[data-i18n-html]").forEach(el => {
      const t = DICT[el.getAttribute("data-i18n-html")];
      if (t) el.innerHTML = t[lang] || t.fr;
    });
    document.querySelectorAll("[data-i18n-attr]").forEach(el => {
      // format : "placeholder:cle" ou "placeholder:cle;title:cle2"
      el.getAttribute("data-i18n-attr").split(";").forEach(pair => {
        const [attr, key] = pair.split(":").map(s => s && s.trim());
        const t = DICT[key];
        if (attr && t) el.setAttribute(attr, t[lang] || t.fr);
      });
    });

    localStorage.setItem(STORAGE_KEY, lang);
    updateToggle(lang);
  }

  /* ─── Bouton de langue flottant (injecté sur toutes les pages) ─── */
  function buildToggle() {
    if (document.getElementById("keepo-lang-toggle")) return;
    const style = document.createElement("style");
    style.textContent = `
      #keepo-lang-toggle{position:fixed;bottom:18px;inset-inline-end:18px;z-index:9999;
        display:inline-flex;align-items:center;gap:2px;padding:5px;border-radius:100px;
        background:rgba(20,30,32,.86);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.14);
        box-shadow:0 8px 24px -8px rgba(0,0,0,.5);font-family:system-ui,sans-serif;cursor:default}
      #keepo-lang-toggle button{border:0;border-radius:100px;padding:6px 13px;font-size:13px;
        font-weight:700;cursor:pointer;background:transparent;color:#cfe0e2;font-family:inherit;line-height:1}
      #keepo-lang-toggle button.on{background:linear-gradient(135deg,#16B8C4,#0E9AA6);color:#fff}
      #keepo-lang-toggle button:focus-visible{outline:2px solid #16B8C4;outline-offset:2px}
    `;
    document.head.appendChild(style);

    const wrap = document.createElement("div");
    wrap.id = "keepo-lang-toggle";
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-label", "Choix de la langue / اختيار اللغة");
    wrap.innerHTML =
      '<button type="button" data-lang="fr">FR</button>' +
      '<button type="button" data-lang="ar" lang="ar">ع</button>';
    wrap.addEventListener("click", e => {
      const b = e.target.closest("button[data-lang]");
      if (b) translate(b.getAttribute("data-lang"));
    });
    document.body.appendChild(wrap);
  }

  function updateToggle(lang) {
    const wrap = document.getElementById("keepo-lang-toggle");
    if (!wrap) return;
    wrap.querySelectorAll("button[data-lang]").forEach(b => {
      b.classList.toggle("on", b.getAttribute("data-lang") === lang);
    });
  }

  function init() {
    buildToggle();
    translate(currentLang());
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Exposé pour usage manuel éventuel
  window.KEEPO_setLang = translate;
})();
