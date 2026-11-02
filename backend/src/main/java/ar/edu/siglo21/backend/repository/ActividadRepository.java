package ar.edu.siglo21.backend.repository;

import ar.edu.siglo21.backend.model.Actividad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ActividadRepository extends JpaRepository<Actividad, Long> {

    // Método derivado: Spring genera el SQL: SELECT * FROM actividad WHERE LOWER(disciplina) = LOWER(?)
    List<Actividad> findByDisciplinaIgnoreCase(String disciplina);
}