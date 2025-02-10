import { fetchGet, fetchPost } from '../fetchUtils';

let personas = [];
const form = document.getElementById('personaForm');

(async function() {
    await fetchPersonas();
})();

form.addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = form['name'].value;
    const lastName = form['lastName'].value;
    const dateBirth = form['dob'].value;
    const data = new FormData(form);
    data.append('name', name);
    data.append('lastName', lastName);
    data.append('dateBirth', dateBirth);

    const response = await fetchPost('/home/persons/add', data);
    console.log(response);
    if (response.status === 'success') {
        await fetchPersonas();
        form.reset();
    }
});

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