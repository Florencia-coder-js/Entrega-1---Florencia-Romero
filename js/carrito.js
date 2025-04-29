let cartStorage = localStorage.getItem("cartTelefonos")
cartStorage = JSON.parse(cartStorage) || [] 

let cartContainer = document.getElementById("cart-section")

function renderCarrito(cartItems) {
    cartContainer.innerHTML = "" 
    
    if (cartItems.length === 0) {
        const mensajeError = document.createElement("p")
        mensajeError.textContent = "El carrito está vacío."
        cartContainer.appendChild(mensajeError)
        return
    }
    cartItems.forEach(telefono => {
        const cartItem = document.createElement("div")
        cartItem.classList.add("cart-item")
        cartItem.innerHTML = `
            <div>
                <h3>${telefono.nombreModelo}</h3>
                <p>${telefono.gb}GB</p>
                <p>Batería: ${telefono.bateria}%</p>
                <p>Precio: $${telefono.precio}</p>
            </div>
            <div>
                <button class="boton-suma-resta" id="restar-${telefono.id}">-</button>
                <span>${telefono.unidades}</span>
                <button class="boton-suma-resta" id="sumar-${telefono.id}">+</button>
                <button class="boton-borrar" id="borrar-${telefono.id}">Eliminar</button>
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
}

function updateCart() {
    localStorage.setItem("cartTelefonos", JSON.stringify(cartStorage)) 
    renderCarrito(cartStorage)
}

renderCarrito(cartStorage)
