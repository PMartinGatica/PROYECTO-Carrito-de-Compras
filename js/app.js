const carrito = document.querySelector("#carrito");
const listaCursos = document.querySelector("#lista-cursos");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas un curso presionando " Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso)

    //Elimina cursos

    carrito.addEventListener('click',eliminarCurso);

    //Vaciar Carrito

    vaciarCarrito.addEventListener('click',() =>{
        articulosCarrito = [];
        limpiarHTML();
    })


}

//Funciones

function agregarCurso(e){
    e.preventDefault();
    if((e.target.classList.contains('agregar-carrito'))){
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado);
    }
}

//Eliminar curso del carrito

function eliminarCurso(e){
    const eliminar=e.target.classList
    if (eliminar.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Eliminar del arreglo los id

        articulosCarrito = articulosCarrito.filter (curso => curso.id !==cursoId);
        carritoHTML();//Volvemos a iterar sobre el carrito y mostrar el HTML
    }
}

//Leer el contenido del HTML que le dimos click y extrae la informacion del curso

function leerDatosCurso(curso){
    // console.log(curso)

    //Crear obejeto con informacion del curso actual
    const infoCurso ={
        imagen: curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        precio:curso.querySelector('.precio span').textContent,
        id:curso.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }

    //Revisar si el elemento esta en el carrito
    const existe = articulosCarrito.some(curso=> curso.id === infoCurso.id);
    if (existe){
            //Actualizamos cantidad
            const cursos = articulosCarrito.map(curso =>{
               if(curso.id ===infoCurso.id){
                curso.cantidad ++;
                return curso; // retorna el objeto con la cantidad actualizada
               } else{
                return curso; // retorna los que no son duplicados
               }
            });
            articulosCarrito =[...cursos];
    }else{
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    // console.log(infoCurso)
    //agrega elemento al array de carrito
    
    
    carritoHTML();
}

//Muestra el carrito de compra en el HTML

function carritoHTML(){
    //Limpiar HTML
    limpiarHTML();
    articulosCarrito.forEach((curso)=>{
        const {imagen,titulo,precio,cantidad,id} = curso
        const row =document.createElement('tr');
        row.innerHTML = `
        <td><img src="${imagen}" width="100"</td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td><a href ="#" class="borrar-curso" data-id = "${id}"> X </a></td>
        `; 
         //agrega contenedor carrito en el Tbody
         contenedorCarrito.appendChild(row)
    })
}

function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}