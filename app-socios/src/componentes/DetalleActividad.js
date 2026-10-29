import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SocioContext } from '../contexto/SocioContext';
import { inscribir, obtenerActividad } from '../servicios/api';
import { formatearPrecio } from '../utils/formatos';

function EnlaceVolver() {
  return (
    <Link to="/actividades" className="enlace-volver">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M10 3 5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Volver a actividades
    </Link>
  );
}

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
        <EnlaceVolver />
        <p className="mensaje mensaje-error">{error}</p>
      </section>
    );
  }

  const sinCupo = actividad.cupoDisponible === 0;

  return (
    <section>
      <EnlaceVolver />

      <div className="detalle-grilla">
        <div className="detalle-info">
          <h2>{actividad.nombre}</h2>
          <p className="detalle-horario">
            {actividad.dias} · {actividad.horario} hs
          </p>

          <dl className="detalle-datos">
            <dt>Disciplina</dt>
            <dd>{actividad.disciplina}</dd>
            <dt>Profesor/a</dt>
            <dd>{actividad.profesor}</dd>
            <dt>Edades</dt>
            <dd>
              De {actividad.edadMinima} a {actividad.edadMaxima} años
            </dd>
            <dt>Cupo</dt>
            <dd>{actividad.cupoMaximo} lugares</dd>
          </dl>
        </div>

        <aside className="panel-inscripcion">
          <p className="precio">
            {formatearPrecio(actividad.cuotaMensual)} <span>por mes</span>
          </p>

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
              className="boton boton-ancho"
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
