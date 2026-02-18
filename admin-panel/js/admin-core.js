/**
 * admin-core.js – Módulo compartido para todas las páginas del admin.
 * Importar en cada página con: import { initPage } from '../js/admin-core.js'
 */
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://golgsnrevkjtusououcz.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvbGdzbnJldmtqdHVzb3VvdWN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMTM1NTgsImV4cCI6MjA4NjU4OTU1OH0.0JcvLg6DyPRH-wpcEeGpZ-OtdAvq4FGPm7fbs6Bo3EU'
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ─────────────────────────────────────────────
// ESTADO GLOBAL
// ─────────────────────────────────────────────
let categorias = []
let productos = []
let editMode = true
let confirmCallback = null
let _assetBase = ''   // '../' para sub-páginas, '' para index

// ─────────────────────────────────────────────
// IMÁGENES (relativas al root del sitio)
// ─────────────────────────────────────────────
const PIZZA_IMGS = ['pizza1.webp', 'pizza2.webp', 'pizza3.webp', 'pizzeta.webp']
const PANZ_IMGS  = ['panzzeroti.webp', 'panzzerotis.webp']

function img(name) { return `${_assetBase}images/${name}` }

// ─────────────────────────────────────────────
// UTILIDADES DOM
// ─────────────────────────────────────────────
const $ = id => document.getElementById(id)
const show = el => { if (typeof el === 'string') el = $(el); if (el) el.style.display = '' }
const hide = el => { if (typeof el === 'string') el = $(el); if (el) el.style.display = 'none' }

function loading(msg = 'Cargando...') {
  const el = $('_loading')
  if (!el) return
  el.querySelector('p').textContent = msg
  el.classList.add('active')
}
function loaded() { $('_loading')?.classList.remove('active') }

function toast(msg, type = 'info') {
  const c = $('_toasts')
  if (!c) return
  const icons = { success: '✓', error: '✕', info: 'ℹ' }
  const el = document.createElement('div')
  el.className = `admin-toast t-${type}`
  el.innerHTML = `<span class="t-icon">${icons[type] || 'ℹ'}</span><span class="t-text">${msg}</span>`
  c.appendChild(el)
  setTimeout(() => el.remove(), 4000)
}

function openModal(id)  { $(id)?.classList.add('active') }
function closeModal(id) { $(id)?.classList.remove('active') }

function confirmAction(msg, cb) {
  $('_confirm-msg').textContent = msg
  confirmCallback = cb
  openModal('_modal-confirm')
}

// ─────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────
export async function checkSession() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function login(email, pw) {
  loading('Iniciando sesión...')
  const { data, error } = await supabase.auth.signInWithPassword({ email, password: pw })
  loaded()
  return { user: data?.user, error }
}

export async function logout(redirectTo = './index.html') {
  loading('Cerrando sesión...')
  await supabase.auth.signOut()
  loaded()
  window.location.href = redirectTo
}

// ─────────────────────────────────────────────
// DATOS
// ─────────────────────────────────────────────
export async function loadAll() {
  loading('Cargando menú...')
  const [catsRes, prodsRes] = await Promise.all([
    supabase.from('categorias').select('*').order('orden'),
    supabase.from('productos').select('*').order('orden')
  ])
  categorias = catsRes.data || []
  productos  = prodsRes.data || []
  loaded()
  return { categorias, productos }
}

// ─────────────────────────────────────────────
// RENDER – LÓGICA IDÉNTICA AL MENÚ PÚBLICO
// ─────────────────────────────────────────────
function parseSizeFromDesc(desc = '') {
  const m = desc.match(/^(Porcion|Porción|Rueda)\.\s*/i)
  return {
    sizeLabel: m ? m[1].replace('Porción', 'Porcion') : '',
    cleanDesc: m ? desc.replace(m[0], '').trim() : desc
  }
}

function getCategoryClass(nombre) {
  const n = (nombre || '').toLowerCase()
  if (n.includes('especial') || n.includes('pizzeta')) return 'card-especialidad'
  if (n.includes('clasic') || n.includes('barrio') || n.includes('tradic')) return 'card-tradicional'
  if (n.includes('panzerotti')) return 'card-panzerotti'
  if (n.includes('adicional')) return 'card-adicional'
  return 'card-tradicional'
}

function getAccentMarkup(prod, cat) {
  const isPanz = (cat.nombre || '').toLowerCase().includes('panzerotti')
  const pool   = isPanz ? PANZ_IMGS : PIZZA_IMGS
  const src    = pool[Math.floor(Math.random() * pool.length)]
  const seed   = (prod.orden || 0) + (prod.precio || 0)
  const size   = seed % 2 === 0 ? 82 : 90
  const off    = seed % 3 === 0 ? -6 : 6
  const rot    = seed % 2 === 0 ? -4 : 4
  return `<div class="card-accent"
    style="--accent-size:${size}px;--accent-offset:${off}px;--accent-rotation:${rot}deg;"
    aria-hidden="true">
    <img src="${prod.imagen_url || img(src)}" alt="" width="${size}" height="${size}" loading="lazy" />
  </div>`
}

function getBadgeMarkup(cat) {
  if ((cat.nombre || '').toLowerCase().includes('panzerotti')) {
    const src = img('distintivos/badge-30-min.svg')
    return `<img class="product-badge" src="${src}"
      onerror="this.onerror=null;this.src='${img('distintivos/badge-30-min.webp')}';"
      alt="30 min" width="62" height="62" loading="lazy" />`
  }
  return ''
}

function agruparProductos(prods) {
  const grupos = new Map()
  prods.forEach(p => {
    const { sizeLabel, cleanDesc } = parseSizeFromDesc(p.descripcion || '')
    const key = (p.nombre || '').toLowerCase()
    if (!grupos.has(key)) {
      grupos.set(key, { nombre: p.nombre, descripcion: cleanDesc, orden: p.orden || 0, variants: [] })
    }
    const g = grupos.get(key)
    g.orden = Math.min(g.orden, p.orden || 0)
    if (!g.descripcion) g.descripcion = cleanDesc
    g.variants.push({ ...p, sizeLabel, cleanDesc })
  })
  return [...grupos.values()].sort((a, b) => a.orden - b.orden)
}

/**
 * Renderiza la lista de productos en `container`.
 * @param {HTMLElement} container
 * @param {Function}    filter   - (cat) => boolean
 * @param {string}      gridClass - '' | 'grid-2'
 */
export function renderProductList(container, filter) {
  container.innerHTML = ''
  // No se sobreescribe className – cada página define su clase en el HTML
  // (ej: "product-list grid-2" en tradicionales.html)

  const cats = filter ? categorias.filter(filter) : categorias

  cats.forEach(cat => {
    const catProds = productos.filter(p => p.categoria_id === cat.id)
    const catClass = getCategoryClass(cat.nombre)
    const grupos   = agruparProductos(catProds)

    grupos.forEach(grupo => {
      const variants = [...grupo.variants].sort((a, b) => (a.orden || 0) - (b.orden || 0))
      const selected = variants[0]
      const hasVariants = variants.length > 1

      const article = document.createElement('article')
      article.className = `card ${catClass}${!selected.disponible ? ' not-available' : ''}`

      const sizeHint = hasVariants
        ? '<p class="product-size-hint">Porcion o Rueda</p>'
        : selected.sizeLabel
          ? `<p class="product-size-hint">${selected.sizeLabel}</p>`
          : ''

      const destacadoBadge = selected.destacado
        ? `<span class="admin-destacado-badge">⭐ Recomendado</span>`
        : ''

      // Botones de edición: uno por variante (ej: Porción / Rueda)
      const editBtns = variants.map(v => {
        const lbl = v.sizeLabel ? ` ${v.sizeLabel}` : ''
        return `<button class="admin-fab admin-fab-edit" data-action="edit-prod" data-id="${v.id}" title="Editar${lbl}">✏️</button>`
      }).join('')

      article.innerHTML = `
        ${destacadoBadge}
        <div class="card-header">
          ${getBadgeMarkup(cat)}
          ${getAccentMarkup(selected, cat)}
        </div>
        <div class="card-body">
          <div>
            <h3 class="product-name">${grupo.nombre}</h3>
            <p class="product-desc">${grupo.descripcion || ''}</p>
            ${sizeHint}
          </div>
          <p class="product-price">$${selected.precio.toLocaleString('es-CO')}</p>
        </div>
        <button class="card-action" type="button">Pedir</button>
        <div class="card-admin-overlay">
          ${editBtns}
          <button class="admin-fab admin-fab-star" data-action="toggle-star" data-id="${selected.id}" title="Destacar">⭐</button>
          <button class="admin-fab admin-fab-del"  data-action="del-prod"    data-id="${selected.id}" title="Eliminar">🗑️</button>
        </div>`

      container.appendChild(article)
    })
  })
}

// ─────────────────────────────────────────────
// INYECTAR BARRA ADMIN
// ─────────────────────────────────────────────
export function injectAdminBar(logoutPath = './index.html') {
  const bar = document.createElement('div')
  bar.id = '_admin-bar'
  bar.className = 'admin-bar'
  bar.innerHTML = `
    <span class="admin-bar-logo">🍕 La 105 Admin</span>
    <div class="admin-bar-actions">
      <button id="_toggle-mode" class="admin-toggle editing">✏️ Editando</button>
      <button id="_btn-config" class="admin-pill">⚙️ Config</button>
      <button id="_btn-logout" class="admin-pill admin-pill-danger">Salir</button>
    </div>`
  document.body.prepend(bar)

  const instructions = document.createElement('div')
  instructions.id = '_instructions'
  instructions.className = 'admin-instructions'
  instructions.innerHTML = `<p>✏️ <strong>Modo edición activo.</strong>
    Pasa el cursor (o toca) una card para ver los botones de edición.
    Usa ✏️ para editar, ⭐ para destacar y 🗑️ para eliminar.</p>`
  document.body.insertBefore(instructions, bar.nextSibling)

  $('_btn-logout').addEventListener('click', () => logout(logoutPath))
  $('_btn-config').addEventListener('click', loadConfig)
  $('_toggle-mode').addEventListener('click', () => { editMode = !editMode; updateToggleUI() })
}

export function updateToggleUI() {
  const btn  = $('_toggle-mode')
  const main = document.querySelector('.app-main')
  const inst = $('_instructions')
  if (!btn) return
  if (editMode) {
    btn.className = 'admin-toggle editing'
    btn.textContent = '✏️ Editando'
    main?.classList.add('admin-mode')
    if (inst) inst.style.display = ''
  } else {
    btn.className = 'admin-toggle'
    btn.textContent = '👁️ Vista previa'
    main?.classList.remove('admin-mode')
    if (inst) inst.style.display = 'none'
  }
}

// ─────────────────────────────────────────────
// INYECTAR MODALES + LOADING + TOASTS
// ─────────────────────────────────────────────
export function injectModals() {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = `
  <!-- Loading -->
  <div id="_loading" class="admin-loading">
    <div class="admin-loading-box">
      <div class="admin-spinner"></div>
      <p>Cargando...</p>
    </div>
  </div>

  <!-- Toasts -->
  <div id="_toasts" class="admin-toast-container"></div>

  <!-- Modal: Confirmar -->
  <div id="_modal-confirm" class="addons-modal">
    <div class="addons-panel" style="width:min(380px,100%);">
      <div class="addons-header"><h3>⚠️ Confirmar</h3></div>
      <div class="addons-body"><p id="_confirm-msg"></p></div>
      <div class="addons-footer" style="display:flex;gap:10px;justify-content:flex-end;">
        <button class="order-cancel order-btn" data-close="_modal-confirm">Cancelar</button>
        <button class="order-btn admin-btn-danger" id="_btn-confirm-ok">Eliminar</button>
      </div>
    </div>
  </div>

  <!-- Modal: Producto -->
  <div id="_modal-producto" class="addons-modal">
    <div class="addons-panel" style="max-height:92vh;width:min(680px,100%);">
      <div class="addons-header">
        <h3 id="_modal-prod-titulo">Producto</h3>
        <button class="addons-close" data-close="_modal-producto">×</button>
      </div>
      <div class="addons-body">
        <input type="hidden" id="_prod-id" />
        <label class="order-label">Nombre *<input type="text" id="_prod-nombre" class="order-input" placeholder="Ej: Pizza Napolitana" /></label>
        <label class="order-label">Descripción<textarea id="_prod-descripcion" class="order-textarea" rows="2" placeholder="Ingredientes..."></textarea></label>
        <label class="order-label">Descripción corta<input type="text" id="_prod-descripcion-corta" class="order-input" placeholder="Texto breve para la card" /></label>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <label class="order-label">Precio (COP) *<input type="number" id="_prod-precio" class="order-input" placeholder="7000" step="100" /></label>
          <label class="order-label">Categoría *<select id="_prod-categoria" class="order-input"><option value="">Seleccionar...</option></select></label>
        </div>
        <label class="order-label">
          Imagen
          <input type="file" id="_prod-imagen" class="order-input" accept="image/*" />
          <small style="color:var(--muted);">JPG, PNG o WEBP. Opcional.</small>
        </label>
        <div id="_prod-img-preview" class="admin-img-preview" style="display:none;">
          <img id="_prod-img-tag" src="" alt="Preview" />
          <button type="button" class="admin-img-remove" id="_btn-remove-img">×</button>
        </div>
        <label class="order-label">Orden<input type="number" id="_prod-orden" class="order-input" value="0" min="0" /></label>
        <div style="display:flex;gap:20px;margin-top:8px;">
          <label style="display:flex;align-items:center;gap:8px;font-size:14px;cursor:pointer;">
            <input type="checkbox" id="_prod-disponible" checked style="width:18px;height:18px;accent-color:var(--forest);" /> Disponible
          </label>
          <label style="display:flex;align-items:center;gap:8px;font-size:14px;cursor:pointer;">
            <input type="checkbox" id="_prod-destacado" style="width:18px;height:18px;accent-color:var(--gold);" /> Destacado ⭐
          </label>
        </div>
      </div>
      <div class="addons-footer" style="display:flex;gap:10px;justify-content:flex-end;">
        <button class="order-cancel order-btn" data-close="_modal-producto">Cancelar</button>
        <button class="order-send order-btn" id="_btn-guardar-prod">💾 Guardar</button>
      </div>
    </div>
  </div>

  <!-- Modal: Categoría -->
  <div id="_modal-categoria" class="addons-modal">
    <div class="addons-panel" style="max-height:92vh;">
      <div class="addons-header">
        <h3 id="_modal-cat-titulo">Categoría</h3>
        <button class="addons-close" data-close="_modal-categoria">×</button>
      </div>
      <div class="addons-body">
        <input type="hidden" id="_cat-id" />
        <label class="order-label">Nombre *<input type="text" id="_cat-nombre" class="order-input" placeholder="Ej: Pizzas" /></label>
        <label class="order-label">Descripción / Subtítulo<input type="text" id="_cat-descripcion" class="order-input" placeholder="Masa artesanal..." /></label>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
          <label class="order-label">Ícono<input type="text" id="_cat-icono" class="order-input" placeholder="🍕" maxlength="2" /></label>
          <label class="order-label">Color<input type="color" id="_cat-color" class="order-input" value="#FF6B35" style="padding:4px;height:44px;" /></label>
          <label class="order-label">Orden<input type="number" id="_cat-orden" class="order-input" value="0" min="0" /></label>
        </div>
        <label style="display:flex;align-items:center;gap:8px;font-size:14px;margin-top:8px;cursor:pointer;">
          <input type="checkbox" id="_cat-activa" checked style="width:18px;height:18px;accent-color:var(--forest);" /> Activa
        </label>
      </div>
      <div class="addons-footer" style="display:flex;gap:10px;justify-content:flex-end;">
        <button class="order-cancel order-btn" data-close="_modal-categoria">Cancelar</button>
        <button class="order-send order-btn" id="_btn-guardar-cat">💾 Guardar</button>
      </div>
    </div>
  </div>

  <!-- Modal: Configuración -->
  <div id="_modal-config" class="addons-modal">
    <div class="addons-panel" style="max-height:92vh;width:min(680px,100%);">
      <div class="addons-header">
        <h3>⚙️ Configuración del Negocio</h3>
        <button class="addons-close" data-close="_modal-config">×</button>
      </div>
      <div class="addons-body">
        <div class="admin-config-section">
          <h4>🏪 General</h4>
          <label class="order-label">Nombre del negocio<input type="text" id="_cfg-negocio_nombre" class="order-input" /></label>
          <label class="order-label">Dirección<input type="text" id="_cfg-negocio_direccion" class="order-input" /></label>
        </div>
        <div class="admin-config-section">
          <h4>💬 WhatsApp</h4>
          <label class="order-label">Número (sin + ni espacios)<input type="tel" id="_cfg-whatsapp_numero" class="order-input" /><small style="color:var(--muted);">Ej: 573204132725</small></label>
        </div>
        <div class="admin-config-section">
          <h4>🕒 Horarios</h4>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <label class="order-label">Apertura<input type="time" id="_cfg-horario_apertura" class="order-input" /></label>
            <label class="order-label">Cierre<input type="time" id="_cfg-horario_cierre" class="order-input" /></label>
          </div>
          <label class="order-label">Días abierto<input type="text" id="_cfg-dias_abierto" class="order-input" /></label>
        </div>
        <div class="admin-config-section">
          <h4>🛵 Delivery</h4>
          <label style="display:flex;align-items:center;gap:8px;font-size:14px;cursor:pointer;margin-bottom:10px;">
            <input type="checkbox" id="_cfg-delivery_activo" style="width:18px;height:18px;accent-color:var(--forest);" /> Delivery disponible
          </label>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
            <label class="order-label">Precio<input type="number" id="_cfg-delivery_precio" class="order-input" /></label>
            <label class="order-label">Tiempo<input type="text" id="_cfg-delivery_tiempo" class="order-input" /></label>
            <label class="order-label">Mínimo<input type="number" id="_cfg-delivery_minimo" class="order-input" /></label>
          </div>
        </div>
        <div class="admin-config-section">
          <h4>💬 Mensajes</h4>
          <label class="order-label">Bienvenida<input type="text" id="_cfg-mensaje_bienvenida" class="order-input" /></label>
          <label class="order-label">Promoción actual<textarea id="_cfg-mensaje_promocion" class="order-textarea" rows="2"></textarea></label>
          <label style="display:flex;align-items:center;gap:8px;font-size:14px;cursor:pointer;">
            <input type="checkbox" id="_cfg-banner_activo" style="width:18px;height:18px;accent-color:var(--forest);" /> Mostrar banner
          </label>
        </div>
      </div>
      <div class="addons-footer" style="display:flex;gap:10px;justify-content:flex-end;">
        <button class="order-cancel order-btn" data-close="_modal-config">Cancelar</button>
        <button class="order-send order-btn" id="_btn-guardar-config">💾 Guardar</button>
      </div>
    </div>
  </div>`

  document.body.appendChild(wrapper)
  setupModalEvents()
}

function setupModalEvents() {
  // Confirmar
  $('_btn-confirm-ok')?.addEventListener('click', () => {
    closeModal('_modal-confirm')
    if (confirmCallback) { confirmCallback(); confirmCallback = null }
  })

  // Guardar categoría
  $('_btn-guardar-cat')?.addEventListener('click', saveCat)

  // Guardar producto
  $('_btn-guardar-prod')?.addEventListener('click', saveProd)

  // Config
  $('_btn-guardar-config')?.addEventListener('click', saveConfig)

  // Remove image
  $('_btn-remove-img')?.addEventListener('click', () => {
    $('_prod-imagen').value = ''
    hide('_prod-img-preview')
  })

  // Image preview
  $('_prod-imagen')?.addEventListener('change', e => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      $('_prod-img-tag').src = ev.target.result
      show('_prod-img-preview')
    }
    reader.readAsDataURL(file)
  })

  // Close buttons
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.dataset.close))
  })

  // Backdrop
  document.querySelectorAll('.addons-modal').forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.classList.remove('active')
    })
  })
}

// ─────────────────────────────────────────────
// CRUD – CATEGORÍAS
// ─────────────────────────────────────────────
export function openCatModal(catId) {
  const isNew = !catId
  $('_modal-cat-titulo').textContent = isNew ? 'Nueva Categoría' : 'Editar Categoría'
  $('_cat-id').value = ''
  $('_cat-nombre').value = ''
  $('_cat-descripcion').value = ''
  $('_cat-icono').value = '🍕'
  $('_cat-color').value = '#FF6B35'
  $('_cat-orden').value = '0'
  $('_cat-activa').checked = true

  if (!isNew) {
    const cat = categorias.find(c => c.id === catId)
    if (!cat) return
    $('_cat-id').value      = cat.id
    $('_cat-nombre').value  = cat.nombre
    $('_cat-descripcion').value = cat.descripcion || ''
    $('_cat-icono').value   = cat.icono || '🍕'
    $('_cat-color').value   = cat.color || '#FF6B35'
    $('_cat-orden').value   = cat.orden || 0
    $('_cat-activa').checked = cat.activa
  }
  openModal('_modal-categoria')
}

async function saveCat() {
  const id     = $('_cat-id').value
  const nombre = $('_cat-nombre').value.trim()
  if (!nombre) { toast('El nombre es obligatorio', 'error'); return }

  loading('Guardando categoría...')
  const data = {
    nombre,
    descripcion: $('_cat-descripcion').value.trim(),
    icono:  $('_cat-icono').value.trim(),
    color:  $('_cat-color').value,
    orden:  parseInt($('_cat-orden').value) || 0,
    activa: $('_cat-activa').checked
  }
  const { error } = id
    ? await supabase.from('categorias').update(data).eq('id', id)
    : await supabase.from('categorias').insert([data])

  loaded()
  if (error) { toast(error.message, 'error'); return }
  closeModal('_modal-categoria')
  toast(id ? 'Categoría actualizada' : 'Categoría creada', 'success')
  window.location.reload()
}

export function deleteCat(id) {
  confirmAction('¿Eliminar esta categoría?', async () => {
    loading('Eliminando...')
    const { error } = await supabase.from('categorias').delete().eq('id', id)
    loaded()
    if (error) { toast(error.message, 'error'); return }
    toast('Categoría eliminada', 'success')
    window.location.reload()
  })
}

// ─────────────────────────────────────────────
// CRUD – PRODUCTOS
// ─────────────────────────────────────────────
function populateCatSelect() {
  const sel = $('_prod-categoria')
  if (!sel) return
  sel.innerHTML = '<option value="">Seleccionar...</option>' +
    categorias.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('')
}

export function openProdModal(prodId, defaultCatId) {
  populateCatSelect()
  const isNew = !prodId
  $('_modal-prod-titulo').textContent = isNew ? 'Nuevo Producto' : 'Editar Producto'
  $('_prod-id').value = ''
  $('_prod-nombre').value = ''
  $('_prod-descripcion').value = ''
  $('_prod-descripcion-corta').value = ''
  $('_prod-precio').value = ''
  $('_prod-categoria').value = defaultCatId || ''
  $('_prod-orden').value = '0'
  $('_prod-disponible').checked = true
  $('_prod-destacado').checked = false
  $('_prod-imagen').value = ''
  hide('_prod-img-preview')

  if (!isNew) {
    const prod = productos.find(p => p.id === prodId)
    if (!prod) return
    $('_prod-id').value = prod.id
    $('_prod-nombre').value = prod.nombre
    $('_prod-descripcion').value = prod.descripcion || ''
    $('_prod-descripcion-corta').value = prod.descripcion_corta || ''
    $('_prod-precio').value = prod.precio
    $('_prod-categoria').value = prod.categoria_id || ''
    $('_prod-orden').value = prod.orden || 0
    $('_prod-disponible').checked = prod.disponible
    $('_prod-destacado').checked = prod.destacado
    if (prod.imagen_url) { $('_prod-img-tag').src = prod.imagen_url; show('_prod-img-preview') }
  }
  openModal('_modal-producto')
}

async function saveProd() {
  const id     = $('_prod-id').value
  const nombre = $('_prod-nombre').value.trim()
  const precio = parseFloat($('_prod-precio').value)
  const catId  = $('_prod-categoria').value
  if (!nombre || !precio || !catId) { toast('Completa los campos obligatorios', 'error'); return }

  loading('Guardando producto...')
  let imagen_url = id ? (productos.find(p => p.id === id)?.imagen_url || null) : null

  const file = $('_prod-imagen').files[0]
  if (file) {
    const fname = `${Date.now()}_${file.name}`
    const { error: upErr } = await supabase.storage.from('productos').upload(fname, file)
    if (upErr) { loaded(); toast('Error subiendo imagen', 'error'); return }
    imagen_url = supabase.storage.from('productos').getPublicUrl(fname).data.publicUrl
  }

  const data = {
    nombre,
    descripcion:        $('_prod-descripcion').value.trim(),
    descripcion_corta:  $('_prod-descripcion-corta').value.trim(),
    precio, categoria_id: catId, imagen_url,
    orden:      parseInt($('_prod-orden').value) || 0,
    disponible: $('_prod-disponible').checked,
    destacado:  $('_prod-destacado').checked
  }
  const { error } = id
    ? await supabase.from('productos').update(data).eq('id', id)
    : await supabase.from('productos').insert([data])

  loaded()
  if (error) { toast(error.message, 'error'); return }
  closeModal('_modal-producto')
  toast(id ? 'Producto actualizado' : 'Producto creado', 'success')
  window.location.reload()
}

export function deleteProd(id) {
  confirmAction('¿Eliminar este producto?', async () => {
    loading('Eliminando...')
    const { error } = await supabase.from('productos').delete().eq('id', id)
    loaded()
    if (error) { toast(error.message, 'error'); return }
    toast('Producto eliminado', 'success')
    window.location.reload()
  })
}

export async function toggleStar(id) {
  const prod = productos.find(p => p.id === id)
  if (!prod) return
  loading('Actualizando...')
  const { error } = await supabase.from('productos').update({ destacado: !prod.destacado }).eq('id', id)
  loaded()
  if (error) { toast(error.message, 'error'); return }
  toast(prod.destacado ? 'Destacado removido' : '⭐ Producto destacado', 'success')
  window.location.reload()
}

// ─────────────────────────────────────────────
// CONFIGURACIÓN
// ─────────────────────────────────────────────
async function loadConfig() {
  loading('Cargando configuración...')
  const { data, error } = await supabase.from('configuracion').select('*')
  loaded()
  if (error) { toast('Error cargando configuración', 'error'); return }
  const cfg = {}
  data.forEach(r => { cfg[r.clave] = r.valor })
  Object.keys(cfg).forEach(key => {
    const el = $(`_cfg-${key}`)
    if (!el) return
    if (el.type === 'checkbox') el.checked = cfg[key] === 'true'
    else el.value = cfg[key] || ''
  })
  openModal('_modal-config')
}

async function saveConfig() {
  loading('Guardando configuración...')
  const inputs  = document.querySelectorAll('[id^="_cfg-"]')
  const updates = []
  inputs.forEach(el => {
    const key = el.id.replace('_cfg-', '')
    const val = el.type === 'checkbox' ? (el.checked ? 'true' : 'false') : el.value
    updates.push(supabase.from('configuracion').update({ valor: val }).eq('clave', key))
  })
  await Promise.all(updates)
  loaded()
  closeModal('_modal-config')
  toast('Configuración guardada', 'success')
}

// ─────────────────────────────────────────────
// EVENTOS DELEGADOS (clicks en cards)
// ─────────────────────────────────────────────
export function setupCardEvents(container) {
  if (!container) return
  container.addEventListener('click', e => {
    const btn = e.target.closest('[data-action]')
    if (!btn) return
    e.preventDefault(); e.stopPropagation()
    const { action, id, cat } = btn.dataset
    switch (action) {
      case 'edit-prod':    openProdModal(id); break
      case 'del-prod':     deleteProd(id); break
      case 'toggle-star':  toggleStar(id); break
      case 'add-prod':     openProdModal(null, cat); break
      case 'edit-cat':     openCatModal(id); break
      case 'del-cat':      deleteCat(id); break
    }
  })
  // Touch: tap para mostrar overlay
  container.addEventListener('touchstart', e => {
    const card = e.target.closest('.card')
    if (!card || !editMode) return
    document.querySelectorAll('.card.touch-active').forEach(c => c !== card && c.classList.remove('touch-active'))
    card.classList.toggle('touch-active')
  }, { passive: true })
}

// ─────────────────────────────────────────────
// INIT – PÁGINAS DE CATEGORÍAS
// ─────────────────────────────────────────────

/**
 * Inicializa una página de categorías del admin.
 * @param {object} cfg
 * @param {string}   cfg.assetBase     - '../' o ''
 * @param {string}   cfg.logoutPath    - path al index de login
 * @param {Function} cfg.filter        - (cat) => boolean – qué categorías mostrar
 * @param {string}   [cfg.gridClass]   - 'grid-2' para layout de 2 columnas
 * @param {string}   [cfg.listId]      - id del elemento donde se renderiza
 */
export async function initPage({ assetBase = '../', logoutPath = '../index.html', filter, gridClass = '', listId = 'product-list' }) {
  _assetBase = assetBase

  // 1. Inyectar modales + loading + toasts
  injectModals()

  // 2. Verificar sesión
  const session = await checkSession()
  if (!session) { window.location.href = logoutPath; return }

  // 3. Inyectar barra admin
  injectAdminBar(logoutPath)

  // 4. Activar tab activo
  const page = document.body.dataset.page
  document.querySelectorAll('.tab-link').forEach(a => {
    if (a.dataset.page === page) a.classList.add('active')
  })

  // 5. Cargar datos
  await loadAll()

  // 6. Renderizar lista
  const container = $(listId)
  if (container && filter) {
    renderProductList(container, filter, gridClass)
  }

  // 7. Eventos en cards
  setupCardEvents(container)

  // 8. Toggle UI inicial
  updateToggleUI()
}
