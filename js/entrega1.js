// Lista de gastos y préstamos
const gastos = [];
const prestamos = [];

function registrarGasto() {
    const descripcion = prompt("Ingresar la descripción del gasto:");
    const monto = parseInt(prompt("Ingrese el valor (numeros sin puntos):"));
    const fecha = prompt("Ingresar la fecha (DD/MM/AAAA):");
    
    if (!descripcion || !fecha || !monto) {
        alert("Datos inválidos. Intente nuevamente.");
        return;
    }
    gastos.push({ descripcion, monto, fecha });
    alert("Gasto del mes agregado.");
}

function registrarPrestamo() {
    const persona = prompt("Ingrese el nombre de la persona:");
    const monto = parseInt(prompt("Ingrese el valor (numeros sin puntos):"));
    const fecha = prompt("Ingrese la fecha (DD/MM/AAAA):");

    if (!persona || !fecha || !monto) {
        alert("Datos inválidos. Intente nuevamente.");
        return;
    }

    prestamos.push({ persona, monto, fecha });
    alert("Prestamo registrado.");
}

function verResumen() {
    for(const gasto of gastos){
        console.log("Descripcion del gasto: "+gasto.descripcion+ "(" +gasto.fecha + ")" + ": $"+gasto.monto)
    }

    for(const prestamo of prestamos){
        console.log("Descripcion del prestamo: "+prestamo.persona+ "(" +prestamo.fecha + ")" + ": $"+prestamo.monto)
    }
 
    alert("Resumen en consola.");
}

function verTotales() {
    let totalGastos = 0;
    let totalPrestamos = 0;

    for (const gasto of gastos) {
        totalGastos += gasto.monto;
    }

    for (const prestamo of prestamos) {
        totalPrestamos += prestamo.monto;
    }

    alert("Total de gastos: $"+ totalGastos + "\n" + "Total prestado: $" +  totalPrestamos);
}


let opcion;

do {
    opcion = parseInt(prompt("Seleccione una opcion:\n1. Registrar gasto\n2. Registrar prestamo\n3. Ver resumen del mes\n4. Ver totales\n5. Salir"));

    switch (opcion) {
        case 1:
            registrarGasto();
            break;
        case 2:
            registrarPrestamo();
            break;
        case 3:
            verResumen();
            break;
        case 4:
            verTotales();
            break;
        case 5:
            alert("Termino.");
            break;
        default:
            alert("No es una opcion valida, volver a intentar.");
    }
} while (opcion !== 5);