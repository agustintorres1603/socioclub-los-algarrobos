import PropTypes from 'prop-types';
import { formatearPrecio } from '../utils/formatos';
import './TarjetaActividad.css';

// Con 3 lugares o menos se avisa que quedan pocos.
const POCOS_LUGARES = 3;

function TarjetaActividad({ actividad, onVerDetalle }) {
  const sinCupo = actividad.cupoDisponible === 0;
  const quedanPocos = !sinCupo && actividad.cupoDisponible <= POCOS_LUGARES;

  return (
    <article className={sinCupo ? 'tarjeta sin-cupo' : 'tarjeta'}>
      <h3 className="tarjeta-nombre">{actividad.nombre}</h3>
      <p className="tarjeta-horario">
        {actividad.dias} · {actividad.horario} hs
      </p>
      <ul className="tarjeta-datos">
        <li>{actividad.disciplina}</li>
        <li>
          De {actividad.edadMinima} a {actividad.edadMaxima} años
        </li>
        <li>Prof. {actividad.profesor}</li>
      </ul>

      <div className="tarjeta-pie">
        <div>
          <p className="precio">
            {formatearPrecio(actividad.cuotaMensual)} <span>por mes</span>
          </p>
          {sinCupo && <span className="estado-cupo sin-lugar">Sin cupo</span>}
          {quedanPocos && (
            <span className="estado-cupo pocos">
              {actividad.cupoDisponible === 1 ? 'Queda 1 lugar' : `Quedan ${actividad.cupoDisponible} lugares`}
            </span>
          )}
          {!sinCupo && !quedanPocos && (
            <span className="estado-cupo">{actividad.cupoDisponible} lugares libres</span>
          )}
        </div>
        <button type="button" className="boton" disabled={sinCupo} onClick={() => onVerDetalle(actividad.id)}>
          Ver detalle
        </button>
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
