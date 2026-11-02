import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { SocioContext } from '../contexto/SocioContext';
import { buscarSocioPorDni } from '../servicios/api';
import { esDniValido } from '../utils/esDniValido';
import escudo from '../imagenes/escudo.png';

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
      <img
        className="ingreso-escudo"
        src={escudo}
        alt="Escudo del Club Social y Deportivo Los Algarrobos"
      />

      <div className="titulo-pagina">
        <h1>Ingresá a Mi Club</h1>
        <p>Con tu DNI podés ver tus actividades, inscribirte y consultar tu cuota.</p>
      </div>

      <form className="panel" onSubmit={manejarEnvio} noValidate>
        <div className="campo-formulario">
          <label htmlFor="dni">DNI</label>
          <input
            id="dni"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="Sin puntos, ej: 40123456"
            value={dni}
            onChange={(evento) => setDni(evento.target.value)}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby="error-dni"
          />
          {error && (
            <span id="error-dni" className="error" role="alert">
              {error}
            </span>
          )}
        </div>
        <button type="submit" className="boton boton-principal boton-ancho" disabled={buscando}>
          {buscando ? 'Buscando…' : 'Ingresar'}
        </button>
      </form>
    </section>
  );
}

export default Ingreso;
