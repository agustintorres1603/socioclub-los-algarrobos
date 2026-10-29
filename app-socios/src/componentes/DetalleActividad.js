import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SocioContext } from '../contexto/SocioContext';
import { inscribir, obtenerActividad } from '../servicios/api';
import { formatearPrecio } from '../utils/formatos';

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

  if (cargando) return <p className="mensaje">Cargando actividad...</p>;

  if (!actividad) {
    return (
      <section>
        <p className="mensaje mensaje-error">{error}</p>
        <Link to="/actividades">Volver a actividades</Link>
      </section>
    );
  }

  const sinCupo = actividad.cupoDisponible === 0;

  return (
    <section className="detalle">
      <Link to="/actividades" className="enlace-volver">
        ← Volver a actividades
      </Link>

      <p className="disciplina">{actividad.disciplina}</p>
      <h2>{actividad.nombre}</h2>

      <dl className="detalle-datos">
        <dt>Profesor/a</dt>
        <dd>{actividad.profesor}</dd>
        <dt>Días y horario</dt>
        <dd>{actividad.dias} · {actividad.horario} hs</dd>
        <dt>Edades</dt>
        <dd>De {actividad.edadMinima} a {actividad.edadMaxima} años</dd>
        <dt>Cuota mensual</dt>
        <dd>{formatearPrecio(actividad.cuotaMensual)}</dd>
        <dt>Cupo disponible</dt>
        <dd>
          {sinCupo ? (
            <span className="etiqueta etiqueta-sin-cupo">Sin cupo</span>
          ) : (
            `${actividad.cupoDisponible} de ${actividad.cupoMaximo}`
          )}
        </dd>
      </dl>

      {socio ? (
        <button type="button" className="boton" disabled={sinCupo || enviando} onClick={manejarInscripcion}>
          {enviando ? 'Inscribiendo...' : 'Inscribirme'}
        </button>
      ) : (
        <p className="mensaje">
          Para inscribirte, <Link to="/">ingresá con tu DNI</Link>.
        </p>
      )}

      {mensaje && (
        <p className="mensaje mensaje-exito">
          {mensaje} <Link to="/mis-actividades">Ver mis actividades</Link>
        </p>
      )}
      {error && <p className="mensaje mensaje-error">{error}</p>}
    </section>
  );
}

export default DetalleActividad;
