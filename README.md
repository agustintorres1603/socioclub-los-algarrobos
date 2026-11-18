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

Necesitás Java 17, Maven, MySQL 8 y Node.js con npm. Usá una instancia local de MySQL para las pruebas.

### 1. Base de datos

Importá `socioclub_base_datos.sql` como UTF-8 desde MySQL Workbench en una instalación con las tablas del proyecto vacías. También podés abrir el cliente con `mysql --default-character-set=utf8mb4 -u root -p` y ejecutar `SOURCE socioclub_base_datos.sql` desde la raíz del repositorio.

El script crea `socioclub_db`, las tablas y los datos iniciales. Carga 8 actividades, 20 socios de prueba, 2 morosos y 14 inscripciones activas en Yoga, que tiene 15 lugares. Si ya tenés tablas y querés conservarlas, cambiá el nombre de la base en las sentencias `CREATE DATABASE` y `USE` de una copia del script, y usá ese mismo nombre en la URL del backend.

### 2. Backend y Secretaría

Desde una terminal PowerShell, en la raíz del repo:

```powershell
cd backend
$env:SPRING_DATASOURCE_URL = 'jdbc:mysql://localhost:3306/socioclub_db?serverTimezone=America/Argentina/Cordoba'
$env:SPRING_DATASOURCE_USERNAME = 'root'
$claveMysql = Read-Host "Contraseña local de MySQL" -AsSecureString
$env:SPRING_DATASOURCE_PASSWORD = [pscredential]::new("mysql", $claveMysql).GetNetworkCredential().Password
$env:SPRING_JPA_HIBERNATE_DDL_AUTO = 'validate'
$env:SPRING_SQL_INIT_MODE = 'never'
mvn spring-boot:run
```

Estas variables hacen que Spring valide el esquema ya importado y conserve sus datos. Para otro sistema operativo, exportá las mismas variables antes de ejecutar `mvn spring-boot:run`.

Al iniciar, abrí el [padrón de socios](http://localhost:8080/socios), el [catálogo de Secretaría](http://localhost:8080/actividades) o el [listado JSON de la API](http://localhost:8080/api/actividades).

### 3. Mi Club (React)

En una segunda terminal PowerShell, desde la raíz del repo:

```powershell
cd app-socios
npm.cmd ci
$env:REACT_APP_API_URL = 'http://localhost:8080/api'
npm.cmd start
```

Abrí [Mi Club](http://localhost:3000). En Linux o macOS, usá `npm ci` y `REACT_APP_API_URL=http://localhost:8080/api npm start`.

| DNI | Socio | Caso de prueba |
| --- | --- | --- |
| `42345678` | Agustina Romero | Inscripción a Básquet juvenil. |
| `45123456` | Lucas Gómez | Ya está inscripto en Fútbol infantil (RN2). |
| `17456321` | Roberto Navarro | Fuera del rango de edad de Fútbol infantil (RN3). |
| `36789123` | Federico Sosa | Socio moroso (RN4). |
| `39123890` | Camila Fernández | Ya tiene tres actividades activas (RN5). |
| `41876543` | Joaquín Díaz | Puede ocupar el último lugar de Yoga para preparar RN1. |

### 4. Sitio público

Abrí `sitio-publico/index.html` con Live Server en el puerto `5500`. Para probar preinscripciones con el backend local, activá la URL `http://localhost:8080/api/preinscripciones` en `sitio-publico/script.js` y comentá temporalmente la URL de Render.

### 5. Pruebas

- **React.** Desde `app-socios`, ejecutá `npm.cmd test -- --watchAll=false` en Windows o `npm test -- --watchAll=false` en Linux o macOS.
- **API.** Importá `SocioClub_API.postman_collection.json` en Postman. Ejecutá las solicitudes en orden sobre una base de prueba recién cargada. La colección usa `http://localhost:8080/api` y toma los identificadores de la actividad e inscripciones de prueba de las respuestas que las crearon.
- **Sistema.** Con los datos iniciales, probá desde Secretaría una inscripción exitosa y los rechazos RN1 a RN5. Para RN1, inscribí primero a Joaquín en Yoga y después intentá inscribir a otro socio cuando el cupo llegue a cero. Para RN5, intentá inscribir a Camila en Natación antes de modificar sus inscripciones.
