import { fetchGet, fetchPost } from '../fetchUtils';

let personas = [];
const form = document.getElementById('personaForm');

(async function() {
    await fetchPersonas();
    const searchName = document.getElementById('searchName');
    const searchLastName = document.getElementById('searchLastName');
    const searchDob = document.getElementById('searchDob');

    [searchName, searchLastName, searchDob].forEach((input) => {
        input.addEventListener('input', filterAndRenderPersonas);
    });
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

function filterAndRenderPersonas() {
    const nameValue = (document.getElementById('searchName').value || '').toLowerCase();
    const lastNameValue = (document.getElementById('searchLastName').value || '').toLowerCase();
    const dateValue = (document.getElementById('searchDob').value || '').split('-').reverse().join('-'); //.plit para separar la fecha en 3 partes, reverse para invertir el orden y join para unir las partes con un guion
    // Filtra usando todos los campos: si están vacíos no afectan el filtrado
    const filtered = personas.filter((p) => {
        const matchesName = p.name.toLowerCase().includes(nameValue);
        const matchesLast = p.lastName.toLowerCase().includes(lastNameValue);
        const matchesDate = p.dateBirth.toLowerCase().includes(dateValue) || p.dateBirth.includes(dateValue);
        return matchesName && matchesLast && matchesDate;
    });

    const tableElement = document.getElementById('personasTableBody');
    generatePersonasTable(tableElement, filtered);
}