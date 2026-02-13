const CART_KEY = "la105-cart";
const WHATSAPP_FALLBACK = "573204132725";
const WHATSAPP_OVERRIDE = "573204132725";
const ASSET_BASE = (() => {
  const path = window.location.pathname.replace(/\\/g, "/");
  return path.includes("/pages/") ? "../" : "";
})();

function resolveAssetPath(src) {
  if (!src) return src;
  if (/^(https?:|data:|\/)/i.test(src)) return src;
  return `${ASSET_BASE}${src}`;
}

// Datos del menú embebidos para funcionamiento sin servidor
const MENU_DATA = {
  config: {
    nombreRestaurante: "Pizzería La 105",
    slogan: "Calle 105 #16-19, El Rocio",
    whatsapp: "573204132725",
    telefono: "320 413 2725",
    horario: "",
    diaCerrado: "",
    desarrolladoPor: "",
  },
  categorias: [
    {
      id: "pizzas-especiales",
      nombre: "Especialidades de la casa",
      emoji: "🍕",
      icono: "",
      subtitulo: "Masa artesanal, queso fundido y sabor generoso",
      orden: 1,
      visible: true,
    },
    {
      id: "pizzas-tradicionales",
      nombre: "Clasicas del barrio",
      emoji: "🍕",
      icono: "",
      subtitulo: "Porcion $7.000 | Rueda $70.000",
      orden: 2,
      visible: true,
    },
    {
      id: "pizzetas",
      nombre: "Pizzetas al centro",
      emoji: "📏",
      icono: "",
      subtitulo: "Para compartir sin afan",
      orden: 3,
      visible: true,
    },
    {
      id: "panzerottis",
      nombre: "Panzerottis al horno",
      emoji: "🥟",
      icono: "",
      subtitulo: "Horneado lento, 30 minutos de espera",
      orden: 4,
      visible: true,
    },
    {
      id: "adicionales",
      nombre: "Adicionales de mesa",
      emoji: "➕",
      icono: "",
      subtitulo: "Cada adicional $5.000",
      orden: 5,
      visible: true,
    },
  ],
  productos: [
    {
      id: 1,
      nombre: "Choripizza",
      descripcion:
        "Porción. Maíz, chorizo, cabano, carne desmechada, pollo desmechado y huevo de codorniz.",
      precio: 7500,
      categoria: "pizzas-especiales",
      badge: null,
      orden: 1,
      visible: true,
      imagen: null,
    },
    {
      id: 2,
      nombre: "Choripizza",
      descripcion:
        "Rueda. Maíz, chorizo, cabano, carne desmechada, pollo desmechado y huevo de codorniz.",
      precio: 75000,
      categoria: "pizzas-especiales",
      badge: null,
      orden: 2,
      visible: true,
      imagen: null,
    },
    {
      id: 3,
      nombre: "Mixta",
      descripcion:
        "Porción. Tocineta, carne molida, maíz, pollo desmechado y chorizo.",
      precio: 7500,
      categoria: "pizzas-especiales",
      badge: null,
      orden: 3,
      visible: true,
      imagen: null,
    },
    {
      id: 4,
      nombre: "Mixta",
      descripcion:
        "Rueda. Tocineta, carne molida, maíz, pollo desmechado y chorizo.",
      precio: 75000,
      categoria: "pizzas-especiales",
      badge: null,
      orden: 4,
      visible: true,
      imagen: null,
    },
    {
      id: 5,
      nombre: "Mexicana",
      descripcion:
        "Porción. Picante fuerte, pimentón, tomate, cebolla, carne molida y cabano.",
      precio: 7000,
      categoria: "pizzas-tradicionales",
      badge: null,
      orden: 1,
      visible: true,
      imagen: null,
    },
    {
      id: 6,
      nombre: "Mexicana",
      descripcion:
        "Rueda. Picante fuerte, pimentón, tomate, cebolla, carne molida y cabano.",
      precio: 70000,
      categoria: "pizzas-tradicionales",
      badge: null,
      orden: 2,
      visible: true,
      imagen: null,
    },
    {
      id: 7,
      nombre: "Ranchera",
      descripcion: "Porción. Chorizo, carne molida y cabano.",
      precio: 7000,
      categoria: "pizzas-tradicionales",
      badge: null,
      orden: 3,
      visible: true,
      imagen: null,
    },
    {
      id: 8,
      nombre: "Ranchera",
      descripcion: "Rueda. Chorizo, carne molida y cabano.",
      precio: 70000,
      categoria: "pizzas-tradicionales",
      badge: null,
      orden: 4,
      visible: true,
      imagen: null,
    },
    {
      id: 9,
      nombre: "Campesina",
      descripcion: "Porción. Maíz, cabano, salchichón y pollo desmechado.",
      precio: 7000,
      categoria: "pizzas-tradicionales",
      badge: null,
      orden: 5,
      visible: true,
      imagen: null,
    },
    {
      id: 10,
      nombre: "Campesina",
      descripcion: "Rueda. Maíz, cabano, salchichón y pollo desmechado.",
      precio: 70000,
      categoria: "pizzas-tradicionales",
      badge: null,
      orden: 6,
      visible: true,
      imagen: null,
    },
    {
      id: 11,
      nombre: "Madurito",
      descripcion: "Porción. Plátano maduro, carne desmechada y cabano.",
      precio: 7000,
      categoria: "pizzas-tradicionales",
      badge: null,
      orden: 7,
      visible: true,
      imagen: null,
    },
    {
      id: 12,
      nombre: "Madurito",
      descripcion: "Rueda. Plátano maduro, carne desmechada y cabano.",
      precio: 70000,
      categoria: "pizzas-tradicionales",
      badge: null,
      orden: 8,
      visible: true,
      imagen: null,
    },
    {
      id: 13,
      nombre: "Pollo Champiñón",
      descripcion: "Porción. Pollo desmechado y champiñones.",
      precio: 7000,
      categoria: "pizzas-tradicionales",
      badge: null,
      orden: 9,
      visible: true,
      imagen: null,
    },
    {
      id: 14,
      nombre: "Pollo Champiñón",
      descripcion: "Rueda. Pollo desmechado y champiñones.",
      precio: 70000,
      categoria: "pizzas-tradicionales",
      badge: null,
      orden: 10,
      visible: true,
      imagen: null,
    },
    {
      id: 15,
      nombre: "Hawaiana",
      descripcion: "Porción. Piña y jamón.",
      precio: 7000,
      categoria: "pizzas-tradicionales",
      badge: null,
      orden: 11,
      visible: true,
      imagen: null,
    },
    {
      id: 16,
      nombre: "Hawaiana",
      descripcion: "Rueda. Piña y jamón.",
      precio: 70000,
      categoria: "pizzas-tradicionales",
      badge: null,
      orden: 12,
      visible: true,
      imagen: null,
    },
    {
      id: 17,
      nombre: "Pollo Jamón",
      descripcion: "Porción. Pollo desmechado y jamón.",
      precio: 7000,
      categoria: "pizzas-tradicionales",
      badge: null,
      orden: 13,
      visible: true,
      imagen: null,
    },
    {
      id: 18,
      nombre: "Pollo Jamón",
      descripcion: "Rueda. Pollo desmechado y jamón.",
      precio: 70000,
      categoria: "pizzas-tradicionales",
      badge: null,
      orden: 14,
      visible: true,
      imagen: null,
    },
    {
      id: 19,
      nombre: "Carnes Frías",
      descripcion: "Porción. Cabano y salchichón de pollo.",
      precio: 7000,
      categoria: "pizzas-tradicionales",
      badge: null,
      orden: 15,
      visible: true,
      imagen: null,
    },
    {
      id: 20,
      nombre: "Carnes Frías",
      descripcion: "Rueda. Cabano y salchichón de pollo.",
      precio: 70000,
      categoria: "pizzas-tradicionales",
      badge: null,
      orden: 16,
      visible: true,
      imagen: null,
    },
    {
      id: 21,
      nombre: "Peperonni",
      descripcion: "Porción. Peperoni y cabano.",
      precio: 7000,
      categoria: "pizzas-tradicionales",
      badge: null,
      orden: 17,
      visible: true,
      imagen: null,
    },
    {
      id: 22,
      nombre: "Peperonni",
      descripcion: "Rueda. Peperoni y cabano.",
      precio: 70000,
      categoria: "pizzas-tradicionales",
      badge: null,
      orden: 18,
      visible: true,
      imagen: null,
    },
    {
      id: 23,
      nombre: "Pizzeta Mediana (30 cm)",
      descripcion: "Recomendada para 2-3 personas.",
      precio: 30000,
      categoria: "pizzetas",
      badge: null,
      orden: 1,
      visible: true,
      imagen: null,
    },
    {
      id: 24,
      nombre: "Pizzeta Grande (36 cm)",
      descripcion: "Recomendada para 4-5 personas.",
      precio: 40000,
      categoria: "pizzetas",
      badge: null,
      orden: 2,
      visible: true,
      imagen: null,
    },
    {
      id: 25,
      nombre: "Chori",
      descripcion:
        "Maíz, chorizo, carne desmechada, pollo desmechado y huevo de codorniz.",
      precio: 13000,
      categoria: "panzerottis",
      badge: null,
      orden: 1,
      visible: true,
      imagen: null,
    },
    {
      id: 26,
      nombre: "Mexicano",
      descripcion:
        "Picante fuerte, pimentón, tomate, cebolla, carne molida y cabano.",
      precio: 11000,
      categoria: "panzerottis",
      badge: null,
      orden: 2,
      visible: true,
      imagen: null,
    },
    {
      id: 27,
      nombre: "Madurito",
      descripcion: "Plátano maduro, carne desmechada y cabano.",
      precio: 11000,
      categoria: "panzerottis",
      badge: null,
      orden: 3,
      visible: true,
      imagen: null,
    },
    {
      id: 28,
      nombre: "Campesino",
      descripcion: "Maíz, cabano y pollo desmechado.",
      precio: 11000,
      categoria: "panzerottis",
      badge: null,
      orden: 4,
      visible: true,
      imagen: null,
    },
    {
      id: 29,
      nombre: "Pollo Champiñón",
      descripcion: "Pollo desmechado y champiñones.",
      precio: 11000,
      categoria: "panzerottis",
      badge: null,
      orden: 5,
      visible: true,
      imagen: null,
    },
    {
      id: 30,
      nombre: "Hawaiano",
      descripcion: "Piña y jamón.",
      precio: 11000,
      categoria: "panzerottis",
      badge: null,
      orden: 6,
      visible: true,
      imagen: null,
    },
    {
      id: 31,
      nombre: "Mixto",
      descripcion: "Pollo desmechado, salchichón de pollo y cabano.",
      precio: 9000,
      categoria: "panzerottis",
      badge: null,
      orden: 7,
      visible: true,
      imagen: null,
    },
    {
      id: 32,
      nombre: "Queso",
      descripcion: "Adicional.",
      precio: 5000,
      categoria: "adicionales",
      badge: null,
      orden: 1,
      visible: true,
      imagen: null,
    },
    {
      id: 33,
      nombre: "Pollo",
      descripcion: "Adicional.",
      precio: 5000,
      categoria: "adicionales",
      badge: null,
      orden: 2,
      visible: true,
      imagen: null,
    },
    {
      id: 34,
      nombre: "Piña",
      descripcion: "Adicional.",
      precio: 5000,
      categoria: "adicionales",
      badge: null,
      orden: 3,
      visible: true,
      imagen: null,
    },
    {
      id: 35,
      nombre: "Champiñones",
      descripcion: "Adicional.",
      precio: 5000,
      categoria: "adicionales",
      badge: null,
      orden: 4,
      visible: true,
      imagen: null,
    },
    {
      id: 36,
      nombre: "Maíz",
      descripcion: "Adicional.",
      precio: 5000,
      categoria: "adicionales",
      badge: null,
      orden: 5,
      visible: true,
      imagen: null,
    },
    {
      id: 37,
      nombre: "Verdura",
      descripcion: "Adicional.",
      precio: 5000,
      categoria: "adicionales",
      badge: null,
      orden: 6,
      visible: true,
      imagen: null,
    },
  ],
  badges: {
    popular: { texto: "POPULAR", clase: "popular" },
    nuevo: { texto: "NUEVO", clase: "nuevo" },
    recomendado: { texto: "⭐ RECOMENDADO", clase: "recomendado" },
    premium: { texto: "👑 PREMIUM", clase: "premium-badge" },
    picante: { texto: "🌶️ PICANTE", clase: "picante" },
  },
};

let adicionalesDisponibles = [];
let carrito = [];
let whatsappNumber = WHATSAPP_OVERRIDE || WHATSAPP_FALLBACK;
let restaurantName = "Pizzeria La 105";
let addonsCurrentVariant = null;
let addonsCurrentCard = null;
let addonsCurrentVariants = [];
let addonsSelectedIndex = 0;
let addonsCurrentTotal = 0;
let pizzetaSabores = [];
let pizzetaSeleccionados = [];

// Optimización: Scroll pasivo para mejor rendimiento móvil
if ("ontouchstart" in window) {
  const addEventListenerOriginal = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function (type, listener, options) {
    if (["touchstart", "touchmove", "wheel", "mousewheel"].includes(type)) {
      if (typeof options === "boolean") {
        options = { capture: options, passive: true };
      } else if (typeof options === "object" && options.passive === undefined) {
        options.passive = true;
      } else if (options === undefined) {
        options = { passive: true };
      }
    }
    return addEventListenerOriginal.call(this, type, listener, options);
  };
}

const PROMO_HOLIDAYS_2026 = new Set([
  "2026-01-01",
  "2026-01-12",
  "2026-03-23",
  "2026-04-02",
  "2026-04-03",
  "2026-05-01",
  "2026-05-18",
  "2026-06-08",
  "2026-06-15",
  "2026-06-29",
  "2026-07-20",
  "2026-08-07",
  "2026-08-17",
  "2026-10-12",
  "2026-11-02",
  "2026-11-16",
  "2026-12-08",
  "2026-12-25",
]);

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-ready");
  ensureAddonsModal();
  ensureCartPanel();
  ensureOrderModal();
  preloadMenuConfig();
  if (shouldClearCartOnLoad()) {
    sessionStorage.removeItem(CART_KEY);
  }
  carrito = loadCart();
  ensureCartBadge();
  updateCartBadge();
  updateCartUI();
  setupPromoGuard();
  handlePromoPageStatus();
  initPromoCard();

  const cartFab = document.querySelector(".cart-fab");
  if (cartFab) {
    cartFab.addEventListener("click", (event) => {
      event.preventDefault();
      toggleCart();
    });
  }

  const page = document.body.dataset.page || "";
  document.querySelectorAll(".tab-link").forEach((link) => {
    if (link.dataset.page === page) {
      link.classList.add("active");
    }
    link.addEventListener("click", handleTransition);
  });

  document.querySelectorAll(".welcome-card").forEach((link) => {
    link.addEventListener("click", handleTransition);
  });

  const list = document.querySelector("[data-category],[data-categories]");
  if (list) {
    renderCategoria(list.dataset.category || "", list);
  }
});

function getPromoHolidays(year) {
  if (year === 2026) return PROMO_HOLIDAYS_2026;
  return new Set();
}

function getLocalISODate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isPromoAvailable(date = new Date()) {
  const day = date.getDay();
  if (day === 0 || day === 6) return false;
  const holidays = getPromoHolidays(date.getFullYear());
  const iso = getLocalISODate(date);
  if (holidays.has(iso)) return false;
  return true;
}

function setupPromoGuard() {
  document.addEventListener(
    "click",
    (event) => {
      const link = event.target.closest('a[href$="promo.html"]');
      if (!link) return;
      if (isPromoAvailable()) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      showPromoUnavailable();
    },
    true,
  );
}

function handlePromoPageStatus() {
  const page = document.body.dataset.page || "";
  if (page !== "promo") return;
  if (isPromoAvailable()) return;
  const main = document.querySelector(".app-main");
  if (!main) return;
  main.innerHTML = `
    <section class="promo-unavailable-card">
      <h2>Promo no disponible</h2>
      <p>
        La promo esta disponible de lunes a viernes.
        No aplica sabados, domingos ni festivos oficiales.
      </p>
    </section>
  `;
}

function showPromoUnavailable() {
  const main = document.querySelector(".app-main");
  const existing = document.getElementById("promo-unavailable");
  if (existing) {
    existing.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  const card = document.createElement("section");
  card.id = "promo-unavailable";
  card.className = "promo-unavailable-card";
  card.innerHTML = `
    <div class="promo-unavailable-head">
      <h2>Promo no disponible</h2>
      <button class="promo-unavailable-close" type="button" aria-label="Cerrar">×</button>
    </div>
    <p>
      La promo esta disponible de lunes a viernes.
      No aplica sabados, domingos ni festivos oficiales.
    </p>
  `;
  card
    .querySelector(".promo-unavailable-close")
    .addEventListener("click", () => {
      card.remove();
    });
  if (main) {
    main.prepend(card);
    card.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    document.body.appendChild(card);
  }
}

function preloadMenuConfig() {
  // Cargar configuración desde datos embebidos
  if (MENU_DATA.config) {
    whatsappNumber =
      WHATSAPP_OVERRIDE || MENU_DATA.config.whatsapp || whatsappNumber;
    restaurantName = MENU_DATA.config.nombreRestaurante || restaurantName;
  }
}

function handleTransition(event) {
  if (event.metaKey || event.ctrlKey || event.shiftKey) return;
  const href = event.currentTarget.getAttribute("href");
  if (!href || href.startsWith("#")) return;
  event.preventDefault();
  document.body.classList.add("page-leave");
  setTimeout(() => {
    window.location.href = href;
  }, 10);
}

function shouldClearCartOnLoad() {
  const entries = performance.getEntriesByType("navigation");
  if (entries && entries.length > 0) {
    return entries[0].type === "reload";
  }
  return performance.navigation && performance.navigation.type === 1;
}

function renderCategoria(categoryId, container) {
  // Usar datos embebidos directamente
  const data = MENU_DATA;

  if (data.config) {
    whatsappNumber =
      WHATSAPP_OVERRIDE || data.config.whatsapp || whatsappNumber;
    restaurantName = data.config.nombreRestaurante || restaurantName;
  }
  adicionalesDisponibles = data.productos.filter(
    (item) => item.visible && item.categoria === "adicionales",
  );
  if (pizzetaSabores.length === 0) {
    const saboresMap = new Map();
    data.productos
      .filter(
        (item) =>
          item.visible &&
          (item.categoria === "pizzas-especiales" ||
            item.categoria === "pizzas-tradicionales"),
      )
      .forEach((item) => {
        if (saboresMap.has(item.nombre)) return;
        const parsed = parseSizeFromDesc(item.descripcion || "");
        saboresMap.set(item.nombre, {
          nombre: item.nombre,
          descripcion: parsed.cleanDesc || item.descripcion || "",
        });
      });
    pizzetaSabores = [...saboresMap.values()];
  }

  const categoriesRaw = container.dataset.categories || categoryId || "";
  const categories = categoriesRaw
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  const categoryOrder = new Map(
    (data.categorias || []).map((cat) => [cat.id, cat.orden || 0]),
  );

  const productos = data.productos
    .filter(
      (item) =>
        item.visible &&
        (categories.length === 0 || categories.includes(item.categoria)),
    )
    .sort((a, b) => {
      const orderA = categoryOrder.get(a.categoria) || 0;
      const orderB = categoryOrder.get(b.categoria) || 0;
      if (orderA !== orderB) return orderA - orderB;
      return (a.orden || 0) - (b.orden || 0);
    });

  const grupos = agruparProductos(productos);
  container.innerHTML = "";
  grupos.forEach((grupo) => {
    const card = crearCardProducto(grupo);
    container.appendChild(card);
  });
  attachCardInteractions(container);
}

function initPromoCard() {
  const page = document.body.dataset.page || "";
  if (page !== "promo") return;
  const promoCard = document.querySelector(".promo-card");
  const promoButton = promoCard?.querySelector(".promo-action");
  if (!promoCard || !promoButton) return;

  promoCard.dataset.promo = promoCard.dataset.promo || "1";

  const data = MENU_DATA;
  adicionalesDisponibles = data.productos.filter(
    (item) => item.visible && item.categoria === "adicionales",
  );
  if (pizzetaSabores.length === 0) {
    const saboresMap = new Map();
    data.productos
      .filter(
        (item) =>
          item.visible &&
          (item.categoria === "pizzas-especiales" ||
            item.categoria === "pizzas-tradicionales"),
      )
      .forEach((item) => {
        if (saboresMap.has(item.nombre)) return;
        const parsed = parseSizeFromDesc(item.descripcion || "");
        saboresMap.set(item.nombre, {
          nombre: item.nombre,
          descripcion: parsed.cleanDesc || item.descripcion || "",
        });
      });
    pizzetaSabores = [...saboresMap.values()];
  }

  const variants = data.productos
    .filter((item) => item.visible && item.categoria === "pizzetas")
    .sort((a, b) => (a.orden || 0) - (b.orden || 0))
    .map((item) => {
      const parsed = parseSizeFromDesc(item.descripcion || "");
      return {
        ...item,
        sizeLabel: parsed.sizeLabel,
        cleanDesc: parsed.cleanDesc,
      };
    });

  if (variants.length === 0) return;

  promoCard._variants = variants;
  promoCard.dataset.selectedIndex = "0";
  promoButton.addEventListener("click", () => {
    abrirModalAdicionales(promoCard);
  });
}

function crearCardProducto(grupo) {
  const article = document.createElement("article");
  article.className = "card";

  const variants = [...grupo.variants].sort(
    (a, b) => (a.orden || 0) - (b.orden || 0),
  );
  const selected = variants[0];
  const hasVariants = variants.length > 1;

  article.classList.add(getCategoryClass(grupo.categoria));
  const headerIcon = getIconMarkup(grupo);
  const badgeMarkup = getBadgeMarkup(grupo);
  const accentMarkup = getAccentMarkup(grupo);
  const isPanzerotti = grupo.categoria === "panzerottis";

  const sizeHintMarkup = hasVariants
    ? '<p class="product-size-hint">Porcion o Rueda</p>'
    : selected.sizeLabel
      ? `<p class="product-size-hint">${selected.sizeLabel}</p>`
      : "";

  article.innerHTML = `
    <div class="card-header">
      ${isPanzerotti ? "" : headerIcon}
      ${badgeMarkup}
      ${accentMarkup}
    </div>
    <div class="card-body">
      <div>
        <h3 class="product-name">${grupo.nombre}</h3>
        <p class="product-desc">${selected.cleanDesc}</p>
        ${sizeHintMarkup}
      </div>
      <p class="product-price" data-base-price="${selected.precio}">
        $${selected.precio.toLocaleString("es-CO")}
      </p>
    </div>
    <button class="card-action" type="button" aria-label="Pedir">Pedir</button>
  `;

  article._variants = variants;
  article.dataset.selectedIndex = "0";

  return article;
}

function agruparProductos(productos) {
  const grupos = new Map();

  productos.forEach((producto) => {
    const { sizeLabel, cleanDesc } = parseSizeFromDesc(producto.descripcion);
    const key = `${producto.categoria}::${(producto.nombre || "").toLowerCase()}`;
    if (!grupos.has(key)) {
      grupos.set(key, {
        key,
        nombre: producto.nombre,
        categoria: producto.categoria,
        descripcion: cleanDesc,
        orden: producto.orden || 0,
        id: producto.id,
        variants: [],
      });
    }
    const grupo = grupos.get(key);
    grupo.orden = Math.min(grupo.orden, producto.orden || 0);
    if (!grupo.descripcion) grupo.descripcion = cleanDesc;
    grupo.variants.push({
      ...producto,
      sizeLabel,
      cleanDesc,
    });
  });

  return [...grupos.values()].sort((a, b) => a.orden - b.orden);
}

function parseSizeFromDesc(desc = "") {
  const sizeMatch = desc.match(/^(Porcion|Porción|Rueda)\.\s*/i);
  const sizeLabel = sizeMatch ? sizeMatch[1].replace("Porción", "Porcion") : "";
  const cleanDesc = sizeMatch ? desc.replace(sizeMatch[0], "").trim() : desc;
  return { sizeLabel, cleanDesc };
}

function getCategoryClass(category) {
  const map = {
    "pizzas-especiales": "card-especialidad",
    "pizzas-tradicionales": "card-tradicional",
    panzerottis: "card-panzerotti",
    adicionales: "card-adicional",
    pizzetas: "card-especialidad",
  };
  return map[category] || "card-tradicional";
}

function getIconMarkup(producto) {
  const icons = getIconList(producto);
  if (!icons.length) return "";
  const iconMarkup = icons.map((src) => buildIconImage(src)).join("");
  return `<div class="header-icons">${iconMarkup}</div>`;
}

function getIconList(producto) {
  const name = (producto.nombre || "").toLowerCase();
  const desc = (producto.descripcion || producto.cleanDesc || "").toLowerCase();
  const isPanzerotti =
    producto.categoria === "panzerottis" || name.includes("panzerotti");

  if (isPanzerotti) {
    return [];
  }
  if (name.includes("choripizza")) {
    return [
      "images/icons/icon-chorizo.svg",
      "images/icons/icon-maiz.svg",
      "images/icons/icon-queso.svg",
    ];
  }
  if (name.includes("mexicana")) {
    return [];
  }
  if (
    name.includes("madurito") ||
    name.includes("madurzza") ||
    name.includes("madurza") ||
    desc.includes("platano") ||
    desc.includes("plátano")
  ) {
    return [];
  }
  return [];
}

function getBadgeMarkup(producto) {
  if (producto.categoria === "panzerottis") {
    const src = resolveAssetPath("images/distintivos/badge-30-min.svg");
    return `
      <img
        class="product-badge"
        src="${src}"
        onerror="this.onerror=null;this.src='${src.replace(".svg", ".webp")}';"
        alt="Horneado en 30 min"
        width="62"
        height="62"
        loading="lazy"
      />
    `;
  }
  return "";
}

function buildIconImage(src) {
  const resolvedSrc = resolveAssetPath(src);
  const fallback = resolvedSrc.replace(".svg", ".webp");
  return `
    <img
      class="header-icon-img"
      src="${resolvedSrc}"
      onerror="this.onerror=function(){this.remove();};this.src='${fallback}';"
      alt=""
      aria-hidden="true"
      width="45"
      height="45"
      loading="lazy"
    />
  `;
}

function getAccentMarkup(producto) {
  const pizzas = [
    "images/pizza1.webp",
    "images/pizza2.webp",
    "images/pizza3.webp",
    "images/pizzeta.webp",
  ];
  const panzerottis = ["images/panzzeroti.webp", "images/panzzerotis.webp"];
  const category = producto.categoria;
  const pool = category === "panzerottis" ? panzerottis : pizzas;
  const src = resolveAssetPath(pool[Math.floor(Math.random() * pool.length)]);
  const seed = (producto.id || 0) + (producto.precio || 0);
  const size = seed % 2 === 0 ? 82 : 90;
  const offset = seed % 3 === 0 ? -6 : 6;
  const rotation = seed % 2 === 0 ? -4 : 4;
  return `
    <div
      class="card-accent"
      style="--accent-size:${size}px;--accent-offset:${offset}px;--accent-rotation:${rotation}deg;"
      aria-hidden="true"
    >
      <img src="${src}" alt="" width="${size}" height="${size}" loading="lazy" />
    </div>
  `;
}

function attachCardInteractions(container) {
  if (container.dataset.interactions === "1") return;
  container.dataset.interactions = "1";

  container.addEventListener("click", (event) => {
    const addButton = event.target.closest(".card-action");
    if (addButton && container.contains(addButton)) {
      const card = addButton.closest(".card");
      if (!card || !card._variants) return;
      abrirModalAdicionales(card);
    }
  });
}

function ensureAddonsModal() {
  if (document.getElementById("addons-modal")) return;
  const modal = document.createElement("div");
  modal.id = "addons-modal";
  modal.className = "addons-modal";
  modal.innerHTML = `
    <div class="addons-panel" role="dialog" aria-modal="true" aria-labelledby="addons-title">
      <div class="addons-header">
        <h3 id="addons-title">Personalizar tu pedido</h3>
        <button class="addons-close" type="button" aria-label="Cerrar">×</button>
      </div>
      <div class="addons-body">
        <div class="addons-product">
          <div class="addons-name"></div>
          <div class="addons-size"></div>
          <div class="addons-base"></div>
        </div>
        <div class="addons-size-block">
          <div class="addons-step">Tamano</div>
          <div class="addons-sizes" role="group" aria-label="Tamano"></div>
        </div>
        <div class="addons-flavors" id="addons-flavors">
          <div class="addons-step">Sabores (maximo 2)</div>
          <div class="addons-flavors-list"></div>
        </div>
        <p class="addons-note">Solo adicionales. En La 105 respetamos la receta original.</p>
        <div class="addons-step">Adicionales (opcional)</div>
        <div class="addons-list"></div>
      </div>
      <div class="addons-footer">
        <div class="addons-breakdown">
          <div class="addons-row">
            <span>Base</span>
            <span class="addons-breakdown-base"></span>
          </div>
          <div class="addons-row">
            <span>Adicionales</span>
            <span class="addons-breakdown-extras"></span>
          </div>
        </div>
        <div class="addons-total"></div>
        <button class="addons-confirm" type="button">Confirmar y Agregar</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      cerrarModalAdicionales();
    }
  });
  const closeBtn = modal.querySelector(".addons-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", cerrarModalAdicionales);
  }

  // Usar listener delegado para ESC solo una vez
  if (!document.__addonsEscListenerAdded) {
    document.addEventListener("keydown", (event) => {
      const addonsModal = document.getElementById("addons-modal");
      if (
        event.key === "Escape" &&
        addonsModal &&
        addonsModal.classList.contains("active")
      ) {
        cerrarModalAdicionales();
      }
    });
    document.__addonsEscListenerAdded = true;
  }
}

function abrirModalAdicionales(card) {
  closeCart();
  const modal = document.getElementById("addons-modal");
  if (!modal) return;
  addonsCurrentCard = card;
  addonsCurrentVariants = card._variants || [];
  addonsSelectedIndex = 0;
  addonsCurrentVariant = addonsCurrentVariants[0] || null;
  const nameEl = modal.querySelector(".addons-name");
  const sizeEl = modal.querySelector(".addons-size");
  const baseEl = modal.querySelector(".addons-base");
  const sizesEl = modal.querySelector(".addons-sizes");
  const flavorsBlock = modal.querySelector("#addons-flavors");
  const flavorsList = modal.querySelector(".addons-flavors-list");
  const listEl = modal.querySelector(".addons-list");
  const totalEl = modal.querySelector(".addons-total");
  const breakdownBaseEl = modal.querySelector(".addons-breakdown-base");
  const breakdownExtrasEl = modal.querySelector(".addons-breakdown-extras");
  const confirmBtn = modal.querySelector(".addons-confirm");

  if (!addonsCurrentVariant) return;

  const updateVariantDisplay = () => {
    const variant = addonsCurrentVariant;
    const sizeLabel = variant.sizeLabel ? `• ${variant.sizeLabel}` : "";
    nameEl.textContent = variant.nombre || "";
    sizeEl.textContent = sizeLabel;
    baseEl.textContent = `Base: $${variant.precio.toLocaleString("es-CO")}`;
  };

  if (sizesEl) {
    sizesEl.innerHTML = "";
    if (addonsCurrentVariants.length > 1) {
      sizesEl.closest(".addons-size-block").style.display = "flex";
      addonsCurrentVariants.forEach((variantOption, index) => {
        const label = document.createElement("label");
        label.className = "addons-size-option";
        label.innerHTML = `
          <input type="radio" name="addons-size" value="${index}" ${index === 0 ? "checked" : ""} />
          <span>${variantOption.sizeLabel || "Opcion"}</span>
        `;
        sizesEl.appendChild(label);
      });
    } else {
      sizesEl.closest(".addons-size-block").style.display = "none";
    }
  }

  const isPizzeta = addonsCurrentVariant.categoria === "pizzetas";
  pizzetaSeleccionados = [];
  if (flavorsBlock && flavorsList) {
    flavorsList.innerHTML = "";
    if (isPizzeta) {
      flavorsBlock.classList.add("active");
      pizzetaSabores.forEach((sabor) => {
        const item = document.createElement("label");
        item.className = "flavor-item";
        item.innerHTML = `
          <input type="checkbox" value="${sabor.nombre}" />
          <div>
            <div class="flavor-name">${sabor.nombre}</div>
            <div class="flavor-desc">${sabor.descripcion}</div>
          </div>
        `;
        flavorsList.appendChild(item);
      });

      // Remover listener anterior si existe
      const oldFlavorHandler = flavorsList._flavorChangeHandler;
      if (oldFlavorHandler) {
        flavorsList.removeEventListener("change", oldFlavorHandler);
      }

      const newFlavorHandler = () => {
        const selected = [...flavorsList.querySelectorAll("input:checked")];
        pizzetaSeleccionados = selected.map((input) => input.value);
        const reachedMax = selected.length >= 2;
        flavorsList.querySelectorAll("input:not(:checked)").forEach((input) => {
          input.disabled = reachedMax;
        });
      };

      flavorsList.addEventListener("change", newFlavorHandler);
      flavorsList._flavorChangeHandler = newFlavorHandler;
    } else {
      flavorsBlock.classList.remove("active");
    }
  }

  updateVariantDisplay();

  listEl.innerHTML = "";
  if (adicionalesDisponibles.length === 0) {
    listEl.innerHTML =
      '<p class="addons-empty">No hay adicionales disponibles.</p>';
  } else {
    adicionalesDisponibles.forEach((adicional) => {
      const item = document.createElement("div");
      item.className = "addon-item";
      item.dataset.addonId = String(adicional.id);
      item.dataset.price = String(adicional.precio || 0);
      item.dataset.count = "0";
      item.innerHTML = `
        <div class="addon-info">
          <span class="addon-name">${adicional.nombre}</span>
          <span class="addon-price">+ $${adicional.precio.toLocaleString("es-CO")}</span>
        </div>
        <div class="addon-qty">
          <button class="addon-btn" type="button" data-delta="-1">-</button>
          <span class="addon-count">0</span>
          <button class="addon-btn" type="button" data-delta="1">+</button>
        </div>
      `;
      listEl.appendChild(item);
    });
  }

  const recalcTotal = () => {
    const items = [...listEl.querySelectorAll(".addon-item")];
    const extras = items.reduce((sum, item) => {
      const price = Number(item.dataset.price || 0);
      const count = Number(item.dataset.count || 0);
      return sum + price * count;
    }, 0);
    const total = addonsCurrentVariant.precio + extras;
    addonsCurrentTotal = total;
    breakdownBaseEl.textContent =
      "$" + addonsCurrentVariant.precio.toLocaleString("es-CO");
    breakdownExtrasEl.textContent = "$" + extras.toLocaleString("es-CO");
    totalEl.textContent = "Total: $" + total.toLocaleString("es-CO");

    if (confirmBtn) {
      confirmBtn.textContent =
        "Confirmar y Agregar $" + total.toLocaleString("es-CO");
    }
  };

  // Remover listeners anteriores si existen
  if (sizesEl && addonsCurrentVariants.length > 1) {
    const oldSizeHandler = sizesEl._sizeChangeHandler;
    if (oldSizeHandler) {
      sizesEl.removeEventListener("change", oldSizeHandler);
    }

    const newSizeHandler = (event) => {
      const input = event.target.closest("input[name='addons-size']");
      if (!input) return;
      const index = Number(input.value || 0);
      addonsSelectedIndex = index;
      addonsCurrentVariant =
        addonsCurrentVariants[index] || addonsCurrentVariants[0];
      updateVariantDisplay();
      recalcTotal();
    };

    sizesEl.addEventListener("change", newSizeHandler);
    sizesEl._sizeChangeHandler = newSizeHandler;
  }

  // Remover listener anterior de adicionales si existe
  const oldAddonHandler = listEl._addonClickHandler;
  if (oldAddonHandler) {
    listEl.removeEventListener("click", oldAddonHandler);
  }

  const newAddonHandler = (event) => {
    const button = event.target.closest(".addon-btn");
    if (!button) return;
    const item = button.closest(".addon-item");
    if (!item) return;
    const delta = Number(button.dataset.delta || 0);
    const countEl = item.querySelector(".addon-count");
    if (!countEl) return;
    const current = Number(countEl.textContent || 0);
    const next = Math.max(0, current + delta);
    countEl.textContent = String(next);
    item.dataset.count = String(next);
    recalcTotal();
  };

  listEl.addEventListener("click", newAddonHandler);
  listEl._addonClickHandler = newAddonHandler;

  if (confirmBtn) {
    confirmBtn.onclick = null;
    confirmBtn.onclick = function () {
      confirmarAdicionales();
    };
  }

  recalcTotal();

  modal.classList.add("active");
  document.body.classList.add("modal-open");
}

function confirmarAdicionales() {
  const modal = document.getElementById("addons-modal");
  if (!modal || !addonsCurrentVariant || !addonsCurrentCard) return;

  const listEl = modal.querySelector(".addons-list");
  if (!listEl) return;

  const selected = [...listEl.querySelectorAll(".addon-item")]
    .map((item) => {
      const id = Number(item.dataset.addonId || 0);
      const count = Number(item.dataset.count || 0);
      const adicional = adicionalesDisponibles.find((entry) => entry.id === id);
      if (!adicional || count <= 0) return null;
      return {
        ...adicional,
        cantidad: count,
        total: adicional.precio * count,
      };
    })
    .filter(Boolean);

  const extrasTotal = selected.reduce((sum, item) => sum + item.total, 0);
  const total = addonsCurrentVariant.precio + extrasTotal;
  const sabores =
    addonsCurrentVariant.categoria === "pizzetas" ? pizzetaSeleccionados : [];
  if (addonsCurrentVariant.categoria === "pizzetas" && sabores.length === 0) {
    showToast("Selecciona 1 o 2 sabores para la pizzeta");
    return;
  }
  const promoBaseLabel = addonsCurrentCard.dataset.promoLabel || "";
  const isPromo = addonsCurrentCard.dataset.promo === "1" || !!promoBaseLabel;
  const promoSize = addonsCurrentVariant.sizeLabel
    ? " " + addonsCurrentVariant.sizeLabel
    : "";
  const promoLabel = isPromo ? promoBaseLabel + promoSize : "";

  carrito.push({
    id: Date.now() + Math.random(),
    nombre: addonsCurrentVariant.nombre,
    sizeLabel: addonsCurrentVariant.sizeLabel || "",
    basePrice: addonsCurrentVariant.precio,
    adicionales: selected,
    sabores,
    total,
    isPromo,
    promoLabel,
  });
  saveCart();
  updateCartBadge();
  updateCartUI();
  showToast("Pedido agregado al carrito");
  const priceEl = addonsCurrentCard.querySelector(".product-price");
  if (priceEl) {
    priceEl.textContent = `$${total.toLocaleString("es-CO")}`;
  }
  cerrarModalAdicionales();
  openCart();
}

function cerrarModalAdicionales() {
  const modal = document.getElementById("addons-modal");
  if (!modal) return;
  modal.classList.remove("active");
  document.body.classList.remove("modal-open");
  addonsCurrentVariant = null;
  addonsCurrentCard = null;
}

function loadCart() {
  try {
    const raw = sessionStorage.getItem(CART_KEY);
    if (!raw) {
      localStorage.removeItem(CART_KEY);
    }
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart() {
  sessionStorage.setItem(CART_KEY, JSON.stringify(carrito));
}

function ensureCartBadge() {
  const cartFab = document.querySelector(".cart-fab");
  if (!cartFab || cartFab.querySelector(".cart-count")) return;
  const badge = document.createElement("span");
  badge.className = "cart-count";
  badge.textContent = "0";
  cartFab.appendChild(badge);
}

function updateCartBadge() {
  const badge = document.querySelector(".cart-count");
  if (!badge) return;
  badge.textContent = String(carrito.length);
  badge.style.display = carrito.length > 0 ? "grid" : "none";
}

function ensureCartPanel() {
  if (document.getElementById("cart-panel")) return;

  const overlay = document.createElement("div");
  overlay.id = "cart-overlay";
  overlay.className = "cart-overlay";

  const panel = document.createElement("aside");
  panel.id = "cart-panel";
  panel.className = "cart-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "true");
  panel.innerHTML = `
    <div class="cart-header">
      <h3>Tu pedido</h3>
      <button class="cart-close" type="button" aria-label="Cerrar">×</button>
    </div>
    <div id="cart-items" class="cart-items"></div>
    <div class="cart-footer">
      <div class="cart-total-row">
        <span>Total</span>
        <span id="cart-total">$0</span>
      </div>
      <button class="cart-btn cart-whatsapp" type="button">Enviar pedido por WhatsApp</button>
      <button class="cart-btn cart-explore" type="button">Seguir explorando</button>
      <button class="cart-btn cart-clear" type="button">Vaciar carrito</button>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(panel);

  overlay.addEventListener("click", closeCart);
  const closeBtn = panel.querySelector(".cart-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeCart);
  }
  const whatsappBtn = panel.querySelector(".cart-whatsapp");
  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", () => {
      openOrderModal();
    });
  }
  let lastExploreTrigger = 0;
  const handleExplore = (event) => {
    const now = Date.now();
    if (now - lastExploreTrigger < 350) return;
    lastExploreTrigger = now;
    event.preventDefault();
    event.stopPropagation();
    seguirExplorando();
  };

  panel.addEventListener(
    "click",
    (event) => {
      if (event.target.closest(".cart-explore")) {
        handleExplore(event);
      }
    },
    true,
  );

  panel.addEventListener(
    "touchend",
    (event) => {
      if (event.target.closest(".cart-explore")) {
        handleExplore(event);
      }
    },
    true,
  );
  const clearBtn = panel.querySelector(".cart-clear");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      vaciarCarrito();
    });
  }

  const items = panel.querySelector("#cart-items");
  if (items) {
    items.addEventListener("click", (event) => {
      const button = event.target.closest(".cart-item-remove");
      if (!button) return;
      const id = Number(button.dataset.itemId);
      if (!Number.isNaN(id)) {
        removeCartItem(id);
      }
    });
  }

  // Usar listener delegado para ESC solo una vez
  if (!document.__cartEscListenerAdded) {
    document.addEventListener("keydown", (event) => {
      const cartPanel = document.getElementById("cart-panel");
      if (
        event.key === "Escape" &&
        cartPanel &&
        cartPanel.classList.contains("active")
      ) {
        closeCart();
      }
    });
    document.__cartEscListenerAdded = true;
  }
}

function updateCartUI() {
  const itemsEl = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const whatsappBtn = document.querySelector(".cart-whatsapp");
  if (!itemsEl || !totalEl) return;

  if (carrito.length === 0) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <p>Tu carrito esta vacio</p>
        <span>Agrega productos para comenzar</span>
      </div>
    `;
    totalEl.textContent = "$0";
    if (whatsappBtn) whatsappBtn.disabled = true;
    return;
  }

  itemsEl.innerHTML = "";
  let total = 0;

  carrito.forEach((item) => {
    total += item.total || 0;
    const extras = item.adicionales || [];
    const extrasText = extras.length
      ? extras.map((extra) => extra.nombre + " x" + extra.cantidad).join(", ")
      : "Sin adicionales";
    const saboresText =
      item.sabores && item.sabores.length
        ? "Sabores: " + item.sabores.join(" / ")
        : "";

    const card = document.createElement("div");
    card.className = "cart-item";

    const sizeSpan = item.sizeLabel
      ? '<span class="cart-item-size">' + item.sizeLabel + "</span>"
      : "";
    const saboresExtra = saboresText ? " | " + saboresText : "";

    card.innerHTML =
      '<div class="cart-item-title">' +
      "<div>" +
      "<strong>" +
      item.nombre +
      "</strong>" +
      sizeSpan +
      "</div>" +
      '<button class="cart-item-remove" type="button" data-item-id="' +
      item.id +
      '">×</button>' +
      "</div>" +
      '<div class="cart-item-extras">' +
      extrasText +
      saboresExtra +
      "</div>" +
      '<div class="cart-item-price">$' +
      (item.total || 0).toLocaleString("es-CO") +
      "</div>";

    itemsEl.appendChild(card);
  });

  totalEl.textContent = "$" + total.toLocaleString("es-CO");
  if (whatsappBtn) whatsappBtn.disabled = false;
}

function openCart() {
  const panel = document.getElementById("cart-panel");
  const overlay = document.getElementById("cart-overlay");
  if (!panel || !overlay) return;
  overlay.style.display = "block";
  overlay.style.pointerEvents = "auto";
  panel.classList.add("active");
  overlay.classList.add("active");
  document.body.classList.add("cart-open");
}

function closeCart() {
  const panel = document.getElementById("cart-panel");
  const overlay = document.getElementById("cart-overlay");
  if (!panel || !overlay) return;
  panel.classList.remove("active");
  overlay.classList.remove("active");
  overlay.style.pointerEvents = "none";
  overlay.style.display = "none";
  document.body.classList.remove("cart-open");
}

function toggleCart() {
  const panel = document.getElementById("cart-panel");
  if (!panel) return;
  if (panel.classList.contains("active")) {
    closeCart();
  } else {
    openCart();
  }
}

function seguirExplorando() {
  closeCart();
  const main = document.querySelector(".app-main");
  if (main) {
    main.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function removeCartItem(id) {
  carrito = carrito.filter((item) => item.id !== id);
  saveCart();
  updateCartBadge();
  updateCartUI();
}

function vaciarCarrito() {
  if (carrito.length === 0) return;
  carrito = [];
  saveCart();
  updateCartBadge();
  updateCartUI();
}

function enviarPedidoWhatsApp() {
  if (carrito.length === 0) {
    showToast("Tu carrito esta vacio");
    return;
  }

  let mensaje =
    "Hola, quisiera hacer el siguiente pedido en *" + restaurantName + "*:\n\n";
  carrito.forEach((item, index) => {
    const extras = item.adicionales || [];
    const extrasText = extras.length
      ? extras.map((extra) => extra.nombre + " x" + extra.cantidad).join(", ")
      : "Sin adicionales";
    const sizeText = item.sizeLabel ? " (" + item.sizeLabel + ")" : "";
    const promoText = item.promoLabel ? "Promo: " + item.promoLabel : "";
    const itemLinePrefix = promoText
      ? promoText + " | " + item.nombre
      : item.nombre;
    mensaje +=
      index +
      1 +
      ". " +
      itemLinePrefix +
      sizeText +
      " - $" +
      (item.total || 0).toLocaleString("es-CO") +
      "\n";
    mensaje += "   " + extrasText + "\n";
  });

  const total = carrito.reduce((sum, item) => sum + (item.total || 0), 0);
  mensaje += "\n*Total:* $" + total.toLocaleString("es-CO");

  const url =
    "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(mensaje);
  window.open(url, "_blank");
}

function ensureOrderModal() {
  if (document.getElementById("order-modal")) return;

  const overlay = document.createElement("div");
  overlay.id = "order-overlay";
  overlay.className = "order-overlay";

  const modal = document.createElement("div");
  modal.id = "order-modal";
  modal.className = "order-modal";
  modal.innerHTML = `
    <div class="order-panel" role="dialog" aria-modal="true" aria-labelledby="order-title">
      <div class="order-header">
        <h3 id="order-title">Finalizar pedido</h3>
        <button class="order-close" type="button" aria-label="Cerrar">×</button>
      </div>
      <div class="order-body">
        <label class="order-label">
          Nombre del cliente
          <input id="order-name" class="order-input" type="text" placeholder="Tu nombre completo" />
        </label>
        <div class="order-group">
          <p>Tipo de pedido</p>
          <label class="order-option">
            <input type="radio" name="order-type" value="domicilio" />
            A domicilio
          </label>
          <label class="order-option">
            <input type="radio" name="order-type" value="recoger" />
            Para recoger
          </label>
        </div>
        <div class="order-address" id="order-address">
          <label class="order-label">
            Direccion exacta
            <input id="order-address-input" class="order-input" type="text" placeholder="Calle, numero, apartamento" />
          </label>
          <label class="order-label">
            Barrio
            <input id="order-neighborhood" class="order-input" type="text" placeholder="Barrio o sector" />
          </label>
          <label class="order-label">
            Especificaciones
            <textarea id="order-notes" class="order-textarea" rows="2" placeholder="Torre, apto, referencias"></textarea>
          </label>
        </div>
        <div class="order-group">
          <p>Metodo de pago</p>
          <label class="order-option">
            <input type="radio" name="order-pay" value="efectivo" />
            Efectivo
          </label>
          <label class="order-option">
            <input type="radio" name="order-pay" value="transferencia" />
            Transferencia
          </label>
        </div>
        <div class="order-error" id="order-error"></div>
      </div>
      <div class="order-footer">
        <button class="order-btn order-cancel" type="button">Volver al carrito</button>
        <button class="order-btn order-send" type="button">Enviar pedido por WhatsApp</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(modal);

  overlay.addEventListener("click", closeOrderModal);
  const closeBtn = modal.querySelector(".order-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeOrderModal);
  }
  const cancelBtn = modal.querySelector(".order-cancel");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", closeOrderModal);
  }
  const sendBtn = modal.querySelector(".order-send");
  if (sendBtn) {
    sendBtn.addEventListener("click", submitOrderWhatsApp);
  }

  modal.querySelectorAll("input[name='order-type']").forEach((input) => {
    input.addEventListener("change", (event) => {
      const address = document.getElementById("order-address");
      if (!address) return;
      if (event.target.value === "domicilio") {
        address.classList.add("active");
      } else {
        address.classList.remove("active");
      }
    });
  });

  // Usar listener delegado para ESC solo una vez
  if (!document.__orderEscListenerAdded) {
    document.addEventListener("keydown", (event) => {
      const orderModal = document.getElementById("order-modal");
      if (
        event.key === "Escape" &&
        orderModal &&
        orderModal.classList.contains("active")
      ) {
        closeOrderModal();
      }
    });
    document.__orderEscListenerAdded = true;
  }
}

function openOrderModal() {
  if (carrito.length === 0) {
    showToast("Tu carrito esta vacio");
    return;
  }
  const overlay = document.getElementById("order-overlay");
  const modal = document.getElementById("order-modal");
  if (!overlay || !modal) return;

  const error = document.getElementById("order-error");
  if (error) error.textContent = "";
  const nameInput = document.getElementById("order-name");
  if (nameInput) nameInput.value = "";
  document
    .querySelectorAll("input[name='order-type']")
    .forEach((input) => (input.checked = false));
  document
    .querySelectorAll("input[name='order-pay']")
    .forEach((input) => (input.checked = false));
  const addressBox = document.getElementById("order-address");
  if (addressBox) addressBox.classList.remove("active");
  const addressInput = document.getElementById("order-address-input");
  if (addressInput) addressInput.value = "";
  const neighborhoodInput = document.getElementById("order-neighborhood");
  if (neighborhoodInput) neighborhoodInput.value = "";
  const notesInput = document.getElementById("order-notes");
  if (notesInput) notesInput.value = "";

  overlay.classList.add("active");
  modal.classList.add("active");
  document.body.classList.add("cart-open");
}

function closeOrderModal() {
  const overlay = document.getElementById("order-overlay");
  const modal = document.getElementById("order-modal");
  if (!overlay || !modal) return;
  overlay.classList.remove("active");
  modal.classList.remove("active");
  document.body.classList.remove("cart-open");
}

function submitOrderWhatsApp() {
  const nameInput = document.getElementById("order-name");
  const orderType = document.querySelector("input[name='order-type']:checked");
  const payType = document.querySelector("input[name='order-pay']:checked");
  const error = document.getElementById("order-error");

  const name = nameInput ? nameInput.value.trim() : "";
  if (!name) {
    if (error) error.textContent = "Ingresa el nombre del cliente.";
    return;
  }
  if (!orderType) {
    if (error)
      error.textContent = "Selecciona si es a domicilio o para recoger.";
    return;
  }
  if (!payType) {
    if (error) error.textContent = "Selecciona el metodo de pago.";
    return;
  }

  let address = "";
  let neighborhood = "";
  let notes = "";
  if (orderType.value === "domicilio") {
    const addressInput = document.getElementById("order-address-input");
    const neighborhoodInput = document.getElementById("order-neighborhood");
    const notesInput = document.getElementById("order-notes");
    address = addressInput ? addressInput.value.trim() : "";
    neighborhood = neighborhoodInput ? neighborhoodInput.value.trim() : "";
    notes = notesInput ? notesInput.value.trim() : "";
    if (!address) {
      if (error) error.textContent = "Ingresa la direccion exacta.";
      return;
    }
    if (!neighborhood) {
      if (error) error.textContent = "Ingresa el barrio o sector.";
      return;
    }
  }

  const mensaje = buildWhatsAppMessage({
    name,
    orderType: orderType.value,
    payType: payType.value,
    address,
    neighborhood,
    notes,
  });
  const url =
    "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(mensaje);
  window.open(url, "_blank");
  closeOrderModal();
}

function buildWhatsAppMessage({
  name,
  orderType,
  payType,
  address,
  neighborhood,
  notes,
}) {
  const orderTypeText =
    orderType === "domicilio" ? "A domicilio" : "Para recoger";
  const payTypeText =
    payType === "transferencia" ? "Transferencia" : "Efectivo";
  const restaurantLabel = restaurantName.replace("Pizzeria", "Pizzería");

  let mensaje =
    "Hola, soy " +
    name +
    ". Quisiera hacer este pedido en *" +
    restaurantLabel +
    "*:";
  mensaje += "\n\n";
  carrito.forEach((item, index) => {
    const extras = item.adicionales || [];
    const saboresText =
      item.sabores && item.sabores.length
        ? "Sabores: " + item.sabores.join(" / ")
        : "";
    const promoText = item.promoLabel ? "Promo: " + item.promoLabel : "";
    const sizeText = item.sizeLabel ? " (" + item.sizeLabel + ")" : "";
    const itemLinePrefix = promoText
      ? promoText + " | " + item.nombre
      : item.nombre;
    mensaje +=
      index +
      1 +
      ". " +
      itemLinePrefix +
      sizeText +
      " - $" +
      (item.total || 0).toLocaleString("es-CO");

    const details = [saboresText].filter(Boolean);
    if (details.length) {
      mensaje += " | " + details.join(" | ");
    }
    mensaje += "\n";

    if (extras.length > 0) {
      mensaje += "Adicionales:\n";
      extras.forEach((extra) => {
        mensaje +=
          extra.cantidad + " adicional de " + extra.nombre.toLowerCase() + "\n";
      });
    }
  });

  const total = carrito.reduce((sum, item) => sum + (item.total || 0), 0);
  mensaje += "\n";
  mensaje += "Total: $" + total.toLocaleString("es-CO");
  mensaje += "\nEntrega: " + orderTypeText + " | Pago: " + payTypeText;
  if (orderType === "domicilio") {
    mensaje += "\nDireccion: " + address;
    mensaje += "\nBarrio: " + neighborhood;
    if (notes) {
      mensaje += "\nEspecificaciones: " + notes;
    }
  }
  mensaje += "\n\nGracias.";

  return mensaje;
}

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 1600);
}
