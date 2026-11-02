package ar.edu.siglo21.backend.controller;

import ar.edu.siglo21.backend.model.Actividad;
import ar.edu.siglo21.backend.service.ActividadService;
import ar.edu.siglo21.backend.service.InscripcionService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/actividades")
public class ActividadWebController {

    private final ActividadService actividadService;
    private final InscripcionService inscripcionService;

    public ActividadWebController(ActividadService actividadService, InscripcionService inscripcionService) {
        this.actividadService = actividadService;
        this.inscripcionService = inscripcionService;
    }

    @GetMapping
    public String listar(@RequestParam(value = "disciplina", required = false) String disciplina, Model model) {
        List<Actividad> actividades = actividadService.listarPorDisciplina(disciplina);
        
        // Calculamos los cupos disponibles para cada actividad
        Map<Long, Long> cuposDisponibles = new HashMap<>();
        for (Actividad act : actividades) {
            cuposDisponibles.put(act.getId(), actividadService.obtenerCupoDisponible(act.getId()));
        }

        model.addAttribute("actividades", actividades);
        model.addAttribute("cuposDisponibles", cuposDisponibles);
        model.addAttribute("disciplinaSeleccionada", disciplina != null ? disciplina : "todas");
        return "actividades/lista";
    }

    @GetMapping("/nueva")
    public String formularioNueva(Model model) {
        model.addAttribute("actividad", new Actividad());
        return "actividades/formulario";
    }

    @GetMapping("/editar/{id}")
    public String formularioEditar(@PathVariable Long id, Model model, RedirectAttributes redirectAttributes) {
        return actividadService.buscarPorId(id)
                .map(actividad -> {
                    model.addAttribute("actividad", actividad);
                    return "actividades/formulario";
                })
                .orElseGet(() -> {
                    redirectAttributes.addFlashAttribute("error", "Actividad no encontrada.");
                    return "redirect:/actividades";
                });
    }

    @PostMapping("/guardar")
    public String guardar(@ModelAttribute Actividad actividad, RedirectAttributes redirectAttributes) {
        actividadService.guardar(actividad);
        redirectAttributes.addFlashAttribute("exito", "Actividad guardada correctamente.");
        return "redirect:/actividades";
    }

    @GetMapping("/eliminar/{id}")
    public String eliminar(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        try {
            actividadService.eliminar(id);
            redirectAttributes.addFlashAttribute("exito", "Actividad eliminada con éxito.");
        } catch (IllegalStateException e) {
            redirectAttributes.addFlashAttribute("error", e.getMessage());
        }
        return "redirect:/actividades";
    }

    @GetMapping("/{id}/inscriptos")
    public String verInscriptos(@PathVariable Long id, Model model, RedirectAttributes redirectAttributes) {
        return actividadService.buscarPorId(id)
                .map(actividad -> {
                    model.addAttribute("actividad", actividad);
                    model.addAttribute("inscriptos", inscripcionService.listarPorActividadActivas(id));
                    model.addAttribute("cupoDisponible", actividadService.obtenerCupoDisponible(id));
                    return "actividades/inscriptos";
                })
                .orElseGet(() -> {
                    redirectAttributes.addFlashAttribute("error", "Actividad no encontrada.");
                    return "redirect:/actividades";
                });
    }
}