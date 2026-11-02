package ar.edu.siglo21.backend.service;

import ar.edu.siglo21.backend.model.Actividad;
import ar.edu.siglo21.backend.repository.ActividadRepository;
import ar.edu.siglo21.backend.repository.InscripcionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActividadService {

    private final ActividadRepository actividadRepository;
    private final InscripcionRepository inscripcionRepository;

    public ActividadService(ActividadRepository actividadRepository, InscripcionRepository inscripcionRepository) {
        this.actividadRepository = actividadRepository;
        this.inscripcionRepository = inscripcionRepository;
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

    public void eliminar(Long id) {
        long inscriptos = inscripcionRepository.contarInscriptosActivos(id);
        if (inscriptos > 0) {
            throw new IllegalStateException("No se puede eliminar una actividad con inscriptos activos");
        }
        actividadRepository.deleteById(id);
    }

    public long obtenerCupoDisponible(Long actividadId) {
        Actividad actividad = actividadRepository.findById(actividadId)
                .orElseThrow(() -> new IllegalArgumentException("Actividad no encontrada"));
        long ocupados = inscripcionRepository.contarInscriptosActivos(actividadId);
        return Math.max(0, actividad.getCupoMaximo() - ocupados);
    }
}