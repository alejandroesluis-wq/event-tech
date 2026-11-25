// Lista de los 10 productos
const productos = [
    {
        id: 1,
        nombre: "Cabeza móvil LED Beam 20 W",
        descripcion: "Equipo de iluminación con movimiento para eventos y discotecas.",
        precio: 210000,
        imagen: "img/productos/producto 1-1.jpeg"
    },
    {
        id: 2,
        nombre: "Luz estroboscópica LED RGB 60 W",
        descripcion: "Luz de efectos estroboscópicos para espectáculos y fiestas.",
        precio: 240000,
        imagen: "img/productos/producto 2-1.jpeg"
    },
    {
        id: 3,
        nombre: "Cabeza móvil Beam 90 W",
        descripcion: "Cabeza móvil de iluminación para escenarios y eventos.",
        precio: 400000,
        imagen: "img/productos/producto 3-1.jpeg"
    },
    {
        id: 4,
        nombre: "Luz DJ multiefectos RGBW 4 en 1",
        descripcion: "Equipo de iluminación con diferentes efectos para DJs.",
        precio: 550000,
        imagen: "img/productos/producto 4-1.jpeg"
    },
    {
        id: 5,
        nombre: "Luz DJ Bee Eye de 6 brazos, 150 W",
        descripcion: "Luz de efectos con seis brazos para espectáculos.",
        precio: 520000,
        imagen: "img/productos/producto 5-1.jpeg"
    },
    {
        id: 6,
        nombre: "Máquina de humo LURT SM-500 de 500 W",
        descripcion: "Máquina para generar efectos de humo en eventos.",
        precio: 180000,
        imagen: "img/productos/producto 6-1.jpeg"
    },
    {
        id: 7,
        nombre: "Controlador DMX512 de 192 canales",
        descripcion: "Consola para controlar equipos de iluminación profesional.",
        precio: 200000,
        imagen: "img/productos/producto 7-1.jpeg"
    },
    {
        id: 8,
        nombre: "Cabeza móvil LED Wash 50 W",
        descripcion: "Iluminación LED de efecto wash para escenarios.",
        precio: 250000,
        imagen: "img/productos/producto 8-1.jpeg"
    },
    {
        id: 9,
        nombre: "Cabeza móvil LED Beam 60 W con halo",
        descripcion: "Equipo de iluminación móvil con efecto de halo.",
        precio: 350000,
        imagen: "img/productos/producto 9-1.jpeg"
    },
    {
        id: 10,
        nombre: "Barra de iluminación LED de 9 luces",
        descripcion: "Barra de luces LED para ambientación y espectáculos.",
        precio: 280000,
        imagen: "img/productos/producto 10-1.jpeg"
    }
]

// Recupera lo que quedó guardado en el carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || []

// Cada producto comienza con la primera foto
let fotosActuales = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
let temporizadorAviso

// Guarda el carrito
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

// Muestra los productos en la página
function mostrarProductos() {
    let catalogo = document.getElementById("catalogo")
    catalogo.innerHTML = ""
    let i = 0

    while (i < productos.length) {
        catalogo.innerHTML += `
            <div class="producto">
                <img id="imagen-${productos[i].id}" src="${productos[i].imagen}" alt="${productos[i].nombre}">
                <div class="controles-fotos">
                    <button type="button" onclick="cambiarFoto(${productos[i].id}, -1)" aria-label="Fotografía anterior">&#10094;</button>
                    <button type="button" onclick="cambiarFoto(${productos[i].id}, 1)" aria-label="Fotografía siguiente">&#10095;</button>
                </div>
                <h3>${productos[i].nombre}</h3>
                <p>${productos[i].descripcion}</p>
                <p class="precio">$${productos[i].precio.toLocaleString("es-CO")}</p>
                <button type="button" onclick="agregarCarrito(${productos[i].id})">Agregar al carrito</button>
            </div>
        `
        i++
    }
}

// Cambia la foto de un producto
function cambiarFoto(id, cambio) {
    let posicion = id - 1
    fotosActuales[posicion] = fotosActuales[posicion] + cambio

    if (fotosActuales[posicion] > 3) {
        fotosActuales[posicion] = 1
    }
    if (fotosActuales[posicion] < 1) {
        fotosActuales[posicion] = 3
    }

    let ruta = "img/productos/producto " + id + "-" + fotosActuales[posicion] + ".jpeg"
    document.getElementById("imagen-" + id).src = ruta
}

// Agrega el producto o suma otra unidad
function agregarCarrito(id) {
    let i = 0
    let encontrado = false
    let nombreAgregado = ""

    while (i < carrito.length) {
        if (carrito[i].id == id) {
            carrito[i].cantidad++
            encontrado = true
            nombreAgregado = carrito[i].nombre
        }
        i++
    }

    if (encontrado == false) {
        let j = 0
        while (j < productos.length) {
            if (productos[j].id == id) {
                carrito.push({
                    id: productos[j].id,
                    nombre: productos[j].nombre,
                    precio: productos[j].precio,
                    cantidad: 1
                })
                nombreAgregado = productos[j].nombre
            }
            j++
        }
    }

    mostrarCarrito()
    mostrarAviso(nombreAgregado)
}

// Muestra un aviso al agregar algo
function mostrarAviso(nombre) {
    let aviso = document.getElementById("aviso-carrito")
    aviso.textContent = "✓ Agregado al carrito: " + nombre
    aviso.classList.add("mostrar")

    clearTimeout(temporizadorAviso)
    temporizadorAviso = setTimeout(ocultarAviso, 2200)
}

// Quita el aviso después de un momento
function ocultarAviso() {
    document.getElementById("aviso-carrito").classList.remove("mostrar")
}

// Muestra lo que hay en el carrito
function mostrarCarrito() {
    let lista = document.getElementById("lista-carrito")
    lista.innerHTML = ""
    let i = 0

    if (carrito.length == 0) {
        lista.innerHTML = "<p>Tu carrito está vacío.</p>"
    }

    while (i < carrito.length) {
        let subtotalProducto = carrito[i].precio * carrito[i].cantidad

        lista.innerHTML += `
            <div class="item-carrito">
                <h3>${carrito[i].nombre}</h3>
                <p>Precio: $${carrito[i].precio.toLocaleString("es-CO")}</p>
                <p>Cantidad: ${carrito[i].cantidad}</p>
                <button type="button" onclick="cambiarCantidad(${carrito[i].id}, 1)">+</button>
                <button type="button" onclick="cambiarCantidad(${carrito[i].id}, -1)">−</button>
                <p>Subtotal: $${subtotalProducto.toLocaleString("es-CO")}</p>
                <button type="button" onclick="eliminarProducto(${carrito[i].id})">Eliminar</button>
            </div>
        `
        i++
    }

    calcularTotal()
    guardarCarrito()
}

// Suma o resta la cantidad
function cambiarCantidad(id, cambio) {
    let i = 0

    while (i < carrito.length) {
        if (carrito[i].id == id) {
            carrito[i].cantidad = carrito[i].cantidad + cambio
            if (carrito[i].cantidad < 1) {
                carrito[i].cantidad = 1
            }
        }
        i++
    }
    mostrarCarrito()
}

// Quita el producto seleccionado
function eliminarProducto(id) {
    let i = 0
    while (i < carrito.length) {
        if (carrito[i].id == id) {
            carrito.splice(i, 1)
        } else {
            i++
        }
    }
    mostrarCarrito()
}

// Vacía el carrito
function vaciarCarrito() {
    carrito = []
    mostrarCarrito()
}

// Hace las cuentas del carrito
function calcularTotal() {
    let subtotal = 0
    let unidades = 0
    let envio = 0
    let total = 0
    let i = 0

    while (i < carrito.length) {
        subtotal = subtotal + (carrito[i].precio * carrito[i].cantidad)
        unidades = unidades + carrito[i].cantidad
        i++
    }

    if (carrito.length > 0) {
        envio = 15000
    }
    total = subtotal + envio

    document.getElementById("total-unidades").textContent = unidades
    document.getElementById("subtotal").textContent = "$" + subtotal.toLocaleString("es-CO")
    document.getElementById("costo-envio").textContent = "$" + envio.toLocaleString("es-CO")
    document.getElementById("total-compra").textContent = "$" + total.toLocaleString("es-CO")
    document.getElementById("contador-carrito").textContent = unidades
    return total
}

// Revisa los datos y confirma el pedido
function finalizarCompra(evento) {
    evento.preventDefault()

    let nombre = document.getElementById("nombre").value.trim()
    let correo = document.getElementById("correo").value.trim()
    let telefono = document.getElementById("telefono").value.trim()
    let direccion = document.getElementById("direccion").value.trim()

    if (nombre == "" || correo == "" || telefono == "" || direccion == "") {
        alert("Por favor, completa todos los campos.")
    } else if (carrito.length == 0) {
        alert("No puedes finalizar la compra porque tu carrito está vacío.")
    } else {
        let total = calcularTotal()
        document.getElementById("confirmacion").textContent =
            "¡Gracias por tu compra, " + nombre + "! Tu pedido en EVENT TECH se ha registrado correctamente. Total de la compra: $" + total.toLocaleString("es-CO")
        alert("¡Compra simulada realizada correctamente!")
        vaciarCarrito()
        document.getElementById("formulario-compra").reset()
    }
}

// Activa los botones y el formulario

document.getElementById("vaciar-carrito").onclick = vaciarCarrito
document.getElementById("formulario-compra").addEventListener("submit", finalizarCompra)
mostrarProductos()
mostrarCarrito()
