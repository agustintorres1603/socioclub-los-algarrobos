# SocioClub — Club Social y Deportivo Los Algarrobos

Sistema web integral de gestión de socios, actividades e inscripciones desarrollado para el **Trabajo Práctico Integrador** de _Taller de Construcción de Software_ (Universidad Siglo 21).

## Integrantes del Grupo

- Agustín Torres
- Pablo Torres
- Flora Avalos
- Valentino Castaldi

## Arquitectura y URLs Desplegadas

- **Sitio Público (`/sitio-publico`):** HTML5, CSS3 responsivo y JavaScript puro (`https://socioclub-los-algarrobos-sitio-publ.vercel.app`)
- **Backend + Backoffice (`/backend`):** Spring Boot, Thymeleaf, Spring Data JPA, API REST y MySQL (`https://socioclub-los-algarrobos.onrender.com`)
- **App de Socios (`/app-socios`):** React, React Router, Context API y Axios

---

## Cómo levantar el proyecto localmente

### 1. Base de Datos MySQL

1. Crear una base de datos llamada `socioclub` en MySQL 8+.
2. Ejecutar el script `backend/src/main/resources/data.sql` para cargar las 8 actividades reglamentarias, los 15 socios de prueba y las inscripciones iniciales.

### 2. Backend (Spring Boot)

1. Configurar las credenciales de MySQL en `backend/src/main/resources/application.properties`.
2. Desde una terminal en `/backend`, ejecutar:
   ```bash
   ./mvnw spring-boot:run
   ```
