import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { SocioContext } from '../contexto/SocioContext';
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
        <div className="marca">
          <span className="marca-titulo">Mi Club</span>
          <span className="marca-subtitulo">Los Algarrobos</span>
        </div>

        <nav className="navegacion">
          <NavLink to="/actividades">Actividades</NavLink>
          {socio && <NavLink to="/mis-actividades">Mis actividades</NavLink>}
        </nav>

        {socio && (
          <div className="usuario">
            <span>Hola, {socio.nombre}</span>
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
