package ar.edu.siglo21.backend.controller;

import ar.edu.siglo21.backend.service.ActividadService;
import ar.edu.siglo21.backend.service.InscripcionService;
import ar.edu.siglo21.backend.service.ReglaNegocioException;
import ar.edu.siglo21.backend.service.SocioService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/inscripciones")
public class InscripcionWebController {

    private final InscripcionService inscripcionService;
    private final SocioService socioService;
    private final ActividadService actividadService;

    public InscripcionWebController(InscripcionService inscripcionService,
                                    SocioService socioService,
                                    ActividadService actividadService) {
        this.inscripcionService = inscripcionService;
        this.socioService = socioService;
        this.actividadService = actividadService;
    }

    @GetMapping("/nueva")
    public String formularioInscripcion(Model model) {
        model.addAttribute("socios", socioService.listarTodos());
        model.addAttribute("actividades", actividadService.listarTodas());
        return "inscripciones/formulario";
    }

    @PostMapping("/guardar")
    public String procesarInscripcion(@RequestParam("socioId") Long socioId,
                                     @RequestParam("actividadId") Long actividadId,
                                     RedirectAttributes redirectAttributes) {
        try {
            inscripcionService.inscribirSocio(socioId, actividadId);
            redirectAttributes.addFlashAttribute("exito", "¡Inscripción realizada con éxito!");
            return "redirect:/actividades/" + actividadId + "/inscriptos";
        } catch (ReglaNegocioException e) {
            // Se atrapa la excepción y se envía el mensaje exacto exigido en la consigna
            redirectAttributes.addFlashAttribute("error", "[" + e.getCodigoRegla() + "] " + e.getMessage());
            return "redirect:/inscripciones/nueva";
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Error inesperado: " + e.getMessage());
            return "redirect:/inscripciones/nueva";
        }
    }

    @GetMapping("/baja/{id}")
    public String darDeBaja(@PathVariable Long id,
                            @RequestParam(value = "actividadId", required = false) Long actividadId,
                            RedirectAttributes redirectAttributes) {
        inscripcionService.darDeBaja(id);
        redirectAttributes.addFlashAttribute("exito", "Inscripción dada de baja (RF9).");
        if (actividadId != null) {
            return "redirect:/actividades/" + actividadId + "/inscriptos";
        }
        return "redirect:/actividades";
    }
}