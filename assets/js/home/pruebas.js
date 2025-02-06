import fetchUtils from '../fetchUtils';

console.log('pruebas.js loaded');
(async function() {
    console.log('This is an immediately invoked function expression (IIFE)');

    if (fetchUtils && fetchUtils.fetchGet) {
        const mensajeAsincrono = await fetchUtils.fetchGet('json');
        console.log(mensajeAsincrono);
    } else {
        console.error('fetchUtils.fetchGet is not defined');
    }
})();