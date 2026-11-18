package ar.edu.siglo21.backend.repository;

import ar.edu.siglo21.backend.model.Actividad;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ActividadRepository extends JpaRepository<Actividad, Long> {

    // Método derivado: Spring genera el SQL: SELECT * FROM actividad WHERE LOWER(disciplina) = LOWER(?)
    List<Actividad> findByDisciplinaIgnoreCase(String disciplina);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT a FROM Actividad a WHERE a.id = :id")
    Optional<Actividad> buscarPorIdParaModificar(@Param("id") Long id);
}
