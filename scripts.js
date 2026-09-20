document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      menu.classList.toggle("activo");
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // ... tu código del menú móvil ...

  // Cargar cupos dinámicos
  const CSV_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTogDlkCoAsWFEBT1ZRxhV4seCQUfJ8MGxA5MHzt50yIPPEJiO4vVWUoC7CHbKcxDLJkkVcZD94rg40/pub?gid=1728784535&single=true&output=csv";

  fetch(CSV_URL)
    .then((response) => response.text())
    .then((csv) => {
      const lineas = csv.trim().split("\n");
      // La primera línea son los encabezados, la ignoramos
      const datos = lineas.slice(1).map((linea) => linea.split(","));

      datos.forEach((fila) => {
        const nombreTaller = fila[0];
        const cuposDisponibles = fila[3];

        const tarjeta = document.querySelector(
          `[data-taller="${nombreTaller}"]`,
        );
        if (tarjeta) {
          tarjeta.querySelector(".cupos-numero").textContent = cuposDisponibles;
        }
      });
    })
    .catch((error) => console.error("Error al cargar cupos:", error));
});
