// Variables
const presupuestoUsuario = prompt('Cual es tu presupuesto Semanal?');
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;

// console.log(presupuestoUsuario);

// Clases
// Clase de Presupuesto
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto); 
        this.restante = Number(presupuesto);
    }
    // Método para ir restando del presupuesto actual
    presupuestoRestante(cantidad = 0) {
        return this.restante -= Number(cantidad);
    }
}

// clase de Interfaz maneja todo lo relacionado a el HTML   
class Interfaz {
    insetarPresupuesto(cantidad) {
        // console.log(cantidad);
        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');

        // Insertar al HTML
        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;
    }
    imprimirMensaje(mensaje, tipo) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }
        divMensaje.appendChild(document.createTextNode(mensaje));
        // Insertar en el DOM
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        // Quitar el alert despues de 3 segundos
        setTimeout(function () {
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        }, 3000);
    }
    // Inserta los gastos a la lista
    agregarGastoListado(nombre, cantidad) {
        const gastosListado = document.querySelector('#gastos ul');

        //Crear un LI
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        // Insertar el gasto
        li.innerHTML = `
            ${nombre}
            <span class="badge badge-primary badge-pill"> $ ${cantidad} </span>
        `;

        // Insertar al HTML
        gastosListado.appendChild(li);
    }
    // Comprueba el presupuesto restante
    presupuestoRestante(cantidad) {
        const restante = document.querySelector('span#restante');
        // Leemos el presupuesto restante
        const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);
        // console.log(presupuestoRestanteUsuario);
        restante.innerHTML = `${presupuestoRestanteUsuario}`;

        this.comprobarPresupuesto();
    }
    // Cambiar de color el presupuesto restante
    comprobarPresupuesto() {
        // console.log(cantidadPresupuesto);
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;

        // Comprobar el 25%
        if ((presupuestoTotal / 4) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger'); 
        } else if ((presupuestoTotal / 2) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        }
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function () {
    if (presupuestoUsuario === null || presupuestoUsuario === '') {
        window.location.reload();
    } else {
        // Instanciar un presupuesto
        // console.log('agregado correctamente')
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        // console.log(cantidadPresupuesto);
        // Instanciar la clase de Interfaz
        const ui = new Interfaz();
        ui.insetarPresupuesto(cantidadPresupuesto.presupuesto);
    }
});

formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    // console.log('Enviado');

    // Leer del formulario de Gastos
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;

    // Instanciar la Interfaz
    const ui = new Interfaz();
    
    // Comprobar que los campos no esten varios
    if (nombreGasto === '' || cantidadGasto === '') {
        // console.log('hubo un error');
        ui.imprimirMensaje('hubo un error', 'error');
    } else {
        // console.log('el gasto se agrego');
        // Insertar en el HTML
        ui.imprimirMensaje('Correcto', 'correcto');
        ui.agregarGastoListado(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }
});