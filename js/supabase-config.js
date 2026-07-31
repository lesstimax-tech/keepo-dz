// Client Supabase — URL/clé via js/config.js (optionnel) ou valeurs par défaut ci-dessous.
(function () {
  const cfg = window.KEEPO_CONFIG || {};
  const SUPABASE_URL = cfg.SUPABASE_URL || "https://phkrdlcplzjenbulsqls.supabase.co";
  const SUPABASE_ANON_KEY = cfg.SUPABASE_ANON_KEY || "sb_publishable_MJPHVnBthwKo3hmGWyii6A_L24ep66f";

  if (typeof supabase === "undefined") {
    console.error("KEEPO : chargez @supabase/supabase-js avant supabase-config.js");
    return;
  }

  const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      flowType: "pkce",
      detectSessionInUrl: true,
      persistSession: true,
      autoRefreshToken: true
    }
  });

  window.supabaseClient = supabaseClient;
  window.SUPABASE_URL   = SUPABASE_URL; // utile pour les Edge Functions

  // ──────────────────────────────────────────────────────────────
  //  Appareil de confiance — « code 1×/mois par appareil »
  //  Après validation d'un code, l'appareil est mémorisé 30 jours :
  //  accès automatique pendant ce délai, puis le code est redemandé.
  //  Partagé entre la page de connexion ET les dashboards.
  // ──────────────────────────────────────────────────────────────
  const TRUST_DAYS = 30;
  const trustKey = (email) => 'KEEPO_trust_' + String(email || '').toLowerCase().trim();
  window.KEEPO_AUTH = {
    TRUST_DAYS,
    // Mémorise l'appareil pour 30 jours.
    trust(email) { try { localStorage.setItem(trustKey(email), String(Date.now() + TRUST_DAYS * 864e5)); } catch (_) {} },
    clear(email) { try { localStorage.removeItem(trustKey(email)); } catch (_) {} },
    // 'valid'   : appareil mémorisé, encore valable        → accès direct
    // 'expired' : les 30 jours sont passés                 → redemander le code
    // 'none'    : jamais mémorisé (session pré-existante)  → grâce, on démarre l'horloge
    state(email) {
      try {
        const raw = localStorage.getItem(trustKey(email));
        if (!raw) return 'none';
        return Number(raw) > Date.now() ? 'valid' : 'expired';
      } catch (_) { return 'none'; }
    },
    isTrusted(email) { return this.state(email) === 'valid'; },
    rememberEmail(email) { try { localStorage.setItem('KEEPO_last_email', String(email || '').trim()); } catch (_) {} },
    lastEmail() { try { return localStorage.getItem('KEEPO_last_email') || ''; } catch (_) { return ''; } },
    // Garde de dashboard : renvoie true si l'accès est autorisé.
    // Si le délai est dépassé → déconnexion + retour à /connexion (code à ressaisir).
    // Si aucune trace (session ouverte avant cette mise à jour) → grâce : on démarre
    // le compteur de 30 jours sans déconnecter l'utilisateur.
    async guardOrRedirect(session) {
      const email = session && session.user && session.user.email;
      const st = this.state(email);
      if (st === 'expired') {
        try { await supabaseClient.auth.signOut(); } catch (_) {}
        window.location.href = '/connexion';
        return false;
      }
      if (st === 'none') this.trust(email);
      return true;
    }
  };

  // Clé PUBLIQUE VAPID (notifications push). Publique par conception : peut être
  // exposée au client sans risque. La clé PRIVÉE reste un secret serveur
  // (VAPID_PRIVATE_KEY dans les secrets Supabase). Surchargée via js/config.js.
  window.KEEPO_VAPID_PUBLIC_KEY = cfg.VAPID_PUBLIC_KEY
    || "BGU-1TBsMJohHKzZMYgRKrt0ed-_Ffi3qxl5cNOEdIGlFIPzLehi0dO5vsyDZSX-eboZSIoBE2z6Jeg_DzXqY-0";

  // ──────────────────────────────────────────────────────────────
  //  Sécurité : attache automatiquement le jeton d'authentification
  //  aux appels vers nos propres endpoints (/api/*, même origine).
  //  Le Worker exige désormais ce jeton ; ce wrapper garantit que
  //  toutes les fonctionnalités existantes (IA, campagnes, Stripe…)
  //  restent fonctionnelles SANS toucher à chaque appel fetch.
  //  Les appels vers Supabase ou des tiers ne sont pas modifiés.
  // ──────────────────────────────────────────────────────────────
  const _origFetch = window.fetch.bind(window);
  window.fetch = function (input, init) {
    let rawUrl = "";
    try { rawUrl = typeof input === "string" ? input : (input && input.url) || ""; } catch (_) {}
    const isOwnApi = rawUrl.indexOf("/api/") === 0
      || rawUrl.indexOf(window.location.origin + "/api/") === 0;
    if (!isOwnApi) return _origFetch(input, init);

    return (async () => {
      try {
        const { data } = await supabaseClient.auth.getSession();
        const token = data && data.session && data.session.access_token;
        if (token) {
          const headers = new Headers((init && init.headers) || {});
          if (!headers.has("Authorization")) headers.set("Authorization", "Bearer " + token);
          init = Object.assign({}, init, { headers });
        }
      } catch (_) { /* fail-open : le Worker répondra 401 si le jeton manque */ }
      return _origFetch(input, init);
    })();
  };
})();
