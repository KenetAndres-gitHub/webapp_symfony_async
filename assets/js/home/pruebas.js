import { fetchGet } from '../fetchUtils';

let personas = [];

(async function() {
    await fetchPersonas();
    const mensajeAsincrono = await fetchGet('/home/json');
})();

async function fetchPersonas() {
    personas = await fetchGet('/home/persons');
    // Generar la tabla de personas
    const tableElement = document.getElementById('personasTable');
    if (tableElement) {
        generatePersonasTable(tableElement, personas);
    }
}

function generatePersonasTable(tableElement, personas) {
    // Limpiar el contenido existente de la tabla
    tableElement.innerHTML = '';

    // Crear el encabezado de la tabla
    const tableHeader = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['ID', 'Nombre', 'Edad']; // Ajusta los encabezados según tus datos
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    tableHeader.appendChild(headerRow);
    tableElement.appendChild(tableHeader);

    // Crear el cuerpo de la tabla
    const tableBody = document.createElement('tbody');
    personas.forEach(persona => {
        const row = document.createElement('tr');
        Object.values(persona).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            row.appendChild(td);
        });
        tableBody.appendChild(row);
    });
    tableElement.appendChild(tableBody);
}