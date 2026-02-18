// menu.js - Script para el sitio web público

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://golgsnrevkjtusououcz.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvbGdzbnJldmtqdHVzb3VvdWN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMTM1NTgsImV4cCI6MjA4NjU4OTU1OH0.0JcvLg6DyPRH-wpcEeGpZ-OtdAvq4FGPm7fbs6Bo3EU";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function cargarMenu() {
  try {
    mostrarEstadoCarga(true);
    const { data: categorias, error } = await supabase
      .from("categorias")
      .select(
        `
        *,
        productos!inner (
          *,
          variantes (*)
        )
      `,
      )
      .eq("activa", true)
      .eq("productos.disponible", true)
      .order("orden", { ascending: true });

    if (error) throw error;

    renderMenu(categorias ?? []);
    mostrarEstadoCarga(false);
  } catch (error) {
    console.error("Error cargando menú:", error);
    mostrarMensajeError();
  }
}

function renderMenu(categorias) {
  const menuContainer = document.getElementById("menu");
  if (!menuContainer) return;
  menuContainer.innerHTML = "";

  categorias.forEach((categoria) => {
    const productosDisponibles = (categoria.productos ?? []).filter(
      (p) => p.disponible,
    );
    if (productosDisponibles.length === 0) return;

    const seccion = document.createElement("section");
    seccion.className = "categoria-seccion";
    seccion.innerHTML = `
      <header class="categoria-header">
        <h2>${categoria.icono ? `${categoria.icono} ` : ""}${categoria.nombre}</h2>
        ${categoria.descripcion ? `<p>${categoria.descripcion}</p>` : ""}
      </header>
      <div class="productos-grid">
        ${productosDisponibles.map(crearCardProducto).join("")}
      </div>
    `;
    menuContainer.appendChild(seccion);
  });
}

function crearCardProducto(producto) {
  const variantesHtml = producto?.variantes?.length
    ? `<ul class="producto-variantes">
        ${producto.variantes
          .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0))
          .map(
            (vari) =>
              `<li>${vari.nombre} (${vari.ajuste_precio >= 0 ? "+" : "-"}${formatearPrecio(Math.abs(vari.ajuste_precio))})</li>`,
          )
          .join("")}
      </ul>`
    : "";

  return `
    <article class="producto-publico" data-id="${producto.id}">
      ${producto.imagen_url ? `<img src="${producto.imagen_url}" alt="${producto.nombre}" loading="lazy">` : ""}
      <div class="producto-publico-body">
        <div class="producto-publico-header">
          <h3>${producto.nombre}</h3>
          <span class="producto-precio">${formatearPrecio(producto.precio)}</span>
        </div>
        ${producto.destacado ? '<span class="badge-destacado">⭐ Recomendado</span>' : ""}
        ${producto.descripcion ? `<p>${producto.descripcion}</p>` : ""}
        ${variantesHtml}
        <button class="btn-agregar" type="button" data-producto="${producto.id}">
          Agregar al pedido
        </button>
      </div>
    </article>
  `;
}

function formatearPrecio(precio) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(precio);
}

function mostrarEstadoCarga(mostrando) {
  const loader = document.getElementById("menu-loader");
  if (!loader) return;
  loader.style.display = mostrando ? "flex" : "none";
}

function mostrarMensajeError() {
  const menuContainer = document.getElementById("menu");
  if (!menuContainer) return;
  menuContainer.innerHTML = `
    <div class="menu-error">
      <p>😕 No pudimos cargar el menú en este momento.</p>
      <button type="button" id="reintentar-menu">Reintentar</button>
    </div>
  `;
  const reintentarBtn = document.getElementById("reintentar-menu");
  if (reintentarBtn) {
    reintentarBtn.addEventListener("click", cargarMenu);
  }
}

cargarMenu();
setInterval(cargarMenu, 5 * 60 * 1000);
