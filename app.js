// ==========================================
// 1. VARIABLES DEL DOM
// ==========================================

// Variables de Navegación (Tu código original)
const togglerNav = document.querySelector('.boton__logo--toggler');
const menuNav = document.querySelector('.contenedor__navbar');
const fondoNegro = document.querySelector('.fondo__negro');
const menuCarrito = document.querySelector('.boton__logo--carrito');
const contCarrito = document.querySelector('.contenedor__carrito');
const cerrarCarrito = document.querySelector('.boton__cerrar__carrito');
const menuCarritoXL = document.querySelector('.boton__logo--carritoXL');

// Variables del Carrito Dinámico
const itemsCarritoDOM = document.getElementById('itemsCarrito');
const precioTotalDOM = document.getElementById('precioTotalCarrito');
const contadoresDOM = document.querySelectorAll('.carrito__contador'); // Selecciona ambos contadores (Móvil y PC)
const botonesAgregar = document.querySelectorAll('.btn-agregar-carrito');

// Estado de los productos
let carrito = [];

// ==========================================
// 2. LÓGICA DE INTERFAZ (Abrir / Cerrar Menús)
// ==========================================

// Abrir Menú Hamburguesa
togglerNav.addEventListener('click', () =>{
    menuNav.classList.toggle('activo');
    fondoNegro.classList.toggle('activo');
    document.body.classList.toggle('activo');
});

// Abrir Carrito (Móvil)
menuCarrito.addEventListener('click', () =>{
    contCarrito.classList.toggle('activo');
    fondoNegro.classList.toggle('activo2');
    document.body.classList.toggle('activo');
});

// Abrir Carrito (PC)
menuCarritoXL.addEventListener('click', () =>{
    contCarrito.classList.toggle('activo');
    fondoNegro.classList.toggle('activo2');
    document.body.classList.toggle('activo');
});

// Cerrar Carrito
cerrarCarrito.addEventListener('click', () =>{
    contCarrito.classList.remove('activo');
    fondoNegro.classList.remove('activo2');
    document.body.classList.remove('activo');
});

// Cerrar cualquier menú al hacer clic en el fondo negro
fondoNegro.addEventListener('click', () => {
    menuNav.classList.remove('activo');
    contCarrito.classList.remove('activo');
    fondoNegro.classList.remove('activo');
    fondoNegro.classList.remove('activo2');
    document.body.classList.remove('activo');
});

// Helper para abrir el carrito automáticamente al agregar un producto
function abrirCarritoAutomatico() {
    if (!contCarrito.classList.contains('activo')) {
        contCarrito.classList.add('activo');
        fondoNegro.classList.add('activo2');
        document.body.classList.add('activo');
    }
}

// ==========================================
// 3. LÓGICA DEL CARRITO
// ==========================================

// Escuchar clics en los botones "Agregar al Carrito"
botonesAgregar.forEach(boton => {
    boton.addEventListener('click', (e) => {
        const id = boton.getAttribute('data-id');
        const nombre = boton.getAttribute('data-nombre');
        const precio = parseFloat(boton.getAttribute('data-precio'));
        const img = boton.getAttribute('data-img');

        agregarProducto(id, nombre, precio, img);
        abrirCarritoAutomatico(); 
        animarContadores();
    });
});

// Función Principal: Agregar
function agregarProducto(id, nombre, precio, img) {
    const itemExistente = carrito.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.cantidad++; 
    } else {
        carrito.push({ id, nombre, precio, img, cantidad: 1 }); 
    }
    renderizarCarrito();
}

// Dibujar el HTML de las plantas dentro del carrito
function renderizarCarrito() {
    itemsCarritoDOM.innerHTML = ''; 

    if (carrito.length === 0) {
        itemsCarritoDOM.innerHTML = '<p style="text-align:center; margin-top:20px; color:var(--color-text-muted);">Tu carrito está vacío.</p>';
    }

    carrito.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('carrito__item');

        div.innerHTML = `
            <img src="${item.img}" alt="${item.nombre}" class="carrito__item-img">
            <div class="carrito__item-info">
                <span class="carrito__item-titulo">${item.nombre}</span>
                <span class="carrito__item-precio">Q ${(item.precio * item.cantidad).toFixed(2)}</span>
                <div class="carrito__controles">
                    <button class="carrito__btn-cantidad" onclick="modificarCantidad('${item.id}', -1)">-</button>
                    <span class="carrito__item-cantidad">${item.cantidad}</span>
                    <button class="carrito__btn-cantidad" onclick="modificarCantidad('${item.id}', 1)">+</button>
                </div>
            </div>
            <button class="carrito__btn-eliminar" onclick="eliminarProducto('${item.id}')">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>
            </button>
        `;
        itemsCarritoDOM.appendChild(div);
    });

    actualizarTotales();
}

// Botones de + y - dentro del carrito
function modificarCantidad(id, cambio) {
    const item = carrito.find(item => item.id === id);
    if (item) {
        item.cantidad += cambio;
        if (item.cantidad <= 0) {
            eliminarProducto(id);
        } else {
            renderizarCarrito();
        }
    }
}

// Botón de basurero
function eliminarProducto(id) {
    carrito = carrito.filter(item => item.id !== id);
    renderizarCarrito();
}

// Calcular dinero y actualizar el círculo rojo en ambos botones
function actualizarTotales() {
    const totalPrecio = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    precioTotalDOM.textContent = `Q ${totalPrecio.toFixed(2)}`;
    
    // Actualizar todos los contadores en la navbar
    contadoresDOM.forEach(contador => {
        contador.textContent = totalItems;
        contador.style.display = totalItems === 0 ? 'none' : 'flex';
    });
}

// Pequeño efecto visual al presionar "Agregar"
function animarContadores() {
    contadoresDOM.forEach(contador => {
        contador.style.transform = 'scale(1.3)';
        setTimeout(() => {
            contador.style.transform = 'scale(1)';
        }, 200);
    });
}

// Iniciar en estado vacío
actualizarTotales();