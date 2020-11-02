import App from './classes/App.js'
import CRMDB from './classes/IndexedDB.js'
import {listadoClientes} from './selectores.js'

const app = new App();
const crmDB = new CRMDB()

listadoClientes.addEventListener('click', (e)=>{
    if(e.target.classList.contains('btnEliminar')){
        Swal.fire({
            title: 'Eliminar cliente',
            text: '¿Seguro que desea eliminar al cliente?',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#319795',
            denyButtonText: 'Cancelar',
            denyButtonColor: '#e53e3e',
            showDenyButton: true,
            timer: 10000,
            timerProgressBar: true,
            stopKeydownPropagation: false
        }).then((result)=>{
            if(result.isConfirmed){
                const id = e.target.dataset.cliente;
            crmDB.eliminarCliente(id);
            }
        })
    }
})