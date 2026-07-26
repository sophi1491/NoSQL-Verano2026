const formulario = document.getElementById("formulario");

const titulo = document.getElementById("titulo");
const genero = document.getElementById("genero");
const año = document.getElementById("año");
const duracion = document.getElementById("duracion");
const idioma = document.getElementById("idioma");
const calificacion = document.getElementById("calificacion");
const nc = document.getElementById("nc");

const btnConsultar = document.getElementById("btnConsultar");
const listaPeliculas = document.getElementById("listaPeliculas");

function escapeHTML(valor) {
    return String(valor ?? "").replace(/[&<>"']/g, (caracter) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[caracter]));
}

// Guardar película
formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    const pelicula = {
        titulo: titulo.value,
        genero: genero.value,
        año: Number(año.value),
        duracion: Number(duracion.value),
        idioma: idioma.value,
        calificacion: Number(calificacion.value),
        nc: nc.value
    };

    try {

        const respuesta = await agregarPelicula(pelicula);

        alert(respuesta.mensaje);

        formulario.reset();

    } catch (error) {

        alert(error.message);

    }

});

// Consultar películas
btnConsultar.addEventListener("click", async () => {

    try {

        const peliculas = await obtenerPeliculas();

        listaPeliculas.innerHTML = "";

        peliculas.forEach((pelicula) => {

            const li = document.createElement("li");

            li.className = "ticket";

            li.innerHTML = `
                <div class="ticket-main">
                    <p class="ticket-genre">${escapeHTML(pelicula.genero)}</p>
                    <h3 class="ticket-title">${escapeHTML(pelicula.titulo)}</h3>
                    <p class="ticket-lang">${escapeHTML(pelicula.idioma)}</p>
                </div>
                <div class="ticket-stub">
                    <span class="ticket-year">${escapeHTML(pelicula.año ?? "—")}</span>
                    <span class="ticket-duration">${pelicula.duracion ? escapeHTML(pelicula.duracion) + " min" : "—"}</span>
                    <span class="ticket-rating">${escapeHTML(pelicula.calificacion ?? "—")}</span>
                    <span class="ticket-nc">${escapeHTML(pelicula.nc ?? "—")}</span>
                </div>
            `;

            listaPeliculas.appendChild(li);

        });

    } catch (error) {

        alert(error.message);

    }

});
