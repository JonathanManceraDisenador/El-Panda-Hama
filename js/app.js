import {USER} from '../js/USER.js'
import { hammas } from './DB.js';
import { agregarAlCarrito, limpiarTablaCarrito } from './sesionManager.js';
//variables

var contenedorPistas = document.querySelector('.contenedor-pistas')
var btnPistas = document.querySelector('.btn-pistas')

var flechasCarrusel = document.querySelectorAll('a[href="#principal-carousel"]');


const topVendidos = document.querySelector('#topVendidos')
const listadoCategorias = document.querySelector('#listadoCategorias')
const listadoHammas = document.querySelector('#coleccionHammas')
const compaginacionHammas = document.querySelector('#compaginacionHammas')
const selectCategorias = document.querySelector('#categorias')

let listaTop = []

var categorias = ["anime","videojuegos","pokemon","animales","chico","grande","mediano"]

var paginaActual = 1
var coleccionCards = []
const cardsVista = 12



//eventListeners 

btnPistas.addEventListener("click", e => {
    e.preventDefault()
    abrirContenedor(contenedorPistas)
})



//funciones


listaTop = hammas.filter(hamma => hamma.top).slice(0,5)

    document.addEventListener('DOMContentLoaded', () => {


        function bienvenida(){
            var fondo = document.createElement('div')
            fondo.classList.add('fondo')

            var modulo = document.createElement('div')
            modulo.classList.add('modulo')
            modulo.innerHTML = 
            `
            <span class="cerrarModal">X</span>
            <p class="titulo">Bienvenido a la experiencia Panda Hama</p>
            <p>Gracias por participar en la experiencia Panda Hama. Es muy sencillo, cumple estos 3 requisitos:</p>
            <ul>
                <li>Inicia sesión</li>
                <li>Agrega 3 hamas en el carrito</li>
                <li>"Compralos"(no te preocupes, no hay proceso de pago)</li>
            </ul>
            <p>Una vez realizadas estas 3 tareas, puedes explorar el resto de la pagina a tu gusto.</p>
            <p>¡Suerte y muchas Gracias!</p>
            <p>Pd: Si quieres recordar los objetivos, da clic en el botón "?"</p>
            
            `

            var btnCerrar = modulo.querySelector('.cerrarModal')

            btnCerrar.addEventListener('click', e => {
                e.currentTarget.parentNode.parentNode.remove()
            })



            fondo.appendChild(modulo)
            document.body.appendChild(fondo)
        }

        function limpiarSecciones(){
            limpiar(topVendidos)
            limpiar(listadoCategorias)
            limpiar(listadoHammas)
            limpiarSelector()
        }

        function armarCategorias(){
           var categorias = hammas.flatMap(objeto => objeto.tags)
           return [...new Set(categorias)]
        }

        function limpiarSelector(){
            var i, L = selectCategorias.options.length - 1;

            for(i = L; i >= 0; i--) {
                selectCategorias.remove(i);
            }
        }

        function imprimirCategorias(){
            var liTodos = document.createElement("li")
            liTodos.innerHTML = `<a href=#>Todos</a>`
            listadoCategorias.appendChild(liTodos)

            var optionTodos = document.createElement("option")
            optionTodos.textContent = "Todos"
            optionTodos.setAttribute("value","all")
            optionTodos.setAttribute("selected","selected")
            selectCategorias.appendChild(optionTodos)


            var cateogrias = armarCategorias()
            cateogrias.forEach(catego => {
                var li = document.createElement("li")
                li.innerHTML = `<a href=#>${catego}</a>`
                listadoCategorias.appendChild(li)

                var option = document.createElement("option")
                option.textContent = catego
                option.setAttribute("value",catego)
                selectCategorias.appendChild(option)
            })
        }

       if(USER !== "true") bienvenida()
        limpiarSecciones()

        imprimirTop()
        imprimirCategorias()
        armarCards()
        compaginador(coleccionCards)
        imprimirHammas(coleccionCards)

        limpiarTablaCarrito(true)
    })


    function limpiar(ref){
        ref.innerHTML = ' '
    }

    function imprimirTop(){
        listaTop.forEach((hamma,index) => {
            const card = document.createElement('div')
            card.classList.add("col-6","col-sm-4","col-lg-2", "producto",)
            const foto = document.createElement('div')
            foto.classList.add("foto")
            const img= document.createElement('img')
       
            img.setAttribute('src', hamma.imagen)

            const nombre = document.createElement('div')
            nombre.classList.add("nombre")
            const pNombre = document.createElement('p')
            pNombre.textContent = hamma.nombre

            const tamano = document.createElement('div')
            tamano.classList.add("tamano")
            const pTamano = document.createElement('p')
            pTamano.textContent = hamma.tamano

            const precio = document.createElement('div')
            precio.classList.add("precio")
            const pPrecio = document.createElement('p')
            pPrecio.textContent = '$' + hamma.precio

            const boton = document.createElement('div')
            boton.classList.add('boton')
            const buttonCarrito = document.createElement('button')
            buttonCarrito.classList.add('btn-naranja')
            buttonCarrito.setAttribute('type', 'button')
            buttonCarrito.setAttribute('data-id', hamma.id)
            buttonCarrito.addEventListener("click", (e) => {
                e.preventDefault
                agregarAlCarrito(e)
            })
            buttonCarrito.textContent = "Agregar a carrito"


                if(listaTop.length > 2){
                    switch(index){
                        case 2: 
                            if(listaTop.length === 3 ) card.classList.add( "last",)
                        break
                        case 3:
                            if(listaTop.length > 3 )card.classList.add("penultimo",)
                        break 
                        case 4: 
                            card.classList.add("last",)
                        break
                    }
                }


            card.appendChild(foto)
            foto.appendChild(img)
            card.appendChild(nombre)
            nombre.appendChild(pNombre)
            card.appendChild(tamano)
            tamano.appendChild(pTamano)
            card.appendChild(precio)
            precio.appendChild(pPrecio)
            card.appendChild(boton)
            boton.appendChild(buttonCarrito)
  
    

            topVendidos.appendChild(card)
        })
    }



      function armarCards(){
        hammas.forEach(hamma => {
            if(hamma.top === false ){
                const card = document.createElement('div')
                card.classList.add("col-6","col-sm-4","col-lg-4", "producto",)
                const foto = document.createElement('div')
                foto.classList.add("foto")
                const img= document.createElement('img')
                img.setAttribute('src', hamma.imagen)

                const nombre = document.createElement('div')
                nombre.classList.add("nombre")
                const pNombre = document.createElement('p')
                pNombre.textContent = hamma.nombre

                const tamano = document.createElement('div')
                tamano.classList.add("tamano")
                const pTamano = document.createElement('p')
                pTamano.textContent = hamma.tamano

                const precio = document.createElement('div')
                precio.classList.add("precio")
                const pPrecio = document.createElement('p')
                pPrecio.textContent = '$' + hamma.precio

                const catego = document.createElement('div')
                catego.classList.add("catego")


                hamma.tags.forEach((tag,index)=> {
                    if(index < 2){
                        const aTag = document.createElement('a')
                        aTag.textContent= "#"+tag 
                        aTag.setAttribute("href","#")
                        catego.appendChild(aTag)
                    }
                })

                const boton = document.createElement('div')
                boton.classList.add('boton')
                const buttonCarrito = document.createElement('button')
                buttonCarrito.classList.add('btn-naranja')
                buttonCarrito.setAttribute('type', 'button')
                buttonCarrito.setAttribute('data-id', hamma.id)
                buttonCarrito.addEventListener("click", (e) => {
                    e.preventDefault
                    agregarAlCarrito(e)
                })
                buttonCarrito.textContent = "Agregar a Carrito"


                card.appendChild(foto)
                foto.appendChild(img)
                card.appendChild(nombre)
                nombre.appendChild(pNombre)
                card.appendChild(tamano)
                tamano.appendChild(pTamano)
                card.appendChild(precio)
                precio.appendChild(pPrecio)
                card.appendChild(catego)
                card.appendChild(boton)
                boton.appendChild(buttonCarrito)

                coleccionCards.push(card)
            }
        })
        
    }


function compaginador(coleccionCards){
    var numeroPaginas = Math.ceil(coleccionCards.length/cardsVista)
    
    for(let i=1; i<=numeroPaginas; i++){
        var div = document.createElement('div')
        div.textContent = i 
        div.setAttribute('data-page',i)
        div.addEventListener("click",e => {
            e.preventDefault()
            handlerContenido(e)
        })
        compaginacionHammas.appendChild(div)
    }
}


function imprimirHammas(coleccion){
    var minimo = (paginaActual*cardsVista)-cardsVista
    var maximo = paginaActual*cardsVista-1
    coleccion.forEach((card,index)=>{
        if(index <= maximo && index >= minimo ){
            listadoHammas.append(card)
        }
    })
}

function handlerContenido(e){
    if(e.currentTarget.dataset.page !== paginaActual){
        paginaActual = e.currentTarget.dataset.page
        limpiar(listadoHammas)
        imprimirHammas(coleccionCards)
    }

}


flechasCarrusel.forEach(flecha => {
    flecha.addEventListener("click", e => {
        e.preventDefault()
        var offset = e.currentTarget.dataset.slide === "next" ? 1 : -1
      
        var slides = flecha.closest('.carrusel').querySelector('.carousel-inner') 
        var active = slides.querySelector('.active')
        let newIndex = [...slides.children].indexOf(active) + offset
        if(newIndex === -1 ) newIndex = slides.children.length - 1
        if(newIndex >= slides.children.length) newIndex = 0
     
        active.classList.remove('active')
        slides.children[newIndex].classList.add('active')

    })
})


function abrirContenedor(contenedor){
   contenedor.classList.toggle('active')
}