package ar.edu.siglo21.backend.controller;

import ar.edu.siglo21.backend.dto.ActividadResponse;
import ar.edu.siglo21.backend.model.Actividad;
import ar.edu.siglo21.backend.service.ActividadService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/actividades")
public class ActividadRestController {

    private final ActividadService actividadService;

    public ActividadRestController(ActividadService actividadService) {
        this.actividadService = actividadService;
    }

    @GetMapping
    public ResponseEntity<List<ActividadResponse>> listar(
            @RequestParam(value = "disciplina", required = false) String disciplina) {
        List<Actividad> lista = actividadService.listarPorDisciplina(disciplina);
        List<ActividadResponse> respuesta = new ArrayList<>();

        for (Actividad act : lista) {
            long cupoDisponible = actividadService.obtenerCupoDisponible(act.getId());
            respuesta.add(new ActividadResponse(act, cupoDisponible));
        }

        return ResponseEntity.ok(respuesta);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ActividadResponse> buscarPorId(@PathVariable Long id) {
        return actividadService.buscarPorId(id)
                .map(act -> {
                    long cupoDisp = actividadService.obtenerCupoDisponible(act.getId());
                    return ResponseEntity.ok(new ActividadResponse(act, cupoDisp));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Actividad> crear(@RequestBody Actividad actividad) {
        Actividad nueva = actividadService.guardar(actividad);
        return ResponseEntity.status(HttpStatus.CREATED).body(nueva);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Actividad> actualizar(@PathVariable Long id, @RequestBody Actividad actividadActualizada) {
        return actividadService.buscarPorId(id)
                .map(act -> {
                    act.setNombre(actividadActualizada.getNombre());
                    act.setDisciplina(actividadActualizada.getDisciplina());
                    act.setProfesor(actividadActualizada.getProfesor());
                    act.setDias(actividadActualizada.getDias());
                    act.setHorario(actividadActualizada.getHorario());
                    act.setEdadMinima(actividadActualizada.getEdadMinima());
                    act.setEdadMaxima(actividadActualizada.getEdadMaxima());
                    act.setCupoMaximo(actividadActualizada.getCupoMaximo());
                    act.setCuotaMensual(actividadActualizada.getCuotaMensual());
                    return ResponseEntity.ok(actividadService.guardar(act));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        try {
            actividadService.eliminar(id);
            return ResponseEntity.noContent().build(); // 204 No Content
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", e.getMessage())); // 409 Conflict si hay inscriptos
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}