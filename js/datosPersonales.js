const authContainer = document.getElementById("auth-container")

function crearInput(placeholder, type = "text") {
  const input = document.createElement("input")
  input.type = type
  input.placeholder = placeholder
  return input
}

function mostrarMensaje(contenedor, mensaje, tipo) {
  contenedor.textContent = mensaje
  contenedor.className = `mensaje ${tipo}` 
}

function renderFormularioRegistro() {
  authContainer.innerHTML = ""

  const formulario = document.createElement("div")
  formulario.classList.add("formulario")

  const inputNombre = crearInput("Nombre")
  const inputApellido = crearInput("Apellido")
  const inputEmail = crearInput("Email", "email")
  const inputTelefono = crearInput("Teléfono", "tel")
  const inputPassword = crearInput("Contraseña", "password")
  const inputRepetir = crearInput("Repetir Contraseña", "password")

  const mensaje = document.createElement("div")

  const boton = document.createElement("button")
  boton.textContent = "Registrarse"

  boton.addEventListener("click", () => {
    const nombre = inputNombre.value.trim()
    const apellido = inputApellido.value.trim()
    const email = inputEmail.value.trim()
    const telefono = inputTelefono.value.trim()
    const pass = inputPassword.value
    const repetir = inputRepetir.value

    if (!nombre || !apellido || !email || !telefono || !pass || !repetir) {
      mostrarMensaje(mensaje, "Todos los campos son obligatorios", "error")
      return
    }

    if (pass !== repetir) {
      mostrarMensaje(mensaje, "Las contraseñas no coinciden", "error")
      return
    }

    if (pass.length < 6) {
      mostrarMensaje(mensaje, "La contraseña debe tener al menos 6 caracteres", "error")
      return
    }

    const usuario = { nombre, apellido, email, telefono, password: pass }
    localStorage.setItem("usuario", JSON.stringify(usuario))

    mostrarMensaje(mensaje, "¡Registro exitoso!", "exito")

    setTimeout(() => {
      renderFormularioLogin()
    }, 2000)
  })

  const linkLogin = document.createElement("p")
  linkLogin.innerHTML = `¿Ya tenés cuenta? <a href="#" id="ir-login">Iniciar sesión</a>`
  linkLogin.querySelector("#ir-login").addEventListener("click", (e) => {
    e.preventDefault()
    renderFormularioLogin()
  })

  formulario.append(inputNombre, inputApellido, inputEmail, inputTelefono, inputPassword, inputRepetir, boton, mensaje, linkLogin)
  authContainer.appendChild(formulario)
}

function renderFormularioLogin() {
  authContainer.innerHTML = ""

  const formulario = document.createElement("div")
  formulario.classList.add("formulario")

  const inputEmail = crearInput("Email", "email")
  const inputPassword = crearInput("Contraseña", "password")
  const mensaje = document.createElement("div")

  const boton = document.createElement("button")
  boton.textContent = "Iniciar sesión"

  boton.addEventListener("click", () => {
    const email = inputEmail.value.trim()
    const pass = inputPassword.value

    const usuario = JSON.parse(localStorage.getItem("usuario"))

    if (!usuario || usuario.email !== email || usuario.password !== pass) {
      mostrarMensaje(mensaje, "Credenciales incorrectas", "error")
      return
    }

    mostrarMensaje(mensaje, `¡Bienvenido, ${usuario.nombre}!`, "exito")
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario))
    setTimeout(() => {
      window.location.href = "carrito.html"
    }, 2000)
  })

  const linkRegistro = document.createElement("p")
  linkRegistro.innerHTML = `¿No tenés cuenta? <a href="#" id="ir-registro">Crear una</a>`
  linkRegistro.querySelector("#ir-registro").addEventListener("click", (e) => {
    e.preventDefault()
    renderFormularioRegistro()
  })

  formulario.append(inputEmail, inputPassword, boton, mensaje, linkRegistro)
  authContainer.appendChild(formulario)
}

renderFormularioLogin()
