// Datos y comportamiento de cada actividad
class Actividad {
    constructor(id, nombre, disciplina, profesor, dias, horario, edadMinima, edadMaxima, cupoMaximo, cuotaMensual, imagen, textoAlternativo) {
        this.id = id;
        this.nombre = nombre;
        this.disciplina = disciplina;
        this.profesor = profesor;
        this.dias = dias;
        this.horario = horario;
        this.edadMinima = edadMinima;
        this.edadMaxima = edadMaxima;
        this.cupoMaximo = cupoMaximo;
        this.cuotaMensual = cuotaMensual;
        this.imagen = imagen;
        this.textoAlternativo = textoAlternativo;
    }

    esAptaParaEdad(edad) {
        return edad >= this.edadMinima && edad <= this.edadMaxima;
    }
}

// Actividades del club con sus imágenes y textos alternativos
const actividades = [
    new Actividad(1, "Fútbol infantil", "Fútbol", "Diego Ferreyra", "Lunes y miércoles", "18:00", 6, 12, 40, 18000, "imagenes/futbol.jpg", "Equipo de fútbol reunido en una cancha"),

    new Actividad(2, "Vóley mixto", "Vóley", "Laura Ceballos", "Martes y jueves", "19:00", 13, 60, 24, 20000, "imagenes/voley.jpg", "Equipo de vóley posando en una cancha cubierta"),

    new Actividad(3, "Básquet juvenil", "Básquet", "Martín Oviedo", "Lunes y viernes", "19:30", 12, 17, 20, 19000, "imagenes/basquet.jpg", "Equipo de básquet reunido en una cancha"),

    new Actividad(4, "Natación", "Natación", "Sofía Bustos", "Martes y jueves", "17:00", 5, 70, 30, 26000, "imagenes/natacion.jpg", "Nadadoras junto al borde de una pileta"),

    new Actividad(5, "Patín artístico", "Patín", "Carla Peralta", "Miércoles y viernes", "17:30", 5, 15, 25, 21000, "imagenes/patin.png", "Clase grupal de patín artístico en un gimnasio"),

    new Actividad(6, "Ajedrez", "Ajedrez", "Raúl Giménez", "Sábado", "10:00", 8, 99, 16, 9000, "imagenes/ajedrez.png", "Un adulto y un chico se saludan frente a un tablero de ajedrez"),

    new Actividad(7, "Funcional adultos", "Fitness", "Paula Luna", "Lunes, miércoles y viernes", "20:30", 18, 65, 30, 22000, "imagenes/funcional.png", "Grupo de adultos haciendo sentadillas al aire libre"),

    new Actividad(8, "Yoga", "Bienestar", "Inés Arguello", "Martes y jueves", "09:00", 16, 99, 15, 17000, "imagenes/yoga.jpg", "Personas practicando yoga en grupo")
];

const listaActividades = document.getElementById("lista-actividades");
const filtroDisciplina = document.getElementById("filtro-disciplina");
const filtroEdad = document.getElementById("filtro-edad");

if (listaActividades && filtroDisciplina && filtroEdad) {
    function mostrarActividades() {
        const disciplinaSeleccionada = filtroDisciplina.value;
        const edadTexto = filtroEdad.value.trim();

        // Vaciar el listado antes de dibujar el resultado de los filtros.
        listaActividades.innerHTML = "";

        // badInput detecta una entrada incompleta que el navegador no puede convertir.
        if (filtroEdad.validity.badInput || (edadTexto !== "" && (!Number.isInteger(Number(edadTexto)) || Number(edadTexto) < 0))) {
            const mensaje = document.createElement("p");
            mensaje.textContent = "Ingresá una edad válida, sin decimales.";
            listaActividades.append(mensaje);
            return;
        }

        const edad = Number(edadTexto);

        const actividadesFiltradas = actividades.filter((actividad) => {
            const coincideDisciplina = disciplinaSeleccionada === "todas" || actividad.disciplina === disciplinaSeleccionada;
            const coincideEdad = edadTexto === "" || actividad.esAptaParaEdad(edad);
            return coincideDisciplina && coincideEdad;
        });

        if (actividadesFiltradas.length === 0) {
            const mensaje = document.createElement("p");
            mensaje.textContent = "No se encontraron actividades para esos filtros.";
            listaActividades.append(mensaje);
            return;
        }

        // Creación de las tarjetas con imagen y datos
        for (const actividad of actividadesFiltradas) {
            const tarjeta = document.createElement("article");
            tarjeta.className = "tarjeta-actividad";

            const imagen = document.createElement("img");
            imagen.className = "actividad-imagen";
            imagen.src = actividad.imagen;
            imagen.alt = actividad.textoAlternativo;

            const contenido = document.createElement("div");
            contenido.className = "actividad-contenido";

            const titulo = document.createElement("h3");
            titulo.textContent = actividad.nombre;

            const disciplina = document.createElement("p");
            disciplina.className = "actividad-disciplina";
            disciplina.textContent = actividad.disciplina;

            const horario = document.createElement("p");
            horario.className = "actividad-horario";
            horario.textContent = `${actividad.dias} · ${actividad.horario} h`;

            const profesor = document.createElement("p");
            profesor.textContent = `Profesor/a: ${actividad.profesor}`;

            const edades = document.createElement("p");
            edades.textContent = `Edades: de ${actividad.edadMinima} a ${actividad.edadMaxima} años`;

            const cupo = document.createElement("p");
            cupo.textContent = `Cupo máximo: ${actividad.cupoMaximo}`;

            const cuota = document.createElement("p");
            cuota.className = "actividad-cuota";
            cuota.textContent = `$${actividad.cuotaMensual.toLocaleString("es-AR")} por mes`;

            const enlace = document.createElement("a");
            enlace.className = "boton boton-principal";
            enlace.href = "preinscripcion.html";
            enlace.textContent = "Preinscribirme";

            contenido.append(titulo, disciplina, horario, profesor, edades, cupo, cuota, enlace);
            tarjeta.append(imagen, contenido);
            listaActividades.append(tarjeta);
        }
    }

    // Aplicar los filtros cuando se presiona el botón
    const botonAplicarFiltros = document.getElementById("aplicar-filtros");

    if (botonAplicarFiltros) {
        botonAplicarFiltros.addEventListener("click", mostrarActividades);
    }

    mostrarActividades();
}


// Esta sección corresponde a la pagina de preinscripcion.html
const formularioPreinscripcion = document.getElementById("formulario-preinscripcion");

if (formularioPreinscripcion) {
    const mensajeFormulario = document.getElementById("mensaje-formulario");

    // La expresión regular acepta solamente 7 u 8 dígitos, de principio a fin.
    function esDniValido(dni) {
        return /^\d{7,8}$/.test(dni);
    }

    // Comprobación básica: texto, una arroba y un dominio con un punto, sin espacios.
    function esEmailValido(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Mostrar el error y marcar el campo correspondiente
    function mostrarError(campo, texto) {
        const mensaje = document.getElementById(`error-${campo}`);
        const control = document.getElementById(campo);

        mensaje.textContent = texto;

        if (texto !== "") {
            control.setAttribute("aria-invalid", "true");
        } else {
            control.removeAttribute("aria-invalid");
        }
    }

    formularioPreinscripcion.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const dni = document.getElementById("dni").value.trim();
        const email = document.getElementById("email").value.trim();
        const actividad = document.getElementById("actividad").value;

        for (const campo of ["nombre", "apellido", "dni", "email", "actividad"]) {
            mostrarError(campo, "");
        }

        mensajeFormulario.textContent = "";
        let datosValidos = true;

        if (nombre === "") {
            mostrarError("nombre", "Ingresá tu nombre.");
            datosValidos = false;
        }

        if (apellido === "") {
            mostrarError("apellido", "Ingresá tu apellido.");
            datosValidos = false;
        }

        if (dni === "") {
            mostrarError("dni", "Ingresá tu DNI.");
            datosValidos = false;
        } else if (!esDniValido(dni)) {
            mostrarError("dni", "El DNI debe tener 7 u 8 números, sin puntos.");
            datosValidos = false;
        }

        if (email === "") {
            mostrarError("email", "Ingresá tu correo electrónico.");
            datosValidos = false;
        } else if (!esEmailValido(email)) {
            mostrarError("email", "Ingresá un correo electrónico válido.");
            datosValidos = false;
        }

        if (actividad === "") {
            mostrarError("actividad", "Seleccioná una actividad.");
            datosValidos = false;
        }

        if (datosValidos) {
            mensajeFormulario.textContent = "Los datos son válidos, pero la preinscripción todavía no fue enviada.";
        } else {
            mensajeFormulario.textContent = "Revisá los campos indicados.";
        }
    });
}

const botonVolver = document.getElementById("boton-volver");

if (botonVolver) {
    botonVolver.addEventListener("click", function () {
        history.back();
    });
}
