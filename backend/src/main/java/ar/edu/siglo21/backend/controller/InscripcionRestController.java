package ar.edu.siglo21.backend.controller;

import ar.edu.siglo21.backend.dto.InscripcionRequest;
import ar.edu.siglo21.backend.model.Inscripcion;
import ar.edu.siglo21.backend.service.InscripcionService;
import ar.edu.siglo21.backend.service.ReglaNegocioException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/inscripciones")
public class InscripcionRestController {

    private final InscripcionService inscripcionService;

    public InscripcionRestController(InscripcionService inscripcionService) {
        this.inscripcionService = inscripcionService;
    }

    @PostMapping
    public ResponseEntity<?> inscribir(@RequestBody InscripcionRequest request) {
        try {
            Inscripcion inscripcion = inscripcionService.inscribirSocio(
                    request.getSocioId(),
                    request.getActividadId()
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(inscripcion);
        } catch (ReglaNegocioException e) {
            // Formato exigido en el Anexo A del enunciado: 409 Conflict
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of(
                    "error", e.getMessage(),
                    "regla", e.getCodigoRegla()
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "error", e.getMessage()
            ));
        }
    }

    @PutMapping("/{id}/baja")
    public ResponseEntity<?> darDeBaja(@PathVariable Long id) {
        try {
            Inscripcion baja = inscripcionService.darDeBaja(id);
            return ResponseEntity.ok(baja);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}