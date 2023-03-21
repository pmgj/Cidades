class GUI {
    constructor() {
        this.xhr = new XMLHttpRequest();
        this.xml = null;
    }
    sortStates(estados) {
        let array = Array.prototype.slice.call(estados, 0);
        array.sort((a, b) => {
            let aState = a.getAttribute("name");
            let bState = b.getAttribute("name");
            return aState.localeCompare(bState);
        });
        return array;
    }
    getStates() {
        let estados = this.xml.getElementsByTagName("estado");
        let array = this.sortStates(estados);
        let str = "";
        array.forEach(element => {
            let nome = element.getAttribute("name");
            let id = element.getAttribute("id");
            str += `<option value="${id}">${nome}</option>`;            
        });
        let form = document.forms[0];
        form.estados.innerHTML = str;
    }
    getFile() {
        this.xml = this.xhr.responseXML;
        this.getStates();
        this.getCities();
    }
    getCities() {
        let form = document.forms[0];
        let id = form.estados.value;
        let cidades = this.xml.querySelectorAll(`estado[id='${id}'] cidade`);
        let str = "";
        cidades.forEach(e => {
            let nome = e.getAttribute("name");
            let id = e.getAttribute("codigo");
            str += `<option value="${id}">${nome}</option>`;
        });
        form.cidades.innerHTML = str;
    }
    init() {
        this.xhr.open("get", "cidades.xml", true);
        this.xhr.onload = this.getFile.bind(this);
        this.xhr.send(null);

        let form = document.forms[0];
        form.estados.onchange = this.getCities.bind(this);
    }
}
let gui = new GUI();
gui.init();