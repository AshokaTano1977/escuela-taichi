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
    const filas = lineas.slice(1);

    filas.forEach((linea) => {
      const columnas = linea.split(",");
      const nombreTaller = columnas[0].trim();
      const cuposDisponibles = columnas[3].trim();

      const tarjeta = document.querySelector(`[data-taller="${nombreTaller}"]`);

      if (tarjeta) {
        const span = tarjeta.querySelector(".cupos-numero");
        if (span) {
          span.textContent = cuposDisponibles;
        }
      }
    });
  })
  .catch((error) => {
    console.error("Error al cargar cupos:", error);
    document.querySelectorAll(".cupos-numero").forEach((span) => {
      if (span.textContent === "...") span.textContent = "—";
    });
  });
