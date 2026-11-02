import PropTypes from 'prop-types';
import { formatearPrecio } from '../utils/formatos';
import { obtenerImagen } from '../utils/imagenesActividades';
import './TarjetaActividad.css';

// Con 3 lugares o menos se avisa que quedan pocos.
const POCOS_LUGARES = 3;

function TarjetaActividad({ actividad, onVerDetalle }) {
  const sinCupo = actividad.cupoDisponible === 0;
  const quedanPocos = !sinCupo && actividad.cupoDisponible <= POCOS_LUGARES;
  const imagen = obtenerImagen(actividad.disciplina);

  return (
    <article className={sinCupo ? 'tarjeta sin-cupo' : 'tarjeta'}>
      {imagen && <img className="actividad-imagen" src={imagen.src} alt={imagen.alt} loading="lazy" />}

      <div className="actividad-contenido">
        <h3>{actividad.nombre}</h3>
        <p className="actividad-disciplina">{actividad.disciplina}</p>
        <p className="actividad-horario">
          {actividad.dias} · {actividad.horario} h
        </p>
        <p>Profesor/a: {actividad.profesor}</p>
        <p>
          Edades: de {actividad.edadMinima} a {actividad.edadMaxima} años
        </p>

        <p className="actividad-cuota">{formatearPrecio(actividad.cuotaMensual)} por mes</p>

        <div className="tarjeta-pie">
          {sinCupo && <span className="estado-cupo sin-lugar">Sin cupo</span>}
          {quedanPocos && (
            <span className="estado-cupo pocos">
              {actividad.cupoDisponible === 1 ? 'Queda 1 lugar' : `Quedan ${actividad.cupoDisponible} lugares`}
            </span>
          )}
          {!sinCupo && !quedanPocos && (
            <span className="estado-cupo">{actividad.cupoDisponible} lugares libres</span>
          )}
          <button
            type="button"
            className="boton boton-principal"
            disabled={sinCupo}
            onClick={() => onVerDetalle(actividad.id)}
          >
            Ver detalle
          </button>
        </div>
      </div>
    </article>
  );
}

TarjetaActividad.propTypes = {
  actividad: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    disciplina: PropTypes.string.isRequired,
    profesor: PropTypes.string.isRequired,
    dias: PropTypes.string.isRequired,
    horario: PropTypes.string.isRequired,
    edadMinima: PropTypes.number.isRequired,
    edadMaxima: PropTypes.number.isRequired,
    cuotaMensual: PropTypes.number.isRequired,
    cupoDisponible: PropTypes.number.isRequired,
  }).isRequired,
  onVerDetalle: PropTypes.func.isRequired,
};

export default TarjetaActividad;
