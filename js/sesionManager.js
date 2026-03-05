import {USER} from '../js/USER.js'
import { hammas } from './DB.js'


var contenedorPistas = document.querySelector('.contenedor-pistas')
var btnPistas = document.querySelector('.btn-pistas')

var sesionCont = document.querySelector('.textosesion')
var sesion = document.querySelector('.sesion')
var simboloSesion =  document.querySelector('.inicses')
var btnCerrarEsto = document.querySelector('.cerrarEsto')

var carritoCont = document.querySelector('.carrito')
var contadorCarrito = document.querySelector('#contadorCarrito')
var carrito = document.querySelector('#carrito')
var simboloCarrito = document.querySelector('#img-carrito')
var btnCerrarCarrito = document.querySelector('.cerrarCarrito')

var listaCarrito = document.querySelector('.lista-carrito')
var tablaCarrito = document.querySelector('#lista-carrito')
var carritoVacio = document.querySelector('.carrito-vacio')
var filaTotal = document.querySelector('#filaTotal')
var cantidadTotal = document.querySelector('#cantidadTotal')
var compraCarrito = document.querySelector('#comprar-carrito')
var vaciarCarrito = document.querySelector('#vaciar-carrito')

var hamasCarrito = false

var carritoArreglo = []

var sesionCont = document.querySelector('.textosesion')

var inputUsuario = document.querySelector('#usuario')
var inputPassword = document.querySelector('#password')

var btnCerrarSesion = document.querySelector('#cerrar-sesion')
var btnIniciarSesion = document.querySelector('#iniciar-sesion')
var btnRegistrarme = document.querySelector('#registrarme')


var sesionActiva = document.querySelector('#sesionActiva')
var sesionInactiva = document.querySelector('#sesionInactiva')
 handdlerContenidoCarrito()

sesionCont.addEventListener("click", e => {
    e.preventDefault()
    abrirContenedor(sesion)
})

simboloSesion.addEventListener("click", e => {
    e.preventDefault()
    abrirContenedor(sesion)
})


btnCerrarEsto.addEventListener("click", e => {
    e.preventDefault()
    abrirContenedor(sesion)
})

btnCerrarCarrito.addEventListener("click", e => {
    e.preventDefault()
    abrirContenedor(carrito)
})

simboloCarrito.addEventListener("click", e => {
    e.preventDefault()
    abrirContenedor(carrito)
})

contadorCarrito.addEventListener("click", e => {
    e.preventDefault()
    abrirContenedor(carrito)
})

compraCarrito.addEventListener("click", revisionFinal)

vaciarCarrito.addEventListener("click", e => {
    e.preventDefault()
    carritoArreglo = []
    limpiarTablaCarrito(true)
    managerContador()
})



btnCerrarSesion.addEventListener('click', e => {
    localStorage.removeItem("UsuarioHamma");
    window.location.href ="index.html"
})


btnIniciarSesion.addEventListener("click", login)


btnRegistrarme.addEventListener("click", e => {
    window.location.href ="registro.html"
})

if(USER === null){

    if(window.location.href.includes("perfil")){
        window.location.href="index.html"
    }else{
        sesionCont.children[0].remove()
        sesionCont.children[0].textContent = "Iniciar Sesión"
        sesionActiva.remove()
    }

}else{

    if(window.location.href.includes("registro")){
        window.location.href="index.html"
    }else{
        sesionCont.children[0].setAttribute("src",'../img/placeholders/A1.png')
        sesionCont.children[1].textContent = "Usuario"
        sesionInactiva.remove()
    }

}


function login(){
    if(inputUsuario.value === "" || inputPassword.value === ""){
      return
    } else if (inputUsuario.value === "usuario" && inputPassword.value === "contrasena"){ 
      localStorage.setItem("UsuarioHamma", true)
      if(window.location.href.includes("registro")){
        window.location.href="index.html"
      }else{
        window.location.reload()
      }
      
    }
}



function abrirContenedor(contenedor){
   contenedor.classList.toggle('active')
}


export function handdlerContenidoCarrito(){
    console.log(hamasCarrito)
    if(hamasCarrito){
        listaCarrito.classList.remove('hide')
        compraCarrito.classList.remove('hide')
        filaTotal.classList.add('filaTotal')
        filaTotal.classList.remove('hide')
        compraCarrito.classList.add('botoncar')
        vaciarCarrito.classList.remove('hide')

        carritoVacio.classList.add('hide')
    }else{
        listaCarrito.classList.add('hide')
        compraCarrito.classList.add('hide')
        compraCarrito.classList.remove('botoncar')
        filaTotal.classList.remove('filaTotal')
        filaTotal.classList.add('hide')
        vaciarCarrito.classList.add('hide')

        carritoVacio.classList.remove('hide')
    }
}


function quitarEsto(e){
    var elemento = e.currentTarget.parentNode.parentNode.dataset.id
    const indexElemento = carritoArreglo.findIndex(obj => obj.id == elemento);

    if (indexElemento !== -1) {
        carritoArreglo.splice(indexElemento, 1);
    }

    if(carritoArreglo.length === 0){
         limpiarTablaCarrito(true)
    }else{
        imprimirCarrito()
        imprimirTotal()
    }
    managerContador()
}


export function agregarAlCarrito(e){

   console.log(hamasCarrito)
    if(hamasCarrito == false) hamasCarrito = true
   
    handdlerContenidoCarrito()

    var id = e.currentTarget.dataset.id
    var hamma = hammas.find(hamma => hamma.id == id)

    var hammaEnCarrito = carritoArreglo.find(hama => hama.id === hamma.id)

    if (hammaEnCarrito !== undefined){
        hammaEnCarrito.cantidad = hammaEnCarrito.cantidad+1
    }else{
        var enCarrito = {
            id: hamma.id,
            img: hamma.imagen,
            nombre: hamma.nombre,
            precio: promediarPrecio(hamma),
            cantidad: 1,
        }   
        carritoArreglo.push(enCarrito)
    }
   
    imprimirCarrito()
    imprimirTotal()
    managerContador()
}

function promediarPrecio(hamma){

  
    var precioFinal 
    if(hamma.descuento === false){
        precioFinal = hamma.precio
    }else{
        precioFinal = hamma.precio*(descuento/100)
    }
    return precioFinal
}

function imprimirCarrito(){
    limpiarTablaCarrito()

    carritoArreglo.forEach(hamma => {
        var tr = document.createElement("tr")
        tr.setAttribute("data-id",hamma.id)

        var imgTD = document.createElement("td")
        var img = document.createElement("img")
        img.setAttribute("src",hamma.img)
        imgTD.append(img)

        var nombreTD = document.createElement("td")
        nombreTD.textContent = hamma.nombre 

        var precioTD = document.createElement("td")
        precioTD.textContent = "$" + (hamma.precio * hamma.cantidad)

        var cantidadTD = document.createElement("td")
        cantidadTD.textContent = hamma.cantidad 

        var quitarTD = document.createElement("td")
        quitarTD.innerHTML = `<div class="quitar-esto">X</div>`

        quitarTD.children[0].addEventListener("click",quitarEsto)


        tr.appendChild(imgTD)
        tr.appendChild(nombreTD)
        tr.appendChild(precioTD)
        tr.appendChild(cantidadTD)
        tr.appendChild(quitarTD)

 
        tablaCarrito.appendChild(tr)
    })

}

function managerContador(){
     var contadorFinal =  carritoArreglo.reduce((total, producto) => {
        return total + producto.cantidad;
    }, 0);

    contadorFinal > 9 ? contadorCarrito.textContent = "9+" : contadorCarrito.textContent = contadorFinal
}

function imprimirTotal(){
   
    var totalFinal =  carritoArreglo.reduce((total, producto) => {
        return total + (producto.precio * producto.cantidad);
    }, 0);

    cantidadTotal.textContent = "$"+totalFinal
}

function revisionFinal(){

    var sesion 
    var cantidadMinima 

    var contadorFinal =  carritoArreglo.reduce((total, producto) => {
        return total + producto.cantidad;
    }, 0);
    
    if(USER) sesion = true 
    if (contadorFinal >= 3) cantidadMinima = true

    carritoArreglo = []
    localStorage.removeItem("UsuarioHamma");

    var p = document.createElement("P")
    p.classList.add('titulo')

    if (sesion && cantidadMinima){
        p.textContent = "Felicidades, lograste todos los objetivos. ¡Gracias por participar!"
    }else{
        p.textContent = "Parece que algo te falto :C, puedes volverlo a intentar."
    }


    var fondo = document.createElement('div')
    fondo.classList.add('fondo')

    var modulo = document.createElement('div')
    modulo.classList.add('modulo',"modulo-final")
   

    var btnCerrar = document.createElement('span')
    btnCerrar.classList.add('cerrarModal')
    btnCerrar.textContent = "X"

    btnCerrar.addEventListener('click', e => {
        window.location.reload()
    })


    modulo.appendChild(btnCerrar)
    modulo.appendChild(p)
    fondo.appendChild(modulo)
    document.body.appendChild(fondo)
}


export function limpiarTablaCarrito(clave){
    console.log(carritoArreglo)
    for(var i = 1;i<tablaCarrito.rows.length;){
            tablaCarrito.deleteRow(i);
        }
    if (clave){
        hamasCarrito = false
        handdlerContenidoCarrito()
    }
}