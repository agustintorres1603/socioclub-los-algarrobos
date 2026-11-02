package ar.edu.siglo21.backend.controller;

import ar.edu.siglo21.backend.model.Socio;
import ar.edu.siglo21.backend.service.SocioService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/socios")
public class SocioWebController {

    private final SocioService socioService;

    public SocioWebController(SocioService socioService) {
        this.socioService = socioService;
    }

    @GetMapping
    public String listar(@RequestParam(value = "apellido", required = false) String apellido,
                         @RequestParam(value = "page", defaultValue = "0") int page,
                         Model model) {
        // Paginación obligatoria del enunciado: 5 socios por página
        Pageable pageable = PageRequest.of(page, 5, Sort.by("apellido").ascending());
        Page<Socio> paginaSocios = socioService.listarPaginado(apellido, pageable);

        model.addAttribute("paginaSocios", paginaSocios);
        model.addAttribute("apellidoBuscado", apellido != null ? apellido : "");
        model.addAttribute("paginaActual", page);
        return "socios/lista";
    }

    @GetMapping("/nuevo")
    public String formularioNuevo(Model model) {
        model.addAttribute("socio", new Socio());
        return "socios/formulario";
    }

    @GetMapping("/editar/{id}")
    public String formularioEditar(@PathVariable Long id, Model model, RedirectAttributes redirectAttributes) {
        return socioService.buscarPorId(id)
                .map(socio -> {
                    model.addAttribute("socio", socio);
                    return "socios/formulario";
                })
                .orElseGet(() -> {
                    redirectAttributes.addFlashAttribute("error", "Socio no encontrado.");
                    return "redirect:/socios";
                });
    }

    @PostMapping("/guardar")
    public String guardar(@ModelAttribute Socio socio, RedirectAttributes redirectAttributes) {
        socioService.guardar(socio);
        redirectAttributes.addFlashAttribute("exito", "Socio registrado correctamente.");
        return "redirect:/socios";
    }
}