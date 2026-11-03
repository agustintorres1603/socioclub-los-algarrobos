// Datos locales para el hito de la Semana 2.
// Cuando el backend esté listo, estos datos llegan desde la API REST.
// Los nombres de los campos son los acordados con el resto del grupo.

export const actividades = [
  { id: 1, nombre: 'Fútbol infantil', disciplina: 'Fútbol', profesor: 'Diego Ferreyra', dias: 'Lun y Mié', horario: '18:00', edadMinima: 6, edadMaxima: 12, cupoMaximo: 40, cuotaMensual: 18000 },
  { id: 2, nombre: 'Vóley mixto', disciplina: 'Vóley', profesor: 'Laura Ceballos', dias: 'Mar y Jue', horario: '19:00', edadMinima: 13, edadMaxima: 60, cupoMaximo: 24, cuotaMensual: 20000 },
  { id: 3, nombre: 'Básquet juvenil', disciplina: 'Básquet', profesor: 'Martín Oviedo', dias: 'Lun y Vie', horario: '19:30', edadMinima: 12, edadMaxima: 17, cupoMaximo: 20, cuotaMensual: 19000 },
  { id: 4, nombre: 'Natación', disciplina: 'Natación', profesor: 'Sofía Bustos', dias: 'Mar y Jue', horario: '17:00', edadMinima: 5, edadMaxima: 70, cupoMaximo: 30, cuotaMensual: 26000 },
  { id: 5, nombre: 'Patín artístico', disciplina: 'Patín', profesor: 'Carla Peralta', dias: 'Mié y Vie', horario: '17:30', edadMinima: 5, edadMaxima: 15, cupoMaximo: 25, cuotaMensual: 21000 },
  { id: 6, nombre: 'Ajedrez', disciplina: 'Ajedrez', profesor: 'Raúl Giménez', dias: 'Sáb', horario: '10:00', edadMinima: 8, edadMaxima: 99, cupoMaximo: 16, cuotaMensual: 9000 },
  { id: 7, nombre: 'Funcional adultos', disciplina: 'Fitness', profesor: 'Paula Luna', dias: 'Lun, Mié y Vie', horario: '20:30', edadMinima: 18, edadMaxima: 65, cupoMaximo: 30, cuotaMensual: 22000 },
  { id: 8, nombre: 'Yoga', disciplina: 'Bienestar', profesor: 'Inés Arguello', dias: 'Mar y Jue', horario: '9:00', edadMinima: 16, edadMaxima: 99, cupoMaximo: 15, cuotaMensual: 17000 },
];

export const socios = [
  { id: 1, dni: '40123456', nombre: 'Lucía', apellido: 'Fernández', fechaNacimiento: '1997-04-15', email: 'lucia.fernandez@mail.com', telefono: '351-5550101', estadoCuota: 'AL_DIA' },
  { id: 2, dni: '50234567', nombre: 'Tomás', apellido: 'Gómez', fechaNacimiento: '2015-06-02', email: 'tomas.gomez@mail.com', telefono: '351-5550102', estadoCuota: 'AL_DIA' },
  { id: 3, dni: '28345678', nombre: 'Carlos', apellido: 'Rodríguez', fechaNacimiento: '1981-09-30', email: 'carlos.rodriguez@mail.com', telefono: '351-5550103', estadoCuota: 'MOROSO' },
  { id: 4, dni: '45678901', nombre: 'Valentina', apellido: 'López', fechaNacimiento: '2007-11-20', email: 'valentina.lopez@mail.com', telefono: '351-5550104', estadoCuota: 'AL_DIA' },
  { id: 5, dni: '52345678', nombre: 'Mateo', apellido: 'Díaz', fechaNacimiento: '2017-02-14', email: 'mateo.diaz@mail.com', telefono: '351-5550105', estadoCuota: 'AL_DIA' },
  { id: 6, dni: '9876543', nombre: 'Ana', apellido: 'Sosa', fechaNacimiento: '1958-07-08', email: 'ana.sosa@mail.com', telefono: '351-5550106', estadoCuota: 'MOROSO' },
];

// Inscripciones de otros socios del club (no hace falta tener sus datos acá).
// Sirven para que Yoga arranque sin cupo y Ajedrez con un solo lugar libre.
function inscripcionesDeOtrosSocios(actividadId, cantidad, primerId) {
  return Array.from({ length: cantidad }, (_, i) => ({
    id: primerId + i,
    socioId: 100 + i,
    actividadId,
    fechaInscripcion: '2026-03-01',
    estado: 'ACTIVA',
  }));
}

export const inscripciones = [
  { id: 1, socioId: 1, actividadId: 2, fechaInscripcion: '2026-03-02', estado: 'ACTIVA' },
  { id: 2, socioId: 1, actividadId: 7, fechaInscripcion: '2026-03-05', estado: 'ACTIVA' },
  { id: 3, socioId: 2, actividadId: 1, fechaInscripcion: '2026-03-03', estado: 'ACTIVA' },
  { id: 4, socioId: 3, actividadId: 6, fechaInscripcion: '2026-03-10', estado: 'ACTIVA' },
  { id: 5, socioId: 4, actividadId: 2, fechaInscripcion: '2026-03-04', estado: 'ACTIVA' },
  { id: 6, socioId: 4, actividadId: 6, fechaInscripcion: '2026-03-04', estado: 'ACTIVA' },
  { id: 7, socioId: 4, actividadId: 8, fechaInscripcion: '2026-03-06', estado: 'ACTIVA' },
  { id: 8, socioId: 1, actividadId: 4, fechaInscripcion: '2026-02-01', estado: 'BAJA' },
  ...inscripcionesDeOtrosSocios(8, 14, 101),
  ...inscripcionesDeOtrosSocios(6, 13, 201),
];
