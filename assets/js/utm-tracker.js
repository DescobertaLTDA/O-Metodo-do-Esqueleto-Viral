/**
 * Esqueleto Viral — UTM Tracker v3
 *
 * Fontes capturadas (por prioridade):
 *   1. Parâmetros UTM na URL (?utm_source=...)
 *   2. Slug da URL mapeado para canal (/pontomisterioso/ → youtube/bio)
 *   3. Atalhos ?src= e ?ref=
 *   4. document.referrer (Google, YouTube, TikTok, Instagram, etc.)
 *   5. sessionStorage (mesma aba)
 *   6. localStorage (mesmo navegador)
 *   7. Cookie de 30 dias (retorno após fechar o navegador)
 *   8. Fallback: direto/organico
 *
 * IMPORTANTE: os links de checkout NÃO recebem UTMs na URL.
 * A atribuição é salva em cookie/localStorage e lida na página /obrigado.
 *
 * Páginas cobertas:
 *   - Todas as landing pages → captura origem, persiste, dispara pixels
 *   - /obrigado/ → dispara Purchase no GA4, Meta Pixel e TikTok com UTMs
 */
(function () {
  'use strict';

  // ── Configuração ─────────────────────────────────────────────────
  var SS_KEY    = 'ev_utm';
  var LS_KEY    = 'ev_utm_ls';
  var CK_KEY    = 'ev_utm_30d';
  var CK_DAYS   = 30;
  var UTM_KEYS  = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  var PRECO     = (typeof EV_CONFIG !== 'undefined' && EV_CONFIG.curso) ? EV_CONFIG.curso.precoNumero : 35;

  // Slug na URL → UTMs automáticos (tráfego de bio de canal)
  var CANAL_MAP = {
    'pontomisterioso':  { utm_source: 'youtube', utm_medium: 'bio', utm_campaign: 'pontomisterioso'  },
    'canalligado':      { utm_source: 'youtube', utm_medium: 'bio', utm_campaign: 'canalligado'      },
    'misteriocentral':  { utm_source: 'youtube', utm_medium: 'bio', utm_campaign: 'misteriocentral'  },
    'socratesbizarro':  { utm_source: 'youtube', utm_medium: 'bio', utm_campaign: 'socratesbizarro'  },
    'primalreverse':    { utm_source: 'youtube', utm_medium: 'bio', utm_campaign: 'primalreverse'    },
    'descobertamental': { utm_source: 'tiktok',  utm_medium: 'bio', utm_campaign: 'descobertamental' },
  };

  // Referrer → UTMs automáticos
  var REFERRER_MAP = [
    { re: /google\./i,     source: 'google',    medium: 'organic'   },
    { re: /bing\./i,       source: 'bing',      medium: 'organic'   },
    { re: /yahoo\./i,      source: 'yahoo',     medium: 'organic'   },
    { re: /duckduckgo\./i, source: 'duckduckgo',medium: 'organic'   },
    { re: /youtube\./i,    source: 'youtube',   medium: 'social'    },
    { re: /t\.co/i,        source: 'twitter',   medium: 'social'    },
    { re: /twitter\./i,    source: 'twitter',   medium: 'social'    },
    { re: /instagram\./i,  source: 'instagram', medium: 'social'    },
    { re: /facebook\./i,   source: 'facebook',  medium: 'social'    },
    { re: /tiktok\./i,     source: 'tiktok',    medium: 'social'    },
    { re: /whatsapp\./i,   source: 'whatsapp',  medium: 'messenger' },
    { re: /t\.me/i,        source: 'telegram',  medium: 'messenger' },
    { re: /kwai\./i,       source: 'kwai',      medium: 'social'    },
  ];

  var FALLBACK = { utm_source: 'direto', utm_medium: 'organico', utm_campaign: 'direto' };

  // ── Cookie ───────────────────────────────────────────────────────
  function setCookie(val) {
    try {
      var exp = new Date(Date.now() + CK_DAYS * 864e5).toUTCString();
      document.cookie = CK_KEY + '=' + encodeURIComponent(val) + '; expires=' + exp + '; path=/; SameSite=Lax';
    } catch (e) {}
  }

  function getCookie() {
    try {
      var m = document.cookie.match(new RegExp('(?:^|; )' + CK_KEY + '=([^;]*)'));
      return m ? decodeURIComponent(m[1]) : null;
    } catch (e) { return null; }
  }

  // ── Storage ──────────────────────────────────────────────────────
  function persist(obj) {
    var str = JSON.stringify(obj);
    try { sessionStorage.setItem(SS_KEY, str); } catch (e) {}
    try { localStorage.setItem(LS_KEY, str);   } catch (e) {}
    setCookie(str);
  }

  function loadSaved() {
    var raw = null;
    try { raw = sessionStorage.getItem(SS_KEY); } catch (e) {}
    if (!raw) { try { raw = localStorage.getItem(LS_KEY); } catch (e) {} }
    if (!raw) { raw = getCookie(); }
    if (!raw) return null;
    try { return JSON.parse(raw); } catch (e) { return null; }
  }

  // ── Leitura de fontes ────────────────────────────────────────────
  function fromUrl() {
    var p = {};
    try {
      var sp = new URLSearchParams(window.location.search);
      UTM_KEYS.forEach(function (k) { var v = sp.get(k); if (v) p[k] = v.trim(); });
      var src = sp.get('src'); if (src && !p.utm_content) p.utm_content = src.trim();
      var ref = sp.get('ref'); if (ref && !p.utm_source)  { p.utm_source = ref.trim(); p.utm_medium = p.utm_medium || 'referral'; }
    } catch (e) {}
    return p;
  }

  function fromSlug() {
    var slug = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase();
    return CANAL_MAP[slug] ? Object.assign({}, CANAL_MAP[slug]) : {};
  }

  function fromReferrer() {
    var ref = document.referrer;
    if (!ref) return {};
    try { if (new URL(ref).hostname === window.location.hostname) return {}; } catch (e) {}
    for (var i = 0; i < REFERRER_MAP.length; i++) {
      if (REFERRER_MAP[i].re.test(ref)) {
        return { utm_source: REFERRER_MAP[i].source, utm_medium: REFERRER_MAP[i].medium, utm_campaign: 'organico' };
      }
    }
    try {
      var host = new URL(ref).hostname.replace(/^www\./, '');
      return { utm_source: host, utm_medium: 'referral', utm_campaign: 'referral' };
    } catch (e) { return {}; }
  }

  // ── Resolução final (merge de todas as fontes) ───────────────────
  function resolve() {
    var url   = fromUrl();
    var slug  = fromSlug();
    var ref   = fromReferrer();
    var saved = loadSaved();

    var hasFresh = Object.keys(url).length > 0 || Object.keys(slug).length > 0;
    var merged   = {};

    if (hasFresh) {
      Object.assign(merged, slug, url);          // URL params ganham do slug
    } else if (saved && saved.utm_source) {
      Object.assign(merged, saved);              // Visita de retorno
    } else if (Object.keys(ref).length > 0) {
      Object.assign(merged, ref);                // Referrer como origem
    } else {
      Object.assign(merged, FALLBACK);           // Tráfego direto
    }

    if (!merged.utm_source)   merged.utm_source   = FALLBACK.utm_source;
    if (!merged.utm_medium)   merged.utm_medium   = FALLBACK.utm_medium;
    if (!merged.utm_campaign) merged.utm_campaign = FALLBACK.utm_campaign;

    return merged;
  }

  // ── Helpers de pixel ─────────────────────────────────────────────
  function ga4(event, params) {
    if (typeof gtag === 'function') { try { gtag('event', event, params); } catch (e) {} }
  }
  function fb(event, params) {
    if (typeof fbq === 'function') { try { fbq('track', event, params); } catch (e) {} }
  }
  function tk(event, params) {
    if (typeof ttq === 'object' && typeof ttq.track === 'function') { try { ttq.track(event, params); } catch (e) {} }
  }

  // ── Página de Obrigado — Purchase com UTMs ───────────────────────
  function initThankYou(utms) {
    var FIRED = 'ev_purchase_fired';
    if (sessionStorage.getItem(FIRED)) return;

    var sp      = new URLSearchParams(window.location.search);
    var valor   = parseFloat(sp.get('valor'));
    if (isNaN(valor) || valor <= 0) valor = PRECO;
    var produto = sp.get('produto') || 'Esqueleto Viral';
    var txnId   = 'txn_' + Date.now() + '_' + Math.floor(Math.random() * 1e6);

    ga4('purchase', {
      transaction_id: txnId,
      value:          valor,
      currency:       'BRL',
      utm_source:     utms.utm_source,
      utm_medium:     utms.utm_medium,
      utm_campaign:   utms.utm_campaign,
      utm_content:    utms.utm_content  || undefined,
      utm_term:       utms.utm_term     || undefined,
      items: [{ item_id: 'esqueleto-viral', item_name: produto, price: valor, quantity: 1 }],
    });

    fb('Purchase', {
      value:        valor,
      currency:     'BRL',
      content_name: produto,
      content_ids:  ['esqueleto-viral'],
      content_type: 'product',
    });

    tk('CompletePayment', {
      content_id:   'esqueleto-viral',
      content_name: produto,
      currency:     'BRL',
      value:        valor,
    });

    try { sessionStorage.setItem(FIRED, '1'); } catch (e) {}
  }

  // ── Injeta UTMs do visitante em todos os links do Kiwify ─────────
  function injectUtmsIntoLinks(utms) {
    var links = document.querySelectorAll('a.kiwify-link, [data-kiwify], [data-kiwify-curso]');
    links.forEach(function (el) {
      if (!el.href) return;
      try {
        var url = new URL(el.href);
        if (utms.utm_source)   url.searchParams.set('utm_source',   utms.utm_source);
        if (utms.utm_medium)   url.searchParams.set('utm_medium',   utms.utm_medium);
        if (utms.utm_campaign) url.searchParams.set('utm_campaign', utms.utm_campaign);
        if (utms.utm_content)  url.searchParams.set('utm_content',  utms.utm_content);
        if (utms.utm_term)     url.searchParams.set('utm_term',     utms.utm_term);
        el.href = url.toString();
      } catch (e) {}
    });
  }

  // ── Click no checkout — injeta UTMs no href + dispara eventos ────
  function bindCheckoutClick(utms) {
    document.addEventListener('click', function (e) {
      var el = e.target && e.target.closest
        ? e.target.closest('a.kiwify-link, [data-kiwify], [data-kiwify-curso]')
        : null;
      if (!el) return;

      // Injeta UTMs no href no momento do clique (garante links dinâmicos)
      if (el.href) {
        try {
          var url = new URL(el.href);
          if (utms.utm_source)   url.searchParams.set('utm_source',   utms.utm_source);
          if (utms.utm_medium)   url.searchParams.set('utm_medium',   utms.utm_medium);
          if (utms.utm_campaign) url.searchParams.set('utm_campaign', utms.utm_campaign);
          if (utms.utm_content)  url.searchParams.set('utm_content',  utms.utm_content);
          if (utms.utm_term)     url.searchParams.set('utm_term',     utms.utm_term);
          el.href = url.toString();
        } catch (e) {}
      }

      ga4('begin_checkout', {
        currency:     'BRL',
        value:        PRECO,
        utm_source:   utms.utm_source,
        utm_medium:   utms.utm_medium,
        utm_campaign: utms.utm_campaign,
        items: [{ item_id: 'esqueleto-viral', item_name: 'Esqueleto Viral', price: PRECO, quantity: 1 }],
      });
      fb('InitiateCheckout', { content_name: 'Esqueleto Viral', currency: 'BRL', value: PRECO });
      tk('InitiateCheckout', { content_id: 'esqueleto-viral', content_name: 'Esqueleto Viral', currency: 'BRL', value: PRECO });
    }, true);
  }

  // ── ViewContent (página carregada) ───────────────────────────────
  function fireViewContent() {
    tk('ViewContent', { content_id: 'esqueleto-viral', content_name: 'Esqueleto Viral', content_type: 'product', currency: 'BRL', value: PRECO });
  }

  // ── Seta __EV_CHECKOUT_URL com UTMs do visitante ─────────────────
  function setCheckoutUrl(utms) {
    try {
      if (typeof EV_CONFIG === 'undefined' || !EV_CONFIG.curso || !EV_CONFIG.curso.checkoutUrl) return;
      var base = EV_CONFIG.curso.checkoutUrl.split('?')[0];
      var url = new URL(base);
      if (utms.utm_source)   url.searchParams.set('utm_source',   utms.utm_source);
      if (utms.utm_medium)   url.searchParams.set('utm_medium',   utms.utm_medium);
      if (utms.utm_campaign) url.searchParams.set('utm_campaign', utms.utm_campaign);
      if (utms.utm_content)  url.searchParams.set('utm_content',  utms.utm_content);
      if (utms.utm_term)     url.searchParams.set('utm_term',     utms.utm_term);
      window.__EV_CHECKOUT_URL = url.toString();
    } catch(e) {}
  }

  // ── Init ─────────────────────────────────────────────────────────
  function init() {
    var utms = resolve();
    persist(utms);

    window.EV_UTM = utms;
    setCheckoutUrl(utms);

    if (/\/obrigado/i.test(window.location.pathname)) {
      initThankYou(utms);
    } else {
      injectUtmsIntoLinks(utms);
      bindCheckoutClick(utms);
      fireViewContent();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
