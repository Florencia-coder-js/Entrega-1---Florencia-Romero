const resumen = document.getElementById("checkout-resumen")
const pasoUsuario = document.getElementById("paso-usuario")
const pasoEnvio = document.getElementById("paso-envio")
const pasoPago = document.getElementById("paso-pago")
const mensajeFinal = document.getElementById("mensaje-final")
const errorEnvio = document.getElementById("error-envio")

const cart = JSON.parse(localStorage.getItem("cartTelefonos")) || []
const usuario = JSON.parse(localStorage.getItem("usuario"))

function mostrarMensaje(contenedor, texto, tipo = "exito") {
  contenedor.textContent = texto
  contenedor.className = `mensaje ${tipo}`
}

function renderResumen() {
  if (cart.length === 0) {
    resumen.innerHTML = "<p>No hay productos en el carrito.</p>"
    return
  }

  let subtotal = 0
  resumen.innerHTML = "<h3>Mi compra</h3>"

  cart.forEach(item => {
    subtotal += item.precio * item.unidades
    const div = document.createElement("div")
    div.classList.add("producto")
    div.innerHTML = `
      <img src="${item.image || "img/default.png"}" alt="${item.nombreModelo}" />
      <div>
        <p><strong>${item.unidades} x ${item.nombreModelo}</strong></p>
        <p>$${(item.precio).toLocaleString()}</p>
      </div>
    `
    resumen.appendChild(div)
  })

  resumen.innerHTML += `
    <hr>
    <p>Subtotal: <strong>$${subtotal.toLocaleString()}</strong></p>
  `
}
renderResumen()

if (!usuario) {
  pasoUsuario.innerHTML = `
    <h4>1. Datos personales</h4>
    <p>Inicie sesión o cree una cuenta para continuar.</p>
    <a href="datos-personales.html"><button>Ir a datos personales</button></a>
  `
} else {
  pasoUsuario.innerHTML = `
    <h4>1. Datos personales</h4>
    <p>Bienvenido, <strong>${usuario.nombre}</strong> (${usuario.email})</p>
  `
}

pasoEnvio.innerHTML = `
  <h4>2. Envío</h4>
  <label><input type="radio" name="envio" value="retiro" checked> Retiro en oficina (Gratis) <br> <p style="margin-left:px;">
  Calle 142 1301, B1884 Berazategui, Buenos Aires. </p></label><br>
  <label><input type="radio" name="envio" value="domicilio"> Envío a domicilio</label>

  <div id="datos-envio" style="display: none; margin-top:10px;">
    <input type="text" id="direccion" placeholder="Dirección">
    <input type="text" id="ciudad" placeholder="Ciudad">
    <input type="text" id="cp" placeholder="Código postal">
  </div>
`

document.querySelectorAll('input[name="envio"]').forEach(radio => {
  radio.addEventListener('change', () => {
    const datosEnvio = document.getElementById("datos-envio")
    datosEnvio.style.display = radio.value === "domicilio" ? "block" : "none"
  })
})

pasoPago.innerHTML = `
  <h4>3. Pago</h4>
  <label><input type="radio" name="pago" value="efectivo" checked> Efectivo</label><br>
  <label><input type="radio" name="pago" value="tarjeta"> Tarjeta</label>

  <div id="datos-tarjeta" style="display: none; margin-top:10px;">
    <input type="text" id="titular" placeholder="Titular de la tarjeta">
    <input type="text" id="numero" placeholder="Número de tarjeta">
    <input type="text" id="codigo" placeholder="Código de seguridad">
  </div>
`

document.querySelectorAll('input[name="pago"]').forEach(radio => {
  radio.addEventListener('change', () => {
    const datosTarjeta = document.getElementById("datos-tarjeta")
    datosTarjeta.style.display = radio.value === "tarjeta" ? "block" : "none"
  })
})

document.getElementById("finalizar-compra").onclick = () => {
  errorEnvio.textContent = ""
  mensajeFinal.textContent = ""

  if (!usuario) {
    mostrarMensaje(errorEnvio, "Debe iniciar sesión para completar la compra.", "error")
    return
  }

  const envio = document.querySelector('input[name="envio"]:checked').value
  const pago = document.querySelector('input[name="pago"]:checked').value

  let direccion = ""
  if (envio === "domicilio") {
    const dir = document.getElementById("direccion").value.trim()
    const ciudad = document.getElementById("ciudad").value.trim()
    const cp = document.getElementById("cp").value.trim()

    if (!dir || !ciudad || !cp) {
      mostrarMensaje(errorEnvio, "Complete todos los campos de dirección.", "error")
      return
    }
    direccion = `${dir}, ${ciudad}, CP: ${cp}`
  }

  if (pago === "tarjeta") {
    const titular = document.getElementById("titular").value.trim()
    const numero = document.getElementById("numero").value.trim()
    const codigo = document.getElementById("codigo").value.trim()

    if (!titular || !numero || !codigo) {
      mostrarMensaje(errorEnvio, "Complete todos los datos de la tarjeta.", "error")
      return
    }
  }

  const numeroOrden = "ORD" + Math.floor(Math.random() * 1000000)

  Toastify({
    text: `¡Compra realizada con éxito!\n\nNombre: ${usuario.nombre} ${usuario.apellido}\nOrden: ${numeroOrden}\nEnvío: ${envio === "domicilio" ? direccion : "Retiro en oficina"}\nPago: ${pago}\n\nMandaremos un mail para el seguimiento de su compra a: ${usuario.email} \n\nGracias por su compra.`,
    duration: 10000,
    gravity: "top", 
    position: "center", 
    backgroundColor: "#777455",
    stopOnFocus: true, 
  }).showToast();
  localStorage.removeItem("cartTelefonos")

  setTimeout(() => {
    window.location.href = "index.html"
  }, 10000)
}
