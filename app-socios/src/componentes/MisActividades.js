import { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { SocioContext } from '../contexto/SocioContext';
import { darDeBaja, obtenerInscripcionesActivas } from '../servicios/api';
import { formatearFecha, formatearPrecio } from '../utils/formatos';
import ResumenCuota from './ResumenCuota';

function MisActividades() {
  const { socio } = useContext(SocioContext);
  const [inscripciones, setInscripciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  // Se ejecuta cuando aparece la pantalla y cada vez que cambia el socio.
  useEffect(() => {
    if (!socio) return;
    async function cargarInscripciones() {
      try {
        const datos = await obtenerInscripcionesActivas(socio.id);
        setInscripciones(datos);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }
    cargarInscripciones();
  }, [socio]);

  async function manejarBaja(inscripcion) {
    setMensaje('');
    setError('');
    try {
      await darDeBaja(inscripcion.id);
      setInscripciones(inscripciones.filter((i) => i.id !== inscripcion.id));
      setMensaje(`Te diste de baja de ${inscripcion.actividad.nombre}.`);
    } catch (err) {
      setError(err.message);
    }
  }

  // Sin socio no hay nada que mostrar: se vuelve al ingreso.
  if (!socio) return <Navigate to="/" replace />;
  if (cargando) return <p className="cargando">Cargando tus actividades…</p>;

  return (
    <section>
      <div className="titulo-seccion">
        <h2>Mis actividades</h2>
        <p>Las actividades en las que estás inscripto y lo que vas a pagar este mes.</p>
      </div>

      {inscripciones.length === 0 ? (
        <div className="estado-vacio">
          {mensaje && (
            <p className="mensaje mensaje-exito" role="status">
              {mensaje}
            </p>
          )}
          <h3>Todavía no estás inscripto en ninguna actividad</h3>
          <p className="dato-secundario">Mirá lo que ofrece el club y anotate desde el detalle de cada actividad.</p>
          <Link to="/actividades" className="boton">
            Ver actividades
          </Link>
        </div>
      ) : (
        <div className="mis-actividades">
          <div>
            {mensaje && (
              <p className="mensaje mensaje-exito" role="status">
                {mensaje}
              </p>
            )}
            {error && (
              <p className="mensaje mensaje-error" role="alert">
                {error}
              </p>
            )}

            <ul className="lista-inscripciones">
              {inscripciones.map((inscripcion) => (
                <li key={inscripcion.id} className="inscripcion">
                  <div>
                    <h3>{inscripcion.actividad.nombre}</h3>
                    <p className="inscripcion-horario">
                      {inscripcion.actividad.dias} · {inscripcion.actividad.horario} hs
                    </p>
                    <p className="dato-secundario">
                      {formatearPrecio(inscripcion.actividad.cuotaMensual)} por mes · Inscripto desde el{' '}
                      {formatearFecha(inscripcion.fechaInscripcion)}
                    </p>
                  </div>
                  <button type="button" className="boton-baja" onClick={() => manejarBaja(inscripcion)}>
                    Darme de baja
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <ResumenCuota actividades={inscripciones.map((inscripcion) => inscripcion.actividad)} />
        </div>
      )}
    </section>
  );
}

export default MisActividades;
