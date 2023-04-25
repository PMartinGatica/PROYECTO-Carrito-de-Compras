const carrito = document.querySelector("#carrito");
const listaCursos = document.querySelector("#lista-cursos");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas un curso presionando " Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso)
}

//Funciones

function agregarCurso(e){
    e.preventDefault();
    if((e.target.classList.contains('agregar-carrito'))){
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado);
    }
}

//Leer el contenido del HTML que le dimos click y extrae la informacion del curso

function leerDatosCurso(curso){
    // console.log(curso)

    //Crear obejeto con informacion del curso actual
    const infoCurso ={
        imagen: curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        descuento:curso.querySelector('.precio span').textContent,
        id:curso.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }

    // console.log(infoCurso)
    //agrega elemento al array de carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
    console.log(articulosCarrito);
    carritoHTML();
}

//Muestra el carrito de compra en el HTML

function carritoHTML(){
    //Limpiar HTML
    limpiarHTML();
    articulosCarrito.forEach((curso)=>{
        const row =document.createElement('tr');
        row.innerHTML = `<td>
         ${curso.titulo}
         </td>`;
         
         //agrega contenedor carrito en el Tbody
         contenedorCarrito.appendChild(row)
    })
}

function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}