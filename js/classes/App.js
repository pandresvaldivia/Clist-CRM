import CRMDB from './IndexedDB.js'

class App{
    constructor(){
        this.initApp();
    }
    initApp(){
        const crmDB = new CRMDB();
        setTimeout(() => {
            crmDB.obtenerClientes();
        }, 1000);
    }
}

export default App;