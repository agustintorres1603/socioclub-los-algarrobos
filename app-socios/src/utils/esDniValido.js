// RN7: el DNI debe tener 7 u 8 dígitos numéricos, sin puntos.
export function esDniValido(dni) {
  return /^\d{7,8}$/.test(String(dni));
}
