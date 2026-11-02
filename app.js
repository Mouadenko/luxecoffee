/* ============================================================
   LUXECOFFEE — Application
   Vanilla JS · GitHub Pages ready · No build step
   ------------------------------------------------------------
   ⚙️  CONFIGURATION RAPIDE
   Remplacez uniquement WHATSAPP_NUMBER ci-dessous.
   Format international sans "+" ni espaces : 212600000000
   ============================================================ */

'use strict';

const WHATSAPP_NUMBER = '212600000000';
const WHATSAPP_DISPLAY = '+212 6 00 00 00 00';
const SHIPPING_FEE = 30;
const FREE_SHIPPING_THRESHOLD = 300;
const STORAGE_KEY = 'luxecoffee_cart_v1';
const CURRENCY = 'MAD';
const MAX_QTY = 99;

const unsplash = (id, width = 900, height = 1125) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;

const CATEGORIES = [
  { id: 'all', label: 'Tous' },
  { id: 'beans', label: 'Café en Grains' },
  { id: 'ground', label: 'Café Moulu' },
  { id: 'capsules', label: 'Capsules Compatibles Nespresso' }
];

const CATEGORY_LABELS = {
  beans: 'Café en Grains',
  ground: 'Café Moulu',
  capsules: 'Capsules Compatibles Nespresso'
};

const WEIGHT_OPTIONS = [
  { id: '250g', label: '250 g', short: '250 g' },
  { id: '500g', label: '500 g', short: '500 g' },
  { id: '1kg', label: '1 kg', short: '1 kg' }
];

const CAPSULE_OPTIONS = [
  { id: '10', label: '10 capsules', short: '10 caps.' },
  { id: '30', label: '30 capsules', short: '30 caps.' },
  { id: '50', label: '50 capsules', short: '50 caps.' }
];

const GRIND_OPTIONS = ['Expresso', 'Filtre', 'Presse Française', 'Cafetière Italienne'];

const PRODUCTS = [
  {
    id: 'yirgacheffe',
    name: 'Éthiopie Yirgacheffe',
    category: 'beans',
    origin: 'Éthiopie · Yirgacheffe',
    altitude: '1 900 – 2 200 m',
    process: 'Lavé',
    notes: ['Jasmin', 'Bergamote', 'Pêche blanche'],
    intensity: 7,
    badge: 'Signature',
    featured: 1,
    description: 'Un micro-lot de légende, cueilli à la main dans les hauts plateaux éthiopiens. Une tasse lumineuse, florale et délicatement fruitée, d’une élégance rare.',
    image: unsplash('photo-1447933601403-0c6688de566e'),
    prices: { '250g': 145, '500g': 265, '1kg': 490 }
  },
  {
    id: 'geisha',
    name: 'Colombie Geisha',
    category: 'beans',
    origin: 'Colombie · Huila',
    altitude: '1 750 – 1 950 m',
    process: 'Anaérobie',
    notes: ['Jasmin sauvage', 'Mangue', 'Miel'],
    intensity: 8,
    badge: 'Édition limitée',
    featured: 2,
    description: 'La Geisha dans toute sa splendeur : un nez de jasmin sauvage, une texture soyeuse et une finale de mangue confite. Une édition confidentielle, numérotée.',
    image: unsplash('photo-1572442388796-11668a67e53d'),
    prices: { '250g': 290, '500g': 520, '1kg': 960 }
  },
  {
    id: 'blue-mountain',
    name: 'Blue Mountain',
    category: 'beans',
    origin: 'Jamaïque · Blue Mountain',
    altitude: '1 200 – 1 500 m',
    process: 'Lavé',
    notes: ['Cacao fin', 'Noisette', 'Agrumes confits'],
    intensity: 6,
    badge: 'Origine rare',
    featured: 3,
    description: 'Cultivé sur les pentes fraîches de la Blue Mountain, ce café mythique déploie une douceur incomparable et une longue finale d’agrumes confits.',
    image: unsplash('photo-1504630083234-14187a9df0f5'),
    prices: { '250g': 220, '500g': 400, '1kg': 740 }
  },
  {
    id: 'royal-gold',
    name: 'Espresso Royal Gold',
    category: 'beans',
    origin: 'Assemblage · Brésil & Inde',
    altitude: '1 100 – 1 500 m',
    process: 'Nature',
    notes: ['Cacao amer', 'Caramel salé', 'Épices'],
    intensity: 9,
    badge: 'Bestseller',
    featured: 4,
    description: 'Notre assemblage signature pour espresso : profond, gourmand et structuré. Une crème dense, des notes de cacao amer et une pointe d’épices.',
    image: unsplash('photo-1511920170033-f8396924c348'),
    prices: { '250g': 115, '500g': 210, '1kg': 390 }
  },
  {
    id: 'santos',
    name: 'Brésil Santos',
    category: 'ground',
    origin: 'Brésil · Santos',
    altitude: '900 – 1 200 m',
    process: 'Nature',
    notes: ['Cacao', 'Noisette', 'Caramel'],
    intensity: 6,
    badge: 'Torréfaction douce',
    featured: 5,
    description: 'Le classique réconfortant de la maison. Un café moulu généreux, rond et chocolaté, pensé pour les matins sans hâte et les pauses bien méritées.',
    image: unsplash('photo-1497935586351-b67a49e012bf'),
    prices: { '250g': 89, '500g': 165, '1kg': 310 }
  },
  {
    id: 'kenya',
    name: 'Kenya AA Nyeri',
    category: 'ground',
    origin: 'Kenya · Nyeri',
    altitude: '1 700 – 1 900 m',
    process: 'Lavé',
    notes: ['Cassis', 'Canne à sucre', 'Agrumes'],
    intensity: 8,
    badge: 'Nouveau',
    featured: 6,
    description: 'Une énergie vive et juteuse, signature des grands crus du Kenya. Le cassis et la canne à sucre s’équilibrent dans une tasse ample et racée.',
    image: unsplash('photo-1512568400610-62da28bc8a13'),
    prices: { '250g': 155, '500g': 285, '1kg': 530 }
  },
  {
    id: 'sumatra',
    name: 'Sumatra Mandheling',
    category: 'ground',
    origin: 'Indonésie · Sumatra',
    altitude: '1 200 – 1 500 m',
    process: 'Giling Basah',
    notes: ['Cèdre', 'Cacao noir', 'Poivre'],
    intensity: 9,
    badge: 'Intense',
    featured: 7,
    description: 'Un café de caractère, travaillé selon le procédé traditionnel Giling Basah. Corsé, boisé et profondément cacaoté, avec une finale poivrée.',
    image: unsplash('photo-1610632380989-680fe40816c6'),
    prices: { '250g': 125, '500g': 230, '1kg': 430 }
  },
  {
    id: 'capsules-or',
    name: 'Capsules Or Intense',
    category: 'capsules',
    origin: 'Assemblage Signature',
    altitude: '—',
    process: 'Aluminium recyclable',
    notes: ['Cacao amer', 'Noisette torréfiée', 'Poivre'],
    intensity: 10,
    badge: 'Or intense',
    featured: 8,
    description: 'L’intensité absolue, en capsule. Un espresso puissant et velouté, aux notes de cacao amer et de noisette torréfiée, pour les amateurs de sensations fortes.',
    image: unsplash('photo-1610889556528-9a770e32642f'),
    prices: { '10': 95, '30': 265, '50': 410 }
  },
  {
    id: 'capsules-velours',
    name: 'Capsules Velours d’Éthiopie',
    category: 'capsules',
    origin: 'Éthiopie · Yirgacheffe',
    altitude: '—',
    process: 'Aluminium recyclable',
    notes: ['Fleurs blanches', 'Miel', 'Bergamote'],
    intensity: 6,
    badge: 'Velours',
    featured: 9,
    description: 'La délicatesse d’un grand cru éthiopien, en un geste. Une capsule soyeuse et florale, avec une douceur de miel et une pointe de bergamote.',
    image: unsplash('photo-1495774856032-8b90bbb32b32'),
    prices: { '10': 105, '30': 295, '50': 460 }
  },
  {
    id: 'capsules-nocturne',
    name: 'Capsules Décaféiné Nocturne',
    category: 'capsules',
    origin: 'Colombie · Decaf',
    altitude: '—',
    process: 'Aluminium recyclable',
    notes: ['Amande douce', 'Caramel', 'Cacao'],
    intensity: 3,
    badge: 'Sans caféine',
    featured: 10,
    description: 'Le plaisir du café, sans la caféine. Un décaféiné doux et gourmand, aux notes d’amande et de caramel, idéal pour prolonger la soirée.',
    image: unsplash('photo-1514432324607-a09d9b4aefdd'),
    prices: { '10': 85, '30': 235, '50': 360 }
  }
];

/* ============================================================
   Utilitaires & logique métier pure (testable dans Node)
   ============================================================ */

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const cleanText = (value) => String(value ?? '').replace(/\s+/g, ' ').trim();

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[character]));
}

function formatMAD(value) {
  const numeric = Number(value);
  const safe = Number.isFinite(numeric) ? Math.round(numeric) : 0;
  return `${new Intl.NumberFormat('fr-FR').format(safe)} ${CURRENCY}`;
}

function getProductById(id) {
  return PRODUCTS.find((product) => product.id === id) || null;
}

function getProductOptions(product) {
  if (!product) return [];
  return product.category === 'capsules' ? CAPSULE_OPTIONS : WEIGHT_OPTIONS;
}

function getBasePrice(product) {
  if (!product || !product.prices) return 0;
  const firstOption = getProductOptions(product)[0];
  return getPrice(product, firstOption ? firstOption.id : Object.keys(product.prices)[0]);
}

function getPrice(product, optionId) {
  if (!product || !product.prices) return 0;
  const price = Number(product.prices[optionId]);
  return Number.isFinite(price) && price > 0 ? price : 0;
}

function getDefaultSelection(product) {
  if (!product) return { optionId: '250g', grind: null };
  if (product.category === 'capsules') return { optionId: '10', grind: null };
  return {
    optionId: '250g',
    grind: product.category === 'ground' ? GRIND_OPTIONS[0] : null
  };
}

function getOptionLabel(product, optionId) {
  if (!product) return '';
  if (product.category === 'capsules') return `Boîte de ${optionId} capsules`;
  const option = WEIGHT_OPTIONS.find((item) => item.id === optionId);
  return option ? option.label : optionId;
}

function formatLineOptions(line) {
  if (!line) return '';
  if (line.category === 'ground' && line.grind) {
    return `${line.optionLabel} · Mouture ${line.grind}`;
  }
  return line.optionLabel;
}

function createCartLine(product, optionId, grind = null, qty = 1) {
  if (!product) return null;
  const safeOption = product.prices && product.prices[optionId]
    ? optionId
    : getProductOptions(product)[0].id;
  const safeGrind = product.category === 'ground'
    ? (GRIND_OPTIONS.includes(grind) ? grind : GRIND_OPTIONS[0])
    : null;
  const safeQty = clamp(parseInt(qty, 10) || 1, 1, MAX_QTY);
  const unitPrice = getPrice(product, safeOption);
  return {
    key: `${product.id}__${safeOption}__${safeGrind || 'none'}`,
    productId: product.id,
    name: product.name,
    image: product.image,
    category: product.category,
    optionId: safeOption,
    optionLabel: getOptionLabel(product, safeOption),
    grind: safeGrind,
    unitPrice,
    qty: safeQty
  };
}

function addLineToCart(cart, line) {
  const current = Array.isArray(cart) ? cart : [];
  if (!line || !line.key) return current;
  const existing = current.find((item) => item.key === line.key);
  if (!existing) return [...current, line];
  return current.map((item) => item.key === line.key
    ? {
        ...item,
        qty: clamp(
          (Number.isFinite(Number(item.qty)) ? Number(item.qty) : 0)
            + (Number.isFinite(Number(line.qty)) ? Number(line.qty) : 1),
          1,
          MAX_QTY
        )
      }
    : item);
}

function updateLineQty(cart, key, delta) {
  return (Array.isArray(cart) ? cart : []).map((line) => line.key === key
    ? {
        ...line,
        qty: clamp(
          (Number.isFinite(Number(line.qty)) ? Number(line.qty) : 1) + delta,
          1,
          MAX_QTY
        )
      }
    : line);
}

function removeLine(cart, key) {
  return (Array.isArray(cart) ? cart : []).filter((line) => line.key !== key);
}

function getCartCount(cart) {
  return (Array.isArray(cart) ? cart : []).reduce((sum, line) => {
    const qty = Number(line.qty);
    return sum + (Number.isFinite(qty) ? qty : 0);
  }, 0);
}

function computeSubtotal(cart) {
  return Math.round((Array.isArray(cart) ? cart : []).reduce((sum, line) => {
    const price = Number(line.unitPrice);
    const qty = Number(line.qty);
    if (!Number.isFinite(price) || !Number.isFinite(qty)) return sum;
    return sum + price * qty;
  }, 0));
}

function getShipping(subtotal) {
  const safeSubtotal = Number(subtotal);
  if (!Number.isFinite(safeSubtotal) || safeSubtotal <= 0) return 0;
  return safeSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
}

function computeTotals(cart) {
  const subtotal = computeSubtotal(cart);
  const shipping = getShipping(subtotal);
  const total = subtotal + shipping;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const progress = subtotal <= 0
    ? 0
    : (freeShipping ? 100 : Math.min(99, Math.floor((subtotal / FREE_SHIPPING_THRESHOLD) * 100)));
  return {
    subtotal,
    shipping,
    total,
    remaining,
    progress,
    freeShipping,
    itemCount: getCartCount(cart)
  };
}

function getShippingMessage(totals) {
  if (!totals || totals.itemCount === 0) return `Livraison offerte dès ${formatMAD(FREE_SHIPPING_THRESHOLD)} d’achat.`;
  if (totals.freeShipping) return 'Livraison offerte débloquée. Votre commande voyage gratuitement.';
  return `Plus que ${formatMAD(totals.remaining)} pour profiter de la livraison gratuite !`;
}

function normalizeCart(raw) {
  let input = raw;
  if (typeof raw === 'string') {
    try { input = JSON.parse(raw); } catch { input = []; }
  }
  if (!Array.isArray(input)) return [];
  const merged = new Map();
  input.forEach((item) => {
    if (!item || typeof item !== 'object') return;
    const product = getProductById(item.productId);
    if (!product) return;
    const requestedOption = String(item.optionId ?? '');
    const optionId = product.prices[requestedOption]
      ? requestedOption
      : getProductOptions(product)[0].id;
    const grind = product.category === 'ground' && GRIND_OPTIONS.includes(item.grind)
      ? item.grind
      : (product.category === 'ground' ? GRIND_OPTIONS[0] : null);
    const qty = clamp(parseInt(item.qty, 10) || 1, 1, MAX_QTY);
    const line = createCartLine(product, optionId, grind, qty);
    if (!line) return;
    if (merged.has(line.key)) {
      merged.get(line.key).qty = clamp(merged.get(line.key).qty + qty, 1, MAX_QTY);
    } else {
      merged.set(line.key, line);
    }
  });
  return [...merged.values()];
}

function normalizePhone(phone) {
  const digits = String(phone ?? '').replace(/[^\d+]/g, '').replace(/^\+/, '');
  return digits;
}

function isValidMoroccanPhone(phone) {
  return /^(?:212|0)[5-7]\d{8}$/.test(normalizePhone(phone));
}

function getPaymentLabel(payment) {
  return payment === 'card' ? 'Carte bancaire (simulation)' : 'Paiement à la livraison';
}

function luhnCheck(cardNumber) {
  const digits = String(cardNumber ?? '').replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) return false;
  let sum = 0;
  let double = false;
  for (let index = digits.length - 1; index >= 0; index -= 1) {
    let digit = Number(digits[index]);
    if (double) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    double = !double;
  }
  return sum % 10 === 0;
}

function validateCustomer(customer = {}, payment = 'cod', card = {}) {
  const errors = {};
  if (cleanText(customer.name).length < 3) {
    errors.name = 'Veuillez indiquer votre nom complet.';
  }
  if (!isValidMoroccanPhone(customer.phone)) {
    errors.phone = 'Entrez un numéro marocain valide (ex. 06 12 34 56 78).';
  }
  if (cleanText(customer.city).length < 2) {
    errors.city = 'Veuillez indiquer votre ville.';
  }
  if (cleanText(customer.address).length < 10) {
    errors.address = 'Veuillez indiquer une adresse complète (rue, numéro, quartier).';
  }
  if (!['cod', 'card'].includes(payment)) {
    errors.payment = 'Choisissez un mode de paiement.';
  }
  if (payment === 'card') {
    if (!luhnCheck(card.number)) {
      errors.cardNumber = 'Numéro de carte invalide (test : 4242 4242 4242 4242).';
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cleanText(card.expiry))) {
      errors.cardExpiry = 'Format attendu : MM/AA.';
    } else {
      const [month, year] = cleanText(card.expiry).split('/').map(Number);
      const expiryDate = new Date(2000 + year, month, 1);
      const now = new Date();
      if (expiryDate <= new Date(now.getFullYear(), now.getMonth(), 1)) {
        errors.cardExpiry = 'Cette carte est expirée.';
      }
    }
    if (!/^\d{3,4}$/.test(cleanText(card.cvv))) {
      errors.cardCvv = 'Le CVV doit contenir 3 ou 4 chiffres.';
    }
  }
  return { isValid: Object.keys(errors).length === 0, errors };
}

function generateOrderNumber(seed = Date.now()) {
  const numeric = Math.abs(Number(seed) || Date.now()) % 100000;
  return `#LC-${String(numeric).padStart(5, '0')}`;
}

function buildWhatsAppMessage({ cart, customer = {}, totals, paymentLabel }) {
  const safeCart = Array.isArray(cart) ? cart : [];
  const safeTotals = totals || computeTotals(safeCart);
  const lines = [
    'LUXECOFFEE — Nouvelle commande',
    'Cafés de spécialité & capsules d’exception',
    '',
    'VOTRE SÉLECTION'
  ];
  safeCart.forEach((line, index) => {
    lines.push(`${index + 1}. ${line.name} — ${formatLineOptions(line)}`);
    lines.push(`   ${line.qty} × ${formatMAD(line.unitPrice)} = ${formatMAD(line.unitPrice * line.qty)}`);
  });
  lines.push('');
  lines.push(`Sous-total : ${formatMAD(safeTotals.subtotal)}`);
  lines.push(`Livraison : ${safeTotals.shipping === 0 ? 'Offerte' : formatMAD(safeTotals.shipping)}`);
  lines.push(`TOTAL : ${formatMAD(safeTotals.total)}`);
  lines.push('');
  lines.push('COORDONNÉES');
  lines.push(`Nom : ${cleanText(customer.name)}`);
  lines.push(`Téléphone : ${cleanText(customer.phone)}`);
  lines.push(`Ville : ${cleanText(customer.city)}`);
  lines.push(`Adresse : ${cleanText(customer.address)}`);
  lines.push(`Paiement : ${paymentLabel || getPaymentLabel('cod')}`);
  lines.push('');
  lines.push('Merci pour votre confiance — LuxeCoffee');
  return lines.join('\n');
}

function buildWhatsAppUrl(message, phone = WHATSAPP_NUMBER) {
  const digits = String(phone || WHATSAPP_NUMBER).replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(String(message ?? ''))}`;
}

/* ============================================================
   État & rendu de l'interface
   ============================================================ */

const state = {
  cart: [],
  category: 'all',
  sort: 'featured',
  activeProductId: null,
  selection: { optionId: '250g', grind: null },
  qty: 1,
  lastOrder: null,
  lastFocused: null,
  lastCount: 0
};

let els = {};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function refreshIcons() {
  if (typeof window !== 'undefined' && window.lucide && typeof window.lucide.createIcons === 'function') {
    try { window.lucide.createIcons(); } catch { /* CDN indisponible : le site reste fonctionnel */ }
  }
}

function initApp() {
  state.cart = loadCart();
  els = {
    header: $('#site-header'),
    filters: $('#category-filters'),
    grid: $('#product-grid'),
    count: $('#product-count'),
    sortSelect: $('#sort-select'),
    cartDrawer: $('#cart-drawer'),
    cartOverlay: $('#cart-overlay'),
    cartItems: $('#cart-items'),
    cartEmpty: $('#cart-empty'),
    cartFooter: $('#cart-footer'),
    cartBadge: $('#cart-badge'),
    cartTrigger: $('[data-action="open-cart"]'),
    cartCountLabel: $('#cart-count-label'),
    cartSubtotal: $('#cart-subtotal'),
    cartShipping: $('#cart-shipping'),
    cartTotal: $('#cart-total'),
    checkoutBtn: $('#checkout-btn'),
    shippingMessage: $('#shipping-message'),
    shippingBar: $('#shipping-bar'),
    shippingProgress: $('#shipping-progress'),
    shippingProgressbar: $('#shipping-progressbar'),
    productModal: $('#product-modal'),
    productOverlay: $('#product-overlay'),
    productContent: $('#product-modal-content'),
    checkoutModal: $('#checkout-modal'),
    checkoutOverlay: $('#checkout-overlay'),
    checkoutFormView: $('#checkout-form-view'),
    checkoutForm: $('#checkout-form'),
    checkoutSuccess: $('#checkout-success'),
    checkoutTitle: $('#checkout-title'),
    checkoutItems: $('#checkout-items'),
    checkoutCount: $('#checkout-count'),
    checkoutSubtotal: $('#checkout-subtotal'),
    checkoutShipping: $('#checkout-shipping'),
    checkoutTotal: $('#checkout-total'),
    checkoutShippingMessage: $('#checkout-shipping-message'),
    checkoutPaymentLabel: $('#checkout-payment-label'),
    cardFields: $('#card-fields'),
    formError: $('#form-error'),
    mobileMenu: $('#mobile-menu'),
    menuTrigger: $('[data-action="toggle-menu"]'),
    toastContainer: $('#toast-container'),
    newsletterForm: $('#newsletter-form'),
    newsletterEmail: $('#newsletter-email')
  };

  document.body.classList.add('reveal-ready');
  bindEvents();
  renderFilters();
  renderProducts();
  renderCart();
  setupHeader();
  setupWhatsAppLinks();
  updateYear();
  observeReveals();
  refreshIcons();
}

function setupHeader() {
  if (!els.header) return;
  const updateHeader = () => {
    els.header.classList.toggle('is-scrolled', window.scrollY > 18);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}

function setupWhatsAppLinks() {
  const introMessage = 'Bonjour LuxeCoffee, je souhaite un conseil pour choisir mon café.';
  $$('[data-whatsapp-link]').forEach((link) => {
    link.href = buildWhatsAppUrl(introMessage);
  });
  $$('[data-whatsapp-phone]').forEach((element) => {
    element.textContent = WHATSAPP_DISPLAY;
  });
}

function updateYear() {
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
}

/* ---------- Catalogue ---------- */

function renderFilters() {
  if (!els.filters) return;
  const counts = { all: PRODUCTS.length };
  PRODUCTS.forEach((product) => {
    counts[product.category] = (counts[product.category] || 0) + 1;
  });
  els.filters.innerHTML = CATEGORIES.map((category) => {
    const active = state.category === category.id;
    return `<button type="button" class="filter-pill${active ? ' is-active' : ''}" role="tab" aria-selected="${active}" data-action="filter" data-category="${category.id}">${category.label}<span>${counts[category.id] || 0}</span></button>`;
  }).join('');
  refreshIcons();
}

function sortProducts(list) {
  const sorted = [...list];
  switch (state.sort) {
    case 'price-asc':
      return sorted.sort((a, b) => getBasePrice(a) - getBasePrice(b));
    case 'price-desc':
      return sorted.sort((a, b) => getBasePrice(b) - getBasePrice(a));
    case 'intensity-desc':
      return sorted.sort((a, b) => b.intensity - a.intensity);
    default:
      return sorted.sort((a, b) => a.featured - b.featured);
  }
}

function renderProducts() {
  if (!els.grid) return;
  const filtered = state.category === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((product) => product.category === state.category);
  const list = sortProducts(filtered);
  els.grid.innerHTML = list.length
    ? list.map((product, index) => productCardTemplate(product, index)).join('')
    : '<p class="noscript-note">Aucun café ne correspond à cette sélection.</p>';
  if (els.count) {
    els.count.textContent = `${list.length} création${list.length > 1 ? 's' : ''} d’exception`;
  }
  refreshIcons();
}

function productCardTemplate(product, index) {
  const bars = Array.from({ length: 10 }, (_, barIndex) =>
    `<span class="${barIndex < product.intensity ? 'is-filled' : ''}"></span>`
  ).join('');
  return `
    <article class="product-card" style="--delay:${Math.min(index * 55, 330)}ms">
      <div class="product-media">
        <img class="product-img" src="${product.image}" alt="${escapeHTML(product.name)} — ${escapeHTML(product.notes.join(', '))}" width="900" height="1125" loading="lazy" decoding="async">
        <span class="product-badge">${escapeHTML(product.badge)}</span>
        <button type="button" class="quick-add" data-action="quick-add" data-product-id="${product.id}" aria-label="Ajouter ${escapeHTML(product.name)} au panier">
          <i data-lucide="plus" aria-hidden="true"></i>
        </button>
        <button type="button" class="product-veil" data-action="open-product" data-product-id="${product.id}" aria-label="Aperçu de ${escapeHTML(product.name)}">
          <span>Aperçu rapide</span><i data-lucide="arrow-up-right" aria-hidden="true"></i>
        </button>
      </div>
      <div class="product-info">
        <div class="product-meta-row">
          <span class="product-origin">${escapeHTML(product.origin)}</span>
          <span class="product-intensity-label">${product.intensity}/10</span>
        </div>
        <h3 class="product-name">
          <button type="button" data-action="open-product" data-product-id="${product.id}">${escapeHTML(product.name)}</button>
        </h3>
        <p class="product-notes">${escapeHTML(product.notes.slice(0, 3).join(' · '))}</p>
        <div class="product-bottom">
          <div class="product-price-wrap">
            <span class="product-from">À partir de</span>
            <span class="product-price">${formatMAD(getBasePrice(product))}</span>
          </div>
          <div class="intensity-bars" role="img" aria-label="Intensité ${product.intensity} sur 10">${bars}</div>
        </div>
      </div>
    </article>`;
}

/* ---------- Fiche produit ---------- */

function openProduct(productId) {
  const product = getProductById(productId);
  if (!product) return;
  closeMenu(false);
  closeCart(false);
  state.activeProductId = product.id;
  state.selection = getDefaultSelection(product);
  state.qty = 1;
  renderProductModal();
  els.productModal.classList.add('is-open');
  els.productOverlay.classList.add('is-open');
  els.productModal.setAttribute('aria-hidden', 'false');
  els.productOverlay.setAttribute('aria-hidden', 'false');
  state.lastFocused = document.activeElement;
  syncScrollLock();
  window.setTimeout(() => {
    const closeButton = els.productModal.querySelector('[data-action="close-product"]');
    if (closeButton) closeButton.focus({ preventScroll: true });
  }, 260);
}

function closeProduct(restoreFocus = true) {
  if (!els.productModal) return;
  els.productModal.classList.remove('is-open');
  els.productOverlay.classList.remove('is-open');
  els.productModal.setAttribute('aria-hidden', 'true');
  els.productOverlay.setAttribute('aria-hidden', 'true');
  syncScrollLock();
  if (restoreFocus && state.lastFocused) {
    state.lastFocused.focus({ preventScroll: true });
  }
}

function renderProductModal() {
  const product = getProductById(state.activeProductId);
  if (!product) return;
  const options = getProductOptions(product);
  const price = getPrice(product, state.selection.optionId);
  const optionLabel = product.category === 'capsules' ? 'Format' : 'Poids';
  const noteChips = product.notes.map((note) => `<span class="note-chip">${escapeHTML(note)}</span>`).join('');
  const intensityBars = Array.from({ length: 10 }, (_, index) =>
    `<span class="${index < product.intensity ? 'is-filled' : ''}"></span>`
  ).join('');
  const optionButtons = options.map((option) => `
    <button type="button" class="segment${state.selection.optionId === option.id ? ' is-active' : ''}" data-action="select-option" data-option-id="${option.id}" aria-pressed="${state.selection.optionId === option.id}">
      ${escapeHTML(option.label)}
    </button>`).join('');
  const grindGroup = product.category === 'ground' ? `
    <div class="option-group">
      <div class="option-head"><span>Mouture</span><span class="option-price" id="grind-label" style="font-size:.6rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)">${escapeHTML(state.selection.grind || GRIND_OPTIONS[0])}</span></div>
      <div class="segmented">
        ${GRIND_OPTIONS.map((grind) => `
          <button type="button" class="segment${state.selection.grind === grind ? ' is-active' : ''}" data-action="select-grind" data-grind="${escapeHTML(grind)}" aria-pressed="${state.selection.grind === grind}">
            ${escapeHTML(grind)}
          </button>`).join('')}
      </div>
    </div>` : '';
  const meta = product.category === 'capsules'
    ? [['Origine', product.origin], ['Format', '10 / 30 / 50'], ['Compatibilité', 'Nespresso']]
    : [['Origine', product.origin], ['Altitude', product.altitude], ['Process', product.process]];
  const metaItems = meta.map(([label, value]) => `
    <div class="meta-item"><span>${escapeHTML(label)}</span><strong>${escapeHTML(value)}</strong></div>`).join('');

  els.productContent.innerHTML = `
    <div class="product-modal-grid">
      <div class="product-modal-media">
        <img src="${product.image}" alt="${escapeHTML(product.name)} — ${escapeHTML(product.notes.join(', '))}" width="900" height="1125">
        <span class="product-badge">${escapeHTML(product.badge)}</span>
      </div>
      <div class="product-modal-body">
        <p class="product-modal-category">${escapeHTML(CATEGORY_LABELS[product.category])}</p>
        <h2 class="product-modal-title" id="product-modal-title">${escapeHTML(product.name)}</h2>
        <p class="product-modal-origin">${escapeHTML(product.origin)}</p>
        <p class="product-modal-desc">${escapeHTML(product.description)}</p>
        <div class="note-chips">${noteChips}</div>

        <div class="intensity-block">
          <div class="intensity-head"><span>Intensité</span><strong>${product.intensity} / 10</strong></div>
          <div class="intensity-meter" role="img" aria-label="Intensité ${product.intensity} sur 10">${intensityBars}</div>
        </div>

        <div class="product-meta">${metaItems}</div>

        <div class="option-group">
          <div class="option-head">
            <span>${optionLabel}</span>
            <span class="option-price" id="product-price">${formatMAD(price)}</span>
          </div>
          <div class="segmented">${optionButtons}</div>
        </div>
        ${grindGroup}

        <div class="add-row">
          <div class="qty-stepper" aria-label="Quantité">
            <button type="button" class="qty-btn" data-action="product-qty-minus" aria-label="Diminuer la quantité"><i data-lucide="minus" aria-hidden="true"></i></button>
            <span class="qty-value" id="product-qty">${state.qty}</span>
            <button type="button" class="qty-btn" data-action="product-qty-plus" aria-label="Augmenter la quantité"><i data-lucide="plus" aria-hidden="true"></i></button>
          </div>
          <button type="button" class="btn btn-gold add-to-cart-btn" data-action="add-to-cart">
            <span>Ajouter au panier</span>
            <span id="product-total">${formatMAD(price * state.qty)}</span>
          </button>
        </div>
        <p class="product-shipping"><i data-lucide="truck" aria-hidden="true"></i> Livraison 24–48h · Offerte dès 300 MAD</p>
      </div>
    </div>`;
  refreshIcons();
}

function selectProductOption(optionId) {
  const product = getProductById(state.activeProductId);
  if (!product || !product.prices || !product.prices[optionId]) return;
  state.selection.optionId = optionId;
  $$('[data-option-id]', els.productModal).forEach((button) => {
    const active = button.dataset.optionId === optionId;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  updateProductPricing();
}

function selectProductGrind(grind) {
  if (!GRIND_OPTIONS.includes(grind)) return;
  state.selection.grind = grind;
  $$('[data-grind]', els.productModal).forEach((button) => {
    const active = button.dataset.grind === grind;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  const grindLabel = document.getElementById('grind-label');
  if (grindLabel) grindLabel.textContent = grind;
}

function changeProductQty(delta) {
  state.qty = clamp(state.qty + delta, 1, MAX_QTY);
  updateProductPricing();
}

function updateProductPricing() {
  const product = getProductById(state.activeProductId);
  if (!product) return;
  const price = getPrice(product, state.selection.optionId);
  const priceElement = document.getElementById('product-price');
  const totalElement = document.getElementById('product-total');
  const qtyElement = document.getElementById('product-qty');
  if (priceElement) priceElement.textContent = formatMAD(price);
  if (totalElement) totalElement.textContent = formatMAD(price * state.qty);
  if (qtyElement) qtyElement.textContent = String(state.qty);
}

function addActiveProductToCart() {
  const product = getProductById(state.activeProductId);
  if (!product) return;
  const line = createCartLine(product, state.selection.optionId, state.selection.grind, state.qty);
  if (!line) return;
  state.cart = addLineToCart(state.cart, line);
  persistCart();
  renderCart();
  closeProduct(false);
  openCart();
  showToast('Ajouté au panier', `${product.name} · ${line.optionLabel}`, 'shopping-bag');
}

function quickAdd(productId) {
  const product = getProductById(productId);
  if (!product) return;
  const defaults = getDefaultSelection(product);
  const line = createCartLine(product, defaults.optionId, defaults.grind, 1);
  if (!line) return;
  state.cart = addLineToCart(state.cart, line);
  persistCart();
  renderCart();
  openCart();
  showToast('Ajouté au panier', `${product.name} · ${line.optionLabel}`, 'shopping-bag');
}

/* ---------- Panier ---------- */

function renderCart() {
  if (!els.cartItems) return;
  const totals = computeTotals(state.cart);
  const count = totals.itemCount;
  els.cartBadge.hidden = count === 0;
  els.cartBadge.textContent = count > 99 ? '99+' : String(count);
  els.cartCountLabel.textContent = `${count} article${count > 1 ? 's' : ''}`;
  if (els.cartTrigger) {
    els.cartTrigger.setAttribute('aria-label', count === 0
      ? 'Ouvrir le panier'
      : `Ouvrir le panier — ${count > 99 ? '99+' : count} article${count > 1 ? 's' : ''}`);
  }
  els.cartItems.innerHTML = state.cart.map(cartLineTemplate).join('');
  els.cartItems.hidden = state.cart.length === 0;
  els.cartEmpty.hidden = state.cart.length > 0;
  els.cartFooter.hidden = state.cart.length === 0;
  els.checkoutBtn.disabled = state.cart.length === 0;
  els.cartSubtotal.textContent = formatMAD(totals.subtotal);
  els.cartShipping.textContent = count === 0 ? '—' : (totals.shipping === 0 ? 'Offerte' : formatMAD(totals.shipping));
  els.cartTotal.textContent = formatMAD(totals.total);
  els.shippingMessage.textContent = getShippingMessage(totals);
  els.shippingBar.style.width = `${totals.progress}%`;
  els.shippingProgressbar.setAttribute('aria-valuenow', String(totals.progress));
  els.shippingProgress.classList.toggle('is-complete', totals.freeShipping && count > 0);

  if (count > state.lastCount) {
    els.cartBadge.classList.remove('pop');
    void els.cartBadge.offsetWidth;
    els.cartBadge.classList.add('pop');
    window.setTimeout(() => els.cartBadge.classList.remove('pop'), 320);
  }
  state.lastCount = count;
  renderCheckoutSummary();
  refreshIcons();
}

function cartLineTemplate(line) {
  return `
    <div class="cart-item">
      <div class="cart-item-media">
        <img src="${line.image}" alt="${escapeHTML(line.name)}" width="144" height="176" loading="lazy">
      </div>
      <div class="cart-item-info">
        <div class="cart-item-top">
          <h3 class="cart-item-name">${escapeHTML(line.name)}</h3>
          <button type="button" class="cart-remove" data-action="cart-remove" data-key="${escapeHTML(line.key)}" aria-label="Retirer ${escapeHTML(line.name)} du panier">
            <i data-lucide="trash-2" aria-hidden="true"></i>
          </button>
        </div>
        <p class="cart-item-options">${escapeHTML(formatLineOptions(line))}</p>
        <p class="cart-item-unit">${formatMAD(line.unitPrice)} / unité</p>
        <div class="cart-item-bottom">
          <div class="qty-stepper" aria-label="Quantité de ${escapeHTML(line.name)}">
            <button type="button" class="qty-btn" data-action="cart-minus" data-key="${escapeHTML(line.key)}" aria-label="Diminuer la quantité"><i data-lucide="minus" aria-hidden="true"></i></button>
            <span class="qty-value">${line.qty}</span>
            <button type="button" class="qty-btn" data-action="cart-plus" data-key="${escapeHTML(line.key)}" aria-label="Augmenter la quantité"><i data-lucide="plus" aria-hidden="true"></i></button>
          </div>
          <span class="cart-line-price">${formatMAD(line.unitPrice * line.qty)}</span>
        </div>
      </div>
    </div>`;
}

function updateCartQty(key, delta) {
  state.cart = updateLineQty(state.cart, key, delta);
  persistCart();
  renderCart();
}

function removeCartLine(key) {
  state.cart = removeLine(state.cart, key);
  persistCart();
  renderCart();
}

function persistCart() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart)); } catch { /* stockage indisponible */ }
}

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? normalizeCart(raw) : [];
  } catch {
    return [];
  }
}

function openCart() {
  if (!els.cartDrawer) return;
  closeMenu(false);
  els.cartDrawer.classList.add('is-open');
  els.cartOverlay.classList.add('is-open');
  els.cartDrawer.setAttribute('aria-hidden', 'false');
  els.cartOverlay.setAttribute('aria-hidden', 'false');
  state.lastFocused = document.activeElement;
  syncScrollLock();
  window.setTimeout(() => {
    const closeButton = els.cartDrawer.querySelector('[data-action="close-cart"]');
    if (closeButton) closeButton.focus({ preventScroll: true });
  }, 260);
}

function closeCart(restoreFocus = true) {
  if (!els.cartDrawer) return;
  els.cartDrawer.classList.remove('is-open');
  els.cartOverlay.classList.remove('is-open');
  els.cartDrawer.setAttribute('aria-hidden', 'true');
  els.cartOverlay.setAttribute('aria-hidden', 'true');
  syncScrollLock();
  if (restoreFocus && state.lastFocused) {
    state.lastFocused.focus({ preventScroll: true });
  }
}

/* ---------- Tunnel de commande ---------- */

const CHECKOUT_FIELD_MAP = {
  name: 'customer-name',
  phone: 'customer-phone',
  city: 'customer-city',
  address: 'customer-address',
  cardNumber: 'card-number',
  cardExpiry: 'card-expiry',
  cardCvv: 'card-cvv'
};

const CHECKOUT_ERROR_MAP = {
  name: 'error-name',
  phone: 'error-phone',
  city: 'error-city',
  address: 'error-address',
  cardNumber: 'error-card-number',
  cardExpiry: 'error-card-expiry',
  cardCvv: 'error-card-cvv'
};

function getSelectedPayment() {
  const selected = document.querySelector('input[name="payment"]:checked');
  return selected ? selected.value : 'cod';
}

function renderCheckoutSummary() {
  if (!els.checkoutItems) return;
  const totals = computeTotals(state.cart);
  const count = totals.itemCount;
  els.checkoutCount.textContent = `${count} article${count > 1 ? 's' : ''}`;
  els.checkoutItems.innerHTML = state.cart.length
    ? state.cart.map((line) => `
      <div class="summary-item">
        <img src="${line.image}" alt="${escapeHTML(line.name)}" width="76" height="92" loading="lazy">
        <div class="summary-item-info">
          <strong>${escapeHTML(line.name)}</strong>
          <span>${escapeHTML(formatLineOptions(line))} · ${formatMAD(line.unitPrice * line.qty)}</span>
        </div>
        <span class="summary-item-qty">× ${line.qty}</span>
      </div>`).join('')
    : '<p class="summary-shipping-message">Votre panier est vide.</p>';
  els.checkoutSubtotal.textContent = formatMAD(totals.subtotal);
  els.checkoutShipping.textContent = count === 0 ? '—' : (totals.shipping === 0 ? 'Offerte' : formatMAD(totals.shipping));
  els.checkoutTotal.textContent = formatMAD(totals.total);
  els.checkoutShippingMessage.textContent = getShippingMessage(totals);
  els.checkoutPaymentLabel.textContent = getPaymentLabel(getSelectedPayment());
  refreshIcons();
}

function openCheckout() {
  if (!state.cart.length) {
    showToast('Votre panier est vide', 'Ajoutez un café avant de passer commande.', 'coffee');
    return;
  }
  closeCart(false);
  state.lastOrder = null;
  resetCheckoutView();
  renderCheckoutSummary();
  els.checkoutModal.classList.add('is-open');
  els.checkoutOverlay.classList.add('is-open');
  els.checkoutModal.setAttribute('aria-hidden', 'false');
  els.checkoutOverlay.setAttribute('aria-hidden', 'false');
  state.lastFocused = document.activeElement;
  syncScrollLock();
  window.setTimeout(() => {
    const nameField = document.getElementById('customer-name');
    if (nameField) nameField.focus({ preventScroll: true });
  }, 280);
}

function closeCheckout(restoreFocus = true) {
  if (!els.checkoutModal) return;
  const hadOrder = Boolean(state.lastOrder);
  els.checkoutModal.classList.remove('is-open');
  els.checkoutOverlay.classList.remove('is-open');
  els.checkoutModal.setAttribute('aria-hidden', 'true');
  els.checkoutOverlay.setAttribute('aria-hidden', 'true');
  syncScrollLock();
  if (hadOrder) {
    resetCheckoutForm();
    state.lastOrder = null;
  }
  if (restoreFocus && state.lastFocused) {
    state.lastFocused.focus({ preventScroll: true });
  }
}

function resetCheckoutView() {
  els.checkoutFormView.hidden = false;
  els.checkoutSuccess.hidden = true;
  els.checkoutSuccess.innerHTML = '';
  els.formError.hidden = true;
  clearFormErrors();
}

function resetCheckoutForm() {
  els.checkoutForm.reset();
  els.cardFields.hidden = true;
  clearFormErrors();
}

function readCheckoutForm() {
  return {
    customer: {
      name: ($('#customer-name')?.value || '').trim(),
      phone: ($('#customer-phone')?.value || '').trim(),
      city: ($('#customer-city')?.value || '').trim(),
      address: ($('#customer-address')?.value || '').trim()
    },
    payment: getSelectedPayment(),
    card: {
      number: ($('#card-number')?.value || '').replace(/\D/g, ''),
      expiry: ($('#card-expiry')?.value || '').trim(),
      cvv: ($('#card-cvv')?.value || '').trim()
    }
  };
}

function clearFormErrors() {
  Object.values(CHECKOUT_FIELD_MAP).forEach((id) => {
    const input = document.getElementById(id);
    if (input) {
      const field = input.closest('.field');
      if (field) field.classList.remove('is-invalid');
    }
  });
  Object.values(CHECKOUT_ERROR_MAP).forEach((id) => {
    const error = document.getElementById(id);
    if (error) error.textContent = '';
  });
  if (els.formError) {
    els.formError.hidden = true;
    els.formError.textContent = '';
  }
}

function clearFieldError(input) {
  if (!input) return;
  const field = input.closest('.field');
  if (field) {
    field.classList.remove('is-invalid');
    const error = field.querySelector('.field-error');
    if (error) error.textContent = '';
  }
  if (els.formError && !document.querySelector('.field.is-invalid')) {
    els.formError.hidden = true;
    els.formError.textContent = '';
  }
}

function showFormErrors(errors = {}) {
  clearFormErrors();
  const keys = Object.keys(errors);
  if (!keys.length) return;
  keys.forEach((key) => {
    const inputId = CHECKOUT_FIELD_MAP[key];
    const errorId = CHECKOUT_ERROR_MAP[key];
    if (inputId) {
      const input = document.getElementById(inputId);
      if (input) {
        const field = input.closest('.field');
        if (field) field.classList.add('is-invalid');
      }
    }
    if (errorId) {
      const error = document.getElementById(errorId);
      if (error) error.textContent = errors[key];
    }
  });
  if (els.formError) {
    els.formError.hidden = false;
    els.formError.textContent = 'Veuillez vérifier les champs signalés avant de continuer.';
  }
  const firstInput = document.getElementById(CHECKOUT_FIELD_MAP[keys[0]]);
  if (firstInput) {
    firstInput.focus({ preventScroll: true });
    firstInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function confirmOrder() {
  if (!state.cart.length) {
    showToast('Votre panier est vide', 'Ajoutez un café avant de confirmer.', 'coffee');
    return;
  }
  const form = readCheckoutForm();
  const validation = validateCustomer(form.customer, form.payment, form.card);
  showFormErrors(validation.errors);
  if (!validation.isValid) {
    showToast('Formulaire incomplet', 'Quelques champs nécessitent votre attention.', 'alert-circle');
    return;
  }
  const totals = computeTotals(state.cart);
  const order = {
    number: generateOrderNumber(Date.now() + Math.floor(Math.random() * 997)),
    customer: { ...form.customer },
    payment: form.payment,
    paymentLabel: getPaymentLabel(form.payment),
    items: state.cart.map((line) => ({ ...line })),
    totals,
    dateLabel: new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(new Date())
  };
  state.lastOrder = order;
  renderSuccess(order);
  state.cart = [];
  persistCart();
  renderCart();
  showToast('Commande confirmée', `${order.number} — merci pour votre confiance.`, 'check');
}

function renderSuccess(order) {
  const firstName = cleanText(order.customer.name).split(' ')[0] || 'cher client';
  const itemsHTML = order.items.map((line) => `
    <div class="success-item">
      <div>
        <strong>${escapeHTML(line.name)}</strong>
        <span>${escapeHTML(formatLineOptions(line))} × ${line.qty}</span>
      </div>
      <span>${formatMAD(line.unitPrice * line.qty)}</span>
    </div>`).join('');
  const orderMessage = `Bonjour LuxeCoffee, je viens de passer la commande ${order.number}. Pouvez-vous me confirmer la livraison ?`;
  const orderWhatsAppUrl = buildWhatsAppUrl(orderMessage);
  els.checkoutSuccess.innerHTML = `
    <div class="success-view">
      <div class="success-icon"><i data-lucide="check" aria-hidden="true"></i></div>
      <p class="success-eyebrow">Commande confirmée</p>
      <h2 class="success-title" tabindex="-1">Merci, ${escapeHTML(firstName)}.</h2>
      <p class="success-text">Votre commande est bien enregistrée. Notre équipe vous contacte au ${escapeHTML(order.customer.phone)} pour confirmer la livraison.</p>
      <div class="order-number">${escapeHTML(order.number)}</div>
      <div class="success-grid">
        <div class="success-summary">
          <h3>Votre sélection</h3>
          <div class="success-items">${itemsHTML}</div>
          <dl class="success-totals">
            <div><dt>Sous-total</dt><dd>${formatMAD(order.totals.subtotal)}</dd></div>
            <div><dt>Livraison</dt><dd>${order.totals.shipping === 0 ? 'Offerte' : formatMAD(order.totals.shipping)}</dd></div>
            <div class="success-total"><dt>Total</dt><dd>${formatMAD(order.totals.total)}</dd></div>
          </dl>
        </div>
        <div class="success-customer">
          <h3>Livraison</h3>
          <p><strong>${escapeHTML(order.customer.name)}</strong>${escapeHTML(order.customer.phone)}</p>
          <p><strong>${escapeHTML(order.customer.city)}</strong>${escapeHTML(order.customer.address)}</p>
          <p><strong>${escapeHTML(order.paymentLabel)}</strong>Commande passée le ${escapeHTML(order.dateLabel)}</p>
        </div>
      </div>
      <div class="success-actions">
        <button type="button" class="btn btn-gold" data-action="continue-shopping">Continuer mes achats <i data-lucide="arrow-right" aria-hidden="true"></i></button>
        <a class="btn btn-whatsapp" href="${orderWhatsAppUrl}" target="_blank" rel="noopener">
          <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16.04 3C9.4 3 4 8.4 4 15.04c0 2.12.55 4.18 1.6 6L4 29l8.14-1.56a12.9 12.9 0 0 0 3.9.6h.01C22.68 28.04 28.08 22.64 28.08 16S22.68 3 16.04 3zm0 22.9c-1.24 0-2.46-.2-3.62-.6l-.26-.08-4.84.93.96-4.72-.17-.27a10.8 10.8 0 0 1-1.66-5.8c0-5.98 4.87-10.85 10.86-10.85 2.9 0 5.62 1.13 7.67 3.18a10.8 10.8 0 0 1 3.18 7.68c0 5.99-4.87 10.86-10.86 10.86zm5.95-8.13c-.33-.16-1.93-.95-2.23-1.06-.3-.11-.52-.16-.74.17-.22.33-.85 1.06-1.04 1.28-.19.22-.38.25-.7.08-.33-.16-1.38-.51-2.63-1.62-.97-.87-1.63-1.94-1.82-2.27-.19-.33-.02-.5.14-.66.15-.15.33-.38.49-.57.16-.19.22-.33.33-.55.11-.22.05-.41-.03-.57-.08-.16-.74-1.78-1.01-2.44-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.57.08-.87.41-.3.33-1.14 1.11-1.14 2.71s1.17 3.15 1.33 3.37c.16.22 2.3 3.51 5.57 4.92.78.34 1.39.54 1.87.69.79.25 1.5.22 2.07.13.63-.09 1.93-.79 2.2-1.55.27-.76.27-1.41.19-1.55-.08-.14-.3-.22-.63-.38z"/></svg>
          Suivre sur WhatsApp
        </a>
      </div>
      <p class="success-note">Conservez votre numéro de suivi. Notre équipe vous répond du lundi au samedi, de 9h à 19h.</p>
    </div>`;
  els.checkoutFormView.hidden = true;
  els.checkoutSuccess.hidden = false;
  els.checkoutSuccess.scrollTop = 0;
  refreshIcons();
  const title = els.checkoutSuccess.querySelector('.success-title');
  if (title) title.focus({ preventScroll: true });
}

function whatsappOrder() {
  if (!state.cart.length) {
    showToast('Votre panier est vide', 'Ajoutez un café avant de commander.', 'coffee');
    return;
  }
  const form = readCheckoutForm();
  const validation = validateCustomer(form.customer, form.payment, form.card);
  showFormErrors(validation.errors);
  if (!validation.isValid) {
    showToast('Formulaire incomplet', 'Complétez vos coordonnées pour préparer le message WhatsApp.', 'alert-circle');
    return;
  }
  const totals = computeTotals(state.cart);
  const message = buildWhatsAppMessage({
    cart: state.cart,
    customer: form.customer,
    totals,
    paymentLabel: getPaymentLabel(form.payment)
  });
  const url = buildWhatsAppUrl(message);
  const opened = window.open(url, '_blank', 'noopener,noreferrer');
  if (!opened) window.location.href = url;
  showToast('WhatsApp est prêt', 'Votre récapitulatif a été préparé. Envoyez le message pour finaliser.', 'message-circle');
}

function continueShopping() {
  closeCheckout(false);
  closeCart(false);
  closeProduct(false);
  closeMenu(false);
  window.setTimeout(() => {
    const collection = document.getElementById('collection');
    if (collection) collection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 80);
}

/* ---------- Menu mobile & couches ---------- */

function openMenu() {
  closeCart(false);
  closeProduct(false);
  closeCheckout(false);
  els.mobileMenu.classList.add('is-open');
  els.mobileMenu.setAttribute('aria-hidden', 'false');
  if (els.menuTrigger) els.menuTrigger.setAttribute('aria-expanded', 'true');
  state.lastFocused = document.activeElement;
  syncScrollLock();
  window.setTimeout(() => {
    const closeButton = els.mobileMenu.querySelector('[data-action="close-menu"]');
    if (closeButton) closeButton.focus({ preventScroll: true });
  }, 220);
}

function closeMenu(restoreFocus = true) {
  if (!els.mobileMenu) return;
  els.mobileMenu.classList.remove('is-open');
  els.mobileMenu.setAttribute('aria-hidden', 'true');
  if (els.menuTrigger) els.menuTrigger.setAttribute('aria-expanded', 'false');
  syncScrollLock();
  if (restoreFocus && state.lastFocused) {
    state.lastFocused.focus({ preventScroll: true });
  }
}

function syncScrollLock() {
  const layers = [els.cartDrawer, els.productModal, els.checkoutModal, els.mobileMenu];
  const isOpen = layers.some((layer) => layer && layer.classList.contains('is-open'));
  document.body.classList.toggle('no-scroll', isOpen);
}

function getActiveLayer() {
  if (els.checkoutModal && els.checkoutModal.classList.contains('is-open')) return els.checkoutModal;
  if (els.productModal && els.productModal.classList.contains('is-open')) return els.productModal;
  if (els.cartDrawer && els.cartDrawer.classList.contains('is-open')) return els.cartDrawer;
  if (els.mobileMenu && els.mobileMenu.classList.contains('is-open')) return els.mobileMenu;
  return null;
}

function trapFocus(event) {
  const layer = getActiveLayer();
  if (!layer) return;
  const focusables = $$('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', layer)
    .filter((element) => element.getClientRects().length > 0);
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function setCategory(category) {
  if (!CATEGORIES.some((item) => item.id === category)) return;
  state.category = category;
  renderFilters();
  renderProducts();
}

function jumpToCategory(category) {
  setCategory(category);
  closeMenu(false);
  window.setTimeout(() => {
    const collection = document.getElementById('collection');
    if (collection) collection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 50);
}

/* ---------- Notifications ---------- */

function showToast(title, message, icon = 'check') {
  if (!els.toastContainer) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="toast-icon"><i data-lucide="${icon}" aria-hidden="true"></i></span>
    <div><strong>${escapeHTML(title)}</strong><p>${escapeHTML(message)}</p></div>`;
  els.toastContainer.append(toast);
  refreshIcons();
  window.setTimeout(() => {
    toast.classList.add('is-leaving');
    window.setTimeout(() => toast.remove(), 320);
  }, 4200);
}

/* ---------- Événements ---------- */

function bindEvents() {
  document.addEventListener('click', handleDocumentClick);
  document.addEventListener('change', handleDocumentChange);
  document.addEventListener('input', handleDocumentInput);
  document.addEventListener('keydown', handleDocumentKeydown);

  if (els.sortSelect) {
    els.sortSelect.addEventListener('change', (event) => {
      state.sort = event.target.value;
      renderProducts();
    });
  }

  if (els.checkoutForm) {
    els.checkoutForm.addEventListener('submit', (event) => {
      event.preventDefault();
      confirmOrder();
    });
  }

  if (els.newsletterForm) {
    els.newsletterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = (els.newsletterEmail?.value || '').trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        showToast('Adresse e-mail invalide', 'Vérifiez votre adresse pour rejoindre le Club.', 'alert-circle');
        if (els.newsletterEmail) els.newsletterEmail.focus();
        return;
      }
      showToast('Bienvenue au Club LuxeCoffee', 'Votre inscription est confirmée. À très vite pour l’extraordinaire.', 'sparkles');
      els.newsletterForm.reset();
    });
  }

  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY) {
      state.cart = normalizeCart(event.newValue);
      renderCart();
    }
  });
}

function handleDocumentClick(event) {
  const actionElement = event.target.closest('[data-action]');
  if (!actionElement) return;
  const action = actionElement.dataset.action;

  switch (action) {
    case 'open-cart':
      openCart();
      break;
    case 'close-cart':
      closeCart();
      break;
    case 'open-product':
      event.preventDefault();
      openProduct(actionElement.dataset.productId);
      break;
    case 'close-product':
      closeProduct();
      break;
    case 'quick-add':
      event.preventDefault();
      quickAdd(actionElement.dataset.productId);
      break;
    case 'select-option':
      selectProductOption(actionElement.dataset.optionId);
      break;
    case 'select-grind':
      selectProductGrind(actionElement.dataset.grind);
      break;
    case 'product-qty-minus':
      changeProductQty(-1);
      break;
    case 'product-qty-plus':
      changeProductQty(1);
      break;
    case 'add-to-cart':
      addActiveProductToCart();
      break;
    case 'cart-minus':
      updateCartQty(actionElement.dataset.key, -1);
      break;
    case 'cart-plus':
      updateCartQty(actionElement.dataset.key, 1);
      break;
    case 'cart-remove':
      removeCartLine(actionElement.dataset.key);
      break;
    case 'open-checkout':
      openCheckout();
      break;
    case 'close-checkout':
      closeCheckout();
      break;
    case 'confirm-order':
      confirmOrder();
      break;
    case 'whatsapp-order':
      whatsappOrder();
      break;
    case 'continue-shopping':
      continueShopping();
      break;
    case 'filter':
      setCategory(actionElement.dataset.category);
      break;
    case 'jump-category':
      jumpToCategory(actionElement.dataset.category);
      break;
    case 'toggle-menu':
      openMenu();
      break;
    case 'close-menu':
      closeMenu();
      break;
    case 'social':
      showToast('Bientôt disponible', `Notre présence ${actionElement.dataset.platform || ''} arrive prochainement.`, 'instagram');
      break;
    default:
      break;
  }
}

function handleDocumentChange(event) {
  const target = event.target;
  if (target.matches('input[name="payment"]')) {
    els.cardFields.hidden = target.value !== 'card';
    renderCheckoutSummary();
    clearFormErrors();
  }
}

function handleDocumentInput(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  if (target.id === 'card-number') {
    const digits = target.value.replace(/\D/g, '').slice(0, 16);
    target.value = digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  } else if (target.id === 'card-expiry') {
    const digits = target.value.replace(/\D/g, '').slice(0, 4);
    target.value = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  } else if (target.id === 'card-cvv') {
    target.value = target.value.replace(/\D/g, '').slice(0, 4);
  }

  if (els.checkoutForm && els.checkoutForm.contains(target)) {
    clearFieldError(target);
  }
}

function handleDocumentKeydown(event) {
  if (event.key === 'Escape') {
    const layer = getActiveLayer();
    if (!layer) return;
    event.preventDefault();
    if (layer === els.checkoutModal) closeCheckout();
    else if (layer === els.productModal) closeProduct();
    else if (layer === els.cartDrawer) closeCart();
    else if (layer === els.mobileMenu) closeMenu();
    return;
  }
  if (event.key === 'Tab') trapFocus(event);
}

/* ---------- Reveal ---------- */

function observeReveals() {
  const elements = $$('.reveal');
  if (!('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  elements.forEach((element) => observer.observe(element));
}

/* ============================================================
   Démarrage & exports pour les tests automatisés
   ============================================================ */

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    WHATSAPP_NUMBER,
    WHATSAPP_DISPLAY,
    SHIPPING_FEE,
    FREE_SHIPPING_THRESHOLD,
    STORAGE_KEY,
    CURRENCY,
    MAX_QTY,
    PRODUCTS,
    CATEGORIES,
    CATEGORY_LABELS,
    WEIGHT_OPTIONS,
    CAPSULE_OPTIONS,
    GRIND_OPTIONS,
    formatMAD,
    escapeHTML,
    cleanText,
    getProductById,
    getProductOptions,
    getBasePrice,
    getPrice,
    getDefaultSelection,
    getOptionLabel,
    formatLineOptions,
    createCartLine,
    addLineToCart,
    updateLineQty,
    removeLine,
    getCartCount,
    computeSubtotal,
    getShipping,
    computeTotals,
    getShippingMessage,
    normalizeCart,
    normalizePhone,
    isValidMoroccanPhone,
    getPaymentLabel,
    luhnCheck,
    validateCustomer,
    generateOrderNumber,
    buildWhatsAppMessage,
    buildWhatsAppUrl
  };
}


