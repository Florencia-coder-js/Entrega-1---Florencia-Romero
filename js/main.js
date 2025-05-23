let telefonosContainer = document.getElementById("telefonos-container")
let cartTelefonos = JSON.parse(localStorage.getItem("cartTelefonos")) || []
let productosData = null

async function cargarTelefonos() {
    try {
        const response = await fetch("productosApple.json")
        const data = await response.json()
        productosData = data[0]

        const todosLosProductos = [
            ...productosData.telefonos,
            ...productosData.macs,
            ...productosData.airpods,
            ...productosData.relojes
        ]

        renderTelefonos(todosLosProductos)
    } catch(error) {
        console.error("Hubo un error al obtener los productos:", error)
        telefonosContainer.innerHTML = `<p>Error al cargar los productos.</p>`
    } finally {
        updateCartCount()
    }
}

function renderTelefonos(telefonosArray) {
    telefonosContainer.innerHTML = ""
    telefonosArray.forEach(telefono => {
        const card = document.createElement("div")
        card.classList.add("telefono-card")
        card.innerHTML = `
            <h3>${telefono.nombreModelo}</h3>
            ${telefono.gb ? `<p>${telefono.gb}GB</p>` : ""}
            ${telefono.bateria ? `<p>${telefono.bateria}% batería</p>` : ""}
            <img src="${telefono.image || 'img/default.png'}" alt="${telefono.nombreModelo}">
            <p>$${telefono.precio.toLocaleString()}</p>
            <button class="telefonoAgregar" id="${telefono.id}">Agregar al carrito</button>
        `
        telefonosContainer.appendChild(card)
    })
    addToCartButton(telefonosArray)
}

function addToCartButton(telefonosArray) {
    const addButton = document.querySelectorAll(".telefonoAgregar")
    addButton.forEach(button => {
        button.onclick = (e) => {
            const telefonoId = e.currentTarget.id
            const selectedTelefono = telefonosArray.find(telefono => telefono.id == telefonoId)

            const existingPhone = cartTelefonos.find(item => item.id === selectedTelefono.id)
            if (existingPhone) {
                existingPhone.unidades += 1
            } else {
                selectedTelefono.unidades = 1
                cartTelefonos.push(selectedTelefono)
            }

            localStorage.setItem("cartTelefonos", JSON.stringify(cartTelefonos))
            updateCartCount()

            const toastContent = document.createElement("div")
            toastContent.innerHTML = `
                <span style="display:block; margin-bottom: 10px;">Producto agregado al carrito!</span>
                <div style="display: flex; gap: 10px;">
                    <button id="irCarrito" class="alert-boton-carrito">Ir al carrito</button>
                    <button id="seguirComprando" class="alert-boton-inicio">Seguir comprando</button>
                </div>
            `

            const toast = Toastify({
                node: toastContent,
                duration: 6000,
                gravity: "center",
                position: "center",
                close: false,
                stopOnFocus: true,
                style: {
                    background: "#fff",
                    borderRadius: "10px",
                    padding: "20px",
                    color: "#777455",
                }
            })

            toast.showToast()

            setTimeout(() => {
                document.getElementById("irCarrito").onclick = () => {
                    window.location.href = "carrito.html"
                }
                document.getElementById("seguirComprando").onclick = () => {
                    toast.hideToast()
                }
            }, 100)
        }
    })
}

function updateCartCount() {
    const cartCount = document.getElementById("cart-count")
    const totalItems = cartTelefonos.reduce((total, telefono) => total + telefono.unidades, 0)
    cartCount.textContent = totalItems
}

document.getElementById("categoriaSelect").addEventListener("change", function () {
    const categoriaSeleccionada = this.value

    if (!productosData) return

    let productosFiltrados = []

    if (categoriaSeleccionada === "todos") {
        productosFiltrados = [
            ...productosData.telefonos,
            ...productosData.macs,
            ...productosData.airpods,
            ...productosData.relojes
        ]
    } else {
        productosFiltrados = productosData[categoriaSeleccionada] || []
    }

    renderTelefonos(productosFiltrados)
})

cargarTelefonos()
