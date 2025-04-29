const telefonos = [
    {
        id: 1,
        nombreModelo: "iPhone 11",
        gb: 64,
        bateria: 100,
        precio: 300
    }, 
    {
        id: 2,
        nombreModelo: "iPhone 14 pro",
        gb: 128,
        bateria: 86,
        precio: 599
    },
    {
        id: 3,
        nombreModelo: "iPhone 15 pro",
        gb: 128,
        bateria: 90,
        precio: 770
    },
    {
        id: 4,
        nombreModelo: "iPhone 15 pro max",
        gb: 256,
        bateria: 96,
        precio: 860
    },
]
let telefonosContainer = document.getElementById("telefonos-container")
let cartTelefonos = JSON.parse(localStorage.getItem("cartTelefonos")) || []

function renderTelefonos(telefonosArray) {
    telefonosArray.forEach(telefono => {
        const card = document.createElement("div")
        card.classList.add("telefono-card")
        card.innerHTML = `
            <h3>${telefono.nombreModelo}</h3>
            <p>${telefono.gb}GB</p>
            <p>${telefono.bateria}% batería</p>
            <p>$${telefono.precio}</p>
            <button class="telefonoAgregar" id="${telefono.id}">Agregar al carrito</button>
        `
        telefonosContainer.appendChild(card)
    })
    addToCartButton()
}

function addToCartButton() {
    const addButton = document.querySelectorAll(".telefonoAgregar")
    addButton.forEach(button => {
        button.onclick = (e) => {
            const telefonoId = e.currentTarget.id
            const selectedTelefono = telefonos.find(telefono => telefono.id == telefonoId)

            const existingPhone = cartTelefonos.find(item => item.id === selectedTelefono.id)
            if (existingPhone) {
                existingPhone.unidades += 1 
            } else {
                selectedTelefono.unidades = 1
                cartTelefonos.push(selectedTelefono)
            }

            localStorage.setItem("cartTelefonos", JSON.stringify(cartTelefonos)) 

            updateCartCount()
        }
    })
}

function updateCartCount() {
    const cartCount = document.getElementById("cart-count")
    const totalItems = cartTelefonos.reduce((total, telefono) => total + telefono.unidades, 0) 
    cartCount.textContent = totalItems
}


updateCartCount()

renderTelefonos(telefonos)