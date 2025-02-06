import { fetchGet } from '../fetchUtils';

let personas = [];

(async function() {
    await fetchPersonas();
})();

async function fetchPersonas() {
    personas = await fetchGet('/home/persons');
    // Generar la tabla de personas
    const tableElement = document.getElementById('personasTableBody');
    if (tableElement) {
        generatePersonasTable(tableElement, personas);
    }
}

function generatePersonasTable(tableElement, personas) {
    // Limpiar el contenido existente de la tabla
    tableElement.innerHTML = '';
    //sino hay personas, muestra un mensaje
    if (personas.length === 0) {
        tableElement.innerHTML = '<tr><td colspan="4">No hay personas registradas</td></tr>';
        return;
    }
    // Crear el cuerpo de la tabla
    personas.forEach(persona => {
        const row = document.createElement('tr');
        ['index', 'name', 'lastName','dateBirth'].forEach((key) => {
            const cell = document.createElement('td');
            cell.textContent = key === 'index' ? personas.indexOf(persona) + 1 : persona[key];
            row.appendChild(cell);
        });
        
        tableElement.appendChild(row);
    });
}