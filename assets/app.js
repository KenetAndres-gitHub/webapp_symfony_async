import './bootstrap.js';
/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
 */
import './styles/app.css';
import { fetchGet } from './js/fetchUtils';

// Exponer las funciones globalmente
window.fetchGet = fetchGet;

console.log('Hello Webpack Encore! Edit me in assets/app.js');