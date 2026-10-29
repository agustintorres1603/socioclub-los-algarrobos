import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { SocioContext } from '../contexto/SocioContext';
import { buscarSocioPorDni } from '../servicios/api';
import { esDniValido } from '../utils/esDniValido';
import Escudo from './Escudo';

function Ingreso() {
  const { socio, iniciarSesion } = useContext(SocioContext);
  const [dni, setDni] = useState('');
  const [error, setError] = useState('');
  const [buscando, setBuscando] = useState(false);
  const navigate = useNavigate();

  async function manejarEnvio(evento) {
    evento.preventDefault();
    const dniIngresado = dni.trim();

    if (!esDniValido(dniIngresado)) {
      setError('El DNI debe tener 7 u 8 números, sin puntos.');
      return;
    }

    setError('');
    setBuscando(true);
    try {
      const socioEncontrado = await buscarSocioPorDni(dniIngresado);
      iniciarSesion(socioEncontrado);
      navigate('/actividades');
    } catch (err) {
      setError(err.message);
    } finally {
      setBuscando(false);
    }
  }

  // Si ya ingresó, no tiene sentido mostrar el formulario otra vez.
  if (socio) return <Navigate to="/actividades" replace />;

  return (
    <section className="ingreso">
      <div className="ingreso-bienvenida">
        <Escudo className="ingreso-escudo" />
        <div>
          <h2>Tu club, en el celular</h2>
          <p>Mirá tus actividades, anotate en una nueva y consultá cuánto pagás por mes.</p>
        </div>
      </div>

      <form className="ingreso-formulario" onSubmit={manejarEnvio} noValidate>
        <h3>Ingresá a Mi Club</h3>
        <p className="dato-secundario">Club Social y Deportivo Los Algarrobos</p>

        <label htmlFor="dni">Tu DNI</label>
        <input
          id="dni"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="Sin puntos, ej: 40123456"
          value={dni}
          onChange={(evento) => setDni(evento.target.value)}
          className={error ? 'campo campo-con-error' : 'campo'}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby="error-dni"
        />
        {error && (
          <p id="error-dni" className="error-campo" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="boton boton-ancho" disabled={buscando}>
          {buscando ? 'Buscando…' : 'Ingresar'}
        </button>
      </form>
    </section>
  );
}

export default Ingreso;
