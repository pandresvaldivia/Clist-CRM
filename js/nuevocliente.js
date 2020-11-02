import {form} from './selectores.js'
import {validarCliente} from './funciones.js'
import CRMDB from './classes/IndexedDB.js'

const crmDB = new CRMDB();

// form.addEventListener('submit', validarCliente);
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    setTimeout(() => {
        crmDB.agregarCliente()
    }, 1000);
});

