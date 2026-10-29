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

  // Disciplinas sin repetir para armar las opciones del filtro.
  const disciplinas = [...new Set(actividades.map((actividad) => actividad.disciplina))];

  const actividadesFiltradas =
    disciplina === 'Todas'
      ? actividades
      : actividades.filter((actividad) => actividad.disciplina === disciplina);

  function verDetalle(id) {
    navigate(`/actividades/${id}`);
  }

  if (cargando) return <p className="mensaje">Cargando actividades...</p>;
  if (error) return <p className="mensaje mensaje-error">{error}</p>;

  return (
    <section>
      <div className="titulo-seccion">
        <h2>Actividades</h2>
        <label className="filtro">
          Disciplina
          <select value={disciplina} onChange={(evento) => setDisciplina(evento.target.value)}>
            <option value="Todas">Todas</option>
            {disciplinas.map((nombre) => (
              <option key={nombre} value={nombre}>
                {nombre}
              </option>
            ))}
          </select>
        </label>
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
