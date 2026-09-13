(() => {
  'use strict';
  if (window.__SNG_ACCESSIBILITY_LOADED__) return;
  window.__SNG_ACCESSIBILITY_LOADED__ = true;

  const STORAGE_KEY = 'sng:accessibility:v1';
  const root = document.documentElement;
  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
  const defaults = { textScale: 1, contrast: false, links: false, motion: false };
  let state = {...defaults};

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (saved && typeof saved === 'object') state = {...state, ...saved};
  } catch {}

  state.textScale = clamp(Number(state.textScale) || 1, 1, 2);
  state.contrast = !!state.contrast;
  state.links = !!state.links;
  state.motion = !!state.motion;

  const style = document.createElement('style');
  style.id = 'sng-accessibility-styles';
  style.textContent = `
    :where(a,button,input,select,summary,[role="button"],[tabindex]:not([tabindex="-1"])):focus-visible{
      outline:3px solid #ffd166 !important;
      outline-offset:3px !important;
      box-shadow:0 0 0 2px #17324a !important;
    }
    .search-control:focus-within{
      outline:3px solid #ffd166 !important;
      outline-offset:3px !important;
    }
    #sng-a11y-toggle{
      position:fixed;left:16px;bottom:16px;z-index:12000;
      min-width:48px;min-height:48px;padding:8px 12px;border:2px solid #fff;border-radius:999px;
      background:#153b61;color:#fff;font:700 1rem/1.2 "Assistant",Arial,sans-serif;
      display:inline-flex;align-items:center;justify-content:center;gap:7px;cursor:pointer;
      box-shadow:0 5px 20px rgba(0,0,0,.28)
    }
    #sng-a11y-toggle .sng-a11y-icon{font-size:1.25em;line-height:1}
    #sng-a11y-panel{
      position:fixed;left:16px;bottom:76px;z-index:12000;width:min(340px,calc(100vw - 32px));
      padding:16px;border:2px solid #d8e8f4;border-radius:16px;background:#fff;color:#132d49;
      box-shadow:0 15px 45px rgba(0,0,0,.3);font-family:"Assistant",Arial,sans-serif;text-align:right
    }
    #sng-a11y-panel[hidden]{display:none !important}
    .sng-a11y-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px}
    .sng-a11y-head h2{margin:0;font:700 1.22rem/1.25 "Assistant",Arial,sans-serif;color:#132d49}
    .sng-a11y-close{width:44px;height:44px;border:1px solid #8aa1b4;border-radius:50%;background:#fff;color:#132d49;cursor:pointer;font-size:1.5rem}
    .sng-a11y-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
    .sng-a11y-control{min-height:46px;padding:8px 10px;border:1px solid #58758d;border-radius:10px;background:#f7fafc;color:#132d49;cursor:pointer;font-weight:700;line-height:1.25}
    .sng-a11y-control[aria-pressed="true"]{background:#153b61;color:#fff;border-color:#153b61}
    .sng-a11y-wide{grid-column:1/-1}
    .sng-a11y-status{margin:10px 0 0;min-height:1.4em;font-size:.9rem;color:#385268}
    html.a11y-highlight-links a:not(#sng-a11y-toggle){text-decoration:underline !important;text-decoration-thickness:2px !important;text-underline-offset:3px !important}
    html.a11y-reduce-motion,html.a11y-reduce-motion *{scroll-behavior:auto !important}
    html.a11y-reduce-motion *,html.a11y-reduce-motion *::before,html.a11y-reduce-motion *::after{animation:none !important;transition:none !important}
    html.a11y-high-contrast body{background:#000 !important;color:#fff !important}
    html.a11y-high-contrast :is(.hero,.index-section,.toolbar,.person-topbar,.person-intro,.media-section,.story-section,.links-section,.family-contact,.lightbox-card,.place-filter-panel,.mobile-site-menu nav){background:#000 !important;background-image:none !important;color:#fff !important;border-color:#fff !important}
    html.a11y-high-contrast :is(h1,h2,h3,p,span,li,.card-name,.card-place,.place,.role,.fact,.story-text p,.page-footer,.dedication,.poem,.result-count){color:#fff !important}
    html.a11y-high-contrast :is(a,button,input,select){color:#fff !important;border-color:#fff !important}
    html.a11y-high-contrast input::placeholder{color:#fff !important;opacity:1}
    html.a11y-high-contrast :is(.search-control,.place-filter-trigger,.filter-chip,.hero-links a,.primary-button,.secondary-button,.family-contact-btn){background:#000 !important;color:#fff !important;border:2px solid #fff !important}
    html.a11y-high-contrast :is(.lightbox-card,.lightbox-card h2,.lightbox-card p,.lightbox-card li){color:#000 !important;background:#fff !important}
    html.a11y-high-contrast .lightbox-card :is(a,button){color:#000 !important;border-color:#000 !important}

    /* Text enlargement safeguards: text containers expand instead of clipping. */
    html.a11y-text-scaled .home-page .hero,
    html.a11y-text-scaled .home-page .hero-inner,
    html.a11y-text-scaled .home-page .main-layout,
    html.a11y-text-scaled .home-page .home-shell{
      height:auto !important;max-height:none !important;overflow:visible !important;
    }
    html.a11y-text-scaled .home-page .hero{min-height:100vh !important}
    html.a11y-text-scaled .memory-card{
      grid-template-rows:var(--portrait-size) auto auto !important;height:auto !important;max-height:none !important;min-height:0 !important;
    }
    html.a11y-text-scaled :is(.card-name,.card-place,.dedication,.poem,.fact,.role,.family-contact-text,.story-text,.story-text p,.media-related-title,.media-v2-image-label){height:auto !important;max-height:none !important;overflow:visible !important}
    html.a11y-text-scaled .story-section.story-mobile-condensed:not(.is-expanded) .story-copy{
      max-height:none !important;overflow:visible !important;-webkit-mask-image:none !important;mask-image:none !important;
    }
    html.a11y-text-scaled .story-mobile-toggle{display:none !important}
    html.a11y-text-scaled .person-intro{grid-template-columns:minmax(150px,190px) minmax(0,1fr) !important}
    @media(max-width:820px){
      html.a11y-text-scaled .person-intro{grid-template-columns:1fr !important}
      #sng-a11y-toggle{left:10px;bottom:10px}
      #sng-a11y-panel{left:10px;bottom:68px;width:min(350px,calc(100vw - 20px));max-height:calc(100vh - 90px);overflow:auto}
    }
    @media(max-width:420px){.sng-a11y-grid{grid-template-columns:1fr}.sng-a11y-wide{grid-column:auto}}
  `;
  document.head.appendChild(style);

  const wrap = document.createElement('div');
  wrap.id = 'sng-a11y-root';
  wrap.dir = 'rtl';
  wrap.innerHTML = `
    <button id="sng-a11y-toggle" type="button" aria-expanded="false" aria-controls="sng-a11y-panel" aria-label="פתיחת אפשרויות נגישות"><span class="sng-a11y-icon" aria-hidden="true">♿</span><span>נגישות</span></button>
    <aside id="sng-a11y-panel" aria-label="אפשרויות נגישות" hidden>
      <div class="sng-a11y-head"><h2>אפשרויות נגישות</h2><button class="sng-a11y-close" type="button" aria-label="סגירת אפשרויות נגישות">×</button></div>
      <div class="sng-a11y-grid">
        <button class="sng-a11y-control" type="button" data-a11y="smaller" aria-label="הקטנת טקסט">א−</button>
        <button class="sng-a11y-control" type="button" data-a11y="larger" aria-label="הגדלת טקסט">א+</button>
        <button class="sng-a11y-control" type="button" data-a11y="contrast" aria-pressed="false">ניגודיות גבוהה</button>
        <button class="sng-a11y-control" type="button" data-a11y="links" aria-pressed="false">הדגשת קישורים</button>
        <button class="sng-a11y-control sng-a11y-wide" type="button" data-a11y="motion" aria-pressed="false">עצירת אנימציות</button>
        <button class="sng-a11y-control sng-a11y-wide" type="button" data-a11y="reset">איפוס הגדרות נגישות</button>
      </div>
      <p class="sng-a11y-status" role="status" aria-live="polite"></p>
    </aside>`;
  document.body.appendChild(wrap);

  const toggle = wrap.querySelector('#sng-a11y-toggle');
  const panel = wrap.querySelector('#sng-a11y-panel');
  const close = wrap.querySelector('.sng-a11y-close');
  const status = wrap.querySelector('.sng-a11y-status');
  const controls = [...wrap.querySelectorAll('[data-a11y]')];

  const save = () => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {} };
  const announce = (message) => { status.textContent = ''; requestAnimationFrame(() => { status.textContent = message; }); };
  const pressed = (action, value) => wrap.querySelector(`[data-a11y="${action}"]`)?.setAttribute('aria-pressed', String(value));

  const apply = ({announceText = false} = {}) => {
    root.style.fontSize = `${Math.round(state.textScale * 100)}%`;
    root.classList.toggle('a11y-text-scaled', state.textScale > 1.001);
    root.classList.toggle('a11y-high-contrast', state.contrast);
    root.classList.toggle('a11y-highlight-links', state.links);
    root.classList.toggle('a11y-reduce-motion', state.motion);
    pressed('contrast', state.contrast);
    pressed('links', state.links);
    pressed('motion', state.motion);
    if (announceText) announce(`גודל הטקסט ${Math.round(state.textScale * 100)} אחוז`);
    save();
  };

  const openPanel = () => {
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => panel.querySelector('button')?.focus({preventScroll:true}));
  };
  const closePanel = ({restoreFocus = true} = {}) => {
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    if (restoreFocus) toggle.focus({preventScroll:true});
  };

  toggle.addEventListener('click', () => panel.hidden ? openPanel() : closePanel());
  close.addEventListener('click', () => closePanel());

  wrap.addEventListener('click', (event) => {
    const button = event.target.closest('[data-a11y]');
    if (!button) return;
    const action = button.dataset.a11y;
    if (action === 'larger') {
      state.textScale = clamp(Math.round((state.textScale + .125) * 1000) / 1000, 1, 2);
      apply({announceText:true});
    } else if (action === 'smaller') {
      state.textScale = clamp(Math.round((state.textScale - .125) * 1000) / 1000, 1, 2);
      apply({announceText:true});
    } else if (action === 'contrast') {
      state.contrast = !state.contrast; apply(); announce(state.contrast ? 'ניגודיות גבוהה הופעלה' : 'ניגודיות גבוהה כובתה');
    } else if (action === 'links') {
      state.links = !state.links; apply(); announce(state.links ? 'הדגשת קישורים הופעלה' : 'הדגשת קישורים כובתה');
    } else if (action === 'motion') {
      state.motion = !state.motion; apply(); announce(state.motion ? 'אנימציות נעצרו' : 'אנימציות הופעלו');
    } else if (action === 'reset') {
      state = {...defaults}; apply(); announce('הגדרות הנגישות אופסו');
    }
  });

  document.addEventListener('pointerdown', (event) => {
    if (!panel.hidden && !wrap.contains(event.target)) closePanel({restoreFocus:false});
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !panel.hidden) closePanel();
  });

  apply();
})();
