import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TarjetaActividad from './TarjetaActividad';
import { obtenerActividades } from '../servicios/api';

function ListaActividades() {
  const [actividades, setActividades] = useState([]);
  const [disciplina, setDisciplina] = useState('Todas');
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

  // Disciplinas sin repetir para armar los botones del filtro.
  const disciplinas = ['Todas', ...new Set(actividades.map((actividad) => actividad.disciplina))];

  const actividadesFiltradas =
    disciplina === 'Todas'
      ? actividades
      : actividades.filter((actividad) => actividad.disciplina === disciplina);

  function verDetalle(id) {
    navigate(`/actividades/${id}`);
  }

  if (cargando) return <p className="cargando">Cargando actividades…</p>;
  if (error) return <p className="mensaje mensaje-error">{error}</p>;

  return (
    <section>
      <div className="titulo-seccion">
        <h2>Actividades</h2>
        <p>Elegí una actividad para ver los horarios completos e inscribirte.</p>
      </div>

      <div className="filtro-disciplinas" role="group" aria-label="Filtrar por disciplina">
        {disciplinas.map((nombre) => (
          <button
            key={nombre}
            type="button"
            className="chip"
            aria-pressed={disciplina === nombre}
            onClick={() => setDisciplina(nombre)}
          >
            {nombre}
          </button>
        ))}
      </div>

      <div className="grilla-actividades">
        {actividadesFiltradas.map((actividad) => (
          <TarjetaActividad key={actividad.id} actividad={actividad} onVerDetalle={verDetalle} />
        ))}
      </div>
    </section>
  );
}

export default ListaActividades;
