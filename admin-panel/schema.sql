-- ============================================
-- SCHEMA – Panel Admin La 105 Pizzería
-- Ejecutar en Supabase SQL Editor (completo, de una sola vez)
-- ============================================

-- ─────────────────────────────────────────────
-- 1. TABLAS
-- ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS categorias (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre      text        NOT NULL,
  descripcion text,
  icono       text,
  color       text,
  orden       integer     DEFAULT 0,
  activa      boolean     DEFAULT true,
  created_at  timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS productos (
  id                uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre            text        NOT NULL,
  descripcion       text,
  descripcion_corta text,
  precio            numeric     NOT NULL,
  categoria_id      uuid        REFERENCES categorias(id) ON DELETE SET NULL,
  imagen_url        text,
  orden             integer     DEFAULT 0,
  disponible        boolean     DEFAULT true,
  destacado         boolean     DEFAULT false,
  created_at        timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS configuracion (
  id         uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  clave      text        UNIQUE NOT NULL,
  valor      text,
  created_at timestamptz DEFAULT now()
);

-- ─────────────────────────────────────────────
-- 2. DATOS INICIALES DE CONFIGURACIÓN
-- ─────────────────────────────────────────────

INSERT INTO configuracion (clave, valor) VALUES
  ('negocio_nombre',       'Pizzería La 105'),
  ('negocio_direccion',    'Calle 105 #16-19, El Rocio'),
  ('whatsapp_numero',      '573204132725'),
  ('whatsapp_mensaje',     '¡Hola! Quiero hacer un pedido'),
  ('horario_apertura',     '12:00'),
  ('horario_cierre',       '22:00'),
  ('dias_abierto',         'Lunes a Domingo'),
  ('delivery_activo',      'false'),
  ('delivery_precio',      '5000'),
  ('delivery_tiempo',      '45 min'),
  ('delivery_minimo',      '20000'),
  ('mensaje_bienvenida',   'Bienvenidos a La 105 Pizzería'),
  ('mensaje_promocion',    'Combo Pizzeta + Gaseosa $30.000'),
  ('banner_activo',        'false')
ON CONFLICT (clave) DO NOTHING;

-- ─────────────────────────────────────────────
-- 3. ROW LEVEL SECURITY (RLS)
-- ─────────────────────────────────────────────

ALTER TABLE categorias   ENABLE ROW LEVEL SECURITY;
ALTER TABLE productos    ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuracion ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas existentes (para poder volver a ejecutar sin error)
DROP POLICY IF EXISTS "public_read_categorias"   ON categorias;
DROP POLICY IF EXISTS "public_read_productos"    ON productos;
DROP POLICY IF EXISTS "public_read_configuracion" ON configuracion;
DROP POLICY IF EXISTS "admin_all_categorias"     ON categorias;
DROP POLICY IF EXISTS "admin_all_productos"      ON productos;
DROP POLICY IF EXISTS "admin_all_configuracion"  ON configuracion;

-- Menú público (visitantes sin login) solo puede leer
CREATE POLICY "public_read_categorias"
  ON categorias FOR SELECT
  TO anon
  USING (activa = true);

CREATE POLICY "public_read_productos"
  ON productos FOR SELECT
  TO anon
  USING (disponible = true);

CREATE POLICY "public_read_configuracion"
  ON configuracion FOR SELECT
  TO anon
  USING (true);

-- Admin (autenticado) tiene acceso completo
CREATE POLICY "admin_all_categorias"
  ON categorias FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "admin_all_productos"
  ON productos FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "admin_all_configuracion"
  ON configuracion FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

-- ─────────────────────────────────────────────
-- 4. VERIFICACIÓN
-- ─────────────────────────────────────────────
-- Ejecuta esto para confirmar que todo se creó bien:
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
-- SELECT * FROM configuracion ORDER BY clave;
