import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://golgsnrevkjtusououcz.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvbGdzbnJldmtqdHVzb3VvdWN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMTM1NTgsImV4cCI6MjA4NjU4OTU1OH0.0JcvLg6DyPRH-wpcEeGpZ-OtdAvq4FGPm7fbs6Bo3EU'
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Imágenes decorativas (mismas del menú público)
const PIZZA_IMGS = ['../images/pizza1.webp', '../images/pizza2.webp', '../images/pizza3.webp', '../images/pizzeta.webp']
const PANZ_IMGS = ['../images/panzzeroti.webp', '../images/panzzerotis.webp']

let usuario = null
let categorias = []
let productos = []
let configuracion = {}
let editMode = true
let confirmCallback = null

// ============================================
// UTILIDADES
// ============================================
const $ = id => document.getElementById(id)
const show = el => { if (typeof el === 'string') el = $(el); if (el) el.style.display = '' }
const hide = el => { if (typeof el === 'string') el = $(el); if (el) el.style.display = 'none' }

function loading(msg = 'Cargando...') {
  $('loading-msg').textContent = msg
  $('loading').classList.add('active')
}
function loaded() { $('loading').classList.remove('active') }

function toast(msg, type = 'info') {
  const c = $('toasts')
  const icons = { success: '✓', error: '✕', info: 'ℹ' }
  const el = document.createElement('div')
  el.className = `admin-toast t-${type}`
  el.innerHTML = `<span class="t-icon">${icons[type] || 'ℹ'}</span><span class="t-text">${msg}</span>`
  c.appendChild(el)
  setTimeout(() => el.remove(), 4000)
}

function openModal(id) { $(id).classList.add('active') }
function closeModal(id) { $(id).classList.remove('active') }

function confirmAction(msg, cb) {
  $('confirm-msg').textContent = msg
  confirmCallback = cb
  openModal('modal-confirm')
}

// ============================================
// AUTH
// ============================================
async function login(email, pw) {
  loading('Iniciando sesión...')
  const { data, error } = await supabase.auth.signInWithPassword({ email, password: pw })
  loaded()
  if (error) {
    const errEl = $('login-error')
    errEl.textContent = error.message
    errEl.classList.add('visible')
    setTimeout(() => errEl.classList.remove('visible'), 5000)
    return
  }
  usuario = data.user
  enterAdmin()
}

async function logout() {
  loading('Cerrando sesión...')
  await supabase.auth.signOut()
  loaded()
  usuario = null
  hide('admin-bar'); hide('admin-main'); hide('menu-header'); hide('admin-instructions')
  show('login-screen')
}

async function checkSession() {
  const { data: { session } } = await supabase.auth.getSession()
  if (session) { usuario = session.user; enterAdmin() }
}

function enterAdmin() {
  hide('login-screen')
  show('admin-bar')
  show('admin-main')
  show('menu-header')
  if (editMode) show('admin-instructions')
  updateToggleUI()
  loadAll()
}

// ============================================
// CARGAR DATOS
// ============================================
async function loadAll() {
  loading('Cargando menú...')
  const [catsRes, prodsRes] = await Promise.all([
    supabase.from('categorias').select('*').order('orden'),
    supabase.from('productos').select('*').order('orden')
  ])
  categorias = catsRes.data || []
  productos = prodsRes.data || []
  loaded()
  updateStats()
  renderMenu()
}

function updateStats() {
  $('stat-cats').textContent = categorias.length
  $('stat-prods').textContent = productos.length
  $('stat-disp').textContent = productos.filter(p => p.disponible).length
  $('stat-dest').textContent = productos.filter(p => p.destacado).length
}

// ============================================
// RENDER MENÚ – CLON EXACTO DEL PÚBLICO
// ============================================

// Parse size from description (idéntico al público)
function parseSizeFromDesc(desc = '') {
  const sizeMatch = desc.match(/^(Porcion|Porción|Rueda)\.\s*/i)
  const sizeLabel = sizeMatch ? sizeMatch[1].replace('Porción', 'Porcion') : ''
  const cleanDesc = sizeMatch ? desc.replace(sizeMatch[0], '').trim() : desc
  return { sizeLabel, cleanDesc }
}

// Clase CSS de categoría (idéntico al público)
function getCategoryClass(catNombre) {
  const n = (catNombre || '').toLowerCase()
  if (n.includes('especial') || n.includes('pizzeta')) return 'card-especialidad'
  if (n.includes('clasic') || n.includes('tradic') || n.includes('barrio')) return 'card-tradicional'
  if (n.includes('panzerotti') || n.includes('panzzerotti')) return 'card-panzerotti'
  if (n.includes('adicional')) return 'card-adicional'
  return 'card-tradicional'
}

// Accent image (idéntico al público)
function getAccentMarkup(prod, cat) {
  const catName = (cat.nombre || '').toLowerCase()
  const isPanz = catName.includes('panzerotti')
  const pool = isPanz ? PANZ_IMGS : PIZZA_IMGS
  const src = pool[Math.floor(Math.random() * pool.length)]
  const seed = (prod.orden || 0) + (prod.precio || 0)
  const size = seed % 2 === 0 ? 82 : 90
  const offset = seed % 3 === 0 ? -6 : 6
  const rotation = seed % 2 === 0 ? -4 : 4
  return `
    <div class="card-accent"
      style="--accent-size:${size}px;--accent-offset:${offset}px;--accent-rotation:${rotation}deg;"
      aria-hidden="true">
      <img src="${prod.imagen_url || src}" alt="" width="${size}" height="${size}" loading="lazy" />
    </div>
  `
}

// Badge 30min para panzerottis (idéntico al público)
function getBadgeMarkup(cat) {
  const catName = (cat.nombre || '').toLowerCase()
  if (catName.includes('panzerotti')) {
    return `<img class="product-badge" src="../images/distintivos/badge-30-min.svg"
      onerror="this.onerror=null;this.src='../images/distintivos/badge-30-min.webp';"
      alt="Horneado en 30 min" width="62" height="62" loading="lazy" />`
  }
  return ''
}

// Agrupar productos por nombre (variantes Porción/Rueda, idéntico al público)
function agruparProductos(prods) {
  const grupos = new Map()
  prods.forEach(p => {
    const { sizeLabel, cleanDesc } = parseSizeFromDesc(p.descripcion || '')
    const key = (p.nombre || '').toLowerCase()
    if (!grupos.has(key)) {
      grupos.set(key, {
        nombre: p.nombre,
        descripcion: cleanDesc,
        orden: p.orden || 0,
        variants: []
      })
    }
    const grupo = grupos.get(key)
    grupo.orden = Math.min(grupo.orden, p.orden || 0)
    if (!grupo.descripcion) grupo.descripcion = cleanDesc
    grupo.variants.push({ ...p, sizeLabel, cleanDesc })
  })
  return [...grupos.values()].sort((a, b) => a.orden - b.orden)
}

function renderMenu() {
  const container = $('menu-container')
  container.innerHTML = ''

  categorias.forEach(cat => {
    const catProds = productos.filter(p => p.categoria_id === cat.id)
    const catClass = getCategoryClass(cat.nombre)
    const isPanz = (cat.nombre || '').toLowerCase().includes('panzerotti')

    const section = document.createElement('div')
    section.dataset.catId = cat.id

    // Header de categoría = .section-intro (idéntico al público)
    const intro = document.createElement('section')
    intro.className = 'section-intro'
    intro.innerHTML = `
      <h2>${cat.nombre}</h2>
      <p>${cat.descripcion || ''}</p>
      <div class="admin-cat-btns">
        <button class="admin-cat-btn" data-action="edit-cat" data-id="${cat.id}">✏️ Editar categoría</button>
        <button class="admin-cat-btn btn-del" data-action="del-cat" data-id="${cat.id}">🗑️ Eliminar</button>
      </div>
    `
    section.appendChild(intro)

    // Lista de productos = .product-list (idéntico al público)
    const list = document.createElement('section')
    list.className = 'product-list'

    const grupos = agruparProductos(catProds)

    grupos.forEach(grupo => {
      const variants = [...grupo.variants].sort((a, b) => (a.orden || 0) - (b.orden || 0))
      const selected = variants[0]
      const hasVariants = variants.length > 1

      const article = document.createElement('article')
      article.className = `card ${catClass}`
      if (!selected.disponible) article.classList.add('not-available')

      const sizeHint = hasVariants
        ? '<p class="product-size-hint">Porcion o Rueda</p>'
        : selected.sizeLabel
          ? `<p class="product-size-hint">${selected.sizeLabel}</p>`
          : ''

      const badge = getBadgeMarkup(cat)
      const accent = getAccentMarkup(selected, cat)

      const destacadoBadge = selected.destacado
        ? '<span style="position:absolute;top:10px;left:10px;background:var(--gold);color:#fff;padding:3px 10px;border-radius:999px;font-size:11px;font-weight:600;z-index:15;">⭐ Recomendado</span>'
        : ''

      // Botones de edición: uno por cada variante del grupo
      const editBtns = variants.map(v => {
        const label = v.sizeLabel ? v.sizeLabel : 'Editar'
        return `<button class="admin-fab admin-fab-edit" data-action="edit-prod" data-id="${v.id}" title="Editar ${label}">✏️</button>`
      }).join('')

      article.innerHTML = `
        ${destacadoBadge}
        <div class="card-header">
          ${badge}
          ${accent}
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
          <button class="admin-fab admin-fab-del" data-action="del-prod" data-id="${selected.id}" title="Eliminar">🗑️</button>
        </div>
      `

      list.appendChild(article)
    })

    section.appendChild(list)

    // Botón "+ Agregar Producto"
    const addBtn = document.createElement('button')
    addBtn.className = 'admin-add-prod'
    addBtn.dataset.action = 'add-prod'
    addBtn.dataset.cat = cat.id
    addBtn.textContent = '+ Agregar Producto'
    section.appendChild(addBtn)

    container.appendChild(section)
  })

  // Botón "+ Nueva Categoría"
  const newBlock = document.createElement('div')
  newBlock.className = 'admin-new-cat-block'
  newBlock.innerHTML = '<button class="admin-new-cat-btn" data-action="add-cat">+ Nueva Categoría</button>'
  container.appendChild(newBlock)
}

// ============================================
// TOGGLE MODO VER / EDITAR
// ============================================
function updateToggleUI() {
  const btn = $('toggle-mode')
  const icon = $('toggle-icon')
  const label = $('toggle-label')
  if (editMode) {
    btn.classList.add('editing')
    icon.textContent = '✏️'
    label.textContent = 'Editando'
    $('admin-main').classList.add('admin-mode')
    show('admin-instructions')
  } else {
    btn.classList.remove('editing')
    icon.textContent = '👁️'
    label.textContent = 'Vista previa'
    $('admin-main').classList.remove('admin-mode')
    hide('admin-instructions')
  }
}

// ============================================
// CATEGORÍAS: CRUD
// ============================================
function openCatModal(catId) {
  const isNew = !catId
  $('modal-cat-titulo').textContent = isNew ? 'Nueva Categoría' : 'Editar Categoría'
  $('cat-id').value = ''
  $('cat-nombre').value = ''
  $('cat-descripcion').value = ''
  $('cat-icono').value = '🍕'
  $('cat-color').value = '#FF6B35'
  $('cat-orden').value = '0'
  $('cat-activa').checked = true

  if (!isNew) {
    const cat = categorias.find(c => c.id === catId)
    if (!cat) return
    $('cat-id').value = cat.id
    $('cat-nombre').value = cat.nombre
    $('cat-descripcion').value = cat.descripcion || ''
    $('cat-icono').value = cat.icono || '🍕'
    $('cat-color').value = cat.color || '#FF6B35'
    $('cat-orden').value = cat.orden || 0
    $('cat-activa').checked = cat.activa
  }
  openModal('modal-categoria')
}

async function saveCat() {
  const id = $('cat-id').value
  const nombre = $('cat-nombre').value.trim()
  if (!nombre) { toast('El nombre es obligatorio', 'error'); return }

  loading('Guardando categoría...')
  const data = {
    nombre,
    descripcion: $('cat-descripcion').value.trim(),
    icono: $('cat-icono').value.trim(),
    color: $('cat-color').value,
    orden: parseInt($('cat-orden').value) || 0,
    activa: $('cat-activa').checked
  }

  const { error } = id
    ? await supabase.from('categorias').update(data).eq('id', id)
    : await supabase.from('categorias').insert([data])

  loaded()
  if (error) { toast(error.message, 'error'); return }
  closeModal('modal-categoria')
  toast(id ? 'Categoría actualizada' : 'Categoría creada', 'success')
  loadAll()
}

async function deleteCat(id) {
  confirmAction('¿Eliminar esta categoría y todos sus productos?', async () => {
    loading('Eliminando...')
    const { error } = await supabase.from('categorias').delete().eq('id', id)
    loaded()
    if (error) { toast(error.message, 'error'); return }
    toast('Categoría eliminada', 'success')
    loadAll()
  })
}

// ============================================
// PRODUCTOS: CRUD
// ============================================
function populateCatSelect() {
  const sel = $('prod-categoria')
  sel.innerHTML = '<option value="">Seleccionar...</option>' +
    categorias.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('')
}

function openProdModal(prodId, defaultCatId) {
  const isNew = !prodId
  populateCatSelect()
  $('modal-prod-titulo').textContent = isNew ? 'Nuevo Producto' : 'Editar Producto'
  $('prod-id').value = ''
  $('prod-nombre').value = ''
  $('prod-descripcion').value = ''
  $('prod-descripcion-corta').value = ''
  $('prod-precio').value = ''
  $('prod-categoria').value = defaultCatId || ''
  $('prod-orden').value = '0'
  $('prod-disponible').checked = true
  $('prod-destacado').checked = false
  $('prod-imagen').value = ''
  hide('prod-img-preview')

  if (!isNew) {
    const prod = productos.find(p => p.id === prodId)
    if (!prod) return
    $('prod-id').value = prod.id
    $('prod-nombre').value = prod.nombre
    $('prod-descripcion').value = prod.descripcion || ''
    $('prod-descripcion-corta').value = prod.descripcion_corta || ''
    $('prod-precio').value = prod.precio
    $('prod-categoria').value = prod.categoria_id || ''
    $('prod-orden').value = prod.orden || 0
    $('prod-disponible').checked = prod.disponible
    $('prod-destacado').checked = prod.destacado
    if (prod.imagen_url) {
      $('prod-img-tag').src = prod.imagen_url
      show('prod-img-preview')
    }
  }
  openModal('modal-producto')
}

async function saveProd() {
  const id = $('prod-id').value
  const nombre = $('prod-nombre').value.trim()
  const precio = parseFloat($('prod-precio').value)
  const catId = $('prod-categoria').value
  if (!nombre || !precio || !catId) { toast('Completa los campos obligatorios', 'error'); return }

  loading('Guardando producto...')

  let imagen_url = null
  if (id) {
    const existing = productos.find(p => p.id === id)
    imagen_url = existing?.imagen_url || null
  }

  const file = $('prod-imagen').files[0]
  if (file) {
    const fname = `${Date.now()}_${file.name}`
    const { error: upErr } = await supabase.storage.from('productos').upload(fname, file)
    if (upErr) { loaded(); toast('Error subiendo imagen', 'error'); return }
    const { data: urlData } = supabase.storage.from('productos').getPublicUrl(fname)
    imagen_url = urlData.publicUrl
  }

  const data = {
    nombre,
    descripcion: $('prod-descripcion').value.trim(),
    descripcion_corta: $('prod-descripcion-corta').value.trim(),
    precio,
    categoria_id: catId,
    imagen_url,
    orden: parseInt($('prod-orden').value) || 0,
    disponible: $('prod-disponible').checked,
    destacado: $('prod-destacado').checked
  }

  const { error } = id
    ? await supabase.from('productos').update(data).eq('id', id)
    : await supabase.from('productos').insert([data])

  loaded()
  if (error) { toast(error.message, 'error'); return }
  closeModal('modal-producto')
  toast(id ? 'Producto actualizado' : 'Producto creado', 'success')
  loadAll()
}

async function deleteProd(id) {
  confirmAction('¿Eliminar este producto?', async () => {
    loading('Eliminando...')
    const { error } = await supabase.from('productos').delete().eq('id', id)
    loaded()
    if (error) { toast(error.message, 'error'); return }
    toast('Producto eliminado', 'success')
    loadAll()
  })
}

async function toggleStar(id) {
  const prod = productos.find(p => p.id === id)
  if (!prod) return
  loading('Actualizando...')
  const { error } = await supabase.from('productos').update({ destacado: !prod.destacado }).eq('id', id)
  loaded()
  if (error) { toast(error.message, 'error'); return }
  toast(prod.destacado ? 'Destacado removido' : 'Producto destacado ⭐', 'success')
  loadAll()
}

// ============================================
// CONFIGURACIÓN
// ============================================
async function loadConfig() {
  loading('Cargando configuración...')
  const { data, error } = await supabase.from('configuracion').select('*')
  loaded()
  if (error) { toast('Error cargando configuración', 'error'); return }
  configuracion = {}
  data.forEach(r => { configuracion[r.clave] = r.valor })

  Object.keys(configuracion).forEach(key => {
    const el = $(`cfg-${key}`)
    if (!el) return
    if (el.type === 'checkbox') el.checked = configuracion[key] === 'true'
    else el.value = configuracion[key] || ''
  })
  openModal('modal-config')
}

async function saveConfig() {
  loading('Guardando configuración...')
  const inputs = document.querySelectorAll('[id^="cfg-"]')
  const updates = []
  inputs.forEach(el => {
    const key = el.id.replace('cfg-', '')
    const val = el.type === 'checkbox' ? (el.checked ? 'true' : 'false') : el.value
    updates.push(supabase.from('configuracion').update({ valor: val }).eq('clave', key))
  })
  await Promise.all(updates)
  loaded()
  closeModal('modal-config')
  toast('Configuración guardada', 'success')
}

// ============================================
// EVENT LISTENERS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  checkSession()

  // Login
  $('login-form').addEventListener('submit', e => {
    e.preventDefault()
    login($('login-email').value, $('login-password').value)
  })

  // Logout
  $('btn-logout').addEventListener('click', logout)

  // Toggle mode
  $('toggle-mode').addEventListener('click', () => {
    editMode = !editMode
    updateToggleUI()
  })

  // Config
  $('btn-config').addEventListener('click', loadConfig)
  $('btn-guardar-config').addEventListener('click', saveConfig)

  // Guardar categoría
  $('btn-guardar-cat').addEventListener('click', saveCat)

  // Guardar producto
  $('btn-guardar-prod').addEventListener('click', saveProd)

  // Remove image preview
  $('btn-remove-img').addEventListener('click', () => {
    $('prod-imagen').value = ''
    hide('prod-img-preview')
  })

  // Image preview
  $('prod-imagen').addEventListener('change', e => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      $('prod-img-tag').src = ev.target.result
      show('prod-img-preview')
    }
    reader.readAsDataURL(file)
  })

  // Confirm modal
  $('btn-confirm-ok').addEventListener('click', () => {
    closeModal('modal-confirm')
    if (confirmCallback) { confirmCallback(); confirmCallback = null }
  })

  // Close modals
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.dataset.close))
  })

  // Close modals on backdrop
  document.querySelectorAll('.addons-modal').forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.classList.remove('active')
    })
  })

  // Delegated clicks para acciones del menú
  $('menu-container').addEventListener('click', e => {
    const btn = e.target.closest('[data-action]')
    if (!btn) return
    e.preventDefault()
    e.stopPropagation()
    const action = btn.dataset.action
    const id = btn.dataset.id
    const cat = btn.dataset.cat

    switch (action) {
      case 'add-cat':     openCatModal(null); break
      case 'edit-cat':    openCatModal(id); break
      case 'del-cat':     deleteCat(id); break
      case 'add-prod':    openProdModal(null, cat); break
      case 'edit-prod':   openProdModal(id); break
      case 'del-prod':    deleteProd(id); break
      case 'toggle-star': toggleStar(id); break
    }
  })

  // Touch: tap card para mostrar overlay en móvil
  $('menu-container').addEventListener('touchstart', e => {
    const card = e.target.closest('.card')
    if (!card || !editMode) return
    document.querySelectorAll('.card.touch-active').forEach(c => {
      if (c !== card) c.classList.remove('touch-active')
    })
    card.classList.toggle('touch-active')
  }, { passive: true })
})
