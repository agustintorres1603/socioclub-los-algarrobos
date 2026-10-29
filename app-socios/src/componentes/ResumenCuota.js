import PropTypes from 'prop-types';
import { calcularCuotaMensual, obtenerPorcentajeDescuento, sumarCuotas } from '../utils/calcularCuotaMensual';
import { formatearPrecio } from '../utils/formatos';

function ResumenCuota({ actividades }) {
  const subtotal = sumarCuotas(actividades);
  const porcentaje = obtenerPorcentajeDescuento(actividades.length);
  const total = calcularCuotaMensual(actividades);
  const siguientePorcentaje = obtenerPorcentajeDescuento(actividades.length + 1);

  return (
    <aside className="resumen-cuota">
      <h3>Cuota mensual estimada</h3>
      <ul>
        {actividades.map((actividad) => (
          <li key={actividad.id}>
            <span>{actividad.nombre}</span>
            <span>{formatearPrecio(actividad.cuotaMensual)}</span>
          </li>
        ))}
      </ul>
      {porcentaje > 0 && (
        <p className="resumen-descuento">
          <span>Bonificación {porcentaje} %</span>
          <span>− {formatearPrecio(subtotal - total)}</span>
        </p>
      )}
      <p className="resumen-total">
        <span>Total por mes</span>
        <span>{formatearPrecio(total)}</span>
      </p>
      {siguientePorcentaje > porcentaje && (
        <p className="resumen-nota">
          Con {actividades.length + 1} actividades tenés {siguientePorcentaje} % de bonificación.
        </p>
      )}
    </aside>
  );
}

ResumenCuota.propTypes = {
  actividades: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
      cuotaMensual: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ResumenCuota;
