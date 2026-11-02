package ar.edu.siglo21.backend.dto;

public class InscripcionRequest {

    private Long socioId;
    private Long actividadId;

    public InscripcionRequest() {
    }

    public InscripcionRequest(Long socioId, Long actividadId) {
        this.socioId = socioId;
        this.actividadId = actividadId;
    }

    public Long getSocioId() {
        return socioId;
    }

    public void setSocioId(Long socioId) {
        this.socioId = socioId;
    }

    public Long getActividadId() {
        return actividadId;
    }

    public void setActividadId(Long actividadId) {
        this.actividadId = actividadId;
    }
}