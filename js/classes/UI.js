import {form, listadoClientes} from '../selectores.js';

class UI{
    imprimirMensaje(mensaje, tipo){
        if (!document.getElementById('mensaje')) {

            const divMensaje = document.createElement('div');
            divMensaje.id = 'mensaje';
            divMensaje.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'border');
            
            if (tipo === 'error') {
                divMensaje.classList.add('bg-red-200', 'border-red-400', 'text-red-700');
            } else {
                divMensaje.classList.add('bg-green-200', 'border-green-400', 'text-green-700');
            }
            
            divMensaje.textContent = mensaje;
            
            form.appendChild(divMensaje);

            setTimeout(() => {
                divMensaje.remove();
            }, 1500);
        }
    }
    imprimirClientes(cliente){
        const {nombre, email, telefono, empresa, id} = cliente;
        const listItem = document.createElement('tr');
        listItem.innerHTML = ` 
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <p class="text-sm leading-5 font-medium text-gray-700 text-lgfont-bold"> ${nombre} </p>
                <p class="text-sm leading-10 text-gray-700"> ${email} </p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                <p class="text-gray-700">${telefono}</p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200leading-5     text-gray-700">    
                <p class="text-gray-600">${empresa}</p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sleading-5">
                <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-800 mr-5">Editar</a>
                <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-90 btnEliminar">Eliminar</a>
            </td>
        `;
        listadoClientes.appendChild(listItem);
    }
    vaciarLista(){
        while(listadoClientes.firstChild){
            listadoClientes.firstChild.remove();
        }
    }
    clearForm(){
        form.reset();
    }
}

export default UI;