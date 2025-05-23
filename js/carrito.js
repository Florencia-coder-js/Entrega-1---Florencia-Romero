let cartStorage = localStorage.getItem("cartTelefonos")
cartStorage = JSON.parse(cartStorage) || []

let cartContainer = document.getElementById("cart-section")

function renderCarrito(cartItems) {
    cartContainer.innerHTML = ""
    if (cartItems.length === 0) {
        const mensajeError = document.createElement("p")
        mensajeError.classList.add("mensaje-vacio")
        mensajeError.textContent = "El carrito está vacío."
        cartContainer.appendChild(mensajeError)
        return
    }
    cartItems.forEach(telefono => {
        const cartItem = document.createElement("div")
        cartItem.innerHTML = `
            <div class="cart-item">
                <img src="${telefono.image || 'img/default.png'}" alt="${telefono.nombreModelo}" class="product-image">
  
                <div class="product-info">
                    <h3>${telefono.nombreModelo}</h3>
                    <p>${telefono.gb ? `<p> ${telefono.gb}GB</p>` : "-"}</p>
                    <p> ${telefono.bateria ? `<p>Batería: ${telefono.bateria}%</p>` : "-"}</p>
                </div>
  
                <div class="acciones-carrito">
                    <button class="boton-suma-resta" id="restar-${telefono.id}">
                    <span class="material-icons">remove</span>
                    </button>
                    <span class="unidades">${telefono.unidades}</span>
                    <button class="boton-suma-resta" id="sumar-${telefono.id}">
                    <span class="material-icons">add</span>
                    </button>
                    <button class="boton-borrar" id="borrar-${telefono.id}">
                    <span class="material-icons">delete</span>
                    </button>
                </div>
                  <div class="product-info">
                    <p class="precio"> $${telefono.precio.toLocaleString()}</p>
                </div>
            </div>

        `
        cartContainer.appendChild(cartItem)

        document.getElementById(`sumar-${telefono.id}`).onclick = () => {
            telefono.unidades++
            updateCart()
        }
        document.getElementById(`restar-${telefono.id}`).onclick = () => {
            if (telefono.unidades > 1) {
                telefono.unidades--
                updateCart()
            }
        }
        document.getElementById(`borrar-${telefono.id}`).onclick = () => {
            cartStorage = cartStorage.filter(item => item.id !== telefono.id)
            updateCart()
        }
    })
    if (cartItems.length > 0) {
        const vaciarContainer = document.createElement("div")
        vaciarContainer.classList.add("vaciar-container")

        const botonVaciar = document.createElement("button")
        botonVaciar.id = "vaciar-carrito"
        botonVaciar.textContent = "Vaciar carrito"
        botonVaciar.onclick = () => {
            cartStorage = []
            updateCart()
        }

        vaciarContainer.appendChild(botonVaciar)
        cartContainer.appendChild(vaciarContainer)
    }
}

function renderResumen() {
    let resumenContainer = document.getElementById("resumen-container")
    resumenContainer.innerHTML = ""

    if (cartStorage.length === 0) {
        resumenContainer.innerHTML = `
        <p><strong>Resumen de compra</strong></p>
            <hr> 
        <p class='mensaje-vacio'>No hay productos en el carrito.</p>`
        return
    }

    const subtotal = cartStorage.reduce((total, tel) => total + tel.precio * tel.unidades, 0)
    const envio = subtotal > 500000 ? 0 : 5000
    const total = subtotal + envio

    resumenContainer.innerHTML = `
        <div class="resumen-box">
            <p><strong>Resumen de compra</strong></p>
            <hr>

            <p>Subtotal: <strong>$${subtotal.toLocaleString()}</strong></p>
            <p>Envío: <strong>$${envio.toLocaleString()}</strong><br><p>(Si la compra es mayor a $500.000, envío gratis!)</p></p>
            <p>Total: <strong>$${total.toLocaleString()}</strong></p>
            <button id="confirmar-compra">Iniciar compra</button>
        </div>
    `

    document.getElementById("confirmar-compra").onclick = () => {
        window.location.href = "checkout.html"
    }
}



function updateCart() {
    localStorage.setItem("cartTelefonos", JSON.stringify(cartStorage))
    renderCarrito(cartStorage)
    renderResumen(cartStorage)

}

renderResumen(cartStorage)
renderCarrito(cartStorage)

