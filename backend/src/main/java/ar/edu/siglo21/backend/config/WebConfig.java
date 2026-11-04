package ar.edu.siglo21.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOriginPatterns(
                        "https://*.vercel.app",                     // Acepta cualquier frontend desplegado en Vercel
                        "https://socioclub-los-algarrobos-sitio-publ.vercel.app", // Tu sitio público
                        "http://localhost:3000",                   // App React local
                        "http://localhost:5173",                   // Vite
                        "http://localhost:5500",                   // Live Server
                        "http://127.0.0.1:5500"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600); // Cachea la respuesta OPTIONS por 1 hora
    }
}