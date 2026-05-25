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
      'nav{position:fixed;top:0;left:0;right:0;z-index:500;height:72px;display:flex;align-items:center;justify-content:space-between;padding:0 60px;background:rgba(4,0,8,0.97);border-bottom:1px solid rgba(255,255,255,0.04);box-shadow:0 1px 0 rgba(201,168,76,0.25),0 8px 32px rgba(0,0,0,0.6);}',
      "nav::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent 0%,rgba(201,168,76,0.5) 30%,rgba(240,208,80,0.9) 50%,rgba(201,168,76,0.5) 70%,transparent 100%);pointer-events:none;}",
      '.nav-logo{display:flex;align-items:center;gap:10px;text-decoration:none;}',
      '.nav-logo-icon{width:34px;height:34px;flex-shrink:0;background:linear-gradient(135deg,#1a1000,#0a0800);border:1px solid rgba(201,168,76,0.4);border-radius:9px;display:flex;align-items:center;justify-content:center;box-shadow:0 0 16px rgba(201,168,76,0.2),inset 0 1px 0 rgba(255,255,255,0.06);}',
      '.nav-logo-text{display:flex;flex-direction:column;line-height:1;}',
      ".nav-logo-main{font-size:15px;font-weight:900;letter-spacing:3px;color:#fff;text-transform:uppercase;font-family:'Montserrat',sans-serif;}",
      ".nav-btn{position:relative;overflow:hidden;display:inline-flex;align-items:center;background:linear-gradient(135deg,#C9A84C 0%,#F0D060 100%);color:#0d0800;font-family:'Montserrat',sans-serif;font-weight:800;font-size:11px;letter-spacing:2px;text-transform:uppercase;padding:11px 22px;border:none;cursor:pointer;text-decoration:none;border-radius:10px;transition:transform .2s,box-shadow .2s;box-shadow:0 4px 24px rgba(180,140,0,0.5),0 1px 0 rgba(255,255,255,0.2) inset;white-space:nowrap;}",
      ".nav-btn::before{content:'';position:absolute;top:0;left:-100%;width:55%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent);transition:left .5s ease;}",
      '.nav-btn:hover{transform:translateY(-1px);box-shadow:0 8px 32px rgba(201,168,76,0.65),0 1px 0 rgba(255,255,255,0.2) inset;}',
      '.nav-btn:hover::before{left:160%;}.nav-btn:active{transform:translateY(0);}',
      '@media(max-width:1024px){nav{padding:0 32px;}}',
      '@media(max-width:768px){nav{height:60px;padding:0 16px;}.nav-logo-main{font-size:12px;letter-spacing:2px;}.nav-logo-icon{width:28px;height:28px;border-radius:7px;}.nav-btn{font-size:9px;padding:8px 14px;letter-spacing:1px;border-radius:8px;}}',
      '</style>',
      '<nav>',
      '  <div class="nav-logo" id="nav-logo-main">',
      '    <div class="nav-logo-icon"><img src="/assets/logo/logo_1_teste.webp" alt="Academy" style="width:22px;height:22px;object-fit:contain;display:block;"></div>',
      '    <div class="nav-logo-text"><span class="nav-logo-main">ACADEMY</span></div>',
      '  </div>',
      '  <a href="https://pay.kiwify.com.br/HM1g0Nv" data-kiwify-curso data-utm-content="nav" target="_blank" rel="noopener" class="nav-btn kiwify-link">Garantir minha vaga →</a>',
      '</nav>'
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
      '      <span style="font-size:10px;color:rgba(255,255,255,0.08);letter-spacing:1px;font-family:monospace;">v1.0.0</span>',
      '    </div>',
      '  </div>',
      '</footer>'
    ].join('\n')
  };

  function injectComponent(id, html) {
    var el = document.getElementById(id);
    if (!el) return;

    el.outerHTML = html;
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

    // Always use inline for the header — avoids fetch delay and logo flicker
    if (INLINE_COMPONENTS[file]) {
      injectComponent(id, INLINE_COMPONENTS[file]);
      return;
    }

    fetch(BASE + file + '?v=20260525n')
      .then(function (res) {
        if (!res.ok) throw new Error('Falha ao carregar ' + file);
        return res.text();
      })
      .then(function (html) {
        injectComponent(id, html);
      })
      .catch(function (err) {
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



