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
      'nav{position:fixed;top:0;left:0;right:0;z-index:500;padding:0 20px 0 12px;height:72px;display:flex;align-items:center;gap:12px;background:rgba(4,0,8,0.97);border-bottom:1px solid rgba(255,255,255,0.04);box-shadow:0 1px 0 rgba(201,168,76,0.25),0 8px 32px rgba(0,0,0,0.6);}',
      "nav::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent 0%,rgba(201,168,76,0.5) 30%,rgba(240,208,80,0.9) 50%,rgba(201,168,76,0.5) 70%,transparent 100%);pointer-events:none;}",
      '.nav-logo{display:flex;align-items:center;gap:10px;text-decoration:none;flex:1;}',
      '.nav-logo-icon{width:34px;height:34px;flex-shrink:0;background:linear-gradient(135deg,#1a1000,#0a0800);border:1px solid rgba(201,168,76,0.4);border-radius:9px;display:flex;align-items:center;justify-content:center;box-shadow:0 0 16px rgba(201,168,76,0.2),inset 0 1px 0 rgba(255,255,255,0.06);}',
      '.nav-logo-text{display:flex;flex-direction:column;line-height:1;}',
      ".nav-logo-main{font-size:15px;font-weight:900;letter-spacing:3px;color:#fff;text-transform:uppercase;font-family:'Montserrat',sans-serif;}",
      '.nav-cta-group{display:flex;align-items:center;flex-shrink:0;}',
      ".nav-btn{position:relative;overflow:hidden;display:inline-flex;align-items:center;background:linear-gradient(135deg,#C9A84C 0%,#F0D060 100%);color:#0d0800;font-family:'Montserrat',sans-serif;font-weight:800;font-size:11px;letter-spacing:2px;text-transform:uppercase;padding:11px 22px;border:none;cursor:pointer;text-decoration:none;border-radius:10px;transition:transform .2s,box-shadow .2s;box-shadow:0 4px 24px rgba(180,140,0,0.5),0 1px 0 rgba(255,255,255,0.2) inset;white-space:nowrap;}",
      ".nav-btn::before{content:'';position:absolute;top:0;left:-100%;width:55%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent);transition:left .5s ease;}",
      '.nav-btn:hover{transform:translateY(-1px);box-shadow:0 8px 32px rgba(201,168,76,0.65),0 1px 0 rgba(255,255,255,0.2) inset;}',
      '.nav-btn:hover::before{left:160%;}.nav-btn:active{transform:translateY(0);}',
      '.nav-hamburger{background:none;border:none;cursor:pointer;display:flex;flex-direction:column;gap:5px;width:34px;height:34px;flex-shrink:0;justify-content:center;align-items:center;border-radius:8px;transition:background .2s;padding:0;}',
      '.nav-hamburger:hover{background:rgba(255,255,255,0.07);}',
      '.nav-hamburger span{display:block;width:19px;height:2px;background:rgba(255,255,255,0.8);border-radius:2px;transition:transform .3s,opacity .3s;}',
      '.nav-hamburger.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}',
      '.nav-hamburger.open span:nth-child(2){opacity:0;}',
      '.nav-hamburger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}',
      '.nav-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.65);z-index:498;opacity:0;pointer-events:none;transition:opacity .3s;}',
      '.nav-overlay.open{opacity:1;pointer-events:all;}',
      '.nav-drawer{position:fixed;top:0;left:0;width:270px;height:100vh;background:#0d0b00;border-right:1px solid rgba(201,168,76,0.12);z-index:499;display:flex;flex-direction:column;padding:80px 0 32px;transform:translateX(-100%);transition:transform .3s cubic-bezier(.4,0,.2,1);box-shadow:6px 0 40px rgba(0,0,0,0.7);}',
      '.nav-drawer.open{transform:translateX(0);}',
      ".nav-drawer a{display:flex;align-items:center;gap:12px;padding:14px 24px;font-family:'Montserrat',sans-serif;font-size:12.5px;font-weight:600;color:rgba(255,255,255,0.6);text-decoration:none;letter-spacing:.3px;transition:background .2s,color .2s;border-bottom:1px solid rgba(255,255,255,0.04);}",
      '.nav-drawer a:hover{background:rgba(201,168,76,0.06);color:rgba(255,255,255,0.95);}',
      '.nav-drawer a svg{flex-shrink:0;opacity:0.5;transition:opacity .2s;}',
      '.nav-drawer a:hover svg{opacity:0.9;}',
      '.nav-drawer-sep{height:1px;background:rgba(255,255,255,0.05);margin:6px 0;}',
      '.nav-drawer-cta{margin:20px 16px 0!important;padding:13px 20px!important;background:linear-gradient(135deg,#C9A84C,#F0D060)!important;color:#0d0800!important;border-radius:10px!important;border-bottom:none!important;justify-content:center!important;font-weight:800!important;letter-spacing:1px!important;font-size:12px!important;}',
      '.nav-drawer-cta:hover{background:linear-gradient(135deg,#D4B85A,#F8E070)!important;color:#0d0800!important;}',
      '.nav-drawer-cta svg{display:none!important;}',
      '@media(max-width:768px){nav{padding:0 12px 0 8px;height:60px;gap:8px;}.nav-logo-main{font-size:12px;letter-spacing:2px;}.nav-logo-icon{width:28px;height:28px;border-radius:7px;}.nav-btn{font-size:9px;padding:8px 12px;letter-spacing:1px;border-radius:8px;}.nav-drawer{width:80vw;max-width:300px;}}',
      '</style>',
      '<nav>',
      '  <button class="nav-hamburger" id="nav-hamburger" onclick="_evToggleDrawer()" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>',
      '  <a class="nav-logo" id="nav-logo-main" href="https://www.esqueletoviral.com.br/" aria-label="Academy">',
      '    <div class="nav-logo-icon"><img src="/assets/logo/logo_1_teste.webp" alt="Academy" style="width:22px;height:22px;object-fit:contain;display:block;"></div>',
      '    <div class="nav-logo-text"><span class="nav-logo-main">ACADEMY</span></div>',
      '  </a>',
      '  <div class="nav-cta-group">',
      '    <a href="https://pay.kiwify.com.br/HM1g0Nv" data-kiwify-curso data-utm-content="nav" target="_blank" rel="noopener" class="nav-btn kiwify-link">Garantir minha vaga →</a>',
      '  </div>',
      '</nav>',
      '<div class="nav-overlay" id="nav-overlay" onclick="_evCloseDrawer()"></div>',
      '<div class="nav-drawer" id="nav-drawer" role="navigation" aria-label="Menu de navegação">',
      '  <a href="#main-content" onclick="_evCloseDrawer()"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1z"/><path d="M9 21V12h6v9"/></svg>Início</a>',
      '  <a href="#analytics" onclick="_evCloseDrawer()"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon fill="currentColor" stroke="none" points="10,8 17,12 10,16"/></svg>Prova Real</a>',
      '  <div class="nav-drawer-sep"></div>',
      '  <a href="#faq" onclick="_evCloseDrawer()"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><circle cx="12" cy="17" r=".6" fill="currentColor" stroke="none"/></svg>FAQ</a>',
      '  <a href="/prompts" onclick="_evCloseDrawer()"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>Prompts</a>',
      '  <a href="/blog" onclick="_evCloseDrawer()"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>Blog</a>',
      '  <a href="/contato" onclick="_evCloseDrawer()"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>Contato</a>',
      '  <div class="nav-drawer-sep"></div>',
      '  <a href="/cursos/academy/" onclick="_evCloseDrawer()"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>Cursos</a>',
      '  <a href="https://whatsapp.com/channel/0029VbBq7gzKmCPScpRpQc09" target="_blank" rel="noopener" onclick="_evCloseDrawer()" style="color:rgba(37,211,102,0.8);"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style="color:rgba(37,211,102,0.8);"><path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375A9.869 9.869 0 012.1 11.893C2.1 6.448 6.555 2.008 12.042 2.008a9.865 9.865 0 016.921 2.85 9.788 9.788 0 012.894 6.964c-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a12.062 12.062 0 005.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411"/></svg>WhatsApp Suporte</a>',
      '  <div class="nav-drawer-sep"></div>',
      '  <a href="#cta" onclick="_evCloseDrawer()" class="nav-drawer-cta"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>Garantir Acesso</a>',
      '</div>'
    ].join('\n'),
    'footer.html': [
      '<style>',
      'footer { background:var(--dark2); border-top:1px solid rgba(255,90,0,0.08); padding:0; }',
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
      '<img src="/assets/logo/logo_1_teste.webp" alt="Esqueleto Viral" style="width:26px;height:26px;object-fit:contain;display:block;">' +
      '</div>' +
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

    fetch(BASE + file + '?v=20260525e')
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

// ── Hamburger drawer (global — onclick in injected HTML can't run its own <script>) ──
window._evToggleDrawer = function() {
  var h = document.getElementById('nav-hamburger');
  var d = document.getElementById('nav-drawer');
  var o = document.getElementById('nav-overlay');
  if (!d) return;
  var open = d.classList.toggle('open');
  if (h) { h.classList.toggle('open'); h.setAttribute('aria-expanded', open ? 'true' : 'false'); }
  if (o) o.classList.toggle('open');
};
window._evCloseDrawer = function() {
  var h = document.getElementById('nav-hamburger');
  var d = document.getElementById('nav-drawer');
  var o = document.getElementById('nav-overlay');
  if (h) { h.classList.remove('open'); h.setAttribute('aria-expanded', 'false'); }
  if (d) d.classList.remove('open');
  if (o) o.classList.remove('open');
};
document.addEventListener('keydown', function(e) { if (e.key === 'Escape') window._evCloseDrawer(); });



