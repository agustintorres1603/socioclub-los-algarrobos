package ar.edu.siglo21.backend.service;

public class ReglaNegocioException extends RuntimeException {

    private final String codigoRegla; // Guarda "RN1", "RN2", "RN3", "RN4" o "RN5"

    public ReglaNegocioException(String mensaje, String codigoRegla) {
        super(mensaje);
        this.codigoRegla = codigoRegla;
    }

    public String getCodigoRegla() {
        return codigoRegla;
    }
}