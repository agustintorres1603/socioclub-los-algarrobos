# Mi Club — App para socios (Parte D)

App web en React para que los socios del Club Los Algarrobos ingresen con su DNI, vean las actividades, se inscriban, se den de baja y consulten su cuota mensual estimada.

Proyecto creado con create-react-app. Usa React 18, React Router (BrowserRouter) y PropTypes.

## Cómo levantarla

```
cd app-socios
npm install
npm start
```

Se abre en http://localhost:3000.

## Pruebas (Parte E)

```
npm test
```

- `src/utils/calcularCuotaMensual.test.js`: RN6 con 0, 1, 2 y 3 actividades.
- `src/utils/esDniValido.test.js`: RN7 con DNI válidos, con puntos, con letras, con 6 y con 9 dígitos.
- `src/componentes/TarjetaActividad.test.js`: muestra el nombre y, con cupo 0, "Sin cupo" y el botón deshabilitado.

## DNI de prueba (datos locales)

Por ahora la app usa los datos de `src/datos/mockData.js`. Cuando la API esté lista, se conecta en `src/servicios/api.js`.

| DNI | Socio | Para probar |
| --- | --- | --- |
| 40123456 | Lucía Fernández | 2 actividades (10 % de descuento) |
| 45678901 | Valentina López | 3 actividades (15 %) y máximo de actividades (RN5) |
| 50234567 | Tomás Gómez, 11 años | Edad fuera de rango (RN3), por ejemplo en Vóley |
| 52345678 | Mateo Díaz, 9 años | Socio sin actividades |
| 28345678 | Carlos Rodríguez | Socio moroso (RN4) |
| 9876543 | Ana Sosa | Socia morosa con DNI de 7 dígitos |

Yoga arranca sin cupo y Ajedrez con un solo lugar libre (RN1).

## Estructura

```
src/
  componentes/   Encabezado, Pie, Ingreso, ListaActividades, TarjetaActividad,
                 DetalleActividad, MisActividades, ResumenCuota, Escudo
  contexto/      SocioContext (socio que ingresó, compartido con useContext)
  datos/         mockData.js (datos locales del hito Semana 2)
  servicios/     api.js (toda la comunicación con el backend)
  utils/         calcularCuotaMensual (RN6), esDniValido (RN7), formatos
```
