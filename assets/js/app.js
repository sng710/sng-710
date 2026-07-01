const ROTATION_INTERVAL_MS = 9000;
const POPUP_CLOSE_GUARD_MS = 650;
const GALLERY_SLIDE_MS = 3600;
const CARD_FADE_MS = 520;

let people = [];

async function loadPeopleData() {
  const response = await fetch('assets/data/people.json?v=56', { cache: 'no-cache' });
  if (!response.ok) throw new Error('people.json failed to load');
  return await response.json();
}

const searchInput = document.getElementById('searchInput');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxPlace = document.getElementById('lightboxPlace');
const lightboxText = document.getElementById('lightboxText');
const lightboxGallery = document.getElementById('lightboxGallery');
const lightboxClose = document.getElementById('lightboxClose');
const copyPersonLink = document.getElementById('copyPersonLink');

function esc(s) { return String(s || '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }
function imgMarkup(person) {
  const src = person.image || (person.photos && person.photos[0]) || '';
  return src ? `<img src="${esc(src)}" alt="${esc(person.name)}" loading="lazy">` : '';
}
function normalizeHebText(s) {
  return String(s || '')
    .replace(/[״“”]/g, '"')
    .replace(/[׳‘’]/g, "'")
    .replace(/ז\s*["'׳״]{0,2}\s*ל/g, '')
    .replace(/[^\u0590-\u05FFa-zA-Z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
function nameTokens(person) {
  return normalizeHebText(person.name).split(' ').filter(w => w && w.length > 1);
}
function lineLooksLikeName(line, person) {
  const nline = normalizeHebText(line);
  const toks = nameTokens(person);
  if (!nline || !toks.length) return false;
  const found = toks.filter(t => nline.includes(t)).length;
  return found >= Math.min(2, toks.length) && nline.split(' ').length <= toks.length + 4;
}
function stripLeadingName(text, person) {
  let t = String(text || '').replace(/\r/g, '').trim();
  if (!t) return '';
  let lines = t.split('\n').map(l => l.trim()).filter(Boolean);
  while (lines.length && lineLooksLikeName(lines[0], person)) lines.shift();
  t = lines.join('\n').trim();
  if (!t) return '';
  const firstBreak = t.search(/[\n.]/);
  const firstPart = firstBreak >= 0 ? t.slice(0, firstBreak + 1) : t;
  const comma = firstPart.indexOf(',');
  if (comma > 0 && comma < 55 && lineLooksLikeName(firstPart.slice(0, comma), person)) {
    t = t.slice(comma + 1).trim();
    t = t.charAt(0).toUpperCase ? t : t;
  }
  return t;
}
function matches(person, q) {
  const needle = normalizeHebText(q);
  if (!needle) return true;
  const haystack = normalizeHebText(`${person.name || ''} ${person.place || ''} ${person.role || ''} ${person.summary || ''}`);
  return haystack.includes(needle);
}
function filteredPeople() {
  const q = searchInput ? searchInput.value.trim() : '';
  const seen = new Set();
  return people.filter(person => {
    if (!matches(person, q)) return false;
    const key = person.id || person.name;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
function cleanFactLine(line) {
  let clean = String(line || '')
    .replace(/^קורות חיים(?:\s+ונפילה)?\s*$/,'')
    .replace(/^סיפור חיים\s*$/,'')
    .replace(/^על אודות האתר\s*$/,'')
    .replace(/^פרטים אישיים והנצחה\s*$/,'פרטים אישיים')
    .replace(/^מקום קבורה\s*[:：]/,'מקום מנוחה:')
    .replace(/^הובא למנוחת עולמים\s+/,'מקום מנוחה: ')
    .replace(/^הובאה למנוחת עולמים\s+/,'מקום מנוחה: ')
    .trim();
  return isRedundantMemorialLine(clean) ? '' : clean;
}

function isRedundantMemorialLine(line) {
  const clean = String(line || '').replace(/\s+/g, ' ').trim();
  if (!clean) return true;
  return /^חלל(?:ת)? פעול(?:ת|ות) איבה$/.test(clean)
    || /^מקום\s+(?:ה)?אירוע\s*[:：]/.test(clean)
    || /^ב[-\s]*0?7[\/.]10[\/.]2023$/.test(clean)
    || /^בכ?["'׳״]?ב\s+בתשרי\s+תשפ["'׳״]?ד\b.*0?7[\/.]10[\/.]2023.*$/.test(clean);
}
function cleanRedundantMemorialText(text) {
  return String(text || '')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !isRedundantMemorialLine(line))
    .join('\n')
    .trim();
}
function formatFactLine(line) {
  const clean = cleanFactLine(line);
  const idx = clean.indexOf(':');
  if (idx > 0 && idx < 32) {
    return `<li><strong>${esc(clean.slice(0, idx + 1))}</strong> ${esc(clean.slice(idx + 1).trim())}</li>`;
  }
  return `<li>${esc(clean)}</li>`;
}
function splitDescription(person) {
  const raw = cleanRedundantMemorialText(stripLeadingName(person.text || person.summary || '', person));
  if (!raw) return {facts: [], life: [], event: [], memory: []};
  const headingOnly = /^(פרטים אישיים|פרטים אישיים והנצחה|סיפור חיים|סיפור חייו|סיפור חייה|קורות חיים|קורות חיים ונפילה|דרך, עשייה ואהבות|נפילתו|נפילתה|חטיפתו ונפילתו|חטיפתה ונפילתה|שבעה באוקטובר והימים שאחריו|דמותו וזכרו|דמותה וזכרה|דמות וזיכרון|דברי זיכרון|זיכרון ומילים מהלב|על מצבתו נכתב|על מצבתה נכתב|מילים שנחקקו)$/;
  const lines = raw.split('\n').map(l => cleanFactLine(l)).filter(Boolean);
  const facts = [];
  const body = [];
  let inBody = false;
  for (const line of lines) {
    if (headingOnly.test(line)) { inBody = true; continue; }
    const isFact = /^(בן|בת)\s+\d|^בן\s+|^בת\s+|^נולד|^נולדה|^תאריך|^התגורר|^התגוררה|^מקום מנוחה|^מקום קבורה|^משפחה:|^קרבה משפחתית:|^שאירים|^הובא|^הובאה|^גוש|^אזור|^הותיר|^הותירה|^.+מונצח|^.+מונצחת/.test(line);
    if (!inBody && isFact) facts.push(line);
    else { inBody = true; body.push(line); }
  }
  const paragraphs = body.join('\n').split(/\n{2,}|(?<=\.)\s*(?=[א-ת])/).map(p => p.trim()).filter(Boolean);
  const memory = [];
  const event = [];
  const life = [];
  for (const p of paragraphs) {
    if (/כתבו|ספדו|נזכור|יזכרו|חבריו|חברותיה|משפחת|אשתו|אמו|אביו|אחיו|אחותו|בתו|בנו|כתב:|כתבה:|אמר|סיפר|סיפרה|על מצבת/.test(p)) memory.push(p);
    else if (/7\s*באוקטובר|שבעה באוקטובר|שמחת תורה|כ״ב בתשרי|כ"ב בתשרי|נרצח|נרצחה|נפל|נפלה|נהרג|נהרגה|נחטף|נחטפה|שבי|ממ״ד|ממ"ד|מחבלים|כיתת הכוננות|קרב|הגן|הגנה|פונה|הובא למנוחות|הובאה למנוחות/.test(p)) event.push(p);
    else life.push(p);
  }
  return {facts, life: life.length ? life : paragraphs.filter(p => !memory.includes(p) && !event.includes(p)), event, memory};
}
function renderDescription(person) {
  const parts = splitDescription(person);
  const blocks = [];
  if (parts.facts.length) {
    blocks.push(`<section class="lightbox-section"><h3 class="lightbox-section-title">פרטים אישיים</h3><ul class="lightbox-facts">${parts.facts.map(formatFactLine).join('')}</ul></section>`);
  }
  const lifeParas = parts.life.filter(p => !parts.memory.includes(p) && !parts.event.includes(p));
  if (lifeParas.length) {
    blocks.push(`<section class="lightbox-section"><h3 class="lightbox-section-title">סיפור חיים</h3>${lifeParas.map(p => `<p class="lightbox-paragraph">${esc(p)}</p>`).join('')}</section>`);
  }
  if (parts.event.length) {
    blocks.push(`<section class="lightbox-section"><h3 class="lightbox-section-title">שבעה באוקטובר והימים שאחריו</h3>${parts.event.map(p => `<p class="lightbox-paragraph">${esc(p)}</p>`).join('')}</section>`);
  }
  if (parts.memory.length) {
    blocks.push(`<section class="lightbox-section"><h3 class="lightbox-section-title">זיכרון ומילים מהלב</h3>${parts.memory.map(p => `<p class="lightbox-paragraph">${esc(p)}</p>`).join('')}</section>`);
  }
  if (!blocks.length) return '<div class="no-text-note">טרם נוסף טקסט לתצוגה עבור אדם זה.</div>';
  return blocks.join('');
}

function buildStructuredText(person, rawText) {
  // Compatibility wrapper: older popup code expects this name.
  // Keep the structured section rendering in one place so popups never fail open.
  const clone = Object.assign({}, person || {});
  if (typeof rawText === 'string') clone.text = rawText;
  return renderDescription(clone);
}

function isSafeHttpUrl(url) {
  try {
    const parsed = new URL(String(url || '').trim(), window.location.href);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch (err) {
    return false;
  }
}

function isBlockedLink(url) {
  const value = String(url || '').trim();
  if (!value) return true;
  try {
    const host = new URL(value, window.location.href).hostname.toLowerCase();
    return host === 'google.com' || host.endsWith('.google.com') || host === 'google.co.il' || host.endsWith('.google.co.il') || host === 'maps.google.com' || host === 'accounts.google.com' || host === 'policies.google.com' || host === 'support.google.com';
  } catch (err) {
    return true;
  }
}

function linkSourceName(url) {
  try {
    const host = new URL(url, window.location.href).hostname.toLowerCase().replace(/^www\./, '');
    if (host.includes('facebook.com')) return 'Facebook';
    if (host.includes('instagram.com')) return 'Instagram';
    if (host.includes('youtube.com') || host.includes('youtu.be')) return 'YouTube';
    if (host.includes('tiktok.com')) return 'TikTok';
    if (host.includes('ynet.co.il')) return 'Ynet';
    if (host.includes('mako.co.il')) return 'Mako';
    if (host.includes('kan.org.il') || host.includes('710360.kan.org.il')) return 'כאן 11';
    if (host.includes('izkor.gov.il')) return 'יזכור';
    if (host.includes('laad.btl.gov.il')) return 'לאד';
    if (host.includes('president.gov.il')) return 'בית הנשיא';
    if (host.includes('kibbutz.org.il')) return 'התנועה הקיבוצית';
    if (host.includes('davar1.co.il')) return 'דבר';
    if (host.includes('globes.co.il')) return 'גלובס';
    if (host.includes('israelhayom.co.il')) return 'ישראל היום';
    if (host.includes('maariv.co.il')) return 'מעריב';
    if (host.includes('haaretz.co.il')) return 'הארץ';
    if (host.includes('remember.bio')) return 'Remember.bio';
    if (host.includes('memoriz.plus')) return 'Memoriz';
    if (host.includes('noflim.org.il') || host.includes('noflim.davar1.co.il')) return 'נופלים';
    return host;
  } catch (err) {
    return 'קישור';
  }
}
function linkSourceHost(url) {
  try { return new URL(url, window.location.href).hostname.toLowerCase().replace(/^www\./, ''); }
  catch (err) { return ''; }
}
function decodeLinkText(value) {
  try { value = decodeURIComponent(String(value || '').replace(/\+/g, ' ')); } catch (err) { value = String(value || ''); }
  return value
    .replace(/[\-_]+/g, ' ')
    .replace(/\.(html?|aspx|php)$/i, '')
    .replace(/posts|videos|photos|photo|reel/g, ' ')
    .replace(/זל/g, 'ז״ל')
    .replace(/היד/g, 'הי״ד')
    .replace(/\s+/g, ' ')
    .trim();
}
function inferLinkTitleFromUrl(url) {
  try {
    const parsed = new URL(url, window.location.href);
    const blocked = new Set(['posts','videos','photos','photo','reel','p','watch','status','article','item','news','memory','memorial','fallen','fallen-information','names','victims','site','he','en','page','web','mobile','local_news','featured','activism','judaism','magazine','content','newstv','programs','media.aspx']);
    const parts = parsed.pathname.split('/').filter(Boolean);
    const candidates = parts.map(decodeLinkText).filter(part => {
      if (!part || part.length < 5) return false;
      if (blocked.has(part.toLowerCase())) return false;
      if (/^\d+$/.test(part)) return false;
      if (!/[א-ת]/.test(part) && part.length < 24) return false;
      if (/^[a-z0-9]{8,}$/i.test(part)) return false;
      return true;
    });
    candidates.sort((a,b) => ((b.split(' ').length >= 3) - (a.split(' ').length >= 3)) || b.length - a.length);
    const best = candidates[0] || '';
    return best.length > 118 ? best.slice(0,118) + '…' : best;
  } catch (err) {
    return '';
  }
}
function isGenericLinkTitle(title) {
  const value = String(title || '').trim();
  if (!value) return true;
  if (/^(Facebook|Instagram|YouTube|TikTok|Ynet|Mako|Remember\.bio|Memoriz|CBS News|gov\.il|[^\s]+\.[^\s]+)\s*[–-]/i.test(value)) return true;
  if (/^(כאן 11|יזכור|לאד|בית הנשיא|התנועה הקיבוצית|דבר|גלובס|ישראל היום|מעריב|הארץ|נופלים|צה״ל|יזכור חרבות ברזל)\s*[–-]/.test(value)) return true;
  return ['כתבה','סרטון','עמוד הנצחה','קישור'].includes(value);
}
function bestLinkTitle(link, cleanUrl, source) {
  const explicit = String((link && (link.title || link.label || link.name)) || '').trim();
  const inferred = inferLinkTitleFromUrl(cleanUrl);
  if (inferred && (isGenericLinkTitle(explicit) || inferred.length > explicit.length)) return inferred;
  if (explicit) return explicit;
  return source || 'קישור';
}
function renderPersonLinks(links) {
  if (!Array.isArray(links) || !links.length) return '';
  const seen = new Set();
  const prepared = [];
  for (const link of links) {
    const rawUrl = String((link && link.url) || '').trim();
    if (!rawUrl || !isSafeHttpUrl(rawUrl) || isBlockedLink(rawUrl)) continue;
    const cleanUrl = rawUrl.split('#:~:text=')[0];
    const key = cleanUrl.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    const source = link.source || linkSourceName(cleanUrl);
    prepared.push({ url: cleanUrl, source, title: bestLinkTitle(link, cleanUrl, source) });
  }
  if (!prepared.length) return '';
  const items = prepared.map(item => {
    return `<li class="lightbox-link-item"><a href="${esc(item.url)}" target="_blank" rel="noopener noreferrer"><span><span class="lightbox-link-title">${esc(item.title)}</span><span class="lightbox-link-source">${esc(item.source)}</span></span><span class="lightbox-link-arrow" aria-hidden="true">↗</span></a></li>`;
  }).join('');
  return `<section class="lightbox-section lightbox-links"><h3 class="lightbox-section-title">קישורים וכתבות <span style="font-weight:400;color:rgba(255,255,255,.68);font-size:.82em;">(${prepared.length})</span></h3><ul class="lightbox-links-list">${items}</ul></section>`;
}
const personLinksCache = new Map();
async function loadPersonLinks(person) {
  const inlineLinks = Array.isArray(person.links) ? person.links : [];
  const file = person.linksFile || person.linksPath || (person.id ? `assets/people/${person.id}/links.json` : '');
  if (!file) return inlineLinks;
  if (personLinksCache.has(file)) return inlineLinks.concat(personLinksCache.get(file));
  try {
    const response = await fetch(file, { cache: 'no-cache' });
    if (!response.ok) throw new Error('links file not found');
    const data = await response.json();
    const fileLinks = Array.isArray(data) ? data : (Array.isArray(data.links) ? data.links : []);
    personLinksCache.set(file, fileLinks);
    return inlineLinks.concat(fileLinks);
  } catch (err) {
    personLinksCache.set(file, []);
    return inlineLinks;
  }
}

const personTextCache = new Map();
async function loadPersonText(person) {
  const inlineText = person && typeof person.text === 'string' ? person.text : '';
  const fallback = inlineText || (person && person.summary ? person.summary : '');
  const file = person && (person.textFile || person.textPath) ? (person.textFile || person.textPath) : '';
  if (!file) return fallback;
  if (personTextCache.has(file)) return personTextCache.get(file) || fallback;
  try {
    const response = await fetch(file, { cache: 'no-cache' });
    if (!response.ok) throw new Error('text file not found');
    const txt = await response.text();
    const cleanTxt = String(txt || '').trim();
    personTextCache.set(file, cleanTxt);
    return cleanTxt || fallback;
  } catch (err) {
    personTextCache.set(file, '');
    return fallback;
  }
}

function uniqueList(items) {
  const seen = new Set();
  return (Array.isArray(items) ? items : []).filter(Boolean).filter(item => {
    const key = String(item).trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
function explicitPersonPhotos(person) {
  return uniqueList(Array.isArray(person && person.photos) ? person.photos : []);
}
const personPhotosCache = new Map();
function personPhotosManifestPath(person) {
  if (!person || !person.id) return '';
  return `assets/people/${person.id}/photos/photos.json`;
}
function normalizePhotoPath(item, base) {
  if (!item) return '';
  const value = typeof item === 'string' ? item : (item.src || item.url || item.file || item.path || '');
  const clean = String(value || '').trim();
  if (!clean) return '';
  if (/^(https?:)?\/\//i.test(clean) || clean.startsWith('data:') || clean.startsWith('assets/')) return clean;
  return `${base}/${clean.replace(/^\.\//, '').replace(/^\//, '')}`;
}
async function loadPersonPhotos(person) {
  const explicit = explicitPersonPhotos(person);
  if (!person || !person.id) return explicit;
  if (personPhotosCache.has(person.id)) return uniqueList(explicit.concat(personPhotosCache.get(person.id)));
  const base = `assets/people/${person.id}/photos`;
  const manifest = personPhotosManifestPath(person);
  try {
    const response = await fetch(manifest, { cache: 'no-cache' });
    if (!response.ok) throw new Error('photos manifest not found');
    const data = await response.json();
    const raw = Array.isArray(data) ? data : (Array.isArray(data.photos) ? data.photos : []);
    const listed = uniqueList(raw.map(item => normalizePhotoPath(item, base)).filter(Boolean));
    personPhotosCache.set(person.id, listed);
    return uniqueList(explicit.concat(listed));
  } catch (err) {
    personPhotosCache.set(person.id, []);
    return explicit;
  }
}
function personPhotoImages(photos, person) {
  const list = uniqueList(photos);
  return list.map((src, i) => `<img src="${esc(src)}" alt="${esc(person.name)} — תמונה ${i+1}" loading="lazy" class="${i === 0 ? 'is-active' : ''}">`).join('');
}
function isMobileLightboxLayout() {
  return window.matchMedia && window.matchMedia('(max-width: 720px)').matches;
}
let lightboxPhotoTimer = null;
function stopLightboxPhotoRotation() {
  if (lightboxPhotoTimer) clearInterval(lightboxPhotoTimer);
  lightboxPhotoTimer = null;
}
function startLightboxPhotoRotation() {
  stopLightboxPhotoRotation();
  const galleries = Array.from(lightbox.querySelectorAll('.lightbox-gallery.is-slideshow'));
  if (!galleries.length || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  galleries.forEach(gallery => {
    const imgs = Array.from(gallery.querySelectorAll('img'));
    imgs.forEach((img, i) => img.classList.toggle('is-active', i === 0));
  });
  lightboxPhotoTimer = setInterval(() => {
    if (!lightbox.classList.contains('is-open')) return stopLightboxPhotoRotation();
    galleries.forEach(gallery => {
      const imgs = Array.from(gallery.querySelectorAll('img'));
      if (imgs.length < 2) return;
      let activeIndex = imgs.findIndex(img => img.classList.contains('is-active'));
      if (activeIndex < 0) activeIndex = 0;
      imgs[activeIndex].classList.remove('is-active');
      imgs[(activeIndex + 1) % imgs.length].classList.add('is-active');
    });
  }, GALLERY_SLIDE_MS);
}
function renderPersonPhotos(photos, person) {
  const list = uniqueList(photos);
  const imgs = personPhotoImages(list, person);
  if (!imgs) return '';
  const slideshowClass = list.length > 1 ? ' is-slideshow' : '';
  return `<section class="lightbox-section lightbox-photo-section"><h3 class="lightbox-section-title">גלריית תמונות</h3><div class="lightbox-gallery lightbox-inline-gallery${slideshowClass}">${imgs}</div></section>`;
}
function placeLightboxPhotos(person, photos) {
  const list = uniqueList(photos);
  const mobile = isMobileLightboxLayout();
  const imgs = personPhotoImages(list, person);
  if (lightboxGallery) {
    lightboxGallery.classList.toggle('is-slideshow', !!imgs && !mobile && list.length > 1);
    if (imgs && !mobile) {
      // Desktop/tablet: original placement under the main portrait, in the left column.
      lightboxGallery.innerHTML = imgs;
      lightboxGallery.hidden = false;
    } else {
      lightboxGallery.innerHTML = '';
      lightboxGallery.hidden = true;
      lightboxGallery.classList.remove('is-slideshow');
    }
  }
  // Mobile: gallery appears after the summary and before the links.
  return mobile ? renderPersonPhotos(list, person) : '';
}

function personDirectKey(person) {
  return (person && person.id) ? String(person.id) : '';
}
function personDirectUrl(person) {
  const key = personDirectKey(person);
  return key ? `${window.location.origin}${window.location.pathname}${window.location.search}#${encodeURIComponent(key)}` : window.location.href;
}
function currentPersonHashKey() {
  const rawHash = window.location.hash ? window.location.hash.slice(1) : '';
  if (!rawHash) return '';
  let decoded = rawHash;
  try { decoded = decodeURIComponent(rawHash); } catch (err) {}
  if (decoded.startsWith('person=')) decoded = decoded.slice('person='.length);
  return decoded.trim();
}
function findPersonByDirectKey(key) {
  const cleaned = String(key || '').trim();
  if (!cleaned) return null;
  return people.find(p => p.id === cleaned) || null;
}
function personFromCurrentUrl() {
  const params = new URLSearchParams(window.location.search);
  return findPersonByDirectKey(params.get('person') || params.get('id') || currentPersonHashKey());
}
function setPersonHash(person) {
  const key = personDirectKey(person);
  if (!key) return;
  const encoded = encodeURIComponent(key);
  if (window.location.hash.slice(1) === encoded) return;
  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${encoded}`);
}
function clearPersonHash(personKey) {
  const current = currentPersonHashKey();
  if (!current || (personKey && current !== personKey)) return;
  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
}
function setupCopyPersonLink(person) {
  if (!copyPersonLink) return;
  const url = personDirectUrl(person);
  copyPersonLink.textContent = 'העתקת קישור אישי';
  copyPersonLink.onclick = async (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    try {
      await navigator.clipboard.writeText(url);
      copyPersonLink.textContent = 'הקישור הועתק';
    } catch (err) {
      window.prompt('העתיקי את הקישור הישיר:', url);
      copyPersonLink.textContent = 'קישור אישי';
    }
    window.setTimeout(() => {
      if (copyPersonLink && lightbox.classList.contains('is-open') && activeLightboxPersonKey === personDirectKey(person)) {
        copyPersonLink.textContent = 'העתקת קישור אישי';
      }
    }, 2200);
  };
}
function openPersonFromUrl() {
  const person = personFromCurrentUrl();
  if (person) {
    openLightbox(person, {updateUrl:false});
  } else if (lightbox.classList.contains('is-open')) {
    closeLightbox(null, {clearUrl:false});
  }
}

let lastFocusedBeforeLightbox = null;
let activeLightboxPersonKey = '';
let suppressLightboxOpenUntil = 0;
let lightboxOpenToken = 0;
async function openLightbox(person, options = {}) {
  if (Date.now() < suppressLightboxOpenUntil) return;
  const openToken = ++lightboxOpenToken;
  stopLightboxPhotoRotation();
  lastFocusedBeforeLightbox = document.activeElement;
  activeLightboxPersonKey = person.id || person.name || '';
  if (options.updateUrl !== false) setPersonHash(person);
  setupCopyPersonLink(person);

  // Clear the previous popup content immediately. Text/photos are loaded from external files,
  // so without this reset the old person's story can flash for a moment on slower mobile connections.
  lightbox.classList.add('is-loading');
  lightboxImg.innerHTML = '';
  lightboxTitle.textContent = person.name || '';
  lightboxPlace.textContent = person.place || '';
  lightboxText.innerHTML = '<div class="lightbox-loading" role="status" aria-live="polite">טוען את הסיפור...</div>';
  if (lightboxGallery) {
    lightboxGallery.innerHTML = '';
    lightboxGallery.hidden = true;
    lightboxGallery.classList.remove('is-slideshow');
  }

  lightboxImg.innerHTML = imgMarkup(person);
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
  setTimeout(() => lightboxClose.focus({preventScroll:true}), 0);

  const rawText = person.text || person.summary || '';
  const [fullText, photos, links] = await Promise.all([loadPersonText(person), loadPersonPhotos(person), loadPersonLinks(person)]);
  if (openToken === lightboxOpenToken && activeLightboxPersonKey === (person.id || person.name || '') && lightbox.classList.contains('is-open')) {
    const structuredText = buildStructuredText(person, fullText || rawText);
    const galleryHtml = placeLightboxPhotos(person, photos);
    lightboxText.innerHTML = structuredText + galleryHtml + renderPersonLinks(links);
    lightbox.classList.remove('is-loading');
    startLightboxPhotoRotation();
  }
}
function closeLightbox(event, options = {}) {
  // Guard against mobile click-through: after closing, ignore card taps for a short moment.
  suppressLightboxOpenUntil = Date.now() + POPUP_CLOSE_GUARD_MS;
  lightboxOpenToken++;
  if (event) {
    event.preventDefault();
    event.stopPropagation();
    if (typeof event.stopImmediatePropagation === 'function') event.stopImmediatePropagation();
  }
  if (!lightbox.classList.contains('is-open')) return;
  const closingPersonKey = activeLightboxPersonKey;
  activeLightboxPersonKey = '';
  if (options.clearUrl !== false) clearPersonHash(closingPersonKey);
  stopLightboxPhotoRotation();
  lightbox.classList.remove('is-open', 'is-loading');
  lightbox.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
  window.setTimeout(() => {
    if (!lightbox.classList.contains('is-open')) {
      lightboxText.innerHTML = '';
      lightboxImg.innerHTML = '';
      lightboxTitle.textContent = '';
      lightboxPlace.textContent = '';
      if (lightboxGallery) {
        lightboxGallery.innerHTML = '';
        lightboxGallery.hidden = true;
        lightboxGallery.classList.remove('is-slideshow');
      }
    }
  }, 180);
  if (lastFocusedBeforeLightbox && typeof lastFocusedBeforeLightbox.focus === 'function') {
    setTimeout(() => lastFocusedBeforeLightbox.focus({preventScroll:true}), 0);
  }
}
function isCloseTarget(target){
  return !!(target && target.closest && target.closest('[data-close="1"], #lightboxClose, .lightbox-close'));
}
function handleClosePointer(event){
  if (!lightbox.classList.contains('is-open')) return;
  if (isCloseTarget(event.target) || event.target === lightbox || event.target.classList?.contains('lightbox-backdrop')) {
    closeLightbox(event);
  }
}
function stopLightboxPointer(event){
  // Do not close on pointerdown. On mobile this can hide the overlay before the following click,
  // which may hit a person card underneath and open another popup. Close only on click/Escape.
  if (!lightbox.classList.contains('is-open')) return;
  event.stopPropagation();
}
lightboxClose.addEventListener('pointerdown', stopLightboxPointer, true);
lightboxClose.addEventListener('click', closeLightbox, true);
lightbox.addEventListener('pointerdown', stopLightboxPointer, true);
lightbox.addEventListener('click', handleClosePointer, true);
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('is-open')) return;
  if (e.key === 'Escape') closeLightbox(e);
  if ((e.key === 'Enter' || e.key === ' ') && document.activeElement === lightboxClose) closeLightbox(e);
});

const posterGrid = document.getElementById('posterGrid');
const statusText = document.getElementById('statusText');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const emptySearch = document.getElementById('emptySearch');
const desktopAllGrid = document.getElementById('desktopAllGrid');
const fullListPanel = document.getElementById('fullListPanel');
const fullListToggle = document.getElementById('fullListToggle');
let slotsCount = 6;
let startIndex = 0;
let active = filteredPeople();
let cards = [];
let timer = null;

function buildCards() {
  posterGrid.innerHTML = '';
  cards = [];
  for (let i=0; i<slotsCount; i++) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'memory-slot';
    btn.innerHTML = '<span class="photo-holder"></span><span class="slot-name"></span>';
    posterGrid.appendChild(btn);
    cards.push(btn);
  }
}
function setCard(card, person) {
  if (!person) {
    card.style.visibility = 'hidden';
    card.onclick = null;
    return;
  }
  card.style.visibility = '';
  // Main page and full list always show the original portrait only.
  // Inner photos rotate only inside the popup gallery.
  card.innerHTML = `<span class="photo-holder">${imgMarkup(person)}</span><span class="slot-name">${esc(person.name)}</span>`;
  card.onclick = (event) => {
    if (event && Date.now() < suppressLightboxOpenUntil) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    openLightbox(person);
  };
}
let desktopAllGridKey = '';
function renderDesktopAllPeople() {
  if (!desktopAllGrid) return;
  const key = active.map(p => p.id || p.name || '').join('|');
  if (key === desktopAllGridKey) return;
  desktopAllGridKey = key;
  desktopAllGrid.innerHTML = '';
  active.forEach(person => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'memory-slot';
    btn.innerHTML = '<span class="photo-holder"></span><span class="slot-name"></span>';
    setCard(btn, person);
    desktopAllGrid.appendChild(btn);
  });
}
function setupFullListToggle() {
  if (!fullListPanel || !fullListToggle) return;
  const update = () => {
    const collapsed = fullListPanel.classList.contains('is-collapsed');
    fullListToggle.setAttribute('aria-expanded', String(!collapsed));
    fullListToggle.textContent = collapsed ? 'הצגת הרשימה המלאה' : 'הסתרת הרשימה המלאה';
  };
  fullListToggle.addEventListener('click', () => {
    fullListPanel.classList.toggle('is-collapsed');
    update();
    startCardPhotoRotation();
  });
  update();
}

function render() {
  active = filteredPeople();
  renderDesktopAllPeople();
  emptySearch.classList.toggle('show', !active.length);
  if (!active.length) {
    cards.forEach(card => setCard(card, null));
    statusText.textContent = '0 תוצאות';
    return;
  }
  if (startIndex >= active.length) startIndex = 0;
  const visiblePeople = active.slice(startIndex, startIndex + slotsCount);
  for (let i=0; i<slotsCount; i++) setCard(cards[i], visiblePeople[i] || null);
  const end = Math.min(active.length, startIndex + visiblePeople.length);
  statusText.textContent = `${startIndex + 1}-${end} מתוך ${active.length}`;
}
function move(direction, withFade=true) {
  if (!active.length) return;
  if (withFade) cards.forEach(c => c.classList.add('is-fading'));
  setTimeout(() => {
    const lastPageStart = Math.max(0, Math.floor((active.length - 1) / slotsCount) * slotsCount);
    startIndex += direction * slotsCount;
    if (startIndex > lastPageStart) startIndex = 0;
    if (startIndex < 0) startIndex = lastPageStart;
    render();
    cards.forEach(c => c.classList.remove('is-fading'));
  }, withFade ? CARD_FADE_MS : 0);
}
function startTimer() {
  clearInterval(timer);
  if (active.length > slotsCount) timer = setInterval(() => move(1, true), ROTATION_INTERVAL_MS);
}
function refresh() { startIndex = 0; render(); startTimer(); }
async function initApp() {
  try {
    people = await loadPeopleData();
  } catch (err) {
    console.error(err);
    if (statusText) statusText.textContent = 'שגיאה בטעינת נתוני הזיכרון';
    if (emptySearch) {
      emptySearch.textContent = 'לא ניתן לטעון את נתוני הזיכרון. יש לפתוח את האתר דרך שרת / GitHub Pages ולא ישירות מקובץ מקומי.';
      emptySearch.classList.add('show');
    }
    return;
  }

  buildCards();
  setupFullListToggle();
  refresh();
  searchInput.addEventListener('input', refresh);
  prevBtn.addEventListener('click', () => { move(-1, true); startTimer(); });
  nextBtn.addEventListener('click', () => { move(1, true); startTimer(); });
  window.addEventListener('hashchange', openPersonFromUrl);
  setTimeout(openPersonFromUrl, 120);
}

initApp();
