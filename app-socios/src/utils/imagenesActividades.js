// Foto de cada disciplina: son las mismas imágenes que usa el sitio público.
// Se buscan por disciplina porque la API no trae imágenes.
const imagenes = {
  Fútbol: { src: '/imagenes/futbol.jpg', alt: 'Equipo de fútbol reunido en una cancha' },
  Vóley: { src: '/imagenes/voley.jpg', alt: 'Equipo de vóley posando en una cancha cubierta' },
  Básquet: { src: '/imagenes/basquet.jpg', alt: 'Equipo de básquet reunido en una cancha' },
  Natación: { src: '/imagenes/natacion.jpg', alt: 'Nadadoras junto al borde de una pileta' },
  Patín: { src: '/imagenes/patin.png', alt: 'Clase grupal de patín artístico en un gimnasio' },
  Ajedrez: { src: '/imagenes/ajedrez.png', alt: 'Un adulto y un chico se saludan frente a un tablero de ajedrez' },
  Fitness: { src: '/imagenes/funcional.png', alt: 'Grupo de adultos haciendo sentadillas al aire libre' },
  Bienestar: { src: '/imagenes/yoga.jpg', alt: 'Personas practicando yoga en grupo' },
};

export function obtenerImagen(disciplina) {
  return imagenes[disciplina];
}
