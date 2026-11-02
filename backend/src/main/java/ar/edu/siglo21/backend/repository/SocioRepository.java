package ar.edu.siglo21.backend.repository;

import ar.edu.siglo21.backend.model.Socio;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface SocioRepository extends JpaRepository<Socio, Long> {

    // Para el login/ingreso por DNI (RF8 y Anexo A)
    Optional<Socio> findByDni(String dni);

    // Para la búsqueda por apellido en secretaría (RF5)
    Page<Socio> findByApellidoContainingIgnoreCase(String apellido, Pageable pageable);
}