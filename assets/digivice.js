// Declaro las variables necesarias
var contenido;
var digivice;
var digimon;
var digiModal;
var mostrarModal;
var digimonData;
var selector;
var listaDigimon;

// ************************* Muestro los datos de la API utilizando una tabla. ************************* 

function tabla(){
// Llamada a la API, luego le entrego sus datos a la funcion que crea la tabla.
    fetch('https://digimon-api.vercel.app/api/digimon')
        .then(response => response.json())
        .then(resp => {
            crearTabla(resp);
        });
// Accedo al div con id "digiData" y le quito las clases bootstrap ya que no las necesito, luego reemplazo el contenido HTML con un spinner para indicarle al usuario que los datos estan cargando.
        contenido = document.getElementById("digiData");
        digiData.className=("");
        contenido.innerHTML = `
        <div class="text-center">
            <div class="spinner-grow loading" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        `;

// Elimino el spinner y luego escribo el nuevo contenido HTML, en el que agrego un div adicional con id digiTabla para escribir en el los datos de la API.
    function crearTabla(resp){
        contenido.innerHTML =`
        <table class="mx-auto text-center tableW bg-white border border-2 border-secondary">
        <thead class="table-light">
        <tr>
            <th scope="col">Imagen</th>
            <th scope="col">Nombre</th>
            <th scope="col">Nivel</th>
        </tr>
        </thead>
        <tbody class="table-group-divider" id="digiTabla">
        </tbody>
        </table>`;
// Agrego el contenido HTML utilizando los datos de la API en el nuevo <div> con id digiTabla.
// El <tr> con id "capturarModal" contiene atributos "data" personalizados que seran utilizados para desplegar los datos del Digimon seleccionado
// de forma individual en pantalla utilizando un modal de bootstrap cuando el usuario haga click en el.
        digivice = document.getElementById('digiTabla');
        for(digimon of resp){
            digivice.innerHTML +=
            `
    <tr class="cardH" id="capturaModal" data-imagen="${digimon.img}" data-nombre="Nombre: ${digimon.name}" data-nivel="Nivel: ${digimon.level}" onclick="datosModal(this);">
        <td>
            <img src="${digimon.img}" id="capturaModal" class="img-lista">
        </td>
        <td>${digimon.name}</td>
        <td>${digimon.level}</td>
    </tr>
    `}
    };
    }

// ************************* Muestro los datos de la API utilizando una grilla. ************************* 

function grilla(){
// Llamada a la API, luego le entrego sus datos a la funcion que crea la grilla.
fetch('https://digimon-api.vercel.app/api/digimon')
    .then(response => response.json())
    .then(resp => {
        crearGrilla(resp);
    });
// Accedo al div con id "digiData" y le doy las clases bootstrap que necesito, reemplazo el contenido HTML con un spinner para indicarle al usuario que los datos estan cargando.
    contenido = document.getElementById("digiData");
    digiData.className=("row mx-auto text-center");
    contenido.innerHTML = `
    <div class="text-center">
        <div class="spinner-grow loading" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    `;

// Cuando los datos estan listos, elimino el spinner y agrego el nuevo contenido HTML en el <div> con id "digiData" utilizando los datos de la API.
// El nuevo <div> con id "capturarModal" contiene atributos "data" personalizados que seran utilizados para desplegar los datos del Digimon seleccionado
// de forma individual en pantalla utilizando un modal de bootstrap cuando el usuario haga click en el.
function crearGrilla(resp){
    contenido.innerHTML = "";
    for(digimon of resp){
        contenido.innerHTML +=
        `  
        <div class="col-6 col-sm-4 col-md-3 col-lg-2 col-xl-2 col-xxl-2">
            <div class="card cardH my-2 bg-white border border-2 border-secondary" id="capturaModal" data-imagen="${digimon.img}" data-nombre="Nombre: ${digimon.name}" data-nivel="Nivel: ${digimon.level}" onclick="datosModal(this);">
                <div class="card-body">
                        <img src="${digimon.img}" class="card-img-top img-thumbnail">
                    <h5 class="card-title">${digimon.name}</h5>
                    <p class="card-text">Nivel: ${digimon.level}</p>
                </div>
            </div>
        </div>
        ` 
    }
};
}

// ************************* Muestro los datos de la API utilizando un selector ************************* 

function select() {
// Llamada a la API, creo un arreglo digimonData con los datos devueltos para mas adelante poder usar el metodo find en el 
// y luego le entrego los datos de la API a la funcion que agrega opciones en el selector.
    fetch('https://digimon-api.vercel.app/api/digimon')
    .then(response => response.json())
    .then(resp => {
        digimonData = resp;
        crearSelector(resp);
    });

// Accedo al div con id "digiData" y le quito las clases bootstrap ya que no las necesito, luego reemplazo
// el contenido HTML con un selector que contiene solo la primer opcion
    contenido = document.getElementById("digiData");
    digiData.className = ("");
    contenido.innerHTML =
    `
    <select id="selectorDigimon" class="card text-center mx-auto border border-2 border-secondary selectW">
        <option>Selecciona un Digimon</option>
    </select>
    <br>
    <div id="digiData2">
    </div>
    `;

// Funcion para rellenar el selector con los nombres de los Digimon, por claridad le di su propia variable let en lugar de utilizar las variables globales.
function crearSelector(resp) {
    listaDigimon = document.getElementById('selectorDigimon');
    for (digimon of resp) {
        let option = document.createElement('option');
        option.text = digimon.name;
        listaDigimon.appendChild(option);
    }
}

// Evento para llamar a la funcion que muestra los datos de los Digimon.
selector = document.getElementById('selectorDigimon');
selector.addEventListener('change', mostrarDigiData);
}

// Funcion que muestra los datos de los Digimon en pantalla, a diferencia de la tabla y la grilla aqui no utilizo el modal.
// Creo que es mas comodo de esta forma para el usuario al utilizar un selector.
function mostrarDigiData() {
    listaDigimon = selector.value;
    digivice = document.getElementById('digiData2');
    digimon = digimonData.find(d => d.name === listaDigimon);
    digivice.innerHTML = `
    <div class="card text-center mx-auto border border-2 border-secondary selectW">
        <img class="card-img-top" src=${digimon.img}>
        <div class="card-body">
            <h5>${digimon.name}</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Nivel: ${digimon.level}</li>            
        </ul>
    </div>        
    `;
}

// ************************* Funcion que genera los datos a mostrar en el modal y luego lo despliega en pantalla. ************************* 

function datosModal(modal) {
// Utilizo el metodo querySelector para acceder a los atributos "data" personalizados que agregue en las eqtiquetas HTML que llaman al modal.
    document.querySelector('#capturaModal');
// // Accedo al <div> con id "divModal" y reemplazo su contenido HTML.
    digiModal = document.getElementById("divModal");
    digiModal.innerHTML = `
    <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">${modal.dataset.nombre}</h1>
    </div>
    <div class="modal-body mx-auto">
        <img src="${modal.dataset.imagen}" class="img-fluid rounded-start">
    </div>
    <div class="modal-footer">
    <h1 class="text-start fs-5">${modal.dataset.nivel}</h1>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
    </div>
    `;
// Desplegar el modal con los datos generados anteriormente
    mostrarModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    mostrarModal.show();
}