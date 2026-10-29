import { fireEvent, render, screen } from '@testing-library/react';
import TarjetaActividad from './TarjetaActividad';

const actividad = {
  id: 1,
  nombre: 'Fútbol infantil',
  disciplina: 'Fútbol',
  profesor: 'Diego Ferreyra',
  dias: 'Lun y Mié',
  horario: '18:00',
  edadMinima: 6,
  edadMaxima: 12,
  cuotaMensual: 18000,
  cupoDisponible: 5,
};

describe('TarjetaActividad', () => {
  test('muestra el nombre de la actividad', () => {
    render(<TarjetaActividad actividad={actividad} onVerDetalle={() => {}} />);

    expect(screen.getByText('Fútbol infantil')).toBeInTheDocument();
  });

  test('con cupo, al hacer clic en el botón avisa qué actividad se eligió', () => {
    const onVerDetalle = jest.fn();
    render(<TarjetaActividad actividad={actividad} onVerDetalle={onVerDetalle} />);

    fireEvent.click(screen.getByRole('button', { name: 'Ver detalle' }));

    expect(onVerDetalle).toHaveBeenCalledWith(1);
  });

  test('con cupo 0 muestra "Sin cupo" y el botón está deshabilitado', () => {
    const onVerDetalle = jest.fn();
    render(<TarjetaActividad actividad={{ ...actividad, cupoDisponible: 0 }} onVerDetalle={onVerDetalle} />);

    const boton = screen.getByRole('button', { name: 'Ver detalle' });
    fireEvent.click(boton);

    expect(screen.getByText('Sin cupo')).toBeInTheDocument();
    expect(boton).toBeDisabled();
    expect(onVerDetalle).not.toHaveBeenCalled();
  });
});
