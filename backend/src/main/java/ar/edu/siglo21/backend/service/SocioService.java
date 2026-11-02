package ar.edu.siglo21.backend.service;

import ar.edu.siglo21.backend.model.Socio;
import ar.edu.siglo21.backend.repository.SocioRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SocioService {

    private final SocioRepository socioRepository;

    public SocioService(SocioRepository socioRepository) {
        this.socioRepository = socioRepository;
    }

    public List<Socio> listarTodos() {
        return socioRepository.findAll();
    }

    public Page<Socio> listarPaginado(String apellido, Pageable pageable) {
        if (apellido != null && !apellido.isBlank()) {
            return socioRepository.findByApellidoContainingIgnoreCase(apellido.trim(), pageable);
        }
        return socioRepository.findAll(pageable);
    }

    public Optional<Socio> buscarPorId(Long id) {
        return socioRepository.findById(id);
    }

    public Optional<Socio> buscarPorDni(String dni) {
        return socioRepository.findByDni(dni.trim());
    }

    public Socio guardar(Socio socio) {
        return socioRepository.save(socio);
    }
}