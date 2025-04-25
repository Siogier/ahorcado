let palabras = [
    "manzana", "elefante", "murcielago", "carro", "pelota",
    "computadora", "jirafa", "camioneta", "zapato", "ventana",
    "cascada", "reloj", "luna", "estrella", "planeta",
    "cueva", "montaña", "playa", "bosque", "libro",
    "pintura", "avioneta", "dragón", "espada", "castillo",
    "fantasma", "escuela", "sombrero", "pescado", "helado"
  ];

function random() {
    return Math.floor(Math.random() * palabras.length)
}

function escogerPalabra(numero) {
    let palabra = palabras[numero + 1]
    palabra = palabra.split('')
    mostrarGuiones(palabra)
    return palabra;
}

let cadenaGuiones

function mostrarGuiones(palabra) {
    const palabraDom = document.getElementById("palabra")
    let guiones = ""

    for (let i = 0; i < palabra.length; i++) {
        guiones += "_ "
    }
    cadenaGuiones = guiones.split(" ")
    cadenaGuiones.pop()
    palabraDom.textContent = guiones
}

function buscarLetra() {
    let coincidencias = 0
    let letraRepetida = false
    posicionLetra = []

    if (letrasUsadas.includes(letra)) {
        letraRepetida = true
    }

    if (letraRepetida == false) {

        for (let i = 0; i < palabra.length; i++) {
    
            if (palabra[i] == letra) {
                posicionLetra.push(i)
                coincidencias++
            }   
        }
        resultado(coincidencias)
    }
}

function letrasUsadaFunc() {
    const letrasUsadasDiv = document.getElementById("letrasUsadas")
    if (!letrasUsadas.includes(letra)) {
        letrasUsadas.push(letra)
    } else {
        alert("Ya has usado esa letra")
    }

    letrasUsadasDiv.innerHTML = "<Strong>Letras que has usado: </Strong>" + letrasUsadas.join(", ")
}

function resultado(coincidencias) {
    if (coincidencias == 0) {
        error()
    } else {
        sustituirLetra(posicionLetra, letra)
    }
}


function sustituirLetra() {
    const palabraDom = document.getElementById("palabra")

    for (let i = 0; i < cadenaGuiones.length; i++) {
        for (let j = 0; j < posicionLetra.length; j++) {
            if (i == posicionLetra[j]) {
                cadenaGuiones[i] = (letra + " ")
            }
        }
    }

    palabraDom.textContent = cadenaGuiones.join(" ")

    if (!cadenaGuiones.includes("_")) {
        setTimeout(() => {
            victoria()
        }, 100);
    }
}

function error() {
    contador++
    const imagen = document.getElementById("imagen-contenedor")
    const intentos = document.getElementById("intentos")

    if (contador == 1) {
        imagen.innerHTML = "<img id='imagen' src='imagenes/ahorcado_1.png'>"
        intentos.innerHTML = "Intentos restantes: 5"
    }
    if (contador == 2) {
        imagen.innerHTML = "<img id='imagen' src='imagenes/ahorcado_2.png'>"
        intentos.innerHTML = "Intentos restantes: 4"
    }

    if (contador == 3) {
        imagen.innerHTML = "<img id='imagen' src='imagenes/ahorcado_3.png'>"
        intentos.innerHTML = "Intentos restantes: 3"
    }

    if (contador == 4) {
        imagen.innerHTML = "<img id='imagen' src='imagenes/ahorcado_4.png'>"
        intentos.innerHTML = "Intentos restantes: 2"
    }

    if (contador == 5) {
        imagen.innerHTML = "<img id='imagen' src='imagenes/ahorcado_5.png'>"
        intentos.innerHTML = "Intentos restantes: 1"
    }

    if (contador == 6) {
        imagen.innerHTML = "<img id='imagen' src='imagenes/ahorcado_6.png'>"
        intentos.innerHTML = "Intentos restantes: 0"
    }

    if (contador >= 6) {
        setTimeout(() => {
            derrota()
        }, 100);
    }

}

function victoria() {
    alert("Ganaste")
    location.reload()
}

function derrota() {
    alert("Perdiste")
    location.reload()
}

let contador = 0
let numero = random()
let palabra = escogerPalabra(numero)
let posicionLetra = []
let input = document.getElementById("escribir-letra")
let boton = document.getElementById("boton")
let letra
let letrasUsadas = []

boton.addEventListener("click", function() {
    letra = input.value.toLowerCase()
    if (!/^[a-zA-Z]$/.test(letra)) {
        alert("Ese valor no es válido.")
        input.value = ""
        return
    }
    buscarLetra(palabra, letra)
    letrasUsadaFunc(letra)
    input.value = ('')
})