

const fecha = document.getElementById('fecha');
const input = document.getElementById('input');
const guardar = document.getElementById('guardar');
const eliminar = document.getElementById('eliminar');
const listado = document.getElementById('listado');

const marcar = 'fa-check-circle';
const desmarcar = 'fa-circle';
const rayar = 'line-through';
const borrar = 'hidden';
let id

let informacion



//Creacion de fecha
const tiempo = new Date();
fecha.innerHTML = tiempo.toLocaleDateString('es-MX', {weekday: 'long', month: 'short', day: 'numeric'});

//Funcion para agregar tarea
function agregarTarea(tarea, id, realizado, eliminado) {

    if (eliminado) {
        return;
    }

    const realix = realizado ? marcar : desmarcar;
    const cruzar = realizado ?  rayar : '';


    const elemento = `<li id="elemento" class="flex space-x-10">
                        <i class="far ${realix}" data="realizado" id="${id}"></i>
                        <p id="textoa" class="texto ${cruzar}">${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                      </li>`;
                      //line-through
    listado.insertAdjacentHTML('beforeend', elemento);
}

//Funcion de tarea realizada
function tareaRealizada(element) {
    element.classList.toggle(marcar);
    element.classList.toggle(desmarcar);
    element.parentNode.querySelector('.texto').classList.toggle(rayar);
    informacion[element.id].realizado = informacion[element.id].realizado ? false : true;
}

//Funcion de tarea eliminada
function tareaEliminada(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    informacion[element.id].eliminado = true;
}



guardar.addEventListener('click', () => {
    const tarea = input.value;
    if (tarea) {
        agregarTarea(tarea, id, false, false)
        informacion.push({
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false
        })
    }
    localStorage.setItem('todo', JSON.stringify(informacion));
    input.value = '';
    id++;
});

document.addEventListener('keyup', function(event) {
    if(event.key == 'Enter') {
        const tarea = input.value;
        if (tarea) {
            agregarTarea(tarea, id, false, false)
            informacion.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false
            })
        }
        localStorage.setItem('todo', JSON.stringify(informacion));
        input.value = '';
        id++;
    }
});


listado.addEventListener('click', function(event) {
    const element = event.target;
    const elementData = element.attributes.data.value;

    if (elementData === 'realizado') {
        tareaRealizada(element);
    } else if (elementData === 'eliminado') {
        tareaEliminada(element);
    }
    localStorage.setItem('todo', JSON.stringify(informacion));
})

//LocalEstore get item
let data = localStorage.getItem('todo');
    if (data) {
        informacion = JSON.parse(data);
        id = informacion.length;
        cargarLista(informacion);
    } else {
        informacion = [];
        id = 0;
    }

function cargarLista(DATA) {
    DATA.forEach(function(i) {
        agregarTarea(i.nombre, i.id, i.realizado, i.eliminado);
    });
}




function eliminarTodo(element) {
    
    while (listado.firstChild) {
        listado.removeChild(listado.firstChild);
        informacion = [];      
    }
    localStorage.setItem('todo', JSON.stringify(informacion));
}

eliminar.addEventListener('click', function(event) {   
        eliminarTodo();
        
    input.value = '';
    localStorage.setItem('todo', JSON.stringify(informacion));
});
