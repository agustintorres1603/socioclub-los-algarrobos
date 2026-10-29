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
  if (cargando) return <p className="mensaje">Cargando tus actividades...</p>;

  return (
    <section>
      <h2>Mis actividades</h2>

      {mensaje && <p className="mensaje mensaje-exito">{mensaje}</p>}
      {error && <p className="mensaje mensaje-error">{error}</p>}

      {inscripciones.length === 0 ? (
        <p className="mensaje">
          Todavía no estás inscripto en ninguna actividad. <Link to="/actividades">Ver actividades</Link>
        </p>
      ) : (
        <div className="mis-actividades">
          <ul className="lista-inscripciones">
            {inscripciones.map((inscripcion) => (
              <li key={inscripcion.id} className="inscripcion">
                <div>
                  <h3>{inscripcion.actividad.nombre}</h3>
                  <p>
                    {inscripcion.actividad.dias} · {inscripcion.actividad.horario} hs ·{' '}
                    {formatearPrecio(inscripcion.actividad.cuotaMensual)}
                  </p>
                  <p className="dato-secundario">Inscripto desde el {formatearFecha(inscripcion.fechaInscripcion)}</p>
                </div>
                <button type="button" className="boton-secundario" onClick={() => manejarBaja(inscripcion)}>
                  Darme de baja
                </button>
              </li>
            ))}
          </ul>

          <ResumenCuota actividades={inscripciones.map((inscripcion) => inscripcion.actividad)} />
        </div>
      )}
    </section>
  );
}

export default MisActividades;
