import PropTypes from 'prop-types';
import { formatearPrecio } from '../utils/formatos';
import './TarjetaActividad.css';

function TarjetaActividad({ actividad, onVerDetalle }) {
  const sinCupo = actividad.cupoDisponible === 0;

  return (
    <article className={sinCupo ? 'tarjeta sin-cupo' : 'tarjeta'}>
      <p className="disciplina">{actividad.disciplina}</p>
      <h3 className="tarjeta-nombre">{actividad.nombre}</h3>

      <ul className="tarjeta-datos">
        <li>{actividad.dias} · {actividad.horario} hs</li>
        <li>De {actividad.edadMinima} a {actividad.edadMaxima} años</li>
        <li>Prof. {actividad.profesor}</li>
      </ul>

      <p className="tarjeta-precio">{formatearPrecio(actividad.cuotaMensual)} <span>/ mes</span></p>

      <div className="tarjeta-pie">
        {sinCupo ? (
          <span className="etiqueta etiqueta-sin-cupo">Sin cupo</span>
        ) : (
          <span className="etiqueta">Cupo disponible: {actividad.cupoDisponible}</span>
        )}
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
