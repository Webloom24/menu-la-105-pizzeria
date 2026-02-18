-- ============================================
-- CARGAR DATOS DEL MENÚ A SUPABASE
-- ============================================
-- Este archivo carga todas las categorías y productos existentes en tu menú
-- Ejecútalo COMPLETO en Supabase SQL Editor

-- ============================================
-- 1. INSERTAR CATEGORÍAS
-- ============================================

-- Primero, limpiar categorías existentes (opcional - comenta estas líneas si no quieres eliminar)
-- DELETE FROM productos;
-- DELETE FROM categorias;

-- Insertar categorías
INSERT INTO categorias (nombre, descripcion, icono, color, orden, activa) VALUES
('Especialidades de la casa', 'Masa artesanal, queso fundido y sabor generoso', '🍕', '#FF6B35', 1, true),
('Clasicas del barrio', 'Porcion $7.000 | Rueda $70.000', '🍕', '#E63946', 2, true),
('Pizzetas al centro', 'Para compartir sin afan', '📏', '#52B788', 3, true),
('Panzerottis al horno', 'Horneado lento, 30 minutos de espera', '🥟', '#F4A261', 4, true),
('Adicionales de mesa', 'Cada adicional $5.000', '➕', '#457B9D', 5, true);

-- ============================================
-- 2. INSERTAR PRODUCTOS
-- ============================================

-- Para poder insertar productos, necesitamos los IDs de las categorías
-- Supabase genera IDs automáticamente (UUID), así que usamos subconsultas

-- ESPECIALIDADES DE LA CASA
INSERT INTO productos (nombre, descripcion, precio, categoria_id, disponible, destacado, orden) VALUES
('Choripizza', 'Porción. Maíz, chorizo, cabano, carne desmechada, pollo desmechado y huevo de codorniz.', 7500,
  (SELECT id FROM categorias WHERE nombre = 'Especialidades de la casa'), true, true, 1),

('Choripizza', 'Rueda. Maíz, chorizo, cabano, carne desmechada, pollo desmechado y huevo de codorniz.', 75000,
  (SELECT id FROM categorias WHERE nombre = 'Especialidades de la casa'), true, true, 2),

('Mixta', 'Porción. Tocineta, carne molida, maíz, pollo desmechado y chorizo.', 7500,
  (SELECT id FROM categorias WHERE nombre = 'Especialidades de la casa'), true, false, 3),

('Mixta', 'Rueda. Tocineta, carne molida, maíz, pollo desmechado y chorizo.', 75000,
  (SELECT id FROM categorias WHERE nombre = 'Especialidades de la casa'), true, false, 4);

-- CLASICAS DEL BARRIO
INSERT INTO productos (nombre, descripcion, precio, categoria_id, disponible, destacado, orden) VALUES
('Mexicana', 'Porción. Picante fuerte, pimentón, tomate, cebolla, carne molida y cabano.', 7000,
  (SELECT id FROM categorias WHERE nombre = 'Clasicas del barrio'), true, false, 1),

('Mexicana', 'Rueda. Picante fuerte, pimentón, tomate, cebolla, carne molida y cabano.', 70000,
  (SELECT id FROM categorias WHERE nombre = 'Clasicas del barrio'), true, false, 2),

('Ranchera', 'Porción. Chorizo, carne molida y cabano.', 7000,
  (SELECT id FROM categorias WHERE nombre = 'Clasicas del barrio'), true, false, 3),

('Ranchera', 'Rueda. Chorizo, carne molida y cabano.', 70000,
  (SELECT id FROM categorias WHERE nombre = 'Clasicas del barrio'), true, false, 4),

('Campesina', 'Porción. Maíz, cabano, salchichón y pollo desmechado.', 7000,
  (SELECT id FROM categorias WHERE nombre = 'Clasicas del barrio'), true, false, 5),

('Campesina', 'Rueda. Maíz, cabano, salchichón y pollo desmechado.', 70000,
  (SELECT id FROM categorias WHERE nombre = 'Clasicas del barrio'), true, false, 6),

('Madurito', 'Porción. Plátano maduro, carne desmechada y cabano.', 7000,
  (SELECT id FROM categorias WHERE nombre = 'Clasicas del barrio'), true, false, 7),

('Madurito', 'Rueda. Plátano maduro, carne desmechada y cabano.', 70000,
  (SELECT id FROM categorias WHERE nombre = 'Clasicas del barrio'), true, false, 8),

('Pollo Champiñón', 'Porción. Pollo desmechado y champiñones.', 7000,
  (SELECT id FROM categorias WHERE nombre = 'Clasicas del barrio'), true, false, 9),

('Pollo Champiñón', 'Rueda. Pollo desmechado y champiñones.', 70000,
  (SELECT id FROM categorias WHERE nombre = 'Clasicas del barrio'), true, false, 10),

('Hawaiana', 'Porción. Piña y jamón.', 7000,
  (SELECT id FROM categorias WHERE nombre = 'Clasicas del barrio'), true, false, 11),

('Hawaiana', 'Rueda. Piña y jamón.', 70000,
  (SELECT id FROM categorias WHERE nombre = 'Clasicas del barrio'), true, false, 12),

('Pollo Jamón', 'Porción. Pollo desmechado y jamón.', 7000,
  (SELECT id FROM categorias WHERE nombre = 'Clasicas del barrio'), true, false, 13),

('Pollo Jamón', 'Rueda. Pollo desmechado y jamón.', 70000,
  (SELECT id FROM categorias WHERE nombre = 'Clasicas del barrio'), true, false, 14),

('Carnes Frías', 'Porción. Cabano y salchichón de pollo.', 7000,
  (SELECT id FROM categorias WHERE nombre = 'Clasicas del barrio'), true, false, 15),

('Carnes Frías', 'Rueda. Cabano y salchichón de pollo.', 70000,
  (SELECT id FROM categorias WHERE nombre = 'Clasicas del barrio'), true, false, 16),

('Peperonni', 'Porción. Peperoni y cabano.', 7000,
  (SELECT id FROM categorias WHERE nombre = 'Clasicas del barrio'), true, false, 17),

('Peperonni', 'Rueda. Peperoni y cabano.', 70000,
  (SELECT id FROM categorias WHERE nombre = 'Clasicas del barrio'), true, false, 18);

-- PIZZETAS
INSERT INTO productos (nombre, descripcion, precio, categoria_id, disponible, destacado, orden) VALUES
('Pizzeta Mediana (30 cm)', 'Recomendada para 2-3 personas.', 30000,
  (SELECT id FROM categorias WHERE nombre = 'Pizzetas al centro'), true, false, 1),

('Pizzeta Grande (36 cm)', 'Recomendada para 4-5 personas.', 40000,
  (SELECT id FROM categorias WHERE nombre = 'Pizzetas al centro'), true, false, 2);

-- PANZEROTTIS
INSERT INTO productos (nombre, descripcion, precio, categoria_id, disponible, destacado, orden) VALUES
('Chori', 'Maíz, chorizo, carne desmechada, pollo desmechado y huevo de codorniz.', 13000,
  (SELECT id FROM categorias WHERE nombre = 'Panzerottis al horno'), true, false, 1),

('Mexicano', 'Picante fuerte, pimentón, tomate, cebolla, carne molida y cabano.', 11000,
  (SELECT id FROM categorias WHERE nombre = 'Panzerottis al horno'), true, false, 2),

('Madurito', 'Plátano maduro, carne desmechada y cabano.', 11000,
  (SELECT id FROM categorias WHERE nombre = 'Panzerottis al horno'), true, false, 3),

('Campesino', 'Maíz, cabano y pollo desmechado.', 11000,
  (SELECT id FROM categorias WHERE nombre = 'Panzerottis al horno'), true, false, 4),

('Pollo Champiñón', 'Pollo desmechado y champiñones.', 11000,
  (SELECT id FROM categorias WHERE nombre = 'Panzerottis al horno'), true, false, 5),

('Hawaiano', 'Piña y jamón.', 11000,
  (SELECT id FROM categorias WHERE nombre = 'Panzerottis al horno'), true, false, 6),

('Mixto', 'Pollo desmechado, salchichón de pollo y cabano.', 9000,
  (SELECT id FROM categorias WHERE nombre = 'Panzerottis al horno'), true, false, 7);

-- ADICIONALES
INSERT INTO productos (nombre, descripcion, precio, categoria_id, disponible, destacado, orden) VALUES
('Queso', 'Adicional.', 5000,
  (SELECT id FROM categorias WHERE nombre = 'Adicionales de mesa'), true, false, 1),

('Pollo', 'Adicional.', 5000,
  (SELECT id FROM categorias WHERE nombre = 'Adicionales de mesa'), true, false, 2),

('Piña', 'Adicional.', 5000,
  (SELECT id FROM categorias WHERE nombre = 'Adicionales de mesa'), true, false, 3),

('Champiñones', 'Adicional.', 5000,
  (SELECT id FROM categorias WHERE nombre = 'Adicionales de mesa'), true, false, 4),

('Maíz', 'Adicional.', 5000,
  (SELECT id FROM categorias WHERE nombre = 'Adicionales de mesa'), true, false, 5),

('Verdura', 'Adicional.', 5000,
  (SELECT id FROM categorias WHERE nombre = 'Adicionales de mesa'), true, false, 6);

-- ============================================
-- 3. ACTUALIZAR CONFIGURACIÓN
-- ============================================

-- Actualizar WhatsApp y datos del negocio
UPDATE configuracion SET valor = 'Pizzería La 105' WHERE clave = 'negocio_nombre';
UPDATE configuracion SET valor = 'Calle 105 #16-19, El Rocio' WHERE clave = 'negocio_direccion';
UPDATE configuracion SET valor = '573204132725' WHERE clave = 'whatsapp_numero';
UPDATE configuracion SET valor = '¡Hola! Quiero hacer un pedido' WHERE clave = 'whatsapp_mensaje';

-- ============================================
-- VERIFICACIÓN
-- ============================================

-- Ejecuta esto para verificar que todo se cargó correctamente:
-- SELECT * FROM categorias ORDER BY orden;
-- SELECT nombre, precio, (SELECT nombre FROM categorias WHERE id = productos.categoria_id) as categoria FROM productos ORDER BY categoria_id, orden;
