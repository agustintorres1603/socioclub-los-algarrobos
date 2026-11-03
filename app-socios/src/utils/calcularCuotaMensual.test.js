import { calcularCuotaMensual } from './calcularCuotaMensual';

const futbol = { id: 1, nombre: 'Fútbol infantil', cuotaMensual: 18000 };
const voley = { id: 2, nombre: 'Vóley mixto', cuotaMensual: 20000 };
const ajedrez = { id: 6, nombre: 'Ajedrez', cuotaMensual: 9000 };

describe('calcularCuotaMensual (RN6)', () => {
  test('sin actividades la cuota es 0', () => {
    expect(calcularCuotaMensual([])).toBe(0);
  });

  test('con 1 actividad paga la cuota completa, sin descuento', () => {
    expect(calcularCuotaMensual([futbol])).toBe(18000);
  });

  test('con 2 actividades tiene 10 % de descuento', () => {
    // 18000 + 20000 = 38000 -> 38000 - 10 % = 34200
    expect(calcularCuotaMensual([futbol, voley])).toBe(34200);
  });

  test('con 3 actividades tiene 15 % de descuento', () => {
    // 18000 + 20000 + 9000 = 47000 -> 47000 - 15 % = 39950
    expect(calcularCuotaMensual([futbol, voley, ajedrez])).toBe(39950);
  });
});
