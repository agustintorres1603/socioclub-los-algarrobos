// RN6: la cuota mensual estimada es la suma de las cuotas de las actividades
// activas, con 10 % de descuento si tiene 2 actividades y 15 % si tiene 3.

export function sumarCuotas(actividades) {
  return actividades.reduce((suma, actividad) => suma + actividad.cuotaMensual, 0);
}

export function obtenerPorcentajeDescuento(cantidadActividades) {
  if (cantidadActividades >= 3) return 15;
  if (cantidadActividades === 2) return 10;
  return 0;
}

export function calcularCuotaMensual(actividades) {
  const subtotal = sumarCuotas(actividades);
  const porcentaje = obtenerPorcentajeDescuento(actividades.length);
  return Math.round((subtotal * (100 - porcentaje)) / 100);
}
