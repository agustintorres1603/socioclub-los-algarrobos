package ar.edu.siglo21.backend.controller;

import ar.edu.siglo21.backend.model.Inscripcion;
import ar.edu.siglo21.backend.model.Socio;
import ar.edu.siglo21.backend.service.InscripcionService;
import ar.edu.siglo21.backend.service.SocioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/socios")
public class SocioRestController {

    private final SocioService socioService;
    private final InscripcionService inscripcionService;

    public SocioRestController(SocioService socioService, InscripcionService inscripcionService) {
        this.socioService = socioService;
        this.inscripcionService = inscripcionService;
    }

    @GetMapping("/dni/{dni}")
    public ResponseEntity<Socio> buscarPorDni(@PathVariable String dni) {
        return socioService.buscarPorDni(dni)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/inscripciones")
    public ResponseEntity<List<Inscripcion>> obtenerInscripcionesActivas(@PathVariable Long id) {
        if (socioService.buscarPorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        List<Inscripcion> activas = inscripcionService.listarPorSocioActivas(id);
        return ResponseEntity.ok(activas);
    }
}