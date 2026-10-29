import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { SocioContext } from '../contexto/SocioContext';
import Escudo from './Escudo';
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
      <div className="encabezado-contenido">
        <Link to="/actividades" className="marca">
          <Escudo className="escudo" />
          <span className="marca-texto">
            <span className="marca-titulo">Mi Club</span>
            <span className="marca-subtitulo">Los Algarrobos</span>
          </span>
        </Link>

        <nav className="navegacion">
          <NavLink to="/actividades">Actividades</NavLink>
          {socio && <NavLink to="/mis-actividades">Mis actividades</NavLink>}
        </nav>

        {socio && (
          <div className="usuario">
            <span className="avatar" aria-hidden="true">
              {socio.nombre.charAt(0)}
            </span>
            <span className="usuario-nombre">
              {socio.nombre} {socio.apellido}
            </span>
            <button type="button" className="boton-salir" onClick={salir}>
              Salir
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Encabezado;
