import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { SocioContext } from '../contexto/SocioContext';
import escudo from '../imagenes/escudo.png';
import './Encabezado.css';

function Encabezado() {
  const { socio, cerrarSesion } = useContext(SocioContext);
  const navigate = useNavigate();

  function salir() {
    cerrarSesion();
    navigate('/');
  }

  return (
    <header className="encabezado">
      <Link to="/actividades" className="marca-club">
        <img
          className="marca-escudo"
          src={escudo}
          alt="Escudo del Club Social y Deportivo Los Algarrobos"
        />
        <span className="marca-texto">
          <span className="marca-descripcion">Mi Club · Club Social y Deportivo</span>
          <span className="marca-nombre">Los Algarrobos</span>
        </span>
      </Link>

      <nav className="navegacion" aria-label="Navegación principal">
        <ul>
          <li>
            <NavLink to="/actividades">Actividades</NavLink>
          </li>
          {socio && (
            <li>
              <NavLink to="/mis-actividades">Mis actividades</NavLink>
            </li>
          )}
        </ul>

        {socio && (
          <div className="usuario">
            <span className="usuario-nombre">
              {socio.nombre} {socio.apellido}
            </span>
            <button type="button" className="boton-salir" onClick={salir}>
              Salir
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Encabezado;
