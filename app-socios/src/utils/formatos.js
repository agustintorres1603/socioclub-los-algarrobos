// 18000 -> "$ 18.000"
export function formatearPrecio(valor) {
  return valor.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });
}

// "2026-03-02" -> "02/03/2026"
export function formatearFecha(fecha) {
  return fecha.split('-').reverse().join('/');
}
