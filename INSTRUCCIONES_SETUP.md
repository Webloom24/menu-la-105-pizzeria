# Instrucciones de Configuración – Panel Admin La 105

## Qué necesitas hacer (solo una vez)

Hay **4 pasos** en Supabase y **1 paso** en GitHub. El panel ya está construido y listo.

---

## Paso 1: Crear las tablas en Supabase

1. Entra a [supabase.com](https://supabase.com) y abre tu proyecto
2. Ve a **SQL Editor** → **New query**
3. Copia y pega todo el contenido del archivo `admin-panel/schema.sql`
4. Presiona **Run** (o `Ctrl + Enter`)
5. Deberías ver: `Success. No rows returned`

Esto crea las tablas `categorias`, `productos` y `configuracion`, activa los permisos y carga los valores iniciales de configuración.

---

## Paso 2: Cargar el menú completo

1. Sigue en **SQL Editor** → **New query**
2. Copia y pega todo el contenido de `admin-panel/CARGAR_DATOS_MENU.sql`
3. Presiona **Run**
4. Deberías ver: `Success. X rows affected`

Esto inserta las 5 categorías y los 37 productos del menú actual.

---

## Paso 3: Crear el bucket de imágenes

1. Ve a **Storage** en el menú lateral de Supabase
2. Haz clic en **New bucket**
3. Nombre: `productos`
4. Marca **Public bucket** (para que las fotos sean visibles en el admin)
5. Haz clic en **Save**

---

## Paso 4: Crear el usuario administrador

1. Ve a **Authentication** → **Users**
2. Haz clic en **Add user** → **Create new user**
3. Ingresa tu correo (el que usarás para entrar al admin)
4. Crea una contraseña segura
5. Haz clic en **Create user**

---

## Paso 5: Subir a GitHub

Sube todos los archivos al repositorio. El admin quedará disponible en:

```
https://[tu-usuario].github.io/[tu-repo]/admin-panel/index.html
```

---

## Cómo usar el admin

1. Abre la URL del admin en tu navegador
2. Inicia sesión con el correo y contraseña que creaste
3. Verás el panel idéntico al menú público, pero con modo edición activo
4. **Para editar un producto**: pasa el cursor encima de la card (o toca en celular) → aparecen los botones ✏️ ⭐ 🗑️
5. **Para agregar un producto**: botón `+ Agregar` al final de cada sección
6. **Para cambiar datos del negocio**: botón `⚙️ Config` en la barra superior
7. **Vista previa**: botón `👁️ Vista previa` oculta los controles y muestra cómo lo ve el cliente

---

## Estructura de archivos del admin

```
admin-panel/
  index.html              ← Inicio + login
  schema.sql              ← Script para crear las tablas (ejecutar una vez)
  CARGAR_DATOS_MENU.sql   ← Script para cargar los productos (ejecutar una vez)
  css/
    admin-overlay.css     ← Estilos del panel (encima del CSS del menú)
  js/
    admin-core.js         ← Lógica compartida de todas las páginas
  pages/
    especialidades.html   ← Página de especialidades (editable)
    tradicionales.html    ← Página de tradicionales (editable)
    pizzas.html           ← Vista combinada de pizzas (editable)
    panzerottis.html      ← Panzerottis (editable)
    promo.html            ← Promo semanal (editable visualmente)
```

---

## Solución de problemas

### No puedo iniciar sesión
- Abre la consola del navegador (`F12` → pestaña **Console**)
- Copia el mensaje de error exacto
- Verifica que el correo y contraseña son los que creaste en Supabase Auth

### Las cards no cargan (pantalla vacía)
- Verifica que el **Paso 1** (schema) y **Paso 2** (datos) se ejecutaron correctamente
- En Supabase → **Table Editor** deberías ver filas en `categorias` y `productos`

### Error al subir imágenes
- Verifica que el bucket `productos` existe en **Storage**
- El bucket debe estar marcado como **Public**

### Los cambios no aparecen en el menú público
- El menú público lee datos de Supabase al abrir la página
- Asegúrate de haber guardado el cambio en el admin (aparece un toast verde "Producto actualizado")
- Recarga el menú público con `Ctrl + F5` para ver los cambios
- Si el menú muestra datos viejos es porque el navegador tiene caché — espera 1-2 minutos o fuerza recarga
