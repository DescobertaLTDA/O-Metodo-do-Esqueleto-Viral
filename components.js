/**
 * Esqueleto Viral - Component Loader
 * Supports both normal site hosting and local file preview.
 */

(function () {
  var BASE = '/components/';
  var currentScript = document.currentScript;
  var SCRIPT_BASE = currentScript && currentScript.src
    ? currentScript.src.replace(/components\.js(?:\?.*)?$/, '')
    : '';
  var INLINE_COMPONENTS = {
    'header.html': [
      '<style>',
      'nav {',
      '  position:fixed; top:0; left:0; right:0; z-index:500;',
      '  padding:0 60px; height:72px;',
      '  display:flex; align-items:center; justify-content:space-between;',
      '  background:rgba(4,0,8,0.97);',
      '  backdrop-filter:none;',
      '  border-bottom:1px solid rgba(255,255,255,0.04);',
      '  box-shadow: 0 1px 0 rgba(168,85,247,0.12), 0 8px 32px rgba(0,0,0,0.6);',
      '}',
      'nav::before {',
      "  content:'';",
      '  position:absolute; top:0; left:0; right:0; height:2px;',
      '  background: linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.6) 30%, rgba(233,213,255,0.9) 50%, rgba(168,85,247,0.6) 70%, transparent 100%);',
      '  pointer-events:none;',
      '}',
      '.nav-logo {',
      '  display:flex; align-items:center; gap:12px;',
      '  font-weight:900; font-size:15px;',
      '  letter-spacing:4px; text-transform:uppercase;',
      '  color:rgba(245,240,255,0.92);',
      '  text-decoration:none;',
      '  position:relative;',
      '}',
      '.nav-logo-icon {',
      '  width:36px; height:36px;',
      '  background: linear-gradient(135deg, #0a0a0a, #000000);',
      '  border:1px solid rgba(168,85,247,0.3);',
      '  border-radius:10px;',
      '  display:flex; align-items:center; justify-content:center;',
      '  font-size:17px;',
      '  box-shadow: 0 0 16px rgba(168,85,247,0.2), inset 0 1px 0 rgba(255,255,255,0.06);',
      '  flex-shrink:0;',
      '}',
      '.nav-logo-text { display:flex; flex-direction:column; line-height:1; }',
      '.nav-logo-main { font-size:16px; font-weight:900; letter-spacing:2px; color:#fff; text-transform:uppercase; }',
      '.nav-logo-main span { color:var(--o1); text-shadow: 0 0 20px rgba(168,85,247,0.5); }',
      '.nav-cta-group { display:flex; flex-direction:column; align-items:flex-end; gap:5px; }',
      '.nav-btn {',
      '  position:relative; overflow:hidden;',
      '  display:inline-flex; align-items:center; gap:8px;',
      '  background: linear-gradient(135deg, #A855F7 0%, #A855F7 50%, #C084FC 100%);',
      "  color:#fff; font-family:'Montserrat',sans-serif;",
      '  font-weight:800; font-size:11px; letter-spacing:2px;',
      '  text-transform:uppercase; padding:11px 24px;',
      '  border:none; cursor:pointer; text-decoration:none;',
      '  border-radius:10px;',
      '  transition:transform .2s, box-shadow .2s;',
      '  box-shadow: 0 4px 24px rgba(91,33,182,0.45), 0 1px 0 rgba(255,255,255,0.1) inset;',
      '}',
      '.nav-btn::before {',
      "  content:''; position:absolute; top:0; left:-100%; width:55%; height:100%;",
      '  background:linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent);',
      '  transition:left .5s ease;',
      '}',
      '.nav-btn:hover { transform:translateY(-1px); box-shadow:0 8px 32px rgba(168,85,247,0.55), 0 1px 0 rgba(255,255,255,0.1) inset; }',
      '.nav-btn:hover::before { left:160%; }',
      '.nav-btn:active { transform:translateY(0); }',
      '.nav-btn-sub { display:none !important; }',
      '@media(max-width:768px){',
      '  nav { padding:0 14px; height:58px; }',
      '  nav::before { height:1.5px; }',
      '  .nav-logo { gap:8px; }',
      '  .nav-logo-icon { width:28px; height:28px; border-radius:7px; flex-shrink:0; }',
      '  .nav-logo-main { font-size:12px; letter-spacing:1px; white-space:nowrap; }',
      '  .nav-btn { font-size:9.5px; padding:8px 14px; letter-spacing:1px; border-radius:7px; white-space:nowrap; }',
      '}',
      '</style>',
      '<nav>',
      '  <a class="nav-logo" id="nav-logo-main" href="https://www.esqueletoviral.com.br/" aria-label="Ir para a página inicial">',
      '    <div class="nav-logo-icon">',
      '      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">',
      '        <path d="M12 2C12 2 9 6 9 9.5C9 9.5 7 8.5 7 6.5C5.5 8 5 10 5 12C5 15.87 8.13 19 12 19C15.87 19 19 15.87 19 12C19 7.5 12 2 12 2Z" fill="url(#fire1)"/>',
      '        <path d="M12 22C12 22 10 19.5 10 17.5C10 16.12 10.9 15 12 15C13.1 15 14 16.12 14 17.5C14 19.5 12 22 12 22Z" fill="url(#fire2)"/>',
      '        <defs>',
      '          <linearGradient id="fire1" x1="12" y1="2" x2="12" y2="19" gradientUnits="userSpaceOnUse">',
      '            <stop offset="0%" stop-color="#e879f9"/>',
      '            <stop offset="60%" stop-color="#A855F7"/>',
      '            <stop offset="100%" stop-color="#7c3aed"/>',
      '          </linearGradient>',
      '          <linearGradient id="fire2" x1="12" y1="15" x2="12" y2="22" gradientUnits="userSpaceOnUse">',
      '            <stop offset="0%" stop-color="#f0abfc"/>',
      '            <stop offset="100%" stop-color="#A855F7"/>',
      '          </linearGradient>',
      '        </defs>',
      '      </svg>',
      '    </div>',
      '    <div class="nav-logo-text">',
      '      <span class="nav-logo-main">ESQUELETO</span>',
      '    </div>',
      '  </a>',
      '  <div style="display:flex;align-items:center;gap:16px;">',
      '    <div class="nav-cta-group">',
      '      <a href="https://pay.kiwify.com.br/HM1g0Nv" data-kiwify-curso target="_blank" rel="noopener" class="nav-btn kiwify-link">Garantir minha vaga →</a>',
      '    </div>',
      '  </div>',
      '</nav>'
    ].join('\n'),
    'footer.html': [
      '<style>',
      'footer { background:var(--dark2); border-top:1px solid rgba(168,85,247,0.08); padding:0; }',
      '.foot-inner { max-width:1140px; margin:0 auto; padding:48px 60px 0; display:flex; flex-direction:column; gap:36px; }',
      '.foot-top { display:flex; justify-content:space-between; align-items:center; gap:40px; flex-wrap:wrap; }',
      '.foot-brand { display:flex; flex-direction:column; gap:10px; align-self:flex-start; margin-right:auto; }',
      '.foot-links { display:flex; gap:40px; align-items:center; flex-wrap:wrap; }',
      '.foot-links a, .foot-links span { font-size:12px; color:rgba(255,255,255,0.3); text-decoration:none; letter-spacing:.3px; transition:color .2s; white-space:nowrap; }',
      '.foot-links a:hover { color:rgba(245,240,255,0.65); }',
      '.foot-divider { height:1px; background:rgba(255,255,255,0.04); }',
      '.foot-bar { background:rgba(0,0,0,0.4); border-top:1px solid rgba(255,255,255,0.03); padding:18px 60px; }',
      '.foot-bar-inner { max-width:1140px; margin:0 auto; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; }',
      '.foot-copy { font-size:11px; color:rgba(245,240,255,0.15); letter-spacing:.3px; }',
      '@media(max-width:768px){',
      '  .foot-inner { padding: 32px 20px 0 !important; }',
      '  .foot-top { flex-direction: column; gap: 24px; }',
      '  .foot-links { gap: 20px; }',
      '  .foot-bar { padding: 14px 20px; }',
      '  .foot-bar-inner { flex-direction: column; gap: 8px; }',
      '  .foot-inner [style*="width:1px;height:40px"] { display: none !important; }',
      '  .foot-inner [style*="justify-content:center;flex-wrap:wrap"] { gap: 24px !important; }',
      '}',
      '</style>',
      '<footer>',
      '  <div class="foot-inner">',
      '    <div class="foot-top">',
      '      <div class="foot-brand">',
      '        <div style="font-family:\'Montserrat\',sans-serif;font-weight:900;font-size:16px;letter-spacing:3px;text-transform:uppercase;color:rgba(245,240,255,0.6);">ESQUELETO <span style="color:var(--o1);">VIRAL</span></div>',
      '      </div>',
      '      <div class="foot-links">',
      '        <a href="/prompts">Prompts</a>',
      '        <span>|</span>',
      '        <a href="/blog">Blog</a>',
      '        <span>|</span>',
      '        <a href="/contato">Contato</a>',
      '        <span>|</span>',
      '        <a href="/privacidade">Politica de Privacidade</a>',
      '      </div>',
      '    </div>',
      '    <div class="foot-divider"></div>',
      '    <div style="padding:36px 0 32px;border-bottom:1px solid rgba(255,255,255,0.04);">',
      '      <div style="display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:32px;margin-bottom:32px;">',
      '        <div style="display:flex;flex-direction:column;align-items:center;gap:10px;min-width:240px;">',
      '          <span style="font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.2);">Compra protegida</span>',
      '          <div style="height:64px;display:flex;align-items:center;justify-content:center;">',
      '            <img src="/assets/img/compra_segura.png" alt="Compra Segura" style="height:44px;width:auto;opacity:0.85;filter:brightness(1.15);">',
      '          </div>',
      '        </div>',
      '      </div>',
      '      <div style="text-align:center;">',
      '        <p style="font-size:11px;color:rgba(255,255,255,0.2);line-height:1.9;font-family:\'Montserrat\',sans-serif;">',
      '          <strong style="color:rgba(255,255,255,0.35);">L.G.S Descoberta Mental LTDA</strong> - CNPJ 56.027.103/0001-08<br>',
      '          Este produto e vendido e entregue pela plataforma Kiwify.',
      '        </p>',
      '      </div>',
      '    </div>',
      '  </div>',
      '  <div class="foot-bar">',
      '    <div class="foot-bar-inner">',
      '      <p class="foot-copy">© 2026 L.G.S Descoberta Mental LTDA - CNPJ 56.027.103/0001-08 - Todos os direitos reservados</p>',
      '    </div>',
      '  </div>',
      '</footer>'
    ].join('\n')
  };

  function applyHeaderLogo() {
    if (typeof EV_CONFIG === 'undefined') return;

    var logo = document.getElementById('nav-logo-main');
    if (!logo || !EV_CONFIG.logo || EV_CONFIG.logo.urlLight) return;

    logo.innerHTML =
      '<div class="nav-logo-icon">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M12 2C12 2 9 6 9 9.5C9 9.5 7 8.5 7 6.5C5.5 8 5 10 5 12C5 15.87 8.13 19 12 19C15.87 19 19 15.87 19 12C19 7.5 12 2 12 2Z" fill="url(#fire1)"/>' +
      '<path d="M12 22C12 22 10 19.5 10 17.5C10 16.12 10.9 15 12 15C13.1 15 14 16.12 14 17.5C14 19.5 12 22 12 22Z" fill="url(#fire2)"/>' +
      '<defs>' +
      '<linearGradient id="fire1" x1="12" y1="2" x2="12" y2="19" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#e879f9"/><stop offset="60%" stop-color="#A855F7"/><stop offset="100%" stop-color="#7c3aed"/></linearGradient>' +
      '<linearGradient id="fire2" x1="12" y1="15" x2="12" y2="22" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#f0abfc"/><stop offset="100%" stop-color="#A855F7"/></linearGradient>' +
      '</defs></svg></div>' +
      '<div class="nav-logo-text"><span class="nav-logo-main">ESQUELETO</span></div>';
  }

  function injectComponent(id, html) {
    var el = document.getElementById(id);
    if (!el) return;

    el.outerHTML = html;

    if (id === 'ev-header') applyHeaderLogo();
  }

  function ensureSocialProofScript() {
    if (window.EVSocialProofInit) {
      window.EVSocialProofInit();
      return;
    }

    if (document.getElementById('ev-social-proof-script')) return;

    var script = document.createElement('script');
    script.id = 'ev-social-proof-script';
    script.src = SCRIPT_BASE ? SCRIPT_BASE + 'social-proof.js' : '/social-proof.js';
    document.head.appendChild(script);
  }

  function loadComponent(id, file) {
    var el = document.getElementById(id);
    if (!el) return;

    if (window.location.protocol === 'file:') {
      if (INLINE_COMPONENTS[file]) injectComponent(id, INLINE_COMPONENTS[file]);
      return;
    }

    fetch(BASE + file)
      .then(function (res) {
        if (!res.ok) throw new Error('Falha ao carregar ' + file);
        return res.text();
      })
      .then(function (html) {
        injectComponent(id, html);
      })
      .catch(function (err) {
        if (INLINE_COMPONENTS[file]) {
          injectComponent(id, INLINE_COMPONENTS[file]);
          return;
        }
        console.warn('[EV Components]', err);
      });
  }

  function init() {
    loadComponent('ev-header', 'header.html');
    loadComponent('ev-footer', 'footer.html');
    ensureSocialProofScript();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();



