-- ========================================================
-- SCRIPT DE CREACIÓN Y DATOS INICIALES - SOCIOCLUB
-- Club Social y Deportivo Los Algarrobos (Córdoba)
-- ========================================================

CREATE DATABASE IF NOT EXISTS socioclub CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE socioclub;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS inscripcion;
DROP TABLE IF EXISTS preinscripcion;
DROP TABLE IF EXISTS socio;
DROP TABLE IF EXISTS actividad;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. CREACIÓN DE TABLAS
CREATE TABLE actividad (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    disciplina VARCHAR(50) NOT NULL,
    profesor VARCHAR(100) NOT NULL,
    dias VARCHAR(50) NOT NULL,
    horario VARCHAR(20) NOT NULL,
    edad_minima INT NOT NULL,
    edad_maxima INT NOT NULL,
    cupo_maximo INT NOT NULL,
    cuota_mensual DECIMAL(10, 2) NOT NULL
);

CREATE TABLE socio (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    dni VARCHAR(8) NOT NULL UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    estado_cuota VARCHAR(10) NOT NULL
);

CREATE TABLE inscripcion (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    socio_id BIGINT NOT NULL,
    actividad_id BIGINT NOT NULL,
    fecha_inscripcion DATE NOT NULL,
    estado VARCHAR(10) NOT NULL,
    CONSTRAINT fk_inscripcion_socio FOREIGN KEY (socio_id) REFERENCES socio(id),
    CONSTRAINT fk_inscripcion_actividad FOREIGN KEY (actividad_id) REFERENCES actividad(id)
);

CREATE TABLE preinscripcion (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    dni VARCHAR(8) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    actividad_interes VARCHAR(100) NOT NULL,
    comentarios VARCHAR(500),
    fecha_solicitud DATE NOT NULL
);

-- 2. CARGA DE LAS 8 ACTIVIDADES OBLIGATORIAS (Sección 3.3)
INSERT INTO actividad (id, nombre, disciplina, profesor, dias, horario, edad_minima, edad_maxima, cupo_maximo, cuota_mensual) VALUES
(1, 'Fútbol infantil', 'Fútbol', 'Diego Ferreyra', 'Lun y Mié', '18:00', 6, 12, 40, 18000.00),
(2, 'Vóley mixto', 'Vóley', 'Laura Ceballos', 'Mar y Jue', '19:00', 13, 60, 24, 20000.00),
(3, 'Básquet juvenil', 'Básquet', 'Martín Oviedo', 'Lun y Vie', '19:30', 12, 17, 20, 19000.00),
(4, 'Natación', 'Natación', 'Sofía Bustos', 'Mar y Jue', '17:00', 5, 70, 30, 26000.00),
(5, 'Patín artístico', 'Patín', 'Carla Peralta', 'Mié y Vie', '17:30', 5, 15, 25, 21000.00),
(6, 'Ajedrez', 'Ajedrez', 'Raúl Giménez', 'Sáb', '10:00', 8, 99, 16, 9000.00),
(7, 'Funcional adultos', 'Fitness', 'Paula Luna', 'Lun, Mié y Vie', '20:30', 18, 65, 30, 22000.00),
(8, 'Yoga', 'Bienestar', 'Inés Arguello', 'Mar y Jue', '09:00', 16, 99, 15, 17000.00);

-- 3. CARGA DE LOS 15 SOCIOS DE PRUEBA (Edades variadas y 2 morosos)
INSERT INTO socio (id, dni, nombre, apellido, fecha_nacimiento, email, telefono, estado_cuota) VALUES
(1, '45123456', 'Lucas', 'Gómez', '2015-05-12', 'lucas.gomez@gmail.com', '3514001122', 'AL_DIA'),
(2, '44987654', 'Mateo', 'Benítez', '2016-08-20', 'mateo.b@gmail.com', '3514002233', 'AL_DIA'),
(3, '42345678', 'Agustina', 'Romero', '2010-02-14', 'agus.romero@gmail.com', '3514003344', 'AL_DIA'),
(4, '41876543', 'Joaquín', 'Díaz', '2009-11-03', 'joaco.diaz@gmail.com', '3514004455', 'AL_DIA'),
(5, '39123890', 'Camila', 'Fernández', '1998-04-18', 'cami.f@gmail.com', '3514005566', 'AL_DIA'),
(6, '38456123', 'Esteban', 'Pérez', '1995-09-30', 'esteban.p@gmail.com', '3514006677', 'AL_DIA'),
(7, '35111222', 'Valeria', 'Morales', '1990-12-05', 'vale.morales@gmail.com', '3514007788', 'AL_DIA'),
(8, '32444555', 'Gonzalo', 'Álvarez', '1986-06-22', 'gonza.alvarez@gmail.com', '3514008899', 'AL_DIA'),
(9, '28999000', 'Mariana', 'Castro', '1981-01-15', 'mariana.c@gmail.com', '3514009900', 'AL_DIA'),
(10, '25333444', 'Jorge', 'Ramírez', '1976-07-08', 'jorge.ramirez@gmail.com', '3514011122', 'AL_DIA'),
(11, '20123789', 'Silvia', 'Herrera', '1968-03-25', 'silvia.h@gmail.com', '3514022233', 'AL_DIA'),
(12, '17456321', 'Roberto', 'Navarro', '1962-10-10', 'roberto.n@gmail.com', '3514033344', 'AL_DIA'),
(13, '52111333', 'Martina', 'Suárez', '2018-09-15', 'martina.s@gmail.com', '3514044455', 'AL_DIA'),
(14, '36789123', 'Federico', 'Sosa', '1992-03-14', 'fede.sosa@gmail.com', '3514055566', 'MOROSO'),
(15, '40555666', 'Florencia', 'Torres', '1997-11-28', 'flor.torres@gmail.com', '3514066677', 'MOROSO');

-- 4. INSCRIPCIONES INICIALES DE PRUEBA
INSERT INTO inscripcion (id, socio_id, actividad_id, fecha_inscripcion, estado) VALUES
(1, 5, 2, '2026-03-01', 'ACTIVA'),
(2, 5, 7, '2026-03-01', 'ACTIVA'),
(3, 5, 8, '2026-03-01', 'ACTIVA'),
(4, 3, 8, '2026-03-02', 'ACTIVA'),
(5, 6, 8, '2026-03-02', 'ACTIVA'),
(6, 7, 8, '2026-03-02', 'ACTIVA'),
(7, 8, 8, '2026-03-02', 'ACTIVA'),
(8, 9, 8, '2026-03-02', 'ACTIVA'),
(9, 10, 8, '2026-03-02', 'ACTIVA'),
(10, 11, 8, '2026-03-02', 'ACTIVA'),
(11, 12, 8, '2026-03-02', 'ACTIVA'),
(12, 1, 1, '2026-03-05', 'ACTIVA'),
(13, 2, 1, '2026-03-05', 'ACTIVA'),
(14, 13, 5, '2026-03-06', 'ACTIVA');

-- 5. AJUSTE DE AUTOINCREMENTALES
ALTER TABLE actividad AUTO_INCREMENT = 20;
ALTER TABLE socio AUTO_INCREMENT = 30;
ALTER TABLE inscripcion AUTO_INCREMENT = 30;