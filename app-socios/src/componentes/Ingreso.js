import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { SocioContext } from '../contexto/SocioContext';
import { buscarSocioPorDni } from '../servicios/api';
import { esDniValido } from '../utils/esDniValido';

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
      <h2>Ingresá a Mi Club</h2>
      <p className="dato-secundario">Con tu DNI podés ver tus actividades, inscribirte y consultar tu cuota.</p>

      <form onSubmit={manejarEnvio} noValidate>
        <label htmlFor="dni">DNI</label>
        <input
          id="dni"
          type="text"
          inputMode="numeric"
          placeholder="Ej: 40123456"
          value={dni}
          onChange={(evento) => setDni(evento.target.value)}
          className={error ? 'campo campo-con-error' : 'campo'}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby="error-dni"
        />
        {error && (
          <p id="error-dni" className="error-campo">
            {error}
          </p>
        )}
        <button type="submit" className="boton" disabled={buscando}>
          {buscando ? 'Buscando...' : 'Ingresar'}
        </button>
      </form>
    </section>
  );
}

export default Ingreso;
