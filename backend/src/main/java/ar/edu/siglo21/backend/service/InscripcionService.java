package ar.edu.siglo21.backend.service;

import ar.edu.siglo21.backend.model.Actividad;
import ar.edu.siglo21.backend.model.Inscripcion;
import ar.edu.siglo21.backend.model.Socio;
import ar.edu.siglo21.backend.repository.ActividadRepository;
import ar.edu.siglo21.backend.repository.InscripcionRepository;
import ar.edu.siglo21.backend.repository.SocioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class InscripcionService {

    private final InscripcionRepository inscripcionRepository;
    private final SocioRepository socioRepository;
    private final ActividadRepository actividadRepository;

    // Inyección de dependencias por constructor (buena práctica de Spring)
    public InscripcionService(InscripcionRepository inscripcionRepository,
                              SocioRepository socioRepository,
                              ActividadRepository actividadRepository) {
        this.inscripcionRepository = inscripcionRepository;
        this.socioRepository = socioRepository;
        this.actividadRepository = actividadRepository;
    }

    @Transactional
    public Inscripcion inscribirSocio(Long socioId, Long actividadId) {
        // 1. Verificar existencia de entidades
        Socio socio = socioRepository.findById(socioId)
                .orElseThrow(() -> new IllegalArgumentException("No se encontró el socio con ID: " + socioId));

        Actividad actividad = actividadRepository.findById(actividadId)
                .orElseThrow(() -> new IllegalArgumentException("No se encontró la actividad con ID: " + actividadId));

        // 2. Validación RN4: Cuota al día
        if ("MOROSO".equalsIgnoreCase(socio.getEstadoCuota())) {
            throw new ReglaNegocioException("Debe regularizar su cuota en secretaría", "RN4");
        }

        // 3. Validación RN1: Cupo disponible
        long inscriptosActuales = inscripcionRepository.contarInscriptosActivos(actividadId);
        if (inscriptosActuales >= actividad.getCupoMaximo()) {
            throw new ReglaNegocioException("La actividad no tiene cupo disponible", "RN1");
        }

        // 4. Validación RN2: Sin duplicados
        boolean yaInscripto = inscripcionRepository.existsBySocioIdAndActividadIdAndEstado(socioId, actividadId, "ACTIVA");
        if (yaInscripto) {
            throw new ReglaNegocioException("El socio ya está inscripto en esta actividad", "RN2");
        }

        // 5. Validación RN3: Rango de edad
        int edadSocio = socio.getEdad();
        if (edadSocio < actividad.getEdadMinima() || edadSocio > actividad.getEdadMaxima()) {
            throw new ReglaNegocioException(
                    "La edad (" + edadSocio + " años) está fuera del rango permitido (" +
                    actividad.getEdadMinima() + " a " + actividad.getEdadMaxima() + " años)",
                    "RN3"
            );
        }

        // 6. Validación RN5: Máximo 3 actividades activas
        long actividadesActivas = inscripcionRepository.countBySocioIdAndEstado(socioId, "ACTIVA");
        if (actividadesActivas >= 3) {
            throw new ReglaNegocioException("Alcanzó el máximo de 3 actividades", "RN5");
        }

        // Si superó todas las reglas, persistimos la inscripción
        Inscripcion nuevaInscripcion = new Inscripcion(socio, actividad);
        return inscripcionRepository.save(nuevaInscripcion);
    }

    @Transactional
    public Inscripcion darDeBaja(Long inscripcionId) {
        Inscripcion inscripcion = inscripcionRepository.findById(inscripcionId)
                .orElseThrow(() -> new IllegalArgumentException("Inscripción no encontrada con ID: " + inscripcionId));

        inscripcion.setEstado("BAJA");
        return inscripcionRepository.save(inscripcion);
    }

    public List<Inscripcion> listarPorSocioActivas(Long socioId) {
        return inscripcionRepository.findBySocioIdAndEstado(socioId, "ACTIVA");
    }

    public List<Inscripcion> listarPorActividadActivas(Long actividadId) {
        return inscripcionRepository.findByActividadIdAndEstado(actividadId, "ACTIVA");
    }

    public long contarCupoDisponible(Long actividadId, int cupoMaximo) {
        long inscriptos = inscripcionRepository.contarInscriptosActivos(actividadId);
        return Math.max(0, cupoMaximo - inscriptos);
    }
}