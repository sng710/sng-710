const DATA_URL = 'assets/data/people.json?v=87';

const searchInput = document.getElementById('searchInput');
const statusText = document.getElementById('statusText');
const emptySearch = document.getElementById('emptySearch');
const desktopAllGrid = document.getElementById('desktopAllGrid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxPlace = document.getElementById('lightboxPlace');
const lightboxText = document.getElementById('lightboxText');
const lightboxGallery = document.getElementById('lightboxGallery');
const lightboxClose = document.getElementById('lightboxClose');
const copyPersonLink = document.getElementById('copyPersonLink');

let people = [];
let activeLightboxPersonKey = '';
let lastFocusedBeforeLightbox = null;

function esc(s) {
  return String(s || '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}

function normalizeHebText(value) {
  return String(value || '')
    .replace(/[״“”]/g, '"')
    .replace(/[׳‘’]/g, "'")
    .replace(/ז\s*["'׳״]{0,2}\s*ל/g, '')
    .replace(/[()\[\]{}.,/\:;!?+\-־–—]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function makeSearchTokens(value) {
  return normalizeHebText(value).split(' ').filter(Boolean);
}

function reverseNameOrder(name) {
  const tokens = makeSearchTokens(name);
  return tokens.slice().reverse().join(' ');
}

function personKey(person) {
  return String(person && (person.id || person.name) || '');
}

function personImageMarkup(person) {
  const src = person && person.image ? person.image : '';
  return src ? `<img src="${esc(src)}" alt="${esc(person.name || '')}" loading="lazy">` : '';
}

function matches(person, query) {
  const tokens = makeSearchTokens(query);
  if (!tokens.length) return true;

  // Search only by name or community. This prevents a person's card from
  // appearing merely because another person's name is mentioned in their story.
  const nameForward = normalizeHebText(person.name);
  const nameReverse = normalizeHebText(reverseNameOrder(person.name));
  const community = normalizeHebText(person.place || person.community);

  return tokens.every(token =>
    nameForward.includes(token) ||
    nameReverse.includes(token) ||
    community.includes(token)
  );
}

function filteredPeople() {
  const q = searchInput ? searchInput.value.trim() : '';
  const seen = new Set();
  return people.filter(person => {
    const key = personKey(person);
    if (!key || seen.has(key)) return false;
    if (!matches(person, q)) return false;
    seen.add(key);
    return true;
  });
}

function formatGeneralDetail(line) {
  const clean = String(line || '').trim();
  if (!clean) return '';
  const colonIndex = clean.indexOf(':');
  if (colonIndex > 0 && colonIndex < 34) {
    return `<li><strong>${esc(clean.slice(0, colonIndex + 1))}</strong> ${esc(clean.slice(colonIndex + 1).trim())}</li>`;
  }
  return `<li>${esc(clean)}</li>`;
}

function buildFactsMarkup(person) {
  const details = Array.isArray(person.generalDetails)
    ? person.generalDetails.map(formatGeneralDetail).filter(Boolean)
    : [];

  if (!details.length) {
    return '<div class="no-text-note">טרם נוספו פרטים כלליים לתצוגה עבור אדם זה.</div>';
  }

  return `
    <section class="lightbox-section lightbox-personal-details">
      <h3 class="lightbox-section-title">פרטים אישיים</h3>
      <ul class="lightbox-facts">${details.join('')}</ul>
    </section>
  `;
}

function renderGrid() {
  if (!desktopAllGrid) return;
  const items = filteredPeople();
  desktopAllGrid.innerHTML = '';

  items.forEach(person => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'memory-slot';
    btn.innerHTML = `
      <span class="photo-holder">${personImageMarkup(person)}</span>
      <span class="slot-name">${esc(person.name || '')}</span>
    `;
    btn.addEventListener('click', () => openLightbox(person, true));
    desktopAllGrid.appendChild(btn);
  });

  if (statusText) {
    statusText.textContent = `${items.length} נופלות ונופלים`;
  }
  if (emptySearch) {
    emptySearch.classList.toggle('show', items.length === 0);
  }
}

function setPersonHash(person) {
  const key = encodeURIComponent(personKey(person));
  if (!key) return;
  const target = `${window.location.pathname}${window.location.search}#${key}`;
  window.history.replaceState(null, '', target);
}

function clearPersonHash() {
  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
}

function personFromHash() {
  const raw = window.location.hash ? window.location.hash.slice(1) : '';
  if (!raw) return null;
  let decoded = raw;
  try { decoded = decodeURIComponent(raw); } catch (err) {}
  decoded = decoded.trim();
  return people.find(person => personKey(person) === decoded) || null;
}

function openLightbox(person, updateHash = true) {
  if (!person || !lightbox) return;
  lastFocusedBeforeLightbox = document.activeElement;
  activeLightboxPersonKey = personKey(person);
  if (updateHash) setPersonHash(person);

  lightboxTitle.textContent = person.name || '';
  lightboxPlace.textContent = '';
  lightboxImg.innerHTML = personImageMarkup(person);
  lightboxText.innerHTML = buildFactsMarkup(person);
  if (lightboxGallery) {
    lightboxGallery.innerHTML = '';
    lightboxGallery.hidden = true;
  }
  if (copyPersonLink) {
    copyPersonLink.style.display = 'none';
  }

  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  window.setTimeout(() => {
    if (lightboxClose) lightboxClose.focus({preventScroll:true});
  }, 0);
}

function closeLightbox(event, clearHash = true) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  if (!lightbox || !lightbox.classList.contains('is-open')) return;
  activeLightboxPersonKey = '';
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  lightboxImg.innerHTML = '';
  lightboxText.innerHTML = '';
  lightboxTitle.textContent = '';
  lightboxPlace.textContent = '';
  if (lightboxGallery) {
    lightboxGallery.innerHTML = '';
    lightboxGallery.hidden = true;
  }
  if (clearHash) clearPersonHash();
  if (lastFocusedBeforeLightbox && typeof lastFocusedBeforeLightbox.focus === 'function') {
    window.setTimeout(() => lastFocusedBeforeLightbox.focus({preventScroll:true}), 0);
  }
}

function openPersonFromUrl() {
  const person = personFromHash();
  if (person) {
    openLightbox(person, false);
  } else if (lightbox && lightbox.classList.contains('is-open')) {
    closeLightbox(null, false);
  }
}

async function loadPeopleData() {
  const response = await fetch(DATA_URL, { cache: 'no-cache' });
  if (!response.ok) throw new Error('people.json failed to load');
  return response.json();
}

async function initApp() {
  try {
    people = await loadPeopleData();
  } catch (err) {
    console.error(err);
    if (statusText) statusText.textContent = 'שגיאה בטעינת נתוני הזיכרון';
    if (emptySearch) {
      emptySearch.textContent = 'לא ניתן לטעון את נתוני הזיכרון.';
      emptySearch.classList.add('show');
    }
    return;
  }

  renderGrid();

  if (searchInput) {
    searchInput.addEventListener('input', renderGrid);
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox, true);
  }
  if (lightbox) {
    lightbox.addEventListener('click', event => {
      const target = event.target;
      if (target === lightbox || (target && target.closest && target.closest('[data-close="1"], #lightboxClose, .lightbox-close'))) {
        closeLightbox(event);
      }
    }, true);
  }

  document.addEventListener('keydown', event => {
    if (!lightbox || !lightbox.classList.contains('is-open')) return;
    if (event.key === 'Escape') closeLightbox(event);
  });

  window.addEventListener('hashchange', openPersonFromUrl);
  window.setTimeout(openPersonFromUrl, 120);
}

initApp();
