import axios from 'axios';

// Apunta a Render en producción o a localhost:8080 si se define por variable de entorno
const API_URL = process.env.REACT_APP_API_URL || 'https://socioclub-los-algarrobos.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper para extraer el mensaje exacto del backend (409 Conflict, 404 Not Found, etc.)
function extraerMensajeError(error, mensajePorDefecto) {
  if (error.response && error.response.data) {
    if (error.response.data.error) return error.response.data.error;
    if (error.response.data.message) return error.response.data.message;
  }
  return mensajePorDefecto;
}

// GET /api/actividades
export async function obtenerActividades() {
  try {
    const response = await api.get('/actividades');
    return response.data;
  } catch (error) {
    throw new Error(extraerMensajeError(error, 'Error al cargar las actividades'));
  }
}

// GET /api/actividades/{id}
export async function obtenerActividad(id) {
  try {
    const response = await api.get(`/actividades/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('No encontramos la actividad');
    }
    throw new Error(extraerMensajeError(error, 'Error al obtener el detalle de la actividad'));
  }
}

// GET /api/socios/dni/{dni}
export async function buscarSocioPorDni(dni) {
  try {
    const response = await api.get(`/socios/dni/${dni}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('No encontramos ningún socio con ese DNI');
    }
    throw new Error(extraerMensajeError(error, 'Error al buscar el socio'));
  }
}

// GET /api/socios/{id}/inscripciones
export async function obtenerInscripcionesActivas(socioId) {
  try {
    const response = await api.get(`/socios/${socioId}/inscripciones`);
    return response.data;
  } catch (error) {
    throw new Error(extraerMensajeError(error, 'Error al cargar tus inscripciones'));
  }
}

// POST /api/inscripciones { socioId, actividadId }
export async function inscribir(socioId, actividadId) {
  try {
    const response = await api.post('/inscripciones', { socioId, actividadId });
    return response.data;
  } catch (error) {
    // Si el backend devuelve 409 Conflict (RN1-RN5), lanza el mensaje exacto de la regla
    throw new Error(extraerMensajeError(error, 'No se pudo completar la inscripción'));
  }
}

// PUT /api/inscripciones/{id}/baja
export async function darDeBaja(inscripcionId) {
  try {
    const response = await api.put(`/inscripciones/${inscripcionId}/baja`);
    return response.data;
  } catch (error) {
    throw new Error(extraerMensajeError(error, 'Error al procesar la baja'));
  }
}