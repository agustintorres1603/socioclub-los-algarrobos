package ar.edu.siglo21.backend.repository;

import ar.edu.siglo21.backend.model.Preinscripcion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PreinscripcionRepository extends JpaRepository<Preinscripcion, Long> {

    // Permite consultar preinscripciones filtrando por actividad
    List<Preinscripcion> findByActividadId(Long actividadId);
}