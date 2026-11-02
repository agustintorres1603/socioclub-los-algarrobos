package ar.edu.siglo21.backend.controller;

import ar.edu.siglo21.backend.dto.PreinscripcionRequest;
import ar.edu.siglo21.backend.model.Preinscripcion;
import ar.edu.siglo21.backend.service.PreinscripcionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/preinscripciones")
public class PreinscripcionRestController {

    private final PreinscripcionService preinscripcionService;

    public PreinscripcionRestController(PreinscripcionService preinscripcionService) {
        this.preinscripcionService = preinscripcionService;
    }

    @PostMapping
    public ResponseEntity<?> recibirPreinscripcion(@RequestBody PreinscripcionRequest request) {
        try {
            Preinscripcion pre = preinscripcionService.registrar(
                    request.getNombre(),
                    request.getApellido(),
                    request.getDni(),
                    request.getEmail(),
                    request.getTelefono(),
                    request.getActividadId()
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                    "id", pre.getId(),
                    "mensaje", "Preinscripción recibida correctamente."
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "error", e.getMessage()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "error", "Ocurrió un error al procesar la preinscripción."
            ));
        }
    }
}