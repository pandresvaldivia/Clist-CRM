import UI from './UI.js'
import {validarCliente, imprimirDatos} from '../funciones.js'

const ui = new UI();

class crmDB{
    constructor(){
        this.database = undefined;
        this.crearDB();
    }
    crearDB(){
        const crm = indexedDB.open('crm',1);
        
        crm.onsuccess = (e)=>{
            console.log('Base de datos creada exitosamente');
            this.database =  crm.result;
        }

        crm.onerror = ()=>{
            console.log('Error al crear la base de datos');
        }

        crm.onupgradeneeded = (e)=>{
            const db = e.target.result;
            const objStore = db.createObjectStore('crm', {
                keyPath: 'id',
                autoIncrement: true 
            });

            objStore.createIndex('nombre', 'nombre', {unique:false});
            objStore.createIndex('email', 'email', {unique:true});
            objStore.createIndex('telefono', 'telefono', {unique: false});
            objStore.createIndex('empresa', 'empresa', {unique:false});
            objStore.createIndex('id', 'id', {unique:true});
        }
    }
    agregarCliente(){
        const cliente = validarCliente()
        if (cliente) {
            const transaction = this.database.transaction(['crm'], 'readwrite');
            const objStore = transaction.objectStore('crm');
            const request = objStore.add(cliente);
            
            request.onsuccess = ()=>{
                ui.clearForm();
                ui.imprimirMensaje('Cliente agregado', 'exito');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 500);
            }
            request.onerror = ()=>{
                ui.imprimirMensaje('Error al agregar cliente', 'error');
            }
        }
    }
    actualizarCliente(id){
        const cliente = validarCliente()
        if (cliente) {
            cliente.id = id;
            const transaction = this.database.transaction(['crm'], 'readwrite');
            const objStore = transaction.objectStore('crm');
            const request = objStore.put(cliente);
            
            request.onsuccess = ()=>{
                ui.clearForm();
                ui.imprimirMensaje('Datos actualizados', 'exito');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 500);
            }

            request.onerror = (e)=>{
                ui.imprimirMensaje('Error al actualizar los datos', 'error');
            }
        }
    }
    obtenerClientes(){
        ui.vaciarLista();
        let objStore = this.database.transaction('crm').objectStore('crm');

        objStore.openCursor().onsuccess = (e)=>{
            let cursor = e.target.result;
            if (cursor) {
                ui.imprimirClientes(cursor.value)
                cursor.continue();
            }
        };
    }
    obtenerCliente(id){
        const transaction = this.database.transaction(['crm']);
        var objStore = transaction.objectStore('crm');
        var request = objStore.get(Number(id));
        request.onerror = ()=>{
            console.log('No se pudo encontrar el cliente');
        }
        request.onsuccess = ()=>{
            imprimirDatos(request.result);
            return id;
        }
    }
    eliminarCliente(id){
        const request = this.database.transaction(['crm'], 'readwrite').objectStore('crm').delete(Number(id));
        request.onsuccess = function() {
            console.log('Cliente eliminado');
        };
        this.obtenerClientes();
        request.onerror = ()=>{
            console.log('Error al eliminar cliente');
        }
    }
}

export default crmDB;