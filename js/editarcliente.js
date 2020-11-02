import CRMDB from './classes/IndexedDB.js'
import {form} from './selectores.js'

const crmDB = new CRMDB();
const infoURL = new URLSearchParams(window.location.search);
const clienteId = Number(infoURL.get('id'))

setTimeout(() => {
    crmDB.obtenerCliente(clienteId)
}, 1000);

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    crmDB.actualizarCliente(clienteId);
});