/**
 * ============================================================================
 * LUXECOFFEE — Application E-Commerce & Logique Métier (Vanilla JS)
 * Devise : Dirham Marocain (MAD)
 * ============================================================================
 */

const WHATSAPP_NUMBER = "212600000000";
const FREE_SHIPPING_THRESHOLD = 300;
const STANDARD_SHIPPING_FEE = 30;
const CART_STORAGE_KEY = "luxecoffee_cart_v1";

/**
 * Options disponibles selon le type de produit
 */
const WEIGHT_OPTIONS = ["250g", "500g", "1kg"];
const GRIND_OPTIONS = [
  "Expresso",
  "Filtre",
  "Presse Française",
  "Cafetière Italienne"
];
const CAPSULE_OPTIONS = ["Boîte de 10", "Boîte de 30", "Boîte de 50"];

/**
 * Multiplicateurs de prix selon le poids ou le coffret de capsules
 * Permet un calcul dynamique exact et avantageux sur les grands formats
 */
const FORMAT_MULTIPLIERS = {
  "250g": 1,
  "500g": 1.9,
  "1kg": 3.6,
  "Boîte de 10": 1,
  "Boîte de 30": 2.8,
  "Boîte de 50": 4.4,
  "10": 1,
  "30": 2.8,
  "50": 4.4
};

/**
 * Catalogue des 9 Grands Crus LuxeCoffee (Prix de base entre 85 MAD et 290 MAD)
 * Toutes les images Unsplash sont vérifiées (HTTP 200)
 */
const PRODUCTS = [
  {
    id: "lc-ethiopie-yirgacheffe",
    name: "Éthiopie Yirgacheffe Grand Cru",
    category: "Café en Grains",
    origin: "Éthiopie · Région Gedeo (2 100m)",
    basePrice: 120,
    intensity: 6,
    maxIntensity: 10,
    notes: ["Jasmin blanc", "Bergamote", "Pêche de vigne"],
    roast: "Torréfaction Blonde Robe de Moine",
    badge: "Récolte d'Altitude",
    description:
      "Un arabica lavé d'une élégance florale rare, cultivé sous ombrage naturel dans le berceau historique du café.",
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1000&q=85"
  },
  {
    id: "lc-colombie-geisha",
    name: "Colombie Geisha Réserve Impériale",
    category: "Café en Grains",
    origin: "Colombie · Finca Huila (1 950m)",
    basePrice: 195,
    intensity: 5,
    maxIntensity: 10,
    notes: ["Fleur d'oranger", "Miel d'acacia", "Mandarine"],
    roast: "Torréfaction Légère Artisanale",
    badge: "Micro-Lot Rare",
    description:
      "Variété botanique mythique aux arômes cristallins d'agrumes doux et à la longueur en bouche soyeuse.",
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1000&q=85"
  },
  {
    id: "lc-blue-mountain",
    name: "Jamaïque Blue Mountain Prestige",
    category: "Café en Grains",
    origin: "Jamaïque · Blue Mountains (1 800m)",
    basePrice: 290,
    intensity: 7,
    maxIntensity: 10,
    notes: ["Cacao fin", "Noisette grillée", "Velours sucré"],
    roast: "Torréfaction Médium Équilibrée",
    badge: "Cru Légendaire",
    description:
      "Considéré comme le caviar du café mondial. Un équilibre parfait dépourvu de toute amertume, certifié d'origine.",
    image:
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1000&q=85"
  },
  {
    id: "lc-espresso-royal-gold",
    name: "Espresso Royal Gold Signature",
    category: "Café Moulu",
    origin: "Assemblage Brésil Cerrado & Guatemala",
    basePrice: 115,
    intensity: 9,
    maxIntensity: 10,
    notes: ["Chocolat noir 85%", "Caramel salé", "Épices douces"],
    roast: "Torréfaction Brune Italienne",
    badge: "Signature Maison",
    description:
      "Notre assemblage emblématique au corps dense et à la crema dorée persistante, moulu sur-mesure selon votre cafetière.",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=85"
  },
  {
    id: "lc-kenya-nyeri",
    name: "Kenya AA Nyeri Noir Intense",
    category: "Café Moulu",
    origin: "Kenya · Versants du Mont Kenya (1 900m)",
    basePrice: 135,
    intensity: 8,
    maxIntensity: 10,
    notes: ["Cassis sauvage", "Pamplemousse rose", "Cèdre"],
    roast: "Torréfaction Médium-Ambrée",
    badge: "Grade AA Supérieur",
    description:
      "Un café racé et vibrant, réputé pour son attaque fruitée intense et sa finale chocolatée profonde.",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=85"
  },
  {
    id: "lc-moka-sidamo",
    name: "Moka Sidamo Velours d'Orient",
    category: "Café Moulu",
    origin: "Éthiopie · Haut-Plateau Sidamo (1 850m)",
    basePrice: 95,
    intensity: 7,
    maxIntensity: 10,
    notes: ["Cardamome subtile", "Abricot confit", "Praliné"],
    roast: "Torréfaction Traditionnelle",
    badge: "Best-Seller Maroc",
    description:
      "Un moka rond et envoûtant aux notes chaleureuses d'épices douces et de fruits secs, idéal à toute heure.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=85"
  },
  {
    id: "lc-capsules-or-intense",
    name: "Capsules Or Intense N°10",
    category: "Capsules Compatibles Nespresso",
    origin: "Arabica Royal & Robusta des Indes",
    basePrice: 85,
    intensity: 10,
    maxIntensity: 10,
    notes: ["Cacao torréfié", "Pain grillé", "Réglisse noire"],
    roast: "Torréfaction Noire Ristretto",
    badge: "Intensité Maximale",
    description:
      "Capsules en aluminium hermétique compatibles Nespresso®. Un ristretto puissant à la texture sirupeuse.",
    image:
      "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=1000&q=85"
  },
  {
    id: "lc-capsules-diamant-noir",
    name: "Capsules Diamant Noir Ristretto",
    category: "Capsules Compatibles Nespresso",
    origin: "Colombie & Sumatra Mandheling",
    basePrice: 95,
    intensity: 9,
    maxIntensity: 10,
    notes: ["Fève de Tonka", "Poivre du Sichuan", "Moka corsé"],
    roast: "Torréfaction Intense",
    badge: "Édition Prestige",
    description:
      "L'alliance mystérieuse des terroirs volcaniques de Sumatra et de la finesse colombienne en capsule aluminium.",
    image:
      "https://images.unsplash.com/photo-1610889556528-9a770e32642f?auto=format&fit=crop&w=1000&q=85"
  },
  {
    id: "lc-capsules-emeraude-lungo",
    name: "Capsules Émeraude Lungo Floral",
    category: "Capsules Compatibles Nespresso",
    origin: "100% Arabica Éthiopie & Costa Rica",
    basePrice: 90,
    intensity: 6,
    maxIntensity: 10,
    notes: ["Jasmin", "Amande douce", "Agrumes confits"],
    roast: "Torréfaction Douce Veloutée",
    badge: "Lungo Gourmand",
    description:
      "Pensé pour une extraction longue et parfumée, ce cru révèle une douceur miellée et un bouquet floral délicat.",
    image:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=1000&q=85"
  }
];

/**
 * Calcule le prix unitaire exact en MAD selon le produit (ou prix de base) et le format choisi
 * @param {Object|number} productOrBasePrice - Objet produit ou prix de base numérique
 * @param {string} format - Ex: "250g", "500g", "1kg", "Boîte de 10", "Boîte de 30", "Boîte de 50"
 * @returns {number} Prix en MAD (entier arrondi aux 5 MAD ou à l'unité, sans NaN)
 */
function calculateUnitPrice(productOrBasePrice, format) {
  const basePrice =
    typeof productOrBasePrice === "number"
      ? productOrBasePrice
      : productOrBasePrice && typeof productOrBasePrice.basePrice === "number"
      ? productOrBasePrice.basePrice
      : 0;

  if (basePrice <= 0 || Number.isNaN(basePrice)) {
    return 0;
  }

  const multiplier = FORMAT_MULTIPLIERS[format] || 1;
  return Math.round(basePrice * multiplier);
}

/**
 * Calcule les totaux du panier et applique la règle de livraison :
 * - 30 MAD partout au Maroc si sous-total < 300 MAD
 * - 0 MAD (Livraison GRATUITE) dès 300 MAD d'achat
 * @param {Array} cartItems
 * @returns {Object} Détails financiers complets
 */
function calculateCartTotals(cartItems) {
  const items = Array.isArray(cartItems) ? cartItems : [];

  let subtotal = 0;
  let totalItemsCount = 0;

  for (const item of items) {
    const unitPrice = Number(item.unitPrice) || 0;
    const quantity = Math.max(0, parseInt(item.quantity, 10) || 0);
    subtotal += unitPrice * quantity;
    totalItemsCount += quantity;
  }

  subtotal = Math.round(subtotal);

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping =
    subtotal === 0 ? 0 : isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const total = subtotal + shipping;
  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal
  );
  const freeShippingProgress =
    subtotal <= 0
      ? 0
      : Math.min(
          100,
          Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
        );

  return {
    subtotal,
    shipping,
    total,
    remainingForFreeShipping,
    freeShippingProgress,
    isFreeShipping,
    totalItemsCount
  };
}

/**
 * Génère un numéro de suivi unique (ex: #LC-84920)
 * @returns {string}
 */
function generateTrackingNumber() {
  const randomDigits = Math.floor(10000 + Math.random() * 90000);
  return `#LC-${randomDigits}`;
}

/**
 * Génère le message et le lien WhatsApp proprement encodé
 * @param {Array} cartItems
 * @param {Object} customer
 * @param {string} trackingNumber
 * @returns {Object} { message, url }
 */
function generateWhatsAppOrderUrl(cartItems, customer, trackingNumber) {
  const totals = calculateCartTotals(cartItems);
  const ref = trackingNumber || generateTrackingNumber();

  const lines = [
    `✨ *COMMANDE LUXECOFFEE MAROC* ✨`,
    `Référence : *${ref}*`,
    `────────────────────────`,
    `*DÉTAIL DES ARTICLES :*`
  ];

  for (const item of cartItems) {
    const optionDetails = item.grind
      ? `${item.format} · Mouture ${item.grind}`
      : `${item.format}`;
    const lineTotal = item.unitPrice * item.quantity;
    lines.push(
      `• ${item.quantity}x *${item.name}* (${optionDetails}) — ${lineTotal} MAD`
    );
  }

  lines.push(`────────────────────────`);
  lines.push(`Sous-total : ${totals.subtotal} MAD`);
  lines.push(
    `Livraison : ${
      totals.isFreeShipping ? "GRATUITE (0 MAD)" : `${totals.shipping} MAD`
    }`
  );
  lines.push(`*TOTAL À PAYER : ${totals.total} MAD*`);
  lines.push(`────────────────────────`);
  lines.push(`*COORDONNÉES DE LIVRAISON :*`);
  lines.push(`👤 Client : ${customer.fullName || ""}`);
  lines.push(`📞 Téléphone : ${customer.phone || ""}`);
  lines.push(`🏙️ Ville : ${customer.city || ""}`);
  lines.push(`📍 Adresse : ${customer.address || ""}`);
  lines.push(`💳 Paiement : ${customer.paymentMethod || "Paiement à la livraison"}`);

  const message = lines.join("\n");
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;

  return { message, url, trackingNumber: ref, totals };
}

/**
 * ============================================================================
 * GESTION DE L'INTERFACE DOM (Exécutée uniquement dans le navigateur)
 * ============================================================================
 */
if (typeof window !== "undefined" && typeof document !== "undefined") {
  // État local de l'application
  const state = {
    selectedCategory: "Tous",
    searchQuery: "",
    sortBy: "featured",
    // Options sélectionnées sur chaque carte produit avant ajout au panier
    cardSelections: {},
    cart: []
  };

  // Initialisation des sélections par défaut pour chaque produit
  function initDefaultCardSelections() {
    for (const product of PRODUCTS) {
      if (product.category === "Capsules Compatibles Nespresso") {
        state.cardSelections[product.id] = {
          format: "Boîte de 10",
          grind: null
        };
      } else if (product.category === "Café Moulu") {
        state.cardSelections[product.id] = {
          format: "250g",
          grind: "Expresso"
        };
      } else {
        state.cardSelections[product.id] = {
          format: "250g",
          grind: null
        };
      }
    }
  }

  // Chargement du panier depuis le localStorage
  function loadCartFromStorage() {
    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          state.cart = parsed.filter(
            (item) =>
              item &&
              typeof item.unitPrice === "number" &&
              !Number.isNaN(item.unitPrice) &&
              item.quantity > 0
          );
        }
      }
    } catch (err) {
      state.cart = [];
    }
  }

  // Sauvegarde du panier dans le localStorage
  function saveCartToStorage() {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
    } catch (err) {
      // Ignore storage quota errors
    }
  }

  // Création de la barre visuelle d'intensité (sur 10)
  function renderIntensityBar(intensity, maxIntensity = 10) {
    let segmentsHtml = "";
    for (let i = 1; i <= maxIntensity; i++) {
      const statusClass = i <= intensity ? "filled" : "empty";
      segmentsHtml += `<span class="intensity-segment flex-1 ${statusClass}"></span>`;
    }
    return `
      <div class="space-y-1.5">
        <div class="flex items-center justify-between text-[11px]">
          <span class="uppercase tracking-wider text-luxe-muted">Intensité Aromatique</span>
          <span class="font-bold text-luxe-gold">${intensity}/${maxIntensity}</span>
        </div>
        <div class="flex items-center gap-1" aria-label="Intensité ${intensity} sur ${maxIntensity}">
          ${segmentsHtml}
        </div>
      </div>
    `;
  }

  // Filtrage et tri des produits
  function getFilteredProducts() {
    const query = state.searchQuery.trim().toLowerCase();

    const filtered = PRODUCTS.filter((product) => {
      const matchesCategory =
        state.selectedCategory === "Tous" ||
        product.category === state.selectedCategory;

      if (!matchesCategory) return false;
      if (!query) return true;

      const searchableText = [
        product.name,
        product.category,
        product.origin,
        product.description,
        ...product.notes
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });

    if (state.sortBy === "price-asc") {
      filtered.sort((a, b) => a.basePrice - b.basePrice);
    } else if (state.sortBy === "price-desc") {
      filtered.sort((a, b) => b.basePrice - a.basePrice);
    } else if (state.sortBy === "intensity-desc") {
      filtered.sort((a, b) => b.intensity - a.intensity);
    }

    return filtered;
  }

  // Rendu du catalogue de produits
  function renderProductsGrid() {
    const grid = document.getElementById("products-grid");
    const countLabel = document.getElementById("products-count-label");
    if (!grid) return;

    const products = getFilteredProducts();

    if (countLabel) {
      countLabel.textContent = `${products.length} Grand${
        products.length > 1 ? "s" : ""
      } Cru${products.length > 1 ? "s" : ""} d'Exception (${
        state.selectedCategory
      })`;
    }

    if (products.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center rounded-3xl bg-luxe-charcoal/50 border border-luxe-gold/20 p-8">
          <i class="fa-solid fa-mug-hot text-luxe-gold text-3xl mb-3"></i>
          <h3 class="font-serif text-xl font-bold text-luxe-cream mb-1">Aucun cru ne correspond à votre recherche</h3>
          <p class="text-xs sm:text-sm text-luxe-muted mb-5">Essayez un autre filtre ou réinitialisez votre recherche.</p>
          <button
            type="button"
            id="reset-filters-btn"
            class="px-6 py-2.5 rounded-full bg-gold-gradient text-luxe-black font-bold text-xs uppercase tracking-wider"
          >
            Voir toute la collection
          </button>
        </div>
      `;
      const resetBtn = document.getElementById("reset-filters-btn");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          state.selectedCategory = "Tous";
          state.searchQuery = "";
          const searchInput = document.getElementById("product-search-input");
          if (searchInput) searchInput.value = "";
          updateCategoryFilterButtons();
          renderProductsGrid();
        });
      }
      return;
    }

    grid.innerHTML = products
      .map((product) => {
        const selection = state.cardSelections[product.id] || {
          format:
            product.category === "Capsules Compatibles Nespresso"
              ? "Boîte de 10"
              : "250g",
          grind: product.category === "Café Moulu" ? "Expresso" : null
        };

        const currentPrice = calculateUnitPrice(product, selection.format);

        // Sélecteur de format : Poids (Grains/Moulu) ou Boîte (Capsules)
        const formatList =
          product.category === "Capsules Compatibles Nespresso"
            ? CAPSULE_OPTIONS
            : WEIGHT_OPTIONS;
        const formatLabel =
          product.category === "Capsules Compatibles Nespresso"
            ? "Coffret Capsules"
            : "Poids du Sachet";

        const formatButtonsHtml = formatList
          .map((fmt) => {
            const isActive = selection.format === fmt ? "active" : "";
            return `
              <button
                type="button"
                data-action="select-format"
                data-product-id="${product.id}"
                data-format="${fmt}"
                class="option-pill ${isActive} flex-1 py-1.5 px-2 rounded-lg text-xs text-center"
              >
                ${fmt}
              </button>
            `;
          })
          .join("");

        // Sélecteur de mouture (uniquement pour Café Moulu)
        let grindSelectorHtml = "";
        if (product.category === "Café Moulu") {
          const grindOptionsHtml = GRIND_OPTIONS.map((grind) => {
            const isActive = selection.grind === grind ? "active" : "";
            return `
              <button
                type="button"
                data-action="select-grind"
                data-product-id="${product.id}"
                data-grind="${grind}"
                class="option-pill ${isActive} py-1.5 px-2.5 rounded-lg text-[11px] text-center"
              >
                ${grind}
              </button>
            `;
          }).join("");

          grindSelectorHtml = `
            <div class="space-y-1.5 pt-1">
              <span class="block text-[11px] uppercase tracking-wider text-luxe-muted">
                Type de Mouture
              </span>
              <div class="grid grid-cols-2 gap-1.5">
                ${grindOptionsHtml}
              </div>
            </div>
          `;
        }

        const notesBadgesHtml = product.notes
          .map(
            (note) =>
              `<span class="px-2.5 py-0.5 rounded-full bg-luxe-black border border-luxe-gold/25 text-[11px] text-luxe-cream/90">${note}</span>`
          )
          .join("");

        return `
          <article
            class="product-card rounded-3xl overflow-hidden flex flex-col justify-between"
            data-product-card="${product.id}"
          >
            <div>
              <!-- Image Container -->
              <div class="relative h-60 overflow-hidden bg-luxe-black">
                <img
                  src="${product.image}"
                  alt="${product.name}"
                  loading="lazy"
                  class="product-image w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30"></div>

                <!-- Category & Prestige Badge -->
                <div class="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                  <span class="px-3 py-1 rounded-full bg-luxe-black/85 backdrop-blur-md border border-luxe-gold/40 text-[11px] font-semibold text-luxe-gold">
                    ${product.badge}
                  </span>
                  <span class="px-2.5 py-1 rounded-full bg-luxe-black/80 backdrop-blur-md text-[10px] uppercase tracking-wider text-luxe-cream/80 border border-white/10">
                    ${product.category}
                  </span>
                </div>

                <!-- Origin Pill -->
                <div class="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between">
                  <span class="text-xs text-luxe-cream/90 font-medium flex items-center gap-1.5 drop-shadow">
                    <i class="fa-solid fa-earth-africa text-luxe-gold text-xs"></i>
                    <span>${product.origin}</span>
                  </span>
                </div>
              </div>

              <!-- Card Body -->
              <div class="p-6 space-y-4">
                <div>
                  <h3 class="font-serif text-xl font-bold text-luxe-cream leading-snug">
                    ${product.name}
                  </h3>
                  <p class="text-xs text-luxe-muted mt-1.5 leading-relaxed">
                    ${product.description}
                  </p>
                </div>

                <!-- Aromatic Notes -->
                <div class="space-y-1.5">
                  <span class="block text-[10px] uppercase tracking-widest text-luxe-gold/90 font-semibold">
                    Notes Aromatiques
                  </span>
                  <div class="flex flex-wrap gap-1.5">
                    ${notesBadgesHtml}
                  </div>
                </div>

                <!-- Intensity Meter -->
                ${renderIntensityBar(product.intensity, product.maxIntensity)}

                <!-- Dynamic Customization Options -->
                <div class="pt-2 border-t border-white/10 space-y-3">
                  <div class="space-y-1.5">
                    <span class="block text-[11px] uppercase tracking-wider text-luxe-muted">
                      ${formatLabel}
                    </span>
                    <div class="flex items-center gap-2">
                      ${formatButtonsHtml}
                    </div>
                  </div>

                  ${grindSelectorHtml}
                </div>
              </div>
            </div>

            <!-- Card Footer: Dynamic Price & Add to Cart -->
            <div class="px-6 pb-6 pt-3 border-t border-white/10 flex items-center justify-between gap-4 bg-black/25">
              <div>
                <span class="text-[10px] uppercase tracking-wider text-luxe-muted block">
                  Prix (${selection.format})
                </span>
                <span
                  id="price-display-${product.id}"
                  class="font-serif text-2xl font-bold text-luxe-gold inline-block"
                >
                  ${currentPrice} MAD
                </span>
              </div>

              <button
                type="button"
                data-action="add-to-cart"
                data-product-id="${product.id}"
                class="px-5 py-3 rounded-full bg-gold-gradient text-luxe-black font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <i class="fa-solid fa-plus text-[11px]"></i>
                <span>Ajouter</span>
              </button>
            </div>
          </article>
        `;
      })
      .join("");
  }

  // Met à jour l'état visuel des boutons de filtre de catégorie
  function updateCategoryFilterButtons() {
    const buttons = document.querySelectorAll("#category-filters [data-category]");
    buttons.forEach((btn) => {
      const cat = btn.getAttribute("data-category");
      if (cat === state.selectedCategory) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  // Ajout d'un article au panier avec ses options personnalisées
  function addToCart(productId) {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    const selection = state.cardSelections[productId] || {
      format:
        product.category === "Capsules Compatibles Nespresso"
          ? "Boîte de 10"
          : "250g",
      grind: product.category === "Café Moulu" ? "Expresso" : null
    };

    const unitPrice = calculateUnitPrice(product, selection.format);
    const cartItemKey = `${product.id}__${selection.format}__${
      selection.grind || "none"
    }`;

    const existingItem = state.cart.find((item) => item.key === cartItemKey);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      state.cart.push({
        key: cartItemKey,
        productId: product.id,
        name: product.name,
        category: product.category,
        image: product.image,
        format: selection.format,
        grind: selection.grind,
        unitPrice,
        quantity: 1
      });
    }

    saveCartToStorage();
    renderCartUI();
    showToast(
      `${product.name} (${selection.format}${
        selection.grind ? " · " + selection.grind : ""
      }) ajouté au panier.`
    );
  }

  // Modification de la quantité d'un article dans le panier (+1 / -1)
  function updateCartItemQuantity(itemKey, delta) {
    const idx = state.cart.findIndex((item) => item.key === itemKey);
    if (idx === -1) return;

    state.cart[idx].quantity += delta;
    if (state.cart[idx].quantity <= 0) {
      state.cart.splice(idx, 1);
    }

    saveCartToStorage();
    renderCartUI();
  }

  // Suppression d'un article du panier
  function removeCartItem(itemKey) {
    state.cart = state.cart.filter((item) => item.key !== itemKey);
    saveCartToStorage();
    renderCartUI();
  }

  // Vider entièrement le panier
  function clearCart() {
    state.cart = [];
    saveCartToStorage();
    renderCartUI();
  }

  // Mise à jour complète de l'interface du Panier (Drawer + Badges + Barre de livraison)
  function renderCartUI() {
    const totals = calculateCartTotals(state.cart);

    // 1. Header Badges
    const countBadge = document.getElementById("cart-count-badge");
    const headerTotal = document.getElementById("header-cart-total");
    if (countBadge) countBadge.textContent = String(totals.totalItemsCount);
    if (headerTotal) headerTotal.textContent = `${totals.subtotal} MAD`;

    // 2. Barre de progression de livraison gratuite (Seuil = 300 MAD)
    const progressText = document.getElementById("shipping-progress-text");
    const progressPercent = document.getElementById("shipping-progress-percent");
    const progressBar = document.getElementById("shipping-progress-bar");

    if (progressText && progressPercent && progressBar) {
      progressBar.style.width = `${totals.freeShippingProgress}%`;
      progressPercent.textContent = `${totals.freeShippingProgress}%`;

      if (totals.subtotal === 0) {
        progressText.innerHTML = `Livraison Express <strong class="text-luxe-gold">GRATUITE dès ${FREE_SHIPPING_THRESHOLD} MAD</strong> d'achat !`;
      } else if (totals.isFreeShipping) {
        progressText.innerHTML = `<i class="fa-solid fa-circle-check text-luxe-gold mr-1"></i> Félicitations ! Vous profitez de la <strong class="text-luxe-gold">livraison GRATUITE</strong> !`;
      } else {
        progressText.innerHTML = `Plus que <strong class="text-luxe-gold">${totals.remainingForFreeShipping} MAD</strong> pour profiter de la livraison gratuite !`;
      }
    }

    // 3. Liste des articles dans le panier
    const container = document.getElementById("cart-items-container");
    const openCheckoutBtn = document.getElementById("open-checkout-btn");
    const clearCartBtn = document.getElementById("clear-cart-btn");

    if (container) {
      if (state.cart.length === 0) {
        container.innerHTML = `
          <div class="h-full flex flex-col items-center justify-center text-center py-14 px-4">
            <div class="w-16 h-16 rounded-full bg-luxe-black border border-luxe-gold/30 flex items-center justify-center text-luxe-gold text-2xl mb-4">
              <i class="fa-solid fa-bag-shopping"></i>
            </div>
            <h3 class="font-serif text-lg font-bold text-luxe-cream mb-1">Votre panier est vide</h3>
            <p class="text-xs text-luxe-muted max-w-xs mb-6">
              Découvrez nos cafés de spécialité en grains, moulus à la demande et capsules compatibles Nespresso®.
            </p>
            <button
              type="button"
              id="empty-cart-explore-btn"
              class="px-6 py-2.5 rounded-full bg-gold-gradient text-luxe-black font-bold text-xs uppercase tracking-wider"
            >
              Découvrir la Collection
            </button>
          </div>
        `;
        const exploreBtn = document.getElementById("empty-cart-explore-btn");
        if (exploreBtn) {
          exploreBtn.addEventListener("click", closeCartDrawer);
        }
      } else {
        container.innerHTML = state.cart
          .map((item) => {
            const lineSubtotal = item.unitPrice * item.quantity;
            return `
              <div class="p-3.5 rounded-2xl bg-luxe-black border border-luxe-gold/20 flex gap-3.5 items-center">
                <img
                  src="${item.image}"
                  alt="${item.name}"
                  class="w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-white/10"
                />
                <div class="flex-grow min-w-0">
                  <div class="flex items-start justify-between gap-2">
                    <h4 class="font-serif text-sm font-bold text-luxe-cream truncate">
                      ${item.name}
                    </h4>
                    <button
                      type="button"
                      data-cart-action="remove"
                      data-item-key="${item.key}"
                      aria-label="Supprimer cet article"
                      class="text-luxe-muted hover:text-red-400 text-xs transition-colors"
                    >
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                  </div>

                  <div class="flex flex-wrap items-center gap-1.5 mt-1 text-[11px] text-luxe-muted">
                    <span class="px-2 py-0.5 rounded bg-luxe-charcoal border border-luxe-gold/25 text-luxe-gold">
                      ${item.format}
                    </span>
                    ${
                      item.grind
                        ? `<span class="px-2 py-0.5 rounded bg-luxe-charcoal border border-white/10 text-luxe-cream/85">Mouture : ${item.grind}</span>`
                        : ""
                    }
                  </div>

                  <div class="flex items-center justify-between mt-2.5">
                    <!-- Quantity Controls -->
                    <div class="inline-flex items-center rounded-full bg-luxe-charcoal border border-white/15">
                      <button
                        type="button"
                        data-cart-action="decrease"
                        data-item-key="${item.key}"
                        aria-label="Diminuer la quantité"
                        class="w-7 h-7 flex items-center justify-center text-xs text-luxe-cream hover:text-luxe-gold"
                      >
                        <i class="fa-solid fa-minus text-[10px]"></i>
                      </button>
                      <span class="px-2.5 text-xs font-bold text-luxe-cream">${
                        item.quantity
                      }</span>
                      <button
                        type="button"
                        data-cart-action="increase"
                        data-item-key="${item.key}"
                        aria-label="Augmenter la quantité"
                        class="w-7 h-7 flex items-center justify-center text-xs text-luxe-cream hover:text-luxe-gold"
                      >
                        <i class="fa-solid fa-plus text-[10px]"></i>
                      </button>
                    </div>

                    <div class="text-right">
                      <span class="text-xs text-luxe-muted block">${
                        item.unitPrice
                      } MAD / unité</span>
                      <span class="font-serif text-sm font-bold text-luxe-gold">${lineSubtotal} MAD</span>
                    </div>
                  </div>
                </div>
              </div>
            `;
          })
          .join("");
      }
    }

    // 4. Totaux financiers du Drawer
    const subtotalEl = document.getElementById("cart-subtotal");
    const shippingEl = document.getElementById("cart-shipping");
    const totalEl = document.getElementById("cart-total");

    if (subtotalEl) subtotalEl.textContent = `${totals.subtotal} MAD`;
    if (shippingEl) {
      shippingEl.innerHTML =
        totals.subtotal === 0
          ? "0 MAD"
          : totals.isFreeShipping
          ? `<span class="text-luxe-gold font-bold">GRATUITE (0 MAD)</span>`
          : `${totals.shipping} MAD`;
    }
    if (totalEl) totalEl.textContent = `${totals.total} MAD`;

    if (openCheckoutBtn) {
      openCheckoutBtn.disabled = state.cart.length === 0;
    }
    if (clearCartBtn) {
      clearCartBtn.style.display = state.cart.length === 0 ? "none" : "block";
    }
  }

  // Ouverture / Fermeture du Panier Latéral
  function openCartDrawer() {
    const drawer = document.getElementById("cart-drawer");
    const backdrop = document.getElementById("cart-backdrop");
    if (drawer && backdrop) {
      drawer.classList.add("open");
      backdrop.classList.add("open");
    }
  }

  function closeCartDrawer() {
    const drawer = document.getElementById("cart-drawer");
    const backdrop = document.getElementById("cart-backdrop");
    if (drawer && backdrop) {
      drawer.classList.remove("open");
      backdrop.classList.remove("open");
    }
  }

  // Ouverture / Fermeture de la Modale de Checkout
  function openCheckoutModal() {
    if (state.cart.length === 0) return;
    closeCartDrawer();

    const totals = calculateCartTotals(state.cart);
    const modal = document.getElementById("checkout-modal");
    const formView = document.getElementById("checkout-form-view");
    const successView = document.getElementById("checkout-success-view");
    const errorBox = document.getElementById("checkout-error");

    const countEl = document.getElementById("checkout-summary-count");
    const shippingEl = document.getElementById("checkout-summary-shipping");
    const totalEl = document.getElementById("checkout-summary-total");

    if (countEl) {
      countEl.textContent = `${totals.totalItemsCount} article${
        totals.totalItemsCount > 1 ? "s" : ""
      }`;
    }
    if (shippingEl) {
      shippingEl.textContent = totals.isFreeShipping
        ? "Livraison GRATUITE (0 MAD)"
        : `Livraison ${totals.shipping} MAD`;
    }
    if (totalEl) {
      totalEl.textContent = `${totals.total} MAD`;
    }

    if (formView) formView.classList.remove("hidden");
    if (successView) successView.classList.add("hidden");
    if (errorBox) errorBox.classList.add("hidden");
    if (modal) modal.classList.add("open");
  }

  function closeCheckoutModal() {
    const modal = document.getElementById("checkout-modal");
    if (modal) modal.classList.remove("open");
  }

  // Lecture et validation des coordonnées du formulaire Checkout
  function validateAndGetCustomerData() {
    const fullName = (
      document.getElementById("customer-name")?.value || ""
    ).trim();
    const phone = (
      document.getElementById("customer-phone")?.value || ""
    ).trim();
    const city = (document.getElementById("customer-city")?.value || "").trim();
    const address = (
      document.getElementById("customer-address")?.value || ""
    ).trim();
    const paymentRadio = document.querySelector(
      'input[name="paymentMethod"]:checked'
    );
    const paymentMethod = paymentRadio
      ? paymentRadio.value
      : "Paiement à la livraison (Cash on Delivery)";

    const errorBox = document.getElementById("checkout-error");
    const errorText = document.getElementById("checkout-error-text");

    if (!fullName || !phone || !city || !address) {
      if (errorBox && errorText) {
        errorText.textContent =
          "Veuillez renseigner votre nom complet, téléphone, ville et adresse de livraison.";
        errorBox.classList.remove("hidden");
      }
      return null;
    }

    if (phone.replace(/\s+/g, "").length < 8) {
      if (errorBox && errorText) {
        errorText.textContent =
          "Veuillez saisir un numéro de téléphone valide.";
        errorBox.classList.remove("hidden");
      }
      return null;
    }

    if (errorBox) errorBox.classList.add("hidden");
    return { fullName, phone, city, address, paymentMethod };
  }

  // Affichage de l'écran de confirmation sur le site
  function displaySiteOrderConfirmation(customer, trackingNumber) {
    const totals = calculateCartTotals(state.cart);
    const formView = document.getElementById("checkout-form-view");
    const successView = document.getElementById("checkout-success-view");
    const trackingEl = document.getElementById("order-tracking-number");
    const detailsEl = document.getElementById("order-confirmation-details");

    if (trackingEl) trackingEl.textContent = trackingNumber;

    if (detailsEl) {
      const itemsListHtml = state.cart
        .map(
          (item) => `
            <div class="flex items-center justify-between py-1.5 border-b border-white/5">
              <span>
                <strong class="text-luxe-gold">${item.quantity}x</strong> ${
            item.name
          }
                <span class="text-luxe-muted text-xs">(${item.format}${
            item.grind ? " · " + item.grind : ""
          })</span>
              </span>
              <span class="font-semibold text-luxe-cream">${
                item.unitPrice * item.quantity
              } MAD</span>
            </div>
          `
        )
        .join("");

      detailsEl.innerHTML = `
        <div class="space-y-1 pb-3 border-b border-white/10">
          <p><span class="text-luxe-muted">Client :</span> <strong class="text-luxe-cream">${
            customer.fullName
          }</strong> (${customer.phone})</p>
          <p><span class="text-luxe-muted">Destination :</span> ${
            customer.address
          }, <strong class="text-luxe-cream">${customer.city}</strong></p>
          <p><span class="text-luxe-muted">Mode de règlement :</span> <span class="text-luxe-gold">${
            customer.paymentMethod
          }</span></p>
        </div>
        <div class="space-y-1 max-h-40 overflow-y-auto">
          ${itemsListHtml}
        </div>
        <div class="pt-2 space-y-1 text-xs">
          <div class="flex justify-between text-luxe-muted">
            <span>Sous-total</span>
            <span>${totals.subtotal} MAD</span>
          </div>
          <div class="flex justify-between text-luxe-muted">
            <span>Frais de livraison</span>
            <span>${
              totals.isFreeShipping
                ? "GRATUITE (0 MAD)"
                : `${totals.shipping} MAD`
            }</span>
          </div>
          <div class="flex justify-between text-sm font-bold text-luxe-gold pt-1 border-t border-white/10">
            <span>Total Confirmé</span>
            <span>${totals.total} MAD</span>
          </div>
        </div>
      `;
    }

    if (formView) formView.classList.add("hidden");
    if (successView) successView.classList.remove("hidden");

    // Vider le panier après validation
    clearCart();
  }

  // Notification Toast élégante
  function showToast(message) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className =
      "toast-item pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl bg-luxe-charcoal border border-luxe-gold/60 text-luxe-cream text-xs sm:text-sm shadow-2xl";
    toast.innerHTML = `
      <i class="fa-solid fa-circle-check text-luxe-gold"></i>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.25s ease";
      setTimeout(() => toast.remove(), 260);
    }, 2800);
  }

  // Attachement de tous les écouteurs d'événements
  function bindEvents() {
    // 1. Délégation d'événements sur la grille de produits (Format, Mouture, Ajout au panier)
    const productsGrid = document.getElementById("products-grid");
    if (productsGrid) {
      productsGrid.addEventListener("click", (event) => {
        const btn = event.target.closest("button[data-action]");
        if (!btn) return;

        const action = btn.getAttribute("data-action");
        const productId = btn.getAttribute("data-product-id");
        if (!productId) return;

        if (action === "select-format") {
          const newFormat = btn.getAttribute("data-format");
          if (newFormat && state.cardSelections[productId]) {
            state.cardSelections[productId].format = newFormat;
            renderProductsGrid();
            const priceEl = document.getElementById(
              `price-display-${productId}`
            );
            if (priceEl) priceEl.classList.add("price-updated");
          }
        } else if (action === "select-grind") {
          const newGrind = btn.getAttribute("data-grind");
          if (newGrind && state.cardSelections[productId]) {
            state.cardSelections[productId].grind = newGrind;
            renderProductsGrid();
          }
        } else if (action === "add-to-cart") {
          addToCart(productId);
        }
      });
    }

    // 2. Filtres de catégories
    const categoryFilters = document.getElementById("category-filters");
    if (categoryFilters) {
      categoryFilters.addEventListener("click", (event) => {
        const btn = event.target.closest("button[data-category]");
        if (!btn) return;
        state.selectedCategory = btn.getAttribute("data-category") || "Tous";
        updateCategoryFilterButtons();
        renderProductsGrid();
      });
    }

    // Liens de navigation qui filtrent directement une catégorie
    document.querySelectorAll("[data-nav-filter]").forEach((link) => {
      link.addEventListener("click", () => {
        const targetCategory = link.getAttribute("data-nav-filter");
        if (targetCategory) {
          state.selectedCategory = targetCategory;
          updateCategoryFilterButtons();
          renderProductsGrid();
        }
      });
    });

    // 3. Recherche instantanée & Tri
    const searchInput = document.getElementById("product-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        state.searchQuery = e.target.value || "";
        renderProductsGrid();
      });
    }

    const sortSelect = document.getElementById("product-sort-select");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        state.sortBy = e.target.value || "featured";
        renderProductsGrid();
      });
    }

    // 4. Contrôles du Panier Latéral
    const openCartBtn = document.getElementById("open-cart-btn");
    const closeCartBtn = document.getElementById("close-cart-btn");
    const cartBackdrop = document.getElementById("cart-backdrop");
    const clearCartBtn = document.getElementById("clear-cart-btn");
    const cartItemsContainer = document.getElementById("cart-items-container");

    if (openCartBtn) openCartBtn.addEventListener("click", openCartDrawer);
    if (closeCartBtn) closeCartBtn.addEventListener("click", closeCartDrawer);
    if (cartBackdrop) cartBackdrop.addEventListener("click", closeCartDrawer);
    if (clearCartBtn) clearCartBtn.addEventListener("click", clearCart);

    if (cartItemsContainer) {
      cartItemsContainer.addEventListener("click", (event) => {
        const btn = event.target.closest("button[data-cart-action]");
        if (!btn) return;
        const action = btn.getAttribute("data-cart-action");
        const itemKey = btn.getAttribute("data-item-key");
        if (!itemKey) return;

        if (action === "increase") {
          updateCartItemQuantity(itemKey, 1);
        } else if (action === "decrease") {
          updateCartItemQuantity(itemKey, -1);
        } else if (action === "remove") {
          removeCartItem(itemKey);
        }
      });
    }

    // 5. Contrôles de la Modale de Checkout
    const openCheckoutBtn = document.getElementById("open-checkout-btn");
    const closeCheckoutBtn = document.getElementById("close-checkout-btn");
    const closeSuccessModalBtn = document.getElementById(
      "close-success-modal-btn"
    );
    const confirmSiteOrderBtn = document.getElementById(
      "confirm-site-order-btn"
    );
    const confirmWhatsappOrderBtn = document.getElementById(
      "confirm-whatsapp-order-btn"
    );

    if (openCheckoutBtn) {
      openCheckoutBtn.addEventListener("click", openCheckoutModal);
    }
    if (closeCheckoutBtn) {
      closeCheckoutBtn.addEventListener("click", closeCheckoutModal);
    }
    if (closeSuccessModalBtn) {
      closeSuccessModalBtn.addEventListener("click", closeCheckoutModal);
    }

    // Affichage dynamique des champs de carte bancaire simulée
    document
      .querySelectorAll('input[name="paymentMethod"]')
      .forEach((radio) => {
        radio.addEventListener("change", () => {
          const cardBox = document.getElementById("simulated-card-fields");
          if (!cardBox) return;
          if (radio.value.includes("Carte Bancaire") && radio.checked) {
            cardBox.classList.remove("hidden");
          } else {
            cardBox.classList.add("hidden");
          }
        });
      });

    // Validation Option 1 : Confirmer la commande sur le site
    if (confirmSiteOrderBtn) {
      confirmSiteOrderBtn.addEventListener("click", () => {
        const customer = validateAndGetCustomerData();
        if (!customer) return;
        const trackingNumber = generateTrackingNumber();
        displaySiteOrderConfirmation(customer, trackingNumber);
      });
    }

    // Validation Option 2 : Commander en 1 clic via WhatsApp
    if (confirmWhatsappOrderBtn) {
      confirmWhatsappOrderBtn.addEventListener("click", () => {
        const customer = validateAndGetCustomerData();
        if (!customer) return;
        const trackingNumber = generateTrackingNumber();
        const { url } = generateWhatsAppOrderUrl(
          state.cart,
          customer,
          trackingNumber
        );
        window.open(url, "_blank", "noopener,noreferrer");
        displaySiteOrderConfirmation(customer, trackingNumber);
      });
    }

    // 6. Menu Mobile
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });
      mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenu.classList.add("hidden");
        });
      });
    }
  }

  // Initialisation au chargement du DOM
  document.addEventListener("DOMContentLoaded", () => {
    initDefaultCardSelections();
    loadCartFromStorage();
    renderProductsGrid();
    renderCartUI();
    bindEvents();
  });
}

// Export pour les tests automatisés Node.js (Phase 6 QA)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    WHATSAPP_NUMBER,
    FREE_SHIPPING_THRESHOLD,
    STANDARD_SHIPPING_FEE,
    WEIGHT_OPTIONS,
    GRIND_OPTIONS,
    CAPSULE_OPTIONS,
    FORMAT_MULTIPLIERS,
    PRODUCTS,
    calculateUnitPrice,
    calculateCartTotals,
    generateTrackingNumber,
    generateWhatsAppOrderUrl
  };
}
