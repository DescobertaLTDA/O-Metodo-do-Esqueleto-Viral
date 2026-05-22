/**
 * Esqueleto Viral - Shared social proof popup
 */

(function () {
  function initSocialProof() {
    if (document.getElementById('ev-social-proof-style') || document.getElementById('spPopup')) return;
    if (!document.body) return;

    var path = (window.location.pathname || '').toLowerCase();
    var actionHtml = 'acabou de garantir o curso!';

    if (path.indexOf('/prompts') !== -1) {
      actionHtml = 'acabou de comprar o prompt!';
    }

    var style = document.createElement('style');
    style.id = 'ev-social-proof-style';
    style.textContent = [
      '.sp-popup{position:fixed;bottom:24px;left:20px;z-index:600;display:flex;align-items:center;gap:12px;background:linear-gradient(135deg,#1a8a3a 0%,#22a84a 100%);border:none;border-radius:10px;padding:12px 20px 12px 14px;max-width:280px;box-shadow:0 8px 32px rgba(34,168,74,0.45),0 2px 8px rgba(0,0,0,0.3);opacity:0;transform:translateY(20px) scale(0.95);transition:opacity .4s cubic-bezier(.16,1,.3,1),transform .4s cubic-bezier(.16,1,.3,1);pointer-events:none;}',
      '.sp-popup.sp-show{opacity:1;transform:translateY(0) scale(1);}',
      '.sp-popup.sp-hide{opacity:0;transform:translateY(20px) scale(0.95);}',
      '.sp-avatar{width:30px;height:30px;border-radius:50%;border:2px solid rgba(255,255,255,0.6);background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;}',
      '.sp-avatar svg{width:16px;height:16px;}',
      '.sp-body{display:flex;flex-direction:column;gap:0;min-width:0;}',
      '.sp-name{font-size:13px;font-weight:900;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.4;letter-spacing:.1px;}',
      '.sp-name .sp-firstname{font-weight:900;}',
      '.sp-action{font-size:13px;color:rgba(255,255,255,0.92);line-height:1.4;font-weight:500;}',
      '.sp-footer,.sp-dot,.sp-time{display:none;}',
      '@media(max-width:768px){.sp-popup{bottom:20px;left:12px;max-width:calc(100vw - 24px);}}'
    ].join('');
    document.head.appendChild(style);

    var popup = document.createElement('div');
    popup.className = 'sp-popup';
    popup.id = 'spPopup';
    popup.innerHTML = [
      '<div class="sp-avatar">',
      '  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">',
      '    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.7)" stroke-width="1.5"/>',
      '    <path d="M7 12.5l3.5 3.5 6.5-7" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
      '  </svg>',
      '</div>',
      '<div class="sp-body">',
      '  <div class="sp-name" id="spName"></div>',
      '  <div class="sp-action">' + actionHtml + '</div>',
      '</div>'
    ].join('');
    document.body.appendChild(popup);

    var people = [
      { name: 'Gabriel S.', city: 'Sao Paulo, SP' },
      { name: 'Larissa M.', city: 'Belo Horizonte, MG' },
      { name: 'Felipe R.', city: 'Curitiba, PR' },
      { name: 'Camila O.', city: 'Fortaleza, CE' },
      { name: 'Diego N.', city: 'Rio de Janeiro, RJ' },
      { name: 'Isabela T.', city: 'Recife, PE' },
      { name: 'Lucas A.', city: 'Goiania, GO' },
      { name: 'Mariana C.', city: 'Porto Alegre, RS' },
      { name: 'Thiago B.', city: 'Manaus, AM' },
      { name: 'Juliana F.', city: 'Salvador, BA' },
      { name: 'Rafael P.', city: 'Campinas, SP' },
      { name: 'Amanda L.', city: 'Natal, RN' }
    ];

    var nameEl = document.getElementById('spName');
    var lastIdx = -1;

    function showNext() {
      var idx;
      do {
        idx = Math.floor(Math.random() * people.length);
      } while (idx === lastIdx && people.length > 1);

      lastIdx = idx;
      var person = people[idx];
      var firstName = person.name.split(' ')[0];
      nameEl.innerHTML = '<span class="sp-firstname">' + firstName + '</span>';
      popup.classList.remove('sp-hide');
      popup.classList.add('sp-show');

      setTimeout(function () {
        popup.classList.remove('sp-show');
        popup.classList.add('sp-hide');
      }, 4500);

      setTimeout(showNext, 20000 + Math.random() * 15000);
    }

    setTimeout(showNext, 6000 + Math.random() * 6000);
  }

  window.EVSocialProofInit = initSocialProof;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSocialProof, { once: true });
  } else {
    initSocialProof();
  }
})();
