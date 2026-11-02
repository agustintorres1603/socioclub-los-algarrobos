-- ========================================================
-- 1. CARGA DE LAS 8 ACTIVIDADES OBLIGATORIAS (Sección 3.3)
-- ========================================================
INSERT INTO actividad (id, nombre, disciplina, profesor, dias, horario, edad_minima, edad_maxima, cupo_maximo, cuota_mensual) VALUES
(1, 'Fútbol infantil', 'Fútbol', 'Diego Ferreyra', 'Lun y Mié', '18:00', 6, 12, 40, 18000.00),
(2, 'Vóley mixto', 'Vóley', 'Laura Ceballos', 'Mar y Jue', '19:00', 13, 60, 24, 20000.00),
(3, 'Básquet juvenil', 'Básquet', 'Martín Oviedo', 'Lun y Vie', '19:30', 12, 17, 20, 19000.00),
(4, 'Natación', 'Natación', 'Sofía Bustos', 'Mar y Jue', '17:00', 5, 70, 30, 26000.00),
(5, 'Patín artístico', 'Patín', 'Carla Peralta', 'Mié y Vie', '17:30', 5, 15, 25, 21000.00),
(6, 'Ajedrez', 'Ajedrez', 'Raúl Giménez', 'Sáb', '10:00', 8, 99, 16, 9000.00),
(7, 'Funcional adultos', 'Fitness', 'Paula Luna', 'Lun, Mié y Vie', '20:30', 18, 65, 30, 22000.00),
(8, 'Yoga', 'Bienestar', 'Inés Arguello', 'Mar y Jue', '09:00', 16, 99, 15, 17000.00);

-- ========================================================
-- 2. CARGA DE 15 SOCIOS DE PRUEBA (Edades variadas y 2 morosos)
-- ========================================================
INSERT INTO socio (id, dni, nombre, apellido, fecha_nacimiento, email, telefono, estado_cuota) VALUES
(1, '45123456', 'Lucas', 'Gómez', '2015-05-12', 'lucas.gomez@gmail.com', '3514001122', 'AL_DIA'),      -- ~11 años (apto fútbol/patín)
(2, '44987654', 'Mateo', 'Benítez', '2016-08-20', 'mateo.b@gmail.com', '3514002233', 'AL_DIA'),     -- ~10 años
(3, '42345678', 'Agustina', 'Romero', '2010-02-14', 'agus.romero@gmail.com', '3514003344', 'AL_DIA'), -- ~16 años (apta básquet/vóley/yoga)
(4, '41876543', 'Joaquín', 'Díaz', '2009-11-03', 'joaco.diaz@gmail.com', '3514004455', 'AL_DIA'),    -- ~17 años
(5, '39123890', 'Camila', 'Fernández', '1998-04-18', 'cami.f@gmail.com', '3514005566', 'AL_DIA'),    -- ~28 años (apta vóley/funcional/yoga)
(6, '38456123', 'Esteban', 'Pérez', '1995-09-30', 'esteban.p@gmail.com', '3514006677', 'AL_DIA'),    -- ~31 años
(7, '35111222', 'Valeria', 'Morales', '1990-12-05', 'vale.morales@gmail.com', '3514007788', 'AL_DIA'), -- ~35 años
(8, '32444555', 'Gonzalo', 'Álvarez', '1986-06-22', 'gonza.alvarez@gmail.com', '3514008899', 'AL_DIA'), -- ~40 años
(9, '28999000', 'Mariana', 'Castro', '1981-01-15', 'mariana.c@gmail.com', '3514009900', 'AL_DIA'),   -- ~45 años
(10, '25333444', 'Jorge', 'Ramírez', '1976-07-08', 'jorge.ramirez@gmail.com', '3514011122', 'AL_DIA'), -- ~50 años
(11, '20123789', 'Silvia', 'Herrera', '1968-03-25', 'silvia.h@gmail.com', '3514022233', 'AL_DIA'),   -- ~58 años
(12, '17456321', 'Roberto', 'Navarro', '1962-10-10', 'roberto.n@gmail.com', '3514033344', 'AL_DIA'),  -- ~64 años (apto ajedrez/yoga/natación)
(13, '52111333', 'Martina', 'Suárez', '2018-09-15', 'martina.s@gmail.com', '3514044455', 'AL_DIA'),   -- ~8 años (apta patín/natación/ajedrez)
-- Socios MOROSOS obligatorios para probar regla RN4:
(14, '36789123', 'Federico', 'Sosa', '1992-03-14', 'fede.sosa@gmail.com', '3514055566', 'MOROSO'),   -- MOROSO 1
(15, '40555666', 'Florencia', 'Torres', '1997-11-28', 'flor.torres@gmail.com', '3514066677', 'MOROSO'); -- MOROSO 2

-- ========================================================
-- 3. INSCRIPCIONES INICIALES DE PRUEBA
-- ========================================================
-- Caso 1: Socio 5 (Camila Fernández) ya tiene 3 actividades activas (para probar límite RN5)
INSERT INTO inscripcion (id, socio_id, actividad_id, fecha_inscripcion, estado) VALUES
(1, 5, 2, '2026-03-01', 'ACTIVA'), -- Vóley
(2, 5, 7, '2026-03-01', 'ACTIVA'), -- Funcional
(3, 5, 8, '2026-03-01', 'ACTIVA'); -- Yoga

-- Caso 2: Yoga (Actividad 8, cupo 15) con 14 inscriptos para probar el cupo casi lleno (RN1)
INSERT INTO inscripcion (id, socio_id, actividad_id, fecha_inscripcion, estado) VALUES
(4, 3, 8, '2026-03-02', 'ACTIVA'),
(5, 6, 8, '2026-03-02', 'ACTIVA'),
(6, 7, 8, '2026-03-02', 'ACTIVA'),
(7, 8, 8, '2026-03-02', 'ACTIVA'),
(8, 9, 8, '2026-03-02', 'ACTIVA'),
(9, 10, 8, '2026-03-02', 'ACTIVA'),
(10, 11, 8, '2026-03-02', 'ACTIVA'),
(11, 12, 8, '2026-03-02', 'ACTIVA');

-- Caso 3: Inscripciones sueltas para probar duplicados (RN2) y lista de socios
INSERT INTO inscripcion (id, socio_id, actividad_id, fecha_inscripcion, estado) VALUES
(12, 1, 1, '2026-03-05', 'ACTIVA'), -- Lucas en Fútbol
(13, 2, 1, '2026-03-05', 'ACTIVA'), -- Mateo en Fútbol
(14, 13, 5, '2026-03-06', 'ACTIVA'); -- Martina en Patín