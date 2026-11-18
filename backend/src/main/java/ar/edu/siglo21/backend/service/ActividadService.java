package ar.edu.siglo21.backend.service;

import ar.edu.siglo21.backend.model.Actividad;
import ar.edu.siglo21.backend.repository.ActividadRepository;
import ar.edu.siglo21.backend.repository.InscripcionRepository;
import ar.edu.siglo21.backend.repository.PreinscripcionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ActividadService {

    private final ActividadRepository actividadRepository;
    private final InscripcionRepository inscripcionRepository;
    private final PreinscripcionRepository preinscripcionRepository;

    public ActividadService(ActividadRepository actividadRepository,
                            InscripcionRepository inscripcionRepository,
                            PreinscripcionRepository preinscripcionRepository) {
        this.actividadRepository = actividadRepository;
        this.inscripcionRepository = inscripcionRepository;
        this.preinscripcionRepository = preinscripcionRepository;
    }

    public List<Actividad> listarTodas() {
        return actividadRepository.findAll();
    }

    public List<Actividad> listarPorDisciplina(String disciplina) {
        if (disciplina == null || disciplina.isBlank() || "todas".equalsIgnoreCase(disciplina)) {
            return actividadRepository.findAll();
        }
        return actividadRepository.findByDisciplinaIgnoreCase(disciplina);
    }

    public Optional<Actividad> buscarPorId(Long id) {
        return actividadRepository.findById(id);
    }

    public Actividad guardar(Actividad actividad) {
        return actividadRepository.save(actividad);
    }

    @Transactional
    public Actividad actualizar(Long id, Actividad datos) {
        Actividad actividad = actividadRepository.buscarPorIdParaModificar(id)
                .orElseThrow(() -> new NoSuchElementException("Actividad no encontrada"));
        long inscriptos = inscripcionRepository.contarInscriptosActivos(id);
        if (datos.getCupoMaximo() < inscriptos) {
            throw new ReglaNegocioException(
                    "El cupo máximo no puede ser menor que la cantidad de inscriptos activos (" + inscriptos + ").",
                    "RN1");
        }

        actividad.setNombre(datos.getNombre());
        actividad.setDisciplina(datos.getDisciplina());
        actividad.setProfesor(datos.getProfesor());
        actividad.setDias(datos.getDias());
        actividad.setHorario(datos.getHorario());
        actividad.setEdadMinima(datos.getEdadMinima());
        actividad.setEdadMaxima(datos.getEdadMaxima());
        actividad.setCupoMaximo(datos.getCupoMaximo());
        actividad.setCuotaMensual(datos.getCuotaMensual());
        return actividad;
    }

    @Transactional
    public void eliminar(Long id) {
        Actividad actividad = actividadRepository.buscarPorIdParaModificar(id)
                .orElseThrow(() -> new NoSuchElementException("Actividad no encontrada"));
        long inscriptos = inscripcionRepository.contarInscriptosActivos(id);
        if (inscriptos > 0) {
            throw new IllegalStateException("No se puede eliminar una actividad con inscriptos activos");
        }
        if (preinscripcionRepository.existsByActividadId(id)) {
            throw new IllegalStateException("No se puede eliminar una actividad con preinscripciones registradas");
        }
        actividadRepository.delete(actividad);
    }

    public long obtenerCupoDisponible(Long actividadId) {
        Actividad actividad = actividadRepository.findById(actividadId)
                .orElseThrow(() -> new IllegalArgumentException("Actividad no encontrada"));
        long ocupados = inscripcionRepository.contarInscriptosActivos(actividadId);
        return Math.max(0, actividad.getCupoMaximo() - ocupados);
    }
}
