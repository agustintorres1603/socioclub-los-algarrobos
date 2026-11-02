package ar.edu.siglo21.backend.repository;

import ar.edu.siglo21.backend.model.Inscripcion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InscripcionRepository extends JpaRepository<Inscripcion, Long> {

    // Requisito de la materia: Consulta con @Query para contar inscriptos activos (RN1 y RF7)
    @Query("SELECT COUNT(i) FROM Inscripcion i WHERE i.actividad.id = :actividadId AND i.estado = 'ACTIVA'")
    long contarInscriptosActivos(@Param("actividadId") Long actividadId);

    // Para validar RN2: verificar si ya existe una inscripción ACTIVA del socio en esa actividad
    boolean existsBySocioIdAndActividadIdAndEstado(Long socioId, Long actividadId, String estado);

    // Para validar RN5: contar cuántas actividades activas tiene el socio (máximo 3)
    long countBySocioIdAndEstado(Long socioId, String estado);

    // Para listar las inscripciones activas de un socio (RF8, Anexo A y pantalla de Marta)
    List<Inscripcion> findBySocioIdAndEstado(Long socioId, String estado);

    // Para ver todos los inscriptos de una actividad puntual (RF7)
    List<Inscripcion> findByActividadIdAndEstado(Long actividadId, String estado);
}