import {nombreInput, emailInput, telefonoInput, empresaInput} from './selectores.js'
import UI from './classes/UI.js'

const ui = new UI();
const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function validarCliente(){
    const nombre = nombreInput.value;
    const email = emailInput.value;
    const telefono = telefonoInput.value;
    const empresa = empresaInput.value;
    if(nombre.trim() === '' || Number(nombre) || !emailValidator.test(email) || !Number(telefono) || telefono.trim() === '' || empresa.trim() === ''){
        ui.imprimirMensaje('Verifique si los datos son correctos', 'error')
        return false;
    }else{
        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
            id: Date.now()
        }

        return cliente;
    }
}

export function imprimirDatos(cliente){
    const {nombre, email, telefono, empresa} = cliente;

    nombreInput.value = nombre;
    emailInput.value = email;
    telefonoInput.value = telefono;
    empresaInput.value = empresa;
}