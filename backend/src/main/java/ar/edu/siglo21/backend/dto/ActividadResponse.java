package ar.edu.siglo21.backend.dto;

import ar.edu.siglo21.backend.model.Actividad;

public class ActividadResponse {

    private Long id;
    private String nombre;
    private String disciplina;
    private String profesor;
    private String dias;
    private String horario;
    private Integer edadMinima;
    private Integer edadMaxima;
    private Integer cupoMaximo;
    private Double cuotaMensual;
    private Long cupoDisponible;

    public ActividadResponse() {
    }

    public ActividadResponse(Actividad act, Long cupoDisponible) {
        this.id = act.getId();
        this.nombre = act.getNombre();
        this.disciplina = act.getDisciplina();
        this.profesor = act.getProfesor();
        this.dias = act.getDias();
        this.horario = act.getHorario();
        this.edadMinima = act.getEdadMinima();
        this.edadMaxima = act.getEdadMaxima();
        this.cupoMaximo = act.getCupoMaximo();
        this.cuotaMensual = act.getCuotaMensual();
        this.cupoDisponible = cupoDisponible;
    }

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getDisciplina() {
        return disciplina;
    }

    public String getProfesor() {
        return profesor;
    }

    public String getDias() {
        return dias;
    }

    public String getHorario() {
        return horario;
    }

    public Integer getEdadMinima() {
        return edadMinima;
    }

    public Integer getEdadMaxima() {
        return edadMaxima;
    }

    public Integer getCupoMaximo() {
        return cupoMaximo;
    }

    public Double getCuotaMensual() {
        return cuotaMensual;
    }

    public Long getCupoDisponible() {
        return cupoDisponible;
    }
}