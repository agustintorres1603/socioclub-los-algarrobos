package ar.edu.siglo21.backend.service;

import ar.edu.siglo21.backend.model.Actividad;
import ar.edu.siglo21.backend.model.Preinscripcion;
import ar.edu.siglo21.backend.repository.ActividadRepository;
import ar.edu.siglo21.backend.repository.PreinscripcionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PreinscripcionService {

    private final PreinscripcionRepository preinscripcionRepository;
    private final ActividadRepository actividadRepository;

    public PreinscripcionService(PreinscripcionRepository preinscripcionRepository,
                                 ActividadRepository actividadRepository) {
        this.preinscripcionRepository = preinscripcionRepository;
        this.actividadRepository = actividadRepository;
    }

    public Preinscripcion registrar(String nombre, String apellido, String dni, String email, String telefono, Long actividadId) {
        Actividad actividad = actividadRepository.findById(actividadId)
                .orElseThrow(() -> new IllegalArgumentException("La actividad seleccionada no existe"));

        Preinscripcion preinscripcion = new Preinscripcion(nombre, apellido, dni, email, telefono, actividad);
        return preinscripcionRepository.save(preinscripcion);
    }

    public List<Preinscripcion> listarTodas() {
        return preinscripcionRepository.findAll();
    }
}