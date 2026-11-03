// Servicio que centraliza toda la comunicación de la app con el backend.
//
// Hito Semana 2: todavía no hay API, así que estas funciones trabajan con los
// datos locales de mockData.js y devuelven promesas, igual que Axios.
// Cuando la API REST esté lista, se cambia el cuerpo de cada función por la
// llamada con Axios al endpoint indicado. Los componentes no cambian.

import { actividades, socios, inscripciones } from '../datos/mockData';

const DEMORA_MS = 300;

// Simula una respuesta exitosa del servidor.
function responder(datos) {
  return new Promise((resolve) => setTimeout(() => resolve(datos), DEMORA_MS));
}

// Simula un error del servidor (404 o 409) con el mensaje que devolvería la API.
function rechazar(mensaje) {
  return new Promise((resolve, reject) => setTimeout(() => reject(new Error(mensaje)), DEMORA_MS));
}

function contarInscriptosActivos(actividadId) {
  return inscripciones.filter((i) => i.actividadId === actividadId && i.estado === 'ACTIVA').length;
}

// Agrega el cupo disponible a la actividad, como lo hace GET /api/actividades.
function conCupoDisponible(actividad) {
  return { ...actividad, cupoDisponible: actividad.cupoMaximo - contarInscriptosActivos(actividad.id) };
}

// Las fechas vienen como 'AAAA-MM-DD'. Se separan a mano para evitar
// el corrimiento de un día que produce new Date() con la zona horaria.
function calcularEdad(fechaNacimiento) {
  const [anio, mes, dia] = fechaNacimiento.split('-').map(Number);
  const hoy = new Date();
  let edad = hoy.getFullYear() - anio;
  const yaCumplio = hoy.getMonth() + 1 > mes || (hoy.getMonth() + 1 === mes && hoy.getDate() >= dia);
  if (!yaCumplio) edad--;
  return edad;
}

function fechaDeHoy() {
  const hoy = new Date();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');
  return `${hoy.getFullYear()}-${mes}-${dia}`;
}

// GET /api/actividades
export function obtenerActividades() {
  return responder(actividades.map(conCupoDisponible));
}

// GET /api/actividades/{id}
export function obtenerActividad(id) {
  const actividad = actividades.find((a) => a.id === id);
  if (!actividad) return rechazar('No encontramos la actividad');
  return responder(conCupoDisponible(actividad));
}

// GET /api/socios/dni/{dni}
export function buscarSocioPorDni(dni) {
  const socio = socios.find((s) => s.dni === dni);
  if (!socio) return rechazar('No encontramos ningún socio con ese DNI');
  return responder(socio);
}

// GET /api/socios/{id}/inscripciones
export function obtenerInscripcionesActivas(socioId) {
  const activas = inscripciones
    .filter((i) => i.socioId === socioId && i.estado === 'ACTIVA')
    .map((i) => ({
      id: i.id,
      fechaInscripcion: i.fechaInscripcion,
      estado: i.estado,
      actividad: actividades.find((a) => a.id === i.actividadId),
    }));
  return responder(activas);
}

// POST /api/inscripciones  { socioId, actividadId }
// En el sistema real las reglas RN1 a RN5 las valida InscripcionService en el
// backend y la API responde 409 con el mensaje. Acá se imitan para poder
// probar la pantalla antes de conectar la API.
export function inscribir(socioId, actividadId) {
  const socio = socios.find((s) => s.id === socioId);
  const actividad = actividades.find((a) => a.id === actividadId);
  if (!socio || !actividad) return rechazar('No encontramos el socio o la actividad');

  const activasDelSocio = inscripciones.filter((i) => i.socioId === socioId && i.estado === 'ACTIVA');
  const edad = calcularEdad(socio.fechaNacimiento);

  if (contarInscriptosActivos(actividadId) >= actividad.cupoMaximo) {
    return rechazar('La actividad no tiene cupo disponible');
  }
  if (activasDelSocio.some((i) => i.actividadId === actividadId)) {
    return rechazar('El socio ya está inscripto en esta actividad');
  }
  if (edad < actividad.edadMinima || edad > actividad.edadMaxima) {
    return rechazar(`La edad permitida para esta actividad es de ${actividad.edadMinima} a ${actividad.edadMaxima} años`);
  }
  if (socio.estadoCuota === 'MOROSO') {
    return rechazar('Debe regularizar su cuota en secretaría');
  }
  if (activasDelSocio.length >= 3) {
    return rechazar('Alcanzó el máximo de 3 actividades');
  }

  const nueva = {
    id: Math.max(...inscripciones.map((i) => i.id)) + 1,
    socioId,
    actividadId,
    fechaInscripcion: fechaDeHoy(),
    estado: 'ACTIVA',
  };
  inscripciones.push(nueva);
  return responder(nueva);
}

// PUT /api/inscripciones/{id}/baja  (baja lógica: la inscripción queda en estado BAJA)
export function darDeBaja(inscripcionId) {
  const inscripcion = inscripciones.find((i) => i.id === inscripcionId);
  if (!inscripcion) return rechazar('No encontramos la inscripción');
  inscripcion.estado = 'BAJA';
  return responder(inscripcion);
}
