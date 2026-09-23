document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    if (toggle && menu) {
        toggle.addEventListener('click', function() {
            menu.classList.toggle('activo');
        });
    }
});



  const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTogDlkCoAsWFEBT1ZRxhV4seCQUfJ8MGxA5MHzt50yIPPEJiO4vVWUoC7CHbKcxDLJkkVcZD94rg40/pub?gid=1728784535&single=true&output=csv';

  fetch(CSV_URL)
  .then(response => response.text())
  .then(csv => {
    // Dividir el CSV en líneas
    const lineas = csv.trim().split('\n');

    // La primera línea son los encabezados, la saltamos
    const filas = lineas.slice(1);

    filas.forEach(linea => {
      // Separar por comas (el CSV usa comas)
      const columnas = linea.split(',');

      const nombreTaller = columnas[0].trim();       // Columna A
      const cuposDisponibles = columnas[3].trim();   // Columna D

      // Buscar la tarjeta correspondiente en el HTML
      const tarjeta = document.querySelector(`[data-taller="${nombreTaller}"]`);

      if (tarjeta) {
        const span = tarjeta.querySelector('.cupos-numero');
        if (span) {
          span.textContent = cuposDisponibles;
        }
      }
    });
  })
  .catch(error => {
    console.error('Error al cargar los cupos:', error);
    // En caso de error, mostrar un guion en lugar de dejar "..." 
    document.querySelectorAll('.cupos-numero').forEach(span => {
      if (span.textContent === '...') span.textContent = '—';
     });
  });