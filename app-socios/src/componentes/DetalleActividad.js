import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SocioContext } from '../contexto/SocioContext';
import { inscribir, obtenerActividad } from '../servicios/api';
import { formatearPrecio } from '../utils/formatos';
import { obtenerImagen } from '../utils/imagenesActividades';

function DetalleActividad() {
  const { id } = useParams();
  const { socio } = useContext(SocioContext);
  const [actividad, setActividad] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  // Se vuelve a ejecutar cada vez que cambia el id de la URL.
  useEffect(() => {
    async function cargarActividad() {
      setCargando(true);
      try {
        const datos = await obtenerActividad(Number(id));
        setActividad(datos);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }
    cargarActividad();
  }, [id]);

  async function manejarInscripcion() {
    setMensaje('');
    setError('');
    setEnviando(true);
    try {
      await inscribir(socio.id, actividad.id);
      setMensaje(`¡Listo! Quedaste inscripto en ${actividad.nombre}.`);
      // Se vuelve a pedir la actividad para mostrar el cupo actualizado.
      setActividad(await obtenerActividad(actividad.id));
    } catch (err) {
      // Mensaje de la regla que rechazó la inscripción (RN1 a RN5).
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  }

  if (cargando) return <p className="cargando">Cargando actividad…</p>;

  if (!actividad) {
    return (
      <section>
        <p className="mensaje mensaje-error">{error}</p>
        <Link to="/actividades" className="boton-volver">
          Volver a actividades
        </Link>
      </section>
    );
  }

  const sinCupo = actividad.cupoDisponible === 0;
  const imagen = obtenerImagen(actividad.disciplina);

  return (
    <section>
      <Link to="/actividades" className="boton-volver">
        Volver a actividades
      </Link>

      <div className="detalle-contenido">
        <article className="panel detalle-actividad">
          {imagen && <img className="actividad-imagen" src={imagen.src} alt={imagen.alt} />}
          <div className="actividad-contenido">
            <h1>{actividad.nombre}</h1>
            <p className="actividad-disciplina">{actividad.disciplina}</p>
            <p className="actividad-horario">
              {actividad.dias} · {actividad.horario} h
            </p>
            <p>Profesor/a: {actividad.profesor}</p>
            <p>
              Edades: de {actividad.edadMinima} a {actividad.edadMaxima} años
            </p>
            <p>Cupo máximo: {actividad.cupoMaximo}</p>
          </div>
        </article>

        <aside className="panel panel-inscripcion">
          <h2>Inscripción</h2>
          <p className="actividad-cuota">{formatearPrecio(actividad.cuotaMensual)} por mes</p>

          {sinCupo ? (
            <span className="estado-cupo sin-lugar">Sin cupo</span>
          ) : (
            <span className="estado-cupo">
              {actividad.cupoDisponible} de {actividad.cupoMaximo} lugares libres
            </span>
          )}

          {socio ? (
            <button
              type="button"
              className="boton boton-principal boton-ancho"
              disabled={sinCupo || enviando}
              onClick={manejarInscripcion}
            >
              {enviando ? 'Inscribiendo…' : 'Inscribirme'}
            </button>
          ) : (
            <p className="mensaje">
              Para inscribirte, <Link to="/">ingresá con tu DNI</Link>.
            </p>
          )}

          {mensaje && (
            <p className="mensaje mensaje-exito" role="status">
              {mensaje} <Link to="/mis-actividades">Ver mis actividades</Link>
            </p>
          )}
          {error && (
            <p className="mensaje mensaje-error" role="alert">
              {error}
            </p>
          )}
        </aside>
      </div>
    </section>
  );
}

export default DetalleActividad;
