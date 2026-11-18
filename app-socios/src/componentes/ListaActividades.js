import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TarjetaActividad from './TarjetaActividad';
import { obtenerActividades } from '../servicios/api';

function ListaActividades() {
  const [actividades, setActividades] = useState([]);
  const [disciplina, setDisciplina] = useState('Todas');
  const [edad, setEdad] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Se ejecuta una sola vez, cuando el componente aparece en pantalla (arreglo vacío).
  useEffect(() => {
    async function cargarActividades() {
      try {
        const datos = await obtenerActividades();
        setActividades(datos);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }
    cargarActividades();
  }, []);

  // Disciplinas sin repetir para armar las opciones del filtro.
  const disciplinas = [...new Set(actividades.map((actividad) => actividad.disciplina))];

  const edadNumerica = Number(edad);
  const edadValida = Number.isInteger(edadNumerica) && edadNumerica >= 0;
  const actividadesFiltradas = actividades.filter((actividad) => {
    const coincideDisciplina = disciplina === 'Todas' || actividad.disciplina === disciplina;
    const coincideEdad = edad === '' || (edadNumerica >= actividad.edadMinima && edadNumerica <= actividad.edadMaxima);
    return edadValida && coincideDisciplina && coincideEdad;
  });

  function verDetalle(id) {
    navigate(`/actividades/${id}`);
  }

  if (cargando) return <p className="cargando">Cargando actividades…</p>;
  if (error) return <p className="mensaje mensaje-error">{error}</p>;

  return (
    <section>
      <div className="titulo-pagina">
        <h1>Actividades</h1>
        <p>Elegí una actividad para ver el detalle e inscribirte.</p>
      </div>

      <div className="panel filtros-actividades">
        <h2>Filtrar actividades</h2>
        <div className="campo-filtro">
          <label htmlFor="filtro-disciplina">Disciplina</label>
          <select
            id="filtro-disciplina"
            value={disciplina}
            onChange={(evento) => setDisciplina(evento.target.value)}
          >
            <option value="Todas">Todas</option>
            {disciplinas.map((nombre) => (
              <option key={nombre} value={nombre}>
                {nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="campo-filtro campo-filtro-edad">
          <label htmlFor="filtro-edad">Edad</label>
          <input
            id="filtro-edad"
            type="number"
            min="0"
            step="1"
            value={edad}
            onChange={(evento) => setEdad(evento.target.value)}
          />
        </div>
      </div>

      {!edadValida && <p role="alert">Ingresá una edad válida, sin decimales.</p>}
      {edadValida && actividadesFiltradas.length === 0 && (
        <p role="status">No hay actividades que coincidan con los filtros.</p>
      )}
      <div className="grilla-actividades">
        {actividadesFiltradas.map((actividad) => (
          <TarjetaActividad key={actividad.id} actividad={actividad} onVerDetalle={verDetalle} />
        ))}
      </div>
    </section>
  );
}

export default ListaActividades;
